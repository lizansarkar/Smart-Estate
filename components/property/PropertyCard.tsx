import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import { Property } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `৳${(price / 10000000).toFixed(1)}Cr`;
    } else if (price >= 100000) {
      return `৳${(price / 100000).toFixed(1)}L`;
    } else {
      return `৳${price.toLocaleString()}`;
    }
  };

  const getCategoryColor = (category: Property["category"]) => {
    const colors = {
      apartment:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      house:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      villa:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      commercial:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      land: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    };
    return colors[category];
  };

  return (
    <div className="h-[380px] w-full rounded-2xl shadow-md bg-background overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-48 w-full">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <Badge className={getCategoryColor(property.category)}>
            {property.category.charAt(0).toUpperCase() +
              property.category.slice(1)}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-white/90 text-foreground">
            {property.status === "available" ? "Available" : "Sold"}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col h-[188px]">
        {/* Title and Rating */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-foreground line-clamp-2 leading-tight">
            {property.title}
          </h3>
          <div className="flex items-center space-x-1 ml-2 flex-shrink-0">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-foreground">
              {property.rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center space-x-1 mb-3">
          <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <span className="text-sm text-muted-foreground line-clamp-1">
            {property.location}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">
          {property.description}
        </p>

        {/* Price and Button */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-primary">
              {formatPrice(property.price)}
            </span>
            {property.area && (
              <span className="text-xs text-muted-foreground">
                {property.area} sqft
              </span>
            )}
          </div>
          {/* <Button asChild size="sm" className="rounded-lg">
            <Link href={`/properties/${property._id}`}>
              Joy bangla
            </Link>
          </Button> */}

          <Button variant="outline" asChild className="w-full">
            <Link href="/login">
              Login
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
