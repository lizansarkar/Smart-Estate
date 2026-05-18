'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import {
  Sparkles,
  Copy,
  RefreshCw,
  Home,
  Wand2,
  CheckCircle,
  AlertCircle,
  Lightbulb,
} from 'lucide-react';
import Link from 'next/link';

interface PropertyDetails {
  type: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  price: number;
  features: string[];
}

const AIDescriptionGenerator: React.FC = () => {
  const [propertyDetails, setPropertyDetails] = useState<PropertyDetails>({
    type: '',
    location: '',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    price: 0,
    features: [],
  });
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [customFeatures, setCustomFeatures] = useState('');

  const propertyTypes = [
    'Apartment', 'Villa', 'House', 'Condo', 'Townhouse', 'Penthouse', 'Studio', 'Duplex'
  ];

  const commonFeatures = [
    'Swimming Pool', 'Gym', 'Parking', 'Garden', 'Balcony', 'Security System',
    'Elevator', 'Air Conditioning', 'Modern Kitchen', 'City View', 'Sea View',
    '24/7 Security', 'Generator', 'Intercom', 'CCTV', 'Playground'
  ];

  const handleInputChange = (field: keyof PropertyDetails, value: string | number) => {
    setPropertyDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFeatureToggle = (feature: string) => {
    setPropertyDetails(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const generateDescription = async () => {
    if (!propertyDetails.type || !propertyDetails.location) {
      alert('Please fill in at least property type and location');
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      const description = generateAIDescription(propertyDetails);
      setGeneratedDescription(description);
      setIsGenerating(false);
    }, 2000);
  };

  const generateAIDescription = (details: PropertyDetails): string => {
    const { type, location, bedrooms, bathrooms, area, price, features } = details;

    let description = `🏠 **${type.charAt(0).toUpperCase() + type.slice(1)} for Sale in ${location}**\n\n`;

    description += `Discover this stunning ${bedrooms}-bedroom, ${bathrooms}-bathroom ${type.toLowerCase()} ` +
                   `spanning ${area.toLocaleString()} square feet in the prestigious ${location} area.\n\n`;

    if (features.length > 0) {
      description += `✨ **Key Features:**\n`;
      features.forEach(feature => {
        description += `• ${feature}\n`;
      });
      description += `\n`;
    }

    description += `💰 **Price:** ৳${price.toLocaleString()}\n\n`;

    description += `📍 **Location Benefits:**\n` +
                   `• Prime location in ${location}\n` +
                   `• Close to shopping centers and restaurants\n` +
                   `• Excellent connectivity to major roads\n` +
                   `• Safe and secure neighborhood\n\n`;

    description += `🏗️ **Property Highlights:**\n` +
                   `• Modern architectural design\n` +
                   `• High-quality construction materials\n` +
                   `• Spacious and well-lit interiors\n` +
                   `• Perfect for modern living\n\n`;

    description += `Don't miss this opportunity to own a beautiful ${type.toLowerCase()} in one of Dhaka's most sought-after locations. ` +
                   `Contact us today to schedule a viewing and make this property yours!\n\n` +
                   `#${location.replace(/\s+/g, '')} #${type} #RealEstate #PropertyForSale`;

    return description;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedDescription);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const addCustomFeatures = () => {
    if (customFeatures.trim()) {
      const features = customFeatures.split(',').map(f => f.trim()).filter(f => f);
      setPropertyDetails(prev => ({
        ...prev,
        features: [...prev.features, ...features]
      }));
      setCustomFeatures('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <Home className="h-6 w-6" />
                <span className="font-semibold">Back to Home</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-white/20 text-white">
                <Sparkles className="h-4 w-4 mr-1" />
                AI Generator
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wand2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold font-playfair text-foreground mb-2">
            AI Property Description Generator
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Create compelling, SEO-optimized property descriptions in seconds using advanced AI technology.
            Perfect for real estate listings, marketing materials, and social media posts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4">Property Details</h2>

              <div className="space-y-4">
                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium mb-2">Property Type *</label>
                  <select
                    value={propertyDetails.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  >
                    <option value="">Select property type</option>
                    {propertyTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium mb-2">Location *</label>
                  <Input
                    value={propertyDetails.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="e.g., Gulshan, Dhanmondi, Banani"
                  />
                </div>

                {/* Bedrooms & Bathrooms */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Bedrooms</label>
                    <Input
                      type="number"
                      value={propertyDetails.bedrooms || ''}
                      onChange={(e) => handleInputChange('bedrooms', parseInt(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Bathrooms</label>
                    <Input
                      type="number"
                      value={propertyDetails.bathrooms || ''}
                      onChange={(e) => handleInputChange('bathrooms', parseInt(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Area & Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Area (sq ft)</label>
                    <Input
                      type="number"
                      value={propertyDetails.area || ''}
                      onChange={(e) => handleInputChange('area', parseInt(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Price (৳)</label>
                    <Input
                      type="number"
                      value={propertyDetails.price || ''}
                      onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-card rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4">Features & Amenities</h2>

              <div className="grid grid-cols-2 gap-2 mb-4">
                {commonFeatures.map(feature => (
                  <label key={feature} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={propertyDetails.features.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                      className="rounded"
                    />
                    <span className="text-sm">{feature}</span>
                  </label>
                ))}
              </div>

              {/* Custom Features */}
              <div className="flex space-x-2">
                <Input
                  value={customFeatures}
                  onChange={(e) => setCustomFeatures(e.target.value)}
                  placeholder="Add custom features (comma separated)"
                  onKeyPress={(e) => e.key === 'Enter' && addCustomFeatures()}
                />
                <Button onClick={addCustomFeatures} size="sm">
                  Add
                </Button>
              </div>

              {propertyDetails.features.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Selected Features:</p>
                  <div className="flex flex-wrap gap-2">
                    {propertyDetails.features.map(feature => (
                      <Badge key={feature} variant="secondary" className="cursor-pointer"
                             onClick={() => handleFeatureToggle(feature)}>
                        {feature} ×
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Generate Button */}
            <Button
              onClick={generateDescription}
              disabled={isGenerating}
              className="w-full"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                  Generating Description...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Generate AI Description
                </>
              )}
            </Button>
          </div>

          {/* Output */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Generated Description</h2>
                {generatedDescription && (
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="sm"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                )}
              </div>

              {isGenerating ? (
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ) : generatedDescription ? (
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed">
                    {generatedDescription}
                  </pre>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Lightbulb className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Fill in the property details and click "Generate AI Description" to create a compelling property listing.
                  </p>
                </div>
              )}
            </div>

            {/* Tips */}
            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">💡 AI Generation Tips</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Include specific location details for better SEO</li>
                <li>• Add unique features to make your listing stand out</li>
                <li>• Use realistic prices and measurements for credibility</li>
                <li>• The AI automatically includes relevant hashtags</li>
                <li>• Descriptions are optimized for both web and social media</li>
              </ul>
            </div>

            {/* Preview */}
            {generatedDescription && (
              <div className="bg-card rounded-lg border p-6">
                <h3 className="text-lg font-semibold mb-4">📱 Social Media Preview</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-sm">
                    <p className="font-semibold mb-2">Facebook/Instagram Post:</p>
                    <div className="bg-white p-3 rounded border text-xs">
                      {generatedDescription.split('\n').slice(0, 3).join('\n')}
                      <br />...<br />
                      <span className="text-blue-600">#RealEstate #PropertyForSale</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDescriptionGenerator;