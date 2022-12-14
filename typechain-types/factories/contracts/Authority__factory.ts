/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Authority, AuthorityInterface } from "../../contracts/Authority";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "AccessControl__RoleMissing",
    type: "error",
  },
  {
    inputs: [],
    name: "AccessControl__Unauthorized",
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
    name: "Initializable__AlreadyInitialized",
    type: "error",
  },
  {
    inputs: [],
    name: "Initializable__NotInitializing",
    type: "error",
  },
  {
    inputs: [],
    name: "Pausable__NotPaused",
    type: "error",
  },
  {
    inputs: [],
    name: "Pausable__Paused",
    type: "error",
  },
  {
    inputs: [],
    name: "ProxyChecker__EOAUnallowed",
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
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Blacklisted",
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
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "proxy",
        type: "address",
      },
    ],
    name: "ProxyAccessGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Whitelisted",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
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
    inputs: [],
    name: "VERSION",
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
        internalType: "bytes32",
        name: "role_",
        type: "bytes32",
      },
    ],
    name: "getAllRoleMembers",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getRoleMember",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleMemberCount",
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
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account_",
        type: "address",
      },
    ],
    name: "isBlacklisted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "requestAccess",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "adminRole",
        type: "bytes32",
      },
    ],
    name: "setRoleAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account_",
        type: "address",
      },
      {
        internalType: "bool",
        name: "status_",
        type: "bool",
      },
    ],
    name: "setUserStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
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

