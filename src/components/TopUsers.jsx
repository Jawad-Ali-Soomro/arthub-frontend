import axios from "axios";
import React from "react";
import { useState } from "react";
import { baseUserUrl } from "../utils/constant";
import { useEffect } from "react";
import "../styles/TopUsers.scss";
import { useNavigate } from "react-router-dom";

const TopUsers = () => {
  const [data, set_data] = useState();

  const fetch_data = async () => {
    const coming_data = await axios.get(`${baseUserUrl}/allUsers`);
    set_data(coming_data?.data?.users?.slice(0, 6));
  };
  useEffect(() => {
    fetch_data();
  }, data);
  const navigate = useNavigate();
  return (
    <div className="users flex col">
      <h1>Top Sellers</h1>
      <p>
        Where innovation meets excellence, highlighting the finest creations
        that push boundaries and set new standards.
      </p>
      <div className="wrapper flex">
        {data?.map((item) => {
          return (
            <div className="card flex col">
              <img
                className="border"
                src={item?.avatar}
                onClick={() => navigate(`/user/${item?._id}`)}
                alt=""
              />
              <div className="info flex">
                <p>Sale</p>
                <p>$100</p>
              </div>
              <div className="line border"></div>
              <button>VIEW</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopUsers;
