import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SourceData {
  source: string;
  visitors: number;
  percent: number;
}

interface TrafficSourcesProps {
  data: SourceData[];
}

export const TrafficSources = ({ data }: TrafficSourcesProps) => (
  <Card className="mt-8">
    <CardHeader>
      <CardTitle>Traffic Sources</CardTitle>
      <CardDescription>Where visitors come from</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {data.map((source, index) => (
          <SourceItem 
            key={index} 
            source={source.source} 
            percent={source.percent} 
          />
        ))}
      </div>
    </CardContent>
  </Card>
);

interface SourceItemProps {
  source: string;
  percent: number;
}

const SourceItem = ({ source, percent }: SourceItemProps) => (
  <div className="flex items-center">
    <div className="w-32 text-sm text-muted-foreground">{source}</div>
    <div className="flex-1 ml-4">
      <Progress value={percent} className="h-2" />
    </div>
    <div className="w-16 text-right text-sm font-medium">{percent}%</div>
  </div>
);  