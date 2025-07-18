import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface NavItemProps {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export function NavItem({ href, icon: Icon, children }: NavItemProps) {
  return (
    <Button asChild variant="ghost" className="w-full justify-start">
      <Link href={href}>
        <Icon className="mr-3 h-5 w-5" />
        {children}
      </Link>
    </Button>
  );
}