// utils/walletConnect.js

import toast from "react-hot-toast";

export const connectMetaMask = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        const account = accounts[0];
        toast.success("Connected To MetaMask");
        window.sessionStorage.setItem("token", account);
        setTimeout(function () {
          location.reload();
        }, 2000); // 1000 milliseconds = 1 second

        return {
          success: true,
          account,
        };
      } else {
        toast.error("No accounts found in MetaMask");
      }
    } catch (error) {
      toast.error("Error connecting to MetaMask");
    }
  } else {
    toast.error("MetaMask is not installed");
  }
};
