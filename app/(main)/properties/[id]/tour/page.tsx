"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Property } from "@/types";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { ArrowLeft, Home, Compass, MapPin } from "lucide-react";
import toast from "react-hot-toast";
import Viewer360 from "@/components/property360/Viewer360";

import api from "@/lib/axios";

export default function PropertyTourPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProperty = async () => {
      try {
        setLoading(true);
        const propertyId = params.id as string;
        const response = await api.get(`/properties/${propertyId}`);

        if (response.data.success) {
          setProperty(response.data.data);
          
          // Setup 360 tour scenes based on property ID or category
          // For now, using our property-scenes data map
          const scenes = propertyTours[propertyId];
          if (scenes && scenes.length > 0) {
            setAvailableScenes(scenes);
            setCurrentSceneId(scenes[0].id);
          } else {
            // Fallback to a default scene map if no specific scenes exist
            // Using ID "1" as a fallback for the demo
            const fallbackScenes = propertyTours["1"];
            setAvailableScenes(fallbackScenes);
            setCurrentSceneId(fallbackScenes[0].id);
          }
        } else {
          toast.error("Property not found");
          router.push("/properties");
        }
      } catch (error) {
        toast.error("Error loading property");
        router.push("/properties");
      } finally {
        setLoading(false);
      }
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
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Property Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            The property you are looking for does not exist or has been removed.
          </p>
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
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="rounded-xl text-muted-foreground hover:text-foreground"
            >
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
              <span className="truncate max-w-50">{property.title}</span>
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
              Explore{" "}
              <span className="font-bold text-foreground">
                {property.title}
              </span>{" "}
              room by room in full 360 degree panoramic view.
            </p>
          </div>
        </div>

        {/* Embedded 360 viewer */}
        <div className="w-full h-[65vh] md:h-[75vh] min-h-125">
          <Viewer360 propertyId={property._id} />
        </div>
      </div>
    </div>
  );
}
