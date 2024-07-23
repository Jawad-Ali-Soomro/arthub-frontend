import React, { useEffect, useState } from "react";
import "../styles/mainSeries.scss";
import Header from "../components/Header";
import axios from "axios";
import { baseSeriesUrl, ethToUsd } from "../utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Skeleton from "react-loading-skeleton";
import {
  BiShareAlt,
  BiUserPlus,
  BiChat,
  BiPurchaseTagAlt,
  BiLayer,
} from "react-icons/bi";
import { SiEthereum } from "react-icons/si";

const MainSeries = () => {
  const [main_data, set_data] = useState();
  const navigate = useNavigate();
  const { seriesId } = useParams();

  const fetch_data = async () => {
    await axios.get(`${baseSeriesUrl}/get/${seriesId}`).then((res) => {
      set_data(res.data.data);
    });
  };

  useEffect(() => {
    fetch_data();
  }, [seriesId]);

  const sumArtPrices = (artArray) => {
    let totalPrice = 0;
    artArray?.forEach((artObject) => {
      if (artObject?.price) {
        totalPrice += artObject.price;
      }
    });
    return totalPrice;
  };

  const totalPricesSum = sumArtPrices(main_data?.art);
  document.title = `${main_data?.owner?.username}'s ${main_data?.title}`;

  const loggedInUser = localStorage.getItem("userId");
  const loggedInUserId = JSON.parse(loggedInUser);

  return (
    <div>
      <Header />
      <div className="top-profile flex">
        <div className="left flex col">
          <div className="wrap flex">
            <img src={main_data?.image} alt="" />
            <div className="info flex col">
              <p className="flex">
                <BiLayer /> SERIES
              </p>
              <h1 style={{ marginBottom: "20px" }}>{main_data?.title}</h1>
            </div>
          </div>
          <div className="btns flex">
            <div className="sect flex border">
              <p>creations</p>
              <h2>{main_data?.art?.length}</h2>
            </div>
            <div className="sect flex border">
              <p>worth</p>
              <h2>
                {totalPricesSum}
                <span style={{ fontSize: ".6rem" }}>ETH</span>
              </h2>
            </div>
          </div>
          <div className="btns flex col">
            {main_data?.owner?._id == loggedInUserId?._id ? (
              <button
                style={{ background: "transparent", color: "inherit" }}
                className="border"
              >
                UPDATE
              </button>
            ) : (
              <button
                style={{ background: "transparent", color: "inherit" }}
                className="border"
              >
                BUY ALL
              </button>
            )}
            {main_data?.owner?._id == loggedInUserId?._id ? (
              <button
                className="border"
                style={{ background: "red", color: "white" }}
              >
                DELETE
              </button>
            ) : (
              <button className="border">DEAL</button>
            )}
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
                  onClick={() => navigate(`/art/${main_data?.art[0]?._id}`)}
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="more-by-artist flex col">
        <h1>
          Art In {main_data?.title}{" "}
          <button onClick={() => navigate(`/user/${main_data?.owner?._id}`)}>
            Profile
          </button>
        </h1>
        {main_data == undefined ? (
          <div className="wrapper flex">
            <Skeleton width={350} height={380} />
            <Skeleton width={350} height={380} />
            <Skeleton width={350} height={380} />
          </div>
        ) : (
          <div className="wrapper flex">
            {main_data?.art?.map((card_item) => {
              return (
                <div className="card flex" key={card_item?._id}>
                  <img src={card_item?.image} alt="" />
                  <div className="info flex col">
                    <h3>{card_item?.title}</h3>
                    <div
                      className="owner flex"
                      onClick={() => navigate(`/user/${main_data?.owner?._id}`)}
                    >
                      <img src={main_data?.owner?.avatar} alt="" />
                      <h2>{main_data?.owner?.username}</h2>
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
                        onClick={() => navigate(`/art/${card_item?._id}`)}
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

export default MainSeries;
