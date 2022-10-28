import { useState, useEffect } from "react";
import "./styles/login.css";
import logo from "./assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import {
  create_creators_question_table,
  create_creators_assessment_table,
  create_creators_repo_table,
} from "./TableQueries";
import { useConnect, useAccount } from "wagmi";

function CreatorSignRequest() {
  let navigate = useNavigate();

  const [value, setValue] = useState("");
  const [questionTableMessage, setQuestionTableMessage] = useState("");
  const [repoTableMessage, setRepoTableMessage] = useState("");
  const [questionTableCheck, setQuestionTableCheck] = useState(false);
  const address = useAccount();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const getQuestionTable = async () => {
    const data = await create_creators_question_table()
    // setQuestionTable(data.name);
    console.log(data.name);
    console.log(address.address);
    const body = {
      walletAddress: address.address,
      data: {
        "question_table": data.name,
      }

    }
    axios.post(`${process.env.REACT_APP_API_URL}/creator/addTableNames`, body)
      .then((res) => {
        console.log(res);
        console.log(res.data[0]);
        setQuestionTableMessage(res.data[0])
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const getRepoTable = async () => {
    const data = await create_creators_repo_table()
    console.log(data);
    const body = {
      walletAddress: address.address,
      data: {
        repo_table: data
      }

    }
    axios.post(`${process.env.REACT_APP_API_URL}/creator/addTableNames`, body)
      .then((res) => {
        console.log(res.data[0]);
        setRepoTableMessage(res.data[0]);
      })
      .catch((err) => {
        console.log(err)
      })

  }

  return (
    <>
      <section className="login-main">
        <img className="f-logo-img" src={logo} alt="logo" />
        <section className="login-inside">
          <section className="wrap-role">
            <div className="email-pic role-guide">
              Some Information
              {/* <img src={emailpic} alt="img" /> */}
            </div>

            {/* <form action="" className="email-form"> */}
            {/* <h1 className="email-form-title">Request</h1> */}
            <div className="email-form">
              <div className="wrap-input validate-input">
                <div className="h-20 flex-col items-center content-center">
                  <button
                    className="table-button w-60"
                    onClick={() => { getQuestionTable() }}
                    disabled={questionTableCheck}
                  >
                    Add Question Table
                  </button>
                  {
                    questionTableMessage
                      ?
                      <span className="absolute text-xs text-[#ff6150] pl-20">{questionTableMessage}</span>
                      :
                      null
                  }
                </div>
                <div className="h-20">
                  <button
                    className="table-button w-60"
                    onClick={() => getRepoTable()}
                  >
                    Add Repo Table
                  </button>
                  {
                    repoTableMessage
                      ?
                      <span className="absolute text-xs text-[#ff6150] pl-20">{repoTableMessage}</span>
                      :
                      null
                  }
                </div>
              </div>
              <div className="btn-container">
                <button
                  className="email-verify-button"
                  onClick={() => {
                    navigate("/creatorregform")
                  }}
                >
                  Skip
                </button>
              </div>
            </div>
            {/* </form> */}
          </section>
        </section>
      </section>
    </>
  );
}

export default CreatorSignRequest;
