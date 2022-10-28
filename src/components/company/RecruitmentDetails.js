import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "../company/styles/recruitdetails.css";
import Select from "react-select";
import plus from "../company/styles/plus.svg";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Web3Storage } from "web3.storage";
import { useAccount } from "wagmi";
import { connect } from "@tableland/sdk";

import data from "../../Contracts/artifacts/data.json";
import contract from "../../Contracts/artifacts/superfluid_contract.json";

export const CONTRACT_ADDRESS_POLYGON =
  "0x77F0A41DfA59B6dC1E7f1388eF88117C146b4C8d";

export const CONTRACT_ADDRESS_GOERLI =
  "0x8C1C947F7f5c23ee58399912EABdECB88F9b7B37";
export const CONTRACT_ADDRESS_SKALE =
  "0x01d83b1aaf12a98ccf0f83147732bfe9f53c61c1";
export const CONTRACT_ADDRESS_AURORA =
  "0xc892caEe8eca7734A66F2d6Bb69F123e610dB9fc";
export const CONTRACT_ADDRESS_CRONOS =
  "0x5D9F1CC0D4Df5568FB5ff934305a19754ecB14bb";

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQyNzdCMDE2NWY5ZkM5ZThhQkI0M0EwYTRjODFhYTk2OERCNERGNDYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjM5MjI2OTM1NjAsIm5hbWUiOiJFdGhPbmxpbmUifQ.OY6RS4zIFfGfEiOacIHdo3BEkFdPDHvd8i4o5fm4JW8";

