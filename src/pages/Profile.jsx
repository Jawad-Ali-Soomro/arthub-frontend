import React from "react";
import {
  BiArrowToBottom,
  BiArrowToTop,
  BiCollection,
  BiImageAdd,
  BiPlus,
} from "react-icons/bi";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.scss";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { baseUserUrl, ethToUsd } from "../utils/constant";
import { CgLogOff } from "react-icons/cg";

const Profile = () => {
  const dataToParse = window.localStorage.getItem("userId");
  const userData = JSON.parse(dataToParse);
  const [profile_data, set_data] = useState();

  const fetch_data = async () => {
    await axios.get(`${baseUserUrl}/get/${userData?._id}`).then((res) => {
      set_data(res.data.data);
    });
  };

  useEffect(() => {
    fetch_data();
  }, [userData]);

  const navigate = useNavigate();
  document.title = "Dashboard";
  const [show_art, set_show_art] = useState(false);
  const hideArt = () => {
    set_show_art(false);
  };

  const [show_series, set_show_series] = useState(false);
  const hideSeries = () => {
    set_show_series(false);
  };

  const themeMode = window.localStorage.getItem("themeMode");

  const [showCreateOption, setShowCreateOPtion] = useState();
  return (
    <div>
      <Header />
      <div className="main-profile flex">
        <div className="dashboard flex col">
          <h2 style={{ fontWeight: "300" }}>
            Welcome{" "}
            <span style={{ fontWeight: 600 }}>{userData?.username}</span>
          </h2>
          <h1>Dashboard</h1>
          <div className="wrapper flex col">
            <div className="wrap flex">
              <h1>
                5.5 <span style={{ fontSize: "1rem" }}>~</span>{" "}
                <span style={{ fontSize: "1rem" }}>
                  ${Math.round(5.5 * ethToUsd)}
                </span>
              </h1>
              <div className="btns flex">
                <button className="flex border" data-text="Send">
                  <BiArrowToTop />
                </button>
                <button className="flex border" data-text="Receive">
                  <BiArrowToBottom />
                </button>
              </div>
            </div>
            <div className="wrap flex">
              <h1>
                10 <span style={{ fontSize: "1rem" }}>~</span>{" "}
                <span style={{ fontSize: "1rem" }}>$RARE</span>
              </h1>
              <div className="btns flex">
                <button className="flex border" data-text="Send">
                  <BiArrowToTop />
                </button>
                <button className="flex border" data-text="Receive">
                  <BiArrowToBottom />
                </button>
              </div>
            </div>
            <div
              className="wrap flex"
              style={{ justifyContent: "end", gap: "10px" }}
            >
              <div
                className="card flex  col"
                onClick={() => set_show_art(true)}
              >
                <p>Total # creations</p>
                {profile_data == undefined ? (
                  <img
                    src="/loader.svg"
                    style={{ width: "50px", marginTop: "10px" }}
                    alt=""
                  />
                ) : (
                  <h2>{profile_data?.art?.length}</h2>
                )}
              </div>
              <div
                className="card flex col"
                onClick={() => set_show_series(true)}
              >
                <p>total # sreies</p>{" "}
                {profile_data == undefined ? (
                  <img
                    src="/loader.svg"
                    style={{ width: "50px", marginTop: "10px" }}
                    alt=""
                  />
                ) : (
                  <h2>{profile_data?.series?.length}</h2>
                )}
              </div>
            </div>

            <div className="btns-bottom flex col">
              {/* {userData?.isPrime ? (
              ) : (
                this
              )} */}
              <button onClick={() => setShowCreateOPtion(true)}>
                <BiPlus />
              </button>
            </div>
          </div>
        </div>
        {show_art == true ? (
          <div className="art-sect flex" onClick={() => hideArt()}>
            <div
              className="wrap flex border"
              style={{
                background: `${themeMode == "dark" ? "#212121" : "white"}`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {profile_data?.art?.map((art) => {
                return (
                  <img
                    src={art?.image}
                    alt=""
                    onClick={() => navigate(`/art/${art?._id}`)}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          this
        )}
        {show_series == true ? (
          <div className="art-sect flex" onClick={() => hideSeries()}>
            <div
              className="wrap flex border"
              style={{
                background: `${themeMode == "dark" ? "#212121" : "white"}`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {profile_data?.series?.map((art) => {
                return (
                  <img
                    src={art?.image}
                    alt=""
                    onClick={() => navigate(`/series/${art?._id}`)}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          this
        )}
      </div>
      {showCreateOption ? (
        <div
          className="create-prompt flex col"
          onClick={() => setShowCreateOPtion(false)}
        >
          <div
            className="flex col"
            style={{ alignItems: "start", gap: "10px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h1>Choose An Action</h1>
            <p>Choose an action either you want to create art or series</p>
            <div className="cards flex">
              <div
                className="card flex col"
                onClick={() => navigate("/create")}
                style={{
                  background: `${themeMode == "dark" ? "#212121" : "#eee"}`,
                }}
              >
                <BiImageAdd className="icon" />
                <h2>Digital Art</h2>
              </div>
              <div
                className="card flex col"
                onClick={() => navigate("/create/series")}
                style={{
                  background: `${themeMode == "dark" ? "#212121" : "#eee"}`,
                }}
              >
                <BiCollection className="icon" />
                <h2>Collection</h2>
              </div>
            </div>
          </div>
        </div>
      ) : (
        this
      )}
    </div>
  );
};

export default Profile;
