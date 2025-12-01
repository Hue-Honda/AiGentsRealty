// =============================================================================
// DYNAMIC SITEMAP GENERATOR
// =============================================================================
// This file generates a dynamic sitemap that automatically updates.
// Next.js will serve this at /sitemap.xml
//
// BENEFITS OF DYNAMIC SITEMAP:
// 1. Automatically includes new pages
// 2. Can fetch URLs from database/API
// 3. Always up-to-date lastModified dates
// 4. No manual maintenance required
//
// HOW IT WORKS:
// - Next.js calls this function at build time (static) or request time (dynamic)
// - Returns an array of URL objects
// - Automatically generates XML sitemap
//
// PRIORITY GUIDELINES:
// - 1.0: Homepage
// - 0.9: Main category pages (projects, developers, areas)
// - 0.8: Important subpages (individual developers, popular areas)
// - 0.7: Content pages (individual projects, articles)
// - 0.6: Utility pages (calculators, tools)
// - 0.5: Less important pages
//
// CHANGE FREQUENCY:
// - always: Changes every time accessed (not recommended)
// - hourly: News, live data
// - daily: Frequently updated content
// - weekly: Regular content updates
// - monthly: Rarely changing content
// - yearly: Archive content
// - never: Historical content that won't change
// =============================================================================

import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blog-data';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aigentsrealty.com';

// =============================================================================
// STATIC PAGES - Always included
// =============================================================================
const staticPages = [
  { url: '', priority: 1.0, changeFrequency: 'daily' as const },
  { url: '/genie', priority: 0.9, changeFrequency: 'daily' as const },
  { url: '/projects', priority: 0.9, changeFrequency: 'daily' as const },
  { url: '/developers', priority: 0.9, changeFrequency: 'weekly' as const },
  { url: '/areas', priority: 0.9, changeFrequency: 'weekly' as const },
  { url: '/commercial', priority: 0.8, changeFrequency: 'weekly' as const },
  { url: '/investment', priority: 0.8, changeFrequency: 'weekly' as const },
  { url: '/insights', priority: 0.7, changeFrequency: 'daily' as const },
  { url: '/blogs', priority: 0.9, changeFrequency: 'daily' as const },
  { url: '/contact', priority: 0.6, changeFrequency: 'monthly' as const },
];

// =============================================================================
// DEVELOPER PAGES
// =============================================================================
const developers = [
  'emaar',
  'damac',
  'nakheel',
  'meraas',
  'azizi',
  'sobha',
  'binghatti',
  'danube',
  'ellington',
  'omniyat',
];

// =============================================================================
// AREA PAGES
// =============================================================================
const areas = [
  'dubai-marina',
  'downtown-dubai',
  'business-bay',
  'palm-jumeirah',
  'dubai-creek-harbour',
  'dubai-hills-estate',
  'jumeirah-village-circle',
  'dubai-south',
  'mbr-city',
  'al-furjan',
  'dubai-design-district-dubai',
  'jumeirah-beach-residence',
  'dubai-sports-city',
  'arabian-ranches',
  'damac-hills',
];

// =============================================================================
// INVESTMENT GUIDE PAGES
// =============================================================================
const investmentPages = [
  'offplan-101',
  'why-dubai',
  'first-time',
  'budget-calculator',
  'roi-calculator',
  'payment-simulator',
  'flip-strategy',
  'rental-strategy',
  'appreciation',
];

// =============================================================================
// COMMERCIAL PAGES
// =============================================================================
const commercialPages = [
  'office-spaces',
  'retail',
  'showrooms',
  'warehouses',
  'mixed-use',
  'high-yield',
  'business-bay',
  'difc',
  'free-zones',
  'roi-calculator',
  'rental-yield',
  'market-trends',
];

// =============================================================================
// INSIGHTS PAGES
// =============================================================================
const insightPages = [
  'news',
  'reports',
  'investment',
  'developers',
  'price-trends',
];

// =============================================================================
// MAIN SITEMAP FUNCTION
// =============================================================================
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString();

  // Static pages
  const staticUrls = staticPages.map((page) => ({
    url: `${siteUrl}${page.url}`,
    lastModified: currentDate,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  // Developer pages
  const developerUrls = developers.map((dev) => ({
    url: `${siteUrl}/developers/${dev}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Area pages
  const areaUrls = areas.map((area) => ({
    url: `${siteUrl}/areas/${area}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Investment pages
  const investmentUrls = investmentPages.map((page) => ({
    url: `${siteUrl}/investment/${page}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Commercial pages
  const commercialUrls = commercialPages.map((page) => ({
    url: `${siteUrl}/commercial/${page}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Insight pages
  const insightUrls = insightPages.map((page) => ({
    url: `${siteUrl}/insights/${page}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // =============================================================================
  // DYNAMIC PAGES FROM DATABASE (Future Enhancement)
  // =============================================================================
  // Uncomment and modify when you have a database of projects:
  //
  // const projects = await fetchProjectsFromDatabase();
  // const projectUrls = projects.map((project) => ({
  //   url: `${siteUrl}/areas/${project.area_slug}/${project.slug}`,
  //   lastModified: project.updatedAt,
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.7,
  // }));
  //
  // Then add projectUrls to the return array below.
  // =============================================================================

  // =============================================================================
  // BLOG POSTS - Dynamically generated from blog-data.ts
  // =============================================================================
  const blogUrls = blogPosts.map((post) => ({
    url: `${siteUrl}/blogs/${post.slug}`,
    lastModified: post.updatedAt || post.publishedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    ...staticUrls,
    ...developerUrls,
    ...areaUrls,
    ...investmentUrls,
    ...commercialUrls,
    ...insightUrls,
    ...blogUrls,
  ];
}

// =============================================================================
// HELPER: Fetch projects from API (for future use)
// =============================================================================
// async function fetchProjectsFromDatabase() {
//   try {
//     const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
//     const response = await fetch(`${apiUrl}/api/projects?fields=slug,area_slug,updatedAt`);
//     if (!response.ok) return [];
//     return await response.json();
//   } catch (error) {
//     console.error('Failed to fetch projects for sitemap:', error);
//     return [];
//   }
// }
