// safari.ts — Central type definition for all safari data

export interface PricingItem {
  season: string
  period?: string
  price: number
  currency?: string
  minPax?: number
  type?: "group" | "perPerson"
}
export interface SafariPricing {
  prices: PricingItem[]
}
export interface ItineraryDay {
  day: number
  title: string
  description: string
}

export interface TravelInfo {
  clothes?: string
  food?: string
}

export interface Safari {
  rating: any
  price: any
  id: string
  title: string
  country: string
  duration: string
  prices: number
  description: string

  image: string
  gallery: string[]

  category: string       // e.g. "luxury", "budget", "mid-range"
  experience: string     // e.g. "wildlife", "beach", "cultural"

  highlights: string[]
  itinerary: ItineraryDay[]

  included: string[]
  notIncluded: string[]

  pricing: SafariPricing
  accommodation: string[]

  travelInfo?: TravelInfo
  note?: string
}