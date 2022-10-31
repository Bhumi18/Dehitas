import { useEffect, useState } from "react";
import "./creator.css";
import DD_repo from "./Dropdowns/DD_repo"
import axios from "axios";
import { useConnect, useDisconnect, useAccount } from "wagmi";
import { insert_creators_repo_table } from "../TableQueries";
import { InjectedConnector } from "@wagmi/core";
import { useNavigate } from "react-router-dom";
import LoadingIcon from "../walletconnect/LoadingIcon";
import Cookies from "universal-cookie";

function CreateRepo() {

  const [data, setData] = useState({
    t_name: "",
    wallet_address: "",
    repo_name: "",
    desc: "",
    privacy: "1",
  });

  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("loading...");

  const [tableName, setTableName] = useState({});
  const cookies = new Cookies();

  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const { disconnect } = useDisconnect();

  const getUsername = async() => {
    const user_id = cookies.get("loginID");
    console.log(user_id);
  }

  useEffect(() => {
    if (!isConnected) {
      connect();
    }
    console.log(address);
    var res_data = JSON.stringify({
      "walletAddress": address
    });

    var config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/creator/getTables`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: res_data
    };

    getUsername();

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setTableName(response.data.repo_table);
        console.log(response.data.repo_table)
        if (response.data.repo_table === null || response.data.repo_table === "" || response.data.repo_table === undefined) {
          setTimeout(() => {
            setLoadingMessage("Please create a repo table before proceeding...");
            setLoading(true);
            navigate("/role/creator");
          }, 5000)
        }
      })
      .catch(function (error) {
        console.log(error);
        setLoadingMessage("Something went wrong...")
      });
  }, [])

  useEffect(() => {
    if (tableName) {
      console.log(tableName);
      setData({ ...data, t_name: tableName });
      setLoading(false);
    }
  }, [tableName])

  const createNewRepo = async () => {
    console.log(data);
    console.log(address);
    setLoadingMessage("Creating repository...");
    setLoading(true);
    if (tableName || address || data.repo_name) {
      const creator_repo_data = await insert_creators_repo_table(
        tableName,
        address,
        data.repo_name,
        data.desc,
        data.privacy
      );

      console.log(creator_repo_data);
      try {
        if(creator_repo_data.message){
          setLoadingMessage("Repo already exists!!");
          setTimeout(()=>{
            setLoading(false);
          },3000);
        }
        if (creator_repo_data.hash) {
          setLoadingMessage("Repo created successfully!!");
          setTimeout(()=>{
            setLoading(false);
          },3000);
        }
      } catch (e) {
        setLoadingMessage("Something went wrong!!");
        setTimeout(()=>{
          setLoading(false);
        },3000);
      }
    }
  }


  return (
    <>

      <div className="parent-content">
        <div className="C_Content  min-h-screen px-0.5 py-10">
          <div className="top">
            <div className="Heading font-primary text-left py-5 ">
              Create new repository here.
            </div>
            <div className="Instruction font-secondary text-left border-b-2 py-4">
              A repository contains Questions which you add.
            </div>
          </div>
          <div className="repo-details py-5 border-b-2">
            <div className="Labels flex">
              {/* <div className="w-44 px-2 py-1 font-secondary font-semibold">
                Owner
                <span className="">*</span>
              </div> */}
              <div className="py-1 font-semibold font-secondary">
                Repository name
              </div>
            </div>
            <div className="repo-name flex items-center	content-center">
              {/* <div className="owner ">
                <DD_repo className="uplift" />
                <span className="p-2">Rahul Rajan</span>
              </div>
              <h1 className="mx-8  text-3xl">/</h1> */}
              <div className="Repo-name">
                <input
                  type="text"
                  name="reponame"
                  placeholder="Short repository name"
                  className="align-middle uplift px-2 py-1.5 rounded-md border border-gray-300"
                  defaultValue={data.repo_name}
                  onChange={(e) => {
                    setData({ ...data, repo_name: e.target.value });
                  }}
                ></input>
              </div>
            </div>
            <div className="instruction font-secondary text-left py-3 ">
              Great repository names are short and memorable.
            </div>
            <div className="Instruction  font-secondary font-semibold text-left ">
              Description(Optional)
            </div>
            <div>
              <input
                type="text"
                className="w-full uplift align-middle px-2 py-1.5 rounded-md border border-gray-300 my-2"
                onChange={(e) => {
                  setData({ ...data, desc: e.target.value });
                }}
              ></input>
            </div>
          </div>
          <div className="privacy my-4 border-b-2 dotted pb-4">
            <div className="Instruction mb-2 font-secondary font-semibold text-left">
              Select privacy option
            </div>
            {/* <div className="flex items-center mb-4">
              <input
                id="default-radio-1"
                type="radio"
                value="0"
                name="privacy-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => {
                  setData({ ...data, privacy: Number(e.target.value) });
                }}
              />
              <label className="ml-2 font-secondary font-semibold text-left">
                Global
              </label>
            </div> */}
            <div className="flex items-center mb-4">
              <input
                id="default-radio-1"
                type="radio"
                value="1"
                defaultChecked
                name="privacy-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => {
                  setData({ ...data, privacy: Number(e.target.value) });
                }}
              />
              <label className="ml-2 font-secondary font-semibold text-left">
                Public
              </label>
            </div>
            <div className="flex items-center ">
              <input
                id="default-radio-1"
                type="radio"
                value="2"
                name="privacy-radio"
                disabled
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => {
                  setData({ ...data, privacy: Number(e.target.value) });
                }}
              />
              <label className="ml-2 font-secondary font-semibold text-left">
                Private
              </label>
            </div>
          </div>
          <div className="Instruction font-secondary text-left  py-4">
            You are creating a private repository press create repository button
            to Create.
          </div>
          <button
            className="create-assessment-btn text-black-700 font-semibold py-2 px-4 border border-black-500  rounded"
            onClick={() =>
              createNewRepo()
            }
          >
            Button
          </button>
        </div>
      </div>
      {
        loading
          ?
          <div className="fixed h-screen top-0 bg-[#eff0ee]/[0.6] w-screen">
            <LoadingIcon message={loadingMessage} />
          </div>
          :
          null
      }
    </>
  );
}
export default CreateRepo;
