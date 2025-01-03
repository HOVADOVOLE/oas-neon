import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { HelmetProvider } from "react-helmet-async"; // Import HelmetProvider
import ImageGallery from "./pages/ImageGallery";
import ProtectedRoute from "./components/ProtectedRoute";
import AddImagesPage from "./pages/AddImagesPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import { ToastContainer } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import ScrollToTop from "./utils/ScrollTOTop";

const HomeDetail = React.lazy(() => import("./pages/HomeDetail"));

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <React.StrictMode>
        <HelmetProvider>
          {" "}
          {/* Zde obalíme aplikaci */}
          <BrowserRouter>
            <AuthProvider>
              <ScrollToTop />
              <Suspense
                fallback={
                  <div className="fixed inset-0 flex items-center justify-center bg-[#111111]">
                    <TailSpin
                      color="#FF007F"
                      height={80}
                      width={80}
                      ariaLabel="Načítání"
                    />
                    <div className="text-[#FF007F] text-xl font-semibold ml-2">
                      Načítám stránku...
                    </div>
                  </div>
                }
              >
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
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </AuthProvider>
          </BrowserRouter>
        </HelmetProvider>
      </React.StrictMode>
    </>
  );
}

export default App;
