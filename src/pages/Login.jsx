import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../styles/Login.scss";
import { FaAsterisk } from "react-icons/fa6";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const loginPortal = document.getElementById("loginPortal");

const Login = ({ onClose }) => {
  const [showPass, setShowPass] = useState(false);
  const [loginStep, setLoginStep] = useState(true);
  const navigate = useNavigate();

  return ReactDOM.createPortal(
    <div className="login-portal flex" onClick={onClose}>
      <div
        className="login-wrap flex col"
        style={{
          transform: loginStep ? "translateX(0%)" : "translateX(400%)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img src="../public/logo-black.png" alt="Logo" />
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
              type={showPass ? "text" : "password"}
              placeholder="Enter Password..."
            />
            <div className="icon flex">
              {showPass ? (
                <BsEyeSlash onClick={() => setShowPass(false)} />
              ) : (
                <BsEye onClick={() => setShowPass(true)} />
              )}
            </div>
          </div>
          <Link className="link">Forgot Password?</Link>
          <button className="flex">Login</button>
          <p
            style={{ cursor: "pointer" }}
            className="link"
            onClick={() => setLoginStep(false)}
          >
            Don't Have An Account?
          </p>
        </div>
      </div>
      <div
        className="register-wrap flex col"
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: loginStep ? "translateX(600%)" : "translateX(0%)",
        }}
      >
        <img src="../public/logo-black.png" alt="Logo" />
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
                type={showPass ? "text" : "password"}
                placeholder="Enter Password..."
              />
              <div className="icon flex">
                {showPass ? (
                  <BsEyeSlash onClick={() => setShowPass(false)} />
                ) : (
                  <BsEye onClick={() => setShowPass(true)} />
                )}
              </div>
            </div>
            <div className="input-wrap">
              <input type="text" placeholder="Enter Facebook URL" />
            </div>
          </div>
          <div className="form flex col">
            <div className="input-wrap">
              <input type="text" placeholder="Enter Twitter URL" />
            </div>
            <div className="input-wrap">
              <input type="text" placeholder="Enter Instagram URL" />
            </div>
            <div className="input-wrap text">
              <input type="file" name="avatar" id="avatar" />
              <p className="flex col">
                Upload Avatar <span>Drag & Drop File To Upload!</span>
              </p>
            </div>
          </div>
        </div>
        <div className="btns flex">
          <button>Register</button>
        </div>
        <p className="link" onClick={() => setLoginStep(true)}>
          Already Have An Account?
        </p>
      </div>
    </div>,
    loginPortal
  );
};

export default Login;
