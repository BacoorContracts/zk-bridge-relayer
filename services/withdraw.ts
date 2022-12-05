import {
    BRIDGE,
    WASM_PATH,
    ZKEY_PATH,
    ZERO_VALUE,
    TREE_HEIGHT,
    COMMAND_GATE,
    EVENT_QUERY_BATCH_SIZE,
} from "../consts/const";
//  @ts-ignore
import { plonk } from "snarkjs";
import { Proof } from "../types/proof";
import { BridgeInfo } from "../models";
import { Witness } from "../types/witness";
import {
    ZKBridge,
    CommandGate,
    ZKBridge__factory,
    CommandGate__factory,
} from "../typechain-types";
import { defaultAbiCoder, Interface } from "ethers/lib/utils";
import { BigNumber, BigNumberish, Contract, Signer } from "ethers";
import { createCommitment, createNullifierHash } from "../utils/create-deposit";
import { PoseidonBinaryMerkleTree } from "../utils/poseidon-binary-merkle-tree";
import { DepositedEvent } from "../typechain-types/contracts/interfaces/IZKBridge";

const bridgeInfoOf = async (
    commitment: string
): Promise<[string, string, string, string]> => {
    const record = (await BridgeInfo.findOne(
        { commitment: commitment },
        { token: 1, value: 1 }
    )) as { [key: string]: string };
    return [record.token, record.value, record.fee, record.relayer];
};

const prove = async (witness: Witness): Promise<Proof> => {
    const { proof, publicSignals } = await plonk.fullProve(
        witness,
        WASM_PATH,
        ZKEY_PATH
    );
    return (await plonk.exportSolidityCallData(proof, publicSignals)) as Proof;
};

const queryDepositEvents = async (
    bridgeFrom: ZKBridge
): Promise<DepositedEvent[]> => {
    const signer = bridgeFrom.signer;
    const currentBlockNum = (await signer.provider?.getBlockNumber()) as number;
    const deployedBlockNum = bridgeFrom.deployTransaction.blockNumber as number;

    const numBatches =
        (currentBlockNum - deployedBlockNum) / EVENT_QUERY_BATCH_SIZE;
    const cursors = Array.from(Array(numBatches).keys()).map(
        (cursor) => cursor * EVENT_QUERY_BATCH_SIZE + deployedBlockNum
    );

    let events!: DepositedEvent[];
    cursors.forEach(async (_, index) => {
        events = events.concat(
            await bridgeFrom.queryFilter(
                bridgeFrom.filters.Deposited(),
                index,
                index + EVENT_QUERY_BATCH_SIZE
            )
        );
    });

    return events;
};

export const withdraw = async (
    signer: Signer,
    recipient: string,
    chainIdFrom: number,
    nullifier: BigNumberish
) => {
    const chaindIdTo: number = await signer.getChainId();

    const bridgeFrom: ZKBridge = new Contract(
        BRIDGE[chainIdFrom][chaindIdTo],
        ZKBridge__factory.abi,
        signer
    ) as ZKBridge;

    const events = await queryDepositEvents(bridgeFrom);

    const leaves = events
        .sort((a, b) => a.args.leafIdx.toNumber() - b.args.leafIdx.toNumber())
        .map((event) => event.args.commitment.toString());

    const [tree, hasher] = await PoseidonBinaryMerkleTree(
        TREE_HEIGHT,
        ZERO_VALUE
    );
    const commitment = createCommitment(hasher, nullifier);
    const leafIdx = leaves.indexOf(commitment);
    if (leafIdx == -1) throw new Error("UNEXISTED_COMMITMENT");

    const [token, value, fee, relayer] = await bridgeInfoOf(commitment);

    if (!!!value) throw new Error("COMMITMENT_NOT_FOUND");

    leaves.forEach((leaf) => tree.insert(leaf));

    const merkleProof = tree.createProof(leafIdx);

    const witness = {
        // public snark inputs
        root: BigNumber.from(merkleProof.root).toString(),
        value: value,
        token: token,
        nullifierHash: createNullifierHash(
            hasher,
            nullifier,
            leafIdx,
            token,
            value
        ),
        fee: fee,
        relayer: relayer,
        recipient: recipient,

        // private snark inputs
        nullifier: nullifier,
        pathIndices: merkleProof.pathIndices,
        pathElements: merkleProof.siblings.map((x) => [
            BigNumber.from(x[0]).toString(),
        ]),
    } as Witness;

    const { proof, inputs } = await prove(witness);

    const commandGate: CommandGate = new Contract(
        COMMAND_GATE[chaindIdTo],
        CommandGate__factory.abi,
        signer
    ) as CommandGate;

    const IZKBridge = new Interface(ZKBridge__factory.abi);
    await commandGate
        .connect(signer)
        .depositNativeTokenWithCommand(
            BRIDGE[chaindIdTo][chainIdFrom],
            IZKBridge.getSighash("witdraw"),
            defaultAbiCoder.encode(
                [IZKBridge.structs.InputStruct, "bytes"],
                [inputs, proof]
            )
        )
        .then(async (tx) => await tx.wait())
        .catch((err) => console.log(err));
};
