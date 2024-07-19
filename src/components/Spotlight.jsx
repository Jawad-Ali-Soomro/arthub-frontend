import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseArtUrl, baseUserUrl, ethToUsd } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const Spotlight = () => {
  const [main_data, set_data] = useState();
  const navigate = useNavigate();

  const fetch_data = async () => {
    try {
      const response = await axios.get(
        `${baseUserUrl}/get/665ee1083d4db96d5541f387`
      );
      const featuredImages = response.data.data.art;
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
    <div>
      <div className="featuerd-wrap flex col" style={{ marginTop: "0px" }}>
        <h1 style={{ width: "100%", justifyContent: "space-between" }}>
          Artist Spotlight : Botto <button>See all</button>
        </h1>
        <p style={{ fontSize: ".8rem" }}>
          Through his animations, Botto explores the impact of contemporary
          culture on our everyday lives, offering a unique and fresh perspective
          on the world around us.
        </p>
        {main_data === undefined ? (
          <div className="wrapper flex">
            <Skeleton width={360} height={410} />
            <Skeleton width={360} height={410} />
            <Skeleton width={360} height={410} />
          </div>
        ) : (
          <div className="wrapper flex">
            {main_data.map((card_item) => (
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
                  <div className="border"></div>
                  <div className="price flex">
                    <h2>
                      {card_item?.price} ≈{" "}
                      <span>${card_item?.price * ethToUsd}</span>
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
    </div>
  );
};

export default Spotlight;
