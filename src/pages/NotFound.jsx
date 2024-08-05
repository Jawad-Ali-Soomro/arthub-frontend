import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NotFound = () => {
  return (
    <div>
      <Header />
      <div className="wrap flex" style={{ height: "calc(100vh - 410px)" }}>
        <h1 style={{ marginTop: "20vh", fontWeight: "900", fontSize: "5rem" }}>
          Page Not Found!
        </h1>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
