// Home.tsx (Complete Updated Version with Fixed SEO Issues)
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HeroSlider } from '../components/HeroSlider';
import { motion } from 'motion/react';
import { loadDestinations } from '../data/loadDestinations';
import { Award, Users, Headphones, MapPin, Calendar, Clock, Phone, Mail, MapPin as MapPinIcon, CreditCard, Shield, Star, Camera, Compass, Coffee, Wifi, ChevronDown } from 'lucide-react';
import { StatsBand } from '../components/StatsBand';
import QuickBookingForm from '../components/quick-booking-form';
import LiveReviewsSlider from '../components/LiveReviewsSlider';
import { supabase } from '../imports/supabase';
import { PopularCategories } from '../components/categories';
import { FeaturedSafaris } from '../components/featuredsafaris';
import { UltimateSEO } from '../components/UltimateSEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ReviewSnippet } from '../components/ReviewSnippet';

const allDestinations = loadDestinations();

const features = [
  {
    icon: Users,
    title: 'Experienced Guides',
    description: 'Professional guides with deep knowledge of East African wildlife and culture',
  },
  {
    icon: Award,
    title: 'Affordable Packages',
    description: 'Best value safaris tailored to fit your budget without compromising quality',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock assistance before, during, and after your safari',
  },
  {
    icon: MapPin,
    title: 'Custom Tours',
    description: 'Personalized itineraries designed to match your interests and schedule',
  },
];

const additionalFeatures = [
  { icon: Shield, title: 'Safe & Secure', description: 'Your safety is our top priority with fully insured packages' },
  { icon: Camera, title: 'Photo Opportunities', description: 'Prime locations for capturing incredible wildlife moments' },
  { icon: Compass, title: 'Expert Navigation', description: 'GPS-tracked vehicles with experienced drivers' },
  { icon: Coffee, title: 'Luxury Amenities', description: 'Comfortable lodges and premium camping equipment' },
];

// Comprehensive FAQ Data - Used only for UltimateSEO (not for separate FaqSection)
const homeFaqs = [
  {
    question: 'What is the best time to go on a safari in Kenya?',
    answer: 'The best time for wildlife viewing in Kenya is during the dry season from June to October and January to February. The Great Migration typically occurs between July and October in the Maasai Mara. For bird watching, November to April is ideal when migratory birds are present.'
  },
  {
    question: 'Do I need a visa for Kenya?',
    answer: 'Yes, most international visitors need a visa to enter Kenya. You can apply for an e-visa online at least 2 weeks before your trip. The cost is approximately $51 USD. Some nationalities may be eligible for visa on arrival, but it\'s recommended to get the e-visa in advance.'
  },
  {
    question: 'What vaccinations do I need for Kenya?',
    answer: 'Yellow fever vaccination is mandatory and you will need to show your certificate upon arrival. Other recommended vaccinations include Hepatitis A, Typhoid, Tetanus, and Malaria prophylaxis. Consult your doctor 4-6 weeks before travel.'
  },
  {
    question: 'What should I pack for a safari?',
    answer: 'Essential items include: neutral-colored clothing (khaki, beige, olive), comfortable walking shoes, sun hat, sunscreen (SPF 50+), insect repellent, binoculars, camera with extra batteries, warm layers for early morning game drives, and a reusable water bottle.'
  },
  {
    question: 'Are your safari packages customizable?',
    answer: 'Absolutely! All our safaris can be customized to fit your preferences, budget, and schedule. We offer private and group options, different accommodation levels, and can add or remove activities based on your interests.'
  },
  {
    question: 'What is the cancellation policy?',
    answer: 'We offer free cancellation up to 30 days before departure. Cancellations 15-29 days before incur a 25% fee, 7-14 days before incur a 50% fee, and less than 7 days before are non-refundable. We recommend travel insurance for full protection.'
  }
];

