import React, { useState, useEffect } from "react";
import "../styles/Featured.scss";
import axios from "axios";
import { baseArtUrl, ethToUsd } from "../utils/constant";

const Featured = () => {
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
      <div className="wrapper flex">
        {main_data?.map((card_item) => {
          return (
            <div className="card flex col">
              <div className="img-sect flex">
                <img className="border" src={card_item?.image} alt="" />
              </div>
              <div className="info flex col">
                <h2>{card_item?.title}</h2>
                <div className="owner flex">
                  <div className="left flex">
                    <img
                      className="border"
                      src={card_item?.owner?.avatar}
                      alt=""
                    />
                    <h3>{card_item?.owner?.username}</h3>
                  </div>
                  <div className="more border flex col">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                </div>
                <div className="border"></div>
                <div className="price flex">
                  <h2>
                    {card_item?.price} ≈{" "}
                    <span>${card_item?.price * ethToUsd}</span>
                  </h2>
                  <button className="flex">
                    Buy
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Featured;
