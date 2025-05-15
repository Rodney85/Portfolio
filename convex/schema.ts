import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Admin users table - simple username/password authentication
  adminUsers: defineTable({
    username: v.string(),
    // Store hashed password in production
    passwordHash: v.string(),
    lastLogin: v.optional(v.number()),
    createdAt: v.number(),
  }).index("by_username", ["username"]),
  // Projects table
  projects: defineTable({
    // Basic fields
    title: v.string(),
    description: v.string(),
    imageUrl: v.optional(v.string()), // Main image URL (keeping for backward compatibility)
    storageId: v.optional(v.string()), // Storage ID for main image
    
    // Device-specific image URLs
    desktopImageUrl: v.optional(v.string()), // Desktop view image
    tabletImageUrl: v.optional(v.string()), // Tablet view image
    mobileImageUrl: v.optional(v.string()), // Mobile view image
    
    // Device-specific storage IDs
    desktopStorageId: v.optional(v.string()), // Storage ID for desktop image
    tabletStorageId: v.optional(v.string()), // Storage ID for tablet image
    mobileStorageId: v.optional(v.string()), // Storage ID for mobile image
    
    // Legacy fields - keeping for backward compatibility
    additionalImages: v.optional(v.array(v.string())),
    additionalStorageIds: v.optional(v.array(v.string())),
    
    tags: v.array(v.string()),
    githubUrl: v.optional(v.string()),
    liveUrl: v.optional(v.string()),
    
    // Advanced fields
    detailedDescription: v.optional(v.string()),
    technologies: v.optional(v.string()),
    challenges: v.optional(v.string()),
    outcomes: v.optional(v.string()),
    duration: v.optional(v.string()),
    role: v.optional(v.string()),
    teamSize: v.optional(v.string()),
    year: v.optional(v.string()),
    
    // Metadata
    createdAt: v.number(), // Timestamp
    updatedAt: v.number(), // Timestamp
  }),

  // Messages table (for contact form submissions)
  messages: defineTable({
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
    createdAt: v.number(), // Timestamp
    read: v.boolean(), // Track if message has been read
  }),

  // Contacts table
  contacts: defineTable({
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    phone: v.optional(v.string()),
    createdAt: v.number(), // Timestamp
    updatedAt: v.optional(v.number()), // Timestamp
  }),

  // Files table (for storing file metadata)
  files: defineTable({
    storageId: v.string(), // Convex storage ID
    projectId: v.optional(v.id("projects")), // Reference to project if applicable
    filename: v.string(),
    size: v.number(),
    type: v.string(), // MIME type
    uploadedAt: v.number(), // Timestamp
    url: v.optional(v.string()), // For backward compatibility with existing data
    status: v.optional(v.string()), // For backward compatibility
    error: v.optional(v.string()),  // For backward compatibility
  })
    .index("by_storageId", ["storageId"])
});
