import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ImageManager from "../utils/Image";

const ItemType = "IMAGE";

interface ImageItem {
  id: number;
  filePath: string;
  fileName: string;
  caption: string;
  position: number;
  categoryId?: number;
}

const AddImagesPage = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [category, setCategory] = useState<number | null>(null);
  const [imageList, setImageList] = useState<ImageItem[]>([]);
  const manager = new ImageManager();

  const loadImages = async () => {
    const images = await manager.getImages();
    setImageList(images.sort((a, b) => a.position - b.position)); // Seřadíme podle pozice
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

  const moveFile = (fromIndex: number, toIndex: number) => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      const [movedFile] = updatedFiles.splice(fromIndex, 1);
      updatedFiles.splice(toIndex, 0, movedFile);
      return updatedFiles;
    });
  };

  const moveImage = (draggedIndex: number, targetIndex: number) => {
    setImageList((prevList) => {
      const updatedList = [...prevList];
      const [movedImage] = updatedList.splice(draggedIndex, 1);
      updatedList.splice(targetIndex, 0, movedImage);

      // Aktualizace pozic
      return updatedList.map((image, index) => ({
        ...image,
        position: index + 1, // Upraví pořadí
      }));
    });
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
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
              <p className="font-medium text-center mb-2">
                Přetáhněte pro změnu pořadí:
              </p>
              <div className="grid grid-cols-1 gap-3">
                {selectedFiles.map((file, index) => (
                  <DraggableFile
                    key={index}
                    file={file}
                    index={index}
                    moveFile={moveFile}
                  />
                ))}
              </div>
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

        {imageList.length > 0 && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-4/5">
            {imageList.map((image, index) => (
              <DraggableImageCard
                key={image.id}
                image={image}
                index={index}
                moveImage={moveImage}
              />
            ))}
          </div>
        )}
      </div>
    </DndProvider>
  );
};

interface DraggableFileProps {
  file: File;
  index: number;
  moveFile: (fromIndex: number, toIndex: number) => void;
}

const DraggableFile: React.FC<DraggableFileProps> = ({
  file,
  index,
  moveFile,
}) => {
  const [, drag] = useDrag(() => ({
    type: ItemType,
    item: { index },
  }));

  const [, drop] = useDrop(() => ({
    accept: ItemType,
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveFile(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  }));

  return (
    <div
      ref={(node) => drag(drop(node))}
      className="flex items-center justify-between p-2 border rounded bg-gray-800 text-white shadow hover:bg-gray-700 transition"
    >
      <span>{file.name}</span>
      <span className="text-sm text-gray-400">Přetáhněte</span>
    </div>
  );
};

interface DraggableImageCardProps {
  image: ImageItem;
  index: number;
  moveImage: (draggedIndex: number, targetIndex: number) => void;
}

const DraggableImageCard: React.FC<DraggableImageCardProps> = ({
  image,
  index,
  moveImage,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: ItemType,
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveImage(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  }));

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`relative flex flex-col items-center gap-2 p-3 bg-gray-800 text-white shadow rounded cursor-move transition-transform ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <img
        src={image.filePath}
        alt={image.fileName}
        className="w-full h-32 object-cover rounded"
      />
      <input
        type="text"
        className="text-sm p-2 bg-gray-700 text-white rounded w-full"
        value={image.caption}
        onChange={(e) =>
          console.log(`Caption for ${image.id}:`, e.target.value)
        }
        placeholder="Přidejte popis..."
      />
    </div>
  );
};

export default AddImagesPage;
