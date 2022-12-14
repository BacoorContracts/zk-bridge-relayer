/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../common";

export interface FundForwarderInterface extends utils.Interface {
  functions: {
    "recoverERC20(address,uint256)": FunctionFragment;
    "recoverNative()": FunctionFragment;
    "vault()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "recoverERC20" | "recoverNative" | "vault"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "recoverERC20",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "recoverNative",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "vault", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "recoverERC20",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "recoverNative",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "vault", data: BytesLike): Result;

  events: {
    "Forwarded(address,uint256)": EventFragment;
    "VaultUpdated(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Forwarded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "VaultUpdated"): EventFragment;
}

export interface ForwardedEventObject {
  from: string;
  amount: BigNumber;
}
export type ForwardedEvent = TypedEvent<
  [string, BigNumber],
  ForwardedEventObject
>;

export type ForwardedEventFilter = TypedEventFilter<ForwardedEvent>;

export interface VaultUpdatedEventObject {
  from: string;
  to: string;
}
export type VaultUpdatedEvent = TypedEvent<
  [string, string],
  VaultUpdatedEventObject
>;

export type VaultUpdatedEventFilter = TypedEventFilter<VaultUpdatedEvent>;

export interface FundForwarder extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: FundForwarderInterface;

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
    recoverERC20(
      token_: PromiseOrValue<string>,
      amount_: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    recoverNative(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    vault(overrides?: CallOverrides): Promise<[string]>;
  };

  recoverERC20(
    token_: PromiseOrValue<string>,
    amount_: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  recoverNative(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  vault(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    recoverERC20(
      token_: PromiseOrValue<string>,
      amount_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    recoverNative(overrides?: CallOverrides): Promise<void>;

    vault(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "Forwarded(address,uint256)"(
      from?: PromiseOrValue<string> | null,
      amount?: PromiseOrValue<BigNumberish> | null
    ): ForwardedEventFilter;
    Forwarded(
      from?: PromiseOrValue<string> | null,
      amount?: PromiseOrValue<BigNumberish> | null
    ): ForwardedEventFilter;

    "VaultUpdated(address,address)"(
      from?: PromiseOrValue<string> | null,
      to?: PromiseOrValue<string> | null
    ): VaultUpdatedEventFilter;
    VaultUpdated(
      from?: PromiseOrValue<string> | null,
      to?: PromiseOrValue<string> | null
    ): VaultUpdatedEventFilter;
  };

  estimateGas: {
    recoverERC20(
      token_: PromiseOrValue<string>,
      amount_: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    recoverNative(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    vault(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    recoverERC20(
      token_: PromiseOrValue<string>,
      amount_: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    recoverNative(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    vault(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
