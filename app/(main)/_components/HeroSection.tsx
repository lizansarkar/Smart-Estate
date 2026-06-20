"use client";

import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Hero360 from "@/components/Hero360";
import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Autoplay 360° Panorama Background */}
      <Hero360 />
      {/* Enhanced gradient overlay with blur effect */}
      <div className="absolute inset-0 backdrop-blur-sm" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-6 leading-tight">
          Find Your Dream Property in Bangladesh
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/90">
          Discover apartments, houses, villas, and commercial properties with
          our AI-powered smart search and personalized recommendations.
        </p>

        <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-3xl rounded-[2rem] p-6 md:p-8 shadow-2xl border border-white/20 hover:border-white/30 transition-colors">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-4 items-end">
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
                <Input
                  placeholder="Enter city, area, or landmark"
                  className="pl-10 bg-black/30 dark:bg-black/30 border border-white/30 dark:border-white/30 rounded-md placeholder:text-white dark:placeholder:text-white focus:bg-black transition-colors text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                Property Type
              </label>
              <select className="w-full px-3 py-2 bg-black/30 border border-white/30 rounded-md text-white focus:bg-black transition-color">
                <option value="">All Types</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
                <option value="commercial">Commercial</option>
                <option value="land">Land</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">
                Budget
              </label>
              <select className="w-full px-3 py-2 bg-black/30 border border-white/30 rounded-md text-white focus:bg-black transition-colors">
                <option value="">Any Budget</option>
                <option value="0-500000">Under ৳5L</option>
                <option value="500000-2000000">৳5L - ৳20L</option>
                <option value="2000000-5000000">৳20L - ৳50L</option>
                <option value="5000000+">Above ৳50L</option>
              </select>
            </div>
          </div>
          <div className="mt-4 lg:mt-0 lg:col-span-3 text-center lg:text-right">
            <Button
              size="lg"
              className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 bg-white/90 dark:bg-slate-100 text-primary font-bold text-black sm:text-base rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all border border-white/50 flex items-center justify-center backdrop-blur-md hover:bg-white dark:hover:bg-white cursor-pointer"
            >
              <Search className="h-5 w-5 mr-2" />
              Search Properties
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
