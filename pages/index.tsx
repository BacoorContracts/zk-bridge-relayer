import "@rainbow-me/rainbowkit/styles.css";
import {
    RainbowKitProvider,
    getDefaultWallets,
    ConnectButton,
} from "@rainbow-me/rainbowkit";

import { Dropdown, Form, Input, Label } from "semantic-ui-react";

import {
    configureChains,
    createClient,
    useAccount,
    useBalance,
    useConnect,
    useNetwork,
    WagmiConfig,
} from "wagmi";
import { bscTest, fuji } from "../consts/status-provider";
import { InjectedConnector } from "wagmi/connectors/injected";

import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { switchNetwork } from "@wagmi/core";
import { FC, useState } from "react";

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
}

export const NetworkSelector: FC<NetworkSelectorProps> = ({
    name,
    excludeConnected,
}: NetworkSelectorProps) => {
    const { chain, chains } = useNetwork();
    const { isConnected } = useAccount();
    const { connect } = useConnect();
    return (
        <Dropdown
            placeholder={name}
            fluid
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

const deposit = async () => {};

export const BridgeModal = () => {
    const [asset, setAsset] = useState("asset");
    return (
        <Form>
            <Form.Field>
                <Label>From</Label>
                <NetworkSelector
                    name="From Network"
                    excludeConnected={false}
                ></NetworkSelector>
                <Label>Asset Address</Label>
                <Input
                    onChange={(_, data) => {
                        setAsset(data.value);
                    }}
                ></Input>
                <AssetInput token={asset as `0x${string}`}></AssetInput>
            </Form.Field>

            <Form.Field>
                <Label>To</Label>
                <NetworkSelector
                    name="To Network"
                    excludeConnected
                ></NetworkSelector>
            </Form.Field>
            <Form.Button>Bridge</Form.Button>
        </Form>
    );
};

export default function Home() {
    return (
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
    );
}
