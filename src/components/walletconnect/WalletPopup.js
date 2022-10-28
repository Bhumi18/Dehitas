import React from "react";
import "./WalletPopup.css";

const WalletPopup = (props) => {
  return (
    <div className="wallet-popup-box">
      <div className="wallet-box">
        <div className="wallet-outer">
          <div className="wallet-header">{props.title}</div>
          <span className="wallet-close-icon-x" onClick={props.handleClose}>
            x
          </span>
        </div>
        {props.content}
      </div>
    </div>
  );
};

export default WalletPopup;
