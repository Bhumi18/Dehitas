import React from "react";
import "./NewPopup.css";

const NewPopup = (props) => {
  return (
    <div className="wallet-popup-box">
      <div className="wallet-box">
        <span className="wallet-close-icon" onClick={props.handleClose}>
          x
        </span>
        {props.content}
      </div>
    </div>
  );
};

export default NewPopup;
