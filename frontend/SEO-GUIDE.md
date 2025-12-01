# AiGentsRealty SEO Implementation Guide

## 📋 Overview

This document provides a comprehensive guide to the SEO implementation for AiGentsRealty. All SEO features are built using Next.js 14's built-in SEO capabilities.

---

## 🗂️ File Structure

```
frontend/
├── app/
│   ├── layout.tsx          # Global metadata, Open Graph, Twitter Cards
│   ├── sitemap.ts          # Dynamic sitemap generator (/sitemap.xml)
│   ├── robots.ts           # Dynamic robots.txt generator (/robots.txt)
│   └── genie/
│       └── layout.tsx      # Genie page-specific metadata
├── components/
│   └── seo/
│       └── JsonLd.tsx      # JSON-LD structured data components
└── public/
    ├── og-image.jpg        # Open Graph image (1200x630px) - TO CREATE
    ├── twitter-image.jpg   # Twitter Card image (1200x600px) - TO CREATE
    ├── genie-og-image.jpg  # Genie page OG image - TO CREATE
    └── favicon.ico         # Favicon
```

---

## ✅ Implemented Features

### 1. **Global Metadata** (`app/layout.tsx`)

| Feature | Status | Description |
|---------|--------|-------------|
| Title Template | ✅ | `%s | AiGentsRealty Dubai` |
| Meta Description | ✅ | 160 chars, keyword-rich |
| Keywords | ✅ | 15 targeted keywords |
| Open Graph | ✅ | Facebook, LinkedIn, WhatsApp previews |
| Twitter Cards | ✅ | Large image card |
| Canonical URL | ✅ | Prevents duplicate content |
| Robots Directives | ✅ | Index/follow configuration |
| Language Alternates | ✅ | en-AE, en-US, ar-AE (future) |
| Geo Tags | ✅ | Dubai location targeting |
| Viewport | ✅ | Mobile-optimized |
| Theme Color | ✅ | #0A0A0A |
| Icons | ✅ | Favicon, Apple Touch Icon |
| Preconnect | ✅ | Fonts, images for performance |

### 2. **Dynamic Sitemap** (`app/sitemap.ts`)

The sitemap automatically generates URLs for:
- Static pages (home, genie, projects, etc.)
- Developer pages (Emaar, DAMAC, Nakheel, etc.)
- Area pages (Dubai Marina, Downtown, etc.)
- Investment guide pages
- Commercial property pages
- Insights/blog pages

**Access:** `https://aigentsrealty.com/sitemap.xml`

### 3. **Dynamic Robots.txt** (`app/robots.ts`)

Configured rules:
- ✅ Allow all major search engines
- ✅ Block API endpoints
- ✅ Block admin areas
- ✅ Rate limit SEO tool bots
- ✅ Block aggressive bots
- ✅ Include sitemap reference

**Access:** `https://aigentsrealty.com/robots.txt`

### 4. **JSON-LD Structured Data** (`components/seo/JsonLd.tsx`)

| Schema Type | Usage | Rich Snippet Benefit |
|------------|-------|---------------------|
| Organization | Global | Knowledge panel, brand info |
| WebSite | Global | Sitelinks searchbox |
| RealEstateListing | Project pages | Price, location in search |
| FAQPage | Guide pages | Expandable Q&A in search |
| BreadcrumbList | All pages | Navigation breadcrumbs |
| LocalBusiness | Contact page | Google Maps, local search |
| SoftwareApplication | Genie page | App-like search result |

### 5. **Page-Specific Metadata**

| Page | File | Custom Elements |
|------|------|-----------------|
| Home | `app/layout.tsx` | Default metadata |
| Genie | `app/genie/layout.tsx` | AI assistant focus |

---

## 📝 TODO: Required Assets

Create these images for optimal social sharing:

### 1. Main Open Graph Image
- **File:** `public/og-image.jpg`
- **Size:** 1200 x 630 pixels
- **Content:** AiGentsRealty logo + Dubai skyline + tagline
- **Text:** "Dubai Off-Plan Property Investment Platform"

### 2. Square Open Graph Image
- **File:** `public/og-image-square.jpg`
- **Size:** 600 x 600 pixels
- **Content:** Logo only or logo + minimal text

### 3. Twitter Card Image
- **File:** `public/twitter-image.jpg`
- **Size:** 1200 x 600 pixels
- **Content:** Similar to OG image, optimized for Twitter

