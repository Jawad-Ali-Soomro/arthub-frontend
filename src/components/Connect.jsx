import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "../styles/Connect.scss";
import { checkWalletExtensions } from "../utils/constant";
import { connectMetaMask } from "../utils/wallet_connect";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const WalletSection = ({ onClose }) => {
  const [installedWallets, setInstalledWallets] = useState([]);
  const [recommendedWallets, setRecommendedWallets] = useState([]);
  const themeMode = window.localStorage.getItem("themeMode");
  useEffect(() => {
    const { installedWallets, recommendedWallets } = checkWalletExtensions();
    setInstalledWallets(installedWallets);
    setRecommendedWallets(
      recommendedWallets.filter((wallet) => !installedWallets.includes(wallet))
    );
  }, []);

  const walletImages = {
    MetaMask: "/metamask.png",
    TrustWallet: "/twt.png",
    Coinbase: "/coinbase.png",
  };

  const handleWalletClick = (wallet) => {
    if (wallet === "MetaMask") {
      connectMetaMask();
    } else if (wallet === "TrustWallet") {
      window.location.href =
        "https://chromewebstore.google.com/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph";
    } else if (wallet === "Coinbase") {
      toast.error("Service Unavailable");
    }
  };

  return ReactDOM.createPortal(
    <div
      className="connect-portal flex col"
      style={{ borderRadius: "0" }}
      onClick={onClose}
    >
      <div
        className="main-connect flex col"
        style={{
          background: `${themeMode == "dark" ? "rgb(30,20,30)" : "white"}`,
          color: `${themeMode == "dark" ? "white" : "black"}`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img src="/metamask.png" alt="" />
        <h1 style={{ fontWeight: "800", fontSize: "1.2rem" }}>
          Opening Metamask...
        </h1>
        <p
          style={{
            maxWidth: "300px",
            textAlign: "center",
            fontSize: ".9rem",
          }}
        >
          confirm action in metamask extension.
        </p>
        <img src="/loader.svg" alt="" />
      </div>
    </div>,
    document.getElementById("walletSection")
  );
};

export default WalletSection;
