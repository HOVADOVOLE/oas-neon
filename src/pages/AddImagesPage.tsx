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
  const [filterCategory, setFilterCategory] = useState<number | null>(null);
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

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = imageList.findIndex((img) => img.id === Number(active.id));
    const newIndex = imageList.findIndex((img) => img.id === Number(over.id));

    const reorderedList = arrayMove(imageList, oldIndex, newIndex);
    setImageList(reorderedList);

    try {
      // Přidání +1 k indexům, aby pozice začínaly od 1
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

  // Filtrování obrázků podle kategorie
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
      <h2 className="text-4xl font-bold mb-6 text-center">Správa Obrázků</h2>
      <div className="w-4/5 flex flex-col items-center">
        {/* Nahrávání souborů */}
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
          className="block w-full p-3 mb-4 bg-gray-800 text-gray-200 rounded-lg shadow-lg focus:outline-none focus:ring focus:ring-indigo-500"
        >
          <option value="">Vyberte kategorii</option>
          <option value={1}>Neony</option>
          <option value={2}>Potisky</option>
          <option value={3}>Polepy</option>
        </select>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md focus:outline-none"
        >
          Nahrát Obrázky
        </button>

        {/* Dropdown pro filtrování */}
        <div className="w-full mt-6">
          <select
            value={filterCategory || ""}
            onChange={(e) =>
              setFilterCategory(e.target.value ? Number(e.target.value) : null)
            }
            className="w-full p-3 bg-gray-800 text-white rounded-lg shadow-lg focus:outline-none focus:ring focus:ring-indigo-500"
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
                {/* Přetahovací část */}
                <SortableItem image={image} />

                {/* Interaktivní část */}
                <div className="flex flex-col gap-2 mt-2">
                  <input
                    type="text"
                    value={image.caption}
                    onChange={(e) =>
                      handleCaptionChange(image.id, e.target.value)
                    }
                    placeholder="Přidejte popis..."
                    className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-indigo-500"
                  />
                  <select
                    value={image.category_id}
                    onChange={(e) =>
                      handleCategoryChange(image.id, Number(e.target.value))
                    }
                    className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-indigo-500"
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
    </div>
  );
};

export default AddImagesPage;
