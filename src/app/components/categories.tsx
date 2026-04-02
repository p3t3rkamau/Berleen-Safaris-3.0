import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { useNavigate } from "react-router-dom";

// 🔥 slugify helper
const slugify = (text: string) =>
  text.toLowerCase().replace(/\s+/g, "-");

export function PopularCategories() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const categories = [
    {
      title: "Big Five Safaris",
      image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2",
    },
    {
      title: "Beach Holidays",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    {
      title: "Gorilla Trekking",
      image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d",
    },
    {
      title: "Luxury Safaris",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801",
    },
    {
      title: "Cultural Tours",
      image: "https://images.unsplash.com/photo-1526779259212-756e7c3f0d4b",
    },
    {
      title: "Adventure Trips",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
  ];

  // simulate loading (replace with API later)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="w-full py-14 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-semibold mb-8 text-center"
        >
          Explore Popular Categories
        </motion.h2>

        {/* Mobile scroll + Desktop grid */}
        <div className="flex md:grid md:grid-cols-6 gap-6 overflow-x-auto no-scrollbar pb-2">

          {(loading ? Array(6).fill(null) : categories).map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              className="flex-shrink-0 flex flex-col items-center cursor-pointer group"
              onClick={() =>
                !loading &&
                navigate(`/category/${slugify(cat.title)}`)
              }
            >
              {/* Skeleton */}
              {loading ? (
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gray-200 animate-pulse" />
              ) : (
                <Tilt
                  glareEnable
                  glareMaxOpacity={0.3}
                  scale={1.05}
                  transitionSpeed={400}
                  className="rounded-full"
                >
                  <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-lg">
                    
                    {/* Image */}
                    <motion.img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.4 }}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70 group-hover:opacity-30 transition" />

                    {/* Glow */}
                    <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/60 transition" />
                  </div>
                </Tilt>
              )}

              {/* Text */}
              {loading ? (
                <div className="w-16 h-3 bg-gray-200 animate-pulse mt-3 rounded" />
              ) : (
                <p className="mt-3 text-xs md:text-sm text-center font-medium text-gray-700 group-hover:text-black transition">
                  {cat.title}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Hide scrollbar */}
      <style>
        {`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </section>
  );
}