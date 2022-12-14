/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  BaseUpgradeable,
  BaseUpgradeableInterface,
} from "../../../contracts/internal-upgradeable/BaseUpgradeable";

const _abi = [
  {
    inputs: [],
    name: "Base__AlreadySet",
    type: "error",
  },
  {
    inputs: [],
    name: "Base__Unauthorized",
    type: "error",
  },
  {
    inputs: [],
    name: "ERC1967UpgradeUpgradeable__DelegateCallToNonContract",
    type: "error",
  },
  {
    inputs: [],
    name: "ERC1967UpgradeUpgradeable__ExecutionFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "ERC1967UpgradeUpgradeable__ImplementationIsNotContract",
    type: "error",
  },
  {
    inputs: [],
    name: "ERC1967UpgradeUpgradeable__ImplementationIsNotUUPS",
    type: "error",
  },
  {
    inputs: [],
    name: "ERC1967UpgradeUpgradeable__UnsupportedProxiableUUID",
    type: "error",
  },
  {
    inputs: [],
    name: "UUPSUpgradeable__OnlyActiveProxy",
    type: "error",
  },
  {
    inputs: [],
    name: "UUPSUpgradeable__OnlyCall",
    type: "error",
  },
  {
    inputs: [],
    name: "UUPSUpgradeable__OnlyDelegateCall",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract IAuthority",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "contract IAuthority",
        name: "to",
        type: "address",
      },
    ],
    name: "AuthorityUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "version",
        type: "uint256",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [],
    name: "authority",
    outputs: [
      {
        internalType: "contract IAuthority",
        name: "authority_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proxiableUUID",
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
        internalType: "contract IAuthority",
        name: "authority_",
        type: "address",
      },
    ],
    name: "updateAuthority",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ITreasury",
        name: "treasury_",
        type: "address",
      },
    ],
    name: "updateTreasury",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

export class BaseUpgradeable__factory {
  static readonly abi = _abi;
  static createInterface(): BaseUpgradeableInterface {
    return new utils.Interface(_abi) as BaseUpgradeableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BaseUpgradeable {
    return new Contract(address, _abi, signerOrProvider) as BaseUpgradeable;
  }
}
