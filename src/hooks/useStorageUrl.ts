import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

/**
 * Hook to get a URL for a file from its Convex storage ID
 * @param storageId The Convex storage ID for the file
 * @returns URL for the file, or null if no storageId or failed to get URL
 */
export function useStorageUrl(storageId: string | undefined) {
  // If no storageId, return null immediately
  if (!storageId) return null;

  // Use the projects.getImageUrl query to get the URL directly from the storage ID
  let url = null;
  try {
    // Cast the API function to any to bypass TypeScript errors with the generated API
    url = useQuery(api.projects.getImageUrl as any, { storageId });
  } catch (error) {
    console.error('Error fetching storage URL:', error);
  }
  
  return url;
}
