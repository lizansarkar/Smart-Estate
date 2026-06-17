"use client";

import React from "react";
import { Award, Users, Building2, Globe, Zap, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function AboutPage() {
  const features = [
    {
      icon: Building2,
      title: "Premium Properties",
      description:
        "Handpicked selection of high-quality properties across Bangladesh",
    },
    {
      icon: Users,
      title: "Expert Team",
      description:
        "Certified professionals with years of real estate experience",
    },
    {
      icon: Globe,
      title: "Wide Coverage",
      description: "Serving clients across 25+ cities and regions",
    },
    {
      icon: Zap,
      title: "Advanced Technology",
      description:
        "AI-powered search and 360° virtual tours for seamless browsing",
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Dedicated support team available 24/7 for your assistance",
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Recognized as Bangladesh's leading real estate platform",
    },
  ];

  const milestones = [
    {
      year: "2014",
      label: "Founded",
      desc: "Started our journey in real estate",
    },
    {
      year: "2017",
      label: "Expansion",
      desc: "Extended to 15+ cities across Bangladesh",
    },
    {
      year: "2020",
      label: "Innovation",
      desc: "Launched AI-powered property search",
    },
    {
      year: "2023",
      label: "360° Tours",
      desc: "Introduced virtual property tours",
    },
  ];

  const stats = [
    { number: "2,500+", label: "Properties Listed" },
    { number: "15,000+", label: "Happy Clients" },
    { number: "25+", label: "Cities Covered" },
    { number: "10+", label: "Years of Excellence" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-primary/10 to-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-playfair text-foreground mb-6">
              About Smart Estate
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Transforming the real estate industry in Bangladesh with
              cutting-edge technology and personalized service
            </p>
            <Button
              asChild
              size="lg"
              className="px-10 py-4 bg-primary text-primary-foreground font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all cursor-pointer"
            >
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold font-playfair mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base opacity-90">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                To revolutionize the real estate market in Bangladesh by
                providing transparent, technology-enabled, and customer-centric
                property solutions that empower individuals to find their
                perfect home or investment opportunity.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that buying, selling, or renting property should be
                simple, trustworthy, and accessible to everyone.
              </p>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-6">
                Our Vision
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                To become the most trusted and innovative real estate platform
                in South Asia, known for exceptional service, transparency, and
                cutting-edge technology solutions.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We envision a future where technology and human expertise
                combine to create the most efficient real estate ecosystem in
                the region.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-4">
              Why Choose Smart Estate?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We stand out from the crowd with our commitment to excellence and
              innovation
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-background rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From humble beginnings to industry leadership
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold font-playfair text-primary mb-2">
                    {milestone.year}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {milestone.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {milestone.desc}
                  </p>
                </div>
                {index < milestones.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-8 h-1 bg-primary/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-6">
            Ready to Find Your Perfect Property?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have trusted Smart Estate
            with their real estate needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <Link href="/properties">Explore Properties</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="px-6 rounded-lg shadow-sm hover:shadow-md"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
