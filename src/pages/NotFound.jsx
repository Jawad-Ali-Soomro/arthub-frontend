import React from "react";

const NotFound = () => {
  return (
    <div
      style={{ minHeight: "100vh", background: "inherit" }}
      className="flex col"
    >
      <img src="/notFound.png" alt="image" />
      <p style={{ textTransform: "uppercase", fontSize: "1.2rem" }}>
        Oops! The Page You Are Looking for Have Been Moved Or Deleted!
      </p>
      <button
        style={{
          width: "300px",
          height: "50px",
          marginTop: "40px",
          background: "#333",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "25px",
          fontSize: "1.2rem",
        }}
        onClick={() => window.location.replace("/")}
      >
        BACK
      </button>
    </div>
  );
};

export default NotFound;
