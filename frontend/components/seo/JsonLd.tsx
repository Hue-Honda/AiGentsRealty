// =============================================================================
// JSON-LD STRUCTURED DATA COMPONENTS
// =============================================================================
// These components generate JSON-LD structured data for rich snippets in Google.
//
// WHAT IS JSON-LD?
// JSON-LD (JavaScript Object Notation for Linked Data) is a method of encoding
// structured data that search engines use to understand page content better.
// This can result in rich snippets, knowledge panels, and better search rankings.
//
// BENEFITS:
// 1. Rich snippets in search results (stars, prices, availability)
// 2. Better understanding of your content by search engines
// 3. Eligibility for Google's special search features
// 4. Improved click-through rates from search results
//
// DOCUMENTATION:
// - Google: https://developers.google.com/search/docs/appearance/structured-data
// - Schema.org: https://schema.org/
// =============================================================================

import Script from 'next/script';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aigentsrealty.com';

// =============================================================================
// ORGANIZATION SCHEMA
// =============================================================================
// Used globally to identify your business to search engines.
// Appears in knowledge panels and establishes brand identity.
// =============================================================================
export function OrganizationJsonLd() {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `${siteUrl}/#organization`,
    name: 'AiGentsRealty',
    alternateName: 'AiGents Realty Dubai',
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/logo.png`,
      width: 512,
      height: 512,
    },
    image: `${siteUrl}/og-image.jpg`,
    description: 'AI-powered platform for discovering and investing in Dubai off-plan properties. Compare developers, calculate ROI, and find your perfect investment.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Dubai', // Update with actual address
      addressLocality: 'Dubai',
      addressRegion: 'Dubai',
      postalCode: '',
      addressCountry: 'AE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.2048,
      longitude: 55.2708,
    },
    areaServed: {
      '@type': 'City',
      name: 'Dubai',
      '@id': 'https://www.wikidata.org/wiki/Q612',
    },
    sameAs: [
      'https://www.facebook.com/aigentsrealty',
      'https://www.instagram.com/aigentsrealty',
      'https://www.linkedin.com/company/aigentsrealty',
      'https://twitter.com/aigentsrealty',
      'https://www.youtube.com/@aigentsrealty',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+971-XX-XXX-XXXX', // Update with actual phone
        contactType: 'sales',
        areaServed: 'AE',
        availableLanguage: ['English', 'Arabic'],
      },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '10:00',
        closes: '14:00',
      },
    ],
    priceRange: 'AED 500,000 - AED 50,000,000',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
    />
  );
}

// =============================================================================
// WEBSITE SCHEMA
// =============================================================================
// Enables sitelinks searchbox in Google search results.
// Tells Google about your site's search functionality.
// =============================================================================
export function WebsiteJsonLd() {
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: 'AiGentsRealty',
    description: 'AI-powered Dubai off-plan property investment platform',
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/genie?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en-AE',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
    />
  );
}

// =============================================================================
// REAL ESTATE LISTING SCHEMA
// =============================================================================
// For individual property/project pages. Shows price, location, etc in search.
// Use this on project detail pages.
// =============================================================================
interface RealEstateListingProps {
  name: string;
  description: string;
  url: string;
  image: string;
  price: number;
  priceCurrency?: string;
  address: {
    streetAddress?: string;
    addressLocality: string; // e.g., "Dubai Marina"
    addressRegion?: string;  // e.g., "Dubai"
    addressCountry?: string;
  };
  numberOfRooms?: number;
  floorSize?: {
    value: number;
    unitCode: string; // "SQF" for square feet, "SQM" for square meters
  };
  developer?: string;
  datePosted?: string;
  validThrough?: string;
}

export function RealEstateListingJsonLd({
  name,
  description,
  url,
  image,
  price,
  priceCurrency = 'AED',
  address,
  numberOfRooms,
  floorSize,
  developer,
  datePosted,
  validThrough,
}: RealEstateListingProps) {
  const listingData = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name,
    description,
    url,
    image,
    datePosted: datePosted || new Date().toISOString().split('T')[0],
    validThrough: validThrough || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'RealEstateAgent',
        name: 'AiGentsRealty',
        url: siteUrl,
      },
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.streetAddress || '',
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion || 'Dubai',
      addressCountry: address.addressCountry || 'AE',
    },
    ...(numberOfRooms && { numberOfRooms }),
    ...(floorSize && {
      floorSize: {
        '@type': 'QuantitativeValue',
        value: floorSize.value,
        unitCode: floorSize.unitCode,
      },
    }),
    ...(developer && {
      provider: {
        '@type': 'Organization',
        name: developer,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(listingData) }}
    />
  );
}

// =============================================================================
// FAQ SCHEMA
// =============================================================================
// For FAQ sections. Shows expandable Q&A directly in search results.
// Great for investment guides and area pages.
// =============================================================================
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQJsonLdProps {
  faqs: FAQItem[];
}

export function FAQJsonLd({ faqs }: FAQJsonLdProps) {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
    />
  );
}

// =============================================================================
// BREADCRUMB SCHEMA
// =============================================================================
// Shows breadcrumb trail in search results.
// Helps users understand page hierarchy.
// =============================================================================
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
    />
  );
}

// =============================================================================
// LOCAL BUSINESS SCHEMA
// =============================================================================
// Enhanced local business data for Google Maps and local search.
// =============================================================================
export function LocalBusinessJsonLd() {
  const localBusinessData = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `${siteUrl}/#localbusiness`,
    name: 'AiGentsRealty Dubai',
    image: `${siteUrl}/og-image.jpg`,
    url: siteUrl,
    telephone: '+971-XX-XXX-XXXX', // Update with actual phone
    email: 'info@aigentsrealty.com', // Update with actual email
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Dubai', // Update with actual address
      addressLocality: 'Dubai',
      addressRegion: 'Dubai',
      postalCode: '',
      addressCountry: 'AE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.2048,
      longitude: 55.2708,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    priceRange: 'AED 500K - 50M',
    servesCuisine: 'Real Estate Services', // This field is optional
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '150', // Update with actual reviews
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
    />
  );
}

// =============================================================================
// SOFTWARE APPLICATION SCHEMA (for Genie AI)
// =============================================================================
// Describes the AI assistant feature.
// =============================================================================
export function SoftwareApplicationJsonLd() {
  const appData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Genie AI Property Advisor',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'AED',
    },
    description: 'AI-powered property advisor that helps you find the perfect Dubai off-plan investment. Ask about ROI, payment plans, developers, and more.',
    featureList: [
      'AI Property Recommendations',
      'ROI Calculator',
      'Investment Analysis',
      'Developer Comparison',
      'Payment Plan Simulator',
      'Area Insights',
    ],
    screenshot: `${siteUrl}/genie-screenshot.jpg`,
    url: `${siteUrl}/genie`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(appData) }}
    />
  );
}
