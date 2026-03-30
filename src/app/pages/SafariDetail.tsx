// src/pages/SafariDetail.tsx
import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { getSafariById } from '../data/loadSafaris'
import { SafariGallery } from '../components/SafariGallery'
import { SafariOverview } from '../components/SafariOverview'
import { SafariTabs } from '../components/SafariTabs'
import { SafariInclusions } from '../components/SafariInclusions'
import { SafariBookingSidebar } from '../components/SafariBookingSidebar'

export function SafariDetail() {
  const { id } = useParams<{ id: string }>()
  const safari = id ? getSafariById(id) : undefined

  if (!safari) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Safari not found</h1>
          <Link to="/safaris" className="text-[var(--safari-gold)] hover:underline">
            Browse all safaris
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      {/* Hero gallery */}
      <SafariGallery images={safari.gallery} title={safari.title} />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SafariOverview safari={safari} />
            <SafariTabs safari={safari} />
            <SafariInclusions safari={safari} />
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <SafariBookingSidebar safari={safari} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}