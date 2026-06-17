"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import React from "react";

const NewsletterSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-4">
          Stay Updated
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter for the latest property listings, market
          insights, and exclusive offers.
        </p>
        <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Enter your email"
            className="flex-1 h-12 rounded-full border-slate-300 dark:border-slate-700"
          />
          <Button className="h-12 px-8 bg-primary text-primary-foreground font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all cursor-pointer whitespace-nowrap">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
