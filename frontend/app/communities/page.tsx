'use client';

import { useState } from 'react';
import { MapPin, TrendingUp, Home, Heart, Palmtree, Flag as Golf, Building2, ChevronDown, X, Map as MapIcon, Grid3x3, Sparkles, ArrowRight, Users, ShoppingBag, Dumbbell, GraduationCap } from 'lucide-react';
import Link from 'next/link';

// Community data
const communities = [
  {
    id: 1,
    name: 'Dubai Hills Estate',
    location: 'Mohammed Bin Rashid City',
    priceFrom: 'AED 1.2M',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200',
    lifestyle: ['Family', 'Golf', 'Luxury'],
    amenities: 18,
    description: 'Premium community with championship golf course'
  },
  {
    id: 2,
    name: 'Arabian Ranches',
    location: 'Dubailand',
    priceFrom: 'AED 2.5M',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
    lifestyle: ['Family', 'Golf', 'Luxury'],
    amenities: 15,
    description: 'Desert-themed villa community with polo club'
  },
  {
    id: 3,
    name: 'Dubai Marina',
    location: 'Dubai Marina',
    priceFrom: 'AED 1.8M',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200',
    lifestyle: ['Urban', 'Waterfront', 'Luxury'],
    amenities: 25,
    description: 'Iconic waterfront living with marina views'
  },
  {
    id: 4,
    name: 'Downtown Dubai',
    location: 'Downtown Dubai',
    priceFrom: 'AED 2.8M',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200',
    lifestyle: ['Urban', 'Luxury'],
    amenities: 30,
    description: 'World-class luxury in the heart of Dubai'
  },
  {
    id: 5,
    name: 'Palm Jumeirah',
    location: 'Palm Jumeirah',
    priceFrom: 'AED 4.5M',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200',
    lifestyle: ['Waterfront', 'Luxury'],
    amenities: 20,
    description: 'Exclusive beachfront villas and apartments'
  },
  {
    id: 6,
    name: 'JBR - Jumeirah Beach Residence',
    location: 'Dubai Marina',
    priceFrom: 'AED 1.5M',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200',
    lifestyle: ['Waterfront', 'Urban'],
    amenities: 22,
    description: 'Beachfront living with vibrant lifestyle'
  },
  {
    id: 7,
    name: 'Business Bay',
    location: 'Business Bay',
    priceFrom: 'AED 1.1M',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200',
    lifestyle: ['Urban'],
    amenities: 12,
    description: 'Central business district with canal views'
  },
  {
    id: 8,
    name: 'Jumeirah Village Circle',
    location: 'New Dubai',
    priceFrom: 'AED 850K',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
    lifestyle: ['Family'],
    amenities: 14,
    description: 'Family-friendly community with parks'
  },
  {
    id: 9,
    name: 'Dubai South',
    location: 'Dubai South',
    priceFrom: 'AED 650K',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
    lifestyle: ['Family'],
    amenities: 10,
    description: 'Affordable living near Expo City'
  },
  {
    id: 10,
    name: 'DAMAC Hills',
    location: 'Dubailand',
    priceFrom: 'AED 1.4M',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200',
    lifestyle: ['Family', 'Golf'],
    amenities: 16,
    description: 'Golf-centric community with Trump course'
  },
  {
    id: 11,
    name: 'Meydan',
    location: 'Meydan',
    priceFrom: 'AED 2.2M',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200',
    lifestyle: ['Luxury'],
    amenities: 18,
    description: 'Luxury living at the world-famous racecourse'
  },
  {
    id: 12,
    name: 'Bluewaters Island',
    location: 'Bluewaters Island',
    priceFrom: 'AED 3.2M',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200',
    lifestyle: ['Waterfront', 'Luxury'],
    amenities: 24,
    description: 'Island living with Ain Dubai views'
  }
];

