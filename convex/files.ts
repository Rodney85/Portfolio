import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";

// Generate an upload URL for file uploads
export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    // Generate a URL that can be used to upload a file to Convex storage
    return await ctx.storage.generateUploadUrl();
  },
});

// Create a file record
export const createFile = mutation({
  args: {
    storageId: v.string(),
    filename: v.string(),
    type: v.string(),
    size: v.number(),
    projectId: v.optional(v.id("projects")),
  },
  handler: async (ctx, args) => {
    // Create a file record in the database
    const fileId = await ctx.db.insert("files", {
      storageId: args.storageId,
      filename: args.filename,
      type: args.type,
      size: args.size,
      projectId: args.projectId,
      uploadedAt: Date.now(),
    });

    return { fileId };
  }
});

// Get URL for a file
export const getUrl = query({
  args: { fileId: v.id("files") },
  handler: async (ctx, args) => {
    const file = await ctx.db.get(args.fileId);
    if (!file) {
      throw new ConvexError(`File with ID ${args.fileId} not found`);
    }
    
    return await ctx.storage.getUrl(file.storageId);
  },
});

// Get URL for a file (mutation version for internal use)
export const getUrlMutation = mutation({
  args: { fileId: v.id("files") },
  handler: async (ctx, args) => {
    const file = await ctx.db.get(args.fileId);
    if (!file) {
      throw new ConvexError(`File with ID ${args.fileId} not found`);
    }
    
    return await ctx.storage.getUrl(file.storageId);
  },
});

// Delete a file and remove metadata
export const remove = mutation({
  args: { fileId: v.id("files") },
  handler: async (ctx, args) => {
    const file = await ctx.db.get(args.fileId);
    if (!file) {
      throw new ConvexError(`File with ID ${args.fileId} not found`);
    }

    // Delete the file metadata
    await ctx.db.delete(args.fileId);
  },
});

// Get all files
export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("files").collect();
  },
});

// Get files by project
export const getByProject = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("files")
      .filter(q => q.eq(q.field("projectId"), args.projectId))
      .collect();
  },
});
