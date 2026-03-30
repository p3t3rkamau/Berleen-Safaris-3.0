import type { Safari } from '../../types/safari'

/**
 * Load only Berleen safaris (from the berleen subfolder)
 */
const berleenModules = import.meta.glob('./json/berleen/**/*.json', {
  eager: true
}) as Record<string, { default?: Safari }>

const berleenSafaris: Safari[] = []

function initBerleenSafaris() {
  for (const path in berleenModules) {
    try {
      const mod = berleenModules[path]
      if (mod && mod.default) {
        berleenSafaris.push(mod.default)
      }
    } catch (error) {
      console.warn(`⚠️ Failed to load berleen safari: ${path}`, error)
    }
  }
}

initBerleenSafaris()

export function getBerleenSafaris(): Safari[] {
  return berleenSafaris
}

export function getBerleenSafariById(id: string): Safari | undefined {
  return berleenSafaris.find(s => s.id === id)
}