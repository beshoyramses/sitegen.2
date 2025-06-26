import { Globe } from "lucide-react";

export function EmptyWebsites() {
  return (
    <div className="p-12 text-center">
      <div className="mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 w-24 h-24 rounded-full flex items-center justify-center mb-6">
        <Globe className="h-12 w-12 text-primary" />
      </div>
      <h3 className="text-xl font-bold mb-2">No websites yet</h3>
      <p className="text-muted-foreground mb-6">
        Create your first website to get started
      </p>
    </div>
  );
}