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
    
    // Storage IDs for device-specific images
    desktopStorageId: v.optional(v.string()),
    tabletStorageId: v.optional(v.string()),
    mobileStorageId: v.optional(v.string()),
    
    // Legacy fields - keeping for backward compatibility
    additionalImages: v.optional(v.array(v.string())),  // Array of additional image URLs
    additionalStorageIds: v.optional(v.array(v.string())), // Storage IDs for additional images
    
    tags: v.array(v.string()),
    githubUrl: v.optional(v.string()),
    liveUrl: v.optional(v.string()),
    storageId: v.optional(v.string()), // Storage ID for the main image file
    
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
    const { 
      storageId, 
      additionalStorageIds = [],
      ...projectData 
    } = args;
    
    console.log("Creating project with data:", {
      ...projectData,
      storageId,
      additionalStorageIds,
    });

    // Process device-specific storage IDs from the additionalStorageIds array
    let desktopStorageId: string | undefined;
    let tabletStorageId: string | undefined;
    let mobileStorageId: string | undefined;
    
    // Filter the standard additional storage IDs (not device-specific) 
    const standardAdditionalStorageIds = additionalStorageIds.filter(id => {
      // Check if this is a device-specific image ID
      if (typeof id === 'string' && id.startsWith('desktop:')) {
        desktopStorageId = id.replace('desktop:', '');
        return false;
      } else if (typeof id === 'string' && id.startsWith('tablet:')) {
        tabletStorageId = id.replace('tablet:', '');
        return false;
      } else if (typeof id === 'string' && id.startsWith('mobile:')) {
        mobileStorageId = id.replace('mobile:', '');
        return false;
      }
      return true;
    });
    
    console.log("Extracted device-specific storage IDs:", {
      desktopStorageId,
      tabletStorageId,
      mobileStorageId,
      standardAdditionalStorageIds
    });
    
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
    
    // Process device-specific images
    let desktopImageUrl;
    let tabletImageUrl;
    let mobileImageUrl;
    
    // Generate desktop image URL if storage ID is provided
    if (desktopStorageId) {
      try {
        const url = await ctx.storage.getUrl(desktopStorageId);
        desktopImageUrl = url || undefined;
        console.log("Generated desktop image URL:", desktopImageUrl);
      } catch (error) {
        console.error("Error generating desktop image URL:", error);
      }
    }
    
    // Generate tablet image URL if storage ID is provided
    if (tabletStorageId) {
      try {
        const url = await ctx.storage.getUrl(tabletStorageId);
        tabletImageUrl = url || undefined;
        console.log("Generated tablet image URL:", tabletImageUrl);
      } catch (error) {
        console.error("Error generating tablet image URL:", error);
      }
    }
    
    // Generate mobile image URL if storage ID is provided
    if (mobileStorageId) {
      try {
        const url = await ctx.storage.getUrl(mobileStorageId);
        mobileImageUrl = url || undefined;
        console.log("Generated mobile image URL:", mobileImageUrl);
      } catch (error) {
        console.error("Error generating mobile image URL:", error);
      }
    }
    
    // Process additional images (legacy support)
    let additionalImages = projectData.additionalImages || [];
    
    // Generate URLs for additional images if storage IDs are provided
    if (additionalStorageIds && additionalStorageIds.length > 0) {
      // Limit to maximum of 4 additional images
      const limitedIds = additionalStorageIds.slice(0, 4);
      
      try {
        const additionalUrlsPromises = limitedIds.map(id => ctx.storage.getUrl(id));
        const additionalUrls = await Promise.all(additionalUrlsPromises);
        
        // Filter out any null/undefined values and add to additionalImages
        const validUrls = additionalUrls.filter((url): url is string => url !== null && url !== undefined);
        additionalImages = [...additionalImages, ...validUrls];
        
        // Ensure we don't exceed 4 additional images
        if (additionalImages.length > 4) {
          additionalImages = additionalImages.slice(0, 4);
        }
        
        console.log("Generated additional image URLs (legacy):", additionalImages);
      } catch (error) {
        console.error("Error generating additional image URLs:", error);
      }
    }
    
    // Log the final data being inserted
    console.log("Final project data to insert:", {
      ...projectData,
      imageUrl,
      desktopImageUrl,
      tabletImageUrl,
      mobileImageUrl,
      additionalImages,
      // Including the storage IDs
      desktopStorageId,
      tabletStorageId,
      mobileStorageId
    });

    // Insert into database with all required fields
    return await ctx.db.insert("projects", {
      ...projectData,
      // Main image URL
      imageUrl,
      
      // Device-specific image URLs
      ...(desktopImageUrl ? { desktopImageUrl } : {}),
      ...(tabletImageUrl ? { tabletImageUrl } : {}),
      ...(mobileImageUrl ? { mobileImageUrl } : {}),
      
      // Save the legacy fields
      additionalImages,
      
      // Only save the standard additional storage IDs, not the device-specific ones
      // since we've already processed them into their own fields
      additionalStorageIds: standardAdditionalStorageIds,
      
      // Timestamps
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
    
    // Storage IDs for device-specific images
    desktopStorageId: v.optional(v.string()),
    tabletStorageId: v.optional(v.string()),
    mobileStorageId: v.optional(v.string()),
    
    // Legacy fields - keeping for backward compatibility
    additionalImages: v.optional(v.array(v.string())),
    additionalStorageIds: v.optional(v.array(v.string())),
    
    tags: v.optional(v.array(v.string())),
    githubUrl: v.optional(v.string()),
    liveUrl: v.optional(v.string()),
    storageId: v.optional(v.string()), // Storage ID for the main image file
    
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
    const { 
      id, 
      storageId, 
      additionalStorageIds = [], 
      ...fields 
    } = args;
    
    // Verify the project exists
    const existing = await ctx.db.get(id);
    if (!existing) {
      throw new Error(`Project with ID ${id} not found`);
    }
    
    // Process device-specific storage IDs from the additionalStorageIds array
    let desktopStorageId: string | undefined;
    let tabletStorageId: string | undefined;
    let mobileStorageId: string | undefined;
    
    // Filter the standard additional storage IDs (not device-specific) 
    const standardAdditionalStorageIds = additionalStorageIds.filter((id: string) => {
      // Check if this is a device-specific image ID
      if (typeof id === 'string' && id.startsWith('desktop:')) {
        desktopStorageId = id.replace('desktop:', '');
        return false;
      } else if (typeof id === 'string' && id.startsWith('tablet:')) {
        tabletStorageId = id.replace('tablet:', '');
        return false;
      } else if (typeof id === 'string' && id.startsWith('mobile:')) {
        mobileStorageId = id.replace('mobile:', '');
        return false;
      }
      return true;
    });
    
    console.log("Update: Extracted device-specific storage IDs:", {
      desktopStorageId,
      tabletStorageId,
      mobileStorageId,
      standardAdditionalStorageIds
    });
    
    // If a storageId is provided, generate the main image URL 
    let imageUrl = fields.imageUrl;
    if (storageId) {
      try {
        const url = await ctx.storage.getUrl(storageId);
        imageUrl = url || undefined;
        console.log("Generated main image URL for update:", imageUrl);
        
        // Add the imageUrl to the fields to update
        fields.imageUrl = imageUrl;
      } catch (error) {
        console.error("Error generating main image URL during update:", error);
      }
    }
    
    // Process device-specific images if storage IDs are provided
    // Instead of updating fields directly with URLs, we'll store the URLs directly in the DB
    let desktopImageUrl;
    let tabletImageUrl;
    let mobileImageUrl;
    
    // Process desktop image
    if (desktopStorageId) {
      try {
        const url = await ctx.storage.getUrl(desktopStorageId);
        if (url) {
          desktopImageUrl = url;
          console.log("Generated desktop image URL for update:", url);
        }
      } catch (error) {
        console.error("Error generating desktop image URL during update:", error);
      }
    }
    
    // Process tablet image
    if (tabletStorageId) {
      try {
        const url = await ctx.storage.getUrl(tabletStorageId);
        if (url) {
          tabletImageUrl = url;
          console.log("Generated tablet image URL for update:", url);
        }
      } catch (error) {
        console.error("Error generating tablet image URL during update:", error);
      }
    }
    
    // Process mobile image
    if (mobileStorageId) {
      try {
        const url = await ctx.storage.getUrl(mobileStorageId);
        if (url) {
          mobileImageUrl = url;
          console.log("Generated mobile image URL for update:", url);
        }
      } catch (error) {
        console.error("Error generating mobile image URL during update:", error);
      }
    }
    
    // Process legacy additional images
    // Start with existing additional images or empty array
    let additionalImages = fields.additionalImages || existing.additionalImages || [];
    
    // Generate URLs for additional images if storage IDs are provided
    if (additionalStorageIds && additionalStorageIds.length > 0) {
      // Limit to maximum of 4 additional images
      const limitedIds = additionalStorageIds.slice(0, 4);
      
      try {
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
        console.log("Final legacy additional images for update:", additionalImages);
      } catch (error) {
        console.error("Error generating additional image URLs during update:", error);
      }
    }
    
    // Update the project with new values
    // We need to extend fields with device-specific image URLs
    // Creating a new object that includes these fields to avoid TypeScript errors
    const fieldsWithDeviceImages = {
      ...fields,
      ...(desktopImageUrl ? { desktopImageUrl } : {}),
      ...(tabletImageUrl ? { tabletImageUrl } : {}),
      ...(mobileImageUrl ? { mobileImageUrl } : {})
    };
    
    // Also add the processed additionalStorageIds to the fields with device images
    const fieldsWithAllData = {
      ...fieldsWithDeviceImages,
      // Use standardAdditionalStorageIds (without the device-specific ones which we've extracted)
      additionalStorageIds: standardAdditionalStorageIds
    };
    
    console.log("Final update fields:", fieldsWithAllData);
    
    return await ctx.db.patch(id, {
      ...fieldsWithAllData,
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
