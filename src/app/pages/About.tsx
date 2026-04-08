// About.tsx (Complete Updated Version with Full SEO Features)
import React from 'react';
import { motion } from 'motion/react';
import { Award, Users, Headphones, MapPin, Shield, Heart, Calendar, Phone, Mail, Clock, Star, Camera, Compass, Coffee, Wifi, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import { UltimateSEO } from '../components/UltimateSEO';
import { FaqSection } from '../components/FaqSection';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ReviewSnippet } from '../components/ReviewSnippet';

const features = [
  {
    icon: Users,
    title: 'Experienced Guides',
    description: 'Our professional guides have years of experience and deep knowledge of East African wildlife, culture, and landscapes.'
  },
  {
    icon: Award,
    title: 'Affordable Packages',
    description: 'We offer the best value safaris without compromising on quality, tailored to fit various budgets and preferences.'
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock assistance before, during, and after your safari ensures a worry-free adventure.'
  },
  {
    icon: MapPin,
    title: 'Custom Tours',
    description: 'Every safari is personalized to match your interests, schedule, and desired experiences across East Africa.'
  },
  {
    icon: Shield,
    title: 'Safety First',
    description: 'Your safety is our top priority with well-maintained vehicles, experienced drivers, and comprehensive insurance.'
  },
  {
    icon: Heart,
    title: 'Sustainable Tourism',
    description: 'We practice responsible tourism that benefits local communities and protects wildlife and natural habitats.'
  }
];

const team = [
  {
    name: 'Beth Nampaso',
    role: 'Founder & Lead Guide',
    image: 'https://www.berleensafaris.com/images/team/beth-nampaso.jpg',
    bio: '15+ years of safari experience across East Africa. Beth started Berleen Safaris with a vision to share Kenya\'s wildlife heritage with the world.',
    email: 'beth@berleensafaris.com',
    phone: '+254-700-000-001',
    social: { linkedin: '#', twitter: '#', instagram: '#' }
  },
  {
    name: 'James Mwangi',
    role: 'Senior Safari Guide',
    image: 'https://www.berleensafaris.com/images/team/james-mwangi.jpg',
    bio: 'Expert birder and wildlife photographer with 12 years of guiding experience. James speaks 5 languages including English, French, and German.',
    email: 'james@berleensafaris.com',
    phone: '+254-700-000-002',
    social: { linkedin: '#', twitter: '#', instagram: '#' }
  },
  {
    name: 'Sarah Kimani',
    role: 'Operations Manager',
    image: 'https://www.berleensafaris.com/images/team/sarah-kimani.jpg',
    bio: 'Ensures every safari runs smoothly from booking to drop-off. Sarah has a degree in Tourism Management and 8 years of industry experience.',
    email: 'sarah@berleensafaris.com',
    phone: '+254-700-000-003',
    social: { linkedin: '#', twitter: '#', instagram: '#' }
  },
  {
    name: 'David Omondi',
    role: 'Conservation Officer',
    image: 'https://www.berleensafaris.com/images/team/david-omondi.jpg',
    bio: 'Leads our sustainable tourism initiatives and community outreach programs. David works closely with local wildlife trusts.',
    email: 'david@berleensafaris.com',
    phone: '+254-700-000-004',
    social: { linkedin: '#', twitter: '#', instagram: '#' }
  },
  {
    name: 'Maria Santos',
    role: 'Customer Experience Manager',
    image: 'https://www.berleensafaris.com/images/team/maria-santos.jpg',
    bio: 'Ensures every guest has an unforgettable experience. Maria handles all customer inquiries and satisfaction.',
    email: 'maria@berleensafaris.com',
    phone: '+254-700-000-005',
    social: { linkedin: '#', twitter: '#', instagram: '#' }
  }
];

// Company Timeline Data
const companyTimeline = [
  { year: '2010', event: 'Berleen Safaris founded with a single safari vehicle', icon: '🚀' },
  { year: '2012', event: 'Expanded to Tanzania with Serengeti safaris', icon: '🦁' },
  { year: '2015', event: 'Added gorilla trekking in Rwanda and Uganda', icon: '🦍' },
  { year: '2018', event: 'Received Kenya Tourism Board Excellence Award', icon: '🏆' },
  { year: '2020', event: 'Launched sustainable tourism initiative', icon: '🌱' },
  { year: '2024', event: 'Served over 10,000 happy travelers', icon: '✨' }
];

