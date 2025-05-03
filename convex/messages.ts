import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all messages
export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("messages")
      .collect();
  },
});

// Get a single message by ID
export const getById = query({
  args: { id: v.id("messages") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Create a new message (from contact form)
export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("messages", {
      ...args,
      createdAt: Date.now(),
      read: false,
    });
  },
});

// Mark a message as read
export const markAsRead = mutation({
  args: { id: v.id("messages") },
  handler: async (ctx, args) => {
    const message = await ctx.db.get(args.id);
    if (!message) {
      throw new Error(`Message with ID ${args.id} not found`);
    }
    
    await ctx.db.patch(args.id, { read: true });
  },
});

// Delete a message
export const remove = mutation({
  args: { id: v.id("messages") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
