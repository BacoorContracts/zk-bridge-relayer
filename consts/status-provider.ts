import { Chain } from "wagmi";
import { ethers, providers } from "ethers";

export const fuji: Chain = {
    id: 43_113,
    name: "Avalanche Fuji Testnet",
    network: "fuji",
    nativeCurrency: {
        decimals: 18,
        name: "Avalanche",
        symbol: "AVAX",
    },
    rpcUrls: {
        default: "https://ava-testnet.public.blastapi.io/ext/bc/C/rpc",
    },
    blockExplorers: {
        default: {
            name: "Testnet SnowTrace",
            url: "https://testnet.snowtrace.io/",
        },
    },
    testnet: true,
};

export const bscTest: Chain = {
    id: 97,
    name: "Binance Smart Chain Testnet",
    network: "bsc test",
    nativeCurrency: {
        decimals: 18,
        name: "BSC Test",
        symbol: "tBNB",
    },
    rpcUrls: {
        default: "https://bsctestapi.terminet.io/rpc",
    },
    blockExplorers: {
        default: {
            name: "Testnet Binance",
            url: "https://testnet.binance.org/",
        },
    },
    testnet: true,
};

export const providerRPC = {
    bscTest: {
        name: "bsc",
        rpc: "https://bsc-dataseed1.binance.org/",
        chainId: 56,
    },
    fuji: {
        name: "fuji",
        rpc: "https://api.avax-test.network/ext/bc/C/rpc",
        chainId: 43113,
    },
};
// 3. Create ethers provider
export const bscProvider = new ethers.providers.StaticJsonRpcProvider(
    providerRPC.bscTest.rpc,
    {
        chainId: providerRPC.bscTest.chainId,
        name: providerRPC.bscTest.name,
    }
);

export const fujiProvider = new providers.StaticJsonRpcProvider(
    providerRPC.fuji.rpc,
    {
        chainId: providerRPC.fuji.chainId,
        name: providerRPC.fuji.name,
    }
);
