import React, { useEffect } from "react";
import "../styles/mainSeries.scss";
import Header from "../components/Header";
import axios from "axios";
import { baseSeriesUrl, ethToUsd } from "../utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Skeleton from "react-loading-skeleton";

const MainSeries = () => {
  const [main_data, set_data] = React.useState();
  const navigate = useNavigate();
  const id = useParams().seriesId;
  const fetch_data = async () => {
    await axios.get(`${baseSeriesUrl}/get/${id}`).then((res) => {
      set_data(res.data.data);
    });
  };
  useEffect(() => {
    fetch_data();
  });

  const sumArtPrices = (artArray) => {
    let totalPrice = 0;
    artArray?.forEach((artObject) => {
      if (artObject?.price) {
        totalPrice += artObject?.price;
      }
    });
    return totalPrice;
  };
  const totalPricesSum = sumArtPrices(main_data?.art);
  document.title = `${main_data?.owner?.username}'s ${main_data?.title}`
  return (
    <div>
      <Header />
      <div className="top-series flex">
        <div className="left-image flex">
          {main_data == undefined ? (
            <Skeleton width={600} height={600} />
          ) : (
            <img src={main_data?.image} alt="" />
          )}
        </div>
        {main_data == undefined ? (
          <Skeleton width={400} height={400} style={{ marginTop: "200px" }} />
        ) : (
          <div className="right-content flex col">
            <h1>{main_data?.title}</h1>

            <div className="owner flex" onClick={() => navigate(`/user/${main_data?.owner?._id}`)}>
              <img src={main_data?.owner?.avatar} alt="" />
              <h2>{main_data?.owner?.username}</h2>
            </div>
            <div className="total-worth flex col">
              <p>Total Price</p>
              <h2>
                {totalPricesSum} ≈ ${totalPricesSum * ethToUsd}
              </h2>
            </div>
            <div className="description flex col">
              <h2>{main_data?.description}</h2>
            </div>
            <button>Buy All</button>
          </div>
        )}
      </div>
      <div className="more-by-artist flex col">
        <h1>
          Art In {main_data?.title} <button>Profile</button>
        </h1>
        {main_data == undefined ? (
          <div className="wrapper flex">
            <Skeleton width={350} height={380} />
            <Skeleton width={350} height={380} />
            <Skeleton width={350} height={380} />
          </div>
        ) : (
          <div className="wrapper flex">
            {main_data?.art?.map((card_item) => {
              return (
                <div className="card flex" key={card_item?._id}>
                  <img src={card_item?.image} alt="" />
                  <div className="info flex col">
                    <h3>{card_item?.title}</h3>
                    <div className="owner flex" onClick={() => navigate(`/user/${main_data?.owner?._id  }`)}>
                      <img src={main_data?.owner?.avatar} alt="" />
                      <h2>{main_data?.owner?.username}</h2>
                    </div>
                    <div className="price flex col">
                      <p>price</p>
                      <h2>
                        {card_item?.price} ≈{" "}
                        <span>${card_item?.price * ethToUsd}</span>
                      </h2>
                    </div>
                    <div className="btns flex">
                      <button
                        onClick={() => navigate(`/art/${card_item?._id}`) + window.location.reload()}
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MainSeries;
