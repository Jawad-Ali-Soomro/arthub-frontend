import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NotFound = () => {
  return (
    <div>
      <Header />
      <div className="wrap flex col" style={{ height: "calc(100vh - 410px)" }}>
        <h1 style={{ marginTop: "20vh", fontWeight: "900", fontSize: "5rem" }}>
          Page Not Found!
        </h1>
        <p style={{ paddingTop: "20px" }}>
          It happens when you try to find a page which doesn't relate with this
          site or you are not logged in!
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
