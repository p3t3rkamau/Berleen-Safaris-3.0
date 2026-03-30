import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getFeaturedSafaris } from '../data/loadSafaris'
import type { Safari } from '../types/safari'

const animalSilhouettes = ["🦁", "🐘", "🦒", "🦓", "🐆", "🦏"]

const countryFlags: Record<string, string> = {
  "Kenya": "🇰🇪",
  "Tanzania": "🇹🇿",
  "Kenya & Tanzania": "🇰🇪🇹🇿",
  "East Africa": "🌍",
}

export default function PopularSafaris() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [safaris, setSafaris] = useState<Safari[]>([])

  useEffect(() => {
    setSafaris(getFeaturedSafaris(6))
  }, [])

  const getGradient = (title: string): string => {
    const gradients = [
      "linear-gradient(160deg, #c8a96e 0%, #7a4a1e 50%, #3d2008 100%)",
      "linear-gradient(160deg, #e8917a 0%, #9b3a20 50%, #3a1508 100%)",
      "linear-gradient(160deg, #8fbe7a 0%, #3a6b28 50%, #1a3510 100%)",
      "linear-gradient(160deg, #d4aa55 0%, #8b5e1a 50%, #3a2008 100%)",
      "linear-gradient(160deg, #7ab8a0 0%, #285e48 50%, #0e2820 100%)",
      "linear-gradient(160deg, #c09060 0%, #6b4020 50%, #2a1808 100%)",
    ]
    const index = title.length % gradients.length
    return gradients[index]
  }

  const getAccent = (title: string): string => {
    const accents = ["#f0c060", "#ffb090", "#a8e080", "#ffd070", "#80e0c0", "#e8b070"]
    const index = title.length % accents.length
    return accents[index]
  }

  const getBadge = (safari: Safari): string | null => {
    if (safari.highlights?.some(h => h.includes("Great Migration"))) return "Best Seller"
    const durationDays = parseInt(safari.duration)
    if (durationDays <= 4) return "Short Safari"
    if (safari.category === "luxury") return "Luxury"
    if (safari.title.toLowerCase().includes("honeymoon")) return "Romantic"
    if (durationDays >= 10) return "Grand Expedition"
    return null
  }

  const getCountryFlag = (safari: Safari): string => {
    return countryFlags[safari.country] || "🇰🇪"
  }

  const getShortDescription = (description: string): string => {
    if (description.length <= 120) return description
    return description.substring(0, 120) + "..."
  }

  if (safaris.length === 0) {
    return null
  }

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: "#ffffff",
      minHeight: "auto",
      padding: "80px 24px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background texture */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(180,120,40,0.15) 0%, transparent 70%),
          repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.01) 40px, rgba(255,255,255,0.01) 41px),
          repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.01) 40px, rgba(255,255,255,0.01) 41px)`,
        pointerEvents: "none",
        zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "72px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}>
            <div style={{ height: "1px", width: "48px", background: "linear-gradient(to right, transparent, #c8a030)" }} />
            <span style={{
              fontSize: "11px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#c8a030",
              fontFamily: "'Georgia', serif",
            }}>Popular Packages</span>
            <div style={{ height: "1px", width: "48px", background: "linear-gradient(to left, transparent, #c8a030)" }} />
          </div>

          <h2 style={{
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: "400",
            color: "#000000",
            margin: "0 0 20px",
            lineHeight: "1.1",
            letterSpacing: "-0.02em",
          }}>
            Handpicked{" "}
            <em style={{
              fontStyle: "italic",
              color: "#c8a030",
              display: "inline-block",
            }}>Safari</em>
            {" "}Experiences
          </h2>

          <p style={{
            fontSize: "17px",
            color: "#000000",
            maxWidth: "520px",
            margin: "0 auto",
            lineHeight: "1.7",
            fontFamily: "'Georgia', serif",
          }}>
            From a quick 3-day adventure to a 14-day grand expedition —
            there's a safari for every traveller. Explore Kenya, Tanzania, and beyond with our handpicked experiences.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "2px",
        }}>
          {safaris.map((safari, i) => {
            const isHovered = hovered === safari.id
            const gradient = getGradient(safari.title)
            const accent = getAccent(safari.title)
            const badge = getBadge(safari)
            const flag = getCountryFlag(safari)
            const durationText = safari.duration
            const location = safari.country

            return (
              <Link
                key={safari.id}
                to={`/safari/${safari.id}`}
                onMouseEnter={() => setHovered(safari.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "relative",
                  background: gradient,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease",
                  transform: isHovered ? "scale(1.02) translateY(-4px)" : "scale(1)",
                  boxShadow: isHovered
                    ? `0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px ${accent}40`
                    : "0 2px 8px rgba(0,0,0,0.4)",
                  zIndex: isHovered ? 10 : 1,
                  textDecoration: "none",
                }}
              >
                {/* Noise texture overlay */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
                  opacity: 0.5,
                  pointerEvents: "none",
                }} />

                {/* Silhouette background animal */}
                <div style={{
                  position: "absolute",
                  bottom: "100px",
                  right: "-10px",
                  fontSize: "120px",
                  opacity: isHovered ? 0.12 : 0.07,
                  transition: "opacity 0.4s ease, transform 0.4s ease",
                  transform: isHovered ? "scale(1.1)" : "scale(1)",
                  userSelect: "none",
                  lineHeight: 1,
                }}>
                  {animalSilhouettes[i % animalSilhouettes.length]}
                </div>

                {/* Top bar */}
                <div style={{
                  position: "relative",
                  height: "200px",
                  padding: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}>
                  {/* Decorative horizon line */}
                  <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background: `linear-gradient(to right, transparent, ${accent}60, transparent)`,
                  }} />

                  {/* Large flag */}
                  <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "64px",
                    opacity: 0.3,
                    filter: "blur(1px)",
                  }}>
                    {flag}
                  </div>

                  {badge && (
                    <div style={{
                      background: "rgba(0,0,0,0.45)",
                      border: `1px solid ${accent}80`,
                      color: accent,
                      fontSize: "9px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      padding: "5px 12px",
                      fontFamily: "'Georgia', serif",
                      backdropFilter: "blur(4px)",
                    }}>
                      {badge}
                    </div>
                  )}

                  <div style={{
                    marginLeft: "auto",
                    background: "rgba(0,0,0,0.4)",
                    backdropFilter: "blur(4px)",
                    padding: "5px 12px",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    fontFamily: "'Georgia', serif",
                  }}>
                    {durationText}
                  </div>
                </div>

                {/* Body */}
                <div style={{
                  position: "relative",
                  padding: "24px 28px 28px",
                  background: "rgba(0,0,0,0.45)",
                  backdropFilter: "blur(8px)",
                }}>
                  <div style={{
                    fontSize: "11px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: accent,
                    marginBottom: "10px",
                    fontFamily: "'Georgia', serif",
                  }}>
                    {location} · {flag}
                  </div>

                  <h3 style={{
                    fontSize: "22px",
                    fontWeight: "400",
                    color: "#f5ead8",
                    margin: "0 0 12px",
                    lineHeight: "1.25",
                    letterSpacing: "-0.01em",
                  }}>
                    {safari.title}
                  </h3>

                  <p style={{
                    fontSize: "14px",
                    color: "rgba(245,234,216,0.6)",
                    lineHeight: "1.65",
                    margin: "0 0 24px",
                  }}>
                    {getShortDescription(safari.description)}
                  </p>

                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: `1px solid rgba(255,255,255,0.1)`,
                    paddingTop: "20px",
                  }}>
                    <div>
                      <div style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "2px" }}>
                        From
                      </div>
                      <div style={{ fontSize: "28px", fontWeight: "400", color: accent, lineHeight: 1 }}>
                        ${safari.price.toLocaleString()}
                      </div>
                      <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", marginTop: "2px" }}>
                        per person
                      </div>
                    </div>

                    <div
                      style={{
                        background: "transparent",
                        border: `1px solid ${accent}`,
                        color: accent,
                        padding: "11px 24px",
                        fontSize: "11px",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        fontFamily: "'Georgia', serif",
                        transition: "background 0.25s ease, color 0.25s ease",
                        ...(isHovered ? {
                          background: accent,
                          color: "#1a0e04",
                        } : {}),
                      }}
                    >
                      View Details →
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "64px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}>
            {animalSilhouettes.map((a, i) => (
              <span key={i} style={{ fontSize: "20px", opacity: 0.4 }}>{a}</span>
            ))}
          </div>
          <br />
          <Link
            to="/safaris"
            style={{
              background: "transparent",
              border: "1px solid #c8a030",
              color: "#c8a030",
              padding: "16px 48px",
              fontSize: "12px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "'Georgia', serif",
              transition: "background 0.3s ease, color 0.3s ease",
              textDecoration: "none",
              display: "inline-block",
            }}
            onMouseEnter={e => { 
              const target = e.currentTarget as HTMLElement
              target.style.background = "#c8a030"
              target.style.color = "#0f0c07"
            }}
            onMouseLeave={e => { 
              const target = e.currentTarget as HTMLElement
              target.style.background = "transparent"
              target.style.color = "#c8a030"
            }}
          >
            View All Safaris
          </Link>
        </div>
      </div>
    </div>
  )
}