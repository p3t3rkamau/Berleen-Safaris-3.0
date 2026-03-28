export interface Safari {
  id: string;
  title: string;
  country: string;
  duration: string;
  price: number;
  description: string;
  image: string;
  category: 'luxury' | 'mid-range' | 'budget';
  experience: 'honeymoon' | 'family' | 'adventure' | 'wildlife';
  highlights: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  included: string[];
  notIncluded: string[];
  pricing: {
    lowSeason: { solo: number; twoPersons: number; group: number };
    highSeason: { solo: number; twoPersons: number; group: number };
  };
  accommodation: string[];
  gallery: string[];
}