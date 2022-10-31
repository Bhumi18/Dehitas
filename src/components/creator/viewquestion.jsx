import { useEffect, useRef, useState } from "react";
// import EditQuestion from '../'
// import Questions from './Data/Question'
import "./viewquestion.css";
import EditQuestion from "./EditQuestion";
import $ from "jquery";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { useNavigate } from "react-router-dom";
import Backlogo from "./Images/back_logo";
import axios from "axios";
import Cookies from "universal-cookie";

import parse from "html-react-parser";
import closebtn from "../creator/Images/closebtn.png";
import Editimg from "./Images/edit.png";
import Delete from "./Images/delete.png";
import { useAccount } from "wagmi";
import { connect } from "@tableland/sdk";

function Viewquestion() {
  const { address, isConnected } = useAccount();
  // console.log(Questions)
  // let navigate = useNavigate();
  const [showEdit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [qCategory, setQCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [deleteAlert, showDeleteAlert] = useState(false);
  const [delId, setDelId] = useState(null);
  const [delCategory, setDelCategory] = useState(null);
  const [table, setTable] = useState();
  const [data, setData] = useState([]);
  const [tag, setTag] = useState([]);
  const [loading, setLoading] = useState(false);

  const cookie = new Cookies();
  // useEffect(() => {
  //   if (!cookie.get("AdminToken")) {
  //     navigate("/");
  //     window.location.reload();
  //   }
  //   getAllQuestions();
  // }, []);

  function Editquestion() {
    // console.log("hello");
    setEdit(true);
  }

  const getAllQuestions = () => {
    axios
      .get(`${process.env.API_URL}/show_questions`, {
        headers: { token: cookie.get("AdminToken") },
      })
      .then((res) => {
        // console.log(res.data.data);
        setQuestions(res.data.data);
      });
  };

  const deleteQuestion = (index, category) => {
    // console.log(index, category);
    const data = {
      id: index,
      category: category,
    };
    axios
      .post(`${process.env.API_URL}/delete_question_by_id`, data, {
        headers: { token: cookie.get("AdminToken") },
      })
      .then((res) => {
        // console.log(res);
        showDeleteAlert(false);
        getAllQuestions();
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  function closeEdit() {
    setEdit(false);
  }
  function Redirect() {
    // navigate("/landing")
  }
  useEffect(() => {
    // console.log(showEdit);
  }, [showEdit]);

  useEffect(() => {
    $(document).ready(function () {
      $("#table_id").DataTable({
        columnDefs: [
          {
            orderable: false,
            className: "select-checkbox",
            targets: 0,
          },
        ],
        select: {
          style: "os",
          selector: "td:first-child",
        },
        order: [[1, "asc"]],
        retrieve: true,
        // lengthMenu: [[25, 35, 50, -1], [25, 35, 50, "All"]]
      });
    });
  }, [questions]);

  const getCreatorTable = async () => {
    var data = JSON.stringify({
      walletAddress: address,
    });
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/creator/getTables`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        const res = response.data;
        let table = res.question_table;
        setTable(table);
        show_questions();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const show_questions = async () => {
    const tableland = await connect({
      network: "testnet",
      chain: "polygon-mumbai",
    });
    const readRes = await tableland.read(`SELECT * FROM ${table}`);
    for (let i = 0; i < readRes["rows"].length; i++) {
      let splittedString = readRes["rows"][i][11].slice(1, -1);
      let tag_array = splittedString.split(",");
      data.push([
        readRes["rows"][i][0],
        readRes["rows"][i][2],
        readRes["rows"][i][10],
        tag_array,
      ]);
      // for (let j = 0; j < tag_array.length; j++) {
      //   if (tag_array[j] !== "") {
      //     tag.push([tag_array[j]]);
      //   }
      // }
    }
    setData(data);
    console.log(data);
    setLoading(true);
    console.log(readRes);
  };

  useEffect(() => {
    getCreatorTable();
  });
  if (loading) {
    return (
      <div className="parent-content">
        <div className="C_Content ">
          <div className="title text-center font-primary font-bold py-8">
            View Question
          </div>
          {data.map((inde) => {
            return (
              <div className="Questions">
                <div className="card-background uplift h-54 p-2 px-8 rounded-md">
                  <div className="flex my-4">
                    <div className="Tittle font-primary">
                      Question {inde[0]}
                    </div>
                    <div className="flex-grow"></div>
                    <button
                      className="Edit-Question px-3 py-1 rounded-md "
                      onClick={() => {
                        Editquestion();
                      }}
                    >
                      Edit Question
                    </button>
                  </div>
                  <div className="font-secondary description">{inde[1]}</div>
                  <div className="flex my-2">
                    <div className="mx-2 p-1 px-3 C_tag rounded-md">
                      {inde[2]}
                    </div>

                    {(() => {
                      if (inde[3][0]) {
                        return (
                          <div>
                            <div className="mx-2 p-1  px-3 C_tag rounded-md">
                              {inde[3][0]}
                            </div>
                          </div>
                        );
                      }
                    })()}
                    {(() => {
                      if (inde[3][1]) {
                        return (
                          <div>
                            <div className="mx-2 p-1  px-3 C_tag rounded-md">
                              {inde[3][1]}
                            </div>
                          </div>
                        );
                      }
                    })()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {showEdit ? (
          <div className="editquestion">
            <EditQuestion />
          </div>
        ) : null}
      </div>
    );
  } else {
    return "loading";
  }
}
export default Viewquestion;
