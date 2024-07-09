import toast, { Toaster } from 'react-hot-toast'
import Web3 from 'web3'
const baseUserUrl = 'http://localhost:8080/api/v1/user'
const baseArtUrl = 'http://localhost:8080/api/v1/art'
const baseSeriesUrl = 'http://localhost:8080/api/v1/series'
const ethToUsd = 3800

const connectMetamask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Connected to Metamask!');
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        console.log(web3.eth.Contract);
        window.localStorage.setItem("token" , accounts[0])
        window.location.reload()
      } catch (error) {
        toast.error('Error connecting to Metamask:', error);
      }
    } else {
      toast.error('Please Install Metamask Extension');
    }
  };


export {baseArtUrl , baseUserUrl , baseSeriesUrl , ethToUsd , connectMetamask}