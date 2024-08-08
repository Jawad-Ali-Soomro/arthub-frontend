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
import Auction from "./pages/Auction";
import TrendingArt from "./pages/TrendingArt";
import TrendingSeries from "./pages/TrendingSeries";
import Events from "./pages/Events";
import CreateArt from "./pages/CreateArt";

function App() {
  const userToken = window.localStorage.getItem("authToken");
  return (
    <>
      <Toaster position="top-left" />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />}></Route>
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
          <Route path="/auction" element={<Auction />}></Route>
          <Route path="/trending-art" element={<TrendingArt />}></Route>
          <Route path="/trending-series" element={<TrendingSeries />}></Route>
          <Route path="/events" element={<Events />}></Route>
          {/* <Route path="/cart" element={<Cart />}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
