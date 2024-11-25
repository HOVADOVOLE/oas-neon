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
  categoryId?: number; // Přidaná kategorie obrázku
}

const AddImagesPage = () => {
  const [selectedFiles, setSelectedFiles] = useState<
    {
      file: File;
      categoryId?: number;
    }[]
  >([]);
  const [imageList, setImageList] = useState<ImageItem[]>([]);
  const manager = new ImageManager();

  const loadImages = async () => {
    const images = (await manager.getImages()).map((img) => ({
      id: img.id || 0,
      filePath: img.filePath,
      fileName: img.fileName,
      caption: img.caption,
      position: img.position,
      categoryId: img.category_id,
    }));
    setImageList(images);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files).map((file) => ({
        file,
        categoryId: undefined, // Defaultní kategorie zatím nevybraná
      }));
      setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    }
  };

  const handleCategoryChange = (index: number, categoryId: number) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.map((file, i) => (i === index ? { ...file, categoryId } : file))
    );
  };

  const handleSubmit = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select at least one file before submitting.");
      return;
    }

    try {
      for (const { file, categoryId } of selectedFiles) {
        if (!categoryId) {
          alert(`Please select a category for the file: ${file.name}`);
          return;
        }
        await manager.addImage(file, "", categoryId); // Předáváme kategorii
      }
      alert("Files successfully uploaded!");
      setSelectedFiles([]);
      loadImages();
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload files.");
    }
  };

  const handleCaptionChange = async (id: number, caption: string) => {
    await manager.updateCaption(id, caption);
    loadImages();
  };

  const handleDeleteImage = async (id: number) => {
    try {
      await manager.removeImage(id);
      loadImages();
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Failed to delete image.");
    }
  };

  const moveImage = async (id: number, newPosition: number) => {
    const currentImage = imageList.find((img) => img.id === id);
    if (!currentImage) return;

    await manager.changeOrder(id, newPosition);
    loadImages();
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6 mx-auto bg-white rounded shadow-md max-w-screen-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Upload Images</h2>
        <div className="flex flex-col items-center gap-4">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4 border rounded p-2 w-full max-w-md"
          />
          {selectedFiles.length > 0 && (
            <div className="mb-4">
              <p className="font-medium text-center">Selected Files:</p>
              <ul className="list-disc list-inside space-y-4">
                {selectedFiles.map((item, index) => (
                  <li key={index} className="flex flex-col gap-2">
                    <span>{item.file.name}</span>
                    <select
                      value={item.categoryId || ""}
                      onChange={(e) =>
                        handleCategoryChange(index, Number(e.target.value))
                      }
                      className="border rounded p-2"
                    >
                      <option value="" disabled>
                        Select Category
                      </option>
                      <option value={1}>Neony</option>
                      <option value={2}>Potisky</option>
                      <option value={3}>Polepy</option>
                    </select>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>

        {imageList.length > 0 && (
          <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 max-h-[70vh] overflow-y-auto p-4 bg-gray-100 rounded shadow-inner">
            {imageList.map((image, index) => (
              <ImageCard
                key={image.id}
                image={image}
                index={index}
                moveImage={moveImage}
                onCaptionChange={handleCaptionChange}
                onDelete={handleDeleteImage}
              />
            ))}
          </div>
        )}
      </div>
    </DndProvider>
  );
};

interface ImageCardProps {
  image: ImageItem;
  index: number;
  moveImage: (id: number, newPosition: number) => void;
  onCaptionChange: (id: number, caption: string) => void;
  onDelete: (id: number) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
  image,
  index,
  moveImage,
  onCaptionChange,
  onDelete,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { id: image.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: ItemType,
    hover: (draggedItem: { id: number; index: number }) => {
      if (draggedItem.index !== index) {
        moveImage(draggedItem.id, index + 1);
        draggedItem.index = index;
      }
    },
  }));

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`relative flex flex-col items-center gap-2 p-3 bg-white shadow rounded ${
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
        className="text-sm p-2 border rounded w-full"
        value={image.caption}
        onChange={(e) => onCaptionChange(image.id, e.target.value)}
        placeholder="Add a caption..."
      />
      <button
        onClick={() => onDelete(image.id)}
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
};

export default AddImagesPage;
