import React, { useEffect, useState } from "react";
import "../styles/mainSeries.scss";
import Header from "../components/Header";
import axios from "axios";
import { baseSeriesUrl, baseUserUrl, ethToUsd } from "../utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { BiLayer } from "react-icons/bi";
import Buy from "../components/Buy";
import toast from "react-hot-toast";

const MainSeries = () => {
  const [main_data, set_data] = useState();
  const navigate = useNavigate();
  const { seriesId } = useParams();

  const fetch_data = async () => {
    await axios.get(`${baseSeriesUrl}/get/${seriesId}`).then((res) => {
      set_data(res.data.data);
    });
  };

  useEffect(() => {
    fetch_data();
  }, [seriesId]);

  const sumArtPrices = (artArray) => {
    let totalPrice = 0;
    artArray?.forEach((artObject) => {
      if (artObject?.price) {
        Math.round((totalPrice += artObject.price));
      }
    });
    return totalPrice;
  };

  const totalPricesSum = sumArtPrices(main_data?.art);
  document.title = `${main_data?.owner?.username}'s ${main_data?.title}`;

  const loggedInUser = localStorage.getItem("userId");
  const loggedInUserId = JSON.parse(loggedInUser);
  const [showBuy, setBuy] = useState(false);

  const onClose = () => setDeal(false) + setBuy(false) + setArtPopup(false);

  const themeMode = window.localStorage.getItem("themeMode");
  const userId = window.localStorage.getItem("userId");
  const parsedUserId = JSON.parse(userId);

  const [showArtPopup, setArtPopup] = useState(false);
  const [artData, setArtData] = useState();

  const getUserArts = async () => {
    const gotArts = await axios.get(`${baseUserUrl}/get/${parsedUserId?._id}`);
    setArtData(gotArts?.data?.data?.art);
  };

  useEffect(() => {
    getUserArts();
  });

  const [artToAddData, setArtToAddData] = useState();
  const [selectedArtToAdd, setSelectedArtToAdd] = useState();

  const getArts = async () => {
    const res = await axios.get(`${baseUserUrl}/get/${main_data?.owner?._id}`);
    setArtToAddData(res?.data?.data?.art);
  };

  const addItemToSeries = async () => {
    const artToAdd = selectedArtToAdd;
    const seriesAddId = main_data?._id;
    if (!artToAdd) {
      toast.error("Plase Select Art To Add", {
        style: {
          background: "white",
          color: "black",
          borderRadius: "20px",
        },
      });
    } else {
      const res = await axios.post(`${baseSeriesUrl}/add/`, {
        art_id: artToAdd,
        series_id: seriesAddId,
      });
      if (res?.data?.message == `Added to ${main_data?.title}!`) {
        toast.success(`Added to ${main_data?.title}`, {
          style: {
            background: "white",
            color: "black",
            borderRadius: "20px",
          },
        }) + window.location.reload();
      } else {
        toast.error(res?.data?.message),
          {
            style: {
              background: "white",
              color: "black",
              borderRadius: "20px",
            },
          };
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="top-profile flex">
        {!main_data ? (
          <div
            className="wrap flex"
            style={{ width: "400px", height: "500px" }}
          >
            <img src="/loader.svg" style={{ width: "50px" }} alt="" />
          </div>
        ) : (
          <div className="left flex col">
            <div className="wrap flex">
              <img src={main_data?.image} alt="" />
              <div className="info flex col">
                <p
                  className="flex"
                  style={{ fontSize: ".6rem", marginTop: "20px" }}
                >
                  <BiLayer /> SERIES
                </p>
                <h1 style={{ marginBottom: "20px" }}>{main_data?.title}</h1>
              </div>
            </div>
            <div className="btns flex">
              <div className="sect flex border">
                <p>creations</p>
                <h2>{main_data?.art?.length}</h2>
              </div>
              <div className="sect flex border">
                <p>worth </p>
                <h2>
                  {Math.round(totalPricesSum)}{" "}
                  <span style={{ fontSize: ".6rem", marginTop: "20px" }}>
                    ETH
                  </span>
                </h2>
              </div>
            </div>
            <div className="join flex border">
              <p>ARTS</p>
              <div className="flex" style={{ gap: "2px" }}>
                <p style={{ paddingRight: "10px" }}>{main_data?.art?.length}</p>
                {main_data?.art?.slice(0, 3)?.map((item) => {
                  return (
                    <img
                      src={item?.image}
                      alt=""
                      style={{
                        width: "25px",
                        height: "25px",
                        borderRadius: "50%",
                      }}
                    />
                  );
                })}
              </div>
            </div>
            <div className="btns flex col">
              {main_data?.owner?._id == loggedInUserId?._id ? (
                <button
                  style={{ background: "#333", color: "white", border: "none" }}
                  onClick={() => setArtPopup(true) + getArts()}
                >
                  ADD ART
                </button>
              ) : (
                <button
                  style={{ border: "none" }}
                  onClick={() =>
                    loggedInUserId
                      ? navigate("/chat") +
                        toast.success("Conversation Initialized!", {
                          style: {
                            background: "white",
                            color: "black",
                            borderRadius: " 20px",
                          },
                        })
                      : toast.error("Please Login To Chat!", {
                          style: {
                            background: "white",
                            color: "black",
                            borderRadius: " 20px",
                          },
                        })
                  }
                >
                  MESSAGE
                </button>
              )}
              {main_data?.owner?._id == loggedInUserId?._id ? (
                <button
                  className="border"
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                  }}
                >
                  REMOVE ART
                </button>
              ) : (
                <button
                  style={{
                    background: "royalblue",
                    color: "white",
                    border: "none",
                  }}
                  onClick={() => setBuy(true)}
                >
                  BUY ALL
                </button>
              )}
            </div>
          </div>
        )}
        <div className="right flex col">
          {!main_data ? (
            <div
              className="wrap flex"
              style={{ width: "400px", height: "500px" }}
            >
              <img src="/loader.svg" style={{ width: "50px" }} alt="" />
            </div>
          ) : (
            <div className="card flex col">
              <div
                className="img-sect flex"
                style={{
                  background: `${
                    themeMode == "dark" ? "rgba(255,255,255,0.05)" : "#eee"
                  }`,
                }}
              >
                <img
                  src={main_data?.art[0]?.image}
                  alt=""
                  onClick={() => navigate(`/art/${main_data?.art[0]?._id}`)}
                />
              </div>
              <div className="info flex col">
                <h2>{main_data?.art[0]?.title}</h2>
                <div className="line border"></div>
                <div className="price flex">
                  <h2
                    style={{
                      fontSize: ".9rem",
                      fontWeight: "400",
                    }}
                  >
                    {main_data?.art[0]?.price}Ξ{""}
                    <span
                      style={{
                        fontSize: ".9rem",
                        fontWeight: "400",
                      }}
                    >
                      (${Math.round(main_data?.art[0]?.price * ethToUsd)})
                    </span>
                  </h2>
                  <button
                    className="flex"
                    style={{
                      background: "royalblue",
                      color: "white",
                      border: "1px solid #808090",
                    }}
                    onClick={() => navigate(`/art/${main_data?.art[0]?._id}`)}
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="more-by-artist flex col">
        <h1>
          Art In {main_data?.title}{" "}
          <button
            style={{
              background: "royalblue",
              color: "white",
            }}
            onClick={() => navigate(`/user/${main_data?.owner?._id}`)}
          >
            Profile
          </button>
        </h1>
        {main_data == undefined ? (
          <div
            className="wrapper flex"
            style={{
              height: "400px",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <img src="/loader.svg" style={{ width: "50px" }} alt="" />
            <img src="/loader.svg" style={{ width: "50px" }} alt="" />
            <img src="/loader.svg" style={{ width: "50px" }} alt="" />
          </div>
        ) : (
          <div className="wrapper flex">
            {main_data?.art?.map((card_item) => {
              return (
                <div className="card flex col" key={card_item?._id}>
                  <div
                    className="img-sect flex"
                    style={{
                      background: `${
                        themeMode == "dark" ? "rgba(255,255,255,0.05)" : "#eee"
                      }`,
                    }}
                    onClick={() => navigate(`/art/${card_item?._id}`)}
                  >
                    <img src={card_item?.image} alt="" />
                  </div>
                  <div className="info flex col">
                    <h3>{card_item?.title}</h3>
                    <div
                      className="owner flex"
                      onClick={() => navigate(`/user/${main_data?.owner?._id}`)}
                    >
                      <img src={main_data?.owner?.avatar} alt="" />
                      <h2 style={{ textTransform: "lowercase" }}>
                        @{main_data?.owner?.username.split(" ")}
                      </h2>
                    </div>
                    <div className="line border"></div>
                    <div className="price flex">
                      <h2
                        style={{
                          fontSize: ".9rem",
                          fontWeight: 400,
                        }}
                      >
                        {card_item?.price}Ξ{""}
                        <span
                          style={{
                            fontSize: ".9rem",
                            fontWeight: 400,
                          }}
                        >
                          (${Math.round(card_item?.price * ethToUsd)})
                        </span>
                      </h2>
                      <button
                        style={{
                          background: "royalblue",
                          color: "white",
                        }}
                        onClick={() => navigate(`/art/${card_item?._id}`)}
                      >
                        Buy
                      </button>
                    </div>
                    <div className="btns flex"></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showBuy && (
        <Buy
          title={"(series)" + main_data?.title}
          receiverAddress={main_data?.owner?.wallet_address}
          price={totalPricesSum}
          onClose={onClose}
        />
      )}

      {showArtPopup ? (
        <div className="art-to-add flex" onClick={() => setArtPopup(false)}>
          <div
            className="container flex col"
            style={{
              background: `${themeMode == "dark" ? "#212121" : "white"}`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h1>Add Item!</h1>
            <p>Remeber you can add one art at once!</p>
            <div className="art-mapper flex">
              {artToAddData?.map((art) => {
                return main_data?.art?.some((item) => item._id === art?._id) ? (
                  this
                ) : (
                  <img
                    src={art?.image}
                    onClick={() => setSelectedArtToAdd(art?._id)}
                    style={{
                      border: `${
                        selectedArtToAdd === art?._id
                          ? "2px solid royalblue"
                          : "2px solid transparent"
                      }`,
                    }}
                    alt=""
                  />
                );
              })}
            </div>
            <button onClick={addItemToSeries}>ADD</button>
          </div>
        </div>
      ) : (
        this
      )}

      <Footer />
    </div>
  );
};

export default MainSeries;
