import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { useAccount } from "wagmi";
import { useAccount, useSigner, useProvider } from "wagmi";
import Cookies from "universal-cookie";

import data_polygon from "../../Contracts/artifacts/data_polygon.json";
import CONTRACT_ADDRESS_GOERLI from "../../Contracts/config";
import CONTRACT_ADDRESS_SKALE from "../../Contracts/config";
import CONTRACT_ADDRESS_AURORA from "../../Contracts/config";
import CONTRACT_ADDRESS_CRONOS from "../../Contracts/config";
// import CONTRACT_ADDRESS_POLYGON from "../../Contracts/config";
import { ethers } from "ethers";
import { connect } from "@tableland/sdk";

import PhoneInput from "react-phone-input-2";
import { countryArr } from "./CountryList";

import "react-phone-input-2/lib/style.css";
import "./regform.css";
import logo from "../assets/images/logo.png";

import { useRef } from "react";
import StoreProfileImg from "./StoreProfileImg";
import StoreCoverImg from "./StoreCoverImg";

function CompanyRegForm() {
  let navigate = useNavigate();
  const cookies = new Cookies();

  const { address, isConnected } = useAccount();
  const { data: signer, isError, isLoading } = useSigner(); //useAccount from wagmi
  const provider = useProvider(); //useProvider from wagmi

  const [loginId, setLoginId] = useState(null);
  const [btnloading, setbtnLoading] = useState(false);

  const [logoCID, setLogoCID] = useState("");
  const [coverCID, setCoverCID] = useState("");

  const refOne = useRef(null);
  const refTwo = useRef(null);
  const refThree = useRef(null);
  const refFour = useRef(null);
  const refFive = useRef(null);
  const refSix = useRef(null);
  const refSeven = useRef(null);
  const refEight = useRef(null);
  const refNine = useRef(null);
  const refTen = useRef(null);

  const inputRefOne = useRef(null);
  const inputRefTwo = useRef(null);
  const inputRefThree = useRef(null);
  const inputRefFour = useRef(null);
  const inputRefFive = useRef(null);
  const inputRefSix = useRef(null);
  const inputRefSeven = useRef(null);
  const inputRefEight = useRef(null);
  const inputRefNine = useRef(null);
  const inputRefTen = useRef(null);

  const [showAll, setAll] = useState({
    cname: "",
    cdesc: "",
    curl: "",
    yoe: "",
    noe: "",
    caddress: "",
    cnum: "",
    ccountry: "",
  });

  const refArr = [
    { section: refOne, input: inputRefOne },
    { section: refTwo, input: inputRefTwo },
    { section: refThree, input: inputRefThree },
    { section: refFour, input: inputRefFour },
    { section: refFive, input: inputRefFive },
    { section: refSix, input: inputRefSix },
    { section: refSeven, input: inputRefSeven },
    { section: refEight, input: inputRefEight },
    { section: refNine, input: inputRefNine },
    { section: refTen, input: inputRefTen },
  ];

  const handleClick = (e) => {
    if (e === 0 && showAll.cname === "") {
      alert("Enter cname pls");
      // } else if (e === 1 && showAll.cdesc === "") {
      //   alert("Enter Employment type pls");
      // } else if (e === 2 && showAll.curl === "") {
      //   alert("Enter Company Name pls");
      // } else if (e === 3 && showAll.yoe === "") {
      //   alert("Pls Enter Company Location");
      // } else if (e === 4 && showAll.noe === "") {
      //   alert("Experience Start Date");
      // } else if (e === 5 && showAll.caddress === "") {
      //   alert("Experience End Date");
      // } else if (e === 6 && showAll.cnum === "") {
      //   alert("Employment Status");
      // } else if (e === 7 && showAll.ccountry === "") {
      //   alert("Any other Details");
      // } else if (e === 8 && showAll.csector === "") {
      //   alert("Any other Details");
    } else {
      // console.log(refArr[e + 1].section);
      const test = refArr[e + 1].section;
      // console.log(test);
      test.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const inputFocus = refArr[e + 1].input;
        inputFocus.current.focus();
      }, 500);
    }
  };

  const handleClickPrevious = (e) => {
    // console.log(refArr[e - 1].section);
    const test = refArr[e - 1].section;
    // console.log(test);
    test.current?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      const inputFocus = refArr[e - 1].input;
      inputFocus.current.focus();
      console.log(inputFocus.current.focus());
    }, 500);
  };

  const target = (e, num) => {
    if (e.keyCode === 13) {
      handleClick(num);
    }
  };
  const newTarget = (e, num) => {
    if ((e.ctrlKey || e.metaKey) && (e.keyCode === 13 || e.keyCode === 10)) {
      setTimeout(() => {
        handleClick(num);
      }, 200);
    }
  };

  const sendCompanyRegData = (
    loginid,
    name,
    logo,
    coverImg,
    walletAddress,
    desc,
    curl,
    yoe,
    noe,
    address,
    country,
    contactnum
  ) => {
    var data = JSON.stringify({
      login_id: loginid,
      name: name,
      logo: logo,
      cover_image: coverImg,
      wallet_address: walletAddress,
      description: desc,
      company_url: curl,
      year_of_establishment: yoe,
      number_of_employees: noe,
      address: address,
      contry: country,
      contact_number: contactnum,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/registration`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setbtnLoading(false);
        console.log(JSON.stringify(response.data));
        console.log(address);
        navigate("/company");
      })
      .catch(function (error) {
        setbtnLoading(false);
        console.log(error);
      });
  };

  /////////////////////add function here///////////////////
  // const registerCompany = async () => {
  //   const { chainId } = await provider.getNetwork();
  //   switch (chainId) {
  //     case 80001:
  //       let connectedContract = new ethers.Contract(
  //         CONTRACT_ADDRESS_POLYGON,
  //         data_polygon.abi,
  //         signer
  //       );
  //       console.log("Going to pop wallet now to pay gas...");
  //       let balance = await connectedContract.registerCompany();
  //       console.log(balance);
  //       break;
  //     default:
  //       console.log("something went wrong");
  //       break;
  //   }
  // };
  //////////////////////////only for smart contract//////////////

  // const printData = () => {
  //   console.log(logoCID, coverCID);
  //   // console.log(showAll);
  // };

  useEffect(() => {
    setLoginId(cookies.get("loginID"));
    console.log(cookies.get("loginID"));
    inputRefOne.current.focus();
  }, []);

  useEffect(() => {
    console.log(showAll);
  }, [showAll]);

  if (isConnected) {
    return (
      <>
        <section className="f-background">
          <img className="f-logo-img" src={logo} alt="logo" />
          <section className="f-container">
            {/* *********************************************************** */}
            {/* 1st input field */}

            <section className="f-first" ref={refOne}>
              <div className="f-outside-div">
                <div className="f-inside-section">
                  <div className="f-left">
                    <span className="f-num">1</span>
                    <svg
                      className="f-right-ar"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="0 0 31.143 31.143"
                    >
                      <g>
                        <g id="c100_arrow">
                          <path
                            d="M0,15.571c0.001,1.702,1.383,3.081,3.085,3.083l17.528-0.002l-4.738,4.739c-1.283,1.284-1.349,3.301-0.145,4.507
			c1.205,1.201,3.222,1.138,4.507-0.146l9.896-9.898c1.287-1.283,1.352-3.301,0.146-4.506c-0.033-0.029-0.068-0.051-0.1-0.08
			c-0.041-0.043-0.07-0.094-0.113-0.139l-9.764-9.762c-1.268-1.266-3.27-1.316-4.474-0.111c-1.205,1.205-1.153,3.208,0.111,4.476
			l4.755,4.754H3.085C1.381,12.485,0,13.865,0,15.571z"
                          />
                        </g>
                        <g id="Capa_1_46_"></g>
                      </g>
                    </svg>
                  </div>
                  <div className="f-form-div">
                    <p className="f-p">Company Name</p>
                    <input
                      className="f-input"
                      id="firstInput"
                      type="text"
                      tabIndex="1"
                      required
                      ref={inputRefOne}
                      placeholder="Type your answer here..."
                      onChange={(e) => {
                        setAll({ ...showAll, cname: e.target.value });
                      }}
                      onKeyUp={(e) => {
                        target(e, 0);
                      }}
                    />
                    <div className="f-btn-flex">
                      <button
                        className="f-next-btn"
                        onClick={() => handleClick(0)}
                      >
                        <span>OK</span>
                        <svg
                          className="f-correct-ar"
                          version="1.1"
                          id="Capa_1"
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          viewBox="0 0 240.608 240.608"
                        >
                          <path d="M208.789,29.972l31.819,31.82L91.763,210.637L0,118.876l31.819-31.82l59.944,59.942L208.789,29.972z" />
                        </svg>
                      </button>
                      <span className="f-press-enter">
                        press <span className="f-enter">Enter ↵</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* *********************************************************** */}
            {/* 2nd input field */}

            <section className="f-first" ref={refTwo}>
              <div className="f-outside-div">
                <div className="f-inside-section">
                  <div className="f-left">
                    <span className="f-num">2</span>
                    <svg
                      className="f-right-ar"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="0 0 31.143 31.143"
                    >
                      <g>
                        <g id="c100_arrow">
                          <path
                            d="M0,15.571c0.001,1.702,1.383,3.081,3.085,3.083l17.528-0.002l-4.738,4.739c-1.283,1.284-1.349,3.301-0.145,4.507
			c1.205,1.201,3.222,1.138,4.507-0.146l9.896-9.898c1.287-1.283,1.352-3.301,0.146-4.506c-0.033-0.029-0.068-0.051-0.1-0.08
			c-0.041-0.043-0.07-0.094-0.113-0.139l-9.764-9.762c-1.268-1.266-3.27-1.316-4.474-0.111c-1.205,1.205-1.153,3.208,0.111,4.476
			l4.755,4.754H3.085C1.381,12.485,0,13.865,0,15.571z"
                          />
                        </g>
                        <g id="Capa_1_46_"></g>
                      </g>
                    </svg>
                  </div>
                  <div className="f-form-div">
                    <p className="f-p" ref={inputRefTwo}>
                      Company Description
                    </p>
                    <textarea
                      className="f-textarea"
                      name=""
                      id=""
                      placeholder="Type your answer here..."
                      ref={inputRefTwo}
                      onChange={(e) =>
                        setAll({ ...showAll, cdesc: e.target.value })
                      }
                      onKeyUp={(e) => {
                        e.preventDefault();
                        newTarget(e, 1);
                      }}
                      cols="30"
                      rows="5"
                    />

                    <div className="f-btn-flex">
                      <button
                        className="f-next-btn"
                        onClick={() => handleClickPrevious(1)}
                      >
                        <svg
                          className="f-back-ar"
                          version="1.1"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          viewBox="0 0 492 492"
                        >
                          <g>
                            <g>
                              <path
                                d="M464.344,207.418l0.768,0.168H135.888l103.496-103.724c5.068-5.064,7.848-11.924,7.848-19.124
			c0-7.2-2.78-14.012-7.848-19.088L223.28,49.538c-5.064-5.064-11.812-7.864-19.008-7.864c-7.2,0-13.952,2.78-19.016,7.844
			L7.844,226.914C2.76,231.998-0.02,238.77,0,245.974c-0.02,7.244,2.76,14.02,7.844,19.096l177.412,177.412
			c5.064,5.06,11.812,7.844,19.016,7.844c7.196,0,13.944-2.788,19.008-7.844l16.104-16.112c5.068-5.056,7.848-11.808,7.848-19.008
			c0-7.196-2.78-13.592-7.848-18.652L134.72,284.406h329.992c14.828,0,27.288-12.78,27.288-27.6v-22.788
			C492,219.198,479.172,207.418,464.344,207.418z"
                              />
                            </g>
                          </g>
                        </svg>

                        <span>GO BACK</span>
                      </button>
                      <button
                        className="f-next-btn"
                        onClick={() => handleClick(1)}
                      >
                        <span>OK</span>
                        <svg
                          className="f-correct-ar"
                          version="1.1"
                          id="Capa_1"
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          viewBox="0 0 240.608 240.608"
                        >
                          <path d="M208.789,29.972l31.819,31.82L91.763,210.637L0,118.876l31.819-31.82l59.944,59.942L208.789,29.972z" />
                        </svg>
                      </button>
                      <span className="f-press-enter">
                        press{" "}
                        <span className="f-enter">
                          <span className="f-ctrl-enter">Ctrl</span> +{" "}
                          <span className="f-ctrl-enter">Enter</span> ↵
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* *********************************************************** */}
            {/* 3rd input field */}

            <section className="f-first" ref={refThree}>
              <div className="f-outside-div">
                <div className="f-inside-section">
                  <div className="f-left">
                    <span className="f-num">3</span>
                    <svg
                      className="f-right-ar"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="0 0 31.143 31.143"
                    >
                      <g>
                        <g id="c100_arrow">
                          <path
                            d="M0,15.571c0.001,1.702,1.383,3.081,3.085,3.083l17.528-0.002l-4.738,4.739c-1.283,1.284-1.349,3.301-0.145,4.507
			c1.205,1.201,3.222,1.138,4.507-0.146l9.896-9.898c1.287-1.283,1.352-3.301,0.146-4.506c-0.033-0.029-0.068-0.051-0.1-0.08
			c-0.041-0.043-0.07-0.094-0.113-0.139l-9.764-9.762c-1.268-1.266-3.27-1.316-4.474-0.111c-1.205,1.205-1.153,3.208,0.111,4.476
			l4.755,4.754H3.085C1.381,12.485,0,13.865,0,15.571z"
                          />
                        </g>
                        <g id="Capa_1_46_"></g>
                      </g>
                    </svg>
                  </div>
                  <div className="f-form-div">
                    <p className="f-p">Company URL</p>
                    <input
                      className="f-input"
                      id="firstInput"
                      type="text"
                      tabIndex="1"
                      required
                      ref={inputRefThree}
                      placeholder="Type your answer here..."
                      onChange={(e) => {
                        setAll({ ...showAll, curl: e.target.value });
                      }}
                      onKeyUp={(e) => {
                        target(e, 2);
                      }}
                    />
                    <div className="f-btn-flex">
                      <button
                        className="f-next-btn"
                        onClick={() => handleClickPrevious(2)}
                      >
                        <svg
                          className="f-back-ar"
                          version="1.1"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          viewBox="0 0 492 492"
                        >
                          <g>
                            <g>
                              <path
                                d="M464.344,207.418l0.768,0.168H135.888l103.496-103.724c5.068-5.064,7.848-11.924,7.848-19.124
			c0-7.2-2.78-14.012-7.848-19.088L223.28,49.538c-5.064-5.064-11.812-7.864-19.008-7.864c-7.2,0-13.952,2.78-19.016,7.844
			L7.844,226.914C2.76,231.998-0.02,238.77,0,245.974c-0.02,7.244,2.76,14.02,7.844,19.096l177.412,177.412
			c5.064,5.06,11.812,7.844,19.016,7.844c7.196,0,13.944-2.788,19.008-7.844l16.104-16.112c5.068-5.056,7.848-11.808,7.848-19.008
			c0-7.196-2.78-13.592-7.848-18.652L134.72,284.406h329.992c14.828,0,27.288-12.78,27.288-27.6v-22.788
			C492,219.198,479.172,207.418,464.344,207.418z"
                              />
                            </g>
                          </g>
                        </svg>

                        <span>GO BACK</span>
                      </button>
                      <button
                        className="f-next-btn"
                        onClick={() => handleClick(2)}
                      >
                        <span>OK</span>
                        <svg
                          className="f-correct-ar"
                          version="1.1"
                          id="Capa_1"
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          viewBox="0 0 240.608 240.608"
                        >
                          <path d="M208.789,29.972l31.819,31.82L91.763,210.637L0,118.876l31.819-31.82l59.944,59.942L208.789,29.972z" />
                        </svg>
                      </button>
                      <span className="f-press-enter">
                        press <span className="f-enter">Enter ↵</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* *********************************************************** */}
            {/* 4th input field */}

            <section className="f-first" ref={refFour}>
              <div className="f-outside-div">
                <div className="f-inside-section">
                  <div className="f-left">
                    <span className="f-num">4</span>
                    <svg
                      className="f-right-ar"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="0 0 31.143 31.143"
                    >
                      <g>
                        <g id="c100_arrow">
                          <path
                            d="M0,15.571c0.001,1.702,1.383,3.081,3.085,3.083l17.528-0.002l-4.738,4.739c-1.283,1.284-1.349,3.301-0.145,4.507
			c1.205,1.201,3.222,1.138,4.507-0.146l9.896-9.898c1.287-1.283,1.352-3.301,0.146-4.506c-0.033-0.029-0.068-0.051-0.1-0.08
			c-0.041-0.043-0.07-0.094-0.113-0.139l-9.764-9.762c-1.268-1.266-3.27-1.316-4.474-0.111c-1.205,1.205-1.153,3.208,0.111,4.476
			l4.755,4.754H3.085C1.381,12.485,0,13.865,0,15.571z"
                          />
                        </g>
                        <g id="Capa_1_46_"></g>
                      </g>
                    </svg>
                  </div>
                  <div className="f-form-div">
                    <p className="f-p">Company's Year of Established</p>
                    <input
                      className="f-input"
                      id="firstInput"
                      type="date"
                      required
                      ref={inputRefFour}
                      placeholder="Type your answer here..."
                      onChange={(e) => {
                        let epoch = new Date(e.target.value).getTime() / 1000;
                        setAll({ ...showAll, yoe: epoch });
                      }}
                      onKeyUp={(e) => {
                        target(e, 3);
                      }}
                    />

                    <div className="f-btn-flex">
                      <button
                        className="f-next-btn"
                        onClick={() => handleClickPrevious(3)}
                      >
                        <svg
                          className="f-back-ar"
                          version="1.1"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          viewBox="0 0 492 492"
                        >
                          <g>
                            <g>
                              <path
                                d="M464.344,207.418l0.768,0.168H135.888l103.496-103.724c5.068-5.064,7.848-11.924,7.848-19.124
			c0-7.2-2.78-14.012-7.848-19.088L223.28,49.538c-5.064-5.064-11.812-7.864-19.008-7.864c-7.2,0-13.952,2.78-19.016,7.844
			L7.844,226.914C2.76,231.998-0.02,238.77,0,245.974c-0.02,7.244,2.76,14.02,7.844,19.096l177.412,177.412
			c5.064,5.06,11.812,7.844,19.016,7.844c7.196,0,13.944-2.788,19.008-7.844l16.104-16.112c5.068-5.056,7.848-11.808,7.848-19.008
			c0-7.196-2.78-13.592-7.848-18.652L134.72,284.406h329.992c14.828,0,27.288-12.78,27.288-27.6v-22.788
			C492,219.198,479.172,207.418,464.344,207.418z"
                              />
                            </g>
                          </g>
                        </svg>

                        <span>GO BACK</span>
                      </button>
                      <button
                        className="f-next-btn"
                        onClick={() => handleClick(3)}
                      >
                        <span>OK</span>
                        <svg
                          className="f-correct-ar"
                          version="1.1"
                          id="Capa_1"
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          viewBox="0 0 240.608 240.608"
                        >
                          <path d="M208.789,29.972l31.819,31.82L91.763,210.637L0,118.876l31.819-31.82l59.944,59.942L208.789,29.972z" />
                        </svg>
                      </button>
                      <span className="f-press-enter">
                        press <span className="f-enter">Enter ↵</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* *********************************************************** */}
            {/* 5th input field */}

            <section className="f-first" ref={refFive}>
              <div className="f-outside-div">
                <div className="f-inside-section">
                  <div className="f-left">
                    <span className="f-num">5</span>
                    <svg
                      className="f-right-ar"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="0 0 31.143 31.143"
                    >
                      <g>
                        <g id="c100_arrow">
                          <path
                            d="M0,15.571c0.001,1.702,1.383,3.081,3.085,3.083l17.528-0.002l-4.738,4.739c-1.283,1.284-1.349,3.301-0.145,4.507
			c1.205,1.201,3.222,1.138,4.507-0.146l9.896-9.898c1.287-1.283,1.352-3.301,0.146-4.506c-0.033-0.029-0.068-0.051-0.1-0.08
			c-0.041-0.043-0.07-0.094-0.113-0.139l-9.764-9.762c-1.268-1.266-3.27-1.316-4.474-0.111c-1.205,1.205-1.153,3.208,0.111,4.476
			l4.755,4.754H3.085C1.381,12.485,0,13.865,0,15.571z"
                          />
                        </g>
                        <g id="Capa_1_46_"></g>
                      </g>
                    </svg>
                  </div>
                  <div className="f-form-div">
                    <p className="f-p">Number of Employes</p>

                    <input
                      className="f-input"
                      id="firstInput"
                      type="number"
                      required
                      ref={inputRefFive}
                      placeholder="Type your answer here..."
                      onChange={(e) => {
                        setAll({ ...showAll, noe: e.target.value });
                      }}
                      onKeyUp={(e) => {
                        target(e, 4);
                      }}
                    />

                    <div className="f-btn-flex">
                      <button
                        className="f-next-btn"
                        onClick={() => handleClickPrevious(4)}
                      >
                        <svg
                          className="f-back-ar"
                          version="1.1"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          viewBox="0 0 492 492"
                        >
                          <g>
                            <g>
                              <path
                                d="M464.344,207.418l0.768,0.168H135.888l103.496-103.724c5.068-5.064,7.848-11.924,7.848-19.124
			c0-7.2-2.78-14.012-7.848-19.088L223.28,49.538c-5.064-5.064-11.812-7.864-19.008-7.864c-7.2,0-13.952,2.78-19.016,7.844
			L7.844,226.914C2.76,231.998-0.02,238.77,0,245.974c-0.02,7.244,2.76,14.02,7.844,19.096l177.412,177.412
			c5.064,5.06,11.812,7.844,19.016,7.844c7.196,0,13.944-2.788,19.008-7.844l16.104-16.112c5.068-5.056,7.848-11.808,7.848-19.008
			c0-7.196-2.78-13.592-7.848-18.652L134.72,284.406h329.992c14.828,0,27.288-12.78,27.288-27.6v-22.788
			C492,219.198,479.172,207.418,464.344,207.418z"
                              />
                            </g>
                          </g>
                        </svg>

                        <span>GO BACK</span>
                      </button>
                      <button
                        className="f-next-btn"
                        onClick={() => handleClick(4)}
                      >
                        <span>OK</span>

                        <svg
                          className="f-correct-ar"
                          version="1.1"
                          id="Capa_1"
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          viewBox="0 0 240.608 240.608"
                        >
                          <path d="M208.789,29.972l31.819,31.82L91.763,210.637L0,118.876l31.819-31.82l59.944,59.942L208.789,29.972z" />
                        </svg>
                      </button>
                      <span className="f-press-enter">
                        press <span className="f-enter">Enter ↵</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* *********************************************************** */}
            {/* 6th input field */}

            <section className="f-first" ref={refSix}>
              <div className="f-outside-div">
                <div className="f-inside-section">
                  <div className="f-left">
                    <span className="f-num">6</span>
                    <svg
                      className="f-right-ar"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="0 0 31.143 31.143"
                    >
                      <g>
                        <g id="c100_arrow">
                          <path
                            d="M0,15.571c0.001,1.702,1.383,3.081,3.085,3.083l17.528-0.002l-4.738,4.739c-1.283,1.284-1.349,3.301-0.145,4.507
			c1.205,1.201,3.222,1.138,4.507-0.146l9.896-9.898c1.287-1.283,1.352-3.301,0.146-4.506c-0.033-0.029-0.068-0.051-0.1-0.08
			c-0.041-0.043-0.07-0.094-0.113-0.139l-9.764-9.762c-1.268-1.266-3.27-1.316-4.474-0.111c-1.205,1.205-1.153,3.208,0.111,4.476
			l4.755,4.754H3.085C1.381,12.485,0,13.865,0,15.571z"
                          />
                        </g>
                        <g id="Capa_1_46_"></g>
                      </g>
                    </svg>
                  </div>
                  <div className="f-form-div">
                    <p className="f-p">Company's Address</p>

                    <textarea
                      className="f-textarea"
                      name=""
                      id=""
                      placeholder="Type your answer here..."
                      ref={inputRefSix}
                      onChange={(e) =>
                        setAll({ ...showAll, caddress: e.target.value })
                      }
                      onKeyUp={(e) => {
                        e.preventDefault();
                        newTarget(e, 5);
                      }}
                      cols="30"
                      rows="5"
                    />

                    <div className="f-btn-flex">
                      <button
                        className="f-next-btn"
                        onClick={() => handleClickPrevious(5)}
                      >
                        <svg
                          className="f-back-ar"
                          version="1.1"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          viewBox="0 0 492 492"
                        >
                          <g>
                            <g>
                              <path
                                d="M464.344,207.418l0.768,0.168H135.888l103.496-103.724c5.068-5.064,7.848-11.924,7.848-19.124
			c0-7.2-2.78-14.012-7.848-19.088L223.28,49.538c-5.064-5.064-11.812-7.864-19.008-7.864c-7.2,0-13.952,2.78-19.016,7.844
			L7.844,226.914C2.76,231.998-0.02,238.77,0,245.974c-0.02,7.244,2.76,14.02,7.844,19.096l177.412,177.412
			c5.064,5.06,11.812,7.844,19.016,7.844c7.196,0,13.944-2.788,19.008-7.844l16.104-16.112c5.068-5.056,7.848-11.808,7.848-19.008
			c0-7.196-2.78-13.592-7.848-18.652L134.72,284.406h329.992c14.828,0,27.288-12.78,27.288-27.6v-22.788
			C492,219.198,479.172,207.418,464.344,207.418z"
                              />
                            </g>
                          </g>
                        </svg>

                        <span>GO BACK</span>
                      </button>
                      <button
                        className="f-next-btn"
                        onClick={() => handleClick(5)}
                      >
                        <span>OK</span>

                        <svg
                          className="f-correct-ar"
                          version="1.1"
                          id="Capa_1"
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          viewBox="0 0 240.608 240.608"
                        >
                          <path d="M208.789,29.972l31.819,31.82L91.763,210.637L0,118.876l31.819-31.82l59.944,59.942L208.789,29.972z" />
                        </svg>
                      </button>
                      <span className="f-press-enter">
                        press{" "}
                        <span className="f-enter">
                          <span className="f-ctrl-enter">Ctrl</span> +{" "}
                          <span className="f-ctrl-enter">Enter</span> ↵
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* *********************************************************** */}
            {/* 7th input field */}

            <section className="f-first" ref={refSeven}>
              <div className="f-outside-div">
                <div className="f-inside-section">
                  <div className="f-left">
                    <span className="f-num">7</span>
                    <svg
                      className="f-right-ar"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="0 0 31.143 31.143"
                    >
                      <g>
                        <g id="c100_arrow">
                          <path
                            d="M0,15.571c0.001,1.702,1.383,3.081,3.085,3.083l17.528-0.002l-4.738,4.739c-1.283,1.284-1.349,3.301-0.145,4.507
			c1.205,1.201,3.222,1.138,4.507-0.146l9.896-9.898c1.287-1.283,1.352-3.301,0.146-4.506c-0.033-0.029-0.068-0.051-0.1-0.08
			c-0.041-0.043-0.07-0.094-0.113-0.139l-9.764-9.762c-1.268-1.266-3.27-1.316-4.474-0.111c-1.205,1.205-1.153,3.208,0.111,4.476
			l4.755,4.754H3.085C1.381,12.485,0,13.865,0,15.571z"
                          />
                        </g>
                        <g id="Capa_1_46_"></g>
                      </g>
                    </svg>
                  </div>
                  <div className="f-form-div" ref={inputRefSeven}>
                    <p className="f-p">Company Contact Number</p>
                    <PhoneInput
                      inputExtraProps={{
                        name: "phone",
                        required: true,
                        autoFocus: false,
                      }}
                      country={"us"}
                      value={showAll.contact}
                      autoFocus="false"
                      onChange={(e) => setAll({ ...showAll, cnum: e })}
                      // onKeyUp={(e) => {
                      //   target(e, 4);
                      // }}
                    />

                    <div className="f-btn-flex">
                      <button
                        className="f-next-btn"
                        onClick={() => handleClickPrevious(6)}
                      >
                        <svg
                          className="f-back-ar"
                          version="1.1"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          viewBox="0 0 492 492"
                        >
                          <g>
                            <g>
                              <path
                                d="M464.344,207.418l0.768,0.168H135.888l103.496-103.724c5.068-5.064,7.848-11.924,7.848-19.124
			c0-7.2-2.78-14.012-7.848-19.088L223.28,49.538c-5.064-5.064-11.812-7.864-19.008-7.864c-7.2,0-13.952,2.78-19.016,7.844
			L7.844,226.914C2.76,231.998-0.02,238.77,0,245.974c-0.02,7.244,2.76,14.02,7.844,19.096l177.412,177.412
			c5.064,5.06,11.812,7.844,19.016,7.844c7.196,0,13.944-2.788,19.008-7.844l16.104-16.112c5.068-5.056,7.848-11.808,7.848-19.008
			c0-7.196-2.78-13.592-7.848-18.652L134.72,284.406h329.992c14.828,0,27.288-12.78,27.288-27.6v-22.788
			C492,219.198,479.172,207.418,464.344,207.418z"
                              />
                            </g>
                          </g>
                        </svg>

                        <span>GO BACK</span>
                      </button>
                      <button
                        className="f-next-btn"
                        onClick={() => handleClick(6)}
                      >
                        <span>OK</span>

                        <svg
                          className="f-correct-ar"
                          version="1.1"
                          id="Capa_1"
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          viewBox="0 0 240.608 240.608"
                        >
                          <path d="M208.789,29.972l31.819,31.82L91.763,210.637L0,118.876l31.819-31.82l59.944,59.942L208.789,29.972z" />
                        </svg>
                      </button>
                      <span className="f-press-enter">
                        press <span className="f-enter">Enter ↵</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* *********************************************************** */}

            {/* 8th input field */}

            <section className="f-first" ref={refEight}>
              <div className="f-outside-div">
                <div className="f-inside-section">
                  <div className="f-left">
                    <span className="f-num">8</span>
                    <svg
                      className="f-right-ar"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="0 0 31.143 31.143"
                    >
                      <g>
                        <g id="c100_arrow">
                          <path
                            d="M0,15.571c0.001,1.702,1.383,3.081,3.085,3.083l17.528-0.002l-4.738,4.739c-1.283,1.284-1.349,3.301-0.145,4.507
			c1.205,1.201,3.222,1.138,4.507-0.146l9.896-9.898c1.287-1.283,1.352-3.301,0.146-4.506c-0.033-0.029-0.068-0.051-0.1-0.08
			c-0.041-0.043-0.07-0.094-0.113-0.139l-9.764-9.762c-1.268-1.266-3.27-1.316-4.474-0.111c-1.205,1.205-1.153,3.208,0.111,4.476
			l4.755,4.754H3.085C1.381,12.485,0,13.865,0,15.571z"
                          />
                        </g>
                        <g id="Capa_1_46_"></g>
                      </g>
                    </svg>
                  </div>
                  <div className="f-form-div">
                    <p className="f-p">Country</p>

                    <select
                      name=""
                      id=""
                      className="f-select"
                      ref={inputRefEight}
                      onChange={(e) =>
                        setAll({ ...showAll, ccountry: e.target.value })
                      }
                      onKeyUp={(e) => {
                        target(e, 7);
                      }}
                    >
                      {countryArr.map((item, value) => (
                        <option key={value} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>

                    <div className="f-btn-flex">
                      <button
                        className="f-next-btn"
                        onClick={() => handleClickPrevious(7)}
                      >
                        <svg
                          className="f-back-ar"
                          version="1.1"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          viewBox="0 0 492 492"
                        >
                          <g>
                            <g>
                              <path
                                d="M464.344,207.418l0.768,0.168H135.888l103.496-103.724c5.068-5.064,7.848-11.924,7.848-19.124
			c0-7.2-2.78-14.012-7.848-19.088L223.28,49.538c-5.064-5.064-11.812-7.864-19.008-7.864c-7.2,0-13.952,2.78-19.016,7.844
			L7.844,226.914C2.76,231.998-0.02,238.77,0,245.974c-0.02,7.244,2.76,14.02,7.844,19.096l177.412,177.412
			c5.064,5.06,11.812,7.844,19.016,7.844c7.196,0,13.944-2.788,19.008-7.844l16.104-16.112c5.068-5.056,7.848-11.808,7.848-19.008
			c0-7.196-2.78-13.592-7.848-18.652L134.72,284.406h329.992c14.828,0,27.288-12.78,27.288-27.6v-22.788
			C492,219.198,479.172,207.418,464.344,207.418z"
                              />
                            </g>
                          </g>
                        </svg>

                        <span>GO BACK</span>
                      </button>
                      <button
                        className="f-next-btn"
                        onClick={() => handleClick(7)}
                      >
                        <span>OK</span>

                        <svg
                          className="f-correct-ar"
                          version="1.1"
                          id="Capa_1"
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          viewBox="0 0 240.608 240.608"
                        >
                          <path d="M208.789,29.972l31.819,31.82L91.763,210.637L0,118.876l31.819-31.82l59.944,59.942L208.789,29.972z" />
                        </svg>
                      </button>
                      <span className="f-press-enter">
                        press <span className="f-enter">Enter ↵</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* *********************************************************** */}
            {/* 9th input field */}

            {/* <section className="f-first" ref={refNine}>
            <div className="f-outside-div">
              <div className="f-inside-section">
                <div className="f-left">
                  <span className="f-num">8</span>
                  <svg
                    className="f-right-ar"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 31.143 31.143"
                  >
                    <g>
                      <g id="c100_arrow">
                        <path
                          d="M0,15.571c0.001,1.702,1.383,3.081,3.085,3.083l17.528-0.002l-4.738,4.739c-1.283,1.284-1.349,3.301-0.145,4.507
			c1.205,1.201,3.222,1.138,4.507-0.146l9.896-9.898c1.287-1.283,1.352-3.301,0.146-4.506c-0.033-0.029-0.068-0.051-0.1-0.08
			c-0.041-0.043-0.07-0.094-0.113-0.139l-9.764-9.762c-1.268-1.266-3.27-1.316-4.474-0.111c-1.205,1.205-1.153,3.208,0.111,4.476
			l4.755,4.754H3.085C1.381,12.485,0,13.865,0,15.571z"
                        />
                      </g>
                      <g id="Capa_1_46_"></g>
                    </g>
                  </svg>
                </div>
                <div className="f-form-div">
                  <p className="f-p">Sectors</p>

                  <input
                    className="f-input"
                    id="firstInput"
                    type="number"
                    required
                    ref={inputRefNine}
                    placeholder="Type your answer here..."
                    onChange={(e) => {
                      setAll({ ...showAll, csector: e.target.value });
                    }}
                    onKeyUp={(e) => {
                      target(e, 8);
                    }}
                  />

                  <div className="f-btn-flex">
                    <button
                      className="f-next-btn"
                      onClick={() => handleClickPrevious(8)}
                    >
                      <svg
                        className="f-back-ar"
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 492 492"
                      >
                        <g>
                          <g>
                            <path
                              d="M464.344,207.418l0.768,0.168H135.888l103.496-103.724c5.068-5.064,7.848-11.924,7.848-19.124
			c0-7.2-2.78-14.012-7.848-19.088L223.28,49.538c-5.064-5.064-11.812-7.864-19.008-7.864c-7.2,0-13.952,2.78-19.016,7.844
			L7.844,226.914C2.76,231.998-0.02,238.77,0,245.974c-0.02,7.244,2.76,14.02,7.844,19.096l177.412,177.412
			c5.064,5.06,11.812,7.844,19.016,7.844c7.196,0,13.944-2.788,19.008-7.844l16.104-16.112c5.068-5.056,7.848-11.808,7.848-19.008
			c0-7.196-2.78-13.592-7.848-18.652L134.72,284.406h329.992c14.828,0,27.288-12.78,27.288-27.6v-22.788
			C492,219.198,479.172,207.418,464.344,207.418z"
                            />
                          </g>
                        </g>
                      </svg>

                      <span>GO BACK</span>
                    </button>
                    <button
                      className="f-next-btn"
                      onClick={() => {
                        // handleClick(8);
                        navigate("/company");
                      }}
                    >
                      <span>NEXT</span>

                      <svg
                        className="f-correct-ar"
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 240.608 240.608"
                      >
                        <path d="M208.789,29.972l31.819,31.82L91.763,210.637L0,118.876l31.819-31.82l59.944,59.942L208.789,29.972z" />
                      </svg>
                    </button>
                    <span className="f-press-enter">
                      press <span className="f-enter">Enter ↵</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section> */}

            {/* *********************************************************** */}

            {/* 10th input field */}

            <section className="f-first" ref={refNine}>
              <div className="f-outside-div">
                <div className="f-inside-section">
                  <div className="f-left">
                    <span className="f-num">9</span>
                    <svg
                      className="f-right-ar"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="0 0 31.143 31.143"
                    >
                      <g>
                        <g id="c100_arrow">
                          <path
                            d="M0,15.571c0.001,1.702,1.383,3.081,3.085,3.083l17.528-0.002l-4.738,4.739c-1.283,1.284-1.349,3.301-0.145,4.507
			c1.205,1.201,3.222,1.138,4.507-0.146l9.896-9.898c1.287-1.283,1.352-3.301,0.146-4.506c-0.033-0.029-0.068-0.051-0.1-0.08
			c-0.041-0.043-0.07-0.094-0.113-0.139l-9.764-9.762c-1.268-1.266-3.27-1.316-4.474-0.111c-1.205,1.205-1.153,3.208,0.111,4.476
			l4.755,4.754H3.085C1.381,12.485,0,13.865,0,15.571z"
                          />
                        </g>
                        <g id="Capa_1_46_"></g>
                      </g>
                    </svg>
                  </div>
                  <div className="f-form-div">
                    <p className="f-p">Upload logo of your company</p>

                    <div ref={inputRefNine}>
                      <p className="upload-img-instruction">
                        * click on image box to choose image and then press
                        "upload file" button to upload your image
                      </p>
                      <p className="upload-img-instruction">
                        * we are uploading images on IPFS so it may take some
                        time. If you are in hurry then you can select any random
                        image by pressing "Random" button or skip this.
                      </p>

                      <StoreProfileImg setFileCid={setLogoCID} />
                    </div>

                    <div className="f-btn-flex">
                      <button
                        className="f-next-btn"
                        onClick={() => handleClickPrevious(8)}
                      >
                        <svg
                          className="f-back-ar"
                          version="1.1"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          viewBox="0 0 492 492"
                        >
                          <g>
                            <g>
                              <path
                                d="M464.344,207.418l0.768,0.168H135.888l103.496-103.724c5.068-5.064,7.848-11.924,7.848-19.124
			c0-7.2-2.78-14.012-7.848-19.088L223.28,49.538c-5.064-5.064-11.812-7.864-19.008-7.864c-7.2,0-13.952,2.78-19.016,7.844
			L7.844,226.914C2.76,231.998-0.02,238.77,0,245.974c-0.02,7.244,2.76,14.02,7.844,19.096l177.412,177.412
			c5.064,5.06,11.812,7.844,19.016,7.844c7.196,0,13.944-2.788,19.008-7.844l16.104-16.112c5.068-5.056,7.848-11.808,7.848-19.008
			c0-7.196-2.78-13.592-7.848-18.652L134.72,284.406h329.992c14.828,0,27.288-12.78,27.288-27.6v-22.788
			C492,219.198,479.172,207.418,464.344,207.418z"
                              />
                            </g>
                          </g>
                        </svg>

                        <span>GO BACK</span>
                      </button>
                      <button
                        className="f-next-btn"
                        onClick={() => {
                          handleClick(8);
                          // navigate("/company");
                        }}
                      >
                        <span>OK</span>

                        <svg
                          className="f-correct-ar"
                          version="1.1"
                          id="Capa_1"
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          viewBox="0 0 240.608 240.608"
                        >
                          <path d="M208.789,29.972l31.819,31.82L91.763,210.637L0,118.876l31.819-31.82l59.944,59.942L208.789,29.972z" />
                        </svg>
                      </button>
                      <span className="f-press-enter">
                        press <span className="f-enter">Enter ↵</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* *********************************************************** */}

            {/* 11th input field */}

            <section className="f-first" ref={refTen}>
              <div className="f-outside-div">
                <div className="f-inside-section">
                  <div className="f-left">
                    <span className="f-num">10</span>
                    <svg
                      className="f-right-ar"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="0 0 31.143 31.143"
                    >
                      <g>
                        <g id="c100_arrow">
                          <path
                            d="M0,15.571c0.001,1.702,1.383,3.081,3.085,3.083l17.528-0.002l-4.738,4.739c-1.283,1.284-1.349,3.301-0.145,4.507
			c1.205,1.201,3.222,1.138,4.507-0.146l9.896-9.898c1.287-1.283,1.352-3.301,0.146-4.506c-0.033-0.029-0.068-0.051-0.1-0.08
			c-0.041-0.043-0.07-0.094-0.113-0.139l-9.764-9.762c-1.268-1.266-3.27-1.316-4.474-0.111c-1.205,1.205-1.153,3.208,0.111,4.476
			l4.755,4.754H3.085C1.381,12.485,0,13.865,0,15.571z"
                          />
                        </g>
                        <g id="Capa_1_46_"></g>
                      </g>
                    </svg>
                  </div>
                  <div className="f-form-div">
                    <p className="f-p">Please upload cover image</p>

                    <div ref={inputRefTen}>
                      <p className="upload-img-instruction">
                        * click on image box to choose image and then press
                        "upload file" button to upload your image
                      </p>
                      <p className="upload-img-instruction">
                        * we are uploading images on IPFS so it may take some
                        time. If you are in hurry then you can select any random
                        image by pressing "Random" button
                      </p>
                      <StoreCoverImg setFileCid2={setCoverCID} />
                    </div>

                    <div className="f-btn-flex">
                      <button
                        className="f-next-btn"
                        onClick={() => handleClickPrevious(9)}
                      >
                        <svg
                          className="f-back-ar"
                          version="1.1"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          viewBox="0 0 492 492"
                        >
                          <g>
                            <g>
                              <path
                                d="M464.344,207.418l0.768,0.168H135.888l103.496-103.724c5.068-5.064,7.848-11.924,7.848-19.124
			c0-7.2-2.78-14.012-7.848-19.088L223.28,49.538c-5.064-5.064-11.812-7.864-19.008-7.864c-7.2,0-13.952,2.78-19.016,7.844
			L7.844,226.914C2.76,231.998-0.02,238.77,0,245.974c-0.02,7.244,2.76,14.02,7.844,19.096l177.412,177.412
			c5.064,5.06,11.812,7.844,19.016,7.844c7.196,0,13.944-2.788,19.008-7.844l16.104-16.112c5.068-5.056,7.848-11.808,7.848-19.008
			c0-7.196-2.78-13.592-7.848-18.652L134.72,284.406h329.992c14.828,0,27.288-12.78,27.288-27.6v-22.788
			C492,219.198,479.172,207.418,464.344,207.418z"
                              />
                            </g>
                          </g>
                        </svg>

                        <span>GO BACK</span>
                      </button>
                      <button
                        className="f-next-btn"
                        onClick={() => {
                          setbtnLoading(true);

                          // handleClick(10);
                          // functionName();
                          sendCompanyRegData(
                            loginId,
                            showAll.cname,
                            logoCID,
                            coverCID,
                            address,
                            showAll.cdesc,
                            showAll.curl,
                            showAll.yoe,
                            showAll.noe,
                            showAll.caddress,
                            showAll.ccountry,
                            showAll.cnum
                          );
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
                          <>
                            <span>NEXT</span>

                            <svg
                              className="f-correct-ar"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              viewBox="0 0 240.608 240.608"
                            >
                              <path d="M208.789,29.972l31.819,31.82L91.763,210.637L0,118.876l31.819-31.82l59.944,59.942L208.789,29.972z" />
                            </svg>
                          </>
                        )}
                      </button>
                      <span className="f-press-enter">
                        press <span className="f-enter">Enter ↵</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* *********************************************************** */}
          </section>

          {/* <button
          className="f-next-try-btn"
          onClick={() => console.log(document.activeElement)}
        >
          trying
        </button> */}
        </section>
      </>
    );
  } else {
    navigate("/");
  }
}

export default CompanyRegForm;
