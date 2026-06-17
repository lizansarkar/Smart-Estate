"use client";

import Link from "next/link";
import { Building2 } from "lucide-react";
import React from "react";

const PropertyCategoriesSection: React.FC = () => {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-4">
            Property Categories
          </h2>
          <p className="text-lg text-slate-600">
            Find the perfect property type that matches your lifestyle and
            needs.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {[
            {
              name: "Apartments",
              icon: Building2,
              count: "850+",
              href: "/properties?category=apartment",
            },
            {
              name: "Houses",
              icon: Building2,
              count: "620+",
              href: "/properties?category=house",
            },
            {
              name: "Villas",
              icon: Building2,
              count: "180+",
              href: "/properties?category=villa",
            },
            {
              name: "Commercial",
              icon: Building2,
              count: "320+",
              href: "/properties?category=commercial",
            },
            {
              name: "Land",
              icon: Building2,
              count: "150+",
              href: "/properties?category=land",
            },
          ].map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group bg-background rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <category.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                {category.name}
              </h3>
              <p className="text-sm text-slate-600">
                {category.count} listings
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyCategoriesSection;
