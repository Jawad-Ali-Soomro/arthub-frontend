import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import "../styles/User.scss";
import Footer from "../components/Footer";
import { baseUserUrl, ethToUsd } from "../utils/constant";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  BiChat,
  BiCircleThreeQuarter,
  BiCopy,
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTwitter,
  BiScan,
  BiShare,
  BiShareAlt,
  BiUserPlus,
} from "react-icons/bi";
import Skeleton from "react-loading-skeleton";
import { FaEthereum } from "react-icons/fa";
import { SiEthereum } from "react-icons/si";

const MainUser = () => {
  const navigate = useNavigate();
  const [tag_item, set_tag] = useState(true);
  const [main_data, set_data] = useState();
  const id = useParams().userId;
  const fetch_data = async () => {
    await axios.get(`${baseUserUrl}/get/${id}`).then((res) => {
      set_data(res.data.data);
    });
  };
  useEffect(() => {
    fetch_data();
  });
  const date = new Date(main_data?.created_at);
  const [year, month, day] = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  ];
  document.title = `${main_data?.username}'s Profile`;
  const colors = ["blue", "black", "orange", "indigo", "violet"];

  function getRandomColor(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

  const [randomColor, setRandomColor] = useState();
  window.onload = () => [setRandomColor(getRandomColor(colors))];

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
  // console.log(main_data?.links);
  return (
    <div>
      <Header />
      <div className="top-profile flex col">
        <div
          className="bg-image flex border col"
          style={{
            background: `${
              main_data?.bg_image == undefined
                ? randomColor == undefined
                  ? "#111"
                  : randomColor
                : main_data?.bg_image
            }`,
          }}
        >
          <div className="profile flex col">
            <img src={main_data?.avatar} alt="" />
            <h2>{main_data?.username}</h2>
            <div className="flex" style={{ gap: "5px" }}>
              <p>@{main_data?.handle}</p>
              <p className="flex">
                <SiEthereum />
                {main_data?.wallet_address.substring(0, 5)}...
                {main_data?.wallet_address?.substring(5, 10)}
              </p>
            </div>
          </div>
          <h1 style={{ marginTop: "30px" }}>{main_data?.username}</h1>
          {/* <h2>
            Joined {day} {monthInText} {year}
          </h2> */}
          <div className="links flex">
            {main_data?.links[0]?.facebook !== "" ? (
              <Link className="link flex" to={main_data?.links[0]?.facebook}>
                <BiLogoFacebook />
              </Link>
            ) : (
              this
            )}
            {main_data?.links[0]?.twitter !== "" ? (
              <Link className="link flex" to={main_data?.links[0]?.twitter}>
                <BiLogoTwitter />
              </Link>
            ) : (
              this
            )}
            {main_data?.links[0]?.instagram !== "" ? (
              <Link className="link flex" to={main_data?.links[0]?.instagram}>
                <BiLogoInstagram />
              </Link>
            ) : (
              this
            )}
          </div>
          <div
            className="icons flex"
            style={{
              background: `${randomColor == undefined ? "#222" : randomColor}`,
            }}
          >
            <div className="icon flex">
              <BiShareAlt />
            </div>
            <div className="icon flex">
              <BiUserPlus />
            </div>
            <div className="icon flex">
              <BiChat />
            </div>
          </div>
        </div>
      </div>
      <div className="tag-menu flex">
        <p
          style={{ borderBottom: `${tag_item == true ? "1px solid" : "none"}` }}
          onClick={() => set_tag(true)}
        >
          Creations ({main_data?.art?.length})
        </p>
        <p
          style={{
            borderBottom: `${tag_item == false ? "1px solid" : "none"}`,
          }}
          onClick={() => set_tag(false)}
        >
          Series ({main_data?.series?.length})
        </p>
      </div>
      <div className="art-series flex">
        {main_data == undefined ? (
          <div className="main-art-wrap flex">
            <Skeleton width={350} height={380} />
            <Skeleton width={350} height={380} />
            <Skeleton width={350} height={380} />
          </div>
        ) : (
          <div className="main-art-wrap flex">
            {tag_item == true
              ? main_data?.art?.map((card_item) => {
                  return (
                    <div className="card flex">
                      <img src={card_item?.image} alt="" />
                      <div className="info flex col">
                        <h3>{card_item?.title}</h3>
                        <div
                          className="owner flex"
                          onClick={() => navigate(`/user/${main_data?._id}`)}
                        >
                          <img src={main_data?.avatar} alt="" />
                          <div className="wrap">
                            <p>OWNER</p>
                            <h2>{main_data?.username}</h2>
                          </div>
                        </div>
                        <div className="price flex col">
                          <p>price</p>
                          <h2>
                            {card_item?.price} ≈{" "}
                            <span>${card_item?.price * ethToUsd}</span>
                          </h2>
                        </div>
                        <div className="btns flex">
                          <button
                            onClick={() =>
                              navigate(`/art/${card_item?._id}`) +
                              window.location.reload()
                            }
                          >
                            Buy
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              : tag_item == false
              ? main_data?.series?.map((card_item) => {
                  return (
                    <div className="card flex">
                      <img src={card_item?.image} alt="" />
                      <div className="info flex col">
                        <h3>{card_item?.title}</h3>
                        <div
                          className="owner flex"
                          onClick={() => navigate(`/user/${main_data?._id}`)}
                        >
                          <img src={main_data?.avatar} alt="" />
                          <div className="wrap">
                            <p>OWNER</p>
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
                            onClick={() =>
                              navigate(`/series/${card_item?._id}`) +
                              window.location.reload()
                            }
                          >
                            view
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              : this}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MainUser;
