import { Website } from '@/types';
import { WebsiteCard } from './WebsiteCard';

interface WebsitesGridProps {
  websites: Website[];
}

export const WebsitesGrid = ({ websites }: WebsitesGridProps) => {
  if (websites.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No websites found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {websites.map((website) => (
        <WebsiteCard key={website.id} website={website} />
      ))}
    </div>
  );
};