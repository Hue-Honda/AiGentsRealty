'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { MapPin, TrendingUp, Building2, Sparkles, ChevronRight, Calendar, Bed, Home, BarChart3 } from 'lucide-react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface Project {
  id: number;
  name: string;
  slug: string;
  description: string;
  starting_price: string;
  price_range: string;
  bedrooms: string;
  completion_date: string;
  status: string;
  image: string;
  developer_name?: string;
  developer_logo?: string;
}

interface MarketStats {
  area_name: string;
  avg_price_sqft: number;
  median_price_sqft: number;
  total_transactions_6m: number;
  total_transactions_12m: number;
  top_property_type: string;
  yoy_price_change: number;
}

interface Area {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  projects: Project[];
}

export default function LocationPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [area, setArea] = useState<Area | null>(null);
  const [marketStats, setMarketStats] = useState<MarketStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!slug) return;

      try {
        // Fetch area data and market stats in parallel
        const [areaRes, marketRes] = await Promise.all([
          fetch(`${API_URL}/api/areas/${slug}`),
          fetch(`${API_URL}/api/market/area/${slug}`).catch(() => null)
        ]);

        const areaData = await areaRes.json();

        if (areaData.success && areaData.data) {
          setArea(areaData.data);
        } else {
          setError('Area not found');
          setLoading(false);
          return;
        }

        // Market stats might not exist for all areas
        if (marketRes && marketRes.ok) {
          const marketData = await marketRes.json();
          if (marketData && !marketData.error) {
            setMarketStats(marketData);
          }
        }
      } catch (err) {
        console.error('Error fetching area:', err);
        setError('Failed to load area data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#10B981] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading location...</p>
        </div>
      </div>
    );
  }

  if (error || !area) {
    return (
      <div className="min-h-screen bg-white text-[#0A0A0A] flex items-center justify-center pt-20">
        <div className="text-center">
          <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Location Not Found</h1>
          <p className="text-gray-600 mb-8">The location "{slug}" doesn't exist in our database.</p>
          <Link href="/areas" className="inline-flex items-center gap-2 bg-[#10B981] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#0D9668] transition-colors">
            Browse All Areas
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return `AED ${(price / 1).toLocaleString()}`;
    }
    return `AED ${price}`;
  };

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A]">
      {/* HERO SECTION */}
      <div className="relative min-h-[500px] overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37] rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#10B981] rounded-full blur-[120px]"></div>
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 pt-32">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/60 mb-8">
            <Link href="/" className="hover:text-[#10B981] transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/areas" className="hover:text-[#10B981] transition-colors">Areas</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{area.name}</span>
          </div>

          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 bg-[#10B981]/20 border border-[#10B981]/40 px-4 py-2 rounded-full mb-6 w-fit">
            <MapPin className="w-4 h-4 text-[#10B981]" />
            <span className="text-sm font-semibold text-[#10B981]">Premium Location</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl lg:text-6xl font-black mb-6 text-white">
            {area.name}
          </h1>

          {/* Description */}
          <p className="text-lg text-white/70 mb-8 max-w-3xl leading-relaxed">
            {area.description || `Discover premium off-plan properties in ${area.name}, one of Dubai's most sought-after locations.`}
          </p>

          {/* CTA */}
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/geniev2" className="flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#E8C547] text-black px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all">
              <Sparkles className="w-5 h-5" />
              <span>Ask Genie About This Area</span>
            </Link>
            <Link href="/projects" className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all">
              <Building2 className="w-5 h-5" />
              <span>All Projects</span>
            </Link>
          </div>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="relative -mt-12 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-[#D4AF37] to-[#E8C547] rounded-2xl p-6 text-center shadow-lg">
              <div className="text-3xl font-black text-black mb-2">{area.projects.length}</div>
              <div className="text-sm font-semibold text-black/70">Active Projects</div>
            </div>

            {marketStats ? (
              <>
                <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-lg">
                  <div className="text-3xl font-black text-[#10B981] mb-2">
                    {formatPrice(Math.round(marketStats.avg_price_sqft))}/sqft
                  </div>
                  <div className="text-sm font-semibold text-gray-600">Avg. Price</div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-lg">
                  <div className="text-3xl font-black text-[#0A0A0A] mb-2">
                    {marketStats.total_transactions_12m.toLocaleString()}
                  </div>
                  <div className="text-sm font-semibold text-gray-600">Transactions (12m)</div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-lg">
                  <div className={`flex items-center justify-center gap-2 text-3xl font-black mb-2 ${
                    marketStats.yoy_price_change >= 0 ? 'text-[#10B981]' : 'text-red-500'
                  }`}>
                    <TrendingUp className={`w-7 h-7 ${marketStats.yoy_price_change < 0 ? 'rotate-180' : ''}`} />
                    <span>{marketStats.yoy_price_change >= 0 ? '+' : ''}{marketStats.yoy_price_change?.toFixed(1) || '0'}%</span>
                  </div>
                  <div className="text-sm font-semibold text-gray-600">YoY Price Change</div>
                </div>
              </>
            ) : (
              <>
                <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-lg">
                  <div className="text-3xl font-black text-[#10B981] mb-2">Dubai</div>
                  <div className="text-sm font-semibold text-gray-600">Location</div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-lg">
                  <div className="text-3xl font-black text-[#0A0A0A] mb-2">Premium</div>
                  <div className="text-sm font-semibold text-gray-600">Category</div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-lg">
                  <div className="flex items-center justify-center gap-2 text-3xl font-black text-[#D4AF37] mb-2">
                    <BarChart3 className="w-7 h-7" />
                    <span>Active</span>
                  </div>
                  <div className="text-sm font-semibold text-gray-600">Market Status</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* MARKET INSIGHTS (only if we have market data) */}
      {marketStats && (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-3xl p-8">
            <h2 className="text-2xl font-black text-[#0A0A0A] mb-6 flex items-center gap-3">
              <BarChart3 className="w-7 h-7 text-[#D4AF37]" />
              Market Insights - {area.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <div className="text-sm text-gray-500 mb-1">Median Price</div>
                <div className="text-2xl font-bold text-[#0A0A0A]">
                  {formatPrice(Math.round(marketStats.median_price_sqft))}/sqft
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <div className="text-sm text-gray-500 mb-1">Top Property Type</div>
                <div className="text-2xl font-bold text-[#0A0A0A]">
                  {marketStats.top_property_type || 'Residential'}
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <div className="text-sm text-gray-500 mb-1">6-Month Transactions</div>
                <div className="text-2xl font-bold text-[#0A0A0A]">
                  {marketStats.total_transactions_6m.toLocaleString()}
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              * Data sourced from Dubai Land Department (DLD) official records
            </p>
          </div>
        </div>
      )}

      {/* PROJECTS IN THIS AREA */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-black mb-4 text-[#0A0A0A]">
            Projects in <span className="text-[#D4AF37]">{area.name}</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Discover {area.projects.length} premium off-plan development{area.projects.length !== 1 ? 's' : ''} in this prestigious location
          </p>
        </div>

        {area.projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {area.projects.map((project) => (
              <Link key={project.id} href={`/projects/${project.slug}`}>
                <div className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[#10B981]/50 transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&q=90`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                    {/* Status Badge */}
                    <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                      project.status === 'Off Plan' ? 'bg-[#10B981] text-white' :
                      project.status === 'Ready' ? 'bg-[#D4AF37] text-black' :
                      'bg-white/90 text-[#0A0A0A]'
                    }`}>
                      {project.status}
                    </div>

                    {/* Developer Badge */}
                    {project.developer_name && (
                      <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
                        <Building2 className="w-4 h-4 text-[#D4AF37]" />
                        <span className="text-xs font-semibold text-[#0A0A0A]">{project.developer_name}</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-[#0A0A0A] mb-2 group-hover:text-[#10B981] transition-colors">
                      {project.name}
                    </h3>

                    {/* Price */}
                    <div className="text-xl font-black text-[#10B981] mb-3">
                      {project.starting_price ? `From AED ${parseInt(project.starting_price).toLocaleString()}` : project.price_range || 'Price on Request'}
                    </div>

                    {/* Details */}
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      {project.bedrooms && (
                        <div className="flex items-center gap-1">
                          <Bed className="w-4 h-4 text-[#D4AF37]" />
                          <span>{project.bedrooms}</span>
                        </div>
                      )}
                      {project.completion_date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-[#D4AF37]" />
                          <span>{project.completion_date}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-2xl">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">No Projects Yet</h3>
            <p className="text-gray-500 mb-6">
              We don't have any projects listed in {area.name} yet.
            </p>
            <Link href="/projects" className="inline-flex items-center gap-2 text-[#10B981] font-semibold hover:gap-3 transition-all">
              Browse All Projects
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        )}

        {/* View All CTA */}
        {area.projects.length > 0 && (
          <div className="text-center mt-12">
            <Link href="/projects" className="inline-flex items-center gap-2 bg-[#10B981] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#0D9668] transition-all">
              <Home className="w-5 h-5" />
              <span>View All Projects</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>

      {/* CTA SECTION */}
      <div className="relative py-16 overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D4AF37] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#10B981] rounded-full blur-[100px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wide">AI-Powered Insights</span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-black text-white mb-6 leading-tight">
            Want to Know More About {area.name}?
          </h2>

          <p className="text-lg text-white/70 font-medium mb-8 max-w-2xl mx-auto">
            Ask our AI Genie for personalized insights about properties, market trends, and investment opportunities in {area.name}.
          </p>

          <Link href="/geniev2" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#E8C547] text-black px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all">
            <Sparkles className="w-5 h-5" />
            <span>Ask Genie</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
