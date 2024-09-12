import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Notifications.scss";
import { useState } from "react";
import axios from "axios";
import { baseDealUrl, baseSeriesUrl } from "../utils/constant";
import { useEffect } from "react";

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
  // console.log(dealData);

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
            {/* <h1 style={{ fontWeight: 900 }}>Deals</h1> */}
            <div className="wrap flex col">
              {dealData?.map((item) => {
                return (
                  <div
                    className="card flex"
                    style={{
                      background: `${
                        themeMode == "dark" ? "rgba(255,255,255,.05)" : "#eee"
                      }`,
                    }}
                  >
                    <div className="info flex">
                      <img src={item?.offeringUser?.avatar} alt="" />
                      <p>
                        @{item?.offeringUser?.handle} offered (
                        {item?.offeringPrice}eth) on art ({item?.artId?.title})
                      </p>
                    </div>
                    <div className="btns flex">
                      <button>Accept</button>
                      <button>Deny</button>
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
