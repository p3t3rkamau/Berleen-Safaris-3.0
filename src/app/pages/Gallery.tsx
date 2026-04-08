import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Masonry from 'react-responsive-masonry';
import { X } from 'lucide-react';
import SEO from '../components/Seo';

const galleryImages = [
  {
    url: 'https://images.unsplash.com/photo-1724581777107-c132d05753a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXNhaSUyMG1hcmElMjB3aWxkbGlmZSUyMHNhZmFyaXxlbnwxfHx8fDE3NzIzNTAwOTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'wildlife',
    title: 'Masai Mara Wildlife'
  },
  {
    url: 'https://images.unsplash.com/photo-1729796914745-6656569db42a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaW9uJTIwYWZyaWNhJTIwd2lsZGxpZmV8ZW58MXx8fHwxNzcyMzUwMDk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'wildlife',
    title: 'African Lion'
  },
  {
    url: 'https://images.unsplash.com/photo-1560440293-855922f9cc7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJlbmdldGklMjBzdW5zZXQlMjBhZnJpY2F8ZW58MXx8fHwxNzcyMzUwMDk1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'landscapes',
    title: 'Serengeti Sunset'
  },
  {
    url: 'https://images.unsplash.com/photo-1535759802691-bf5a6cfe6ce9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZWxlcGhhbnQlMjBzYWZhcml8ZW58MXx8fHwxNzcyMjM1MjU0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'wildlife',
    title: 'African Elephant'
  },
  {
    url: 'https://images.unsplash.com/photo-1552635408-80ae6cd8edeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6ZWJyYSUyMHNhZmFyaSUyMGFmcmljYXxlbnwxfHx8fDE3NzIzNTAwOTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'wildlife',
    title: 'Zebra Safari'
  },
  {
    url: 'https://images.unsplash.com/photo-1645264206324-8146a951ef57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaXJhZmZlJTIwc3Vuc2V0JTIwYWZyaWNhfGVufDF8fHx8MTc3MjM1MDA5OXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'wildlife',
    title: 'Giraffe at Sunset'
  },
  {
    url: 'https://images.unsplash.com/photo-1669557673726-293309494c20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZW55YSUyMHNhZmFyaSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NzIzMTQ0MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'landscapes',
    title: 'Kenya Landscape'
  },
  {
    url: 'https://images.unsplash.com/photo-1738508041350-03453c14811c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZhcmklMjBqZWVwJTIwYWZyaWNhfGVufDF8fHx8MTc3MjM1MDA5OXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'tourists',
    title: 'Safari Experience'
  },
  {
    url: 'https://images.unsplash.com/photo-1667550507974-cc647990b75a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YW56YW5pYSUyMHdpbGRsaWZlfGVufDF8fHx8MTc3MjM1MDA5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'wildlife',
    title: 'Tanzania Wildlife'
  },
  {
    url: 'https://images.unsplash.com/photo-1667504319000-8133f9021cf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGdvcmlsbGElMjByd2FuZGF8ZW58MXx8fHwxNzcyMzUwMDk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'wildlife',
    title: 'Mountain Gorilla'
  },
  {
    url: 'https://images.unsplash.com/photo-1682773083915-5375145f99e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyd2FuZGElMjBtb3VudGFpbiUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NzIzNTAwOTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'landscapes',
    title: 'Rwanda Mountains'
  },
  {
    url: 'https://images.unsplash.com/photo-1671830018944-eb7622e8b8f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXJjaGlzb24lMjBmYWxscyUyMHVnYW5kYXxlbnwxfHx8fDE3NzIzNTAwOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'landscapes',
    title: 'Murchison Falls'
  },
  {
    url: 'https://images.unsplash.com/photo-1657658153344-3fa560150950?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1Z2FuZGElMjBzYWZhcmklMjBuYXR1cmV8ZW58MXx8fHwxNzcyMzUwMDk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'landscapes',
    title: 'Uganda Nature'
  },
  {
    url: 'https://images.unsplash.com/photo-1667550469774-295fd6849afa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXNhaSUyMHBlb3BsZSUyMGN1bHR1cmV8ZW58MXx8fHwxNzcyMzUwMTAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'cultural',
    title: 'Masai Culture'
  }
];

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);

  const categories = [
    { id: 'all', name: 'All Photos' },
    { id: 'wildlife', name: 'Wildlife' },
    { id: 'landscapes', name: 'Landscapes' },
    { id: 'tourists', name: 'Safari Experience' },
    { id: 'cultural', name: 'Cultural Visits' }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <div>
      {/* Hero Section */}
       <SEO 
              title="Gallery | Berleen Safaris"
              description="Explore our stunning safari gallery featuring wildlife, landscapes, and cultural experiences across East Africa"
            />
      <div className="relative h-[300px] md:h-[400px] bg-gradient-to-r from-[var(--safari-brown-dark)] to-[var(--safari-brown)]">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1645264206324-8146a951ef57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaXJhZmZlJTIwc3Vuc2V0JTIwYWZyaWNhfGVufDF8fHx8MTc3MjM1MDA5OXww&ixlib=rb-4.1.0&q=80&w=1080)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}></div>
        
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Safari Gallery
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
                Explore stunning moments captured on our safari adventures
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-[var(--safari-gold)] to-[var(--safari-orange)] text-white shadow-lg'
                    : 'bg-[var(--safari-cream)] text-gray-700 hover:bg-[var(--safari-gold)] hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Masonry Gallery */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Masonry columnsCount={3} gutter="1rem">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="cursor-pointer group relative overflow-hidden rounded-lg"
                  onClick={() => setLightboxImage(index)}
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-auto block group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="text-white">
                      <h3 className="font-bold text-lg">{image.title}</h3>
                      <p className="text-sm text-gray-300 capitalize">{image.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </Masonry>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 text-white hover:text-[var(--safari-gold)] transition-colors"
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={filteredImages[lightboxImage].url}
              alt={filteredImages[lightboxImage].title}
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-4 left-0 right-0 text-center text-white">
              <h3 className="text-xl font-bold mb-1">{filteredImages[lightboxImage].title}</h3>
              <p className="text-sm text-gray-300 capitalize">{filteredImages[lightboxImage].category}</p>
              <p className="text-sm text-gray-400 mt-2">
                {lightboxImage + 1} / {filteredImages.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
