"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getUserWebsites } from "@/lib/actions/website.actions";
import { UpgradeBanner } from "@/components/dashboard/UpgradeBanner";
import { WebsiteCardSkeleton } from "@/components/dashboard/WebsiteCardSkeleton";
import { ErrorDisplay } from "@/components/dashboard/ErrorDisplay";
import { EmptyWebsites } from "@/components/dashboard/EmptyWebsites";
import { WebsiteCard } from "@/components/dashboard/WebsiteCard";

export default function DashboardPage() {
  const [websites, setWebsites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        setLoading(true);
        const result = await getUserWebsites();
        
        if (result.success && result.data) {
          setWebsites(mapWebsiteData(result.data));
        } else {
          setError(result.message || "Failed to load websites");
        }
      } catch (err) {
        setError("An unexpected error occurred");
        console.error("Failed to fetch websites:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWebsites();
  }, []);

  const mapWebsiteData = (data: any[]) => {
    return data.map(website => ({
      id: website.id,
      name: website.name,
      domain: website.domain,
      status: "published",
      updatedAt: website.updatedAt,
      visitors: "0",
      template: "Custom"
    }));
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  return (
    <div className="space-y-8">      
      <WebsiteGrid websites={websites} />
      
      <UpgradeBanner />
    </div>
  );
}

// Sub-components
function LoadingState() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(5)].map((_, i) => (
          <WebsiteCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

function ErrorState({ error }: { error: string }) {
  return (
    <div className="space-y-8">
      <ErrorDisplay error={error} />
    </div>
  );
}

function WebsiteGrid({ websites }: { websites: any[] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-background border rounded-2xl shadow-sm overflow-hidden"
    >
      {websites.length === 0 ? (
        <EmptyWebsites />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {websites.map((website, index) => (
              <WebsiteCard 
                key={website.id} 
                website={website} 
                index={index} 
              />
            ))}
          </div>
          
          <div className="border-t px-6 py-4 flex justify-center">
            <Button variant="outline">
              Load More Websites
            </Button>
          </div>
        </>
      )}
    </motion.div>
  );
}