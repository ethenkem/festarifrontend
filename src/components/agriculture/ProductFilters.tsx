
import React from 'react';
import { ChevronDown, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';

interface ProductFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  sortOrder: string;
  setSortOrder: (value: string) => void;
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  showAdvancedFilters: boolean;
  setShowAdvancedFilters: (value: boolean) => void;
  resetFilters: () => void;
  maxPrice: number;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  sortOrder,
  setSortOrder,
  priceRange,
  setPriceRange,
  showAdvancedFilters,
  setShowAdvancedFilters,
  resetFilters,
  maxPrice
}) => {
  return (
    <div className="flex flex-col gap-4 mb-10 p-6 bg-white rounded-lg shadow-sm">
      <div className="w-full flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2 relative">
          <Input
            type="text"
            placeholder="Search agricultural products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-festari-500" size={18} />
        </div>

        <div className="w-full md:w-1/4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              <SelectItem value="Crops">Crops</SelectItem>
              <SelectItem value="Livestock">Livestock</SelectItem>
              <SelectItem value="Machinery">Machinery</SelectItem>
              <SelectItem value="Seeds">Seeds</SelectItem>
              <SelectItem value="Supplies">Supplies</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-1/4">
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-asc">Price (Low to High)</SelectItem>
              <SelectItem value="price-desc">Price (High to Low)</SelectItem>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Advanced filter toggle button */}
      <div className="flex justify-between items-center">
        <Button 
          variant="outline" 
          className="text-festari-800 hover:bg-festari-50 flex items-center gap-2"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
        >
          <Filter size={16} />
          <span>{showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters</span>
        </Button>

        <Button 
          variant="ghost" 
          className="text-festari-800 hover:text-accent"
          onClick={resetFilters}
        >
          Reset Filters
        </Button>
      </div>

      {/* Advanced filters */}
      {showAdvancedFilters && (
        <div className="mt-4 border-t pt-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="price-range">
              <AccordionTrigger>Price Range</AccordionTrigger>
              <AccordionContent>
                <div className="pt-4 px-2">
                  <Slider 
                    defaultValue={[0, maxPrice]} 
                    max={maxPrice} 
                    step={1} 
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    className="mb-6"
                  />
                  <div className="flex justify-between">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="availability">
              <AccordionTrigger>Availability</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-accent" />
                    <span>In Stock</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-accent" />
                    <span>Pre-order</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-accent" />
                    <span>Coming Soon</span>
                  </label>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="location">
              <AccordionTrigger>Location</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-accent" />
                    <span>Central Farm</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-accent" />
                    <span>Southern Ranch</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-accent" />
                    <span>Eastern District</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-accent" />
                    <span>Northwest Gardens</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-accent" />
                    <span>Hillside Poultry</span>
                  </label>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;
