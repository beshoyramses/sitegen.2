"use client";

import Link from "next/link";
import { 
  LayoutDashboard,
  Settings,
  CreditCard,
  HelpCircle,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RocketIcon } from "@/components/dashboard/RocketIcon";

interface DesktopSidebarProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
}

export function DesktopSidebar({ 
  activeItem,
  setActiveItem
}: DesktopSidebarProps) {
  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "#",},
    { name: "New Website", icon: PlusCircle, href: "#" },
    { name: "Billing", icon: CreditCard, href: "#" },
    { name: "Settings", icon: Settings, href: "#" },
    { name: "Help", icon: HelpCircle, href: "#" },
  ];

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-72 lg:border-r lg:border-border/50 lg:pb-4 bg-gradient-to-b from-background to-muted/5 shadow-xl">
      <div className="flex h-full flex-col">
        <div className="px-6 py-6 border-b border-border/30">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold"
          >
            <RocketIcon className="h-7 w-7 text-primary" />
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Sitegen
            </span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.name}
                asChild
                variant={item.isPrimary ? "default" : "ghost"}
                className={`w-full justify-start transition-all duration-300 ${
                  item.isPrimary
                    ? "shadow-lg hover:shadow-primary/30"
                    : "hover:bg-accent/50"
                } ${
                  activeItem === item.name
                    ? "bg-accent text-accent-foreground"
                    : ""
                }`}
                onClick={() => setActiveItem(item.name)}
              >
                <Link href={item.href} className="group">
                  <item.icon
                    className={`mr-3 h-5 w-5 transition-transform ${
                      item.isPrimary ? "group-hover:scale-110" : ""
                    }`}
                  />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </Button>
            ))}
          </nav>
        </div>  
      </div>
    </div>
  );
}