// Review Data for Snippet - With proper itemReviewed field
const homeReviews = [
  { 
    author: 'Sarah Johnson', 
    ratingValue: 5, 
    reviewBody: 'Amazing experience! The guides were knowledgeable and we saw the Big Five including lions, elephants, and rhinos. The accommodations were comfortable and the food was excellent.', 
    datePublished: '2024-01-15' 
  },
  { 
    author: 'Michael Chen', 
    ratingValue: 5, 
    reviewBody: 'Well organized safari from start to finish. Everything was perfect from airport pickup to drop-off. The vehicle was comfortable with charging ports for our cameras.', 
    datePublished: '2024-01-10' 
  },
  { 
    author: 'Emma Williams', 
    ratingValue: 4, 
    reviewBody: 'Great value for money. The Maasai Mara exceeded our expectations. Would definitely recommend Berleen Safaris to friends and family!', 
    datePublished: '2024-01-05' 
  },
  { 
    author: 'David Thompson', 
    ratingValue: 5, 
    reviewBody: 'Once in a lifetime experience! Our guide James was fantastic - he knew exactly where to find the animals. The hot air balloon ride was unforgettable.', 
    datePublished: '2023-12-28' 
  }
];

// Upcoming Events
const homeEvents = [
  { 
    name: 'Great Migration Safari Experience', 
    startDate: '2024-07-15T06:00:00', 
    endDate: '2024-10-15T20:00:00', 
    location: 'Maasai Mara National Reserve', 
    description: 'Witness the greatest wildlife spectacle on earth as millions of wildebeest and zebras cross the Mara River. Includes 5-day safari package with luxury camping.', 
    price: '2500', 
    image: 'https://www.berleensafaris.com/images/migration-event.jpg' 
  },
  { 
    name: 'Amboseli Elephant Research Safari', 
    startDate: '2024-06-01T08:00:00', 
    endDate: '2024-06-07T18:00:00', 
    location: 'Amboseli National Park', 
    description: 'Join conservation experts to study elephant families against the backdrop of Mount Kilimanjaro. Special photography workshops included.', 
    price: '1800', 
    image: 'https://www.berleensafaris.com/images/amboseli-event.jpg' 
  },
  { 
    name: 'Tsavo Conservation Week', 
    startDate: '2024-08-10T09:00:00', 
    endDate: '2024-08-17T17:00:00', 
    location: 'Tsavo East & West', 
    description: 'Participate in wildlife conservation efforts while enjoying game drives in Kenya\'s largest national park.', 
    price: '1500', 
    image: 'https://www.berleensafaris.com/images/tsavo-event.jpg' 
  }
];

// Product Schema Data - With proper itemReviewed for aggregateRating
const homeProduct = {
  name: 'Kenya Ultimate Safari Package',
  description: 'Complete safari experience package including 7-day game drives in Maasai Mara, Amboseli, and Tsavo. Includes luxury accommodation, meals, park fees, and airport transfers.',
  image: 'https://www.berleensafaris.com/images/ultimate-safari-package.jpg',
  sku: 'BS-KENYA-ULT-2024',
  brand: 'Berleen Safaris',
  offers: { 
    price: 2499, 
    priceCurrency: 'USD', 
    availability: 'InStock' as const, 
    priceValidUntil: '2024-12-31',
    validFrom: '2024-01-01'
  },
  aggregateRating: { 
    ratingValue: 4.8, 
    reviewCount: 156,
    bestRating: 5,
    itemReviewed: {
      name: 'Kenya Ultimate Safari Package',
      type: 'Product'
    },
    worstRating: 1
  }
};

// Merchant Listing Data
const homeMerchant = {
  name: 'Berleen Safaris - Premier Kenya Safari Operator',
  image: 'https://www.berleensafaris.com/logo-large.png',
  priceRange: '$$$',
  telephone: '+254-700-000-000',
  address: 'Nairobi, Kenya, Westlands, Waiyaki Way',
  openingHours: ['Mon-Fri 9:00-18:00', 'Sat 10:00-16:00', 'Sun Closed'],
  paymentAccepted: ['Visa', 'Mastercard', 'American Express', 'Bank Transfer', 'M-Pesa', 'Cash'],
  areaServed: ['Nairobi', 'Mombasa', 'Kisumu', 'Maasai Mara', 'Amboseli', 'Tsavo', 'Diani Beach', 'Lamu', 'Naivasha', 'Nakuru']
};

// Video Data
const homeVideo = {
  url: 'https://www.berleensafaris.com/videos/kenya-safari-2024-promo.mp4',
  thumbnail: 'https://www.berleensafaris.com/videos/kenya-safari-thumbnail.jpg',
  duration: 'PT3M45S'
};

