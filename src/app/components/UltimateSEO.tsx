// src/components/UltimateSEO.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface FAQItem {
  question: string;
  answer: string;
}

interface ReviewSnippet {
  author: string;
  ratingValue: number;
  reviewBody: string;
  datePublished: string;
}

interface EventData {
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  description?: string;
  price?: string;
  image?: string;
}

interface BreadcrumbItem {
  name: string;
  item: string;
}

interface ProductOffer {
  price: number;
  priceCurrency: string;
  availability: 'InStock' | 'OutOfStock' | 'PreOrder';
  validFrom?: string;
  priceValidUntil?: string;
}

interface AggregateRatingWithItemReviewed {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
  itemReviewed?: {
    name: string;
    type?: string;
  };
}

interface UltimateSEOProps {
  // Basic SEO
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  
  // Meta Images
  ogImage?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogImageAlt?: string;
  twitterImage?: string;
  
  // Meta Video
  ogVideo?: string;
  ogVideoType?: string;
  ogVideoWidth?: number;
  ogVideoHeight?: number;
  ogVideoAlt?: string;
  
  // FAQ Schema
  faqs?: FAQItem[];
  
  // Review Snippet
  reviews?: ReviewSnippet[];
  aggregateRating?: AggregateRatingWithItemReviewed;
  
  // Events Schema
  events?: EventData[];
  
  // Breadcrumbs
  breadcrumbs?: BreadcrumbItem[];
  
  // Product/Merchant Listing
  product?: {
    name: string;
    description: string;
    image?: string;
    sku?: string;
    brand?: string;
    offers: ProductOffer;
    reviews?: ReviewSnippet[];
    aggregateRating?: {
      ratingValue: number;
      reviewCount: number;
      itemReviewed?: {
        name: string;
        type?: string;
      };
    };
  };
  
  // Merchant Listing
  merchant?: {
    name: string;
    image?: string;
    priceRange: string;
    telephone?: string;
    address?: string;
    openingHours?: string[];
    paymentAccepted?: string[];
    areaServed?: string[];
  };
  
  // Additional Meta Tags
  ogType?: 'website' | 'article' | 'product' | 'video.movie' | 'video.episode';
  twitterCard?: 'summary' | 'summary_large_image' | 'player' | 'app';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noIndex?: boolean;
  locale?: string;
}

// Helper function to normalize URLs (remove trailing slashes)
const normalizeUrl = (url: string): string => {
  // List of root domain patterns that should keep trailing slash
  const rootDomains = [
    'https://www.berleensafaris.com',
    'https://berleensafaris.com',
    'http://www.berleensafaris.com',
    'http://berleensafaris.com'
  ];
  
  // Check if it's a root domain (no path after domain)
  const isRootDomain = rootDomains.some(domain => url === domain || url === domain + '/');
  
  // Keep trailing slash for root domain
  if (isRootDomain) {
    return 'https://www.berleensafaris.com/';
  }
  
  // Remove trailing slash for all other paths
  if (url.endsWith('/')) {
    return url.slice(0, -1);
  }
  
  return url;
};

// Helper to ensure www prefix consistency
const ensureWww = (url: string): string => {
  if (url.includes('berleensafaris.com') && !url.includes('www.berleensafaris.com')) {
    return url.replace('berleensafaris.com', 'www.berleensafaris.com');
  }
  return url;
};

// Helper to ensure HTTPS
const ensureHttps = (url: string): string => {
  if (url.startsWith('http://')) {
    return url.replace('http://', 'https://');
  }
  return url;
};

