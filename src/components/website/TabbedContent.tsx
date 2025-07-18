import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart } from "lucide-react";

export const TabbedContent = () => (
  <Tabs defaultValue="overview" className="mt-8">
    <TabsList>
      <TabsTrigger value="overview">Overview</TabsTrigger>
      <TabsTrigger value="analytics">Analytics</TabsTrigger>
      <TabsTrigger value="audience">Audience</TabsTrigger>
      <TabsTrigger value="conversions">Conversions</TabsTrigger>
    </TabsList>
    <TabsContent value="overview" className="mt-6">
      <AnalyticsDetailCard />
    </TabsContent>
  </Tabs>
);

const AnalyticsDetailCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Detailed Performance Metrics</CardTitle>
      <CardDescription>Comprehensive analytics for your website</CardDescription>
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
);