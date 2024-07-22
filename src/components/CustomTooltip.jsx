import React from "react";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#fff",
          padding: "10px",
          border: "1px solid #ccc",
          color: "black",
          textTransform: "capitalize",
        }}
      >
        <p className="label">
          {label} :{" "}
          <span
            style={{
              color: "#111",
              fontWeight: 600,
            }}
          >
            {payload[0].value}
          </span>
        </p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
