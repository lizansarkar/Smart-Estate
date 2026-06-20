"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import React from "react";

interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "Top 10 Neighborhoods in Dhaka for Families",
    excerpt:
      "Discover the best family-friendly areas in Dhaka with excellent schools, parks, and community amenities.",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&fit=crop",
    date: "Jan 15, 2024",
    readTime: "5 min read",
  },
  {
    title: "Investment Trends in Bangladesh Real Estate 2024",
    excerpt:
      "Learn about the latest market trends and investment opportunities in the Bangladeshi property market.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop",
    date: "Jan 12, 2024",
    readTime: "7 min read",
  },
  {
    title: "Home Buying Guide: What to Look for in a Property",
    excerpt:
      "Essential checklist for first-time home buyers to ensure you make the right investment decision.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop",
    date: "Jan 10, 2024",
    readTime: "6 min read",
  },
];

const BlogInsightsSection: React.FC = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-4">
            Real Estate Insights
          </h2>
          <p className="text-lg text-muted-foreground">
            Stay informed with the latest trends, tips, and market insights.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="bg-background rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow dark:bg-slate-900 dark:text-white shadow-slate-200 dark:shadow-slate-800"
            >
              <Image
                src={post.image}
                alt={post.title}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                <Button
                  asChild
                  size="sm"
                  variant="default"
                  className="whitespace-nowrap shadow-sm hover:shadow-md"
                >
                  <Link href="/blog">Read More</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            variant="default"
            className="px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            <Link href="/blog" className="flex items-center">
              View All Articles
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogInsightsSection;
