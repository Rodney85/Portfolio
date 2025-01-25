import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";

// List all projects
export const list = query({
  handler: async (ctx) => {
    const projects = await ctx.db.query("projects")
      .order("desc")
      .collect();
    return projects;
  },
});

// Get a single project by ID
export const get = query({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.id);
    return project;
  },
});

// Get storage URL for an image
export const getImageUrl = query({
  args: { storageId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

// Generate a URL for file upload
export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// Store the image URL after upload
export const storeImageUrl = mutation({
  args: { storageId: v.string() },
  handler: async (ctx, args) => {
    const url = await ctx.storage.getUrl(args.storageId);
    if (!url) {
      throw new ConvexError("Failed to get storage URL");
    }
    return url;
  },
});

// Create a new project
export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    thumbnail: v.string(),
    url: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const projectId = await ctx.db.insert("projects", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
    return projectId;
  },
});

// Update a project
export const update = mutation({
  args: {
    id: v.id("projects"),
    title: v.string(),
    description: v.string(),
    thumbnail: v.string(),
    url: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    await ctx.db.patch(id, {
      ...data,
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
