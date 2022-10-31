import React, { useEffect, useState } from "react";
import "../company/styles/jobpost.css";
import { connect } from "@tableland/sdk";
import Jobinsights from "./JobInsight";
import { useNavigate } from "react-router-dom";

function Jobpost() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  const showJobPosts = async () => {
    const name = "job_table_80001_2018";
    const tableland = await connect({
      network: "testnet",
      chain: "polygon-mumbai",
    });
    const table = "application_details_table_80001_2806";
    const readRes = await tableland.read(`SELECT * FROM ${name}`);
    for (let i = 0; i < readRes["rows"].length; i++) {
      let jobId = readRes["rows"][i][0];
      const response = await tableland.read(
        `SELECT * FROM ${table} where job_id=${jobId}`
      );
      let noOfApplicants = response["rows"].length;
      if (!data.find((item) => readRes["rows"][i][0] === item[4])) {
      data.push([
        readRes["rows"][i][3],
        readRes["rows"][i][4],
        noOfApplicants,
        jobId,
        readRes["rows"][i][0]
      ]);
    }
    }
    setData(data);
    setLoading(true);
  };
  const sendThis = (id) => {
    navigate(`/company/jobapplicant/?dummy=${JSON.stringify(id)}`);
  };
  const sendThat = (id) => {
    navigate(`/company/jobinsights/?dummy=${JSON.stringify(id)}`);
  };
  useEffect(() => {
    showJobPosts();
  }, []);

  if (loading) {
    return (
      <>
        <div className="myjobpost-title">
          <h2 class="font-medium leading-tight text-4xl mt-0 ">POSTED JOBS</h2>
        </div>
        <div className="myjobpost-main-content">
          {data.map((inde) => {
            return (
              <div className="myjobpost-main-form">
                <div className="myjobpost-information">
                  <div className="jobpost-username">
                    <label
                      for="first_name"
                      class="block mb-2 text-large font-medium text-gray-900 dark:text-gray-300 jobtitle-name"
                    >
                      {inde[0]}
                    </label>
                  </div>

                  <div className="myjobpost-years-qualification">
                    <div className="jobpost-qualification">
                      <div className="jobpost-year">
                        <label
                          for="first_name"
                          class="block  text-sm font-medium text-gray-900 dark:text-gray-300 job-applicant-name"
                        >
                          No. of applicants:
                        </label>

                        <label
                          for="first_name"
                          class="block text-sm font-medium text-gray-900 dark:text-gray-300 job-applicant-no"
                        >
                          {inde[2]}
                        </label>
                      </div>

                      <div className="flex-grow"> </div>

                      <div className="myjobpost-main-button">
                        <div className="myjobpost-button">
                          <button
                            type="button"
                            class="text-white  font-medium rounded-lg text-sm px-6 py-3 mr-3 mb-3   focus:outline-none job-insights-button"
                            onClick={() => sendThat(inde[3])}
                          >
                            Insights
                          </button>
                        </div>
                        <div className="myjobpost-button">
                          <button
                            type="button"
                            class="text-white   font-medium rounded-lg text-sm px-6 py-3 mr-3 mb-3  focus:outline-none  jobpost-applicant-button"
                            onClick={() => sendThis(inde[3])}
                          >
                            Applicants
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="jobpost-description">
                    <label
                      for="first_name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {inde[1]}
                    </label>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  } else {
    console.log("loading");
  }
}
export default Jobpost;