export function UltimateSEO(props: UltimateSEOProps) {
  const {
    title,
    description,
    keywords = 'safari kenya, maasai mara, amboseli, tsavo, diani beach, berleen safaris',
    canonicalUrl,
    ogImage,
    ogImageWidth = 1200,
    ogImageHeight = 630,
    ogImageAlt,
    twitterImage,
    ogVideo,
    ogVideoType = 'video/mp4',
    ogVideoWidth = 1280,
    ogVideoHeight = 720,
    ogVideoAlt,
    faqs = [],
    reviews = [],
    aggregateRating,
    events = [],
    breadcrumbs = [],
    product,
    merchant,
    ogType = 'website',
    twitterCard = 'summary_large_image',
    publishedTime,
    modifiedTime,
    author = 'Berleen Safaris',
    noIndex = false,
    locale = 'en_US',
  } = props;

  const siteTitle = 'Berleen Safaris';
  const fullTitle = title === 'Home' ? siteTitle : `${title} | ${siteTitle}`;
  const siteUrl = 'https://www.berleensafaris.com';
  
  // Build the canonical URL with proper normalization
  let canonical = canonicalUrl 
    ? `${siteUrl}${canonicalUrl.startsWith('/') ? canonicalUrl : `/${canonicalUrl}`}`
    : `${siteUrl}${window.location.pathname}`;
  
  // Apply all normalizations
  canonical = normalizeUrl(ensureWww(ensureHttps(canonical)));
  
  // Build the current URL for og:url
  let currentUrl = `${siteUrl}${window.location.pathname}${window.location.search}`;
  currentUrl = normalizeUrl(ensureWww(ensureHttps(currentUrl)));
  
  const finalOgImage = ogImage || 'https://www.berleensafaris.com/images/og-default.jpg';
  const finalTwitterImage = twitterImage || finalOgImage;

  // Generate all JSON-LD schemas
  const generateSchemas = () => {
    const schemas: any[] = [];

    // Organization Schema (always included)
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'TravelAgency',
      name: 'Berleen Safaris',
      url: siteUrl,
      logo: 'https://www.berleensafaris.com/logo.png',
      sameAs: [
        'https://www.facebook.com/berleensafaris',
        'https://www.instagram.com/berleen_safaris?igsh=bTZydWlzNGI5NmMw',
        'https://twitter.com/berleensafaris',
      ],
      telephone: '+254-714-018-914',
      email: 'tours@berleensafaris.com',
      priceRange: '$$$',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Nairobi',
        addressCountry: 'KE',
      },
    });

    // FAQ Schema
    if (faqs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq: FAQItem) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      });
    }

    // Review Snippet Schema with FIXED itemReviewed
    if (reviews.length > 0 || aggregateRating) {
      const reviewSchema: any = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: title,
        description: description,
      };

      if (aggregateRating) {
        // Create the aggregate rating object with itemReviewed
        const aggregateRatingObj: any = {
          '@type': 'AggregateRating',
          ratingValue: aggregateRating.ratingValue,
          reviewCount: aggregateRating.reviewCount,
          bestRating: aggregateRating.bestRating || 5,
          worstRating: aggregateRating.worstRating || 1,
        };
        
        // CRITICAL FIX: Add itemReviewed field to AggregateRating
        if (aggregateRating.itemReviewed) {
          aggregateRatingObj.itemReviewed = {
            '@type': aggregateRating.itemReviewed.type || 'Product',
            name: aggregateRating.itemReviewed.name
          };
        } else {
          // Default itemReviewed if not provided
          aggregateRatingObj.itemReviewed = {
            '@type': 'Product',
            name: title || 'Berleen Safaris Safari Packages'
          };
        }
        
        reviewSchema.aggregateRating = aggregateRatingObj;
      }

      if (reviews.length > 0) {
        reviewSchema.review = reviews.map((review: ReviewSnippet) => ({
          '@type': 'Review',
          author: {
            '@type': 'Person',
            name: review.author,
          },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: review.ratingValue,
            bestRating: 5,
          },
          reviewBody: review.reviewBody,
          datePublished: review.datePublished,
        }));
      }

      schemas.push(reviewSchema);
    }

    // Events Schema
    if (events.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'EventSeries',
        name: 'Kenya Safari Events',
        description: 'Upcoming wildlife and cultural events in Kenya',
        event: events.map((event: EventData) => ({
          '@type': 'Event',
          name: event.name,
          startDate: event.startDate,
          endDate: event.endDate,
          location: {
            '@type': 'Place',
            name: event.location,
          },
          description: event.description,
          image: event.image,
          offers: event.price ? {
            '@type': 'Offer',
            price: event.price,
            priceCurrency: 'USD',
          } : undefined,
        })),
      });
    }

    // Breadcrumbs Schema
    if (breadcrumbs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item: BreadcrumbItem, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `${siteUrl}${item.item}`,
        })),
      });
    }

    // Product Schema
    if (product) {
      const productSchema: any = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.image,
        sku: product.sku,
        brand: {
          '@type': 'Brand',
          name: product.brand || 'Berleen Safaris',
        },
        offers: {
          '@type': 'Offer',
          price: product.offers.price,
          priceCurrency: product.offers.priceCurrency,
          availability: `https://schema.org/${product.offers.availability}`,
          validFrom: product.offers.validFrom,
          priceValidUntil: product.offers.priceValidUntil,
        },
      };
      
      if (product.aggregateRating) {
        const productAggregateRating: any = {
          '@type': 'AggregateRating',
          ratingValue: product.aggregateRating.ratingValue,
          reviewCount: product.aggregateRating.reviewCount,
          bestRating: 5,
          worstRating: 1,
        };
        
        if (product.aggregateRating.itemReviewed) {
          productAggregateRating.itemReviewed = {
            '@type': product.aggregateRating.itemReviewed.type || 'Product',
            name: product.aggregateRating.itemReviewed.name
          };
        } else {
          productAggregateRating.itemReviewed = {
            '@type': 'Product',
            name: product.name
          };
        }
        
        productSchema.aggregateRating = productAggregateRating;
      }
      
      if (product.reviews && product.reviews.length > 0) {
        productSchema.review = product.reviews.map((review: ReviewSnippet) => ({
          '@type': 'Review',
          author: review.author,
          reviewRating: {
            '@type': 'Rating',
            ratingValue: review.ratingValue,
          },
          reviewBody: review.reviewBody,
        }));
      }
      
      schemas.push(productSchema);
    }

    // Merchant Listing Schema (LocalBusiness)
    if (merchant) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: merchant.name,
        image: merchant.image,
        priceRange: merchant.priceRange,
        telephone: merchant.telephone,
        address: merchant.address ? {
          '@type': 'PostalAddress',
          streetAddress: merchant.address,
        } : undefined,
        openingHours: merchant.openingHours,
        paymentAccepted: merchant.paymentAccepted,
        areaServed: merchant.areaServed,
      });
    }

    // Video Schema
    if (ogVideo) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: ogVideoAlt || title,
        description: description,
        thumbnailUrl: ogImage,
        contentUrl: ogVideo,
        uploadDate: publishedTime || new Date().toISOString(),
        duration: ogVideoHeight ? `PT${ogVideoHeight}S` : undefined,
      });
    }

    return schemas;
  };

  const schemas = generateSchemas();

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      
      {/* Geo Tags for Local Business */}
      <meta name="geo.region" content="KE" />
      <meta name="geo.placename" content="Nairobi" />
      <meta name="geo.position" content="-1.286389;36.817223" />
      <meta name="ICBM" content="-1.286389, 36.817223" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:image:width" content={ogImageWidth.toString()} />
      <meta property="og:image:height" content={ogImageHeight.toString()} />
      {ogImageAlt && <meta property="og:image:alt" content={ogImageAlt} />}
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content={locale} />
      
      {/* Open Graph Video */}
      {ogVideo && (
        <>
          <meta property="og:video" content={ogVideo} />
          <meta property="og:video:type" content={ogVideoType} />
          <meta property="og:video:width" content={ogVideoWidth.toString()} />
          <meta property="og:video:height" content={ogVideoHeight.toString()} />
          <meta property="og:video:alt" content={ogVideoAlt || description} />
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalTwitterImage} />
      <meta name="twitter:site" content="@berleensafaris" />
      <meta name="twitter:creator" content="@berleensafaris" />
      
      {/* Article Specific Meta Tags */}
      {ogType === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {ogType === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      <meta property="article:publisher" content="https://www.facebook.com/berleensafaris" />
      
      {/* Canonical URL - FIXED with proper normalization */}
      <link rel="canonical" href={canonical} />
      
      {/* Alternate language versions */}
      <link rel="alternate" href={canonical} hrefLang="en" />
      
      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="preconnect" href="https://supabase.co" />
      
      {/* All JSON-LD Schemas */}
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema, null, 2)}
        </script>
      ))}
    </Helmet>
  );
}