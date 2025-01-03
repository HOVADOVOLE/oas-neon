import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async"; // Import Helmet
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import ImageManager from "../utils/Image";
import Navbar from "../components/Navbar";
import ErrorBoundary from "../components/ErrorBoundary";
import Footer from "../components/Footer";
import seamless_gallery from "../images/seamless-gallery.webp";
import { TailSpin } from "react-loader-spinner";

interface ImageList {
  id: number;
  filePath: string;
  fileName: string;
  caption: string;
  category_id: number;
  position?: number;
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Galerie | OAS-NEON",
  description:
    "Galerie našich produktů: neonové reklamy, potisky na textil a polepy.",
  url: "https://oas-neon.com/galerie",
  hasPart: [
    {
      "@type": "ImageObject",
      name: "Neonová reklama 1",
      contentUrl: "https://oas-neon.com/images/neon1.jpg",
      description: "Ukázka neonové reklamy vytvořené na zakázku.",
    },
    {
      "@type": "ImageObject",
      name: "Potisk trička",
      contentUrl: "https://oas-neon.com/images/potisk1.jpg",
      description: "Detailní potisk trička s vlastním designem.",
    },
    {
      "@type": "ImageObject",
      name: "Polep na auto",
      contentUrl: "https://oas-neon.com/images/polep1.jpg",
      description: "Polep na firemní automobil, vytvořený pro našeho klienta.",
    },
  ],
};

const ImageGallery: React.FC = () => {
  const [allImages, setAllImages] = useState<ImageList[]>([]);
  const [filteredImages, setFilteredImages] = useState<ImageList[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const [isGalleryLoading, setIsGalleryLoading] = useState<boolean>(true);
  const [isFiltering, setIsFiltering] = useState<boolean>(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const loadImages = async () => {
      const imageManager = new ImageManager();
      const images = await imageManager.getImages();
      if (images) {
        setAllImages(images);
        setFilteredImages(images);
      }
      setIsGalleryLoading(false);
    };

    loadImages();
  }, []);

  useEffect(() => {
    const initialFilter = searchParams.get("filter");
    const categoryMapping: { [key: string]: string } = {
      neony: "1",
      potisky: "2",
      polepy: "3",
    };

    if (initialFilter && categoryMapping[initialFilter]) {
      setSelectedCategory(categoryMapping[initialFilter]);
    } else {
      setSelectedCategory("all");
    }
    setIsFiltering(false);
  }, [searchParams]);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredImages(allImages);
    } else {
      setFilteredImages(
        allImages.filter(
          (img) => img.category_id === parseInt(selectedCategory, 10)
        )
      );
    }
  }, [selectedCategory, allImages]);

  const handleOpenLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsImageLoading(true);
  };

  const handleCloseLightbox = () => {
    setCurrentIndex(null);
  };

  const handleMovePrev = () => {
    if (filteredImages.length > 0) {
      setIsImageLoading(true);
      if (currentIndex !== null) {
        setCurrentIndex(
          (currentIndex + filteredImages.length - 1) % filteredImages.length
        );
      }
    }
  };

  const handleMoveNext = () => {
    if (filteredImages.length > 0) {
      setIsImageLoading(true);
      if (currentIndex !== null) {
        setCurrentIndex((currentIndex + 1) % filteredImages.length);
      }
    }
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Galerie | OAS-NEON</title>
        <meta
          name="description"
          content="Prohlédněte si galerii neonových reklam, potisků a polepů od OAS-NEON. Kvalitní výroba na míru s více než 25 lety zkušeností."
        />
        <meta
          name="keywords"
          content="neony, reklamy, potisky, polepy, galerie, OAS-NEON"
        />
        <meta name="author" content="OAS-NEON" />
        <meta property="og:title" content="Galerie | OAS-NEON" />
        <meta
          property="og:description"
          content="Galerie našich produktů: neonové reklamy, potisky a polepy. Prohlédněte si kvalitní práci OAS-NEON."
        />
        <meta property="og:image" content="/path/to/gallery-image.jpg" />
        <meta property="og:url" content="https://oas-neon.com/galerie" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <div
        className="py-12 bg-[#111111] text-white min-h-screen flex flex-col items-center w-full"
        style={{
          backgroundImage: `url(${seamless_gallery})`,
          backgroundSize: "contain",
          backgroundRepeat: "repeat",
          width: "100vw",
          maxWidth: "100%",
          margin: "0 auto",
        }}
      >
        <Navbar />
        {isGalleryLoading || isFiltering ? (
          <div className="fixed inset-0 flex items-center justify-center bg-[#111111]">
            <TailSpin
              color="#FF007F"
              height={80}
              width={80}
              ariaLabel="načítání"
            />
            <div className="text-[#FF007F] text-xl font-semibold ml-2">
              Načítám galerii...
            </div>
          </div>
        ) : (
          <>
            <div className="absolute inset-0 bg-black opacity-50 pointer-events-none"></div>
            <div className="w-100 flex flex-col items-center mt-14 z-10">
              <h1
                className="text-6xl font-bold text-center mb-8"
                style={{
                  textShadow:
                    "0 0 20px rgba(255, 0, 0, 0.8), 0 0 30px rgba(255, 0, 0, 0.6), 0 0 40px rgba(255, 0, 0, 0.4)",
                  color: "#ff0000",
                  fontFamily: "mexcellent",
                }}
              >
                Galerie
              </h1>
              <div className="text-left mb-8 w-4/5">
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="py-3 px-4 bg-[#111111] text-white rounded-lg shadow-lg w-full sm:w-1/2 md:w-1/4 lg:w-1/5 xl:w-1/6 transition-all"
                >
                  <option value="all">Všechny</option>
                  <option value="1">Neony</option>
                  <option value="2">Potisky</option>
                  <option value="3">Polepy</option>
                </select>
              </div>
              <div className="w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredImages.map((image, index) => (
                  <div
                    key={image.id}
                    className="relative group cursor-pointer"
                    onClick={() => handleOpenLightbox(index)}
                  >
                    <img
                      src={image.filePath}
                      alt={image.caption}
                      className="object-cover w-full h-full rounded-lg shadow-lg"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {image.caption && (
                        <p className="text-white text-center font-semibold px-4 text-xl">
                          {image.caption}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <ErrorBoundary>
                {currentIndex !== null && filteredImages[currentIndex] && (
                  <>
                    {isImageLoading && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                        <div className="text-white text-xl ">
                          Načítám obrázek...
                        </div>
                      </div>
                    )}
                    <Lightbox
                      mainSrc={filteredImages[currentIndex].filePath}
                      nextSrc={
                        filteredImages[
                          (currentIndex + 1) % filteredImages.length
                        ].filePath
                      }
                      prevSrc={
                        filteredImages[
                          (currentIndex + filteredImages.length - 1) %
                            filteredImages.length
                        ].filePath
                      }
                      onCloseRequest={handleCloseLightbox}
                      onMovePrevRequest={handleMovePrev}
                      onMoveNextRequest={handleMoveNext}
                      imageCaption={filteredImages[currentIndex].caption || ""}
                      onImageLoad={handleImageLoad}
                    />
                  </>
                )}
              </ErrorBoundary>
            </div>
          </>
        )}
      </div>
      <div className="w-full bottom-0">
        <Footer />
      </div>
    </>
  );
};

export default ImageGallery;
