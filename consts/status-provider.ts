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
        default: "https://rpc.ankr.com/avalanche_fuji",
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
    network: "bscTest",
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
            url: "https://testnet.bscscan.com/",
        },
    },
    testnet: true,
};

export const providerRPC = {
    bscTest: {
        name: "bscTest",
        rpc: "https://bsctestapi.terminet.io/rpc",
        chainId: 97,
    },
    fuji: {
        name: "fuji",
        rpc: "https://rpc.ankr.com/avalanche_fuji",
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
