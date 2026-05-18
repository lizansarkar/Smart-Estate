'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Property } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import {
  ArrowLeft,
  Heart,
  Share2,
  MapPin,
  Calendar,
  Star,
  Bed,
  Bath,
  Square,
  Car,
  Wifi,
  Shield,
  Zap,
  Droplets,
  Flame,
  Phone,
  Mail,
  MessageSquare,
  Eye,
  DollarSign,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';

// Mock data - in a real app, this would come from an API
const mockProperties: Property[] = [
  {
    _id: '1',
    title: 'Modern Downtown Apartment',
    description: 'Beautiful modern apartment in the heart of downtown with stunning city views. Features hardwood floors, stainless steel appliances, and floor-to-ceiling windows. This spacious 2-bedroom unit offers an open-concept living area perfect for entertaining. The master bedroom includes a walk-in closet and en-suite bathroom. Building amenities include a fitness center, rooftop terrace, and 24/7 concierge service.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
    price: 2500,
    rating: 4.8,
    location: 'Downtown',
    category: 'apartment',
    createdBy: 'user1',
    createdAt: new Date('2024-01-15').toISOString(),    status: 'available',  },
  {
    _id: '2',
    title: 'Luxury Villa with Pool',
    description: 'Spacious 4-bedroom villa with private pool, garden, and mountain views. Perfect for families looking for luxury living. This stunning property features high-end finishes throughout, including marble countertops, custom cabinetry, and premium appliances. The outdoor space includes a covered patio, built-in BBQ, and lush landscaping.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    price: 4500,
    rating: 4.9,
    location: 'Mountain View',
    category: 'villa',
    createdBy: 'user2',
    createdAt: new Date('2024-01-20').toISOString(),
    status: 'available',
  },
  {
    _id: '3',
    title: 'Cozy Studio Apartment',
    description: 'Charming studio apartment perfect for young professionals. Walking distance to shops, restaurants, and public transport. This efficient space maximizes every square foot with custom built-in storage and a Murphy bed. The kitchen features modern appliances and quartz countertops.',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    price: 1200,
    rating: 4.5,
    location: 'Midtown',
    category: 'apartment',
    createdBy: 'user3',
    createdAt: new Date('2024-01-25').toISOString(),
    status: 'available',
  },
];

const PropertyDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    const loadProperty = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const propertyId = params.id as string;
      const foundProperty = mockProperties.find(p => p._id === propertyId);

      if (foundProperty) {
        setProperty(foundProperty);
      } else {
        toast.error('Property not found');
        router.push('/properties');
      }

      setLoading(false);
    };

    if (params.id) {
      loadProperty();
    }
  }, [params.id, router]);

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast.success(isFavorited ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property?.title,
        text: property?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  const handleContact = () => {
    toast.success('Contact request sent! We\'ll get back to you soon.');
    setShowContactForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="h-96 w-full mb-6 rounded-lg" />
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-6" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            </div>
            <div>
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
          <Button onClick={() => router.push('/properties')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Properties
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button
                variant={isFavorited ? "default" : "outline"}
                size="sm"
                onClick={handleFavorite}
              >
                <Heart className={`h-4 w-4 mr-2 ${isFavorited ? 'fill-current' : ''}`} />
                {isFavorited ? 'Favorited' : 'Favorite'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Property Image */}
            <div className="mb-6">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Property Info */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold font-playfair text-foreground mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{property.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Listed {new Date(property.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                      <span>{property.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">
                    ${property.price.toLocaleString()}
                  </div>
                  <div className="text-muted-foreground">per month</div>
                </div>
              </div>

              <Badge variant="secondary" className="mb-4">
                {property.category}
              </Badge>

              <p className="text-foreground leading-relaxed mb-6">
                {property.description}
              </p>
            </div>

            {/* Property Features */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Property Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2 p-4 bg-muted rounded-lg">
                  <Bed className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">2 Bedrooms</div>
                    <div className="text-sm text-muted-foreground">Master + Guest</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 p-4 bg-muted rounded-lg">
                  <Bath className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">2 Bathrooms</div>
                    <div className="text-sm text-muted-foreground">Full baths</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 p-4 bg-muted rounded-lg">
                  <Square className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">1,200 sq ft</div>
                    <div className="text-sm text-muted-foreground">Living space</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 p-4 bg-muted rounded-lg">
                  <Car className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">1 Parking</div>
                    <div className="text-sm text-muted-foreground">Covered spot</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { icon: Wifi, name: 'High-Speed WiFi' },
                  { icon: Shield, name: 'Security System' },
                  { icon: Zap, name: 'Electricity Included' },
                  { icon: Droplets, name: 'Water Included' },
                  { icon: Flame, name: 'Heating Included' },
                  { icon: Car, name: 'Parking Included' },
                ].map((amenity) => (
                  <div key={amenity.name} className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Contact Card */}
              <div className="bg-card rounded-lg border p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Interested in this property?</h3>
                <div className="space-y-3 mb-4">
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => setShowContactForm(true)}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Agent
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    <Eye className="h-4 w-4 mr-2" />
                    Schedule Tour
                  </Button>
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  Response time: Usually within 1 hour
                </div>
              </div>

              {/* Property Stats */}
              <div className="bg-card rounded-lg border p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Property Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Views</span>
                    <span className="font-medium">247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Saves</span>
                    <span className="font-medium">23</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Inquiries</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Listed</span>
                    <span className="font-medium">{new Date(property.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Similar Properties */}
              <div className="bg-card rounded-lg border p-6">
                <h3 className="text-lg font-semibold mb-4">Similar Properties</h3>
                <div className="space-y-3">
                  {mockProperties.slice(0, 2).map((similarProperty) => (
                    <Link
                      key={similarProperty._id}
                      href={`/properties/${similarProperty._id}`}
                      className="block p-3 bg-muted rounded-lg hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={similarProperty.image}
                          alt={similarProperty.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm line-clamp-2">
                            {similarProperty.title}
                          </h4>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-primary font-medium">
                              ${similarProperty.price}
                            </span>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                              <span className="text-xs">{similarProperty.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Contact Agent</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Your Message</label>
                <textarea
                  className="w-full p-3 border rounded-lg resize-none"
                  rows={4}
                  placeholder="I'm interested in this property. Please contact me with more details..."
                />
              </div>
              <div className="flex space-x-3">
                <Button onClick={handleContact} className="flex-1">
                  Send Message
                </Button>
                <Button variant="outline" onClick={() => setShowContactForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailPage;