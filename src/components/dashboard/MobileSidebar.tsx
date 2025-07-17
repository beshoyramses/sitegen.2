"use client";

import Link from "next/link";
import { 
  LayoutDashboard,
  Settings,
  CreditCard,
  HelpCircle,
  X,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RocketIcon } from "@/components/dashboard/RocketIcon";
import { UserDropdown } from "@/components/dashboard/UserDropdown";

interface MobileSidebarProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  activeItem: string;
  setActiveItem: (item: string) => void;
}

export function MobileSidebar({ 
  isOpen, 
  setOpen,
  activeItem,
  setActiveItem
}: MobileSidebarProps) {
  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "#", isPrimary: true },
    { name: "New Website", icon: PlusCircle, href: "#" },
    { name: "Billing", icon: CreditCard, href: "#" },
    { name: "Settings", icon: Settings, href: "#" },
    { name: "Help", icon: HelpCircle, href: "#" },
  ];

  return (
    <div className={`fixed inset-0 z-40 lg:hidden ${isOpen ? "block" : "hidden"}`}>
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div className="relative flex w-72 max-w-xs flex-col h-full bg-gradient-to-b from-background to-muted/10 border-r border-border/50 shadow-xl">
        <div className="flex items-center justify-between p-5 border-b border-border/30">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold"
          >
            <RocketIcon className="h-7 w-7 text-primary" />
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Sitegen
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto py-6 px-3">
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
                onClick={() => {
                  setActiveItem(item.name);
                  setOpen(false);
                }}
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
        <div className="p-4 border-t border-border/30">
          <UserDropdown />
        </div>
      </div>
    </div>
  );
}