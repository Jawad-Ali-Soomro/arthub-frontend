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
              <div className="links flex">
                {main_data?.links[0]?.facebook == "" ? (
                  ""
                ) : (
                  <Link
                    className="link flex border"
                    to={main_data?.links[0]?.facebook}
                  >
                    <BiLogoFacebook />
                  </Link>
                )}
                {main_data?.links[0]?.twitter == "" ? (
                  ""
                ) : (
                  <Link
                    className="link flex border"
                    to={main_data?.links[0]?.twitter}
                  >
                    <BiLogoTwitter />
                  </Link>
                )}
                {main_data?.links[0]?.instagram == "" ? (
                  ""
                ) : (
                  <Link
                    className="link flex border"
                    to={main_data?.links[0]?.instagram}
                  >
                    <BiLogoInstagram />
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="btns flex">
            <div className="sect flex border">
              <p>Followers</p>
              <h2>{main_data?.followers?.length}</h2>
            </div>
            <div className="sect flex border">
              <p>following</p>
              <h2>{main_data?.following?.length}</h2>
            </div>
          </div>
          <div className="btns flex">
            <button>FOLLOW</button>
            <button>MESSAGE</button>
          </div>
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
                  <span>${main_data?.art[0]?.price * ethToUsd}</span>
                </h2>
                <button
                  className="flex"
                  onClick={() => navigate(`/art/${main_data[0]?._id}`)}
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
