import React from "react";
import { MdDashboard, MdEmail, MdOutlineEmail } from "react-icons/md";
import {
  BiAt,
  BiCollection,
  BiDollar,
  BiEdit,
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTwitter,
  BiPaint,
  BiUpload,
  BiUser,
} from "react-icons/bi";
import { BsBell, BsInstagram, BsTwitter } from "react-icons/bs";
import { CgLogOut } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.scss";
import { useState } from "react";
import { GrConnect } from "react-icons/gr";
import { FaAt, FaBeer } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import CustomTooltip from "../components/CustomTooltip";

const Profile = () => {
  const dataToParse = window.localStorage.getItem("userId");
  const connectedWallet = window.sessionStorage.getItem("token");
  const userData = JSON.parse(dataToParse);
  const themeMode = window.localStorage.getItem("themeMode");
  const handleLogout = () => {
    window.localStorage.removeItem("authToken");
    window.localStorage.removeItem("userId");
    window.sessionStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(1);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const data = [
    {
      name: "Followers",
      value: userData?.followers?.length,
    },
    {
      name: "Following",
      value: userData?.following?.length,
    },
    {
      name: "Creations",
      value: userData?.art?.length,
    },
    {
      name: "Series",
      value: userData?.series?.length,
    },
    {
      name: "Items Sold",
      value: 15,
    },
    {
      name: "Items Bought",
      value: 10,
    },
    {
      name: "Total Assets",
      value: 5,
    },

    {
      name: "Total Sale",
      value: 4,
    },
  ];
  return (
    <div>
      <div className="sidebar flex col">
        <img
          src={
            themeMode === "dark"
              ? "../public/logo-white.png"
              : "../public/logo.png"
          }
          alt="logo"
          onClick={() => navigate("/")}
        />
        <div className="nav-icons flex col">
          <div
            className="icon border flex"
            style={{
              background: `${tabIndex == 1 ? "#333" : ""}`,
              color: `${tabIndex == 1 ? "white" : ""}`,
            }}
            onClick={() => setTabIndex(1)}
          >
            <MdDashboard />
          </div>
          <div
            className="icon border flex"
            style={{
              background: `${tabIndex == 2 ? "#333" : ""}`,
              color: `${tabIndex == 2 ? "white" : ""}`,
            }}
            onClick={() => setTabIndex(2)}
          >
            <BiUser />
          </div>
          <div
            className="icon border flex"
            style={{
              background: `${tabIndex == 3 ? "#333" : ""}`,
              color: `${tabIndex == 3 ? "white" : ""}`,
            }}
            onClick={() => setTabIndex(3)}
          >
            <BiPaint />
          </div>
          <div
            className="icon border flex"
            style={{
              background: `${tabIndex == 4 ? "#333" : ""}`,
              color: `${tabIndex == 4 ? "white" : ""}`,
            }}
            onClick={() => setTabIndex(4)}
          >
            <BiCollection />
          </div>
          <div
            className="icon border flex"
            style={{
              background: `${tabIndex == 5 ? "#333" : ""}`,
              color: `${tabIndex == 5 ? "white" : ""}`,
            }}
            onClick={() => setTabIndex(5)}
          >
            <BsBell />
          </div>
        </div>
        <div className="btn-logout border flex" onClick={() => handleLogout()}>
          <CgLogOut />
        </div>
      </div>
      <div className="main-profile flex">
        {tabIndex == 1 ? (
          <div className="welcome-wrap flex col">
            <div className="profile flex col">
              {/* <h1>Dashboard</h1>
              <p>Review your progress and manage your artworks and series.</p> */}
            </div>
            <div className="wrap flex">
              <div
                className="card flex border col  "
                onClick={() => setTabIndex(3)}
              >
                <div className="icon flex border">
                  <BiPaint />
                </div>
                <div className="main flex">
                  <h1>
                    {userData?.art?.length <= 9
                      ? "0" + userData?.art?.length
                      : userData?.art?.length}
                  </h1>
                </div>
              </div>
              <div
                className="card flex border col  "
                onClick={() => setTabIndex(4)}
              >
                <div className="icon flex border">
                  <BiCollection />
                </div>
                <div className="main flex">
                  <h1>
                    {userData?.series?.length <= 9
                      ? "0" + userData?.series?.length
                      : userData?.series?.length}
                  </h1>
                </div>
              </div>
              <div className="card flex border col  ">
                <div className="icon flex border">
                  <BiDollar />
                </div>
                <div className="main flex">
                  <h1>$100</h1>
                </div>
              </div>
            </div>
            <div className="chart flex">
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart
                  width={500}
                  height={300}
                  data={data}
                  margin={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <XAxis dataKey="name" tick={false} />
                  {/* <YAxis /> */}
                  <Tooltip content={<CustomTooltip />} />
                  {/* <Legend /> */}
                  <Area
                    fill="#333"
                    type="monotone"
                    dataKey="value"
                    stroke="#666"
                  />
                </AreaChart>
              </ResponsiveContainer>
              {/* <ResponsiveContainer width="60%" height={300}>
                <PieChart width={500}>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="76%"
                    cy="50%"
                    outerRadius={140}
                    fill="#8884d8"
                    label
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer> */}
            </div>
            {/* <div className="connected flex col">
              <div className="wrap flex col">
                <p className="flex">
                  <GrConnect /> Connected Wallet
                </p>
                <h2>{connectedWallet}</h2>
              </div>
              <button>Disconnect</button>
            </div> */}
          </div>
        ) : (
          this
        )}
        {tabIndex == 2 ? (
          <div className="update-wrap flex">
            <div className="left flex col">
              <div className="profile flex">
                <img src={userData?.avatar} alt="" />
                <h2>{userData?.username}</h2>
              </div>
              <div className="flex" style={{ gap: "10px" }}>
                <div className="wrap flex border">
                  <p>FOLLOWERS</p>
                  <h2>{userData?.followers?.length}</h2>
                </div>
                <div className="wrap flex border">
                  <p>Followings</p>
                  <h2>{userData?.following?.length}</h2>
                </div>
              </div>
              <div className="flex" style={{ gap: "10px" }}>
                <div className="wrap flex border">
                  <p>Creations</p>
                  <h2>{userData?.art?.length}</h2>
                </div>
                <div className="wrap flex border">
                  <p>Series</p>
                  <h2>{userData?.series?.length}</h2>
                </div>
              </div>
              {userData?.links?.length == 1 ? (
                <div className="links flex">
                  {userData?.links[0]?.facebook == "" ? (
                    this
                  ) : (
                    <Link
                      to={userData?.links[0]?.facebook}
                      className="flex link border"
                    >
                      <BiLogoFacebook />
                    </Link>
                  )}
                  {userData?.links[0]?.twitter == "" ? (
                    this
                  ) : (
                    <Link
                      to={userData?.links[0]?.twitter}
                      className="flex link border"
                    >
                      <BiLogoTwitter />
                    </Link>
                  )}
                  {userData?.links[0]?.instagram == "" ? (
                    this
                  ) : (
                    <Link
                      to={userData?.links[0]?.instagram}
                      className="flex link border"
                    >
                      <BiLogoInstagram />
                    </Link>
                  )}
                </div>
              ) : (
                this
              )}
              <button>Update</button>
            </div>
            <div className="right flex col">
              <h1>Update Profile</h1>
              <div className="form flex col">
                <div className="input-wrap flex border">
                  <MdOutlineEmail />
                  <input type="text" placeholder={userData?.email} />
                </div>
                <div className="input-wrap flex border">
                  <BiUser />
                  <input type="text" placeholder={userData?.username} />
                </div>
                <div className="input-wrap flex border">
                  <BiAt />
                  <input type="text" placeholder={userData?.handle} />
                </div>
                <div className="input-wrap flex border">
                  <BiLogoFacebook />
                  <input
                    type="text"
                    placeholder={userData?.links[0]?.facebook}
                  />
                </div>
                <div className="input-wrap flex border">
                  <BsTwitter />
                  <input
                    type="text"
                    placeholder={userData?.links[0]?.twitter}
                  />
                </div>
                <div className="input-wrap flex border">
                  <BsInstagram />
                  <input
                    type="text"
                    placeholder={userData?.links[0]?.instagram}
                  />
                </div>
                <div className="file flex col">
                  <input type="file" name="" id="" />
                  <BiUpload className="icon" />
                  <p>Upload Profile</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          this
        )}
      </div>
    </div>
  );
};

export default Profile;
