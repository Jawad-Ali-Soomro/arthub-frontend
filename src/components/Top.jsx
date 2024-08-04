import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseArtUrl, ethToUsd } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import "../styles/Top.scss";
import Skeleton from "react-loading-skeleton";

const Top = () => {
  const navigate = useNavigate();
  const [main_data, set_data] = useState();

  const fetch_data = async () => {
    try {
      const response = await axios.get(`${baseArtUrl}/get/featured/images`);
      const featuredImages = response.data.data;
      const shuffledImages = shuffleArray(featuredImages);
      const randomFeaturedImages = shuffledImages.slice(0, 1);
      set_data(randomFeaturedImages[0]);
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
    <div className="top-wrap flex">
      <div className="left">
        {main_data == undefined ? (
          <Skeleton width={500} height={550} />
        ) : (
          <img src={main_data?.image} alt="" style={{ borderRadius: "20px" }} />
        )}
      </div>
      {main_data == undefined ? (
        <Skeleton width={500} height={300} />
      ) : (
        <div className="right flex col">
          <h1>{main_data?.title}</h1>
          {/* <div className="tags flex">
            {main_data?.tags?.slice(0, 2)?.map((tag) => {
              return (
                <p className="border" style={{ borderRadius: "10px" }}>
                  {tag}
                </p>
              );
            })}
          </div> */}
          <div
            className="profile-wrap flex"
            onClick={() => navigate(`/user/${main_data?.owner?._id}`)}
          >
            <img className="border" src={main_data?.owner?.avatar} alt="" />
            <h2>{main_data?.owner?.handle}</h2>
          </div>
          <div className="price-wrap flex col" style={{ alignItems: "start" }}>
            <p>PRICE</p>
            <h2>
              {main_data?.price} Ξ <span>${main_data?.price * ethToUsd}</span>
            </h2>
          </div>
          <div className="btns-wrap flex">
            <button
              className="border"
              onClick={() => navigate(`/art/${main_data?._id}`)}
            >
              BUY
            </button>
            <button>DEAL</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Top;
