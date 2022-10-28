import React from "react";
import "./candidatepopup.css";
import Back from "../../assets/images/back.png";

const Popup = (props) => {
  return (
    <>
      <div className="popup-box">
        <div className="box uplift" id="box">
          <span className="close-icon" onClick={props.handleClose}>
            {/* <img
              src={Back}
              className="candidate-form-back-img"
              alt="upload_img"
            /> */}
          </span>
          {props.content}
        </div>
      </div>
    </>
  );
};

export default Popup;
