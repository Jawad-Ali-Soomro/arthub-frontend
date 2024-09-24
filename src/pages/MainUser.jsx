import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import "../styles/User.scss";
import Footer from "../components/Footer";
import { baseConversationUrl, baseUserUrl, ethToUsd } from "../utils/constant";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  BiAt,
  BiCopy,
  BiImage,
  BiLayer,
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTwitter,
  BiUser,
} from "react-icons/bi";
import toast from "react-hot-toast";
import { MdVerified } from "react-icons/md";
import ImageModal from "../components/ImageModal";
import uploadToPinata from "../utils/upload";

const MainUser = () => {
  const navigate = useNavigate();
  const [tag_item, set_tag] = useState(true);
  const [main_data, set_data] = useState();
  const { userId } = useParams();
  const [show_followers, set_show_followers] = useState(false);
  const [show_followings, set_show_followings] = useState(false);
  const loggedInId = window.localStorage.getItem("userId");
  const parsedUser = JSON.parse(loggedInId);

  const [avatar, setAvatar] = useState(main_data?.avatar);
  const [imageUrl, setImageUrl] = useState(main_data?.avatar);
  const [updateData, setUpdatedata] = useState({
    username: main_data?.username,
    handle: main_data?.handle,
    facebook: main_data?.links[0]?.facebook,
    instagram: main_data?.links[0]?.instagram,
    twitter: main_data?.links[0]?.twitter,
    avatar: imageUrl,
  });

  const fetch_data = async () => {
    await axios.get(`${baseUserUrl}/get/${userId}`).then((res) => {
      set_data(res.data.data);
    });
  };
  useEffect(() => {
    fetch_data();
  }, [updateData, main_data]);

  const date = new Date(main_data?.created_at);
  const [year, month, day] = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  ];
  document.title = `${main_data?.username}'s Profile`;

  const initializeConv = async () => {
    const chatInitialized = await axios.post(`${baseConversationUrl}/start`, {
      userOneId: parsedUser?._id,
      userTwoId: userId,
    });
    chatInitialized
      ? toast.success("Conversation Initialized", {
          style: {
            background: "white",
            color: "black",
            borderRadius: " 20px",
          },
        }) + navigate("/chat")
      : this;
  };

  function getMonthName(monthNumber) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[monthNumber - 1];
  }

  const monthInText = getMonthName(month);

  const dataToParse = window.localStorage.getItem("userId");
  const userData = JSON.parse(dataToParse);

  const [btnText, setBtnText] = useState("FOLLOW");

  const loggedInToken = window.localStorage.getItem("authToken");

  useEffect(() => {
    if (main_data?.followers?.some((item) => item._id === userData?._id)) {
      setBtnText("UNFOLLOW");
    } else {
      setBtnText("FOLLOW");
    }
  }, [main_data, userData]);

  const toggleFollow = async () => {
    if (loggedInToken) {
      try {
        const res = await axios.patch(`${baseUserUrl}/toggle/follow`, {
          userId: main_data?._id,
          loggedInId: loggedInToken,
        });
        const message = res.data.message;
        if (message === "User followed!") {
          setBtnText("UNFOLLOW");
          toast.success(`Following ${main_data?.username}!`, {
            style: {
              background: "white",
              color: "black",
              borderRadius: " 20px",
            },
          });
          set_data((prevData) => ({
            ...prevData,
            followers: [...prevData.followers, { _id: userData?._id }],
          }));
        } else if (message === "User unfollowed!") {
          setBtnText("FOLLOW");
          toast.success(`Unfollowing ${main_data?.username}!`, {
            style: {
              background: "white",
              color: "black",
              borderRadius: " 20px",
            },
          });
          set_data((prevData) => ({
            ...prevData,
            followers: prevData.followers.filter(
              (follower) => follower._id !== userData?._id
            ),
          }));
        }
      } catch (error) {
        console.error("Error following/unfollowing user:", error);
        toast.error("An error occurred. Please try again!", {
          style: {
            background: "white",
            color: "black",
            borderRadius: " 20px",
          },
        });
      }
    } else {
      toast.error("Please Login!", {
        style: {
          background: "white",
          color: "black",
          borderRadius: " 20px",
        },
      });
    }
  };

  const closeFollowers = () => {
    set_show_followers(false);
  };
  const closeFollowing = () => {
    set_show_followings(false);
  };
  const themeMode = window.localStorage.getItem("themeMode");

  const [show_profile, setShow] = useState(false);

  const onClose = () => setShow(false);

  const [updateUser, setUpdate] = useState(false);

  const hideUpdate = () => {
    setUpdate(false);
  };

  const handleAvatarChange = async (e) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
    try {
      const uploadResult = await uploadToPinata(file);
      setImageUrl(
        "https://orange-large-reindeer-667.mypinata.cloud/ipfs/" +
          uploadResult.IpfsHash
      );
    } catch (error) {
      console.error(error);
      toast.error("Please Upload Avatar!", {
        style: {
          background: "white",
          color: "black",
          borderRadius: " 20px",
        },
      });
    }
  };

  const handleUpdateChange = (e) => {
    setUpdatedata((prevState) => ({
      ...prevState, // Preserve the other fields
      [e.target.name]: e.target.value, // Update the field based on input name
    }));
  };

  const handleUpdate = async () => {
    // if (
    //   !updateData.username ||
    //   !updateData?.handle ||
    //   !updateData.facebook ||
    //   !updateData?.instagram ||
    //   !updateData.twitter
    // ) {
    //   toast.error("Please Fill All Fields!");
    // } else {
    const updatedUser = await axios.put(
      `${baseUserUrl}/update/${parsedUser?._id}`,
      {
        username: updateData?.username
          ? updateData?.username
          : main_data?.username,
        handle: updateData?.handle ? updateData?.handle : main_data?.handle,
        facebook: updateData?.facebook
          ? updateData?.facebook
          : main_data?.links[0]?.facebook,
        instagram: updateData?.instagram
          ? updateData?.instagram
          : main_data?.links[0]?.instagram,
        twitter: updateData?.twitter
          ? updateData?.twitter
          : main_data?.links[0]?.twitter,
        avatar: imageUrl ? imageUrl : main_data?.avatar,
      }
    );
    updatedUser?.data.message == "Account Updated!"
      ? toast.success("Account Updated Login Again!", {
          style: {
            background: "white",
            color: "black",
            borderRadius: " 20px",
          },
        }) +
        setUpdate(false) +
        window.location.reload()
      : toast.error(updatedUser?.data.message, {
          style: {
            background: "white",
            color: "black",
            borderRadius: " 20px",
          },
        });
  };
  // };

  return (
    <div>
      <Header />
      <div className="top-profile flex">
        {!main_data ? (
          <div
            className="wrap flex"
            style={{ width: "400px", height: "500px" }}
          >
            <img src="/loader.svg" style={{ width: "50px" }} alt="" />
          </div>
        ) : (
          <div className="left flex col">
            <div className="wrap flex">
              <img
                src={main_data?.avatar}
                onClick={() => setShow(true)}
                // className="border"
                alt=""
              />
              <div className="info flex col">
                <h1>{main_data?.username}</h1>
                <div className="handle flex">
                  <p className="flex">
                    @{main_data?.handle.split(" ")}{" "}
                    {main_data?.isPrime == true ? (
                      <MdVerified style={{ paddingLeft: "2px" }} />
                    ) : (
                      this
                    )}{" "}
                  </p>
                  <p>
                    {main_data?.wallet_address.substring(0, 5)}...
                    {main_data?.wallet_address.substring(
                      main_data?.wallet_address.length - 5
                    )}
                    <span>
                      <BiCopy />
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="btns flex">
              <div
                className="sect flex border"
                onClick={() => set_show_followers(true)}
              >
                <h2>{main_data?.followers?.length}</h2>
                <p>Followers</p>
              </div>
              <div
                className="sect flex border"
                onClick={() => set_show_followings(true)}
              >
                <h2>{main_data?.following?.length}</h2>
                <p>following</p>
              </div>
            </div>
            <div className="join border flex">
              <p>Joined</p>
              <p style={{ fontFamily: "Inter" }}>
                {day} - {monthInText} - {year}
              </p>
            </div>
            <div className="links flex">
              {main_data?.links[0]?.facebook ? (
                <Link
                  className="link flex border"
                  target="_blank"
                  to={main_data?.links[0]?.facebook}
                >
                  <BiLogoFacebook />
                </Link>
              ) : null}
              {main_data?.links[0]?.twitter ? (
                <Link
                  className="link flex border"
                  target="_blank"
                  to={main_data?.links[0]?.twitter}
                >
                  <BiLogoTwitter />
                </Link>
              ) : null}
              {main_data?.links[0]?.instagram ? (
                <Link
                  className="link flex border"
                  target="_blank"
                  to={main_data?.links[0]?.instagram}
                >
                  <BiLogoInstagram />
                </Link>
              ) : null}
            </div>
            {main_data?._id === userData?._id ? (
              <div className="btns flex">
                <button
                  onClick={() => setUpdate(true)}
                  style={{
                    background: "rgb(167, 155, 91)",
                    color: "white",
                    border: "none",
                  }}
                >
                  EDIT PROFILE
                </button>
              </div>
            ) : (
              <div className="btns flex col">
                <button
                  style={{ border: "none" }}
                  onClick={() =>
                    !parsedUser?._id
                      ? toast.error("Please Login To Chat!", {
                          style: {
                            background: "white",
                            color: "black",
                            borderRadius: " 20px",
                          },
                        })
                      : initializeConv()
                  }
                >
                  MESSAGE
                </button>
                <button
                  className="border"
                  style={{
                    background: "rgb(167, 155, 91)",
                    color: "white",
                    border: "none",
                  }}
                  onClick={() => toggleFollow()}
                >
                  {btnText}
                </button>
              </div>
            )}
          </div>
        )}
        <div className="right flex col">
          {!main_data ? (
            <div
              className="wrap flex"
              style={{ width: "400px", height: "500px" }}
            >
              <img src="/loader.svg" style={{ width: "50px" }} alt="" />
            </div>
          ) : (
            <div className="card flex col">
              <div
                className="img-sect flex"
                style={{
                  background: `${
                    themeMode == "dark" ? "rgba(255,255,255,.05)" : "#eee"
                  }`,
                }}
              >
                <img
                  src={main_data?.art[0]?.image}
                  alt=""
                  onClick={() => navigate(`/art/${main_data?.art[0]?._id}`)}
                />
              </div>
              <div className="info flex col">
                <h2 style={{ fontSize: "1rem" }}>{main_data?.art[0]?.title}</h2>
                <div className="line border"></div>
                <div className="price flex">
                  <h2
                    style={{
                      fontSize: ".9rem",
                      fontWeight: "400",
                      fontFamily: "Inter",
                    }}
                  >
                    {main_data?.art[0]?.price}Ξ{""}
                    <span
                      style={{
                        fontSize: ".9rem",
                        fontWeight: "400",
                        fontFamily: "Inter",
                      }}
                    >
                      ( ${Math.round(main_data?.art[0]?.price * ethToUsd)})
                    </span>
                  </h2>
                  <button
                    className="flex"
                    style={{
                      background: "rgb(167, 155, 91)",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate(`/art/${main_data?.art[0]?._id}`)}
                  >
                    {main_data?._id === userData?._id ? "edit" : "BUY"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="tag-menu flex">
        <p
          style={{ border: `${tag_item ? "1px solid #80808070" : "none"}` }}
          onClick={() => set_tag(true)}
        >
          <BiImage />
        </p>
        <p
          style={{
            border: `${!tag_item ? "1px solid #80808070" : "none"}`,
          }}
          onClick={() => set_tag(false)}
        >
          <BiLayer />
        </p>
      </div>
      <div className="art-series flex">
        {!main_data ? (
          <div
            className="main-art-wrap flex"
            style={{ height: "400px", justifyContent: "space-around" }}
          >
            <img src="/loader.svg" style={{ width: "50px" }} alt="" />
            <img src="/loader.svg" style={{ width: "50px" }} alt="" />
            <img src="/loader.svg" style={{ width: "50px" }} alt="" />
          </div>
        ) : (
          <div className="main-art-wrap flex">
            {tag_item
              ? main_data?.art?.map((card_item) => (
                  <div className="card flex col" key={card_item?._id}>
                    <div
                      className="img-sect flex"
                      style={{
                        background: `${
                          themeMode == "dark" ? "rgba(255,255,255,.05)" : "#eee"
                        }`,
                      }}
                      onClick={() => navigate(`/art/${card_item?._id}`)}
                    >
                      <img src={card_item?.image} alt="" />
                    </div>
                    <div className="info flex col">
                      <h3>{card_item?.title}</h3>
                      <div
                        className="owner flex"
                        onClick={() =>
                          navigate(`/user/${main_data?._id}`) + scrollTo(0)
                        }
                      >
                        <img src={main_data?.avatar} alt="" />
                        <h2
                          style={{
                            fontSize: "1rem",
                            fontWeight: "500",
                            textTransform: "lowercase",
                          }}
                        >
                          @{main_data?.handle.split(" ")}
                        </h2>
                      </div>
                      <div className="line border"></div>
                      <div className="price flex">
                        <h2
                          style={{
                            fontSize: ".9rem",
                            fontWeight: "400",
                            fontFamily: "Inter",
                          }}
                        >
                          {card_item?.price}Ξ{""}
                          <span
                            style={{
                              fontSize: ".9rem",
                              fontWeight: "400",
                              fontFamily: "Inter",
                            }}
                          >
                            ( ${Math.round(card_item?.price * ethToUsd)})
                          </span>
                        </h2>
                        <button
                          style={{
                            background: "rgb(167, 155, 91)",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                          }}
                          onClick={() => navigate(`/art/${card_item?._id}`)}
                        >
                          {main_data?._id === userData?._id ? "edit" : "BUY"}
                        </button>
                      </div>
                      <div className="btns flex"></div>
                    </div>
                  </div>
                ))
              : main_data?.series?.map((card_item) => (
                  <div className="card flex col" key={card_item?._id}>
                    <div
                      className="img-sect flex"
                      style={{
                        background: `${
                          themeMode == "dark" ? "rgba(255,255,255,.05)" : "#eee"
                        }`,
                      }}
                      onClick={() => navigate(`/series/${card_item?._id}`)}
                    >
                      <img src={card_item?.image} alt="" />
                    </div>
                    <div className="info flex col">
                      <h3>{card_item?.title}</h3>
                      <div
                        className="owner flex"
                        onClick={() =>
                          navigate(`/user/${main_data?._id}`) + scrollTo(0)
                        }
                      >
                        <img src={main_data?.avatar} alt="" />
                        <h2
                          style={{
                            fontSize: "1rem",
                            fontWeight: "500",
                            textTransform: "lowercase",
                          }}
                        >
                          @{main_data?.handle.split(" ")}
                        </h2>
                      </div>
                      <div className="line border"></div>
                      <div className="price flex">
                        <h2></h2>
                        <button
                          onClick={() => navigate(`/series/${card_item?._id}`)}
                          style={{
                            background: "rgb(167, 155, 91)",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          view
                        </button>
                      </div>
                      <div className="btns flex"></div>
                    </div>
                  </div>
                ))}
          </div>
        )}
      </div>
      {show_followers == true ? (
        <div className="followers flex col" onClick={() => closeFollowers()}>
          <div
            className="wrapper flex col"
            style={{
              background: `${themeMode == "dark" ? "#212121" : "white"}`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {main_data?.followers?.map((follower) => {
              return (
                <div className="follower-card flex">
                  <div
                    className="left flex"
                    onClick={() =>
                      navigate(`/user/${follower?._id}`) +
                      window.location.reload()
                    }
                  >
                    <img src={follower?.avatar} className="border" alt="" />
                    <h2>@{follower?.handle.split(" ")}</h2>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        this
      )}
      {show_followings == true ? (
        <div className="followers flex col" onClick={() => closeFollowing()}>
          <div
            className="wrapper flex col"
            style={{
              background: `${themeMode == "dark" ? "#212121" : "white"}`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {main_data?.following?.map((follower) => {
              return (
                <div className="follower-card flex">
                  <div
                    className="left flex"
                    onClick={() =>
                      navigate(`/user/${follower?._id}`) +
                      window.location.reload()
                    }
                  >
                    <img src={follower?.avatar} className="border" alt="" />
                    <h2>@{follower?.username.split(" ")}</h2>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        this
      )}

      {show_profile && (
        <ImageModal imageUrl={main_data?.avatar} onClose={onClose} />
      )}

      {updateUser ? (
        <div className="update-wrap flex col" onClick={() => hideUpdate()}>
          <div
            className="update-container flex col"
            style={{
              background: `${themeMode === "dark" ? "#212121" : "white"}`,
              padding: "30px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h1>Update Profile</h1>
            <div
              className="wrap flex border flex"
              style={{ marginTop: "20px" }}
            >
              <BiUser />
              <input
                type="text"
                placeholder={main_data?.username}
                value={updateData.username}
                name="username"
                onChange={handleUpdateChange}
              />
            </div>
            <div className="wrap flex border flex">
              <BiAt />
              <input
                type="text"
                placeholder={main_data?.handle}
                value={updateData?.handle}
                name="handle"
                onChange={handleUpdateChange}
              />
            </div>
            <div className="wrap flex border flex">
              <BiLogoTwitter />
              <input
                type="text"
                placeholder={
                  main_data?.links[0]?.twitter
                    ? main_data?.links[0]?.twitter
                    : "Twitter"
                }
                value={updateData?.twitter}
                name="twitter"
                onChange={handleUpdateChange}
              />
            </div>
            <div className="wrap flex border flex">
              <BiLogoInstagram />
              <input
                type="text"
                placeholder={
                  main_data?.links[0]?.instagram
                    ? main_data?.links[0]?.instagram
                    : "Instagram"
                }
                value={updateData?.instagram}
                name="instagram"
                onChange={handleUpdateChange}
              />
            </div>
            <div className="wrap flex border flex">
              <BiLogoFacebook />
              <input
                type="text"
                placeholder={
                  main_data?.links[0]?.facebook
                    ? main_data?.links[0]?.facebook
                    : "Facebook"
                }
                value={updateData?.facebook}
                name="facebook"
                onChange={handleUpdateChange}
              />
            </div>
            <div className="wrap">
              <img
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "1px solid #80808090",
                }}
                src={imageUrl ? imageUrl : main_data?.avatar}
                alt=""
              />
            </div>
            <div
              className="wrap flex border flex"
              style={{ height: "100px", cursor: "pointer" }}
            >
              <input
                type="file"
                style={{
                  width: "100%",
                  height: "100%",
                  opacity: "0",
                  position: "absolute",
                  zIndex: 10,
                  cursor: "pointer",
                }}
                onChange={handleAvatarChange}
              />
              <p
                className="flex col"
                style={{
                  position: "absolute",
                  gap: "5px",
                  fontWeight: 600,
                  zIndex: 0,
                }}
              >
                Update Avatar
                <span style={{ fontSize: ".8rem", fontWeight: 400 }}>
                  Drag & Drop File To Upload!
                </span>
              </p>
            </div>
            <button
              className="border"
              style={{
                background: `${themeMode == "dark" ? "white" : "#212121"}`,
                color: `${themeMode == "dark" ? "black" : "white"}`,
              }}
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      ) : (
        this
      )}
      <Footer />
    </div>
  );
};

export default MainUser;
