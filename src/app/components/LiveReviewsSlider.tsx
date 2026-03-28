import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../imports/supabase';
import { Star, Quote, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  email: string;
  rating: number;
  comment: string;
  created_at: string;
}

export default function LiveReviewsSlider() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    if (isPlaying && reviews.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
      }, 5000); // Change slide every 5 seconds
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, reviews.length]);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    resetAutoPlay();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      if (isPlaying) {
        intervalRef.current = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % reviews.length);
        }, 5000);
      }
    }
  };

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      // Resume autoplay
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
      }, 5000);
    } else {
      // Pause autoplay
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-500'}
      />
    ));
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
        <p className="text-gray-400 mt-2">Loading live reviews...</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No reviews yet. Be the first to share your experience!</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Title Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Live Reviews
        </h2>
        <p className="text-gray-400">Real reviews from our happy travelers</p>
      </div>

      {/* Slider Container */}
      <div className="relative overflow-hidden" ref={sliderRef}>
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="w-full flex-shrink-0 px-4"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-yellow-500/50 transition-all duration-300">
                <Quote className="w-12 h-12 text-yellow-500 mb-6 opacity-50" />
                <p className="text-gray-200 text-lg leading-relaxed mb-6 italic">
                  "{review.comment}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-lg">{review.name}</h4>
                    <div className="flex items-center gap-1 mt-2">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(review.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={handlePrevious}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Previous review"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        
        <button
          onClick={toggleAutoPlay}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-white" />
          ) : (
            <Play className="w-5 h-5 text-white" />
          )}
        </button>
        
        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Next review"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {reviews.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentIndex(idx);
              resetAutoPlay();
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? 'w-8 bg-yellow-500'
                : 'w-2 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to review ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}