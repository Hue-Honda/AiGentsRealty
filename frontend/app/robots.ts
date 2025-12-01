// =============================================================================
// DYNAMIC ROBOTS.TXT GENERATOR
// =============================================================================
// This file generates a dynamic robots.txt that Next.js serves at /robots.txt
//
// WHAT IS ROBOTS.TXT?
// A text file that tells search engine crawlers which pages they can/cannot access.
// It's the first file search engines look for when crawling your site.
//
// IMPORTANT NOTES:
// 1. robots.txt is a suggestion, not a security measure
// 2. Malicious bots can ignore it
// 3. Don't use it to hide sensitive content (use authentication instead)
// 4. Keep it simple and focused on crawl optimization
//
// DIRECTIVES:
// - User-agent: Specifies which bot the rules apply to (* = all bots)
// - Allow: Explicitly allows crawling of a path
// - Disallow: Blocks crawling of a path
// - Crawl-delay: Seconds between requests (not supported by Google)
// - Sitemap: Location of your sitemap
// =============================================================================

import { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aigentsrealty.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // =============================================================================
        // DEFAULT RULES - All search engines
        // =============================================================================
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',           // API endpoints
          '/admin/',         // Admin area (if exists)
          '/_next/',         // Next.js internal files
          '/private/',       // Private pages (if exists)
          '/*.json$',        // JSON files
          '/search?*',       // Search results with parameters
        ],
      },
      {
        // =============================================================================
        // GOOGLE BOT - Full access
        // =============================================================================
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        // =============================================================================
        // GOOGLE IMAGE BOT - Allow image crawling
        // =============================================================================
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
      {
        // =============================================================================
        // BING BOT - Full access
        // =============================================================================
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        // =============================================================================
        // SEO TOOL BOTS - Rate limited to prevent server overload
        // =============================================================================
        userAgent: 'AhrefsBot',
        allow: '/',
        disallow: ['/api/'],
        // Note: Crawl-delay not directly supported in Next.js robots
      },
      {
        userAgent: 'SemrushBot',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        // =============================================================================
        // AGGRESSIVE/UNWANTED BOTS - Block completely
        // =============================================================================
        userAgent: 'MJ12bot',
        disallow: '/',
      },
      {
        userAgent: 'DotBot',
        disallow: '/',
      },
      {
        userAgent: 'BLEXBot',
        disallow: '/',
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
