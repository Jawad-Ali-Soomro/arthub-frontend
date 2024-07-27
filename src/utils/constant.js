import toast, { Toaster } from "react-hot-toast";
import Web3 from "web3";
const baseUserUrl = "http://localhost:8080/api/v1/user";
const baseArtUrl = "http://localhost:8080/api/v1/art";
const baseSeriesUrl = "http://localhost:8080/api/v1/series";
const ethToUsd = 3800;

// https://arthub-backend-psi.vercel.app

// https://arthub-backend-psi.vercel.app

const checkWalletExtensions = () => {
  const installedWallets = [];
  const recommendedWallets = ["MetaMask", "TrustWallet", "Coinbase"];

  // Check for MetaMask
  if (typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask) {
    installedWallets.push("MetaMask");
  }

  // Check for Trust Wallet
  if (typeof window.ethereum !== "undefined" && window.ethereum.isTrust) {
    installedWallets.push("TrustWallet");
  }

  // Check for Coinbase Wallet
  if (typeof window.coinbaseWalletExtension !== "undefined") {
    installedWallets.push("Coinbase");
  }

  return { installedWallets, recommendedWallets };
};

export {
  baseArtUrl,
  baseUserUrl,
  baseSeriesUrl,
  ethToUsd,
  checkWalletExtensions,
};
