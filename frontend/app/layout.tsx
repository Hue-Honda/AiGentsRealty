import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ConditionalFooter from "@/components/ConditionalFooter";
import FloatingAIChat from "@/components/FloatingAIChat";
import FloatingCTA from "@/components/FloatingCTA";
import AIButtonHandler from "@/components/AIButtonHandler";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { NavDataProvider } from "@/contexts/NavDataContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

// =============================================================================
// SEO CONFIGURATION - Global Metadata
// =============================================================================
// This metadata applies to all pages unless overridden by page-specific metadata.
//
// Key SEO Elements:
// 1. Title Template - Appends site name to all page titles
// 2. Open Graph - Rich previews on Facebook, LinkedIn, WhatsApp
// 3. Twitter Cards - Rich previews on Twitter/X
// 4. Robots - Search engine crawling instructions
// 5. Canonical URLs - Prevents duplicate content issues
// 6. Verification - Google Search Console, Bing Webmaster
// =============================================================================

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aigentsrealty.com';

export const metadata: Metadata = {
  // Base URL for all relative URLs in metadata
  metadataBase: new URL(siteUrl),

  // Title configuration with template
  title: {
    default: "AiGentsRealty - Dubai Off-Plan Property Investment Platform",
    template: "%s | AiGentsRealty Dubai"
  },

  // Primary description - appears in search results
  description: "AI-powered platform for discovering and investing in Dubai's best off-plan properties. Compare developers, calculate ROI, explore areas, and find your perfect investment with Genie AI assistant.",

  // Keywords - still used by some search engines
  keywords: [
    "Dubai off-plan",
    "Dubai real estate",
    "off-plan property Dubai",
    "Dubai property investment",
    "Emaar properties",
    "DAMAC properties",
    "Nakheel",
    "Dubai Marina apartments",
    "Downtown Dubai property",
    "Palm Jumeirah villas",
    "Dubai ROI calculator",
    "off-plan payment plans",
    "Dubai developer comparison",
    "AI property advisor Dubai",
    "best ROI Dubai property"
  ],

  // Author and publisher information
  authors: [{ name: "AiGentsRealty", url: siteUrl }],
  creator: "AiGentsRealty",
  publisher: "AiGentsRealty",

  // Robots directives
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // =============================================================================
  // OPEN GRAPH - Facebook, LinkedIn, WhatsApp previews
  // =============================================================================
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: siteUrl,
    siteName: 'AiGentsRealty',
    title: 'AiGentsRealty - Dubai Off-Plan Property Investment Platform',
    description: 'AI-powered platform for discovering Dubai off-plan properties. Compare developers, calculate ROI, and find your perfect investment.',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`, // Create this image: 1200x630px
        width: 1200,
        height: 630,
        alt: 'AiGentsRealty - Dubai Off-Plan Property Investment',
        type: 'image/jpeg',
      },
      {
        url: `${siteUrl}/og-image-square.jpg`, // Create this image: 600x600px
        width: 600,
        height: 600,
        alt: 'AiGentsRealty Logo',
        type: 'image/jpeg',
      }
    ],
  },

  // =============================================================================
  // TWITTER CARDS - Twitter/X previews
  // =============================================================================
  twitter: {
    card: 'summary_large_image',
    site: '@aigentsrealty', // Your Twitter handle
    creator: '@aigentsrealty',
    title: 'AiGentsRealty - Dubai Off-Plan Property Investment',
    description: 'AI-powered platform for discovering Dubai off-plan properties. Compare developers, calculate ROI, and find your perfect investment.',
    images: [`${siteUrl}/twitter-image.jpg`], // Create this image: 1200x600px
  },

  // =============================================================================
  // VERIFICATION - Search Console & Webmaster Tools
  // =============================================================================
  // Add your verification codes here after setting up accounts
  verification: {
    google: 'your-google-verification-code', // Google Search Console
    yandex: 'your-yandex-verification-code', // Yandex Webmaster
    // bing: 'your-bing-verification-code', // Bing Webmaster (use other.msvalidate)
  },

  // =============================================================================
  // OTHER META TAGS
  // =============================================================================
  alternates: {
    canonical: siteUrl,
    languages: {
      'en-AE': siteUrl,
      'en-US': siteUrl,
      'ar-AE': `${siteUrl}/ar`, // For future Arabic version
    },
  },

  // App-specific metadata
  applicationName: 'AiGentsRealty',
  category: 'Real Estate',

  // Additional meta tags
  other: {
    'msvalidate.01': 'your-bing-verification-code', // Bing Webmaster
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'format-detection': 'telephone=no',
    'geo.region': 'AE-DU',
    'geo.placename': 'Dubai',
    'geo.position': '25.2048;55.2708',
    'ICBM': '25.2048, 55.2708',
  },

  // Icons configuration
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#10B981' },
    ],
  },

  // Manifest for PWA
  manifest: '/site.webmanifest',
};

// =============================================================================
// VIEWPORT CONFIGURATION
// =============================================================================
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0A0A0A' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
  ],
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />

        {/* DNS Prefetch for API */}
        <link rel="dns-prefetch" href="https://api.aigentsrealty.com" />

        {/* Organization JSON-LD - Global structured data */}
        <OrganizationJsonLd />
      </head>
      <body className={`${inter.variable} ${inter.className} antialiased`} suppressHydrationWarning>
        <NavDataProvider>
          <Navbar />
          {children}
          <ConditionalFooter />
          <FloatingCTA />
          <AIButtonHandler />
          {/* <FloatingAIChat /> */}
          <Analytics />
        </NavDataProvider>
      </body>
    </html>
  );
}