// FAQ Data for visual display (not for schema - to avoid duplication)
const visualFaqs = [
  {
    question: 'What is the best time to go on a safari in Kenya?',
    answer: 'The best time for wildlife viewing in Kenya is during the dry season from June to October and January to February. The Great Migration typically occurs between July and October in the Maasai Mara.'
  },
  {
    question: 'Do I need a visa for Kenya?',
    answer: 'Yes, most international visitors need a visa to enter Kenya. You can apply for an e-visa online at least 2 weeks before your trip. The cost is approximately $51 USD.'
  },
  {
    question: 'What vaccinations do I need for Kenya?',
    answer: 'Yellow fever vaccination is mandatory. Other recommended vaccinations include Hepatitis A, Typhoid, Tetanus, and Malaria prophylaxis. Consult your doctor 4-6 weeks before travel.'
  },
  {
    question: 'What should I pack for a safari?',
    answer: 'Essential items include neutral-colored clothing, comfortable walking shoes, sun hat, sunscreen, insect repellent, binoculars, camera with extra batteries, and warm layers for early mornings.'
  },
  {
    question: 'Are your safari packages customizable?',
    answer: 'Absolutely! All our safaris can be customized to fit your preferences, budget, and schedule. Contact us to create your perfect itinerary.'
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'Free cancellation up to 30 days before departure. Cancellations 15-29 days before incur a 25% fee, 7-14 days before incur a 50% fee, and less than 7 days are non-refundable.'
  }
];

