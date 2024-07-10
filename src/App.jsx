import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Art from "./pages/Art";
import { Toaster } from "react-hot-toast";
import MainArt from "./pages/MainArt";

function App() {
  return (
    <>
    <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/explore/art" element={<Art />}></Route>
          <Route path="/art/:artId" element={<MainArt />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
