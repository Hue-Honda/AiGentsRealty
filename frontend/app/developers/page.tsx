'use client';

import { useState } from 'react';
import { Star, Building2, TrendingUp, CheckCircle } from 'lucide-react';
import Link from 'next/link';

type FilterType = 'all' | 'top-rated' | 'most-projects' | 'best-roi';

export default function DevelopersPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const developers = [
    {
      id: 1,
      name: 'Emaar Properties',
      slug: 'emaar',
      logo: '🏢',
      rating: 4.7,
      established: 1997,
      totalProjects: 45,
      completedProjects: 32,
      activeProjects: 13,
      onTimeDelivery: 95.5,
      customerSatisfaction: 4.8,
      avgROI: 12.5,
      description: "Dubai's largest property developer known for iconic projects like Burj Khalifa and Dubai Mall."
    },
    {
      id: 2,
      name: 'DAMAC Properties',
      slug: 'damac',
      logo: '🏗️',
      rating: 4.5,
      established: 2002,
      totalProjects: 38,
      completedProjects: 28,
      activeProjects: 10,
      onTimeDelivery: 92.0,
      customerSatisfaction: 4.6,
      avgROI: 11.8,
      description: 'Luxury real estate developer known for high-end residential and commercial properties.'
    },
    {
      id: 3,
      name: 'Nakheel',
      slug: 'nakheel',
      logo: '🌴',
      rating: 4.6,
      established: 2000,
      totalProjects: 28,
      completedProjects: 22,
      activeProjects: 6,
      onTimeDelivery: 93.5,
      customerSatisfaction: 4.7,
      avgROI: 13.2,
      description: 'Master developer behind Palm Jumeirah and other landmark projects.'
    },
    {
      id: 4,
      name: 'Meraas',
      slug: 'meraas',
      logo: '🏛️',
      rating: 4.4,
      established: 2007,
      totalProjects: 22,
      completedProjects: 15,
      activeProjects: 7,
      onTimeDelivery: 90.0,
      customerSatisfaction: 4.5,
      avgROI: 10.8,
      description: 'Innovative developer creating unique lifestyle destinations.'
    },
    {
      id: 5,
      name: 'Azizi Developments',
      slug: 'azizi',
      logo: '🏙️',
      rating: 4.3,
      established: 2007,
      totalProjects: 31,
      completedProjects: 18,
      activeProjects: 13,
      onTimeDelivery: 88.5,
      customerSatisfaction: 4.4,
      avgROI: 14.2,
      description: 'Fast-growing developer offering affordable luxury in prime locations.'
    },
    {
      id: 6,
      name: 'Sobha Realty',
      slug: 'sobha',
      logo: '🏘️',
      rating: 4.6,
      established: 1995,
      totalProjects: 18,
      completedProjects: 14,
      activeProjects: 4,
      onTimeDelivery: 94.0,
      customerSatisfaction: 4.7,
      avgROI: 11.5,
      description: 'Premium developer known for quality construction and timely delivery.'
    }
  ];

  // Filter and sort developers based on active filter
  const getFilteredDevelopers = () => {
    let filtered = [...developers];

    switch (activeFilter) {
      case 'all':
        return filtered;
      case 'top-rated':
        return filtered.sort((a, b) => b.rating - a.rating);
      case 'most-projects':
        return filtered.sort((a, b) => b.totalProjects - a.totalProjects);
      case 'best-roi':
        return filtered.sort((a, b) => b.avgROI - a.avgROI);
      default:
        return filtered;
    }
  };

  const filteredDevelopers = getFilteredDevelopers();

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-[#D4AF37] via-[#E8C676] to-[#10B981] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-white mb-3">
            Dubai Developers
          </h1>
          <p className="text-white text-lg">
            Discover verified developers with proven track records
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Premium Filter Pills */}
        <div className="flex gap-3 mb-12 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setActiveFilter('all')}
            className={`group inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold whitespace-nowrap transition-all ${
              activeFilter === 'all'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#E8C676] text-white shadow-md'
                : 'bg-white border border-gray-200 text-gray-600 hover:text-[#D4AF37] hover:border-[#D4AF37]/60 shadow-sm'
            }`}
          >
            <Building2 className="w-4 h-4" />
            All Developers
          </button>
          <button
            onClick={() => setActiveFilter('top-rated')}
            className={`group inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold whitespace-nowrap transition-all ${
              activeFilter === 'top-rated'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#E8C676] text-white shadow-md'
                : 'bg-white border border-gray-200 text-gray-600 hover:text-[#D4AF37] hover:border-[#D4AF37]/60 shadow-sm'
            }`}
          >
            <Star className="w-4 h-4" />
            Top Rated
          </button>
          <button
            onClick={() => setActiveFilter('most-projects')}
            className={`group inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold whitespace-nowrap transition-all ${
              activeFilter === 'most-projects'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#E8C676] text-white shadow-md'
                : 'bg-white border border-gray-200 text-gray-600 hover:text-[#D4AF37] hover:border-[#D4AF37]/60 shadow-sm'
            }`}
          >
            <Building2 className="w-4 h-4" />
            Most Projects
          </button>
          <button
            onClick={() => setActiveFilter('best-roi')}
            className={`group inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold whitespace-nowrap transition-all ${
              activeFilter === 'best-roi'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#E8C676] text-white shadow-md'
                : 'bg-white border border-gray-200 text-gray-600 hover:text-[#D4AF37] hover:border-[#D4AF37]/60 shadow-sm'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Best ROI
          </button>
        </div>

        {/* ULTRA PREMIUM Developers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDevelopers.map((developer, index) => (
            <Link
              key={developer.id}
              href={`/developers/${developer.slug}`}
              className="group relative block overflow-hidden rounded-2xl border border-gray-200 hover:border-[#D4AF37]/60 transition-all duration-500 hover:-translate-y-2 shadow-md hover:shadow-xl"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Full-Width Background Image */}
              <div className="relative h-[480px] overflow-hidden">
                <img
                  src={`https://images.unsplash.com/photo-${
                    index === 0 ? '1512917774080-9991f1c4c750' :
                    index === 1 ? '1545324418-cc1a3fa10c00' :
                    index === 2 ? '1600596542815-ffad4c1539a9' :
                    index === 3 ? '1580587771525-78b9dba3b914' :
                    index === 4 ? '1600607687939-ce8a6c25118c' :
                    '1613490493576-7fde63acd811'
                  }?w=800&h=600&fit=crop&q=90`}
                  alt={developer.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  suppressHydrationWarning
                />

                {/* Light Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/50 to-white/95"></div>

                {/* TOP SECTION */}
                <div className="absolute top-0 left-0 right-0 p-6 z-10">
                  <div className="flex items-start justify-between">
                    {/* Left: Logo + Name + Rating */}
                    <div className="flex items-start gap-3">
                      {/* Developer Logo/Icon */}
                      <div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#E8C676] rounded-xl flex items-center justify-center text-2xl border-2 border-white shadow-md">
                        {developer.logo}
                      </div>

                      <div>
                        <h3 className="text-2xl font-black text-[#0A0A0A] mb-1 leading-tight">
                          {developer.name}
                        </h3>
                        {/* Rating */}
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                          <span className="text-lg font-bold text-[#0A0A0A]">{developer.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: AI Verified Badge */}
                    <div className="relative">
                      <div className="bg-white/90 backdrop-blur-xl border border-[#10B981]/60 rounded-xl px-3 py-1.5 shadow-md">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4 text-[#10B981]" />
                          <span className="text-xs font-bold text-[#0A0A0A]">AI Verified</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* MIDDLE SECTION */}
                <div className="absolute top-32 left-0 right-0 px-6 z-10">
                  {/* Elegant Description */}
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                    {developer.description}
                  </p>
                </div>

                {/* KEY METRICS - 2x2 Grid */}
                <div className="absolute bottom-24 left-0 right-0 px-6 z-10">
                  <div className="grid grid-cols-2 gap-3">
                    {/* Active Projects */}
                    <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-xl p-3 shadow-md">
                      <div className="flex items-center gap-2 mb-1">
                        <Building2 className="w-4 h-4 text-[#10B981]" />
                        <span className="text-xs text-gray-600 uppercase tracking-wide">Active</span>
                      </div>
                      <div className="text-2xl font-black text-[#10B981]">{developer.activeProjects}</div>
                    </div>

                    {/* Avg ROI */}
                    <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-xl p-3 shadow-md">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
                        <span className="text-xs text-gray-600 uppercase tracking-wide">ROI</span>
                      </div>
                      <div className="text-2xl font-black text-[#D4AF37]">{developer.avgROI}%</div>
                    </div>

                    {/* On-Time Delivery */}
                    <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-xl p-3 shadow-md">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-[#10B981]" />
                        <span className="text-xs text-gray-600 uppercase tracking-wide">On-Time</span>
                      </div>
                      <div className="text-2xl font-black text-[#10B981]">{developer.onTimeDelivery}%</div>
                    </div>

                    {/* Customer Satisfaction */}
                    <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-xl p-3 shadow-md">
                      <div className="flex items-center gap-2 mb-1">
                        <Star className="w-4 h-4 text-[#D4AF37]" />
                        <span className="text-xs text-gray-600 uppercase tracking-wide">Rating</span>
                      </div>
                      <div className="text-2xl font-black text-[#D4AF37]">{developer.customerSatisfaction}</div>
                    </div>
                  </div>
                </div>

                {/* BOTTOM SECTION */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <div className="flex items-center justify-between">
                    {/* Established Year */}
                    <span className="text-sm text-gray-600 font-semibold">Est. {developer.established}</span>

                    {/* Gold CTA */}
                    <div className="relative group/cta">
                      <div className="relative flex items-center gap-2 text-[#D4AF37] font-bold group-hover/cta:gap-3 transition-all">
                        <span>View Projects</span>
                        <svg className="w-5 h-5 transition-transform group-hover/cta:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
