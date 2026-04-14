// src/components/SafariBookingSidebar.tsx
import React, { useState } from 'react'
import { Users, Calendar, MessageCircle, Download, Loader2 } from 'lucide-react'
import type { Safari } from '../../types/safari'

interface Props {
  safari: Safari
}

export function SafariBookingSidebar({ safari }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    travelers: '1 Person',
    preferredDate: '',
    specialRequests: ''
  })
  const [bookingRef, setBookingRef] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          safari: {
            id: safari.id,
            title: safari.title,
            description: safari.description,
            duration: safari.duration,
            days: safari.days,
            location: safari.location,
            price: safari.price,
            highlights: safari.highlights,
            image: safari.image
          }
        })
      })

      const data = await response.json()

      if (data.success) {
        setBookingRef(data.bookingReference)
        setSubmitted(true)
        
        // Track booking conversion (optional)
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'booking_request', {
            'event_category': 'Safari Booking',
            'event_label': safari.title,
            'value': safari.price
          })
        }
      } else {
        throw new Error(data.message || 'Booking failed')
      }
    } catch (error) {
      console.error('Booking failed:', error)
      alert('Failed to submit booking. Please try again or contact us directly.')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadPDF = async () => {
    if (!bookingRef) return
    
    try {
      // Since PDF is emailed, show a message
      alert('Your booking confirmation PDF has been sent to your email. Please check your inbox (and spam folder).')
    } catch (error) {
      console.error('PDF notification failed:', error)
    }
  }

  const whatsappUrl = `https://wa.me/254755690133?text=${encodeURIComponent(
    `Hi! I'm interested in the "${safari.title}" safari. Could you send me more details?`
  )}`

  return (
    <div className="sticky top-24 space-y-6">
      {/* Booking form */}
      <div className="bg-[var(--safari-cream)] p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-[var(--safari-brown-dark)] mb-4">
          Book This Safari
        </h3>

        {submitted ? (
          <div className="text-center py-6">
            <div className="text-4xl mb-3">🎉</div>
            <p className="font-bold text-[var(--safari-brown-dark)] mb-1">
              Request Sent Successfully!
            </p>
            <p className="text-sm text-gray-600 mb-4">
              We've sent a confirmation email with your booking details to <strong>{formData.email}</strong>.
            </p>
            <div className="bg-white p-4 rounded-lg mb-4">
              <p className="text-xs text-gray-500 mb-1">Booking Reference</p>
              <p className="font-mono font-bold text-lg text-[var(--safari-gold)]">
                {bookingRef}
              </p>
            </div>
            <button
              onClick={handleDownloadPDF}
              className="w-full bg-[var(--safari-brown-dark)] text-white py-2 rounded-lg font-semibold hover:bg-[var(--safari-brown)] transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              PDF Sent to Email
            </button>
            <p className="text-xs text-gray-500 mt-3">
              We'll be in touch within 24 hours to confirm your dates.
            </p>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--safari-gold)]"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--safari-gold)]"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                <Users className="w-4 h-4 inline mr-1" />
                Number of Travelers *
              </label>
              <select
                title="Number of travelers"
                name="travelers"
                required
                value={formData.travelers}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--safari-gold)]"
              >
                <option value="1 Person">1 Person</option>
                <option value="2 Persons">2 Persons</option>
                <option value="3–5 Persons">3–5 Persons</option>
                <option value="6+ Persons">6+ Persons</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                <Calendar className="w-4 h-4 inline mr-1" />
                Preferred Date *
              </label>
              <input
                title="Preferred Date"
                type="date"
                name="preferredDate"
                required
                value={formData.preferredDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--safari-gold)]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Special Requests
              </label>
              <textarea
                name="specialRequests"
                rows={3}
                value={formData.specialRequests}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--safari-gold)]"
                placeholder="Any special requirements?"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[var(--safari-gold)] to-[var(--safari-orange)] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 inline animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                'Request Booking'
              )}
            </button>
            
            <p className="text-xs text-gray-500 text-center mt-2">
              * Required fields
            </p>
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
        
        <button 
          onClick={() => {
            window.open(`/api/safaris/${safari.id}/itinerary-pdf`, '_blank')
          }}
          className="w-full flex items-center justify-center gap-2 bg-[var(--safari-brown-dark)] text-white py-3 rounded-lg font-semibold hover:bg-[var(--safari-brown)] transition-colors"
        >
          <Download className="w-5 h-5" />
          Download PDF Itinerary
        </button>
      </div>

      {/* Contact info */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h4 className="font-bold text-[var(--safari-brown-dark)] mb-2">
          Need Help?
        </h4>
        <p className="text-sm text-gray-600 mb-4">
          Our safari experts are here to help you plan the perfect adventure.
        </p>
        <div className="space-y-2 text-sm">
          <a href="tel:+2540755690133" className="block text-[var(--safari-gold)] hover:underline">
            📞 +254755 690133
          </a>
          <a href="mailto:tours@berleensafaris.com" className="block text-[var(--safari-gold)] hover:underline">
            ✉️ tours@berleensafaris.com
          </a>
        </div>
      </div>
    </div>
  )
}