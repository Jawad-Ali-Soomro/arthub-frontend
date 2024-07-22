import React from "react";
import { MdDashboard, MdEmail, MdOutlineEmail } from "react-icons/md";
import {
  BiAt,
  BiCollection,
  BiDollar,
  BiEdit,
  BiLogoFacebook,
  BiPaint,
  BiUpload,
  BiUser,
} from "react-icons/bi";
import { BsBell, BsInstagram, BsTwitter } from "react-icons/bs";
import { CgLogOut } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.scss";
import { useState } from "react";
import { GrConnect } from "react-icons/gr";
import { FaAt, FaBeer } from "react-icons/fa";

const Profile = () => {
  const dataToParse = window.localStorage.getItem("userId");
  const connectedWallet = window.sessionStorage.getItem("token");
  const userData = JSON.parse(dataToParse);
  const themeMode = window.localStorage.getItem("themeMode");
  const handleLogout = () => {
    window.localStorage.removeItem("authToken");
    window.localStorage.removeItem("userId");
    window.sessionStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(1);
  return (
    <div>
      <div className="sidebar flex col">
        <img
          src={
            themeMode == "light"
              ? "../public/logo-black.png"
              : themeMode == "dark"
              ? "../public/logo-white.png"
              : "../public/logo.png"
          }
          alt="logo"
          onClick={() => navigate("/")}
        />
        <div className="nav-icons flex col">
          <div
            className="icon border flex"
            style={{
              background: `${tabIndex == 1 ? "#333" : ""}`,
              color: `${tabIndex == 1 ? "white" : ""}`,
            }}
            onClick={() => setTabIndex(1)}
          >
            <MdDashboard />
          </div>
          <div
            className="icon border flex"
            style={{
              background: `${tabIndex == 2 ? "#333" : ""}`,
              color: `${tabIndex == 2 ? "white" : ""}`,
            }}
            onClick={() => setTabIndex(2)}
          >
            <BiEdit />
          </div>
          <div
            className="icon border flex"
            style={{
              background: `${tabIndex == 3 ? "#333" : ""}`,
              color: `${tabIndex == 3 ? "white" : ""}`,
            }}
            onClick={() => setTabIndex(3)}
          >
            <BiPaint />
          </div>
          <div
            className="icon border flex"
            style={{
              background: `${tabIndex == 4 ? "#333" : ""}`,
              color: `${tabIndex == 4 ? "white" : ""}`,
            }}
            onClick={() => setTabIndex(4)}
          >
            <BiCollection />
          </div>
          <div
            className="icon border flex"
            style={{
              background: `${tabIndex == 5 ? "#333" : ""}`,
              color: `${tabIndex == 5 ? "white" : ""}`,
            }}
            onClick={() => setTabIndex(5)}
          >
            <BsBell />
          </div>
        </div>
        <div className="btn-logout border flex" onClick={() => handleLogout()}>
          <CgLogOut />
        </div>
      </div>
      <div className="main-profile flex">
        {tabIndex == 1 ? (
          <div className="welcome-wrap flex col">
            <div className="profile flex col">
              <div className="wrap flex">
                <img src={userData?.avatar} alt="" />
                <span>{userData?.username}</span>
              </div>
              <h1>Dashboard</h1>
              <p>Review your progress and manage your artworks and series.</p>
            </div>
            <div className="wrap flex">
              <div
                className="card flex border col  "
                onClick={() => setTabIndex(3)}
              >
                <div className="icon flex border">
                  <BiPaint />
                </div>
                <div className="main flex">
                  <h1>
                    {userData?.art?.length <= 9
                      ? "0" + userData?.art?.length
                      : userData?.art?.length}
                  </h1>
                </div>
              </div>
              <div
                className="card flex border col  "
                onClick={() => setTabIndex(4)}
              >
                <div className="icon flex border">
                  <BiCollection />
                </div>
                <div className="main flex">
                  <h1>
                    {userData?.series?.length <= 9
                      ? "0" + userData?.series?.length
                      : userData?.series?.length}
                  </h1>
                </div>
              </div>
              <div className="card flex border col  ">
                <div className="icon flex border">
                  <BiDollar />
                </div>
                <div className="main flex">
                  <h1>$100</h1>
                </div>
              </div>
            </div>
            <div className="connected flex col">
              <div className="wrap flex col">
                <p className="flex">
                  <GrConnect /> Connected Wallet
                </p>
                <h2>{connectedWallet}</h2>
              </div>
              <button>Disconnect</button>
            </div>
          </div>
        ) : (
          this
        )}
        {tabIndex == 2 ? (
          <div className="update-wrap flex col">
            <h1>Update Profile</h1>
            <div className="form flex col">
              <div className="input-wrap flex border">
                <MdOutlineEmail />
                <input type="text" placeholder={userData?.email} />
              </div>
              <div className="input-wrap flex border">
                <BiUser />
                <input type="text" placeholder={userData?.username} />
              </div>
              <div className="input-wrap flex border">
                <BiAt />
                <input type="text" placeholder={userData?.handle} />
              </div>
              <div className="input-wrap flex border">
                <BiLogoFacebook />
                <input type="text" placeholder={userData?.links[0]?.facebook} />
              </div>
              <div className="input-wrap flex border">
                <BsTwitter />
                <input type="text" placeholder={userData?.links[0]?.twitter} />
              </div>
              <div className="input-wrap flex border">
                <BsInstagram />
                <input
                  type="text"
                  placeholder={userData?.links[0]?.instagram}
                />
              </div>
              <div className="file flex col">
                <input type="file" name="" id="" />
                <BiUpload className="icon" />
                <p>Upload Profile</p>
              </div>
            </div>
            <button>Update</button>
          </div>
        ) : (
          this
        )}
      </div>
    </div>
  );
};

export default Profile;
