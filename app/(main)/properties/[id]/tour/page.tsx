'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Property } from '@/types';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { ArrowLeft, Home, Compass, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import Viewer360 from '@/components/property360/Viewer360';

// Mock properties (matching property detail page)
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
    createdAt: new Date('2024-01-15').toISOString(),
    status: 'available',
  },
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

export default function PropertyTourPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProperty = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

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

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-10 w-36 rounded-xl" />
            <Skeleton className="h-6 w-48 rounded" />
          </div>
          <Skeleton className="w-full h-[65vh] rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8 bg-card border border-border rounded-2xl max-w-sm shadow-xl">
          <h1 className="text-2xl font-bold text-foreground mb-4">Property Not Found</h1>
          <p className="text-muted-foreground mb-6">The property you are looking for does not exist or has been removed.</p>
          <Button asChild className="w-full rounded-xl">
            <Link href="/properties">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Properties
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header breadcrumb bar */}
      <div className="border-b bg-background/95 backdrop-blur sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" asChild className="rounded-xl text-muted-foreground hover:text-foreground">
              <Link href={`/properties/${property._id}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Details
              </Link>
            </Button>
            <span className="text-slate-600">|</span>
            <div className="flex items-center space-x-1.5 text-sm font-semibold text-muted-foreground">
              <Home className="h-4 w-4" />
              <span>Properties</span>
              <span className="text-slate-600">/</span>
              <span className="truncate max-w-[200px]">{property.title}</span>
              <span className="text-slate-600">/</span>
              <span className="text-cyan-500 flex items-center">
                <Compass className="h-4 w-4 mr-1 animate-spin-slow" />
                360° Virtual Tour
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span>{property.location}</span>
          </div>
        </div>
      </div>

      {/* Main Tour Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold font-playfair text-foreground tracking-tight flex items-center gap-2">
              360° Virtual Walkthrough
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Explore <span className="font-bold text-foreground">{property.title}</span> room by room in full 360 degree panoramic view.
            </p>
          </div>
        </div>

        {/* Embedded 360 viewer */}
        <div className="w-full h-[65vh] md:h-[75vh] min-h-[500px]">
          <Viewer360 propertyId={property._id} />
        </div>
      </div>
    </div>
  );
}
