import React, { useEffect, useState } from "react";
import { connect } from "@tableland/sdk";
import EditQuestion from "./addToRepo";

function Questionfeed() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showRepoPopup, setShowRepoPopup]  = useState(false);
  const[question,setQuestion] = useState();
  useEffect(()=>{
    console.log(question);
  },[question])
  const showQuestions = async () => {
    const name = "creators_question_table_80001_2586";
    const tableland = await connect({
      network: "testnet",
      chain: "polygon-mumbai",
    });
    const readRes = await tableland.read(`SELECT * FROM ${name}`);
    console.log(readRes);
    for (let i = 0; i < readRes["rows"].length; i++) {
      data.push([
        readRes["rows"][i][0],
        readRes["rows"][i][10],
        readRes["rows"][i][2],
        readRes["rows"][i][3],
        readRes["rows"][i][4],
        readRes["rows"][i][5],
        readRes["rows"][i][6],
        readRes["rows"][i][7],
      ]);
    }
    setData(data);
    
    setLoading(true);
  };
  useEffect(() => {
    showQuestions();
    console.log(data);
  }, []);


  return (
    <>
      
      {showRepoPopup ? (
          <div className="editquestion">
            <EditQuestion setShowRepoPopup={setShowRepoPopup} description={question}  />
          </div>
        ) : 
        // creator-filter-top
        <div className="parent-content flex">
                <div className="candidate-jobfeed-main-left  creator-filter-top float-left">
            <div className="cancel-filter-apply overflow-auto">
                {/* <button type="button" class="candidate-cancel-btn">
                Cancel
                </button> */}
                <span>Filter by</span>
                <button
                type="button"
                class="text-white   font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  candidate-apply-btn"
                >
                Apply
                </button>
            </div>
            <div className="expriencelevel-candidate">
                <h3 class=" font-semibold font-color-orange font-['Montserrat'] ex-level-candidates">
                Exprience Level:
                </h3>
                <div class="flex items-center pl-3 font-['Open_Sans']">
                <input
                    id="vue-checkbox"
                    type="checkbox"
                    value=""
                    class="  w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                    for="vue-checkbox"
                    class="py-3 ml-2 w-full text-lg font-medium  font-['Open_Sans']"
                >
                    Entry Level
                </label>
                </div>
                <div class="flex items-center pl-3">
                <input
                    id="vue-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 "
                />
                <label
                    for="vue-checkbox"
                    class="py-3 ml-2 w-full text-lg font-medium  font-['Open_Sans']"
                >
                    Associate Level
                </label>
                </div>
                <div class="flex items-center pl-3">
                <input
                    id="vue-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                    for="vue-checkbox"
                    class="py-3 ml-2 w-full text-lg font-medium  font-['Open_Sans']"
                >
                    Expert Level
                </label>
                </div>
            </div>
            <div className="jobtype-candidate">
                <h3 class=" font-semibold  font-['Montserrat'] font-color-orange ex-level-candidates">
                Job Type:
                </h3>
                <div class="flex items-center pl-3">
                <input
                    id="vue-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                    for="vue-checkbox"
                    class="py-3 ml-2 w-full text-lg font-medium  font-['Open_Sans']"
                >
                    On-Site
                </label>
                </div>
                <div class="flex items-center pl-3">
                <input
                    id="vue-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                    for="vue-checkbox"
                    class="py-3 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300 font-['Open_Sans']"
                >
                    Hybrid
                </label>
                </div>
                <div class="flex items-center pl-3">
                <input
                    id="vue-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                    for="vue-checkbox"
                    class="py-3 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300 font-['Open_Sans']"
                >
                    Remote
                </label>
                </div>
            </div>
            <div className="technology-candidate">
                <h3 class=" font-semibold text-gray-900 font-color-orange font-['Montserrat'] ex-level-candidates">
                Technology:
                </h3>

                <div class="flex items-center pl-3">
                <input
                    id="vue-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                    for="vue-checkbox"
                    class="py-3 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300 font-['Open_Sans']"
                >
                    Vue JS
                </label>
                </div>

                <div class="flex items-center pl-3">
                <input
                    id="vue-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                    for="vue-checkbox"
                    class="py-3 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300 font-['Open_Sans']"
                >
                    Blockchain
                </label>
                </div>

                <div class="flex items-center pl-3">
                <input
                    id="vue-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                    for="vue-checkbox"
                    class="py-3 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300 font-['Open_Sans']"
                >
                    Wordpress
                </label>
                </div>

                <div class="flex items-center pl-3">
                <input
                    id="react-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                    for="react-checkbox"
                    class="py-3 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300 font-['Open_Sans']"
                >
                    React
                </label>
                </div>

                <div class="flex items-center pl-3">
                <input
                    id="angular-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                    for="angular-checkbox"
                    class="py-3 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300 font-['Open_Sans']"
                >
                    Angular
                </label>
                </div>

                <div class="flex items-center pl-3">
                <input
                    id="laravel-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                    for="laravel-checkbox"
                    class="py-3 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300 font-['Open_Sans']"
                >
                    Laravel
                </label>
                </div>
            </div>
            <div className="expriencelevel-candidate">
                <h3 class=" font-semibold text-gray-900 font-color-orange font-['Montserrat'] ex-level-candidates">
                Location:
                </h3>
                <div class="flex items-center pl-3">
                <input
                    id="angular-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                    for="angular-checkbox"
                    class="py-3 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300 font-['Open_Sans']"
                >
                    Brazil
                </label>
                </div>
                <div class="flex items-center pl-3">
                <input
                    id="angular-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                    for="angular-checkbox"
                    class="py-3 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300 font-['Open_Sans']"
                >
                    India
                </label>
                </div>
                <div class="flex items-center pl-3">
                <input
                    id="angular-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                    for="angular-checkbox"
                    class="py-3 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300 font-['Open_Sans']"
                >
                    China
                </label>
                </div>
                <div class="flex items-center pl-3">
                <input
                    id="angular-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                    for="angular-checkbox"
                    class="py-3 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300 font-['Open_Sans']"
                >
                    France
                </label>
                </div>
                <div class="flex items-center pl-3">
                <input
                    id="angular-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                    for="angular-checkbox"
                    class="py-3 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300 font-['Open_Sans']"
                >
                    Canada
                </label>
                </div>
                <div class="flex items-center pl-3">
                <input
                    id="angular-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                    for="angular-checkbox"
                    class="py-3 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300 font-['Open_Sans']"
                >
                    Australlia
                </label>
                </div>
                <div class="flex items-center pl-3">
                <input
                    id="angular-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-500 dark:border-gray-500"
                />
                <label
                    for="angular-checkbox"
                    class="py-3 ml-2 w-full text-lg font-medium text-gray-900 dark:text-gray-300 font-['Open_Sans']"
                >
                    Japan
                </label>
                </div>
            </div>
                </div>
                <div className="C_C_Content">
                <div className="flex mt-10">
                    <div className="font-primary-sm py-2 pr-3 Question_Feed_custome">
                    Question Feed
                    </div>
                    <div className="font-primary-sm py-2 pl-3 ">
                    Saved Question
                    </div>
                </div>
                {data.map((inde) => {
                    return (
                    <div className="Questions my-10">
                        <div className="card-background uplift h-auto p-2 px-8 rounded-md">
                        <div className="flex">
                            <div className="Tittle font-primary w-40"><span className="hashtag">#</span> {inde[0]}</div>
                            <div className="flex-grow"> </div>
                            <div className="text-center ">
                                <button className="Edit-Question p-3 rounded-md " onClick={()=>{
                                    setQuestion(inde);
                                    setShowRepoPopup(true);}}>
                                    Add to repository.
                                </button>
                            </div>
                        </div>
                            <div className="flex">
                                <div className="font-primary-sm mr-2 font-bold">Question Type:</div>
                                <div className="font-secondary-sm ">{inde[1]}</div>
                            </div>
                            <div className="font-secondary overflow-x-auto py-4 w-full question-newline ">
                                {inde[2]}
                            </div>
                            <div className="feed_option1 flex">
                                <span className="font-family-secondary pr-4">a. </span>
                                    {inde[3]}
                            </div>
                            <div className="feed_option1">
                                <span className="font-family-secondary pr-4">b. </span>
                                    {inde[4]}
                            </div>
                            <div className="feed_option1">
                                <span className="font-family-secondary pr-4">c. </span>
                                    {inde[5]}
                            </div>
                            <div className="feed_option1">
                                <span className="font-family-secondary pr-4">d. </span>
                                    {inde[6]}
                            </div>   
                            
                        </div>
                    </div>
                    );
                })}
                </div>
      </div>
        
        
        }
    </>
  );
}
export default Questionfeed;
