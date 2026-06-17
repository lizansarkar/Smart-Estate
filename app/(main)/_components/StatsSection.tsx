"use client";

import { Award, Building2, Users, MapPin } from "lucide-react";
import { Counter } from "@/components/ui/Counter";
import React from "react";

interface Stat {
  label: string;
  number: number;
  suffix: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const stats: Stat[] = [
  { label: "Properties Listed", number: 2500, suffix: "+", icon: Building2 },
  { label: "Happy Clients", number: 15000, suffix: "+", icon: Users },
  { label: "Cities Covered", number: 25, suffix: "+", icon: MapPin },
  { label: "Years of Experience", number: 10, suffix: "+", icon: Award },
];

const StatsSection: React.FC = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary-foreground/10 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-primary-foreground/20 transition-colors">
                <stat.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <Counter
                number={stat.number}
                suffix={stat.suffix}
                duration={2500}
              />
              <div className="text-sm opacity-90 mt-4">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
