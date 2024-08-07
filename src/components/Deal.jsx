import React from "react";
import "../styles/Deal.scss";
import { CgClose } from "react-icons/cg";

const Deal = ({ onClose, image, title, price }) => {
  const themeMode = window.localStorage.getItem("themeMode");
  return (
    <div className="main-deal flex" onClick={onClose}>
      <div
        className="main-wrap flex col"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: `${themeMode == "dark" ? "rgb(30,20,32)" : "white"}`,
        }}
      >
        {/* <div className="top-deal flex">
          <De
          <CgClose className="close-btn" onClick={onClose} />
        </div> */}
        <div className="wrap flex">
          {/* <img src={image} alt="" /> */}
          <div className="right-info flex col">
            <h1>{title}</h1>
            <div className="price flex col">
              <p>ORIGINAL PRICE</p>
              <h2>
                {price}
                <span style={{ fontSize: ".6rem" }}>ETH</span>
              </h2>
            </div>
            <div className="input-wrap flex col">
              <p>YOUR OFFER</p>
              <input type="text" placeholder="Enter Price" className="border" />
            </div>
            <p>
              Your ether, including the marketplace fee, will be escrowed in the
              smart contract until your offer is accepted or you withdraw it.
            </p>
            <button>Submit Deal</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deal;
