import React from 'react';
import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet-async';
import { TopBar } from '../components/TopBar';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

export function RootLayout() {
  return (
    <>
      {/* Global Website Schema for Every Page */}
      <Helmet>
        {/* Website Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Berleen Safaris',
            url: 'https://www.berleensafaris.com',
            description: 'Premier Kenya safari operator offering exceptional wildlife tours across East Africa since 2010.',
            publisher: {
              '@type': 'Organization',
              '@id': 'https://www.berleensafaris.com/#organization'
            },
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://www.berleensafaris.com/safaris?q={search_term_string}'
              },
              'query-input': 'required name=search_term_string'
            }
          })}
        </script>

        {/* Organization Schema with Full Details */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Organization',
                '@id': 'https://www.berleensafaris.com/#organization',
                name: 'Berleen Safaris',
                url: 'https://www.berleensafaris.com',
                logo: 'https://www.berleensafaris.com/logo.png',
                description: 'Premier Kenya safari operator offering exceptional wildlife tours across East Africa. Expert guides, luxury accommodations, and unforgettable safari experiences since 2010.',
                foundingDate: '2010',
                foundingLocation: {
                  '@type': 'City',
                  name: 'Nairobi',
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Nairobi',
                    addressCountry: 'KE'
                  }
                },
                areaServed: [
                  { '@type': 'Country', name: 'Kenya' },
                  { '@type': 'Country', name: 'Tanzania' },
                  { '@type': 'Country', name: 'Uganda' },
                  { '@type': 'Country', name: 'Rwanda' }
                ],
                contactPoint: [
                  {
                    '@type': 'ContactPoint',
                    telephone: '+254755690133',
                    email: 'tours@berleensafaris.com',
                    contactType: 'customer service',
                    availableLanguage: ['English', 'Swahili', 'French', 'German'],
                    hoursAvailable: {
                      '@type': 'OpeningHoursSpecification',
                      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                      opens: '08:00',
                      closes: '18:00'
                    }
                  }
                ],
                sameAs: [
                  'https://www.facebook.com/berleensafaris',
                  'https://www.instagram.com/berleen_safaris?igsh=bTZydWlzNGI5NmMw',
                  'https://twitter.com/berleensafaris',
                  'https://www.youtube.com/@berleensafaris',
                  'https://www.linkedin.com/company/berleen-safaris'
                ],
                hasOfferCatalog: {
                  '@type': 'OfferCatalog',
                  name: 'Safari Packages',
                  itemListElement: [
                    {
                      '@type': 'Offer',
                      name: 'Kenya Safari Packages',
                      description: 'Safari tours in Kenya including Maasai Mara, Amboseli, Tsavo and more'
                    },
                    {
                      '@type': 'Offer',
                      name: 'Tanzania Safari Packages',
                      description: 'Safari tours in Tanzania including Serengeti, Ngorongoro, Tarangire'
                    },
                    {
                      '@type': 'Offer',
                      name: 'Uganda Safari Packages',
                      description: 'Safari tours in Uganda including gorilla trekking and wildlife'
                    },
                    {
                      '@type': 'Offer',
                      name: 'Rwanda Safari Packages',
                      description: 'Safari tours in Rwanda including mountain gorilla trekking'
                    }
                  ]
                },
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: 4.9,
                  reviewCount: 1247,
                  bestRating: 5,
                  worstRating: 1
                },
                priceRange: '$$$'
              },
              {
                '@type': 'TravelAgency',
                '@id': 'https://www.berleensafaris.com/#travelagency',
                name: 'Berleen Safaris',
                url: 'https://www.berleensafaris.com',
                parentOrganization: { '@id': 'https://www.berleensafaris.com/#organization' },
                areaServed: 'East Africa',
                tourBookingPage: 'https://www.berleensafaris.com/contact'
              }
            ]
          })}
        </script>

        {/* BreadcrumbList Schema - Applied globally */}
        {/* Note: Individual pages will override this if they have breadcrumbs prop */}

        {/* Global meta tags for all pages */}
        <meta name="google-site-verification" content="your-google-verification-code-here" />
        <meta name="fb:app_id" content="your-facebook-app-id" />
        <meta name="theme-color" content="#2D1810" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <TopBar />
        <Navigation />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
