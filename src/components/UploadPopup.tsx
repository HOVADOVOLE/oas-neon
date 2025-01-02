import React, { useState } from "react";
import { toast } from "react-toastify";
import ImageManager from "../utils/Image";

interface UploadPopupProps {
  onClose: () => void; // Funkce pro zavření popupu
  onUploadComplete: () => void; // Funkce pro provedení akce po úspěšném nahrání
}

const UploadPopup: React.FC<UploadPopupProps> = ({
  onClose,
  onUploadComplete,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [category, setCategory] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const manager = new ImageManager();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    }
  };

  const handleSubmit = async () => {
    if (selectedFiles.length === 0) {
      toast.warning("Vyberte alespoň jeden soubor.");
      return;
    }
    if (!category) {
      toast.warning("Vyberte kategorii pro nahrávané obrázky.");
      return;
    }

    setIsLoading(true);

    try {
      for (const file of selectedFiles) {
        await manager.addImage(file, "", category);
      }
      setSelectedFiles([]);
      setCategory(null);
      onUploadComplete(); // Aktualizace seznamu obrázků
      onClose(); // Zavření popupu
    } catch (error) {
      console.error("Chyba při nahrávání obrázků:", error);
      toast.error("Nahrávání obrázků se nezdařilo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#111111] text-white p-6 rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3">
        <h2 className="text-2xl font-bold mb-4 text-center">Nahrát Obrázky</h2>

        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="loader border-t-4 border-b-4 border-indigo-500 rounded-full w-12 h-12 animate-spin"></div>
          </div>
        ) : (
          <>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full p-3 mb-4 bg-gray-800 text-gray-200 rounded-lg shadow-lg focus:outline-none focus:ring focus:ring-indigo-500"
            />
            <select
              value={category || ""}
              onChange={(e) =>
                setCategory(e.target.value ? Number(e.target.value) : null)
              }
              className="py-3 px-4 bg-gray-800 text-white rounded-lg shadow-lg w-full mb-4 transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Vyberte kategorii</option>
              <option value={1}>Neony</option>
              <option value={2}>Potisky</option>
              <option value={3}>Polepy</option>
            </select>
            <div className="flex justify-between">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg shadow-md focus:outline-none"
              >
                Zrušit
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-[#FF007F] hover:bg-[#BF053D] text-white rounded-lg shadow-md focus:outline-none"
              >
                Nahrát
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadPopup;
