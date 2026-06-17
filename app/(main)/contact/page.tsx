"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      description: "Available 24/7",
      detail: "+880 1234-567890",
      href: "tel:+8801234567890",
    },
    {
      icon: Mail,
      title: "Email",
      description: "We respond within 24 hours",
      detail: "support@smartest ate.com",
      href: "mailto:support@smartestate.com",
    },
    {
      icon: MapPin,
      title: "Address",
      description: "Visit our office",
      detail: "Dhaka, Bangladesh",
      href: "#",
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-primary/10 to-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-playfair text-foreground mb-6">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions about properties or need assistance? We're here to
              help!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.href}
                className="group bg-card border border-border rounded-2xl p-8 hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-4 transition-colors">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {info.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {info.description}
                </p>
                <p className="text-lg font-semibold text-primary">
                  {info.detail}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="w-full rounded-lg border-border bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="w-full rounded-lg border-border bg-background"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+880 1XXX-XXXXXX"
                    className="w-full rounded-lg border-border bg-background"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Subject *
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                    className="w-full rounded-lg border-border bg-background"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 rounded-full font-bold bg-primary text-primary-foreground shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  size="lg"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Info Section */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-6">
                Why Contact Us?
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Expert Guidance
                    </h3>
                    <p className="text-muted-foreground">
                      Get personalized advice from our experienced real estate
                      professionals
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Quick Response
                    </h3>
                    <p className="text-muted-foreground">
                      We typically respond to inquiries within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Local Expertise
                    </h3>
                    <p className="text-muted-foreground">
                      Deep knowledge of properties and markets across Bangladesh
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-primary/10 border border-primary/20 rounded-2xl">
                <h4 className="font-semibold text-foreground mb-3">
                  Quick Links
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a
                      href="/properties"
                      className="text-primary hover:underline"
                    >
                      Browse Properties →
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="text-primary hover:underline">
                      Learn About Us →
                    </a>
                  </li>
                  <li>
                    <a href="/ai-chat" className="text-primary hover:underline">
                      Chat with AI Assistant →
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
            We're Here to Help
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Whether you're buying, selling, or renting, our team is ready to
            assist you every step of the way
          </p>
        </div>
      </section>
    </div>
  );
}
