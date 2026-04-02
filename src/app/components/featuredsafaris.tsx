import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getFeaturedSafaris } from "../data/loadSafaris";
import type { Safari } from "../../types/safari";

export function FeaturedSafaris() {
  const navigate = useNavigate();
  const [safaris, setSafaris] = useState<Safari[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getFeaturedSafaris(6);
    setSafaris(data);

    // simulate load feel (optional)
    setTimeout(() => setLoading(false), 800);
  }, []);

  return (
    <section className="w-full py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* 🔥 Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-semibold">
            Featured Safaris
          </h2>

          <button
            onClick={() => navigate("/safaris")}
            className="text-sm font-medium text-gray-600 hover:text-black transition"
          >
            View All →
          </button>
        </motion.div>

        {/* 🔥 GRID */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

          {(loading ? Array(6).fill(null) : safaris).map((safari, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() =>
                !loading && navigate(`/safari/${safari.id}`)
              }
            >
              {/* 🔥 CARD */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg">

                {/* IMAGE / SKELETON */}
                {loading ? (
                  <div className="h-56 bg-gray-200 animate-pulse" />
                ) : (
                  <>
                    <motion.img
                      src={safari.image || safari.images?.[0]}
                      alt={safari.title}
                      className="w-full h-56 object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* PRICE */}
                    <div className="absolute top-3 right-3 bg-white/90 text-black text-xs px-3 py-1 rounded-full font-semibold">
                      ${safari.price}
                    </div>

                    {/* COUNTRY */}
                    <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                      {safari.country}
                    </div>

                    {/* TEXT */}
                    <div className="absolute bottom-0 p-4 text-white">
                      <h3 className="text-sm md:text-base font-semibold line-clamp-2">
                        {safari.title}
                      </h3>

                      <p className="text-xs text-gray-200 mt-1">
                        {safari.category}
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* 🔥 EXTRA INFO BELOW */}
              {!loading && (
                <div className="mt-3 px-1">
                  <p className="text-sm font-medium line-clamp-1">
                    {safari.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {safari.experience}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}