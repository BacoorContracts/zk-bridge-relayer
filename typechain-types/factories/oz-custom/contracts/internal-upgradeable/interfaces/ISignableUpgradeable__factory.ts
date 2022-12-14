/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  ISignableUpgradeable,
  ISignableUpgradeableInterface,
} from "../../../../../oz-custom/contracts/internal-upgradeable/interfaces/ISignableUpgradeable";

const _abi = [
  {
    inputs: [],
    name: "Signable__InvalidSignature",
    type: "error",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender_",
        type: "address",
      },
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class ISignableUpgradeable__factory {
  static readonly abi = _abi;
  static createInterface(): ISignableUpgradeableInterface {
    return new utils.Interface(_abi) as ISignableUpgradeableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ISignableUpgradeable {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ISignableUpgradeable;
  }
}
