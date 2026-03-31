// components/LiveReviewsSlider.tsx
import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../imports/supabase';
import { Star, Quote, ChevronLeft, ChevronRight, Pause, Play, Trash2, Plus } from 'lucide-react';
import ReviewForm from './ReviewForm';

interface Review {
  id: number;
  name: string;
  email: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface LiveReviewsSliderProps {
  isAdmin?: boolean;
  onReviewDeleted?: () => void;
}

export default function LiveReviewsSlider({ isAdmin = false, onReviewDeleted }: LiveReviewsSliderProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    if (isPlaying && reviews.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
      }, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, reviews.length]);

  const fetchReviews = async () => {
    try {
      setError(null);
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  // Updated handleDeleteReview function with better debugging
const handleDeleteReview = async (reviewId: number, e: React.MouseEvent) => {
  e.stopPropagation();
  
  if (!window.confirm('Are you sure you want to delete this review?')) {
    return;
  }
  
  setDeletingId(reviewId);
  
  try {
    // Get current user for debugging
    const { data: { user } } = await supabase.auth.getUser();
    console.log('Current user:', user);
    
    if (!user) {
      alert('You must be logged in to delete reviews');
      return;
    }
    
    // Check user's role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    
    console.log('User profile:', profile);
    console.log('Profile error:', profileError);
    
    if (profileError || !profile || profile.role !== 'admin') {
      alert('You do not have admin privileges to delete reviews');
      return;
    }
    
    // Attempt deletion
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId);

    if (error) throw error;
    
    // Update local state
    const updatedReviews = reviews.filter(review => review.id !== reviewId);
    setReviews(updatedReviews);
    
    // Adjust current index if needed
    if (currentIndex >= updatedReviews.length) {
      setCurrentIndex(Math.max(0, updatedReviews.length - 1));
    }
    
    alert('Review deleted successfully!');
    
    // Notify parent component if callback provided
    if (onReviewDeleted) {
      onReviewDeleted();
    }
  } catch (error: any) {
    console.error('Error deleting review:', error);
    alert(`Failed to delete review: ${error.message || 'Please try again.'}`);
  } finally {
    setDeletingId(null);
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
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
      }, 5000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  };

  const handleReviewAdded = () => {
    fetchReviews();
    setShowReviewForm(false);
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

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400">{error}</p>
        <button 
          onClick={fetchReviews}
          className="mt-4 px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Title Section with Add Review Button */}
      <div className="text-center mb-8">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
          <div className="flex-1"></div>
          <div className="text-center flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Live Reviews
            </h2>
            <p className="text-gray-400">Real reviews from our happy travelers</p>
          </div>
          <div className="flex-1 flex justify-end">
            <button
              onClick={() => setShowReviewForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Plus size={18} />
              Write a Review
            </button>
          </div>
        </div>
        
        {isAdmin && (
          <p className="text-yellow-500 text-sm mt-2 flex items-center justify-center gap-2">
            <Trash2 size={14} /> Admin Mode: Hover over any review and click the trash icon to delete
          </p>
        )}
      </div>

      {/* Slider Container */}
      {reviews.length > 0 ? (
        <>
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
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-yellow-500/50 transition-all duration-300 relative group">
                    {/* Delete Button - Only visible to admins on hover */}
                    {isAdmin && (
                      <button
                        onClick={(e) => handleDeleteReview(review.id, e)}
                        disabled={deletingId === review.id}
                        className="absolute top-4 right-4 p-2 bg-red-500/20 hover:bg-red-500/40 rounded-lg transition-all z-10 opacity-0 group-hover:opacity-100 focus:opacity-100"
                        title="Delete review"
                      >
                        {deletingId === review.id ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        ) : (
                          <Trash2 size={18} className="text-red-400 hover:text-red-300" />
                        )}
                      </button>
                    )}
                    
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
        </>
      ) : (
        <div className="text-center py-12 bg-white/5 rounded-2xl">
          <p className="text-gray-400 mb-4">No reviews yet. Be the first to share your experience!</p>
          <button
            onClick={() => setShowReviewForm(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-full transition-all duration-300 shadow-lg"
          >
            <Plus size={20} />
            Write First Review
          </button>
        </div>
      )}

      {/* Review Form Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="relative max-w-lg w-full">
            <button
              onClick={() => setShowReviewForm(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              ✕ Close
            </button>
            <ReviewForm onReviewAdded={handleReviewAdded} />
          </div>
        </div>
      )}
    </div>
  );
}