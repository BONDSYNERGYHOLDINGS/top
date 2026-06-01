export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  description: string;
  images: string[];
  video?: string;
  bedrooms: number;
  bathrooms: number;
  size: number; // sqm
  type: 'Sale' | 'Rent';
  featured?: boolean;
}