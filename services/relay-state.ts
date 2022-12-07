import { BRIDGE } from "../consts/const";
import { getProvider } from "@wagmi/core";
import { Dispatch, SetStateAction } from "react";
import { ZKBridge, ZKBridge__factory } from "../typechain-types";
import { BigNumberish, BytesLike, Contract, Signer, Wallet } from "ethers";

export const relayState = async (
    chainIdFrom: number,
    chainIdTo: number,
    state: BigNumberish,
    setStatus: Dispatch<SetStateAction<string>>
) => {
    console.log({ chainIdTo, chainIdFrom });
    const provider = getProvider({ chainId: chainIdTo });
    console.log({ provider });
    const signer: Signer = new Wallet(
        process.env.NEXT_PUBLIC_RELAYER as BytesLike,
        provider
    );

    const bridgeTo: ZKBridge = new Contract(
        BRIDGE[chainIdTo][chainIdFrom],
        ZKBridge__factory.abi,
        signer
    ) as ZKBridge;

    console.log({ bridgeTo });

    setStatus("Relaying State to Target Network");

    await bridgeTo
        .connect(signer)
        .addBridgeState(state)
        .then(async (tx) => await tx.wait())
        .catch((err) => {
            setStatus("Ran out of gas fee token");
            throw err;
        });

    setStatus("Relayed State to Target Network. Ready to withdraw");
};
