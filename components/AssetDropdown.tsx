import { Dropdown } from "semantic-ui-react";
import { useNetwork } from "wagmi";
import { ASSETS } from "../consts/const";
import { fetchToken } from "@wagmi/core";

export const AssetDropDown = () => {
    const { chain } = useNetwork();
    return (
        <Dropdown
            selection
            options={ASSETS[chain?.id as number].map(async (v) => {
                const token = await fetchToken({
                    address: v as `0x${string}`,
                    chainId: chain?.id,
                });
                return {
                    key: token.name,
                    text: `${token.name} (${token.symbol}) - ${token.address}`,
                    value: token.address,
                };
            })}
        ></Dropdown>
    );
};
