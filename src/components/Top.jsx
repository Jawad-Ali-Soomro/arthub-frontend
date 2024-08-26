import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseArtUrl, ethToUsd } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import "../styles/Top.scss";

const Top = () => {
  const navigate = useNavigate();
  const [main_data, set_data] = useState();
  const [sideData, setData] = useState();
  const fetchSideData = async () => {
    try {
      const response = await axios.get(`${baseArtUrl}/get/featured/images`);
      const featuredImages = response.data.data;
      const shuffledImages = shuffleSideSata(featuredImages);
      const randomFeaturedImages = shuffledImages.slice(0, 3);
      setData(randomFeaturedImages);
    } catch (error) {
      console.error("Error fetching featured images:", error);
    }
  };

  const shuffleSideSata = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    fetch_data();
    fetchSideData();
  }, []);

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

  const image = main_data?.image;

  return (
    <div className="top-wrap flex" style={{ backgroundImage: image }}>
      <div
        className="left-wrap flex col"
        style={{ alignItems: "start", gap: "20px" }}
      >
        <div className="left" style={{ width: "380px", height: "410px" }}>
          {main_data == undefined ? (
            <div style={{ height: "550px" }}>
              <img src="/loader.svg" style={{ width: "50px" }} alt="" />
            </div>
          ) : (
            <img
              src={main_data?.image}
              onClick={() => navigate(`/art/${main_data?._id}`)}
              alt=""
              data-aos="fade-right"
            />
          )}
        </div>
        {main_data == undefined ? (
          // <div>
          //   <img src="/loader.svg" style={{ width: "50px" }} alt="" />
          // </div>
          this
        ) : (
          <div className="right flex col">
            <h1 data-aos="fade-right" data-aos-delay="600">
              {main_data?.title}
            </h1>
            <div
              className="profile-wrap flex"
              onClick={() => navigate(`/user/${main_data?.owner?._id}`)}
              data-aos-delay="900"
              data-aos="fade-right"
            >
              <img className="border" src={main_data?.owner?.avatar} alt="" />
              <h2>@{main_data?.owner?.handle.split(" ")}</h2>
            </div>
            <div
              className="line border"
              style={{ width: "380px" }}
              data-aos-delay="1200"
              data-aos="fade-right"
            ></div>
            <div
              className="price-wrap flex"
              data-aos-delay="1500"
              data-aos="fade-right"
            >
              <h2>
                {main_data?.price}Ξ{""}
                <span>(${Math.round(main_data?.price * ethToUsd)})</span>
              </h2>
              <button
                className="border"
                onClick={() => navigate(`/art/${main_data?._id}`)}
              >
                BUY
              </button>
            </div>
          </div>
        )}
      </div>
      {sideData == undefined ? (
        <div
          className="wrap flex col"
          style={{ height: "550px", gap: "100px" }}
        >
          <img src="/loader.svg" style={{ width: "50px" }} alt="" />
          <img src="/loader.svg" style={{ width: "50px" }} alt="" />
          <img src="/loader.svg" style={{ width: "50px" }} alt="" />
        </div>
      ) : (
        <div className="right-side-data flex col" style={{ gap: "20px" }}>
          {sideData?.map((side_data) => {
            return (
              <div
                className="card flex"
                data-aos-delay="1800"
                data-aos="fade-right"
              >
                <img
                  src={side_data?.image}
                  alt=""
                  onClick={() => set_data(side_data)}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Top;
