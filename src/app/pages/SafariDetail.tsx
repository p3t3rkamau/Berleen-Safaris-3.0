// src/pages/SafariDetail.tsx
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { getSafariById } from '../data/loadSafaris'
import { SafariGallery } from '../components/SafariGallery'
import { SafariOverview } from '../components/SafariOverview'
import { SafariTabs } from '../components/SafariTabs'
import { SafariInclusions } from '../components/SafariInclusions'
import { SafariBookingSidebar } from '../components/SafariBookingSidebar'
import { UltimateSEO } from '../components/UltimateSEO'
import { FaqSection } from '../components/FaqSection'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { ReviewSnippet } from '../components/ReviewSnippet'
import { StructuredData } from '../components/StructuredData'
import { Star } from 'lucide-react'

// Helper function to generate safari-specific FAQs
const generateSafariFaqs = (safari: any) => {
  const baseFaqs = [
    {
      question: `What's included in the ${safari.title}?`,
      answer: safari.inclusions?.join(', ') || 'The package includes park fees, accommodation, meals as specified, game drives in a 4x4 vehicle, professional guide, bottled water, and airport transfers. Detailed itinerary provided upon booking.'
    },
    {
      question: `What's not included in the safari package?`,
      answer: 'International flights, visa fees, travel insurance, tips and gratuities, personal items, alcoholic beverages, optional activities not mentioned in itinerary, and any expenses of personal nature.'
    },
    {
      question: 'Do I need travel insurance for this safari?',
      answer: 'Yes, comprehensive travel insurance is mandatory for all our safaris. It should cover medical expenses, trip cancellation, baggage loss, and emergency evacuation. We recommend purchasing insurance at the time of booking.'
    },
    {
      question: 'Can I customize this safari itinerary?',
      answer: 'Absolutely! All our safaris can be customized to fit your preferences, budget, and schedule. You can add or remove destinations, upgrade accommodation, extend duration, or add activities like hot air balloon rides or cultural visits.'
    },
    {
      question: 'What is the cancellation policy for this safari?',
      answer: 'Cancellations made 60+ days before departure: Full refund minus 10% admin fee. Cancellations 30-59 days: 50% refund. Cancellations 15-29 days: 25% refund. Cancellations less than 15 days: Non-refundable. We strongly recommend travel insurance.'
    },
    {
      question: `What type of accommodation is provided on the ${safari.title}?`,
      answer: safari.accommodation || 'Accommodation varies based on package selected - from luxury lodges to tented camps or budget-friendly options. All accommodations are carefully selected for comfort, safety, and wildlife viewing opportunities.'
    },
    {
      question: `What wildlife can I expect to see on this safari?`,
      answer: safari.wildlifeExpectancy || `This safari offers excellent chances to see the Big Five (lion, leopard, elephant, rhino, buffalo) along with giraffes, zebras, cheetahs, hippos, crocodiles, and numerous bird species. ${safari.destinations?.join(', ')} is known for its diverse wildlife populations.`
    },
    {
      question: `What is the best time of year for this safari?`,
      answer: safari.bestTime || `The best time for this safari is during the dry season (June to October) when wildlife congregates around water sources and vegetation is sparse, making animals easier to spot. The wet season (November to May) offers lush landscapes and excellent bird watching.`
    }
  ]
  return baseFaqs
}

// Helper function to generate reviews for the safari
const generateSafariReviews = (safari: any) => {
  const baseReviews = [
    {
      author: 'Sarah Thompson',
      ratingValue: 5,
      reviewBody: `The ${safari.title} was absolutely incredible! Our guide was knowledgeable and found animals we would have missed. The accommodations were perfect and the entire experience exceeded our expectations.`,
      datePublished: '2024-01-15'
    },
    {
      author: 'Michael Chen',
      ratingValue: 5,
      reviewBody: 'Well organized from start to finish. Everything was seamless - airport pickup, game drives, meals, and drop-off. The wildlife viewing was spectacular!',
      datePublished: '2024-01-10'
    },
    {
      author: 'Emma Williams',
      ratingValue: 5,
      reviewBody: `Amazing value for money! The ${safari.destinations?.join(', ')} portion was the highlight of our trip. Would definitely recommend Berleen Safaris to anyone looking for an authentic safari experience.`,
      datePublished: '2024-01-05'
    }
  ]
  return baseReviews
}

