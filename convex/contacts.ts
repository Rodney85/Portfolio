import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all contacts
export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("contacts")
      .collect();
  },
});

// Get a single contact by ID
export const getById = query({
  args: { id: v.id("contacts") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Create a new contact
export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    phone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("contacts", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

// Update an existing contact
export const update = mutation({
  args: {
    id: v.id("contacts"),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    company: v.optional(v.string()),
    phone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    
    // Verify the contact exists
    const existing = await ctx.db.get(id);
    if (!existing) {
      throw new Error(`Contact with ID ${id} not found`);
    }
    
    // Update the contact with new values
    return await ctx.db.patch(id, {
      ...fields,
      updatedAt: Date.now(),
    });
  },
});

// Delete a contact
export const remove = mutation({
  args: { id: v.id("contacts") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
