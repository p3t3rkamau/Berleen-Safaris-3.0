import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1724581777107-c132d05753a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXNhaSUyMG1hcmElMjB3aWxkbGlmZSUyMHNhZmFyaXxlbnwxfHx8fDE3NzIzNTAwOTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Discover the Wild Masai Mara',
    tagline: 'Witness the greatest wildlife spectacle on Earth',
    destination: 'kenya'
  },
  {
    image: 'https://images.unsplash.com/photo-1560440293-855922f9cc7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJlbmdldGklMjBzdW5zZXQlMjBhZnJpY2F8ZW58MXx8fHwxNzcyMzUwMDk1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Serengeti Sunset Safari',
    tagline: 'Experience the endless plains of Tanzania',
    destination: 'tanzania'
  },
  {
    image: 'https://images.unsplash.com/photo-1667504319000-8133f9021cf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGdvcmlsbGElMjByd2FuZGF8ZW58MXx8fHwxNzcyMzUwMDk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Rwanda Gorilla Trekking',
    tagline: 'An unforgettable encounter with mountain gorillas',
    destination: 'rwanda'
  },
  {
    image: 'https://images.unsplash.com/photo-1671830018944-eb7622e8b8f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXJjaGlzb24lMjBmYWxscyUyMHVnYW5kYXxlbnwxfHx8fDE3NzIzNTAwOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Murchison Falls Uganda',
    tagline: 'Explore the Pearl of Africa\'s natural wonders',
    destination: 'uganda'
  }
];

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all"
    >
      <ChevronRight size={24} />
    </button>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all"
    >
      <ChevronLeft size={24} />
    </button>
  );
}

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (_current: number, next: number) => setCurrentSlide(next),
    appendDots: (dots: any) => (
      <div className="absolute bottom-8 w-full">
        <ul className="flex justify-center gap-2"> {dots} </ul>
      </div>
    ),
    customPaging: (i: number) => (
      <button className={`w-3 h-3 rounded-full transition-all ${
        i === currentSlide ? 'bg-[var(--safari-gold)] w-8' : 'bg-white/50'
      }`} />
    )
  };

  return (
    <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[500px] md:h-[600px] lg:h-[700px]">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
            </div>
            
            <div className="relative h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 w-full">
                <div className="max-w-2xl text-white">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    {slide.tagline}
                  </p>
                  <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    <Link
                      to="/safaris"
                      className="bg-gradient-to-r from-[var(--safari-gold)] to-[var(--safari-orange)] text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      Explore Safaris
                    </Link>
                    <Link
                      to="/contact"
                      className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white/20 transition-all duration-300"
                    >
                      Get a Quote
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .slick-dots li button:before {
          display: none;
        }
      `}</style>
    </div>
  );
}
