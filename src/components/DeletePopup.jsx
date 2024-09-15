import React from "react";
import "../styles/Popup.scss";

const Popup = ({ message, onConfirm, onCancel }) => {
  const handleConfirm = () => {
    onConfirm();
    onCancel();
  };

  const themeMode = window.localStorage.getItem("themeMode");

  return (
    <div className="popup-overlay" onClick={onCancel}>
      <div
        className="popup-content"
        style={{
          background: themeMode === "dark" ? "#212121" : "white",
          color: themeMode === "dark" ? "white" : "black",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="popup-header">
          <h2>Are You Sure?</h2>
        </div>
        <p>{message}</p>
        <div className="popup-buttons">
          <button
            onClick={handleConfirm}
            style={{
              background: "#eee",
              color: "black",
              border: "none",
            }}
            className="confirm-button"
          >
            Confirm
          </button>
          <button
            onClick={onCancel}
            className="cancel-button"
            style={{
              background: "red",
              color: "black",
              border: "none",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
