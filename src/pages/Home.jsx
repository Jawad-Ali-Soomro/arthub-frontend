import React from "react";
import "../styles/Home.scss";
import Header from "../components/Header";
import Featured from "../components/Featured";
import FeaturedSeries from "../components/feturedSeries";
import Spotlight from "../components/Spotlight";
import Footer from "../components/Footer";
import Top from "../components/Top";
import Support from "../components/Support";
import { sendTransactions } from "../utils/constant";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  document.title = "Artchain";
  return (
    <div>
      <Header />

      <Top />

      <Featured />
      <FeaturedSeries />
      <Spotlight />
      <Footer />
    </div>
  );
};

export default Home;
