import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { baseSeriesUrl } from "../utils/constant";
import "../styles/Explore.scss";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Skeleton from "react-loading-skeleton";
import { BsFilter } from "react-icons/bs";

const Series = () => {
  const navigate = useNavigate();
  const [main_data, set_data] = useState();

  const fetch_data = async () => {
    await axios.get(`${baseSeriesUrl}/get/all`).then((res) => {
      set_data(res.data.data);
    });
  };

  useEffect(() => {
    fetch_data();
  }, []);

  return (
    <div>
      <Header />
      <div className="explore-wrapper flex col">
        <section className="flex">
          <h1 className="flex col">Collections</h1>
          <button
            className="border"
            onClick={() => setIsFilterVisible(!isFilterVisible)}
          >
            <BsFilter />
          </button>
          <div className="length flex" style={{ borderRadius: "10px" }}>
            <p>{main_data == undefined ? "0" : main_data?.length}</p>
          </div>
        </section>
        {main_data == undefined ? (
          <div
            className="loader flex"
            style={{
              marginTop: "150px",
              justifyContent: "space-around",
            }}
          >
            <img src="/loader.svg" style={{ width: "50px" }} alt="Loading..." />
            <img src="/loader.svg" style={{ width: "50px" }} alt="Loading..." />
            <img src="/loader.svg" style={{ width: "50px" }} alt="Loading..." />
          </div>
        ) : (
          <div className="main-data wrapper flex">
            {main_data?.map((card_item) => (
              <div className="card flex col" key={card_item._id}>
                <div className="img-sect flex">
                  <img
                    className="border"
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
                        className="border"
                        src={card_item?.owner?.avatar}
                        alt={card_item?.owner?.username}
                      />
                      <h3 style={{ textTransform: "lowercase" }}>
                        @{card_item?.owner?.username.split(" ")}
                      </h3>
                    </div>
                  </div>
                  <div className="border"></div>
                  <div className="price flex">
                    <h2> ~ </h2>
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
      <Footer />
    </div>
  );
};

export default Series;
