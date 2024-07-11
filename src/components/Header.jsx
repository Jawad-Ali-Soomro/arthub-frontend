import React, { useState, useEffect } from "react";
import { switchToDarkMode, switchToLightMode } from "../utils/toggler";
import "../styles/Header.scss";
import {
  BiLogoDribbble,
  BiLogoFacebook,
  BiLogoGithub,
  BiLogoInstagram,
  BiLogoTwitter,
  BiSearch,
} from "react-icons/bi";
import { FaAdjust } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { connectMetamask } from "../utils/constant";
import { Link } from "react-router-dom";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = window.location.pathname;
  const navigate = useNavigate();
  const walletId = window.sessionStorage.getItem("token");
  const [show_menu, set_show_menu] = useState(false);
  const theme = window.localStorage.setItem("themeMode", `${isDarkMode ? "dark" : "light"}`)
  useEffect(() => {
    const prefersDarkScheme = window.matchMedia(
      `(prefers-color-scheme: ${theme})`
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
        setIsVisible(false);
      } else {
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
      setTimeout(handleStopScroll, 150);
    });
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
          onClick={() => navigate("/")}
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
          <li
            className="icon"
            id={location == "/explore/series" ? "active" : ""}
            onClick={() => navigate("/explore/series")}
          >
            series
          </li>
          <li className="icon">Auction</li>
          <li onClick={() => toggleTheme()}>
            {isDarkMode ? <FaAdjust className="transform" /> : <FaAdjust />}
          </li>
        </ul>
        <div
          className="menu flex col"
          onClick={() => set_show_menu(!show_menu)}
        >
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
          <div
            className={
              show_menu == true
                ? "main-menu-active flex col"
                : "main-menu flex col"
            }
            style={{
              background: `${isDarkMode ? "rgba(255,2552,255,.1)" : "#333"}`,
            }}
          >
            <p>spaces</p>
            <p>view profile</p>
            <div className="line"></div>
            <p>Trending Art</p>
            <p>Rare Auctions</p>
            <p>Trending Series</p>
            <div className="line"></div>
            <div className="links flex">
              <Link className="link flex">
                <BiLogoFacebook />
              </Link>
              <Link className="link flex">
                <BiLogoInstagram />
              </Link>
              <Link className="link flex">
                <BiLogoGithub />
              </Link>
              <Link className="link flex">
                <BiLogoDribbble />
              </Link>
              <Link className="link flex">
                <BiLogoTwitter />
              </Link>
            </div>
          </div>
        </div>
        <button className="border" onClick={() => connectMetamask()}>
          {walletId !== null || undefined ? "CONNECTED" : "CONNECT"}
        </button>
      </div>
    </div>
  );
};

export default Header;
