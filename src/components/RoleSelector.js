import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

import { useAccount } from "wagmi";

import "./styles/login.css";
import logo from "./assets/images/logo.png";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

function RoleSelector() {
  let navigate = useNavigate();
  const { address, isConnected } = useAccount();

  const [btnloading, setbtnLoading] = useState(false);

  // const options = [
  //   { label: "Select your role", value: "" },
  //   { label: "Creator", value: "creator" },
  //   { label: "Candidate", value: "candidate" },
  //   { label: "Company", value: "company" },
  // ];

  const [value, setValue] = React.useState("");
  const cookies = new Cookies();
  var userData = "";

  const getStage = (addre) => {
    console.log(addre);
    var data = JSON.stringify({
      walletaddress: addre,
    });

    var config = {
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/getStage?walletaddress=${addre}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        // console.log(response.data);
        userData = response.data;
        console.log(userData);
        cookies.set("loginID", userData.login_id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const sendRole = (walletAddress, role) => {
    var data = JSON.stringify({
      walletAddress: walletAddress,
      role: role,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/insertRole`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setbtnLoading(false);
        if (value === "company") {
          navigate("/companyregform");
        } else if (value === "creator") {
          navigate("/role/creator");
        } else if (value === "candidate") {
          navigate("/candidateregform");
        } else {
        }
      })
      .catch(function (error) {
        setbtnLoading(false);
        console.log(error);
      });
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    getStage();
  }, []);

  if (isConnected) {
    return (
      <>
        <section className="login-main">
          <img className="f-logo-img" src={logo} alt="logo" />
          <section className="login-inside">
            <section className="wrap-role">
              <div className="email-pic role-guide">
                <h1 className="role-title-h1">Guidance About Roles</h1>
                <div className="role-item">
                  <div className="role-item-inside">
                    <svg
                      className="role-svg"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="0 0 122.88 110.29"
                    >
                      <path d="M7.59 71.54l1.6-8.71c1.38-0.13 2.72-0.38 4.04-0.76c1.36-0.39 2.69-0.89 3.99-1.49l5.66 6.86L7.59,71.54 L7.59,71.54L7.59,71.54z M122.88,35.63c-3.17,6.17,2.45,14.47-3.99,19.02c-1.71,1.21-4.2,1.78-6.33,1.24 c-0.86-0.22-1.65-0.61-2.3-1.21c-0.29-0.26-0.55-0.57-0.79-0.91c-2.96-4.25-0.48-9.5,2.99-12.61 C115.66,38.3,119.93,36.63,122.88,35.63L122.88,35.63L122.88,35.63z M96.55,68.44c2.94,2.74,6.15,4.73,9.67,5.88l-6.06,8.64 c2.29,0.64,4.28,1.32,5.74,2.14c2.12,1.18,4.04,2.69,5.58,4.72c3.21,4.24,9.79,19.65-0.88,20.46H5.84 c-10.66-0.81-4.09-16.22-0.88-20.46c1.54-2.04,3.46-3.54,5.58-4.72c0.18-0.1,0.36-0.2,0.55-0.29L8.05,73.43h0l15.36-4.12 l3.01,11.22c6.03-1.41,11.94-3.05,14.95-5.76h0c5.51,16.21,28.53,16.81,33.7,0c3.04,2.74,9.06,4.38,15.15,5.81L96.55,68.44 L96.55,68.44L96.55,68.44z M107.21,56.09c0.92,1.24,2.98,2.82,4.98,2.97l-5.01,13.53c-3.86-1.27-7.28-3.12-9.93-5.95 C101.18,62.7,103.57,60.45,107.21,56.09L107.21,56.09L107.21,56.09z M13.12,83.95c0.74-0.27,1.53-0.52,2.38-0.77l-2.1-7.84 c-0.18-0.66-0.87-1.06-1.53-0.88c-0.66,0.18-1.06,0.87-0.88,1.53L13.12,83.95L13.12,83.95z M17.46,82.64 c0.78-0.2,1.59-0.4,2.42-0.6l-2.11-7.87c-0.18-0.66-0.87-1.06-1.53-0.88c-0.66,0.18-1.06,0.87-0.88,1.53L17.46,82.64L17.46,82.64z M21.87,81.58l2.43-0.56L22.15,73c-0.18-0.66-0.87-1.06-1.53-0.88c-0.66,0.18-1.06,0.87-0.88,1.53L21.87,81.58L21.87,81.58z M9.73,59.87l1.26-6.85l4.33,5.25c-0.94,0.4-1.9,0.75-2.87,1.02C11.56,59.55,10.65,59.75,9.73,59.87L9.73,59.87L9.73,59.87z M37.14,41.18c-1.15,0.04-2.03,0.28-2.63,0.69c-0.34,0.23-0.59,0.52-0.75,0.87c-0.18,0.39-0.26,0.86-0.25,1.4 c0.05,1.59,0.88,3.66,2.48,6.05l0.02,0.03l0,0l5.21,8.29c2.09,3.32,4.28,6.71,7,9.2c2.62,2.39,5.79,4.01,9.99,4.02 c4.55,0.01,7.87-1.67,10.57-4.2c2.81-2.63,5.02-6.23,7.21-9.83l5.87-9.67c1.09-2.5,1.49-4.17,1.24-5.15 c-0.15-0.58-0.79-0.87-1.89-0.92c-0.23-0.01-0.47-0.01-0.71-0.01c-0.26,0.01-0.54,0.03-0.82,0.05c-0.16,0.01-0.31,0-0.45-0.03 c-0.52,0.03-1.06-0.01-1.61-0.09l2.01-8.9c-14.92,2.35-26.07-8.73-41.84-2.22l1.14,10.49C38.31,41.29,37.7,41.26,37.14,41.18 L37.14,41.18L37.14,41.18z M83.23,39.31c1.44,0.44,2.37,1.36,2.75,2.84c0.42,1.64-0.04,3.96-1.43,7.12l0,0 c-0.03,0.06-0.05,0.11-0.09,0.17l-5.94,9.78c-2.29,3.77-4.61,7.55-7.71,10.45c-3.21,3.01-7.17,5.01-12.58,4.99 c-5.05-0.01-8.86-1.94-11.98-4.8c-3.01-2.76-5.32-6.31-7.51-9.8l-5.21-8.28c-1.91-2.84-2.9-5.44-2.96-7.57 c-0.03-1,0.14-1.91,0.51-2.71c0.39-0.84,0.99-1.54,1.79-2.08c0.38-0.25,0.8-0.47,1.26-0.64c-0.34-4.49-0.46-10.16-0.25-14.9 c0.11-1.12,0.33-2.25,0.64-3.37c1.33-4.76,4.67-8.59,8.8-11.22c2.28-1.45,4.78-2.55,7.38-3.28c1.65-0.47-1.41-5.76,0.3-5.93 c8.27-0.85,21.66,6.7,27.43,12.95c2.89,3.13,4.71,7.28,5.1,12.77L83.23,39.31L83.23,39.31L83.23,39.31z" />
                    </svg>
                    <h2 className="role-title-h2">Creator :</h2>
                  </div>
                  <p className="role-p">
                    Are you the one interested in creating assessments for
                    recruiters helping them find the right candidate? Then this
                    is you.
                  </p>
                </div>
                <div className="role-item">
                  <div className="role-item-inside">
                    <svg
                      className="role-svg"
                      id="Layer_1"
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 122.88 74.52"
                    >
                      <title>clients</title>
                      <path
                        class="cls-1"
                        d="M29.18,44.74c.23-1.88-5.33-9-6.35-12.47-2.18-3.46-2.95-9-.57-12.62.94-1.45.53-2.71.53-4.72,0-19.9,34.88-19.91,34.88,0,0,2.52-.57,3.11.79,5.1,2.28,3.3,1.11,9.18-.82,12.25C56.4,35.89,50.57,42.7,51,44.75c.37,10.21-21.85,9.87-21.79,0ZM41.9,62.41h1.22a2,2,0,0,0,2-2V57.15a2,2,0,0,0-2-2H35.86a2,2,0,0,0-2,2V60.4a2,2,0,0,0,2,2H37.1L34.72,74.52h9.47L41.9,62.41ZM0,74.52C.94,62.3-1.45,62.83,8.77,59A78.79,78.79,0,0,0,23.1,51.74l8.78,22.78ZM56.26,50.7A58,58,0,0,0,69.5,57.32C79.05,60.5,79,60.94,79,74.52H47.2L56.26,50.7ZM91.49,64.78h1a1.62,1.62,0,0,0,1.62-1.61V60.56a1.63,1.63,0,0,0-1.62-1.62H86.63A1.62,1.62,0,0,0,85,60.56v2.61a1.62,1.62,0,0,0,1.61,1.61h1l-1.91,9.74h7.61l-1.84-9.74ZM81.27,50.58c.18-1.51-4.29-7.26-5.11-10-1.75-2.78-2.37-7.21-.46-10.14.76-1.17.43-2.18.43-3.8,0-16,28-16,28,0,0,2-.46,2.5.63,4.1,1.83,2.66.89,7.38-.66,9.85-1,2.9-5.68,8.37-5.36,10,.3,8.21-17.56,7.94-17.51,0ZM103,55.38a59,59,0,0,0,12.24,5.31c7.68,2.56,7.65,2.91,7.6,13.83H95.75L103,55.38Z"
                      />
                    </svg>
                    <h2 className="role-title-h2">Company :</h2>
                  </div>
                  <p className="role-p">
                    Are you looking to post a job, find the right assessment for
                    your candidates or meet prospective candidates in the
                    Hireverse to work at your place? Then pick this role.
                  </p>
                </div>
                <div className="role-item">
                  <div className="role-item-inside">
                    <svg
                      className="role-svg"
                      xmlns="http://www.w3.org/2000/svg"
                      shape-rendering="geometricPrecision"
                      text-rendering="geometricPrecision"
                      image-rendering="optimizeQuality"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      viewBox="0 0 406 511.51"
                    >
                      <path d="M99.14 67.77c49.7-61.41 106.98-94.81 149.99-40.18 49.43 2.59 70.62 77.62 36.62 114.62 2.44-.03 4.73.47 6.72 1.56 2.6 1.42 4.57 3.72 5.56 6.98.99 3.21.99 7.37-.41 12.54l-.17.51c-.62 1.83-1.16 4.15-1.71 6.54-2.28 9.88-4.79 20.74-16.05 20.14-.6-.04-1.19-.1-1.79-.2-.41 20.42-10.39 29.82-23.44 42.09 3.5 5.11 7.01 10.26 11.22 15.02l.01-.02c22.08 19.88 78.99 23.86 103.3 37.43 7.69 4.28 14.64 9.74 20.23 17.12.81 1.06 1.57 2.13 2.3 3.2-.54-.04-1.05-.06-1.51-.06H17.69c.71-1.05 1.46-2.1 2.25-3.14 5.59-7.38 12.54-12.84 20.23-17.12 23.55-13.14 77.12-17.29 101.08-35.58 1.49-2.55 3.04-5.77 4.54-9.18 1.94-4.44 3.76-9.15 5.26-13.24-9.5-8.8-16.8-18.31-18.45-36.45l-1.13.02c-2.64-.04-5.17-.64-7.54-1.99-5.25-2.98-8.11-8.67-9.49-15.16-1.77-8.25-1.18-18.03-.33-24.21.06-.43.17-.83.33-1.21 1.83-5.13 4.14-7.9 7.03-9.08-1.31-24.51 2.83-63.34-22.33-70.95zM15.99 317.5h374.02c9.51 0 17.27 8.92 15.81 19.8l-20.67 154.41c-1.42 10.79-8.91 19.8-19.8 19.8H40.65c-10.89 0-18.36-9.01-19.8-19.8L.17 337.3c-1.43-10.89 6.3-19.8 15.82-19.8zm185.2 71.49c13.11 0 23.75 10.63 23.75 23.74 0 13.12-10.64 23.75-23.75 23.75s-23.74-10.63-23.74-23.75c0-13.11 10.63-23.74 23.74-23.74zm47.04-150.72c-12.92 12.03-26.99 17.88-41.28 17.88-14.97.01-29.95-6.39-43.88-18.79l-4.9-4.28-.33-.28c-1.29 3.44-2.76 7.12-4.29 10.62-2.1 4.77-4.34 9.26-6.51 12.51 23.46 47.56 92.8 49.22 115.28.27-5.65-5.72-9.92-11.83-14.09-17.93zM242.5 73.56c-11.34 11.43-23.34 14.72-35.1 15.75-3.47.61-6.85 1.03-10.22 1.45-11.28 1.39-22.54 2.78-37.44 13.1-7.04 4.86-11.73 10.75-14.16 17.6-2.49 7.06-2.66 15.3-.6 24.67a4.936 4.936 0 0 1-6.52 5.69l-5.71-2.09c-4.64-1.62-7.55-2.16-8.94 1.15-.71 5.42-1.16 13.59.27 20.29.85 3.97 2.31 7.28 4.71 8.65.85.48 1.79.7 2.79.71 1.26.02 2.67-.26 4.17-.72.43-.13.87-.2 1.33-.21 2.72-.06 4.98 2.09 5.04 4.8.54 22.33 10.44 30.86 22.49 41.23l5.02 4.36c12.1 10.77 24.84 16.33 37.32 16.33 12.14-.01 24.27-5.31 35.59-16.23l5.1-4.84c12.64-11.87 21.95-20.62 20.16-41.93-.07-1.06.18-2.15.81-3.1a4.918 4.918 0 0 1 6.81-1.41c.82.54 1.64.98 2.45 1.29l.21.07c.74.27 1.46.43 2.12.47 3.01.16 4.54-6.47 5.93-12.5.62-2.67 1.22-5.27 2-7.53.85-3.22.94-5.49.49-6.97-.19-.62-.49-1.03-.86-1.23-.59-.32-1.47-.42-2.52-.32-2.51.23-5.53 1.56-8.37 3.71a4.92 4.92 0 0 1-3.8.93 4.942 4.942 0 0 1-4.04-5.69c4.65-27.1 2.52-44.76-3.25-56.81-5.06-10.55-13.13-16.95-21.88-21.73l-1.4 1.06z" />
                    </svg>
                    <h2 className="role-title-h2">Candidate :</h2>
                  </div>
                  <p className="role-p">
                    Are you here to get your dream job, meet like-minded people
                    to interact and learn? Then here you go.
                  </p>
                </div>
                {/* <img src={emailpic} alt="img" /> */}
              </div>

              <div className="email-form">
                <h1 className="email-form-title">What represents you well?</h1>
                <div className="wrap-input validate-input">
                  <select
                    className="role-select"
                    onChange={handleChange}
                    value={value}
                    required
                  >
                    <option value="" disabled hidden>
                      Select your role
                    </option>

                    <option className="role-options" value="creator">
                      Creator
                    </option>
                    <option className="role-options" value="company">
                      Company
                    </option>
                    <option className="role-options" value="candidate">
                      Candidate
                    </option>
                  </select>
                  <span className="focus-input"></span>
                </div>
                <div className="btn-container">
                  <button
                    className="email-verify-button"
                    onClick={() => {
                      setbtnLoading(true);
                      sendRole(address, value);
                    }}
                  >
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

export default RoleSelector;
