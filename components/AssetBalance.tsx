import { Label } from "semantic-ui-react";
import { FC, useEffect, useState } from "react";
import { useAccount, useBalance, useBlockNumber } from "wagmi";

interface IAsset {
    token: `0x${string}`;
}

export const AssetBalance: FC<IAsset> = ({ token }: IAsset) => {
    const { address } = useAccount();
    const {
        data: _data,
        isError: _isError,
        isLoading: _isLoading,
    } = useBlockNumber({ watch: true });

    const { data, isError, isLoading } = useBalance({
        address: address,
        token: token,
        watch: true,
    });

    const [balance, setBalance] = useState("");

    useEffect(() => {
        setBalance(() => {
            if (isLoading) return "Fetching ...";
            if (isError) return "Error fetching balance";
            return `Balance: ${data?.formatted} ${data?.symbol}`;
        });
    }, [_data]);

    return <Label>{balance}</Label>;
};
