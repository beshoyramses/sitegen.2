"use client";

import { Button } from "@/components/ui/button";
import { Edit, Settings } from "lucide-react";
import { redirect } from "next/navigation";

interface WebsiteHeaderProps {
  name: string;
  websiteId: string;
}

export const WebsiteHeader = ({ name, websiteId }: WebsiteHeaderProps) => (
  <header className="bg-background border-b">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-4 lg:px-8 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{name}</h1>
      </div>    
      <div className="flex space-x-3">
        <Button variant="outline" onClick={() => {redirect(`/dashboard/settings/${websiteId}`)}} className="cursor-pointer">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>

        <Button variant="outline" onClick={() => {redirect(`/editor/${websiteId}`)}} className="cursor-pointer">
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </div>
    </div>
  </header>
);