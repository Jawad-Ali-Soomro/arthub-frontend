import React from "react";
import "../styles/Footer.scss";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  BiLogoDiscord,
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTwitter,
  BiLogoYoutube,
} from "react-icons/bi";

const Footer = () => {
  return (
    <div className="footer-wrap">
      <div className="left flex col">
        <img src="/logo.png" alt="Logo" style={{ width: "50px" }} />
        <div className="news-box flex col">
          <p>ARTWORK & NEWS TO YOUR BOX</p>
          <div className="input-box border">
            <input type="text" placeholder="EMAIL ADDRESS" />
            <button>Subscribe</button>
          </div>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeZhVNtTyuI9WqQf2Cj5vwx5geP0oQOOKvaEzU5jO5pkALDzA/viewform?usp=sf_link"
            target="_blank"
            rel="noopener noreferrer"
            className="link flex"
          >
            Submit Artist Application <FaArrowRightLong />
          </a>
        </div>
      </div>
      <div className="right flex">
        <div className="community flex col">
          <p>LINKS</p>
          <ul className="flex col" style={{ gap: "10px" }}>
            <li>Events</li>
            <li>login account</li>
            <li>Manage account</li>
            <li>create an account</li>
          </ul>
        </div>
        <div className="community flex col">
          <p>COMMUNITY</p>
          <ul className="flex col">
            <li>Help Centre</li>
            <li>Community Guidelines</li>
            <div className="links flex">
              <ul className="flex" style={{ gap: "10px" }}>
                <li>
                  <a href="">
                    <BiLogoFacebook style={{ fontSize: "1.2rem" }} />
                  </a>
                </li>
                <li>
                  <a href="">
                    <BiLogoInstagram style={{ fontSize: "1.2rem" }} />
                  </a>
                </li>
                <li>
                  <a href="">
                    <BiLogoTwitter style={{ fontSize: "1.2rem" }} />
                  </a>
                </li>
                <li>
                  <a href="">
                    <BiLogoDiscord style={{ fontSize: "1.2rem" }} />
                  </a>
                </li>
                <li>
                  <a href="">
                    <BiLogoYoutube style={{ fontSize: "1.2rem" }} />
                  </a>
                </li>
              </ul>
            </div>
          </ul>
        </div>
        <div className="community flex col">
          <p>LEGAL</p>
          <ul className="flex col" style={{ gap: "10px" }}>
            <li>Terms of Service</li>
            <li>Report Content</li>
            <li>Cookie Preferences</li>
            <li>2024 &copy; arthub.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
