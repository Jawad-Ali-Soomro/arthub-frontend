import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { baseArtUrl, ethToUsd } from "../utils/constant";
import "../styles/Explore.scss";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Skeleton from "react-loading-skeleton";

const Art = () => {
  const navigate = useNavigate();
  const [main_data, set_data] = useState();
  const fetch_data = async () => {
    await axios.get(`${baseArtUrl}/get/all`).then((res) => {
      set_data(res.data.data);
    });
  };
  useEffect(() => {
    fetch_data();
  });
  return (
    <div>
      <Header />
      <div className="explore-wrapper flex col">
        <section className="flex">
          <h1 className="flex col">
            Explore <span>Discover & Collect Crypto Art.</span>
          </h1>
        </section>
        {main_data == undefined ? (
          <div className="main-data flex">
            <Skeleton width={350} height={380} />
            <Skeleton width={350} height={380} />
            <Skeleton width={350} height={380} />
          </div>
        ) : (
          <div className="main-data flex">
            {main_data?.map((card_item) => {
              return (
                <div className="card flex">
                  <img src={card_item?.image} alt="" />
                  <div className="info flex col">
                    <h3>{card_item?.title}</h3>
                    <div className="owner flex">
                      <img src={card_item?.owner?.avatar} alt="" />
                      <div className="wrap flex col">
                        <p>ARTIST</p>
                        <h2>{card_item?.owner?.username}</h2>
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

export default Art;
