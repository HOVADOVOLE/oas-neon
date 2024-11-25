import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import GalleryPage from "./pages/GalleryPage";
import HomeDetail from "./pages/HomeDetail";
import AddImagesPage from "./pages/AddImagesPage";
import LoginPage from "./pages/LoginPage";
import ImageGallery from "./components/ImageGallery";
import "./index.css";
import "./polyfills";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeDetail />}></Route>
        <Route path="/galerie" element={<ImageGallery />} />
        <Route path="/upload" element={<AddImagesPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
