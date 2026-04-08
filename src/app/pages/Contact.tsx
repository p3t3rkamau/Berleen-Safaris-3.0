// Contact.tsx (Complete Updated Version with Full SEO Features)
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Send, MessageCircle, Clock, Star, Shield, Award, Users, Calendar, CheckCircle } from 'lucide-react';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { UltimateSEO } from '../components/UltimateSEO';
import { FaqSection } from '../components/FaqSection';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ReviewSnippet } from '../components/ReviewSnippet';

const faqs = [
  {
    question: 'What is the best time to visit for a safari?',
    answer: 'The best time depends on your destination and interests. For the Great Migration in Kenya and Tanzania, July to October is ideal. For gorilla trekking in Rwanda and Uganda, the dry seasons (June-September and December-February) are recommended. However, safaris are available year-round, each season offering unique experiences.'
  },
  {
    question: 'Do I need a visa to visit East Africa?',
    answer: 'Most visitors require a visa to enter Kenya, Tanzania, Rwanda, and Uganda. Many nationalities can obtain an e-visa online before travel or a visa on arrival. We recommend checking with the respective embassy or consulate for your specific country\'s requirements. We can provide guidance on visa applications.'
  },
  {
    question: 'What vaccinations do I need?',
    answer: 'Yellow fever vaccination is mandatory for most East African countries. Other recommended vaccinations include Hepatitis A and B, Typhoid, and Tetanus. Malaria prophylaxis is also recommended for most safari destinations. Please consult your doctor or travel clinic at least 6 weeks before your trip.'
  },
  {
    question: 'What should I pack for a safari?',
    answer: 'Pack lightweight, neutral-colored clothing (khaki, beige, olive), a hat, sunglasses, sunscreen, insect repellent, comfortable walking shoes, and a light jacket for early morning game drives. Don\'t forget your camera with extra batteries and memory cards! We\'ll send you a detailed packing list upon booking.'
  },
  {
    question: 'Are safaris safe?',
    answer: 'Yes, safaris are very safe when conducted by experienced guides and reputable operators like us. All our guides are trained professionals who prioritize your safety. We use well-maintained 4x4 vehicles and follow strict safety protocols during wildlife viewing.'
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'Cancellations made 60+ days before departure receive a full refund minus a 10% administrative fee. Cancellations 30-59 days before receive a 50% refund. Cancellations less than 30 days before departure are non-refundable. We strongly recommend purchasing travel insurance to protect your investment.'
  },
  {
    question: 'How do I book a safari with Berleen Safaris?',
    answer: 'You can book directly through our website contact form, call us, or send an email. Our team will respond within 24 hours to discuss your preferences, provide a customized itinerary, and guide you through the booking process. A deposit of 30% is required to confirm your booking.'
  },
  {
    question: 'Do you offer group discounts?',
    answer: 'Yes! We offer special rates for groups of 4 or more travelers. Group discounts range from 10-20% depending on group size and safari package. Contact us for a customized quote for your group.'
  }
];

// Contact Reviews Data
const contactReviews = [
  {
    author: 'Emily Watson',
    ratingValue: 5,
    reviewBody: 'The team at Berleen Safaris was incredibly responsive and helpful. They answered all my questions promptly and helped create the perfect itinerary for our family.',
    datePublished: '2024-01-20'
  },
  {
    author: 'David Kim',
    ratingValue: 5,
    reviewBody: 'Excellent customer service! They went above and beyond to accommodate our last-minute changes. Very professional and knowledgeable.',
    datePublished: '2024-01-15'
  },
  {
    author: 'Sophie Martin',
    ratingValue: 5,
    reviewBody: 'Fast response times and very detailed information. They made planning our safari so easy. Highly recommend their services!',
    datePublished: '2024-01-10'
  }
];

