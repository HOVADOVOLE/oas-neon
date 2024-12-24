import React, { useState, useEffect, useRef } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ImageManager from "../utils/Image";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import UploadPopup from "../components/UploadPopup";
import Footer from "../components/Footer";

interface ImageItem {
  id: number;
  filePath: string;
  fileName: string;
  caption: string;
  position: number;
  category_id: number;
}

const AddImagesPage = () => {
  const [filterCategory, setFilterCategory] = useState<number | null>(null);
  const [imageList, setImageList] = useState<ImageItem[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(
    null
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const captionTimers = useRef<{ [id: number]: NodeJS.Timeout }>({});
  const manager = new ImageManager();

  const loadImages = async () => {
    const images = await manager.getImages();
    setImageList(images.sort((a, b) => a.position - b.position));
  };

  const handleCaptionChange = (imageId: number, newCaption: string) => {
    setImageList((prevImages) =>
      prevImages.map((image) =>
        image.id === imageId ? { ...image, caption: newCaption } : image
      )
    );

    if (captionTimers.current[imageId]) {
      clearTimeout(captionTimers.current[imageId]);
    }

    captionTimers.current[imageId] = setTimeout(async () => {
      try {
        await manager.updateCaption(imageId, newCaption);
        console.log(`Caption for image ${imageId} updated successfully.`);
      } catch (error) {
        console.error("Error updating caption:", error);
      }
    }, 3000);
  };

  const handleCategoryChange = (imageId: number, newCategoryId: number) => {
    setImageList((prevImages) =>
      prevImages.map((image) =>
        image.id === imageId ? { ...image, category_id: newCategoryId } : image
      )
    );
  };

  const handleDeleteImage = async (imageId: number) => {
    try {
      await manager.deleteImage(imageId);
      setImageList((prevImages) =>
        prevImages.filter((image) => image.id !== imageId)
      );
      setShowDeleteConfirm(null);
      toast.success("Obrázek byl úspěšně smazán.");
    } catch (error) {
      console.error("Chyba při mazání obrázku:", error);
      toast.error("Mazání obrázku se nezdařilo.");
    }
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = imageList.findIndex((img) => img.id === Number(active.id));
    const newIndex = imageList.findIndex((img) => img.id === Number(over.id));

    const reorderedList = arrayMove(imageList, oldIndex, newIndex);
    setImageList(reorderedList);

    try {
      const movedImage = reorderedList[newIndex];
      await manager.moveImage(movedImage.id, newIndex + 1);
      console.log(
        `Image ID ${movedImage.id} moved to position ${
          newIndex + 1
        } successfully.`
      );
    } catch (error) {
      console.error("Chyba při ukládání nové pozice:", error);
    }
  };

  useEffect(() => {
    loadImages();
    return () => {
      Object.values(captionTimers.current).forEach((timer) =>
        clearTimeout(timer)
      );
    };
  }, []);

  const filteredImages = filterCategory
    ? imageList.filter((image) => image.category_id === filterCategory)
    : imageList;

  const SortableItem = ({ image }: { image: ImageItem }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: image.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="relative flex flex-col gap-3"
      >
        <img
          src={image.filePath}
          alt={image.fileName}
          className="w-full object-cover rounded-lg"
          style={{ aspectRatio: "16 / 9" }}
        />
      </div>
    );
  };

  return (
    <div className="py-12 bg-gray-900 text-white min-h-screen flex flex-col items-center w-full">
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Potvrzení smazání</h2>
            <p className="text-sm mb-6">
              Opravdu chcete smazat tento obrázek? Tuto akci nelze vrátit zpět.
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
                onClick={() => setShowDeleteConfirm(null)}
              >
                Zrušit
              </button>
              <button
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                onClick={() => handleDeleteImage(showDeleteConfirm)}
              >
                Smazat
              </button>
            </div>
          </div>
        </div>
      )}

      <Navbar />

      <div className="w-4/5 flex flex-col items-end mt-10">
        <button
          onClick={() => setIsPopupOpen(true)}
          className="px-6 py-2 mb-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md focus:outline-none"
        >
          Nahrát Obrázky
        </button>
        {isPopupOpen && (
          <UploadPopup
            onClose={() => setIsPopupOpen(false)}
            onUploadComplete={loadImages}
          />
        )}

        <div className="w-full my-6 text-left">
          <select
            value={filterCategory || ""}
            onChange={(e) =>
              setFilterCategory(e.target.value ? Number(e.target.value) : null)
            }
            className="py-3 px-4 bg-gray-800 text-white rounded-lg shadow-lg w-full sm:w-1/2 md:w-1/4 lg:w-1/5 xl:w-1/6 transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Všechny</option>
            <option value={1}>Neony</option>
            <option value={2}>Potisky</option>
            <option value={3}>Polepy</option>
          </select>
        </div>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={filteredImages.map((image) => image.id.toString())}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-4/5">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="relative flex flex-col gap-3 bg-gray-800 p-4 shadow-lg rounded-lg"
              >
                <SortableItem image={image} />
                <button
                  className="absolute top-2 right-2 bg-red-500 text-black rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
                  onClick={() => {
                    setShowDeleteConfirm(image.id);
                    console.log("Delete button clicked for image ID", image.id);
                  }}
                >
                  ×
                </button>
                <div className="flex flex-col gap-2 mt-2">
                  <input
                    type="text"
                    value={image.caption}
                    onChange={(e) =>
                      handleCaptionChange(image.id, e.target.value)
                    }
                    placeholder="Přidejte popis..."
                    className="w-full p-2 bg-gray-700 text-white rounded"
                  />
                  <select
                    value={image.category_id}
                    onChange={(e) =>
                      handleCategoryChange(image.id, Number(e.target.value))
                    }
                    className="w-full p-2 bg-gray-700 text-white rounded"
                  >
                    <option value={1}>Neony</option>
                    <option value={2}>Potisky</option>
                    <option value={3}>Polepy</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <Footer />
    </div>
  );
};

export default AddImagesPage;
