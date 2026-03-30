import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Search, Filter, Calendar, Clock, MapPin, ChevronDown, Star } from 'lucide-react'
import { safaris, Safari } from '../data/json/safari-experiences/safaris'

const categories = ["All", "Kenya Safari", "Masai Mara Safari", "Amboseli Safari", "Samburu Safari", "Tanzania Safari", "Cross-Border Safari", "Honeymoon Safari"]

export function SafarisListing() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"duration" | "price">("duration")

  const filteredSafaris = safaris
    .filter(safari => {
      const matchesCategory = selectedCategory === "All" || safari.category === selectedCategory
      const matchesSearch = safari.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        safari.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      if (sortBy === "duration") {
        return a.duration.days - b.duration.days
      } else {
        const priceA = a.pricing.rates[0]?.prices["2_pax"] || 0
        const priceB = b.pricing.rates[0]?.prices["2_pax"] || 0
        return priceA - priceB
      }
    })

  const getPrice = (safari: Safari): number => {
    const firstRate = safari.pricing.rates[0]
    if (firstRate) {
      const prices = Object.values(firstRate.prices)
      return Math.min(...prices)
    }
    return 0
  }

  return (
    <div className="min-h-screen bg-[var(--safari-cream)]">
      {/* Hero Header */}
      <div className="relative h-[40vh] min-h-[300px] bg-gradient-to-r from-[var(--safari-brown-dark)] to-[var(--safari-brown)] overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Our Safari Packages</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover the perfect safari adventure tailored to your dreams and budget
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by safari name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--safari-gold)] focus:border-transparent"
              />
            </div>
            <div className="flex gap-3">
              <select
                title="Sort by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "duration" | "price")}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--safari-gold)] bg-white"
              >
                <option value="duration">Sort by Duration</option>
                <option value="price">Sort by Price</option>
              </select>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-[var(--safari-gold)] text-[var(--safari-brown-dark)]'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">Showing {filteredSafaris.length} safaris</p>
        </div>

        {/* Safari Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSafaris.map((safari, index) => (
            <motion.div
              key={safari.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group"
            >
              <Link to={`/safari/${safari.id}`} className="block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop&auto=format`}
                    alt={safari.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[var(--safari-gold)] text-[var(--safari-brown-dark)] px-3 py-1 rounded-full text-xs font-semibold">
                      {safari.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-white text-sm flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {safari.duration.days} Days
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{safari.category.includes("Kenya") ? "🇰🇪" : safari.category.includes("Tanzania") ? "🇹🇿" : "🌍"}</span>
                    <h3 className="text-xl font-bold text-[var(--safari-brown-dark)] line-clamp-1">{safari.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{safari.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-[var(--safari-gold)]">
                        ${getPrice(safari).toLocaleString()}
                      </span>
                      <span className="text-gray-500 text-sm"> / person</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">4.9</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredSafaris.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No safaris found matching your criteria.</p>
            <button
              onClick={() => { setSelectedCategory("All"); setSearchQuery("") }}
              className="mt-4 text-[var(--safari-gold)] hover:text-[var(--safari-orange)] font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}