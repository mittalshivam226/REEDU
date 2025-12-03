import ListingDetailClient from './ListingDetailClient';

export async function generateStaticParams() {
  // Since we don't have a backend to fetch listings, return empty array
  // In a real app, you'd fetch all listing IDs from your API
  return [];
}

export default function ListingDetailPage() {
  return <ListingDetailClient />;
}
