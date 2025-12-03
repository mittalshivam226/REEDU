'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen, MapPin, DollarSign, Search, Filter } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { listingsApi, Listing } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [condition, setCondition] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const searchQuery = searchParams.get('search') || '';
    setSearch(searchQuery);
    fetchListings(searchQuery);
  }, [searchParams]);

  const fetchListings = async (searchQuery = '') => {
    try {
      setLoading(true);
      const params: any = {};
      if (searchQuery) params.search = searchQuery;
      if (condition) params.condition = condition;
      if (minPrice) params.minPrice = parseFloat(minPrice);
      if (maxPrice) params.maxPrice = parseFloat(maxPrice);

      const response = await listingsApi.getAll(params);
      setListings(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch listings',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchListings(search);
  };

  const handleFilter = () => {
    fetchListings(search);
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'NEW': return 'bg-green-100 text-green-800';
      case 'LIKE_NEW': return 'bg-blue-100 text-blue-800';
      case 'GOOD': return 'bg-yellow-100 text-yellow-800';
      case 'FAIR': return 'bg-orange-100 text-orange-800';
      case 'POOR': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">REEDU</span>
            </Link>
            <nav className="flex space-x-4">
              <Link href="/listings" className="text-blue-600 font-medium">
                Browse Books
              </Link>
              <Link href="/sell" className="text-gray-600 hover:text-gray-900">
                Sell Books
              </Link>
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
                <Input
                  placeholder="Search books by title, author, or ISBN..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>
            <Select value={condition} onValueChange={setCondition}>
              <SelectTrigger className="w-full md:w-48 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Conditions</SelectItem>
                <SelectItem value="NEW">New</SelectItem>
                <SelectItem value="LIKE_NEW">Like New</SelectItem>
                <SelectItem value="GOOD">Good</SelectItem>
                <SelectItem value="FAIR">Fair</SelectItem>
                <SelectItem value="POOR">Poor</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Min Price"
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full md:w-32 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
            />
            <Input
              placeholder="Max Price"
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full md:w-32 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
            />
            <Button onClick={handleFilter} className="hover:scale-105 transition-transform">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </motion.div>

        {/* Listings Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <Skeleton className="h-48 w-full rounded-t-lg" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-3" />
                  <div className="flex gap-2 mb-4">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-14" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No listings found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or check back later.</p>
            <Link href="/sell">
              <Button>Be the first to sell a book</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <Card key={listing.id} className="hover:shadow-lg transition-shadow">
                <div className="aspect-w-3 aspect-h-4 bg-gray-200 rounded-t-lg overflow-hidden">
                  {listing.images.length > 0 ? (
                    <img
                      src={listing.images[0].url}
                      alt={listing.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg line-clamp-2">{listing.title}</CardTitle>
                    <Badge className={getConditionColor(listing.condition)}>
                      {listing.condition.replace('_', ' ')}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center text-lg font-semibold text-green-600">
                    <DollarSign className="h-4 w-4 mr-1" />
                    ${listing.price}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {listing.description || 'No description available'}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {listing.location}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {listing.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {listing.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{listing.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                  <Link href={`/listings/${listing.id}`}>
                    <Button className="w-full">View Details</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
