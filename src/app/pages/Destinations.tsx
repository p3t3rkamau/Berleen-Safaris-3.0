// src/pages/Destinations.tsx
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { loadDestinations } from '../data/loadDestinations'
import { MapPin } from 'lucide-react'

// Loaded once synchronously — same pattern as Safaris.tsx
const allDestinations = loadDestinations()

export function Destinations() {
  return (
    <div>
      {/* Hero */}
      <div className="relative h-[300px] md:h-[400px] bg-gradient-to-r from-[var(--safari-brown-dark)] to-[var(--safari-brown)]">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1669557673726-293309494c20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080)',
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
                Our Destinations
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
                Discover the most incredible safari destinations in East Africa
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {allDestinations.length === 0 ? (
            <p className="text-center text-gray-500 py-16">
              No destinations found. Add JSON files to{' '}
              <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                src/data/destinations/
              </code>
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {allDestinations.map((destination, index) => (
                <motion.div
                  key={destination.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  <Link
                    to={`/destinations/${destination.id}`}
                    className="group relative block overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="aspect-[16/10] relative">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                      <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                        <div className="text-5xl mb-3">{destination.flag}</div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-3">
                          {destination.name}
                        </h2>
                        <p className="text-lg text-gray-200 mb-6">
                          {destination.description}
                        </p>

                        <div className="mb-6">
                          <div className="text-sm text-gray-300 mb-2">Top Attractions:</div>
                          <div className="flex flex-wrap gap-2">
                            {destination.highlights.map((highlight, i) => (
                              <span
                                key={i}
                                className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm"
                              >
                                <MapPin className="w-3 h-3 flex-shrink-0" />
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>

                        <button className="bg-gradient-to-r from-[var(--safari-gold)] to-[var(--safari-orange)] text-white px-8 py-3 rounded-full font-semibold group-hover:shadow-lg transition-all duration-300 inline-block self-start">
                          Explore {destination.name}
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}