import { Chain } from "wagmi";
import { bscTest, fuji } from "./status-provider";

export const TREE_HEIGHT = 20;

export const ZERO_VALUE =
    "21663839004416932945382355908790599225266501822907911457504978515578255421292";

export const EVENT_QUERY_BATCH_SIZE = 2048;

export const CONFIRMATION_BLOCKS = 2;

export const WASM_PATH = "/zk-proof/withdraw.wasm";

export const ZKEY_PATH = "/zk-proof/circuit_final.zkey";

export const BRIDGE = {
    43113: {
        97: "0x7af7F6758EE5f2a2136893D8e7ad468b00F95254",
    },

    97: {
        43113: "0x51Ca507109d3349544804234C952cFfB6e951598",
    },
} as { [key: number]: { [key: number]: string } };

export const DEPLOYED_BLOCK_NUM = {
    "0x7af7F6758EE5f2a2136893D8e7ad468b00F95254": 16642828,
    "0x51Ca507109d3349544804234C952cFfB6e951598": 25236041,
} as { [key: string]: number };

export const COMMAND_GATE = {
    43113: "0x94baFDF976129CC2A510b00ee1E43fbE98299231",
    97: "0x294D05eb93B7624E209e913A094d3B5a05D726B5",
} as { [key: number]: string };

export const CONNECT_STRING = "mongodb://127.0.0.1/bridge";

export const ERC721_INTERFACE_ID = "0x80ac58cd";

export const ERC20_INTERFACE_ID = "0x36372b07";

export const PROVIDER = {
    43113: fuji,
    97: bscTest,
} as { [key: number]: Chain };

export const RELAYER = "0xe3842aa0fd5128667516bddb9028e25c38e8469d";
