//  @ts-ignore
import { buildPoseidon } from "circomlibjs";
import { ethers, BigNumber, BigNumberish } from "ethers";
import { HashFunction } from "@zk-kit/incremental-merkle-tree";

export default class Poseidon {
    static INSTANCE: Poseidon;

    hasher: HashFunction;

    private constructor(hasher_: any) {
        this.hasher = hasher_;
    }

    static async init(): Promise<HashFunction> {
        if (!!!Poseidon.INSTANCE) {
            const poseidon = await buildPoseidon();
            const _hasher = (inputs: BigNumberish[]) => {
                const digest = poseidon(
                    inputs.map((x) => BigNumber.from(x).toBigInt())
                );
                const digestStr = poseidon.F.toString(digest);

                const digestHex = BigNumber.from(digestStr).toHexString();
                const bytes32 = ethers.utils.hexZeroPad(digestHex, 32);
                return bytes32;
            };
            Poseidon.INSTANCE = new Poseidon(_hasher);
        }
        return Poseidon.INSTANCE.hasher;
    }

    get instance(): HashFunction {
        return Poseidon.INSTANCE.hasher;
    }
}
