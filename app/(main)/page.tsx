import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Star,
  Users,
  Building2,
  Award,
  Shield,
  Clock,
  Search,
  MapPin,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import PropertyGrid from "@/components/property/PropertyGrid";
import Hero360 from "@/components/Hero360";
import { Property } from "@/types";

const mockProperties: Property[] = [
  {
    _id: "1",
    title: "Luxury Apartment in Gulshan",
    description:
      "Modern 3-bedroom apartment with stunning city views, premium finishes, and world-class amenities.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
    price: 2500000,
    rating: 4.8,
    location: "Gulshan, Dhaka",
    category: "apartment",
    createdBy: "admin",
    createdAt: "2024-01-15T00:00:00Z",
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    status: "available",
  },
  {
    _id: "2",
    title: "Spacious Family House in Dhanmondi",
    description:
      "Beautiful detached house perfect for families, with garden, garage, and quiet neighborhood.",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
    price: 4500000,
    rating: 4.6,
    location: "Dhanmondi, Dhaka",
    category: "house",
    createdBy: "admin",
    createdAt: "2024-01-10T00:00:00Z",
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    status: "available",
  },
  {
    _id: "3",
    title: "Elegant Villa in Baridhara",
    description:
      "Luxurious villa with private pool, modern design, and premium location in exclusive neighborhood.",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&h=300&fit=crop",
    price: 8500000,
    rating: 4.9,
    location: "Baridhara, Dhaka",
    category: "villa",
    createdBy: "admin",
    createdAt: "2024-01-12T00:00:00Z",
    bedrooms: 5,
    bathrooms: 4,
    area: 3500,
    status: "available",
  },
  {
    _id: "4",
    title: "Commercial Space in Motijheel",
    description:
      "Prime commercial property in the heart of the business district, perfect for office or retail.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
    price: 12000000,
    rating: 4.4,
    location: "Motijheel, Dhaka",
    category: "commercial",
    createdBy: "admin",
    createdAt: "2024-01-08T00:00:00Z",
    area: 5000,
    status: "available",
  },
];

const stats = [
  { label: "Properties Listed", value: "2,500+", icon: Building2 },
  { label: "Happy Clients", value: "15,000+", icon: Users },
  { label: "Cities Covered", value: "25+", icon: MapPin },
  { label: "Years of Experience", value: "10+", icon: Award },
];

const features = [
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

const testimonials = [
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

const blogPosts = [
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

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Autoplay 360° Panorama Background */}
        <Hero360 />
        {/* Subtle gradient overlay to blend edges and make the search box pop */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-6 leading-tight">
            Find Your Dream Property in Bangladesh
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Discover apartments, houses, villas, and commercial properties with
            our AI-powered smart search and personalized recommendations.
          </p>

          <div className="max-w-6xl mx-auto bg-slate-950/80 backdrop-blur-2xl rounded-[2rem] p-6 md:p-8 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-4 items-end">
              <div>
                <label className="block text-sm font-medium mb-2 text-white/90">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
                  <Input
                    placeholder="Enter city, area, or landmark"
                    className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white/90">
                  Property Type
                </label>
                <select className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white">
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
                <select className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white">
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
                variant="secondary"
                className="font-semibold text-white"
              >
                <Search className="h-5 w-5 mr-2" />
                Search Properties
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-4">
              Featured Properties
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium properties across
              Bangladesh's most desirable locations.
            </p>
          </div>
          <PropertyGrid properties={mockProperties} />
          <div className="text-center mt-8">
            <Button asChild size="lg">
              <Link href="/properties">
                View All Properties
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
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

      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-secondary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold font-playfair mb-2">
                  {stat.value}
                </div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                className="text-center p-6 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors"
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

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-slate-600">
              Don't just take our word for it - hear from our satisfied
              customers.
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
                          : "text-slate-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-slate-600 mb-6 italic">
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
                    <div className="text-sm text-slate-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
            Try Our AI Property Assistant
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Get personalized property recommendations powered by artificial
            intelligence. Chat with our AI assistant to find your perfect home.
          </p>
          <Button size="lg" variant="default" className="font-semibold">
            Start AI Chat
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-4">
              Real Estate Insights
            </h2>
            <p className="text-lg text-slate-600">
              Stay informed with the latest trends, tips, and market insights.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article
                key={index}
                className="bg-background rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center text-sm text-slate-500 mb-3">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/blog">Read More</Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link href="/blog">
                View All Articles
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest property listings, market
            insights, and exclusive offers.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <Input placeholder="Enter your email" className="flex-1" />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
