import React from "react";
import "../styles/Deal.scss";
import { ethToUsd, sendTransactions } from "../utils/constant";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Buy = ({ onClose, title, price, receiverAddress }) => {
  const balance = window.sessionStorage.getItem("balance") || "0";
  const currentAddress = window.sessionStorage.getItem("token");
  const themeMode = window.localStorage.getItem("themeMode");
  const userLoggedInId = window.localStorage.getItem("userId");

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
          <div className="right-info flex col" style={{ gap: "10px" }}>
            <h1>{title}</h1>
            <div className="price flex col">
              <p>LISTING PRICE</p>
              <h2>
                {price}
                <span style={{ fontSize: ".6rem" }}>ETH</span>
              </h2>
            </div>
            <div className="flex col" style={{ width: "100%" }}>
              <p
                className="balance flex"
                style={{
                  width: "100%",
                  justifyContent: "space-between",
                  fontWeight: "600",
                }}
              >
                YOUR BALANCE <span>{balance}</span>
              </p>
              {parseFloat(balance) < parseFloat(price) && (
                <p
                  style={{
                    width: "100%",
                    color: "red",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    textAlign: "end",
                    fontSize: ".5rem",
                  }}
                >
                  You have insufficient funds to buy this
                </p>
              )}
            </div>
            <p
              className="balance flex"
              style={{
                width: "calc(100% - 20px)",
                justifyContent: "space-between",
                fontWeight: "600",
                padding: "10px 10px",
                background: "#333",
                color: "white",
                borderRadius: "5px",
                fontSize: ".6rem",
              }}
            >
              TOTAL DUE{" "}
              <span>
                {(price * 1.03).toFixed(2)} ~ $
                {Math.round(price * 1.03 * ethToUsd)}
              </span>
            </p>
            <div className="wrap flex col">
              <p style={{ marginTop: "50px", lineHeight: "15px" }}>
                By clicking on{" "}
                <span
                  style={{
                    padding: "3px 10px",
                    textTransform: "uppercase",
                    fontWeight: "600",
                    fontSize: ".5rem",
                    borderRadius: "5px",
                    background: "#EDEADE",
                    color: "black",
                    border: "none",
                  }}
                >
                  buy
                </span>{" "}
                button you agree to our{" "}
                <Link to="/privacy-policy">Privacy Policy</Link> &{" "}
                <Link to="/terms-of-service">Terms of Service</Link>
              </p>
            </div>
            <button
              style={{
                background: "#EDEADE",
                color: "black",
                border: "none",
              }}
              onClick={() =>
                userLoggedInId !== null
                  ? sendTransactions({
                      senderAccount: currentAddress,
                      receiverAccount: receiverAddress,
                      amount: price,
                    })
                  : toast.error("Please Login To Buy!")
              }
            >
              buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buy;
