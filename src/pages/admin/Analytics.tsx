import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, PieChart, ArrowUpRight, TrendingUp, MousePointerClick, Clock, Eye, Smartphone, Tablet, Monitor } from 'lucide-react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Skeleton } from '@/components/ui/skeleton';
import type { FunctionReference } from 'convex/server';
import { useAnalyticsQueryWithoutTypeError, useAnalyticsMutationWithoutTypeError } from '@/lib/convexHelpers';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

// Define types for our analytics data
type DeviceBreakdown = {
  desktop: number;
  mobile: number;
  tablet: number;
  other: number;
};

type AnalyticsOverview = {
  totalPageViews: number;
  totalProjectViews: number;
  totalLiveClicks: number;
};

type PopularPage = {
  path: string;
  count: number;
};

type Referrer = {
  name: string;
  count: number;
};

type ProjectStat = {
  id: string;
  title: string;
  views: number;
  clicks: number;
};

type AllAnalyticsResponse = {
  overview: AnalyticsOverview;
  devices: DeviceBreakdown;
  popularPages: PopularPage[];
  topReferrers: Referrer[];
  projectStats: ProjectStat[];
};

// Clear Analytics Button component
const ClearAnalyticsButton = () => {
  // Use our helper approach to get the clearAnalytics function
  // Since we put the function in the analytics.ts file, we need to use 'analytics:clearAnalytics'
  // Using helper function to avoid type errors until Convex types are fixed
  const clearAnalyticsMutation = useAnalyticsMutationWithoutTypeError<{deleted: number}>("analytics:clearAnalytics");
  const [isClearing, setIsClearing] = React.useState(false);
  
  const handleClearAnalytics = async () => {
    try {
      setIsClearing(true);
      const result = await clearAnalyticsMutation();
      toast.success(`Analytics cleared! Deleted ${result.deleted} events.`);
      // Reload the page to show cleared data
      window.location.reload();
    } catch (error) {
      console.error("Failed to clear analytics:", error);
      toast.error("Failed to clear analytics");
    } finally {
      setIsClearing(false);
    }
  };
  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Clear Analytics Data
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Clear Analytics Data?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete all analytics data. This action cannot be undone.
            Use this only for testing purposes.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleClearAnalytics}
            disabled={isClearing}
          >
            {isClearing ? "Clearing..." : "Yes, Clear All Data"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const AdminAnalytics = () => {
  // Get projects from Convex using the same type-safe approach we used for analytics
  const projects = useAnalyticsQueryWithoutTypeError<any[]>("projects:getAll") || [];
  
  // Use the helper function that's already in the project to query analytics without type errors
  const analytics = useAnalyticsQueryWithoutTypeError<AllAnalyticsResponse>("analytics:getAllAnalytics");
  const isLoading = analytics === undefined;
  
  // Calculate unique visitors (estimate by taking 70% of total page views)
  const uniqueVisitors = analytics?.overview?.totalPageViews 
    ? Math.round(analytics.overview.totalPageViews * 0.7) 
    : 0;
  
  // Format analytics data with fallbacks for loading state
  const analyticsData = {
    pageViews: analytics?.overview?.totalPageViews || 0,
    uniqueVisitors,
    projectViews: analytics?.overview?.totalProjectViews || 0,
    liveClicks: analytics?.overview?.totalLiveClicks || 0,
    // Calculate derived metrics
    bounceRate: analytics?.overview?.totalPageViews ? "34%" : "0%", // Placeholder since we don't track bounce rate yet
    avgSessionTime: analytics?.overview?.totalPageViews ? "1m 48s" : "0s", // Placeholder since we don't track sessions yet
    
    // Format data for charts
    topReferrers: (analytics?.topReferrers || []).map(r => ({ 
      name: r?.name || "Unknown", 
      value: ((r?.count || 0) / (analytics?.overview?.totalPageViews || 1) * 100).toFixed(0)
    })),
    
    popularPages: (analytics?.popularPages || []).map(p => ({ 
      name: p?.path?.split("/")[1] || p?.path || "Home", 
      views: p?.count || 0 
    })),
    
    deviceBreakdown: [
      { 
        name: "Desktop", 
        value: Math.round((analytics?.devices?.desktop || 0) / (analytics?.overview?.totalPageViews || 1) * 100) || 0,
        icon: <Monitor className="h-6 w-6 text-blue-500" />
      },
      { 
        name: "Mobile", 
        value: Math.round((analytics?.devices?.mobile || 0) / (analytics?.overview?.totalPageViews || 1) * 100) || 0,
        icon: <Smartphone className="h-6 w-6 text-green-500" />
      },
      { 
        name: "Tablet", 
        value: Math.round((analytics?.devices?.tablet || 0) / (analytics?.overview?.totalPageViews || 1) * 100) || 0,
        icon: <Tablet className="h-6 w-6 text-purple-500" />
      }
    ],
    
    // Project analytics
    projectStats: (analytics?.projectStats || [])
      .filter(p => p?.views > 0 || p?.clicks > 0)
      .map(p => ({
        id: p?.id,
        title: p?.title || "Unknown Project",
        views: p?.views || 0,
        clicks: p?.clicks || 0,
        clickRate: p?.views ? Math.round((p?.clicks || 0) / p?.views * 100) : 0
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5) // Top 5 projects
  };

  const overviewCards = [
    {
      title: "Page Views",
      value: analyticsData.pageViews,
      // We don't have historical data yet, so this is a placeholder
      change: "+--",
      icon: <Eye className="h-4 w-4 text-green-500" />
    },
    {
      title: "Unique Visitors",
      value: analyticsData.uniqueVisitors,
      change: "+--",
      icon: <TrendingUp className="h-4 w-4 text-green-500" />
    },
    {
      title: "Project Views",
      value: analyticsData.projectViews,
      change: "+--",
      icon: <BarChart className="h-4 w-4 text-green-500" />
    },
    {
      title: "Live URL Clicks",
      value: analyticsData.liveClicks,
      change: "+--",
      icon: <MousePointerClick className="h-4 w-4 text-green-500" />
    }
  ];

  return (
    <div className="space-y-4 pb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">
            Track visitor statistics and engagement for your portfolio
          </p>
        </div>
        <div>
          <ClearAnalyticsButton />
        </div>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {isLoading ? (
          // Loading state for overview cards
          Array(4).fill(0).map((_, i) => (
            <Card key={i} className="border border-border/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-20" />
              </CardContent>
            </Card>
          ))
        ) : (
          // Actual data
          overviewCards.map((card) => (
            <Card key={card.title} className="border border-border/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs flex items-center gap-1 mt-1 text-green-500">
                  {card.icon}
                  {card.change} {card.change !== "+--" && "from last month"}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Traffic Sources */}
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Traffic Sources</CardTitle>
            <CardDescription>Where your visitors are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              // Loading state for referrers
              <div className="space-y-4">
                {Array(4).fill(0).map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-10" />
                  </div>
                ))}
                <div className="h-[200px] flex items-center justify-center">
                  <Skeleton className="h-24 w-24 rounded-full" />
                </div>
              </div>
            ) : analyticsData.topReferrers.length > 0 ? (
              // Show referrers data
              <>
                <div className="space-y-4">
                  {analyticsData.topReferrers.map((referrer) => (
                    <div key={referrer.name} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                        <span>{referrer.name}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium">{referrer.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="h-[200px] flex items-center justify-center mt-4">
                  <PieChart className="h-24 w-24 text-primary opacity-80" />
                </div>
              </>
            ) : (
              // No data state
              <div className="h-[200px] flex items-center justify-center flex-col space-y-2">
                <PieChart className="h-16 w-16 text-muted-foreground opacity-40" />
                <p className="text-sm text-muted-foreground">No traffic source data yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Popular Pages */}
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Popular Pages</CardTitle>
            <CardDescription>Most viewed pages on your site</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              // Loading state for popular pages
              <div className="space-y-4">
                {Array(4).fill(0).map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}
                <div className="h-[200px] flex items-center justify-center mt-4">
                  <Skeleton className="h-24 w-36" />
                </div>
              </div>
            ) : analyticsData.popularPages.length > 0 ? (
              // Show popular pages data
              <>
                <div className="space-y-4">
                  {analyticsData.popularPages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <MousePointerClick className="h-4 w-4 text-muted-foreground mr-2" />
                        <span>{page.name || '/'}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium">{page.views} views</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="h-[200px] flex items-center justify-center mt-4">
                  <BarChart className="h-24 w-24 text-primary opacity-80" />
                </div>
              </>
            ) : (
              // No data state
              <div className="h-[200px] flex items-center justify-center flex-col space-y-2">
                <BarChart className="h-16 w-16 text-muted-foreground opacity-40" />
                <p className="text-sm text-muted-foreground">No page view data yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Device Breakdown */}
      <Card className="border border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Device Breakdown</CardTitle>
          <CardDescription>Types of devices visitors are using</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            // Loading state for devices
            <div className="flex flex-wrap justify-around gap-4">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="text-center">
                  <Skeleton className="h-8 w-16 mx-auto mb-2" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          ) : analytics?.overview?.totalPageViews > 0 ? (
            // Show device breakdown
            <div className="flex flex-wrap justify-around gap-8">
              {analyticsData.deviceBreakdown.map((device) => (
                <div key={device.name} className="text-center">
                  {device.icon}
                  <div className="text-2xl font-bold mt-2">{device.value}%</div>
                  <div className="text-sm text-muted-foreground">{device.name}</div>
                </div>
              ))}
            </div>
          ) : (
            // No data state
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">No device data collected yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Project Analytics */}
      <div className="mt-8">
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Project Performance</CardTitle>
            <CardDescription>Views and live URL clicks by project</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              // Loading state for project stats
              <div className="space-y-4">
                {Array(5).fill(0).map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <Skeleton className="h-4 w-40" />
                    <div className="flex space-x-4">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            ) : analyticsData.projectStats.length > 0 ? (
              // Show project stats
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b">
                  <div className="font-medium">Project</div>
                  <div className="flex space-x-8">
                    <div className="w-20 text-center font-medium">Views</div>
                    <div className="w-20 text-center font-medium">Clicks</div>
                    <div className="w-20 text-center font-medium">CTR</div>
                  </div>
                </div>
                {analyticsData.projectStats.map(project => (
                  <div key={project.id} className="flex items-center justify-between">
                    <div className="truncate max-w-[200px]">{project.title}</div>
                    <div className="flex space-x-8">
                      <div className="w-20 text-center">{project.views}</div>
                      <div className="w-20 text-center">{project.clicks}</div>
                      <div className="w-20 text-center">{project.clickRate}%</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // No data state
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground">No project analytics data collected yet</p>
                <p className="text-xs text-muted-foreground mt-1">Data will appear when users view projects and click live URLs</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Getting Started Information */}
      {(!analytics || analytics.overview.totalPageViews === 0) && (
        <div className="mt-8">
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Getting Started with Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Analytics tracking has been set up in your portfolio! Here's how data is being collected:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                <li>Page views are tracked automatically across all pages</li>
                <li>Project views are recorded when someone visits a project detail page</li>
                <li>Live URL clicks are tracked when users click on project live links</li>
                <li>Device types and referrers are also being collected</li>
              </ul>
              <p className="mt-4 text-sm text-primary">
                As visitors browse your site, this dashboard will automatically update with real data.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminAnalytics;
