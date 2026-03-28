// src/pages/DestinationDetail.tsx
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { getDestinationById } from '../data/loadDestinations'
import { loadSafaris } from '../data/loadSafaris'
import { Clock, DollarSign, ArrowRight } from 'lucide-react'

// Loaded once synchronously
const allSafaris = loadSafaris()

export function DestinationDetail() {
  const { country } = useParams<{ country: string }>()
  const destination = country ? getDestinationById(country) : undefined

  // Match safaris by country name (case-insensitive) so "Kenya" matches "kenya" etc.
  const countrySafaris = allSafaris.filter(
    s => s.country.toLowerCase() === country?.toLowerCase()
  )

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Destination not found</h1>
          <Link to="/destinations" className="text-[var(--safari-gold)] hover:underline">
            View all destinations
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero */}
      <div className="relative h-[400px] md:h-[500px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${destination.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white max-w-2xl"
            >
              <div className="text-6xl mb-4">{destination.flag}</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {destination.name}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200">{destination.description}</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Safari packages */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--safari-brown-dark)] mb-4">
              Popular Safari Packages in {destination.name}
            </h2>
            <p className="text-lg text-gray-600">
              Choose from our carefully curated safari experiences
            </p>
          </motion.div>

          {countrySafaris.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No safaris available for this destination yet.</p>
              <Link to="/contact" className="text-[var(--safari-gold)] hover:underline font-semibold">
                Contact us for custom packages
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {countrySafaris.map((safari, index) => (
                <motion.div
                  key={safari.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: Math.min(index * 0.1, 0.3) }}
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
                      <div className="absolute top-4 right-4">
                        <span className="bg-[var(--safari-gold)] text-white px-3 py-1 rounded-full text-sm font-semibold capitalize">
                          {safari.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[var(--safari-brown-dark)] mb-2 group-hover:text-[var(--safari-gold)] transition-colors">
                        {safari.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{safari.description}</p>

                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{safari.duration}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[var(--safari-gold)] font-bold text-sm">
                          <DollarSign className="w-4 h-4" />
                          <span>From ${safari.price.toLocaleString()}</span>
                        </div>
                      </div>

                      {safari.highlights.length > 0 && (
                        <div className="mb-4">
                          <div className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wide">
                            Highlights
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {safari.highlights.slice(0, 3).map((highlight, i) => (
                              <span
                                key={i}
                                className="text-xs bg-[var(--safari-cream)] text-gray-700 px-2 py-1 rounded"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-[var(--safari-gold)] group-hover:text-[var(--safari-orange)] transition-colors">
                        <span className="font-semibold text-sm">View Details</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Top attractions */}
      <section className="py-20 px-4 bg-[var(--safari-cream)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--safari-brown-dark)] mb-8">
              Top Attractions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {destination.highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="bg-white p-6 rounded-xl text-center shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="text-3xl mb-2">🦁</div>
                  <div className="font-semibold text-[var(--safari-brown-dark)] text-sm">
                    {highlight}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}