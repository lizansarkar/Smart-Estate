'use client';

'use client';

import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Property } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';

interface PropertyFiltersProps {
  search: string;
  category: Property['category'] | '';
  priceMin: string;
  priceMax: string;
  rating: string;
  location: string;
  sort: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: Property['category'] | '') => void;
  onPriceMinChange: (value: string) => void;
  onPriceMaxChange: (value: string) => void;
  onRatingChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onClearFilters: () => void;
  isFiltersOpen: boolean;
  onToggleFilters: () => void;
}

const PropertyFilter: React.FC<PropertyFiltersProps> = ({
  search,
  category,
  priceMin,
  priceMax,
  rating,
  location,
  sort,
  onSearchChange,
  onCategoryChange,
  onPriceMinChange,
  onPriceMaxChange,
  onRatingChange,
  onLocationChange,
  onSortChange,
  onClearFilters,
  isFiltersOpen,
  onToggleFilters,
}) => {
  const categories: { value: Property['category']; label: string }[] = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'villa', label: 'Villa' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'land', label: 'Land' },
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'rating_desc', label: 'Highest Rated' },
  ];

  const hasActiveFilters = search || category || priceMin || priceMax || rating || location;

  return (
    <div className="bg-background border rounded-lg p-4 space-y-4">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search properties by title, description..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Location (e.g., Dhaka, Gulshan)"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={onToggleFilters}
          className="flex items-center space-x-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline">Filters</span>
        </Button>
      </div>

      {/* Sort Dropdown */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-foreground">Sort by:</span>
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="text-sm border rounded-md px-3 py-1 bg-background"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            Clear Filters
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {search && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>Search: {search}</span>
              <button
                onClick={() => onSearchChange('')}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
          {category && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>Category: {category.charAt(0).toUpperCase() + category.slice(1)}</span>
              <button
                onClick={() => onCategoryChange('')}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
          {location && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>Location: {location}</span>
              <button
                onClick={() => onLocationChange('')}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
          {(priceMin || priceMax) && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>
                Price: {priceMin ? `৳${priceMin}` : 'Min'} - {priceMax ? `৳${priceMax}` : 'Max'}
              </span>
              <button
                onClick={() => {
                  onPriceMinChange('');
                  onPriceMaxChange('');
                }}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
          {rating && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>Rating: {rating}+ stars</span>
              <button
                onClick={() => onRatingChange('')}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Expanded Filters */}
      {isFiltersOpen && (
        <div className="border-t pt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Property Type
              </label>
              <select
                value={category}
                onChange={(e) => onCategoryChange(e.target.value as Property['category'] | '')}
                className="w-full text-sm border rounded-md px-3 py-2 bg-background"
              >
                <option value="">All Types</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Min Price (৳)
              </label>
              <Input
                type="number"
                placeholder="e.g., 50000"
                value={priceMin}
                onChange={(e) => onPriceMinChange(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Max Price (৳)
              </label>
              <Input
                type="number"
                placeholder="e.g., 500000"
                value={priceMax}
                onChange={(e) => onPriceMaxChange(e.target.value)}
              />
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Minimum Rating
            </label>
            <select
              value={rating}
              onChange={(e) => onRatingChange(e.target.value)}
              className="text-sm border rounded-md px-3 py-2 bg-background"
            >
              <option value="">Any Rating</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
              <option value="1">1+ Stars</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyFilter;