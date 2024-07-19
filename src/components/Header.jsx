import React, { useState, useEffect } from "react";
import { switchToDarkMode, switchToLightMode } from "../utils/toggler";
import "../styles/Header.scss";
import {
  BiChat,
  BiLogoDribbble,
  BiLogoFacebook,
  BiLogoGithub,
  BiLogoInstagram,
  BiLogoTwitter,
  BiMessage,
  BiSearch,
} from "react-icons/bi";
import { FaAdjust } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { connectMetamask } from "../utils/constant";
import { Link } from "react-router-dom";
import Login from "../pages/Login";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("themeMode") === "dark"
  );
  const location = window.location.pathname;
  const navigate = useNavigate();
  const walletId = window.sessionStorage.getItem("token");
  const [show_menu, set_show_menu] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("themeMode");
    if (theme === "dark") {
      switchToDarkMode();
    } else {
      switchToLightMode();
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      switchToLightMode();
      localStorage.setItem("themeMode", "light");
    } else {
      switchToDarkMode();
      localStorage.setItem("themeMode", "dark");
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
  const [show_login, set_login] = useState(false);
  const openLogin = () => {
    set_login(true);
  };
  const closeLogin = () => {
    set_login(false);
  };

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
            isDarkMode ? "../public/logo-white.png" : "../public/logo-black.png"
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
            id={location === "/" ? "active" : ""}
            onClick={() => navigate("/")}
          >
            Home
          </li>
          <li
            className="icon"
            id={location === "/explore/art" ? "active" : ""}
            onClick={() => navigate("/explore/art")}
          >
            Art
          </li>
          <li
            className="icon"
            id={location === "/explore/series" ? "active" : ""}
            onClick={() => navigate("/explore/series")}
          >
            Series
          </li>
          <li className="icon">Auction</li>
          <li onClick={() => toggleTheme()}>
            {isDarkMode ? <FaAdjust className="transform" /> : <FaAdjust />}
          </li>
          <li className="icon flex">
            <BiChat style={{ fontSize: "1.1rem" }} />
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
              show_menu ? "main-menu-active flex col" : "main-menu flex col"
            }
            style={{
              background: `${isDarkMode ? "rgba(255,2552,255,.1)" : "#333"}`,
            }}
          >
            <p>Spaces</p>
            <p>View Profile</p>
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
        <button
          className="border"
          onClick={() => (walletId ? openLogin() : connectMetamask())}
        >
          {walletId ? "LOGIN" : "CONNECT"}
        </button>
      </div>
      {show_login === true && <Login onClose={closeLogin} />}
    </div>
  );
};

export default Header;
