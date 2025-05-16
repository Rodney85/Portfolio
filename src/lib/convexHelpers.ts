/**
 * TEMPORARY SOLUTION FOR ANALYTICS FUNCTIONS
 * 
 * This file contains helper utilities to work with analytics functions
 * before the Convex API types are regenerated.
 * 
 * After restarting the Convex server, this file can be removed and
 * the standard api.analytics.X references can be used directly.
 */

import { useQuery, useMutation } from "convex/react";
import type { FunctionReference } from "convex/server";

// Create an object that mimics what the api.analytics namespace will look like
// after the Convex server is restarted and types are regenerated
export const analyticsAPI = {
  // Define all the analytics functions as proper function references
  getAllAnalytics: {} as FunctionReference<"query">,
  getSiteViews: {} as FunctionReference<"query">,
  getViewsByProject: {} as FunctionReference<"query">,
  getTrafficSources: {} as FunctionReference<"query">,
  getDeviceBreakdown: {} as FunctionReference<"query">,
  getLiveClicks: {} as FunctionReference<"query">,
  // Mutations
  clearAnalytics: {} as FunctionReference<"mutation">,
  logEvent: {} as FunctionReference<"mutation">
};

// Function that takes a query string and returns a result
// without TypeScript complaining
export function useAnalyticsQueryWithoutTypeError<T>(queryName: string): T | undefined {
  try {
    // @ts-ignore - Explicitly ignore the TypeScript error for useQuery
    return useQuery(queryName);
  } catch (error) {
    console.error(`Error querying ${queryName}: `, error);
    return undefined;
  }
}

// Function that takes a mutation string and returns a mutation function
// without TypeScript complaining
export function useAnalyticsMutationWithoutTypeError<T>(
  mutationName: string
): (args?: any) => Promise<T> {
  // @ts-ignore - Explicitly ignore the TypeScript error for useMutation
  return useMutation(mutationName);
}
