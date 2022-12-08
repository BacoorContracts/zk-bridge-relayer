import { ConnectButton } from "@rainbow-me/rainbowkit";

import {
    Form,
    Label,
    Button,
    Message,
    Divider,
    Container,
} from "semantic-ui-react";
import { useState } from "react";
import { Signer } from "ethers";
import deposit from "../services/deposit";
import { fetchSigner } from "@wagmi/core";
import { useSigner, useAccount } from "wagmi";
import { withdraw } from "../services/withdraw";
import { relayState } from "../services/relay-state";
import { CONFIRMATION_BLOCKS } from "../consts/const";
import { DepositedEvent } from "../typechain-types/contracts/ZKBridge";
import { NetworkSelector, AssetInput, ValueInput } from "../components/index";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const BridgeModal = () => {
    const { data: signer } = useSigner();
    const [asset, setAsset] = useState(
        "0xbf3a47229e2f8c22ca9f6b6fe93b48db5f7b8510"
    );
    const { address } = useAccount();
    const [value, setValue] = useState("");
    const [nullifier, setNullifier] = useState("");
    const [chainIdTo, setChainIdTo] = useState(0);
    const [chainIdFrom, setChainIdFrom] = useState(0);
    const [recipient, setRecipient] = useState(address);
    const [status, setStatus] = useState("Fetching ...");
    const [bridgeLoading, setBridgeLoading] = useState(false);
    const [bridgeDisabled, setBridgeDisabled] = useState(false);
    const [withdrawLoading, setWitdrawLoading] = useState(false);
    const [withdrawDisabled, setWithdrawDisabled] = useState(true);

    const handleDeposit = async () => {
        setBridgeLoading(true);
        const { nullifier, tx, bridge } = await deposit(
            signer as Signer,
            asset,
            value,
            chainIdTo,
            setStatus
        );

        const { blockNumber: submittedBlock } = await tx.wait();
        const targetBlock = submittedBlock + CONFIRMATION_BLOCKS;

        let currentBlock: number;
        while (
            (currentBlock = (await (
                signer as Signer
            ).provider?.getBlockNumber()) as number) <= targetBlock
        ) {
            setStatus(
                `Confirmation blocks: ${
                    currentBlock - submittedBlock
                }/${CONFIRMATION_BLOCKS}`
            );
            await delay(1000);
        }
        setStatus(
            `Confirmation blocks: ${CONFIRMATION_BLOCKS}/${CONFIRMATION_BLOCKS}`
        );

        const events: DepositedEvent[] = await bridge.queryFilter(
            bridge.filters.Deposited(asset, address, value),
            submittedBlock,
            submittedBlock + CONFIRMATION_BLOCKS
        );

        await relayState(
            chainIdFrom,
            chainIdTo,
            events[0].args.root,
            setStatus
        );

        setNullifier(nullifier);
        setBridgeLoading(false);
        setBridgeDisabled(true);
        setWithdrawDisabled(false);
    };

    const handleWithdraw = async () => {
        const signer = await fetchSigner();
        setWitdrawLoading(true);

        await withdraw(
            signer as Signer,
            recipient as string,
            chainIdTo,
            chainIdFrom,
            nullifier,
            setStatus
        );

        setWitdrawLoading(false);
        setBridgeDisabled(false);
        setWithdrawDisabled(true);
    };

    return (
        <Form>
            <Message>
                <Message.Header>Status</Message.Header>
                {status}
            </Message>

            <Divider></Divider>

            <Label>From</Label>
            <NetworkSelector
                name="From Network"
                chainIdThat={chainIdTo}
                setChainIdThis={setChainIdFrom}
                excludeConnected={false}
            ></NetworkSelector>

            <Label>To</Label>
            <NetworkSelector
                name="To Network"
                excludeConnected
                chainIdThat={chainIdFrom}
                setChainIdThis={setChainIdTo}
            ></NetworkSelector>

            <Divider></Divider>

            <Form.Input
                value={asset}
                label="Asset Address"
                onChange={(_, data) => {
                    setAsset(data.value);
                }}
            ></Form.Input>

            <Form.Field>
                <AssetInput token={asset as `0x${string}`}></AssetInput>
                <ValueInput setValue={setValue}></ValueInput>
            </Form.Field>

            <Divider></Divider>

            <Form.Input
                label="Recipient Address"
                defaultValue={address}
                onChange={(_, d) => setRecipient(d.value as `0x${string}`)}
            ></Form.Input>

            <Form.Field>
                <Button
                    disabled={bridgeDisabled}
                    loading={bridgeLoading}
                    onClick={handleDeposit}
                >
                    Bridge
                </Button>
            </Form.Field>

            <Divider></Divider>

            <Form.Input
                action={{
                    color: "teal",
                    labelPosition: "right",
                    icon: "copy",
                    content: "Safe Store",
                }}
                loading={bridgeLoading}
                placeholder="Withdraw code"
                disabled={withdrawDisabled}
                defaultValue={nullifier}
                onChange={(_, d) => setNullifier(d.value)}
            />

            <Form.Field>
                <Button
                    disabled={withdrawDisabled}
                    loading={withdrawLoading}
                    onClick={handleWithdraw}
                >
                    Witdraw
                </Button>
            </Form.Field>
        </Form>
    );
};

export default function Home() {
    return (
        <Container style={{ paddingTop: "80px" }}>
            <ConnectButton></ConnectButton>
            <Divider>
                <BridgeModal></BridgeModal>
                {/* <ShowBridgeInfo></ShowBridgeInfo> */}
            </Divider>
        </Container>
    );
}
