import React, { useState, useEffect } from "react";
import { switchToDarkMode, switchToLightMode } from "../utils/toggler";
import "../styles/Header.scss";
import {
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
import toast from "react-hot-toast";
import { connectMetaMask } from "../utils/wallet_connect";
import { GrChat, GrDashboard } from "react-icons/gr";
import { MdDashboard } from "react-icons/md";
import { RiDashboardLine } from "react-icons/ri";
import { TiUserOutline } from "react-icons/ti";
import { CgUser } from "react-icons/cg";
import { BsChat } from "react-icons/bs";

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
    setUserData(null);
  };

  const openLogin = () => setShowLogin(true);
  const closeLogin = () => setShowLogin(false);
  const openWallets = () => setShowWallets(true);
  const closeWallets = () => setShowWallets(false);

  const themeMode = window.localStorage.getItem("themeMode");

  return (
    <div
      className={`header-wrap flex ${
        isVisible ? "header--visible" : "header--hidden"
      }`}
      style={{
        background: `${isDarkMode ? "#212121" : "rgb(250,250,250)"}`,
      }}
    >
      <div className="logo flex">
        <img
          src={isDarkMode ? "/logo-white.png" : "/logo-black.png"}
          onClick={() => {
            navigate("/");
          }}
          alt=""
        />
      </div>
      <div className="search-bar border flex">
        <BiSearch />
        <input type="text" id="search" />
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
            Arts
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
            onClick={() => navigate("/artists")}
            id={location === "/artists" ? "active" : ""}
          >
            artists
          </li>
          <li onClick={() => toggleTheme()}>
            {isDarkMode ? <FaAdjust className="transform" /> : <FaAdjust />}
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
              background: `${isDarkMode ? "#212121" : "white"}`,
              border: `${
                isDarkMode ? "1px solid rgba(255,255,255,.3)  " : "none"
              }`,
            }}
          >
            <p
              className="notify"
              data-num={0}
              onClick={() =>
                userData
                  ? navigate("/deals")
                  : toast.error("Please Login To View Deals!")
              }
            >
              Deals
            </p>
            <p
              onClick={() =>
                userData
                  ? navigate(`/user/${userData?._id}`)
                  : toast.error("Please Login To View Profile!")
              }
            >
              Profile
            </p>

            <div className="line"></div>
            <p
              onClick={() =>
                tokenId
                  ? navigate("/profile")
                  : toast.error("Please Login To View Dashboard!", {})
              }
            >
              Dashboard
            </p>
            <p onClick={() => navigate("/featured-art")}>Featured Art</p>
            <p onClick={() => navigate("/featured-series")}>Featured Series</p>
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
              style={{ width: "40px", height: "40px" }}
              onClick={() => setProfileMenu(!profileMenu) + setShowMenu(false)}
            />
            <div
              className={profileMenu ? "menu-active flex col" : "menu flex col"}
              style={{
                color: `${isDarkMode ? "rgba(255,255,255,1)" : "black"}`,
                background: `${isDarkMode ? "#212121" : "white"}`,
                border: `${
                  isDarkMode ? "1px solid rgba(255,255,255,.1)  " : "none"
                }`,
                borderRadius: "10px",
              }}
            >
              <div className="bottom flex col" style={{ alignItems: "end" }}>
                <ul className="flex col" style={{ alignItems: "end" }}>
                  <li
                    className="flex"
                    onClick={() => navigate("/profile")}
                    data-nav="Dashboard"
                  >
                    <RiDashboardLine />
                  </li>
                  <li
                    className="flex"
                    onClick={() => navigate(`/user/${userData?._id}`)}
                    data-nav="Profile"
                  >
                    <CgUser />
                  </li>

                  <li
                    className="flex"
                    onClick={() => navigate(`/chat`)}
                    data-nav="Messages"
                  >
                    <GrChat />
                  </li>
                  <li
                    className="flex"
                    onClick={() => {
                      handleLogout();
                      setProfileMenu(false);
                    }}
                    data-nav="Logout"
                  >
                    <BiLogOut />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <button
            style={{
              background: "#eee",
              color: "black",
              fontWeight: "600",
              border: "none",
            }}
            onClick={() =>
              tokenId
                ? null
                : walletId
                ? openLogin()
                : openWallets() + connectMetaMask()
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
