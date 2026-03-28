// src/data/loadDestinations.ts
//
// Auto-discovers all destination JSON files from:
//   src/data/destinations/**/*.json
//
// Example structure:
//   src/data/destinations/kenya.json
//   src/data/destinations/tanzania.json
//
// Just drop a new JSON file in the folder — no code changes needed.

import type { Destination } from '../../types/destination'

const destinationModules = import.meta.glob<{ default: Destination }>(
  './destinations/**/*.json',
  { eager: true }
)

export function loadDestinations(): Destination[] {
  const destinations: Destination[] = []

  for (const path in destinationModules) {
    const mod = destinationModules[path]
    if (mod?.default) {
      destinations.push(mod.default)
    }
  }

  // Sort alphabetically by name for consistent ordering
  return destinations.sort((a, b) => a.name.localeCompare(b.name))
}

export function getDestinationById(id: string): Destination | undefined {
  return loadDestinations().find(d => d.id === id)
}