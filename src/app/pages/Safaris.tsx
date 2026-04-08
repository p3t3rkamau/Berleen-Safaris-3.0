// src/pages/Safaris.tsx
import React, { useState, useMemo, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { loadSafaris } from '../data/loadSafaris'
import type { Safari } from '../types/safari'
import { Clock, DollarSign, ArrowRight, Filter, X, Search, Star, Calendar, Users, Award, Shield } from 'lucide-react'
import { UltimateSEO } from '../components/UltimateSEO'
import { FaqSection } from '../components/FaqSection'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { ReviewSnippet } from '../components/ReviewSnippet'

const allSafaris = loadSafaris()

// Log the number of safaris loaded for debugging
console.log(`📁 Safaris page loaded: ${allSafaris.length} safaris total`)

// FAQ for Safaris page
const safarisFaqs = [
  {
    question: 'What types of safari packages do you offer?',
    answer: 'We offer three main types of safari packages: Budget Safaris (economical options for value-conscious travelers), Mid-Range Safaris (comfortable accommodations with good amenities), and Luxury Safaris (premium lodges and exclusive experiences). Each package includes game drives, accommodation, meals, and expert guides.'
  },
  {
    question: 'How do I choose the right safari package?',
    answer: 'Consider your budget, preferred destinations, travel dates, group size, and desired experience level. Our safari packages are categorized by duration (short: 1-4 days, classic: 5-7 days, extended: 8+ days) and budget (budget, mid-range, luxury). Contact us for personalized recommendations.'
  },
  {
    question: 'What is included in your safari packages?',
    answer: 'All our packages include: park fees, accommodation, meals as specified, game drives in a 4x4 vehicle, professional English-speaking guide, bottled water, and airport transfers. Some luxury packages also include alcoholic beverages, hot air balloon rides, and cultural visits.'
  },
  {
    question: 'Can I customize a safari package?',
    answer: 'Absolutely! All our safari packages are fully customizable. You can add or remove destinations, upgrade accommodation, extend duration, add activities (balloon safaris, walking safaris, cultural visits), or create a completely bespoke itinerary.'
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'Free cancellation up to 30 days before departure. Cancellations 15-29 days before incur a 25% fee, 7-14 days before incur a 50% fee, and less than 7 days are non-refundable. We strongly recommend travel insurance for full protection.'
  },
  {
    question: 'Do you offer group discounts?',
    answer: 'Yes! We offer group discounts for 4 or more travelers. Discounts range from 10-20% depending on group size and package selected. Contact us for a customized group quote.'
  },
  {
    question: 'What is the best time to book a safari?',
    answer: 'Book 3-6 months in advance for the best rates and availability, especially for peak season (June-October). Last-minute bookings may still be available but with limited options.'
  },
  {
    question: 'Do your safaris include travel insurance?',
    answer: 'Travel insurance is not included but is mandatory for all our safaris. We can recommend reputable insurance providers that specialize in safari travel coverage.'
  }
]

// Aggregate rating for all safaris
const calculateAggregateRating = () => {
  const totalRating = allSafaris.reduce((acc, safari) => acc + (safari.rating || 4.5), 0)
  const avgRating = totalRating / allSafaris.length
  const totalReviews = allSafaris.reduce((acc, safari) => acc + (safari.reviewCount || 0), 0)
  return { ratingValue: Number(avgRating.toFixed(1)), reviewCount: totalReviews || 1247 }
}

const aggregateRating = calculateAggregateRating()

// Product schema for safaris collection
const safarisProduct = {
  name: 'East Africa Safari Packages Collection',
  description: 'Complete collection of safari packages across Kenya, Tanzania, Rwanda, and Uganda. Including budget, mid-range, and luxury options for all travelers.',
  image: 'https://www.berleensafaris.com/images/safaris-collection.jpg',
  sku: 'BS-SAFARIS-2024',
  brand: 'Berleen Safaris',
  offers: {
    price: 850,
    priceCurrency: 'USD',
    availability: 'InStock' as const,
    priceValidUntil: '2024-12-31'
  },
  aggregateRating: { ratingValue: aggregateRating.ratingValue, reviewCount: aggregateRating.reviewCount }
}

// Video for safaris overview
const safarisVideo = {
  url: 'https://www.berleensafaris.com/videos/safaris-overview.mp4',
  thumbnail: 'https://www.berleensafaris.com/videos/safaris-thumbnail.jpg',
  duration: 'PT3M30S'
}

export function Safaris() {
  const [query, setQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('all')
  const [selectedBudget, setSelectedBudget] = useState('all')
  const [selectedExperience, setSelectedExperience] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Get unique values for filters
  const countries = useMemo(
    () => Array.from(new Set(allSafaris.map(s => s.country).filter(Boolean))).sort(),
    []
  )
  const categories = useMemo(
    () => Array.from(new Set(allSafaris.map(s => s.category).filter(Boolean))).sort(),
    []
  )
  const experiences = useMemo(
    () => Array.from(new Set(allSafaris.map(s => s.experience).filter(Boolean))).sort(),
    []
  )

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Suggestions: safaris whose title/country/highlights match the query
  const suggestions = useMemo(() => {
    if (query.trim().length < 2) return []
    const q = query.toLowerCase()
    return allSafaris
      .filter(s =>
        s.title?.toLowerCase().includes(q) ||
        s.country?.toLowerCase().includes(q) ||
        s.description?.toLowerCase().includes(q) ||
        s.highlights?.some(h => h.toLowerCase().includes(q))
      )
      .slice(0, 5)
  }, [query])

  // Main filtered + searched list
  const filteredSafaris = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allSafaris.filter(safari => {
      // Search match
      if (q.length >= 2) {
        const matches =
          safari.title?.toLowerCase().includes(q) ||
          safari.country?.toLowerCase().includes(q) ||
          safari.description?.toLowerCase().includes(q) ||
          safari.highlights?.some(h => h.toLowerCase().includes(q))
        if (!matches) return false
      }
      // Dropdown filters
      if (selectedCountry !== 'all' && safari.country?.toLowerCase() !== selectedCountry) return false
      if (selectedBudget !== 'all' && safari.category !== selectedBudget) return false
      if (selectedExperience !== 'all' && safari.experience !== selectedExperience) return false
      return true
    })
  }, [query, selectedCountry, selectedBudget, selectedExperience])

  const isFiltered =
    query.trim().length >= 2 ||
    selectedCountry !== 'all' ||
    selectedBudget !== 'all' ||
    selectedExperience !== 'all'

  function clearAll() {
    setQuery('')
    setSelectedCountry('all')
    setSelectedBudget('all')
    setSelectedExperience('all')
  }

  function applySearch(title: string) {
    setQuery(title)
    setShowSuggestions(false)
  }

  return (
    <>
      {/* Ultimate SEO Component with ALL Features */}
      <UltimateSEO
        title="Safari Packages | Kenya & East Africa Safari Tours"
        description={`Explore ${allSafaris.length}+ safari packages across Kenya, Tanzania, Rwanda, and Uganda. From budget to luxury, short to extended safaris. Book your African adventure with Berleen Safaris today!`}
        keywords="safari packages kenya, kenya safari tours, tanzania safaris, east africa safari deals, budget safaris, luxury safaris, masai mara packages, serengeti safaris, gorilla trekking, berleen safaris"
        canonicalUrl="/safaris"
        
        /* Meta Images */
        ogImage="https://www.berleensafaris.com/images/safaris-og-image.jpg"
        ogImageWidth={1200}
        ogImageHeight={630}
        ogImageAlt="Collection of safari packages - Wildlife, landscapes, and safari vehicles in East Africa"
        twitterImage="https://www.berleensafaris.com/images/safaris-twitter-card.jpg"
        
        /* Meta Video */
        ogVideo={safarisVideo.url}
        ogVideoType="video/mp4"
        ogVideoWidth={1920}
        ogVideoHeight={1080}
        ogVideoAlt="Overview of Berleen Safaris packages - Safari experiences across East Africa"
        
        /* FAQ Schema */
        faqs={safarisFaqs}
        
        /* Review Snippets */
        reviews={[]}
        aggregateRating={{ ratingValue: aggregateRating.ratingValue, reviewCount: aggregateRating.reviewCount, bestRating: 5, worstRating: 1 }}
        
        /* Breadcrumbs */
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Safaris', item: '/safaris' }
        ]}
        
        /* Product Schema */
        product={safarisProduct}
        
        /* Merchant Listing */
        merchant={{
          name: 'Berleen Safaris - Safari Packages',
          image: 'https://www.berleensafaris.com/logo-large.png',
          priceRange: `$${Math.min(...allSafaris.map(s => s.price))} - $${Math.max(...allSafaris.map(s => s.price))}`,
          telephone: '+254-714-018-914',
          address: 'Wilson Airport, Nairobi, Kenya',
          openingHours: ['Mon-Fri 9:00-18:00', 'Sat 10:00-16:00'],
          paymentAccepted: ['Visa', 'Mastercard', 'Bank Transfer', 'M-Pesa', 'Cash'],
          areaServed: ['Kenya', 'Tanzania', 'Uganda', 'Rwanda']
        }}
        
        /* Additional Meta Tags */
        ogType="website"
        twitterCard="summary_large_image"
        publishedTime="2024-01-01T00:00:00Z"
        modifiedTime={new Date().toISOString()}
        author="Berleen Safaris Safari Experts"
        locale="en_US"
      />
      
      {/* Visible Breadcrumbs */}
      <Breadcrumbs />
      
      {/* Hero with search bar embedded */}
      <div className="relative h-[400px] md:h-[480px] bg-gradient-to-r from-[var(--safari-brown-dark)] to-[var(--safari-brown)] overflow-hidden">
        <div
          className="absolute inset-0 opacity-25 transform scale-105 animate-slowZoom"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1738508041350-03453c14811c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-4 py-2 mb-6">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-semibold">{aggregateRating.ratingValue}/5 Rating</span>
                <span className="w-1 h-1 bg-white/50 rounded-full"></span>
                <span className="text-sm">{aggregateRating.reviewCount}+ Reviews</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Our Safari Packages
              </h1>
              <p className="text-xl text-gray-200 max-w-2xl mb-8">
                Choose from {allSafaris.length} carefully curated safari experiences across East Africa
              </p>

              {/* Search bar */}
              <div className="max-w-2xl" ref={searchRef}>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    value={query}
                    onChange={e => {
                      setQuery(e.target.value)
                      setShowSuggestions(true)
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Search by destination, park, or experience..."
                    className="w-full pl-12 pr-12 py-4 rounded-xl text-gray-800 text-base shadow-xl focus:outline-none focus:ring-2 focus:ring-[var(--safari-gold)]"
                  />
                  {query && (
                    <button
                      onClick={() => { setQuery(''); setShowSuggestions(false) }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      aria-label="Clear search"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}

                  {/* Autocomplete suggestions dropdown */}
                  <AnimatePresence>
                    {showSuggestions && suggestions.length > 0 && (
                      <motion.ul
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl overflow-hidden z-50 text-left"
                      >
                        {suggestions.map(s => (
                          <li key={s.id}>
                            <button
                              onMouseDown={() => applySearch(s.title)}
                              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[var(--safari-cream)] transition-colors"
                            >
                              <img
                                src={s.image}
                                alt={s.title}
                                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                              />
                              <div className="text-left flex-1">
                                <p className="text-sm font-semibold text-[var(--safari-brown-dark)]">
                                  {s.title}
                                </p>
                                <p className="text-xs text-gray-500 capitalize">
                                  {s.country} · {s.duration}
                                </p>
                              </div>
                              <span className="ml-auto text-xs font-bold text-[var(--safari-gold)]">
                                ${s.price?.toLocaleString()}
                              </span>
                            </button>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-white border-b border-gray-200 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[var(--safari-cream)] rounded-full flex items-center justify-center">
                <span className="text-sm">🏆</span>
              </div>
              <span className="text-sm font-semibold">{allSafaris.length}+ Packages</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[var(--safari-cream)] rounded-full flex items-center justify-center">
                <span className="text-sm">🌍</span>
              </div>
              <span className="text-sm font-semibold">{countries.length}+ Countries</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[var(--safari-cream)] rounded-full flex items-center justify-center">
                <span className="text-sm">⭐</span>
              </div>
              <ReviewSnippet rating={aggregateRating.ratingValue} reviewCount={aggregateRating.reviewCount} size="sm" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[var(--safari-cream)] rounded-full flex items-center justify-center">
                <span className="text-sm">💰</span>
              </div>
              <span className="text-sm font-semibold">Best Price Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Mobile filter toggle */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-center gap-2 bg-[var(--safari-cream)] px-6 py-3 rounded-lg font-semibold text-[var(--safari-brown-dark)]"
            >
              <Filter className="w-5 h-5" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
              {isFiltered && (
                <span className="ml-1 bg-[var(--safari-gold)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  !
                </span>
              )}
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className={`lg:w-72 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-[var(--safari-cream)] p-6 rounded-xl sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-[var(--safari-brown-dark)]">Filter Safaris</h3>
                  {isFiltered && (
                    <button
                      onClick={clearAll}
                      className="text-xs text-gray-500 hover:text-[var(--safari-gold)] flex items-center gap-1"
                    >
                      <X className="w-3 h-3" /> Clear all
                    </button>
                  )}
                </div>

                <FilterSelect
                  label="By Country"
                  value={selectedCountry}
                  onChange={setSelectedCountry}
                  options={countries.filter(Boolean).map(c => ({
                    value: c.toLowerCase(),
                    label: c,
                  }))}
                />
                <FilterSelect
                  label="By Budget"
                  value={selectedBudget}
                  onChange={setSelectedBudget}
                  options={categories.filter(Boolean).map(c => ({
                    value: c,
                    label: c.charAt(0).toUpperCase() + c.slice(1),
                  }))}
                />
                <FilterSelect
                  label="By Experience"
                  value={selectedExperience}
                  onChange={setSelectedExperience}
                  options={experiences.filter(Boolean).map(e => ({
                    value: e,
                    label: e === 'short' ? '⚡ Short Safari (1-4 days)' : 
                           e === 'classic' ? '🌟 Classic Safari (5-7 days)' : 
                           '🏆 Extended Safari (8+ days)',
                  }))}
                />
                
                {/* Trust Badges in Filters */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span>Licensed & Insured</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-[var(--safari-gold)]" />
                      <span>Kenya Tourism Board Member</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span>10,000+ Happy Travelers</span>
                    </div>
                  </div>
                </div>
                
                {/* Show total count in filters */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Found <span className="font-bold text-[var(--safari-gold)] text-lg">{filteredSafaris.length}</span> safaris
                  </p>
                </div>
              </div>
            </div>

            {/* Safari grid */}
            <div className="flex-1">
              {/* Result count + active chips */}
              <div className="mb-6 flex items-center gap-3 flex-wrap">
                <p className="text-gray-600">
                  Showing{' '}
                  <span className="font-bold text-[var(--safari-gold)]">{filteredSafaris.length}</span>{' '}
                  safari{filteredSafaris.length !== 1 ? 's' : ''}
                  {query.trim().length >= 2 && (
                    <span className="text-gray-400"> for "{query}"</span>
                  )}
                </p>
                {query.trim().length >= 2 && (
                  <FilterChip label={`"${query}"`} onRemove={() => setQuery('')} />
                )}
                {selectedCountry !== 'all' && (
                  <FilterChip label={selectedCountry} onRemove={() => setSelectedCountry('all')} />
                )}
                {selectedBudget !== 'all' && (
                  <FilterChip label={selectedBudget} onRemove={() => setSelectedBudget('all')} />
                )}
                {selectedExperience !== 'all' && (
                  <FilterChip label={
                    selectedExperience === 'short' ? 'Short Safari' :
                    selectedExperience === 'classic' ? 'Classic Safari' :
                    'Extended Safari'
                  } onRemove={() => setSelectedExperience('all')} />
                )}
              </div>

              {filteredSafaris.length === 0 ? (
                <div className="text-center py-16">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">No safaris found.</p>
                  <p className="text-gray-400 text-sm mb-6">
                    Try a different search term or clear your filters.
                  </p>
                  <button
                    onClick={clearAll}
                    className="text-[var(--safari-gold)] hover:underline font-semibold"
                  >
                    Clear everything
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredSafaris.map((safari, index) => (
                    <div key={safari.id}>
                      <SafariCard safari={safari} index={index} query={query} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 bg-[var(--safari-cream)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--safari-brown-dark)] mb-4">
              Why Book With Berleen Safaris?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the difference with Kenya's most trusted safari operator
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '👥', title: 'Expert Local Guides', description: 'Knowledgeable guides with years of experience' },
              { icon: '💰', title: 'Best Price Guarantee', description: 'Competitive rates with no hidden fees' },
              { icon: '🔄', title: 'Flexible Booking', description: 'Free cancellation up to 30 days' },
              { icon: '🌍', title: 'Sustainable Tourism', description: 'Supporting local communities & conservation' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl text-center shadow-md hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold text-[var(--safari-brown-dark)] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection items={safarisFaqs} title="Frequently Asked Questions About Safari Packages" />

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-[var(--safari-brown-dark)] to-[var(--safari-brown)] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Help Choosing a Safari?
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              Our expert team is here to help you find the perfect safari package
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-gradient-to-r from-[var(--safari-gold)] to-[var(--safari-orange)] text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105"
              >
                Contact Our Experts
              </Link>
              <Link
                to="/destinations"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[var(--safari-brown-dark)] transition-all"
              >
                Explore Destinations
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <select
        title={label}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--safari-gold)] bg-white"
      >
        <option value="all">All</option>
        {options.map(o => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="flex items-center gap-1 bg-[var(--safari-gold)]/10 text-[var(--safari-gold)] text-sm px-3 py-1 rounded-full capitalize">
      {label}
      <button onClick={onRemove} aria-label={`Remove ${label} filter`}>
        <X className="w-3 h-3" />
      </button>
    </span>
  )
}

/** Highlights matching query text in a string */
function Highlight({ text, query }: { text: string; query: string }) {
  if (!query || query.trim().length < 2) return <>{text}</>
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-[var(--safari-gold)]/20 text-[var(--safari-brown-dark)] rounded px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  )
}

function SafariCard({ safari, index, query }: { safari: Safari; index: number; query: string }) {
  // Get category badge color based on budget type
  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'luxury': return 'bg-amber-500'
      case 'budget': return 'bg-green-500'
      case 'mid-range': return 'bg-blue-500'
      default: return 'bg-[var(--safari-gold)]'
    }
  }

  // Get country flag emoji
  const getCountryFlag = (country: string): string => {
    const flags: Record<string, string> = {
      'Kenya': '🇰🇪',
      'Tanzania': '🇹🇿',
      'Kenya & Tanzania': '🇰🇪🇹🇿',
      'East Africa': '🌍'
    }
    return flags[country] || '🌍'
  }

  // Get experience badge text
  const getExperienceBadge = (experience: string): string => {
    switch (experience) {
      case 'short': return '⚡ Short Safari'
      case 'classic': return '🌟 Classic Safari'
      case 'extended': return '🏆 Extended Safari'
      default: return '🌍 Safari'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
    >
      <Link
        to={`/safari/${safari.id}`}
        className="group block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full transform hover:-translate-y-1"
      >
        <div className="aspect-[4/3] relative overflow-hidden">
          <img
            src={safari.image}
            alt={safari.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {safari.category && (
              <span className={`${getCategoryColor(safari.category)} text-white px-3 py-1 rounded-full text-xs font-semibold capitalize shadow-md`}>
                {safari.category}
              </span>
            )}
          </div>
          <div className="absolute top-4 right-4">
            <span className="bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-md">
              {getCountryFlag(safari.country)} {safari.country}
            </span>
          </div>
          <div className="absolute bottom-4 left-4">
            <span className="bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
              {getExperienceBadge(safari.experience)}
            </span>
          </div>
          {/* Rating Badge */}
          {safari.rating && (
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span className="text-white text-xs font-semibold">{safari.rating}</span>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Clock className="w-4 h-4" />
            <span>{safari.duration}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <Calendar className="w-4 h-4" />
            <span>Year-round</span>
          </div>
          <h3 className="text-xl font-bold text-[var(--safari-brown-dark)] mb-2 group-hover:text-[var(--safari-gold)] transition-colors line-clamp-2">
            <Highlight text={safari.title} query={query} />
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
            <Highlight text={safari.description || ''} query={query} />
          </p>

          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-1 text-[var(--safari-gold)] font-bold">
              <DollarSign className="w-4 h-4" />
              <span className="text-lg">From ${safari.price?.toLocaleString()}</span>
            </div>
            <div className="text-xs text-gray-500">
              per person
            </div>
          </div>

          {/* Highlights preview */}
          {safari.highlights && safari.highlights.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1">
              {safari.highlights.slice(0, 2).map((h: string, i: number) => (
                <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full line-clamp-1">
                  {h.length > 30 ? h.substring(0, 30) + '...' : h}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between text-[var(--safari-gold)] group-hover:text-[var(--safari-orange)] transition-colors">
            <span className="font-semibold text-sm">View Details</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}