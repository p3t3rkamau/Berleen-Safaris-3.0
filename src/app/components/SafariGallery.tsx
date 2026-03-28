// src/components/safari-detail/SafariGallery.tsx
import Slider from 'react-slick'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  images: string[]
  title: string
}

function NextArrow({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Next image"
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full transition-all shadow"
    >
      <ChevronRight size={24} />
    </button>
  )
}

function PrevArrow({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Previous image"
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full transition-all shadow"
    >
      <ChevronLeft size={24} />
    </button>
  )
}

export function SafariGallery({ images, title }: Props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  }

  return (
    <div className="relative h-[400px] md:h-[520px] bg-gray-900 overflow-hidden">
      <Slider {...settings}>
        {images.map((src, i) => (
          <div key={i} className="h-[400px] md:h-[520px]">
            <img
              src={src}
              alt={`${title} — photo ${i + 1}`}
              className="w-full h-full object-cover"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}