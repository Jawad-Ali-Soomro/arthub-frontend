import React from "react";
import "../styles/Profile.scss";
import Header from "../components/Header";
import { BiEdit } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  document.title = "Your Profile";
  const dataToParse = window.localStorage.getItem("userId");
  const userData = JSON.parse(dataToParse);
  const [editOpt, setEditOpt] = useState(false);
  const handleLogout = () => {
    window.localStorage.removeItem("authToken");
    window.localStorage.removeItem("userId");
    window.sessionStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div>
      <Header />
      <div
        className="profile-main flex"
        style={{
          justifyContent: `${editOpt ? "space-between" : "center"}`,
          flexDirection: `${editOpt ? "" : "column"}`,
        }}
      >
        <div
          className="left-wrap flex col"
          style={{ alignItems: `${editOpt ? "start" : "center"}` }}
        >
          <div className="profile flex">
            <img src={userData?.avatar} alt="" />
            <div className="info flex col">
              <button
                className="btn-edit flex border"
                onClick={() => setEditOpt(!editOpt)}
              >
                <BiEdit />
              </button>
              <h1>{userData.username}</h1>
              <p>{userData.email}</p>
            </div>
          </div>
          <div className="wrap flex">
            <div className="small-card border flex">
              <p>Followers</p>
              <p>{userData?.followers?.length}</p>
            </div>
            <div className="small-card border flex">
              <p>following</p>
              <p>{userData?.following?.length}</p>
            </div>
          </div>
          <div className="wrap flex">
            <div className="small-card border flex">
              <p>Creations</p>
              <p>{userData?.art?.length}</p>
            </div>
            <div className="small-card border flex">
              <p>Series</p>
              <p>{userData?.series?.length}</p>
            </div>
          </div>
          <button onClick={() => handleLogout()}>Logout</button>
        </div>

        <div className="right-wrap flex">
          <div
            className="form flex col"
            style={{ maxWidth: `${editOpt ? "400px" : "0px"}` }}
          >
            <div className="input-wrap flex col">
              <p>Email</p>
              <input
                type="text"
                className="border"
                placeholder={userData.email}
                disabled={editOpt ? false : true}
              />
            </div>
            <div className="input-wrap flex col">
              <p>Username</p>
              <input
                type="text"
                className="border"
                placeholder={userData.username}
                disabled={editOpt ? false : true}
              />
            </div>
            <div className="input-wrap flex col">
              <p>Facebook</p>
              <input
                type="text"
                className="border"
                placeholder={userData?.links[0]?.facebook}
                disabled={editOpt ? false : true}
              />
            </div>
            <div className="input-wrap flex col">
              <p>Twitter</p>
              <input
                type="text"
                className="border"
                placeholder={userData?.links[0]?.twitter}
                disabled={editOpt ? false : true}
              />
            </div>
            <div className="input-wrap flex col">
              <p>Instagram</p>
              <input
                type="text"
                className="border"
                placeholder={userData?.links[0]?.instagram}
                disabled={editOpt ? false : true}
              />
            </div>
            <button className="btn-update">Update</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
