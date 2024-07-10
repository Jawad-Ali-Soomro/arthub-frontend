import React, { useState, useEffect } from "react";
import { switchToDarkMode, switchToLightMode } from "../utils/toggler";
import "../styles/Header.scss";
import { BiSearch } from "react-icons/bi";
import { FaAdjust } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { connectMetamask } from "../utils/constant";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = window.location.pathname;
  const navigate = useNavigate()
  const walletId = window.sessionStorage.getItem("token")
  useEffect(() => {
    const prefersDarkScheme = window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;
    if (prefersDarkScheme) {
      switchToDarkMode();
      setIsDarkMode(true);
    } else {
      switchToLightMode();
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      switchToLightMode();
    } else {
      switchToDarkMode();
    }
    setIsDarkMode(!isDarkMode);
  };
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);

      if (window.scrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(window.scrollY);
    };

    const handleStopScroll = () => {
      setIsScrolling(false);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", () => {
      setIsScrolling(true);
      clearTimeout(handleStopScroll);
      setTimeout(handleStopScroll, 150); // Adjust the timeout as needed
    });

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleStopScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`header-wrap flex ${
        isVisible ? "header--visible" : "header--hidden"
      }`}
      style={{ background: `${isDarkMode ? "#111" : "white"}` }}
    >
      <div className="logo flex">
        <img
          src={
            isDarkMode == true
              ? "../public/logo-white.png"
              : "../public/logo-black.png"
          }
          alt=""
        />
      </div>
      <div className="search-bar border flex">
        <BiSearch />
        <input type="text" />
      </div>
      <div className="navs flex">
        <ul className="flex">
          <li
            className="icon"
            id={location == "/" ? "active" : ""}  
            onClick={() => navigate("/")}
          >
            HOme
          </li>
          <li
            className="icon"
            id={location == "/explore/art" ? "active" : ""}
            onClick={() => navigate("/explore/art")}
          >
            art
          </li>
          <li className="icon">Series</li>
          <li className="icon">Auction</li>
          <li onClick={() => toggleTheme()}>
            {isDarkMode ? <FaAdjust className="transform" /> : <FaAdjust />}
          </li>
        </ul>
        <div className="menu border flex col">
          <div
            className="line"
            style={{ background: `${isDarkMode ? "#fff" : "#111"}` }}
          ></div>
          <div
            className="line"
            style={{ background: `${isDarkMode ? "#fff" : "#111"}` }}
          ></div>
          <div
            className="line"
            style={{ background: `${isDarkMode ? "#fff" : "#111"}` }}
          ></div>
        </div>
        <button className="border" onClick={() => connectMetamask()}>{walletId !== null || undefined ? "CONNECTED" : "CONNECT"}</button>
      </div>
    </div>
  );
};

export default Header;