function RecruitmentDetails() {
  //function for calling smart contract (stakeByCompany)

  let navigate = useNavigate();

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOptions1, setSelectedOptions1] = useState();
  const [selectedOptionsLocation, setSelectedOptionsLocation] = useState([]);
  const [jobLocation, setJoblocation] = useState("");
  const [singleQuestion, setSingleQuestion] = useState("");
  const [additionalQuestion, setAdditionalQuestion] = useState([]);
  const [counter, setCounter] = useState(0);
  const { address, isConnected } = useAccount();
  const [companyId, setCompanyId] = useState();

  const optionListPrimary = [
    { value: "java", label: "Java" },
    { value: "python", label: "Python" },
    { value: "oracle", label: "Oracle" },
    { value: "C++", label: "C++" },
    { value: "blockchain", label: "Blockchain" },
    { value: "Reactjs", label: "ReactJs" },
    { value: "angular", label: "Angular" },
    { value: "data structure", label: "Data Structure" },
    { value: "Nodejs", label: "Nodejs" },
    { value: "dotnet", label: "DotNet" },
  ];
  const optionListSecondary = [
    { value: "Java", label: "Java" },
    { value: "python", label: "Python" },
    { value: "oracle", label: "Oracle" },
    { value: "C++", label: "C++" },
    { value: "blockchain", label: "Blockchain" },
    { value: "Reactjs", label: "ReactJs" },
    { value: "angular", label: "Angular" },
    { value: "data structure", label: "Data Structure" },
    { value: "Nodejs", label: "Nodejs" },
    { value: "dotnet", label: "DotNet" },
  ];
  const optionListLocation = [
    { value: "Brazil", label: "Brazil" },
    { value: "Canada", label: "Canada" },
    { value: "India", label: "India" },
    { value: "Bhutan", label: "Bhutan" },
    { value: "Japan", label: "Japan" },
    { value: "Nepal", label: "Nepal" },
    { value: "France", label: "France" },
    { value: "Astrallia", label: "Australlia" },
    { value: "China", label: "China" },
    { value: "Mexico", label: "Mexico" },
  ];

  const [btnloading, setbtnLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    company_id: "",
    assesment_id: 1,
    title: "",
    description: "",
    location: [],
    status: 1,
    type: "",
    addition_question: "",
    experience_level: "",
    primary_skill1: "",
    primary_skill2: "",
    primary_skill3: "",
    primary_skill4: "",
    primary_skill5: "",
    secondary_skills: "",
  });
  const [que, setQue] = useState();

  const addJobDetails = async () => {
    console.log("inside the api call function");
    const obj = { questions: que };
    const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });
    const files = [
      new File(["contents-of-file-1"], "plain-utf8.txt"),
      new File([blob], "questions.json"),
    ];
    const client = new Web3Storage({ token: API_TOKEN });
    const cid = await client.put(files);
    // console.log("stored files with cid:", cid);

    //
    const name = "company_table_80001_1730";
    const tableland = await connect({
      network: "testnet",
      chain: "polygon-mumbai",
    });
    const readRes = await tableland.read(
      `SELECT company_id FROM ${name} where wallet_address='${address}'`
    );
    var data = JSON.stringify({
      company_id: readRes["rows"][0][0],
      title: credentials.title,
      description: credentials.description,
      location: credentials.location,
      status: 1,
      type: credentials.type,
      addition_question: cid,
      experience_level: credentials.experience_level,
      primary_skill1: credentials.primary_skill1,
      primary_skill2: credentials.primary_skill2,
      primary_skill3: credentials.primary_skill3,
      primary_skill4: credentials.primary_skill4,
      primary_skill5: credentials.primary_skill5,
      secondary_skills: credentials.secondary_skills,
    });
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/addJob`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        setbtnLoading(false);
        startDrive(response.data["job_id"]);
        navigate(
          `/company/availabletests/?dummy=${JSON.stringify(
            response.data["job_id"]
          )}`
        );
      })
      .catch(function (error) {
        setbtnLoading(false);
      });
  };

  const startDrive = async (job_id) => {
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
        if (chainId === 80001) {
          const con = new ethers.Contract(
            CONTRACT_ADDRESS_POLYGON,
            contract,
            signer
          );
          const tx = await con.createDrive(companyId, job_id);
          tx.wait();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    setAdditionalQuestion((additionalQuestion) => [
      ...additionalQuestion,
      singleQuestion,
    ]);
    document.getElementById("question-input").value = "";
    setCounter(counter + 1);
  };

  const deleteTag = (index) => {
    setAdditionalQuestion((singleQuestion) =>
      singleQuestion.filter((tag, i) => i !== index)
    );
  };
  function handleSelect(selectedOptions) {
    if (selectedOptions.length > 5) {
      alert("not selected");
    } else {
      setSelectedOptions(selectedOptions);
      if (selectedOptions[0]["value"]) {
        setCredentials({
          ...credentials,
          primary_skill1: selectedOptions[0]["value"],
        });
      }
      if (selectedOptions[1]["value"]) {
        setCredentials({
          ...credentials,
          primary_skill2: selectedOptions[1]["value"],
        });
      }
      if (selectedOptions[2]["value"]) {
        setCredentials({
          ...credentials,
          primary_skill3: selectedOptions[2]["value"],
        });
      }
      if (selectedOptions[3]["value"]) {
        setCredentials({
          ...credentials,
          primary_skill4: selectedOptions[3]["value"],
        });
      }
      if (selectedOptions[4]["value"]) {
        setCredentials({
          ...credentials,
          primary_skill5: selectedOptions[4]["value"],
        });
      }
    }
  }
  function handleSelect1(selectedOptions1) {
    setSelectedOptions1(selectedOptions1);
    let myarr = [];
    for (let i = 0; i < selectedOptions1.length; i++) {
      myarr.push(selectedOptions1[i]["value"]);
    }
    setCredentials({
      ...credentials,
      secondary_skills: myarr,
    });
  }
  function handleSelectLocation(selectedOptionsLocation) {
    setSelectedOptionsLocation(selectedOptionsLocation);
    let myarr = [];
    for (let i = 0; i < selectedOptionsLocation.length; i++) {
      myarr.push(selectedOptionsLocation[i]["value"]);
    }
    setCredentials({
      ...credentials,
      location: myarr,
    });
  }

  useEffect(() => {
    setQue(additionalQuestion);
  }, [JSON.stringify(additionalQuestion)]);

  const handleClick1 = (e) => {
    setJoblocation(e.target.value);
  };

  const style = {
    control: (base, state) => ({
      ...base,
      border: "1px solid gray",

      boxShadow: "none",
      "&:hover": {
        border: "1px solid gray",
      },
    }),
  };

  useEffect(() => {}, [credentials]);

  useEffect(() => {}, [selectedOptionsLocation]);

  const forId = async () => {
    const name = "company_table_80001_1730";
    const tableland = await connect({
      network: "testnet",
      chain: "polygon-mumbai",
    });
    const readRes = await tableland.read(
      `SELECT company_id FROM ${name} where wallet_address='${address}'`
    );
    setCompanyId(readRes["rows"][0][0]);
  };
  useEffect(() => {
    forId();
  }, [address]);
  const stake = async (e) => {
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
              data.abi,
              signer
            );
            let stakeTy = await connectedContract.showUserStake(
              "0xDaB4984b2F4e06d207f73678935A649ae6969490"
            ); //add address variable here
            console.log(stakeTy.toNumber());
            if (stakeTy <= 1000000000000000) {
              console.log("Going to pop wallet now to pay gas...");
              let stakeTx = await connectedContract.stakeByCompany({
                value: 1000000000000000,
              });
            }
            break;

          case 647426021:
            //for SKALE
            const connectedContract_s = new ethers.Contract(
              CONTRACT_ADDRESS_SKALE,
              data.abi,
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
            }
            break;

          case 338:
            //for CRONOS
            const connectedContract_c = new ethers.Contract(
              CONTRACT_ADDRESS_CRONOS,
              data.abi,
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
            }
            break;

          case 1313161555:
            //for AURORA
            const connectedContract_a = new ethers.Contract(
              CONTRACT_ADDRESS_AURORA,
              data.abi,
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
            }
            break;
          case 80001:
            //for POLYGON
            const con = new ethers.Contract(
              CONTRACT_ADDRESS_POLYGON,
              contract,
              signer
            );
            const tx = await con.registerCompany(companyId);
            tx.wait();
            const tx1 = await con.stake(companyId, 100000000000000, {
              value: 100000000000000,
            });
            tx1.wait();
            break;
          default:
            break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="recruitment-main">
        <div className="recruitment-header">
          <div className="recruitment-content">
            <h2 className="font-medium leading-tight text-4xl  text-600 recruit-details">
              JOB DETAILS
            </h2>

            <form id="recruitment-details-main-form">
              <div>
                <label id="recruit-label">Job Title:</label>
              </div>
              <div className="recruit-components">
                <input
                  type="text"
                  // required
                  className="
                    form-control
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-500
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-700 focus:bg-white focus:border-600 focus:outline-none
                      "
                  id="jobtitle-inputfield"
                  defaultValue={credentials.title}
                  onChange={(e) => {
                    setCredentials({ ...credentials, title: e.target.value });
                  }}
                />
              </div>

              <div>
                <label id="recruit-label">Job Description: </label>
              </div>
              <div className="recruit-components">
                <textarea
                  // required
                  className="
                      form-control
                      block
                      w-full
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding
                      border border-solid border-gray-500
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-600 focus:outline-none
                    "
                  id="jobdescription-textarea"
                  rows="3"
                  defaultValue={credentials.description}
                  onChange={(e) => {
                    setCredentials({
                      ...credentials,
                      description: e.target.value,
                    });
                  }}
                ></textarea>
              </div>

              <div>
                <label id="recruit-label">Additional Questions:</label>
              </div>

              <div className="recruit-components-question">
                <div className="img-input-submit-section">
                  <input
                    id="question-input"
                    type="text"
                    // required
                    defaultValue={credentials.addition_question}
                    onChange={(e) => {
                      setSingleQuestion(e.target.value);
                    }}
                    className="
                      form-control
                  
                      
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding
                      border border-solid border-gray-500
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-600 focus:outline-none all-inputfield
                    "
                  />
                  <button
                    type="button"
                    id="submit-job"
                    onClick={() => handleClick()}
                    className="inline-block px-6 py-2.5 bg-blue-600
                text-white font-medium text-xs leading-tight  rounded-lg
                shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
                focus:shadow-lg focus:outline-none focus:ring-0
                active:bg-blue-800 active:shadow-lg transition duration-150
                ease-in-out"
                  >
                    Submit
                  </button>
                </div>
                <div className="grid-recruitdetails grid-col-2">
                  {additionalQuestion.map((c, index) => {
                    return (
                      <div className="tag-outer">
                        <span id="tag-span-job" key={index}>
                          {c}{" "}
                        </span>
                        <button
                          className="tag-input-btn"
                          onClick={() => deleteTag(index)}
                        >
                          x
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="recruit-location">
                <div>
                  <label id="recruit-label">Job Type:</label>
                </div>
                <label id="recruit-label">
                  <input
                    type="radio"
                    name="location"
                    className="inline-radio radio-location"
                    onClick={(e) => handleClick1(e)}
                    defaultValue="Remote"
                    onChange={(e) => {
                      setCredentials({
                        ...credentials,
                        type: e.target.value,
                      });
                    }}
                  />{" "}
                  <span className="radio-remote">Remote</span>
                </label>

                <label id="recruit-label">
                  <input
                    type="radio"
                    name="location"
                    className="inline-radio radio-location "
                    onClick={(e) => handleClick1(e)}
                    defaultValue="Onsite"
                    onChange={(e) => {
                      setCredentials({
                        ...credentials,
                        type: e.target.value,
                      });
                    }}
                  />{" "}
                  <span className="radio-remote">Onsite</span>
                </label>

                {jobLocation === "Onsite" ? (
                  <input
                    type="text"
                    className="
                      form-control
                      block
                      w-full
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding
                      border border-solid border-gray-500
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-600 focus:outline-none
                    "
                    id="job-radio"
                  />
                ) : null}

                <label id="recruit-label">
                  <input
                    type="radio"
                    name="location"
                    className="inline-radio radio-location"
                    defaultValue="Hybrid"
                    onChange={(e) => {
                      setCredentials({
                        ...credentials,
                        type: e.target.value,
                      });
                    }}
                    onClick={(e) => {
                      handleClick1(e);
                    }}
                  />
                  <span className="radio-remote">Hybrid</span>
                </label>
                {jobLocation === "Hybrid" ? (
                  <input
                    type="text"
                    className="
                      form-control
                      block
                      w-full
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding
                      border border-solid border-gray-500
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-600 focus:outline-none
                      "
                    id="job-radio"
                  />
                ) : null}
              </div>

              <div>
                <label id="recruit-label">Experience Level: </label>
              </div>
              <div className="recruit-components">
                <input
                  type="number"
                  min="0"
                  // required
                  max="10"
                  id="number"
                  className="
                      form-control
                      block
                      w-full
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding
                      border border-solid border-gray-500
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-600 focus:outline-none ex-level-select
                    "
                  defaultValue={credentials.experience_level}
                  onChange={(e) => {
                    setCredentials({
                      ...credentials,
                      experience_level: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <label id="recruit-label">Job Location: </label>
              </div>
              <div className="recruit-components">
                <div className="dropdown-container">
                  <Select
                    options={optionListLocation}
                    placeholder=""
                    // required
                    // value={setSelectedOptionsLocation}
                    onChange={(e) => {
                      handleSelectLocation(e);
                    }}
                    // onChange={(e) => {
                    //   handleSelectLocation(e);
                    // }}
                    isSearchable={true}
                    isMulti
                    styles={style}
                  />
                </div>
              </div>
              <div>
                <label id="recruit-label">Primary Skills: </label>
              </div>
              <div className="recruit-components">
                <div className="dropdown-container">
                  <Select
                    options={optionListPrimary}
                    placeholder=""
                    // required
                    value={selectedOptions}
                    onChange={(e) => {
                      handleSelect(e);
                    }}
                    isSearchable={true}
                    isMulti
                    styles={style}
                  />
                </div>
              </div>
              <div>
                <label id="recruit-label">Secondary Skills: </label>
              </div>
              <div className="recruit-components">
                <div className="dropdown-container">
                  <Select
                    options={optionListSecondary}
                    placeholder=""
                    // required
                    value={selectedOptions1}
                    onChange={(e) => {
                      handleSelect1(e);
                    }}
                    isSearchable={true}
                    isMulti
                    styles={style}
                  />
                </div>
              </div>

              <div className="recruit-submit">
                <button
                  type="button"
                  style={{ margin: 20 }}
                  className="text-white    font-medium rounded-lg text-sm px-8 py-3 text-center  recruit-save-continue-button
                    "
                  onClick={(e) => {
                    stake(e);
                  }}
                >
                  Stake
                </button>
                <button
                  type="button"
                  className="text-white    font-medium rounded-lg text-sm px-8 py-3 text-center  recruit-save-continue-button
                    "
                  onClick={() => {
                    addJobDetails();
                  }}
                >
                  Save & Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecruitmentDetails;
