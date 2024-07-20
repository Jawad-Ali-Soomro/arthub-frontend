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
  BiLogOut,
  BiSearch,
} from "react-icons/bi";
import { FaAdjust } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import Login from "../pages/Login";
import WalletSection from "./Connect";
import { IoInformation } from "react-icons/io5";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("themeMode") === "dark"
  );
  const [showMenu, setShowMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showWallets, setShowWallets] = useState(false);
  const [userData, setUserData] = useState(
    JSON.parse(window.localStorage.getItem("userId"))
  );

  // State for scroll visibility
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navigate = useNavigate();
  const location = window.location.pathname;
  const walletId = window.sessionStorage.getItem("token");
  const tokenId = window.localStorage.getItem("authToken");

  useEffect(() => {
    const theme = localStorage.getItem("themeMode");
    if (theme === "dark") {
      switchToDarkMode();
    } else {
      switchToLightMode();
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

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

  const handleLogout = () => {
    window.localStorage.removeItem("authToken");
    window.localStorage.removeItem("userId");
    window.sessionStorage.removeItem("token");
    setUserData(null); // Update local state to reflect logout
  };

  const openLogin = () => setShowLogin(true);
  const closeLogin = () => setShowLogin(false);
  const openWallets = () => setShowWallets(true);
  const closeWallets = () => setShowWallets(false);

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
        <div className="menu flex col" onClick={() => setShowMenu(!showMenu)}>
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
              showMenu ? "main-menu-active flex col" : "main-menu flex col"
            }
            style={{
              background: `${isDarkMode ? "rgba(255,255,255,.1)" : "#333"}`,
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
        {tokenId ? (
          <div className="profile flex">
            <h2 onClick={() => setProfileMenu(!profileMenu)}>
              {userData?.username}
            </h2>
            <img
              src={userData?.avatar}
              alt=""
              onClick={() => setProfileMenu(!profileMenu)}
            />
            <div
              className={profileMenu ? "menu-active flex col" : "menu flex col"}
              style={{
                background: `${isDarkMode ? "rgba(255,255,255,.1)" : "#333"}`,
                color: `${isDarkMode ? "rgba(255,255,255,1)" : "white"}`,
              }}
            >
              <p className="border flex">
                <IoInformation />
              </p>
              <p className="border flex" onClick={() => handleLogout()}>
                <BiLogOut />
              </p>
            </div>
          </div>
        ) : (
          <button
            className="border"
            onClick={() =>
              tokenId ? null : walletId ? openLogin() : openWallets()
            }
          >
            {tokenId ? "PROFILE" : walletId ? "LOGIN" : "CONNECT"}
          </button>
        )}
      </div>
      {showLogin && <Login onClose={closeLogin} />}
      {showWallets && <WalletSection onClose={closeWallets} />}
    </div>
  );
};

export default Header;
