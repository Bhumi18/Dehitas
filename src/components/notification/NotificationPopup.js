import React from "react";
import "./NotificationPopup.css";

const Popup = (props) => {
  return (
    <div className="popup-boxer">
      <div className="boxer">
        <span className="close-icon-box" onClick={props.handleClose}>
          x
        </span>
        {props.content}
      </div>
    </div>
  );
};

export default Popup;
