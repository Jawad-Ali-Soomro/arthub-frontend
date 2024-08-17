import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import axios from "axios";
import { baseArtUrl, ethToUsd } from "../utils/constant";
import "../styles/Explore.scss";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { BsFilter } from "react-icons/bs";

const Art = () => {
  document.title = "Explore Art";
  const navigate = useNavigate();
  const [mainData, setMainData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({
    price: null,
    tags: [],
  });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false); // State to track if more data is being fetched
  const loaderRef = useRef(null);

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

  const fetchData = async (page) => {
    try {
      setIsFetchingMore(true);
      const response = await axios.get(`${baseArtUrl}/get/all`, {
        params: { page, limit: 9 },
      });
      const newArt = response.data.data;

      if (newArt.length === 0) {
        setHasMore(false); // No more data available
      } else {
        setMainData((prevData) => [...prevData, ...newArt]);
        setFilteredData((prevData) => [...prevData, ...newArt]);
      }
    } catch (error) {
      console.error("Error fetching art data:", error);
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore]);

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
    setFilteredData(mainData);
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
          <h1 className="flex col">Digital Art</h1>
          <button
            className="border"
            onClick={() => setIsFilterVisible(!isFilterVisible)}
          >
            <BsFilter />
          </button>
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
              <div className="filter-section after">
                <label>Max Price</label>
                <input
                  type="text"
                  value={filterCriteria.price || ""}
                  className="border"
                  placeholder="Enter Price"
                  onChange={(e) =>
                    setFilterCriteria({
                      ...filterCriteria,
                      price: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                />
              </div>
              <button
                onClick={applyFilter}
                style={{
                  background: `${
                    themeMode == "dark" ? "white" : "rgb(23,20,32)"
                  }`,
                  color: `${themeMode == "dark" ? "black" : "white"}`,
                }}
              >
                Apply
              </button>
              <button className="border" onClick={removeFilter}>
                Remove
              </button>
            </div>
          </div>
        )}
        <div className="main-data wrapper flex">
          {filteredData?.map((card_item) =>
            card_item?.price >= 1000 ? (
              this
            ) : (
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
                      {card_item?.price} ~{" "}
                      <span>${Math.round(card_item?.price * ethToUsd)}</span>
                    </h2>
                    <button
                      className="flex"
                      onClick={() => navigate(`/art/${card_item?._id}`)}
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
        {isFetchingMore && (
          <div className="fetching-loader flex" style={{ marginTop: "100px" }}>
            <img src="/loader.svg" style={{ width: "50px" }} alt="Loading..." />
          </div>
        )}
        <div ref={loaderRef} style={{ height: "50px" }} />
      </div>
      <Footer />
    </div>
  );
};

export default Art;
