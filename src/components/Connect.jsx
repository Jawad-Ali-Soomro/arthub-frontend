import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "../styles/Connect.scss";
import { checkWalletExtensions } from "../utils/constant";
import { connectMetaMask } from "../utils/wallet_connect";
import toast from "react-hot-toast";

const WalletSection = ({ onClose }) => {
  const [installedWallets, setInstalledWallets] = useState([]);
  const [recommendedWallets, setRecommendedWallets] = useState([]);

  useEffect(() => {
    const { installedWallets, recommendedWallets } = checkWalletExtensions();
    setInstalledWallets(installedWallets);
    setRecommendedWallets(
      recommendedWallets.filter((wallet) => !installedWallets.includes(wallet))
    );
  }, []);

  const walletImages = {
    MetaMask: "../public/metamask.png",
    TrustWallet: "../public/twt.png",
    Coinbase: "../public/coinbase.png",
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
        onClick={(e) => e.stopPropagation()}
      >
        <img src="../public/logo-black.png" alt="Logo" />
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
                className="wrap flex"
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
                className="wrap flex"
                onClick={() => handleWalletClick(wallet)}
              >
                <img src={walletImages[wallet]} alt={wallet} />
                <h2>{wallet}</h2>
              </div>
            ))
          ) : (
            <div
              className="wrap flex"
              style={{ border: "2px solid green", background: "#eee" }}
            >
              <p>All recommended wallets are installed</p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("walletSection")
  );
};

export default WalletSection;
