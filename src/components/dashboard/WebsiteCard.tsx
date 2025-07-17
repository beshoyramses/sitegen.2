"use client";

import { format, set } from "date-fns";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreVertical } from "lucide-react";
import { redirect } from "next/navigation";
import { deleteWebsite } from "@/lib/actions/website.actions";
import { useState } from "react";
import { toast } from "sonner";

interface WebsiteCardProps {
  website: {
    id: string;
    name: string;
    domain: string;
    description: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const WebsiteCard = ({ website }: WebsiteCardProps) => {
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
   redirect(`/dashboard/website/${website.id}`);
  };

  const handleWebsiteDelete = async () => {
    try {
      setLoading(true);
      await deleteWebsite(website.id);
      setLoading(false);
      toast("Website deleted successfully")
    } catch (error) {
      toast.error("Failed to delete website");
      setLoading(false);
    }
  }

  return (
    <Card
      className="h-full overflow-hidden transition-all hover:shadow-md cursor-pointer"
    >
      <CardHeader className="p-0 border-b relative">
        {website.imageUrl ? (
          <div className="relative h-40 w-full">
            <Image
              src={website.imageUrl}
              alt={website.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </div>
        ) : (
          <div className="bg-muted h-40 flex items-center justify-center">
            <span className="text-muted-foreground">No Image</span>
          </div>
        )}

        <div className="absolute top-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-8 h-8 bg-background/80 backdrop-blur-sm"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleWebsiteDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <h3 className="font-semibold truncate" onClick={handleClick}>{website.name}</h3>
        <p className="text-sm text-muted-foreground truncate" >
          {website.domain}
        </p>
        <p className="mt-2 text-sm line-clamp-2">{website.description}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0 text-xs text-muted-foreground flex justify-between">
        <span>
          Created: {format(new Date(website.createdAt), "MMM dd, yyyy")}
        </span>
        <span>
          Updated: {format(new Date(website.updatedAt), "MMM dd, yyyy")}
        </span>
      </CardFooter>
    </Card>
  );
};
