import React from "react";
import "./Successpopup.css";

const Successpopup = (props) => {
  return (
    <div className="popup-box-successpopup">
      <div className="box-successpopup">
        <span className="close-icon-successpopup" onClick={props.handleClose}>
          x
        </span>
        {props.content}
      </div>
    </div>
  );
};

export default Successpopup;
