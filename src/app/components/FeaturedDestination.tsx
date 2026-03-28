import { useState } from "react";

const safaris = [
  {
    id: "kenya-1",
    duration: "3 Days",
    location: "Masai Mara",
    title: "3 Days Masai Mara Safari",
    description: "Fly into the heart of the Mara and witness the Big Five in their natural habitat. Game drives at dawn and dusk.",
    price: 650,
    countryFlag: "🇰🇪",
    badge: "Best Seller",
    gradient: "linear-gradient(160deg, #c8a96e 0%, #7a4a1e 50%, #3d2008 100%)",
    accent: "#f0c060",
  },
  {
    id: "kenya-2",
    duration: "5 Days",
    location: "Masai Mara + Nakuru",
    title: "5 Days Mara & Lake Nakuru",
    description: "Big cats in the Mara and flamingos at Lake Nakuru. One of Africa's most diverse safari combinations.",
    price: 1100,
    countryFlag: "🇰🇪",
    badge: "Popular",
    gradient: "linear-gradient(160deg, #e8917a 0%, #9b3a20 50%, #3a1508 100%)",
    accent: "#ffb090",
  },
  {
    id: "kenya-3",
    duration: "7 Days",
    location: "Kenya Explorer",
    title: "7 Days Kenya Explorer Safari",
    description: "Amboseli, Lake Nakuru, Masai Mara — Kenya's greatest hits in one unforgettable week-long adventure.",
    price: 1800,
    countryFlag: "🇰🇪",
    badge: null,
    gradient: "linear-gradient(160deg, #8fbe7a 0%, #3a6b28 50%, #1a3510 100%)",
    accent: "#a8e080",
  },
  {
    id: "tz-1",
    duration: "8 Days",
    location: "Serengeti",
    title: "Serengeti Migration Safari",
    description: "Follow the wildebeest across the endless plains of the Serengeti. A spectacle unlike any on Earth.",
    price: 2400,
    countryFlag: "🇹🇿",
    badge: "Luxury",
    gradient: "linear-gradient(160deg, #d4aa55 0%, #8b5e1a 50%, #3a2008 100%)",
    accent: "#ffd070",
  },
  {
    id: "rw-1",
    duration: "4 Days",
    location: "Gorilla Trekking",
    title: "Rwanda Gorilla Trekking",
    description: "Spend a precious hour face-to-face with mountain gorillas in Volcanoes National Park.",
    price: 1900,
    countryFlag: "🇷🇼",
    badge: "Unique",
    gradient: "linear-gradient(160deg, #7ab8a0 0%, #285e48 50%, #0e2820 100%)",
    accent: "#80e0c0",
  },
  {
    id: "ug-1",
    duration: "5 Days",
    location: "Murchison Falls",
    title: "Uganda Waterfalls Safari",
    description: "Game drives at Murchison Falls with a boat cruise to the base of the falls. Chimpanzee tracking in Kibale.",
    price: 1350,
    countryFlag: "🇺🇬",
    badge: null,
    gradient: "linear-gradient(160deg, #c09060 0%, #6b4020 50%, #2a1808 100%)",
    accent: "#e8b070",
  },
];

const animalSilhouettes = ["🦁", "🐘", "🦒", "🦓", "🐆", "🦏"];

export default function PopularSafaris() {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: "#ffffff",
      minHeight: "100vh",
      padding: "80px 24px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background texture */}
      <div style={{
        position: "fixed",
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
            there's a safari for every traveller.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "2px",
        }}>
          {safaris.map((safari, i) => {
            const isHovered = hovered === safari.id;
            return (
              <div
                key={safari.id}
                //@ts-ignore
                onMouseEnter={() => setHovered(safari.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "relative",
                  background: safari.gradient,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease",
                  transform: isHovered ? "scale(1.02) translateY(-4px)" : "scale(1)",
                  boxShadow: isHovered
                    ? `0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px ${safari.accent}40`
                    : "0 2px 8px rgba(0,0,0,0.4)",
                  zIndex: isHovered ? 10 : 1,
                  animationDelay: `${i * 0.08}s`,
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
                  {animalSilhouettes[i]}
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
                    background: `linear-gradient(to right, transparent, ${safari.accent}60, transparent)`,
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
                    {safari.countryFlag}
                  </div>

                  {safari.badge && (
                    <div style={{
                      background: "rgba(0,0,0,0.45)",
                      border: `1px solid ${safari.accent}80`,
                      color: safari.accent,
                      fontSize: "9px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      padding: "5px 12px",
                      fontFamily: "'Georgia', serif",
                      backdropFilter: "blur(4px)",
                    }}>
                      {safari.badge}
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
                    {safari.duration}
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
                    color: safari.accent,
                    marginBottom: "10px",
                    fontFamily: "'Georgia', serif",
                  }}>
                    {safari.location} · {safari.countryFlag}
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
                    {safari.description}
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
                      <div style={{ fontSize: "28px", fontWeight: "400", color: safari.accent, lineHeight: 1 }}>
                        ${safari.price.toLocaleString()}
                      </div>
                      <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", marginTop: "2px" }}>
                        per person
                      </div>
                    </div>

                    <button
                      style={{
                        background: "transparent",
                        border: `1px solid ${safari.accent}`,
                        color: safari.accent,
                        padding: "11px 24px",
                        fontSize: "11px",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        fontFamily: "'Georgia', serif",
                        transition: "background 0.25s ease, color 0.25s ease",
                        ...(isHovered ? {
                          background: safari.accent,
                          color: "#1a0e04",
                        } : {}),
                      }}
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            );
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
          <button
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
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#c8a030"; e.currentTarget.style.color = "#0f0c07"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#c8a030"; }}
          >
            View All Safaris
          </button>
        </div>
      </div>
    </div>
  );
}