import React from "react";
import "../styles/Warning.scss";

const Warning = ({ message, onConfirm, onCancel }) => {
  const themeMode = window.localStorage.getItem("themeMode");
  return (
    <div className="popup-overlay flex" onClick={onCancel}>
      <div
        className="popup-content flex col"
        style={{
          background: themeMode === "dark" ? "#212121" : "white",
          color: themeMode === "dark" ? "white" : "black",
        }}
      >
        <h1>Warning!</h1>
        <p>{message}</p>
        <button onClick={onConfirm}>Confirm</button>
        <button style={{ background: "red" }} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Warning;
