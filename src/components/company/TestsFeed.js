import React, { useEffect, useState } from "react";
import { connect } from "@tableland/sdk";
import "../company/styles/testfeed.css";
import { useNavigate } from "react-router-dom";

function TestsFeed() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const showTestFeeds = async () => {
    const name = "creators_assesment_table_80001_2074";
    const tableland = await connect({
      network: "testnet",
      chain: "polygon-mumbai",
    });
    const table = "creators_table_80001_2155";
    const readRes = await tableland.read(`SELECT * FROM ${name}`);
    // setData([]);
    for (let i = 0; i < readRes["rows"].length; i++) {
      let creatorId = readRes["rows"][i][1];
      const response = await tableland.read(
        `SELECT name,profile_image FROM ${table} where creator_id=${creatorId}`
      );
      let url = "https://ipfs.io/ipfs/" + response["rows"][0][1];
      // let noOfApplicants = response["rows"].length;
      var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
      d.setUTCSeconds(readRes["rows"][i][6]);
      let date_array = d.toString().split(" ", 4);
      let final_array = [];
      for (let i = 1; i < date_array.length; i++) {
        final_array.push(date_array[i]);
      }
      data.push([
        readRes["rows"][i][2],
        final_array.toString(),
        readRes["rows"][i][10],
        response["rows"][0][0],
        readRes["rows"][i][3],
        readRes["rows"][i][11],
        readRes["rows"][i][12],
        readRes["rows"][i][13],
        readRes["rows"][i][4],
        readRes["rows"][i][5],
        url,
      ]);
    }
    setData(data);
    setLoading(true);
  };

  //-------- titlecase code ------
  function titleCase(str) {
    str = str.toLowerCase().split(" ");
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(" ");
  }
  // titleCase("I'm a little tea pot");
  // console.log(titleCase("I'm a little tea pot"))
  //---------end---------------------------------

  useEffect(() => {
    showTestFeeds();
  }, []);

  const navigate = useNavigate();

  const navigateToTestDescription = () => {
    // 👇️ navigate to /contacts
    navigate("/company/testdescrption");
  };
  if (loading) {
    return (
      <div>
        <div className="td-container">
          <div className="td-title">
            <h1>Test Feed</h1>
          </div>

          {data.map((inde) => {
            return (
              <div className="td-main">
                <div className="td-main-content">
                  <div className="td-main-1">
                    <label for="first_name" class="td-name">
                      {inde[0]}
                    </label>
                    <div className="td-row">
                      <div className="td-outer-heading">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
                            clipRule="evenodd"
                          />
                        </svg>

                        <span
                          className="
                      gap-1"
                        >
                          Duration:{" "}
                        </span>
                        <span className="gap-1">{inde[1]}</span>
                      </div>
                      <div className="td-outer-heading">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9.664 1.319a.75.75 0 01.672 0 41.059 41.059 0 018.198 5.424.75.75 0 01-.254 1.285 31.372 31.372 0 00-7.86 3.83.75.75 0 01-.84 0 31.508 31.508 0 00-2.08-1.287V9.394c0-.244.116-.463.302-.592a35.504 35.504 0 013.305-2.033.75.75 0 00-.714-1.319 37 37 0 00-3.446 2.12A2.216 2.216 0 006 9.393v.38a31.293 31.293 0 00-4.28-1.746.75.75 0 01-.254-1.285 41.059 41.059 0 018.198-5.424zM6 11.459a29.848 29.848 0 00-2.455-1.158 41.029 41.029 0 00-.39 3.114.75.75 0 00.419.74c.528.256 1.046.53 1.554.82-.21.324-.455.63-.739.914a.75.75 0 101.06 1.06c.37-.369.69-.77.96-1.193a26.61 26.61 0 013.095 2.348.75.75 0 00.992 0 26.547 26.547 0 015.93-3.95.75.75 0 00.42-.739 41.053 41.053 0 00-.39-3.114 29.925 29.925 0 00-5.199 2.801 2.25 2.25 0 01-2.514 0c-.41-.275-.826-.541-1.25-.797a6.985 6.985 0 01-1.084 3.45 26.503 26.503 0 00-1.281-.78A5.487 5.487 0 006 12v-.54z"
                            clipRule="evenodd"
                          />
                        </svg>

                        <span>Experience: </span>
                        <span>{inde[2]} year</span>
                      </div>
                      <div className="td-outer-heading">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                          <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                        </svg>

                        <span>Test Taken by: </span>
                        <span> 22 User</span>
                      </div>
                    </div>
                  </div>

                  <div className="user-avatar">
                    <div className="td-user-name">
                      <h1 className="td-name">The Test is made by</h1>
                      <span>{inde[3]}</span>
                    </div>
                    <img
                      class=" user-img w-10 h-10 rounded"
                      src={inde[10]}
                      alt="Default avatar"
                    />
                  </div>
                </div>
                <div className="td-paragraph">
                  <p>{inde[4]}</p>
                </div>
                <div className="td-btn-main">
                  <div className="tag-and-btn">
                    <button
                      type="button"
                      class=" tag-button px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-mdhover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      {titleCase(inde[5])}
                    </button>
                    <button
                      type="button"
                      class=" tag-button px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-mdhover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      {titleCase(inde[6])}
                    </button>
                    <button
                      type="button"
                      class=" tag-button px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-mdhover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      {titleCase(inde[7])}
                    </button>
                  </div>

                  <div className="cost-button">
                    <button
                      type="button"
                      class=" fix-cost  px-6 py-2 mx-2 border-2 border-black-900 text-black-900 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    >
                      Fix Cost : {inde[8]}
                    </button>
                    <button
                      type="button"
                      class=" color-btnn  px-6 py-2 border-2 border-purple-600 text-purple-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    >
                      Variable cost : {inde[9]}
                    </button>
                  </div>
                  <div className="main-btn">
                    <button
                      type="button"
                      onClick={navigateToTestDescription}
                      class=" arreow-buttton   focus:outline-none  font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h4.59l-2.1 1.95a.75.75 0 001.02 1.1l3.5-3.25a.75.75 0 000-1.1l-3.5-3.25a.75.75 0 10-1.02 1.1l2.1 1.95H6.75z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span class="sr-only">Icon description</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    console.log("Loading");
  }
}

export default TestsFeed;
