import React, { useState } from 'react';
import { supabase } from '../imports/supabase';
import { Star, Send } from 'lucide-react';

interface ReviewFormProps {
  onReviewAdded: () => void; // Callback to refresh reviews after adding
}

export default function ReviewForm({ onReviewAdded }: ReviewFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address (e.g., name@example.com)');
      return;
    }

    if (!comment.trim()) {
      setError('Please write your review');
      return;
    }

    if (comment.trim().length < 10) {
      setError('Please write at least 10 characters');
      return;
    }

    setLoading(true);

    try {
      const { error: supabaseError } = await supabase
        .from('reviews')
        .insert([
          {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            rating: rating,
            comment: comment.trim(),
            created_at: new Date().toISOString(),
          },
        ]);

      if (supabaseError) throw supabaseError;

      setSuccess('Thank you for your review!');
      setName('');
      setEmail('');
      setRating(5);
      setComment('');
      onReviewAdded(); // Refresh the reviews list
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <button
        title="Select rating"
        key={star}
        type="button"
        onClick={() => setRating(star)}
        onMouseEnter={() => setHoverRating(star)}
        onMouseLeave={() => setHoverRating(0)}
        className="focus:outline-none transition-transform hover:scale-110"
      >
        <Star
          size={28}
          className={`${
            star <= (hoverRating || rating)
              ? 'fill-yellow-500 text-yellow-500'
              : 'text-gray-600 fill-gray-800'
          } transition-colors`}
        />
      </button>
    ));
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-xl border border-gray-700">
      <h3 className="text-2xl font-bold text-white mb-6">Share Your Experience</h3>
      
      {error && (
        <div className="bg-red-950/50 border border-red-800 text-red-400 p-3 rounded-xl mb-4 text-sm">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-950/50 border border-green-800 text-green-400 p-3 rounded-xl mb-4 text-sm">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-colors"
            placeholder="John Doe"
            disabled={loading}
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-colors"
            placeholder="john@example.com"
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">
            We'll never share your email with anyone else
          </p>
        </div>

        {/* Rating Stars */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Your Rating *
          </label>
          <div className="flex gap-1">
            {renderStars()}
          </div>
        </div>

        {/* Review Comment */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Your Review *
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-colors resize-none"
            placeholder="Tell us about your experience with Berleen Safaris..."
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">
            Minimum 10 characters
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-gray-700 disabled:cursor-not-allowed py-3 rounded-xl font-medium text-white transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            'Submitting...'
          ) : (
            <>
              <Send size={18} />
              Submit Review
            </>
          )}
        </button>
      </form>
    </div>
  );
}