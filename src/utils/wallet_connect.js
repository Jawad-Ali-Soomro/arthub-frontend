import { ethers } from "ethers";
import toast from "react-hot-toast";

const contractABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "artId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "ArtListed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "artId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "ArtPurchased",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "artRegistry",
    outputs: [
      {
        internalType: "uint256",
        name: "artId",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isForSale",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "artId",
        type: "uint256",
      },
    ],
    name: "checkOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "artId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "listArtForSale",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "artId",
        type: "uint256",
      },
    ],
    name: "purchaseArt",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const contractAddress = "0x0fC5025C764cE34df352757e82f7B5c4Df39A836";

export const connectMetaMask = async () => {
  const themeMode = window.localStorage.getItem("themeMode");
  if (window.ethereum) {
    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        const account = accounts[0];
        const provider = new ethers.BrowserProvider(window.ethereum);

        // Get the balance of the connected account
        const balanceWei = await provider.getBalance(account);

        // Convert balance from Wei to Ether
        const balance = ethers.getUint(balanceWei);

        // Display success message
        toast.success("Wallet Connected!", {
          style: {
            borderRadius: "20px",
            background: themeMode == "dark" ? "rgb(23,20,32)" : "white",
            color: themeMode == "dark" ? "white" : "black",
            fontFamily: "Poppins",
            border: "1px solid #808090",
            boxShadow: "none",
          },
        });

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
        toast.error("No Account Found In Metamask!", {
          style: {
            borderRadius: "8px",
            background: themeMode == "dark" ? "rgb(23,20,32)" : "white",
            color: themeMode == "dark" ? "white" : "black",
            fontFamily: "Poppins",
            border: "1px solid #808090",
            boxShadow: "none",
          },
        });
      }
    } catch (error) {
      toast.error("Error Connecting Wallet!", {
        style: {
          borderRadius: "8px",
          background: themeMode == "dark" ? "rgb(23,20,32)" : "white",
          color: themeMode == "dark" ? "white" : "black",
          fontFamily: "Poppins",
          border: "1px solid #808090",
          boxShadow: "none",
        },
      });
      console.error(error);
    }
  } else {
    toast.error("Metamask Is Not Installed!", {
      style: {
        borderRadius: "25px",
        background: themeMode == "dark" ? "rgb(23,20,32)" : "white",
        color: themeMode == "dark" ? "white" : "black",
        fontFamily: "Poppins",
        border: "1px solid #808090",
        boxShadow: "none",
      },
    });
  }
};

export const getContractInstance = async () => {
  if (window.ethereum) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      return contract;
    } catch (error) {
      console.error("Error getting contract instance:", error);
      return null;
    }
  } else {
    console.log("MetaMask not detected!");
    return null;
  }
};

export const listArtForSale = async (artId, price) => {
  const contract = await getContractInstance();
  if (contract) {
    try {
      const priceInWei = ethers.parseEther(price.toString());
      await contract.listArtForSale(artId, priceInWei);
      toast.success("Art listed for sale!");
    } catch (error) {
      toast.error("Error listing art for sale!");
      console.error(error);
    }
  }
};

export const purchaseArt = async (artId) => {
  const contract = await getContractInstance();
  if (contract) {
    try {
      await contract.purchaseArt(artId);
      toast.success("Art purchased successfully!");
    } catch (error) {
      toast.error("Error purchasing art!");
      console.error(error);
    }
  }
};
