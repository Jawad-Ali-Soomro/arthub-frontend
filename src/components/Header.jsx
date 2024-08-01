import React, { useState, useEffect } from "react";
import { switchToDarkMode, switchToLightMode } from "../utils/toggler";
import "../styles/Header.scss";
import {
  BiCart,
  BiChat,
  BiCopy,
  BiLayer,
  BiLogoDribbble,
  BiLogoFacebook,
  BiLogoGithub,
  BiLogoInstagram,
  BiLogoTwitter,
  BiLogOut,
  BiSearch,
} from "react-icons/bi";
import { FaAdjust, FaArtstation, FaSignOutAlt } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import Login from "../pages/Login";
import WalletSection from "./Connect";
import {
  RiAuctionFill,
  RiInformation2Line,
  RiInformationLine,
} from "react-icons/ri";
import { CgLogOff, CgLogOut, CgProfile, CgTrending } from "react-icons/cg";
import toast from "react-hot-toast";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MdDashboard } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { GoSignOut } from "react-icons/go";
import { SiEventstore } from "react-icons/si";
import { BsBrush } from "react-icons/bs";

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
  showLogin == true ? (document.title = "Login") : this;
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
    setUserData(null);
    window.location.reload();
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
      style={{
        background: `${isDarkMode ? "rgb(23, 20, 32)" : "rgb(250,250,250)"}`,
      }}
    >
      <div className="logo flex">
        <img
          src={isDarkMode ? "/logo-white.png" : "/logo-black.png"}
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
            <span>H</span>
            <span>o</span>
            <span>m</span>
            <span>e</span>
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
          <li
            className="icon"
            onClick={() => navigate("/auction")}
            id={location === "/auction" ? "active" : ""}
          >
            Auction
          </li>
          <li onClick={() => toggleTheme()}>
            {isDarkMode ? <FaAdjust className="transform" /> : <FaAdjust />}
          </li>
          <li className="icon flex" onClick={() => navigate("/cart")}>
            <BiCart style={{ fontSize: "1.1rem" }} />
          </li>
        </ul>
        <div
          className="menu flex col"
          onClick={() => setShowMenu(!showMenu) + setProfileMenu(false)}
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
              showMenu ? "main-menu-active flex col" : "main-menu flex col"
            }
            style={{
              background: `${isDarkMode ? "rgb(23, 20, 32)" : "white"}`,
              border: `${
                isDarkMode ? "1px solid rgba(255,255,255,.3)  " : "none"
              }`,
            }}
          >
            <p onClick={() => navigate("/events")}>
              Events <SiEventstore />
            </p>
            <p
              onClick={() =>
                tokenId
                  ? navigate("/profile")
                  : toast.error("Please login to access!")
              }
            >
              Dashboard
              <MdDashboard />
            </p>
            <div className="line"></div>
            <p onClick={() => navigate("/trending-art")}>
              Trending Art <BsBrush />
            </p>
            <p>
              Rare Auctions <RiAuctionFill />
            </p>
            <p onClick={() => navigate("/trending-series")}>
              Trending Series <BiLayer />
            </p>
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
            <img
              src={userData?.avatar}
              alt=""
              className="border"
              onClick={() => setProfileMenu(!profileMenu) + setShowMenu(false)}
            />
            <div
              className={profileMenu ? "menu-active flex col" : "menu flex col"}
              style={{
                color: `${isDarkMode ? "rgba(255,255,255,1)" : "black"}`,
                background: `${isDarkMode ? "rgb(23, 20, 32)" : "white"}`,
                border: `${
                  isDarkMode ? "1px solid rgba(255,255,255,.3)  " : "none"
                }`,
              }}
            >
              <div className="top flex col">
                <div className="wallet flex">
                  <p>{userData?.wallet_address.substring(0, 9)}...</p>
                  <p>
                    {userData?.wallet_address.substring(
                      userData?.wallet_address.length - 8
                    )}
                    <span>
                      <BiCopy />
                    </span>
                  </p>
                </div>
                <div className="balance flex">
                  <p>
                    0.0<span>ETH</span>
                  </p>
                  <p>
                    0.0<span>$RARE</span>
                  </p>
                </div>
              </div>
              <div className="bottom flex col">
                <ul className="flex col">
                  <li className="flex" onClick={() => navigate("/profile")}>
                    Dashboard <MdDashboard />
                  </li>
                  <li className="flex">
                    PROFILE <CgProfile />
                  </li>
                  <li className="flex">
                    SETTINGS <CiSettings />
                  </li>
                  <li className="flex" onClick={() => handleLogout()}>
                    sign out <BiLogOut />
                  </li>
                </ul>
              </div>
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
