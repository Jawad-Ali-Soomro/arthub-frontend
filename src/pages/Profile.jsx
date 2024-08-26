import React from "react";
import { BiArrowToBottom, BiArrowToTop } from "react-icons/bi";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.scss";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { baseUserUrl, ethToUsd } from "../utils/constant";

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
  return (
    <div>
      <Header />
      <div className="main-profile flex">
        <div className="dashboard flex col">
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
            <div className="wrap flex">
              <div
                className="card flex border col"
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
                className="card flex border col"
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
              <div className="card flex border col">
                <p>Total # auctions</p>
                {profile_data?.auctions == undefined ? (
                  <img
                    src="/loader.svg"
                    style={{ width: "50px", marginTop: "10px" }}
                    alt=""
                  />
                ) : (
                  <h2>{profile_data?.auctions?.length}</h2>
                )}
              </div>
            </div>
            <div className="wrap flex">
              <div className="card flex border col">
                <p>Total # events</p>
                {profile_data?.events == undefined ? (
                  <img
                    src="/loader.svg"
                    style={{ width: "50px", marginTop: "10px" }}
                    alt=""
                  />
                ) : (
                  <h2>{profile_data?.events?.length}</h2>
                )}
              </div>
              <div className="card flex border col">
                <p>Total # followers</p>
                {profile_data?.followers == undefined ? (
                  <img
                    src="/loader.svg"
                    style={{ width: "50px", marginTop: "10px" }}
                    alt=""
                  />
                ) : (
                  <h2>{profile_data?.followers?.length}</h2>
                )}
              </div>
              <div className="card flex border col">
                <p>Total # following</p>
                {profile_data?.following == undefined ? (
                  <img
                    src="/loader.svg"
                    style={{ width: "50px", marginTop: "10px" }}
                    alt=""
                  />
                ) : (
                  <h2>{profile_data?.following?.length}</h2>
                )}
              </div>
            </div>
          </div>
          {/* <div className="btns-logout flex">
              <button
                data-text="Home"
                className="flex border"
                onClick={() => navigate("/")}
              >
                <BsArrowLeft />
              </button>
              <button data-text="logout" className="flex border">
                <BiLogOut />
              </button>
            </div> */}
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
    </div>
  );
};

export default Profile;