// Contact Form Schema
const contactProduct = {
  name: 'Custom Safari Planning & Consultation Service',
  description: 'Professional safari planning and consultation services for East African adventures. Get personalized itinerary planning, expert advice, and booking assistance.',
  image: 'https://www.berleensafaris.com/images/contact-service.jpg',
  sku: 'BS-CONSULT-2024',
  brand: 'Berleen Safaris',
  offers: {
    price: 0,
    priceCurrency: 'USD',
    availability: 'InStock' as const,
    priceValidUntil: '2024-12-31'
  },
  aggregateRating: { ratingValue: 4.9, reviewCount: 187 }
};

// Contact Merchant Schema
const contactMerchant = {
  name: 'Berleen Safaris - Nairobi Office',
  image: 'https://www.berleensafaris.com/logo-large.png',
  priceRange: '$$$',
  telephone: '+254-714-018-914',
  address: 'Wilson Airport, Nairobi, Kenya',
  openingHours: ['Mon-Fri 8:00-18:00', 'Sat 9:00-16:00'],
  paymentAccepted: ['Visa', 'Mastercard', 'Bank Transfer', 'M-Pesa', 'Cash'],
  areaServed: ['Kenya', 'Tanzania', 'Uganda', 'Rwanda', 'Worldwide']
};

// Contact Video
const contactVideo = {
  url: 'https://www.berleensafaris.com/videos/contact-berleen-safaris.mp4',
  thumbnail: 'https://www.berleensafaris.com/videos/contact-thumbnail.jpg',
  duration: 'PT2M30S'
};

