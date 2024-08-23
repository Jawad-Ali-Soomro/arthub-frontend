// Importing Links
import React from "react";
import "../styles/Deal.scss";
import { ethToUsd } from "../utils/constant";
import { Link } from "react-router-dom";

const Buy = ({ onClose, title, price }) => {
  // Getting Balance From Metamask Extension
  const balance = window.sessionStorage.getItem("balance") || "0";

  // Getting themeMode from localStorage
  const themeMode = window.localStorage.getItem("themeMode");
  return (
    <div className="main-deal flex" onClick={onClose}>
      <div
        className="main-wrap flex col"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: themeMode === "dark" ? "rgb(30,20,32)" : "white",
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
                    background: "#333",
                    color: "white",
                    textTransform: "uppercase",
                    fontWeight: "600",
                    fontSize: ".5rem",
                    borderRadius: "5px",
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
                background: themeMode === "dark" ? "white" : "black",
                color: themeMode === "dark" ? "black" : "white",
              }}
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
