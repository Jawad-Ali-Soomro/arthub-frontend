import React, { useEffect } from "react";
import "../styles/mainSeries.scss";
import Header from "../components/Header";
import axios from "axios";
import { baseSeriesUrl, ethToUsd } from "../utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";

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
  return (
    <div>
      <Header />
      <div className="top-series flex">
        <div className="left-image flex">
          <img src={main_data?.image} alt="" />
        </div>
        <div className="right-content flex col">
          <h1>{main_data?.title}</h1>
          <div className="owner flex">
            <img src={main_data?.owner?.avatar  } alt="" />
            <h2>{main_data?.owner?.username}</h2>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainSeries;
