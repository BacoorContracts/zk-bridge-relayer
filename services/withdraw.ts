import {
    BRIDGE,
    WASM_PATH,
    ZKEY_PATH,
    ZERO_VALUE,
    TREE_HEIGHT,
    COMMAND_GATE,
    EVENT_QUERY_BATCH_SIZE,
    DEPLOYED_BLOCK_NUM,
} from "../consts/const";
//  @ts-ignore
//import plonk from "snarkjs";
const { plonk } = require("snarkjs");
import { Proof } from "../types/proof";
import { BridgeInfo } from "../models/bridge-info";
import { Witness } from "../types/witness";
import {
    ZKBridge,
    CommandGate,
    ZKBridge__factory,
    CommandGate__factory,
} from "../typechain-types";
import {
    defaultAbiCoder,
    hexZeroPad,
    Interface,
    parseEther,
} from "ethers/lib/utils";
import {
    BigNumber,
    BigNumberish,
    Contract,
    ContractReceipt,
    ethers,
    Signer,
} from "ethers";
import { createCommitment, createNullifierHash } from "../utils/create-deposit";
import { PoseidonBinaryMerkleTree } from "../utils/poseidon-binary-merkle-tree";
import { DepositedEvent } from "../typechain-types/contracts/interfaces/IZKBridge";
import {
    switchNetwork,
    fetchSigner,
    getAccount,
    connect,
    InjectedConnector,
} from "@wagmi/core";
import { Dispatch, SetStateAction } from "react";
import path from "path";

// const bridgeInfoOf = async (
//     commitment: string
// ): Promise<[string, string, string, string]> => {
//     const record = (await BridgeInfo.findOne(
//         { commitment: commitment },
//         { token: 1, value: 1 }
//     )) as { [key: string]: string };
//     return [record.token, record.value, record.fee, record.relayer];
// };

const prove = async (witness: Witness): Promise<[BigNumberish, string[]]> => {
    const wasmPath = path.join(process.cwd(), WASM_PATH);
    const zkeyPath = path.join(process.cwd(), ZKEY_PATH);
    console.log({ wasmPath, zkeyPath });
    const { proof, publicSignals } = await plonk.fullProve(
        witness,
        wasmPath,
        zkeyPath
    );

    console.log({ proof, publicSignals });
    // const res =  await plonk.exportSolidityCallData(proof, publicSignals);
    // console.log({res})
    //return data as Proof
    const callData = await plonk.exportSolidityCallData(proof, publicSignals);
    console.log({ callData });
    const [_proof] = callData.split(",", 1);
    console.log({ _proof });
    return [_proof, publicSignals];
};

const queryDepositEvents = async (
    bridgeFrom: ZKBridge,
    setStatus: Dispatch<SetStateAction<string>>
): Promise<DepositedEvent[]> => {
    const currentBlockNum =
        (await bridgeFrom.provider.getBlockNumber()) as number;

    let start = DEPLOYED_BLOCK_NUM[bridgeFrom.address];
    let events: DepositedEvent[] = [];
    while (start + EVENT_QUERY_BATCH_SIZE < currentBlockNum) {
        const batchEvents = await bridgeFrom.queryFilter(
            bridgeFrom.filters.Deposited(),
            start,
            start + EVENT_QUERY_BATCH_SIZE
        );

        console.log({ start: start, end: start + EVENT_QUERY_BATCH_SIZE });

        events = events.concat(batchEvents);
        setStatus(`Gathering ${events.length} leaves ...`);

        start += EVENT_QUERY_BATCH_SIZE + 1;
    }

    events = events.concat(
        await bridgeFrom.queryFilter(
            bridgeFrom.filters.Deposited(),
            start,
            "latest"
        )
    );

    //events = events.filter((value, index) => events.indexOf(value) == index);

    return events;
};

