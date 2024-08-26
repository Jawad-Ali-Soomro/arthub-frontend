import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { baseArtUrl, ethToUsd } from "../utils/constant";
import "../styles/Explore.scss";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { BiFilter, BiMoney, BiSearch } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";
import { LiaAngleDownSolid, LiaAngleUpSolid } from "react-icons/lia";
import { GiPriceTag } from "react-icons/gi";
import { CiFilter } from "react-icons/ci";

const Art = () => {
  const navigate = useNavigate();
  const [main_data, set_data] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    tags: "",
    price: "",
    priceCondition: "less",
    artist: "",
  });
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const fetch_data = async () => {
    try {
      const res = await axios.get(`${baseArtUrl}/get/all`);
      set_data(res.data.data);
      setFilteredData(res.data.data); // Initial load without filters
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [showTags, setShowTags] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [showCurreny, setshowCurreny] = useState(false);
  const applyFilters = () => {
    let filtered = main_data;

    if (filters.tags) {
      const selectedTags = filters.tags
        .toLowerCase()
        .split(",")
        .map((tag) => tag.trim());
      filtered = filtered.filter((art) =>
        selectedTags.every((tag) =>
          art.tags.map((t) => t.toLowerCase()).includes(tag)
        )
      );
    }

    if (filters.price && filters.priceCondition) {
      const price = parseFloat(filters.price);
      if (filters.priceCondition === "equal") {
        filtered = filtered.filter((art) => art.price === price);
      } else if (filters.priceCondition === "less") {
        filtered = filtered.filter((art) => art.price < price);
      } else if (filters.priceCondition === "greater") {
        filtered = filtered.filter((art) => art.price > price);
      }
    }

    if (filters.artist) {
      filtered = filtered.filter((art) =>
        art.owner.username.toLowerCase().includes(filters.artist.toLowerCase())
      );
    }

    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (art) =>
          art.title.toLowerCase().includes(lowercasedQuery) ||
          art.owner.username.toLowerCase().includes(lowercasedQuery) ||
          art.tags.some((tag) => tag.toLowerCase().includes(lowercasedQuery))
      );
    }

    // Shuffle the array to show random results
    filtered = filtered.sort(() => Math.random() - 0.5);
    setFilteredData(filtered);
  };

  const themeMode = window.localStorage.getItem("themeMode");

  useEffect(() => {
    fetch_data();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, searchQuery, main_data]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query state
  };

  return (
    <div>
      <Header />
      <div className="explore-wrapper flex col">
        <section className="flex">
          <h1 className="flex col">Digital Art</h1>
        </section>

        <div className="main-data wrapper flex">
          {showFilters == true ? (
            <div className="left filters flex col">
              <div className="search-bar flex">
                <BiSearch className="icon" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange} // Capture search input
                />
              </div>
              <div
                className="toggler flex"
                onClick={() => setShowTags(!showTags)}
              >
                <p>Category</p>
                {showTags == true ? <LiaAngleUpSolid /> : <LiaAngleDownSolid />}
              </div>
              {showTags == true ? (
                <div className="suggestions flex col">
                  <div className="wrap flex">
                    <p onClick={() => setSearchQuery("Illustration")}>
                      Illustration
                    </p>
                    <p onClick={() => setSearchQuery("Illusion")}>Illusion</p>
                    <p onClick={() => setSearchQuery("Ai")}>Ai</p>
                    <p onClick={() => setSearchQuery("Surreal")}>Surreal</p>
                    <p onClick={() => setSearchQuery("Crypto Art")}>
                      Crypto Art
                    </p>
                    <p onClick={() => setSearchQuery("Digital Art")}>
                      Digital Art
                    </p>
                    <p onClick={() => setSearchQuery("Abstract")}>Abstract</p>
                    <p onClick={() => setSearchQuery("Photography")}>
                      Photography
                    </p>
                    <p onClick={() => setSearchQuery("Painting")}>Painting</p>
                  </div>
                </div>
              ) : (
                this
              )}
              <div className="line border"></div>
              <div
                className="toggler flex"
                onClick={() => setShowPrice(!showPrice)}
              >
                <p>PRICE RANGE</p>
                {showPrice == true ? (
                  <LiaAngleUpSolid />
                ) : (
                  <LiaAngleDownSolid />
                )}
              </div>
              {showPrice == true ? (
                <div className="search-bar flex money">
                  <GiPriceTag />
                  <input type="text" />
                </div>
              ) : (
                this
              )}
              <div className="line border"></div>
              <div
                className="toggler flex"
                onClick={() => setshowCurreny(!showCurreny)}
              >
                <p>Status</p>
                {showCurreny == true ? (
                  <LiaAngleUpSolid />
                ) : (
                  <LiaAngleDownSolid />
                )}
              </div>
              {showCurreny == true ? (
                <div
                  className="currency flex col"
                  style={{ alignItems: "start", width: "300px", gap: "10px" }}
                >
                  <div className="wrap flex" style={{ gap: "5px" }}>
                    <input type="checkbox" id="upcoming" />
                    <label
                      htmlFor="upcoming"
                      style={{ fontSize: ".8rem", cursor: "pointer" }}
                    >
                      Upcoming
                    </label>
                  </div>
                  <div className="wrap flex" style={{ gap: "5px" }}>
                    <input type="checkbox" id="live" />
                    <label
                      htmlFor="live"
                      style={{ fontSize: ".8rem", cursor: "pointer" }}
                    >
                      Live Offers
                    </label>
                  </div>
                  <div className="wrap flex" style={{ gap: "5px" }}>
                    <input type="checkbox" id="auctions" />
                    <label
                      htmlFor="auctions"
                      style={{ fontSize: ".8rem", cursor: "pointer" }}
                    >
                      Live Auctions
                    </label>
                  </div>
                  <div className="wrap flex" style={{ gap: "5px" }}>
                    <input type="checkbox" id="reserved" />
                    <label
                      htmlFor="reserved"
                      style={{ fontSize: ".8rem", cursor: "pointer" }}
                    >
                      Reserved Price
                    </label>
                  </div>
                </div>
              ) : (
                this
              )}
            </div>
          ) : (
            this
          )}
          <div
            className="right flex"
            style={{ paddingLeft: `${showFilters == true ? "100px" : "0"}` }}
          >
            <div
              className="filter-btn flex"
              onClick={() => setShowFilters(!showFilters)}
            >
              <CiFilter />
            </div>
            {filteredData.map((card_item) => (
              <div className="card flex col" key={card_item._id}>
                <div className="img-sect flex">
                  <img
                    src={card_item.image}
                    alt={card_item.title}
                    onClick={() => navigate(`/art/${card_item._id}`)}
                  />
                </div>
                <div className="info flex col">
                  <h2>{card_item.title}</h2>
                  <div
                    className="owner flex"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/user/${card_item.owner._id}`)}
                  >
                    <div className="left flex">
                      <img
                        src={card_item.owner.avatar}
                        alt={card_item.owner.username}
                      />
                      <h3 style={{ textTransform: "lowercase" }}>
                        @{card_item.owner.username.split(" ")}
                      </h3>
                    </div>
                  </div>
                  <div className="border"></div>
                  <div className="price flex">
                    <h2>
                      {" "}
                      {card_item?.price}Ξ($
                      {Math.round(card_item?.price * ethToUsd)}){" "}
                    </h2>
                    <button
                      className="flex"
                      onClick={() => navigate(`/art/${card_item._id}`)}
                    >
                      view
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Art;
