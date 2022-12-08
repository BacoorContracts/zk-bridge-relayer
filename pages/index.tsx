import { ConnectButton } from "@rainbow-me/rainbowkit";

import {
    Form,
    Label,
    Button,
    Divider,
    Container,
    Segment,
    Input,
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
import { NetworkSelector, AssetBalance, ValueInput } from "../components/index";
import { BlindStoreButton } from "../components/BlindStoreButton";

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
    const [passPhrase, setPassphrase] = useState("");
    const [status, setStatus] = useState("Fetching ...");
    const [bridgeLoading, setBridgeLoading] = useState(false);
    const [bridgeDisabled, setBridgeDisabled] = useState(false);
    const [withdrawLoading, setWitdrawLoading] = useState(false);
    const [withdrawDisabled, setWithdrawDisabled] = useState(true);
    const [linkStatus, setLinkStatus] = useState("");

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
            setStatus,
            setLinkStatus
        );

    setWitdrawLoading(false);
    setBridgeDisabled(false);
    setWithdrawDisabled(true);
  };

    return (
        <Form
            style={{ width: "750px", marginLeft: "auto", marginRight: "auto" }}
        >
            <Segment stacked padded="very" size="small" color="blue">
                <div>
                    <h1>Status</h1>
                    <p>{status}</p>
                    {linkStatus !== "" && <a rel="noopener noreferrer" target="_blank" href={linkStatus}>Transaction Hash</a>}
                </div>

                <Divider></Divider>

                <Form.Field required>
                    <Label>From</Label>
                    <NetworkSelector
                        name="From Network"
                        chainIdThat={chainIdTo}
                        setChainIdThis={setChainIdFrom}
                        excludeConnected={false}
                    ></NetworkSelector>
                </Form.Field>

                <Form.Field required>
                    <Label>To</Label>
                    <NetworkSelector
                        name="To Network"
                        excludeConnected
                        chainIdThat={chainIdFrom}
                        setChainIdThis={setChainIdTo}
                    ></NetworkSelector>
                </Form.Field>

                <Divider></Divider>

                <Form.Input
                    required
                    value={asset}
                    label="Asset Address"
                    onChange={(_, data) => {
                        setAsset(data.value);
                    }}
                ></Form.Input>

                <Form.Field required>
                    <AssetBalance token={asset as `0x${string}`}></AssetBalance>
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
                        primary
                        fluid
                        disabled={bridgeDisabled}
                        loading={bridgeLoading}
                        onClick={handleDeposit}
                    >
                        Bridge
                    </Button>
                </Form.Field>

                <Divider></Divider>

                <Form.Field widths="equal">
                    <Label>Nullifier</Label>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div style={{width: "200px", flexBasis: "70%"}}>
                            <Input
                                type="number"
                                loading={bridgeLoading}
                                onChange={(_, d) => {setNullifier(d.value); setWithdrawDisabled(false)}}
                                placeholder="Please enter your secret code"
                                defaultValue={nullifier}
                                style={{marginBottom: "10px"}}
                            ></Input>
                        </div>
                        <div style={{flexBasis: "20%"}}>
                            <BlindStoreButton
                                nullifier={nullifier}
                                setPassphrase={setPassphrase}
                            ></BlindStoreButton>
                        </div>
                    </div>
                </Form.Field>

                <Form.Field>
                    <Button
                        primary
                        fluid
                        disabled={withdrawDisabled}
                        loading={withdrawLoading}
                        onClick={handleWithdraw}
                    >
                        Witdraw
                    </Button>
                </Form.Field>
            </Segment>
        </Form>
    );
};

export default function Home() {
    return (
        <Container
            style={{
                paddingTop: "50px",
                marginLeft: "auto",
                marginRight: "auto",
            }}
        >
            <div
                style={{
                    width: "750px",
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
            >
                <ConnectButton></ConnectButton>
            </div>
            <Divider>
                <BridgeModal></BridgeModal>
                {/* <ShowBridgeInfo></ShowBridgeInfo> */}
            </Divider>
        </Container>
    );
}
