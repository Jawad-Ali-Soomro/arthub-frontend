const baseUserUrl = "http://localhost:8080/api/v1/user";
const baseArtUrl = "http://localhost:8080/api/v1/art";
const baseSeriesUrl = "http://localhost:8080/api/v1/series";
const baseBidUrl = "http://localhost:8080/api/v1/bid";
const ethToUsd = 2494.73;

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
      value: weiAmount, // Set the value to the amount in wei
    },
  ];

  let result = await window.ethereum
    .request({ method: "eth_sendTransaction", params })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  return result;
};

export {
  baseArtUrl,
  baseUserUrl,
  baseSeriesUrl,
  ethToUsd,
  baseBidUrl,
  checkWalletExtensions,
  formatPrice,
  sendTransactions,
};
