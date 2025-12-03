'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, MapPin, DollarSign, User, Calendar, Tag } from 'lucide-react';
import { listingsApi, Listing } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export default function ListingDetailPage() {
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchListing = async () => {
      if (!params.id) return;

      try {
        setLoading(true);
        const response = await listingsApi.getById(params.id as string);
        setListing(response.data);
      } catch (error: any) {
        toast({
          title: 'Error',
          description: 'Failed to load listing details',
          variant: 'destructive',
        });
        router.push('/listings');
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.id, router, toast]);

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading listing...</p>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">Listing not found</h2>
          <Link href="/listings">
            <Button>Back to Listings</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">REEDU</span>
            </Link>
            <nav className="flex space-x-4">
              <Link href="/listings" className="text-gray-600 hover:text-gray-900">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images Section */}
          <div className="space-y-4">
            <div className="aspect-w-3 aspect-h-4 bg-gray-200 rounded-lg overflow-hidden">
              {listing.images.length > 0 ? (
                <img
                  src={listing.images[currentImageIndex].url}
                  alt={listing.title}
                  className="w-full h-96 object-cover"
                />
              ) : (
                <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                  <BookOpen className="h-24 w-24 text-gray-400" />
                </div>
              )}
            </div>
            {listing.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {listing.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{listing.title}</h1>
                <Badge className={getConditionColor(listing.condition)}>
                  {listing.condition.replace('_', ' ')}
                </Badge>
              </div>
              <div className="flex items-center text-3xl font-bold text-green-600 mb-4">
                <DollarSign className="h-8 w-8 mr-2" />
                ${listing.price}
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                {listing.location}
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Seller Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{listing.user.name}</p>
                <p className="text-sm text-gray-600">Member since {formatDate(listing.user.createdAt)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Book Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {listing.edition && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Edition:</span>
                    <span>{listing.edition}</span>
                  </div>
                )}
                {listing.isbn && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">ISBN:</span>
                    <span>{listing.isbn}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Condition:</span>
                  <span>{listing.condition.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Listed:</span>
                  <span>{formatDate(listing.createdAt)}</span>
                </div>
              </CardContent>
            </Card>

            {listing.tags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Tag className="h-5 w-5 mr-2" />
                    Tags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {listing.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              <Button className="w-full text-lg py-3">
                Contact Seller
              </Button>
              <Link href="/listings">
                <Button variant="outline" className="w-full">
                  Back to Listings
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Description Section */}
        {listing.description && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap">{listing.description}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
