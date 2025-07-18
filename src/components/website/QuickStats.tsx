import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Activity, BadgePercent } from "lucide-react";

export const QuickStats = () => (
  <Card>
    <CardHeader>
      <CardTitle>Quick Stats</CardTitle>
      <CardDescription>Key performance indicators</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <StatItem label="Bounce Rate" value="32.5%" progress={32.5} />
        <StatItem label="New Visitors" value="68%" progress={68} />
        <StatItem label="Goal Completion" value="42%" progress={42} />
      </div>
      
      <Separator className="my-6" />
      
      <div className="grid grid-cols-2 gap-4">
        <StatBadge 
          icon={<Activity className="h-4 w-4 mr-2 text-primary" />} 
          label="Sessions" 
          value="2,840" 
        />
        <StatBadge 
          icon={<BadgePercent className="h-4 w-4 mr-2 text-primary" />} 
          label="Engagement" 
          value="4.2/5" 
        />
      </div>
    </CardContent>
  </Card>
);

interface StatItemProps {
  label: string;
  value: string;
  progress: number;
}

const StatItem = ({ label, value, progress }: StatItemProps) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
    <Progress value={progress} className="h-2" />
  </div>
);

interface StatBadgeProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const StatBadge = ({ icon, label, value }: StatBadgeProps) => (
  <div className="flex items-center">
    {icon}
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);