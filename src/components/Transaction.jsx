import React from "react";
import "../styles/Connect.scss";

const Transaction = ({ onClose }) => {
  const themeMode = window.localStorage.getItem("themeMode");

  return (
    <div
      className="connect-portal flex col"
      style={{ borderRadius: "0" }}
      onClick={onClose}
    >
      <div
        className="main-connect flex col"
        style={{
          background: themeMode === "dark" ? "#212121" : "white",
          color: themeMode === "dark" ? "white" : "black",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img src="/metamask.png" alt="MetaMask" />
        <h1 style={{ fontWeight: "800", fontSize: "1.2rem" }}>Confirming...</h1>
        <p
          style={{
            maxWidth: "300px",
            textAlign: "center",
            fontSize: ".9rem",
            fontWeight: "600",
            textTransform: "capitalize",
          }}
        >
          Confirm action in MetaMask extension.
        </p>
        <img
          style={{ width: "40px", marginTop: "10px" }}
          src="/loader.svg"
          alt="Loading"
        />
      </div>
    </div>
  );
};

export default Transaction;
