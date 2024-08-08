import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import "../styles/User.scss";
import Footer from "../components/Footer";
import { baseUserUrl, ethToUsd } from "../utils/constant";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  BiCopy,
  BiImage,
  BiLayer,
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTwitter,
} from "react-icons/bi";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";
import { MdVerified } from "react-icons/md";

const MainUser = () => {
  const navigate = useNavigate();
  const [tag_item, set_tag] = useState(true);
  const [main_data, set_data] = useState();
  const { userId } = useParams();
  const [show_followers, set_show_followers] = useState(false);
  const [show_followings, set_show_followings] = useState(false);

  const fetch_data = async () => {
    await axios.get(`${baseUserUrl}/get/${userId}`).then((res) => {
      set_data(res.data.data);
    });
  };

  useEffect(() => {
    fetch_data();
  }, [userId]);

  const date = new Date(main_data?.created_at);
  const [year, month, day] = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  ];
  document.title = `${main_data?.username}'s Profile`;

  function getMonthName(monthNumber) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[monthNumber - 1];
  }

  const monthInText = getMonthName(month);

  const dataToParse = window.localStorage.getItem("userId");
  const userData = JSON.parse(dataToParse);

  const [btnText, setBtnText] = useState("FOLLOW");

  const loggedInToken = window.localStorage.getItem("authToken");

  useEffect(() => {
    if (main_data?.followers?.some((item) => item._id === userData?._id)) {
      setBtnText("UNFOLLOW");
    } else {
      setBtnText("FOLLOW");
    }
  }, [main_data, userData]);

  const toggleFollow = async () => {
    if (loggedInToken) {
      try {
        const res = await axios.patch(`${baseUserUrl}/toggle/follow`, {
          userId: main_data?._id,
          loggedInId: loggedInToken,
        });
        const message = res.data.message;
        if (message === "User followed!") {
          setBtnText("UNFOLLOW");
          toast.success("Following!");
          set_data((prevData) => ({
            ...prevData,
            followers: [...prevData.followers, { _id: userData?._id }],
          }));
        } else if (message === "User unfollowed!") {
          setBtnText("FOLLOW");
          toast.success("Unfollowing!");
          set_data((prevData) => ({
            ...prevData,
            followers: prevData.followers.filter(
              (follower) => follower._id !== userData?._id
            ),
          }));
        }
      } catch (error) {
        console.error("Error following/unfollowing user:", error);
        toast.error("An error occurred. Please try again!");
      }
    } else {
      toast.error("Please Login!");
    }
  };

  const closeFollowers = () => {
    set_show_followers(false);
  };
  const closeFollowing = () => {
    set_show_followings(false);
  };
  const themeMode = window.localStorage.getItem("themeMode");
  return (
    <div>
      <Header />
      <div className="top-profile flex">
        {!main_data ? (
          <Skeleton width={400} height={500} />
        ) : (
          <div className="left flex col">
            <div className="wrap flex">
              <img src={main_data?.avatar} className="border" alt="" />
              <div className="info flex col">
                <h1>{main_data?.username}</h1>
                <div className="handle flex">
                  <p className="flex">
                    @{main_data?.handle.split(" ")}{" "}
                    {main_data?.isPrime == true ? (
                      <MdVerified style={{ paddingLeft: "2px" }} />
                    ) : (
                      this
                    )}{" "}
                  </p>
                  <p>
                    {main_data?.wallet_address.substring(0, 5)}...
                    {main_data?.wallet_address.substring(
                      main_data?.wallet_address.length - 5
                    )}
                    <span>
                      <BiCopy />
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="btns flex">
              <div
                className="sect flex border"
                onClick={() => set_show_followers(true)}
              >
                <h2>{main_data?.followers?.length}</h2>
                <p>Followers</p>
              </div>
              <div
                className="sect flex border"
                onClick={() => set_show_followings(true)}
              >
                <h2>{main_data?.following?.length}</h2>
                <p>following</p>
              </div>
            </div>
            <div className="join border flex">
              <p>Joined</p>
              <p>
                {day} - {monthInText} - {year}
              </p>
            </div>
            <div className="links flex">
              {main_data?.links[0]?.facebook ? (
                <Link
                  className="link flex border"
                  target="_blank"
                  to={main_data?.links[0]?.facebook}
                >
                  <BiLogoFacebook />
                </Link>
              ) : null}
              {main_data?.links[0]?.twitter ? (
                <Link
                  className="link flex border"
                  target="_blank"
                  to={main_data?.links[0]?.twitter}
                >
                  <BiLogoTwitter />
                </Link>
              ) : null}
              {main_data?.links[0]?.instagram ? (
                <Link
                  className="link flex border"
                  target="_blank"
                  to={main_data?.links[0]?.instagram}
                >
                  <BiLogoInstagram />
                </Link>
              ) : null}
            </div>
            {main_data?._id === userData?._id ? (
              <div className="btns flex">
                <button
                  onClick={() => navigate("/profile")}
                  style={{
                    background: "white",
                    color: "black",
                    border: "1px solid #808090",
                  }}
                >
                  EDIT PROFILE
                </button>
              </div>
            ) : (
              <div className="btns flex col">
                <button style={{ border: "none" }}>MESSAGE</button>
                <button
                  className="border"
                  style={{ background: "white", color: "black" }}
                  onClick={() => toggleFollow()}
                >
                  {btnText}
                </button>
              </div>
            )}
          </div>
        )}
        <div className="right flex col">
          {!main_data ? (
            <Skeleton width={400} height={500} />
          ) : (
            <div className="card flex col">
              <div className="img-sect flex">
                <img
                  className="border"
                  src={main_data?.art[0]?.image}
                  alt=""
                  onClick={() => navigate(`/art/${main_data?.art[0]?._id}`)}
                />
              </div>
              <div className="info flex col">
                <h2>{main_data?.art[0]?.title}</h2>
                <div className="line border"></div>
                <div className="price flex">
                  <h2>
                    {main_data?.art[0]?.price} ~{" "}
                    <span>
                      ${Math.round(main_data?.art[0]?.price * ethToUsd)}
                    </span>
                  </h2>
                  <button
                    className="flex"
                    onClick={() => navigate(`/art/${main_data?.art[0]?._id}`)}
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="tag-menu flex">
        <p
          style={{ border: `${tag_item ? "1px solid #80808070" : "none"}` }}
          onClick={() => set_tag(true)}
        >
          <BiImage />
        </p>
        <p
          style={{
            border: `${!tag_item ? "1px solid #80808070" : "none"}`,
          }}
          onClick={() => set_tag(false)}
        >
          <BiLayer />
        </p>
      </div>
      <div className="art-series flex">
        {!main_data ? (
          <div className="main-art-wrap flex">
            <Skeleton width={350} height={380} />
            <Skeleton width={350} height={380} />
            <Skeleton width={350} height={380} />
          </div>
        ) : (
          <div className="main-art-wrap flex">
            {tag_item
              ? main_data?.art?.map((card_item) => (
                  <div className="card flex col" key={card_item?._id}>
                    <div
                      className="img-sect flex"
                      onClick={() => navigate(`/art/${card_item?._id}`)}
                    >
                      <img src={card_item?.image} alt="" />
                    </div>
                    <div className="info flex col">
                      <h3>{card_item?.title}</h3>
                      <div
                        className="owner flex"
                        onClick={() => navigate(`/user/${main_data?._id}`)}
                      >
                        <img src={main_data?.avatar} alt="" />
                        <h2
                          style={{
                            fontSize: "1rem",
                            fontWeight: "500",
                            textTransform: "lowercase",
                          }}
                        >
                          @{main_data?.username.split(" ")}
                        </h2>
                      </div>
                      <div className="line border"></div>
                      <div className="price flex">
                        <h2>
                          {card_item?.price} ~{" "}
                          <span>
                            ${Math.round(card_item?.price * ethToUsd)}
                          </span>
                        </h2>
                        <button
                          onClick={() => navigate(`/art/${card_item?._id}`)}
                        >
                          Buy
                        </button>
                      </div>
                      <div className="btns flex"></div>
                    </div>
                  </div>
                ))
              : main_data?.series?.map((card_item) => (
                  <div className="card flex col" key={card_item?._id}>
                    <div className="img-sect flex">
                      <img src={card_item?.image} alt="" />
                    </div>
                    <div className="info flex col">
                      <h3>{card_item?.title}</h3>
                      <div
                        className="owner flex"
                        onClick={() => navigate(`/user/${main_data?._id}`)}
                      >
                        <img src={main_data?.avatar} alt="" />
                        <h2
                          style={{
                            fontSize: "1rem",
                            fontWeight: "500",
                            textTransform: "lowercase",
                          }}
                        >
                          @{main_data?.username.split(" ")}
                        </h2>
                      </div>
                      <div className="line border"></div>
                      <div className="price flex">
                        <h2 style={{ fontSize: "1rem" }}>~</h2>
                        <button
                          onClick={() => navigate(`/series/${card_item?._id}`)}
                        >
                          view
                        </button>
                      </div>
                      <div className="btns flex"></div>
                    </div>
                  </div>
                ))}
          </div>
        )}
      </div>
      <Footer />
      {show_followers == true ? (
        <div className="followers flex col" onClick={() => closeFollowers()}>
          <div
            className="wrapper border flex col"
            style={{
              background: `${themeMode == "dark" ? "rgb(23,20,32)" : "white"}`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {main_data?.followers?.map((follower) => {
              return (
                <div className="follower-card flex">
                  <div
                    className="left flex"
                    onClick={() =>
                      navigate(`/user/${follower?._id}`) +
                      window.location.reload()
                    }
                  >
                    <img src={follower?.avatar} className="border" alt="" />
                    <h2>@{follower?.username.split(" ")}</h2>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        this
      )}

      {show_followings == true ? (
        <div className="followers flex col" onClick={() => closeFollowing()}>
          <div
            className="wrapper flex border col"
            style={{
              background: `${themeMode == "dark" ? "rgb(23,20,32)" : "white"}`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {main_data?.following?.map((follower) => {
              return (
                <div className="follower-card flex">
                  <div
                    className="left flex"
                    onClick={() =>
                      navigate(`/user/${follower?._id}`) +
                      window.location.reload()
                    }
                  >
                    <img src={follower?.avatar} className="border" alt="" />
                    <h2>@{follower?.username.split(" ")}</h2>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        this
      )}
    </div>
  );
};

export default MainUser;
