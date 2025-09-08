
// Type definitions for better TypeScript support
export interface User {
  id: string;
  fullName: string;
  avatar: string;
  location: string;
  memberSince: string;
  rating: number;
  totalReviews: number;
  bio: string;
  totalSales: number;
  responseTime: string;
  skills: string[];
}

export interface Package {
  type: 'BASIC' | 'STANDARD' | 'PREMIUM';
  title: string;
  price: number;
  deliveryTime: number;
  revisions: number;
  features: string[];
}

export interface Area {
  id: string;
  name: string;
  districts: string[];
  travelTime: string;
  additionalFee?: number;
  isAvailable: boolean;
}
