import { Dropdown } from "semantic-ui-react";
import { useNetwork } from "wagmi";
import { ASSETS } from "../consts/const";
import { fetchToken } from "@wagmi/core";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

interface IAssetDropDown {
    setAsset: Dispatch<SetStateAction<string>>;
}

export const AssetDropDown: FC<IAssetDropDown> = ({ setAsset }) => {
    const { chain } = useNetwork();
    const [isFocus, setFocus] = useState(false);
    const [options, setOptions] = useState([
        { name: "", symbol: "", address: "" },
    ]);
    useEffect(() => {
        const fetchAssetList = async () => {
            const assets = ASSETS[chain?.id as number];
            const assetData = await Promise.all(
                assets.map(async (v) => {
                    const token = await fetchToken({
                        address: v as `0x${string}`,
                        chainId: chain?.id,
                    });

                    return {
                        name: token.name,
                        symbol: token.symbol,
                        address: token.address,
                    };
                })
            );
            setOptions(assetData);
        };
        if (isFocus) fetchAssetList();
    });
    const handleFocus = () => setFocus(true);
    return (
        <Dropdown
            selection
            placeholder="Asset List"
            fluid
            options={options.map((v) => {
                return {
                    key: v.symbol,
                    value: v.address,
                    text: `${v.name} (${v.symbol}) - ${v.address}`,
                };
            })}
            onFocus={handleFocus}
            onChange={(_, d) => setAsset(d.value as string)}
        ></Dropdown>
    );
};
