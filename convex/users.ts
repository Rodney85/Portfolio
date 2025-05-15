import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get admin user by username
export const getByUsername = query({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    // Look up admin by username
    const admin = await ctx.db
      .query("adminUsers")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .first();
    
    return admin ? { 
      username: admin.username,
      lastLogin: admin.lastLogin,
      _id: admin._id
    } : null;
  },
});

// Check if an admin user exists
export const adminExists = query({
  handler: async (ctx) => {
    const admin = await ctx.db
      .query("adminUsers")
      .first();
    
    return !!admin;
  },
});
