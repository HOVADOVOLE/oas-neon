import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeDetail from "./pages/HomeDetail";
import AddImagesPage from "./pages/AddImagesPage";
import LoginPage from "./pages/LoginPage";
import ImageGallery from "./components/ImageGallery";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";
import "./polyfills";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomeDetail />} />
          <Route path="/galerie" element={<ImageGallery />} />
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <AddImagesPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
