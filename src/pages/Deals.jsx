import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Notifications.scss";
import { useState } from "react";
import axios from "axios";
import { baseDealUrl, ethToUsd, formatPrice } from "../utils/constant";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Deals = () => {
  const userId = window.localStorage.getItem("userId");
  const parsedUser = JSON.parse(userId);

  const [dealData, setDealData] = useState();
  const dealsFetching = async () => {
    const res = await axios.get(`${baseDealUrl}/get/${parsedUser?._id}`);
    setDealData(res.data.foundDeals);
  };
  useEffect(() => {
    dealsFetching();
  }, [dealData]);

  const themeMode = window.localStorage.getItem("themeMode");

  const rejectDeal = async ({ id }) => {
    const res = await axios.delete(`${baseDealUrl}/delete/${id}`);
    toast.success(res.data.message);
  };

  return (
    <div>
      <Header />
      <div className="notification-container flex col">
        {!dealData ? (
          <div className="wrap flex col">
            <h1>Deals</h1>
            <p>You Don't Have Any Deals Yet!</p>
          </div>
        ) : (
          <div className="wrap flex col">
            <h1 style={{ fontWeight: 900 }}>Deals</h1>
            <div
              className="card-wrap flex"
              style={{
                justifyContent: `${
                  dealData?.length < 3 ? "start" : "space-between"
                }`,
              }}
            >
              {dealData?.map((item) => {
                return (
                  <div className="card flex col">
                    <div
                      className="img-sect flex"
                      style={{
                        background: `${
                          themeMode == "dark" ? "rgba(255,255,255,.05)" : "#eee"
                        }`,
                      }}
                    >
                      <img src={item?.artId?.image} alt="" />
                    </div>
                    <h2
                      style={{
                        fontSize: "1.2rem",
                        paddingLeft: "20px",
                        fontWeight: 600,
                      }}
                    >
                      {item?.artId?.title}
                    </h2>
                    <div className="offered-by flex">
                      <img src={item?.offeringUser?.avatar} alt="" />
                      <div className="flex col" style={{ alignItems: "start" }}>
                        <p
                          style={{
                            fontSize: ".5rem",
                            lineHeight: "5px",
                            paddingLeft: "2px",
                          }}
                        >
                          OFFERED BY
                        </p>
                        <p>@{item?.offeringUser?.handle}</p>
                      </div>
                    </div>
                    <div
                      className="offering-price flex col"
                      style={{ alignItems: "end", justifyContent: "end" }}
                    >
                      <p
                        style={{
                          fontSize: ".5rem",
                          textTransform: "uppercase",
                        }}
                      >
                        Offering Price
                      </p>
                      <p>
                        {item?.offeringPrice}Ξ($
                        {formatPrice(item?.offeringPrice * ethToUsd)})
                      </p>
                    </div>
                    <div className="line border"></div>
                    <div className="btns flex">
                      <button
                        style={{
                          background: "#eee",
                          color: "black",
                          border: "none",
                        }}
                      >
                        ACCEPT
                      </button>
                      <button
                        style={{
                          background: "red",
                          color: "white",
                          border: "none",
                        }}
                        onClick={() => rejectDeal({ id: item?.artId?._id })}
                      >
                        REJECT
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Deals;
