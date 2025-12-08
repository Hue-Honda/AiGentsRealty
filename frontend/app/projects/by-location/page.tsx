'use client';

import { useState, useEffect } from 'react';
import { MapPin, ArrowRight, Sparkles, Building2 } from 'lucide-react';
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

export default function BrowseByLocation() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [marketStats, setMarketStats] = useState<MarketStats[]>([]);
  const [loading, setLoading] = useState(true);

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

  const getMarketStatsForArea = (areaName: string) => {
    return marketStats.find(
      s => s.area_name?.toLowerCase() === areaName.toLowerCase() ||
           s.area_slug === areaName.toLowerCase().replace(/\s+/g, '-')
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#10B981] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading locations...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37] rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#10B981] rounded-full blur-[120px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 pt-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#10B981]/20 border border-[#10B981]/40 rounded-full mb-6">
              <MapPin className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm font-semibold text-[#10B981]">Explore Dubai's Districts</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Browse by
              <br />
              <span className="text-[#D4AF37]">Location</span>
            </h1>

            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Discover off-plan projects across {areas.length} areas in Dubai's most desirable neighborhoods.
            </p>
          </div>
        </div>
      </section>

      {/* Location Cards Grid */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {areas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {areas.map((area) => {
                const stats = getMarketStatsForArea(area.name);

                return (
                  <Link
                    key={area.id}
                    href={`/areas/${area.slug}`}
                    className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl hover:border-[#10B981]/50 transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={area.image || `https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop`}
                        alt={area.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop`;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                      {/* Stats Badge */}
                      {stats && (
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                          <span className="text-xs font-bold text-[#10B981]">
                            {stats.total_transactions_12m.toLocaleString()} sales/yr
                          </span>
                        </div>
                      )}

                      {/* Location Name */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h2 className="text-2xl font-bold text-white group-hover:text-[#10B981] transition-colors">
                          {area.name}
                        </h2>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
                        {area.description || `Discover premium properties in ${area.name}, one of Dubai's most sought-after locations.`}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        {stats ? (
                          <div className="text-sm">
                            <span className="text-gray-500">Avg. Price</span>
                            <div className="text-[#10B981] font-bold">
                              AED {Math.round(stats.avg_price_sqft).toLocaleString()}/sqft
                            </div>
                          </div>
                        ) : (
                          <div className="text-sm">
                            <span className="text-gray-500">Location</span>
                            <div className="text-[#0A0A0A] font-bold">Dubai, UAE</div>
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-[#D4AF37] font-semibold text-sm group-hover:gap-3 transition-all">
                          <span>View Projects</span>
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
              <h3 className="text-xl font-bold text-gray-700 mb-2">No locations available</h3>
              <p className="text-gray-500 mb-6">Check back later for available locations.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A] rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D4AF37] rounded-full blur-[120px]"></div>
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#10B981] rounded-full blur-[100px]"></div>
            </div>

            <div className="relative">
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">
                Need Location Recommendations?
              </h2>
              <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                Ask our AI Genie to help you find the perfect neighborhood based on your preferences and investment goals.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/geniev2" className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#E8C547] text-black rounded-xl font-bold hover:shadow-xl transition-all flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  <span>Ask Genie</span>
                </Link>
                <Link
                  href="/projects"
                  className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all flex items-center gap-2"
                >
                  <Building2 className="w-5 h-5" />
                  <span>All Projects</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