// FAQ Data for About Page
const aboutFaqs = [
  {
    question: 'What makes Berleen Safaris different from other tour operators?',
    answer: 'Berleen Safaris stands out through our personalized approach, experienced local guides, commitment to sustainable tourism, and competitive pricing. We focus on creating authentic experiences rather than mass tourism, ensuring each guest receives individual attention and customized itineraries.'
  },
  {
    question: 'Are your guides certified and experienced?',
    answer: 'Yes! All our guides are certified by the Kenya Professional Safari Guides Association (KPSGA) with levels ranging from Silver to Gold. They undergo continuous training in wildlife conservation, first aid, and customer service. Most guides have 8+ years of experience.'
  },
  {
    question: 'What safety measures do you have in place?',
    answer: 'We maintain a fleet of well-maintained safari vehicles with regular safety inspections, provide first-aid trained guides, offer 24/7 emergency support, carry comprehensive insurance, and follow all government safety regulations. We also provide safety briefings before every safari.'
  },
  {
    question: 'How does Berleen Safaris support conservation?',
    answer: 'We donate 5% of profits to local conservation initiatives, support anti-poaching efforts, employ local guides, use eco-friendly lodges, practice Leave No Trace principles, and educate guests about wildlife protection. We\'re partners with the Kenya Wildlife Service and several conservation trusts.'
  },
  {
    question: 'Can I customize my safari itinerary?',
    answer: 'Absolutely! All our safaris are fully customizable. You can choose your destinations, accommodation level, duration, activities, and group size. We work with you to create the perfect safari that matches your budget, interests, and schedule.'
  },
  {
    question: 'What languages do your guides speak?',
    answer: 'Our guides speak multiple languages including English, French, German, Spanish, Italian, Chinese, and Japanese. Please let us know your language preference when booking so we can assign the appropriate guide.'
  }
];

// Review Data
const companyReviews = [
  {
    author: 'John Anderson',
    ratingValue: 5,
    reviewBody: 'Absolutely incredible experience with Berleen Safaris! From the booking process to the game drives, everything was perfect. Our guide James was knowledgeable and found animals we would have missed.',
    datePublished: '2024-01-20'
  },
  {
    author: 'Lisa Wong',
    ratingValue: 5,
    reviewBody: 'The team at Berleen Safaris went above and beyond to make our honeymoon special. They arranged a private bush dinner and even surprised us with a cake! Highly recommend.',
    datePublished: '2024-01-15'
  },
  {
    author: 'Robert Martinez',
    ratingValue: 5,
    reviewBody: 'Professional, reliable, and knowledgeable. We saw the Big Five in just 3 days! The vehicle was comfortable with charging ports and Wi-Fi. Will book again.',
    datePublished: '2024-01-10'
  },
  {
    author: 'Emma Thompson',
    ratingValue: 4,
    reviewBody: 'Great value for money. The organization was flawless and the guides were passionate about wildlife. The lodges chosen were excellent.',
    datePublished: '2024-01-05'
  },
  {
    author: 'Michael Brown',
    ratingValue: 5,
    reviewBody: 'Best safari company in East Africa! The attention to detail and customer care is outstanding. Our gorilla trekking experience in Rwanda was life-changing.',
    datePublished: '2023-12-28'
  }
];

// Upcoming Events (Company related)
const companyEvents = [
  {
    name: 'Annual Wildlife Photography Workshop',
    startDate: '2024-06-15T09:00:00',
    endDate: '2024-06-21T18:00:00',
    location: 'Maasai Mara National Reserve',
    description: 'Join professional wildlife photographers for a 7-day workshop capturing the Great Migration. Includes expert guidance, editing sessions, and prime photography locations.',
    price: '3500',
    image: 'https://www.berleensafaris.com/images/events/photography-workshop.jpg'
  },
  {
    name: 'Conservation Safari Week',
    startDate: '2024-08-10T08:00:00',
    endDate: '2024-08-17T17:00:00',
    location: 'Amboseli & Tsavo',
    description: 'Participate in conservation activities including elephant tracking, tree planting, and community visits. Perfect for eco-conscious travelers.',
    price: '2800',
    image: 'https://www.berleensafaris.com/images/events/conservation-week.jpg'
  }
];

