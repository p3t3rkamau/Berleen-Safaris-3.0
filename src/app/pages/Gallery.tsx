// src/app/pages/Gallery.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Masonry from 'react-responsive-masonry';
import { X, Download, Share2, Heart, ChevronLeft, ChevronRight, Star, Camera, Image as ImageIcon, Award, Users, MapPin } from 'lucide-react';
import { UltimateSEO } from '../components/UltimateSEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ReviewSnippet } from '../components/ReviewSnippet';

const galleryImages = [
  {
    url: 'https://images.unsplash.com/photo-1724581777107-c132d05753a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXNhaSUyMG1hcmElMjB3aWxkbGlmZSUyMHNhZmFyaXxlbnwxfHx8fDE3NzIzNTAwOTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'wildlife',
    title: 'Masai Mara Wildlife',
    description: 'Spectacular wildlife viewing in the Masai Mara during golden hour',
    location: 'Masai Mara, Kenya',
    photographer: 'Berleen Safaris Team',
    date: '2024-01-15'
  },
  {
    url: 'https://images.unsplash.com/photo-1729796914745-6656569db42a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaW9uJTIwYWZyaWNhJTIwd2lsZGxpZmV8ZW58MXx8fHwxNzcyMzUwMDk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'wildlife',
    title: 'African Lion',
    description: 'Majestic male lion resting after a successful hunt',
    location: 'Masai Mara, Kenya',
    photographer: 'James Mwangi',
    date: '2024-01-10'
  },
  {
    url: 'https://images.unsplash.com/photo-1560440293-855922f9cc7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJlbmdldGklMjBzdW5zZXQlMjBhZnJpY2F8ZW58MXx8fHwxNzcyMzUwMDk1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'landscapes',
    title: 'Serengeti Sunset',
    description: 'Breathtaking sunset over the endless plains of Serengeti',
    location: 'Serengeti, Tanzania',
    photographer: 'Sarah Kimani',
    date: '2024-01-05'
  },
  {
    url: 'https://images.unsplash.com/photo-1535759802691-bf5a6cfe6ce9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZWxlcGhhbnQlMjBzYWZhcml8ZW58MXx8fHwxNzcyMjM1MjU0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'wildlife',
    title: 'African Elephant',
    description: 'Large elephant herd crossing the savannah with Kilimanjaro backdrop',
    location: 'Amboseli, Kenya',
    photographer: 'David Omondi',
    date: '2024-01-08'
  },
  {
    url: 'https://images.unsplash.com/photo-1552635408-80ae6cd8edeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6ZWJyYSUyMHNhZmFyaSUyMGFmcmljYXxlbnwxfHx8fDE3NzIzNTAwOTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'wildlife',
    title: 'Zebra Migration',
    description: 'Thousands of zebras during the Great Migration',
    location: 'Masai Mara, Kenya',
    photographer: 'Beth Nampaso',
    date: '2024-01-12'
  },
  {
    url: 'https://images.unsplash.com/photo-1645264206324-8146a951ef57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaXJhZmZlJTIwc3Vuc2V0JTIwYWZyaWNhfGVufDF8fHx8MTc3MjM1MDA5OXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'wildlife',
    title: 'Giraffe at Sunset',
    description: 'Graceful giraffe silhouetted against the African sunset',
    location: 'Masai Mara, Kenya',
    photographer: 'James Mwangi',
    date: '2024-01-03'
  },
  {
    url: 'https://images.unsplash.com/photo-1669557673726-293309494c20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZW55YSUyMHNhZmFyaSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NzIzMTQ0MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'landscapes',
    title: 'Great Rift Valley',
    description: 'Panoramic view of Kenya\'s Great Rift Valley',
    location: 'Great Rift Valley, Kenya',
    photographer: 'Berleen Safaris Team',
    date: '2024-01-14'
  },
  {
    url: 'https://images.unsplash.com/photo-1738508041350-03453c14811c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZhcmklMjBqZWVwJTIwYWZyaWNhfGVufDF8fHx8MTc3MjM1MDA5OXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'tourists',
    title: 'Safari Jeep Adventure',
    description: 'Guests enjoying game drive in our custom safari vehicle',
    location: 'Masai Mara, Kenya',
    photographer: 'Sarah Kimani',
    date: '2024-01-09'
  },
  {
    url: 'https://images.unsplash.com/photo-1667550507974-cc647990b75a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YW56YW5pYSUyMHdpbGRsaWZlfGVufDF8fHx8MTc3MjM1MDA5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'wildlife',
    title: 'Tanzania Wildlife',
    description: 'Diverse wildlife spotted during Serengeti safari',
    location: 'Serengeti, Tanzania',
    photographer: 'David Omondi',
    date: '2024-01-07'
  },
  {
    url: 'https://images.unsplash.com/photo-1667504319000-8133f9021cf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGdvcmlsbGElMjByd2FuZGF8ZW58MXx8fHwxNzcyMzUwMDk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'wildlife',
    title: 'Mountain Gorilla',
    description: 'Rare mountain gorilla in its natural habitat',
    location: 'Volcanoes National Park, Rwanda',
    photographer: 'Beth Nampaso',
    date: '2024-01-06'
  },
  {
    url: 'https://images.unsplash.com/photo-1682773083915-5375145f99e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyd2FuZGElMjBtb3VudGFpbiUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NzIzNTAwOTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'landscapes',
    title: 'Rwanda Mountains',
    description: 'Lush green mountains of Rwanda, home to gorillas',
    location: 'Rwanda',
    photographer: 'James Mwangi',
    date: '2024-01-04'
  },
  {
    url: 'https://images.unsplash.com/photo-1671830018944-eb7622e8b8f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXJjaGlzb24lMjBmYWxscyUyMHVnYW5kYXxlbnwxfHx8fDE3NzIzNTAwOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'landscapes',
    title: 'Murchison Falls',
    description: 'Powerful Murchison Falls in Uganda',
    location: 'Murchison Falls, Uganda',
    photographer: 'Sarah Kimani',
    date: '2024-01-02'
  },
  {
    url: 'https://images.unsplash.com/photo-1657658153344-3fa560150950?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1Z2FuZGElMjBzYWZhcmklMjBuYXR1cmV8ZW58MXx8fHwxNzcyMzUwMDk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'landscapes',
    title: 'Uganda Nature',
    description: 'Beautiful landscapes of Uganda\'s national parks',
    location: 'Uganda',
    photographer: 'David Omondi',
    date: '2024-01-01'
  },
  {
    url: 'https://images.unsplash.com/photo-1667550469774-295fd6849afa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXNhaSUyMHBlb3BsZSUyMGN1bHR1cmV8ZW58MXx8fHwxNzcyMzUwMTAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'cultural',
    title: 'Masai Culture',
    description: 'Traditional Masai warriors in their colorful attire',
    location: 'Masai Mara, Kenya',
    photographer: 'Beth Nampaso',
    date: '2024-01-11'
  }
];

