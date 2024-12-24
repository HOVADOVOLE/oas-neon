import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ImageGallery from "./components/ImageGallery";
import ProtectedRoute from "./components/ProtectedRoute";
import AddImagesPage from "./pages/AddImagesPage";
import LoginPage from "./pages/LoginPage";
import { ToastContainer } from "react-toastify";

const HomeDetail = React.lazy(() => import("./pages/HomeDetail"));

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
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
    </>
  );
}

export default App;
