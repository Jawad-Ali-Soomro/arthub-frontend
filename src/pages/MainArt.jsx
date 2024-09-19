import React, { useEffect, useState } from "react";
import "../styles/MainArt.scss";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseArtUrl, baseUserUrl, ethToUsd } from "../utils/constant";
import { BiHeart, BiScan } from "react-icons/bi";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import "react-loading-skeleton/dist/skeleton.css";
import Footer from "../components/Footer";
import ImageModal from "../components/ImageModal";
import Popup from "../components/DeletePopup";
import Deal from "../components/Deal";
import Buy from "../components/Buy";
import toast from "react-hot-toast";

const MainArt = () => {
  const [main_data, set_data] = useState();
  const [more_data, set_more] = useState();
  const [show_desc, set_desc] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const navigate = useNavigate();
  const { artId } = useParams();
  const loggedInUser = localStorage.getItem("userId");
  const loggedInUserId = JSON.parse(loggedInUser);
  const [deal_opt, set_deal] = useState(false);
  const [buy_opt, set_buy] = useState(false);
  const themeMode = window.localStorage.getItem("themeMode");
  const [show_details, set_details] = useState(false);

  const fetch_data = async () => {
    await axios
      .get(`${baseArtUrl}/get/art/${artId}`)
      .then((res) => set_data(res.data.data));
  };
  const fetch_more = async () => {
    await axios
      .get(`${baseUserUrl}/get/${main_data?.owner?._id}`)
      .then((res) => {
        set_more(res.data.data.art.splice(0, 3));
      });
  };
  useEffect(() => {
    fetch_data();
  }, [artId]);

  useEffect(() => {
    fetch_more();
  });
  document.title = `${main_data?.owner?.username}'s ${main_data?.title}`;
  const closeModal = () => setShowImage(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleDelete = async () => {
    const res = await axios.delete(`${baseArtUrl}/delete/${main_data?._id}`);
    setShowPopup(false);
    toast.success(res.data.message, {
      style: {
        background: "white",
        color: "black",
        borderRadius: "20px",
      },
    });

    navigate(`/user/${main_data?.owner?._id}`);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  const onClose = () => set_deal(false) + set_buy(false);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const img = new Image();
    img.src = main_data?.image;

    img.onload = () => {
      setImageDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
  }, [main_data?.image]);

  return (
    <div>
      <Header />
      <div className="main-art flex">
        <div
          className="main-art-left"
          style={{
            background: `${
              themeMode == "dark" ? "rgba(255,255,255,.05)" : "#eee"
            }`,
          }}
        >
          {main_data == undefined ? (
            <div className="wrap flex">
              <img src="/loader.svg" style={{ width: "50px" }} alt="" />
            </div>
          ) : (
            <img
              src={main_data?.image}
              alt=""
              onClick={() => {
                setShowImage(true);
              }}
            />
          )}
        </div>
        {main_data == undefined ? (
          <div className="wrap flex" style={{ width: "400px" }}>
            <img src="/loader.svg" style={{ width: "50px" }} alt="" />
          </div>
        ) : (
          <div className="main-art-right flex col">
            <div className="top flex col">
              <div className="icons flex">
                <div
                  style={{
                    background: "royalblue",
                    color: "white",
                    border: "none",
                  }}
                  className="icon border flex"
                >
                  <BiHeart />
                </div>{" "}
                <div
                  className="icon border flex"
                  style={{
                    background: "royalblue",
                    color: "white",
                    border: "none",
                  }}
                  onClick={() => {
                    set_details(true);
                  }}
                >
                  <BiScan />
                </div>
              </div>
              <h1>{main_data?.title}</h1>
            </div>
            <div
              className="owner-series flex"
              style={{
                justifyContent: `${
                  main_data?.series[0] !== undefined ? "space-between" : "end"
                }`,
              }}
            >
              <div
                className="owner flex"
                onClick={() => navigate(`/user/${main_data?.owner?._id}`)}
              >
                <img src={main_data?.owner?.avatar} alt="" />
                <div className="flex col" style={{ alignItems: "start" }}>
                  <p
                    style={{
                      fontSize: ".4rem",
                      textTransform: "uppercase",
                    }}
                  >
                    OWNER
                  </p>
                  <h2>{main_data?.owner?.username}</h2>
                </div>
              </div>
              {main_data?.series[0] !== undefined ? (
                <div
                  className="owner flex"
                  onClick={() =>
                    navigate(`/series/${main_data?.series[0]._id}`)
                  }
                >
                  <img src={main_data?.series[0]?.image} alt="" />
                  <div className="flex col" style={{ alignItems: "start" }}>
                    <p
                      style={{ fontSize: ".4rem", textTransform: "uppercase" }}
                    >
                      Series
                    </p>

                    <h2>{main_data?.series[0]?.title}</h2>
                  </div>
                </div>
              ) : (
                this
              )}
            </div>
            <div className="line"></div>
            <div className="price flex">
              <p>PRICE</p> &nbsp;:&nbsp;
              {main_data?.price >= 0.001
                ? `${main_data?.price}Ξ(${Math.round(
                    main_data?.price * ethToUsd
                  )})`
                : "NOT FOR SALE (DEALS ONLY)"}
              {main_data?.price >= 1000 ? (
                <div
                  className="tag-main flex"
                  style={{
                    padding: "7px 20px",
                    background: "#333",
                    color: "white",
                    textTransform: "uppercase",
                    fontSize: ".6rem",
                    marginBottom: "30px",
                    fontWeight: "600",
                  }}
                >
                  rare
                </div>
              ) : (
                this
              )}
            </div>
            <div className="btns flex">
              {main_data?.owner?._id == loggedInUserId?._id ? (
                this
              ) : (
                <button
                  className="border"
                  onClick={() => {
                    set_buy(true);
                  }}
                  disabled={main_data?.price <= 0}
                  style={{
                    cursor: `${
                      main_data?.price <= 0 ? "not-allowed" : "pointer"
                    }`,
                    opacity: main_data?.price <= 0 ? 0.5 : 1, // optional: opacity to visually show disabled state
                  }}
                >
                  BUY
                </button>
              )}
              {main_data?.owner?._id == loggedInUserId?._id ? (
                <button
                  style={{
                    width: "400px",
                    background: "red",
                    color: "white",
                    border: "none",
                  }}
                  onClick={() => setShowPopup(true)}
                >
                  DELETE
                </button>
              ) : (
                <button
                  style={{
                    background: "royalblue",
                    color: "white",
                    border: "none",
                  }}
                  onClick={() => {
                    set_deal(true);
                  }}
                >
                  DEAl
                </button>
              )}
            </div>
            <div className="desciption flex">
              {show_desc == true ? (
                <p>{main_data?.description}</p>
              ) : (
                <p>{main_data?.description.substring(0, 100)}...</p>
              )}
            </div>
            <div className="more flex">
              <button
                style={{
                  background: "royalblue",
                  color: "white",
                  border: "none",
                }}
                onClick={() => set_desc(!show_desc)}
              >
                {show_desc == true ? <FaArrowUp /> : <FaArrowDown />}
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="more-by-artist flex col">
        <h1>
          More From {main_data?.owner?.username}{" "}
          <button
            style={{
              background: "royalblue",
              color: "white",
              border: "none",
            }}
            onClick={() => navigate(`/user/${main_data?.owner?._id}`)}
          >
            Profile
          </button>
        </h1>
        {more_data == undefined ? (
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
            {more_data.map((card_item) => {
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
                      style={{ gap: "5px" }}
                    >
                      <img
                        style={{ border: "none" }}
                        src={main_data?.owner?.avatar}
                        alt=""
                      />
                      <div className="wrap flex col">
                        <h2 style={{ textTransform: "lowercase" }}>
                          @{main_data?.owner?.username.split(" ")}
                        </h2>
                      </div>
                    </div>
                    <div className="line border"></div>
                    <div className="price flex">
                      <h2>
                        {card_item?.price}Ξ{""}
                        <span>
                          (${Math.round(card_item?.price * ethToUsd)})
                        </span>
                      </h2>
                      <button
                        style={{
                          background: "royalblue",
                          color: "white",
                          border: "none",
                        }}
                        onClick={() => navigate(`/art/${card_item?._id}`)}
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

      {showImage == true ? (
        <ImageModal imageUrl={main_data?.image} onClose={closeModal} />
      ) : (
        this
      )}
      {showPopup && (
        <Popup
          message="this action cannot be undone all information associated with this art will be deleted!"
          onConfirm={handleDelete}
          onCancel={handleCancel}
        />
      )}

      {deal_opt == true ? (
        <Deal
          onClose={onClose}
          artId={main_data?._id}
          artOwnerId={main_data?.owner?._id}
          title={main_data?.title}
          price={main_data?.price}
        />
      ) : (
        this
      )}
      {show_details == true ? (
        <div className="details-wrap flex" onClick={() => set_details(false)}>
          <div
            className="information border flex col"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: `${themeMode == "dark" ? "#212121" : "white"}`,
              color: `${themeMode == "dark" ? "white" : "black"}`,
            }}
          >
            <h1 style={{ border: "none" }}>Details</h1>
            <div className="card flex">
              <p>Title</p>
              <p>{main_data?.title}</p>
            </div>
            <div className="card flex">
              <p>Medium</p>
              <p>Image(png)</p>
            </div>
            <div className="card flex">
              <p>Price</p>
              <p>
                {main_data?.price}
                <sup>(eth)</sup>
              </p>
            </div>
            <div className="card flex">
              <p>contract address</p>
              <p>
                {main_data?.owner?.wallet_address.substring(0, 5)}...
                {main_data?.owner?.wallet_address.substring(
                  main_data?.owner?.wallet_address.length - 5
                )}
                <span>COPY</span>
              </p>
            </div>
            <div className="card flex">
              <p>dimension</p>
              <p style={{ textTransform: "lowercase" }}>
                {imageDimensions.width}px * {imageDimensions.height}px
              </p>
            </div>
            <div className="tags flex">
              <div className="tag border flex">
                <a
                  target="_blank"
                  href={`${baseArtUrl}/get/art/${artId}`}
                  className="flex"
                  style={{
                    gap: "5px",
                    textDecoration: "none",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <img src="/ether.svg" alt="" />
                  Metadata
                </a>
              </div>
              <div className="tag border flex">
                <a
                  target="_blank"
                  href={`https://etherscan.io/address/${main_data?.owner?.wallet_address}`}
                  className="flex"
                  style={{
                    gap: "5px",
                    textDecoration: "none",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <img src="/ether-scan.svg" alt="" />
                  Etherscan
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        this
      )}
      {buy_opt && (
        <Buy
          onClose={onClose}
          title={main_data?.title}
          price={main_data?.price}
          receiverAddress={main_data?.owner?.wallet_address}
        />
      )}
      <Footer />
    </div>
  );
};

export default MainArt;
