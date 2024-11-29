import React, { useState, useEffect, useRef } from "react";
import ImageManager from "../utils/Image";

interface ImageItem {
  id: number;
  filePath: string;
  fileName: string;
  caption: string;
  position: number;
  category_id: number;
}

const AddImagesPage = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [category, setCategory] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState<number | null>(null); // Kategorie pro filtrování
  const [imageList, setImageList] = useState<ImageItem[]>([]);
  const captionTimers = useRef<{ [id: number]: NodeJS.Timeout }>({});
  const manager = new ImageManager();

  const loadImages = async () => {
    const images = await manager.getImages();
    setImageList(images.sort((a, b) => a.position - b.position));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    }
  };

  const handleCategoryChange = (categoryId: number) => {
    setCategory(categoryId);
  };

  const handleCategoryUpdate = async (
    imageId: number,
    newCategoryId: number
  ) => {
    try {
      await manager.updateCategory(imageId, newCategoryId);
      const updatedImages = imageList.map((image) =>
        image.id === imageId ? { ...image, category_id: newCategoryId } : image
      );
      setImageList(updatedImages);
    } catch (error) {
      console.error("Chyba při aktualizaci kategorie obrázku:", error);
    }
  };

  const handleCaptionChange = (imageId: number, newCaption: string) => {
    setImageList((prevImages) =>
      prevImages.map((image) =>
        image.id === imageId ? { ...image, caption: newCaption } : image
      )
    );

    // Reset the existing timer
    if (captionTimers.current[imageId]) {
      clearTimeout(captionTimers.current[imageId]);
    }

    // Set a new timer for saving the caption
    captionTimers.current[imageId] = setTimeout(async () => {
      try {
        await manager.updateCaption(imageId, newCaption);
        console.log(`Caption for image ${imageId} updated successfully.`);
      } catch (error) {
        console.error("Error updating caption:", error);
      }
    }, 3000); // Wait 3 seconds before saving
  };

  const handleFilterChange = (categoryId: number | null) => {
    setFilterCategory(categoryId);
  };

  const handleSubmit = async () => {
    if (selectedFiles.length === 0) {
      alert("Vyberte alespoň jeden soubor před odesláním.");
      return;
    }
    if (!category) {
      alert("Vyberte kategorii pro všechny soubory.");
      return;
    }

    try {
      for (const file of selectedFiles) {
        await manager.addImage(file, "", category);
      }
      alert("Soubory byly úspěšně nahrány!");
      setSelectedFiles([]);
      setCategory(null);
      loadImages();
    } catch (error) {
      console.error("Chyba při nahrávání obrázků:", error);
      alert("Nahrávání souborů se nezdařilo.");
    }
  };

  useEffect(() => {
    loadImages();
    return () => {
      // Clear all timers on unmount
      Object.values(captionTimers.current).forEach((timer) =>
        clearTimeout(timer)
      );
    };
  }, []);

  const filteredImages = filterCategory
    ? imageList.filter((image) => image.category_id === filterCategory)
    : imageList;

  return (
    <div className="py-12 bg-gray-900 text-white min-h-screen flex flex-col items-center w-full">
      <h2 className="text-4xl font-bold mb-6 text-center neon-text">
        Nahrát Obrázky
      </h2>
      <div className="w-4/5 flex flex-col items-center">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full p-3 mb-4 bg-gray-800 text-gray-200 rounded-lg shadow-lg focus:outline-none focus:ring focus:ring-indigo-500"
        />
        {selectedFiles.length > 0 && (
          <div className="w-full mb-4">
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Vyberte kategorii pro všechny soubory:
              </label>
              <select
                value={category || ""}
                onChange={(e) => handleCategoryChange(Number(e.target.value))}
                className="w-full p-3 bg-gray-800 text-white rounded-lg shadow-lg focus:outline-none focus:ring focus:ring-indigo-500"
              >
                <option value="" disabled>
                  Vyberte kategorii
                </option>
                <option value={1}>Neony</option>
                <option value={2}>Potisky</option>
                <option value={3}>Polepy</option>
              </select>
            </div>
          </div>
        )}
        <button
          onClick={handleSubmit}
          className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-500 transition-all duration-500"
        >
          Odeslat
        </button>
      </div>

      {/* Filtr kategorií */}
      <div className="w-4/5 mt-6 mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Filtrovat podle kategorie:
        </label>
        <select
          value={filterCategory || ""}
          onChange={(e) =>
            handleFilterChange(e.target.value ? Number(e.target.value) : null)
          }
          className="w-full p-3 bg-gray-800 text-white rounded-lg shadow-lg focus:outline-none focus:ring focus:ring-indigo-500"
        >
          <option value="">Všechno</option>
          <option value={1}>Neony</option>
          <option value={2}>Potisky</option>
          <option value={3}>Polepy</option>
        </select>
      </div>

      {/* Seznam obrázků */}
      {filteredImages.length > 0 && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-4/5">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="relative flex flex-col items-center gap-2 p-3 bg-gray-800 text-white shadow rounded"
            >
              <img
                src={image.filePath}
                alt={image.fileName}
                className="w-full h-32 object-cover rounded"
              />
              <input
                type="text"
                value={image.caption}
                onChange={(e) => handleCaptionChange(image.id, e.target.value)}
                placeholder="Přidejte popis..."
                className="mt-2 w-full p-2 bg-gray-700 text-white rounded shadow-lg focus:outline-none focus:ring focus:ring-indigo-500"
              />
              <select
                value={image.category_id}
                onChange={(e) =>
                  handleCategoryUpdate(image.id, Number(e.target.value))
                }
                className="mt-2 w-full p-2 bg-gray-700 text-white rounded shadow-lg focus:outline-none focus:ring focus:ring-indigo-500"
              >
                <option value={1}>Neony</option>
                <option value={2}>Potisky</option>
                <option value={3}>Polepy</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddImagesPage;
