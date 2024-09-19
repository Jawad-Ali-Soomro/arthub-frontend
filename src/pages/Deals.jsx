import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Notifications.scss";
import axios from "axios";
import {
  baseDealUrl,
  baseTransactionUrl,
  ethToUsd,
  formatPrice,
} from "../utils/constant";
import toast from "react-hot-toast";
import Warning from "./Warning";
import { useNavigate } from "react-router-dom";

const Deals = () => {
  const userId = window.localStorage.getItem("userId");
  const parsedUser = JSON.parse(userId);

  const [dealData, setDealData] = useState();
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const [selectedDeal, setSelectedDeal] = useState(null); // To store selected deal details

  const dealsFetching = async () => {
    const res = await axios.get(`${baseDealUrl}/get/${parsedUser?._id}`);
    setDealData(res.data.foundDeals);
  };

  useEffect(() => {
    dealsFetching();
  }, [dealData]);

  const themeMode = window.localStorage.getItem("themeMode");

  const acceptDeal = async ({ artId, artReciever, price }) => {
    const res = await axios.post(`${baseTransactionUrl}/create`, {
      artId: artId,
      artReciever: artReciever,
      artOwner: parsedUser?._id,
      price,
      transaction_address: "sample",
    });
    const successMessage = res.data.message == "Transaction Done!";
    if (successMessage) {
      toast.success("Art Transferred", {
        style: {
          background: "white",
          color: "black",
          borderRadius: "20px",
        },
      });
    } else {
      toast.error("Error During Transfer", {
        style: {
          background: "white",
          color: "black",
          borderRadius: "20px",
        },
      });
    }
  };

  const rejectDeal = async ({ id }) => {
    const res = await axios.delete(`${baseDealUrl}/delete/${id}`);
    toast.success(res.data.message, {
      style: {
        background: "white",
        color: "black",
        borderRadius: "20px",
      },
    });
  };

  const handleAcceptClick = (deal) => {
    setSelectedDeal(deal); // Store the selected deal
    setShowPopup(true); // Show the confirmation popup
  };

  const handleConfirm = () => {
    acceptDeal({
      artId: selectedDeal.artId?._id,
      artReciever: selectedDeal.offeringUser?._id,
      price: selectedDeal.offeringPrice,
    });
    setShowPopup(false); // Hide the popup after confirming
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  const navigate = useNavigate();

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
                      <img
                        onClick={() => navigate(`/art/${item?.artId?._id}`)}
                        src={item?.artId?.image}
                        alt=""
                      />
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
                      <p style={{ fontFamily: "inter" }}>
                        {item?.offeringPrice}Ξ($
                        {formatPrice(item?.offeringPrice * ethToUsd)})
                      </p>
                    </div>
                    <div className="line border"></div>
                    <div className="btns flex">
                      <button
                        style={{
                          background:
                            item?.artId?.owner !== parsedUser?._id
                              ? "#eee"
                              : "royalblue",
                          color:
                            item?.artId?.owner !== parsedUser?._id
                              ? "black"
                              : "white",
                          cursor:
                            item?.artId?.owner !== parsedUser?._id
                              ? "not-allowed"
                              : "pointer",
                          border: "none",
                        }}
                        onClick={() => handleAcceptClick(item)} // Open the popup on click
                        disabled={item?.artId?.owner !== parsedUser?._id}
                      >
                        {item?.artId?.owner === parsedUser?._id
                          ? "ACCEPT"
                          : "ACCEPTED"}
                      </button>
                      {item?.artId?.owner !== parsedUser?._id ? (
                        this
                      ) : (
                        <button
                          style={{
                            background: "red",
                            color: "white",
                            border: "none",
                          }}
                          onClick={() => rejectDeal({ id: item?._id })}
                        >
                          REJECT
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {showPopup && (
        <Warning
          message="Please confirm you have received the payment. if not cancel the deal!"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      <Footer />
    </div>
  );
};

export default Deals;
