import { ThemeProvider } from "next-themes";
import "./auth.css";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="h-screen bg-gradient-to-br from-background to-muted/20 relative overflow-hidden flex items-center justify-center">
        {/* Floating Background Elements */}
        <div className="auth-bg">
          <div className="blob bg-primary/10 top-[10%] left-[10%] w-64 h-64"></div>
          <div className="blob bg-secondary/10 top-[60%] left-[70%] w-72 h-72"></div>
          <div className="blob bg-blue-400/10 top-[30%] left-[40%] w-56 h-56"></div>
          <div className="blob bg-purple-400/10 top-[70%] left-[20%] w-60 h-60"></div>
        </div>
        
        <div className="container py-12 md:py-24 relative z-10">
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
}