import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './creator.css';
import { useEffect, useRef, useState } from 'react'
import $ from 'jquery'
import 'jquery/dist/jquery.min.js'
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import DD_repo from './Dropdowns/DD_repo';
import { useNavigate } from "react-router-dom";
import closebtn from "../creator/Images/closebtn.png";
import Editimg from '../creator/Images/edit.png';
import Delete from './Images/delete.png';
import Backlogo from "./Images/back_logo";
import parse from "html-react-parser";
function Editrepo() {
  let navigate = useNavigate();
  const [Edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [qCategory, setQCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [deleteAlert, showDeleteAlert] = useState(false);
  const [delId, setDelId] = useState(null);
  const [delCategory, setDelCategory] = useState(null);
  
  // useEffect(() => {
  //   if (!cookie.get("AdminToken")) {
  //     navigate("/");
  //     window.location.reload();
  //   }
  //   getAllQuestions();
  // }, []);

  function Editquestion(index, category) {
    setId(index);
    setQCategory(category);
    setEdit(true);
  }

  

  

  function closeEdit() {
    setEdit(false);
  }
  function Redirect() {
    navigate("/landing")
  }
  useEffect(() => {
    console.log(Edit)
  }, [Edit])

  useEffect(() => {
    $(document).ready(function () {
      $('#table_id').DataTable({
        columnDefs: [{
          orderable: false,
          className: 'select-checkbox',
          targets: 0,
        }],
        select: {
          style: 'os',
          selector: 'td:first-child',
        },
        order: [[1, 'asc']],
        retrieve: true,
        // lengthMenu: [[25, 35, 50, -1], [25, 35, 50, "All"]]
      })
    })
  }, [questions])
  return (
    <>
      <div className="parent-content">
        <div className="C_Content  min-h-screen px-0.5 py-10">
          <div className="top">
            <div className="Heading font-primary text-left py-5 ">
              Edit repository here.
            </div>
            <div className="Instruction font-secondary text-left border-b-2 py-4">
              A repository contains Questions which you add.
            </div>
          </div>
          <div className="repo-details py-5 border-b-2">
            <div className="Labels flex">
              <div className="w-44 px-2 py-1 font-secondary font-semibold">
                Owner
                <span className="">*</span>
              </div>
              <div className="px-4 py-1 font-semibold font-secondary">
                Repository name
              </div>
            </div>
            <div className="repo-name flex">
              <div className="owner">
                    Daniel recardo
              </div>
              <h1 className="mx-4  text-3xl">/</h1>
              <div className="Repo-name">
                    Formula 1
              </div>
            </div>
            <div className="instruction font-secondary text-left py-3 ">
              Great repository names are short and memorable.
            </div>
            <div className="Instruction  font-secondary font-semibold text-left " >
              Description(Optional)
            </div>
            <div>
              <input
                type="text"
                value="Default value"
                className="w-full align-middle px-2 py-1.5 rounded-md border border-gray-300 my-2"
              ></input>
            </div>
          </div>
          <div className="privacy my-4 border-b-2 dotted pb-4">
            <div className="Instruction font-secondary font-semibold text-left">
              Select privacy option
            </div>
            <div className="flex items-center mb-4">
              <input
                id="default-radio-1"
                type="radio"
                value="Global"
                name="privacy-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                
                className="ml-2 font-secondary font-semibold text-left"
              >
                Global
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="default-radio-1"
                type="radio"
                value="Local"
                name="privacy-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                
                className="ml-2 font-secondary font-semibold text-left"
              >
                Local
              </label>
            </div>
            <div className="flex items-center ">
              <input
                defaultChecked
                id="default-radio-1"
                type="radio"
                value="Private"
                name="privacy-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                
                className="ml-2 font-secondary font-semibold text-left"
              >
                Private
              </label>
            </div>
          </div>
          <div className="Instruction font-secondary text-left  py-4">
            You are editing a private repository press make changes button
            to edit.
          </div>
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Make changes
          </button>
        </div>
        <div className='C_Content pb-10'>
        <div className='title text-center font-primary font-bold my-8'>
              Question in this repository
          </div>
          <div className='Questions my-10'>
              <div className='card-background uplift h-52 p-2 px-8 rounded-md'>
                <div className='Tittle font-primary'>
                    Question 1
                </div>
                <div className='font-secondary overflow-x-auto description'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis, ducimus. Nesciunt ullam laudantium odio neque, maxime quaerat vero a voluptatibus ratione quidem quo dignissimos dolor libero vitae iusto odit facilis.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis, ducimus. Nesciunt ullam laudantium odio neque, maxime quaerat vero a voluptatibus ratione quidem quo dignissimos dolor libero vitae iusto odit facilis.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis, ducimus. Nesciunt ullam laudantium odio neque, maxime quaerat vero a voluptatibus ratione quidem quo dignissimos dolor libero vitae iusto odit facilis.
                </div>

                <div className='text-center w-full'>
                  <button className='Edit-Question p-3 rounded-md ' onClick={() => { Editquestion() }} >
                      Edit Question
                  </button>
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}
export default Editrepo
