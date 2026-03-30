const fs = require('fs')
const path = require('path')

// Your berleen-safaris.json data (paste the entire JSON content here)
const berleenData = require('../data/json/safari-experiences/safari-experience.json')

// Helper function to get image based on ID
function getSafariImage(id) {
  const imageMap = {
    "kenya-awesome-naivasha": "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=400&fit=crop",
    "kenya-awesome-low-budget": "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&h=400&fit=crop",
    "kenya-awesome": "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=600&h=400&fit=crop",
    "kenya-tanzania-highlight": "https://images.unsplash.com/photo-1549366021-9f761d450615?w=600&h=400&fit=crop",
  }
  return imageMap[id] || "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=400&fit=crop"
}

// Helper to get gallery images
function getGalleryImages(id) {
  const baseImage = getSafariImage(id)
  return [
    baseImage,
    baseImage.replace('w=600', 'w=800'),
    baseImage.replace('w=600', 'w=800').replace('h=400', 'h=500'),
    baseImage.replace('w=600', 'w=800').replace('h=400', 'h=450'),
  ]
}

// Helper to determine country from category
function getCountryFromCategory(category) {
  if (category.includes("Kenya")) return "Kenya"
  if (category.includes("Tanzania")) return "Tanzania"
  if (category.includes("Cross-Border")) return "Kenya & Tanzania"
  return "East Africa"
}

// Helper to determine category for Safari type
function getSafariCategory(category) {
  if (category.toLowerCase().includes("budget")) return "budget"
  if (category.toLowerCase().includes("luxury")) return "luxury"
  return "mid-range"
}

// Helper to determine experience from duration
function getExperience(days) {
  if (days <= 4) return "short"
  if (days >= 10) return "extended"
  return "classic"
}

// Build itinerary from accommodations
function buildItinerary(accommodations, days) {
  const itinerary = []
  
  // Day 1
  itinerary.push({
    day: 1,
    title: "Arrival - Nairobi",
    description: "Welcome to Kenya! Transfer to your hotel for overnight stay."
  })
  
  // Middle days from accommodations
  accommodations.slice(1, -1).forEach((acc, idx) => {
    itinerary.push({
      day: acc.day,
      title: acc.name,
      description: `Stay at ${acc.name} (${acc.type}) with ${acc.mealPlan} meal plan.`
    })
  })
  
  // Last day
  itinerary.push({
    day: days,
    title: "Departure",
    description: "Transfer to airport for your departure flight."
  })
  
  return itinerary.sort((a, b) => a.day - b.day)
}

// Convert JSON safari to your Safari type format
function convertToSafariFormat(jsonSafari) {
  const firstRate = jsonSafari.pricing.rates[0]
  const lowestPrice = firstRate ? Math.min(...Object.values(firstRate.prices)) : 0
  
  // Build pricing array
  const prices = jsonSafari.pricing.rates.map(rate => ({
    season: rate.period,
    price: Math.min(...Object.values(rate.prices)),
    currency: "USD",
    minPax: 2,
    type: "perPerson"
  }))
  
  return {
    id: jsonSafari.id,
    title: jsonSafari.title,
    country: getCountryFromCategory(jsonSafari.category),
    duration: `${jsonSafari.duration.days} Days / ${jsonSafari.duration.nights} Nights`,
    price: lowestPrice,
    description: jsonSafari.description,
    image: getSafariImage(jsonSafari.id),
    gallery: getGalleryImages(jsonSafari.id),
    category: getSafariCategory(jsonSafari.category),
    experience: getExperience(jsonSafari.duration.days),
    highlights: jsonSafari.highlights,
    itinerary: buildItinerary(jsonSafari.accommodations, jsonSafari.duration.days),
    included: jsonSafari.inclusions,
    notIncluded: jsonSafari.exclusions,
    pricing: { prices },
    accommodation: jsonSafari.accommodations.map(acc => acc.name),
    travelInfo: {
      clothes: "Lightweight clothing for day, warm layers for early mornings. Neutral colors recommended.",
      food: "Full board meals included. Special dietary requirements can be accommodated with advance notice."
    },
    note: `Prices are per person sharing. Single supplement: $${firstRate?.single_supplement || 0}. Valid for ${jsonSafari.pricing.validity}. Balloon ride available at $520 per adult.`
  }
}

// Create output directory
const outputDir = path.join(__dirname, '../data/json/berleen')
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// Generate JSON files for each safari
berleenData.safaris.forEach(safari => {
  const formattedSafari = convertToSafariFormat(safari)
  const fileName = `${safari.id}.json`
  const filePath = path.join(outputDir, fileName)
  
  fs.writeFileSync(filePath, JSON.stringify(formattedSafari, null, 2))
  console.log(`✅ Generated: ${fileName}`)
})

console.log(`\n🎉 Successfully generated ${berleenData.safaris.length} safari JSON files in ${outputDir}`)