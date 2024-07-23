import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import "../styles/User.scss";
import Footer from "../components/Footer";
import { baseUserUrl, ethToUsd } from "../utils/constant";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  BiCopy,
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTwitter,
} from "react-icons/bi";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";

const MainUser = () => {
  const navigate = useNavigate();
  const [tag_item, set_tag] = useState(true);
  const [main_data, set_data] = useState();
  const { userId } = useParams();

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
      toast.error("Please Login First!");
    }
  };

  return (
    <div>
      <Header />
      <div className="top-profile flex">
        <div className="left flex col">
          <div className="wrap flex">
            <img src={main_data?.avatar} alt="" />
            <div className="info flex col">
              <h1>{main_data?.username}</h1>
              <div className="handle flex">
                <p>@{main_data?.handle}</p>
                <p>
                  {main_data?.wallet_address.substring(0, 5)}...
                  {main_data?.wallet_address.substring(10, 5)}
                  <span>
                    <BiCopy />
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="btns flex">
            <div className="sect flex border">
              <h2>{main_data?.followers?.length}</h2>
              <p>Followers</p>
            </div>
            <div className="sect flex border">
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
                style={{ background: "#333", color: "white", border: "none" }}
              >
                PROFILE
              </button>
            </div>
          ) : (
            <div className="btns flex col">
              <button style={{ border: "none" }}>MESSAGE</button>
              <button className="border" onClick={() => toggleFollow()}>
                {btnText}
              </button>
            </div>
          )}
        </div>
        <div className="right flex col">
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
              <div className="price flex">
                <h2>
                  {main_data?.art[0]?.price} ≈{" "}
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
        </div>
      </div>
      <div className="tag-menu flex">
        <p
          style={{ borderBottom: `${tag_item ? "1px solid" : "none"}` }}
          onClick={() => set_tag(true)}
        >
          Creations ({main_data?.art?.length})
        </p>
        <p
          style={{
            borderBottom: `${!tag_item ? "1px solid" : "none"}`,
          }}
          onClick={() => set_tag(false)}
        >
          Series ({main_data?.series?.length})
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
                  <div className="card flex" key={card_item?._id}>
                    <img src={card_item?.image} alt="" />
                    <div className="info flex col">
                      <h3>{card_item?.title}</h3>
                      <div
                        className="owner flex"
                        onClick={() => navigate(`/user/${main_data?._id}`)}
                      >
                        <img src={main_data?.avatar} alt="" />
                        <div className="wrap">
                          <h2>{main_data?.username}</h2>
                        </div>
                      </div>
                      <div className="price flex col">
                        <p>price</p>
                        <h2>
                          {card_item?.price} ≈
                          <span>
                            ${Math.round(card_item?.price * ethToUsd)}
                          </span>
                        </h2>
                      </div>
                      <div className="btns flex">
                        <button
                          onClick={() => navigate(`/art/${card_item?._id}`)}
                        >
                          Buy
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              : main_data?.series?.map((card_item) => (
                  <div className="card flex" key={card_item?._id}>
                    <img src={card_item?.image} alt="" />
                    <div className="info flex col">
                      <h3>{card_item?.title}</h3>
                      <div
                        className="owner flex"
                        onClick={() => navigate(`/user/${main_data?._id}`)}
                      >
                        <img src={main_data?.avatar} alt="" />
                        <div className="wrap">
                          <h2>{main_data?.username}</h2>
                        </div>
                      </div>
                      <div className="price flex col">
                        <p>total</p>
                        <h2
                          style={{
                            textTransform: "capitalize",
                            fontWeight: 400,
                          }}
                        >
                          {card_item?.art?.length} artworks
                        </h2>
                      </div>
                      <div className="btns flex">
                        <button
                          onClick={() => navigate(`/series/${card_item?._id}`)}
                        >
                          view
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MainUser;
