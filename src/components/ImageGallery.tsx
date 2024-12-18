import React, { useState, useEffect } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import ImageManager from "../utils/Image";
import Navbar from "./Navbar";
import ErrorBoundary from "./ErrorBoundary";

interface ImageList {
  id: number;
  filePath: string;
  fileName: string;
  caption: string;
  category_id: number;
  position?: number;
}

const ImageGallery: React.FC = () => {
  const [allImages, setAllImages] = useState<ImageList[]>([]);
  const [filteredImages, setFilteredImages] = useState<ImageList[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadImages = async () => {
      const imageManager = new ImageManager();
      const images = await imageManager.getImages();

      if (images) {
        setAllImages(images);
        setFilteredImages(images);
      }
    };

    loadImages();
  }, []);

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
    setIsImageLoading(true); // Zobrazí spinner při otevření obrázku
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
    setIsImageLoading(false); // Jakmile je obrázek načten, spinner se skryje
  };

  return (
    <div className="py-12 bg-gray-900 text-white min-h-screen flex flex-col items-center w-full">
      <Navbar />
      <div className="w-100 flex flex-col items-center mt-14">
        <h1 className="text-6xl font-bold text-center mb-8 neon-text">
          Galerie
        </h1>
        <div className="text-center mb-8 w-4/5">
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="py-2 px-4 bg-gray-800 text-white rounded-lg shadow-lg float-left"
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
              className="cursor-pointer"
              onClick={() => handleOpenLightbox(index)}
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
          {currentIndex !== null && filteredImages[currentIndex] && (
            <>
              {isImageLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                  <div className="text-white text-xl">Načítám obrázek...</div>
                </div>
              )}
              <Lightbox
                mainSrc={filteredImages[currentIndex].filePath}
                nextSrc={
                  filteredImages[(currentIndex + 1) % filteredImages.length]
                    .filePath
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
                onImageLoad={handleImageLoad} // Zavoláno, jakmile obrázek je načten
              />
            </>
          )}
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default ImageGallery;
