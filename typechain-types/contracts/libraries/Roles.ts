/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface RolesInterface extends utils.Interface {
  functions: {
    "FACTORY_ROLE()": FunctionFragment;
    "MINTER_ROLE()": FunctionFragment;
    "OPERATOR_ROLE()": FunctionFragment;
    "PAUSER_ROLE()": FunctionFragment;
    "PROXY_ROLE()": FunctionFragment;
    "SIGNER_ROLE()": FunctionFragment;
    "TREASURER_ROLE()": FunctionFragment;
    "UPGRADER_ROLE()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "FACTORY_ROLE"
      | "MINTER_ROLE"
      | "OPERATOR_ROLE"
      | "PAUSER_ROLE"
      | "PROXY_ROLE"
      | "SIGNER_ROLE"
      | "TREASURER_ROLE"
      | "UPGRADER_ROLE"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "FACTORY_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MINTER_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "OPERATOR_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "PAUSER_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "PROXY_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SIGNER_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "TREASURER_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "UPGRADER_ROLE",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "FACTORY_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "MINTER_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "OPERATOR_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "PAUSER_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "PROXY_ROLE", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "SIGNER_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "TREASURER_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "UPGRADER_ROLE",
    data: BytesLike
  ): Result;

  events: {};
}

export interface Roles extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: RolesInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    FACTORY_ROLE(overrides?: CallOverrides): Promise<[string]>;

    MINTER_ROLE(overrides?: CallOverrides): Promise<[string]>;

    OPERATOR_ROLE(overrides?: CallOverrides): Promise<[string]>;

    PAUSER_ROLE(overrides?: CallOverrides): Promise<[string]>;

    PROXY_ROLE(overrides?: CallOverrides): Promise<[string]>;

    SIGNER_ROLE(overrides?: CallOverrides): Promise<[string]>;

    TREASURER_ROLE(overrides?: CallOverrides): Promise<[string]>;

    UPGRADER_ROLE(overrides?: CallOverrides): Promise<[string]>;
  };

  FACTORY_ROLE(overrides?: CallOverrides): Promise<string>;

  MINTER_ROLE(overrides?: CallOverrides): Promise<string>;

  OPERATOR_ROLE(overrides?: CallOverrides): Promise<string>;

  PAUSER_ROLE(overrides?: CallOverrides): Promise<string>;

  PROXY_ROLE(overrides?: CallOverrides): Promise<string>;

  SIGNER_ROLE(overrides?: CallOverrides): Promise<string>;

  TREASURER_ROLE(overrides?: CallOverrides): Promise<string>;

  UPGRADER_ROLE(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    FACTORY_ROLE(overrides?: CallOverrides): Promise<string>;

    MINTER_ROLE(overrides?: CallOverrides): Promise<string>;

    OPERATOR_ROLE(overrides?: CallOverrides): Promise<string>;

    PAUSER_ROLE(overrides?: CallOverrides): Promise<string>;

    PROXY_ROLE(overrides?: CallOverrides): Promise<string>;

    SIGNER_ROLE(overrides?: CallOverrides): Promise<string>;

    TREASURER_ROLE(overrides?: CallOverrides): Promise<string>;

    UPGRADER_ROLE(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    FACTORY_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    MINTER_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    OPERATOR_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    PAUSER_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    PROXY_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    SIGNER_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    TREASURER_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    UPGRADER_ROLE(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    FACTORY_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    MINTER_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    OPERATOR_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    PAUSER_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    PROXY_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    SIGNER_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TREASURER_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    UPGRADER_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
