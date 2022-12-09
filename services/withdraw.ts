import {
    BRIDGE,
    ZERO_VALUE,
    TREE_HEIGHT,
    COMMAND_GATE,
    EVENT_QUERY_BATCH_SIZE,
    DEPLOYED_BLOCK_NUM,
} from "../consts/const";
//  @ts-ignore
//import plonk from "snarkjs";
const { plonk } = require("snarkjs");
import { Witness } from "../types/witness";
import {
    ZKBridge,
    CommandGate,
    ZKBridge__factory,
    CommandGate__factory,
} from "../typechain-types";
import { defaultAbiCoder, Interface, parseEther } from "ethers/lib/utils";
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
import { switchNetwork, fetchSigner } from "@wagmi/core";
import { Dispatch, SetStateAction } from "react";

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

        events = events.concat(batchEvents);
        setStatus(`Gathering ${events.length} leaves ...`);

        start += EVENT_QUERY_BATCH_SIZE + 1;
    }

    events = events.concat(
        await bridgeFrom.queryFilter(
            bridgeFrom.filters.Deposited(),
            start,
            currentBlockNum
        )
    );

    return events;
};

export const withdraw = async (
    signer: Signer,
    recipient: string,
    chainIdTo: number,
    chainIdFrom: number,
    nullifier: BigNumberish,
    setStatus: Dispatch<SetStateAction<string>>,
    setLinkStatus: Dispatch<SetStateAction<string>>
): Promise<string> => {
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

    const [token, value, fee, relayer] = [
        depositEvent.args.token,
        depositEvent.args.value,
        parseEther("0.001"),
        "0x3F579e98e794B870aF2E53115DC8F9C4B2A1bDA6",
    ];

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

    const url = "https://nft-card.w3w.app/api/bridge/withdraw/prove";
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ witness }),
        headers: { "Content-Type": "application/json" },
    })
        .then((v) => v)
        .catch((_) => setStatus("Failed to construct proof"));

    const { data } = await response?.json();
    const { proof, publicSignals: inputs } = data;
    console.log({ proof, inputs });
    const callData = await plonk.exportSolidityCallData(proof, inputs);
    const [_proof] = callData.split(",", 1);

    const feeIdx = inputs.indexOf(witness.fee);
    inputs.splice(feeIdx, 1);
    let _inputs = inputs.map((v: any) => BigNumber.from(v).toHexString());

    const network = await switchNetwork({ chainId: chainIdTo });

    const _signer = await fetchSigner({ chainId: chainIdTo });

    const commandGate: CommandGate = new Contract(
        COMMAND_GATE[chainIdTo],
        CommandGate__factory.abi,
        _signer as Signer
    ) as CommandGate;

    setStatus("Withdrawing ...");
    const IZKBridge = new Interface(ZKBridge__factory.abi);
    let receipt!: ContractReceipt;
    await commandGate
        .connect(_signer as Signer)
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
                    _proof,
                ]
            ),
            { value: fee }
        )
        .then(async (tx) => (receipt = await tx.wait()))
        .catch((err) => {
            setStatus("Withdraw failed");
            throw err;
        })
        .finally(() => {
            setStatus("Withdrawal successful.");
            console.log({ receipt });
            setLinkStatus(
                `${network.blockExplorers?.default.url}/tx/${receipt.transactionHash}`
            );
        });

    return receipt.transactionHash;
};
