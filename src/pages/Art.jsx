import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { baseArtUrl, ethToUsd } from "../utils/constant";
import "../styles/Explore.scss";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Skeleton from "react-loading-skeleton";

const Art = () => {
  document.title = "Explore Art";
  const navigate = useNavigate();
  const [mainData, setMainData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseArtUrl}/get/all`);
      setMainData(response.data.data);
    } catch (error) {
      console.error("Error fetching art data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div className="explore-wrapper flex col">
        <section className="flex">
          <h1 className="flex col">
            Explore <span>Discover & Collect Crypto Art.</span>
          </h1>
          <button>
            <img src="../public/filter.svg" alt="Filter" />
          </button>
          <div className="length flex">
            <p>
              {mainData.length === 0
                ? "Fetching..."
                : `${mainData.length} Results Found!`}
            </p>
          </div>
        </section>
        {mainData.length === 0 ? (
          <div className="main-data flex">
            <Skeleton width={350} height={380} />
            <Skeleton width={350} height={380} />
            <Skeleton width={350} height={380} />
          </div>
        ) : (
          <div className="main-data flex">
            {mainData.map((cardItem) => (
              <div className="card flex" key={cardItem._id}>
                <img src={cardItem.image} alt={cardItem.title} />
                <div className="info flex col">
                  <h3>{cardItem.title}</h3>
                  <div
                    className="owner flex"
                    onClick={() => navigate(`/user/${cardItem.owner?._id}`)}
                  >
                    <img
                      src={cardItem.owner?.avatar}
                      alt={cardItem.owner?.username}
                    />
                    <div className="wrap flex col">
                      <p>ARTIST</p>
                      <h2>{cardItem.owner?.username}</h2>
                    </div>
                  </div>
                  <div className="price flex col">
                    <p>Price</p>
                    <h2>
                      {cardItem.price} ≈{" "}
                      <span>${cardItem.price * ethToUsd}</span>
                    </h2>
                  </div>
                  <div className="btns flex">
                    <button onClick={() => navigate(`/art/${cardItem._id}`)}>
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Art;
