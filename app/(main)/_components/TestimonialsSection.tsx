"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import React from "react";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Ahmed",
    role: "Home Buyer",
    content:
      "Found my dream apartment in just 2 weeks! The AI recommendations were spot on.",
    rating: 5,
    avatar:
      "https://static.vecteezy.com/system/resources/thumbnails/027/717/341/small/successful-real-estate-transaction-realtor-and-buyer-shaking-hands-generative-ai-photo.jpg",
  },
  {
    name: "Mohammad Rahman",
    role: "Property Investor",
    content:
      "Excellent platform for investors. The analytics and market insights are invaluable.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Priya Das",
    role: "Real Estate Agent",
    content:
      "The best platform for agents. Easy to list properties and manage clients effectively.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it - hear from our satisfied customers.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl p-6 shadow-md"
            >
              <div className="flex items-center mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                  className="rounded-full mr-3"
                />
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
