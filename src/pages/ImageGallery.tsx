import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
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
  const [visibleImages, setVisibleImages] = useState<ImageList[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isGalleryLoading, setIsGalleryLoading] = useState<boolean>(true);
  const [itemsToShow, setItemsToShow] = useState<number>(20);
  const [searchParams] = useSearchParams();

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      const imageManager = new ImageManager();
      const images = await imageManager.getImages();
      if (images) {
        setAllImages(images);
        setVisibleImages(images.slice(0, itemsToShow));
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
  }, [searchParams]);

  useEffect(() => {
    if (selectedCategory === "all") {
      setVisibleImages(allImages.slice(0, itemsToShow));
    } else {
      const filtered = allImages.filter(
        (img) => img.category_id === parseInt(selectedCategory, 10)
      );
      setVisibleImages(filtered.slice(0, itemsToShow));
    }
  }, [selectedCategory, allImages, itemsToShow]);

  const lastImageRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isGalleryLoading) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setItemsToShow((prev) => prev + 20);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isGalleryLoading]
  );

  const handleOpenLightbox = (index: number) => {
    setCurrentIndex(index);
  };

  const handleCloseLightbox = () => {
    setCurrentIndex(null);
  };

  const handleMovePrev = () => {
    if (visibleImages.length > 0 && currentIndex !== null) {
      setCurrentIndex(
        (currentIndex + visibleImages.length - 1) % visibleImages.length
      );
    }
  };

  const handleMoveNext = () => {
    if (visibleImages.length > 0 && currentIndex !== null) {
      setCurrentIndex((currentIndex + 1) % visibleImages.length);
    }
  };

  return (
    <>
      <Helmet>
        <title>Galerie | OAS-NEON</title>
        <meta
          name="description"
          content="Galerie neonových reklam, potisků a polepů od OAS-NEON."
        />
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

        {isGalleryLoading ? (
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
            <div className="w-100 flex flex-col items-center mt-14 z-10">
              <h1
                className="text-6xl font-bold text-center mb-8"
                style={{
                  textShadow: "0 0 20px rgba(255, 0, 0, 0.8)",
                  color: "#ff0000",
                }}
              >
                Galerie
              </h1>

              <div className="text-left mb-8 w-4/5">
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="py-3 px-4 bg-[#111111] text-white rounded-lg shadow-lg w-full sm:w-1/2 md:w-1/4"
                >
                  <option value="all">Všechny</option>
                  <option value="1">Neony</option>
                  <option value="2">Potisky</option>
                  <option value="3">Polepy</option>
                </select>
              </div>

              <div className="w-4/5 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {visibleImages.map((image, index) => (
                  <div
                    key={image.id}
                    className="relative group cursor-pointer"
                    onClick={() => handleOpenLightbox(index)}
                    ref={
                      index === visibleImages.length - 1 ? lastImageRef : null
                    }
                  >
                    <img
                      src={image.filePath}
                      alt={image.caption}
                      className="object-cover w-full h-full rounded-lg shadow-lg"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              <ErrorBoundary>
                {currentIndex !== null && visibleImages[currentIndex] && (
                  <Lightbox
                    mainSrc={visibleImages[currentIndex].filePath}
                    nextSrc={
                      visibleImages[(currentIndex + 1) % visibleImages.length]
                        .filePath
                    }
                    prevSrc={
                      visibleImages[
                        (currentIndex + visibleImages.length - 1) %
                          visibleImages.length
                      ].filePath
                    }
                    onCloseRequest={handleCloseLightbox}
                    onMovePrevRequest={handleMovePrev}
                    onMoveNextRequest={handleMoveNext}
                    imageCaption={visibleImages[currentIndex].caption || ""}
                  />
                )}
              </ErrorBoundary>
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
};

export default ImageGallery;
