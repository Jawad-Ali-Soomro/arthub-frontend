import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUserUrl, ethToUsd, formatPrice } from "../utils/constant";
import { useNavigate } from "react-router-dom";

const Spotlight = () => {
  const [main_data, set_data] = useState();
  const navigate = useNavigate();

  const fetch_data = async () => {
    try {
      const response = await axios.get(
        `${baseUserUrl}/get/66e102fec85c33fa8d758d35`
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

  const themeMode = window.localStorage.getItem("themeMode");
  useEffect(() => {
    fetch_data();
  }, [themeMode]);
  return (
    <div>
      <div className="featuerd-wrap flex col" style={{ marginTop: "0px" }}>
        <h1
          data-aos="fade-right"
          style={{ width: "100%", justifyContent: "space-between" }}
        >
          Artist Spotlight : Botto{" "}
          <button
            className="border"
            onClick={() => navigate("/user/66e102fec85c33fa8d758d35")}
          >
            See all
          </button>
        </h1>
        <p
          data-aos="fade-right"
          data-aos-delay="300"
          style={{ fontSize: ".8rem" }}
        >
          Through his animations, Botto explores the impact of contemporary
          culture on our everyday lives, offering a unique and fresh perspective
          on the world around us.
        </p>
        {main_data === undefined ? (
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
            {main_data.map((card_item) => (
              <div
                className="card flex col"
                data-aos="fade-right"
                data-aos-delay="600"
                key={card_item._id}
              >
                <div
                  className="img-sect flex"
                  style={{
                    background: `${
                      themeMode == "dark" ? "rgba(255,255,255,.05)" : "#eee"
                    }`,
                  }}
                >
                  <img
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
                      {card_item?.price}Ξ{""}
                      <span>(${formatPrice(card_item?.price * ethToUsd)})</span>
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
