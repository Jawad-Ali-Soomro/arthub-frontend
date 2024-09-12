import React from "react";
import { BiCross, BiEnvelope, BiSend, BiSupport } from "react-icons/bi";
import "../styles/Support.scss";
import { useState } from "react";
import { CgClose } from "react-icons/cg";

const Support = () => {
  const [showSuppert, setShow] = useState(false);
  const themeMode = window.localStorage.getItem("themeMode");
  const [userMessage, setMessage] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const [showSysMessage, setShowSysMessage] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClickOrEnter = (e) => {};

  return (
    <div className="support-wrap">
      <div
        className="icon flex border"
        style={{ background: "white", color: "black" }}
        onClick={() => setShow(!showSuppert)}
      >
        <BiSupport />
      </div>
      {showSuppert ? (
        <div
          className="wrapper flex col border"
          style={{
            background: "white",
            color: "black",
          }}
        >
          <img src="/logo-black.png" alt="" />
          <div
            className="close flex"
            style={{ cursor: "pointer" }}
            onClick={() => setShow(false)}
          >
            <CgClose />
          </div>
          <h1>Hi There</h1>
          <p>How Can I Help You Today?</p>
          {showMessage ? (
            <div className="user-message flex">
              <p>{userMessage}</p>
            </div>
          ) : (
            this
          )}
          {showSysMessage ? (
            <div className="sys-message flex">
              <p>
                Hello, Thanks for your message we will reply you as soon as
                possible!
              </p>
            </div>
          ) : (
            this
          )}
          <div className="message flex">
            <input
              type="text"
              placeholder="Message"
              value={userMessage}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isDisabled}
            />
            <div
              className="icon flex"
              onClick={function (e) {
                addEventListener("keypress", (e) => {
                  if (e.key == "Enter" || e.type === "click") {
                    setShowMessage(true);
                    setShowSysMessage(true);
                    setIsDisabled(true);
                  } else {
                    console.log("Error In Logic");
                  }
                });
              }}
              disabled={isDisabled}
              style={{ background: `${isDisabled ? "gray" : "#212121"}` }}
            >
              <BiSend />
            </div>
          </div>
        </div>
      ) : (
        this
      )}
    </div>
  );
};

export default Support;
