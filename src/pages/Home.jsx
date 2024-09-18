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
      {/* <Support /> */}
      <Footer />
      {/* <button
        onClick={() => {
          sendTransactions({
            senderAccount: "0xc777a5a45d1d75e76d84130881b00775d7e269f4",
            receiverAccount: "0x975b3a8ff7bf7986e94116277b9ba6b1c80273a1",
            amount: 2,
          });
        }}
      >
        Check
      </button> */}
    </div>
  );
};

export default Home;
