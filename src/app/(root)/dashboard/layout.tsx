import { DesktopSidebar } from "@/components/dashboard/DesktopSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex h-screen bg-background">
      
      <DesktopSidebar />
      
      <div className="flex flex-1 flex-col lg:pl-72">
        <DashboardHeader />
        
        <main className="flex-1 p-4 lg:p-6 bg-gradient-to-br from-background to-muted/5">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}