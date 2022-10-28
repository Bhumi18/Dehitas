// import Questions from "../Admin/Data/Question"
import React from "react";
import closebtn from "./Images/closebtn.png";
import { Editor } from "@tinymce/tinymce-react";
// import { Editor } from "react-draft-wysiwyg";
// import { EditorState, convertToRaw, convertFromHTML, convertFromRaw, ContentState } from "draft-js";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

import Cookies from "universal-cookie";
// import { useNavigate } from "react-router-dom";

function EditQuestion({ id, category, setShowRepoPopup, getAllQuestions, description }) {





    
  // console.log(id);
  // console.log(typeof(id))
  const [apiQuestionId, setApiQuestionId] = useState(null);
  // const [editorState11, setEditorState11] = useState(EditorState.createEmpty());
  const [setNumber, setSetNumber] = useState(null);
  const [apiCategory, setApiCategory] = useState(null);
  const [apiSet, setApiSet] = useState(null);
  const [apiQuestion, setApiQuestion] = useState(null);
  const [correct2, setCorrect2] = useState(-1);
  const [apiOption1, setApiOption1] = useState(null);
  const [apiOption2, setApiOption2] = useState(null);
  const [apiOption3, setApiOption3] = useState(null);
  const [apiOption4, setApiOption4] = useState(null);

  const cookies = new Cookies();
  //   const navigate = new useNavigate();
  const editorRef_setQ1 = useRef(null);
  const editorRef_setQ2 = useRef(null);
  const editorRef_setQ3 = useRef(null);
  const editorRef_setQ4 = useRef(null);
  const editorRef_setQ5 = useRef(null);
  const editorRef_setQ6 = useRef(null);
  //  const onEditorStateChange12 = (editorState11) => {
  //     setEditorState11(editorState11)
  //     };

  // const storeData = (single) => {
  //     console.log(single.set1.props.children);
  //     setQuestion(String(single.set1.props.children));
  //     console.log(Question);
  // }

  // useEffect(()=>{
  //     console.log(Question)
  //     const simple = ContentState.createFromText(Question.replace(/<[^>]+>/g, ''))
  //     console.log(simple)
  //     setEditorState11(EditorState.createWithContent(simple))
  // },[Question])

  // const tag = Question;

  // console.log(tag)
  // const Content = ContentState.createFromText(tag.replace(/<[^>]+>/g, ''));
  // console.log(Content)
  // const [editorState11, setEditorState11] = useState(EditorState.createWithContent(Content));
  // useEffect(()=>{
  //     const data = Questions.filter((ele)=>{
  //         if(ele.id === id){
  //             // console.log(ele)
  //             return ele
  //         }
  //     });

  //     console.log(data[0])

  //     if(data[0]){
  //         storeData(data[0])
  //     }
  //     // console.log(data)
  // },[]);

  //   const getSingleQuestion = (id, category) => {
  //     // console.log(id, category);
  //     const data = {
  //       id: id,
  //       category: category
  //     }
  //     axios.post(`${env.API_URI}/show_questions_by_id`, data, { headers: { token: cookies.get("AdminToken") } })
  //       .then((res) => {
  //         // console.log(res.data.data);
  //         const { _id, category, correct, options, question, set, set_no } = res.data.data;
  //         // console.log(_id, category, correct, options, question, set, set_no);
  //         setApiQuestionId(_id);
  //         setApiCategory(category);
  //         setSetNumber(set_no);
  //         // console.log(editorRef_setQ1);
  //         setApiSet(set);
  //         // console.log(set_no, set);
  //         setApiQuestion(question);
  //         setApiOption1(options[0]);
  //         setApiOption2(options[1]);
  //         setApiOption3(options[2]);
  //         setApiOption4(options[3]);

  //         if (options[0] === correct) {
  //           setCorrect2(0)
  //         }
  //         if (options[1] === correct) {
  //           setCorrect2(1)
  //         }
  //         if (options[2] === correct) {
  //           setCorrect2(2)
  //         }
  //         if (options[3] === correct) {
  //           setCorrect2(3)
  //         }
  //         // console.log(correct2);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       })
  //   };

  //   useEffect(() => {
  //     if (!cookies.get("AdminToken")) {
  //     //   navigate("/");
  //     //   window.location.reload();
  //     }
  //     getSingleQuestion(id, category);
  //   }, []);

    const updateData = () => {
      var setNo = null;
      var setData = null;
      if (setNumber) {
        setNo = setNumber;
      }
      if (apiSet) {
        setData = editorRef_setQ1.current.getContent();
      }
      const questionData = editorRef_setQ2.current.getContent();
      const option1 = editorRef_setQ3.current.getContent();
      const option2 = editorRef_setQ4.current.getContent();
      const option3 = editorRef_setQ5.current.getContent();
      const option4 = editorRef_setQ6.current.getContent();

      // console.log(questionData, option1, option2, option3, option4, apiQuestionId, apiCategory, correct2);

      const options = [
        option1,
        option2,
        option3,
        option4
      ]

      const data = {
        id: apiQuestionId,
        set: setData,
        category: apiCategory,
        set_no: setNo,
        question: questionData,
        options: options,
        correct: options[correct2]
      }

      console.log(data);
      // axios.post(`${env.API_URI}/update_question_by_id`, data, { headers: { token: cookies.get("AdminToken") } })
      //   .then((res) => {
      //     console.log(res);
      //     addsetShowRepoPopupToRepo();
      //     getAllQuestions();
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   })
    };
    const [question,setQuestion] = useState("");


    useEffect(()=>{
        console.log(description);
        const paraData = description;
        console.log(paraData)
        var dom = document.createElement("p");
        dom.innerHTML =description[2];
        setQuestion(dom);
        console.log(dom);
        
    },[])
    useEffect(()=>{
            console.log(question);
    },[question])
  return (
    <>
      <div className="edit_Question ">
        <div className="edit_question_header ">
          <div className="alert-header-left w-16"> </div>
          <div className="flex-grow text-center text-white p-4 font-primary ">Edit Question here</div>
          <div className="float-right">
            <img
              src={closebtn}
              className="edit_question_close_button"
              onClick={() => {
                setShowRepoPopup(false);
              }}
            />
          </div>
        </div>
        <div className="Instruction alert text-center text-white font-secondary">Enter set number below.</div>
        {setNumber ? (
          <div className="alert-input">
            <input
              type="number"
              className="setnumber "
              value={setNumber}
              onChange={(e) => {
                setSetNumber(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === ".") {
                  e.preventDefault();
                }
              }}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]*/g, "");
              }}
            ></input>
          </div>
        ) : null}
        {question ? (
          <div className="text_editor1">
            <input
              id="my-file"
              type="file"
              name="my-file"
              style={{ display: "none" }}
              onChange={() => {}}
            />
            <Editor
              apiKey=""
              onInit={(evt, editor) => (editorRef_setQ1.current = editor)}
              initialValue={question}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | image",
                image_title: true,
                automatic_uploads: true,
                file_picker_types: "image",
                file_picker_callback: function (callback, value, meta) {
                  if (meta.filetype == "image") {
                    var input = document.getElementById("my-file");
                    input.click();
                    input.onchange = function () {
                      var file = input.files[0];
                      var reader = new FileReader();
                      reader.onload = function (e) {
                        console.log("name", e.target.result);
                        callback(e.target.result, {
                          alt: file.name,
                        });
                      };
                      reader.readAsDataURL(file);
                    };
                  }
                },
                paste_data_images: true,

                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              // tinymce.init({
              //     selector: 'textarea',  // change this value according to your HTML
              //     plugins: 'image',
              //     toolbar: 'image',
              //     image_list: [
              //       { title: 'My image 1', value: 'https://www.example.com/my1.gif' },
              //       { title: 'My image 2', value: 'http://www.moxiecode.com/my2.gif' }
              //     ]
              //   });
            />
            {/* <Editor
                    editorState={editorState11}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={onEditorStateChange12}
                />    */}
          </div>
        ) : null}

        <div className="text_editor1">
          <input
            id="my-file"
            type="file"
            name="my-file"
            style={{ display: "none" }}
            onChange={() => {}}
          />

          <Editor
            apiKey=""
            onInit={(evt, editor) => (editorRef_setQ2.current = editor)}
            initialValue={apiQuestion}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | image",
              image_title: true,
              automatic_uploads: true,
              file_picker_types: "image",
              file_picker_callback: function (callback, value, meta) {
                if (meta.filetype == "image") {
                  var input = document.getElementById("my-file");
                  input.click();
                  input.onchange = function () {
                    var file = input.files[0];
                    var reader = new FileReader();
                    reader.onload = function (e) {
                      console.log("name", e.target.result);
                      callback(e.target.result, {
                        alt: file.name,
                      });
                    };
                    reader.readAsDataURL(file);
                  };
                }
              },
              paste_data_images: true,

              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            // tinymce.init({
            //     selector: 'textarea',  // change this value according to your HTML
            //     plugins: 'image',
            //     toolbar: 'image',
            //     image_list: [
            //       { title: 'My image 1', value: 'https://www.example.com/my1.gif' },
            //       { title: 'My image 2', value: 'http://www.moxiecode.com/my2.gif' }
            //     ]
            //   });
          />
          {/* <Editor
                    editorState={editorState11}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={onEditorStateChange12}
                />    */}
        </div>
        <div className="option-selection">
          <div className="text_editor1">
            <input
              id="my-file"
              type="file"
              name="my-file"
              style={{ display: "none" }}
              onChange={() => {}}
            />

            <Editor
              apiKey=""
              onInit={(evt, editor) => (editorRef_setQ3.current = editor)}
              initialValue={apiOption1}
              init={{
                height: 300,
                menubar: true,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | image",
                image_title: true,
                automatic_uploads: true,
                file_picker_types: "image",
                file_picker_callback: function (callback, value, meta) {
                  if (meta.filetype == "image") {
                    var input = document.getElementById("my-file");
                    input.click();
                    input.onchange = function () {
                      var file = input.files[0];
                      var reader = new FileReader();
                      reader.onload = function (e) {
                        console.log("name", e.target.result);
                        callback(e.target.result, {
                          alt: file.name,
                        });
                      };
                      reader.readAsDataURL(file);
                    };
                  }
                },
                paste_data_images: true,

                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              // tinymce.init({
              //     selector: 'textarea',  // change this value according to your HTML
              //     plugins: 'image',
              //     toolbar: 'image',
              //     image_list: [
              //       { title: 'My image 1', value: 'https://www.example.com/my1.gif' },
              //       { title: 'My image 2', value: 'http://www.moxiecode.com/my2.gif' }
              //     ]
              //   });
            />
            {/* <Editor
                          editorState={editorState11}
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClassName"
                          onEditorStateChange={onEditorStateChange12}
                      />    */}
          </div>

          <div className="option1">
            <input
              type="radio"
              id="option1"
              name="options"
              value={0}
              checked={correct2 == 0 ? true : false}
              onChange={(e) => {
                setCorrect2(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="option-selection">
          <div className="text_editor1">
            <input
              id="my-file"
              type="file"
              name="my-file"
              style={{ display: "none" }}
              onChange={() => {}}
            />

            <Editor
              apiKey=""
              onInit={(evt, editor) => (editorRef_setQ4.current = editor)}
              initialValue={apiOption2}
              init={{
                height: 300,
                menubar: true,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | image",
                image_title: true,
                automatic_uploads: true,
                file_picker_types: "image",
                file_picker_callback: function (callback, value, meta) {
                  if (meta.filetype == "image") {
                    var input = document.getElementById("my-file");
                    input.click();
                    input.onchange = function () {
                      var file = input.files[0];
                      var reader = new FileReader();
                      reader.onload = function (e) {
                        console.log("name", e.target.result);
                        callback(e.target.result, {
                          alt: file.name,
                        });
                      };
                      reader.readAsDataURL(file);
                    };
                  }
                },
                paste_data_images: true,

                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              // tinymce.init({
              //     selector: 'textarea',  // change this value according to your HTML
              //     plugins: 'image',
              //     toolbar: 'image',
              //     image_list: [
              //       { title: 'My image 1', value: 'https://www.example.com/my1.gif' },
              //       { title: 'My image 2', value: 'http://www.moxiecode.com/my2.gif' }
              //     ]
              //   });
            />
            {/* <Editor
                            editorState={editorState11}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={onEditorStateChange12}
                        />    */}
          </div>
          <div className="option1">
            <input
              type="radio"
              id="option1"
              name="options"
              value={1}
              checked={correct2 == 1 ? true : "no"}
              onChange={(e) => {
                setCorrect2(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="option-selection">
          <div className="text_editor1">
            <input
              id="my-file"
              type="file"
              name="my-file"
              style={{ display: "none" }}
              onChange={() => {}}
            />

            <Editor
              apiKey=""
              onInit={(evt, editor) => (editorRef_setQ5.current = editor)}
              initialValue={apiOption3}
              init={{
                height: 300,
                menubar: true,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | image",
                image_title: true,
                automatic_uploads: true,
                file_picker_types: "image",
                file_picker_callback: function (callback, value, meta) {
                  if (meta.filetype == "image") {
                    var input = document.getElementById("my-file");
                    input.click();
                    input.onchange = function () {
                      var file = input.files[0];
                      var reader = new FileReader();
                      reader.onload = function (e) {
                        console.log("name", e.target.result);
                        callback(e.target.result, {
                          alt: file.name,
                        });
                      };
                      reader.readAsDataURL(file);
                    };
                  }
                },
                paste_data_images: true,

                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              // tinymce.init({
              //     selector: 'textarea',  // change this value according to your HTML
              //     plugins: 'image',
              //     toolbar: 'image',
              //     image_list: [
              //       { title: 'My image 1', value: 'https://www.example.com/my1.gif' },
              //       { title: 'My image 2', value: 'http://www.moxiecode.com/my2.gif' }
              //     ]
              //   });
            />
            {/* <Editor
                        editorState={editorState11}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={onEditorStateChange12}
                    />    */}
          </div>
          <div className="option1">
            <input
              type="radio"
              id="option1"
              name="options"
              value={2}
              checked={correct2 == 2 ? true : false}
              onChange={(e) => {
                setCorrect2(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="option-selection">
          <div className="text_editor1">
            <input
              id="my-file"
              type="file"
              name="my-file"
              style={{ display: "none" }}
              onChange={() => {}}
            />

            <Editor
              apiKey=""
              onInit={(evt, editor) => (editorRef_setQ6.current = editor)}
              initialValue={apiOption4}
              init={{
                height: 300,
                menubar: true,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | image",
                image_title: true,
                automatic_uploads: true,
                file_picker_types: "image",
                file_picker_callback: function (callback, value, meta) {
                  if (meta.filetype == "image") {
                    var input = document.getElementById("my-file");
                    input.click();
                    input.onchange = function () {
                      var file = input.files[0];
                      var reader = new FileReader();
                      reader.onload = function (e) {
                        console.log("name", e.target.result);
                        callback(e.target.result, {
                          alt: file.name,
                        });
                      };
                      reader.readAsDataURL(file);
                    };
                  }
                },
                paste_data_images: true,

                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              // tinymce.init({
              //     selector: 'textarea',  // change this value according to your HTML
              //     plugins: 'image',
              //     toolbar: 'image',
              //     image_list: [
              //       { title: 'My image 1', value: 'https://www.example.com/my1.gif' },
              //       { title: 'My image 2', value: 'http://www.moxiecode.com/my2.gif' }
              //     ]
              //   });
            />
            {/* <Editor
                        editorState={editorState11}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={onEditorStateChange12}
                    />    */}
          </div>
          <div className="option1">
            <input
              type="radio"
              id="option1"
              name="options"
              value={3}
              checked={correct2 == 3 ? true : false}
              onChange={(e) => {
                setCorrect2(e.target.value);
              }}
            />
          </div>
          
        </div>
        <div className="select-repo">
        <select name="Select-repo" id="repos" className="p-2 rounded-md ml-12">
            <option value="Repo1" selected disabled>Select Repository</option>
            <option value="Repo1">Repository1</option>
            <option value="Repo3">Repository2</option>
            <option value="Repo4">Repository3</option>
        </select>
        </div>

        <div className="EditQuestion_footer">
          <div className="alert-header-left flex-grow"></div>
          <div
            onClick={(e) => {
                setShowRepoPopup();
            }}
            style={{ cursor: "pointer" }}
            className="EditQuestion_footer_cancel"
          >
            Cancel
          </div>
          <div
            className="EditQuestion_footer_update"
            style={{ cursor: "pointer" }}
          >
            Add
          </div>
        </div>
      </div>
    </>
  );
}
export default EditQuestion;
