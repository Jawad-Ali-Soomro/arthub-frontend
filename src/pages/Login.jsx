import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../styles/Login.scss";
import { FaAsterisk } from "react-icons/fa6";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { baseUserUrl } from "../utils/constant";
import axios from "axios";
import toast from "react-hot-toast";
import uploadToPinata from "../utils/upload";

const loginPortal = document.getElementById("loginPortal");

const Login = ({ onClose }) => {
  const [showPass, setShowPass] = useState(false);
  const [loginStep, setLoginStep] = useState(true);

  document.title = loginStep ? "Login" : "Register";

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
    if (!loginData.email || !loginData.password) {
      toast.error("Please Fill All The Fields");
    } else {
      try {
        const loginResponse = await axios.post(`${baseUserUrl}/login`, {
          email: loginData.email,
          password: loginData.password,
        });
        const { message, token, data } = loginResponse?.data;

        if (message === "Logged In!") {
          window.localStorage.setItem("authToken", token);
          window.localStorage.setItem("userId", JSON.stringify(data));
          toast.success("Success!");
          window.location.reload();
        } else {
          toast.error(message);
        }
      } catch (error) {
        toast.error("An error occurred during login.");
      }
    }
  };

  const wallet_address = window.sessionStorage.getItem("token");

  const [avatar, setAvatar] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    username: "",
    facebook: "https://www.facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://www.instagram.com",
  });

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const handleRegisterSubmit = async () => {
    if (
      !registerData.email ||
      !registerData.password ||
      !registerData.username
    ) {
      toast.error("Please fill all the fields!");
    } else if (!avatar) {
      toast.error("Please upload an avatar!");
    } else {
      try {
        const registerResponse = await axios.post(`${baseUserUrl}/create`, {
          username: registerData.username,
          email: registerData.email,
          password: registerData.password,
          handle: registerData.username.toLowerCase(),
          avatar: imageUrl,
          links: [
            {
              facebook: registerData.facebook,
              twitter: registerData.twitter,
              instagram: registerData.instagram,
            },
          ],
          wallet_address,
        });

        if (registerResponse.data.message === "User exists already!") {
          toast.error("Email exists already!");
        } else {
          toast.success("Account created!");
          setRegisterData({
            email: "",
            password: "",
            username: "",
            facebook: "",
            twitter: "",
            instagram: "",
          });
          setAvatar(null);
          setImageUrl("");
          setLoginStep(true);
        }
      } catch (error) {
        toast.error("An error occurred during registration.");
      }
    }
  };

  const handleAvatarChange = async (e) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
    try {
      const uploadResult = await uploadToPinata(file);
      setImageUrl(
        "https://orange-large-reindeer-667.mypinata.cloud/ipfs/" +
          uploadResult.IpfsHash
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload avatar.");
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
          <button className="flex" onClick={handleLoginSubmit}>
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
              <input
                type="text"
                placeholder="Enter Username"
                name="username"
                value={registerData.username}
                onChange={handleRegisterChange}
              />
              <div className="icon flex">
                <FaAsterisk style={{ color: "red", fontSize: ".6rem" }} />
              </div>
            </div>
            <div className="input-wrap">
              <input
                type="text"
                placeholder="Enter Email"
                value={registerData.email}
                name="email"
                onChange={handleRegisterChange}
              />
              <div className="icon flex">
                <FaAsterisk style={{ color: "red", fontSize: ".6rem" }} />
              </div>
            </div>
            <div className="input-wrap flex">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter Password..."
                value={registerData.password}
                name="password"
                onChange={handleRegisterChange}
              />
              <div className="icon flex">
                {showPass ? (
                  <BsEyeSlash onClick={() => setShowPass(false)} />
                ) : (
                  <BsEye onClick={() => setShowPass(true)} />
                )}
              </div>
            </div>
            {avatar && (
              <div>
                <img
                  src={avatar}
                  alt="Uploaded"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "20px",
                  }}
                />
              </div>
            )}
            <div className="input-wrap text">
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={handleAvatarChange}
              />
              <p className="flex col">
                Upload Avatar <span>Drag & Drop File To Upload!</span>
              </p>
            </div>
            <div className="btns flex">
              <button onClick={imageUrl == "" ? this : handleRegisterSubmit}>
                Register
              </button>
            </div>
            <p className="link" onClick={() => setLoginStep(true)}>
              Already Have An Account?
            </p>
          </div>
        </div>
      </div>
    </div>,
    loginPortal
  );
};

export default Login;
