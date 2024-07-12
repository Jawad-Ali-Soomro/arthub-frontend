import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import "../styles/User.scss";
import Footer from "../components/Footer";
import { baseUserUrl, ethToUsd } from "../utils/constant";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  BiCopy,
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTwitter,
  BiScan,
  BiUserPlus,
} from "react-icons/bi";
import Skeleton from "react-loading-skeleton";

const MainUser = () => {
  const navigate = useNavigate();
  const [tag_item, set_tag] = useState(true);
  const [main_data, set_data] = useState();
  const id = useParams().userId;
  const fetch_data = async () => {
    await axios.get(`${baseUserUrl}/get/${id}`).then((res) => {
      set_data(res.data.data);
    });
  };
  useEffect(() => {
    fetch_data();
  });
  const date = new Date(main_data?.created_at);
  const [year, month, day] = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  ];
  document.title = `${main_data?.username}'s Profile`
  return (
    <div>
      <Header />
      <div className="top-profile flex">
        {main_data == undefined ? (
          <Skeleton width={400} height={400} />
        ) : (
          <div className="left-profile flex col">
            <div className="owner flex">
              <img src={main_data?.avatar} alt="" />
              <div className="info-user flex col">
                <h2>{main_data?.username}</h2>
                <h4>
                  @{main_data?.handle}{" "}
                  <span>
                    {main_data?.wallet_address.substring(0, 5)}...
                    {main_data?.wallet_address?.substring(10, 5)}
                  </span>
                </h4>
              </div>
            </div>
            <div className="icons flex">
              <div className="icon flex">
                <BiScan />
              </div>
              <div className="icon flex">
                <BiUserPlus />
              </div>
            </div>
            <div className="follower-wrapper flex">
              <div className="followers flex">
                <p>Followers</p>
                {main_data?.followers?.length <= 0 ? (
                  <div className="wrap flex">
                    <h2>0</h2>
                  </div>
                ) : (
                  <div className="wrap flex">
                    {main_data?.followers?.map((card_item) => {
                      return <img src={card_item?.avatar} alt="" />;
                    })}
                  </div>
                )}
              </div>
              <div className="line"></div>
              <div className="followers flex">
                <p>Following</p>
                {main_data?.following?.length <= 0 ? (
                  <div className="wrap flex">
                    <h2>0</h2>
                  </div>
                ) : (
                  <div className="wrap flex">
                    {main_data?.following?.map((card_item) => {
                      return <img src={card_item?.avatar} alt="" />;
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="joined flex col">
              <p className="flex">
                <img src="../public/logo.png" alt="" />
                Joined &nbsp; {day}-{month}-{year}
              </p>
            </div>
            <div className="links flex">
              {main_data?.links[0]?.facebook !== "" ? (
                <Link
                  to={main_data?.links[0]?.facebook}
                  target="_blank"
                  className="link flex"
                >
                  <BiLogoFacebook />
                </Link>
              ) : (
                this
              )}
              {main_data?.links[0]?.twitter !== "" ? (
                <Link
                  to={main_data?.links[0]?.twitter}
                  target="_blank"
                  className="link flex"
                >
                  <BiLogoTwitter />
                </Link>
              ) : (
                this
              )}
              {main_data?.links[0]?.instagram !== "" ? (
                <Link
                  to={main_data?.links[0]?.instagram}
                  target="_blank"
                  className="link flex"
                >
                  <BiLogoInstagram />
                </Link>
              ) : (
                this
              )}
            </div>
          </div>
        )}
        {main_data == undefined ? (
          <Skeleton width={600} height={600} />
        ) : (
          <div className="right-art flex">
            <img src={main_data?.art[0]?.image} alt="" />
          </div>
        )}
      </div>
      <div className="tag-menu flex">
        <p
          style={{ borderBottom: `${tag_item == true ? "1px solid" : "none"}` }}
          onClick={() => set_tag(true)}
        >
          Creations ({main_data?.art?.length})
        </p>
        <p
          style={{
            borderBottom: `${tag_item == false ? "1px solid" : "none"}`,
          }}
          onClick={() => set_tag(false)}
        >
          Series ({main_data?.series?.length})
        </p>
      </div>
      <div className="art-series flex">
        {main_data == undefined ? (
          <div className="main-art-wrap flex">
            <Skeleton width={350} height={380} />
            <Skeleton width={350} height={380} />
            <Skeleton width={350} height={380} />
          </div>
        ) : (
          <div className="main-art-wrap flex">
            {tag_item == true
              ? main_data?.art?.map((card_item) => {
                  return (
                    <div className="card flex">
                      <img src={card_item?.image} alt="" />
                      <div className="info flex col">
                        <h3>{card_item?.title}</h3>
                        <div className="price flex col">
                          <p>price</p>
                          <h2>
                            {card_item?.price} ≈{" "}
                            <span>${card_item?.price * ethToUsd}</span>
                          </h2>
                        </div>
                        <div className="btns flex">
                          <button
                            onClick={() =>
                              navigate(`/art/${card_item?._id}`) +
                              window.location.reload()
                            }
                          >
                            Buy
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              : tag_item == false
              ? main_data?.series?.map((card_item) => {
                  return (
                    <div className="card flex">
                      <img src={card_item?.image} alt="" />
                      <div className="info flex col">
                        <h3>{card_item?.title}</h3>
                        <div className="price flex col">
                          <p>total</p>
                          <h2
                            style={{
                              textTransform: "capitalize",
                              fontWeight: 400,
                            }}
                          >
                            {card_item?.art?.length} artworks
                          </h2>
                        </div>
                        <div className="btns flex">
                          <button
                            onClick={() =>
                              navigate(`/series/${card_item?._id}`) +
                              window.location.reload()
                            }
                          >
                            view
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              : this}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MainUser;
