import { useCallback, useEffect, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface UseImageUploadProps {
  onUpload?: (url: string) => void;
}

export function useImageUpload({ onUpload }: UseImageUploadProps = {}) {
  const previewRef = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const generateUploadUrl = useMutation(api.projects.generateUploadUrl);
  const storeImageUrl = useMutation(api.projects.storeImageUrl);

  const handleThumbnailClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        // Get the upload URL from Convex
        const postUrl = await generateUploadUrl();
        
        // Upload the file directly to storage
        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });
        
        if (!result.ok) {
          throw new Error(`Upload failed: ${result.statusText}`);
        }

        // Get the URL of the uploaded file
        const { storageId } = await result.json();
        const url = await storeImageUrl({ storageId });
        
        // Update the preview and notify parent
        setFileName(file.name);
        setPreviewUrl(url);
        previewRef.current = url;
        onUpload?.(url);
      } catch (error) {
        console.error("Failed to upload image:", error);
      }
    },
    [generateUploadUrl, storeImageUrl, onUpload],
  );

  const handleRemove = useCallback(() => {
    setPreviewUrl(null);
    setFileName(null);
    previewRef.current = null;
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  useEffect(() => {
    return () => {
      if (previewRef.current) {
        URL.revokeObjectURL(previewRef.current);
      }
    };
  }, []);

  return {
    previewUrl,
    fileName,
    fileInputRef,
    handleThumbnailClick,
    handleFileChange,
    handleRemove,
  };
}
