import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  
  {
    image: 'https://ik.imagekit.io/6cga8hi9z/JaeTravels/africa-big-5-animals-found-in-uganda_zZfyMJ8hE.webp?',
    title: 'Kenya Big Five Expedition',
    tagline: 'Get up close with Africa’s most iconic wildlife',
    destination: 'kenya'
  },
  {
    image: 'https://ik.imagekit.io/6cga8hi9z/JaeTravels/Kenyanimals_CheetahPack_VmyCOwxPP.png',
    title: 'Cheetah Plains Adventure',
    tagline: 'Feel the thrill of speed on the open savannah',
    destination: 'tanzania'
  },
  {
    image: 'https://ik.imagekit.io/6cga8hi9z/JaeTravels/mara-crossing-wildebeest-tanzania-wildlife-yellow-zebra-safaris_2N2fdRbt_.jpg',
    title: 'Great Migration Experience',
    tagline: 'Witness nature’s most dramatic river crossings',
    destination: 'rwanda'
  },
  {
    image: 'https://ik.imagekit.io/6cga8hi9z/JaeTravels/images_5-UMlcDj6.jpg',
    title: 'Uganda Wildlife Discovery',
    tagline: 'Explore lush parks and hidden natural gems',
    destination: 'uganda'
  },
  {
    image: 'https://ik.imagekit.io/6cga8hi9z/JaeTravels/tt-768x512_noSyzwwOv.png',
    title: 'Safari & Culture Escape',
    tagline: 'Blend wildlife adventure with local traditions',
    destination: 'uganda'
  },
  {
    image: 'https://ik.imagekit.io/6cga8hi9z/JaeTravels/dophine-768x388_K2Ybsyxwk.png',
    title: 'Dolphin Coast Experience',
    tagline: 'Discover playful marine life along pristine shores',
    destination: 'uganda'
  },
  {
    image: 'https://ik.imagekit.io/6cga8hi9z/JaeTravels/zanzi_7mYF2fYCM.jpg',
    title: 'Zanzibar Beach Retreat',
    tagline: 'Relax on white sands with crystal-clear waters',
    destination: 'uganda'
  },
  {
    image: 'https://ik.imagekit.io/6cga8hi9z/JaeTravels/istockphoto-817219148-612x612_Idnqcj_CE.jpg',
    title: 'Luxury Safari Moments',
    tagline: 'Experience comfort in the heart of the wild',
    destination: 'uganda'
  },
  {
    image: 'https://ik.imagekit.io/6cga8hi9z/JaeTravels/TZ3_8yp4pSL1R.jpg',
    title: 'Tanzania Scenic Journey',
    tagline: 'From savannahs to sunsets, travel beyond limits',
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
