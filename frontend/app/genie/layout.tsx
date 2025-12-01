// =============================================================================
// GENIE PAGE LAYOUT - Page-Specific SEO Metadata
// =============================================================================
// This layout provides SEO metadata specific to the Genie AI assistant page.
//
// WHY A SEPARATE LAYOUT?
// The main page.tsx is a client component ('use client'), which cannot export
// metadata directly. This layout file handles the metadata for the /genie route.
//
// METADATA INHERITANCE:
// - This metadata extends the global metadata from app/layout.tsx
// - Page title uses the template: "Ask Genie AI | AiGentsRealty Dubai"
// - Open Graph and Twitter cards are customized for this page
// =============================================================================

import { Metadata } from 'next';
import { WebsiteJsonLd, SoftwareApplicationJsonLd } from '@/components/seo/JsonLd';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aigentsrealty.com';

// =============================================================================
// PAGE-SPECIFIC METADATA
// =============================================================================
export const metadata: Metadata = {
  // Page title (uses template from root layout: "Ask Genie AI | AiGentsRealty Dubai")
  title: 'Ask Genie AI - Your Dubai Property Investment Advisor',

  // Page-specific description (important for SEO - be specific and include keywords)
  description: 'Chat with Genie, your AI-powered Dubai property advisor. Get instant answers about off-plan investments, ROI calculations, payment plans, developer comparisons, and area insights.',

  // Page-specific keywords
  keywords: [
    'Dubai property AI',
    'AI real estate advisor',
    'Dubai investment chatbot',
    'off-plan AI assistant',
    'property ROI calculator Dubai',
    'Dubai real estate AI',
    'Genie property advisor',
    'ask AI about Dubai property',
  ],

  // Canonical URL for this page
  alternates: {
    canonical: `${siteUrl}/genie`,
  },

  // Open Graph - Customized for Genie page
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: `${siteUrl}/genie`,
    siteName: 'AiGentsRealty',
    title: 'Ask Genie AI - Dubai Property Investment Advisor',
    description: 'Chat with Genie AI to find your perfect Dubai off-plan investment. Get instant ROI analysis, developer comparisons, and personalized recommendations.',
    images: [
      {
        url: `${siteUrl}/genie-og-image.jpg`, // Create this image: 1200x630px featuring Genie
        width: 1200,
        height: 630,
        alt: 'Genie AI - Dubai Property Investment Advisor',
        type: 'image/jpeg',
      },
    ],
  },

  // Twitter Card - Customized for Genie page
  twitter: {
    card: 'summary_large_image',
    site: '@aigentsrealty',
    creator: '@aigentsrealty',
    title: 'Ask Genie AI - Dubai Property Advisor',
    description: 'Chat with Genie AI to find your perfect Dubai off-plan investment. Get instant ROI analysis and personalized recommendations.',
    images: [`${siteUrl}/genie-twitter-image.jpg`],
  },

  // Robots - Allow indexing
  robots: {
    index: true,
    follow: true,
  },
};

// =============================================================================
// LAYOUT COMPONENT
// =============================================================================
export default function GenieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* JSON-LD Structured Data for Genie page */}
      <WebsiteJsonLd />
      <SoftwareApplicationJsonLd />

      {children}
    </>
  );
}
