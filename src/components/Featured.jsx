import React, { useState, useEffect } from "react";
import "../styles/Featured.scss";
import axios from "axios";
import { baseArtUrl, ethToUsd, formatPrice } from "../utils/constant";
import { useNavigate } from "react-router-dom";

const Featured = () => {
  const navigate = useNavigate();
  const [main_data, set_data] = useState();
  const [hoveredImage, setHoveredImage] = useState(null);

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
  const themeMode = window.localStorage.getItem("themeMode");

  useEffect(() => {
    fetch_data();
  }, [themeMode]);

  return (
    <div className="featuerd-wrap flex col">
      <h1 data-aos="fade-right">Featured Art</h1>
      {/* <p data-aos="fade-right" data-aos-delay="300">
        explore the boundless creativity and inspiration of featured art.
      </p> */}
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
                <div
                  className="owner flex"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/user/${card_item?.owner?._id}`)}
                >
                  <div className="left flex">
                    <img
                      src={card_item?.owner?.avatar}
                      onMouseEnter={() => setHoveredImage(card_item?._id)}
                      onMouseLeave={() => setHoveredImage(null)}
                      alt={card_item?.owner?.username.split(" ")}
                    />
                    <h3 style={{ textTransform: "lowercase" }}>
                      @{card_item?.owner?.username.split(" ")}
                    </h3>
                    {hoveredImage === card_item?._id && (
                      <div className="image-popup">
                        <img
                          src={card_item?.owner?.avatar}
                          alt={card_item?.owner?.username}
                          className="large-image"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="border"></div>
                <div className="price flex">
                  <h2>
                    {card_item?.price}Ξ
                    <span>(${formatPrice(card_item?.price * ethToUsd)})</span>
                  </h2>
                  <button
                    className="flex"
                    style={{
                      background: "royalblue",
                      color: "white",
                      border: `${
                        themeMode === "light" ? "1px  solid #80808090" : "none"
                      }`,
                    }}
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
