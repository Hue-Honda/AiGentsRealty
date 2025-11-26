'use client';

import { useState } from 'react';
import { Sparkles, TrendingUp, Calendar, Clock, User, ArrowRight, ChevronDown, X, Tag } from 'lucide-react';
import Link from 'next/link';

export default function NewsPage() {
  const [filters, setFilters] = useState({
    category: 'all',
    sortBy: 'latest'
  });

  const resetFilters = () => {
    setFilters({
      category: 'all',
      sortBy: 'latest'
    });
  };

  const newsArticles = [
    {
      id: 1,
      category: 'Market Trends',
      title: 'Dubai Property Sales Hit Record High in Q4 2024',
      excerpt: 'Dubai real estate market continues its remarkable growth trajectory with unprecedented transaction volumes reaching AED 145 billion in Q4 2024, marking a 32% increase year-over-year. The surge is driven by strong international investor confidence and strategic government initiatives.',
      image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200',
      date: '2024-11-20',
      readTime: '5 min read',
      author: 'Sarah Ahmed',
      trending: true
    },
    {
      id: 2,
      category: 'Policy',
      title: 'New DLD Regulations Streamline Property Registration Process',
      excerpt: 'Dubai Land Department introduces digital-first approach reducing registration time from 48 hours to just 4 hours. The new system integrates blockchain technology ensuring enhanced security and transparency for all property transactions.',
      image: 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=1200',
      date: '2024-11-18',
      readTime: '4 min read',
      author: 'Mohammed Al-Farsi',
      trending: true
    },
    {
      id: 3,
      category: 'New Launches',
      title: 'Emaar Unveils Three Luxury Projects in Dubai Creek Harbour',
      excerpt: 'Leading developer Emaar Properties announces ambitious expansion with three waterfront developments totaling 2,500 units. Projects feature innovative payment plans with 80/20 structure and expected ROI of 14-16% based on market analysis.',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200',
      date: '2024-11-15',
      readTime: '6 min read',
      author: 'Lisa Chen',
      trending: true
    },
    {
      id: 4,
      category: 'Economy',
      title: 'UAE Central Bank Maintains Interest Rates Benefiting Real Estate',
      excerpt: 'Central Bank of UAE keeps interest rates stable at 5.4%, creating favorable conditions for property investors. Analysts predict continued mortgage accessibility driving sustained demand in off-plan segment through 2025.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200',
      date: '2024-11-12',
      readTime: '4 min read',
      author: 'David Thompson',
      trending: false
    },
    {
      id: 5,
      category: 'Market Trends',
      title: 'Luxury Segment Dominates with 45% of Total Transactions',
      excerpt: 'Premium properties above AED 5 million account for nearly half of all Dubai real estate transactions, reflecting the emirate\'s position as global luxury destination. Waterfront communities lead demand.',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200',
      date: '2024-11-10',
      readTime: '5 min read',
      author: 'Fatima Hassan',
      trending: false
    },
    {
      id: 6,
      category: 'New Launches',
      title: 'DAMAC Introduces AI-Powered Smart Home Development',
      excerpt: 'DAMAC Properties launches groundbreaking project featuring fully integrated AI home automation in all 800 units. The development in Dubai South targets tech-savvy investors with 10% ROI projections.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
      date: '2024-11-08',
      readTime: '5 min read',
      author: 'James Wilson',
      trending: false
    },
    {
      id: 7,
      category: 'Policy',
      title: 'Golden Visa Expansion Drives International Investment Surge',
      excerpt: 'UAE expands Golden Visa criteria attracting 15,000+ property investors in 2024. New categories include smaller investment thresholds making Dubai more accessible to global buyers.',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200',
      date: '2024-11-05',
      readTime: '6 min read',
      author: 'Aisha Rahman',
      trending: false
    },
    {
      id: 8,
      category: 'Market Trends',
      title: 'Off-Plan Sales Outpace Ready Properties for Third Consecutive Quarter',
      excerpt: 'Off-plan market captures 68% of total sales volume with investors favoring flexible payment plans and capital appreciation potential. Average ROI in off-plan segment reaches 13.5%.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
      date: '2024-11-03',
      readTime: '4 min read',
      author: 'Omar Khalid',
      trending: false
    },
    {
      id: 9,
      category: 'Economy',
      title: 'Dubai Ranks #1 Globally for Real Estate Investment Returns',
      excerpt: 'Latest Knight Frank report positions Dubai as top-performing real estate market worldwide with 18.2% average price appreciation. City outperforms London, New York, and Singapore.',
      image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1200',
      date: '2024-11-01',
      readTime: '7 min read',
      author: 'Rachel Green',
      trending: false
    },
    {
      id: 10,
      category: 'New Launches',
      title: 'Nakheel Announces Phase 3 of Palm Jebel Ali Development',
      excerpt: 'Master developer Nakheel reveals expansion plans for Palm Jebel Ali with 3,000 new waterfront units. First phase launches Q1 2025 with early bird pricing starting AED 2.5M.',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200',
      date: '2024-10-28',
      readTime: '5 min read',
      author: 'Ahmed Malik',
      trending: false
    }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;
  const totalPages = Math.ceil(newsArticles.length / articlesPerPage);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = newsArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* AI PARTICLE GLOW BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00C775]/5 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#F3C440]/5 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#00C775]/3 rounded-full blur-[200px]"></div>
      </div>

      {/* NEURAL GRID OVERLAY */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#00C775 1px, transparent 1px), linear-gradient(90deg, #00C775 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}></div>
      </div>

      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-16 px-6 lg:px-16">
          <div className="max-w-[1600px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#00C775]/10 border border-[#00C775]/30 rounded-full px-6 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-[#00C775]" />
              <span className="text-sm font-bold text-[#00C775]">REAL-TIME UPDATES</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-white mb-6 leading-[1.05] tracking-tight">
              Latest Market News
              <br />
              <span className="bg-gradient-to-r from-[#F3C440] via-[#FFD700] to-[#F3C440] bg-clip-text text-transparent">
                & Updates
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Stay informed with the latest developments in Dubai's real estate market
            </p>
          </div>
        </section>

        {/* FILTER BAR */}
        <section className="sticky top-20 z-50 px-6 lg:px-16 mb-12">
          <div className="max-w-[1600px] mx-auto">
            <div className="bg-[#0D0D0D]/95 backdrop-blur-2xl border border-[#00C775]/20 rounded-3xl shadow-[0_20px_80px_rgba(0,199,117,0.15)] p-6">

              {/* FILTERS ROW */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                {/* Category */}
                <div className="relative group">
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-full bg-[#0D0D0D] border border-[#00C775]/20 hover:border-[#00C775]/50 rounded-full px-4 py-3 text-white text-sm font-semibold focus:outline-none focus:border-[#00C775] transition-all appearance-none cursor-pointer"
                  >
                    <option value="all">All Categories</option>
                    <option value="policy">Policy</option>
                    <option value="market-trends">Market Trends</option>
                    <option value="new-launches">New Launches</option>
                    <option value="economy">Economy</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00C775] pointer-events-none" />
                </div>

                {/* Sort By */}
                <div className="relative group">
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                    className="w-full bg-[#0D0D0D] border border-[#00C775]/20 hover:border-[#00C775]/50 rounded-full px-4 py-3 text-white text-sm font-semibold focus:outline-none focus:border-[#00C775] transition-all appearance-none cursor-pointer"
                  >
                    <option value="latest">Latest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="trending">Most Popular</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00C775] pointer-events-none" />
                </div>

                {/* Reset */}
                <button
                  onClick={resetFilters}
                  className="bg-transparent border border-white/10 hover:border-white/30 px-5 py-3 rounded-full font-semibold text-white text-sm hover:bg-white/5 transition-all"
                >
                  <div className="flex items-center justify-center gap-2">
                    <X className="w-4 h-4" />
                    <span>Reset Filters</span>
                  </div>
                </button>
              </div>

              {/* RESULTS COUNT */}
              <div className="text-sm text-gray-400 font-semibold">
                Showing {currentArticles.length} of {newsArticles.length} articles
              </div>
            </div>
          </div>
        </section>

        {/* NEWS GRID */}
        <section className="px-6 lg:px-16 pb-16">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentArticles.map((article) => (
                <div
                  key={article.id}
                  className="group relative block overflow-hidden rounded-3xl border border-white/10 hover:border-[#00C775]/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,199,117,0.3)] cursor-pointer"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <div className="bg-[#00C775]/20 backdrop-blur-xl border border-[#00C775]/50 rounded-lg px-3 py-1.5 flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-[#00C775]" />
                        <span className="text-xs font-bold text-white">{article.category}</span>
                      </div>
                    </div>

                    {/* Trending Badge */}
                    {article.trending && (
                      <div className="absolute top-4 right-4 z-20">
                        <div className="bg-[#F3C440] text-black px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5" />
                          TRENDING
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="bg-[#0D0D0D]/80 backdrop-blur-xl p-6">
                    <h3 className="text-xl font-black text-white mb-3 leading-tight group-hover:text-[#00C775] transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-sm text-gray-400 mb-4 line-clamp-3">{article.excerpt}</p>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTime}
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        {article.author}
                      </div>
                    </div>

                    {/* Read More */}
                    <div className="flex items-center gap-2 text-[#F3C440] font-bold text-sm group-hover:gap-3 transition-all">
                      <span>Read Full Article</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PAGINATION */}
        <section className="px-6 lg:px-16 pb-20">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="bg-[#0D0D0D] border border-[#00C775]/20 hover:border-[#00C775]/60 px-6 py-3 rounded-full font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5"
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-12 h-12 rounded-full font-bold transition-all ${
                    currentPage === index + 1
                      ? 'bg-gradient-to-r from-[#00C775] to-[#00A85D] text-white shadow-[0_0_20px_rgba(0,199,117,0.4)]'
                      : 'bg-[#0D0D0D] border border-white/10 text-white hover:border-[#00C775]/50'
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="bg-[#0D0D0D] border border-[#00C775]/20 hover:border-[#00C775]/60 px-6 py-3 rounded-full font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
