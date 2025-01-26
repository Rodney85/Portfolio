import { action } from "./_generated/server";
import { v } from "convex/values";

export const sendPushNotification = action({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    projectType: v.string(),
    message: v.string(),
    budget: v.string(),
  },
  handler: async (ctx, args) => {
    const PUSHOVER_TOKEN = process.env.PUSHOVER_TOKEN;
    const PUSHOVER_USER = process.env.PUSHOVER_USER;

    if (!PUSHOVER_TOKEN || !PUSHOVER_USER) {
      throw new Error("Missing Pushover credentials");
    }

    const message = `
New Contact Form Submission
--------------------------
Name: ${args.name}
Email: ${args.email}
Phone: ${args.phone}
Project: ${args.projectType}
Budget: ${args.budget}

Message:
${args.message}
    `.trim();

    try {
      const response = await fetch("https://api.pushover.net/1/messages.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: PUSHOVER_TOKEN,
          user: PUSHOVER_USER,
          title: `New Contact: ${args.name}`,
          message: message,
          priority: 1,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error("Error sending push notification:", error);
        throw new Error(`Failed to send push notification: ${error}`);
      }

      return { success: true };
    } catch (error) {
      console.error("Error sending push notification:", error);
      throw error;
    }
  },
});
