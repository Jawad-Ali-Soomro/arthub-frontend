import React, { useState, useEffect } from "react";
import "../styles/Featured.scss";
import axios from "axios";
import { baseArtUrl, ethToUsd } from "../utils/constant";
import { useNavigate } from "react-router-dom";

const Featured = () => {
  const navigate = useNavigate();
  const [main_data, set_data] = useState();

  const fetch_data = async () => {
    try {
      const response = await axios.get(`${baseArtUrl}/get/featured/images`);
      const featuredImages = response.data.data;
      const shuffledImages = shuffleArray(featuredImages);
      const randomFeaturedImages = shuffledImages.slice(0, 3);
      set_data(randomFeaturedImages);
    } catch (error) {
      console.error("Error fetching featured images:", error);
    }
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    fetch_data();
  }, []);

  return (
    <div className="featuerd-wrap flex col">
      <h1>Featured Art</h1>
      <p>Explore the boundless creativity and inspiration of featured art.</p>
      {main_data == undefined ? (
        <div
          className="wrapper flex"
          style={{
            height: "500px",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <img src="/loader.svg" style={{ width: "50px" }} alt="" />
          <img src="/loader.svg" style={{ width: "50px" }} alt="" />
          <img src="/loader.svg" style={{ width: "50px" }} alt="" />
        </div>
      ) : (
        <div className="wrapper flex">
          {main_data?.map((card_item) => (
            <div className="card flex col" key={card_item._id}>
              <div className="img-sect flex">
                <img
                  className="border"
                  src={card_item?.image}
                  alt={card_item?.title}
                  onClick={() => navigate(`/art/${card_item?._id}`)}
                />
              </div>
              <div className="info flex col">
                <h2>{card_item?.title}</h2>
                <div
                  className="owner flex"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/user/${card_item?.owner?._id}`)}
                >
                  <div className="left flex">
                    <img
                      className="border"
                      src={card_item?.owner?.avatar}
                      alt={card_item?.owner?.username.split(" ")}
                    />
                    <h3 style={{ textTransform: "lowercase" }}>
                      @{card_item?.owner?.username.split(" ")}
                    </h3>
                  </div>
                </div>
                <div className="border"></div>
                <div className="price flex">
                  <h2>
                    {card_item?.price} ~{" "}
                    <span>${Math.round(card_item?.price * ethToUsd)}</span>
                  </h2>
                  <button
                    className="flex"
                    onClick={() => navigate(`/art/${card_item?._id}`)}
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Featured;
