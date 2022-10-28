import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../company/styles/availabletest.css";
import avtar from "../company/styles/companyprofile.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { connect } from "@tableland/sdk";
import { ethers } from "ethers";

import contract from "../../Contracts/artifacts/data.json";

export const CONTRACT_ADDRESS_GOERLI =
  "0x4551Bbd924715b9c21b8ABa5D5Fa31f4548CAa00";
export const CONTRACT_ADDRESS_SKALE =
  "0x01d83b1aaf12a98ccf0f83147732bfe9f53c61c1";
export const CONTRACT_ADDRESS_AURORA =
  "0xc892caEe8eca7734A66F2d6Bb69F123e610dB9fc";
export const CONTRACT_ADDRESS_CRONOS =
  "0x5D9F1CC0D4Df5568FB5ff934305a19754ecB14bb";
export const CONTRACT_ADDRESS_POLYGON =
  "0x4551Bbd924715b9c21b8ABa5D5Fa31f4548CAa00";

function AvailableTest() {
  let navigate = useNavigate();
  const [purchased, setPurchased] = useState(true);
  const [created, setCreated] = useState();
  const [jobId, setJobId] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const updateAssessmentId = (e) => {
    const currentLocation = window.location.href;
    const param = currentLocation.split("=");
    var data = JSON.stringify({
      job_id: param[1],
      assesment_id: e.target.id,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/addJobAssessment`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        addThisTest();
        navigate(`/company/invitecandidates/?dummy=${param[1]}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const showAvailableTests = async (e) => {
    const name = "creators_assesment_table_80001_2074";
    const tableland = await connect({
      network: "testnet",
      chain: "polygon-mumbai",
    });
    const readRes = await tableland.read(`SELECT * FROM ${name}`);
    for (let i = 0; i < readRes["rows"].length; i++) {
      let creator_id = readRes["rows"][i][1];
      const response = await tableland.read(
        `SELECT name,profile_image FROM creators_table_80001_2155 where creator_id=${creator_id}`
      );
      let url = "https://ipfs.io/ipfs/" + response["rows"][0][1];
      data.push([
        readRes["rows"][i][0],
        readRes["rows"][i][2],
        readRes["rows"][i][4],
        readRes["rows"][i][3],
        response["rows"][0][0],
        url,
      ]);
    }
    setData(data);
    setLoading(true);
  };

  useEffect(() => {
    showAvailableTests();
  }, []);

  //functions for smart contracts

  //functions for Using this test
  const addThisTest = async (e) => {
    e.preventDefault();
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
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
              contract.abi,
              signer
            );
            let stakeTy = await connectedContract.showUserStake(
              "0xDaB4984b2F4e06d207f73678935A649ae6969490"
            ); //add address variable here
            console.log(stakeTy.toNumber());

            //use that reserve price instead 100000.. in if condition
            if (stakeTy <= 1000000000000000) {
              console.log("Going to pop wallet now to pay gas...");
              let stakeTx = await connectedContract.createTest(10000000); //reserve price from tableland
              console.log(stakeTx);
            }
            break;

          case 647426021:
            //for SKALE
            const connectedContract_s = new ethers.Contract(
              CONTRACT_ADDRESS_SKALE,
              contract.abi,
              signer
            );
            let stakeTy_s = await connectedContract_s.showUserStake(
              "0xDaB4984b2F4e06d207f73678935A649ae6969490"
            ); //add address variable here
            console.log(stakeTy_s.toNumber());
            if (stakeTy_s <= 1000000000000000) {
              console.log("Going to pop wallet now to pay gas...");
              let stakeTx = await connectedContract_s.stakeByCompany({
                value: 1000000000000000,
              });
              console.log(stakeTx);
            }
            break;

          case 338:
            //for CRONOS
            const connectedContract_c = new ethers.Contract(
              CONTRACT_ADDRESS_CRONOS,
              contract.abi,
              signer
            );
            let stakeTy_c = await connectedContract_c.showUserStake(
              "0xDaB4984b2F4e06d207f73678935A649ae6969490"
            ); //add address variable here
            console.log(stakeTy_c.toNumber());
            if (stakeTy_c <= 1000000000000000) {
              console.log("Going to pop wallet now to pay gas...");
              let stakeTx = await connectedContract_c.stakeByCompany({
                value: 1000000000000000,
              });
              console.log(stakeTx);
            }
            break;

          case 1313161555:
            //for AURORA
            const connectedContract_a = new ethers.Contract(
              CONTRACT_ADDRESS_AURORA,
              contract.abi,
              signer
            );
            let stakeTy_a = await connectedContract_a.showUserStake(
              "0xDaB4984b2F4e06d207f73678935A649ae6969490"
            ); //add address variable here
            console.log(stakeTy_a.toNumber());
            if (stakeTy_a <= 1000000000000000) {
              console.log("Going to pop wallet now to pay gas...");
              let stakeTx = await connectedContract_a.stakeByCompany({
                value: 1000000000000000,
              });
              console.log(stakeTx);
            }
            break;
          case 80001:
            break;

          default:
            break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <>
        <div className="availabletest-main-content">
          <div className="availabletest-header">
            <h2 class="font-medium leading-tight text-4xl mt-0 mb-2 text-blue-600 availabletest-main-title">
              AVAILABLE TEST
            </h2>
          </div>
          <div className="avilabletest-front-buttons">
            <button
              onClick={() => {
                setPurchased(true);
                setCreated(false);
              }}
              for="first_name"
              className={
                purchased
                  ? "block text-large font-medium text-gray-900 dark:text-gray-300 purchased-name pc-tab-button"
                  : "block text-large font-medium text-gray-900 dark:text-gray-300 purchased-name"
              }
              value={purchased}
            >
              Purchased
            </button>

            <button
              onClick={() => {
                setCreated(true);
                setPurchased(false);
                // showAvailableTests();
              }}
              for="first_name"
              className={
                created
                  ? "block text-large font-medium text-gray-900 dark:text-gray-300 created-name pc-tab-button"
                  : "block text-large font-medium text-gray-900 dark:text-gray-300 created-name"
              }
              value={created}
            >
              Available Tests
            </button>
          </div>

          {/* created----------------------------------------------------------------------------------- */}
          {created === true ? (
            <div className="availabletest-main-information">
              {data.map((inde) => {
                return (
                  <div className="available-information">
                    <div className="availabletest-title">
                      <label
                        for="first_name"
                        class="block mb-2 text-large font-medium text-gray-900 dark:text-gray-300 jobtitle-name"
                      >
                        {inde[1]}
                      </label>
                    </div>
                    <div className="A3section-merge">
                      <div className="availabletest-description-created">
                        <label
                          for="first_name"
                          class="block text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          {inde[3]}
                        </label>
                      </div>

                      <div className="availabletest-description-to-button">
                        <div className="availabletest-user-icon">
                          <div class="overflow-hidden relative w-10 h-10 bg-gray-100 rounded-lg dark:bg-gray-600 ">
                            <img
                              class="w-10 h-10 rounded-full"
                              src={inde[5]}
                              alt="Rounded avatar"
                            />
                          </div>
                          <div className="available-creator-name">
                            <label
                              for="first_name"
                              class="block  text-sm font-medium text-gray-900 dark:text-gray-300  availabletest-creator-block"
                            >
                              {inde[4]}
                            </label>
                          </div>

                          <div className="availabletest-usetest-button">
                            <button
                              type="button"
                              class="text-white   font-medium rounded-lg text-sm px-8 py-3 text-center  availabletest-creator-cost-button"
                            >
                              Cost: ${inde[2]}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="availabletest-submit">
                <a
                  href="/company/invite-candidate"
                  target="_blank"
                  rel="noreferrer"
                >
                  <button
                    type="button"
                    class="text-white  font-medium rounded-lg text-sm px-8 py-3 text-center    availabletest-save-button"
                  >
                    Save & Continue
                  </button>
                </a>
              </div>
            </div>
          ) : (
            // purchased----------------------------------------------------------------------
            <div className="availabletest-main-information">
              {data.map((inde) => {
                return (
                  <div className="available-information">
                    <div className="availabletest-title">
                      <label
                        for="first_name"
                        class="block  text-large font-medium text-gray-900 dark:text-gray-300 jobtitle-name"
                      >
                        {inde[1]}
                      </label>
                    </div>
                    <div className="A3section-merge">
                      <div className=" desc-cost-merge">
                        <div className="availabletest-variable-cost">
                          <label
                            for="first_name"
                            class="block  text-large font-medium text-gray-900 dark:text-gray-300 variable-cost-name"
                          >
                            Variable Cost:
                          </label>
                          <label
                            for="first_name"
                            class="block  text-large font-medium text-gray-900 dark:text-gray-300 variable-cost-price"
                          >
                            ${inde[2]}
                          </label>
                        </div>
                        <div className="availabletest-description">
                          <label
                            for="first_name"
                            class="block text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            {inde[3]}
                          </label>
                        </div>
                      </div>
                      <div className="availabletest-description-to-button">
                        <div className="availabletest-user-icon">
                          <div class="overflow-hidden relative w-10 h-10 bg-gray-100 rounded-lg dark:bg-gray-600 ">
                            <img
                              class="w-10 h-10 rounded-full"
                              src={inde[5]}
                              alt="Rounded avatar"
                            />
                          </div>
                          <div className="available-creator-name">
                            <label
                              for="first_name"
                              class="block  text-sm font-medium text-gray-900 dark:text-gray-300 availabletest-creator-block"
                            >
                              {inde[4]}
                            </label>
                          </div>

                          <div className="availabletest-usetest-button">
                            <button
                              type="button"
                              id={inde[0]}
                              class="text-white   font-medium rounded-lg text-sm px-8 py-3 text-center   availabletest-creator-cost-button use-test-button"
                              onClick={(e) => {
                                updateAssessmentId(e);
                              }}
                            >
                              Use This Test
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </>
    );
  } else {
    console.log("loading");
  }
}
export default AvailableTest;
