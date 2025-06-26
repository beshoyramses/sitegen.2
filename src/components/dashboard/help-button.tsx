import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

export function HelpButton() {
  return (
    <Button variant="ghost" size="icon" className="rounded-full">
      <HelpCircle className="h-5 w-5" />
    </Button>
  );
}