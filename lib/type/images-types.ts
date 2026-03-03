  export interface ImageFile {
    id: string;
    file: File;
    preview: string;
    progress: number;
    status: "uploading" | "completed" | "error";
    error?: string;
  }

  export interface ImageUploadProps {
  maxFiles?: number;
  maxSize?: number;
  accept?: string;
  className?: string;
  onImagesChange?: (images: ImageFile[]) => void;
  onUploadComplete?: (images: ImageFile[]) => void;
}