export function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    destination: '',
    travelers: '',
    travelDates: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    // Simulate form submission - Replace with actual API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        destination: '',
        travelers: '',
        travelDates: '',
        message: ''
      });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const phoneNumber = '254714018914';
    const message = encodeURIComponent('Hello! I\'m interested in planning a safari with Berleen Safaris. Could you please help me with more information?');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <>
      {/* Ultimate SEO Component with ALL Features */}
      <UltimateSEO
        title="Contact Us"
        description="Contact Berleen Safaris to start planning your dream African safari. Get expert advice, custom itineraries, and instant responses to your safari questions. Call, email, or WhatsApp us today!"
        keywords="contact berleen safaris, safari inquiry, kenya safari booking, african safari planner, east africa tours, custom safari packages, safari consultation, berleen safaris contact"
        canonicalUrl="/contact"
        
        /* Meta Images */
        ogImage="https://www.berleensafaris.com/images/contact-og-image.jpg"
        ogImageWidth={1200}
        ogImageHeight={630}
        ogImageAlt="Contact Berleen Safaris - Safari planning team at work in Nairobi office"
        twitterImage="https://www.berleensafaris.com/images/contact-twitter-card.jpg"
        
        /* Meta Video */
        ogVideo={contactVideo.url}
        ogVideoType="video/mp4"
        ogVideoWidth={1920}
        ogVideoHeight={1080}
        ogVideoAlt="How to book your safari with Berleen Safaris - Step by step guide"
        
        /* FAQ Schema */
        faqs={faqs}
        
        /* Review Snippets */
        reviews={contactReviews}
        aggregateRating={{ ratingValue: 4.9, reviewCount: 187, bestRating: 5, worstRating: 1 }}
        
        /* Breadcrumbs */
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Contact', item: '/contact' }
        ]}
        
        /* Product Schema */
        product={contactProduct}
        
        /* Merchant Listing */
        merchant={contactMerchant}
        
        /* Additional Meta Tags */
        ogType="website"
        twitterCard="summary_large_image"
        publishedTime="2024-01-01T00:00:00Z"
        modifiedTime={new Date().toISOString()}
        author="Berleen Safaris Customer Support"
        locale="en_US"
      />
      
      {/* Visible Breadcrumbs */}
      <Breadcrumbs />
      
      {/* Hero Section */}
      <div className="relative h-[350px] md:h-[450px] bg-gradient-to-r from-[var(--safari-brown-dark)] to-[var(--safari-brown)] overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1669557673726-293309494c20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZW55YSUyMHNhZmFyaSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NzIzMTQ0MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          animation: 'slowZoom 20s infinite'
        }}></div>
        
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-4 py-2 mb-6">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-semibold">Rated 4.9/5 by 187+ travelers</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Contact Us
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
                Let's start planning your dream safari adventure today
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Quick Response Time Banner */}
      <div className="bg-gradient-to-r from-[var(--safari-gold)] to-[var(--safari-orange)] text-white py-3">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-semibold animate-pulse">
            ⚡ Average response time: Under 2 hours during business hours
          </p>
        </div>
      </div>

      {/* Contact Form & Info */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-[var(--safari-cream)] p-8 rounded-2xl shadow-lg"
              >
                <h2 className="text-3xl font-bold text-[var(--safari-brown-dark)] mb-6">
                  Send Us a Message
                </h2>
                
                {/* Success Message */}
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Thank you! Your message has been sent. We'll get back to you within 24 hours.</span>
                  </div>
                )}
                
                {/* Error Message */}
                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
                    <span>Sorry, there was an error. Please try again or call us directly.</span>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--safari-gold)] transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--safari-gold)] transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--safari-gold)] transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--safari-gold)] transition-all"
                        placeholder="+1 234 567 890"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Destination
                      </label>
                      <select 
                        title="Select destination"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--safari-gold)] transition-all"
                      >
                        <option value="">Select destination</option>
                        <option value="kenya">Kenya</option>
                        <option value="tanzania">Tanzania</option>
                        <option value="rwanda">Rwanda</option>
                        <option value="uganda">Uganda</option>
                        <option value="multi">Multiple Countries</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Number of Travelers
                      </label>
                      <select 
                        title="Select number of travelers"
                        name="travelers"
                        value={formData.travelers}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--safari-gold)] transition-all"
                      >
                        <option value="">Select number</option>
                        <option value="1">1 Person</option>
                        <option value="2">2 Persons</option>
                        <option value="3-5">3-5 Persons</option>
                        <option value="6-10">6-10 Persons</option>
                        <option value="10+">10+ Persons</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Travel Dates
                    </label>
                    <input
                      type="text"
                      name="travelDates"
                      value={formData.travelDates}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--safari-gold)] transition-all"
                      placeholder="e.g., July 2026"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      rows={6}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--safari-gold)] transition-all"
                      placeholder="Tell us about your dream safari - destinations you'd like to visit, wildlife you want to see, budget, special occasions, etc..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto bg-gradient-to-r from-[var(--safari-gold)] to-[var(--safari-orange)] text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center mt-4">
                    By submitting this form, you agree to our privacy policy. We'll never share your information.
                  </p>
                </form>
              </motion.div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-[var(--safari-brown-dark)] text-white p-6 rounded-xl shadow-lg"
                itemScope
                itemType="https://schema.org/LocalBusiness"
              >
                <meta itemProp="name" content="Berleen Safaris" />
                <meta itemProp="priceRange" content="$$$" />
                <meta itemProp="telephone" content="+254714018914" />
                
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 bg-[var(--safari-gold)] rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Phone / WhatsApp</div>
                      <a href="tel:+254714018914" className="text-gray-300 hover:text-[var(--safari-gold)] transition-colors" itemProp="telephone">
                        +254 714 018 914
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 bg-[var(--safari-gold)] rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Email</div>
                      <a href="mailto:tours@berleensafaris.com" className="text-gray-300 hover:text-[var(--safari-gold)] transition-colors" itemProp="email">
                        tours@berleensafaris.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 bg-[var(--safari-gold)] rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Office Location</div>
                      <p className="text-gray-300" itemProp="address">
                        Wilson Airport<br />
                        Nairobi, Kenya
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 bg-[var(--safari-gold)] rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Business Hours</div>
                      <p className="text-gray-300" itemProp="openingHours">
                        Monday - Friday: 8:00 AM - 6:00 PM<br />
                        Saturday: 9:00 AM - 4:00 PM<br />
                        Sunday: Closed (Emergency support available)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-[var(--safari-gold)]" />
                    <span>Licensed & Insured</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm mt-2">
                    <Award className="w-4 h-4 text-[var(--safari-gold)]" />
                    <span>Kenya Tourism Board Member</span>
                  </div>
                </div>
              </motion.div>

              {/* WhatsApp Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                onClick={handleWhatsApp}
                className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-white rounded-full p-2 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold">WhatsApp Us</h3>
                </div>
                <p className="text-sm text-green-100 mb-4">
                  Get instant responses to your safari questions. Our team is ready to help!
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">Click to start chat →</span>
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <Send className="w-4 h-4 text-green-600" />
                  </div>
                </div>
              </motion.div>

              {/* Response Time Promise */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-blue-50 p-6 rounded-xl border border-blue-200"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <h3 className="font-bold text-blue-900">Quick Response Promise</h3>
                </div>
                <p className="text-sm text-blue-800 mb-3">
                  We understand your time is valuable. Our team aims to respond to all inquiries within:
                </p>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>📧 Email: Within 4 hours</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>💬 WhatsApp: Within 1 hour</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>📞 Phone: Immediate (during hours)</span>
                  </li>
                </ul>
              </motion.div>

              {/* Review Summary */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
              >
                <h3 className="font-bold text-[var(--safari-brown-dark)] mb-3">Customer Satisfaction</h3>
                <ReviewSnippet rating={4.9} reviewCount={187} size="lg" />
                <div className="mt-3 flex items-center gap-1 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>10,000+ happy travelers served</span>
                </div>
                <div className="mt-2 flex items-center gap-1 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>15+ years of excellence</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section with Schema */}
      <FaqSection items={faqs} title="Frequently Asked Questions About Safari Travel" />

      {/* Map Section */}
      <section className="py-20 px-4 bg-[var(--safari-cream)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--safari-brown-dark)] mb-4 text-center">
              Visit Our Office
            </h2>
            <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl mx-auto">
              Located at Wilson Airport, Nairobi - Convenient for meeting before or after your safari
            </p>
            
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="h-[400px] bg-gray-200 relative">
                {/* Embedded Google Map - Replace with your actual map embed code */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.847953284309!2d36.815872!3d-1.286389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d5c5f5b5f5%3A0x8b5b5b5b5b5b5b5b!2sWilson%20Airport!5e0!3m2!1sen!2ske!4v1234567890!5m2!1sen!2ske"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Berleen Safaris Office Location"
                ></iframe>
                
                {/* Map Overlay Info */}
                <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 max-w-xs">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 text-[var(--safari-gold)] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Berleen Safaris Office</p>
                      <p className="text-xs text-gray-600">Wilson Airport, Nairobi, Kenya</p>
                      <p className="text-xs text-gray-500 mt-1">📞 +254 714 018 914</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Directions */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🚗</div>
                <p className="font-semibold">By Car</p>
                <p className="text-sm text-gray-600">15 min from Nairobi CBD, ample parking available</p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🚕</div>
                <p className="font-semibold">Taxi / Uber</p>
                <p className="text-sm text-gray-600">Available 24/7, approximately $10-15 from city center</p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🚌</div>
                <p className="font-semibold">Public Transport</p>
                <p className="text-sm text-gray-600">Matatus from city center to Wilson Airport regularly</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4 bg-gradient-to-r from-[var(--safari-brown-dark)] to-[var(--safari-brown)] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Subscribe to Safari Updates
            </h3>
            <p className="text-gray-300 mb-6">
              Get exclusive offers, travel tips, and wildlife news delivered to your inbox
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--safari-gold)]"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-[var(--safari-gold)] to-[var(--safari-orange)] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-4">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}