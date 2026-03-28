// src/data/loadSafaris.ts

import type { Safari } from '../../types/safari'

/**
 * Vite automatically discovers all JSON safari files
 * inside src/data/json/** folders.
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
 * If a file is corrupt or missing fields it will be skipped.
 */
function initSafaris() {
  for (const path in safariModules) {
    try {
      const mod = safariModules[path]

      if (!mod || !mod.default) {
        console.warn(`⚠️ Safari file skipped (no default export): ${path}`)
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
        continue
      }

      safaris.push(safari)

    } catch (error) {
      console.warn(`⚠️ Failed to load safari JSON: ${path}`, error)
    }
  }

  // Sort once after loading
  safaris.sort((a, b) => a.price - b.price)
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