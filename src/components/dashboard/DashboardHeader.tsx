// components/dashboard/DashboardHeader.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, PlusCircle } from "lucide-react";
import { UserDropdown } from "@/components/dashboard/UserDropdown";
import { ThemeToggle } from "@/components/dashboard/ThemeToggle";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AddWebsiteForm } from "@/components/dashboard/AddWebsiteForm";

interface DashboardHeaderProps {
  setSidebarOpen: (open: boolean) => void;
  setActiveItem: (item: string) => void;
}

export function DashboardHeader({ 
  setSidebarOpen,
  setActiveItem
}: DashboardHeaderProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateWebsite = () => {
    setActiveItem("New Website");
    setIsDialogOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-40 flex min-h-19 items-center gap-4 border-b border-border/30 bg-background/95 px-4 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 lg:px-6">
        <Button
          variant="outline"
          size="icon"
          className="lg:hidden border-border/50 text-muted-foreground hover:text-foreground"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>

        {/* Mobile "New Website" button */}
        <Button
          variant="default"
          className="ml-2 lg:hidden shadow-lg hover:shadow-primary/30"
          onClick={handleCreateWebsite}
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          New Website
        </Button>

        <div className="flex flex-1 justify-end items-center gap-3">
          <ThemeToggle />
          
          {/* Desktop "New Website" button */}
          <div className="hidden lg:block">
            <Button
              variant="default"
              className="shadow-lg hover:shadow-primary/30"
              onClick={handleCreateWebsite}
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              New Website
            </Button>
          </div>

          <UserDropdown />
        </div>
      </header>

      {/* Add Website Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Create New Website
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <AddWebsiteForm 
              onSuccess={() => setIsDialogOpen(false)}
              onCancel={() => setIsDialogOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}