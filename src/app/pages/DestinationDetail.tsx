// src/pages/DestinationDetail.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { getDestinationById } from '../data/loadDestinations'
import { loadSafaris } from '../data/loadSafaris'
import { Clock, DollarSign, ArrowRight, Calendar, Users, MapPin, Star, Camera, Sun, Cloud, Info, CheckCircle } from 'lucide-react'
import { UltimateSEO } from '../components/UltimateSEO'
import { FaqSection } from '../components/FaqSection'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { ReviewSnippet } from '../components/ReviewSnippet'

// Loaded once synchronously
const allSafaris = loadSafaris()

// Destination-specific FAQ data generator
const getDestinationFaqs = (destinationName: string, bestTimeToVisit: string, wildlife: string[]) => [
  {
    question: `What is the best time to visit ${destinationName}?`,
    answer: `The best time to visit ${destinationName} is ${bestTimeToVisit}. During this period, wildlife viewing is at its peak with optimal weather conditions. However, ${destinationName} offers unique experiences year-round, with different seasons providing different advantages.`
  },
  {
    question: `What wildlife can I see in ${destinationName}?`,
    answer: `${destinationName} is home to ${wildlife.join(', ')}. The park is known for its abundant wildlife populations and excellent game viewing opportunities throughout the year.`
  },
  {
    question: `How many days do I need for a safari in ${destinationName}?`,
    answer: `We recommend spending 3-5 days in ${destinationName} to fully experience its highlights. This allows for multiple game drives, time to explore different areas of the park, and a relaxed pace to enjoy the wildlife and scenery.`
  },
  {
    question: `Is ${destinationName} accessible for self-drive safaris?`,
    answer: `Yes, ${destinationName} offers both self-drive and guided safari options. While self-drive is possible, we recommend using our experienced guides who know the best spots for wildlife viewing and can provide valuable insights about the ecosystem.`
  },
  {
    question: `What accommodation options are available in ${destinationName}?`,
    answer: `${destinationName} offers a range of accommodation options from luxury lodges to tented camps and budget-friendly public campsites. We can help you choose the perfect option based on your preferences and budget.`
  },
  {
    question: `Are there any special activities or cultural experiences in ${destinationName}?`,
    answer: `Yes! Many unique experiences are available including hot air balloon safaris, guided nature walks, cultural visits to local communities, night game drives, and photography workshops. Contact us to customize your experience.`
  }
]

// Destination-specific review data
const getDestinationReviews = (destinationName: string) => [
  {
    author: 'Travel Enthusiast',
    ratingValue: 5,
    reviewBody: `${destinationName} exceeded all expectations! The wildlife was incredible and our guide was extremely knowledgeable. Truly a once-in-a-lifetime experience.`,
    datePublished: '2024-01-15'
  },
  {
    author: 'Nature Lover',
    ratingValue: 5,
    reviewBody: `Amazing destination! The landscape is breathtaking and we saw so many animals. Berleen Safaris organized everything perfectly.`,
    datePublished: '2024-01-10'
  },
  {
    author: 'Adventure Seeker',
    ratingValue: 4,
    reviewBody: `Beautiful park with diverse wildlife. The accommodation was comfortable and the game drives were well-organized. Highly recommend!`,
    datePublished: '2024-01-05'
  }
]

// Generate product schema based on safaris
const getDestinationProduct = (destinationName: string, safaris: any[]) => ({
  name: `${destinationName} Safari Packages`,
  description: `Explore ${destinationName} with our carefully curated safari packages. Experience incredible wildlife, stunning landscapes, and unforgettable adventures.`,
  image: safaris[0]?.image || 'https://www.berleensafaris.com/images/default-safari.jpg',
  sku: `BS-${destinationName.toUpperCase()}-2024`,
  brand: 'Berleen Safaris',
  offers: {
    price: safaris.length > 0 ? Math.min(...safaris.map(s => s.price)) : 1500,
    priceCurrency: 'USD',
    availability: 'InStock' as const,
    priceValidUntil: '2024-12-31'
  },
  aggregateRating: { ratingValue: 4.9, reviewCount: 245 }
})

// Generate video data for destination
const getDestinationVideo = (destinationName: string) => ({
  url: `https://www.berleensafaris.com/videos/${destinationName.toLowerCase().replace(/\s+/g, '-')}.mp4`,
  thumbnail: `https://www.berleensafaris.com/videos/${destinationName.toLowerCase().replace(/\s+/g, '-')}-thumb.jpg`,
  duration: 'PT3M30S'
})

