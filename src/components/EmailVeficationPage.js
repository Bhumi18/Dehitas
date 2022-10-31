import React, { useEffect, useState } from "react";
import axios from "axios";

import "./styles/login.css";

import { useAccount } from "wagmi";

import { useNavigate } from "react-router-dom";
import logo from "./assets/images/logo.png";
import su_image from "./assets/images/signup_image_2.svg";

// import emailpic from "./styles/email_pic.webp";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

function EmailVeficationPage() {
  const { address, isConnected } = useAccount();

  let navigate = useNavigate();

  // let navigate = useNavigate();

  const [btnloading, setbtnLoading] = useState(false);

  const [checker_uname, setChecker_uname] = useState(false);
  const [checker_email, setChecker_email] = useState(false);
  const [checker_role, setChecker_role] = useState(false);
  const [usernameWarn, setUsernameWarn] = useState(false);
  const [emailWarn, setEmailWarn] = useState(false);
  const [emailFormatWarn, setEmailFormatWarn] = useState(false);
  const [usernameFormatWarn, setUsernameFormatWarn] = useState(false);

  const [credentials, setCredentials] = useState({
    email: "",
    username: "",
    walletAddress: address,
  });

  // post request for email & username
  const sendEU = (username, email, walletaddress) => {
    // console.log(walletaddress);
    console.log("sending data...");
    var data = JSON.stringify({
      username: username,
      email: email,
      walletAddress: walletaddress,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/signup`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    console.log(config.url);
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setbtnLoading(false);
        console.log("send email and username");
        navigate("/role");
      })
      .catch(function (error) {
        console.log(error);
        setbtnLoading(false);
        console.log("problem in sending");
      });
  };

  const checkRole = (walletAddress) => {
    var data = JSON.stringify({
      walletAddress: walletAddress,
    });

    var config = {
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/getRole`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setChecker_role(false);
        console.log("Role Found");
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log("Role not found");
        setChecker_role(true);
        // checkEmail(credentials.email);
        console.log(error);
      });
  };

  const checkEmail = (email) => {
    setChecker_email(false);
    const emailFormat =
      /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/.test(email);

    if (emailFormat) {
      setEmailFormatWarn(false);
      var data = JSON.stringify({
        email: email,
      });

      var config = {
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/check_email`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setChecker_email(true);
          setEmailWarn(false);

          // checkUsername(credentials.username);
          console.log("Email doesn't exist. GO ON");
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          setEmailWarn(true);
          setChecker_email(false);
          console.log("Email exist. Enter new one");
          console.log(error);
        });
    } else {
      setEmailFormatWarn(true);
      console.log("Please enter email in proper format");
    }
  };

  const checkUsername = (username) => {
    if (username.length === 0) {
      setUsernameFormatWarn(true);
    } else {
      setUsernameFormatWarn(false);

      setUsernameWarn(false);
      setChecker_uname(false);
      var data = JSON.stringify({
        username: username,
      });

      var config = {
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/check_username`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setChecker_uname(true);
          setUsernameWarn(false);

          // sendEU(
          //   credentials.username,
          //   credentials.email,
          //   credentials.walletAddress
          // );

          console.log("username doesnot exist");
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          setUsernameWarn(true);
          setChecker_uname(false);

          console.log("username exist");
          console.log(error);
        });
    }
  };
  // useEffect(() => {
  //   console.log(credentials);
  // }, [credentials]);
  useEffect(() => {
    checkRole(address);
  }, []);

  if (isConnected) {
    return (
      <>
        <section className="login-main">
          <section className="login-inside">
            <section className="wrap-email">
              <img className="f-logo-img" src={logo} alt="logo" />
              <div className="email-pic">
                <img
                  className="signup_image"
                  src={su_image}
                  alt="signup_illustration"
                />
              </div>
              <div className="email-form">
                <h2 className="email-wallet-name">
                  Welcome{" "}
                  {address.substring(0, 6) +
                    "..." +
                    address.substring(address.length - 6, address.length)}
                </h2>
                <h1 className="email-form-title">Sign Up</h1>
                <div className="wrap-input validate-input">
                  <input
                    className="input"
                    value={credentials.email}
                    type="text"
                    placeholder="Email"
                    onChange={(event) =>
                      setCredentials({
                        email: event.target.value,
                        username: credentials.username,
                        walletAddress: credentials.walletAddress,
                      })
                    }
                    onBlur={() => checkEmail(credentials.email)}
                  />

                  <div className="f-after-input-div">
                    {emailFormatWarn ? (
                      <span className="f-after-input warn-red">
                        * Please enter email in proper format.
                      </span>
                    ) : emailWarn ? (
                      <span className="f-after-input warn-red">
                        * email is already exist.
                      </span>
                    ) : (
                      <span className="f-after-input warn-red"></span>
                    )}
                  </div>
                  <input
                    className="input"
                    value={credentials.username}
                    type="text"
                    placeholder="Username"
                    onChange={(event) => {
                      setCredentials({
                        email: credentials.email,
                        username: event.target.value,
                        walletAddress: credentials.walletAddress,
                      });
                      // checkUsername(credentials.username);
                    }}
                    onBlur={() => checkUsername(credentials.username)}
                  />
                  <div className="f-after-input-div">
                    {usernameWarn ? (
                      <span className="f-after-input warn-red">
                        * username is already exist.
                      </span>
                    ) : usernameFormatWarn ? (
                      <span className="f-after-input warn-red">
                        * please enter atleast one character.
                      </span>
                    ) : (
                      <span className="f-after-input"></span>
                    )}
                  </div>
                  <div className="f-after-username"></div>
                </div>

                <div className="btn-container">
                  <button
                    className="email-verify-button"
                    disabled={
                      checker_uname === true &&
                      checker_email === true &&
                      checker_role === true
                        ? false
                        : true
                    }
                    onClick={() => {
                      // navigate("/role");
                      setbtnLoading(true);
                      console.log(checker_uname, checker_email, checker_role);
                      sendEU(
                        credentials.username,
                        credentials.email,
                        credentials.walletAddress
                      );
                    }}
                  >
                    {/* navigate("/role") */}

                    {btnloading ? (
                      <svg
                        className="animate-spin button-spin-svg"
                        version="1.1"
                        id="L9"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 100 100"
                      >
                        <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"></path>
                      </svg>
                    ) : (
                      "Next"
                    )}
                  </button>
                </div>
              </div>
            </section>
          </section>
        </section>
      </>
    );
  } else {
    navigate("/");
  }
}

export default EmailVeficationPage;
