"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import PropertyGrid from "@/components/property/PropertyGrid";
import { Property } from "@/types";
import React from "react";

const mockProperties: Property[] = [
  {
    _id: "1",
    title: "Luxury Apartment in Gulshan",
    description:
      "Modern 3-bedroom apartment with stunning city views, premium finishes, and world-class amenities.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
    price: 2500000,
    rating: 4.8,
    location: "Gulshan, Dhaka",
    category: "apartment",
    createdBy: "admin",
    createdAt: "2024-01-15T00:00:00Z",
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    status: "available",
  },
  {
    _id: "2",
    title: "Spacious Family House in Dhanmondi",
    description:
      "Beautiful detached house perfect for families, with garden, garage, and quiet neighborhood.",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
    price: 4500000,
    rating: 4.6,
    location: "Dhanmondi, Dhaka",
    category: "house",
    createdBy: "admin",
    createdAt: "2024-01-10T00:00:00Z",
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    status: "available",
  },
  {
    _id: "3",
    title: "Elegant Villa in Baridhara",
    description:
      "Luxurious villa with private pool, modern design, and premium location in exclusive neighborhood.",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&h=300&fit=crop",
    price: 8500000,
    rating: 4.9,
    location: "Baridhara, Dhaka",
    category: "villa",
    createdBy: "admin",
    createdAt: "2024-01-12T00:00:00Z",
    bedrooms: 5,
    bathrooms: 4,
    area: 3500,
    status: "available",
  },
  {
    _id: "4",
    title: "Commercial Space in Motijheel",
    description:
      "Prime commercial property in the heart of the business district, perfect for office or retail.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
    price: 12000000,
    rating: 4.4,
    location: "Motijheel, Dhaka",
    category: "commercial",
    createdBy: "admin",
    createdAt: "2024-01-08T00:00:00Z",
    area: 5000,
    status: "available",
  },
];

const FeaturedPropertiesSection: React.FC = () => {
  return (
    <section className="py-16 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-4">
            Featured Properties
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties across
            Bangladesh's most desirable locations.
          </p>
        </div>
        <PropertyGrid properties={mockProperties} />
        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            variant="default"
            className="px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            <Link href="/properties" className="flex items-center">
              View All Properties
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPropertiesSection;
