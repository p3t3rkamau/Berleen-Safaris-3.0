// src/components/safari-detail/SafariInclusions.tsx
import { Check, X } from 'lucide-react'
import type { Safari } from '../../types/safari'

interface Props {
  safari: Safari
}

export function SafariInclusions({ safari }: Props) {
  return (
    <>
      {/* Included / Not included */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-50 p-6 rounded-xl">
          <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
            <Check className="w-5 h-5" /> What's Included
          </h3>
          <ul className="space-y-2">
            {safari.included.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-green-800">
                <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-red-50 p-6 rounded-xl">
          <h3 className="text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
            <X className="w-5 h-5" /> What's Not Included
          </h3>
          <ul className="space-y-2">
            {safari.notIncluded.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-red-800">
                <X className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Accommodation */}
      <div className="mb-8 bg-[var(--safari-cream)] p-6 rounded-xl">
        <h3 className="text-xl font-bold text-[var(--safari-brown-dark)] mb-4">Accommodation Options</h3>
        <ul className="space-y-2">
          {safari.accommodation.map((acc, i) => (
            <li key={i} className="flex items-center gap-2 text-gray-700">
              <div className="w-2 h-2 bg-[var(--safari-gold)] rounded-full flex-shrink-0" />
              <span>{acc}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Travel tips */}
      {safari.travelInfo && (safari.travelInfo.clothes || safari.travelInfo.food) && (
        <div className="mb-8 bg-blue-50 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-blue-900 mb-4">Travel Tips</h3>
          {safari.travelInfo.clothes && (
            <div className="mb-3">
              <p className="font-semibold text-blue-800 mb-1">🧥 What to Wear / Pack</p>
              <p className="text-blue-700 text-sm">{safari.travelInfo.clothes}</p>
            </div>
          )}
          {safari.travelInfo.food && (
            <div>
              <p className="font-semibold text-blue-800 mb-1">🍽️ Food & Dining</p>
              <p className="text-blue-700 text-sm">{safari.travelInfo.food}</p>
            </div>
          )}
        </div>
      )}

      {/* Operator note */}
      {safari.note && (
        <p className="text-xs text-gray-400 italic">{safari.note}</p>
      )}
    </>
  )
}