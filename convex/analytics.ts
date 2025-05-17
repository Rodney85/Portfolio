import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Doc, Id } from "./_generated/dataModel";

// Define types for analytics events
type EventType = "pageview" | "project_view" | "live_click";
type Device = "desktop" | "tablet" | "mobile";

// Event interface
interface AnalyticsEvent {
  eventType: EventType;
  path: string;
  visitorId?: string;
  projectId?: Id<"projects">;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  device: Device;
}

/**
 * Log an analytics event
 */
export const logEvent = mutation({
  args: {
    eventType: v.string(), // "pageview", "project_view", "live_click"
    path: v.string(),
    visitorId: v.optional(v.string()), // Unique visitor identifier
    projectId: v.optional(v.id("projects")),
    referrer: v.optional(v.string()),
    utmSource: v.optional(v.string()),
    utmMedium: v.optional(v.string()),
    utmCampaign: v.optional(v.string()),
    device: v.string(), // "desktop", "tablet", "mobile"
  },
  handler: async (ctx, args) => {
    // Check if Do Not Track is enabled (handled on client side)
    
    // Get current timestamp and use it to calculate today's date
    const timestamp = Date.now();
    const todayDate = new Date(timestamp).toISOString().split('T')[0]; // YYYY-MM-DD format
    
    // Skip duplicate events for the same visitor, path, and event type on the same day
    if (args.visitorId) {
      // Look for existing events from this visitor for this path and event type today
      const existingEvents = await ctx.db
        .query("analytics")
        .withIndex("byVisitor", (q) => 
          q.eq("visitorId", args.visitorId)
           .eq("eventType", args.eventType)
           .eq("path", args.path)
        )
        .collect();
        
      // Check if any existing events happened today
      const hasTodayEvent = existingEvents.some(event => {
        const eventDate = new Date(event.timestamp).toISOString().split('T')[0];
        return eventDate === todayDate;
      });
      
      // If we already have an event for this visitor/path/event today, don't insert another
      if (hasTodayEvent) {
        console.debug(
          `Skipping duplicate ${args.eventType} event for visitor ${args.visitorId} on path ${args.path}`
        );
        // Return null or a dummy ID to indicate no new event was created
        return null;
      }
    }
    
    // No duplicate found, log the event
    const analyticsId = await ctx.db.insert("analytics", {
      ...args,
      timestamp,
    });
    
    return analyticsId;
  },
});

/**
 * Get total site views
 */
export const getSiteViews = query({
  handler: async (ctx) => {
    const pageviews = await ctx.db
      .query("analytics")
      .withIndex("by_eventType", (q) => q.eq("eventType", "pageview"))
      .collect();
      
    return {
      total: pageviews.length,
      // Group by path
      byPath: pageviews.reduce<Record<string, number>>((acc, event) => {
        const path = event.path;
        acc[path] = (acc[path] || 0) + 1;
        return acc;
      }, {}),
    };
  },
});

/**
 * Get views by project
 */
export const getViewsByProject = query({
  handler: async (ctx) => {
    // Get all projects
    const projects = await ctx.db.query("projects").collect();
    
    // Get project view events
    const projectViews = await ctx.db
      .query("analytics")
      .withIndex("by_eventType", (q) => q.eq("eventType", "project_view"))
      .collect();
    
    // Count views per project
    const viewsByProjectId = projectViews.reduce<Record<string, number>>((acc, event) => {
      const projectId = event.projectId?.toString() || "";
      if (projectId) {
        acc[projectId] = (acc[projectId] || 0) + 1;
      }
      return acc;
    }, {});
    
    // Map counts to projects
    const result = projects.map(project => {
      const id = project._id.toString();
      return {
        id,
        title: project.title,
        views: viewsByProjectId[id] || 0,
      };
    });
    
    // Sort by views (descending)
    return result.sort((a, b) => b.views - a.views);
  }
});

