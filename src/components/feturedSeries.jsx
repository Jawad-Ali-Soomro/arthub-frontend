import React, { useState, useEffect } from "react";
import "../styles/Featured.scss";
import axios from "axios";
import { baseSeriesUrl } from "../utils/constant";
import { useNavigate } from "react-router-dom";

const FeaturedSeries = () => {
  const navigate = useNavigate();
  const [main_data, set_data] = useState();

  const fetch_data = async () => {
    try {
      const response = await axios.get(`${baseSeriesUrl}/get/all`);
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

  const [hoveredImage, setHoveredImage] = useState(null);
  return (
    <div className="featuerd-wrap flex col">
      <h1 data-aos="fade-right">Featured Series</h1>
      {/* <p data-aos="fade-right" data-aos-delay="300">
        explore the boundless creativity and inspiration of featured series.
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
        <div
          className="wrapper flex"
          data-aos="fade-right"
          data-aos-delay="600"
        >
          {main_data?.map((card_item) => (
            <div className="card flex col" key={card_item._id}>
              <div className="img-sect flex">
                <img
                  src={card_item?.image}
                  alt={card_item?.title}
                  onClick={() => navigate(`/series/${card_item?._id}`)}
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
                      onMouseEnter={() => setHoveredImage(card_item?._id)}
                      onMouseLeave={() => setHoveredImage(null)}
                      src={card_item?.owner?.avatar}
                      alt={card_item?.owner?.username}
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
                  <h2 style={{ textTransform: "capitalize" }}>
                    {/* {card_item?.art?.length} artworks */}
                  </h2>
                  <button
                    className="flex"
                    onClick={() => navigate(`/series/${card_item?._id}`)}
                  >
                    view
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

export default FeaturedSeries;