export default function CommunitiesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [filters, setFilters] = useState({
    lifestyle: 'all',
    priceRange: 'all'
  });

  const resetFilters = () => {
    setFilters({
      lifestyle: 'all',
      priceRange: 'all'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 relative overflow-hidden">

      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-16 px-6 lg:px-16">
          <div className="max-w-[1600px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-[#10B981]/30 rounded-full px-6 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm font-bold text-[#10B981]">EXPLORE COMMUNITIES</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-[#0A0A0A] mb-6 leading-[1.05] tracking-tight">
              Explore Dubai's
              <br />
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#D4AF37] to-[#D4AF37] bg-clip-text text-transparent">
                Premier Communities
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the perfect lifestyle match for your investment
            </p>
          </div>
        </section>

        {/* FILTER BAR */}
        <section className="sticky top-20 z-50 px-6 lg:px-16 mb-12">
          <div className="max-w-[1600px] mx-auto">
            <div className="bg-white border border-gray-200 rounded-3xl shadow-lg p-6">

              {/* FILTERS ROW */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                {/* Lifestyle */}
                <div className="relative group">
                  <select
                    value={filters.lifestyle}
                    onChange={(e) => setFilters({ ...filters, lifestyle: e.target.value })}
                    className="w-full bg-[#F9FAFB] border border-gray-200 hover:border-[#10B981] rounded-full px-4 py-3 text-[#0A0A0A] text-sm font-semibold focus:outline-none focus:border-[#10B981] transition-all appearance-none cursor-pointer"
                  >
                    <option value="all">All Lifestyles</option>
                    <option value="family">Family</option>
                    <option value="luxury">Luxury</option>
                    <option value="waterfront">Waterfront</option>
                    <option value="golf">Golf</option>
                    <option value="urban">Urban</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#10B981] pointer-events-none" />
                </div>

                {/* Price Range */}
                <div className="relative group">
                  <select
                    value={filters.priceRange}
                    onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                    className="w-full bg-[#F9FAFB] border border-gray-200 hover:border-[#10B981] rounded-full px-4 py-3 text-[#0A0A0A] text-sm font-semibold focus:outline-none focus:border-[#10B981] transition-all appearance-none cursor-pointer"
                  >
                    <option value="all">All Prices</option>
                    <option value="under-1m">Under AED 1M</option>
                    <option value="1m-2m">AED 1M - 2M</option>
                    <option value="2m-3m">AED 2M - 3M</option>
                    <option value="3m-plus">AED 3M+</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#10B981] pointer-events-none" />
                </div>

                {/* View Toggle */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full font-semibold text-sm transition-all ${
                      viewMode === 'grid'
                        ? 'bg-[#10B981] text-white shadow-md'
                        : 'bg-white border border-gray-200 text-[#0A0A0A] hover:border-[#10B981]'
                    }`}
                  >
                    <Grid3x3 className="w-4 h-4" />
                    Grid View
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full font-semibold text-sm transition-all ${
                      viewMode === 'map'
                        ? 'bg-[#D4AF37] text-white shadow-md'
                        : 'bg-white border border-gray-200 text-[#0A0A0A] hover:border-[#D4AF37]'
                    }`}
                  >
                    <MapIcon className="w-4 h-4" />
                    Map View
                  </button>
                </div>
              </div>

              {/* BUTTONS ROW */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={resetFilters}
                  className="bg-transparent border border-gray-200 hover:border-gray-300 px-5 py-3 rounded-full font-semibold text-[#0A0A0A] text-sm hover:bg-gray-50 transition-all"
                >
                  <div className="flex items-center gap-2">
                    <X className="w-4 h-4" />
                    <span>Reset Filters</span>
                  </div>
                </button>

                <div className="ml-auto text-sm text-gray-600 font-semibold">
                  Showing {communities.length} communities
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMMUNITIES GRID */}
        <section className="px-6 lg:px-16 pb-20">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communities.map((community) => (
                <Link
                  key={community.id}
                  href={`/communities/${community.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group relative block overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-md hover:border-[#10B981] transition-all duration-500 hover:-translate-y-2 hover:shadow-lg"
                >
                  <div className="relative h-[400px] overflow-hidden">
                    <img
                      src={community.image}
                      alt={community.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                    {/* Lifestyle Tags - Top */}
                    <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap gap-2">
                      {community.lifestyle.map((tag) => (
                        <div
                          key={tag}
                          className="bg-white/90 border border-[#D4AF37] rounded-lg px-3 py-1.5"
                        >
                          <span className="text-xs font-bold text-[#D4AF37]">{tag}</span>
                        </div>
                      ))}
                    </div>

                    {/* Amenities Badge - Top Right */}
                    <div className="absolute top-4 right-4 z-20">
                      <div className="bg-white/90 border border-[#10B981] rounded-xl px-3 py-2 flex items-center gap-2">
                        <Home className="w-4 h-4 text-[#10B981]" />
                        <span className="text-sm font-bold text-[#10B981]">{community.amenities} Amenities</span>
                      </div>
                    </div>

                    {/* Content - Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <h2 className="text-3xl font-black text-white mb-2 leading-tight group-hover:text-[#10B981] transition-colors">
                        {community.name}
                      </h2>

                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-4 h-4 text-[#D4AF37]" />
                        <span className="text-sm font-semibold text-gray-200">{community.location}</span>
                      </div>

                      <p className="text-sm text-gray-300 mb-4 line-clamp-2">{community.description}</p>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-300 uppercase tracking-wider mb-1 font-semibold">Starting From</p>
                          <p className="text-2xl font-black bg-gradient-to-r from-[#10B981] via-[#10B981] to-[#10B981] bg-clip-text text-transparent">
                            {community.priceFrom}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-[#D4AF37] font-bold group-hover:gap-3 transition-all">
                          <span className="text-sm">Explore</span>
                          <div className="w-10 h-10 rounded-full border-2 border-[#D4AF37] flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-white transition-all">
                            <ArrowRight className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* LIFESTYLE CATEGORIES CTA */}
        <section className="px-6 lg:px-16 pb-20">
          <div className="max-w-[1600px] mx-auto">
            <div className="bg-gradient-to-br from-emerald-50 via-white to-amber-50 border border-gray-200 rounded-3xl p-12 text-center shadow-md">
              <h2 className="text-4xl lg:text-5xl font-black text-[#0A0A0A] mb-4">
                Find Your Perfect Lifestyle
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                From family-friendly neighborhoods to luxury waterfront living
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-white border border-gray-200 hover:border-[#10B981] p-6 rounded-2xl transition-all hover:-translate-y-1 cursor-pointer group shadow-md hover:shadow-lg">
                  <Users className="w-8 h-8 text-[#10B981] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <p className="font-bold text-[#0A0A0A]">Family</p>
                </div>
                <div className="bg-white border border-gray-200 hover:border-[#D4AF37] p-6 rounded-2xl transition-all hover:-translate-y-1 cursor-pointer group shadow-md hover:shadow-lg">
                  <Palmtree className="w-8 h-8 text-[#D4AF37] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <p className="font-bold text-[#0A0A0A]">Waterfront</p>
                </div>
                <div className="bg-white border border-gray-200 hover:border-[#10B981] p-6 rounded-2xl transition-all hover:-translate-y-1 cursor-pointer group shadow-md hover:shadow-lg">
                  <Golf className="w-8 h-8 text-[#10B981] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <p className="font-bold text-[#0A0A0A]">Golf</p>
                </div>
                <div className="bg-white border border-gray-200 hover:border-[#D4AF37] p-6 rounded-2xl transition-all hover:-translate-y-1 cursor-pointer group shadow-md hover:shadow-lg">
                  <Building2 className="w-8 h-8 text-[#D4AF37] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <p className="font-bold text-[#0A0A0A]">Urban</p>
                </div>
                <div className="bg-white border border-gray-200 hover:border-[#10B981] p-6 rounded-2xl transition-all hover:-translate-y-1 cursor-pointer group shadow-md hover:shadow-lg">
                  <Heart className="w-8 h-8 text-[#10B981] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <p className="font-bold text-[#0A0A0A]">Luxury</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
