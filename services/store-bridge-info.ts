import { BridgeInfo } from "../models";
import { BigNumber, BigNumberish } from "ethers";

export const storeBridgeInfo = async (
    commitment: string,
    token: string,
    fee: BigNumberish,
    value: BigNumberish,
    relayer: string
) => {
    const bridge = new BridgeInfo({})
    const record = {
        commitment: commitment,
        token: token,
        fee: fee,
        value: value,
        relayer: relayer,
    };

    Object.keys(record).forEach(
        (value) => (value = BigNumber.from(value).toString())
    );

    await BridgeInfo.create(record);
};
