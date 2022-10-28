import { ethers } from "ethers";
import React from "react";
import ethlogo from "../assets/images/eth_logo.png";
import skale from "../assets/images/skale_logo.svg";
import cronos from "../assets/images/cronos_logo.png";
import aurora from "../assets/images/aurora_logo.png";
import polygon from "../assets/images/polygon.svg";

import "./selectchain.css";

function SelectChain() {
  const connectToGoerli = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        // if metamask not found
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }

        //getting chainId
        const { chainId } = await provider.getNetwork();
        console.log(chainId); //console chainID

        const goerli_chainId = "0x5"; //explicitly defining Goerly chainID
        if (chainId == goerli_chainId) {
          console.log("Bravo!, you are on the correct network");
        } else {
          console.log("oulalal, switch to the correct network");
          try {
            //switching logic
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0x5" }],
            });
            console.log("You have switched to the right network");
          } catch (switchError) {
            // The network has not been added to MetaMask
            if (switchError.code === 4902) {
              console.log("this chainId does not exist");
            }
            console.log("Cannot switch to the network");
          }
        }
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //---------------------------------------------------switching to  SKALE network
  const connectToSkale = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }

        const { chainId } = await provider.getNetwork();
        console.log(chainId);
        const skale_chainId = "0x2696efe5"; //Its in HEX of 647426021
        if (chainId == skale_chainId) {
          console.log("Bravo!, you are on the correct network");
        } else {
          console.log("oulalal, switch to the correct network");
          try {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0x2696efe5" }],
            });
            console.log("You have switched to the right network");
          } catch (switchError) {
            // The network has not been added to MetaMask
            if (switchError.code === 4902) {
              console.log("this chainId does not exist");
            }
            console.log("Cannot switch to the network");
          }
        }
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //---------------------------------------------------For SKALE NETWORK
  const addSkale = async () => {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      console.log(signer);

      if (!provider) {
        console.log("Metamask is not installed, please install!");
      }
      //adding SKALE NETWORK TO METAMASK
      //IF AVAILABLE then just SWITCH network (done automatically by metamask)
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x2696efe5", //647426021
              chainName: "EthOnline sChain | hackathon-complex-easy-naos",
              rpcUrls: [
                "https://eth-online.skalenodes.com/v1/hackathon-complex-easy-naos",
              ],
              blockExplorerUrls: [
                "https://hackathon-complex-easy-naos.explorer.eth-online.skalenodes.com/",
              ],
              nativeCurrency: {
                symbol: "sFUEL",
                decimals: 18,
              },
            },
          ],
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  };

  //---------------------------------------------------For AURORA NETWORK
  const addAurora = async () => {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      if (!provider) {
        console.log("Metamask is not installed, please install!");
      }
      //adding AURORA NETWORK TO METAMASK
      //IF AVAILABLE then just SWITCH network (done automatically by metamask)
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x4E454153", //1313161555
              chainName: "Aurora Testnet",
              rpcUrls: ["https://testnet.aurora.dev/"],
              blockExplorerUrls: ["https://testnet.aurorascan.dev/"],
              nativeCurrency: {
                symbol: "AuroraETH",
                decimals: 18,
              },
            },
          ],
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  };

  //---------------------------------------------------For CRONOS NETWORK
  const addCronos = async () => {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      if (!provider) {
        console.log("Metamask is not installed, please install!");
      }
      //adding CRONOS NETWORK TO METAMASK
      //IF AVAILABLE then just SWITCH network (done automatically by metamask)
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x152", //338
              chainName: "Cronos testnet",
              rpcUrls: ["https://evm-t3.cronos.org"],
              blockExplorerUrls: ["https://testnet.cronoscan.com/"],
              nativeCurrency: {
                symbol: "tCRO",
                decimals: 18,
              },
            },
          ],
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  };
  //---------------------------------------------------For POLYGON MUMBAI NETWORK(testnet)
  const addPolygon = async () => {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      if (!provider) {
        console.log("Metamask is not installed, please install!");
      }
      //adding Polygon MUMBAI TESTNET NETWORK TO METAMASK
      //IF AVAILABLE then just SWITCH network (done automatically by metamask)
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x13881", //338
              chainName: "Polygon Mumbai Testnet",
              rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
              blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
              nativeCurrency: {
                symbol: "MATIC",
                decimals: 18,
              },
            },
          ],
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  };
  return (
    <>
      <div className="select-chain-grid-parent">
        <div className="sc-grid-item">
          <div className="sc-grid-img">
            <img className="sc-grid-item-img" src={ethlogo} alt="ethlogo" />
          </div>
          <button onClick={connectToGoerli} className="sc-button">
            Switch To GOERLI
          </button>
        </div>
        {/* <div className="sc-grid-item">
          <button onClick={connectToSkale} className="sc-button">
            SWITCH TO Skale
          </button>
        </div> */}
        <div className="sc-grid-item">
          <div className="sc-grid-img">
            <img className="sc-grid-item-img skale" src={skale} alt="skale" />
          </div>
          <button onClick={addSkale} className="sc-button">
            Switch To SKALE
          </button>
        </div>
        <div className="sc-grid-item">
          <div className="sc-grid-img">
            <img className="sc-grid-item-img" src={cronos} alt="cronos" />
          </div>
          <button onClick={addCronos} className="sc-button">
            Switch To CRONOS
          </button>
        </div>
        <div className="sc-grid-item">
          <div className="sc-grid-img">
            <img className="sc-grid-item-img" src={aurora} alt="aurora" />
          </div>
          <button onClick={addAurora} className="sc-button">
            Switch To AURORA
          </button>
        </div>
        <div className="sc-grid-item">
          <div className="sc-grid-img">
            <img className="sc-grid-item-img" src={polygon} alt="polygon" />
          </div>
          <button onClick={addPolygon} className="sc-button">
            Switch To POLYGON
          </button>
        </div>
      </div>
    </>
  );
}

export default SelectChain;
