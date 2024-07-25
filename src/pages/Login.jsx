import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../styles/Login.scss";
import { FaAsterisk } from "react-icons/fa6";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { baseUserUrl } from "../utils/constant";
import axios from "axios";
import toast from "react-hot-toast";

const loginPortal = document.getElementById("loginPortal");

const Login = ({ onClose }) => {
  const [showPass, setShowPass] = useState(false);
  const [loginStep, setLoginStep] = useState(true);
  loginStep == true
    ? (document.title = "Login")
    : loginStep == false
    ? (document.title = "Register")
    : (document.title = "Artchain");
  const themeMode = window.localStorage.getItem("themeMode");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLoginSubmit = async () => {
    if (loginData.email | (loginData.password == "")) {
      toast.error("Please Fill All The Fields");
    } else {
      const loginResponse = await axios.post(`${baseUserUrl}/login`, {
        email: loginData.email,
        password: loginData.password,
      });
      const message = loginResponse?.data?.message;
      const token = loginResponse?.data?.token;

      message == "Logged In!"
        ? window.localStorage.setItem("authToken", token) +
          window.localStorage.setItem(
            "userId",
            JSON.stringify(loginResponse?.data?.data)
          ) +
          toast.success("Success!") +
          window.location.reload()
        : toast.error(message);
    }
  };

  return ReactDOM.createPortal(
    <div className="login-portal flex" onClick={onClose}>
      <div
        className="login-wrap flex col"
        style={{
          transform: loginStep ? "translateX(0%)" : "translateX(400%)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img src="/logo-black.png" alt="Logo" />
        <h1>Welcome Back!</h1>
        <div className="form flex col">
          <div className="input-wrap flex col">
            <input
              type="text"
              placeholder="Enter Email..."
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
            />
            <div className="icon flex">
              <FaAsterisk style={{ color: "red", fontSize: ".6rem" }} />
            </div>
          </div>
          <div className="input-wrap flex">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Enter Password..."
              value={loginData.password}
              onChange={handleLoginChange}
              name="password"
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
          <button className="flex" onClick={() => handleLoginSubmit()}>
            Login
          </button>
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
        <img src="/logo-black.png" alt="Logo" />
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
