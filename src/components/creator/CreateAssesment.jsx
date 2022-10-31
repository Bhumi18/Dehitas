import { equal } from "assert";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { connect as TBLconnect } from "@tableland/sdk";
import "../creator/creator.css";
import DD_repo from "./Dropdowns/DD_repo";
import Select from "react-select";
import axios from "axios";
import { InjectedConnector } from "@wagmi/core";
import { useAccount, useConnect } from "wagmi";

function CreateAssesment() {
  const resetToInput = useRef(null);

  const [totalQuestion, setTotalQuestion] = useState();

  const [genres, setGenres] = useState([]);
  const [genreList, setGenreList] = useState({ name: "", number: 0, repo: "" });
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(0);
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

  const [section, setSection] = useState([]);

  const [mark, setMark] = useState(0);
  const [negativemarks, setNegativemarks] = useState(0);
  const [gener, setGener] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [repo, setRepo] = useState("");
  const [maxScore, setMaxScore] = useState(0);
  const [minScore, setMinScore] = useState();
  const [sectionMinScore, setSectionMinScore] = useState(0);
  const [sectionMaxScore, setSectionMaxScore] = useState(0);
  const [previousSectionMax, setPreviousSectionMax] = useState(0);
  const [previousSectionMin, setPreviousSectionMin] = useState(0);
  const [selectedSkill, setSelectedskills] = useState([]);
  const [selectedOptions1, setSelectedOptions1] = useState();
  const [skills, setSkills] = useState([]);
  const [repoTableName, setRepoTableName] = useState("");
  const [allRepos, setAllRepos] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [loading, setLoading] = useState("");
  const [questionTableName, setQuestionTableName] = useState("");
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const navigate = useNavigate();
  const [skill, setSkill] = useState({
    primary_skill1: "",
    primary_skill2: "",
    primary_skill3: "",
  });

  let [filteredSkills, setFilteredSkills] = useState([]);
  let [myarr, setMyArr] = useState([]);

  const [allData, setAllData] = useState({
    assessmentName: "",
    desc: "",
    fixedcost: "",
    vcost: "",
    duration: "",
    // numberOfQuestion: totalQuestion,
    expLevel: "",
    // primarySkills: filteredSkills,
    // secondarySkills: myarr,
    // questionFormat: section,
    //   {
    //     from: "",
    //     to: "",
    //     genre: "",
    //     reponame: "",
    //     diffLevel: "",
    //     marksForEach: 1,
    //     negativeScore: 0,
    //   },
    // ],
  });

  const fetchSkill = async () => {
    // const table_name = await getRepoTable();
    // console.log(table_name);
    const name = "skill_table_80001_1735";
    const tableland = await TBLconnect({
      network: "testnet",
      chain: "polygon-mumbai",
    });
    const readRes = await tableland.read(`SELECT * FROM ${name}`);
    console.log(readRes.rows);
    addingSkills(readRes);
    const readRes_ = await tableland.read(
      `SELECT repo_name from ${repoTableName}`
    );
    // const readRes = await tableland.read(`SELECT * FROM ${name}`);
    const data = readRes_.rows;
    console.log(readRes_.rows);
    setAllRepos(readRes_.rows);
    setLoading(false);
  };

  const addingSkills = (readRes) => {
    console.log(readRes.rows.length, skills.length);
    if (readRes.rows.length !== skills.length) {
      for (let i = 0; i < readRes.rows.length; i++) {
        skills.push({
          value: readRes.rows[i][0],
          label: `${readRes.rows[i][1]}`,
        });
      }
    }
    console.log(skills);
  };

  // const fetchRepositoriesNames = async () => {
  //   const tableland = await connect({
  //     network: "testnet",
  //     chain: "polygon-mumbai",
  //   });
  //   // console.log(tableland);
  // }

  const getRepoTable = () => {
    if (!isConnected) {
      connect();
    }
    // console.log(address);
    var res_data = JSON.stringify({
      walletAddress: "0xfaabb044AF5C19145cA4AE13CA12C419395A72FB",
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/creator/getTables`,
      headers: {
        "Content-Type": "application/json",
      },
      data: res_data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        // console.log(response.data.repo_table);
        setRepoTableName(response.data.repo_table);
        setQuestionTableName(response.data.question_table);
        if (
          response.data.repo_table === null ||
          response.data.repo_table === ""
        ) {
          setTimeout(() => {
            setLoadingMessage(
              "Please create a question table before proceeding..."
            );
            setLoading(true);
            navigate("/role/creator");
          }, 5000);
        }
        return response.data.repo_table;
      })
      .catch(function (error) {
        console.log(error);
        setLoadingMessage("Something went wrong...");
      });
  };
  useEffect(() => {
    var negscore;
    var calc = to - from + 1;
    var maxscr = calc * mark;
    negscore = previousSectionMin - calc * negativemarks;
    console.log(negscore);
    setSectionMinScore();
    setSectionMaxScore();
    setMinScore(negscore);
    setMaxScore(previousSectionMax + maxscr);
  }, [from, to, mark, negativemarks]);

  useEffect(() => {
    getRepoTable();
    // fetchRepositoriesNames()
  }, []);

  useEffect(() => {
    console.log(section);
  }, [section]);
  //////////// Printing allData in console
  useEffect(() => {
    console.log(allData);
  }, [allData]);

  useEffect(() => {
    // getRepoTable();
    fetchSkill();
    // fetchRepositoriesNames()
  }, [repoTableName]);

  // const handleSelectedOptios = (selectedSkills) => {
  //   // console.log(selectedSkills);

  //   filteredSkills = selectedSkills.map((item) => {
  //     return item.value;
  //   });

  //   console.log(filteredSkills);
  //   // for (let i = 0; i < setSelectedSkills.length; i++) {
  //   //   selectedSkills.push(setSelectedSkills[i]["value"]);
  //   // }
  // };

  // useEffect(() => {
  //   console.log(filteredSkills);
  // }, [filteredSkills]);

  const addGenre = () => {
    console.log("Inside");
    // const genreArr = [];
    // genreArr.push(genreList);
    setGenres([
      ...genres,
      {
        name: genreList.name,
        number: genreList.number,
        repo: genreList.repo,
      },
    ]);
    // console.log(genres);
  };
  function handleSelect(selectedOptions) {
    if (selectedOptions.length > 5) {
      alert("not selected");
    } else {
      setSelectedskills(selectedOptions);
      if (selectedOptions[0]["value"]) {
        setSkills({
          ...skill,
          primary_skill1: selectedOptions[0]["value"],
        });
      }
      if (selectedOptions[1]["value"]) {
        setSkills({
          ...skill,
          primary_skill2: selectedOptions[1]["value"],
        });
      }
      if (selectedOptions[2]["value"]) {
        setSkills({
          ...skill,
          primary_skill3: selectedOptions[2]["value"],
        });
      }
    }
  }

  // function handleSelect1(selectedOptions1) {
  //   setSelectedOptions1(selectedOptions1);

  //   myarr = selectedOptions1.map((i) => {
  //     return i.value;
  //   });
  //   console.log(myarr);
  // }

  const addSection = () => {
    if (section.length === 0) {
      if (from !== 1) {
        console.log("from not equal to  1");
        alert("from Should be 1");
      } else if (to < from) {
        alert("Invalid Change");
      } else if (mark === 0 || negativemarks === 0) {
        alert("Enter marks");
      } else {
        setSection([
          ...section,
          {
            from: from,
            to: Number(to),
            genre: gener,
            repo_name: repo,
            difficulty_level: difficulty,
            marks_for_each: Number(mark),
            negative_score_for_one: Number(negativemarks),
          },
        ]);
        setFrom(Number(to) + 1);
        setTo(Number(to) + 1);
        setPreviousSectionMax(maxScore);
        setPreviousSectionMin(minScore);
        console.log(from);
      }
    } else if (section.length > 0) {
      if (to < from) {
        alert("Invalid Change");
      }
      // else if(section[(section.length)-1].from   === from)
      // {
      //   alert("Redundant data")
      // }
      else if (mark === 0 || negativemarks === 0) {
        alert("Enter marks");
      } else {
        setFrom(to);

        setSection([
          ...section,
          {
            from: from,
            to: Number(to),
            genre: gener,
            repo_name: repo,
            difficulty_level: difficulty,
            marks_for_each: Number(mark),
            negative_score_for_one: Number(negativemarks),
          },
        ]);
        setFrom(Number(to) + 1);
        setTo(Number(to) + 1);
        setPreviousSectionMax(maxScore);
        setPreviousSectionMin(minScore);

        console.log(from);
        // setTo(Number(from));
      }
    }
  };

  const addAssessmentAPI = () => {
    console.log(totalQuestion, filteredSkills, myarr, section);
    var axios = require("axios");
    var data = JSON.stringify({
      wallet_address: address,
      assessment_name: allData.assessmentName,
      description: allData.desc,
      fixed_cost: allData.fixedcost,
      variable_cost: allData.vcost,
      duration: allData.duration,
      number_of_questions: Number(totalQuestion),
      experience_level: `${allData.expLevel}`,
      primary_skills: filteredSkills,
      secondary_skills: myarr,
      question_format: section,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/creator/createAssessment`,
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
  };
  // else{
  // console.log('Inside addSection')
  // setSection([
  //   ...section,
  //   {
  //     from: from,
  //     to: to,
  //     mark: mark,
  //     negativemarks: negativemarks,
  //   },
  // ]);
  // setFrom(null);
  // setTo(null);
  // }

  useEffect(() => {
    console.log(from);
  }, [section]);
  return (
    <>
      <div className="parent-content">
        <div className="C_Content min-h-screen px-0.5 py-10">
          <div className="top">
            <div className="Headingassesmenth font-primary text-left py-5 ">
              Create new assesment here.
            </div>
            <div className=" font-secondary text-left border-b-2 py-4">
              Customise your assesment for candidates.
            </div>
          </div>
          <div className="repo-details py-5 border-b-2">
            <div className="Labels flex mb-1">
              <div className="px-1 py-1 font-semibold font-secondary">
                Assessment name
              </div>
            </div>
            <div className="repo-name  flex">
              <div className="Repo-name">
                <input
                  type="text"
                  name="reponame"
                  placeholder="Short Assessment name"
                  onChange={(e) =>
                    setAllData({ ...allData, assessmentName: e.target.value })
                  }
                  className="align-middle uplift  px-2 py-1.5 rounded-md border border-gray-300"
                ></input>
              </div>
            </div>
            <div className=" font-secondary text-left py-3 ">
              Great Assessment names are short and memorable.
            </div>
            <div className="Description">
              <div className="  font-secondary font-semibold text-left pb-2 ">
                Description(Enter approx 100 words for understanding of
                assesment.)
              </div>
              <div className="text-left">
                <textarea
                  className="uplift rounded-md text-xs"
                  rows={5}
                  cols={90}
                  onChange={(e) => {
                    setAllData({ ...allData, desc: e.target.value });
                  }}
                ></textarea>
              </div>
            </div>
            <div className=" mt-3 ">
              <div className="Instruction  font-secondary font-semibold text-left   ">
                Total number of question.
              </div>
              <input
                type="number"
                min="0"
                className=" uplift rounded-md my-2 p-1"
                onChange={(e) => {
                  setTotalQuestion(e.target.value);
                }}
              />
            </div>
            <div className="flex mt-7">
              <div className="font-secondary font-semibold">Duration:</div>
              <div className="mr-5 ml-3">
                <input
                  type="number"
                  name="Duration"
                  placeholder="Enter minutes"
                  className="uplift  rounded-md p-1"
                  onChange={(e) =>
                    setAllData({ ...allData, duration: e.target.value })
                  }
                />
              </div>
              <div className="font-secondary font-semibold ml-7">
                Experience:
              </div>
              <div className="mr-5 ml-3">
                <input
                  type="number"
                  name="experience"
                  placeholder="Enter Years"
                  className="uplift rounded-md p-1"
                  onChange={(e) =>
                    setAllData({ ...allData, expLevel: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex mt-7">
              <div className="font-secondary font-semibold ml-7">
                Primary Skills:
              </div>
              <div className="mr-5 ml-3">
                <Select
                  defaultValue=""
                  isMulti
                  name="Primary Skill"
                  options={skills}
                  // value={selectedSkills}
                  className="uplift rounded-md p-1"
                  classNamePrefix="select"
                  // value={selectedSkills}
                  onChange={(e) => {
                    console.log(e);
                    const data = e.map((i) => {
                      return i.label;
                    });
                    setFilteredSkills(data);
                    // handleSelectedOptios(e);
                  }}
                  isSearchable={true}
                />
              </div>
              <div className="font-secondary font-semibold ml-7">
                Secondary Skills:
              </div>
              <div className="mr-5 ml-3">
                <Select
                  defaultValue=""
                  isMulti
                  name="Secondary Skill"
                  options={skills}
                  // value={selectedSkills}
                  className="uplift rounded-md p-1"
                  classNamePrefix="select"
                  // value={selectedOptions1}
                  onChange={(e) => {
                    const data = e.map((i) => {
                      return i.label;
                    });
                    setMyArr(data);
                    // handleSelect1(e);
                  }}
                  isSearchable={true}
                />
              </div>
            </div>
          </div>
          <div className="PaperPattern">
            {/* <div className="Instruction  font-secondary font-semibold text-left   mt-3">
              Scoring format of the Test.
            </div> */}
            <div className="formating">
              <div className="flex  my-4 ">
                {/* <input
                  type="text"
                  onChange={(e) => {
                    setGenreList({ ...genreList, name: e.target.value })
                  }}
                  name="genre"
                  placeholder="Enter genre"
                  defaultValue={genreList.name}
                  className=" uplift text-sm mr-8 pl-1  mx-2 rounded-md border border-gray-300"
                />
                <input
                  type="number"
                  onChange={(e) => {
                    setGenreList({ ...genreList, number: e.target.value })
                  }}
                  name="numberOfQuestion"
                  placeholder="enter number of question"
                  defaultValue={genreList.number}
                  className="p-1 mr-8 w-52 rounded-md uplift"
                />
                <select
                  name="Repository"
                  onChange={(e) => {
                    setGenreList({ ...genreList, repo: e.target.value })
                  }}
                  defaultValue={genreList.repo}
                  id="repos"
                  className="p-1 mr-8 uplift rounded-md border border-gray-300"
                >
                  <option value="" disabled hidden>
                    Select repository
                  </option>
                  <option value="repo2">Repository2</option>
                  <option value="repo3">Repository3</option>
                  <option value="repo4">Repository4</option>
                </select>
                <button
                  class=" rounded-md px-10 Add-btn-custom"
                  onClick={() => {
                    addGenre()
                  }}
                >
                  Add
                </button> */}
              </div>

              {/* <div className="border-b-2 pb-4 w-full  ">
                <div className="heading grid grid-cols-3 w-full">
                  <div className="heder  font-secondary font-semibold border rounded-md">
                    Question type
                  </div>
                  <div className="heder font-secondary font-semibold rounded-md">
                    Number of question
                  </div>
                  <div className="heder font-secondary font-semibold rounded-md">
                    Repository
                  </div>
                </div>
                {genres.length > 0 ? (
                  genres.map((single, index) => (
                    <div key={index} className="grid grid-cols-3 w-full">
                      <div className="cont">{single.name}</div>
                      <div className="cont">{single.number}</div>
                      <div className="cont">{single.repo}</div>
                      {wrongrange === true ? (
                        <div>From value is grater then To value</div>
                      ) : null}
                    </div>
                  ))
                ) : (
                  <div className="grid grid-cols-3 w-full">
                    <div className="cont">Empty</div>
                    <div className="cont">Empty</div>
                    <div className="cont">Empty</div>
                  </div>
                )}
              </div> */}
              <div className="scoring-pattern flex">
                <div className="flex my-4 ">
                  <div className="font-secondary  font-semibold">from:</div>
                  <div className="mr-1 ml-2">{from}</div>
                </div>
                <div className="flex my-4 ml-3">
                  <div className="font-secondary font-semibold">to:</div>
                  <div className="mr-1 ml-2">
                    <input
                      type="number"
                      name="experiance"
                      placeholder="Enter minutes"
                      className="border border-gray-300 uplift pl-1 rounded-md w-14"
                      min={from}
                      value={to}
                      onChange={(e) => {
                        setTo(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex  my-4 ">
                  <input
                    type="text"
                    onChange={(e) => {
                      setGener(e.target.value);
                    }}
                    name="genre"
                    placeholder="Enter genre"
                    defaultValue={genreList.name}
                    className=" uplift text-sm w-24 mr-2 pl-1  mx-2 rounded-md border border-gray-300"
                  />
                  <select
                    name="Repository"
                    onChange={(e) => {
                      setRepo(e.target.value);
                    }}
                    defaultValue={genreList.repo}
                    id="repos"
                    className="p-1 w-32 mr-2 uplift rounded-md border border-gray-300"
                  >
                    <option value="" disabled hidden>
                      Repository
                    </option>
                    {allRepos.map((repo) => (
                      <option value={repo}>{repo}</option>
                    ))}
                  </select>
                  <select
                    name="Difficulty Level"
                    onChange={(e) => {
                      setDifficulty(e.target.value);
                    }}
                    defaultValue={genreList.repo}
                    id="repos"
                    className="p-1 w-36 mr-2 uplift rounded-md border border-gray-300"
                  >
                    <option value="" disabled hidden>
                      Difficulty Level
                    </option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Difficult">Difficult</option>
                  </select>
                </div>
                <div className=" my-4 ml-1 flex">
                  <input
                    type="number"
                    name="experiance"
                    placeholder="Marks for one"
                    className="border w-32 border-gray-300 uplift pl-1 rounded-md w-32 mr-4"
                    onChange={(e) => {
                      setMark(e.target.value);
                    }}
                  />
                  <input
                    type="number"
                    name="experiance"
                    placeholder="-ve score"
                    min="0"
                    className="border w-24 border-gray-300 uplift rounded-md w-24 pl-1"
                    onChange={(e) => {
                      setNegativemarks(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div>
                <button
                  className=" mx-2 mb-4 py-1 rounded-md px-10 Add-btn-custom"
                  onClick={() => {
                    addSection();
                  }}
                >
                  Add
                </button>
              </div>
              <div className="border-b-2 pb-3">
                <div className="heading flex gap-1">
                  <div className=" heder font-secondary rounded-md font-semibold">
                    From
                  </div>
                  <div className="heder font-secondary rounded-md font-semibold">
                    to
                  </div>
                  <div className="heder font-secondary rounded-md font-semibold">
                    Genre
                  </div>
                  <div className="heder font-secondary rounded-md font-semibold">
                    Repository
                  </div>
                  <div className="heder font-secondary rounded-md font-semibold">
                    Difficulty
                  </div>
                  <div className="heder font-secondary rounded-md font-semibold">
                    Marks
                  </div>
                  <div className="heder font-secondary rounded-md font-semibold">
                    (-ve) marks
                  </div>
                </div>

                {section.length > 0 ? (
                  section.map((section, index) => (
                    <div key={index} className="flex">
                      <div className="cont">{section.from}</div>
                      <div className="cont">{section.to}</div>
                      <div className="cont">{section.genre}</div>
                      <div className="cont">{section.repo_name}</div>
                      <div className="cont">{section.difficulty_level}</div>
                      <div className="cont">{section.marks_for_each}</div>
                      <div className="cont">
                        {section.negative_score_for_one}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex">
                    <div className="cont">Empty</div>
                    <div className="cont">Empty</div>
                    <div className="cont">Empty</div>
                    <div className="cont">Empty</div>
                    <div className="cont">Empty</div>
                    <div className="cont">Empty</div>
                    <div className="cont">Empty</div>
                  </div>
                )}
              </div>
              <div className="  ">
                <div className="flex my-4 ">
                  <div className="font-secondary font-semibold">Max Score:</div>
                  <div className="mr-5 ml-2 font-secondary w-48">
                    {previousSectionMax}
                  </div>
                  <div className="font-secondary font-semibold ml-8">
                    Min Score:
                  </div>
                  <div className="mr-5 ml-2 ">{previousSectionMin}</div>
                </div>
                <div className="flex my-4">
                  <div className="font-secondary font-semibold">Fix fees:</div>
                  <div className="mr-5 ml-8">
                    <input
                      type="number"
                      name="Fix fees"
                      placeholder="Enter Fix-fees"
                      className="uplift rounded-md p-1"
                      onChange={(e) => {
                        setAllData({ ...allData, fixedcost: e.target.value });
                      }}
                    />
                  </div>
                  <div className="font-secondary font-semibold ml-1">
                    Price per user:
                  </div>
                  <div className="mr-5 ml-2">
                    <input
                      type="number"
                      name="PPU"
                      placeholder="Price per-user"
                      className="uplift rounded-md p-1"
                      onChange={(e) => {
                        setAllData({ ...allData, vcost: e.target.value });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="final-buttom">
                <button
                  className="create-assessment-btn text-black-700 font-semibold py-2 px-4 border border-black-500  rounded mx-2 mt-4 mb-4"
                  onClick={() => addAssessmentAPI()}
                >
                  Create assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateAssesment;
