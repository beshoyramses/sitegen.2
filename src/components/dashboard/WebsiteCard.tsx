import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  Settings, 
  BarChart, 
  MoreVertical,
  ExternalLink,
  LayoutTemplate
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";
import { formatRelativeTime } from "@/lib/utils";
import { redirect } from "next/navigation";

export function WebsiteCard({ 
  website, 
  index 
}: { 
  website: any; 
  index: number;
}) {
  const statusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-green-500";
      case "draft": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const handleClick = () => {
    redirect("/dashboard/website/asdasdadad")
  }

  return (
    <motion.div
      className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative" onClick={handleClick}>
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 h-40 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 w-24 h-24 rounded-lg shadow-md flex items-center justify-center">
            <Globe className="h-10 w-10 text-primary" />
          </div>
        </div>
        
        <div className="absolute top-4 right-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BarChart className="mr-2 h-4 w-4" />
                <span>Analytics</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">
                <span className="mr-2">🗑️</span>
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="absolute bottom-4 left-4 flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${statusColor(website.status)}`}></div>
          <span className="text-xs font-medium capitalize">{website.status}</span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg mb-1">{website.name}</h3>
            <p className="text-muted-foreground text-sm mb-3">{website.domain}</p>
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full"
            asChild
          >
            <a href={`https://${website.domain}`} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="text-xs text-muted-foreground">Updated</p>
            <p className="text-sm font-medium">{formatRelativeTime(website.updatedAt)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Visitors</p>
            <p className="text-sm font-medium">{website.visitors}</p>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <p className="text-xs text-muted-foreground">Template</p>
          <div className="flex items-center">
            <div className="bg-muted p-1.5 rounded-lg mr-2">
              <LayoutTemplate className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium">{website.template}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}