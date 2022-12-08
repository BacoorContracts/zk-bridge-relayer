import { Dropdown } from "semantic-ui-react";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

interface NetworkSelectorProps {
    name: string;
    chainIdThat: number;
    excludeConnected: boolean;
    setChainIdThis: Dispatch<SetStateAction<number>>;
}

export const NetworkSelector: FC<NetworkSelectorProps> = ({
    name,
    setChainIdThis,
    excludeConnected,
}: NetworkSelectorProps) => {
    const { chain, chains } = useNetwork();
    const { switchNetwork } = useSwitchNetwork();

    const [clickCount, setClickCount] = useState(0);
    const [options, setOptions] = useState([{ id: 0, name: "" }]);

    useEffect(() => {
        setOptions(() => {
            return (
                excludeConnected && chain
                    ? chains.filter((_chain) => _chain.id != chain.id)
                    : chains
            ).map((c) => {
                return {
                    id: c.id,
                    name: c.name,
                };
            });
        });
    }, [clickCount]);

    const handleClick = () => setClickCount(clickCount + 1);

    return (
        <Dropdown
            placeholder={name}
            fluid
            selection
            options={options.map((value) => {
                return { key: value.id, text: value.name, value: value.id };
            })}
            onFocus={handleClick}
            onChange={(_, d) => {
                setChainIdThis(d.value as number);
                if (excludeConnected) return;
                switchNetwork?.(d.value as number);
            }}
        ></Dropdown>
    );
};
