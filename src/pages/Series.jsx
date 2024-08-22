import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { baseArtUrl, baseSeriesUrl, ethToUsd } from "../utils/constant";
import "../styles/Explore.scss";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { BiSearch } from "react-icons/bi";

const Series = () => {
  const navigate = useNavigate();
  const [main_data, set_data] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    tags: "",
    price: "",
    priceCondition: "less",
    artist: "",
  });
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const fetch_data = async () => {
    try {
      const res = await axios.get(`${baseSeriesUrl}/get/all`);
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

    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (art) =>
          art.title.toLowerCase().includes(lowercasedQuery) ||
          art.owner.username.toLowerCase().includes(lowercasedQuery)
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
          {/* <h1 className="flex col">Digital Art</h1> */}
          <div className="search-bar flex">
            <BiSearch className="icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange} // Capture search input
            />
          </div>
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
            {/* <img src="/loader.svg" style={{ width: "50px" }} alt="Loading..." />
            <img src="/loader.svg" style={{ width: "50px" }} alt="Loading..." /> */}
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
                    <h2></h2>
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
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Series;
