import { ethers } from "ethers";
import toast from "react-hot-toast";

export const connectMetaMask = async () => {
  if (window.ethereum) {
    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        const account = accounts[0];

        // Create an ethers provider
        const provider = new ethers.BrowserProvider(window.ethereum);

        // Get the balance of the connected account
        const balanceWei = await provider.getBalance(account);

        // Convert balance from Wei to Ether
        const balance = ethers.getUint(balanceWei);

        // Display success message
        toast.success("Wallet Connected!");

        // Store account and balance in session storage
        window.sessionStorage.setItem("token", account);
        window.sessionStorage.setItem("balance", balance);

        // Optionally, reload the page after a short delay
        setTimeout(() => {
          location.reload();
        }, 1500); // 1500 milliseconds = 1.5 seconds

        return {
          success: true,
          account,
          balance,
        };
      } else {
        toast.error("No accounts found in MetaMask");
      }
    } catch (error) {
      toast.error("Error connecting to MetaMask");
      console.error(error);
    }
  } else {
    toast.error("MetaMask is not installed");
  }
};
