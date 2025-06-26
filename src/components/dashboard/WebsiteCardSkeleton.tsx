import { Skeleton } from "@/components/ui/skeleton";

export function WebsiteCardSkeleton() {
  return (
    <div className="border rounded-xl overflow-hidden">
      <Skeleton className="h-40 w-full" />
      <div className="p-5 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <div className="flex justify-between">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    </div>
  );
}