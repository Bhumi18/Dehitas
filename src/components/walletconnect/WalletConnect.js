import { useState, useEffect, useRef } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useSigner,
} from "wagmi";
import Cookies from "universal-cookie";
import axios from "axios";

// import { Client } from "@xmtp/xmtp-js";
import Meta from "../assets/images/MetaMask.svg";
import Coin from "../assets/images/Coinbase.svg";
import WallConn from "../assets/images/walletconnect.svg";
import NewPopup from "./NewPopup";
import "./walletconnect.css";
import { useNavigate } from "react-router-dom";
import LoadingIcon from "./LoadingIcon";

export function WalletConnect() {
  const { address, connector, isConnected } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ addressOrName: address });
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  const cookies = new Cookies();

  const inputRef = useRef();
  const navigate = useNavigate();
  const { data } = useSigner();

  const [walletLogo] = useState([Meta, Coin, WallConn]);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    if (isConnected) {
      getStage(address);
    }
  }, [isConnected]);

  var userData = "";

  const getStage = (addre) => {
    console.log(addre);
    var data = JSON.stringify({
      walletaddress: addre,
    });

    var config = {
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/getStage?walletaddress=${addre}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        // console.log(response.data);
        userData = response.data;
        console.log(userData);
        cookies.set("loginID", userData.login_id);

        if (userData.stage === 0) {
          navigate("/signup/ev");
        } else if (userData.stage === 1) {
          navigate("/email-verification");
        } else if (userData.stage === 2) {
          navigate("/role");
        } else if (userData.stage === 3) {
          if (userData.role === "candidate") {
            navigate("/candidateregform");
          } else if (userData.role === "company") {
            navigate("/companyregform");
          } else if (userData.role === "creator") {
            navigate("/creatorregform");
          }
        } else if (userData.stage === 4) {
          if (userData.role === "candidate") {
            navigate("/candidate");
          } else if (userData.role === "company") {
            navigate("/company");
          } else if (userData.role === "creator") {
            cookies.set("creatorID", userData.creator_id)
            navigate("/creator");
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const wallectConnected = () => {
    // setTimeout(() => {

    //   navigate("/signup/ev");
    // }, 2000);

    return <LoadingIcon />;
  };
  if (isConnected) {
    // return (
    //   <div>
    //     {/* <img src={ensAvatar} alt="ENS Avatar" /> */}
    //     <div>{ensName ? `${ensName} (${address})` : address}</div>
    //     {/* <div>Connected to {connector.name}</div> */}
    //     <button onClick={() => getXmtp()}>client</button>
    //     <button onClick={togglePopup}>New</button>
    //     {isOpen && (
    //       <NewPopup
    //         content={
    //           <>
    //             <div>Start New Conversation</div>
    //             <input
    //               type="text"
    //               onChange={(e) => {
    //                 setWalletAddress(e.target.value);
    //               }}
    //             />
    //             <input
    //               type="button"
    //               value="New Coversation"
    //               onClick={() => startNewConversation(client)}
    //             />
    //           </>
    //         }
    //         handleClose={togglePopup}
    //       />
    //     )}
    //     <button onClick={() => getConversation(client)}>Send</button>
    //     <button onClick={() => listConversation(client)}>
    //       List Conversations
    //     </button>
    //     <button onClick={() => allConversation(client)}>
    //       All Conversations
    //     </button>
    //     {/* <button onClick={() => allNewConversations(client)}>
    //       All New Conversations
    //     </button> */}
    //     {/* <button onClick={() => startNewConversation(client)}>New</button> */}
    //     <button onClick={disconnect}>Disconnect</button>
    //     <input
    //       type="text"
    //       onChange={(e) => {
    //         setSendMessage(e.target.value);
    //       }}
    //       ref={inputRef}
    //     />
    //     <div>
    //       {getallconversations.map((allconversationsdisplay, index) => (
    //         <div key={index}>{allconversationsdisplay.peerAddress}</div>
    //       ))}
    //     </div>
    //     <div>
    //       {getMessage.map((messagedisplay, index) => (
    //         <div key={index}>{messagedisplay.content}</div>
    //       ))}
    //     </div>
    //   </div>
    // );
    return wallectConnected();
  }
  // cookies.set("loginID", "Pacman");

  return (
    <div>
      <div className="wallet-btn-outer">
        {connectors.map((connector, i) => (
          <button
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({ connector })}
            className="wallet-btn"
          >
            <img
              className="wallet-btn-logo"
              src={walletLogo[i]}
              alt="wallet button logo"
            />

            {connector.name}
            {!connector.ready && " (unsupported)"}
            {isLoading &&
              connector.id === pendingConnector?.id &&
              " (connecting)"}
          </button>
        ))}
        <div className="wallet-error-msg">
          <p>{error && error.message}</p>
        </div>
      </div>
    </div>
  );
}

export default WalletConnect;
