import type { Safari } from '../../types/safari'
import combinedSafaris from '../data/json/safari-experiences/berleen-safaris-combined.json'

/**
 * Internal cached safari list
 */
const safaris: Safari[] = []

/**
 * Load safaris from combined JSON file
 */
function initSafaris() {
  try {
    const safariList = combinedSafaris.safaris
    
    if (!safariList || !Array.isArray(safariList)) {
      console.warn('⚠️ Invalid combined safaris data')
      return
    }

    for (const safari of safariList) {
      // Basic validation
      if (
        !safari.id ||
        !safari.title ||
        !safari.country ||
        typeof safari.price !== 'number'
      ) {
        console.warn(`⚠️ Invalid safari data skipped: ${safari.id}`)
        continue
      }

      safaris.push(safari)
    }

    // Sort once after loading
    safaris.sort((a, b) => a.price - b.price)
    
    console.log(`✅ Loaded ${safaris.length} safaris from combined file`)

  } catch (error) {
    console.warn('⚠️ Failed to load combined safaris JSON', error)
  }
}

// initialize once
initSafaris()

/**
 * Return all safaris
 */
export function loadSafaris(): Safari[] {
  return safaris
}

/**
 * Get safari by id
 */
export function getSafariById(id: string): Safari | undefined {
  return safaris.find(s => s.id === id)
}

/**
 * Filter by country
 */
export function getSafarisByCountry(country: string): Safari[] {
  return safaris.filter(s => s.country === country)
}

/**
 * Filter by category
 */
export function getSafarisByCategory(category: string): Safari[] {
  return safaris.filter(s => s.category === category)
}

/**
 * Filter by experience
 */
export function getSafarisByExperience(experience: string): Safari[] {
  return safaris.filter(s => s.experience === experience)
}

/**
 * Search safaris by keyword
 */
export function searchSafaris(keyword: string): Safari[] {
  const lowerKeyword = keyword.toLowerCase()
  return safaris.filter(s => 
    s.title.toLowerCase().includes(lowerKeyword) ||
    s.description.toLowerCase().includes(lowerKeyword) ||
    s.country.toLowerCase().includes(lowerKeyword) ||
    s.highlights.some(h => h.toLowerCase().includes(lowerKeyword))
  )
}

/**
 * Get unique countries
 */
export function getCountries(): string[] {
  return Array.from(new Set(safaris.map(s => s.country))).sort()
}

/**
 * Get unique categories
 */
export function getCategories(): string[] {
  return Array.from(new Set(safaris.map(s => s.category))).sort()
}

/**
 * Get unique experiences
 */
export function getExperiences(): string[] {
  return Array.from(new Set(safaris.map(s => s.experience))).sort()
}

/**
 * Get featured safaris (first 6)
 */
export function getFeaturedSafaris(limit: number = 6): Safari[] {
  return safaris.slice(0, limit)
}

/**
 * Get safari count
 */
export function getSafariCount(): number {
  return safaris.length
}