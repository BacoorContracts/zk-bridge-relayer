import {
    arrayify,
    SigningKey,
    hashMessage,
    recoverPublicKey,
} from "ethers/lib/utils.js";

import {
    encryptSafely,
    decryptSafely,
    EthEncryptedData,
    getEncryptionPublicKey,
} from "eth-sig-util";

const ascii85 = require("ascii85");

import { BytesLike, SignatureLike } from "@ethersproject/bytes";

const getPublicKey = (message: string, signature: SignatureLike): string => {
    return recoverPublicKey(arrayify(hashMessage(message)), signature);
};

const computeSharedWallet = (
    message: string,
    signature: SignatureLike
): SigningKey => {
    return new SigningKey(
        new SigningKey(
            process.env.NEXT_PUBLIC_RELAYER as BytesLike
        ).computeSharedSecret(getPublicKey(message, signature))
    );
};

export const encryptNullifier = (
    message: string,
    nullifier: string,
    signature: SignatureLike
) => {
    return encryptSafely(
        getEncryptionPublicKey(
            computeSharedWallet(message, signature).privateKey.slice(2)
        ),
        { data: ascii85.encode(nullifier).toString() },
        "x25519-xsalsa20-poly1305"
    );
};

export const decryptNullifier = (
    message: string,
    enc: EthEncryptedData,
    signature: SignatureLike
): string => {
    return ascii85
        .decode(
            decryptSafely(
                enc,
                computeSharedWallet(message, signature).privateKey.slice(2)
            )
        )
        .toString();
};
