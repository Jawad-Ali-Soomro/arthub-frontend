import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { baseArtUrl, ethToUsd } from "../utils/constant";
import "../styles/Explore.scss";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { BsFilter } from "react-icons/bs";

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

  const fetch_data = async () => {
    try {
      const res = await axios.get(`${baseArtUrl}/get/all`);
      set_data(res.data.data);
      setFilteredData(res.data.data); // Initial load without filters
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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

    // Shuffle the array to show random results
    filtered = filtered.sort(() => Math.random() - 0.5);
    setFilteredData(filtered);
  };

  useEffect(() => {
    fetch_data();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, main_data]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setShowFilters(true);
  };

  return (
    <div>
      <Header />
      <div className="explore-wrapper flex col">
        <section className="flex">
          <h1 className="flex col">
            Digital Art{" "}
            <span style={{ fontSize: "1rem" }}>
              {filteredData?.length} Arts Found
            </span>
          </h1>
          <div className="length flex"></div>
          <button
            className="border"
            onClick={() => setShowFilters(!showFilters)}
          >
            <BsFilter />
            <div
              className="filter-controls flex"
              onClick={(e) => e.stopPropagation()}
              style={{
                height: `${showFilters == true ? "" : "0px"}`,
                border: `${showFilters == true ? "1px solid #ddd" : "0px"}`,
              }}
            >
              <input
                type="text"
                className="border"
                name="tags"
                placeholder="Category"
                onChange={handleFilterChange}
              />
              <div className="price-filter flex">
                <input
                  className="border"
                  type="number"
                  name="price"
                  placeholder="Enter Max Price"
                  onChange={handleFilterChange}
                />
              </div>
              <input
                className="border"
                type="text"
                name="artist"
                placeholder="Search By Artist"
                onChange={handleFilterChange}
              />
            </div>
          </button>
        </section>

        {filteredData.length === 0 ? (
          <div
            className="loader flex"
            style={{
              marginTop: "150px",
              justifyContent: "space-around",
            }}
          >
            <img src="/loader.svg" style={{ width: "50px" }} alt="Loading..." />
            <img src="/loader.svg" style={{ width: "50px" }} alt="Loading..." />
            <img src="/loader.svg" style={{ width: "50px" }} alt="Loading..." />
          </div>
        ) : (
          <div className="main-data wrapper flex">
            {filteredData.map((card_item) => (
              <div className="card flex col" key={card_item._id}>
                <div className="img-sect flex">
                  <img
                    className="border"
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
                        className="border"
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
                      {card_item?.price} ~ $
                      {Math.round(card_item?.price * ethToUsd)}{" "}
                    </h2>
                    <button
                      className="flex"
                      onClick={() => navigate(`/series/${card_item._id}`)}
                    >
                      view
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Art;
