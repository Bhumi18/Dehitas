import "./Myrepos.css";
import Cookies from "universal-cookie";
import { useAccount, useConnect } from "wagmi";
import { useEffect, useState } from "react";
import { InjectedConnector } from "@wagmi/core";
import axios from "axios";
import { connect } from "@tableland/sdk";
import LoadingIcon from "../walletconnect/LoadingIcon";
import { useNavigate } from "react-router-dom";

function Myrepos() {
  const [repoTable, setRepoTable] = useState("");
  const cookies = new Cookies();
  const { address, isConnected } = useAccount();
  const [allUserRepo, setAllUserRepo] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { connectWallet } = useConnect({
    connector: new InjectedConnector(),
  });

  const getRecords = async () => {
    const tableland = await connect({
      network: "testnet",
      chain: "polygon-mumbai",
    });

    console.log(tableland);

    const fetchRepos = await tableland.read(`SELECT * FROM ${repoTable}`);
    // const fetchRepos = await tableland.read(
    //   `SELECT * FROM creators_repo_table_80001_2538`
    // );
    setAllUserRepo(fetchRepos["rows"]);
    setLoading(false);
  };

  const RepoStatus = (status) => {
    console.log(status);
    if (status.status === 0) {
      return <span>Public</span>;
    } else if (status.status === 1) {
      return <span>Public</span>;
    } else {
      return <span>Private</span>;
    }
  };

  useEffect(() => {
    if (!isConnected) {
      connectWallet();
    }
    console.log(address);
    var res_data = {
      walletAddress: address,
    };

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/creator/getTables`,
      headers: {
        "Content-Type": "application/json",
      },
      data: res_data,
    };

    axios(config)
      .then((res) => {
        console.log(res);
        setRepoTable(res.data.repo_table);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (repoTable) {
      getRecords();
    }
  }, [repoTable]);

  // useEffect(() => {
  //     if (allUserRepo.length > 0) {
  //         setLoading(false);
  //         console.log(allUserRepo);
  //     }
  // }, [JSON.stringify(allUserRepo)])

  if (loading) {
    return (
      <div style={{ height: "85vh" }}>
        <LoadingIcon message={"loading..."} />
      </div>
    );
  } else if (allUserRepo.length === 0) {
    return (
      <>
        <div className="w-100% text-center flex items-center content-center h-screen">
          <div className="w-fit m-auto">
            <div className="text-4xl">
              <span className="text-[#134e6f]">Ohh </span>
              <span className="text-[#ff6150]">Snapp!!</span>
            </div>
            <div>
              No Repo Added Please add a repo by clicking{" "}
              <span
                className="cursor-pointer text-[#ff6150]"
                onClick={() => {
                  navigate("/creator/creator_repo");
                }}
              >
                here
              </span>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="parent-content">
          <div className="M-Content min-h-screen px-0.5 py-10">
            <div className="font-primary text-center py-5 bb-2">
              My Repositories
            </div>

            {allUserRepo.map((repo, i) => {
              return (
                <div key={i}>
                  <div className="card uplift my-8 p-2 rounded-md">
                    <div className="flex">
                      <div className="font-secondary font-semibold text-2xl p-1 grow">
                        {repo[2]}
                      </div>
                      <div className="mr-5">
                        <button
                          className="create-assessment-btn p-4 rounded"
                          onClick={() =>
                            navigate(`/creator/repo/${JSON.stringify(repo[0])}`)
                          }
                        >
                          View Repository
                        </button>
                      </div>
                    </div>
                    <div className="flex my-2">
                      {/* <div className="font-primary-sm ml-1 mr-1">
                                                Created on:
                                            </div> */}
                      <div className="font-secondary-sm">
                        Status:
                        <RepoStatus status={repo[4]} />
                      </div>
                    </div>
                    <div className="p-1">{repo[3]}</div>
                    {/* <div className="p-4 text-center">
                                                
                                            </div> */}
                  </div>
                </div>
              );
            })}
            {/* <div className="card uplift my-8 p-2 rounded-md">
                        <div className="font-secondary font-semibold text-2xl p-1">
                            Name of repository
                        </div>
                        <div className="flex my-2">
                            <div className="font-primary-sm ml-1 mr-1">
                                Created on:
                            </div>
                            <div className="font-secondary-sm">
                                Date:time
                            </div>
                        </div>
                        <div className="p-1">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime molestias dolorem impedit fuga libero, doloribus vitae possimus ipsum nostrum iste perferendis? Accusamus maiores, modi atque ipsum ea exercitationem neque quasi!.
                        </div>
                        <div className="p-4 text-center">
                            <button className="create-assessment-btn p-4 rounded">
                                View Reopository
                            </button>
                        </div>
                    </div>


                    <div className="card uplift my-8 p-2 rounded-md">
                        <div className="font-secondary font-semibold text-2xl p-1">
                            Name of repository
                        </div>
                        <div className="flex my-2">
                            <div className="font-primary-sm ml-1 mr-1">
                                Created on:
                            </div>
                            <div className="font-secondary-sm">
                                Date:time
                            </div>
                        </div>
                        <div className="p-1">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime molestias dolorem impedit fuga libero, doloribus vitae possimus ipsum nostrum iste perferendis? Accusamus maiores, modi atque ipsum ea exercitationem neque quasi!.
                        </div>
                        <div className="p-4 text-center">
                            <button className="create-assessment-btn p-4 rounded">
                                View Reopository
                            </button>
                        </div>
                    </div>


                    <div className="card uplift my-8 p-4 rounded-md">
                        <div className="font-secondary font-semibold text-2xl p-1">
                            Name of repository
                        </div>
                        <div className="flex my-2">
                            <div className="font-primary-sm ml-1 mr-1">
                                Created on:
                            </div>
                            <div className="font-secondary-sm">
                                Date:time
                            </div>
                        </div>
                        <div className="p-1">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime molestias dolorem impedit fuga libero, doloribus vitae possimus ipsum nostrum iste perferendis? Accusamus maiores, modi atque ipsum ea exercitationem neque quasi!.
                        </div>
                        <div className="p-4 text-center">
                            <button className="create-assessment-btn p-4 rounded">
                                View Reopository
                            </button>
                        </div>

                    </div> */}
          </div>
        </div>
      </>
    );
  }
}
export default Myrepos;
