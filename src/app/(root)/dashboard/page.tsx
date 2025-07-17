import { WebsitesGrid } from "@/components/dashboard/WebsitesGrid";
import { getWebsites } from "@/lib/actions/website.actions";
import { verifiySession } from "@/lib/session";
import { redirect } from "next/navigation";

const page = async () => {
  const websites = await getWebsites();
  const session = await verifiySession();
  if (!session.userId) redirect("/sign-in");

  if (!websites || websites.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">
          No websites found. Create a new website to get started.
        </p>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">My Websites</h1>
      <WebsitesGrid websites={websites} />
    </div>
  );
};

export default page;
