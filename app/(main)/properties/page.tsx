'use client';

import React, { useState, useEffect } from 'react';
import PropertyCard from '@/components/property/PropertyCard';
import PropertyFilter from '@/components/property/PropertyFilter';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Property } from '@/types';
import { Grid, List, SlidersHorizontal } from 'lucide-react';

import api from '@/lib/axios';

const PropertiesPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    location: '',
    minPrice: '',
    maxPrice: '',
    minRating: '',
  });

  useEffect(() => {
    // Simulate API call
    const loadProperties = async () => {
      try {
        setLoading(true);
        // We fetch up to 50 for the listing page instead of everything
        const response = await api.get('/properties?limit=50');
        if (response.data.success) {
          setProperties(response.data.data);
          setFilteredProperties(response.data.data);
        }
      } catch (error) {
        console.error('Failed to load properties', error);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  useEffect(() => {
    let filtered = properties;

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        property.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        property.location.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(property => property.category === filters.category);
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(property => property.location === filters.location);
    }

    // Price filters
    if (filters.minPrice) {
      filtered = filtered.filter(property => property.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(property => property.price <= parseInt(filters.maxPrice));
    }

    // Rating filter
    if (filters.minRating) {
      filtered = filtered.filter(property => property.rating >= parseFloat(filters.minRating));
    }

    setFilteredProperties(filtered);
  }, [properties, filters]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      location: '',
      minPrice: '',
      maxPrice: '',
      minRating: '',
    });
  };

  const activeFiltersCount = Object.values(filters).filter(value => value !== '').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold font-playfair text-foreground mb-4">
              Discover Your Perfect Property
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse through our curated collection of premium properties. From cozy studios to luxury villas,
              find the perfect place to call home.
            </p>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <PropertyFilter
                search={filters.search}
                category={filters.category as Property['category'] | ''}
                priceMin={filters.minPrice}
                priceMax={filters.maxPrice}
                rating={filters.minRating}
                location={filters.location}
                sort=""
                onSearchChange={(value) => handleFilterChange({ ...filters, search: value })}
                onCategoryChange={(value) => handleFilterChange({ ...filters, category: value })}
                onPriceMinChange={(value) => handleFilterChange({ ...filters, minPrice: value })}
                onPriceMaxChange={(value) => handleFilterChange({ ...filters, maxPrice: value })}
                onRatingChange={(value) => handleFilterChange({ ...filters, minRating: value })}
                onLocationChange={(value) => handleFilterChange({ ...filters, location: value })}
                onSortChange={() => {}}
                onClearFilters={clearFilters}
                isFiltersOpen={showFilters}
                onToggleFilters={() => setShowFilters(!showFilters)}
              />
            </div>

            <div className="flex items-center gap-4">
              {/* Filter Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="relative"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>

              {/* View Mode Toggle */}
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {filters.search && (
                <Badge variant="secondary">Search: "{filters.search}"</Badge>
              )}
              {filters.category && (
                <Badge variant="secondary">Category: {filters.category}</Badge>
              )}
              {filters.location && (
                <Badge variant="secondary">Location: {filters.location}</Badge>
              )}
              {filters.minPrice && (
                <Badge variant="secondary">Min Price: ${filters.minPrice}</Badge>
              )}
              {filters.maxPrice && (
                <Badge variant="secondary">Max Price: ${filters.maxPrice}</Badge>
              )}
              {filters.minRating && (
                <Badge variant="secondary">Min Rating: {filters.minRating}★</Badge>
              )}
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear all
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold">
              {loading ? 'Loading properties...' : `${filteredProperties.length} Properties Found`}
            </h2>
            {!loading && (
              <p className="text-muted-foreground">
                Showing {filteredProperties.length} of {properties.length} properties
              </p>
            )}
          </div>
        </div>

        {/* Properties Grid/List */}
        {loading ? (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-card rounded-lg border p-6">
                <Skeleton className="h-48 w-full mb-4 rounded-lg" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProperties.length > 0 ? (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold mb-2">No properties found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search terms to find more properties.
            </p>
            <Button onClick={clearFilters}>Clear Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPage;