import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, PieChart, ArrowUpRight, TrendingUp, MousePointerClick, Clock, Eye } from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

const AdminAnalytics = () => {
  // Get projects from Convex to calculate analytics
  const projects = (() => {
    try {
      // @ts-ignore - This is a valid Convex query, but TypeScript doesn't recognize it correctly
      return useQuery(api.projects.getAll) || [];
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  })();
  
  // Placeholder analytics data
  // In a real application, this would come from an analytics API
  const analyticsData = {
    pageViews: 1247,
    uniqueVisitors: 854,
    bounceRate: "39%",
    avgSessionTime: "2m 15s",
    topReferrers: [
      { name: "Google", value: 42 },
      { name: "Direct", value: 28 },
      { name: "LinkedIn", value: 18 },
      { name: "Twitter", value: 12 }
    ],
    popularPages: [
      { name: "Home", views: 523 },
      { name: "Projects", views: 298 },
      { name: "About Us", views: 175 },
      { name: "Contact", views: 251 }
    ],
    deviceBreakdown: [
      { name: "Desktop", value: 64 },
      { name: "Mobile", value: 31 },
      { name: "Tablet", value: 5 }
    ]
  };

  const overviewCards = [
    {
      title: "Page Views",
      value: analyticsData.pageViews,
      change: "+12%",
      icon: <Eye className="h-4 w-4 text-green-500" />
    },
    {
      title: "Unique Visitors",
      value: analyticsData.uniqueVisitors,
      change: "+8%",
      icon: <TrendingUp className="h-4 w-4 text-green-500" />
    },
    {
      title: "Bounce Rate",
      value: analyticsData.bounceRate,
      change: "-3%",
      icon: <ArrowUpRight className="h-4 w-4 text-green-500" />
    },
    {
      title: "Avg. Session",
      value: analyticsData.avgSessionTime,
      change: "+5%",
      icon: <Clock className="h-4 w-4 text-green-500" />
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <div className="text-sm text-muted-foreground">Last updated: Today at {new Date().toLocaleTimeString()}</div>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {overviewCards.map((card) => (
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
                {card.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
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
            <div className="h-[200px] flex items-center justify-center">
              <PieChart className="h-24 w-24 text-muted-foreground opacity-50" />
              <div className="text-center text-sm text-muted-foreground ml-2">
                Pie chart visualization would appear here with actual analytics data
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Popular Pages */}
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Popular Pages</CardTitle>
            <CardDescription>Most viewed pages on your site</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.popularPages.map((page) => (
                <div key={page.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MousePointerClick className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>{page.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{page.views} views</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="h-[200px] flex items-center justify-center">
              <BarChart className="h-24 w-24 text-muted-foreground opacity-50" />
              <div className="text-center text-sm text-muted-foreground ml-2">
                Bar chart visualization would appear here with actual analytics data
              </div>
            </div>
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
          <div className="flex flex-wrap justify-around gap-4">
            {analyticsData.deviceBreakdown.map((device) => (
              <div key={device.name} className="text-center">
                <div className="text-2xl font-bold">{device.value}%</div>
                <div className="text-sm text-muted-foreground">{device.name}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Analytics Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This is a placeholder for your analytics dashboard. In a production environment, you would integrate with:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
              <li>Google Analytics</li>
              <li>Mixpanel</li>
              <li>Hotjar</li>
              <li>Or a custom analytics solution</li>
            </ul>
            <p className="mt-4 text-sm text-primary">
              Configure your analytics settings in the admin settings page.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
