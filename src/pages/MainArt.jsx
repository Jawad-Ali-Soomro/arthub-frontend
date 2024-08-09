import React, { useEffect, useState } from "react";
import "../styles/MainArt.scss";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseArtUrl, baseUserUrl, ethToUsd } from "../utils/constant";
import { BiCart, BiData, BiHeart, BiLike, BiScan } from "react-icons/bi";
import { FaArrowDown, FaArrowUp, FaEthernet } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Footer from "../components/Footer";
import ImageModal from "../components/ImageModal";
import Popup from "../components/DeletePopup";
import Deal from "../components/Deal";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addToCart } from "../redux/cartSlice";
import { FaEthereum, FaHandshakeSimple } from "react-icons/fa6";
import { CgEthernet, CgScan } from "react-icons/cg";

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

  const handleDelete = () => {
    console.log("Item deleted");
    setShowPopup(false);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  const onClose = () => set_deal(false);
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

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const date = formatDate(main_data?.uploaded_at);
  return (
    <div>
      <Header />
      <div className="main-art flex">
        <div className="main-art-left">
          {main_data == undefined ? (
            <div className="wrap flex">
              <img src="/loader.svg" style={{ width: "50px" }} alt="" />
            </div>
          ) : (
            <img
              src={main_data?.image}
              alt=""
              onClick={() => setShowImage(true)}
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
                <div className="icon border flex">
                  <BiHeart />
                </div>{" "}
                <div
                  className="icon border flex"
                  onClick={() => set_details(true)}
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
                <img className="border" src={main_data?.owner?.avatar} alt="" />
                <div className="flex col" style={{ alignItems: "start" }}>
                  <p
                    style={{
                      fontSize: ".4rem",
                      textTransform: "uppercase",
                    }}
                  >
                    Artist
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
                  <img
                    className="border"
                    src={main_data?.series[0]?.image}
                    alt=""
                  />
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
              <p>PRICE</p> &nbsp; : &nbsp;
              {main_data?.price} ~ ${Math.round(main_data?.price * ethToUsd)}
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
                <button className="border">Update</button>
              ) : (
                <button className="border">BUY</button>
              )}
              {main_data?.owner?._id == loggedInUserId?._id ? (
                <button
                  className="border"
                  style={{ background: "white" }}
                  onClick={() => setShowPopup(true)}
                >
                  DELETE
                </button>
              ) : (
                <button className="border" onClick={() => set_deal(true)}>
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
              <button onClick={() => set_desc(!show_desc)}>
                {show_desc == true ? <FaArrowUp /> : <FaArrowDown />}
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="more-by-artist flex col">
        <h1>
          More From {main_data?.owner?.username}{" "}
          <button onClick={() => navigate(`/user/${main_data?.owner?._id}`)}>
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
                      <div className="wrap flex col">
                        <h2 style={{ textTransform: "lowercase" }}>
                          @{main_data?.owner?.username.split(" ")}
                        </h2>
                      </div>
                    </div>
                    <div className="line border"></div>
                    <div className="price flex">
                      <h2>
                        {card_item?.price} ~{" "}
                        <span>${Math.round(card_item?.price * ethToUsd)}</span>
                      </h2>
                      <button
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
          image={main_data?.image}
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
              background: `${themeMode == "dark" ? "rgb(23,20,32)" : "white"}`,
              color: `${themeMode == "dark" ? "white" : "black"}`,
            }}
          >
            <h1>Details</h1>
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
              <p>{main_data?.price}</p>
            </div>
            <div className="card flex">
              <p>contract address</p>
              <p>
                {main_data?.owner?.wallet_address.substring(0, 5)}...
                {main_data?.owner?.wallet_address.substring(
                  main_data?.owner?.wallet_address.length - 5
                )}
              </p>
            </div>
            <div className="card flex">
              <p>dimension</p>
              <p style={{ textTransform: "lowercase" }}>
                {imageDimensions.width}px{" "}
                <span style={{ fontSize: ".4rem" }}>x</span>{" "}
                {imageDimensions.height}px
              </p>
            </div>
            <div className="tags flex">
              <div className="tag border flex">
                <p className="flex" style={{ gap: "5px" }}>
                  <img src="/ether.svg" alt="" />
                  Metadata
                </p>
              </div>
              <div className="tag border flex">
                <p className="flex" style={{ gap: "5px" }}>
                  <img src="/ether-scan.svg" alt="" />
                  Etherscan
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        this
      )}
      <Footer />
    </div>
  );
};

export default MainArt;
