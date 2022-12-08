import { parseEther } from "ethers/lib/utils.js";
import { Input, Label } from "semantic-ui-react";
import { Dispatch, FC, SetStateAction } from "react";

interface IValueInput {
    setValue: Dispatch<SetStateAction<string>>;
}

export const ValueInput: FC<IValueInput> = ({ setValue }: IValueInput) => {
    return (
        <Input
            onChange={(_, data) => setValue(parseEther(data.value).toString())}
            labelPosition="right"
            type="text"
            placeholder="Amount"
        >
            <Label basic>$</Label>
            <input />
        </Input>
    );
};
