import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../styles/Login.scss";
import { FaArrowLeftLong, FaArrowRightLong, FaAsterisk } from "react-icons/fa6";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const loginPortal = document.getElementById("loginPortal");

const Login = ({ onClose }) => {
  const [show_pass, set_show_pass] = useState(false);
  const [login_step, set_login_step] = useState(true);
  const navigate = useNavigate();
  return ReactDOM.createPortal(
    <div className="login-portal flex" onClick={onClose}>
      <div
        className="login-wrap flex col"
        style={{
          transform: `${
            login_step == false ? "translateX(400%)" : "translateX(0%)"
          }`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img src="../public/logo-black.png" alt="" />
        <h1>Welcome Back!</h1>
        <div className="form flex col">
          <div className="input-wrap flex col">
            <input type="text" placeholder="Enter Email..." />
            <div className="icon flex">
              <FaAsterisk style={{ color: "red", fontSize: ".6rem" }} />
            </div>
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
      <div
        className="register-wrap flex col"
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: `${
            login_step == false ? "translateX(0%)" : "translateX(600%)"
          }`,
        }}
      >
        <img src="../public/logo-black.png" alt="" />
        <h1>Create An Account!</h1>
        <div className="wrap flex">
          <div className="form flex col">
            <div className="input-wrap">
              <input type="text" placeholder="Enter Username" />
              <div className="icon flex">
                <FaAsterisk style={{ color: "red", fontSize: ".6rem" }} />
              </div>
            </div>
            <div className="input-wrap">
              <input type="text" placeholder="Enter Email" />
              <div className="icon flex">
                <FaAsterisk style={{ color: "red", fontSize: ".6rem" }} />
              </div>
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
    </div>,
    loginPortal
  );
};

export default Login;
