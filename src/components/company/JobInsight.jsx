import React from "react";
import "../company/styles/jobinsights.css";
import avtar from "../company/styles/companyprofile.png";
import * as EpnsAPI from "@epnsproject/sdk-restapi";
import * as ethers from "ethers";

function Jobinsights() {
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
          title: "Job Interview Scheduled",
          body: "Hello you Interview is Scheduled for the Job. good luck ",
        },
        payload: {
          title: `[sdk-test] payload title`,
          body: `sample msg body`,
          cta: "https://office.dehitas.xyz/?id=cZJte9SEh",
          img: "",
        },
        recipients: "eip155:42:0xe57f4c84539a6414C4Cf48f135210e01c477EFE0", // recipient address
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

  ///send notification code ends
  return (
    <>
      <div className="jobinsights-title">
        <h2 className="font-medium leading-tight text-4xl mt-0 mb-2 text-black-600">
          JOB INSIGHTS
        </h2>
      </div>
      <div className="jobinsights-main-content">
        <div className="jobinsights-main-information">
          <div className="jobinsights-user-icon">
            <div className="overflow-hidden relative w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600 ">
              <img
                className="w-10 h-10 rounded-full"
                src={avtar}
                alt="Rounded avatar"
              />
            </div>

            <div className="jobinsights-username">
              <label
                for="first_name"
                className="block text-large font-medium text-gray-900 dark:text-gray-300 jobinsights-name"
              >
                Username
              </label>
            </div>
            <div className="jobinsights-main-score">
              <div className="jobinsights-score">
                <label
                  for="first_name"
                  class="block text-large font-medium text-gray-900 dark:text-gray-300 jobinsights-score-name"
                >
                  Score:
                </label>
              </div>

              <div className="jobinsights-score">
                <label
                  for="first_name"
                  class="block text-large font-medium text-gray-900 dark:text-gray-300 jobinsights-score-number"
                >
                  10
                </label>
              </div>
            </div>
            <div className="jobinsights-select-date">
              <input
                type="date"
                placeholder="date"
                className="jobinsight-select-date-input"
              />
            </div>

            <div className="jobinsights-button">
              <button
                class="text-white  font-medium rounded-lg text-sm px-3 py-2   jobsights-button-interview"
                onClick={() => {
                  sendNotification(
                    "0x19193e458590f15A0180042E3518634165BADe39"
                  );
                }}
              >
                Schedule Interview
              </button>
            </div>
          </div>
          <div className="jobinsights-user-icon">
            <div className="overflow-hidden relative w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600 ">
              <img
                className="w-10 h-10 rounded-full"
                src={avtar}
                alt="Rounded avatar"
              />
            </div>

            <div className="jobinsights-username">
              <label
                for="first_name"
                className="block text-large font-medium text-gray-900 dark:text-gray-300 jobinsights-name"
              >
                Username
              </label>
            </div>
            <div className="jobinsights-main-score">
              <div className="jobinsights-score">
                <label
                  for="first_name"
                  class="block text-large font-medium text-gray-900 dark:text-gray-300 jobinsights-score-name"
                >
                  Score:
                </label>
              </div>

              <div className="jobinsights-score">
                <label
                  for="first_name"
                  class="block text-large font-medium text-gray-900 dark:text-gray-300 jobinsights-score-number"
                >
                  10
                </label>
              </div>
            </div>
            <div className="jobinsights-select-date">
              <input
                type="date"
                placeholder="date"
                className="jobinsight-select-date-input"
              />
            </div>

            <div className="jobinsights-button">
              <button class="text-white  font-medium rounded-lg text-sm px-3 py-2   jobsights-button-interview">
                Schedule Interview
              </button>
            </div>
          </div>
          <div className="jobinsights-user-icon">
            <div className="overflow-hidden relative w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600 ">
              <img
                class="w-10 h-10 rounded-full"
                src={avtar}
                alt="Rounded avatar"
              />
            </div>

            <div className="jobinsights-username">
              <label
                for="first_name"
                class="block text-large font-medium text-gray-900 dark:text-gray-300 jobinsights-name"
              >
                Username
              </label>
            </div>
            <div className="jobinsights-main-score">
              <div className="jobinsights-score">
                <label
                  for="first_name"
                  class="block text-large font-medium text-gray-900 dark:text-gray-300 jobinsights-score-name"
                >
                  Score:
                </label>
              </div>

              <div className="jobinsights-score">
                <label
                  for="first_name"
                  class="block text-large font-medium text-gray-900 dark:text-gray-300 jobinsights-score-number"
                >
                  10
                </label>
              </div>
            </div>
            <div className="jobinsights-select-date">
              <input
                type="date"
                placeholder="date"
                className="jobinsight-select-date-input"
              />
            </div>

            <div className="jobinsights-button">
              <button class="text-white   font-medium rounded-lg text-sm px-3 py-2  jobsights-button-interview">
                Schedule Interview
              </button>
            </div>
          </div>
          <div className="jobinsights-user-icon">
            <div className="overflow-hidden relative w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600 ">
              <img
                class="w-10 h-10 rounded-full"
                src={avtar}
                alt="Rounded avatar"
              />
            </div>

            <div className="jobinsights-username">
              <label
                for="first_name"
                class="block text-large font-medium text-gray-900 dark:text-gray-300 jobinsights-name"
              >
                Username
              </label>
            </div>
            <div className="jobinsights-main-score">
              <div className="jobinsights-score">
                <label
                  for="first_name"
                  class="block text-large font-medium text-gray-900 dark:text-gray-300 jobinsights-score-name"
                >
                  Score:
                </label>
              </div>

              <div className="jobinsights-score">
                <label
                  for="first_name"
                  class="block text-large font-medium text-gray-900 dark:text-gray-300 jobinsights-score-number"
                >
                  10
                </label>
              </div>
            </div>
            <div className="jobinsights-select-date">
              <input
                type="date"
                placeholder="date"
                className="jobinsight-select-date-input"
              />
            </div>

            <div className="jobinsights-button">
              <button
                type="button"
                class="text-white   font-medium rounded-lg text-sm px-3 py-2  f jobsights-button-interview"
              >
                Schedule Interview
              </button>
            </div>
          </div>
          <div className="jobinsights-user-icon">
            <div className="overflow-hidden relative w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600 ">
              <img
                class="w-10 h-10 rounded-full"
                src={avtar}
                alt="Rounded avatar"
              />
            </div>

            <div className="jobinsights-username">
              <label
                for="first_name"
                class="block text-large font-medium text-gray-900 dark:text-gray-300 jobinsights-name"
              >
                Username
              </label>
            </div>
            <div className="jobinsights-main-score">
              <div className="jobinsights-score">
                <label
                  for="first_name"
                  class="block text-large font-medium text-gray-900 dark:text-gray-300 jobinsights-score-name"
                >
                  Score:
                </label>
              </div>

              <div className="jobinsights-score">
                <label
                  for="first_name"
                  class="block text-large font-medium text-gray-900 dark:text-gray-300 jobinsights-score-number"
                >
                  10
                </label>
              </div>
            </div>
            <div className="jobinsights-select-date">
              <input
                type="date"
                placeholder="date"
                className="jobinsight-select-date-input-btn"
              />
            </div>

            <div className="jobinsights-button">
              <button
                type="button"
                class="text-white  font-medium rounded-lg text-sm px-3 py-2   jobsights-button-interview"
              >
                Schedule Interview
              </button>
            </div>
          </div>
          <div className="jobinsights-user-icon">
            <div className="overflow-hidden relative w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600 ">
              <img
                class="w-10 h-10 rounded-full"
                src={avtar}
                alt="Rounded avatar"
              />
            </div>

            <div className="jobinsights-username">
              <label
                for="first_name"
                class="block text-large font-medium text-gray-900 dark:text-gray-300 jobinsights-name"
              >
                Username
              </label>
            </div>
            <div className="jobinsights-main-score">
              <div className="jobinsights-score">
                <label
                  for="first_name"
                  class="block text-large font-medium text-gray-900 dark:text-gray-300 jobinsights-score-name"
                >
                  Score:
                </label>
              </div>

              <div className="jobinsights-score">
                <label
                  for="first_name"
                  class="block text-large font-medium text-gray-900 dark:text-gray-300 jobinsights-score-number"
                >
                  10
                </label>
              </div>
            </div>
            <div className="jobinsights-select-date">
              <input
                type="date"
                placeholder="date"
                className="jobinsight-select-date-input"
              />
            </div>
            <div className="jobinsights-button">
              <button
                type="button"
                class="text-white  font-medium rounded-lg text-sm px-3 py-2  jobsights-button-interview"
              >
                Schedule Interview
              </button>
            </div>
          </div>
          <div className="jobinsights-user-icon">
            <div className="overflow-hidden relative w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600 ">
              <img
                class="w-10 h-10 rounded-full"
                src={avtar}
                alt="Rounded avatar"
              />
            </div>

            <div className="jobinsights-username">
              <label
                for="first_name"
                class="block text-large font-medium text-gray-900 dark:text-gray-300 jobinsights-name"
              >
                Username
              </label>
            </div>
            <div className="jobinsights-main-score">
              <div className="jobinsights-score">
                <label
                  for="first_name"
                  class="block text-large font-medium text-gray-900 dark:text-gray-300 jobinsights-score-name"
                >
                  Score:
                </label>
              </div>

              <div className="jobinsights-score">
                <label
                  for="first_name"
                  class="block text-large font-medium text-gray-900 dark:text-gray-300 jobinsights-score-number"
                >
                  10
                </label>
              </div>
            </div>
            <div className="jobinsights-select-date">
              <input type="date" className="jobinsight-select-date-input" />
            </div>
            <div className="jobinsights-button">
              <button
                type="button"
                class="text-white font-medium rounded-lg text-sm px-3 py-2   jobsights-button-interview"
              >
                Schedule Interview
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Jobinsights;
