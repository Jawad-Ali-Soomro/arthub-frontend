import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Art from "./pages/Art";
import { Toaster } from "react-hot-toast";
import MainArt from "./pages/MainArt";
import ScrollToTop from "./components/ScrollToTop";
import Series from "./pages/Series";
import "./utils/theme";
import MainSeries from "./pages/MainSeries";
import MainUser from "./pages/MainUser";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import TrendingArt from "./pages/TrendingArt";
import TrendingSeries from "./pages/TrendingSeries";
import CreateArt from "./pages/CreateArt";
import Artists from "./pages/Artists";
import { useState, useEffect } from "react";
import { BsCloudSlash } from "react-icons/bs";
import Deals from "./pages/Deals";
import Chat from "./pages/Chat";
import CreateSeries from "./pages/CreateSeries";
import { ToastBar } from "react-hot-toast";

function App() {
  const userToken = window.localStorage.getItem("authToken");
  const [showLoader, setShowLoader] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Remove the loader after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 5000);
    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  // Listen for online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOnline) {
    return (
      <div className="offline-message flex col">
        <BsCloudSlash className="icon" />
        <h1>Oops</h1>
        <p>
          It looks like you lost your connection.{" "}
          <span>Check it & try again!</span>
        </p>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-left" />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore/art" element={<Art />} />
          <Route path="/explore/series" element={<Series />} />
          <Route path="/art/:artId" element={<MainArt />} />
          <Route path="/series/:seriesId" element={<MainSeries />} />
          <Route path="/user/:userId" element={<MainUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path={userToken ? "/profile" : "/"} element={<Profile />} />
          <Route path={userToken ? "/create" : "/"} element={<CreateArt />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/deals" element={userToken ? <Deals /> : <NotFound />} />
          <Route path="/featured-art" element={<TrendingArt />} />
          <Route path="/chat" element={userToken ? <Chat /> : <NotFound />} />
          <Route path="/featured-series" element={<TrendingSeries />} />
          <Route
            path="/create"
            element={userToken ? <CreateArt /> : <NotFound />}
          />
          <Route
            path="/create/series"
            element={userToken ? <CreateSeries /> : <NotFound />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
