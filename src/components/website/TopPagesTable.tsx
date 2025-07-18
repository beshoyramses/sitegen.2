import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface PageData {
  page: string;
  visitors: number;
  bounceRate: number;
  time: string;
}

interface TopPagesTableProps {
  data: PageData[];
}

export const TopPagesTable = ({ data }: TopPagesTableProps) => (
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
          {data.map((page, index) => (
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
);