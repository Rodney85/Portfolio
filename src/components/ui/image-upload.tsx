import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useImageUpload } from "@/components/hooks/use-image-upload";
import { ImagePlus, X, Upload, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  onUpload?: (url: string) => void;
  className?: string;
}

export function ImageUpload({ onUpload, className }: ImageUploadProps) {
  const {
    previewUrl,
    fileName,
    fileInputRef,
    handleThumbnailClick,
    handleFileChange,
    handleRemove,
  } = useImageUpload({
    onUpload: (url) => {
      console.log("Uploaded image URL:", url);
      onUpload?.(url);
    },
  });

  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith("image/")) {
        const input = fileInputRef.current;
        if (input) {
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          input.files = dataTransfer.files;
          handleFileChange({ target: input } as React.ChangeEvent<HTMLInputElement>);
        }
      }
    },
    [handleFileChange],
  );

  return (
    <div className={cn("w-full max-w-md space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm", className)}>
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Image Upload</h3>
        <p className="text-sm text-muted-foreground">
          Supported formats: JPG, PNG, GIF
        </p>
      </div>

      <Input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {!previewUrl ? (
        <div
          onClick={handleThumbnailClick}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "flex h-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:bg-muted",
            isDragging && "border-primary/50 bg-primary/5",
          )}
        >
          <div className="rounded-full bg-background p-2 shadow-sm">
            <ImagePlus className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium">Click to select</p>
            <p className="text-xs text-muted-foreground">or drag and drop file here</p>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="group relative h-40 overflow-hidden rounded-lg border">
            <img
              src={previewUrl}
              alt="Preview"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
              <Button
                size="sm"
                variant="secondary"
                onClick={handleThumbnailClick}
                className="h-8 w-8 p-0"
              >
                <Upload className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={handleRemove}
                className="h-8 w-8 p-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {fileName && (
            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="truncate">{fileName}</span>
              <button
                onClick={handleRemove}
                className="ml-auto rounded-full p-1 hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
