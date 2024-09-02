import React from "react";
import "../styles/Home.scss";
import Header from "../components/Header";
import Featured from "../components/Featured";
import FeaturedSeries from "../components/feturedSeries";
import Spotlight from "../components/Spotlight";
import Footer from "../components/Footer";
import Top from "../components/Top";
import Support from "../components/Support";

const Home = () => {
  document.title = "Artchain";
  return (
    <div>
      <Header />
      {/* <div className="banner flex">
        <div className="left flex col">
          <h1>Discover , Collect & Sell Art</h1>
          <p>
            Dicover the most outstanding digital art in all aspect of life ,
            create your own art and sell it here.
          </p>
          <button onClick={() => navigate("/explore/art")}>Explore</button>
        </div>
        <div className="right flex">
          <img src="./hero.png" alt="" />
        </div>
      </div> */}
      <Top />

      <Featured />
      <FeaturedSeries />
      {/* <TopUsers /> */}
      {/* <FeaturedAuction /> */}
      <Spotlight />
      {/* <div className="outro flex col">
        <h1 style={{ fontWeight: "900" }}>Transparent, secure art market.</h1>
        <div className="wrapper flex">
          <div className="card border flex col">
            <div className="top flex">
              <BiHeadphone className="icon" />
              <p>Help Center</p>
            </div>
            <p>Advice & Answers From Our Team.</p>
          </div>
          <div className="card border flex col">
            <div className="top flex">
              <BiLogoDiscord className="icon" />
              <p>Join Discord</p>
            </div>
            <p>Over 30K Members & Counting.</p>
          </div>
          <div className="card border flex col">
            <div className="top flex">
              <BiLogoTwitter className="icon" />
              <p>Follow Artchain</p>
            </div>
            <p>Product News, Twitter Spaces & More.</p>
          </div>
        </div>
      </div> */}
      <Support />
      <Footer />
    </div>
  );
};

export default Home;
