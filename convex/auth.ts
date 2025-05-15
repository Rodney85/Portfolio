import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Simple hash function - in production you'd use a proper hashing library
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(16);
}

// Initialize admin user if none exists
export const initializeAdmin = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if admin already exists
    const existingAdmin = await ctx.db
      .query("adminUsers")
      .first();
    
    if (existingAdmin) {
      console.log("Admin user already exists");
      return { status: "exists", message: "Admin already initialized" };
    }
    
    console.log("Creating admin user");
    // Create admin with specified credentials - in production use env vars
    const username = "rod852";
    const password = "Qazxsw852#";
    
    await ctx.db.insert("adminUsers", {
      username,
      passwordHash: simpleHash(password),
      createdAt: Date.now(),
    });
    
    return { status: "success", message: "Admin user initialized" };
  }
});

// Login function - validates credentials and returns a session token
export const login = mutation({
  args: {
    username: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const { username, password } = args;
    console.log(`Login attempt for user: ${username}`);
    
    // Find admin user by username
    const admin = await ctx.db
      .query("adminUsers")
      .withIndex("by_username", q => q.eq("username", username))
      .first();
    
    if (!admin) {
      console.log("User not found");
      return { status: "error", message: "Invalid credentials" };
    }
    
    // Check password
    const passwordHash = simpleHash(password);
    
    if (admin.passwordHash !== passwordHash) {
      console.log("Invalid password");
      return { status: "error", message: "Invalid credentials" };
    }
    
    console.log("Login successful");
    // Update last login time
    await ctx.db.patch(admin._id, {
      lastLogin: Date.now(),
    });
    
    // Create a session token
    const sessionToken = simpleHash(admin._id.toString() + Date.now());
    
    return { 
      status: "success", 
      message: "Login successful",
      token: sessionToken,
      username: admin.username,
    };
  }
});

// Check if user exists
export const checkUser = query({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    const { username } = args;
    const user = await ctx.db
      .query("adminUsers")
      .withIndex("by_username", q => q.eq("username", username))
      .first();
    
    return !!user;
  },
});
