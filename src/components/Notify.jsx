import React from "react";

const Notify = ({ onClose, heading, para, btnText }) => {
  return (
    <div
      style={{ minHeight: "100vh" }}
      className="notification flex"
      onClick={onClose}
    >
      <div
        className="main-notify flex col"
        onClick={(e) => e.stopPropagation()}
      >
        <h1>{heading}</h1>
        <p>{para}</p>
        <button>{btnText}</button>
      </div>
    </div>
  );
};

export default Notify;
