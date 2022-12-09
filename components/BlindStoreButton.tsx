import { SignatureLike } from "@ethersproject/bytes";
import { EthEncryptedData } from "eth-sig-util";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { Button, Input, Message, Modal } from "semantic-ui-react";
import { useSigner } from "wagmi";
import { decryptNullifier, encryptNullifier } from "../utils/nullifier-utils";

interface IBlindStoreButton {
    nullifier: string;
    setPassphrase: Dispatch<SetStateAction<string>>;
}

const setToStorage = (key: string, value: EthEncryptedData): boolean => {
    if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value));
        return true;
    }
    return false;
};

const getFromStorage = (key: string): EthEncryptedData | undefined => {
    if (typeof window !== "undefined") {
        const data = window.localStorage.getItem(key);
        if (!data) return undefined;
        return JSON.parse(data as string) as EthEncryptedData;
    }
    return undefined;
};

export const BlindStoreButton: FC<IBlindStoreButton> = ({
    nullifier,
    setPassphrase,
}: IBlindStoreButton) => {
    const { data: signer } = useSigner();
    const [open, setOpen] = useState(false);
    const [mnemonic, setMnemonic] = useState("");
    const [message, setMessage] = useState("");
    const [encryptDisabled, setEncryptDisabled] = useState(false);
    const [decryptDisabled, setDecrpytDisabled] = useState(false);

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
            <Modal.Header>Nulifier Encrypt/Decrypt</Modal.Header>
            <Modal.Content>
                <Input
                    type="text"
                    icon="lock"
                    iconPosition="left"
                    placeholder="Please enter easy to remember passphrase"
                    onChange={(_, d) => setMnemonic(d.value)}
                    style={{ width: "600px" }}
                ></Input>
                <Message error={message.includes("Error")}>{message}</Message>
            </Modal.Content>

            <Modal.Actions>
                <Button color="black" onClick={() => setOpen(false)}>
                    Close
                </Button>

                <Button.Group>
                    <Button
                        content="Decrypt"
                        labelPosition="right"
                        icon="key"
                        negative
                        disabled={decryptDisabled}
                        loading={decryptDisabled}
                        onClick={async () => {
                            setDecrpytDisabled(true);

                            if (!mnemonic) {
                                setDecrpytDisabled(false);
                                setMessage("Error: MNEMONIC is empty!");
                                return;
                            }

                            const signature = (await signer
                                ?.signMessage(mnemonic)
                                .then((v) => {
                                    setMessage(`Signature: ${v}`);
                                    return v;
                                })
                                .catch((err) => {
                                    console.log(err);
                                    setMessage("Error: Denied by client");
                                    setDecrpytDisabled(false);
                                    return;
                                })) as SignatureLike;

                            const encryptedData = getFromStorage(
                                (await signer?.getAddress()) as string
                            );
                            if (!encryptedData) {
                                setMessage("Error: Secret Not found");
                                return;
                            }

                            const nullifier = decryptNullifier(
                                mnemonic,
                                encryptedData as EthEncryptedData,
                                signature
                            );

                            setMessage(`Nullifier: ${nullifier}`);
                            setDecrpytDisabled(false);
                        }}
                    ></Button>

                    <Button.Or></Button.Or>
                    
                    <Button
                        content="Encrypt"
                        disabled={encryptDisabled}
                        loading={encryptDisabled}
                        labelPosition="right"
                        icon="key"
                        onClick={async () => {
                            setEncryptDisabled(true);

                            if (!mnemonic || !nullifier) {
                                setMessage(
                                    "Error: mnemonic or nullifier is empty!"
                                );
                                setEncryptDisabled(false);
                                return;
                            }
                            const signature = await signer
                                ?.signMessage(mnemonic)
                                .catch((err) => {
                                    console.log(err);
                                    setMessage("Error: Denied by client");
                                    setEncryptDisabled(false);
                                    return;
                                })
                                .then((v) => {
                                    setMessage(`Signature: ${v}`);
                                    return v;
                                });

                            const encryptedData = encryptNullifier(
                                mnemonic,
                                nullifier,
                                signature as SignatureLike
                            );

                            const res = setToStorage(
                                (await signer?.getAddress()) as string,
                                encryptedData
                            );

                            if (!res) {
                                setMessage(
                                    "Error: Failed to Store Secret to Browser."
                                );
                            }

                            setEncryptDisabled(false);
                            console.log(signature);
                            console.log({ encryptedData });
                        }}
                        positive
                    />
                </Button.Group>
            </Modal.Actions>
        </Modal>
    );
};
