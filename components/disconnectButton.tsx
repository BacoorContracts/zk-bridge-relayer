import { Button } from "semantic-ui-react";
import { useDisconnect } from "wagmi";

const DisconnectButton = () => {
    const { disconnect } = useDisconnect({
        onSuccess(data) {
            console.log("Success", data);
        },
    });

    return <Button content="Disconnect" onClick={() => disconnect()}></Button>;
};

export default DisconnectButton;
