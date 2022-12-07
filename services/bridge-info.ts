import { BigNumber, BigNumberish } from "ethers";
import axios from "axios";

const storeBridgeInfo = async (
  commitment: string,
  token: string,
  fee: BigNumberish,
  value: BigNumberish,
  relayer: string
) => {
  // const bridge = new BridgeInfo({});
  const record = {
    commitment: commitment,
    token: token.toLowerCase(),
    fee: fee.toString(),
    value: value.toString(),
    relayer: relayer,
  };

  // const { data: bridgeInfos } = await axios({
  //   method: "get",
  //   url: "https://nft-card.w3w.app/api/bridge",
  // });
  // console.log(bridgeInfos);
  // return bridgeInfos;

  const { data: bridgeInfo } = await axios({
    method: "post",
    url: "https://nft-card.w3w.app/api/bridge",
    data: record,
  });

  return bridgeInfo;
  // Object.keys(record).forEach(
  //   (value) => (value = BigNumber.from(value).toString())
  // );
  // const record = {
  //   commitment: commitment,
  //   token: "tokenabc",
  //   fee: "1000",
  //   value: "1000",
  //   relayer: "relayer",
  // };
  // console.log({ BridgeInfo });
  // const data = await BridgeInfo.create(record);
  // console.log({ data });
  // const data = await axios({
  //   method: "get",
  //   url: "https://jsonplaceholder.typicode.com/comments",
  // });
  // console.log(data);
  // return data;
};

const getListBridgeInfo = async () => {
  const { data: bridgeInfoList } = await axios({
    method: "get",
    url: "https://nft-card.w3w.app/api/bridge",
  });
  return bridgeInfoList;
};
export { storeBridgeInfo, getListBridgeInfo };
