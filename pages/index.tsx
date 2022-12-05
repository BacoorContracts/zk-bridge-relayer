import "@rainbow-me/rainbowkit/styles.css";
import {
    RainbowKitProvider,
    getDefaultWallets,
    ConnectButton,
} from "@rainbow-me/rainbowkit";

import { Container, Dropdown, Form, Input, Label } from "semantic-ui-react";
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
import { Signer, ethers, BigNumberish, BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils.js";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { switchNetwork, fetchSigner } from "@wagmi/core";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import deposit from "../services/deposit";
import { storeBridgeInfo, getBridgeInfos } from "../services/store-bridge-info";

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
                if (excludeConnected) {
                    return;
                }
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
    const { address, isConnecting, isDisconnected } = useAccount();
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

export const BridgeModal = () => {
    const { data: signer } = useSigner();
    const [asset, setAsset] = useState("");
    const [value, setValue] = useState("");
    const [chainIdTo, setChainIdTo] = useState(0);
    const [chainIdFrom, setChainIdFrom] = useState(0);

    const handleDeposit = async () => {
        const signer = (await fetchSigner()) as Signer;
        console.log({
            chainIdTo,
            asset,
            value,
            signer,
        });

        const [nullifier, commitment, tx] = await deposit(
            signer,
            asset,
            value,
            chainIdTo
        );

        console.log({ nullifier, commitment });

        const bridgeInfo = await storeBridgeInfo(
            commitment,
            asset,
            value,
            value,
            "relayer"
        );

        console.log(bridgeInfo);
    };
    return (
        <Form>
            <Form.Field>
                <Label>From</Label>
                <NetworkSelector
                    name="From Network"
                    setChainId={setChainIdFrom}
                    excludeConnected={false}
                ></NetworkSelector>
                <Label>Asset Address</Label>
                <Input
                    onChange={(_, data) => {
                        setAsset(data.value);
                    }}
                ></Input>
                <AssetInput token={asset as `0x${string}`}></AssetInput>
                <ValueInput setValue={setValue}></ValueInput>
            </Form.Field>

            <Form.Field>
                <Label>To</Label>
                <NetworkSelector
                    name="To Network"
                    excludeConnected
                    setChainId={setChainIdTo}
                ></NetworkSelector>
            </Form.Field>
            <Form.Button onClick={handleDeposit}>Bridge</Form.Button>
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
