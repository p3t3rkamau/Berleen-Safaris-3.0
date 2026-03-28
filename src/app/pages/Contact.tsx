import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Send, MessageCircle, Clock } from 'lucide-react';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

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
  }
];

export function Contact() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] bg-gradient-to-r from-[var(--safari-brown-dark)] to-[var(--safari-brown)]">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1669557673726-293309494c20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZW55YSUyMHNhZmFyaSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NzIzMTQ0MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}></div>
        
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Contact Us
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
                Let's start planning your dream safari adventure
              </p>
            </motion.div>
          </div>
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
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--safari-gold)]"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--safari-gold)]"
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
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--safari-gold)]"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--safari-gold)]"
                        placeholder="+1 234 567 890"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Destination
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--safari-gold)]">
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
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--safari-gold)]">
                        <option value="1">1 Person</option>
                        <option value="2">2 Persons</option>
                        <option value="3-5">3-5 Persons</option>
                        <option value="6+">6+ Persons</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Travel Dates
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--safari-gold)]"
                      placeholder="e.g., July 2026"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      rows={6}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--safari-gold)]"
                      placeholder="Tell us about your dream safari..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full md:w-auto bg-gradient-to-r from-[var(--safari-gold)] to-[var(--safari-orange)] text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
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
                className="bg-[var(--safari-brown-dark)] text-white p-6 rounded-xl"
              >
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[var(--safari-gold)] rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Phone</div>
                      <a href="tel:+254714018914" className="text-gray-300 hover:text-[var(--safari-gold)] transition-colors">
                        254 722 371 171 / +254 721 949 410
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[var(--safari-gold)] rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Email</div>
                      <a href="mailto:info@adventuresconnect.com" className="text-gray-300 hover:text-[var(--safari-gold)] transition-colors">
                        info@adventuresconnect.co.ke
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[var(--safari-gold)] rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Office</div>
                      <p className="text-gray-300">
                        Wilson Airport<br />
                        Nairobi, Kenya
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[var(--safari-gold)] rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Business Hours</div>
                      <p className="text-gray-300">
                        Monday - Friday: 8:00 AM - 6:00 PM<br />
                        Saturday: 9:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-green-600 text-white p-6 rounded-xl hover:bg-green-700 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-3">
                  <MessageCircle className="w-8 h-8" />
                  <h3 className="text-xl font-bold">WhatsApp Us</h3>
                </div>
                <p className="text-sm text-green-100 mb-4">
                  Get instant responses to your safari questions
                </p>
                <button className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                  Start Chat
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-[var(--safari-cream)]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--safari-brown-dark)] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Find answers to common questions about safari travel
            </p>
          </motion.div>

          <Accordion.Root type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Accordion.Item
                  value={`item-${index}`}
                  className="bg-white rounded-lg overflow-hidden shadow-md"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="w-full px-6 py-4 text-left font-semibold text-[var(--safari-brown-dark)] hover:bg-gray-50 transition-colors flex items-center justify-between group">
                      <span>{faq.question}</span>
                      <ChevronDown className="w-5 h-5 text-[var(--safari-gold)] transition-transform group-data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="px-6 py-4 text-gray-600 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                    {faq.answer}
                  </Accordion.Content>
                </Accordion.Item>
              </motion.div>
            ))}
          </Accordion.Root>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--safari-brown-dark)] mb-8 text-center">
              Visit Our Office
            </h2>
            <div className="bg-gray-200 rounded-2xl overflow-hidden h-[400px] flex items-center justify-center">
              <div className="text-center text-gray-600">
                <MapPin className="w-16 h-16 mx-auto mb-4 text-[var(--safari-gold)]" />
                <p className="font-semibold">Wilson Airport</p>
                <p>Nairobi, Kenya</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
