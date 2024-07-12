import React, { useEffect, useState } from "react";
import "../styles/MainArt.scss";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseArtUrl, baseUserUrl, ethToUsd } from "../utils/constant";
import { BiHeart, BiLike, BiScan } from "react-icons/bi";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Footer from "../components/Footer";

const MainArt = () => {
  const [main_data, set_data] = useState();
  const [more_data, set_more] = useState();
  const [show_desc, set_desc] = useState(false);
  const navigate = useNavigate();
  const { artId } = useParams();
  const fetch_data = async () => {
    await axios
    .get(`${baseArtUrl}/get/art/${artId}`)
    .then((res) => set_data(res.data.data));
  };
  const fetch_more = async () => {
    await axios
    .get(`${baseUserUrl}/get/${main_data?.owner?._id}`)
    .then((res) => {
      set_more(res.data.data.art.splice(0, 3));
    });
  };
  useEffect(() => {
    fetch_data();
    fetch_more();
  });
  document.title = `${main_data?.owner?.username}'s ${main_data?.title}`;
  return (
    <div>
      <Header />
      <div className="main-art flex">
        <div className="main-art-left">
          {main_data == undefined ? (
            <Skeleton containerClassName="flex-1" width={600} height={600} />
          ) : (
            <img src={main_data?.image} alt="" />
          )}
        </div>
        {main_data == undefined ? (
          <Skeleton style={{ marginTop: "35vh" }} width={600} height={400} />
        ) : (
          <div className="main-art-right flex col">
            <div className="top flex col">
              <div className="icons flex">
                <div className="icon border flex">
                  <BiHeart />
                </div>{" "}
                <div className="icon border flex">
                  <BiScan />
                </div>
              </div>
              <h1>{main_data?.title}</h1>
            </div>
            <div
              className="owner-series flex"
              style={{
                justifyContent: `${
                  main_data?.series[0] !== undefined ? "space-between" : "end"
                }`,
              }}
            >
              <div className="owner flex">
                <img className="border" src={main_data?.owner?.avatar} alt="" />
                <h2>{main_data?.owner?.username}</h2>
              </div>
              {main_data?.series[0] !== undefined ? (
                <div className="owner flex">
                  <img
                    className="border"
                    src={main_data?.series[0]?.image}
                    alt=""
                  />
                  <h2>{main_data?.series[0]?.title}</h2>
                </div>
              ) : (
                this
              )}
            </div>
            <div className="line"></div>
            <div className="price flex">
              <p>PRICE</p> &nbsp; : &nbsp;
              {main_data?.price} ≈ <span>${main_data?.price * ethToUsd}</span>
            </div>
            <div className="btns flex">
              <button className="border">BUY</button>
              <button className="border">Make a deal</button>
            </div>
            <div className="desciption flex">
              {show_desc == true ? (
                <p>{main_data?.description}</p>
              ) : (
                <p>{main_data?.description.substring(0, 100)}...</p>
              )}
            </div>
            <div className="more flex">
              <button onClick={() => set_desc(!show_desc)}>
                {show_desc == true ? <FaArrowUp /> : <FaArrowDown />}
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="more-by-artist flex col">
        <h1>
          More By {main_data?.owner?.username} <button>Profile</button>
        </h1>
        {more_data == undefined ? (
          <div className="wrapper flex">
            <Skeleton width={350} height={380} />
            <Skeleton width={350} height={380} />
            <Skeleton width={350} height={380} />
          </div>
        ) : (
          <div className="wrapper flex">
            {more_data.map((card_item) => {
              return (
                <div className="card flex" key={card_item?._id}>
                  <img src={card_item?.image} alt="" />
                  <div className="info flex col">
                    <h3>{card_item?.title}</h3>
                    <div className="price flex col">
                      <p>price</p>
                      <h2>
                        {card_item?.price} ≈{" "}
                        <span>${card_item?.price * ethToUsd}</span>
                      </h2>
                    </div>
                    <div className="btns flex">
                      <button
                        onClick={() => navigate(`/art/${card_item?._id}`) + window.location.reload()}
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MainArt;
