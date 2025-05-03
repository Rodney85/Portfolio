import React, { useCallback, useState, useRef } from 'react';
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FileIcon, Upload, X } from "lucide-react";
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileUploaded: (storageId: string) => void;
  onRemove?: () => void;
  projectId?: string; // Added for backward compatibility
  existingImageUrl?: string; // Added for backward compatibility
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
  disabled?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileUploaded,
  onRemove,
  projectId, // Not used but kept for backward compatibility
  existingImageUrl,
  accept = "image/*",
  maxSize = 5, // 5MB default
  className,
  disabled = false,
}) => {
  // States for the component
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(existingImageUrl || null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadComplete, setUploadComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Convex mutation to get upload URL
  const generateUploadUrl = useMutation(api.files.generateUploadUrl as any);

  // Upload file to Convex storage
  const uploadFile = async (fileToUpload: File) => {
    if (!fileToUpload) return;

    try {
      setIsUploading(true);
      setError(null);
      setUploadComplete(false);

      // Step 1: Get upload URL from Convex
      const uploadUrl = await generateUploadUrl();
      if (!uploadUrl) {
        throw new Error('Failed to generate upload URL');
      }

      // Step 2: Upload the file to Convex
      console.log('Uploading to Convex storage...');
      const result = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          'Content-Type': fileToUpload.type,
        },
        body: fileToUpload,
      });

      if (!result.ok) {
        throw new Error(`Failed to upload: ${result.status} ${result.statusText}`);
      }

      const { storageId } = await result.json();
      console.log('File uploaded to Convex with ID:', storageId);

      // Pass the storageId to the parent component
      onFileUploaded(storageId);

      setUploadComplete(true);
    } catch (err: any) {
      console.error('Upload failed:', err);
      setError(`Upload failed: ${err.message || 'Unknown error'}`);
    } finally {
      setIsUploading(false);
    }
  };

  // Handle file selection
  const handleFileSelect = (fileToUpload: File) => {
    // File validations
    if (!fileToUpload.type.match(accept.replace('*', '.*'))) {
      setError(`Invalid file type. Accepted types: ${accept}`);
      return;
    }

    if (fileToUpload.size > maxSize * 1024 * 1024) {
      setError(`File too large. Maximum size: ${maxSize}MB`);
      return;
    }

    setFile(fileToUpload);
    setError(null);

    // Create preview for image files
    if (fileToUpload.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(fileToUpload);
    } else {
      setPreview(null);
    }

    // Upload the file
    uploadFile(fileToUpload);
  };

  // Drag and drop handlers
  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [disabled]);

  // Handle file input change
  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, []);

  // Handle file removal
  const handleRemove = useCallback(() => {
    setFile(null);
    setPreview(null);
    setError(null);
    setUploadComplete(false);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    // Notify parent
    if (onRemove) {
      onRemove();
    }
  }, [onRemove]);

  return (
    <div className={cn("w-full", className)}>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept={accept}
        className="hidden"
        disabled={disabled || isUploading}
      />
      
      {/* File drop zone - shown only when no file is uploaded */}
      {!preview && !isUploading && !uploadComplete && (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50",
            "flex flex-col items-center justify-center space-y-2",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => !disabled && fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center justify-center text-muted-foreground">
            <Upload className="mb-2 h-6 w-6" />
            <p className="text-sm font-medium">Drag and drop or click to upload</p>
            <p className="text-xs">
              {accept === "*" ? "Any file" : accept.split(",").join(", ")} up to {maxSize}MB
            </p>
          </div>
        </div>
      )}
      
      {/* Preview for image files */}
      {preview && !isUploading && (
        <div className="relative mt-2">
          <div className="group relative rounded-lg overflow-hidden border border-muted-foreground/25 aspect-video flex items-center justify-center bg-muted">
            <img src={preview} alt="Preview" className="object-contain max-h-full" />
            
            {/* File name overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-2 text-xs truncate">
              {file?.name || "Uploaded image"}
            </div>
            
            {/* Remove button */}
            <button
              type="button"
              className="absolute top-2 right-2 p-1 rounded-full bg-destructive/80 text-destructive-foreground hover:bg-destructive"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
      
      {/* Loading state */}
      {isUploading && (
        <div className="border rounded-lg p-6 flex flex-col items-center justify-center space-y-2 bg-muted/50">
          <div className="animate-pulse text-primary">
            <FileIcon className="h-10 w-10" />
          </div>
          <p className="text-sm font-medium">Uploading...</p>
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <div className="mt-2 text-sm text-destructive">{error}</div>
      )}
    </div>
  );
};

export default FileUpload;
