"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard,
  Settings,
  CreditCard,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RocketIcon } from "@/components/dashboard/RocketIcon";

export function DesktopSidebar() {
  const pathname = usePathname();
  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Billing", icon: CreditCard, href: "/billing" },
    { name: "Settings", icon: Settings, href: "/settings" },
    { name: "Help", icon: HelpCircle, href: "/help" },
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
            {/* Regular navigation items */}
            {navItems.map((item) => (
              <Button
                key={item.name}
                asChild
                variant="ghost"
                className={`w-full justify-start transition-all duration-300 hover:bg-accent/50 ${
                  pathname === item.href ? "bg-accent text-accent-foreground" : ""
                }`}
              >
                <Link href={item.href} className="group">
                  <item.icon className="mr-3 h-5 w-5" />
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