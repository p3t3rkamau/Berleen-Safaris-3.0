// src/components/safari-detail/SafariTabs.tsx
import { useState } from 'react'
import type { Safari } from '../../types/safari'

interface Props {
  safari: Safari
}

type Tab = 'itinerary' | 'pricing'
type Season = 'lowSeason' | 'highSeason'

export function SafariTabs({ safari }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('itinerary')
  const [season, setSeason] = useState<Season>('lowSeason')

  return (
    <div className="mb-8">
      {/* Tab buttons */}
      <div className="flex gap-4 border-b border-gray-200 mb-6">
        {(['itinerary', 'pricing'] as Tab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-4 font-semibold capitalize transition-colors ${
              activeTab === tab
                ? 'text-[var(--safari-gold)] border-b-2 border-[var(--safari-gold)]'
                : 'text-gray-600 hover:text-[var(--safari-gold)]'
            }`}
          >
            {tab === 'itinerary' ? 'Detailed Itinerary' : 'Pricing'}
          </button>
        ))}
      </div>

      {/* Itinerary */}
      {activeTab === 'itinerary' && (
        <div className="space-y-6">
          {safari.itinerary.map((day, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--safari-gold)] to-[var(--safari-orange)] rounded-full flex items-center justify-center text-white font-bold text-sm">
                  D{day.day}
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold text-[var(--safari-brown-dark)] mb-1">{day.title}</h4>
                <p className="text-gray-600">{day.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pricing */}
      {activeTab === 'pricing' && (
        <div>
          {/* Season toggle */}
          <div className="flex gap-4 mb-6">
            {(['lowSeason', 'highSeason'] as Season[]).map(s => (
              <button
                key={s}
                onClick={() => setSeason(s)}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                  season === s
                    ? 'bg-[var(--safari-gold)] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {s === 'lowSeason' ? 'Low Season' : 'High Season'}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full">
              <thead className="bg-[var(--safari-cream)]">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-[var(--safari-brown-dark)]">Group Size</th>
                  <th className="px-4 py-3 text-right font-semibold text-[var(--safari-brown-dark)]">Price per Person</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-4 text-gray-700">Solo Traveler</td>
                  <td className="px-4 py-4 text-right font-bold text-[var(--safari-gold)]">
                    ${safari.pricing[season].solo.toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-gray-700">2 Persons</td>
                  <td className="px-4 py-4 text-right font-bold text-[var(--safari-gold)]">
                    ${safari.pricing[season].twoPersons.toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-gray-700">Group (3+ persons)</td>
                  <td className="px-4 py-4 text-right font-bold text-[var(--safari-gold)]">
                    ${safari.pricing[season].group.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}