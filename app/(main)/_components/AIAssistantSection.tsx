"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import React from "react";

const AIAssistantSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
          Try Our AI Property Assistant
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
          Get personalized property recommendations powered by artificial
          intelligence. Chat with our AI assistant to find your perfect home.
        </p>
        <Button
          asChild
          size="lg"
          variant="secondary"
          className="px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          <Link href="/ai-chat" className="flex items-center">
            Start AI Chat
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default AIAssistantSection;
