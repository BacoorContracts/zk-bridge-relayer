import { useDisconnect } from "wagmi";
const DisconnectButton = () => {
  const { disconnect } = useDisconnect({
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  return (
    <button className={"disconnectBtn"} onClick={() => disconnect()}>
      Disconnect
    </button>
  );
};

export default DisconnectButton;
