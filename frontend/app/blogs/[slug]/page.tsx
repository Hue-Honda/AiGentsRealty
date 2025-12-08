// =============================================================================
// BLOG POST PAGE - /blogs/[slug]
// =============================================================================
// Individual blog post page with full content, related posts, and sharing.
// Generates static pages for all blog posts at build time.
// =============================================================================

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Share2,
  Twitter,
  Linkedin,
  Facebook,
  Sparkles,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import ShareButton from './ShareButton';
import {
  blogPosts,
  getBlogPostBySlug,
  getRelatedPosts,
  type BlogPost,
} from '@/lib/blog-data';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import BlogPostContent from './BlogPostContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aigentsrealty.com';

// =============================================================================
// STATIC GENERATION
// =============================================================================
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// =============================================================================
// DYNAMIC METADATA
// =============================================================================
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    openGraph: {
      type: 'article',
      locale: 'en_AE',
      url: `${siteUrl}/blogs/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      siteName: 'AiGentsRealty',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
    alternates: {
      canonical: `${siteUrl}/blogs/${post.slug}`,
    },
  };
}

// =============================================================================
// PAGE COMPONENT
// =============================================================================
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);

  // Breadcrumb data
  const breadcrumbs = [
    { name: 'Home', url: siteUrl },
    { name: 'Blog', url: `${siteUrl}/blogs` },
    { name: post.category.name, url: `${siteUrl}/blogs?category=${post.category.slug}` },
    { name: post.title, url: `${siteUrl}/blogs/${post.slug}` },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 relative overflow-hidden">

      {/* JSON-LD */}
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ArticleJsonLd post={post} />

      <div className="relative z-10">
        {/* HEADER */}
        <header className="pt-28 pb-8 px-6 lg:px-16">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 flex-wrap">
              <Link href="/" className="hover:text-[#10B981] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/blogs" className="hover:text-[#10B981] transition-colors">
                Blog
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link
                href={`/blogs?category=${post.category.slug}`}
                className="hover:text-[#10B981] transition-colors"
              >
                {post.category.name}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-600 truncate max-w-[200px]">{post.title}</span>
            </nav>

            {/* Back Button */}
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-[#10B981] transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            {/* Category */}
            <div className="mb-4">
              <span
                className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm ${
                  post.category.color === 'emerald'
                    ? 'bg-emerald-100 text-[#10B981] border border-[#10B981]'
                    : 'bg-amber-50 text-[#D4AF37] border border-[#D4AF37]'
                }`}
              >
                {post.category.name}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-black text-[#0A0A0A] mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-sm">
                    {post.author.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-[#0A0A0A] font-semibold">{post.author.name}</p>
                  <p className="text-xs text-gray-500">{post.author.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative rounded-3xl overflow-hidden mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <article className="px-6 lg:px-16 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Main Content */}
              <div className="flex-1">
                <BlogPostContent content={post.content} />

                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-3 flex-wrap">
                    <Tag className="w-4 h-4 text-gray-500" />
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blogs?search=${tag}`}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-50 text-gray-600 hover:bg-emerald-50 hover:text-[#10B981] border border-gray-200 hover:border-[#10B981] transition-all"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Share */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Share2 className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Share this article:</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${siteUrl}/blogs/${post.slug}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-all"
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                      <a
                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`${siteUrl}/blogs/${post.slug}`)}&title=${encodeURIComponent(post.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-[#0077B5] hover:text-white transition-all"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${siteUrl}/blogs/${post.slug}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all"
                      >
                        <Facebook className="w-4 h-4" />
                      </a>
                      <ShareButton url={`${siteUrl}/blogs/${post.slug}`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* RELATED POSTS */}
        {relatedPosts.length > 0 && (
          <section className="px-6 lg:px-16 pb-20">
            <div className="max-w-[1600px] mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black text-[#0A0A0A]">
                  Related <span className="text-[#10B981]">Articles</span>
                </h2>
                <Link
                  href="/blogs"
                  className="flex items-center gap-2 text-[#D4AF37] font-bold hover:gap-3 transition-all"
                >
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blogs/${relatedPost.slug}`}
                    className="group block overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-md hover:border-[#10B981] transition-all duration-500 hover:-translate-y-2 hover:shadow-lg"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold bg-white shadow-md ${
                            relatedPost.category.color === 'emerald'
                              ? 'text-[#10B981] border border-[#10B981]'
                              : 'text-[#D4AF37] border border-[#D4AF37]'
                          }`}
                        >
                          {relatedPost.category.name}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-[#0A0A0A] mb-2 group-hover:text-[#10B981] transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(relatedPost.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {relatedPost.readTime}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="px-6 lg:px-16 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-emerald-50 to-white border border-[#10B981] rounded-3xl p-8 lg:p-12 text-center shadow-lg">
              <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-[#10B981]" />
              </div>
              <h2 className="text-3xl font-black text-[#0A0A0A] mb-4">
                Have Questions About This Topic?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
                Ask Genie AI for personalized advice based on your investment goals and budget
              </p>
              <Link
                href="/genie"
                className="inline-flex items-center gap-3 bg-[#10B981] text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <Sparkles className="w-5 h-5" />
                Chat with Genie AI
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// =============================================================================
// ARTICLE JSON-LD
// =============================================================================
function ArticleJsonLd({ post }: { post: BlogPost }) {
  const articleData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'AiGentsRealty',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blogs/${post.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }}
    />
  );
}
