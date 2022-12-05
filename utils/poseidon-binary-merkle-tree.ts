import {
    HashFunction,
    IncrementalMerkleTree,
} from "@zk-kit/incremental-merkle-tree";
import { BigNumberish } from "ethers";
import Poseidon from "./poseidon";

export const PoseidonBinaryMerkleTree = async (
    depth: number,
    zeroValue: BigNumberish
): Promise<[IncrementalMerkleTree, HashFunction]> => {
    const hasher: HashFunction = await Poseidon.init();
    return [new IncrementalMerkleTree(hasher, depth, zeroValue, 2), hasher];
};
