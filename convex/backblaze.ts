import { action } from "./_generated/server";
import { v } from "convex/values";

// Define response types for better type safety
export interface BackblazeAuthResponse {
  authorizationToken: string;
  apiUrl: string;
  downloadUrl: string;
  recommendedPartSize: number;
}

export interface BackblazeUploadUrlResponse {
  uploadUrl: string;
  authorizationToken: string;
}

export interface BackblazeUploadData {
  uploadUrl: string;
  authorizationToken: string;
  contentType: string;
  filename?: string;
  downloadUrl: string;
  bucketName: string;
}

// Action to generate a signed URL for Backblaze B2 upload
export const generateUploadUrl = action({
  args: {
    contentType: v.optional(v.string()),
    filename: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Get Backblaze credentials from environment variables
    const keyId = process.env.BACKBLAZE_KEY_ID;
    const appKey = process.env.BACKBLAZE_APP_KEY;
    const bucketId = process.env.BACKBLAZE_BUCKET_ID;
    
    if (!keyId || !appKey || !bucketId) {
      throw new Error("Missing Backblaze credentials in environment variables");
    }
    
    try {
      // Step 1: Authorize with Backblaze
      const authResponse = await authorizeBackblaze(keyId, appKey);
      
      // Step 2: Get upload URL
      const uploadUrlResponse = await getUploadUrl(authResponse.apiUrl, authResponse.authorizationToken, bucketId);
      
      return {
        uploadUrl: uploadUrlResponse.uploadUrl,
        authorizationToken: uploadUrlResponse.authorizationToken,
        contentType: args.contentType || "application/octet-stream",
        filename: args.filename,
        downloadUrl: authResponse.downloadUrl,
        bucketName: process.env.BACKBLAZE_BUCKET_NAME,
      };
    } catch (error) {
      console.error("Error generating Backblaze upload URL:", error);
      throw new Error(`Failed to generate upload URL: ${error}`);
    }
  },
});

// Helper function to authorize with Backblaze
async function authorizeBackblaze(keyId: string, appKey: string) {
  const authString = `${keyId}:${appKey}`;
  const authHeader = `Basic ${Buffer.from(authString).toString('base64')}`;
  
  const response = await fetch('https://api.backblazeb2.com/b2api/v2/b2_authorize_account', {
    method: 'GET',
    headers: {
      Authorization: authHeader,
    },
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Authorization failed: ${response.status} ${errorText}`);
  }
  
  return await response.json();
}

// Helper function to get upload URL
async function getUploadUrl(apiUrl: string, authToken: string, bucketId: string) {
  const response = await fetch(`${apiUrl}/b2api/v2/b2_get_upload_url`, {
    method: 'POST',
    headers: {
      Authorization: authToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      bucketId: bucketId,
    }),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to get upload URL: ${response.status} ${errorText}`);
  }
  
  return await response.json();
}

// Action to delete a file from Backblaze
export const deleteFile = action({
  args: {
    fileId: v.string(),
    fileName: v.string(),
  },
  handler: async (ctx, args) => {
    // Get Backblaze credentials from environment variables
    const keyId = process.env.BACKBLAZE_KEY_ID;
    const appKey = process.env.BACKBLAZE_APP_KEY;
    
    if (!keyId || !appKey) {
      throw new Error("Missing Backblaze credentials in environment variables");
    }
    
    try {
      // Step 1: Authorize with Backblaze
      const authResponse = await authorizeBackblaze(keyId, appKey);
      
      // Step 2: Delete the file
      const response = await fetch(`${authResponse.apiUrl}/b2api/v2/b2_delete_file_version`, {
        method: 'POST',
        headers: {
          Authorization: authResponse.authorizationToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileId: args.fileId,
          fileName: args.fileName,
        }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Delete failed: ${response.status} ${errorText}`);
      }
      
      return { success: true };
    } catch (error) {
      console.error("Error deleting Backblaze file:", error);
      throw new Error(`Failed to delete file: ${error}`);
    }
  },
});
