import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../styles/Login.scss";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const loginPortal = document.getElementById("loginPortal");

const Login = ({ onClose }) => {
  const [show_pass, set_show_pass] = useState(false);
  const [login_step, set_login_step] = useState(true);
  const navigate = useNavigate();
  return ReactDOM.createPortal(
    <div className="login-portal flex col" onClick={onClose}>
      {login_step == true ? (
        <div
          className="login-wrap flex col"
          onClick={(e) => e.stopPropagation()}
        >
          <img src="../public/logo-black.png" alt="" />
          <h1>Welcome Back!</h1>
          <div className="form flex col">
            <div className="input-wrap flex col">
              <input type="text" placeholder="Enter Email..." />
            </div>
            <div className="input-wrap flex">
              <input
                type={show_pass == true ? "text" : "password"}
                placeholder="Enter Password..."
              />
              <div className="icon flex">
                {show_pass == false ? (
                  <BsEye onClick={() => set_show_pass(true)} />
                ) : (
                  <BsEyeSlash onClick={() => set_show_pass(false)} />
                )}
              </div>
            </div>
            <Link className="link">Forgot Password?</Link>
            <button className="flex">Login </button>
            <p
              style={{ cursor: "pointer" }}
              className="link"
              onClick={() => set_login_step(false)}
            >
              Don't Have An Account?
            </p>
          </div>
        </div>
      ) : login_step == false ? (
        <div
          className="register-wrap flex col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="btn-back flex" onClick={() => set_login_step(true)}>
            <FaArrowLeftLong />
          </div>
          <img src="../public/logo-black.png" alt="" />
          <h1>Create An Account!</h1>
          <div className="wrap flex">
            <div className="form flex col">
              <div className="input-wrap">
                <input type="text" placeholder="Enter Email" />
              </div>
              <div className="input-wrap flex">
                <input
                  type={show_pass == true ? "text" : "password"}
                  placeholder="Enter Password..."
                />
                <div className="icon flex">
                  {show_pass == false ? (
                    <BsEye onClick={() => set_show_pass(true)} />
                  ) : (
                    <BsEyeSlash onClick={() => set_show_pass(false)} />
                  )}
                </div>
              </div>
              <div className="input-wrap">
                <input type="text" placeholder="Enter Handle" />
              </div>
              <div className="input-wrap">
                <input type="text" placeholder="Enter Facebook Url" />
              </div>
            </div>
            <div className="form flex col">
              <div className="input-wrap">
                <input type="text" placeholder="Enter Twitter Url" />
              </div>
              <div className="input-wrap">
                <input type="text" placeholder="Enter Instgram Url" />
              </div>
              <div className="input-wrap text">
                <input type="file" name="" id="" placeholder="Upload" />
                <p className="flex col">
                  Uplaod Avatar <span>Drag & Drop File To Upload!</span>
                </p>
              </div>
            </div>
          </div>
          <div className="btns flex">
            <button>Register</button>
          </div>
          <p className="link" onClick={() => set_login_step(true)}>
            Already Have An Account?
          </p>
        </div>
      ) : (
        this
      )}
    </div>,
    loginPortal
  );
};

export default Login;
