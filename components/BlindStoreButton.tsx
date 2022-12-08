import { SignatureLike } from "@ethersproject/bytes";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { Button, Input, Modal } from "semantic-ui-react";
import { useSigner } from "wagmi";
import { encryptNullifier } from "../utils/nullifier-utils";

interface IBlindStoreButton {
    nullifier: string;
    setPassphrase: Dispatch<SetStateAction<string>>;
}

export const BlindStoreButton: FC<IBlindStoreButton> = ({
    nullifier,
    setPassphrase,
}: IBlindStoreButton) => {
    const { data: signer } = useSigner();
    const [open, setOpen] = useState(false);
    const [mnemonic, setMnemonic] = useState("");
    const [disabled, setDisabled] = useState(false);

    return (
        <Modal
            style={{ width: "642px" }}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
                <Button style={{ height: "35.42px", width: "134px" }} compact>
                    Blind Save
                </Button>
            }
        >
            <Modal.Header>Sign a mnemonic</Modal.Header>
            <Modal.Content>
                <Input
                    type="text"
                    icon="lock"
                    iconPosition="left"
                    placeholder="Please enter easy to remember passphrase"
                    onChange={(_, d) => setMnemonic(d.value)}
                    style={{ width: "600px" }}
                ></Input>
            </Modal.Content>

            <Modal.Actions>
                <Button color="black" onClick={() => setOpen(false)}>
                    Cancel
                </Button>
                <Button
                    content="Sign"
                    disabled={disabled}
                    loading={disabled}
                    labelPosition="right"
                    icon="checkmark"
                    onClick={async () => {
                        setDisabled(true);
                        const signature = await signer?.signMessage(mnemonic);
                        const encryptedData = encryptNullifier(
                            mnemonic,
                            nullifier,
                            signature as SignatureLike
                        );

                        setDisabled(false);
                        console.log(signature);
                        console.log({ encryptedData });
                    }}
                    positive
                />
            </Modal.Actions>
        </Modal>
    );
};
