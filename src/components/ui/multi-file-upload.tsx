import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FileIcon, Upload, X, Plus, Image } from "lucide-react";
import { cn } from '@/lib/utils';
import { Button } from './button';

interface MultiFileUploadProps {
  onFilesUploaded: (storageIds: string[]) => void;
  existingImageUrls?: string[];
  accept?: string;
  maxSize?: number; // in MB
  maxFiles?: number; // maximum number of files to allow
  className?: string;
  disabled?: boolean;
}

interface UploadedFile {
  file: File;
  preview: string;
  storageId?: string;
  status: 'uploading' | 'complete' | 'error';
  error?: string;
}

const MultiFileUpload: React.FC<MultiFileUploadProps> = ({
  onFilesUploaded,
  existingImageUrls = [],
  accept = "image/*",
  maxSize = 5, // 5MB default
  maxFiles = 5, // Max 5 files by default
  className,
  disabled = false,
}) => {
  // States for the component
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Convex mutation to get upload URL
  const generateUploadUrl = useMutation(api.files.generateUploadUrl as any);

  // Initialize with existing images if provided
  useEffect(() => {
    if (existingImageUrls && existingImageUrls.length > 0 && files.length === 0) {
      const initialFiles = existingImageUrls.map(url => ({
        file: new File([], "existing-image.jpg"), // Placeholder file
        preview: url,
        status: 'complete' as const,
        storageId: '', // We don't have the storage ID for existing images
      }));
      setFiles(initialFiles);
    }
  }, [existingImageUrls]);

  // Upload file to Convex storage
  const uploadFile = async (fileToUpload: File, index: number) => {
    if (!fileToUpload) return;

    try {
      // Update status to uploading
      setFiles(prev => {
        const updated = [...prev];
        updated[index] = { ...updated[index], status: 'uploading' };
        return updated;
      });

      setError(null);

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

      // Update the file with the storage ID and complete status
      setFiles(prev => {
        const updated = [...prev];
        updated[index] = { 
          ...updated[index], 
          status: 'complete',
          storageId 
        };
        return updated;
      });

      // Update the state first, then collect all IDs from the updated state
      setFiles(prev => {
        const updated = [...prev];
        updated[index] = { 
          ...updated[index], 
          status: 'complete',
          storageId 
        };
        
        // After updating, collect all storage IDs from the updated files array
        const allStorageIds = updated
          .filter(f => f.status === 'complete' && f.storageId)
          .map(f => f.storageId as string);
        
        // Pass all storage IDs to the parent component
        console.log("Sending all storage IDs to parent:", allStorageIds);
        onFilesUploaded(allStorageIds);
        
        return updated;
      });

    } catch (err: any) {
      console.error('Upload failed:', err);
      
      // Update the file with error status
      setFiles(prev => {
        const updated = [...prev];
        updated[index] = { 
          ...updated[index], 
          status: 'error',
          error: err.message || 'Unknown error'
        };
        return updated;
      });
      
      setError(`Upload failed: ${err.message || 'Unknown error'}`);
    }
  };

  // Handle file selection
  const handleFileSelect = useCallback((filesToUpload: FileList | null) => {
    if (!filesToUpload || disabled) return;

    setError(null);
    
    console.log('Current files:', files.length, 'Selected files:', filesToUpload.length, 'Max allowed:', maxFiles);
    
    // Check if adding new files would exceed max limit
    if (files.length + filesToUpload.length > maxFiles) {
      setError(`You can upload a maximum of ${maxFiles} files`);
      return;
    }

    // Process each selected file
    Array.from(filesToUpload).forEach((file, index) => {
      // Validate file type if accept is specified
      if (accept !== "*" && !accept.split(',').some(type => {
        // Handle wildcards like image/* by checking if file.type starts with 'image/'
        if (type.endsWith('/*')) {
          const category = type.replace('/*', '/');
          return file.type.startsWith(category);
        }
        return file.type === type;
      })) {
        setError(`File type ${file.type} is not allowed`);
        return;
      }

      // Validate file size
      if (file.size > maxSize * 1024 * 1024) {
        setError(`File is too large. Maximum size is ${maxSize}MB`);
        return;
      }

      console.log(`Processing file ${index + 1}/${filesToUpload.length}: ${file.name}`);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = e.target?.result as string;
        
        // Add file to state with 'uploading' status
        setFiles(prevFiles => {
          const newFiles = [
            ...prevFiles,
            {
              file,
              preview,
              status: 'uploading' as const
            }
          ];
          
          console.log(`Added file to state. Total files: ${newFiles.length}`);
          
          // Trigger upload for the file (use the new index from updated state)
          const newIndex = newFiles.length - 1;
          setTimeout(() => uploadFile(file, newIndex), 0);
          
          return newFiles;
        });
      };
      reader.readAsDataURL(file);
    });
  }, [files, accept, maxSize, maxFiles, disabled, uploadFile]);

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

    handleFileSelect(e.dataTransfer.files);
  }, [disabled]);

  // Handle file input change
  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
    
    // Reset file input value so the same file can be selected again if removed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  // Handle file removal
  const handleRemove = useCallback((index: number) => {
    setFiles(prev => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      
      // After removing, collect all remaining storage IDs and notify parent
      const remainingIds = newFiles
        .filter(f => f.status === 'complete' && f.storageId)
        .map(f => f.storageId as string);
      
      onFilesUploaded(remainingIds);
      
      return newFiles;
    });
  }, [onFilesUploaded]);

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept={accept}
        className="hidden"
        disabled={disabled}
        multiple
      />
      
      {/* File previews grid */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {files.map((file, index) => (
            <div key={index} className="relative rounded-md overflow-hidden border aspect-square">
              {/* Image preview */}
              <img
                src={file.preview}
                alt={`Preview ${index + 1}`}
                className="object-cover w-full h-full"
              />
              
              {/* Uploading overlay */}
              {file.status === 'uploading' && (
                <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
                  <div className="animate-pulse text-primary">
                    <FileIcon className="h-8 w-8" />
                  </div>
                </div>
              )}
              
              {/* Error overlay */}
              {file.status === 'error' && (
                <div className="absolute inset-0 bg-destructive/20 flex items-center justify-center">
                  <div className="text-destructive bg-background/80 p-2 rounded-md text-xs text-center">
                    Upload failed
                  </div>
                </div>
              )}
              
              {/* Remove button */}
              <button
                type="button"
                className="absolute top-1 right-1 p-1 rounded-full bg-destructive/80 text-destructive-foreground hover:bg-destructive"
                onClick={() => handleRemove(index)}
              >
                <X className="h-3 w-3" />
              </button>
              
              {/* Image number indicator */}
              <div className="absolute bottom-1 left-1 bg-background/80 text-xs px-2 py-1 rounded-full">
                {index + 1}
              </div>
            </div>
          ))}
          
          {/* Add more button (if under max files) */}
          {files.length < maxFiles && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
              className={cn(
                "border-2 border-dashed rounded-md flex flex-col items-center justify-center aspect-square",
                "hover:border-primary/50 hover:bg-primary/5 transition-colors",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <Plus className="h-6 w-6 mb-1" />
              <span className="text-xs">Add image</span>
            </button>
          )}
        </div>
      )}
      
      {/* File drop zone - shown when no files are uploaded yet */}
      {files.length === 0 && (
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
            <Image className="mb-2 h-6 w-6" />
            <p className="text-sm font-medium">Drag and drop or click to upload images</p>
            <p className="text-xs">
              {accept === "*" ? "Any file" : accept.split(",").join(", ")} up to {maxSize}MB
            </p>
            <p className="text-xs mt-1">
              Maximum {maxFiles} images
            </p>
          </div>
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <div className="text-sm text-destructive">{error}</div>
      )}
    </div>
  );
};

export default MultiFileUpload;
