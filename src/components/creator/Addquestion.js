import React, {
  useEffect,
  useState,
  useRef,
} from "react";
import "../creator/Addquestion.css";
import axios from "axios";
import { connect as TBLconnect } from "@tableland/sdk";
import { useAccount, useConnect } from "wagmi";
import { useNavigate } from "react-router-dom";
import { insert_creators_questions_table } from "../TableQueries";
// import { EditorState, convertToRaw, convertFromHTML, convertFromRaw } from "draft-js";
// import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import parser from "html-react-parser";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Backlogo from "./Images/back_logo";
import Fyi from "./Images/information.svg";
import Cookies from "universal-cookie";
import Addbtn from "./Images/add-svgrepo-com.svg";
import { InjectedConnector } from "@wagmi/core";
import LoadingIcon from "../walletconnect/LoadingIcon";
import Select from "react-select";
import { countryArr } from "../registartionforms/CountryList";
import parse from "html-react-parser";


export default function AddQuestion() {
  // let navigate = useNavigate();
  const cookies = new Cookies();
  const difficultyOption = [
    ["Easy"], ["Medium"], ["Difficult"]
  ]
  // const [optionList, setOptionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [setNumber, setSetNumber] = useState(null);
  const [category, setCategory] = useState(null);

  const [correct1, setCorrect1] = useState("0");

  const [repoTableName, setRepoTableName] = useState("");
  const [questionTableName, setQuestionTableName] = useState("");

  const [allRepos, setAllRepos] = useState([]);
  const [privacy, setPrivacy] = useState(0);
  const [creatorId, setCreatorId] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("loading...");
  const [primarySkills, setPrimarySkills] = useState([]);
  const [secondarySkills, setSecondarySkills] = useState([]);
  const [selectedPrimarySkills, setSelectedPrimarySkills] = useState([]);
  const [selectedSecondarySkills, setSelectedSecondarySkills] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [selectedNation, setSelectedNation] = useState([]);
  const [creatorsProcessedData, setCreatorsProcessedData] = useState(null);
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const navigate = useNavigate();

  const fetchSkill = async () => {
    const name = "skill_table_80001_1735";
    const tableland = await TBLconnect({
      network: "testnet",
      chain: "polygon-mumbai",
    });
    const readRes = await tableland.read(`SELECT * FROM ${name}`);
    // console.log(readRes.rows);
    // setAllSkills(readRes.rows);
    const filterSkills = readRes.rows.map((skill, i) => {
      return { value: skill[0], label: skill[1] }
    });
    setPrimarySkills(filterSkills);
    setSecondarySkills(filterSkills);
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


  const getRepoTable = () => {
    if (!isConnected) {
      connect();
    }
    // console.log(address);
    var res_data = JSON.stringify({
      "walletAddress": address
    });

    var config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/creator/getTables`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: res_data
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        console.log(response.data);
        setRepoTableName(response.data.repo_table);
        setQuestionTableName(response.data.question_table);
        if (response.data.repo_table === null || response.data.repo_table === "") {
          setTimeout(() => {
            setLoadingMessage("Please create a question table before proceeding...");
            setLoading(true);
            navigate("/role/creator");
          }, 5000)
        }
      })
      .catch(function (error) {
        console.log(error);
        setLoadingMessage("Something went wrong...")
      });
  }

  const fetchRepositoriesNames = async () => {
    const tableland = await TBLconnect({
      network: "testnet",
      chain: "polygon-mumbai",
    });
    // console.log(tableland);
    const readRes = await tableland.read(`SELECT repo_name from ${repoTableName}`);
    // const readRes = await tableland.read(`SELECT * FROM ${name}`);
    const data = readRes.rows;
    // console.log(readRes.rows);
    setAllRepos(readRes.rows);
    setCreatorId(cookies.get("creatorID"));
    setLoading(false);
  }

  //single Question
  const editorRef_singleQ = useRef(null);
  const editorRef_singleoption1 = useRef(null);
  const editorRef_singleoption2 = useRef(null);
  const editorRef_singleoption3 = useRef(null);
  const editorRef_singleoption4 = useRef(null);
  const editorRef_singleoption5 = useRef(null);
  const editorRef_solution = useRef(null);

  const submitQuestion = async () => {
    // const parseHtml = editorRef_singleQ.current.getContent();
    // console.log(parseHtml, category);
    // if (!parseHtml || !category || correct1 === -1) {
    //   return;
    // }
    setLoadingMessage("Adding the questions...")
    setLoading(true);
    console.log("I am not comfortable");
    const question = "'" + editorRef_singleQ.current.getContent() + "'";
    const option1 = "'" + editorRef_singleoption1.current.getContent() + "'";
    const option2 = "'" + editorRef_singleoption2.current.getContent() + "'";
    const option3 = "'" + editorRef_singleoption3.current.getContent() + "'";
    const option4 = "'" + editorRef_singleoption4.current.getContent() + "'";
    const option5 = "'" + editorRef_singleoption5.current.getContent() + "'";
    let correct = "'" + editorRef_singleoption1.current.getContent() + "'";
    switch (correct1) {
      case 1:
        correct = "'" + editorRef_singleoption1.current.getContent() + "'";
        break;
      case 2:
        correct = "'" + editorRef_singleoption2.current.getContent() + "'";
        break;
      case 3:
        correct = "'" + editorRef_singleoption3.current.getContent() + "'";
        break;
      case 4:
        correct = "'" + editorRef_singleoption4.current.getContent() + "'";
        break;
      case 5:
        correct = "'" + editorRef_singleoption5.current.getContent() + "'";
        break;
    }

    const solution = "'" + editorRef_solution.current.getContent() + "'";
    const primaryTags = "'" + selectedPrimarySkills['label'] + "'";
    const secondaryTags = "'" + selectedSecondarySkills.join() + "'";
    const diff = "'" + difficulty + "'";
    const repo = "'" + selectedRepo + "'";
    const priv = privacy;

    console.log(question, option1, option2, option3, option4, option5, correct, solution, primaryTags, secondaryTags, diff, repo, priv);
    console.log(Math.floor(new Date().getTime() / 1000));

    try {
      const creatorsData = await insert_creators_questions_table(
        questionTableName,
        "'" + address + "'",
        question,
        option1,
        option2,
        option3,
        option4,
        option5,
        correct,
        solution,
        primaryTags,
        secondaryTags,
        "'" + selectedNation + "'",
        Math.floor(new Date().getTime() / 1000),
        diff,
        repo,
        priv
      );
      setCreatorsProcessedData(creatorsData);
    } catch {
      setTimeout(() => {
        setLoadingMessage("Something went wrong...")
        setLoading(false);
      }, 5000);
    }
  };

  const storeToAPI = async () => {
    const tableland = await TBLconnect({
      network: "testnet",
      chain: "polygon-mumbai",
    });
    const lastEntry = await tableland.read(`SELECT creators_question_id FROM ${questionTableName} ORDER BY creators_question_id DESC LIMIT 1`);
    console.log(lastEntry.rows[0][0]);

    const customConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    var data = JSON.stringify({
      "creators_question_id": lastEntry.rows[0][0],
      "creators_questions_table_name": questionTableName
    });

    var config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/toBeVerified`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setLoadingMessage("Data inserted successfully...");
        setLoading(false);
        setCreatorsProcessedData(null);
      })
      .catch(function (error) {
        setTimeout(() => {
          setLoadingMessage("Unprocessed data...");
          setLoading(false);
        }, 5000);
        setCreatorsProcessedData(null);
      });
  }

  useEffect(() => {
    try {
      if (primarySkills.length === 0) {
        fetchSkill();
        getRepoTable();
      }
    } catch {
      setLoadingMessage("Please refresh the page...");
    }
  }, []);

  useEffect(() => {
    if (repoTableName) {
      fetchRepositoriesNames();
    }
  }, [repoTableName]);

  useEffect(() => {
    console.log(selectedPrimarySkills)
  }, [selectedPrimarySkills]);

  useEffect(() => {
    console.log(selectedSecondarySkills)
    console.log(selectedSecondarySkills.join());
  }, [selectedSecondarySkills]);

  useEffect(() => {
    console.log(selectedNation)
  }, [selectedNation]);

  useEffect(() => {
    if (creatorsProcessedData) {
      console.log(creatorsProcessedData);
      if (creatorsProcessedData.hash) {
        storeToAPI();
      }
      setTimeout(() => {
        setLoadingMessage("Their was some error processing the data...");
        setLoading(false);
      }, 5000)
    }
  }, [creatorsProcessedData])

  if (loading) {
    return (
      <div style={{ height: '85vh' }}>
        <LoadingIcon message={loadingMessage} />
      </div>
    )
  }
  else {
    return (
      <>
        <div className="Add-Questionspage">
          <div className="Add-Enter_Questions">

            {/* // Only for one Question */}
            <div className="Question-parrent">
              {/* <div className="Instruction">Enter Main Question Overehere.</div> */}
              <div className="Question-field">
                <input
                  id="my-file"
                  type="file"
                  name="my-file"
                  style={{ display: "none" }}
                  onChange={() => {
                    console.log("data");
                  }}
                />

                <Editor
                  apiKey=""
                  onInit={(evt, editor) => (editorRef_singleQ.current = editor)}
                  initialValue="<p></p>"
                  init={{
                    placeholder: "Please enter your question here...",
                    height: 500,
                    menubar: false,
                    statusbar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | image",
                    image_title: true,
                    automatic_uploads: true,
                    file_picker_types: "image",
                    file_picker_callback: function (callback, value, meta) {
                      if (meta.filetype === "image") {
                        var input = document.getElementById("my-file");
                        input.click();
                        input.onchange = function () {
                          var file = input.files[0];
                          var reader = new FileReader();
                          reader.onload = function (e) {
                            // console.log("name", e.target.result);
                            callback(e.target.result, {
                              alt: file.name,
                            });
                          };
                          reader.readAsDataURL(file);
                        };
                      }
                    },
                    paste_data_images: true,

                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                />
              </div>

              <div>
                <div className="Instruction">Enter option below.</div>
                <div className="Add-fyi">
                  <span>
                    <img src={Fyi} alt="fyi" className="Add-fyi-image" />
                  </span>
                  <span className="info">
                    Select the correct option using Radio buttons in right.{" "}
                  </span>
                </div>
                <div className="Add-option-selection">
                  <div className="Add-option-field">
                    <input
                      id="my-file"
                      type="file"
                      name="my-file"
                      style={{ display: "none" }}
                      onChange={() => {
                        console.log("Data");
                      }}
                    />

                    <Editor
                      apiKey=""
                      onInit={(evt, editor) =>
                        (editorRef_singleoption1.current = editor)
                      }
                      initialValue="<p></p>"
                      init={{
                        placeholder: "Please enter option1 here...",
                        height: 250,
                        menubar: false,
                        statusbar: false,
                        plugins: [
                          "advlist",
                          "autolink",
                          "lists",
                          "link",
                          "charmap",
                          "preview",
                          "anchor",
                          "searchreplace",
                          "visualblocks",
                          "code",
                          "fullscreen",
                          "insertdatetime",
                          "media",
                          "table",
                          "code",
                          "help",
                          "wordcount",
                        ],
                        toolbar:
                          "undo redo | blocks | " +
                          "bold italic forecolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat | image",
                        image_title: true,
                        automatic_uploads: true,
                        file_picker_types: "image",
                        file_picker_callback: function (callback, value, meta) {
                          if (meta.filetype === "image") {
                            var input = document.getElementById("my-file");
                            input.click();
                            input.onchange = function () {
                              var file = input.files[0];
                              var reader = new FileReader();
                              reader.onload = function (e) {
                                console.log("name", e.target.result);
                                callback(e.target.result, {
                                  alt: file.name,
                                });
                              };
                              reader.readAsDataURL(file);
                            };
                          }
                        },
                        paste_data_images: true,

                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                      }}
                    />
                  </div>

                  <div className="Add-option1">
                    <input
                      type="radio"
                      id="option2"
                      name="options"
                      value={1}
                      defaultChecked
                      onChange={(e) => {
                        setCorrect1(Number(e.target.value));
                      }}
                    />
                  </div>
                </div>
                <div />
                <div className="Add-option-selection">
                  <div className="Add-option-field">
                    <input
                      id="my-file"
                      type="file"
                      name="my-file"
                      style={{ display: "none" }}
                      onChange={() => {
                        console.log("data");
                      }}
                    />

                    <Editor
                      apiKey=""
                      onInit={(evt, editor) =>
                        (editorRef_singleoption2.current = editor)
                      }
                      initialValue="<p></p>"
                      init={{
                        placeholder: "Please enter option2 here...",
                        height: 250,
                        menubar: false,
                        statusbar: false,
                        plugins: [
                          "advlist",
                          "autolink",
                          "lists",
                          "link",
                          "charmap",
                          "preview",
                          "anchor",
                          "searchreplace",
                          "visualblocks",
                          "code",
                          "fullscreen",
                          "insertdatetime",
                          "media",
                          "table",
                          "code",
                          "help",
                          "wordcount",
                        ],
                        toolbar:
                          "undo redo | blocks | " +
                          "bold italic forecolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat | image",
                        image_title: true,
                        automatic_uploads: true,
                        file_picker_types: "image",
                        file_picker_callback: function (callback, value, meta) {
                          if (meta.filetype === "image") {
                            var input = document.getElementById("my-file");
                            input.click();
                            input.onchange = function () {
                              var file = input.files[0];
                              var reader = new FileReader();
                              reader.onload = function (e) {
                                console.log("name", e.target.result);
                                callback(e.target.result, {
                                  alt: file.name,
                                });
                              };
                              reader.readAsDataURL(file);
                            };
                          }
                        },
                        paste_data_images: true,

                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                      }}
                    />
                  </div>
                  <div className="Add-option1">
                    <input
                      type="radio"
                      id="option2"
                      name="options"
                      value={2}
                      onChange={(e) => {
                        setCorrect1(Number(e.target.value));
                      }}
                    />
                  </div>
                </div>
                <div className="Add-option-selection">
                  <div className="Add-option-field">
                    <input
                      id="my-file"
                      type="file"
                      name="my-file"
                      style={{ display: "none" }}
                      onChange={() => {
                        console.log("data");
                      }}
                    />

                    <Editor
                      apiKey=""
                      onInit={(evt, editor) =>
                        (editorRef_singleoption3.current = editor)
                      }
                      initialValue="<p></p>"
                      init={{
                        placeholder: "Please enter option3 here...",
                        height: 250,
                        menubar: false,
                        statusbar: false,
                        plugins: [
                          "advlist",
                          "autolink",
                          "lists",
                          "link",
                          "charmap",
                          "preview",
                          "anchor",
                          "searchreplace",
                          "visualblocks",
                          "code",
                          "fullscreen",
                          "insertdatetime",
                          "media",
                          "table",
                          "code",
                          "help",
                          "wordcount",
                        ],
                        toolbar:
                          "undo redo | blocks | " +
                          "bold italic forecolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat | image",
                        image_title: true,
                        automatic_uploads: true,
                        file_picker_types: "image",
                        file_picker_callback: function (callback, value, meta) {
                          if (meta.filetype === "image") {
                            var input = document.getElementById("my-file");
                            input.click();
                            input.onchange = function () {
                              var file = input.files[0];
                              var reader = new FileReader();
                              reader.onload = function (e) {
                                console.log("name", e.target.result);
                                callback(e.target.result, {
                                  alt: file.name,
                                });
                              };
                              reader.readAsDataURL(file);
                            };
                          }
                        },
                        paste_data_images: true,

                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                      }}
                    />
                  </div>
                  <div className="Add-option1">
                    <input
                      type="radio"
                      id="option2"
                      name="options"
                      value={3}
                      onChange={(e) => {
                        setCorrect1(Number(e.target.value));
                      }}
                    />
                  </div>
                </div>
                <div className="Add-option-selection">
                  <div className="Add-option-field">
                    <input
                      id="my-file"
                      type="file"
                      name="my-file"
                      style={{ display: "none" }}
                      onChange={() => {
                        console.log("Data");
                      }}
                    />

                    <Editor
                      apiKey=""
                      onInit={(evt, editor) =>
                        (editorRef_singleoption4.current = editor)
                      }
                      initialValue="<p></p>"
                      init={{
                        placeholder: "Please enter option4 here...",
                        height: 250,
                        menubar: false,
                        statusbar: false,
                        plugins: [
                          "advlist",
                          "autolink",
                          "lists",
                          "link",
                          "charmap",
                          "preview",
                          "anchor",
                          "searchreplace",
                          "visualblocks",
                          "code",
                          "fullscreen",
                          "insertdatetime",
                          "media",
                          "table",
                          "code",
                          "help",
                          "wordcount",
                        ],
                        toolbar:
                          "undo redo | blocks | " +
                          "bold italic forecolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat | image",
                        image_title: true,
                        automatic_uploads: true,
                        file_picker_types: "image",
                        file_picker_callback: function (callback, value, meta) {
                          if (meta.filetype === "image") {
                            var input = document.getElementById("my-file");
                            input.click();
                            input.onchange = function () {
                              var file = input.files[0];
                              var reader = new FileReader();
                              reader.onload = function (e) {
                                console.log("name", e.target.result);
                                callback(e.target.result, {
                                  alt: file.name,
                                });
                              };
                              reader.readAsDataURL(file);
                            };
                          }
                        },
                        paste_data_images: true,

                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                      }}
                    />
                  </div>
                  <div className="Add-option1">
                    <input
                      type="radio"
                      id="option2"
                      name="options"
                      value={4}
                      onChange={(e) => {
                        setCorrect1(Number(e.target.value));
                      }}
                    />
                  </div>
                </div>
                <div className="Add-option-selection">
                  <div className="Add-option-field">
                    <input
                      id="my-file"
                      type="file"
                      name="my-file"
                      style={{ display: "none" }}
                      onChange={() => {
                        console.log("Data");
                      }}
                    />

                    <Editor
                      apiKey=""
                      onInit={(evt, editor) =>
                        (editorRef_singleoption5.current = editor)
                      }
                      initialValue="<p></p>"
                      init={{
                        placeholder: "Please enter option5 here...",
                        height: 250,
                        menubar: false,
                        statusbar: false,
                        plugins: [
                          "advlist",
                          "autolink",
                          "lists",
                          "link",
                          "charmap",
                          "preview",
                          "anchor",
                          "searchreplace",
                          "visualblocks",
                          "code",
                          "fullscreen",
                          "insertdatetime",
                          "media",
                          "table",
                          "code",
                          "help",
                          "wordcount",
                        ],
                        toolbar:
                          "undo redo | blocks | " +
                          "bold italic forecolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat | image",
                        image_title: true,
                        automatic_uploads: true,
                        file_picker_types: "image",
                        file_picker_callback: function (callback, value, meta) {
                          if (meta.filetype === "image") {
                            var input = document.getElementById("my-file");
                            input.click();
                            input.onchange = function () {
                              var file = input.files[0];
                              var reader = new FileReader();
                              reader.onload = function (e) {
                                console.log("name", e.target.result);
                                callback(e.target.result, {
                                  alt: file.name,
                                });
                              };
                              reader.readAsDataURL(file);
                            };
                          }
                        },
                        paste_data_images: true,

                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                      }}
                    />
                  </div>
                  <div className="Add-option1">
                    <input
                      type="radio"
                      id="option2"
                      name="options"
                      value={5}
                      onChange={(e) => {
                        setCorrect1(Number(e.target.value));
                      }}
                    />
                  </div>
                </div>
                <br />
                <div className="Question-field">
                  <input
                    id="my-file"
                    type="file"
                    name="my-file"
                    style={{ display: "none" }}
                    onChange={() => {
                      console.log("data");
                    }}
                  />

                  <Editor
                    apiKey=""
                    onInit={(evt, editor) => (editorRef_solution.current = editor)}
                    initialValue="<p></p>"
                    init={{
                      placeholder: "Please enter solution here...",
                      height: 500,
                      menubar: false,
                      statusbar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | blocks | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | image",
                      image_title: true,
                      automatic_uploads: true,
                      file_picker_types: "image",
                      file_picker_callback: function (callback, value, meta) {
                        if (meta.filetype === "image") {
                          var input = document.getElementById("my-file");
                          input.click();
                          input.onchange = function () {
                            var file = input.files[0];
                            var reader = new FileReader();
                            reader.onload = function (e) {
                              // console.log("name", e.target.result);
                              callback(e.target.result, {
                                alt: file.name,
                              });
                            };
                            reader.readAsDataURL(file);
                          };
                        }
                      },
                      paste_data_images: true,

                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                  />
                </div>
              </div>
              <br />
              <div>
                <select defaultValue={""} name="repos" className="uplift rounded p-3" onChange={(e) => { setDifficulty(e.target.value) }} id="repos">
                  <option value="" disabled>Select difficluty level</option>
                  {
                    difficultyOption.map((repo, i) => {
                      return (
                        <option value={repo} key={i}>{repo}</option>
                      )
                    })
                  }
                </select>
              </div>
              <div className="repo-stroring-option my-9 px-4 ">
                <div className="">
                  <div className="privacy my-4   pb-4">
                    <div className="Instruction font-secondary font-semibold text-left">
                      Select privacy option
                    </div>
                    <div className="flex items-center mb-4">
                      <input
                        id="default-radio-1"
                        type="radio"
                        value="1"
                        defaultChecked
                        name="privacy-radio"
                        onChange={(e) => { setPrivacy(Number(e.target.value)) }}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label className="ml-2 font-secondary font-semibold text-left">
                        Public
                      </label>
                    </div>
                    <div className="flex items-center mb-4">
                      <input
                        id="default-radio-1"
                        type="radio"
                        value="2"
                        name="privacy-radio"
                        onChange={(e) => { setPrivacy(Number(e.target.value)) }}
                        disabled
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label className="ml-2 font-secondary font-semibold text-left">
                        Private
                      </label>
                    </div>
                  </div>
                  <div>
                    <Select
                      placeholder="Please select the primary tags"
                      required
                      options={primarySkills}
                      onChange={(e) => {
                        setSelectedPrimarySkills(e);
                      }}
                      isSearchable={true}
                      styles={style}
                    />
                  </div>
                  <br />
                  <div>
                    <Select
                      placeholder="Please select the secondary tags"
                      required
                      options={secondarySkills}
                      onChange={(e) => {
                        const data = e.map((i) => {
                          return i.label
                        })
                        setSelectedSecondarySkills(data);
                      }}
                      isSearchable={true}
                      isMulti
                      styles={style}
                    />
                  </div>
                  <br />
                  <div>
                    <select defaultValue={""} placeholder="Please select a country name" onChange={(e) => { setSelectedNation(e.target.value) }} className="uplift rounded p-3">
                      <option value="">Please select the nation</option>
                      {
                        countryArr.map((nation, i) => (
                          <option key={i} value={nation}>
                            {nation}
                          </option>
                        ))
                      }
                    </select>
                  </div>
                  <br />
                  <div>
                    <select defaultValue={""} name="repos" className="uplift rounded p-3" onChange={(e) => { setSelectedRepo(e.target.value) }} id="repos">
                      <option value="" disabled>Select your repository</option>
                      {
                        allRepos.map((repo, i) => {
                          return (
                            <option value={repo} key={i}>{repo}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                </div>

              </div>
              <button
                className="Add-submit"
                onClick={() => {
                  submitQuestion();

                }}
              >
                Add Question
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

// insert_creators_questions_table(
//   questionTableName,
//   1808,
//   editorRef_singleQ.current.getContent(),
//   editorRef_setoption1.current.getContent(),
//   editorRef_setoption2.current.getContent(),
//   editorRef_setoption3.current.getContent(),
//   editorRef_setoption4.current.getContent(),
//   "5th option",
//   "answer option 1",
//   "solution provided",
//   "easy",
//   "repo name",
//   "private"
// );