export const withdraw = async (
    signer: Signer,
    recipient: string,
    chainIdTo: number,
    chainIdFrom: number,
    nullifier: BigNumberish,
    setStatus: Dispatch<SetStateAction<string>>
): Promise<string> => {
    // const chaindIdTo: number = await signer.getChainId();

    const bridgeFrom: ZKBridge = new Contract(
        BRIDGE[chainIdFrom][chainIdTo],
        ZKBridge__factory.abi,
        signer
    ) as ZKBridge;

    const events = await queryDepositEvents(bridgeFrom, setStatus);
    const leaves = events
        .sort((a, b) => a.args.leafIdx.toNumber() - b.args.leafIdx.toNumber())
        .map((event) => event.args.commitment.toString());

    setStatus("Constructing merkle tree ...");
    const [tree, hasher] = await PoseidonBinaryMerkleTree(
        TREE_HEIGHT,
        ZERO_VALUE
    );
    const commitment = createCommitment(hasher, nullifier);
    const leafIdx = leaves.indexOf(commitment);
    if (leafIdx == -1) throw new Error("UNEXISTED_COMMITMENT");

    const depositEvent = events.filter(
        (v, _) => v.args.commitment.toString() == commitment
    )[0];

    console.log({ depositEvent });
    const [token, value, fee, relayer] = [
        depositEvent.args.token,
        depositEvent.args.value,
        parseEther("0.001"),
        "0x3F579e98e794B870aF2E53115DC8F9C4B2A1bDA6",
    ];

    // if (!!!value) throw new Error("COMMITMENT_NOT_FOUND");

    leaves.forEach((leaf) => tree.insert(leaf));

    setStatus("Creating merkle proof ...");
    const merkleProof = tree.createProof(leafIdx);

    const witness = {
        // public snark inputs
        root: BigNumber.from(merkleProof.root).toString(),
        value: value.toString(),
        token: token,
        nullifierHash: createNullifierHash(
            hasher,
            nullifier,
            leafIdx,
            token,
            value
        ),
        fee: fee.toString(),
        relayer: relayer,
        recipient: recipient,

        // private snark inputs
        nullifier: nullifier,
        pathIndices: merkleProof.pathIndices,
        pathElements: merkleProof.siblings.map((x) => [
            BigNumber.from(x[0]).toString(),
        ]),
    } as Witness;

    console.log({ witness });

    setStatus("Constructing ZK Proof ...");

    const [proof, inputs] = await prove(witness);
    const feeIdx = inputs.indexOf(witness.fee);
    inputs.splice(feeIdx, 1);
    let _inputs = inputs.map((v) => BigNumber.from(v).toHexString());

    console.log({ proof, _inputs });
    await switchNetwork({ chainId: chainIdTo });

    const _signer = (await fetchSigner({ chainId: chainIdTo })) as Signer;

    console.log({ _signer });

    const commandGate: CommandGate = new Contract(
        COMMAND_GATE[chainIdTo],
        CommandGate__factory.abi,
        _signer
    ) as CommandGate;

    const IZKBridge = new Interface(ZKBridge__factory.abi);
    let receipt!: ContractReceipt;
    let params = [
        BRIDGE[chainIdTo][chainIdFrom],
        IZKBridge.getSighash("withdraw"),
        defaultAbiCoder.encode(
            [
                "address",
                "address",
                "uint256",
                "tuple(uint256,uint256,address,uint256,address,address)",
                "bytes",
            ],
            [
                ethers.constants.AddressZero,
                ethers.constants.AddressZero,
                ethers.constants.Zero,
                _inputs,
                proof,
            ]
        ),
    ];
    console.log(params);
    await commandGate
        .connect(_signer)
        .depositNativeTokenWithCommand(
            BRIDGE[chainIdTo][chainIdFrom],
            IZKBridge.getSighash("withdraw"),
            defaultAbiCoder.encode(
                [
                    "address",
                    "address",
                    "uint256",
                    "tuple(uint256,uint256,address,uint256,address,address)",
                    "bytes",
                ],
                [
                    ethers.constants.AddressZero,
                    ethers.constants.AddressZero,
                    ethers.constants.Zero,
                    _inputs,
                    proof,
                ]
            ),
            { value: fee }
        )
        .then(async (tx) => (receipt = await tx.wait()))
        .catch((err) => {
            console.log(err);
        });

    return receipt.transactionHash;
};
