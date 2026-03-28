// src/pages/Safaris.tsx
import { useState, useMemo, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { loadSafaris } from '../data/loadSafaris'
import type { Safari } from '../types/safari'
import { Clock, DollarSign, ArrowRight, Filter, X, Search } from 'lucide-react'

const allSafaris = loadSafaris()

export function Safaris() {
  const [query, setQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('all')
  const [selectedBudget, setSelectedBudget] = useState('all')
  const [selectedExperience, setSelectedExperience] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

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
    <div>
      {/* Hero with search bar embedded */}
      <div className="relative h-[360px] md:h-[440px] bg-gradient-to-r from-[var(--safari-brown-dark)] to-[var(--safari-brown)]">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1738508041350-03453c14811c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Our Safari Packages
              </h1>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
                Choose from our carefully curated safari experiences across East Africa
              </p>

              {/* Search bar */}
              <div className="max-w-2xl mx-auto" ref={searchRef}>
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
                              <div className="text-left">
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
            <div className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
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
                    label: e.charAt(0).toUpperCase() + e.slice(1),
                  }))}
                />
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
                  <FilterChip label={selectedExperience} onRemove={() => setSelectedExperience('all')} />
                )}
              </div>

              {filteredSafaris.length === 0 ? (
                <div className="text-center py-16">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
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
                    <SafariCard key={safari.id} safari={safari} index={index} query={query} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
    >
      <Link
        to={`/safari/${safari.id}`}
        className="group block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full"
      >
        <div className="aspect-[4/3] relative overflow-hidden">
          <img
            src={safari.image}
            alt={safari.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            {safari.category && (
              <span className="bg-[var(--safari-gold)] text-white px-3 py-1 rounded-full text-xs font-semibold capitalize">
                {safari.category}
              </span>
            )}
            {safari.country && (
              <span className="bg-white/90 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold capitalize">
                {safari.country}
              </span>
            )}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-[var(--safari-brown-dark)] mb-2 group-hover:text-[var(--safari-gold)] transition-colors">
            <Highlight text={safari.title} query={query} />
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
            <Highlight text={safari.description || ''} query={query} />
          </p>

          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Clock className="w-4 h-4" />
              <span>{safari.duration}</span>
            </div>
            <div className="flex items-center gap-1 text-[var(--safari-gold)] font-bold text-sm">
              <DollarSign className="w-4 h-4" />
              <span>From ${safari.price?.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[var(--safari-gold)] group-hover:text-[var(--safari-orange)] transition-colors">
            <span className="font-semibold text-sm">View Details</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}