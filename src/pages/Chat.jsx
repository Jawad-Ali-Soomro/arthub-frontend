import React, { useState, useEffect } from "react";
import "../styles/Chat.scss";
import { BiInfoCircle, BiLogOut, BiSearch, BiSend } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { CgLogOff, CgSearch } from "react-icons/cg";
import axios from "axios";
import io from "socket.io-client";
import {
  baseConversationUrl,
  baseMessageUrl,
  baseUserUrl,
} from "../utils/constant";
import { useRef } from "react";

const socket = io("http://localhost:8080");

const Chat = () => {
  const userId = window.localStorage.getItem("userId");
  const parsedUser = JSON.parse(userId);
  const navigate = useNavigate();

  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState({});
  const [activeUser, setActiveUser] = useState({
    userName: conversations[0]?.user_one?.username,
    avatar: conversations[0]?.user_one?.avatar,
    id: conversations[0]?.user_one?._id,
    status: "",
  });
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchConversations = async () => {
    try {
      const response = await axios.get(
        `${baseConversationUrl}/get/all/${parsedUser._id}`
      );
      setConversations(response.data.foundConversations || []);
    } catch (error) {
      console.error("Error fetching conversations", error);
    }
  };

  // Fetch messages for the active user
  const fetchMessages = async (conversationId) => {
    try {
      const response = await axios.get(
        `${baseMessageUrl}/get/${conversationId}`
      );
      setMessages(response.data.messages || []);
    } catch (error) {
      console.error("Error fetching messages", error);
    }
  };

  // Handle user card click
  const handleUserClick = (user) => {
    setActiveUser({
      userName: user.username,
      avatar: user.avatar,
      id: user._id,
      status: onlineUsers[user._id] ? true : false, // Check online status
    });

    const conversation = conversations.find(
      (conv) =>
        (conv.user_one._id === parsedUser._id &&
          conv.user_two._id === user._id) ||
        (conv.user_two._id === parsedUser._id && conv.user_one._id === user._id)
    );

    if (conversation) {
      fetchMessages(conversation._id);
    }
  };

  // Send a new message
  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      const conversation = conversations.find(
        (conv) =>
          (conv.user_one._id === parsedUser._id &&
            conv.user_two._id === activeUser.id) ||
          (conv.user_two._id === parsedUser._id &&
            conv.user_one._id === activeUser.id)
      );

      if (conversation) {
        await axios.post(`${baseMessageUrl}/send`, {
          sender: parsedUser._id,
          receiver: activeUser.id,
          conversation: conversation._id,
          content: newMessage,
        });

        fetchMessages(conversation._id);
        setNewMessage(""); // Clear the input field
      }
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, [newMessage]);

  const themeMode = window.localStorage.getItem("themeMode");
  const logoutFn = () => {
    window.localStorage.clear();
    navigate("/");
  };

  // Filter users based on search input
  const filteredConversations = conversations.filter((conv) => {
    const otherUser =
      conv.user_one._id === parsedUser._id ? conv.user_two : conv.user_one;

    return otherUser.username.toLowerCase().includes(searchTerm.toLowerCase()); // Filter by username
  });

  return (
    <div className="chat-main flex">
      <div className="side-bar flex col">
        <div className="logo">
          <img
            src={themeMode === "dark" ? "/logo-white.png" : "logo-black.png"}
            alt="logo"
            onClick={() => navigate("/")}
          />
        </div>
        <div className="menu flex col">
          <div className="img-sect flex">
            <img
              src={parsedUser?.avatar}
              alt="user-avatar"
              onClick={() => navigate(`/user/${parsedUser?._id}`)}
            />
          </div>
          <button className="flex" onClick={() => logoutFn()}>
            <CgLogOff />
          </button>
        </div>
      </div>
      <div className="users flex col">
        <div className="top-search border flex">
          <input
            type="text"
            placeholder="find a user!"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search input
          />
          <div className="icon flex">
            <BiSearch />
          </div>
        </div>
        <div className="main-users flex">
          <div className="wrap flex col">
            {filteredConversations.map((conv) => {
              const otherUser =
                conv.user_one._id === parsedUser._id
                  ? conv.user_two
                  : conv.user_one;
              return (
                <div
                  key={conv._id}
                  className="card flex"
                  style={{
                    background: `${
                      activeUser?.id == otherUser?._id
                        ? "royalblue"
                        : "transparent"
                    }`,
                    color: `${
                      activeUser?.id == otherUser?._id ? "white" : "inherit"
                    }`,
                    border: `${
                      activeUser?.id == otherUser?._id
                        ? "1px solid royalblue"
                        : "1px solid #80808090"
                    }`,
                  }}
                  onClick={() => handleUserClick(otherUser)}
                >
                  <div className="profile flex">
                    <img src={otherUser.avatar} alt="profile-avatar" />
                    <p style={{ textTransform: "capitalize" }}>
                      {otherUser.username}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="message-wrap flex col">
        {activeUser.id ? (
          <div className="user-info border flex">
            <div className="profile flex">
              <img src={activeUser.avatar} alt="active-user-avatar" />
              <div className="flex col" style={{ alignItems: "start" }}>
                <p style={{ fontWeight: "600", fontSize: "1.2rem" }}>
                  {activeUser.userName}
                </p>
              </div>
            </div>
            <div className="icon flex">
              <button
                style={{
                  background: "royalblue",
                  color: "white",
                  border: "none",
                }}
                onClick={() => navigate(`/user/${activeUser.id}`)}
              >
                <BiInfoCircle />
              </button>
            </div>
          </div>
        ) : null}
        {activeUser.id ? (
          <div className="message-main">
            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.sender._id === parsedUser._id
                    ? "right-message"
                    : "left-message"
                }
              >
                <p>{message.content}</p>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        ) : (
          <p>Select a user to start chatting</p>
        )}
        {activeUser.id ? (
          <div className="message-send border flex">
            <input
              type="text"
              placeholder="type your message here..."
              value={newMessage}
              onKeyUp={(e) => (e.key === "Enter" ? handleSendMessage() : null)}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              className="flex"
              style={{
                background: "royalblue",
                color: "white",
                border: "none",
              }}
              onClick={handleSendMessage}
            >
              <BiSend />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Chat;