const _bytecode =
  "0x60a06040523060805234801561001457600080fd5b50608051611c6d61004c6000396000818161063f01528181610699015281816107ca0152818161082401526109130152611c6d6000f3fe6080604052600436106101755760003560e01c8063841fb503116100cb578063a6fa0cb41161007f578063e1c7392a11610059578063e1c7392a146103fb578063fe575a8714610410578063ffa1ad741461043057600080fd5b8063a6fa0cb41461038e578063ca15c873146103bb578063d547741f146103db57600080fd5b80639010d07c116100b05780639010d07c1461031457806391d1485414610359578063a217fddf1461037957600080fd5b8063841fb503146102df5780638456cb59146102ff57600080fd5b806336568abe1161012d5780634f1ef286116101075780634f1ef286146102a257806352d1902d146102b55780635c975abb146102ca57600080fd5b806336568abe1461024d5780633659cfe61461026d5780633f4ba83a1461028d57600080fd5b806321eceff71161015e57806321eceff7146101d1578063248a9ca3146101f15780632f2ff15d1461022d57600080fd5b806301ffc9a71461017a5780631e4e0091146101af575b600080fd5b34801561018657600080fd5b5061019a61019536600461192e565b610464565b60405190151581526020015b60405180910390f35b3480156101bb57600080fd5b506101cf6101ca366004611970565b6104c0565b005b3480156101dd57600080fd5b506101cf6101ec3660046119bb565b6104da565b3480156101fd57600080fd5b5061021f61020c3660046119f7565b6000908152610160602052604090205490565b6040519081526020016101a6565b34801561023957600080fd5b506101cf610248366004611a10565b6105a8565b34801561025957600080fd5b506101cf610268366004611a10565b6105cb565b34801561027957600080fd5b506101cf610288366004611a3c565b610628565b34801561029957600080fd5b506101cf610781565b6101cf6102b0366004611a86565b6107b3565b3480156102c157600080fd5b5061021f6108f9565b3480156102d657600080fd5b5061019a61098f565b3480156102eb57600080fd5b506101cf6102fa3660046119f7565b6109a2565b34801561030b57600080fd5b506101cf610a60565b34801561032057600080fd5b5061033461032f366004611970565b610a92565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016101a6565b34801561036557600080fd5b5061019a610374366004611a10565b610ab2565b34801561038557600080fd5b5061021f600081565b34801561039a57600080fd5b506103ae6103a93660046119f7565b610ad4565b6040516101a69190611b66565b3480156103c757600080fd5b5061021f6103d63660046119f7565b610aef565b3480156103e757600080fd5b506101cf6103f6366004611a10565b610b07565b34801561040757600080fd5b506101cf610b2a565b34801561041c57600080fd5b5061019a61042b366004611a3c565b610d5c565b34801561043c57600080fd5b5061021f7f095dd5e04e0f3f5bce98e4ee904d9f7209827187c4201f036596b2f7fdd602e781565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167ffcff14bb0000000000000000000000000000000000000000000000000000000014806104ba57506104ba82610d94565b92915050565b60006104cb81610e2b565b6104d58383610e35565b505050565b6104e2610e85565b7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a61050c81610e2b565b6105168383610ec5565b81156105625760405173ffffffffffffffffffffffffffffffffffffffff8416907fffa4e6181777692565cf28528fc88fd1516ea86b56da075235fa575af6a4b85590600090a2505050565b60405173ffffffffffffffffffffffffffffffffffffffff8416907faab7954e9d246b167ef88aeddad35209ca2489d95a8aeb59e288d9b19fae5a5490600090a2505050565b600082815261016060205260409020546105c181610e2b565b6104d58383610ef1565b73ffffffffffffffffffffffffffffffffffffffff8116331461061a576040517f7f62d52100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6106248282610f14565b5050565b73ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000163003610697576040517ff96c3be000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1661070c7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5473ffffffffffffffffffffffffffffffffffffffff1690565b73ffffffffffffffffffffffffffffffffffffffff1614610759576040517f7860576200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61076281610f37565b6040805160008082526020820190925261077e91839190610f61565b50565b7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a6107ab81610e2b565b61077e6110b4565b73ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000163003610822576040517ff96c3be000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166108977f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5473ffffffffffffffffffffffffffffffffffffffff1690565b73ffffffffffffffffffffffffffffffffffffffff16146108e4576040517f7860576200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6108ed82610f37565b61062482826001610f61565b60003073ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000161461096a576040517ff2e149be00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b507f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc90565b600061099d60985460021490565b905090565b6109aa61110e565b326109d57f97667070c54ef182b0f5858b034beac1b6f3089aa2d3188bb1e8929f4fa9b9298261114d565b336109e081836111b0565b610a0a7f77d72916e966418e6dc58a19999ae9934bef3f749f1547cde0a86e809f19c89b82610ef1565b8215610a1a57610a1a8382610ef1565b60405173ffffffffffffffffffffffffffffffffffffffff8216907f3f763506fa14cf4e277418ce38e2bab16f2e334f42487448695cf0633cd1491790600090a2505050565b7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a610a8a81610e2b565b61077e611224565b600082815261019260205260408120610aab9083611258565b9392505050565b6000610aab8373ffffffffffffffffffffffffffffffffffffffff841661126d565b6000818152610192602052604090206060906104ba9061128a565b6000818152610192602052604081206104ba906112e8565b60008281526101606020526040902054610b2081610e2b565b6104d58383610f14565b6001546000546002909114801591908290610b43575080155b80610b585750806001148015610b585750303b155b610b8e576040517f2e8adaaa00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60016000558115610b9f5760026001555b610ba76112f2565b33610bb3600082610ef1565b610bdd7fe2f4eaae4a9751e85a3e4a7b9587827a877f29914755229b07a7b2da98285f7082610ef1565b610c077f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a82610ef1565b610c317f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a682610ef1565b610c5b7f97667070c54ef182b0f5858b034beac1b6f3089aa2d3188bb1e8929f4fa9b92982610ef1565b610c857f189ab7a9244df0848122154315af71fe140f3db0fe014031783b0946b8c9d2e382610ef1565b610ccf7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a7f97667070c54ef182b0f5858b034beac1b6f3089aa2d3188bb1e8929f4fa9b929610e35565b610d197f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a67f97667070c54ef182b0f5858b034beac1b6f3089aa2d3188bb1e8929f4fa9b929610e35565b5081156106245760018080556040519081527fbe9b076dc5b65990cca9dd9d7366682482e7817a6f6bc7f4faf4dc32af497f329060200160405180910390a15050565b72ffffffffffffffffffffffffffffffffffffff600882901c16600090815260fc6020526040812054600160ff84161b1615156104ba565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167fdb7226d40000000000000000000000000000000000000000000000000000000014806104ba57507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316146104ba565b61077e813361114d565b60008281526101606020526040902054819060405184907fbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff90600090a46000918252610160602052604090912055565b610e8d61098f565b610ec3576040517f59488a5a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b610624610ee88373ffffffffffffffffffffffffffffffffffffffff1660601b90565b60fc9083611335565b610efb8282611384565b6000828152610192602052604090206104d590826113f2565b610f1e82826113ff565b6000828152610192602052604090206104d5908261146d565b7f189ab7a9244df0848122154315af71fe140f3db0fe014031783b0946b8c9d2e361062481610e2b565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff1615610f94576104d58361147a565b8273ffffffffffffffffffffffffffffffffffffffff166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015611019575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820190925261101691810190611bc0565b60015b61104f576040517f38622d4300000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc81146110a8576040517f14edfa8000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b506104d583838361152e565b6110bc610e85565b60016098557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390a1565b61111661098f565b15610ec3576040517f059519da00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6111578282610ab2565b610624576040517f480b08dc0000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff8216602482015260440160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff8181169083161480156111ed575073ffffffffffffffffffffffffffffffffffffffff82163b155b15610624576040517f14b1706900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61122c61110e565b60026098557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258336110e4565b6000806112658484611559565b949350505050565b60008181526101616020526040812054600160ff85161b16610aab565b606060006112978361157a565b90506000815167ffffffffffffffff8111156112b5576112b5611a57565b6040519080825280602002602001820160405280156112de578160200160208202803683370190505b5091949350505050565b60006104ba825490565b60015460021461132e576040517f8b4188b300000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6001609855565b801561135f57600882901c60009081526020849052604090208054600160ff85161b179055505050565b600882901c60009081526020849052604090208054600160ff85161b19169055505050565b6113a48273ffffffffffffffffffffffffffffffffffffffff83166115c3565b1561062457604051339073ffffffffffffffffffffffffffffffffffffffff83169084907f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d90600090a45050565b6000816112658482611600565b61141f8273ffffffffffffffffffffffffffffffffffffffff8316611643565b1561062457604051339073ffffffffffffffffffffffffffffffffffffffff83169084907ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b90600090a45050565b6000816112658482611675565b73ffffffffffffffffffffffffffffffffffffffff81163b6114c8576040517f2390ec9c00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc80547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b611537836116db565b6000825111806115445750805b156104d5576115538383611728565b50505050565b60008260010182610100811061157157611571611bd9565b01549392505050565b604080516120008101918290526060916000919060018501906101009082845b81548152602001906001019080831161159a5750508654939450610aab938593509150506117f8565b60006115cf838361126d565b6115f7576000828152610161602052604090208054600160ff86161b1790555b5060016104ba565b50600092915050565b600061160c83836118b8565b61163b57816001840160ff8216610100811061162a5761162a611bd9565b0155508154600190810183556104ba565b5060006104ba565b600061164f838361126d565b156115f7576000828152610161602052604090208054600160ff86161b191690556115ef565b600080826001850160ff8216610100811061169257611692611bd9565b0154146116a05760006116a5565b60ff83165b905080156116d1576000846001018261010081106116c5576116c5611bd9565b015550600190506104ba565b60009150506104ba565b6116e48161147a565b60405173ffffffffffffffffffffffffffffffffffffffff8216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b606073ffffffffffffffffffffffffffffffffffffffff83163b611778576040517f233b521600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000808473ffffffffffffffffffffffffffffffffffffffff16846040516117a09190611c08565b600060405180830381855af49150503d80600081146117db576040519150601f19603f3d011682016040523d82523d6000602084013e6117e0565b606091505b50915091506117ef82826118de565b95945050505050565b60608167ffffffffffffffff81111561181357611813611a57565b60405190808252806020026020018201604052801561183c578160200160208202803683370190505b5090506101006000805b828110156118af578581610100811061186157611861611bd9565b6020020151156118a7578581610100811061187e5761187e611bd9565b6020020151845160018401938691811061189a5761189a611bd9565b6020026020010181815250505b600101611846565b50505092915050565b6000816001840160ff821661010081106118d4576118d4611bd9565b0154149392505050565b606082156118ed5750806104ba565b8151156118fc57815182602001fd5b6040517f59636df400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006020828403121561194057600080fd5b81357fffffffff0000000000000000000000000000000000000000000000000000000081168114610aab57600080fd5b6000806040838503121561198357600080fd5b50508035926020909101359150565b803573ffffffffffffffffffffffffffffffffffffffff811681146119b657600080fd5b919050565b600080604083850312156119ce57600080fd5b6119d783611992565b9150602083013580151581146119ec57600080fd5b809150509250929050565b600060208284031215611a0957600080fd5b5035919050565b60008060408385031215611a2357600080fd5b82359150611a3360208401611992565b90509250929050565b600060208284031215611a4e57600080fd5b610aab82611992565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60008060408385031215611a9957600080fd5b611aa283611992565b9150602083013567ffffffffffffffff80821115611abf57600080fd5b818501915085601f830112611ad357600080fd5b813581811115611ae557611ae5611a57565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f01168101908382118183101715611b2b57611b2b611a57565b81604052828152886020848701011115611b4457600080fd5b8260208601602083013760006020848301015280955050505050509250929050565b6020808252825182820181905260009190848201906040850190845b81811015611bb457835173ffffffffffffffffffffffffffffffffffffffff1683529284019291840191600101611b82565b50909695505050505050565b600060208284031215611bd257600080fd5b5051919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6000825160005b81811015611c295760208186018101518583015201611c0f565b50600092019182525091905056fea26469706673582212209630d18a438a22ca95ca878e522504396147df1af62cbfa4b282647c4143950664736f6c63430008110033";

type AuthorityConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AuthorityConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Authority__factory extends ContractFactory {
  constructor(...args: AuthorityConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Authority> {
    return super.deploy(overrides || {}) as Promise<Authority>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Authority {
    return super.attach(address) as Authority;
  }
  override connect(signer: Signer): Authority__factory {
    return super.connect(signer) as Authority__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AuthorityInterface {
    return new utils.Interface(_abi) as AuthorityInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Authority {
    return new Contract(address, _abi, signerOrProvider) as Authority;
  }
}