### 4. Genie Page Images
- **File:** `public/genie-og-image.jpg`
- **Size:** 1200 x 630 pixels
- **Content:** Genie AI assistant branding

### 5. Favicon Set
- `public/favicon.ico` - 32x32 ICO
- `public/favicon-16x16.png` - 16x16 PNG
- `public/favicon-32x32.png` - 32x32 PNG
- `public/apple-touch-icon.png` - 180x180 PNG
- `public/icon.svg` - Scalable SVG

---

## 🔧 Configuration Required

### 1. Update Verification Codes

In `app/layout.tsx`, replace placeholder verification codes:

```typescript
verification: {
  google: 'your-actual-google-code',  // Get from Google Search Console
  yandex: 'your-actual-yandex-code',  // Get from Yandex Webmaster
},
other: {
  'msvalidate.01': 'your-actual-bing-code',  // Get from Bing Webmaster
}
```

### 2. Update Contact Information

In `components/seo/JsonLd.tsx`, update:
- Phone number: `+971-XX-XXX-XXXX`
- Email: `info@aigentsrealty.com`
- Address: Actual business address

### 3. Update Social Media Links

In `components/seo/JsonLd.tsx`, update `sameAs` array with actual URLs:
- Facebook page
- Instagram profile
- LinkedIn company page
- Twitter/X account
- YouTube channel

### 4. Environment Variable

Add to `.env.local`:
```
NEXT_PUBLIC_SITE_URL=https://aigentsrealty.com
```

---

## 📊 How to Add SEO to New Pages

### For Server Components (recommended):

```typescript
// app/new-page/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title',  // Uses template: "Page Title | AiGentsRealty Dubai"
  description: 'Page description under 160 characters.',
  alternates: {
    canonical: 'https://aigentsrealty.com/new-page',
  },
  openGraph: {
    title: 'Page Title',
    description: 'Description for social sharing.',
    url: 'https://aigentsrealty.com/new-page',
  },
};

export default function NewPage() {
  return <div>Page content</div>;
}
```

### For Client Components:

Create a separate layout file:

```typescript
// app/new-page/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

### Adding JSON-LD to Pages:

```typescript
import { RealEstateListingJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export default function ProjectPage() {
  return (
    <>
      <RealEstateListingJsonLd
        name="Azure Residences"
        description="Luxury apartments in Dubai Hills"
        url="https://aigentsrealty.com/projects/azure-residences"
        image="https://..."
        price={900000}
        address={{ addressLocality: 'Dubai Hills Estate' }}
        developer="Emaar Properties"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://aigentsrealty.com' },
          { name: 'Projects', url: 'https://aigentsrealty.com/projects' },
          { name: 'Azure Residences', url: 'https://aigentsrealty.com/projects/azure-residences' },
        ]}
      />
      {/* Page content */}
    </>
  );
}
```

---

## 🔍 Testing & Validation

### 1. Test Structured Data
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

### 2. Test Open Graph
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### 3. Test Twitter Cards
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### 4. Test Overall SEO
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Lighthouse (in Chrome DevTools)](chrome://inspect)
- [Ahrefs Site Audit](https://ahrefs.com/site-audit)

### 5. Check Sitemap & Robots
- Visit: `https://aigentsrealty.com/sitemap.xml`
- Visit: `https://aigentsrealty.com/robots.txt`

---

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Create all required images (OG, Twitter, favicons)
- [ ] Update Google Search Console verification code
- [ ] Update Bing Webmaster verification code
- [ ] Update contact information in JsonLd.tsx
- [ ] Update social media links in JsonLd.tsx
- [ ] Set NEXT_PUBLIC_SITE_URL environment variable
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Test all pages with Google Rich Results Test
- [ ] Test social sharing with Facebook/Twitter debuggers

---

## 📈 Monitoring

### Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://aigentsrealty.com`
3. Verify using HTML tag or DNS
4. Submit sitemap: `https://aigentsrealty.com/sitemap.xml`
5. Monitor: Coverage, Performance, Core Web Vitals

### Bing Webmaster Tools
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add site and verify
3. Submit sitemap
4. Monitor: SEO reports, crawl data

---

## 📚 Resources

- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Google Search Central](https://developers.google.com/search/docs)
- [Schema.org](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards)

---

*Last updated: January 2025*
