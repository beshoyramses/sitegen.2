"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  LayoutTemplate , 
  Settings, 
  BarChart, 
  HelpCircle,
  Users,
  FileText
} from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardSidebar() {
  const pathname = usePathname();
  
  const navItems = [
    { 
      name: "Dashboard", 
      href: "/dashboard", 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    { 
      name: "Templates", 
      href: "/dashboard/templates", 
      icon: <LayoutTemplate className="h-5 w-5" /> 
    },
    { 
      name: "Analytics", 
      href: "/dashboard/analytics", 
      icon: <BarChart className="h-5 w-5" /> 
    },
    { 
      name: "Team", 
      href: "/dashboard/team", 
      icon: <Users className="h-5 w-5" /> 
    },
    { 
      name: "Documents", 
      href: "/dashboard/documents", 
      icon: <FileText className="h-5 w-5" /> 
    },
    { 
      name: "Settings", 
      href: "/dashboard/settings", 
      icon: <Settings className="h-5 w-5" /> 
    },
  ];

  return (
    <motion.aside 
      className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-[250px] border-r bg-background z-40 hidden md:block"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-full py-6 px-4">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors group ${
                pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <span className={`mr-3 ${pathname === item.href ? "text-primary" : "text-muted-foreground"}`}>
                {item.icon}
              </span>
              <span>{item.name}</span>
              {item.count && (
                <span className="ml-auto bg-primary text-primary-foreground text-xs font-medium rounded-full w-6 h-6 flex items-center justify-center">
                  {item.count}
                </span>
              )}
            </Link>
          ))}
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <Link 
            href="/dashboard/support" 
            className="flex items-center px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted"
          >
            <HelpCircle className="h-5 w-5 mr-3" />
            <span>Help & Support</span>
          </Link>
        </div>
      </div>
    </motion.aside>
  );
}