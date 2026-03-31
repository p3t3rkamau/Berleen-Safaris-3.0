import React, { useEffect, useState } from 'react';
import { supabase } from '../imports/supabase';
import { useAuth } from './AuthContext';
import ReviewForm from './ReviewForm';
import LiveReviewsSlider from './LiveReviewsSlider';
import { Trash2, Star, User, RefreshCw } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  email: string;
  rating: number;
  comment: string;
  created_at: string;
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
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

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      setDeletingId(id);
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setReviews(reviews.filter(review => review.id !== id));
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete review');
    } finally {
      setDeletingId(null);
    }
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        size={18}
        className={i < rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-600'}
      />
    ));
  };

  return (
    <div className="space-y-12">
      {/* Live Reviews Slider Section */}
      {/* <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700">
        <LiveReviewsSlider />
      </div> */}

      {/* Add Review Form */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-xl border border-gray-700">
        <ReviewForm onReviewAdded={fetchReviews} />
      </div>

      {/* All Reviews Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">All Reviews</h2>
            <p className="text-gray-400 text-sm mt-1">
              {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'} total
            </p>
          </div>
          {isAdmin && (
            <button
              onClick={fetchReviews}
              className="text-sm text-gray-400 hover:text-white flex items-center gap-2 transition-colors"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <RefreshCw size={32} className="animate-spin text-yellow-500" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 bg-gray-800/50 rounded-xl">
            <p className="text-gray-400">No reviews yet. Be the first to leave a review!</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {reviews.slice(0, showAllReviews ? reviews.length : 4).map((review) => (
              <div
                key={review.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors relative group"
              >
                {isAdmin && (
                  <button
                    onClick={() => handleDelete(review.id)}
                    disabled={deletingId === review.id}
                    className="absolute top-4 right-4 p-2 bg-red-950/80 hover:bg-red-900 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-100"
                    title="Delete review (Admin only)"
                  >
                    {deletingId === review.id ? (
                      <RefreshCw size={16} className="animate-spin" />
                    ) : (
                      <Trash2 size={16} className="text-red-400" />
                    )}
                  </button>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-full flex items-center justify-center">
                    <User size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{review.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed">{review.comment}</p>
                
                <p className="text-xs text-gray-500 mt-4">
                  {new Date(review.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}

        {reviews.length > 4 && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="px-6 py-2 bg-yellow-700 hover:bg-yellow-600 text-white rounded-lg transition-colors"
            >
              {showAllReviews ? 'Show Less' : `View All ${reviews.length} Reviews`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}