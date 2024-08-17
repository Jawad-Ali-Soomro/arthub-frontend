import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { baseArtUrl, ethToUsd } from "../utils/constant";
import "../styles/Explore.scss";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Auction = () => {
  document.title = "Explore Art";
  const navigate = useNavigate();
  const [mainData, setMainData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({
    price: null,
    tags: [],
  });
  const themeMode = window.localStorage.getItem("themeMode");
  const predefinedTags = [
    "Surreal",
    "Abstract",
    "Illusion",
    "Illustration",
    "Surrealism",
    "AI",
    "Painting",
    "Photography",
    "Digital",
    "Crypto Art",
    "Vision",
    "Portrait",
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseArtUrl}/get/all`);
      setMainData(response.data.data);
      setFilteredData(response.data.data);
    } catch (error) {
      console.error("Error fetching art data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const applyFilter = () => {
    const { price, tags } = filterCriteria;
    const filtered = mainData.filter((item) => {
      let matches = true;
      if (price !== null) {
        matches = matches && item.price <= price;
      }
      if (tags.length > 0) {
        matches = matches && tags.every((tag) => item.tags.includes(tag));
      }
      return matches;
    });
    setFilteredData(filtered);
  };

  const removeFilter = () => {
    setFilterCriteria({
      price: null,
      tags: [],
    });
    setFilteredData(mainData); // Reset filtered data to show all items
  };

  const handleTagChange = (tag) => {
    setFilterCriteria((prevCriteria) => ({
      ...prevCriteria,
      tags: prevCriteria.tags.includes(tag)
        ? prevCriteria.tags.filter((t) => t !== tag)
        : [...prevCriteria.tags, tag],
    }));
  };

  return (
    <div>
      <Header />
      <div className="explore-wrapper flex col">
        <section className="flex">
          <h1 className="flex col">Rare Items </h1>
          {/* <button
            className="border"
            onClick={() => setIsFilterVisible(!isFilterVisible)}
          >
            <BsFilter />
          </button> */}
          {/* <div className="length flex" style={{ borderRadius: "10px" }}>
            {filteredData?.length}
          </div> */}
        </section>
        {isFilterVisible && (
          <div className="filter-div" onClick={() => setIsFilterVisible(false)}>
            <div
              className="filter-content"
              style={{
                background: `${
                  themeMode == "dark" ? "rgb(23, 20, 32)" : "rgb(250, 250, 250)"
                }`,
                color: `${themeMode == "dark" ? "white" : "#111"}`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="filter-section">
                <label>Tags</label>
                <div className="tags">
                  {predefinedTags.map((tag) => (
                    <div
                      key={tag}
                      style={{ color: "inherit" }}
                      className={`tag border ${
                        filterCriteria.tags.includes(tag) ? "selected" : ""
                      }`}
                      onClick={() => handleTagChange(tag)}
                    >
                      {"#" + tag}
                    </div>
                  ))}
                </div>
              </div>
              <div className="filter-section">
                <label>Max Price</label>
                <input
                  type="text"
                  value={filterCriteria.price || ""}
                  className="border"
                  onChange={(e) =>
                    setFilterCriteria({
                      ...filterCriteria,
                      price: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                />
              </div>
              <button onClick={applyFilter}>Apply</button>
              <button className="border" onClick={removeFilter}>
                Remove
              </button>
            </div>
          </div>
        )}
        {filteredData.length === 0 ? (
          <div
            className="main-data flex"
            style={{ marginTop: "150px", justifyContent: "space-around" }}
          >
            <img src="/loader.svg" style={{ width: "50px" }} alt="" />
            <img src="/loader.svg" style={{ width: "50px" }} alt="" />
            <img src="/loader.svg" style={{ width: "50px" }} alt="" />
          </div>
        ) : (
          <div className="main-data wrapper flex">
            {filteredData?.map((card_item) => (
              <div className="card flex col" key={card_item._id}>
                <div className="img-sect flex">
                  <img
                    className="border"
                    src={card_item?.image}
                    alt={card_item?.title}
                    onClick={() => navigate(`/art/${card_item?._id}`)}
                  />
                </div>
                <div className="info flex col">
                  <h2>{card_item?.title}</h2>
                  <div
                    className="owner flex"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/user/${card_item?.owner?._id}`)}
                  >
                    <div className="left flex">
                      <img
                        className="border"
                        src={card_item?.owner?.avatar}
                        alt={card_item?.owner?.username}
                      />
                      <h3 style={{ textTransform: "lowercase" }}>
                        @{card_item?.owner?.username.split(" ")}
                      </h3>
                    </div>
                  </div>
                  <div className="border"></div>
                  <div className="price flex">
                    <h2>
                      <span>
                        {card_item?.price} ~ $
                        {Math.round(card_item?.price * ethToUsd)}
                      </span>
                    </h2>
                    <button
                      className="flex border"
                      onClick={() => navigate(`/art/${card_item?._id}`)}
                    >
                      buy
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

export default Auction;
