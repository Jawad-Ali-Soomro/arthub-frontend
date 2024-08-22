import React, { useEffect, useState } from "react";

const AnimatedNumber = ({ start, end, duration }) => {
  const [currentValue, setCurrentValue] = useState(start);

  useEffect(() => {
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const newValue = Math.floor(progress * (end - start) + start);
      setCurrentValue(newValue);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [start, end, duration]);

  return (
    <div
      style={{
        fontSize: "20rem",
        fontFamily: "Poppins",
        fontWeight: "900",
        // position: "absolute",
        // bottom: "-100px",
        // right: "20px",
      }}
    >
      {currentValue}
      <span style={{ fontSize: "5rem" }}>%</span>
    </div>
  );
};

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
      <AnimatedNumber start={0} end={100} duration={5000} />
    </div>
  );
};

export default Loader;
