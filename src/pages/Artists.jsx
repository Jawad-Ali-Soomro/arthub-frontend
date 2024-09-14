import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Artists.scss";
import { baseUserUrl } from "../utils/constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Artists = () => {
  const [data, set_data] = useState([]);
  const [hoveredImage, setHoveredImage] = useState(null);

  const fetch_data = async () => {
    try {
      const response = await axios.get(`${baseUserUrl}/allUsers`);
      set_data(response?.data?.users || []);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetch_data();
  }, []);

  function calculateTotal(arts) {
    return arts.reduce((total, art) => total + art.price, 0);
  }

  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div className="container-artists flex col">
        <h1>Top Artists</h1>
        <div className="artists-list flex col">
          {data.map((artist, index) => (
            <div key={index} className="artist-card flex">
              <div className="profile flex">
                <img
                  onMouseEnter={() => setHoveredImage(artist.avatar)}
                  onMouseLeave={() => setHoveredImage(null)}
                  src={artist.avatar}
                  alt={artist.username}
                  className="avatar-img"
                  onClick={() => navigate(`/user/${artist?._id}`)}
                />
                <h3>@{artist.username.split(" ").join("_")}</h3>
              </div>
              <button
                style={{
                  background: "#EDEADE",
                  color: "black",
                  border: "none",
                }}
                onClick={() => navigate(`/user/${artist?._id}`)}
              >
                Profile
              </button>
              {hoveredImage === artist.avatar && (
                <div className="image-popup">
                  <img
                    src={artist.avatar}
                    alt={artist.username}
                    className="large-image"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Artists;
