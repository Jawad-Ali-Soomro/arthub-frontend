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
    <div className="connect-portal flex col" onClick={onClose}>
      <div
        className="main-connect flex col"
        style={{
          background: `${themeMode == "dark" ? "rgb(30,20,30)" : "white"}`,
          color: `${themeMode == "dark" ? "white" : "black"}`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={themeMode == "dark" ? "/logo-white.png" : "/logo-blacck.png"}
          alt="Logo"
        />
        <h1>Connect Wallet!</h1>

        <div
          className="installed-wallets main-wrapper flex col"
          style={{ marginTop: "20px" }}
        >
          <h2>Installed Wallets</h2>
          {installedWallets.length > 0 ? (
            installedWallets.map((wallet) => (
              <div
                key={wallet}
                className="wrap border flex"
                onClick={() => handleWalletClick(wallet)}
              >
                <img src={walletImages[wallet]} alt={wallet} />
                <h2>{wallet}</h2>
              </div>
            ))
          ) : (
            <div
              className="wrap flex"
              style={{ border: "2px solid red", background: "#eee" }}
            >
              <p>No wallet extensions are installed</p>
            </div>
          )}
        </div>

        <div
          className="recommended-wallets main-wrapper flex col"
          style={{ marginTop: "20px" }}
        >
          <h2>Recommended Wallets</h2>
          {recommendedWallets.length > 0 ? (
            recommendedWallets.map((wallet) => (
              <div
                key={wallet}
                className="wrap border flex"
                onClick={() => handleWalletClick(wallet)}
              >
                <img src={walletImages[wallet]} alt={wallet} />
                <h2>{wallet}</h2>
              </div>
            ))
          ) : (
            <div
              className="wrap flex"
              style={{
                border: "2px solid green",
                background: "#eee",
                height: "35px",
              }}
            >
              <p>All wallets are installed</p>
            </div>
          )}
        </div>

        <div className="new-text flex">
          <p>New To Wallets</p>
          <Link
            className="link"
            to={"https://portal.thirdweb.com/connect/in-app-wallet/overview"}
            target="_blank"
          >
            Get Started!
          </Link>
        </div>
      </div>
    </div>,
    document.getElementById("walletSection")
  );
};

export default WalletSection;