// Visual FAQ Component (without schema to avoid duplication)
const VisualFaqSection = ({ items, title }: { items: typeof visualFaqs; title: string }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-20 px-4 bg-[var(--safari-cream)]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--safari-brown-dark)] mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600">
            Find answers to common questions about safari travel
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-lg text-[var(--safari-brown-dark)]">
                  {item.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-[var(--safari-gold)] transition-transform duration-200 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`} 
                />
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <div className="text-gray-700 leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export function Home() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminStatus();
    window.scrollTo(0, 0);
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        
        if (!error && profile && profile.role === 'admin') {
          setIsAdmin(true);
        }
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  };

  const handleReviewDeleted = () => {
    console.log('Review was deleted');
  };

  return (
    <>
      {/* Ultimate SEO Component - SINGLE SOURCE OF TRUTH for all schemas */}
      <UltimateSEO
        title="Home"
        description="Experience the thrill of safari adventures in Kenya with Berleen Safaris - your gateway to unforgettable wildlife encounters and cultural experiences. Book your dream safari today with Kenya's most trusted tour operator!"
        keywords="safari kenya, maasai mara safari, kenya wildlife tours, berleen safaris, african safari packages, kenya tour operator, best safari company kenya, kenya travel agency, african safari deals, great migration kenya"
        canonicalUrl="https://berleensafaris.com"
        
        // Meta Images
        ogImage="https://www.berleensafaris.com/images/home-og-image.jpg"
        ogImageWidth={1200}
        ogImageHeight={630}
        ogImageAlt="African safari landscape with elephants at sunset in Maasai Mara, Kenya"
        twitterImage="https://www.berleensafaris.com/images/home-twitter-card.jpg"
        
        // Meta Video
        ogVideo={homeVideo.url}
        ogVideoType="video/mp4"
        ogVideoWidth={1920}
        ogVideoHeight={1080}
        ogVideoAlt="Amazing Kenya Safari Experience - Witness the Great Migration and Big Five"
        
        // FAQ Schema - Only here, not in visual component
        faqs={homeFaqs}
        
        // Review Snippets with proper itemReviewed
        reviews={homeReviews}
        aggregateRating={{ 
          ratingValue: 4.8, 
          reviewCount: 156, 
          bestRating: 5, 
          worstRating: 1,
          itemReviewed: {
            name: 'Berleen Safaris Kenya Safari Packages',
            type: 'Product'
          }
        }}
        
        // Events Schema
        events={homeEvents}
        
        // Breadcrumbs
        breadcrumbs={[
          { name: 'Home', item: '/' }
        ]}
        
        // Product Schema
        product={homeProduct}
        
        // Merchant Schema
        merchant={homeMerchant}
        
        // Additional Meta Tags
        ogType="website"
        twitterCard="summary_large_image"
        publishedTime="2024-01-01T00:00:00Z"
        modifiedTime={new Date().toISOString()}
        author="Berleen Safaris Team"
        locale="en_US"
      />
      
      {/* Visible Breadcrumbs for Users */}
      <Breadcrumbs />
      
      {/* Hero Slider */}
      <HeroSlider />
      
      {/* Quick Booking Form Section */}
      <section className="relative z-10 -mt-16 mb-8">
        <QuickBookingForm />
      </section>
      
      {/* Popular Categories */}
      <section>
        <PopularCategories />
      </section>

      {/* Featured Destinations */}
      <section className="py-20 px-4 bg-[var(--safari-cream)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--safari-brown-dark)] mb-4">
              Featured Destinations in Kenya
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore the most spectacular wildlife destinations in East Africa, from the iconic Maasai Mara to the majestic Amboseli
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={`/destinations/${destination.id}`}
                  className="group relative block overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                  aria-label={`Explore ${destination.name} - ${destination.description}`}
                >
                  <div className="aspect-[3/4] relative">
                    <img
                      src={destination.image}
                      alt={`${destination.name} - ${destination.description.substring(0, 100)}`}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="text-4xl mb-2" role="img" aria-label={`Flag of ${destination.name}`}>{destination.flag}</div>
                      <h2 className="text-2xl font-bold mb-2">{destination.name}</h2>
                      <p className="text-sm text-gray-200 mb-4 line-clamp-2">{destination.description}</p>
                      <span className="inline-block bg-gradient-to-r from-[var(--safari-gold)] to-[var(--safari-orange)] text-white px-6 py-2 rounded-full group-hover:shadow-lg transition-all duration-300 text-sm font-semibold">
                        View Tours
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Safaris Component */}
      <FeaturedSafaris />
      
      {/* Why Choose Us Section */}
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
              Why Choose Berleen Safaris
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We are committed to providing exceptional safari experiences with unmatched service and expertise
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[var(--safari-gold)] to-[var(--safari-orange)] rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[var(--safari-brown-dark)] mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                className="flex items-start gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <feature.icon className="w-6 h-6 text-[var(--safari-gold)] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-[var(--safari-brown-dark)] mb-1">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Band */}
      <section>
        <StatsBand />
      </section>

      {/* Live Reviews Slider with Review Snippet Display */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur rounded-full px-6 py-3 mb-4">
              <ReviewSnippet rating={4.8} reviewCount={156} size="lg" />
              <span className="text-white text-sm">Trusted by 5000+ travelers</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">What Our Guests Say</h2>
            <p className="text-gray-300">Real reviews from real adventurers</p>
          </div>
          
          <LiveReviewsSlider 
            isAdmin={isAdmin}
            onReviewDeleted={handleReviewDeleted}
          />
        </div>
      </section>

      {/* FAQ Section - VISUAL ONLY (no schema to avoid duplication) */}
      <VisualFaqSection items={visualFaqs} title="Frequently Asked Questions About Kenya Safaris" />

      {/* Trust Badges Section */}
      <section className="py-12 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-green-100 rounded-full p-3 mb-2">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-semibold text-gray-700">Fully Insured</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 rounded-full p-3 mb-2">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-gray-700">Secure Payments</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-purple-100 rounded-full p-3 mb-2">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm font-semibold text-gray-700">24/7 Support</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-100 rounded-full p-3 mb-2">
                <Wifi className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-sm font-semibold text-gray-700">Free WiFi</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Bar */}
      <section className="py-8 bg-[var(--safari-brown-dark)] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <span>+254 714 018 914</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              <span>tours@berleensafaris.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="w-5 h-5" />
              <span>Wilson Airport, Nairobi, Kenya</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>Mon-Sat: 8AM - 6PM</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[var(--safari-gold)] to-[var(--safari-orange)] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready for Your African Adventure?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Let us create the perfect safari experience tailored just for you
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/safaris"
                className="bg-white text-[var(--safari-brown-dark)] px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
                aria-label="Browse all safari packages"
              >
                Browse Safaris
              </Link>
              <Link
                to="/contact"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[var(--safari-brown-dark)] transition-all duration-300"
                aria-label="Contact us for safari inquiries"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}