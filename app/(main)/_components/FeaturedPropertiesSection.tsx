"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import PropertyGrid from "@/components/property/PropertyGrid";
import { Property } from "@/types";
import React, { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Skeleton } from "@/components/ui/Skeleton";

const FeaturedPropertiesSection: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await api.get('/properties?limit=4');
        if (response.data.success) {
          setProperties(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

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
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[250px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : properties.length > 0 ? (
          <PropertyGrid properties={properties} />
        ) : (
          <p className="text-center text-muted-foreground">No properties found. Please run the seed script.</p>
        )}

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

