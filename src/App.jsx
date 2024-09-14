import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
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
import { useState } from "react";
import Loader from "./pages/Loader";
import { BsCloudSlash } from "react-icons/bs";
import Deals from "./pages/Deals";
import Chat from "./pages/Chat";

function App() {
  const userToken = window.localStorage.getItem("authToken");
  const [showLoader, setShowLoader] = useState(true);
  setTimeout(() => {
    setShowLoader(false);
  }, [5000]);

  return (
    <>
      <Toaster position="top-left" />
      {!navigator.onLine ? (
        <div className="offline-message flex col">
          <BsCloudSlash className="icon" />
          <h1>Oops</h1>
          <p>
            It looks like you lost your connection.{" "}
            <span>Check it & try again!</span>
          </p>
        </div>
      ) : (
        this
      )}
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={showLoader == true ? <Loader /> : <Home />}
          ></Route>
          <Route path="/explore/art" element={<Art />}></Route>
          <Route path="/explore/series" element={<Series />}></Route>
          <Route path="/art/:artId" element={<MainArt />}></Route>
          <Route path="/series/:seriesId" element={<MainSeries />}></Route>
          <Route path="/user/:userId" element={<MainUser />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<NotFound />}></Route>
          <Route
            path={userToken ? "/profile" : "/"}
            element={<Profile />}
          ></Route>
          <Route
            path={userToken ? "/create" : "/"}
            element={<CreateArt />}
          ></Route>
          <Route path="/artists" element={<Artists />}></Route>
          <Route
            path="/deals"
            element={userToken ? <Deals /> : <NotFound />}
          ></Route>
          <Route path="/featured-art" element={<TrendingArt />}></Route>
          <Route
            path="/chat"
            element={userToken ? <Chat /> : <NotFound />}
          ></Route>
          <Route path="/featured-series" element={<TrendingSeries />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
