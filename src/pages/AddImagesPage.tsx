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
import { Helmet } from "react-helmet-async";

interface ImageItem {
  id: number;
  filePath: string;
  fileName: string;
  caption: string;
  position: number;
  category_id: number;
}

const AddImagesPage: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<number | null>(null);
  const [imageList, setImageList] = useState<ImageItem[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(
    null
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const captionTimers = useRef<{ [id: number]: NodeJS.Timeout }>({});
  const manager = useRef(new ImageManager());

  const loadImages = async () => {
    setLoading(true);
    try {
      const images = await manager.current.getImages();
      setImageList(images.sort((a, b) => a.position - b.position));
    } catch (error) {
      console.error("Error loading images:", error);
      toast.error("Nepodařilo se načíst obrázky.");
    } finally {
      setLoading(false);
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
        await manager.current.updateCaption(imageId, newCaption);
        toast.success("Popisek byl úspěšně aktualizován.");
      } catch (error) {
        console.error("Error updating caption:", error);
        toast.error("Aktualizace popisku selhala.");
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
      await manager.current.deleteImage(imageId);
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
      await manager.current.moveImage(movedImage.id, newIndex + 1);
      toast.success(`Obrázek přesunut na pozici ${newIndex + 1}.`);
    } catch (error) {
      console.error("Chyba při ukládání nové pozice:", error);
      toast.error("Uložení nové pozice selhalo.");
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

  const SortableItem: React.FC<{ image: ImageItem }> = ({ image }) => {
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
    <>
      <Helmet>
        <title>Správa obrázků | OAS-NEON</title>
        <meta
          name="description"
          content="Systémový dashboard pro správu obrázků na webu OAS-NEON."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="py-12 bg-[#111111] text-white min-h-screen flex flex-col items-center w-full">
        {showDeleteConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-[#111111] bg-opacity-90 z-50">
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-lg font-semibold mb-4">Potvrzení smazání</h2>
              <p className="text-sm mb-6">
                Opravdu chcete smazat tento obrázek? Tuto akci nelze vrátit
                zpět.
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
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <div className="loader border-t-4 border-b-4 border-[#FF007F] rounded-full w-12 h-12 animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="w-4/5 flex flex-wrap items-center justify-between my-8 gap-4 sm:gap-0">
              <select
                value={filterCategory || ""}
                onChange={(e) =>
                  setFilterCategory(
                    e.target.value ? Number(e.target.value) : null
                  )
                }
                className="py-3 px-4 bg-gray-800 text-white rounded-lg shadow-lg w-full sm:w-1/2 md:w-1/4 lg:w-1/5 xl:w-1/6 transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Všechny</option>
                <option value={1}>Neony</option>
                <option value={2}>Potisky</option>
                <option value={3}>Polepy</option>
              </select>

              <button
                onClick={() => setIsPopupOpen(true)}
                className="px-6 py-2 bg-[#FF007F] hover:bg-[#BF053D] text-white font-semibold rounded-lg shadow-md focus:outline-none sm:ml-auto w-full sm:w-1/3 md:w-1/3 lg:w-1/5 xl:w-1/12"
              >
                Nahrát Obrázky
              </button>
              {isPopupOpen && (
                <UploadPopup
                  onClose={() => setIsPopupOpen(false)}
                  onUploadComplete={loadImages}
                />
              )}
            </div>

            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
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
                        onClick={() => setShowDeleteConfirm(image.id)}
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
                            handleCategoryChange(
                              image.id,
                              Number(e.target.value)
                            )
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
            <div className="w-full bottom-0 mt-3">
              <Footer />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AddImagesPage;
