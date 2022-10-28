import React, { useEffect, useState } from "react";
import "./test.css";
import TestNFT from "../../assets/images/exam-result.jpg";
import CompanyLogo from "../../assets/images/companyprofile.png";
import testdata from "../testdata";
import { connect } from "@tableland/sdk";
import { useAccount } from "wagmi";

const CandidateTestResults = () => {
  const { address, isConnected } = useAccount();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState();
  const [profile, setProfile] = useState();
  const showResult = async () => {
    const name = "application_details_table_80001_2806";
    const tableland = await connect({
      network: "testnet",
      chain: "polygon-mumbai",
    });
    const candidate_table = "candidate_table_80001_1648";
    const res = await tableland.read(
      `SELECT candidate_id,name,profile_image FROM ${candidate_table} where wallet_address='${address}'`
    );
    let candidate_id = res["rows"][0][0];
    let user = res["rows"][0][1];
    setName(user);
    let url = "https://ipfs.io/ipfs/" + res["rows"][0][2];
    setProfile(url);
    const readRes = await tableland.read(
      `SELECT * FROM ${name} where candidate_id=${candidate_id}`
    );
    let job_id = [];
    for (let i = 0; i < readRes["rows"].length; i++) {
      job_id.push(readRes["rows"][i][2]);
    }
    for (let i = 0; i < job_id.length; i++) {
      const res1 = await tableland.read(
        `SELECT title,company_id FROM job_table_80001_2018 where job_id=${job_id[i]}`
      );
      console.log(res1);
      let title = res1["rows"][0][0];
      const res2 = await tableland.read(
        `SELECT application_id FROM ${name} where job_id=${job_id[i]} and candidate_id=${candidate_id}`
      );
      let app_id = res2["rows"][0][0];
      const res3 = await tableland.read(
        `SELECT score,duration FROM result_table_80001_2805 where application_id=${app_id} and candidte_id=${candidate_id}`
      );
      let score = res3["rows"][0][0];
      let duration = res3["rows"][0][1];
      let company_id = res1["rows"][0][1];
      const res4 = await tableland.read(
        `SELECT name FROM company_table_80001_1730 where company_id=${company_id} `
      );
      let company_name = res4["rows"][0][0];
      data.push([title, score, company_name, duration]);
    }
    setData(data);
    console.log(data);
    setLoading(true);
  };

  useEffect(() => {
    showResult();
  }, [address]);

  if (loading) {
    return (
      <>
        <div className="test-result-main-content">
          <div className="candidate-test-header">Test Result</div>
          <div className="candidate-test-outer">
            <div className="profile-name-merge-div">
              <img
                className="candidate-more-logo-test-result"
                src={profile}
                alt="company-logo"
              />
              <div className="candidate-test-name">{name}</div>
            </div>
            <div className="candidate-test-info">
              {data.map((i) => {
                return (
                  <div className="candidate-info">
                    <div className="candidate-all-info">{i[0]}</div>
                    <div className="candidate-result-info">Score: {i[1]}</div>
                    <div className="candidate-company-info">{i[2]}</div>
                    <div className="candidate-time-info">{i[3]}</div>
                    <img
                      className="candidate-test-nft"
                      src={TestNFT}
                      alt="Test-NFT"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return "loading";
  }
};

export default CandidateTestResults;