export function DestinationDetail() {
  const { country } = useParams<{ country: string }>()
  const destination = country ? getDestinationById(country) : undefined

  // Match safaris by country name (case-insensitive)
  const countrySafaris = allSafaris.filter(
    s => s.country.toLowerCase() === country?.toLowerCase()
  )

  // Generate destination-specific data
  const destinationName = destination?.name || 'This Destination'
  const bestTimeToVisit = destination?.bestTimeToVisit || 'June to October (dry season)'
  const wildlife = destination?.wildlife || ['Lions', 'Elephants', 'Buffalos', 'Leopards', 'Rhinos']
  const destinationFaqs = getDestinationFaqs(destinationName, bestTimeToVisit, wildlife)
  const destinationReviews = getDestinationReviews(destinationName)
  const destinationProduct = countrySafaris.length > 0 ? getDestinationProduct(destinationName, countrySafaris) : null
  const destinationVideo = getDestinationVideo(destinationName)

  if (!destination) {
    return (
      <>
        <UltimateSEO 
          title="Destination Not Found" 
          description="The requested safari destination could not be found. Browse our available destinations in Kenya and East Africa."
          noIndex={true}
        />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Destination not found</h1>
            <Link to="/destinations" className="text-[var(--safari-gold)] hover:underline">
              View all destinations
            </Link>
          </div>
        </div>
      </>
    )
  }

  // Prepare structured data for the destination
  const destinationKeywords = `${destination.name}, ${destination.name} safari, ${destination.name} Kenya, ${destination.name} wildlife, ${destination.name} tours, ${destination.name} national park, ${destination.name} accommodation, safari ${destination.name}`

  // Calculate average rating from safaris or use default
  const avgRating = countrySafaris.reduce((acc, safari) => acc + (safari.rating || 4.5), 0) / (countrySafaris.length || 1)
  const reviewCount = countrySafaris.reduce((acc, safari) => acc + (safari.reviewCount || 0), 0) || 124

  return (
    <>
      {/* Ultimate SEO Component with ALL Features */}
      <UltimateSEO
        title={`${destination.name} | Safari Destination`}
        description={`Discover ${destination.name} - ${destination.description?.substring(0, 160)}. Book unforgettable safari packages to ${destination.name} with Berleen Safaris. Experience incredible wildlife, stunning landscapes, and expert guides.`}
        keywords={destinationKeywords}
        canonicalUrl={`/destinations/${country}`}
        
        /* Meta Images */
        ogImage={destination.image}
        ogImageWidth={1200}
        ogImageHeight={630}
        ogImageAlt={`${destination.name} landscape with wildlife - Safari destination in Kenya`}
        twitterImage={destination.image}
        
        /* Meta Video */
        ogVideo={destinationVideo.url}
        ogVideoType="video/mp4"
        ogVideoWidth={1920}
        ogVideoHeight={1080}
        ogVideoAlt={`Explore ${destination.name} - Safari highlights and wildlife encounters`}
        
        /* FAQ Schema */
        faqs={destinationFaqs}
        
        /* Review Snippets */
        reviews={destinationReviews}
        aggregateRating={{ ratingValue: avgRating, reviewCount: reviewCount, bestRating: 5, worstRating: 1 }}
        
        /* Breadcrumbs */
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Destinations', item: '/destinations' },
          { name: destination.name, item: `/destinations/${country}` }
        ]}
        
        /* Product Schema */
        product={destinationProduct || undefined}
        
        /* Merchant Listing */
        merchant={{
          name: `Berleen Safaris - ${destination.name} Tours`,
          image: destination.image,
          priceRange: '$$$',
          telephone: '+254-714-018-914',
          address: `${destination.name}, Kenya`,
          openingHours: ['Mon-Sun 24/7 for tours'],
          paymentAccepted: ['Visa', 'Mastercard', 'Bank Transfer', 'M-Pesa', 'Cash'],
          areaServed: [destination.name, 'Kenya', 'East Africa']
        }}
        
        /* Additional Meta Tags */
        ogType="website"
        twitterCard="summary_large_image"
        publishedTime="2024-01-01T00:00:00Z"
        modifiedTime={new Date().toISOString()}
        author="Berleen Safaris Travel Experts"
        locale="en_US"
      />
      
      {/* Visible Breadcrumbs */}
      <Breadcrumbs />
      
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px] lg:h-[550px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-105 animate-slowZoom"
          style={{ backgroundImage: `url(${destination.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </div>

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white max-w-3xl"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="text-6xl md:text-7xl mb-2">{destination.flag}</div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-3 py-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-semibold">{avgRating.toFixed(1)}/5 ({reviewCount}+ reviews)</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {destination.name}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
                {destination.description}
              </p>
              
              {/* Quick Info Tags */}
              <div className="flex flex-wrap gap-3 mt-6">
                <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur rounded-full px-4 py-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Kenya</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur rounded-full px-4 py-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Best: {bestTimeToVisit.split('(')[0]}</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur rounded-full px-4 py-2">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">All ages welcome</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Destination Stats & Quick Facts */}
      <section className="py-8 px-4 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--safari-gold)]">{countrySafaris.length}+</div>
              <div className="text-sm text-gray-600">Safari Packages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--safari-gold)]">95%</div>
              <div className="text-sm text-gray-600">Wildlife Sightings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--safari-gold)]">24/7</div>
              <div className="text-sm text-gray-600">Expert Support</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--safari-gold)]">⭐ 4.9</div>
              <div className="text-sm text-gray-600">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

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
            <p className="text-lg text-gray-600 max-w-3xl">
              Choose from our carefully curated safari experiences designed to showcase the best of {destination.name}'s wildlife and landscapes
            </p>
          </motion.div>

          {countrySafaris.length === 0 ? (
            <div className="text-center py-12 bg-[var(--safari-cream)] rounded-2xl">
              <div className="text-6xl mb-4">🦁</div>
              <p className="text-gray-600 mb-4">No safaris available for this destination yet.</p>
              <Link to="/contact" className="inline-flex items-center gap-2 text-[var(--safari-gold)] hover:text-[var(--safari-orange)] font-semibold transition-colors">
                Contact us for custom packages
                <ArrowRight className="w-4 h-4" />
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
                    className="group block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full transform hover:-translate-y-1"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img
                        src={safari.image}
                        alt={safari.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-gradient-to-r from-[var(--safari-gold)] to-[var(--safari-orange)] text-white px-3 py-1 rounded-full text-sm font-semibold capitalize shadow-lg">
                          {safari.category}
                        </span>
                      </div>
                      {safari.bestSeller && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            🔥 Best Seller
                          </span>
                        </div>
                      )}
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

                      {/* Rating Display */}
                      {safari.rating && (
                        <div className="mb-3">
                          <ReviewSnippet rating={safari.rating} reviewCount={safari.reviewCount || 0} size="sm" />
                        </div>
                      )}

                      {safari.highlights && safari.highlights.length > 0 && (
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

          {/* Custom Safari CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center bg-gradient-to-r from-[var(--safari-cream)] to-white p-8 rounded-2xl"
          >
            <h3 className="text-2xl font-bold text-[var(--safari-brown-dark)] mb-2">
              Don't see the perfect package?
            </h3>
            <p className="text-gray-600 mb-4">We specialize in custom itineraries tailored to your preferences</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--safari-gold)] to-[var(--safari-orange)] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Create Your Custom Safari
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Destination Highlights - Top Attractions */}
      <section className="py-20 px-4 bg-[var(--safari-cream)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--safari-brown-dark)] mb-4">
              Top Attractions in {destination.name}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl">
              Discover the must-see highlights and unique experiences that make {destination.name} a premier safari destination
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {destination.highlights && destination.highlights.map((highlight, index) => {
              const icons = ['🦁', '🐘', '🦒', '🦓', '🦏', '🐆', '🦛', '🐊', '🦩', '🌅', '🏔️', '🌿']
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
                  className="bg-white p-6 rounded-xl text-center shadow-md hover:shadow-xl transition-all hover:scale-105 group cursor-pointer"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                    {icons[index % icons.length]}
                  </div>
                  <div className="font-semibold text-[var(--safari-brown-dark)] text-sm">
                    {highlight}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Wildlife Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--safari-brown-dark)] mb-4">
              Wildlife You'll Encounter
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {destination.name} is home to an incredible diversity of African wildlife
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {['African Elephant', 'Lion', 'Leopard', 'Buffalo', 'Rhinoceros', 'Giraffe', 'Zebra', 'Cheetah', 'Hippopotamus', 'Crocodile'].map((animal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-[var(--safari-cream)] p-4 rounded-lg text-center hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-2">
                  {animal === 'African Elephant' && '🐘'}
                  {animal === 'Lion' && '🦁'}
                  {animal === 'Leopard' && '🐆'}
                  {animal === 'Buffalo' && '🦬'}
                  {animal === 'Rhinoceros' && '🦏'}
                  {animal === 'Giraffe' && '🦒'}
                  {animal === 'Zebra' && '🦓'}
                  {animal === 'Cheetah' && '🐆'}
                  {animal === 'Hippopotamus' && '🦛'}
                  {animal === 'Crocodile' && '🐊'}
                </div>
                <div className="text-sm font-semibold text-[var(--safari-brown-dark)]">{animal}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Time to Visit Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[var(--safari-cream)] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--safari-brown-dark)] mb-4">
                Best Time to Visit {destination.name}
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  The best time to visit {destination.name} is <strong className="text-[var(--safari-gold)]">{bestTimeToVisit}</strong>. 
                  During this period, you'll enjoy optimal wildlife viewing conditions with animals gathering around water sources.
                </p>
                <div className="space-y-3 mt-6">
                  <div className="flex items-start gap-3">
                    <Sun className="w-5 h-5 text-[var(--safari-gold)] mt-1" />
                    <div>
                      <strong className="text-[var(--safari-brown-dark)]">Dry Season (June-October):</strong>
                      <p className="text-sm">Best for wildlife viewing, animals congregate at water sources, less vegetation makes spotting easier</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Cloud className="w-5 h-5 text-[var(--safari-gold)] mt-1" />
                    <div>
                      <strong className="text-[var(--safari-brown-dark)]">Wet Season (November-May):</strong>
                      <p className="text-sm">Lush landscapes, fewer tourists, lower prices, excellent for bird watching and newborn animals</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >
              <h3 className="text-xl font-bold text-[var(--safari-brown-dark)] mb-4">Seasonal Highlights</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="font-semibold">January - February</span>
                  <span className="text-sm text-gray-600">Short dry season, excellent game viewing</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="font-semibold">March - May</span>
                  <span className="text-sm text-gray-600">Long rains, lush landscapes, bird watching</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="font-semibold">June - October</span>
                  <span className="text-sm text-gray-600">Peak season, best wildlife viewing</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="font-semibold">November - December</span>
                  <span className="text-sm text-gray-600">Short rains, good value, fewer crowds</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Visit Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--safari-brown-dark)] mb-4">
              Why Visit {destination.name}?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the magic of one of Africa's most spectacular safari destinations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-[var(--safari-brown-dark)] mb-2">World-Class Wildlife</h3>
              <p className="text-gray-600">Home to the Big Five and countless other species in their natural habitat</p>
            </div>
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">📸</div>
              <h3 className="text-xl font-bold text-[var(--safari-brown-dark)] mb-2">Photographer's Paradise</h3>
              <p className="text-gray-600">Stunning landscapes and incredible wildlife photo opportunities</p>
            </div>
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">🏕️</div>
              <h3 className="text-xl font-bold text-[var(--safari-brown-dark)] mb-2">Varied Accommodation</h3>
              <p className="text-gray-600">From luxury lodges to authentic tented camps, options for every budget</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection items={destinationFaqs} title={`Frequently Asked Questions About ${destination.name}`} />

      {/* Travel Tips Section */}
      <section className="py-20 px-4 bg-[var(--safari-cream)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--safari-brown-dark)] mb-4">
              Essential Travel Tips
            </h2>
            <p className="text-lg text-gray-600">Make the most of your {destination.name} safari experience</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '👕', title: 'What to Pack', tips: 'Neutral colors, layers for early mornings, comfortable walking shoes, sun hat, sunscreen, insect repellent' },
              { icon: '📷', title: 'Photography Tips', tips: 'Bring extra batteries and memory cards, use a zoom lens, be patient, respect wildlife distance' },
              { icon: '💧', title: 'Stay Hydrated', tips: 'Carry water with you, drink plenty of fluids, avoid dehydration in the African sun' },
              { icon: '🕐', title: 'Best Game Viewing', tips: 'Early morning and late afternoon are prime times when animals are most active' },
              { icon: '🔊', title: 'Listen to Your Guide', tips: 'Guides know best - follow their instructions for safety and best sightings' },
              { icon: '📱', title: 'Stay Connected', tips: 'Purchase a local SIM card for data, most lodges offer WiFi' }
            ].map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl mb-3">{tip.icon}</div>
                <h3 className="text-lg font-bold text-[var(--safari-brown-dark)] mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-600">{tip.tips}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[var(--safari-brown-dark)] to-[var(--safari-brown)] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Explore {destination.name}?
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              Book your safari today and experience the adventure of a lifetime
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-gradient-to-r from-[var(--safari-gold)] to-[var(--safari-orange)] text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105"
              >
                Plan Your Safari
              </Link>
              <Link
                to="/safaris"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[var(--safari-brown-dark)] transition-all"
              >
                View All Safaris
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}