import React, { useEffect, useState } from "react";
import "./styles/creatorlist.css";
import { connect } from "@tableland/sdk";

function CreatorsList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const showCreators = async () => {
    const name = "creators_table_80001_2155";
    const tableland = await connect({
      network: "testnet",
      chain: "polygon-mumbai",
    });
    const readRes = await tableland.read(`SELECT * FROM ${name}`);
    for (let i = 0; i < readRes["rows"].length; i++) {
      let login_id = readRes["rows"][i][1];
      const response = await tableland.read(
        `SELECT skill_id FROM user_skill_table_80001_1736 where login_id=${login_id}`
      );
      var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
      d.setUTCSeconds(readRes["rows"][i][13]);
      let date_array = d.toString().split(" ", 4);
      let final_array = [];
      for (let i = 1; i < date_array.length; i++) {
        final_array.push(date_array[i]);
      }
      // if (response["rows"].length > 0) {
      //   const skill1 = await tableland.read(
      //     `SELECT skill_name FROM skill_table_80001_1735 where skill_id=${response["rows"][0][0]}`
      //   );
      // }
      const skill1 = await tableland.read(
        `SELECT skill_name FROM skill_table_80001_1735 where skill_id=${response["rows"][0][0]}`
      );
      const skill2 = await tableland.read(
        `SELECT skill_name FROM skill_table_80001_1735 where skill_id=${response["rows"][1][0]}`
      );
      const skill3 = await tableland.read(
        `SELECT skill_name FROM skill_table_80001_1735 where skill_id=${response["rows"][2][0]}`
      );
      data.push([
        readRes["rows"][i][5],
        readRes["rows"][i][3],
        final_array.toString(),
        readRes["rows"][i][10],
        readRes["rows"][i][4],
        skill1["rows"][0][0],
        skill2["rows"][0][0],
        skill3["rows"][0][0],
      ]);
    }
    setData(data);
    setLoading(true);
  };
  useEffect(() => {
    showCreators();
  }, []);
  if (loading) {
    return (
      <div>
        <div className="cr-title">
          <h1>Creators</h1>
        </div>
        {data.map((inde) => {
          return (
            <div className="cr-container">
              <div className="cr-main">
                <div className="cr-main-content">
                  <img
                    class="p-1 w-14 h-14 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                    src={"https://ipfs.io/ipfs/" + inde[0]}
                    alt="Rounded avatar"
                  />
                  <h1 className="cr-name">{inde[1]}</h1>
                </div>
                <div className="cr-row">
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

                    <span className="cr-head">Created: </span>
                    <span>{inde[2]}</span>
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

                    <span className="cr-head"> Industry Experiance: </span>
                    <span>{inde[3]}</span>
                  </div>
                </div>
                <div className="td-paragraph cr-pg">
                  <p>{inde[4]}</p>
                </div>
                <div className="cr-btn-main">
                  <div>
                    <h1 className="cr-name-tag"> Expertise:</h1>
                  </div>
                  <div className="tag-and-btn">
                    <button
                      type="button"
                      class=" tag-button px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-mdhover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      {inde[5]}
                    </button>
                    <button
                      type="button"
                      class=" tag-button px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-mdhover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      {inde[6]}
                    </button>
                    <button
                      type="button"
                      class=" tag-button px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-mdhover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      {inde[7]}
                    </button>
                  </div>

                  <button
                    type="button"
                    class=" arreow-buttton  arreow-buttton   focus:outline-none  font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center "
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
    );
  } else {
    console.log("Loading");
  }
}

export default CreatorsList;
