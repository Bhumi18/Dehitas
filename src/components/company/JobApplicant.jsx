import React, { useEffect, useState } from "react";
import "../company/styles/jobapplicant.css";
import { connect } from "@tableland/sdk";
import axios from "axios";
import * as EpnsAPI from "@epnsproject/sdk-restapi";
import * as ethers from "ethers";
import { useAccount } from "wagmi";
import contract from "../../Contracts/artifacts/superfluid_contract.json";
export const CONTRACT_ADDRESS_POLYGON =
  "0x77F0A41DfA59B6dC1E7f1388eF88117C146b4C8d";

function JobApplicant() {
  const { address, isConnected } = useAccount();
  const [approval, setApproval] = useState(true);
  const [approved, setApproved] = useState();
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [companyId, setCompanyId] = useState();

  const showApplicants = async () => {
    const currentLocation = window.location.href;
    const param = currentLocation.split("=");
    const name = "application_details_table_80001_2806";
    const table = "candidate_table_80001_1648";
    const table1 = "education_table_80001_2259";
    const tableland = await connect({
      network: "testnet",
      chain: "polygon-mumbai",
    });
    const readRes = await tableland.read(
      `SELECT candidate_id FROM ${name} where job_id=${param[1]}`
    );
    for (let i = 0; i < readRes["rows"].length; i++) {
      const response = await tableland.read(
        `SELECT * FROM ${table} where candidate_id=${readRes["rows"][i][0]}`
      );
      let login_id = response["rows"][0][1];
      const response1 = await tableland.read(
        `SELECT degree FROM ${table1} where login_id=${login_id}`
      );
      data.push([
        response["rows"][0][4],
        response["rows"][0][2],
        response1["rows"][0][0],
        response["rows"][0][3],
        param[1],
        readRes["rows"][i][0],
        response["rows"][0][6],
      ]);
    }
    setData(data);
    //
    const res = await tableland.read(
      `SELECT candidate_id FROM ${name} where job_id=${param[1]} and status=1`
    );
    for (let i = 0; i < res["rows"].length; i++) {
      const response = await tableland.read(
        `SELECT * FROM ${table} where candidate_id=${res["rows"][i][0]}`
      );
      // console.log(response);
      let login_id = response["rows"][0][1];
      let rec_address = response["rows"][0][6];
      // console.log(rec_address);
      const response1 = await tableland.read(
        `SELECT degree FROM ${table1} where login_id=${login_id}`
      );
      data2.push([
        response["rows"][0][4],
        response["rows"][0][2],
        response1["rows"][0][0],
        response["rows"][0][3],
      ]);
    }
    setData2(data2);
    setLoading(true);
  };

  const updateApproveDisapprove = async (job_id, candidate_id, ans, e) => {
    const tableland = await connect({
      network: "testnet",
      chain: "polygon-mumbai",
    });
    const table = "application_details_table_80001_2806";
    const readRes = await tableland.read(
      `SELECT application_id FROM ${table} where job_id=${job_id} and candidate_id=${candidate_id}`
    );
    console.log(readRes);
    var data = JSON.stringify({
      application_id: readRes["rows"][0][0],
      status: ans,
    });

    const response = await tableland.read(
      `SELECT wallet_address FROM candidate_table_80001_1648 where candidate_id=${candidate_id}`
    );
    const user = response["rows"][0][0];
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/updateApproveDisapprove`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

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
          console.log(e.target.id);
          const tx = await con.approveCandidate(companyId, job_id, user);
          tx.wait();
          sendNotification("0xe57f4c84539a6414C4Cf48f135210e01c477EFE0");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    showApplicants();
  }, []);

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

  //send notification code start

  const Pkey = `0x${process.env.REACT_APP_PK}`;
  const signer = new ethers.Wallet(Pkey);

  const sendNotification = async (receiver) => {
    // console.log(receiver);
    try {
      const apiResponse = await EpnsAPI.payloads.sendNotification({
        signer,
        type: 3, // target
        identityType: 2, // direct payload
        notification: {
          title: "Job Application Status",
          body: "Hello you are Approved for the Job Interview, The interview details will be shared soon",
        },
        payload: {
          title: `[sdk-test] payload title`,
          body: `sample msg body`,
          cta: "https://office.dehitas.xyz/?id=cZJte9SEh",
          img: "",
        },
        recipients: "eip155:42:" + receiver, // recipient address
        // ['eip155:42:0xCdBE6D076e05c5875D90fa35cc85694E1EAFBBd1', 'eip155:42:0x52f856A160733A860ae7DC98DC71061bE33A28b3'], //for multiple recipients
        channel: "eip155:42:0xfaabb044AF5C19145cA4AE13CA12C419395A72FB", // your channel address
        env: "staging",
      });
      console.log("API repsonse: sent ", apiResponse);
      alert("Notification sent to the candidate");
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  ///send motification code ends

  if (loading) {
    return (
      <>
        <div className="jobapplicant-main-content1">
          <h2 class="font-medium leading-tight text-4xl mt-0  text-black-600 jobapplicant-title2">
            JOB APPLICANTS
          </h2>
          <div className="jobapplicant-front-buttons">
            <button
              onClick={() => {
                setApproval(true);
                setApproved(false);
              }}
              for="first_name"
              className={
                approval
                  ? "block text-large font-medium text-gray-900 dark:text-gray-300 purchased-name pc-tab-button"
                  : "block text-large font-medium text-gray-900 dark:text-gray-300 purchased-name"
              }
              value={approval}
            >
              Approval
            </button>
            ​
            <button
              onClick={() => {
                setApproved(true);
                setApproval(false);
              }}
              for="first_name"
              className={
                approved
                  ? "block text-large font-medium text-gray-900 dark:text-gray-300 created-name pc-tab-button"
                  : "block text-large font-medium text-gray-900 dark:text-gray-300 created-name"
              }
              value={approved}
            >
              Approved
            </button>
          </div>
          {approval === true ? (
            data.length > 0 ? (
              <div className="jobapplicant-main-form">
                {data.map((inde) => {
                  // console.log(inde)
                  return (
                    <div className="jobapplicant-information">
                      <div className="jobapplicant-user-icon">
                        <div class="overflow-hidden relative w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600 ">
                          <svg
                            class=""
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        ​
                        <div className="jobapplicant-username">
                          <label
                            for="first_name"
                            class="block  text-sm font-medium text-gray-900 dark:text-gray-300 applicant-username-block"
                          >
                            {inde[1]}
                          </label>
                        </div>
                      </div>
                      ​
                      <div className="jobapplicant-years-qualification">
                        <div className="jobapplicant-section1">
                          <div className="jobapplicant-qualification">
                            <div className="jobapplicant-year">
                              <label
                                for="first_name"
                                class="block  text-sm font-medium text-gray-900 dark:text-gray-300 jobapplicant-year-name "
                              >
                                Years of Exprience:
                              </label>
                              ​
                              <label
                                for="first_name"
                                class="block text-sm font-medium text-gray-900 dark:text-gray-300 jobapplicant-year-no"
                              >
                                5
                              </label>
                            </div>
                            ​
                            <label
                              for="first_name"
                              class="block text-sm font-medium text-gray-900 dark:text-gray-300 jobapplicant-name jobapplicant-qualification-main"
                            >
                              Qualifications:
                            </label>
                            <label
                              for="first_name"
                              class="block  text-sm font-medium text-gray-900 dark:text-gray-300 jobapplicant-bech jobapplicant-qualification-main"
                            >
                              {inde[2]}
                            </label>
                          </div>
                          <div className="jobapplicant-description">
                            <label
                              for="first_name"
                              class="block  text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              {inde[3]}
                            </label>
                          </div>
                        </div>
                        ​
                        <div className="jobapplicant-main-button">
                          <div className="jobapplicant-button">
                            <button
                              type="button"
                              id={inde[6]}
                              class="text-white  font-medium rounded-lg text-sm px-9 py-3 mr-3 jobapplicant-invite-button1"
                              onClick={(e) => {
                                updateApproveDisapprove(inde[4], inde[5], 1, e);
                                // sendNotification(
                                //   "0xe57f4c84539a6414C4Cf48f135210e01c477EFE0"
                                // );
                              }}
                            >
                              Approve
                            </button>
                          </div>
                          ​
                          <div className="jobapplicant-button">
                            <button
                              type="button"
                              class="text-white  font-medium rounded-lg text-sm px-9 py-3 mr-3  jobapplicant-invite-button2"
                              onClick={() => {
                                updateApproveDisapprove(inde[4], inde[5], 0);
                              }}
                            >
                              Disapprove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <>
                <div className="jobapplicant-main-form">No Applicants Yet!</div>
              </>
            )
          ) : data2.length > 0 ? (
            <>
              {/* -------------------table2------------------------------------------------------- */}
              <div className="jobapplicant-main-content1">
                <div className="jobapplicant-main-form">
                  {data2.map((inde) => {
                    return (
                      <div className="jobapplicant-information">
                        <div className="jobapplicant-user-icon">
                          <div class="overflow-hidden relative w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600 ">
                            <svg
                              class=""
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          </div>
                          ​
                          <div className="jobapplicant-username">
                            <label
                              for="first_name"
                              class="block  text-sm font-medium text-gray-900 dark:text-gray-300  applicant-username-block"
                            >
                              {inde[1]}
                            </label>
                          </div>
                        </div>
                        ​
                        <div className="jobapplicant-years-qualification">
                          <div className="jobapplicant-qualification">
                            <div className="jobapplicant-year">
                              <label
                                for="first_name"
                                class="block  text-sm font-medium text-gray-900 dark:text-gray-300 jobapplicant-year-name"
                              >
                                Year of Exprience:
                              </label>
                              ​
                              <label
                                for="first_name"
                                class="block text-sm font-medium text-gray-900 dark:text-gray-300 jobapplicant-year-no"
                              >
                                5
                              </label>
                            </div>
                            ​
                            <label
                              for="first_name"
                              class="block text-sm font-medium text-gray-900 dark:text-gray-300 jobapplicant-name-section2 jobapplicant-qualification-main"
                            >
                              Qualifications:
                            </label>
                            <label
                              for="first_name"
                              class="block  text-sm font-medium text-gray-900 dark:text-gray-300 jobapplicant-bech jobapplicant-qualification-main"
                            >
                              {inde[2]}{" "}
                            </label>
                            ​
                            <div className="jobapplicant-main-button">
                              <div className="jobapplicant-button">
                                <button
                                  type="button"
                                  class="text-white  cursor-not-allowed font-medium rounded-lg text-sm px-9 py-3 mr-3 text-center jobapplicant-approved-button01"
                                  disabled=""
                                >
                                  Approved
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="jobapplicant-description-section2">
                          <label
                            for="first_name"
                            class="block  text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            {inde[3]}
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="jobapplicant-main-form">No Applicants Yet!</div>
            </>
          )}
        </div>
      </>
    );
  } else {
    console.log("loading");
  }
}
export default JobApplicant;
