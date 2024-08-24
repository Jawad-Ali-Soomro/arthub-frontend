import React, { useEffect, useState } from "react";

const Loader = () => {
  const themeMode = window.localStorage.getItem("themeMode");
  return (
    <div
      className="flex col"
      style={{
        height: "100vh",
        background: `${themeMode == "dark" ? "rgb(23,20,32)" : "white"}`,
        borderRadius: "0",
        color: `${themeMode == "dark" ? "white" : "black"}`,
        overflow: "hidden",
      }}
    >
      <img src="/loader.svg" alt="" />
    </div>
  );
};

export default Loader;
