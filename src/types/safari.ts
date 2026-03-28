// safari.ts — Central type definition for all safari data

export interface SafariPricingTier {
  solo: number
  twoPersons: number
  group: number
}

export interface SafariPricing {
  lowSeason: SafariPricingTier
  highSeason: SafariPricingTier
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
  id: string
  title: string
  country: string
  duration: string
  price: number
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