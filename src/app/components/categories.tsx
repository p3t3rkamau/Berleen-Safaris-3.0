import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// 🔹 Categories + placeholder filter key
const categories = [
  { key: "all", name: "All", image: "https://source.unsplash.com/200x200/?safari" },
  { key: "4x4", name: "4x4 Safari", image: "https://source.unsplash.com/200x200/?safari,jeep" },
  { key: "wildlife", name: "Wildlife", image: "https://source.unsplash.com/200x200/?africa,wildlife" },
  { key: "amboseli", name: "Amboseli", image: "https://source.unsplash.com/200x200/?elephant" },
  { key: "zanzibar", name: "Zanzibar", image: "https://source.unsplash.com/200x200/?zanzibar,beach" },
  { key: "beach", name: "Beach", image: "https://source.unsplash.com/200x200/?beach,ocean" },
  { key: "culture", name: "Culture", image: "https://source.unsplash.com/200x200/?african,culture" },
  { key: "gorilla", name: "Gorilla", image: "https://source.unsplash.com/200x200/?gorilla" },
];

// 🔹 Placeholder safaris (simulate list below)
const safaris = [
  { id: 1, title: "Masai Mara Experience", category: "wildlife" },
  { id: 2, title: "Zanzibar Beach Holiday", category: "beach" },
  { id: 3, title: "Gorilla Trekking", category: "gorilla" },
  { id: 4, title: "Amboseli Elephants", category: "amboseli" },
  { id: 5, title: "Cultural Kenya Tour", category: "culture" },
];

export default function PopularCategories() {
  const [active, setActive] = useState("all");
  const [filtered, setFiltered] = useState(safaris);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 🔹 Filter logic
  useEffect(() => {
    if (active === "all") setFiltered(safaris);
    else setFiltered(safaris.filter((s) => s.category === active));
  }, [active]);

  // 🔹 Auto-scroll (Netflix style)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let scrollAmount = 0;
    const step = 1;

    const interval = setInterval(() => {
      if (el.scrollWidth - el.clientWidth <= scrollAmount) {
        scrollAmount = 0;
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollAmount += step;
        el.scrollTo({ left: scrollAmount, behavior: "smooth" });
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-10 px-4 md:px-10">
      <h2 className="text-center text-xl md:text-2xl font-semibold mb-8 text-[#1f2d2f]">
        Popular Categories
      </h2>

      {/* 🔹 Categories Slider */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth"
      >
        {categories.map((cat) => (
          <motion.div
            key={cat.key}
            whileHover={{ scale: 1.08 }}
            onClick={() => setActive(cat.key)}
            className={`flex flex-col items-center cursor-pointer min-w-[100px] ${
              active === cat.key ? "opacity-100" : "opacity-60"
            }`}
          >
            <div
              className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden shadow-lg border-4 ${
                active === cat.key ? "border-[#1f2d2f]" : "border-[#b88a4a]"
              }`}
            >
              {/* IMAGE */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover"
              />

              {/* 🔥 Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            <span className="mt-3 text-sm md:text-base text-center text-[#1f2d2f] font-medium">
              {cat.name}
            </span>
          </motion.div>
        ))}
      </div>

      {/* 🔹 Filtered Safari List (placeholder) */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl shadow bg-white border"
          >
            {item.title}
          </div>
        ))}
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
