import axios from "axios";

const uploadToPinata = async (file) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        pinata_api_key: "32640dc83cc632b5a89b",
        pinata_secret_api_key:
          "e44244c6e4203fa425c71356f96b6e3b40917b23ce0d1bce07bdcfec41a58862",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading to Pinata:", error);
    throw error;
  }
};

export default uploadToPinata;
