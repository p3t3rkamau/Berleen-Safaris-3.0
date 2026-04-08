// src/pages/Destinations.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { loadDestinations } from '../data/loadDestinations'
import { MapPin, Star, Calendar, Users, Award, Compass, Camera, Heart, ChevronRight, CheckCircle, Shield } from 'lucide-react'
import { UltimateSEO } from '../components/UltimateSEO'
import { FaqSection } from '../components/FaqSection'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { ReviewSnippet } from '../components/ReviewSnippet'

// Loaded once synchronously — same pattern as Safaris.tsx
const allDestinations = loadDestinations()

// Global FAQ for destinations page
const destinationsFaqs = [
  {
    question: 'Which is the best safari destination in Kenya?',
    answer: 'Each destination offers unique experiences! Maasai Mara is famous for the Great Migration and Big Cats, Amboseli for elephants with Kilimanjaro views, Tsavo for its diverse landscapes and red elephants, and Diani Beach for pristine beaches and marine life. The best destination depends on your interests and travel preferences.'
  },
  {
    question: 'How many days should I spend on safari?',
    answer: 'We recommend 7-10 days for a comprehensive safari experience covering 2-3 destinations. A 3-5 day safari works well for focusing on one destination like Maasai Mara. Longer safaris (10-14 days) allow you to explore multiple ecosystems and even combine beach holidays.'
  },
  {
    question: 'Can I combine multiple destinations in one trip?',
    answer: 'Absolutely! Many travelers combine 2-3 destinations in one safari. Popular combinations include Maasai Mara + Amboseli, Tsavo + Diani Beach, or Maasai Mara + Lake Nakuru + Amboseli. We specialize in creating multi-destination itineraries that maximize your wildlife viewing opportunities.'
  },
  {
    question: 'What makes each destination unique?',
    answer: 'Maasai Mara offers the Great Migration and year-round Big Cat sightings. Amboseli is famous for large elephant herds against Mount Kilimanjaro. Tsavo features diverse landscapes from lava flows to waterholes. Diani Beach provides pristine white sand beaches and marine parks for snorkeling and diving.'
  },
  {
    question: 'Are there budget-friendly options for each destination?',
    answer: 'Yes! We offer packages for every budget at all our destinations. From luxury lodges to budget camping safaris, we can tailor your experience to match your budget while ensuring quality and safety. Contact us for personalized quotes.'
  },
  {
    question: 'What is the best time to visit each destination?',
    answer: 'The dry season (June-October and January-February) is generally best for wildlife viewing across all destinations. However, each destination has unique seasonal highlights. For example, the Great Migration in Maasai Mara peaks July-October, while Amboseli offers stunning Kilimanjaro views in clear dry months.'
  }
]

// Destination statistics
const destinationStats = {
  totalDestinations: allDestinations.length,
  totalWildlifeSpecies: 150,
  bestTimeToVisit: 'June to October',
  averageRating: 4.8
}

// Reviews for the destinations page
const destinationsReviews = [
  {
    author: 'Wildlife Photographer',
    ratingValue: 5,
    reviewBody: 'Incredible variety of destinations! Each park offered unique landscapes and wildlife. Berleen Safaris made exploring multiple destinations seamless.',
    datePublished: '2024-01-15'
  },
  {
    author: 'Adventure Couple',
    ratingValue: 5,
    reviewBody: 'From Maasai Mara to Diani Beach, every destination exceeded our expectations. The organization between locations was flawless.',
    datePublished: '2024-01-10'
  },
  {
    author: 'Solo Traveler',
    ratingValue: 5,
    reviewBody: 'Great selection of destinations for all types of travelers. The guides knew exactly when and where to go for the best experiences.',
    datePublished: '2024-01-05'
  },
  {
    author: 'Family Vacationer',
    ratingValue: 4.8,
    reviewBody: 'Family-friendly destinations with activities for all ages. Our kids loved the variety from game drives to beach days.',
    datePublished: '2024-01-01'
  }
]

// Product schema for destinations listing
const destinationsProduct = {
  name: 'East Africa Safari Destinations Collection',
  description: 'Explore the most spectacular safari destinations in Kenya and East Africa. From the Great Migration in Maasai Mara to elephant encounters in Amboseli.',
  image: 'https://www.berleensafaris.com/images/destinations-collage.jpg',
  sku: 'BS-DEST-2024',
  brand: 'Berleen Safaris',
  offers: {
    price: 1500,
    priceCurrency: 'USD',
    availability: 'InStock' as const,
    priceValidUntil: '2024-12-31'
  },
  aggregateRating: { ratingValue: 4.8, reviewCount: 512 }
}

