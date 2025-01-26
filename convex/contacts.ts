import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

// Submit a new contact form
export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    projectType: v.string(),
    message: v.string(),
    budget: v.string(),
  },
  handler: async (ctx, args) => {
    const contactId = await ctx.db.insert("contacts", {
      ...args,
      createdAt: Date.now(),
      read: false,
    });

    // Send push notification
    await ctx.scheduler.runAfter(0, api.notifications.sendPushNotification, args);

    return contactId;
  },
});

// List all contacts (admin only)
export const list = query({
  handler: async (ctx) => {
    const contacts = await ctx.db.query("contacts")
      .order("desc")
      .collect();
    return contacts;
  },
});

// Mark contact as read (admin only)
export const markAsRead = mutation({
  args: { id: v.id("contacts") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { read: true });
  },
});
