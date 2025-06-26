import { Button } from "@/components/ui/button";

export function ErrorDisplay({ error }: { error: string }) {
  return (
    <div className="bg-destructive/10 border border-destructive rounded-xl p-6 text-center">
      <p className="text-destructive">{error}</p>
      <Button 
        variant="outline" 
        className="mt-4"
        onClick={() => window.location.reload()}
      >
        Try Again
      </Button>
    </div>
  );
}