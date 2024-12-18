import { createClient } from "@supabase/supabase-js";
import imageCompression from "browser-image-compression";

type ImageData = {
  id: number;
  filePath: string;
  fileName: string;
  caption: string;
  position: number;
  category_id: number;
  category_name?: string;
};

const SUPABASE_URL = "https://bxwiyqyycdbhyrtqfbbf.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4d2l5cXl5Y2RiaHlydHFmYmJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIzOTU0NDEsImV4cCI6MjA0Nzk3MTQ0MX0.O2Iaf5TF_Bcndt7XRx4OzIVhb_XeJtZKWxCtHDggcH8";

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default class ImageManager {
  private supabase = supabaseClient;
  private tableName = "images";
  private bucketName = "images"; // Název bucketu v Supabase Storage

  /**
   * Převod obrázku do formátu WebP
   */
  private async convertToWebP(file: File): Promise<File> {
    const options = {
      maxSizeMB: 1, // Max velikost obrázku v MB
      maxWidthOrHeight: 1920, // Max rozměry
      useWebWorker: true,
      fileType: "image/webp", // Převod na WebP
    };

    try {
      const compressedFile = await imageCompression(file, options);
      return new File([compressedFile], `${file.name.split(".")[0]}.webp`, {
        type: "image/webp",
      });
    } catch (error) {
      console.error("Error converting image to WebP:", error);
      throw error;
    }
  }
  /**
   * Aktualizace kategorie obrázku
   */
  public async updateCategory(id: number, categoryId: number): Promise<void> {
    try {
      const { error } = await this.supabase
        .from(this.tableName)
        .update({ category_id: categoryId })
        .eq("id", id);

      if (error) throw error;

      console.log(`Category updated for image with ID: ${id}`);
    } catch (error) {
      console.error("Error updating category in Supabase:", error);
      throw error;
    }
  }
  /**
   * Přidání nového obrázku do Supabase Storage a uložení jeho cesty do databáze
   */
  public async addImage(
    file: File,
    caption = "",
    categoryId: number
  ): Promise<void> {
    try {
      // Převod obrázku do WebP
      const webPFile = await this.convertToWebP(file);

      // Nahrání souboru do Supabase Storage
      const fileName = `${Date.now()}_${webPFile.name}`;
      const { data: uploadData, error: uploadError } =
        await this.supabase.storage
          .from(this.bucketName)
          .upload(fileName, webPFile);

      if (uploadError) {
        throw new Error(
          "Error uploading file to Supabase Storage: " + uploadError.message
        );
      }

      // Získání veřejné URL souboru
      const { data } = this.supabase.storage
        .from(this.bucketName)
        .getPublicUrl(fileName);

      const publicUrl = data?.publicUrl;
      if (!publicUrl) {
        throw new Error("Unable to retrieve public URL for the uploaded file.");
      }

      // Uložení cesty obrázku do databáze
      const { error } = await this.supabase.from(this.tableName).insert({
        file_path: publicUrl,
        file_name: webPFile.name,
        caption,
        position: 1,
        category_id: categoryId,
      });

      if (error) throw error;

      console.log(`Image added successfully: ${publicUrl}`);
    } catch (error) {
      console.error("Error adding image to Supabase:", error);
    }
  }

  /**
   * Načtení všech obrázků s názvem kategorie
   */
  public async getImages(): Promise<ImageData[]> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select(
          `
          id,
          file_path,
          file_name,
          caption,
          position,
          category_id
        `
        )
        .order("position", { ascending: true });

      if (error) throw error;

      console.log("Fetched images from database:", data);

      return (data || []).map((img: any) => ({
        id: img.id ?? 0,
        filePath: img.file_path || "",
        fileName: img.file_name || "",
        caption: img.caption || "",
        category_id: img.category_id ?? 0,
        position: img.position || 0,
      })) as ImageData[];
    } catch (error) {
      console.error("Error fetching images from Supabase:", error);
      return [];
    }
  }

  /**
   * Aktualizace popisku obrázku
   */
  public async updateCaption(id: number, caption: string): Promise<void> {
    try {
      const { error } = await this.supabase
        .from(this.tableName)
        .update({ caption })
        .eq("id", id);

      if (error) throw error;

      console.log(`Caption updated for image with ID: ${id}`);
    } catch (error) {
      console.error("Error updating caption in Supabase:", error);
    }
  }

  /**
   * Změna pořadí obrázků
   */
  public async moveImage(
    image_id: number,
    new_position: number
  ): Promise<void> {
    try {
      const { error } = await this.supabase.rpc("move_image", {
        image_id: image_id,
        new_position: new_position,
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error updating image order in Supabase:", error);
    }
  }
}
