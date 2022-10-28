import React from "react";
import { useState, useRef } from "react";
import { Web3Storage } from "web3.storage";
import UploadSVG from "../assets/images/uploadsvg.svg";
import cover1 from "../assets/images/cover1.jpg";
import cover2 from "../assets/images/cover2.jpg";
import cover3 from "../assets/images/cover3.jpg";

import "./storefile.css";

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGZiNzE4QzgwYmJlYUQwNTAzYThFMjgzMmI2MDU0RkVmOUU4MzA2NzQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjE0MTEzNjczNTAsIm5hbWUiOiJUcnkifQ.srPPE7JD3gn8xEBCgQQs_8wyo6rDrXaDWC0QM8FtChA";

const client = new Web3Storage({ token: API_TOKEN });

function StoreCoverImg({ setFileCid2 }) {
  const chooseFile2 = useRef("");

  const [file, setFile] = useState("");
  const [btnloading, setbtnLoading] = useState(false);
  const [uploaded, setUploaded] = useState("Upload File");

  async function uploadImage(e) {
    console.log(document.getElementById("input2").files[0]);
    console.log(URL.createObjectURL(e.target.files[0]));
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  async function handleupload() {
    var fileInput = document.getElementById("input2");
    const rootCid = await client.put(fileInput.files, {
      name: "dehitas cover images",
      maxRetries: 3,
    });
    console.log(rootCid);
    const res = await client.get(rootCid);
    const files = await res.files();
    console.log(files);
    const url = URL.createObjectURL(files[0]);
    console.log(url);
    console.log(files[0].cid);

    setFileCid2(files[0].cid);
    setUploaded("Uploaded");
    setbtnLoading(false);
    // setFile(url);
  }

  const handleRandombtn = () => {
    const rand = Math.floor(Math.random() * 3 + 1);
    console.log(typeof fileUrl);
    if (rand === 1) {
      setFile(cover1);
      setFileCid2(
        "bafkreiaf2mseqlpd3tnt2mwlk4gohrja7s6nifo3mdlcbaiiz5ytp7m6fe"
      );
    } else if (rand === 2) {
      setFile(cover2);
      setFileCid2(
        "bafkreifpia2wbcmi5ye324homozugtixm3faxiazozgtjv26i2nqam3ope"
      );
    } else if (rand === 3) {
      setFile(cover3);
      setFileCid2(
        "bafkreiblnrpgtzdlw57bn6pdywvd44dg4blhadkhugfmutnfpygpwe2h6e"
      );
    }
  };
  const resetFile = () => {
    setFile("");
    setUploaded("Upload File");
  };

  return (
    <>
      {file ? (
        <p className="upload-img-instruction">
          Press "Reset" button to reset your uploaded image
        </p>
      ) : null}
      <div className="input_type">
        <div
          className="cover-img-div"
          onClick={() => {
            chooseFile2.current.click();
          }}
        >
          {file ? (
            <>
              <img src={file} className="uploaded-img" alt="uploadsvg" />
            </>
          ) : (
            <img src={UploadSVG} className="uploadSVG" alt="uploadsvg" />
          )}

          <input
            type="file"
            ref={chooseFile2}
            name="fileupload"
            id="input2"
            hidden
            onChange={(e) => uploadImage(e)}
          ></input>
        </div>
        {file ? (
          <button className="upload-file-btn" onClick={() => resetFile()}>
            Reset
          </button>
        ) : null}
        <button
          className="upload-file-btn"
          onClick={() => {
            handleupload();
            setbtnLoading(true);
          }}
        >
          {btnloading ? (
            <svg
              className="animate-spin button-spin-svg-pic"
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
            <>{uploaded}</>
          )}
        </button>
        <button
          className="upload-file-btn"
          onClick={() => {
            handleRandombtn();
          }}
        >
          Random
        </button>
      </div>
    </>
  );
}

export default StoreCoverImg;
