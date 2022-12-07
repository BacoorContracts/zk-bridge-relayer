import { Deposit } from "../types/deposit";
import { BigNumber, BigNumberish } from "ethers";
import { HashFunction } from "@zk-kit/incremental-merkle-tree";

export const createCommitment = (
  hasher: HashFunction,
  nullifier: BigNumberish
): string => {
  return BigNumber.from(hasher([nullifier, 0])).toString();
};

export const createNullifierHash = (
  hasher: HashFunction,
  nullifier: BigNumberish,
  leafIdx: number,
  token: string,
  value: BigNumberish
): string => {
  return BigNumber.from(
    hasher([nullifier, value, BigNumber.from(token).toString(), leafIdx])
  ).toString();
};
