import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import React, { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// Define a simplified version of the Id type for use in this file
type Id<TableName extends string> = string & { readonly _brand: unique symbol; };


// Type declaration to fix window.doNotTrack error
declare global {
  interface Window {
    doNotTrack?: string;
  }
}

type EventType = "pageview" | "project_view" | "live_click";

/**
 * Get the user's device type based on screen width
 */
export const getDeviceType = (): "desktop" | "tablet" | "mobile" => {
  if (typeof window === "undefined") return "desktop"; // SSR fallback
  
  const width = window.innerWidth;
  
  if (width <= 768) return "mobile";
  if (width <= 1024) return "tablet";
  return "desktop";
};

/**
 * Parse UTM parameters from the URL
 */
export const getUtmParams = () => {
  if (typeof window === "undefined") return {};
  
  const urlParams = new URLSearchParams(window.location.search);
  
  return {
    utmSource: urlParams.get("utm_source") || undefined,
    utmMedium: urlParams.get("utm_medium") || undefined,
    utmCampaign: urlParams.get("utm_campaign") || undefined,
  };
};

/**
 * Get the referrer, with special handling for first page load
 */
export const getReferrer = (): string | undefined => {
  if (typeof window === "undefined") return undefined;
  
  // On first page load, use document.referrer and store in sessionStorage
  if (!sessionStorage.getItem("initialReferrer") && document.referrer) {
    sessionStorage.setItem("initialReferrer", document.referrer);
    return document.referrer;
  }
  
  // On subsequent navigation, use the stored referrer
  return sessionStorage.getItem("initialReferrer") || undefined;
};

/**
 * Check if user has Do Not Track enabled
 */
export const isDoNotTrackEnabled = (): boolean => {
  if (typeof window === "undefined") return false;
  
  // Added type checking to avoid errors
  return navigator.doNotTrack === "1" || 
         (window.doNotTrack === "1");
};

/**
 * Generate or retrieve a visitor ID
 */
export const getVisitorId = (): string => {
  if (typeof window === "undefined") return ""; // SSR fallback
  
  // Check if we already have a visitor ID in localStorage
  const storedVisitorId = localStorage.getItem("visitorId");
  
  if (storedVisitorId) {
    return storedVisitorId;
  }
  
  // Generate a new UUID for this visitor
  const newVisitorId = uuidv4();
  
  // Store it for future visits
  try {
    localStorage.setItem("visitorId", newVisitorId);
  } catch (e) {
    console.error("Failed to store visitor ID:", e);
  }
  
  return newVisitorId;
};

/**
 * Hook for analytics event logging
 */
export function useAnalytics() {
  // Safety check: Only use the mutation if api.analytics exists
  // This prevents errors when the API hasn't been fully generated yet
  const logEventMutation = useMutation(
    // @ts-ignore - Handle the case where api.analytics may not exist yet
    (api.analytics?.logEvent) ? api.analytics.logEvent : "analytics:logEvent"
  );
  
  // Generate visitor ID on mount
  const [visitorId, setVisitorId] = useState<string>("");
  
  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return;
    
    // Get or generate visitor ID
    setVisitorId(getVisitorId());
  }, []);
  
  const logEvent = useCallback((
    eventType: EventType, 
    additionalData: {
      path?: string;
      projectId?: Id<"projects">;
      isAdmin?: boolean;
    } = {}
  ) => {
    // Respect Do Not Track
    if (isDoNotTrackEnabled()) {
      console.debug("Analytics disabled due to Do Not Track");
      return;
    }
    
    // Get current path if not provided
    const path = additionalData.path || window.location.pathname;
    
    // Skip tracking for admin routes
    if (path.startsWith('/admin') || additionalData.isAdmin) {
      console.debug("Analytics skipped for admin route:", path);
      return;
    }
    
    // Get device information
    const device = getDeviceType();
    
    // Get referrer information
    const referrer = getReferrer();
    
    // Get UTM parameters
    const utmParams = getUtmParams();
    
    // Send event to Convex
    logEventMutation({
      eventType,
      path,
      device,
      referrer,
      visitorId, // Include the unique visitor ID with each event
      projectId: additionalData.projectId,
      ...utmParams
    }).catch(err => {
      // Silent fail for analytics
      console.error("Failed to log analytics event:", err);
    });
  }, [logEventMutation]);
  
  return { logEvent };
}

/**
 * Higher-order component to wrap a link that needs click tracking
 */
export function trackLiveUrlClick(projectId: Id<"projects">, logEvent: (eventType: EventType, additionalData?: any) => void) {
  // Return a click handler function that logs the event
  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    // We don't prevent default - let the link work normally
    // But we do log the click asynchronously
    logEvent("live_click", { 
      projectId,
      path: window.location.pathname
    });
    
    // Example usage in a component:
    // const { logEvent } = useAnalytics();
    // <a href="https://example.com" onClick={trackLiveUrlClick(project._id, logEvent)}>Live Demo</a>
  };
}
