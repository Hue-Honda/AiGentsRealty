// =============================================================================
// BLOG LISTING PAGE - /blogs
// =============================================================================
// Main blog page showing all articles, categories, and featured posts.
// Uses blog-data.ts for content (replace with CMS in production).
// =============================================================================

'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Sparkles,
  TrendingUp,
  ArrowRight,
  Calendar,
  Clock,
  Search,
  Filter,
  ChevronRight,
  Newspaper,
  BookOpen,
  Building2,
  MapPin,
  Lightbulb,
} from 'lucide-react';
import {
  blogPosts,
  blogCategories,
  getFeaturedPosts,
  getTrendingPosts,
  getRecentPosts,
  getAllTags,
  type BlogPost,
  type BlogCategory,
} from '@/lib/blog-data';

// =============================================================================
// CATEGORY ICONS
// =============================================================================
const categoryIcons: Record<string, React.ReactNode> = {
  'market-news': <Newspaper className="w-5 h-5" />,
  'investment-guides': <BookOpen className="w-5 h-5" />,
  'developer-spotlight': <Building2 className="w-5 h-5" />,
  'area-guides': <MapPin className="w-5 h-5" />,
  'tips-tricks': <Lightbulb className="w-5 h-5" />,
};

// =============================================================================
// BLOG CARD COMPONENT
// =============================================================================
function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className={`group relative block overflow-hidden rounded-3xl border border-white/10 hover:border-[#00C775]/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,199,117,0.2)] ${
        featured ? 'lg:col-span-2 lg:row-span-2' : ''
      }`}
    >
      <div className={`flex ${featured ? 'flex-col lg:flex-row h-full' : 'flex-col'}`}>
        {/* Image */}
        <div className={`relative overflow-hidden ${featured ? 'lg:w-1/2 h-64 lg:h-auto' : 'h-48'}`}>
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            suppressHydrationWarning
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {post.trending && (
              <div className="bg-[#F3C440] text-black px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                TRENDING
              </div>
            )}
            {post.featured && !featured && (
              <div className="bg-[#00C775] text-black px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                FEATURED
              </div>
            )}
          </div>

          {/* Category Badge */}
          <div className="absolute bottom-4 left-4">
            <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
              post.category.color === 'emerald'
                ? 'bg-[#00C775]/20 text-[#00C775] border border-[#00C775]/30'
                : 'bg-[#F3C440]/20 text-[#F3C440] border border-[#F3C440]/30'
            }`}>
              {post.category.name}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className={`flex-1 bg-[#0D0D0D]/80 backdrop-blur-xl p-6 ${featured ? 'lg:p-8 flex flex-col justify-center' : ''}`}>
          <h3 className={`font-black text-white mb-3 leading-tight group-hover:text-[#00C775] transition-colors ${
            featured ? 'text-2xl lg:text-3xl' : 'text-lg line-clamp-2'
          }`}>
            {post.title}
          </h3>

          <p className={`text-gray-400 mb-4 ${featured ? 'text-base' : 'text-sm line-clamp-2'}`}>
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </div>
            </div>
            <div className="flex items-center gap-2 text-[#F3C440] font-bold text-sm group-hover:gap-3 transition-all">
              <span className="hidden sm:inline">Read</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// =============================================================================
// BLOG CONTENT COMPONENT (with useSearchParams)
// =============================================================================
function BlogsContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Read category and search from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');

    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  // Get featured post for hero
  const featuredPosts = getFeaturedPosts();
  const heroPost = featuredPosts[0];

  // Filter posts based on category and search
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = selectedCategory === 'all' || post.category.slug === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Get trending posts for sidebar
  const trendingPosts = getTrendingPosts().slice(0, 4);
  const allTags = getAllTags();

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00C775]/5 rounded-full blur-[150px] animate-pulse" />
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#F3C440]/5 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </div>

      {/* NEURAL GRID */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(#00C775 1px, transparent 1px), linear-gradient(90deg, #00C775 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-16 px-6 lg:px-16">
          <div className="max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#00C775]/10 border border-[#00C775]/30 rounded-full px-6 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-[#00C775]" />
                <span className="text-sm font-bold text-[#00C775]">AI-POWERED INSIGHTS</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-[1.05] tracking-tight">
                Dubai Property
                <br />
                <span className="bg-gradient-to-r from-[#F3C440] via-[#FFD700] to-[#F3C440] bg-clip-text text-transparent">
                  Blog & Insights
                </span>
              </h1>

              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Expert analysis, market intelligence, and investment strategies to help you make informed decisions
              </p>
            </div>

            {/* Featured Post */}
            {heroPost && (
              <div className="mb-12">
                <BlogCard post={heroPost} featured />
              </div>
            )}
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="px-6 lg:px-16 pb-20">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* LEFT COLUMN - Posts */}
              <div className="flex-1">
                {/* Search & Filter Bar */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  {/* Search */}
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#0D0D0D] border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#00C775]/50 transition-all"
                    />
                  </div>

                  {/* Category Filter */}
                  <div className="relative">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="appearance-none bg-[#0D0D0D] border border-white/10 rounded-2xl pl-12 pr-12 py-3.5 text-white focus:outline-none focus:border-[#00C775]/50 transition-all cursor-pointer"
                    >
                      <option value="all">All Categories</option>
                      {blogCategories.map((category) => (
                        <option key={category.slug} value={category.slug}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 rotate-90" />
                  </div>
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-3 mb-8">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                      selectedCategory === 'all'
                        ? 'bg-[#00C775] text-black'
                        : 'bg-[#0D0D0D] border border-white/10 text-white hover:border-[#00C775]/50'
                    }`}
                  >
                    All Posts
                  </button>
                  {blogCategories.map((category) => (
                    <button
                      key={category.slug}
                      onClick={() => setSelectedCategory(category.slug)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                        selectedCategory === category.slug
                          ? category.color === 'emerald'
                            ? 'bg-[#00C775] text-black'
                            : 'bg-[#F3C440] text-black'
                          : 'bg-[#0D0D0D] border border-white/10 text-white hover:border-[#00C775]/50'
                      }`}
                    >
                      {categoryIcons[category.slug]}
                      {category.name}
                    </button>
                  ))}
                </div>

                {/* Results Count */}
                <div className="mb-6">
                  <p className="text-gray-400">
                    Showing <span className="text-white font-bold">{filteredPosts.length}</span>{' '}
                    {filteredPosts.length === 1 ? 'article' : 'articles'}
                    {selectedCategory !== 'all' && (
                      <span>
                        {' '}
                        in{' '}
                        <span className="text-[#00C775]">
                          {blogCategories.find((c) => c.slug === selectedCategory)?.name}
                        </span>
                      </span>
                    )}
                  </p>
                </div>

                {/* Posts Grid */}
                {filteredPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredPosts.map((post) => (
                      <BlogCard key={post.slug} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-[#0D0D0D]/50 rounded-3xl border border-white/10">
                    <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No articles found</h3>
                    <p className="text-gray-400">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN - Sidebar */}
              <div className="lg:w-[380px] space-y-8">
                {/* Trending Posts */}
                <div className="bg-[#0D0D0D]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="w-5 h-5 text-[#F3C440]" />
                    <h3 className="text-xl font-black text-white">Trending Now</h3>
                  </div>
                  <div className="space-y-4">
                    {trendingPosts.map((post, index) => (
                      <Link
                        key={post.slug}
                        href={`/blogs/${post.slug}`}
                        className="group flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-all"
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#F3C440]/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-[#F3C440] font-black">{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white group-hover:text-[#00C775] transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">{post.readTime}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-[#0D0D0D]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                  <h3 className="text-xl font-black text-white mb-6">Categories</h3>
                  <div className="space-y-3">
                    {blogCategories.map((category) => {
                      const count = blogPosts.filter((p) => p.category.slug === category.slug).length;
                      return (
                        <button
                          key={category.slug}
                          onClick={() => setSelectedCategory(category.slug)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                            selectedCategory === category.slug
                              ? 'bg-[#00C775]/10 border border-[#00C775]/30'
                              : 'hover:bg-white/5'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                category.color === 'emerald'
                                  ? 'bg-[#00C775]/10 text-[#00C775]'
                                  : 'bg-[#F3C440]/10 text-[#F3C440]'
                              }`}
                            >
                              {categoryIcons[category.slug]}
                            </div>
                            <span className="text-sm font-semibold text-white">{category.name}</span>
                          </div>
                          <span className="text-xs text-gray-500">{count} posts</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Popular Tags */}
                <div className="bg-[#0D0D0D]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                  <h3 className="text-xl font-black text-white mb-6">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {allTags.slice(0, 15).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 text-gray-400 hover:bg-[#00C775]/10 hover:text-[#00C775] border border-white/10 hover:border-[#00C775]/30 transition-all"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CTA Card */}
                <div className="bg-gradient-to-br from-[#0D0D0D] to-[#00C775]/10 border border-[#00C775]/20 rounded-3xl p-6 text-center">
                  <div className="w-16 h-16 bg-[#00C775]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-[#00C775]" />
                  </div>
                  <h3 className="text-xl font-black text-white mb-2">Ask Genie AI</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Get personalized investment advice from our AI property advisor
                  </p>
                  <Link
                    href="/genie"
                    className="inline-flex items-center gap-2 bg-[#00C775] text-black px-6 py-3 rounded-full font-bold hover:shadow-[0_0_30px_rgba(0,199,117,0.4)] transition-all hover:-translate-y-1"
                  >
                    <Sparkles className="w-4 h-4" />
                    Chat with Genie
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// =============================================================================
// LOADING FALLBACK COMPONENT
// =============================================================================
function BlogsLoading() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#00C775]/30 border-t-[#00C775] rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400">Loading blog posts...</p>
      </div>
    </div>
  );
}

// =============================================================================
// MAIN PAGE COMPONENT (wrapped in Suspense)
// =============================================================================
export default function BlogsPage() {
  return (
    <Suspense fallback={<BlogsLoading />}>
      <BlogsContent />
    </Suspense>
  );
}
