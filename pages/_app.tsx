import "@rainbow-me/rainbowkit/styles.css";
import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import type { AppProps } from "next/app";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { bscTest, fuji } from "../consts/status-provider";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
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

export default function App({ Component, pageProps }: AppProps) {
    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
                <Component {...pageProps} />
            </RainbowKitProvider>
        </WagmiConfig>
    );
}
