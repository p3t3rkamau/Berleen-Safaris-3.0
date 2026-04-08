// src/components/ReviewSnippet.tsx
import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface ReviewSnippetProps {
  rating: number;
  reviewCount: number;
  showCount?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ReviewSnippet: React.FC<ReviewSnippetProps> = ({ 
  rating, 
  reviewCount, 
  showCount = true,
  size = 'md' 
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };
  
  const textSize = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className="flex items-center gap-1" itemScope itemType="https://schema.org/AggregateRating">
      <meta itemProp="ratingValue" content={rating.toString()} />
      <meta itemProp="reviewCount" content={reviewCount.toString()} />
      <meta itemProp="bestRating" content="5" />
      
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className={`${sizeClasses[size]} fill-yellow-400 text-yellow-400`} />
        ))}
        {hasHalfStar && <StarHalf className={`${sizeClasses[size]} fill-yellow-400 text-yellow-400`} />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className={`${sizeClasses[size]} text-gray-300`} />
        ))}
      </div>
      
      {showCount && (
        <span className={`${textSize[size]} text-gray-600 ml-1`}>
          ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
        </span>
      )}
    </div>
  );
};