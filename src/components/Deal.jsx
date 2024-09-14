import React, { useState } from "react";
import "../styles/Deal.scss";
import { baseDealUrl, ethToUsd } from "../utils/constant";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Deal = ({ onClose, title, price, artOwnerId, artId }) => {
  const [value, setValue] = useState(0);
  const themeMode = window.localStorage.getItem("themeMode");
  const userId = JSON.parse(window.localStorage.getItem("userId"));

  const offeringArt = async () => {
    const res = await axios.post(`${baseDealUrl}/create`, {
      mainUser: artOwnerId,
      price: value,
      artId: artId,
      offering_user: userId?._id,
    });
    toast.success(res.data.message);
    onClose();
  };

  return (
    <div className="main-deal flex" onClick={onClose}>
      <div
        className="main-wrap flex col"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: themeMode === "dark" ? "#212121" : "white",
        }}
      >
        <div className="wrap flex">
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
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter Price"
                className="border"
              />
            </div>
            <p
              className="flex"
              style={{
                width: "calc(100% - 20px)",
                height: "30px",
                alignItems: "center",
                justifyContent: "space-between",
                paddingLeft: "10px",
                paddingRight: "10px",
                textTransform: "uppercase",
                fontWeight: "600",
                background: "#333",
                borderRadius: "5px",
                color: "white",
                fontSize: ".6rem",
              }}
            >
              Total Due &nbsp;
              <span>
                {value * 1.03} ~ ${Math.round(value * 1.03 * ethToUsd)}
              </span>
            </p>
            <div className="wrap flex col">
              <p style={{ marginTop: "50px", lineHeight: "15px" }}>
                By clicking on{" "}
                <span
                  style={{
                    padding: "3px 10px",
                    background: "#EDEADE",
                    color: "black",
                    border: "none",

                    textTransform: "uppercase",
                    fontWeight: "600",
                    fontSize: ".5rem",
                    borderRadius: "5px",
                  }}
                >
                  submit deal
                </span>{" "}
                button you agree to our <Link>Privacy Policy</Link> &{" "}
                <Link>Terms of Service</Link>
              </p>
            </div>
            <button
              style={{
                background: "#EDEADE",
                color: "black",
                border: "none",
              }}
              onClick={() =>
                userId
                  ? offeringArt()
                  : toast.error("Please Login To Make A Deal!")
              }
            >
              Submit Deal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deal;