// Gallery FAQ
const galleryFaqs = [
  {
    question: 'Can I use these photos for my website or publication?',
    answer: 'All photos in our gallery are copyrighted by Berleen Safaris. For media inquiries or permission to use our photos, please contact us directly at media@berleensafaris.com with your specific request.'
  },
  {
    question: 'Do you offer photography tours?',
    answer: 'Yes! We specialize in photography safaris led by professional wildlife photographers. Contact us to learn about our upcoming photography workshops and custom photography tours.'
  },
  {
    question: 'Can I submit my own safari photos to your gallery?',
    answer: 'We love seeing our guests\' photos! Tag us on social media @berleensafaris or email your best shots to gallery@berleensafaris.com for a chance to be featured.'
  },
  {
    question: 'What camera equipment do you recommend for safari?',
    answer: 'We recommend a DSLR or mirrorless camera with a telephoto lens (200-400mm or longer), extra batteries, memory cards, and a beanbag for stabilization. Our guides can provide photography tips during your safari.'
  }
];

// Gallery product schema
const galleryProduct = {
  name: 'Safari Photography Collection',
  description: 'Stunning collection of wildlife and landscape photography from East African safaris. Capturing the beauty of Kenya, Tanzania, Rwanda, and Uganda.',
  image: 'https://berleensafaris.com/images/gallery-collection.jpg',
  sku: 'BS-GALLERY-2024',
  brand: 'Berleen Safaris',
  offers: {
    price: 0,
    priceCurrency: 'USD',
    availability: 'InStock' as const
  },
  aggregateRating: { ratingValue: 4.9, reviewCount: 312 }
};

