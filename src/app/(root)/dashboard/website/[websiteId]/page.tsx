import { getWebsiteContent } from "@/lib/actions/website.actions";
import { verifiySession } from "@/lib/session";
import { redirect } from "next/navigation";
import { format } from "date-fns";

import { WebsiteHeader } from "@/components/website/WebsiteHeader";
import { WebsiteHero } from "@/components/website/WebsiteHero";
import { PerformanceMetrics } from "@/components/website/PerformanceMetrics";
import { AnalyticsOverview } from "@/components/website/AnalyticsOverview";
import { QuickStats } from "@/components/website/QuickStats";
import { TopPagesTable } from "@/components/website/TopPagesTable";
import { TrafficSources } from "@/components/website/TrafficSources";
import { TabbedContent } from "@/components/website/TabbedContent";

const page = async (props: { params: { websiteId: string } }) => { 
  const session = await verifiySession();
  if (!session.userId) redirect("/sign-in");
  const { websiteId } = await props.params;
  
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

  // Mock data for charts and tables
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
      <WebsiteHeader name={website.name} websiteId={websiteId}/>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Overview */}
          <div className="lg:col-span-2">
            <WebsiteHero
              name={website.name}
              imageUrl={website.imageUrl}
              description={website.description}
              createdAt={createdAt}
              updatedAt={updatedAt}
            />
            
            <PerformanceMetrics
              views={website.views}
              averageTimeSpent={website.averageTimeSpent}
              conversionRate={website.conversionRate}
            />
            
            <AnalyticsOverview />
          </div>

          {/* Right Column - Stats & Details */}
          <div>
            <QuickStats />
            <TopPagesTable data={topPages} />
            <TrafficSources data={trafficSources} />
          </div>
        </div>
        
        <TabbedContent />
      </main>
    </div>
  )
}

export default page;