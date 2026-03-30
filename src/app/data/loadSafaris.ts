import type { Safari } from '../../types/safari'
import combinedBerleenSafaris from '../data/json/safari-experiences/berleen-safaris-combined.json'

/**
 * Vite automatically discovers all JSON safari files
 * inside src/data/json/** folders (excluding the combined file)
 */
const safariModules = import.meta.glob('./json/**/*.json', {
  eager: true
}) as Record<string, { default?: Safari }>

/**
 * Internal cached safari list
 */
const safaris: Safari[] = []

/**
 * Load safaris safely.
 * Combines individual JSON files with the Berleen combined file
 */
function initSafaris() {
  let loadedCount = 0
  let skippedCount = 0

  // 1. Load all individual JSON files from the json folder
  for (const path in safariModules) {
    // Skip the combined file to avoid duplicates
    if (path.includes('berleen-safaris-combined')) {
      continue
    }
    
    try {
      const mod = safariModules[path]

      if (!mod || !mod.default) {
        console.warn(`⚠️ Safari file skipped (no default export): ${path}`)
        skippedCount++
        continue
      }

      const safari = mod.default

      // Basic validation
      if (
        !safari.id ||
        !safari.title ||
        !safari.country ||
        typeof safari.price !== 'number'
      ) {
        console.warn(`⚠️ Invalid safari data skipped: ${path}`)
        skippedCount++
        continue
      }

      safaris.push(safari)
      loadedCount++

    } catch (error) {
      console.warn(`⚠️ Failed to load safari JSON: ${path}`, error)
      skippedCount++
    }
  }

  // 2. Load all Berleen safaris from the combined file
  try {
    const berleenSafaris = combinedBerleenSafaris.safaris
    
    if (berleenSafaris && Array.isArray(berleenSafaris)) {
      for (const safari of berleenSafaris) {
        // Basic validation
        if (
          !safari.id ||
          !safari.title ||
          !safari.country ||
          typeof safari.price !== 'number'
        ) {
          console.warn(`⚠️ Invalid Berleen safari data skipped: ${safari.id}`)
          continue
        }
        
        // Check for duplicate IDs to avoid adding the same safari twice
        const exists = safaris.some(s => s.id === safari.id)
        if (!exists) {
          safaris.push(safari)
          loadedCount++
        }
      }
      console.log(`✅ Loaded ${berleenSafaris.length} Berleen safaris from combined file`)
    } else {
      console.warn('⚠️ No Berleen safaris found in combined file')
    }
  } catch (error) {
    console.warn('⚠️ Failed to load Berleen combined safaris JSON', error)
  }

  // Sort once after loading
  safaris.sort((a, b) => a.price - b.price)
  
  console.log(`📁 Total loaded: ${loadedCount} safaris (${skippedCount} skipped)`)
  console.log(`📊 Countries: ${Array.from(new Set(safaris.map(s => s.country))).join(', ')}`)
  console.log(`📊 Categories: ${Array.from(new Set(safaris.map(s => s.category))).join(', ')}`)
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