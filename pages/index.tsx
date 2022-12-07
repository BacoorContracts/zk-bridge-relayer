import "@rainbow-me/rainbowkit/styles.css";
import {
    RainbowKitProvider,
    getDefaultWallets,
    ConnectButton,
} from "@rainbow-me/rainbowkit";

import {
    Button,
    Container,
    Divider,
    Dropdown,
    Form,
    Input,
    Label,
    Message,
} from "semantic-ui-react";
import {
    configureChains,
    createClient,
    useAccount,
    useBalance,
    useConnect,
    useNetwork,
    useSigner,
    WagmiConfig,
} from "wagmi";
import { bscTest, fuji } from "../consts/status-provider";
import { InjectedConnector } from "wagmi/connectors/injected";
import { Signer } from "ethers";
import { parseEther } from "ethers/lib/utils.js";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { switchNetwork, fetchSigner, getProvider } from "@wagmi/core";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import deposit from "../services/deposit";
import { storeBridgeInfo, getBridgeInfos } from "../services/store-bridge-info";
import { CONFIRMATION_BLOCKS, RELAYER } from "../consts/const";
import { relayState } from "../services/relay-state";
import { DepositedEvent } from "../typechain-types/contracts/ZKBridge";
import { withdraw } from "../services/withdraw";

const { chains, provider } = configureChains(
    [fuji, bscTest],
    [
        jsonRpcProvider({
            rpc: (chain) => {
                return { http: chain.rpcUrls.default };
            },
        }),
    ]
);

const { connectors } = getDefaultWallets({
    appName: "ZK Bridge",
    chains,
});

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
});

interface NetworkSelectorProps {
    name: string;
    excludeConnected: boolean;
    setChainId: Dispatch<SetStateAction<number>>;
}

export const NetworkSelector: FC<NetworkSelectorProps> = ({
    name,
    setChainId,
    excludeConnected,
}: NetworkSelectorProps) => {
    const { chain, chains } = useNetwork();
    const { isConnected } = useAccount();
    const { connect } = useConnect();

    return (
        <Dropdown
            placeholder={name}
            fluid
            selection
            options={(excludeConnected && chain
                ? chains.filter((_chain) => _chain.id != chain.id)
                : chains
            ).map((c) => {
                return {
                    key: c.id,
                    value: c.id,
                    text: c.name,
                };
            })}
            onChange={async (_, v) => {
                setChainId(v.value as number);
                if (excludeConnected) return;

                if (isConnected)
                    await switchNetwork({
                        chainId: v.value as number,
                    });
                else {
                    connect({
                        connector: new InjectedConnector(),
                        chainId: v.value as number,
                    });
                }
            }}
        ></Dropdown>
    );
};

interface IAsset {
    token: `0x${string}`;
}

export const AssetInput: FC<IAsset> = ({ token }: IAsset) => {
    const { address } = useAccount();
    const { data, isError, isLoading } = useBalance({
        address: address,
        token: token,
        watch: true,
    });

    if (isLoading) return <div>Fetching balance…</div>;
    if (isError) return <div>Error fetching balance</div>;
    return (
        <div>
            Balance: {data?.formatted} {data?.symbol}
        </div>
    );
};

interface IValueInput {
    setValue: Dispatch<SetStateAction<string>>;
}

export const ValueInput: FC<IValueInput> = ({ setValue }: IValueInput) => {
    return (
        <Input
            onChange={(event, data) =>
                setValue(parseEther(data.value).toString())
            }
            labelPosition="right"
            type="text"
            placeholder="Amount"
        >
            <Label basic>$</Label>
            <input />
        </Input>
    );
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const BridgeModal = () => {
    const { data: signer } = useSigner();
    const [asset, setAsset] = useState("");
    const [value, setValue] = useState("");
    const { address } = useAccount();
    const [chainIdTo, setChainIdTo] = useState(0);
    const [chainIdFrom, setChainIdFrom] = useState(0);
    const [bridgeLoading, setBridgeLoading] = useState(false);
    const [bridgeDisabled, setBridgeDisabled] = useState(false);
    const [withdrawLoading, setWitdrawLoading] = useState(false);
    const [withdrawDisabled, setWithdrawDisabled] = useState(true);
    const [nullifier, setNullifier] = useState("");
    const [status, setStatus] = useState("Fetching ...");

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
            "latest"
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
        await withdraw(
            signer as Signer,
            "0x3F579e98e794B870aF2E53115DC8F9C4B2A1bDA6",
            chainIdTo,
            chainIdFrom,
            nullifier,
            setStatus
        );
    };

    return (
        <Form>
            <Message>
                <Message.Header>Status</Message.Header>
                <p>{status}</p>
            </Message>

            <Label>From</Label>
            <NetworkSelector
                name="From Network"
                setChainId={setChainIdFrom}
                excludeConnected={false}
            ></NetworkSelector>

            <Form.Input
                label="Asset Address"
                onChange={(_, data) => {
                    setAsset(data.value);
                }}
            ></Form.Input>

            <Form.Field>
                <AssetInput token={asset as `0x${string}`}></AssetInput>
                <ValueInput setValue={setValue}></ValueInput>
            </Form.Field>

            <Label>To</Label>
            <NetworkSelector
                name="To Network"
                excludeConnected
                setChainId={setChainIdTo}
            ></NetworkSelector>

            <Form.Field>
                <Form.Button labelPosition="right">
                    <Button
                        disabled={bridgeDisabled}
                        loading={bridgeLoading}
                        onClick={handleDeposit}
                    >
                        Bridge
                    </Button>
                </Form.Button>
            </Form.Field>

            <Form.Input
                action={{
                    color: "teal",
                    labelPosition: "right",
                    icon: "copy",
                    content: "Copy",
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
                <Input disabled={withdrawDisabled}></Input>
            </Form.Field>
        </Form>
    );
};

const ShowBridgeInfos = () => {
    interface IBridgeInfo {
        commitment: string;
        token: string;
        value: string;
        fee: string;
        relayer: string;
    }
    const [bridgeInfoList, setBridgeInfoList] = useState([]);
    useEffect(() => {
        const getList = async () => {
            const list = await getBridgeInfos();
            setBridgeInfoList(list.data);
        };
        getList();
    }, []);
    return (
        <div>
            <ul>
                {bridgeInfoList.map((bridgeInfo: IBridgeInfo, index) => (
                    <li>
                        Info - {index}: <br />
                        Commitment: {bridgeInfo.commitment}, Token:{" "}
                        {bridgeInfo.token}, Fee:
                        {bridgeInfo.fee}, Value: {bridgeInfo.value}, Relayer:{" "}
                        {bridgeInfo.relayer}
                    </li>
                ))}
            </ul>
            <br />
        </div>
    );
};

export default function Home() {
    return (
        <Container>
            <WagmiConfig client={wagmiClient}>
                <RainbowKitProvider chains={chains}>
                    <div
                        style={{
                            width: "25vw",
                            height: "25vh",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <ConnectButton />
                    </div>
                    <BridgeModal></BridgeModal>
                </RainbowKitProvider>
            </WagmiConfig>
            <ShowBridgeInfos />
        </Container>
    );
}
