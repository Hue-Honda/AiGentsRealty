'use client';

import { useState } from 'react';
import { Sparkles, TrendingUp, FileText, Lightbulb, Building2, ArrowRight, Newspaper, BarChart3, Target, Bell, ChevronRight, Calendar, User } from 'lucide-react';
import Link from 'next/link';

export default function InsightsPage() {
  const [email, setEmail] = useState('');

  const categories = [
    {
      title: 'Market News',
      href: '/insights/news',
      icon: <Newspaper className="w-8 h-8" />,
      description: 'Latest market updates and trends',
      color: 'emerald',
      count: '24 articles'
    },
    {
      title: 'Monthly Reports',
      href: '/insights/reports',
      icon: <FileText className="w-8 h-8" />,
      description: 'Comprehensive market analysis',
      color: 'gold',
      count: '12 reports'
    },
    {
      title: 'Investment Insights',
      href: '/insights/investment',
      icon: <Lightbulb className="w-8 h-8" />,
      description: 'AI-powered investment strategies',
      color: 'emerald',
      count: '18 insights'
    },
    {
      title: 'Developer Updates',
      href: '/insights/developers',
      icon: <Building2 className="w-8 h-8" />,
      description: 'Latest from top developers',
      color: 'gold',
      count: '15 updates'
    }
  ];

  const latestInsights = [
    {
      category: 'Market News',
      title: 'Dubai Property Sales Hit Record High in Q4 2024',
      excerpt: 'Dubai real estate market continues its remarkable growth trajectory with unprecedented transaction volumes...',
      date: '2024-11-20',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800',
      trending: true
    },
    {
      category: 'Investment Insights',
      title: 'Top 5 Off-Plan Projects with Highest ROI Potential',
      excerpt: 'Our AI analysis reveals the most promising off-plan investments for 2025 based on location, developer track record...',
      date: '2024-11-18',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      trending: true
    },
    {
      category: 'Developer Updates',
      title: 'Emaar Announces Three New Projects in Dubai Creek Harbour',
      excerpt: 'Leading developer Emaar Properties unveils ambitious expansion plans with waterfront developments...',
      date: '2024-11-15',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      trending: false
    },
    {
      category: 'Monthly Report',
      title: 'Dubai Real Estate Market Report - November 2024',
      excerpt: 'Comprehensive analysis of market performance, pricing trends, and investment opportunities for November...',
      date: '2024-11-01',
      readTime: '12 min read',
      image: 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=800',
      trending: false
    }
  ];

  const trendingTopics = [
    'Off-Plan ROI Analysis',
    'Dubai Creek Harbour',
    'Payment Plan Flexibility',
    'Luxury Waterfront',
    'DLD Regulations',
    'Rental Yield Trends'
  ];

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] relative overflow-hidden">
      {/* SUBTLE LIGHT GRADIENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#10B981]/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-16 px-6 lg:px-16">
          <div className="max-w-[1600px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#10B981]/10 border border-[#10B981]/30 rounded-full px-6 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm font-bold text-[#10B981]">AI-POWERED INTELLIGENCE</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-[#0A0A0A] mb-6 leading-[1.05] tracking-tight">
              Dubai Real Estate
              <br />
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#D4AF37] to-[#D4AF37] bg-clip-text text-transparent">
                Market Insights
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Data-driven analysis, market intelligence, and investment strategies powered by AI
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-4">
                <div className="text-3xl font-black text-[#10B981] mb-1">24</div>
                <div className="text-xs text-gray-600 uppercase font-semibold">Articles</div>
              </div>
              <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-4">
                <div className="text-3xl font-black text-[#D4AF37] mb-1">12</div>
                <div className="text-xs text-gray-600 uppercase font-semibold">Reports</div>
              </div>
              <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-4">
                <div className="text-3xl font-black text-[#10B981] mb-1">18</div>
                <div className="text-xs text-gray-600 uppercase font-semibold">Insights</div>
              </div>
              <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-4">
                <div className="text-3xl font-black text-[#D4AF37] mb-1">15</div>
                <div className="text-xs text-gray-600 uppercase font-semibold">Updates</div>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIES GRID */}
        <section className="px-6 lg:px-16 pb-16">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.title}
                  href={category.href}
                  className={`group relative block overflow-hidden rounded-3xl border transition-all duration-500 hover:-translate-y-2 ${
                    category.color === 'emerald'
                      ? 'border-[#10B981]/20 hover:border-[#10B981]/60 hover:shadow-lg'
                      : 'border-[#D4AF37]/20 hover:border-[#D4AF37]/60 hover:shadow-lg'
                  }`}
                >
                  <div className="bg-white shadow-md p-8">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                      category.color === 'emerald'
                        ? 'bg-[#10B981]/10 text-[#10B981]'
                        : 'bg-[#D4AF37]/10 text-[#D4AF37]'
                    }`}>
                      {category.icon}
                    </div>

                    <h3 className="text-2xl font-black text-[#0A0A0A] mb-3 group-hover:text-[#10B981] transition-colors">
                      {category.title}
                    </h3>

                    <p className="text-sm text-gray-600 mb-4">{category.description}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-500 uppercase">{category.count}</span>
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                        category.color === 'emerald'
                          ? 'border-[#10B981] text-[#10B981] group-hover:bg-[#10B981] group-hover:text-white'
                          : 'border-[#D4AF37] text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-white'
                      }`}>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* LATEST INSIGHTS */}
        <section className="px-6 lg:px-16 pb-16">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl lg:text-5xl font-black text-[#0A0A0A]">
                Latest <span className="text-[#10B981]">Insights</span>
              </h2>
              <Link href="/insights/news" className="flex items-center gap-2 text-[#D4AF37] font-bold hover:gap-3 transition-all">
                <span>View All</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {latestInsights.map((insight, index) => (
                <div
                  key={index}
                  className="group relative block overflow-hidden rounded-3xl border border-gray-200 hover:border-[#10B981]/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-lg cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="relative w-full md:w-1/3 h-64 md:h-auto overflow-hidden">
                      <img
                        src={insight.image}
                        alt={insight.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        suppressHydrationWarning
                      />
                      {insight.trending && (
                        <div className="absolute top-4 left-4 z-20">
                          <div className="bg-[#D4AF37] text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5">
                            <TrendingUp className="w-3.5 h-3.5" />
                            TRENDING
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-white shadow-md p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-bold text-[#10B981] uppercase">{insight.category}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{insight.readTime}</span>
                      </div>

                      <h3 className="text-xl font-black text-[#0A0A0A] mb-3 leading-tight group-hover:text-[#10B981] transition-colors line-clamp-2">
                        {insight.title}
                      </h3>

                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{insight.excerpt}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(insight.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-sm group-hover:gap-3 transition-all">
                          <span>Read More</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRENDING TOPICS */}
        <section className="px-6 lg:px-16 pb-16">
          <div className="max-w-[1600px] mx-auto">
            <div className="bg-[#F9FAFB] border border-gray-200 shadow-md rounded-3xl p-10">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-[#D4AF37]" />
                <h3 className="text-2xl font-black text-[#0A0A0A]">Trending Topics</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {trendingTopics.map((topic) => (
                  <button
                    key={topic}
                    className="bg-white border border-[#10B981]/30 hover:border-[#10B981]/60 px-5 py-2.5 rounded-full text-sm font-semibold text-[#0A0A0A] hover:bg-[#10B981]/10 transition-all hover:-translate-y-0.5"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* NEWSLETTER CTA */}
        <section className="px-6 lg:px-16 pb-20">
          <div className="max-w-[1600px] mx-auto">
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-[#F9FAFB] via-[#F9FAFB] to-[#D4AF37]/10 shadow-md">
              <div className="relative p-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-[#D4AF37]/10 rounded-2xl mb-6">
                  <Bell className="w-10 h-10 text-[#D4AF37]" />
                </div>
                <h2 className="text-4xl lg:text-5xl font-black text-[#0A0A0A] mb-4">
                  Stay Ahead of the Market
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Subscribe to receive weekly insights, market reports, and exclusive investment opportunities
                </p>
                <div className="max-w-xl mx-auto">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 bg-white border border-gray-300 rounded-full px-6 py-4 text-[#0A0A0A] placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-all"
                    />
                    <button className="bg-gradient-to-r from-[#D4AF37] to-[#D4AF37] px-8 py-4 rounded-full font-bold text-white shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                      Subscribe
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-4">
                    Join 10,000+ investors receiving our insights. Unsubscribe anytime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
