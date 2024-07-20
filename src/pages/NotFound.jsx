import React from "react";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div
      className="flex col"
      style={{ minHeight: "100vh", background: "#111", color: "white" }}
    >
      <h1 style={{ fontWeight: 900, fontSize: "10rem", position: "relative" }}>
        OOPS!{" "}
        <BiSearch
          style={{
            position: "absolute",
            top: "-100px",
            right: "-70px",
            color: "rgba(255,255,255,.5)",
          }}
        />
      </h1>
      <h2 style={{ fontWeight: "900", fontSize: "5rem" }}>PAGE NOT FOUND!</h2>
      <button
        style={{
          width: "300px",
          height: "70px",
          marginTop: "30px",
          background: "#333",
          color: "white",
          border: "none",
          cursor: "pointer",
          textTransform: "uppercase",
          fontWeight: "900",
          fontSize: "1.3rem",
        }}
        onClick={() => navigate("/")}
      >
        Back
      </button>
    </div>
  );
};

export default NotFound;
