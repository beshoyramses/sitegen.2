import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Eye, Clock, Percent, BarChart, Timer } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: React.ReactNode;
  progress?: number;
}

const MetricCard = ({ title, value, icon, trend, progress }: MetricCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {trend && <div className="mt-4">{trend}</div>}
      {progress !== undefined && (
        <div className="mt-4">
          <Progress value={progress} className="h-2" />
        </div>
      )}
    </CardContent>
  </Card>
);

interface PerformanceMetricsProps {
  views: number;
  averageTimeSpent: number | null;
  conversionRate?: number | null;
}

export const PerformanceMetrics = ({
  views,
  averageTimeSpent,
  conversionRate
}: PerformanceMetricsProps) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
    <MetricCard
      title="Total Views"
      value={views.toLocaleString()}
      icon={<Eye className="h-4 w-4 text-muted-foreground" />}
      trend={
        <div className="flex items-center text-sm text-green-500">
          <BarChart className="h-4 w-4 mr-1" />
          <span>+12.5% from last month</span>
        </div>
      }
    />
    
    <MetricCard
      title="Avg. Time Spent"
      value={`${averageTimeSpent}s`}
      icon={<Clock className="h-4 w-4 text-muted-foreground" />}
      trend={
        <div className="flex items-center text-sm text-yellow-500">
          <Timer className="h-4 w-4 mr-1" />
          <span>+8s from last week</span>
        </div>
      }
    />
    
    <MetricCard
      title="Conversion Rate"
      value={`${conversionRate?.toFixed(1) || 0}%`}
      icon={<Percent className="h-4 w-4 text-muted-foreground" />}
      progress={conversionRate || 0}
    />
  </div>
);