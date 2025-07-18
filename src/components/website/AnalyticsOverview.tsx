import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart } from "lucide-react";

export const AnalyticsOverview = () => (
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
);