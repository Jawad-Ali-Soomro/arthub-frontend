import toast from "react-hot-toast";

const baseUserUrl = "http://localhost:8080/api/v1/user";
const baseArtUrl = "http://localhost:8080/api/v1/art";
const baseSeriesUrl = "http://localhost:8080/api/v1/series";
const baseBidUrl = "http://localhost:8080/api/v1/bid";
const baseDealUrl = "http://localhost:8080/api/v1/deal";

let ethToUsd = 2494.73; // Default value for global usage

// Function to update the ETH price
const updateethToUsd = async () => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    );
    const data = await response.json();
    ethToUsd = data.ethereum.usd;
    console.log(`Updated ETH price: $${ethToUsd}`);
  } catch (error) {
    console.error("Error fetching ETH price:", error);
  }
};

// Check if the window.ethereum is available
if (window.ethereum) {
  // Request account access if needed
  window.ethereum
    .request({ method: "eth_requestAccounts" })
    .then((accounts) => {
      // Accounts now exposed, you can interact with the user

      // Update the ETH price when accounts are exposed
      updateethToUsd();
    })
    .catch((error) =>
      console.error("User rejected account access or other error:", error)
    );
} else {
  console.log("Ethereum provider not found. Install MetaMask.");
}

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

function formatPrice(price) {
  if (price >= 1000) {
    return (price / 1000).toFixed(1) + "K";
  } else if (price >= 100000) {
    return Math.round(price);
  }
  return Math.round(price.toString());
}

const sendTransactions = async ({ senderAccount, receiverAccount, amount }) => {
  // Convert the amount from ether to wei (1 ether = 10^18 wei)
  const weiAmount = (amount * 1e18).toString(16);

  let params = [
    {
      from: senderAccount,
      to: receiverAccount,
      gas: Number(21000).toString(16),
      gasPrice: Number(2500000).toString(16),
      value: weiAmount,
    },
  ];

  let result = await window.ethereum
    .request({ method: "eth_sendTransaction", params })
    .then((res) => {
      toast(res);
    })
    .catch((err) => {
      toast.error("Error During Transaction Please Try Again!");
    });

  return result;
};

export {
  baseArtUrl,
  baseUserUrl,
  baseSeriesUrl,
  baseDealUrl,
  ethToUsd, // Export the global ethToUsd variable
  updateethToUsd, // Export the function to update ethToUsd
  baseBidUrl,
  checkWalletExtensions,
  formatPrice,
  sendTransactions,
};
