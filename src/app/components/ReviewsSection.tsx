import React, { useEffect, useState } from 'react';
import { supabase } from '../imports/supabase';
import { useAuth } from './AuthContext';
import ReviewForm from './ReviewForm';
import LiveReviewsSlider from './LiveReviewsSlider';
import { Trash2, Star, User, RefreshCw, X, Eye } from 'lucide-react';

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
  const [showAllReviewsModal, setShowAllReviewsModal] = useState(false);
  const { isAdmin, user } = useAuth();

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

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <RefreshCw size={32} className="animate-spin text-yellow-500" />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Live Reviews Slider Section - Visible to Everyone */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700">
        <LiveReviewsSlider />
      </div>

      {/* Add Review Form - Visible to Everyone */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-xl border border-gray-700">
        <ReviewForm onReviewAdded={fetchReviews} />
      </div>

      {/* Admin Only Section - View All Reviews Button */}
      {isAdmin && (
        <div className="text-center">
          <button
            onClick={() => setShowAllReviewsModal(true)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Eye size={20} />
            View All Reviews ({reviews.length})
          </button>
        </div>
      )}

      {/* Modal/Popup for All Reviews - ONLY VISIBLE WHEN BUTTON CLICKED */}
      {showAllReviewsModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl border border-gray-700">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <div>
                <h2 className="text-2xl font-bold text-white">All Reviews</h2>
                <p className="text-gray-400 text-sm mt-1">
                  {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'} total
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={fetchReviews}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  title="Refresh reviews"
                >
                  <RefreshCw size={20} className="text-gray-400 hover:text-white" />
                </button>
                <button
                  title="Close modal"
                  onClick={() => setShowAllReviewsModal(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X size={24} className="text-gray-400 hover:text-white" />
                </button>
              </div>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              {reviews.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400">No reviews yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-gray-800/50 rounded-xl p-5 border border-gray-700 hover:border-red-500/50 transition-all duration-300 group"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3 flex-wrap">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-full flex items-center justify-center">
                                <User size={16} className="text-white" />
                              </div>
                              <span className="font-semibold text-white">{review.name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-xs text-gray-500">
                              {new Date(review.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-300 leading-relaxed">{review.comment}</p>
                          {review.email && (
                            <p className="text-xs text-gray-500 mt-2">Email: {review.email}</p>
                          )}
                        </div>
                        <button
                          onClick={() => handleDelete(review.id)}
                          disabled={deletingId === review.id}
                          className="p-2 bg-red-950/50 hover:bg-red-900 rounded-lg transition-colors disabled:opacity-50"
                          title="Delete review"
                        >
                          {deletingId === review.id ? (
                            <RefreshCw size={18} className="animate-spin text-red-400" />
                          ) : (
                            <Trash2 size={18} className="text-red-400" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-800">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  {reviews.length} review{reviews.length !== 1 ? 's' : ''} in total
                </p>
                <button
                  onClick={() => setShowAllReviewsModal(false)}
                  className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}