// Product Schema (Company Services)
const companyProduct = {
  name: 'Premium East Africa Safari Packages',
  description: 'Complete safari experiences across Kenya, Tanzania, Rwanda, and Uganda. Includes luxury accommodation, expert guides, game drives, and cultural experiences.',
  image: 'https://www.berleensafaris.com/images/safari-packages.jpg',
  sku: 'BS-PREMIUM-2024',
  brand: 'Berleen Safaris',
  offers: {
    price: 2499,
    priceCurrency: 'USD',
    availability: 'InStock' as const,
    priceValidUntil: '2024-12-31',
    validFrom: '2024-01-01'
  },
  aggregateRating: { ratingValue: 4.9, reviewCount: 245 }
};

// Merchant Listing (Detailed)
const companyMerchant = {
  name: 'Berleen Safaris Ltd - Premier Safari Operator',
  image: 'https://www.berleensafaris.com/logo-large.png',
  priceRange: '$$$',
  telephone: '+254-700-000-000',
  address: 'Westlands Business Park, 3rd Floor, Nairobi, Kenya',
  openingHours: ['Mon-Fri 9:00-18:00', 'Sat 10:00-16:00', 'Sun: By Appointment'],
  paymentAccepted: ['Visa', 'Mastercard', 'American Express', 'Bank Transfer', 'M-Pesa', 'PayPal', 'Cryptocurrency'],
  areaServed: ['Kenya', 'Tanzania', 'Uganda', 'Rwanda', 'Burundi', 'South Sudan']
};

// Video Data
const companyVideo = {
  url: 'https://www.berleensafaris.com/videos/about-berleen-safaris.mp4',
  thumbnail: 'https://www.berleensafaris.com/videos/about-thumbnail.jpg',
  duration: 'PT4M30S'
};

