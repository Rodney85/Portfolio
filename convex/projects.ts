import { mutation, query, action } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

// Get all projects
export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("projects").collect();
  },
});

// Get a single project by ID
export const getById = query({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Generate upload URL for projects
export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// Get a direct URL for an image from its storage ID
export const getImageUrl = query({
  args: { storageId: v.string() },
  handler: async (ctx, args) => {
    try {
      const url = await ctx.storage.getUrl(args.storageId);
      return url;
    } catch (error) {
      console.error("Error getting image URL:", error);
      return null;
    }
  },
});

// Create a new project
export const create = mutation({
  args: {
    // Basic fields
    title: v.string(),
    description: v.string(),
    imageUrl: v.optional(v.string()),
    additionalImages: v.optional(v.array(v.string())),  // Array of additional image URLs
    tags: v.array(v.string()),
    githubUrl: v.optional(v.string()),
    liveUrl: v.optional(v.string()),
    storageId: v.optional(v.string()), // Storage ID for the main image file
    additionalStorageIds: v.optional(v.array(v.string())), // Storage IDs for additional images
    
    // Advanced fields
    detailedDescription: v.optional(v.string()),
    technologies: v.optional(v.string()),
    challenges: v.optional(v.string()),
    outcomes: v.optional(v.string()),
    duration: v.optional(v.string()),
    role: v.optional(v.string()),
    teamSize: v.optional(v.string()),
    year: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const { storageId, additionalStorageIds, ...projectData } = args;
    
    // If a storageId is provided, generate the main image URL
    let imageUrl = projectData.imageUrl;
    if (storageId) {
      try {
        // Use Convex's built-in storage.getUrl to get the proper URL
        const url = await ctx.storage.getUrl(storageId);
        imageUrl = url || undefined;
        console.log("Generated main image URL from storageId:", imageUrl);
      } catch (error) {
        console.error("Error generating main image URL:", error);
      }
    }
    
    // Process additional images (if any)
    let additionalImages = projectData.additionalImages || [];
    
    // Generate URLs for additional images if storage IDs are provided
    if (additionalStorageIds && additionalStorageIds.length > 0) {
      // Limit to maximum of 4 additional images (5 total including main image)
      const limitedIds = additionalStorageIds.slice(0, 4);
      
      try {
        // Get URLs for all additional images
        const additionalUrlsPromises = limitedIds.map(id => ctx.storage.getUrl(id));
        const additionalUrls = await Promise.all(additionalUrlsPromises);
        
        // Filter out any null/undefined values and add to additionalImages
        const validUrls = additionalUrls.filter((url): url is string => url !== null && url !== undefined);
        additionalImages = [...additionalImages, ...validUrls];
        
        // Ensure we don't exceed 4 additional images
        if (additionalImages.length > 4) {
          additionalImages = additionalImages.slice(0, 4);
        }
        
        console.log("Generated additional image URLs:", additionalImages);
      } catch (error) {
        console.error("Error generating additional image URLs:", error);
      }
    }
    
    return await ctx.db.insert("projects", {
      ...projectData,
      imageUrl,
      additionalImages,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Update an existing project
export const update = mutation({
  args: {
    id: v.id("projects"),
    // Basic fields
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    additionalImages: v.optional(v.array(v.string())),
    tags: v.optional(v.array(v.string())),
    githubUrl: v.optional(v.string()),
    liveUrl: v.optional(v.string()),
    storageId: v.optional(v.string()), // Storage ID for the main image file
    additionalStorageIds: v.optional(v.array(v.string())), // Storage IDs for additional images
    
    // Advanced fields
    detailedDescription: v.optional(v.string()),
    technologies: v.optional(v.string()),
    challenges: v.optional(v.string()),
    outcomes: v.optional(v.string()),
    duration: v.optional(v.string()),
    role: v.optional(v.string()),
    teamSize: v.optional(v.string()),
    year: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, storageId, additionalStorageIds, ...fields } = args;
    
    // Verify the project exists
    const existing = await ctx.db.get(id);
    if (!existing) {
      throw new Error(`Project with ID ${id} not found`);
    }
    
    // If a storageId is provided, generate the main image URL 
    let imageUrl = fields.imageUrl;
    if (storageId) {
      try {
        // Use Convex's built-in storage.getUrl to get the proper URL
        const url = await ctx.storage.getUrl(storageId);
        imageUrl = url || undefined;
        console.log("Generated main image URL from storageId for update:", imageUrl);
        
        // Add the imageUrl to the fields to update
        fields.imageUrl = imageUrl;
      } catch (error) {
        console.error("Error generating main image URL during update:", error);
      }
    }
    
    // Process additional images (if any)
    // Start with existing additional images or empty array
    let additionalImages = fields.additionalImages || existing.additionalImages || [];
    
    // Generate URLs for additional images if storage IDs are provided
    if (additionalStorageIds && additionalStorageIds.length > 0) {
      // Limit to maximum of 4 additional images (5 total including main image)
      const limitedIds = additionalStorageIds.slice(0, 4);
      
      try {
        // Get URLs for all additional images
        const additionalUrlsPromises = limitedIds.map(id => ctx.storage.getUrl(id));
        const additionalUrls = await Promise.all(additionalUrlsPromises);
        
        // Filter out any null/undefined values
        const validUrls = additionalUrls.filter((url): url is string => url !== null && url !== undefined);
        
        // If we're replacing images, use only the new ones
        // Otherwise merge with existing (and keep under the limit of 4)
        if (fields.additionalImages) {
          additionalImages = [...fields.additionalImages, ...validUrls];
        } else {
          additionalImages = [...(existing.additionalImages || []), ...validUrls];
        }
        
        // Ensure we don't exceed 4 additional images
        if (additionalImages.length > 4) {
          additionalImages = additionalImages.slice(0, 4);
        }
        
        // Add additionalImages to fields to update
        fields.additionalImages = additionalImages;
        console.log("Final additional images for update:", additionalImages);
      } catch (error) {
        console.error("Error generating additional image URLs during update:", error);
      }
    }
    
    // Update the project with new values
    return await ctx.db.patch(id, {
      ...fields,
      updatedAt: Date.now(),
    });
  },
});

// Delete a project
export const remove = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
