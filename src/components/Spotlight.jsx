import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUserUrl, ethToUsd, formatPrice } from "../utils/constant";
import { useNavigate } from "react-router-dom";

const Spotlight = () => {
  const [main_data, set_data] = useState();
  const [user, setUser] = useState();
  const navigate = useNavigate();

  // Fetch all users
  const fetAllUsers = async () => {
    try {
      const response = await axios.get(`${baseUserUrl}/allUsers`);

      if (response?.data?.users && response.data.users.length > 1) {
        // If more than one user, pick a random one
        const getRandomIndex = (max) => Math.floor(Math.random() * max);
        const randomIndex = getRandomIndex(response.data.users.length);
        setUser(response.data.users[randomIndex]);
      } else if (response?.data?.users.length === 1) {
        // If only one user, set it directly
        setUser(response.data.users[0]);
      } else {
        // If no users found, set user as null or handle accordingly
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch featured art data based on selected user
  const fetch_data = async () => {
    try {
      if (user?._id) {
        const response = await axios.get(`${baseUserUrl}/get/${user._id}`);
        const featuredImages = response.data.data.art || [];
        const shuffledImages = shuffleArray(featuredImages);
        const randomFeaturedImages = shuffledImages.slice(0, 3);
        set_data(randomFeaturedImages);
      }
    } catch (error) {
      console.error("Error fetching featured images:", error);
    }
  };

  // Shuffle array function
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Fetch user data on component mount
  useEffect(() => {
    fetAllUsers();
  }, []);

  // Fetch featured art data when user or theme mode changes
  const themeMode = window.localStorage.getItem("themeMode");
  useEffect(() => {
    if (user) {
      fetch_data();
    }
  }, [user, themeMode]);

  return (
    <div>
      <div className="featuerd-wrap flex col" style={{ marginTop: "0px" }}>
        <h1
          data-aos="fade-right"
          style={{ width: "100%", justifyContent: "space-between" }}
        >
          Artist Spotlight : {user?.username || "Loading..."}{" "}
          {user && (
            <button
              className="border"
              style={{
                background: "rgb(167, 155, 91)",
                color: "white",
                border: `${
                  themeMode === "light" ? "1px  solid #80808090" : "none"
                }`,
              }}
              onClick={() => navigate(`/user/${user._id}`)}
            >
              See all
            </button>
          )}
        </h1>
        <p
          data-aos="fade-right"
          data-aos-delay="300"
          style={{ fontSize: ".8rem" }}
        >
          {user
            ? `Through their animations, ${user.username} explores the impact of
          contemporary culture on our everyday lives, offering a unique and
          fresh perspective on the world around us.`
            : "Loading user details..."}
        </p>
        {main_data === undefined ? (
          <div
            className="wrapper flex"
            style={{
              height: "500px",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <img src="/loader.svg" style={{ width: "50px" }} alt="Loading..." />
            <img src="/loader.svg" style={{ width: "50px" }} alt="Loading..." />
            <img src="/loader.svg" style={{ width: "50px" }} alt="Loading..." />
          </div>
        ) : (
          <div className="wrapper flex">
            {main_data.map((card_item) => (
              <div
                className="card flex col"
                data-aos="fade-right"
                data-aos-delay="600"
                key={card_item._id}
              >
                <div
                  className="img-sect flex"
                  style={{
                    background: `${
                      themeMode === "dark" ? "rgba(255,255,255,.05)" : "#eee"
                    }`,
                  }}
                >
                  <img
                    src={card_item?.image}
                    alt={card_item?.title}
                    onClick={() => navigate(`/art/${card_item?._id}`)}
                  />
                </div>
                <div className="info flex col">
                  <h2>{card_item?.title}</h2>
                  <div className="border"></div>
                  <div className="price flex">
                    <h2>
                      {card_item?.price}Ξ{""}
                      <span>(${formatPrice(card_item?.price * ethToUsd)})</span>
                    </h2>
                    <button
                      className="flex"
                      style={{
                        background: "rgb(167, 155, 91)",
                        color: "white",
                        border: `${
                          themeMode === "light"
                            ? "1px  solid #80808090"
                            : "none"
                        }`,
                      }}
                      onClick={() => navigate(`/art/${card_item?._id}`)}
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Spotlight;
