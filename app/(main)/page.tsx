import HeroSection from "./_components/HeroSection";
import FeaturedPropertiesSection from "./_components/FeaturedPropertiesSection";
import PropertyCategoriesSection from "./_components/PropertyCategoriesSection";
import StatsSection from "./_components/StatsSection";
import FeaturesSection from "./_components/FeaturesSection";
import TestimonialsSection from "./_components/TestimonialsSection";
import AIAssistantSection from "./_components/AIAssistantSection";
import BlogInsightsSection from "./_components/BlogInsightsSection";
import NewsletterSection from "./_components/NewsletterSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedPropertiesSection />
      <PropertyCategoriesSection />
      <StatsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <AIAssistantSection />
      <BlogInsightsSection />
      <NewsletterSection />
    </div>
  );
}