export function About() {
  return (
    <>
      {/* Ultimate SEO Component with ALL Features */}
      <UltimateSEO
        title="About Us"
        description="Learn about Berleen Safaris - Kenya's premier safari operator since 2010. Discover our story, meet our expert team, and understand our commitment to exceptional wildlife experiences and sustainable tourism in East Africa."
        keywords="about berleen safaris, kenya safari company, african safari operator, sustainable tourism kenya, east africa travel agency, best safari company, berleen safaris history, kenya tour operator"
        canonicalUrl="/about"
        
        /* Meta Images */
        ogImage="https://www.berleensafaris.com/images/about-og-image.jpg"
        ogImageWidth={1200}
        ogImageHeight={630}
        ogImageAlt="Berleen Safaris team and safari vehicles in the Maasai Mara - Professional safari guides with guests"
        twitterImage="https://www.berleensafaris.com/images/about-twitter-card.jpg"
        
        /* Meta Video */
        ogVideo={companyVideo.url}
        ogVideoType="video/mp4"
        ogVideoWidth={1920}
        ogVideoHeight={1080}
        ogVideoAlt="Meet the Berleen Safaris team and see our safari operations in action"
        
        /* FAQ Schema */
        faqs={aboutFaqs}
        
        /* Review Snippets */
        reviews={companyReviews}
        aggregateRating={{ ratingValue: 4.9, reviewCount: 245, bestRating: 5, worstRating: 1 }}
        
        /* Events Schema */
        events={companyEvents}
        
        /* Breadcrumbs */
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'About', item: '/about' }
        ]}
        
        /* Product Schema */
        product={companyProduct}
        
        /* Merchant Listing */
        merchant={companyMerchant}
        
        /* Additional Meta Tags */
        ogType="website"
        twitterCard="summary_large_image"
        publishedTime="2010-01-01T00:00:00Z"
        modifiedTime={new Date().toISOString()}
        author="Berleen Safaris Team"
        locale="en_US"
      />
      
      {/* Visible Breadcrumbs */}
      <Breadcrumbs />
      
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transform scale-105"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1738508041350-03453c14811c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZhcmklMjBqZWVwJTIwYWZyaWNhfGVufDF8fHx8MTc3MjM1MDA5OXww&ixlib=rb-4.1.0&q=80&w=1080)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        </div>
        
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
                <span className="text-sm font-semibold">Trusted Since 2010</span>
                <span className="w-1 h-1 bg-white/50 rounded-full mx-1"></span>
                <span className="text-sm">10,000+ Happy Travelers</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                About Berleen Safaris
              </h1>
              <p className="text-xl md:text-2xl text-gray-200">
                Creating unforgettable safari experiences with passion, expertise, and a commitment to excellence
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Company Story with Stats */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--safari-brown-dark)] mb-6">
                Our Story
              </h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p>
                  Berleen Safaris Ltd. was founded in 2010 by Beth Nampaso, a passionate wildlife enthusiast and 
                  experienced safari guide. What started as a small operation with a single safari vehicle has grown 
                  into one of East Africa's most trusted safari companies.
                </p>
                <p>
                  Our journey began with a simple mission: to share the incredible beauty and wildlife of East Africa 
                  with travelers from around the world while ensuring that tourism benefits local communities and 
                  supports conservation efforts.
                </p>
                <p>
                  Today, we're proud to operate across Kenya, Tanzania, Rwanda, and Uganda, offering everything from 
                  luxury lodge safaris to budget camping adventures. Our team of 50+ dedicated professionals includes 
                  expert guides, conservationists, and travel specialists who share a common passion for creating 
                  extraordinary safari experiences.
                </p>
                <p>
                  We've helped over 10,000 travelers witness the Great Migration, track mountain gorillas, climb 
                  Mount Kilimanjaro, and explore the diverse landscapes of East Africa. Our commitment to excellence, 
                  safety, and customer satisfaction remains at the heart of everything we do.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-gradient-to-br from-[var(--safari-gold)] to-[var(--safari-orange)] text-white p-6 rounded-xl text-center">
                <div className="text-4xl font-bold mb-2">15+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
              <div className="bg-[var(--safari-brown-dark)] text-white p-6 rounded-xl text-center">
                <div className="text-4xl font-bold mb-2">10K+</div>
                <div className="text-sm">Happy Travelers</div>
              </div>
              <div className="bg-[var(--safari-brown-dark)] text-white p-6 rounded-xl text-center">
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-sm">Expert Team Members</div>
              </div>
              <div className="bg-gradient-to-br from-[var(--safari-gold)] to-[var(--safari-orange)] text-white p-6 rounded-xl text-center">
                <div className="text-4xl font-bold mb-2">4</div>
                <div className="text-sm">East African Countries</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
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
              Our Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Milestones that shaped Berleen Safaris into what we are today
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-[var(--safari-gold)] to-[var(--safari-orange)] h-full"></div>
            <div className="space-y-12">
              {companyTimeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'pl-8'}`}>
                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="text-4xl mb-3">{item.icon}</div>
                      <div className="text-2xl font-bold text-[var(--safari-gold)] mb-2">{item.year}</div>
                      <p className="text-gray-700">{item.event}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[var(--safari-gold)] rounded-full border-4 border-white mt-6"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-[var(--safari-cream)] to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[var(--safari-gold)] to-[var(--safari-orange)] rounded-full flex items-center justify-center mb-6">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--safari-brown-dark)] mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To provide exceptional, authentic safari experiences that exceed our clients' expectations while 
                promoting wildlife conservation, supporting local communities, and preserving East Africa's natural 
                heritage for future generations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-[var(--safari-cream)] to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[var(--safari-gold)] to-[var(--safari-orange)] rounded-full flex items-center justify-center mb-6">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--safari-brown-dark)] mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To be East Africa's leading sustainable safari company, recognized globally for delivering 
                transformative travel experiences that create lasting connections between people, wildlife, 
                and nature while setting new standards in responsible tourism.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
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
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Excellence', description: 'We strive for excellence in every aspect of our service, from planning to execution.', icon: '🏆' },
              { title: 'Integrity', description: 'We operate with honesty, transparency, and ethical business practices.', icon: '🤝' },
              { title: 'Sustainability', description: 'We protect wildlife and environments while benefiting local communities.', icon: '🌍' },
              { title: 'Safety', description: 'Your safety is our highest priority, with rigorous standards and protocols.', icon: '🛡️' },
              { title: 'Innovation', description: 'We continuously improve and innovate our safari experiences.', icon: '💡' },
              { title: 'Passion', description: 'Our love for wildlife and East Africa drives everything we do.', icon: '❤️' }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-[var(--safari-brown-dark)] mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
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
              We go above and beyond to ensure your safari is unforgettable
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[var(--safari-cream)] p-6 rounded-xl hover:shadow-lg transition-all hover:scale-105"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[var(--safari-gold)] to-[var(--safari-orange)] rounded-full mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[var(--safari-brown-dark)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet The Team with Schema */}
      <section className="py-20 px-4 bg-gradient-to-b from-[var(--safari-cream)] to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--safari-brown-dark)] mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Passionate professionals dedicated to creating your perfect safari experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-105 group"
                itemScope
                itemType="https://schema.org/Person"
              >
                <div className="relative overflow-hidden h-72">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    itemProp="image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[var(--safari-brown-dark)] mb-1" itemProp="name">
                    {member.name}
                  </h3>
                  <p className="text-[var(--safari-gold)] font-semibold mb-3" itemProp="jobTitle">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm mb-4" itemProp="description">
                    {member.bio}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Mail className="w-4 h-4" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex gap-3">
                    <a href={member.social.linkedin} className="text-gray-500 hover:text-[var(--safari-gold)] transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href={member.social.twitter} className="text-gray-500 hover:text-[var(--safari-gold)] transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href={member.social.instagram} className="text-gray-500 hover:text-[var(--safari-gold)] transition-colors">
                      <Instagram className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Partnerships */}
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
              Certifications & Partnerships
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Proudly recognized by leading tourism organizations
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: 'Licensed Tour Operator', icon: '📜' },
              { name: 'Kenya Tourism Board', icon: '🇰🇪' },
              { name: 'Tanzania Tourism Board', icon: '🇹🇿' },
              { name: 'Rwanda Development Board', icon: '🇷🇼' },
              { name: 'Uganda Tourism Board', icon: '🇺🇬' },
              { name: 'Wildlife Conservation Partner', icon: '🦏' },
              { name: 'Eco-Tourism Kenya', icon: '🌿' },
              { name: 'KPSGA Member', icon: '🏅' }
            ].map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="bg-[var(--safari-cream)] p-6 rounded-xl text-center hover:shadow-lg transition-all hover:scale-105"
              >
                <div className="text-4xl mb-3">{cert.icon}</div>
                <p className="font-semibold text-[var(--safari-brown-dark)]">{cert.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges & Review Summary */}
      <section className="py-12 bg-gradient-to-r from-[var(--safari-gold)] to-[var(--safari-orange)] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">Trustpilot</div>
              <ReviewSnippet rating={4.9} reviewCount={245} size="lg" />
            </div>
            <div className="w-px h-12 bg-white/30 hidden md:block"></div>
            <div className="text-center">
              <div className="flex items-center gap-2">
                <Shield className="w-8 h-8" />
                <span className="font-semibold">100% Safe & Secure</span>
              </div>
            </div>
            <div className="w-px h-12 bg-white/30 hidden md:block"></div>
            <div className="text-center">
              <div className="flex items-center gap-2">
                <Heart className="w-8 h-8" />
                <span className="font-semibold">5% to Conservation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection items={aboutFaqs} title="Frequently Asked Questions About Berleen Safaris" />

      {/* Contact CTA */}
      <section className="py-20 px-4 bg-[var(--safari-brown-dark)] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Safari Adventure?
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              Let our expert team help you plan the perfect safari experience
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/contact"
                className="bg-gradient-to-r from-[var(--safari-gold)] to-[var(--safari-orange)] text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105 inline-block"
              >
                Contact Our Team
              </a>
              <a
                href="/safaris"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[var(--safari-brown-dark)] transition-all"
              >
                Browse Safaris
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}