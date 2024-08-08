import React, { useEffect, useState } from "react";
import "../styles/mainSeries.scss";
import Header from "../components/Header";
import axios from "axios";
import { baseSeriesUrl, ethToUsd } from "../utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Skeleton from "react-loading-skeleton";
import { BiLayer } from "react-icons/bi";
import Deal from "../components/Deal";

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
        Math.round((totalPrice += artObject.price));
      }
    });
    return totalPrice;
  };

  const totalPricesSum = sumArtPrices(main_data?.art);
  document.title = `${main_data?.owner?.username}'s ${main_data?.title}`;

  const loggedInUser = localStorage.getItem("userId");
  const loggedInUserId = JSON.parse(loggedInUser);

  const [show_deal, setDeal] = useState(false);

  const onClose = () => setDeal(false);

  return (
    <div>
      <Header />
      <div className="top-profile flex">
        {!main_data ? (
          <Skeleton width={400} height={500} />
        ) : (
          <div className="left flex col">
            <div className="wrap flex">
              <img src={main_data?.image} alt="" />
              <div className="info flex col">
                <p className="flex" style={{ fontSize: ".6rem" }}>
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
                <p>worth </p>
                <h2>
                  {Math.round(totalPricesSum)}{" "}
                  <span style={{ fontSize: ".6rem", marginTop: "20px" }}>
                    ETH
                  </span>
                </h2>
              </div>
            </div>
            <div className="join flex border">
              <p>CREATOR</p>
              <div className="flex" style={{ gap: "2px" }}>
                <p style={{ fontSize: ".6rem", textTransform: "lowercase" }}>
                  @{main_data?.owner?.username.split(" ")}
                </p>
                <img
                  style={{ width: "25px", height: "25px", borderRadius: "50%" }}
                  src={main_data?.owner?.avatar}
                  alt=""
                  className="border"
                />
              </div>
            </div>
            <div className="btns flex col">
              {main_data?.owner?._id == loggedInUserId?._id ? (
                <button
                  style={{ background: "#333", color: "white", border: "none" }}
                >
                  UPDATE
                </button>
              ) : (
                <button
                  style={{ border: "none" }}
                  onClick={() => setDeal(true)}
                >
                  DEAL
                </button>
              )}
              {main_data?.owner?._id == loggedInUserId?._id ? (
                <button
                  className="border"
                  style={{
                    background: "white",
                    color: "black",
                  }}
                >
                  DELETE
                </button>
              ) : (
                <button
                  style={{
                    background: "white",
                    color: "black",
                    border: "1px solid #808090",
                  }}
                >
                  BUY ALL
                </button>
              )}
            </div>
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
                    style={{
                      background: "white",
                      color: "black",
                      border: "1px solid #808090",
                    }}
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
                      onClick={() => navigate(`/user/${main_data?.owner?._id}`)}
                    >
                      <img src={main_data?.owner?.avatar} alt="" />
                      <h2 style={{ textTransform: "lowercase" }}>
                        @{main_data?.owner?.username.split(" ")}
                      </h2>
                    </div>
                    <div className="line border"></div>
                    <div className="price flex">
                      <h2>
                        {card_item?.price} ~{" "}
                        <span>${Math.round(card_item?.price * ethToUsd)}</span>
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
              );
            })}
          </div>
        )}
      </div>
      {show_deal && (
        <Deal
          onClose={onClose}
          title={main_data?.title}
          price={totalPricesSum}
        />
      )}
      <Footer />
    </div>
  );
};

export default MainSeries;
