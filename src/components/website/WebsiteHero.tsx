import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, RefreshCw } from "lucide-react";

interface WebsiteHeroProps {
  name?: string;
  imageUrl?: string | null;
  description?: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export const WebsiteHero = ({
  name,
  imageUrl,
  description,
  createdAt,
  updatedAt
}: WebsiteHeroProps) => (
  <Card>
    {imageUrl ? (
      <div className="h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
    ) : (
      <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
        <span className="text-white text-4xl font-bold">{name?.charAt(0)}</span>
      </div>
    )}
    
    <CardContent className="p-6">
      <CardTitle className="mb-2">Website Overview</CardTitle>
      <CardDescription className="mb-6">
        {description || "No description available for this website."}
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
);