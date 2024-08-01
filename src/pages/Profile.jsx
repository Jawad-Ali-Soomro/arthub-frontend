import React from "react";
import { MdDashboard, MdEmail, MdEvent, MdOutlineEmail } from "react-icons/md";
import {
  BiArrowToBottom,
  BiArrowToTop,
  BiAt,
  BiCollection,
  BiDollar,
  BiHome,
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTwitter,
  BiLogOut,
  BiPaint,
  BiPlus,
  BiSolidDashboard,
  BiTrash,
  BiUpload,
  BiUser,
} from "react-icons/bi";
import Header from "../components/Header";
import { BsArrowLeft, BsBell, BsInstagram, BsTwitter } from "react-icons/bs";
import { CgLogOut } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { XAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import CustomTooltip from "../components/CustomTooltip";
import axios from "axios";
import { useEffect } from "react";
import { baseUserUrl, ethToUsd } from "../utils/constant";
import { AiOutlineDisconnect } from "react-icons/ai";
import { FaHome } from "react-icons/fa";

const Profile = () => {
  const dataToParse = window.localStorage.getItem("userId");
  const userData = JSON.parse(dataToParse);
  const [profile_data, set_data] = useState();
  const themeMode = window.localStorage.getItem("themeMode");

  const fetch_data = async () => {
    await axios.get(`${baseUserUrl}/get/${userData?._id}`).then((res) => {
      set_data(res.data.data);
    });
  };
  useEffect(() => {
    fetch_data();
  }, [userData]);
  const handleLogout = () => {
    window.localStorage.removeItem("authToken");
    window.localStorage.removeItem("userId");
    navigate("/");
    window.location.reload();
  };
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(1);
  const data = [
    {
      name: "Followers",
      value: profile_data?.followers?.length,
    },
    {
      name: "Following",
      value: profile_data?.following?.length,
    },
    {
      name: "Creations",
      value: profile_data?.art?.length,
    },
    {
      name: "Series",
      value: profile_data?.series?.length,
    },
    {
      name: "Items Sold",
      value: 10,
    },
    {
      name: "Items Bought",
      value: 8,
    },
    {
      name: "Total Assets",
      value: 5,
    },

    {
      name: "Total Sale",
      value: 4,
    },
  ];

  const [updateTab, setUpdateTab] = useState(false);
  return (
    <div>
      {/* <Header /> */}
      {/* <div className="sidebar flex">
        <img
          src={themeMode == "dark" ? "/logo-white.png" : "/logo-black.png"}
          alt="logo"
          onClick={() => navigate("/")}
        />
        <div className="nav-icons flex ">
          <div
            className="icon border flex"
            style={{
              background: `${tabIndex == 1 ? "#333" : ""}`,
              color: `${tabIndex == 1 ? "white" : ""}`,
            }}
            onClick={() => setTabIndex(1)}
          >
            <BiSolidDashboard />
          </div>
          <div
            className="icon border flex"
            style={{
              background: `${tabIndex == 2 ? "#333" : ""}`,
              color: `${tabIndex == 2 ? "white" : ""}`,
            }}
            onClick={() => setTabIndex(2)}
          >
            <BiUser />
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
            <MdEvent />
          </div>
          <div
            className="icon border flex"
            style={{
              background: `${tabIndex == 6 ? "#333" : ""}`,
              color: `${tabIndex == 6 ? "white" : ""}`,
            }}
            onClick={() => setTabIndex(6)}
          >
            <BiPlus />
          </div>
        </div>
        <div className="btn-logout border flex" onClick={() => handleLogout()}>
          <CgLogOut />
        </div>
      </div> */}
      <div className="main-profile flex">
        {tabIndex == 1 ? (
          <div className="dashboard flex col">
            {/* <h1 className="heading" style={{ textTransform: "capitalize" }}>
              Welcome Mr {userData?.username}{" "}
              <button className="border">LOGOUT</button>
            </h1> */}
            <div className="wrapper flex col">
              <div className="wrap flex">
                <h1>
                  0 <span style={{ fontSize: "1rem" }}>Ξ</span>{" "}
                  <span style={{ fontSize: "1rem" }}>$0</span>
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
                  0 <span style={{ fontSize: "1rem" }}>Ξ</span>{" "}
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
                <div className="card flex border col">
                  <p>Total # creations</p>
                  <h2>{profile_data?.art?.length}</h2>
                </div>
                <div className="card flex border col">
                  <p>total # sreies</p>
                  <h2>{profile_data?.series?.length}</h2>
                </div>
                <div className="card flex border col">
                  <p>Total # auctions</p>
                  <h2>0</h2>
                </div>
              </div>
              <div className="wrap flex">
                <div className="card flex border col">
                  <p>Total # events</p>
                  <h2>0</h2>
                </div>
                <div className="card flex border col">
                  <p>Total # followers</p>
                  <h2>{profile_data?.followers?.length}</h2>
                </div>
                <div className="card flex border col">
                  <p>Total # following</p>
                  <h2>{profile_data?.following?.length}</h2>
                </div>
              </div>
            </div>
            <div className="btns-logout flex">
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
            </div>
          </div>
        ) : (
          this
        )}
        {/* {tabIndex == 2 ? (
          <div
            className="update-wrap flex"
            style={{
              alignItems: "center",
              justifyContent: `${
                updateTab == true ? "space-between" : "center"
              }`,
            }}
          >
            <div className="left flex col">
              <div className="profile flex">
                <img className="border" src={userData?.avatar} alt="" />
                <h2 style={{ fontWeight: 900 }}>{userData?.username}</h2>
              </div>
              <div className="flex" style={{ gap: "10px" }}>
                <div className="wrap flex border">
                  <p>FOLLOWERS</p>
                  <h2>{profile_data?.followers.length}</h2>
                </div>
                <div className="wrap flex border">
                  <p>Followings</p>
                  <h2>{profile_data?.following?.length}</h2>
                </div>
              </div>
              <div className="flex" style={{ gap: "10px" }}>
                <div className="wrap flex border">
                  <p>Creations</p>
                  <h2>{userData?.art?.length}</h2>
                </div>
                <div className="wrap flex border">
                  <p>Series</p>
                  <h2>{userData?.series?.length}</h2>
                </div>
              </div>
              {userData?.links?.length == 1 ? (
                <div className="links flex">
                  {userData?.links[0]?.facebook == "" ? (
                    this
                  ) : (
                    <Link
                      to={userData?.links[0]?.facebook}
                      className="flex link border"
                    >
                      <BiLogoFacebook />
                    </Link>
                  )}
                  {userData?.links[0]?.twitter == "" ? (
                    this
                  ) : (
                    <Link
                      to={userData?.links[0]?.twitter}
                      className="flex link border"
                    >
                      <BiLogoTwitter />
                    </Link>
                  )}
                  {userData?.links[0]?.instagram == "" ? (
                    this
                  ) : (
                    <Link
                      to={userData?.links[0]?.instagram}
                      className="flex link border"
                    >
                      <BiLogoInstagram />
                    </Link>
                  )}
                </div>
              ) : (
                this
              )}
              <button onClick={() => setUpdateTab(true)}>Update</button>
              <button style={{ background: "red" }}>DELETe account</button>
            </div>
            <div
              className="right flex col"
              style={{
                position: `${updateTab == true ? "relative" : "absolute"}`,
                maxWidth: `${updateTab == true ? "470px" : "000px"}`,
                overflow: "hidden",
              }}
            >
              <h1 style={{ fontWeight: "900" }}>Update Profile</h1>
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
                  <input
                    type="text"
                    placeholder={userData?.links[0]?.facebook}
                  />
                </div>
                <div className="input-wrap flex border">
                  <BsTwitter />
                  <input
                    type="text"
                    placeholder={userData?.links[0]?.twitter}
                  />
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
                <div className="btns flex col">
                  <button>Update</button>
                  <button
                    className="border"
                    onClick={() => setUpdateTab(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
            {updateTab == false ? (
              <div className="wallet flex">
                <p>{profile_data?.wallet_address}</p>
                <button className="flex">
                  <AiOutlineDisconnect />
                </button>
              </div>
            ) : (
              this
            )}
          </div>
        ) : (
          this
        )}
        {tabIndex == 3 ? (
          <div className="art-sect flex col">
            <div className="main flex">
              {profile_data?.art?.map((card_item) => {
                return (
                  <div className="card flex">
                    <img src={card_item?.image} alt="" />
                    <div className="info flex col">
                      <div className="delete-btn flex">
                        <BiTrash />
                      </div>
                      <h3>{card_item?.title}</h3>
                      <div className="price flex col">
                        <p>Price</p>
                        <h2>
                          {card_item?.price} Ξ ${" "}
                          {Math.round(card_item?.price * ethToUsd)}
                        </h2>
                        <div className="btns flex">
                          <button>UPdate</button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="border" onClick={() => setTabIndex(1)}>
              Back
            </button>
          </div>
        ) : (
          this
        )}
        {tabIndex == 4 ? (
          <div className="art-sect flex col">
            <div className="main flex">
              {profile_data?.series?.map((card_item) => {
                return (
                  <div className="card flex">
                    <img src={card_item?.image} alt="" />
                    <div className="info flex col">
                      <div className="delete-btn flex">
                        <BiTrash />
                      </div>
                      <h3>{card_item?.title}</h3>
                      <div className="price flex col">
                        <div className="btns flex">
                          <button>UPdate</button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          this
        )} */}
      </div>
    </div>
  );
};

export default Profile;
