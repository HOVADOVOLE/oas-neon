import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ImageGallery from "./components/ImageGallery";
import ProtectedRoute from "./components/ProtectedRoute";
import AddImagesPage from "./pages/AddImagesPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage"; // Import stránky 404
import { ToastContainer } from "react-toastify";
import { TailSpin } from "react-loader-spinner";

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
        <BrowserRouter>
          <AuthProvider>
            {/* Obalení Suspense pro lazy-loading */}
            <Suspense
              fallback={
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900">
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
      </React.StrictMode>
    </>
  );
}

export default App;