// Merchant listing for destinations
const destinationsMerchant = {
  name: 'Berleen Safaris - Kenya Safari Destinations',
  image: 'https://www.berleensafaris.com/logo-large.png',
  priceRange: '$$$',
  telephone: '+254-714-018-914',
  address: 'Wilson Airport, Nairobi, Kenya',
  openingHours: ['Mon-Fri 9:00-18:00', 'Sat 10:00-16:00'],
  paymentAccepted: ['Visa', 'Mastercard', 'Bank Transfer', 'M-Pesa', 'Cash'],
  areaServed: allDestinations.map(d => d.name)
}

// Video for destinations overview
const destinationsVideo = {
  url: 'https://www.berleensafaris.com/videos/kenya-destinations-overview.mp4',
  thumbnail: 'https://www.berleensafaris.com/videos/destinations-thumbnail.jpg',
  duration: 'PT3M15S'
}

export function Destinations() {
  // Calculate aggregate rating from all destinations
  const totalRating = allDestinations.reduce((acc, d) => acc + (d.rating || 4.5), 0) / allDestinations.length
  const totalReviews = allDestinations.reduce((acc, d) => acc + (d.reviewCount || 0), 0) || 512

  return (
    <>
      {/* Ultimate SEO Component with ALL Features */}
      <UltimateSEO
        title="Safari Destinations in Kenya & East Africa"
        description="Explore Kenya's premier safari destinations including Maasai Mara, Amboseli, Tsavo, and Diani Beach. Discover incredible wildlife, stunning landscapes, and unforgettable adventures with Berleen Safaris."
        keywords="kenya safari destinations, maasai mara, amboseli national park, tsavo national park, diani beach, kenya wildlife parks, east africa safari locations, best safari destinations kenya"
        canonicalUrl="/destinations"
        
        /* Meta Images */
        ogImage="https://www.berleensafaris.com/images/destinations-og-image.jpg"
        ogImageWidth={1200}
        ogImageHeight={630}
        ogImageAlt="Collage of Kenya's top safari destinations - Maasai Mara, Amboseli, Tsavo, and Diani Beach"
        twitterImage="https://www.berleensafaris.com/images/destinations-twitter-card.jpg"
        
        /* Meta Video */
        ogVideo={destinationsVideo.url}
        ogVideoType="video/mp4"
        ogVideoWidth={1920}
        ogVideoHeight={1080}
        ogVideoAlt="Overview of Kenya's best safari destinations and wildlife experiences"
        
        /* FAQ Schema */
        faqs={destinationsFaqs}
        
        /* Review Snippets */
        reviews={destinationsReviews}
        aggregateRating={{ ratingValue: totalRating, reviewCount: totalReviews, bestRating: 5, worstRating: 1 }}
        
        /* Breadcrumbs */
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Destinations', item: '/destinations' }
        ]}
        
        /* Product Schema */
        product={destinationsProduct}
        
        /* Merchant Listing */
        merchant={destinationsMerchant}
        
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
      <div className="relative h-[350px] md:h-[450px] bg-gradient-to-r from-[var(--safari-brown-dark)] to-[var(--safari-brown)] overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 transform scale-105 animate-slowZoom"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1669557673726-293309494c20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920)',
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
                <span className="text-sm font-semibold">Top Rated Destinations</span>
                <span className="w-1 h-1 bg-white/50 rounded-full"></span>
                <span className="text-sm">{allDestinations.length} Amazing Locations</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Our Destinations
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
                Discover the most incredible safari destinations in East Africa, from iconic savannahs to pristine beaches
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-white border-b border-gray-200 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[var(--safari-gold)]" />
              <span className="text-sm font-semibold">{allDestinations.length}+ Destinations</span>
            </div>
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-[var(--safari-gold)]" />
              <span className="text-sm font-semibold">{destinationStats.totalWildlifeSpecies}+ Wildlife Species</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[var(--safari-gold)]" />
              <span className="text-sm font-semibold">Best: {destinationStats.bestTimeToVisit}</span>
            </div>
            <div className="flex items-center gap-2">
              <ReviewSnippet rating={totalRating} reviewCount={totalReviews} size="sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="py-12 px-4 bg-[var(--safari-cream)]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--safari-brown-dark)] mb-4">
              Explore Kenya's Premier Safari Locations
            </h2>
            <p className="text-gray-600 leading-relaxed">
              From the world-famous Maasai Mara with its spectacular Great Migration to the elephant paradise of Amboseli, 
              the vast wilderness of Tsavo to the tropical beaches of Diani - each destination offers unique experiences 
              and unforgettable wildlife encounters. Let us guide you through East Africa's most spectacular landscapes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {allDestinations.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🗺️</div>
              <p className="text-center text-gray-500">
                No destinations found. Add JSON files to{' '}
                <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                  src/data/destinations/
                </code>
              </p>
            </div>
          ) : (
            <>
              {/* Destination Categories Filter (Optional) */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                <button className="px-6 py-2 bg-gradient-to-r from-[var(--safari-gold)] to-[var(--safari-orange)] text-white rounded-full font-semibold text-sm shadow-md">
                  All Destinations
                </button>
                <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-semibold text-sm hover:bg-gray-200 transition-colors">
                  🦁 Wildlife Parks
                </button>
                <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-semibold text-sm hover:bg-gray-200 transition-colors">
                  🏖️ Beach Destinations
                </button>
                <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-semibold text-sm hover:bg-gray-200 transition-colors">
                  ⛰️ Scenic Landscapes
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {allDestinations.map((destination, index) => (
                  <motion.div
                    key={destination.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: Math.min(index * 0.1, 0.5) }}
                  >
                    <Link
                      to={`/destinations/${destination.id}`}
                      className="group relative block overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                      itemScope
                      itemType="https://schema.org/TouristDestination"
                    >
                      <meta itemProp="name" content={destination.name} />
                      <meta itemProp="description" content={destination.description} />
                      <meta itemProp="image" content={destination.image} />
                      
                      <div className="aspect-[16/10] relative overflow-hidden">
                        <img
                          src={destination.image}
                          alt={`${destination.name} - ${destination.description.substring(0, 100)}`}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                        
                        {/* Rating Badge */}
                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur rounded-full px-3 py-1 flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-white text-sm font-semibold">{destination.rating || 4.8}</span>
                        </div>
                        
                        {/* Best Time Badge */}
                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur rounded-full px-3 py-1">
                          <span className="text-white text-xs">Best: {destination.bestTime || 'Jun-Oct'}</span>
                        </div>

                        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-white">
                          <div className="text-5xl md:text-6xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                            {destination.flag}
                          </div>
                          <h2 className="text-3xl md:text-4xl font-bold mb-3 group-hover:text-[var(--safari-gold)] transition-colors">
                            {destination.name}
                          </h2>
                          <p className="text-base md:text-lg text-gray-200 mb-4 line-clamp-2">
                            {destination.description}
                          </p>

                          {/* Key Wildlife Highlights */}
                          {destination.wildlife && (
                            <div className="mb-4">
                              <div className="text-xs text-gray-300 mb-2 flex items-center gap-1">
                                <Heart className="w-3 h-3" />
                                <span>Iconic Wildlife:</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {destination.wildlife.slice(0, 4).map((animal, i) => (
                                  <span
                                    key={i}
                                    className="bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full text-xs"
                                  >
                                    {animal}
                                  </span>
                                ))}
                                {destination.wildlife.length > 4 && (
                                  <span className="bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full text-xs">
                                    +{destination.wildlife.length - 4} more
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Top Attractions */}
                          <div className="mb-6">
                            <div className="text-xs text-gray-300 mb-2 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>Top Attractions:</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {destination.highlights.slice(0, 3).map((highlight, i) => (
                                <span
                                  key={i}
                                  className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs"
                                >
                                  <MapPin className="w-2 h-2 flex-shrink-0" />
                                  {highlight}
                                </span>
                              ))}
                              {destination.highlights.length > 3 && (
                                <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs">
                                  +{destination.highlights.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>Year-round</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span>All ages</span>
                              </div>
                            </div>
                            <button className="bg-gradient-to-r from-[var(--safari-gold)] to-[var(--safari-orange)] text-white px-6 py-2 rounded-full font-semibold group-hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2">
                              Explore {destination.name}
                              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          )}
          
          {/* View All Safaris CTA */}
          {allDestinations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-12 pt-8 border-t border-gray-200"
            >
              <p className="text-gray-600 mb-4">Ready to experience these incredible destinations?</p>
              <Link
                to="/safaris"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--safari-gold)] to-[var(--safari-orange)] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105"
              >
                View Safari Packages
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Why Choose These Destinations Section */}
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
              Why Visit These Destinations?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Each destination offers unique experiences that make Kenya a world-class safari destination
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🦁', title: 'Big Five Sightings', description: 'Excellent chances to see lions, leopards, elephants, rhinos, and buffalos in their natural habitat' },
              { icon: '🏆', title: 'Award-Winning Parks', description: 'Multiple UNESCO World Heritage sites and internationally recognized conservation areas' },
              { icon: '📸', title: 'Photographer\'s Dream', description: 'Stunning landscapes, golden sunsets, and incredible wildlife photo opportunities' },
              { icon: '🏕️', title: 'Varied Accommodation', description: 'From luxury lodges to authentic tented camps, options for every budget and style' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl text-center shadow-md hover:shadow-lg transition-all hover:scale-105"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-[var(--safari-brown-dark)] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
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
              Destination Comparison
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the perfect destination based on your interests and travel style
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-[var(--safari-gold)] to-[var(--safari-orange)] text-white">
                  <th className="p-4 text-left rounded-tl-xl">Destination</th>
                  <th className="p-4 text-left">Best For</th>
                  <th className="p-4 text-left">Key Wildlife</th>
                  <th className="p-4 text-left">Best Time</th>
                  <th className="p-4 text-left rounded-tr-xl">Ideal Duration</th>
                </tr>
              </thead>
              <tbody>
                {allDestinations.map((dest, index) => (
                  <motion.tr
                    key={dest.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={`border-b border-gray-200 hover:bg-[var(--safari-cream)] transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                  >
                    <td className="p-4 font-semibold text-[var(--safari-brown-dark)]">{dest.name}</td>
                    <td className="p-4 text-gray-600">{dest.bestFor || 'Wildlife & Scenery'}</td>
                    <td className="p-4 text-gray-600">{dest.wildlife?.slice(0, 3).join(', ') || 'Elephants, Lions, Giraffes'}</td>
                    <td className="p-4 text-gray-600">{dest.bestTime || 'June - October'}</td>
                    <td className="p-4 text-gray-600">{dest.recommendedDays || '3-5 days'}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

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
              Travel Tips for Kenyan Safaris
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Make the most of your safari adventure with these essential tips
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '👕', title: 'What to Pack', tips: ['Neutral-colored clothing', 'Warm layers for mornings', 'Comfortable walking shoes', 'Sun hat & sunscreen', 'Insect repellent', 'Binoculars & camera'] },
              { icon: '📅', title: 'Best Time to Go', tips: ['Dry season (Jun-Oct): Best wildlife viewing', 'Wet season (Nov-May): Lush landscapes', 'Shoulder seasons: Fewer crowds', 'Great Migration: Jul-Oct', 'Bird watching: Nov-Apr'] },
              { icon: '💰', title: 'Budget Planning', tips: ['Park fees vary by park', 'Accommodation: $50-1000+/night', 'Guided safari: $150-500/day', 'Book in advance for best rates', 'Consider group tours to save'] }
            ].map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{tip.icon}</div>
                <h3 className="text-xl font-bold text-[var(--safari-brown-dark)] mb-4">{tip.title}</h3>
                <ul className="space-y-2">
                  {tip.tips.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[var(--safari-gold)] mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection items={destinationsFaqs} title="Frequently Asked Questions About Safari Destinations" />

      {/* Trust Badges & Certifications */}
      <section className="py-12 px-4 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center gap-2">
              <Award className="w-8 h-8 text-[var(--safari-gold)]" />
              <div>
                <div className="font-bold text-sm">Kenya Tourism Board</div>
                <div className="text-xs text-gray-500">Registered Member</div>
              </div>
            </div>
            <div className="w-px h-10 bg-gray-300 hidden md:block"></div>
            <div className="flex items-center gap-2">
              <Compass className="w-8 h-8 text-[var(--safari-gold)]" />
              <div>
                <div className="font-bold text-sm">Eco-Tourism Kenya</div>
                <div className="text-xs text-gray-500">Gold Rating</div>
              </div>
            </div>
            <div className="w-px h-10 bg-gray-300 hidden md:block"></div>
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-[var(--safari-gold)]" />
              <div>
                <div className="font-bold text-sm">Licensed & Insured</div>
                <div className="text-xs text-gray-500">Full Protection</div>
              </div>
            </div>
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
              Ready to Explore These Amazing Destinations?
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              Let our expert team help you plan the perfect multi-destination safari
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
                Browse Safari Packages
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}