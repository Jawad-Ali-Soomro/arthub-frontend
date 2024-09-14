import React, { useState } from "react";
import "../styles/Chat.scss";
import { BiLogOut, BiSend } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { BsArrowRight, BsSearch } from "react-icons/bs";
import { CgSearch } from "react-icons/cg";
import axios from "axios";
import { useEffect } from "react";
import { baseUserUrl } from "../utils/constant";

const Chat = () => {
  const userId = window.localStorage.getItem("userId");
  const parsedUser = JSON.parse(userId);
  const navigate = useNavigate();

  const [data, set_data] = useState([]);
  const [activeUser, setActiveUser] = useState({
    userName: "",
    avatar: "",
    id: "",
    status: false,
  });

  const fetch_data = async () => {
    try {
      const response = await axios.get(`${baseUserUrl}/allUsers`);
      set_data(response?.data?.users || []);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetch_data();
  }, []);

  console.log(data);

  document.title = "Artchain - Chat";
  const themeMode = window.localStorage.getItem("themeMode");
  return (
    <div className="chat-main flex">
      <div
        className="side-bar flex col"
        style={{
          background: `${
            themeMode == "dark" ? "rgba(255,255,255,.05)" : "#eee"
          }`,
        }}
      >
        <div className="logo">
          <img
            src={themeMode === "dark" ? "/logo-white.png" : "logo-black.png"}
            alt=""
            onClick={() => navigate("/")}
          />
        </div>
        <div className="menu flex col">
          <div className="img-sect flex">
            <img
              src={parsedUser?.avatar}
              alt=""
              onClick={() => navigate(`/user/${parsedUser?._id}`)}
            />
          </div>
          <button className="flex">
            <BiLogOut />
          </button>
        </div>
      </div>
      <div className="users flex col">
        <div
          className="top-search flex"
          style={{
            background: `${
              themeMode == "dark" ? "rgba(255,255,255,.05)" : "#eee"
            }`,
          }}
        >
          <input type="text" placeholder="Find A User!" />
          <button
            className="flex"
            style={{
              background: `${themeMode === "dark" ? "#eee" : "white"}`,
              color: "black",
            }}
          >
            <CgSearch />
          </button>
        </div>
        <div className="main-users flex">
          <div className="wrap flex col">
            {data?.map((userItem) => {
              return (
                <div
                  className="card flex"
                  onClick={() =>
                    setActiveUser({
                      userName: userItem?.username,
                      avatar: userItem?.avatar,
                      id: userItem?._id,
                    })
                  }
                >
                  <div className="profile flex">
                    <img src={userItem?.avatar} alt="" />
                    <p>@{userItem?.handle.trim(" ")}</p>
                  </div>
                  <div className="arrow flex">
                    <BsArrowRight />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div
        className="message-wrap flex col"
        style={{
          background: `${
            themeMode == "dark" ? "rgba(255,255,255,.05)" : "#eee"
          }`,
        }}
      >
        {activeUser?.id ? (
          <div
            className="user-info flex"
            style={{
              background: `${
                themeMode == "dark" ? "rgba(255,255,255,.05)" : "white"
              }`,
            }}
          >
            <div className="profile flex">
              <img src={activeUser?.avatar} alt="" />
              <div className="flex col" style={{ alignItems: "start" }}>
                <p
                  style={{
                    fontWeight: "600",
                    fontSize: "1.2rem",
                  }}
                >
                  {activeUser?.userName}
                </p>
                <p>{activeUser?.status ? "Online" : "Offline"}</p>
              </div>
            </div>
            <div className="icon flex">
              <button
                style={{
                  background: "#eee",
                  color: "black",
                }}
                onClick={() => navigate(`/user/${activeUser?.id}`)}
              >
                Profile
              </button>
            </div>
          </div>
        ) : (
          this
        )}
        <div className="message-main"></div>
        <div
          className="message-send flex"
          style={{
            background: `${
              themeMode == "dark" ? "rgba(255,255,255,.05)" : "white"
            }`,
          }}
        >
          <input type="text" placeholder="Type your message here..." />
          <button
            className="flex"
            style={{
              background: "#eee",
              color: "black",
            }}
          >
            <BiSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
