import "./profile.css";
import edu_logo from "./images/edu.png";
import editimg from "./images/edit.svg";
import skill from "../assets/images/skills.png";
import nftlogo from "../assets/images/nft.png";
import userlogo from "../assets/images/user-p-logo.png";
import exlogo from "../assets/images/ex-logo.png";
import nft from "../assets/images/exam-result.jpg";
import axios from "axios";
import { useAccount } from "wagmi";
import profileimg from "./images/person/1.jpeg";
import coverimg from "./images/post/1.jpeg";
import { useEffect } from "react";
import { useState } from "react";
import LoadingIcon from "../walletconnect/LoadingIcon";
import data from "../../Contracts/artifacts/data.json";
import { ethers } from "ethers";

export default function Profile() {
  const { address, isConnected } = useAccount();
  const [userEduDescription, setUserEduDescription] = useState(null);
  const [userbio, setUserBio] = useState(null);
  const [employeeSkills] = useState(null);
  const [userExpTitle, setUserExpTitle] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userSkill, setUserSkill] = useState(null);
  const [userExpScore, setUserExpScore] = useState(null);
  const [userExpLocation, setUserExpLocation] = useState(null);
  const [userCoverImg, setUserCoverImg] = useState(null);
  const [userExpDesc, setUserExpDesc] = useState(null);
  const [userExpType, setUserExpType] = useState(null);
  const [userProfileImg, setUserProfileImg] = useState(null);
  const [UserExpCompanyname, setUserExpCompanyname] = useState(null);
  const [userEduInstitute, setUserEduInstitute] = useState(null);
  const [userEduField, setUserEduField] = useState(null);
  const [userEduStartDate, setUserEduStartDate] = useState(null);
  const [userEduEndDate, setUserEduEndDate] = useState(null);
  const [userExpStartDate, setUserExpStartDate] = useState(null);
  const [userExpEndDate, setUserExpEndDate] = useState(null);
  const [userEduscore, setUserEduScore] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [userDegree, setUserDegree] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingmessage] = useState("Loading...");
  const [metaDataNft, setMetaDataNft] = useState([]);

  //for integration
  const [usrAccount, setUsrAccount] = useState();
  const CONTRACT_ADDRESS_GOERLI = "0x8C1C947F7f5c23ee58399912EABdECB88F9b7B37";
  const CONTRACT_ADDRESS_SKALE = "0x01d83b1aaf12a98ccf0f83147732bfe9f53c61c1";
  const CONTRACT_ADDRESS_AURORA = "0xc892caEe8eca7734A66F2d6Bb69F123e610dB9fc";
  const CONTRACT_ADDRESS_CRONOS = "0x5D9F1CC0D4Df5568FB5ff934305a19754ecB14bb";
  //withdraw function added (smart contract integration)
  const withdraw = async (e) => {
    e.preventDefault();
    console.log("hello");
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        let usr_account;
        signer.getAddress().then(async (res) => {
          usr_account = res;
          await setUsrAccount(usr_account);
          console.log(usr_account);
        });
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }

        const { chainId } = await provider.getNetwork();
        console.log("switch case for this case is: " + chainId);

        //SWITCH CASE for networks
        switch (chainId) {
          case 5:
            //for GOERLI
            let connectedContract = new ethers.Contract(
              CONTRACT_ADDRESS_GOERLI,
              data.abi,
              signer
            );
            console.log("Going to pop wallet now to pay gas...");
            let stakeTx_g = await connectedContract.withdraw(usrAccount);
            // add address here
            console.log(stakeTx_g);

            break;

          case 647426021:
            //for SKALE
            const connectedContract_s = new ethers.Contract(
              CONTRACT_ADDRESS_SKALE,
              data.abi,
              signer
            );

            console.log("Going to pop wallet now to pay gas...");
            let stakeTx_s = await connectedContract_s.withdraw(usrAccount);
            // add address here
            console.log(stakeTx_s);

            break;

          case 338:
            //for CRONOS
            const connectedContract_c = new ethers.Contract(
              CONTRACT_ADDRESS_CRONOS,
              data.abi,
              signer
            );

            console.log("Going to pop wallet now to pay gas...");
            let stakeTx_c = await connectedContract_s.withdraw(usrAccount);
            // add address here
            console.log(stakeTx_c);

            break;

          case 1313161555:
            //for AURORA
            const connectedContract_a = new ethers.Contract(
              CONTRACT_ADDRESS_AURORA,
              data.abi,
              signer
            );
            console.log("Going to pop wallet now to pay gas...");
            let stakeTx_a = await connectedContract_s.withdraw(usrAccount);
            // add address here
            console.log(stakeTx_a);
            break;
          // case 80001:
          //   //for POLYGON
          //   console.log("ploygon");

          //   const con = new ethers.Contract(
          //     CONTRACT_ADDRESS_POLYGON,
          //     contract,
          //     signer
          //   );
          //   const tx = await con.registerCompany(companyId);
          //   tx.wait();
          //   const tx1 = await con.stake(companyId, 100000000000000, {
          //     value: 100000000000000,
          //   });
          //   tx1.wait();
          //   break;
          default:
            break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //for covalent api starts

  const APIKEY = "ckey_f09b8656acce40139909164b62e";
  const baseURL = "https://api.covalenthq.com/v1";
  const blockchainChainId = 5;
  const userAddress = "0xdab4984b2f4e06d207f73678935a649ae6969490";
  const contractAddress = "0xe71ca901ce4a2baa8650f3751b447d59b6170c80";
  async function getWalletBalance(chainId, address) {
    // const url = new URL(`${baseURL}/${chainId}/address/${address}/balances_v2/?key=${APIKEY}`);
    // https://api.covalenthq.com/v1/1/tokens/0xe4605d46fd0b3f8329d936a8b258d69276cba264/nft_token_ids/?key=ckey_f09b8656acce40139909164b62e
    const tokenId = new URL(
      `${baseURL}/${chainId}/tokens/${address}/nft_token_ids/?key=${APIKEY}`
    );
    const tokenIdResponse = await fetch(tokenId);
    const tokenResult = await tokenIdResponse.json();
    const tokenData = tokenResult.data;
    console.log(tokenData);
    console.log(tokenData.items[0].token_id);
    const length = tokenData.items.length;
    const metadata = [];
    for (let i = 1; i <= length; i++) {
      const url = new URL(
        `${baseURL}/${chainId}/tokens/${address}/nft_metadata/${i}/?key=${APIKEY}`
      );
      console.log(url);
      const response = await fetch(url);
      const result = await response.json();
      const data = result.data;
      console.log(data.items[i - 1].nft_data[0].owner_address);
      if (userAddress === data.items[i - 1].nft_data[0].owner_address) {
        metadata.push(data);
      }
    }
    console.log(metadata);
    setMetaDataNft(metadata);
  }
  useEffect(() => {
    getWalletBalance(blockchainChainId, contractAddress);
  }, []);

  //covalent api ends

  const fetchData = () => {
    var data = JSON.stringify({
      wallet_address: "0x054ae6107cAadC187c304de87365bc52F8c2ADB9",
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/getProfile`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setUserEduDescription(
          response.data["education details"][0].edu_description
        );
        setUserEduInstitute(
          response.data["education details"][0].institute_name
        );
        setUserEduStartDate(
          response.data["education details"][0].edu_start_date
        );
        setUserExpStartDate(response.data["experiences"][1].start_date);
        setUserExpEndDate(response.data["experiences"][1].end_date);
        setUserExpScore(response.data["experiences"][1].status);
        setUserProfileImg(response.data.profile_image);
        setUserName(response.data.name);
        setUserCoverImg(response.data.cover_image);
        setUserExpLocation(response.data["experiences"][1].location);
        setUserExpTitle(response.data["experiences"][1].e_title);
        setUserSkill(response.data.skills);
        setUserExpCompanyname(response.data["experiences"][1].company_name);
        setUserExpDesc(response.data["experiences"][1].e_description);
        setUserExpType(response.data["experiences"][1].employement_type);
        setUserEduField(response.data["education details"][0].filed_of_study);
        setUserEduEndDate(response.data["education details"][0].edu_end_date);
        setUserEduScore(response.data["education details"][0].score);
        setUserDegree(response.data["education details"][0].degree);
        setUserBio(response.data.bio);
        setUserLocation(response.data.country);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  let profilePhoto = "https://ipfs.io/ipfs/" + userProfileImg;
  let coverPhoto = "https://ipfs.io/ipfs/" + userCoverImg;
  if (loading) {
    return (
      <div style={{ height: "85vh" }}>
        <LoadingIcon message={loadingMessage} />
      </div>
    );
  } else {
    return (
      <>
        <div className="profile-profile">
          <div className="profile-profileRight">
            <div className="profile-profileRightTop">
              <div className="profile-profileCover">
                <img
                  className="profile-profileCoverImg"
                  src={coverPhoto}
                  alt="cover"
                />
                <img
                  className="profile-profileUserImg"
                  src={profilePhoto}
                  alt="profile_image"
                />
              </div>
              <div className="profile-profileInfo">
                <h4 className="profile-profileInfoName">{userName}</h4>
                {/* <span className="profile-profileInfoDesc">Hello World</span> */}
              </div>
              <button
                className="withdraw-btn"
                onClick={(e) => {
                  withdraw(e);
                }}
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>

        {/* //////////////////////////////////////////////////////////////////////////////// */}
        <div className="userprofile-main-div">
          <div className="profile-rightbar-main-box">
            <div className="exp-logo">
              <img
                className="profile-educationProfileImg"
                src={userlogo}
                alt=""
              />{" "}
              <div className="profile-leftbar-experience">User information</div>
            </div>
            <div className="profile-leftbar-main-box">
              {/* <span className="bold-text-experience">Lajja Vaniya</span> */}
              <div>
                <span className="bold-text-experience">Branch:</span>
                <span className="profile-leftbar-edu-date">{userEduField}</span>
              </div>
              <div>
                <span className="bold-text-experience">Skills:</span>
                {userSkill.map((skill_) => (
                  <span className="profile-leftbar-skill01">{skill_}</span>
                ))}
              </div>
              <div className="address-pro-merge">
                <span className="bold-text-experience">Location:</span>
                {/* <span className="profile-rightbar-location">surat-</span> */}
                <span className="profile-rightbar-address">{userLocation}</span>
              </div>
              {/* <div className="address-pro-merge">
                <span className="bold-text-experience">e-mail:</span>
                <span className="profile-rightbar-address">
                  email@email.com
                </span>
              </div> */}
              {/* <div className="address-pro-merge">
                <span className="bold-text-experience">Contact-no:</span>
                <span className="profile-rightbar-address">
                  email@email.com
                </span>
              </div> */}
              <span className="profile-rightbar-des">{userbio}</span>
            </div>
          </div>

          <div className="profile-leftbar-main">
            <div className="experience-main-box">
              <div className="exp-logo">
                <img
                  className="profile-educationProfileImg"
                  src={exlogo}
                  alt=""
                />{" "}
                <div className="profile-leftbar-experience">Experience</div>
              </div>
              <div className="profile-leftbar-main-box">
                {/* <div className="profile-educationTopRight">
              <span className="profile-educationUsername">
                <img
                  className="profile-educationEditImg"
                  src={editimg}
                  alt=""
                />
              </span>
            </div> */}

                <div className="bold-text-experience">
                  <span className="profile-leftbar-domain">{userExpTitle}</span>
                </div>
                <div className="bold-text-experience">
                  <span className="profile-leftbar-companyname">
                    {UserExpCompanyname}
                  </span>
                </div>
                <div>
                  <span className="bold-text-experience">Employee_type:</span>
                  <span className="profile-leftbar-skill01">{userExpType}</span>
                </div>

                <span className="bold-text-experience">Location:</span>
                <span className="profile-leftbar-skill01">
                  {userExpLocation}
                </span>

                <div className="profile-leftbar-merge">
                  <span className="bold-text-experience">Start_date:</span>
                  <span className="profile-leftbar-skill01">
                    {userExpStartDate}
                  </span>
                  <div>
                    <span className="bold-text-experience">End_date:</span>
                    <span className="profile-leftbar-skill01">
                      {userExpEndDate}
                    </span>
                  </div>
                  <span className="bold-text-experience">Status:</span>
                  <span className="profile-leftbar-skill01">
                    {userExpScore}
                  </span>
                </div>

                <span className="profile-rightbar-des">{userExpDesc}</span>
              </div>
            </div>
            <div className="education-main-box">
              <div className="edu-exp-merge-div">
                <div className="exp-logo">
                  <img
                    className="profile-educationProfileImg"
                    src={edu_logo}
                    alt=""
                  />{" "}
                  <div className="profile-leftbar-experience">Education</div>
                </div>
                <div className="profile-leftbar-main-box">
                  <div className="bold-text-experience">
                    <span className="profile-leftbar-domain2">
                      {userDegree}
                    </span>
                  </div>
                  <div className="bold-text-experience">
                    <span className="profile-leftbar-branch">
                      {userEduInstitute}
                    </span>
                  </div>
                  <span className="bold-text-experience">Score:</span>
                  <span className="profile-leftbar-skill01">
                    {userEduscore}
                  </span>
                  <div>
                    <span className="bold-text-experience">Branch:</span>
                    <span className="profile-leftbar-skill01">
                      {userEduField}
                    </span>
                  </div>
                  <div>
                    <span className="bold-text-experience">Start_date:</span>
                    <span className="profile-leftbar-skill01">
                      {userEduStartDate}
                    </span>
                  </div>
                  <div>
                    <span className="bold-text-experience">End_date:</span>
                    <span className="profile-leftbar-skill01">
                      {userEduEndDate}
                    </span>
                  </div>

                  <span className="profile-rightbar-des">
                    {userEduDescription}
                  </span>
                </div>
              </div>
            </div>

            <div className="skill-main-box">
              <div className="exp-logo">
                <img
                  className="profile-educationProfileImg"
                  src={skill}
                  alt=""
                />{" "}
                <div className="profile-leftbar-experience">Skills</div>
              </div>
              <div className="profile-leftbar-main-box">
                <div>
                  {userSkill.map((skill_) => (
                    <span className="profile-leftbar-skill">{skill_}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="usernft-main">
              <div className="exp-logo">
                <img
                  className="profile-educationProfileImg"
                  src={nftlogo}
                  alt=""
                />{" "}
                <div className="profile-leftbar-experience">User NFT's </div>
              </div>

              <div className="profile-rightbar-main-nft">
                {metaDataNft.map((mdnft) => (
                  <img
                    className="profile-profileCoverImg-nft"
                    src={mdnft.items[0].nft_data[0].external_data.image}
                    alt="cover"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
