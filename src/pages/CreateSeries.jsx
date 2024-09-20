import React, { useState } from "react";
import "../styles/Create.scss";
import Header from "../components/Header";
import { baseSeriesUrl } from "../utils/constant";
import Footer from "../components/Footer";
import uploadToPinata from "../utils/upload";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateSeries = () => {
  const userId = window.localStorage.getItem("userId");
  const parsedUser = JSON.parse(userId);

  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("themeMode") || "light"
  );

  const [mainImage, setMainImage] = useState();
  const [imageUrl, setImageUrl] = useState();

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    try {
      const uploadResult = await uploadToPinata(file);
      setImageUrl(
        "https://orange-large-reindeer-667.mypinata.cloud/ipfs/" +
          uploadResult.IpfsHash
      );
    } catch (error) {
      console.error(error);
      toast.error("Please Upload File!", {
        style: {
          background: "white",
          color: "black",
          borderRadius: " 20px",
        },
      });
    }
  };
  const [artData, setArtData] = useState({
    title: "",
    image: "",
    owner: parsedUser?._id,
  });

  const handleDataChange = (e) => {
    setArtData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const navigate = useNavigate();
  const createArt = async () => {
    if (!imageUrl) {
      return toast.error("Please Upload Image", {
        style: {
          background: "white",
          color: "black",
          borderRadius: " 20px",
        },
      });
    }

    const createArt = await axios.post(`${baseSeriesUrl}/create`, {
      title: artData?.title,
      image: imageUrl,
      userId: parsedUser?._id,
    });
    createArt.data.message == "Series Created!"
      ? toast.success("Series Created Successfully!", {
          style: {
            background: "white",
            color: "black",
            borderRadius: " 20px",
          },
        }) + navigate("/profile")
      : toast.error("Error While Creating Art Try Again!", {
          style: {
            background: "white",
            color: "black",
            borderRadius: " 20px",
          },
        });
  };

  return (
    <div
      className="top-wrapper"
      style={{
        background: themeMode === "dark" ? "#212121" : "white",
        color: themeMode === "dark" ? "white" : "black",
      }}
    >
      <Header />
      <div
        className="main-create flex"
        style={{
          background: themeMode === "dark" ? "#212121" : "white",
          color: themeMode === "dark" ? "white" : "black",
        }}
      >
        <div className="left-display flex col">
          <div className="card flex col" style={{ alignItems: "start" }}>
            <div
              className="img-sect flex"
              style={{
                background: `${
                  themeMode == "dark" ? "rgba(255,255,255,.05)" : "#eee"
                }`,
              }}
            >
              <img src={mainImage} alt="" />
            </div>
            <h1>{artData?.title}</h1>
            <div className="owner flex">
              <img src={parsedUser?.avatar} alt="" />
              <p>@{parsedUser?.handle}</p>
            </div>
            <div className="line border"></div>
            <div className="price flex">
              <button
                style={{
                  background: "royalblue",
                  color: "white",
                  justifySelf: "flex-end",
                  marginLeft: "230px",
                }}
              >
                BUY
              </button>
            </div>
          </div>
        </div>
        <div className="right-display flex col">
          <div className="wrap flex">
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Title"
              value={artData?.title}
              onChange={handleDataChange}
            />
          </div>
          <div className="wrap upload flex">
            <input
              type="file"
              name=""
              id=""
              style={{ opacity: "0" }}
              onChange={handleAvatarChange}
            />
            <p style={{ position: "absolute", color: "inherit" }}>
              Image <span>Drag & Drop File To Upload!</span>
            </p>
          </div>
          <button
            style={{
              background: "royalblue",
              color: "white",
              cursor: "pointer",
            }}
            onClick={createArt}
          >
            Create
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateSeries;