// Video data for gallery
const galleryVideo = {
  url: 'https://berleensafaris.com/videos/safari-gallery-showcase.mp4',
  thumbnail: 'https://berleensafaris.com/videos/gallery-thumbnail.jpg',
  duration: 'PT2M45S'
};

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);
  const [likedImages, setLikedImages] = useState<number[]>([]);
  const [showShareTooltip, setShowShareTooltip] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const categories = [
    { id: 'all', name: 'All Photos', count: galleryImages.length, icon: '📸' },
    { id: 'wildlife', name: 'Wildlife', count: galleryImages.filter(img => img.category === 'wildlife').length, icon: '🦁' },
    { id: 'landscapes', name: 'Landscapes', count: galleryImages.filter(img => img.category === 'landscapes').length, icon: '🏔️' },
    { id: 'tourists', name: 'Safari Experience', count: galleryImages.filter(img => img.category === 'tourists').length, icon: '🚙' },
    { id: 'cultural', name: 'Cultural Visits', count: galleryImages.filter(img => img.category === 'cultural').length, icon: '👥' }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  // Handle window resize for responsive columns
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate columns based on window width
  const getColumnsCount = () => {
    if (windowWidth < 640) return 1;
    if (windowWidth < 1024) return 2;
    return 3;
  };

  const handleLike = (index: number) => {
    setLikedImages(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const handleShare = async (image: typeof galleryImages[0], index: number) => {
    try {
      await navigator.share({
        title: image.title,
        text: `Check out this amazing ${image.category} photo from Berleen Safaris!`,
        url: window.location.href,
      });
    } catch (err) {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(`${image.title} - ${window.location.href}`);
      setShowShareTooltip(index);
      setTimeout(() => setShowShareTooltip(null), 2000);
    }
  };

  const handleDownload = async (image: typeof galleryImages[0]) => {
    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `berleen-safaris-${image.title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (lightboxImage === null) return;
    if (direction === 'prev') {
      setLightboxImage(prev => (prev !== null && prev > 0 ? prev - 1 : filteredImages.length - 1));
    } else {
      setLightboxImage(prev => (prev !== null && prev < filteredImages.length - 1 ? prev + 1 : 0));
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxImage !== null) {
        if (e.key === 'ArrowLeft') navigateLightbox('prev');
        if (e.key === 'ArrowRight') navigateLightbox('next');
        if (e.key === 'Escape') setLightboxImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage, filteredImages.length]);

  // Render masonry items
  const renderMasonryItems = () => {
    if (!filteredImages || filteredImages.length === 0) {
      return null;
    }

    return filteredImages.map((image, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: Math.min(index * 0.02, 0.5) }}
        className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all cursor-pointer"
        onClick={() => setLightboxImage(index)}
      >
        <img
          src={image.url}
          alt={image.title}
          loading="lazy"
          className="w-full h-auto block group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="font-bold text-lg">{image.title}</h3>
            <p className="text-sm text-gray-300 capitalize mb-2">{image.category}</p>
            <p className="text-xs text-gray-400">{image.location}</p>
            
            {/* Action Buttons */}
            <div className="flex gap-2 mt-3">
              <button
                title="Like"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike(index);
                }}
                className="bg-white/20 backdrop-blur rounded-full p-2 hover:bg-white/30 transition-colors"
              >
                <Heart className={`w-4 h-4 ${likedImages.includes(index) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare(image, index);
                }}
                className="bg-white/20 backdrop-blur rounded-full p-2 hover:bg-white/30 transition-colors relative"
              >
                <Share2 className="w-4 h-4 text-white" />
                {showShareTooltip === index && (
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap">
                    Copied!
                  </span>
                )}
              </button>
              <button
                title="Download"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload(image);
                }}
                className="bg-white/20 backdrop-blur rounded-full p-2 hover:bg-white/30 transition-colors"
              >
                <Download className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    ));
  };

  return (
    <>
      {/* Ultimate SEO Component */}
      <UltimateSEO
        title="Safari Gallery | Wildlife & Landscape Photography"
        description="Explore our stunning safari gallery featuring incredible wildlife photography, breathtaking landscapes, and authentic cultural experiences from East Africa."
        keywords="safari gallery, wildlife photography, african safari photos, masai mara pictures, kenya wildlife photos"
        canonicalUrl="/gallery"
        ogImage="https://berleensafaris.com/images/gallery-og-image.jpg"
        ogImageWidth={1200}
        ogImageHeight={630}
        ogImageAlt="Berleen Safaris Gallery - Stunning wildlife and landscape photography"
        twitterImage="https://berleensafaris.com/images/gallery-twitter-card.jpg"
        ogVideo={galleryVideo.url}
        ogVideoType="video/mp4"
        ogVideoWidth={1920}
        ogVideoHeight={1080}
        faqs={galleryFaqs}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Gallery', item: '/gallery' }
        ]}
        product={galleryProduct}
        merchant={{
          name: 'Berleen Safaris - Photo Gallery',
          image: 'https://berleensafaris.com/logo-large.png',
          priceRange: 'Free to view',
          telephone: '+254-714-018-914',
          address: 'Wilson Airport, Nairobi, Kenya',
          openingHours: ['Mon-Sun 24/7'],
          paymentAccepted: ['N/A - Free Gallery'],
          areaServed: ['Worldwide']
        }}
        ogType="website"
        twitterCard="summary_large_image"
        publishedTime="2024-01-01T00:00:00Z"
        modifiedTime={new Date().toISOString()}
        author="Berleen Safaris Photography Team"
        locale="en_US"
      />
      
      <Breadcrumbs />
      
      {/* Hero Section */}
      <div className="relative h-[350px] md:h-[450px] bg-gradient-to-r from-[var(--safari-brown-dark)] to-[var(--safari-brown)] overflow-hidden">
        <div className="absolute inset-0 opacity-30 transform scale-105 animate-slowZoom" style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1645264206324-8146a951ef57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-4 py-2 mb-6">
                <Camera className="w-4 h-4" />
                <span className="text-sm font-semibold">{galleryImages.length}+ Photos</span>
                <span className="w-1 h-1 bg-white/50 rounded-full"></span>
                <span className="text-sm">Captured by our expert guides</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Safari Gallery
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
                Explore stunning moments captured on our safari adventures across East Africa
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Gallery Stats Bar */}
      <div className="bg-white border-b border-gray-200 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[var(--safari-gold)]" />
              <span className="text-sm font-semibold">{galleryImages.length}+ Images</span>
            </div>
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-[var(--safari-gold)]" />
              <span className="text-sm font-semibold">Professional Photography</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[var(--safari-gold)]" />
              <span className="text-sm font-semibold">4 Countries</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="text-sm font-semibold">Like & Share</span>
            </div>
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
                className={`px-5 py-2 rounded-full font-semibold transition-all flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-[var(--safari-gold)] to-[var(--safari-orange)] text-white shadow-lg scale-105'
                    : 'bg-[var(--safari-cream)] text-gray-700 hover:bg-[var(--safari-gold)] hover:text-white'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  selectedCategory === category.id ? 'bg-white/30' : 'bg-gray-300'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* Masonry Gallery */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {filteredImages.length > 0 ? (
              <Masonry columnsCount={getColumnsCount()} gutter="16px" children={undefined}>
                {renderMasonryItems()}
              </Masonry>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📸</div>
                <p className="text-gray-500 text-lg">No images found in this category.</p>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="mt-4 text-[var(--safari-gold)] hover:underline font-semibold"
                >
                  View all photos
                </button>
              </div>
            )}
          </motion.div>

          {/* Photo Count Display */}
          <div className="mt-8 text-center text-gray-500 text-sm">
            Showing {filteredImages.length} of {galleryImages.length} photos
          </div>
        </div>
      </section>

      {/* Photography Tips Section */}
      <section className="py-16 px-4 bg-[var(--safari-cream)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--safari-brown-dark)] mb-4">
              Safari Photography Tips
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Capture stunning wildlife photos with advice from our expert guides
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '📷', title: 'Use the Right Gear', tips: 'Bring a telephoto lens (200-400mm), extra batteries, and plenty of memory cards. A beanbag helps stabilize your camera on vehicle rails.' },
              { icon: '⏰', title: 'Golden Hours', tips: 'Early morning and late afternoon provide the best lighting for wildlife photography. The "golden hour" creates warm, dramatic colors.' },
              { icon: '🎯', title: 'Focus on Eyes', tips: 'Always focus on the animal\'s eyes for compelling portraits. Use continuous autofocus for moving subjects.' }
            ].map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-4">{tip.icon}</div>
                <h3 className="text-xl font-bold text-[var(--safari-brown-dark)] mb-3">{tip.title}</h3>
                <p className="text-gray-600 text-sm">{tip.tips}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600 mb-3">Want to improve your safari photography?</p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--safari-gold)] to-[var(--safari-orange)] text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Join a Photography Safari
              <Camera className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Instagram Feed CTA */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl mb-4">📸</div>
            <h2 className="text-3xl font-bold text-[var(--safari-brown-dark)] mb-4">
              Follow Us on Instagram
            </h2>
            <p className="text-gray-600 mb-6">
              Get daily safari inspiration and behind-the-scenes content
            </p>
            <a
              href="https://instagram.com/berleensafaris"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105"
            >
              @berleensafaris on Instagram
            </a>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-[var(--safari-cream)]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--safari-brown-dark)] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about our safari photography
            </p>
          </motion.div>

          <div className="space-y-4">
            {galleryFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-bold text-[var(--safari-brown-dark)] mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={() => setLightboxImage(null)}
          >
            {/* Close Button */}
            <button
              aria-label="Close Lightbox"
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 text-white hover:text-[var(--safari-gold)] transition-colors z-10"
            >
              <X size={32} />
            </button>

            {/* Navigation Buttons */}
            <button
              title="Previous Image"
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox('prev');
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-[var(--safari-gold)] transition-colors bg-black/50 rounded-full p-2 hover:bg-black/70"
            >
              <ChevronLeft size={40} />
            </button>
            
            <button
              title="Next Image"
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox('next');
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-[var(--safari-gold)] transition-colors bg-black/50 rounded-full p-2 hover:bg-black/70"
            >
              <ChevronRight size={40} />
            </button>

            {/* Image */}
            <motion.img
              key={lightboxImage}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={filteredImages[lightboxImage]?.url}
              alt={filteredImages[lightboxImage]?.title}
              className="max-w-full max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image Info */}
            {filteredImages[lightboxImage] && (
              <div 
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent text-white p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold mb-2">{filteredImages[lightboxImage].title}</h3>
                <p className="text-gray-300 mb-2">{filteredImages[lightboxImage].description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                  <span>📍 {filteredImages[lightboxImage].location}</span>
                  <span>📷 {filteredImages[lightboxImage].photographer}</span>
                  <span>📅 {filteredImages[lightboxImage].date}</span>
                  <span>🏷️ {filteredImages[lightboxImage].category}</span>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleLike(lightboxImage)}
                    className="bg-white/20 backdrop-blur rounded-full px-4 py-2 hover:bg-white/30 transition-colors flex items-center gap-2"
                  >
                    <Heart className={`w-4 h-4 ${likedImages.includes(lightboxImage) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                    <span>{likedImages.includes(lightboxImage) ? 'Liked' : 'Like'}</span>
                  </button>
                  <button
                    onClick={() => handleShare(filteredImages[lightboxImage], lightboxImage)}
                    className="bg-white/20 backdrop-blur rounded-full px-4 py-2 hover:bg-white/30 transition-colors flex items-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                  <button
                    onClick={() => handleDownload(filteredImages[lightboxImage])}
                    className="bg-white/20 backdrop-blur rounded-full px-4 py-2 hover:bg-white/30 transition-colors flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  {lightboxImage + 1} / {filteredImages.length}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-[var(--safari-brown-dark)] to-[var(--safari-brown)] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Inspired by Our Gallery?
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              Book your safari today and capture your own unforgettable moments
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/contact"
                className="bg-gradient-to-r from-[var(--safari-gold)] to-[var(--safari-orange)] text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105 inline-block"
              >
                Plan Your Safari
              </a>
              <a
                href="/safaris"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[var(--safari-brown-dark)] transition-all"
              >
                View Safari Packages
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}