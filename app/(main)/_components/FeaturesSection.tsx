"use client";

import { Shield, Search, Clock, Star, Users, Award } from "lucide-react";
import React from "react";

interface Feature {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Shield,
    title: "Verified Listings",
    description:
      "All properties are thoroughly verified and authenticated before listing.",
  },
  {
    icon: Search,
    title: "AI Smart Search",
    description:
      "Find your perfect property with our intelligent AI-powered search recommendations.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description:
      "Our dedicated support team is available round the clock to assist you.",
  },
  {
    icon: Star,
    title: "Premium Quality",
    description:
      "We only feature high-quality properties that meet our strict standards.",
  },
  {
    icon: Users,
    title: "Expert Agents",
    description:
      "Work with certified real estate professionals who know the market.",
  },
  {
    icon: Award,
    title: "Award Winning",
    description:
      "Recognized as the best real estate platform in Bangladesh for 3 consecutive years.",
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-4">
            Why Choose Smart Estate
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We're committed to providing the best real estate experience with
            cutting-edge technology and personalized service.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 dark:bg-slate-900 dark:text-white shadow-slate-200 dark:shadow-slate-800"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
