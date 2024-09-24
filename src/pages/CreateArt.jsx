import React, { useState } from "react";
import "../styles/Create.scss";
import Header from "../components/Header";
import { baseArtUrl, ethToUsd } from "../utils/constant";
import Footer from "../components/Footer";
import uploadToPinata from "../utils/upload";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateArt = () => {
  const tags = [
    "Illustration",
    "Illusion",
    "Ai",
    "Surreal",
    "Crypto Art",
    "Digital Art",
    "Abstract",
    "Photography",
    "Painting",
  ];

  const userId = window.localStorage.getItem("userId");
  const parsedUser = JSON.parse(userId);
  // console.log(parsedUser);

  const [selectedTags, setSelectedTags] = useState([]);
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
    description: "",
    image: "",
    owner: parsedUser?._id,
    price: "",
  });

  const handleDataChange = (e) => {
    setArtData((prevState) => ({
      ...prevState, // Preserve the other fields
      [e.target.name]: e.target.value, // Update the field based on input name
    }));
  };

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
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

    const createArt = await axios.post(`${baseArtUrl}/create`, {
      title: artData?.title,
      price: artData?.price,
      description: artData?.description,
      title: artData?.title,
      image: imageUrl,
      owner: parsedUser?._id,
      featured: true,
      tags: selectedTags,
    });
    createArt.data.message == "Art Created!"
      ? toast.success("Art Created Successfully!", {
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
              <p>
                {artData?.price}Ξ(${ethToUsd * artData?.price})
              </p>
              <button
                style={{ background: "rgb(167, 155, 91)", color: "white" }}
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
          <div className="wrap flex">
            <input
              id="price"
              name="price"
              type="text"
              placeholder="Price"
              value={artData?.price}
              onChange={handleDataChange}
            />
          </div>
          <div className="wrap flex">
            <textarea
              name="description"
              placeholder="Description"
              value={artData?.description}
              onChange={handleDataChange}
            ></textarea>
          </div>

          {/* {selectedTags.length >= 1 && (
            <div className="wrap-card selected-tags flex">
              {selectedTags.map((cat) => (
                <div
                  className="card flex"
                  key={cat}
                  style={{
                    flexWrap: "wrap",
                    background:
                      themeMode === "dark"
                        ? "rgba(255,255,255,.05)"
                        : "#edeade",
                    border: "none",
                    borderRadius: "15px",
                    position: "relative",
                    padding: "5px 10px",
                  }}
                >
                  <p style={{ marginRight: "10px" }}>{cat}</p>
                  <span
                    onClick={() => toggleTag(cat)}
                    className="flex"
                    style={{
                      cursor: "pointer",
                      color: "red",
                      fontWeight: "bold",
                      position: "absolute",
                      right: "10px",
                      top: "5px",
                      width: "30px",
                      height: "30px",
                    }}
                  >
                    &times;
                  </span>
                </div>
              ))}
            </div>
          )} */}

          <div className="wrap-card flex" style={{ flexWrap: "wrap" }}>
            {tags.map((cat) => (
              <div
                className="card flex"
                key={cat}
                onClick={() => toggleTag(cat)}
                style={{
                  background: selectedTags.includes(cat)
                    ? "#80808090"
                    : "transparent",
                  border: selectedTags.includes(cat)
                    ? "1px solid transparent"
                    : "1px solid #808090",
                  borderRadius: "15px",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                <p>{cat}</p>
              </div>
            ))}
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
              background: "rgb(167, 155, 91)",
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
//
export default CreateArt;
