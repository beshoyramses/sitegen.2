import { getWebsiteContent } from "@/lib/actions/website.actions";
import { verifiySession } from "@/lib/session";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { 
  ArrowUpRight, 
  BarChart, 
  Clock, 
  Eye, 
  Globe, 
  Calendar, 
  RefreshCw,
  Percent,
  Settings,
  Download,
  Activity,
  BadgePercent,
  Timer
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const page = async (props: { params: { websiteId: string } }) => { 
  const session = await verifiySession();
  if (!session.userId) redirect("/sign-in");
  const { websiteId } = props.params;
  
  const website = await getWebsiteContent(websiteId);

  if (!website) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Website not found</h1>
          <p className="mt-2 text-muted-foreground">The website with ID {websiteId} could not be found.</p>
        </div>
      </div>
    );
  }

  // Format dates
  const createdAt = format(new Date(website.createdAt), "MMM dd, yyyy");
  const updatedAt = format(new Date(website.updatedAt), "MMM dd, yyyy hh:mm a");

  // Mock data for charts and tables (you would replace with real data)
  const topPages = [
    { page: "/home", visitors: 1250, bounceRate: 32, time: "2m 15s" },
    { page: "/products", visitors: 980, bounceRate: 28, time: "3m 40s" },
    { page: "/about", visitors: 750, bounceRate: 45, time: "1m 50s" },
    { page: "/contact", visitors: 620, bounceRate: 38, time: "2m 05s" },
    { page: "/blog", visitors: 510, bounceRate: 52, time: "4m 20s" },
  ];

  const trafficSources = [
    { source: "Direct", visitors: 1240, percent: 42 },
    { source: "Organic Search", visitors: 980, percent: 33 },
    { source: "Social Media", visitors: 450, percent: 15 },
    { source: "Referral", visitors: 280, percent: 10 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{website.name}</h1>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Overview */}
          <div className="lg:col-span-2">
            {/* Hero Section */}
            <Card>
              {website.imageUrl ? (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={website.imageUrl} 
                    alt={website.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">{website.name.charAt(0)}</span>
                </div>
              )}
              
              <CardContent className="p-6">
                <CardTitle className="mb-2">Website Overview</CardTitle>
                <CardDescription className="mb-6">
                  {website.description || "No description available for this website."}
                </CardDescription>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-primary" />
                    <span>Created: {createdAt}</span>
                  </div>
                  <div className="flex items-center">
                    <RefreshCw className="h-4 w-4 mr-1 text-primary" />
                    <span>Updated: {updatedAt}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{website.views.toLocaleString()}</div>
                  <div className="mt-4 flex items-center text-sm text-green-500">
                    <BarChart className="h-4 w-4 mr-1" />
                    <span>+12.5% from last month</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Time Spent</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{website.averageTimeSpent}s</div>
                  <div className="mt-4 flex items-center text-sm text-yellow-500">
                    <Timer className="h-4 w-4 mr-1" />
                    <span>+8s from last week</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                  <Percent className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{website.conversionRate?.toFixed(1)}%</div>
                  <div className="mt-4">
                    <Progress value={website.conversionRate || 0} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Analytics Charts */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Analytics Overview</CardTitle>
                <CardDescription>Performance trends over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted rounded-lg">
                  <div className="text-center text-muted-foreground">
                    <BarChart className="h-12 w-12 mx-auto mb-2" />
                    <p>Analytics chart visualization</p>
                    <p className="text-sm">(Would show visitor trends and engagement metrics)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Stats & Details */}
          <div>
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Bounce Rate</span>
                      <span className="text-sm font-medium">32.5%</span>
                    </div>
                    <Progress value={32.5} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">New Visitors</span>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Goal Completion</span>
                      <span className="text-sm font-medium">42%</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Activity className="h-4 w-4 mr-2 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Sessions</p>
                      <p className="font-medium">2,840</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <BadgePercent className="h-4 w-4 mr-2 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Engagement</p>
                      <p className="font-medium">4.2/5</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Pages */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
                <CardDescription>Most visited pages</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Page</TableHead>
                      <TableHead className="text-right">Visitors</TableHead>
                      <TableHead className="text-right">Bounce</TableHead>
                      <TableHead className="text-right">Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topPages.map((page, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{page.page}</TableCell>
                        <TableCell className="text-right">{page.visitors.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant={page.bounceRate > 40 ? "destructive" : "secondary"}>
                            {page.bounceRate}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">{page.time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Traffic Sources */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Where visitors come from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trafficSources.map((source, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-32 text-sm text-muted-foreground">{source.source}</div>
                      <div className="flex-1 ml-4">
                        <Progress value={source.percent} className="h-2" />
                      </div>
                      <div className="w-16 text-right text-sm font-medium">{source.percent}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Tabbed Content */}
        <Tabs defaultValue="overview" className="mt-8">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
            <TabsTrigger value="conversions">Conversions</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Performance Metrics</CardTitle>
                <CardDescription>Comprehensive analytics for {website.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 flex items-center justify-center bg-muted rounded-lg">
                  <div className="text-center text-muted-foreground">
                    <BarChart className="h-12 w-12 mx-auto mb-2" />
                    <p>Detailed analytics dashboard</p>
                    <p className="text-sm">(Would show comprehensive metrics and visualizations)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default page