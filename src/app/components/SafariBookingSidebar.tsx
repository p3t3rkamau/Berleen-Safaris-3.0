// src/components/safari-detail/SafariBookingSidebar.tsx
import { useState } from 'react'
import { Users, Calendar, MessageCircle, Download } from 'lucide-react'
import type { Safari } from '../../types/safari'

interface Props {
  safari: Safari
}

export function SafariBookingSidebar({ safari }: Props) {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: wire up to your email / booking backend
    setSubmitted(true)
  }

  const whatsappUrl = `https://wa.me/254714018914?text=${encodeURIComponent(
    `Hi! I'm interested in the "${safari.title}" safari. Could you send me more details?`
  )}`

  return (
    <div className="sticky top-24 space-y-6">
      {/* Booking form */}
      <div className="bg-[var(--safari-cream)] p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-[var(--safari-brown-dark)] mb-4">Book This Safari</h3>

        {submitted ? (
          <div className="text-center py-6">
            <div className="text-4xl mb-3">🎉</div>
            <p className="font-bold text-[var(--safari-brown-dark)] mb-1">Request Sent!</p>
            <p className="text-sm text-gray-600">We'll be in touch within 24 hours.</p>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--safari-gold)]"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--safari-gold)]"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                <Users className="w-4 h-4 inline mr-1" />
                Number of Travelers
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--safari-gold)]">
                <option>1 Person</option>
                <option>2 Persons</option>
                <option>3–5 Persons</option>
                <option>6+ Persons</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                <Calendar className="w-4 h-4 inline mr-1" />
                Preferred Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--safari-gold)]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Special Requests</label>
              <textarea
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--safari-gold)]"
                placeholder="Any special requirements?"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[var(--safari-gold)] to-[var(--safari-orange)] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Request Booking
            </button>
          </form>
        )}
      </div>

      {/* Quick actions */}
      <div className="space-y-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp Inquiry
        </a>
        <button className="w-full flex items-center justify-center gap-2 bg-[var(--safari-brown-dark)] text-white py-3 rounded-lg font-semibold hover:bg-[var(--safari-brown)] transition-colors">
          <Download className="w-5 h-5" />
          Download PDF Itinerary
        </button>
      </div>

      {/* Contact info */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h4 className="font-bold text-[var(--safari-brown-dark)] mb-2">Need Help?</h4>
        <p className="text-sm text-gray-600 mb-4">
          Our safari experts are here to help you plan the perfect adventure.
        </p>
        <div className="space-y-2 text-sm">
          <a href="tel:+254714018914" className="block text-[var(--safari-gold)] hover:underline">
            📞 +254 714 018 914
          </a>
          <a href="mailto:info@adventuresconnect.com" className="block text-[var(--safari-gold)] hover:underline">
            ✉️ info@adventuresconnect.com
          </a>
        </div>
      </div>
    </div>
  )
}