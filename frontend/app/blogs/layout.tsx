// =============================================================================
// BLOG LAYOUT - SEO Metadata for /blogs
// =============================================================================
// Provides SEO metadata for the blog section and wraps all blog pages.
// =============================================================================

import { Metadata } from 'next';
import { WebsiteJsonLd } from '@/components/seo/JsonLd';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aigentsrealty.com';

// =============================================================================
// BLOG SECTION METADATA
// =============================================================================
export const metadata: Metadata = {
  title: {
    default: 'Dubai Property Blog - Market Insights & Investment Guides',
    template: '%s | AiGentsRealty Blog',
  },

  description:
    'Expert insights on Dubai real estate investment. Market analysis, developer reviews, area guides, and tips for off-plan property investors.',

  keywords: [
    'Dubai property blog',
    'Dubai real estate news',
    'off-plan investment guides',
    'Dubai developer reviews',
    'property investment tips',
    'Dubai market analysis',
    'real estate insights Dubai',
    'Dubai area guides',
    'ROI analysis Dubai',
    'property investment strategies',
  ],

  alternates: {
    canonical: `${siteUrl}/blogs`,
  },

  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: `${siteUrl}/blogs`,
    siteName: 'AiGentsRealty',
    title: 'Dubai Property Blog - Expert Market Insights',
    description:
      'Stay informed with expert analysis, market reports, and investment strategies for Dubai real estate.',
    images: [
      {
        url: `${siteUrl}/blog-og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'AiGentsRealty Blog - Dubai Property Insights',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Dubai Property Blog - Market Insights',
    description:
      'Expert analysis and investment guides for Dubai real estate.',
    images: [`${siteUrl}/blog-twitter-image.jpg`],
  },

  robots: {
    index: true,
    follow: true,
  },
};

// =============================================================================
// LAYOUT COMPONENT
// =============================================================================
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* JSON-LD for Blog Section */}
      <WebsiteJsonLd />
      <BlogJsonLd />

      {children}
    </>
  );
}

// =============================================================================
// BLOG JSON-LD
// =============================================================================
function BlogJsonLd() {
  const blogData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${siteUrl}/blogs`,
    name: 'AiGentsRealty Blog',
    description:
      'Expert insights on Dubai real estate investment, market analysis, and property guides.',
    url: `${siteUrl}/blogs`,
    publisher: {
      '@type': 'Organization',
      name: 'AiGentsRealty',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    blogPost: [
      {
        '@type': 'BlogPosting',
        headline: 'Dubai Property Sales Hit Record High in Q4 2024',
        url: `${siteUrl}/blogs/dubai-property-sales-record-q4-2024`,
      },
      {
        '@type': 'BlogPosting',
        headline: 'The Complete Guide to Off-Plan Investment in Dubai',
        url: `${siteUrl}/blogs/complete-guide-off-plan-investment-dubai`,
      },
      {
        '@type': 'BlogPosting',
        headline: 'Emaar Properties: Complete Developer Review 2024',
        url: `${siteUrl}/blogs/emaar-properties-developer-review`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(blogData) }}
    />
  );
}
