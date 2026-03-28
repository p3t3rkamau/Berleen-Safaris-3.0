// src/components/safari-detail/SafariOverview.tsx
import { Clock, DollarSign, MapPin, Star } from 'lucide-react'
import type { Safari } from '../../types/safari'

interface Props {
  safari: Safari
}

export function SafariOverview({ safari }: Props) {
  return (
    <>
      {/* Badges + title */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-[var(--safari-gold)] text-white px-3 py-1 rounded-full text-sm capitalize">
            {safari.category}
          </span>
          <span className="bg-[var(--safari-cream)] text-gray-700 px-3 py-1 rounded-full text-sm capitalize">
            {safari.experience}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-[var(--safari-brown-dark)] mb-4">
          {safari.title}
        </h1>
        <p className="text-lg text-gray-600 mb-6">{safari.description}</p>

        <div className="flex flex-wrap gap-6 text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[var(--safari-gold)]" />
            <span>{safari.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[var(--safari-gold)]" />
            <span className="capitalize">{safari.country}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-[var(--safari-gold)]" />
            <span className="font-bold text-[var(--safari-gold)]">From ${safari.price.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="mb-8 bg-[var(--safari-cream)] p-6 rounded-xl">
        <h3 className="text-xl font-bold text-[var(--safari-brown-dark)] mb-4">Safari Highlights</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {safari.highlights.map((highlight, i) => (
            <li key={i} className="flex items-start gap-2">
              <Star className="w-5 h-5 text-[var(--safari-gold)] flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}