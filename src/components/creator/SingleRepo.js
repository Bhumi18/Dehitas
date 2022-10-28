import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";

import "../styles/singlerepo.css";

import { connect } from "@tableland/sdk";

function SingleRepo() {
  const [allUserRepo, setAllUserRepo] = useState([]);
  const [repoName, setRapoName] = useState();
  const [repDesc, setRepoDesc] = useState();
  const [repStatus, setRepoStatus] = useState();
  const [questionList, setQuestionList] = useState([]);

  const { key } = useParams();
  console.log(key);

  const parse = require("html-react-parser");

  const getRecords = async () => {
    const tableland = await connect({
      network: "testnet",
      chain: "polygon-mumbai",
    });

    console.log(tableland);

    // const fetchRepos = await tableland.read(`SELECT * FROM ${repoTable}`);
    const fetchRepos = await tableland.read(
      `SELECT * FROM creators_repo_table_80001_2538`
    );
    setAllUserRepo(fetchRepos["rows"]);
    console.log(fetchRepos["rows"]);
    // setLoading(false);
  };

  const getQuestions = async () => {
    const tableland = await connect({
      network: "testnet",
      chain: "polygon-mumbai",
    });

    console.log(tableland);

    // const fetchRepos = await tableland.read(`SELECT * FROM ${repoTable}`);
    const fetchQues = await tableland.read(
      `SELECT * FROM creators_question_table_80001_2537 where repo_name='${repoName}'`
    );
    setQuestionList(fetchQues["rows"]);
    console.log(fetchQues["rows"]);
    // setLoading(false);
  };

  useEffect(() => {
    getRecords();
  }, []);

  useEffect(() => {
    // console.log(key);
    // console.log(typeof key);
    if (allUserRepo.length > 0) {
      allUserRepo.map((item) => {
        if (item[0] === Number(key)) {
          setRapoName(item[2]);
          setRepoDesc(item[3]);
          if (item[4] === 1) {
            setRepoStatus("Public");
          } else {
            setRepoStatus("Private");
          }
          getQuestions();
        }
        return null;
      });
    }
  }, [allUserRepo]);

  return (
    <>
      <section className="single-repo-main">
        <section className="sr-left">
          <div>{repoName}</div>
          <div>{repDesc}</div>
          <div>{repStatus}</div>
        </section>
        <section className="sr-right">
          <div className="sr-right-navbar">
            <span className="sr-navbar-span">Questions</span>
            <span className="sr-navbar-span">Questions</span>
          </div>
          <div className="sr-right-box-outer">
            {/* ************************************************ */}
            {questionList.map((i, key) => {
              return (
                <>
                  <div className="sr-right-box uplift">
                    <div className="sr-right-ques-id">
                      <div>
                        <span>Question</span>
                        <span> # {key + 1}</span>
                      </div>
                      <div>
                        <span>Question Type :</span>
                        <span> Logical Reasoning</span>
                      </div>
                    </div>

                    <div className="sr-right-question">
                      <p>{parse(i[2])}</p>
                    </div>
                    <div className="sr-right-options">
                      <p>{parse(i[3])}</p>
                      <p>{parse(i[4])}</p>
                      <p>{parse(i[5])}</p>
                      <p>{parse(i[6])}</p>
                      <p>{parse(i[7])}</p>
                    </div>
                    <div className="sr-right-ques-ans">
                      <span>Answer : </span>
                      <span>{parse(i[8])}</span>
                    </div>
                    <div className="sr-right-ques-ans">
                      <span>Solution : </span>
                      <span>{parse(i[9])}</span>
                    </div>
                  </div>
                </>
              );
            })}

            {/* ***************************************** */}
            {/* ***************************************** */}
          </div>
        </section>
      </section>
      {/* <div>{allUserRepo[0][2]}</div> */}
    </>
  );
}

export default SingleRepo;
