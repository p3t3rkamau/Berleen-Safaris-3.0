// src/types/destination.ts

export interface Destination {
  id: string
  name: string
  country: string
  flag: string
  image: string
  rating: number
  reviewCount: number
  bestTime: string;
  bestFor: string[];
  recommendedDays: number;
  bestTimeToVisit: string; // Added this property
  wildlife: string[];
  description: string
  highlights: string[]
}