/**
 * Get traffic sources breakdown
 */
export const getTrafficSources = query({
  handler: async (ctx) => {
    const events = await ctx.db.query("analytics").collect();
    
    // Initial pageview events with referrer
    const referrers = events
      .filter(event => event.eventType === "pageview" && event.referrer)
      .reduce<Record<string, number>>((acc, event) => {
        const source = event.referrer || "direct";
        acc[source] = (acc[source] || 0) + 1;
        return acc;
      }, {});
    
    // UTM sources
    const utmSources = events
      .filter(event => event.utmSource)
      .reduce<Record<string, number>>((acc, event) => {
        const source = event.utmSource || "";
        acc[source] = (acc[source] || 0) + 1;
        return acc;
      }, {});
    
    // Convert to array format for easier frontend use
    const referrerArray = Object.entries(referrers).map(([name, count]) => ({ name, count }));
    const utmArray = Object.entries(utmSources).map(([name, count]) => ({ name, count }));
    
    return {
      referrers: referrerArray.sort((a, b) => b.count - a.count),
      utmSources: utmArray.sort((a, b) => b.count - a.count)
    };
  },
});

/**
 * Get device breakdown
 */
export const getDeviceBreakdown = query({
  handler: async (ctx) => {
    const pageviews = await ctx.db
      .query("analytics")
      .withIndex("by_eventType", (q) => q.eq("eventType", "pageview"))
      .collect();
    
    // Count events by device type
    const counts = pageviews.reduce<Record<string, number>>((acc, event) => {
      const device = event.device || "unknown";
      acc[device] = (acc[device] || 0) + 1;
      return acc;
    }, {});
    
    return {
      desktop: counts["desktop"] || 0,
      tablet: counts["tablet"] || 0,
      mobile: counts["mobile"] || 0,
      other: counts["unknown"] || 0,
    };
  },
});

/**
 * Get live URL clicks
 */
export const getLiveClicks = query({
  handler: async (ctx) => {
    // Get all projects
    const projects = await ctx.db.query("projects").collect();
    
    // Get live click events
    const liveClicks = await ctx.db
      .query("analytics")
      .withIndex("by_eventType", (q) => q.eq("eventType", "live_click"))
      .collect();
    
    // Count clicks per project
    const clicksByProjectId = liveClicks.reduce<Record<string, number>>((acc, event) => {
      const projectId = event.projectId?.toString() || "";
      if (projectId) {
        acc[projectId] = (acc[projectId] || 0) + 1;
      }
      return acc;
    }, {});
    
    // Map counts to projects
    const result = projects.map(project => {
      const id = project._id.toString();
      return {
        id,
        title: project.title,
        clicks: clicksByProjectId[id] || 0,
      };
    });
    
    // Sort by clicks (descending)
    return result.sort((a, b) => b.clicks - a.clicks);
  }
});

/**
 * Get all analytics data in one query (reduces round trips)
 */
