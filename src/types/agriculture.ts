
export interface AgricultureProduct {
  id: string;
  title: string;
  image: string;
  price: string;
  priceNumeric?: number; // For sorting/filtering
  category: string;
  location: string;
  quantity: string;
  description: string;
  path?: string;
  availabilityStatus?: 'In Stock' | 'Pre-order' | 'Coming Soon';
  featured?: boolean;
  dateAdded?: string;
  specifications?: Record<string, string>;
}
