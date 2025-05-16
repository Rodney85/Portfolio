import { mutation, query } from "../convex/_generated/server";
import { v } from "convex/values";
import { Doc, Id } from "./_generated/dataModel";

// Define types for analytics events
type EventType = "pageview" | "project_view" | "live_click";
type Device = "desktop" | "tablet" | "mobile";

// Event interface
interface AnalyticsEvent {
  eventType: EventType;
  path: string;
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
    projectId: v.optional(v.id("projects")),
    referrer: v.optional(v.string()),
    utmSource: v.optional(v.string()),
    utmMedium: v.optional(v.string()),
    utmCampaign: v.optional(v.string()),
    device: v.string(), // "desktop", "tablet", "mobile"
  },
  handler: async (ctx, args) => {
    // Check if Do Not Track is enabled (handled on client side)
    
    // Log the event
    const analyticsId = await ctx.db.insert("analytics", {
      ...args,
      timestamp: Date.now(),
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
    const events = await ctx.db
      .query("analytics")
      .withIndex("by_eventType", (q) => q.eq("eventType", "pageview"))
      .collect();
    
    // Count by device type
    const devices = events.reduce<Record<string, number>>((acc, event) => {
      const device = event.device;
      acc[device] = (acc[device] || 0) + 1;
      return acc;
    }, {});
    
    return {
      desktop: devices["desktop"] || 0,
      tablet: devices["tablet"] || 0,
      mobile: devices["mobile"] || 0
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
    
    // Map counts to projects with live URLs
    const result = projects
      .filter(project => project.liveUrl)
      .map(project => {
        const id = project._id.toString();
        return {
          id,
          title: project.title,
          liveUrl: project.liveUrl,
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