export const getAllAnalytics = query({
  handler: async (ctx) => {
    const siteViews = await ctx.db
      .query("analytics")
      .withIndex("by_eventType", (q) => q.eq("eventType", "pageview"))
      .collect();
      
    const projects = await ctx.db.query("projects").collect();
    
    const projectViews = await ctx.db
      .query("analytics")
      .withIndex("by_eventType", (q) => q.eq("eventType", "project_view"))
      .collect();
      
    const liveClicks = await ctx.db
      .query("analytics")
      .withIndex("by_eventType", (q) => q.eq("eventType", "live_click"))
      .collect();
    
    // Calculate metrics
    // 1. Total page views and by path
    const pagePaths = siteViews.reduce<Record<string, number>>((acc, event) => {
      const path = event.path;
      acc[path] = (acc[path] || 0) + 1;
      return acc;
    }, {});
    
    // 2. Project view counts
    const viewsByProjectId = projectViews.reduce<Record<string, number>>((acc, event) => {
      const projectId = event.projectId?.toString() || "";
      if (projectId) {
        acc[projectId] = (acc[projectId] || 0) + 1;
      }
      return acc;
    }, {});
    
    // 3. Live click counts
    const clicksByProjectId = liveClicks.reduce<Record<string, number>>((acc, event) => {
      const projectId = event.projectId?.toString() || "";
      if (projectId) {
        acc[projectId] = (acc[projectId] || 0) + 1;
      }
      return acc;
    }, {});
    
    // 4. Device breakdown
    const devices = siteViews.reduce<Record<string, number>>((acc, event) => {
      const device = event.device;
      acc[device] = (acc[device] || 0) + 1;
      return acc;
    }, {});
    
    // 5. Traffic sources
    const allEvents = [...siteViews, ...projectViews, ...liveClicks];
    const referrers = allEvents
      .filter(event => event.referrer)
      .reduce<Record<string, number>>((acc, event) => {
        const source = event.referrer || "direct";
        acc[source] = (acc[source] || 0) + 1;
        return acc;
      }, {});
    
    // Convert to array format for charts
    const referrerArray = Object.entries(referrers)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Top 5 sources
    
    const projectViewsArray = projects.map(project => {
      const id = project._id.toString();
      return {
        id,
        title: project.title,
        views: viewsByProjectId[id] || 0,
        clicks: clicksByProjectId[id] || 0,
      };
    }).sort((a, b) => b.views - a.views);
    
    const pathArray = Object.entries(pagePaths)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10 paths
    
    return {
      overview: {
        totalPageViews: siteViews.length,
        totalProjectViews: projectViews.length,
        totalLiveClicks: liveClicks.length,
        uniquePaths: Object.keys(pagePaths).length,
      },
      popularPages: pathArray,
      projectStats: projectViewsArray,
      devices: {
        desktop: devices["desktop"] || 0,
        tablet: devices["tablet"] || 0,
        mobile: devices["mobile"] || 0
      },
      topReferrers: referrerArray
    };
  }
});

/**
 * Clear all analytics data (admin only)
 * Use this for testing and resetting analytics
 */
export const clearAnalytics = mutation({
  handler: async (ctx) => {
    // In development, allow clearing data without authentication
    if (process.env.NODE_ENV === 'development') {
      console.log("Development mode: Allowing analytics clear without authentication");
      
      // Get all analytics events
      const events = await ctx.db.query("analytics").collect();
      
      // Delete each event
      for (const event of events) {
        await ctx.db.delete(event._id);
      }
      
      console.log(`Cleared ${events.length} analytics events in development mode`);
      return { deleted: events.length };
    }
    
    // In production, require proper authentication
    const identity = await ctx.auth.getUserIdentity();
    
    // No identity means not logged in
    if (!identity) {
      throw new Error("Authentication required");
    }
    
    // Check for admin status - you can customize this based on your auth system
    // Option 1: Check email domain (simple approach)
    const isAdmin = identity.email?.endsWith("@yourcompany.com") || false;
    
    // Option 2: Check roles claim if your auth system provides it
    const roles = identity.tokenIdentifier.includes("clerk") ? 
      (identity as any).publicMetadata?.roles as string[] : 
      [];
    const hasAdminRole = Array.isArray(roles) && roles.includes("admin");
    
    // Only proceed if admin
    if (!isAdmin && !hasAdminRole) {
      console.warn(`Unauthorized analytics clear attempt by ${identity.email}`);
      throw new Error("Unauthorized: Admin access required");
    }
    
    // Log this action for audit purposes
    console.log(`Analytics data cleared by admin ${identity.email} at ${new Date().toISOString()}`);
    
    // Get all analytics events
    const events = await ctx.db.query("analytics").collect();
    
    // Delete each event
    for (const event of events) {
      await ctx.db.delete(event._id);
    }
    
    return { deleted: events.length };
  },
});
