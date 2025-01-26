import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    title: v.string(),
    description: v.string(),
    thumbnail: v.string(), // For project image
    url: v.string(), // Project URL
    createdAt: v.number(), // Change to number for timestamp
    updatedAt: v.number(), // Change to number for timestamp
  }),
  
  contacts: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    projectType: v.string(),
    message: v.string(),
    budget: v.string(),
    createdAt: v.number(),
    read: v.boolean(),
  }),
});
