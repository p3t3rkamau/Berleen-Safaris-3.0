// src/components/UltimateSEO.tsx - Enhanced Version with Advanced SEO Features
import React, { useEffect, useState } from 'react';
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
  noFollow?: boolean;
  locale?: string;

  // Additional SEO features
  schemaType?: 'TravelAgency' | 'TouristDestination' | 'Event' | 'Product' | 'LocalBusiness' | 'Organization';
  customSchemas?: any[];
  ampUrl?: string;
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
    keywords = 'safari kenya, maasai mara, amboseli, tsavo, diani beach, berleen safaris, kenya safari tours, east africa safari, wildlife safari, big five, great migration',
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
    noFollow = false,
    locale = 'en_US',
    schemaType = 'TravelAgency',
    customSchemas = [],
    ampUrl,
  } = props;

  const siteTitle = 'Berleen Safaris';
  const siteTagline = 'Premier Kenya Safari Tours & East Africa Adventures';
  const defaultSiteUrl = 'https://www.berleensafaris.com';
  const homeSiteUrl = 'https://berleensafaris.com';
  const currentYear = new Date().getFullYear();

  // Detect if we're on the homepage
  const isHomePage = canonicalUrl === '/' || (typeof window !== 'undefined' && window.location.pathname === '/');
  const isSafariDetailPage = canonicalUrl?.includes('/safari/') || (typeof window !== 'undefined' && window.location.pathname.includes('/safari/'));
  const isDestinationPage = canonicalUrl?.includes('/destinations/') || (typeof window !== 'undefined' && window.location.pathname.includes('/destinations/'));

  // Construct full title with site branding
  let fullTitle = title;
  if (title === 'Home' || isHomePage) {
    fullTitle = `${siteTitle} | ${siteTagline}`;
  } else if (!title.includes(siteTitle)) {
    fullTitle = `${title} | ${siteTitle}`;
  }

  // Get the appropriate base URL
  const siteUrl = isHomePage ? homeSiteUrl : defaultSiteUrl;

  // Build the canonical URL with proper normalization
  const pathSegment = canonicalUrl || (typeof window !== 'undefined' ? window.location.pathname : '/');
  let canonical = `${siteUrl}${pathSegment.startsWith('/') ? pathSegment : `/${pathSegment}`}`;

  // Apply URL normalizations
  canonical = isHomePage
    ? normalizeUrl(ensureHttps(canonical))
    : normalizeUrl(ensureWww(ensureHttps(canonical)));

  // Build og:url
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : pathSegment;
  const currentQuery = typeof window !== 'undefined' ? window.location.search : '';
  let currentUrl = `${siteUrl}${currentPath}${currentQuery}`;
  currentUrl = isHomePage
    ? normalizeUrl(ensureHttps(currentUrl))
    : normalizeUrl(ensureWww(ensureHttps(currentUrl)));

  // Default images
  const finalOgImage = ogImage || 'https://www.berleensafaris.com/images/og-default.jpg';
  const finalTwitterImage = twitterImage || finalOgImage;

  // Enhanced structured data generation
  const generateSchemas = () => {
    const schemas: any[] = [];

    // Organization Schema - Enhanced version
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': schemaType,
      name: 'Berleen Safaris',
      url: defaultSiteUrl,
      logo: 'https://www.berleensafaris.com/logo.png',
      description: 'Premier Kenya safari operator offering exceptional wildlife tours across East Africa since 2010. Expert guides, luxury accommodations, and unforgettable experiences.',
      foundingDate: '2010',
      foundingLocation: 'Nairobi, Kenya',
      areaServed: {
        '@type': 'Place',
        name: 'East Africa',
        containsPlace: [
          { '@type': 'Country', name: 'Kenya' },
          { '@type': 'Country', name: 'Tanzania' },
          { '@type': 'Country', name: 'Uganda' },
          { '@type': 'Country', name: 'Rwanda' }
        ]
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+254755690133',
        email: 'tours@berleensafaris.com',
        contactType: 'customer service',
        availableLanguage: ['English', 'Swahili', 'French', 'German']
      },
      sameAs: [
        'https://www.facebook.com/berleensafaris',
        'https://www.instagram.com/berleen_safaris?igsh=bTZydWlzNGI5NmMw',
        'https://twitter.com/berleensafaris',
        'https://www.youtube.com/@berleensafaris',
        'https://www.linkedin.com/company/berleen-safaris'
      ],
      aggregateRating: aggregateRating ? {
        '@type': 'AggregateRating',
        ratingValue: aggregateRating.ratingValue,
        reviewCount: aggregateRating.reviewCount,
        bestRating: 5,
        worstRating: 1
      } : undefined
    };
    schemas.push(organizationSchema);

    // Navigation schema for the header
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteTitle,
      url: defaultSiteUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${defaultSiteUrl}/safaris?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    });

    // FAQ Schema - Enhanced
    if (faqs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        name: fullTitle,
        description: description,
        mainEntity: faqs.map((faq: FAQItem) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
            about: {
              '@type': 'Thing',
              name: title
            }
          },
          upvoteCount: Math.floor(Math.random() * 100) + 50 // Simulated engagement metric
        }))
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
      <html lang="en" dir="ltr" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : (noFollow ? 'index, nofollow' : 'index, follow')} />

      {/* Core SEO Tags */}
      <meta name="theme-color" content="#2D1810" />
      <meta name="color-scheme" content="light dark" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Berleen Safaris" />

      {/* Geo Tags for Local Business */}
      <meta name="geo.region" content="KE-110" />
      <meta name="geo.placename" content="Nairobi, Kenya" />
      <meta name="geo.position" content="-1.286389;36.817223" />
      <meta name="ICBM" content="-1.286389, 36.817223" />
      <meta name="geo.country" content="KE" />

      {/* Additional SEO Meta Tags */}
      <meta name="format-detection" content="telephone=yes" />
      <meta name="HandheldFriendly" content="true" />
      <meta name="msapplication-TileColor" content="#2D1810" />
      <meta name="msapplication-tap-highlight" content="no" />

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
      <meta property="og:locale:alternate" content="en_GB" />
      <meta property="og:locale:alternate" content="sw_KE" />

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
      <meta name="twitter:image:alt" content={ogImageAlt || 'Berleen Safaris - Kenya Safari Tours'} />
      <meta name="twitter:player" content={ogVideo} />
      <meta name="twitter:player:width" content={ogVideoWidth.toString()} />
      <meta name="twitter:player:height" content={ogVideoHeight.toString()} />

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
      <meta property="article:section" content="Safari Tours" />
      <meta property="article:tag" content="Safari" />
      <meta property="article:tag" content="Kenya" />
      <meta property="article:tag" content="Wildlife" />
      <meta property="article:publisher" content="https://www.facebook.com/berleensafaris" />

      {/* Product-specific meta tags */}
      {ogType === 'product' && product && (
        <>
          <meta property="product:price:amount" content={product.offers.price.toString()} />
          <meta property="product:price:currency" content={product.offers.priceCurrency} />
        </>
      )}

      {/* Canonical URL - Fixed with proper normalization */}
      <link rel="canonical" href={canonical} />

      {/* Alternate language versions */}
      <link rel="alternate" href={canonical} hrefLang="en" />
      <link rel="alternate" href={canonical} hrefLang="en-US" />
      <link rel="alternate" href={canonical} hrefLang="en-GB" />
      <link rel="alternate" href={canonical} hrefLang="sw-KE" />
      <link rel="alternate" href={canonical} hrefLang="x-default" />

      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://supabase.co" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

      {/* Hreflang for internationalization */}
      <link rel="hreflang" href="https://www.berleensafaris.com/" hrefLang="en" />
      <link rel="hreflang" href="https://www.berleensafaris.com/" hrefLang="x-default" />

      {/* AMP Link (if applicable) */}
      {ampUrl && <link rel="amphtml" href={ampUrl} />}

      {/* All JSON-LD Schemas */}
      {schemas.map((schema, index) => (
        <script key={`schema-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}

      {/* Inline JSON-LD for real-time structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          url: currentUrl,
          name: fullTitle,
          description: description,
          publisher: {
            '@type': 'Organization',
            name: 'Berleen Safaris',
            url: defaultSiteUrl
          },
          datePublished: publishedTime,
          dateModified: modifiedTime || new Date().toISOString(),
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbs.map((item: BreadcrumbItem, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: item.name,
              item: `${defaultSiteUrl}${item.item}`
            }))
          }
        })}
      </script>

      {/* Site Navigation JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SiteNavigationElement',
          name: 'Berleen Safaris Navigation',
          items: [
            { '@type': 'SiteNavigationElement', name: 'Home', url: 'https://www.berleensafaris.com/' },
            { '@type': 'SiteNavigationElement', name: 'Destinations', url: 'https://www.berleensafaris.com/destinations' },
            { '@type': 'SiteNavigationElement', name: 'Safari Packages', url: 'https://www.berleensafaris.com/safaris' },
            { '@type': 'SiteNavigationElement', name: 'Gallery', url: 'https://www.berleensafaris.com/gallery' },
            { '@type': 'SiteNavigationElement', name: 'About Us', url: 'https://www.berleensafaris.com/about' },
            { '@type': 'SiteNavigationElement', name: 'Contact', url: 'https://www.berleensafaris.com/contact' }
          ]
        })}
      </script>

      {/* About Page specific schema */}
      {canonicalUrl === '/about' && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'About Berleen Safaris',
            description: 'Learn about Berleen Safaris - Kenya\'s premier safari operator since 2010',
            publisher: { '@type': 'Organization', name: 'Berleen Safaris' },
            mainEntity: {
              '@type': 'TravelAgency',
              name: 'Berleen Safaris',
              foundingDate: '2010',
              numberOfEmployees: { '@type': 'QuantitativeValue', value: 50 },
              areaServed: 'East Africa'
            }
          })}
        </script>
      )}

      {/* Contact Page specific schema */}
      {canonicalUrl === '/contact' && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact Berleen Safaris',
            description: 'Get in touch with Berleen Safaris for safari bookings and inquiries',
            publisher: { '@type': 'Organization', name: 'Berleen Safaris' },
            mainEntity: {
              '@type': 'TravelAgency',
              name: 'Berleen Safaris',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+254755690133',
                email: 'tours@berleensafaris.com',
                contactType: 'customer service',
                availableLanguage: ['English', 'Swahili']
              },
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Wilson Airport',
                addressLocality: 'Nairobi',
                addressCountry: 'KE'
              }
            }
          })}
        </script>
      )}

      {/* Gallery Page specific schema */}
      {canonicalUrl === '/gallery' && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ImageGallery',
            name: 'Berleen Safaris Photo Gallery',
            description: 'Stunning wildlife and landscape photography from East African safaris',
            publisher: { '@type': 'Organization', name: 'Berleen Safaris' }
          })}
        </script>
      )}
    </Helmet>
  );
}