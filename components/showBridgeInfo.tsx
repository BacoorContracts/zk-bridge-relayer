import { useState, useEffect } from "react";
import { IBridgeInfo } from "../models/bridge-info";
import { getListBridgeInfo } from "../services/bridge-info";
function ShowBridgeInfos() {
  const [bridgeInfoList, setBridgeInfoList] = useState([]);
  useEffect(() => {
    const getList = async () => {
      const list = await getListBridgeInfo();
      setBridgeInfoList(list.data.slice(0, 10));
    };
    getList();
  }, []);

  return (
    <div>
      <table>
        <tr>
          <th>Index</th>
          <th>Commitment</th>
          <th>Token</th>
          <th>Fee</th>
          <th>Value</th>
          <th>Relayer</th>
        </tr>
        {bridgeInfoList.map((bridgeInfo: IBridgeInfo, index) => (
          <tr key={index}>
            <td>{index}</td>
            <td>{bridgeInfo.commitment}</td>
            <td>{bridgeInfo.token}</td>
            <td>{bridgeInfo.fee}</td>
            <td>{bridgeInfo.value}</td>
            <td>{bridgeInfo.relayer}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default ShowBridgeInfos;
