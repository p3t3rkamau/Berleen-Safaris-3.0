import { useState } from 'react'
import type { Safari } from '../../types/safari'

interface Props {
  safari: Safari
}

type Tab = 'itinerary' | 'pricing'

export function SafariTabs({ safari }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('itinerary')
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null)

  // ✅ Extract unique seasons dynamically
  const seasons =
    safari.pricing?.prices?.map(p => p.season) || []

  const uniqueSeasons = [...new Set(seasons)]

  // default season
  const activeSeason = selectedSeason || uniqueSeasons[0]

  // filter prices by selected season
  const filteredPrices =
    safari.pricing?.prices?.filter(
      p => p.season === activeSeason
    ) || []

  return (
    <div className="mb-8">
      {/* Tabs */}
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

      {/* ================= ITINERARY ================= */}
      {activeTab === 'itinerary' && (
        <div className="space-y-6">
          {safari.itinerary?.length ? (
            safari.itinerary.map((day, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-[var(--safari-gold)] to-[var(--safari-orange)] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    D{day.day}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[var(--safari-brown-dark)] mb-1">
                    {day.title}
                  </h4>
                  <p className="text-gray-600">{day.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No itinerary available</p>
          )}
        </div>
      )}

      {/* ================= PRICING ================= */}
      {activeTab === 'pricing' && (
        <div>
          {/* Season selector */}
          {uniqueSeasons.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-6">
              {uniqueSeasons.map(season => (
                <button
                  key={season}
                  onClick={() => setSelectedSeason(season)}
                  className={`px-4 py-2 rounded-lg font-semibold capitalize transition ${
                    activeSeason === season
                      ? 'bg-[var(--safari-gold)] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {season}
                </button>
              ))}
            </div>
          )}

          {/* Pricing Table */}
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full">
              <thead className="bg-[var(--safari-cream)]">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-[var(--safari-brown-dark)]">
                    Type
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-[var(--safari-brown-dark)]">
                    Price
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredPrices.length ? (
                  filteredPrices.map((p, i) => (
                    <tr key={i}>
                      <td className="px-4 py-4 text-gray-700">
                        {p.minPax
                          ? `${p.minPax}+ persons`
                          : p.type === 'group'
                          ? 'Group'
                          : 'Per Person'}
                      </td>

                      <td className="px-4 py-4 text-right font-bold text-[var(--safari-gold)]">
                        {p.currency || '$'} {p.price.toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={2}
                      className="px-4 py-4 text-center text-gray-500"
                    >
                      No pricing available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Optional note */}
          {safari.note && (
            <p className="mt-4 text-sm text-gray-500 italic">
              {safari.note}
            </p>
          )}
        </div>
      )}
    </div>
  )
}