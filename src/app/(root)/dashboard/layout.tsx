"use client";

import { useState } from "react";
import { MobileSidebar } from "@/components/dashboard/MobileSidebar";
import { DesktopSidebar } from "@/components/dashboard/DesktopSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <div className="flex h-screen bg-background">
      <MobileSidebar 
        isOpen={sidebarOpen} 
        setOpen={setSidebarOpen}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
      
      <DesktopSidebar 
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
      
      <div className="flex flex-1 flex-col lg:pl-72">
        <DashboardHeader 
          setSidebarOpen={setSidebarOpen}
          setActiveItem={setActiveItem}
        />
        
        <main className="flex-1 p-4 lg:p-6 bg-gradient-to-br from-background to-muted/5">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}