import React, { useState, useRef, useEffect } from "react";
import data from "../data";
import Popup from "../popup/CandidatePopup";
// import Upload from "./upload";
import CompanyLogo from "../../assets/images/companyprofile.png";
import GoogleLogo from "../../assets/images/google.png";
import TwitterLogo from "../../assets/images/twitter.png";
import LinkedlnLogo from "../../assets/images/linkedin.png";
import FacebookLogo from "../../assets/images/facebook.png";
import Upload from "../../assets/images/uploadimg.svg";
import { connect } from "@tableland/sdk";
import { Web3Storage } from "web3.storage";

import "./feed.css";
import Axios from "axios";

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGZiNzE4QzgwYmJlYUQwNTAzYThFMjgzMmI2MDU0RkVmOUU4MzA2NzQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjE0MTEzNjczNTAsIm5hbWUiOiJUcnkifQ.srPPE7JD3gn8xEBCgQQs_8wyo6rDrXaDWC0QM8FtChA";

const client = new Web3Storage({ token: API_TOKEN });

function CandidateFeed() {
  const [isOpen, setIsOpen] = useState(false);
  const chooseImg = useRef("");

  const [newData, setNewData] = useState();
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [additionalQuestions, setAdditonalQuestions] = useState({});
  var [file, setFile] = useState("");

  const boxRef = useRef(null);

  const [que, setQue] = useState([]);
  const [credentials, setCredentials] = useState({
    candidate_id: "",
    job_id: "",
    ans_of_addition_q: "",
    resume_cid: "",
    cover_latter: "",
    assesment_log_id: "",
    status: "",
    schedule_interview: "",
  });

  async function handleupload() {
    // const fileInput = document.querySelector('input[type="file"]');
    // console.log(fileInput.files);

    const fileUpload = file;
    const rootCid = await client.put(fileUpload, {
      name: "dehitas profile images",
      maxRetries: 3,
    });
    console.log(rootCid);
    // const res = await client.get(rootCid);
    // const files = await res.files();
    // console.log(files);
    // const url = URL.createObjectURL(files[0]);
    // console.log(url);
    // console.log(files[0].cid);
    // setFile(url);
  }

  async function storeWithProgress(file) {
    // show the root cid as soon as it's ready
    const onRootCidReady = (cid) => {
      console.log("uploading files with cid:", cid);
    };

    // when each chunk is stored, update the percentage complete and display
    const totalSize = file.map((f) => f.size).reduce((a, b) => a + b, 0);
    let uploaded = 0;

    const onStoredChunk = (size) => {
      uploaded += size;
      const pct = 100 * (uploaded / totalSize);
      console.log(`Uploading... ${pct.toFixed(2)}% complete`);
    };

    // makeStorageClient returns an authorized Web3.Storage client instance
    // const client = makeStorageClient();

    // client.put will invoke our callbacks during the upload
    // and return the root cid when the upload completes
    return client.put(file, { onRootCidReady, onStoredChunk });
  }

  const togglePopup = async (newId) => {
    const name = "job_table_80001_2018";
    const tableland = await connect({
      network: "testnet",
      chain: "polygon-mumbai",
    });
    const table = "company_table_80001_1730";
    const readRes = await tableland.read(
      `SELECT * FROM ${name} where job_id=${newId}`
    );
    // console.log(readRes);

    let companyId = readRes["rows"][0][1];
    const response = await tableland.read(
      `SELECT name,logo FROM ${table} where company_id=${companyId}`
    );
    let company_logo = "https://ipfs.io/ipfs/" + response["rows"][0][1];
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(readRes["rows"][0][10]);
    let date_array = d.toString().split(" ", 4);
    let final_array = [];
    for (let i = 1; i < date_array.length; i++) {
      final_array.push(date_array[i]);
    }
    data2.push([
      company_logo,
      readRes["rows"][0][3],
      response["rows"][0][0],
      readRes["rows"][0][4],
      readRes["rows"][0][11],
      readRes["rows"][0][12],
      readRes["rows"][0][13],
      readRes["rows"][0][14],
      readRes["rows"][0][15],
      readRes["rows"][0][16],
      readRes["rows"][0][5],
      readRes["rows"][0][9],
      final_array.toString(),
    ]);

    setData2(data2);
    // setNewData(data[newId]);
    // console.log(data2[0][4]);
    // console.log(data[newId]);
    setIsOpen(!isOpen);
  };

  const [isForm, setIsForm] = useState(false);

  const [formData, setFormData] = useState();

  const formPopup = async (formId) => {
    const name = "job_table_80001_2018";
    const tableland = await connect({
      network: "testnet",
      chain: "polygon-mumbai",
    });
    const readRes = await tableland.read(
      `SELECT * FROM ${name} where job_id=${formId}`
    );
    console.log(readRes);
    let url =
      "https://ipfs.io/ipfs/" + readRes["rows"][0][8] + "/questions.json";
    console.log(url);
    await Axios.get(url).then((response) => {
      let no_of_questions = response.data.questions.length;
      for (let i = 0; i < no_of_questions; i++) {
        que.push([response.data.questions[i]]);
      }
      setQue(que);
      // setContent(response.data.body);
      // setLoading(false);
    });
    data3.push([
      readRes["rows"][0][3],
      readRes["rows"][0][4],
      readRes["rows"][0][11],
      readRes["rows"][0][12],
      readRes["rows"][0][13],
      readRes["rows"][0][14],
      readRes["rows"][0][15],
    ]);
    setData3(data3);
    setFormData(data[formId]);
    // console.log(data[formId]);
    setIsForm(!isForm);
    for (let i = 0; i < readRes["rows"][0][8].length; i++) {}
  };

  const applyForJob = async () => {
    console.log(file);
    console.log(message);
    console.log(additionalQuestions);
    await handleupload();

    // console.log(file);
  };

  const [message, setMessage] = useState("");
  const [resume, setResume] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);

    console.log("value is:", event.target.value);
  };

  const handleAnswerChange = (e, id) => {
    var result = additionalQuestions;
    // result = result.map((x) => {
    //   //<- use map on result to find element to update using id
    //   if (x[id] === id) x[id] = e.target.value;
    //   return x;
    // });
    result[id] = e.target.value;
    console.log(result);
    setAdditonalQuestions(result);

    // console.log("value is:", event.target.value);
  };
  function useOutsideAlerter(ref, setIsForm, isForm, setIsOpen, isOpen) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          // alert("You clicked outside of me!");

          setAdditonalQuestions({});
          setQue([]);
          if (isForm) {
            setIsForm(!isForm);
          }
          if (isOpen) {
            setIsOpen(!isOpen);
          }
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [boxRef, isForm, isOpen]);
  }

  useOutsideAlerter(boxRef, setIsForm, isForm, setIsOpen, isOpen);

  const [data1, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const showJobPosts = async () => {
    const name = "job_table_80001_2018";
    const tableland = await connect({
      network: "testnet",
      chain: "polygon-mumbai",
    });
    const table = "company_table_80001_1730";
    const readRes = await tableland.read(`SELECT * FROM ${name}`);
    // console.log(readRes);
    for (let i = 0; i < readRes["rows"].length; i++) {
      let jobId = readRes["rows"][i][0];
      let companyId = readRes["rows"][i][1];
      const response = await tableland.read(
        `SELECT name,logo FROM ${table} where company_id=${companyId}`
      );
      let company_logo = "https://ipfs.io/ipfs/" + response["rows"][0][1];
      data1.push([
        company_logo,
        readRes["rows"][i][3],
        response["rows"][0][0],
        readRes["rows"][i][5],
        readRes["rows"][i][9],
        readRes["rows"][i][4],
        jobId,
      ]);
    }
    setData(data1);
    setLoading(true);
  };

  useEffect(() => {
    // console.log(additionalQuestions);
    // console.log(titleCase("hello there I'm Jaydip"));
    showJobPosts();
    console.log(file);
  }, [file]);
  function titleCase(str) {
    str = str.toLowerCase().split(" ");
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(" ");
  }

  return (
    <>
      <div className="candidate-jobfeed-main-content">
        <div className="candidate-jobfeed-main-right">
          <div className="candidate-jobfeed-header">
            Job Feed
            <div className="candidate-jobfeed-header2">Saved Job (80)</div>
          </div>
          {data1.map((inde) => {
            return (
              <div className="candidate-right-side">
                <div className="candidate-jobfeed-outer">
                  <div className="candidate-jobfeed-top">
                    <img
                      className="candidate-jobfeed-logo"
                      src={inde[0]}
                      alt="company-logo"
                    />
                    <div className="candidate-jobfeed-title">{inde[1]}</div>
                  </div>
                  <div className="candidate-jobfeed-middle">
                    <div className="candidate-jobfeed-companyname">
                      {inde[2]}
                    </div>
                    <div className="candidate-jobfeed-location">{inde[3]}</div>
                    <div className="candidate-jobfeed-experience">
                      {inde[4]} year experience
                    </div>
                  </div>
                  <div className="candidate-jobfeed-basic-des">{inde[5]}</div>

                  <button
                    onClick={() => togglePopup(inde[6])}
                    className="candidate-jobfeed-button-more"
                  >
                    More
                  </button>
                  <button
                    className="candidate-jobfeed-button"
                    onClick={() => {
                      formPopup(inde[6]);
                    }}
                  >
                    Apply
                  </button>
                  {isOpen && (
                    <div ref={boxRef}>
                      <Popup
                        content={
                          <>
                            <div className="popup-form">
                              <div className="main-sidebar-popup">
                                <div className="popup1">
                                  <div className="candidate-more-top">
                                    <img
                                      className="candidate-more-logo"
                                      src={data2[0][0]}
                                      alt="company-logo"
                                    />
                                    <div className="candidate-more-title">
                                      {data2[0][1]}
                                    </div>
                                  </div>
                                  <div className="candidate-more-middle">
                                    <div className="candidate-more-companyname">
                                      {data2[0][2]}
                                    </div>
                                    {/* <div className="candidate-more-location">
                                      {newData.location}
                                    </div> */}
                                  </div>
                                  <div className="candidate-more-desc">
                                    {data2[0][3]}
                                  </div>
                                </div>
                                <div className="popup-sidebar">
                                  <div className="candidate-more-top-sidebar">
                                    <img
                                      className="candidate-more-logo-sidebar"
                                      src={data2[0][0]}
                                      alt="company-logo"
                                    />
                                  </div>
                                  <div className="candidate-more-location-sidebar">
                                    <div className="candidate-more-companyname">
                                      {data2[0][2]}
                                    </div>
                                  </div>
                                  <div className="candidate-more-location-sidebar">
                                    <span className="sidebar2-span">
                                      Location
                                    </span>
                                    {data2[0][10]}
                                  </div>
                                  <div className="candidate-more-location-sidebar">
                                    <span className="sidebar2-span">
                                      Experience
                                    </span>
                                    {data2[0][11]} Years
                                  </div>
                                  <div className="candidate-more-location-sidebar">
                                    <span className="sidebar2-span">
                                      Posted a job
                                    </span>
                                    {data2[0][12]}
                                  </div>
                                  <div className="candidate-more-location-sidebar">
                                    <span className="sidebar2-span">
                                      Share Job
                                    </span>
                                    <div className="sharejob-icon">
                                      <a href="https://accounts.google.com/">
                                        <img
                                          src={GoogleLogo}
                                          className="candidate-form-upload-sharejob"
                                          alt="upload_img"
                                        />
                                      </a>
                                      <a href="https://twitter.com/login">
                                        <img
                                          src={TwitterLogo}
                                          className="candidate-form-upload-sharejob"
                                          alt="upload_img"
                                        />
                                      </a>
                                      <a href="https://www.facebook.com/login/">
                                        <img
                                          src={FacebookLogo}
                                          className="candidate-form-upload-sharejob"
                                          alt="upload_img"
                                        />
                                      </a>
                                      <a href="https://www.linkedin.com/login">
                                        <img
                                          src={LinkedlnLogo}
                                          className="candidate-form-upload-sharejob"
                                          alt="upload_img"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <span className="primaryskill-span ">
                                Primary Skills:
                              </span>
                              <div className="candidate-more-skills-tag">
                                {(() => {
                                  if (data2[0][4]) {
                                    return (
                                      <div>
                                        <div className="candidate-more-skills">
                                          {titleCase(data2[0][4])}
                                        </div>
                                      </div>
                                    );
                                  }
                                })()}

                                {(() => {
                                  if (data2[0][5]) {
                                    return (
                                      <div>
                                        <div className="candidate-more-skills">
                                          {titleCase(data2[0][5])}
                                        </div>
                                      </div>
                                    );
                                  }
                                })()}
                                {(() => {
                                  if (data2[0][6]) {
                                    return (
                                      <div>
                                        <div className="candidate-more-skills">
                                          {titleCase(data2[0][6])}
                                        </div>
                                      </div>
                                    );
                                  }
                                })()}
                                {(() => {
                                  if (data2[0][7]) {
                                    return (
                                      <div>
                                        <div className="candidate-more-skills">
                                          {titleCase(data2[0][7])}
                                        </div>
                                      </div>
                                    );
                                  }
                                })()}
                                {(() => {
                                  if (data2[0][8]) {
                                    return (
                                      <div>
                                        <div className="candidate-more-skills">
                                          {titleCase(data2[0][8])}
                                        </div>
                                      </div>
                                    );
                                  }
                                })()}
                              </div>
                              <span className="primaryskill-span ">
                                Secondary Skills:
                              </span>
                              <div className="candidate-more-skills-tag">
                                {(() => {
                                  if (data2[0][9]) {
                                    return (
                                      <div>
                                        <div className="candidate-more-skills">
                                          {titleCase(data2[0][9])}
                                        </div>
                                      </div>
                                    );
                                  }
                                })()}
                                {/* <div className="candidate-more-skills">
                                  {newData.Skills6}
                                </div>
                                <div className="candidate-more-skills">
                                  {newData.Skills7}
                                </div>
                                <div className="candidate-more-skills">
                                  {newData.Skills8}
                                </div> */}
                              </div>

                              <div className="popup2">
                                <div className="candidate-more-btn-size">
                                  <button
                                    className="candidate-more-button"
                                    onClick={() => {
                                      formPopup(boxRef.id);
                                    }}
                                  >
                                    Apply
                                  </button>
                                </div>
                              </div>
                            </div>
                          </>
                        }
                        handleClose={togglePopup}
                      />
                    </div>
                  )}

                  {isForm && (
                    <div ref={boxRef}>
                      <Popup
                        content={
                          <>
                            <div>
                              <div className="candidate-form-header">
                                Application Form
                              </div>
                              <div className="candidate-form-attachment-header">
                                Attachments
                              </div>
                              {/* <input className="form-upload-btn" type="file" /> */}
                              <div
                                className="candidate-form-upload-imgdiv"
                                onClick={() => {
                                  chooseImg.current.click();
                                }}
                              >
                                <img
                                  src={Upload}
                                  id="resume_img"
                                  className="candidate-form-upload-img"
                                  alt="upload_img"
                                />
                              </div>
                              <input
                                type="file"
                                ref={chooseImg}
                                name="fileupload"
                                id="input"
                                hidden
                                onChange={(e) => setFile(e.target.files[0])}
                              ></input>
                              <div className="applicationform-block">
                                <div className="candidate-form-title">
                                  {data3[0][0]}
                                </div>
                                <div className="candidate-form-desc">
                                  {data3[0][1]}
                                </div>
                                <div className="candidate-skills-header">
                                  Skills and Expertise
                                </div>
                                <div className="candidate-more-skills-tag">
                                  {(() => {
                                    if (data3[0][2]) {
                                      return (
                                        <div>
                                          <div className="candidate-form-skills">
                                            {titleCase(data3[0][2])}
                                          </div>
                                        </div>
                                      );
                                    }
                                  })()}
                                  {(() => {
                                    if (data3[0][3]) {
                                      return (
                                        <div>
                                          <div className="candidate-form-skills">
                                            {titleCase(data3[0][3])}
                                          </div>
                                        </div>
                                      );
                                    }
                                  })()}
                                  {(() => {
                                    if (data3[0][4]) {
                                      return (
                                        <div>
                                          <div className="candidate-form-skills">
                                            {titleCase(data3[0][4])}
                                          </div>
                                        </div>
                                      );
                                    }
                                  })()}
                                  {(() => {
                                    if (data3[0][5]) {
                                      return (
                                        <div>
                                          <div className="candidate-form-skills">
                                            {titleCase(data3[0][5])}
                                          </div>
                                        </div>
                                      );
                                    }
                                  })()}
                                  {(() => {
                                    if (data3[0][6]) {
                                      return (
                                        <div>
                                          <div className="candidate-form-skills">
                                            {titleCase(data3[0][6])}
                                          </div>
                                        </div>
                                      );
                                    }
                                  })()}
                                </div>
                                <div className="candidate-cover-header">
                                  Cover Letter
                                </div>
                                <textarea
                                  className="candidate-text-box"
                                  name="message"
                                  onChange={handleChange}
                                  value={message}
                                />
                                {que.map((inde, key) => {
                                  // console.log(key);
                                  return (
                                    <div>
                                      <div className="candidate-form-question">
                                        {inde[0]}
                                      </div>
                                      <textarea
                                        className="candidate-form-question-box"
                                        name={`message${key}`}
                                        onChange={(e) =>
                                          handleAnswerChange(e, key)
                                        }
                                        // defaultValue={message1}
                                      />
                                    </div>
                                  );
                                })}
                                {/* <div className="candidate-form-question">
                                  {formData.Question2}
                                </div>
                                <textarea
                                  className="candidate-form-question-box"
                                  name="message"
                                  onChange={handleChange}
                                  value={message}
                                /> */}

                                <div className="candidate-more-btn-size-application">
                                  <button
                                    className="candidate-form-btn"
                                    onClick={() => {
                                      // applyForJob();
                                      storeWithProgress(file);
                                    }}
                                  >
                                    Submit
                                  </button>
                                </div>
                              </div>
                            </div>
                          </>
                        }
                        handleClose={formPopup}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="candidate-jobfeed-main-left">
          <div className="cancel-filter-apply">
            {/* <button type="button" class="candidate-cancel-btn">
              Cancel
            </button> */}
            <span>Filter by</span>
            <button
              type="button"
              class="text-white   font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  candidate-apply-btn"
            >
              Apply
            </button>
          </div>
          <div className="expriencelevel-candidate">
            <h3 class=" font-semibold text-gray-900 dark:text-white font-['Montserrat'] ex-level-candidates">
              Exprience Level:
            </h3>
            <div class="flex items-center pl-3 font-['Open_Sans']">
              <input
                id="vue-checkbox"
                type="checkbox"
                value=""
                class="  w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="vue-checkbox"
                class="py-3 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300 font-['Open_Sans']"
              >
                Entry Level
              </label>
            </div>
            <div class="flex items-center pl-3">
              <input
                id="vue-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 "
              />
              <label
                for="vue-checkbox"
                class="py-3 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300 font-['Open_Sans']"
              >
                Associate Level
              </label>
            </div>
            <div class="flex items-center pl-3">
              <input
                id="vue-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="vue-checkbox"
                class="py-3 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300 font-['Open_Sans']"
              >
                Expert Level
              </label>
            </div>
          </div>
          <div className="jobtype-candidate">
            <h3 class=" font-semibold text-gray-900 dark:text-white font-['Montserrat'] ex-level-candidates">
              Job Type:
            </h3>
            <div class="flex items-center pl-3">
              <input
                id="vue-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="vue-checkbox"
                class="py-3 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300 font-['Open_Sans']"
              >
                On-Site
              </label>
            </div>
            <div class="flex items-center pl-3">
              <input
                id="vue-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="vue-checkbox"
                class="py-3 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300 font-['Open_Sans']"
              >
                Hybrid
              </label>
            </div>
            <div class="flex items-center pl-3">
              <input
                id="vue-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="vue-checkbox"
                class="py-3 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300 font-['Open_Sans']"
              >
                Remote
              </label>
            </div>
          </div>
          <div className="technology-candidate">
            <h3 class=" font-semibold text-gray-900 dark:text-white font-['Montserrat'] ex-level-candidates">
              Technology:
            </h3>

            <div class="flex items-center pl-3">
              <input
                id="vue-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="vue-checkbox"
                class="py-3 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300 font-['Open_Sans']"
              >
                Vue JS
              </label>
            </div>

            <div class="flex items-center pl-3">
              <input
                id="vue-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="vue-checkbox"
                class="py-3 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300 font-['Open_Sans']"
              >
                Blockchain
              </label>
            </div>

            <div class="flex items-center pl-3">
              <input
                id="vue-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="vue-checkbox"
                class="py-3 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300 font-['Open_Sans']"
              >
                Wordpress
              </label>
            </div>

            <div class="flex items-center pl-3">
              <input
                id="react-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="react-checkbox"
                class="py-3 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300 font-['Open_Sans']"
              >
                React
              </label>
            </div>

            <div class="flex items-center pl-3">
              <input
                id="angular-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="angular-checkbox"
                class="py-3 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300 font-['Open_Sans']"
              >
                Angular
              </label>
            </div>

            <div class="flex items-center pl-3">
              <input
                id="laravel-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="laravel-checkbox"
                class="py-3 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300 font-['Open_Sans']"
              >
                Laravel
              </label>
            </div>
          </div>
          <div className="expriencelevel-candidate">
            <h3 class=" font-semibold text-gray-900 dark:text-white font-['Montserrat'] ex-level-candidates">
              Location:
            </h3>
            <div class="flex items-center pl-3">
              <input
                id="angular-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="angular-checkbox"
                class="py-3 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300 font-['Open_Sans']"
              >
                Brazil
              </label>
            </div>
            <div class="flex items-center pl-3">
              <input
                id="angular-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="angular-checkbox"
                class="py-3 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300 font-['Open_Sans']"
              >
                India
              </label>
            </div>
            <div class="flex items-center pl-3">
              <input
                id="angular-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="angular-checkbox"
                class="py-3 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300 font-['Open_Sans']"
              >
                China
              </label>
            </div>
            <div class="flex items-center pl-3">
              <input
                id="angular-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="angular-checkbox"
                class="py-3 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300 font-['Open_Sans']"
              >
                France
              </label>
            </div>
            <div class="flex items-center pl-3">
              <input
                id="angular-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="angular-checkbox"
                class="py-3 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300 font-['Open_Sans']"
              >
                Canada
              </label>
            </div>
            <div class="flex items-center pl-3">
              <input
                id="angular-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="angular-checkbox"
                class="py-3 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300 font-['Open_Sans']"
              >
                Australlia
              </label>
            </div>
            <div class="flex items-center pl-3">
              <input
                id="angular-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-500 dark:border-gray-500"
              />
              <label
                for="angular-checkbox"
                class="py-3 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300 font-['Open_Sans']"
              >
                Japan
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CandidateFeed;
