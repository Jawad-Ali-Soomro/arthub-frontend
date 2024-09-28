import React from "react";
import "../styles/Home.scss";
import Header from "../components/Header";
import Featured from "../components/Featured";
import FeaturedSeries from "../components/feturedSeries";
import Spotlight from "../components/Spotlight";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { BsArrowDown } from "react-icons/bs";

const Home = () => {
  const navigate = useNavigate();
  document.title = "Artchain";
  const [carouselStep, setStep] = useState(1);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (carouselStep <= 4) {
        setStep(carouselStep + 1);
      } else {
        setStep(1);
      }
    }, 2000);

    // Cleanup the timeout on unmount or when carouselStep changes
    return () => clearTimeout(timer);
  }, [carouselStep]); // Runs only when `carouselStep` changes

  return (
    <div>
      <Header />
      <div className="intro flex col">
        <h1>Discover the world of art!</h1>
        <div className="carousel flex">
          <div
            className="card"
            style={{
              transform: `${
                carouselStep === 1 ? "translateY(0)" : "translateY(-200%)"
              }`,
              opacity: `${carouselStep === 1 ? "1" : "0"}`,
            }}
          >
            <img
              src="https://orange-large-reindeer-667.mypinata.cloud/ipfs/QmXAjKQL4MdPaY5dVArZWTEUaKNaeHxXPJDX99mR4rKhuf"
              alt=""
            />
          </div>
          <div
            className="card"
            style={{
              transform: `${
                carouselStep === 2 ? "translateX(0)" : "translateX(-200%)"
              }`,
              opacity: `${carouselStep === 2 ? "1" : "0"}`,
            }}
          >
            <img
              src="https://orange-large-reindeer-667.mypinata.cloud/ipfs/QmbVou36UiXYjUpb5VAgDvgCKGF82d8ZCftjFbmgAYJi62"
              alt=""
            />
          </div>
          <div
            className="card"
            style={{
              transform: `${
                carouselStep === 3 ? "translateX(0)" : "translateX(-200%)"
              }`,
              opacity: `${carouselStep === 3 ? "1" : "0"}`,
            }}
          >
            <img
              src="https://orange-large-reindeer-667.mypinata.cloud/ipfs/QmZtBTCgTe43bM9FT84UwDWL18WNyCjD8q7uNMGYRMJDgh"
              alt=""
            />
          </div>
          <div
            className="card"
            style={{
              transform: `${
                carouselStep === 4 ? "translateY(0)" : "translateY(-200%)"
              }`,
              opacity: `${carouselStep === 4 ? "1" : "0"}`,
            }}
          >
            <img
              src="https://orange-large-reindeer-667.mypinata.cloud/ipfs/QmQbY5sdvm6P36exERN2Fb3sgHyFqZpmUcQuwQqHydzkZy"
              alt=""
            />
          </div>
        </div>
        <div className="arrow-down flex">
          <BsArrowDown />
        </div>
      </div>

      {/* <Top /> */}
      <Featured />
      <FeaturedSeries />
      <Spotlight />
      <Footer />
    </div>
  );
};

export default Home;
