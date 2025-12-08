'use client';

import { useState, useEffect, useMemo } from 'react';
import { MapPin, Home, Heart, Palmtree, Flag as Golf, Building2, ChevronDown, X, Map as MapIcon, Grid3x3, Sparkles, ArrowRight, Users, Search } from 'lucide-react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface Area {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
}

interface MarketStats {
  area_name: string;
  area_slug: string;
  avg_price_sqft: number;
  total_transactions_12m: number;
}

export default function CommunitiesPage() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [marketStats, setMarketStats] = useState<MarketStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const [areasRes, marketRes] = await Promise.all([
          fetch(`${API_URL}/api/areas`),
          fetch(`${API_URL}/api/market/areas?limit=50`).catch(() => null)
        ]);

        const areasData = await areasRes.json();
        if (areasData.success && areasData.data) {
          setAreas(areasData.data);
        }

        if (marketRes && marketRes.ok) {
          const marketData = await marketRes.json();
          if (Array.isArray(marketData)) {
            setMarketStats(marketData);
          }
        }
      } catch (error) {
        console.error('Error fetching areas:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Get market stats for an area
  const getMarketStatsForArea = (areaName: string) => {
    return marketStats.find(
      s => s.area_name?.toLowerCase() === areaName.toLowerCase() ||
           s.area_slug === areaName.toLowerCase().replace(/\s+/g, '-')
    );
  };

  // Filter areas based on search
  const filteredAreas = useMemo(() => {
    if (!searchQuery.trim()) return areas;

    const query = searchQuery.toLowerCase();
    return areas.filter(area =>
      area.name.toLowerCase().includes(query) ||
      (area.description && area.description.toLowerCase().includes(query))
    );
  }, [areas, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#10B981] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading communities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37] rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#10B981] rounded-full blur-[120px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 pt-32 text-center">
          <div className="inline-flex items-center gap-2 bg-[#10B981]/20 border border-[#10B981]/40 rounded-full px-6 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-[#10B981]" />
            <span className="text-sm font-bold text-[#10B981]">EXPLORE COMMUNITIES</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Dubai's Premier
            <br />
            <span className="text-[#D4AF37]">Communities</span>
          </h1>

          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
            Discover {areas.length} unique areas across Dubai's most sought-after locations
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search communities..."
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl text-[#0A0A0A] placeholder:text-gray-400 focus:outline-none focus:border-[#10B981] transition-all shadow-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xl"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="sticky top-20 z-50 px-6 lg:px-8 py-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Results Count */}
            <div className="text-sm text-gray-600 font-semibold">
              Showing <span className="text-[#10B981]">{filteredAreas.length}</span> communities
              {searchQuery && ` matching "${searchQuery}"`}
            </div>

            {/* View Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                  viewMode === 'grid'
                    ? 'bg-[#10B981] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
                Grid
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                  viewMode === 'map'
                    ? 'bg-[#D4AF37] text-black shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <MapIcon className="w-4 h-4" />
                Map
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITIES GRID */}
      <section className="px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {filteredAreas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAreas.map((area) => {
                const stats = getMarketStatsForArea(area.name);

                return (
                  <Link
                    key={area.id}
                    href={`/areas/${area.slug}`}
                    className="group relative block overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-md hover:border-[#10B981]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={area.image || `https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop`}
                        alt={area.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop`;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                      {/* Stats Badge */}
                      {stats && (
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border border-[#10B981]/30 rounded-lg px-3 py-1.5">
                          <span className="text-xs font-bold text-[#10B981]">
                            {stats.total_transactions_12m.toLocaleString()} sales/yr
                          </span>
                        </div>
                      )}

                      {/* Content - Bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-[#10B981] transition-colors">
                          {area.name}
                        </h2>

                        <div className="flex items-center gap-2 mb-3">
                          <MapPin className="w-4 h-4 text-[#D4AF37]" />
                          <span className="text-sm text-white/80">Dubai, UAE</span>
                        </div>

                        {stats && (
                          <div className="text-lg font-bold text-[#10B981]">
                            AED {Math.round(stats.avg_price_sqft).toLocaleString()}/sqft avg
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Content */}
                    <div className="p-5 border-t border-gray-100">
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {area.description || `Discover premium properties in ${area.name}, one of Dubai's most desirable locations.`}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">View Properties</span>
                        <div className="flex items-center gap-2 text-[#10B981] font-semibold group-hover:gap-3 transition-all">
                          <span className="text-sm">Explore</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">No communities found</h3>
              <p className="text-gray-500 mb-6">
                {searchQuery
                  ? `No communities match "${searchQuery}". Try a different search term.`
                  : 'No communities available at the moment.'}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-6 py-3 bg-[#10B981] text-white rounded-lg font-semibold hover:bg-[#0D9668] transition-colors"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* LIFESTYLE CATEGORIES CTA */}
      <section className="px-6 lg:px-8 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-[#0A0A0A] mb-4">
              Find Your Perfect Lifestyle
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From family-friendly neighborhoods to luxury waterfront living
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Link href="/areas" className="bg-white border border-gray-200 hover:border-[#10B981] p-6 rounded-2xl transition-all hover:-translate-y-1 cursor-pointer group shadow-md hover:shadow-lg text-center">
              <Users className="w-8 h-8 text-[#10B981] mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-bold text-[#0A0A0A]">Family</p>
            </Link>
            <Link href="/areas" className="bg-white border border-gray-200 hover:border-[#D4AF37] p-6 rounded-2xl transition-all hover:-translate-y-1 cursor-pointer group shadow-md hover:shadow-lg text-center">
              <Palmtree className="w-8 h-8 text-[#D4AF37] mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-bold text-[#0A0A0A]">Waterfront</p>
            </Link>
            <Link href="/areas" className="bg-white border border-gray-200 hover:border-[#10B981] p-6 rounded-2xl transition-all hover:-translate-y-1 cursor-pointer group shadow-md hover:shadow-lg text-center">
              <Golf className="w-8 h-8 text-[#10B981] mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-bold text-[#0A0A0A]">Golf</p>
            </Link>
            <Link href="/areas" className="bg-white border border-gray-200 hover:border-[#D4AF37] p-6 rounded-2xl transition-all hover:-translate-y-1 cursor-pointer group shadow-md hover:shadow-lg text-center">
              <Building2 className="w-8 h-8 text-[#D4AF37] mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-bold text-[#0A0A0A]">Urban</p>
            </Link>
            <Link href="/areas" className="bg-white border border-gray-200 hover:border-[#10B981] p-6 rounded-2xl transition-all hover:-translate-y-1 cursor-pointer group shadow-md hover:shadow-lg text-center">
              <Heart className="w-8 h-8 text-[#10B981] mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-bold text-[#0A0A0A]">Luxury</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ASK GENIE CTA */}
      <section className="px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A] rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D4AF37] rounded-full blur-[120px]"></div>
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#10B981] rounded-full blur-[100px]"></div>
            </div>

            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-xs font-bold text-[#D4AF37] uppercase">AI-Powered</span>
              </div>

              <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">
                Not Sure Which Community is Right for You?
              </h2>
              <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                Let our AI Genie help you find the perfect community based on your lifestyle, budget, and preferences.
              </p>

              <Link href="/geniev2" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#E8C547] text-black px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all">
                <Sparkles className="w-5 h-5" />
                <span>Ask Genie</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