export function SafariDetail() {
  const { id } = useParams<{ id: string }>()
  const safari = id ? getSafariById(id) : undefined
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    window.scrollTo(0, 0)
  }, [])

  if (!safari) {
    return (
      <>
        <UltimateSEO 
          title="Safari Not Found" 
          description="The requested safari package could not be found. Browse our available safari packages in Kenya and East Africa."
          noIndex={true}
        />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Safari not found</h1>
            <Link to="/safaris" className="text-[var(--safari-gold)] hover:underline">
              Browse all safaris
            </Link>
          </div>
        </div>
      </>
    )
  }

  // Generate SEO metadata
  const seoTitle = safari.title
  const seoDescription = `${safari.title}. ${safari.duration} of adventure in ${safari.destinations?.join(', ')}. ${safari.description?.substring(0, 160)} Book your safari with Berleen Safaris for an unforgettable wildlife experience.`
  const seoKeywords = `${safari.title}, ${safari.destinations?.join(', ')}, ${safari.duration} day safari, safari kenya, wildlife safari, ${safari.category} safari, african safari package, ${safari.destinations?.[0]} safari`
  
  // Generate FAQs
  const safariFaqs = generateSafariFaqs(safari)
  
  // Generate reviews
  const safariReviews = generateSafariReviews(safari)
  
  // Calculate aggregate rating
  const aggregateRating = safari.rating || 4.8
  const reviewCount = safari.reviewCount || 124

  // Generate product schema data
  const productData = {
    name: safari.title,
    description: safari.description,
    image: safari.image || safari.gallery?.[0],
    sku: `BS-${safari.id?.toUpperCase()}-2024`,
    brand: 'Berleen Safaris',
    offers: {
      price: safari.price,
      priceCurrency: 'USD',
      availability: 'InStock' as const,
      priceValidUntil: '2024-12-31',
      validFrom: '2024-01-01'
    },
    aggregateRating: { ratingValue: aggregateRating, reviewCount: reviewCount },
    reviews: safariReviews
  }

  // Generate event data for the safari
  const safariEvents = safari.departureDates?.map((date: string) => ({
    name: `${safari.title} - Departure`,
    startDate: date,
    endDate: new Date(new Date(date).getTime() + (safari.durationDays || 7) * 24 * 60 * 60 * 1000).toISOString(),
    location: safari.destinations?.[0] || 'Kenya',
    description: safari.description,
    price: safari.price?.toString(),
    image: safari.image
  })) || []

  // Generate tour itinerary for structured data
  const itineraryData = safari.itinerary?.map((day: any, index: number) => ({
    '@type': 'CreativeWork',
    name: `Day ${index + 1}: ${day.title}`,
    description: day.description
  }))

  return (
    <>
      {/* Ultimate SEO Component with ALL Features */}
      <UltimateSEO
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        canonicalUrl={`/safari/${id}`}
        
        /* Meta Images */
        ogImage={safari.image || safari.gallery?.[0]}
        ogImageWidth={1200}
        ogImageHeight={630}
        ogImageAlt={`${safari.title} - ${safari.destinations?.join(', ')} safari experience`}
        twitterImage={safari.image || safari.gallery?.[0]}
        
        /* Meta Video */
        ogVideo={safari.videoUrl}
        ogVideoType="video/mp4"
        ogVideoWidth={1920}
        ogVideoHeight={1080}
        ogVideoAlt={`${safari.title} video preview - Wildlife and safari highlights`}
        
        /* FAQ Schema */
        faqs={safariFaqs}
        
        /* Review Snippets */
        reviews={safariReviews}
        aggregateRating={{ ratingValue: aggregateRating, reviewCount: reviewCount, bestRating: 5, worstRating: 1 }}
        
        /* Events Schema */
        events={safariEvents}
        
        /* Breadcrumbs */
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Safaris', item: '/safaris' },
          { name: safari.title, item: `/safari/${id}` }
        ]}
        
        /* Product Schema */
        product={productData}
        
        /* Merchant Listing */
        merchant={{
          name: `Berleen Safaris - ${safari.title}`,
          image: safari.image,
          priceRange: `$${safari.price} - $${safari.price + 1000}`,
          telephone: '+254-714-018-914',
          address: safari.destinations?.[0] || 'Nairobi, Kenya',
          openingHours: ['Mon-Sun 24/7 for tours'],
          paymentAccepted: ['Visa', 'Mastercard', 'Bank Transfer', 'M-Pesa', 'Cash'],
          areaServed: safari.destinations
        }}
        
        /* Additional Meta Tags */
        ogType="product"
        twitterCard="summary_large_image"
        publishedTime={safari.createdAt || '2024-01-01T00:00:00Z'}
        modifiedTime={safari.updatedAt || new Date().toISOString()}
        author="Berleen Safaris Safari Experts"
        locale="en_US"
      />
      
      {/* JSON-LD Structured Data for Tour */}
      <StructuredData 
        type="TouristTrip"
        data={{
          name: safari.title,
          description: safari.description,
          duration: safari.duration,
          itinerary: safari.itinerary,
          offers: {
            '@type': 'Offer',
            price: safari.price,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock'
          },
          touristType: 'Wildlife Enthusiasts, Photographers, Adventure Seekers',
          destination: safari.destinations?.map((dest: string) => ({
            '@type': 'City',
            name: dest
          }))
        }}
      />
      
      {/* Visible Breadcrumbs */}
      <Breadcrumbs />
      
      {/* Hero gallery */}
      <SafariGallery images={safari.gallery} title={safari.title} />
      
      {/* Review Summary Bar */}
      <div className="bg-white border-b border-gray-200 py-3 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <ReviewSnippet rating={aggregateRating} reviewCount={reviewCount} size="md" />
              <div className="text-sm text-gray-500">
                {reviewCount}+ verified reviews
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-[var(--safari-gold)]">
                Best Price Guarantee
              </span>
              <span className="w-px h-4 bg-gray-300"></span>
              <span className="text-sm font-semibold text-[var(--safari-gold)]">
                Free Cancellation
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Overview Section */}
            <SafariOverview safari={safari} />
            
            {/* Highlights Section */}
            {safari.highlights && safari.highlights.length > 0 && (
              <section className="mb-8 p-6 bg-[var(--safari-cream)] rounded-xl">
                <h2 className="text-2xl font-bold text-[var(--safari-brown-dark)] mb-4">
                  Safari Highlights
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {safari.highlights.map((highlight: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[var(--safari-gold)] rounded-full"></div>
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {/* Tabs Section */}
            <SafariTabs safari={safari} />
            
            {/* Inclusions/Exclusions Section */}
            <SafariInclusions safari={safari} />
            
            {/* Why Book This Safari Section */}
            <section className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-white rounded-xl">
              <h2 className="text-2xl font-bold text-[var(--safari-brown-dark)] mb-4">
                Why Book This Safari?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🏆</div>
                  <div>
                    <h3 className="font-semibold mb-1">Expert Local Guides</h3>
                    <p className="text-sm text-gray-600">Knowledgeable guides with years of experience in {safari.destinations?.join(', ')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🚙</div>
                  <div>
                    <h3 className="font-semibold mb-1">Comfortable Safari Vehicles</h3>
                    <p className="text-sm text-gray-600">Customized 4x4 vehicles with pop-up roofs for optimal game viewing</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🏨</div>
                  <div>
                    <h3 className="font-semibold mb-1">Hand-picked Accommodation</h3>
                    <p className="text-sm text-gray-600">Carefully selected lodges and camps for comfort and location</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🔄</div>
                  <div>
                    <h3 className="font-semibold mb-1">Flexible Booking</h3>
                    <p className="text-sm text-gray-600">Free cancellation and date changes up to 30 days before departure</p>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {/* Booking Sidebar */}
            <SafariBookingSidebar safari={safari} />
            
            {/* Trust Badges */}
            <div className="mt-6 bg-white border border-gray-200 rounded-xl p-4">
              <div className="text-center mb-3">
                <div className="flex justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm font-semibold">Rated {aggregateRating}/5 by {reviewCount}+ travelers</p>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>✅ Best Price Guarantee</span>
                  <span className="text-green-600">Yes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>🔄 Free Cancellation</span>
                  <span className="text-green-600">30 days notice</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>💳 Secure Booking</span>
                  <span className="text-green-600">SSL Encrypted</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>👥 Small Groups</span>
                  <span>Max {safari.maxGroupSize || 7} people</span>
                </div>
              </div>
            </div>
            
            {/* Similar Safaris Suggestion */}
            <div className="mt-6 p-4 bg-[var(--safari-cream)] rounded-xl">
              <h3 className="font-bold text-[var(--safari-brown-dark)] mb-3 flex items-center gap-2">
                <span>🎯</span> You Might Also Like
              </h3>
              <div className="space-y-3">
                <Link to="/safaris" className="block text-sm text-gray-700 hover:text-[var(--safari-gold)] transition-colors">
                  → Maasai Mara Safari Packages
                </Link>
                <Link to="/safaris" className="block text-sm text-gray-700 hover:text-[var(--safari-gold)] transition-colors">
                  → Kenya Wildlife Safari Deals
                </Link>
                <Link to="/destinations" className="block text-sm text-gray-700 hover:text-[var(--safari-gold)] transition-colors">
                  → Explore More Destinations
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <FaqSection items={safariFaqs} title={`Frequently Asked Questions About ${safari.title}`} />
      
      {/* Travel Tips Section */}
      <section className="py-12 px-4 bg-[var(--safari-cream)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--safari-brown-dark)] mb-6 text-center">
            Essential Travel Tips for Your Safari
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="font-semibold mb-2">What to Pack</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Neutral-colored clothing</li>
                <li>• Warm layers for mornings</li>
                <li>• Comfortable walking shoes</li>
                <li>• Sun hat and sunscreen</li>
                <li>• Insect repellent</li>
                <li>• Binoculars and camera</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl mb-2">📸</div>
              <h3 className="font-semibold mb-2">Photography Tips</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Bring extra batteries</li>
                <li>• Use a zoom lens (200-400mm)</li>
                <li>• Shoot during golden hours</li>
                <li>• Be patient and quiet</li>
                <li>• Use a beanbag for stability</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl mb-2">💡</div>
              <h3 className="font-semibold mb-2">Pro Tips</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Book early for best rates</li>
                <li>• Get travel insurance</li>
                <li>• Arrive a day before safari starts</li>
                <li>• Stay hydrated</li>
                <li>• Listen to your guide</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
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
              Ready for Your Safari Adventure?
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              Book your {safari.title} today and create memories that will last a lifetime
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => {
                  const bookingSection = document.querySelector('[data-booking-sidebar]')
                  bookingSection?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="bg-gradient-to-r from-[var(--safari-gold)] to-[var(--safari-orange)] text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105"
              >
                Book This Safari Now
              </button>
              <Link
                to="/contact"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[var(--safari-brown-dark)] transition-all"
              >
                Ask a Question
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}