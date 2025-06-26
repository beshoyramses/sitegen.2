import {DashboardHeader} from "@/components/dashboard/DashboardHeader";
import "./dashboard.css";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/10 relative overflow-hidden">
        
        <DashboardHeader />
        
        <div className="flex mt-15">
          <DashboardSidebar />
          
          <main className="flex-1 p-6 ml-0 md:ml-[250px] transition-all duration-300">
            <div className="max-w-7xl mx-auto">
               {children}
            </div>
          </main>
        </div>
      </div>
  );
}