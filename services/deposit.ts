import {
  CommandGate,
  ZKBridge__factory,
  CommandGate__factory,
  ZKBridge,
} from "../typechain-types";
import {
  ethers,
  Signer,
  Contract,
  BigNumber,
  BigNumberish,
  ContractTransaction,
} from "ethers";
import { BRIDGE, COMMAND_GATE, ERC721_INTERFACE_ID } from "../consts/const";
import Poseidon from "../utils/poseidon";
import { createCommitment } from "../utils/create-deposit";
import { Interface, randomBytes, defaultAbiCoder } from "ethers/lib/utils";
import { Dispatch, SetStateAction } from "react";

const deposit = async (
  signer: Signer,
  token: string,
  value: BigNumberish,
  chainIdTo: number,
  setStatus: Dispatch<SetStateAction<string>>
): Promise<{
  nullifier: string;
  commitment: string;
  tx: ContractTransaction;
  bridge: ZKBridge;
}> => {
  if (!(signer && token && value && chainIdTo)) {
    throw new Error("Invalid deposit input bro");
  }
  const chainIdFrom = await signer.getChainId();

  const commandGate: CommandGate = new Contract(
    COMMAND_GATE[chainIdFrom],
    CommandGate__factory.abi,
    signer
  ) as CommandGate;

  const IZKBridge: Interface = new Interface(ZKBridge__factory.abi);

  //  @to-do: need more entropy
  const nullifier: string = BigNumber.from(randomBytes(32)).toString();

  const abi = [
    "function decimals() external pure returns (uint256)",
    "function totalSupply() external view returns (uint256)",
    "function supportsInterface(bytes4 interfaceId_) public view returns (bool)",
    "function approve(address spender_, uint256 amount_) external returns (bool)",
    "function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) external",
  ];
  const tokenContract: Contract = new ethers.Contract(token, abi, signer);
  let commitment!: string;
  let tx!: ContractTransaction;
  try {
    const commitment = createCommitment(await Poseidon.init(), nullifier);

    if (token === ethers.constants.AddressZero) {
      setStatus("Depositing");
      tx = await commandGate
        .connect(signer)
        .depositNativeTokenWithCommand(
          BRIDGE[chainIdFrom][chainIdTo],
          IZKBridge.getSighash("deposit"),
          defaultAbiCoder.encode(
            ["address", "address", "uint256", "uint256"],
            [
              ethers.constants.AddressZero,
              ethers.constants.AddressZero,
              ethers.constants.Zero,
              commitment,
            ]
          )
        );
    } else {
      try {
        await tokenContract.supportsInterface(ERC721_INTERFACE_ID);
        setStatus("Depositing");
        tx = await tokenContract
          .connect(signer)
          .safeTransferFrom(
            await signer.getAddress(),
            commandGate.address,
            value,
            defaultAbiCoder.encode(
              ["address", "bytes4", "bytes"],
              [
                BRIDGE[chainIdFrom][chainIdTo],
                IZKBridge.getSighash("deposit"),
                defaultAbiCoder.encode(
                  ["address", "address", "uint256", "uint256"],
                  [
                    ethers.constants.AddressZero,
                    ethers.constants.AddressZero,
                    ethers.constants.Zero,
                    commitment,
                  ]
                ),
              ]
            )
          );
      } catch {
        try {
          await tokenContract.decimals();
          await tokenContract.totalSupply();

          setStatus("Approving");
          await tokenContract
            .connect(signer)
            .approve(commandGate.address, value)
            .then(async (tx: ContractTransaction) => await tx.wait())
            .catch((err: Error) => console.log(err));

          setStatus("Depositing");
          tx = await commandGate
            .connect(signer)
            .depositERC20WithCommand(
              token,
              value,
              IZKBridge.getSighash("deposit"),
              BRIDGE[chainIdFrom][chainIdTo],
              defaultAbiCoder.encode(
                ["address", "address", "uint256", "uint256"],
                [
                  ethers.constants.AddressZero,
                  ethers.constants.AddressZero,
                  ethers.constants.Zero,
                  commitment,
                ]
              )
            );
        } catch {
          throw new Error("UNSUPPORTED_TOKEN");
        }
      }
    }
  } catch (err) {
    throw err;
  }

  return {
    nullifier,
    commitment,
    tx,
    bridge: new Contract(
      BRIDGE[chainIdFrom][chainIdTo],
      ZKBridge__factory.abi,
      signer
    ) as ZKBridge,
  };
};

export default deposit;
