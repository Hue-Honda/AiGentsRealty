'use client';

import { useState } from 'react';
import { ChevronDown, MapPin, TrendingUp, Sparkles, Building2, ArrowRight, X, ShoppingBag, Users, Store } from 'lucide-react';
import Link from 'next/link';

const mockRetailProperties = [
  {
    id: 1,
    name: 'Dubai Mall Retail Units',
    location: 'Downtown Dubai',
    area: '1,500 sq ft',
    priceFrom: 'AED 3.5M',
    roi: '15.2',
    developer: 'Emaar Properties',
    rentalYield: '10.5%',
    footfall: '80M+ visitors/year',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920',
  },
  {
    id: 2,
    name: 'Marina Walk Retail Space',
    location: 'Dubai Marina',
    area: '2,000 sq ft',
    priceFrom: 'AED 2.8M',
    roi: '12.8',
    developer: 'Select Group',
    rentalYield: '9.2%',
    footfall: 'Waterfront Location',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920',
  },
  {
    id: 3,
    name: 'JBR The Walk Retail',
    location: 'Jumeirah Beach Residence',
    area: '1,800 sq ft',
    priceFrom: 'AED 3.2M',
    roi: '14.5',
    developer: 'DMCC',
    rentalYield: '9.8%',
    footfall: 'Beach Access',
    image: 'https://images.unsplash.com/photo-1567958451986-2de427a4a0be?w=1920',
  },
  {
    id: 4,
    name: 'City Walk Boutique Space',
    location: 'City Walk',
    area: '1,200 sq ft',
    priceFrom: 'AED 2.5M',
    roi: '13.2',
    developer: 'Meraas',
    rentalYield: '9.5%',
    footfall: 'Premium Lifestyle',
    image: 'https://images.unsplash.com/photo-1555529902-5261145633bf?w=1200',
  },
  {
    id: 5,
    name: 'Box Park Concept Retail',
    location: 'Al Wasl',
    area: '900 sq ft',
    priceFrom: 'AED 1.8M',
    roi: '11.5',
    developer: 'Meraas',
    rentalYield: '8.8%',
    footfall: 'Trendy District',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200',
  },
  {
    id: 6,
    name: 'La Mer Beachfront Retail',
    location: 'La Mer',
    area: '1,600 sq ft',
    priceFrom: 'AED 3.8M',
    roi: '14.8',
    developer: 'Meraas',
    rentalYield: '10.2%',
    footfall: 'Beachfront',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200',
  },
  {
    id: 7,
    name: 'Business Bay Retail Hub',
    location: 'Business Bay',
    area: '2,500 sq ft',
    priceFrom: 'AED 2.2M',
    roi: '10.8',
    developer: 'DAMAC',
    rentalYield: '8.5%',
    footfall: 'Corporate Area',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
  },
];

export default function RetailPage() {
  const [properties] = useState(mockRetailProperties);
  const [filters, setFilters] = useState({
    location: 'all',
    area: 'all',
    priceRange: 'all',
    roi: 'all',
  });

  const resetFilters = () => {
    setFilters({
      location: 'all',
      area: 'all',
      priceRange: 'all',
      roi: 'all',
    });
  };

  const featuredProperty = properties[0];
  const mediumProperties = properties.slice(1, 3);
  const smallProperties = properties.slice(3, 7);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* AI PARTICLE GLOW BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00C775]/5 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#F3C440]/5 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>
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
              <ShoppingBag className="w-4 h-4 text-[#00C775]" />
              <span className="text-sm font-bold text-[#00C775]">HIGH-TRAFFIC RETAIL</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-white mb-6 leading-[1.05] tracking-tight">
              Premium Retail Spaces
              <br />
              <span className="bg-gradient-to-r from-[#F3C440] via-[#FFD700] to-[#F3C440] bg-clip-text text-transparent">
                in Dubai
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-4">
              High-footfall retail opportunities in Dubai's busiest lifestyle destinations
            </p>
          </div>
        </section>

        {/* FILTER BAR */}
        <section className="sticky top-20 z-50 px-6 lg:px-16 mb-12">
          <div className="max-w-[1600px] mx-auto">
            <div className="bg-[#0D0D0D]/95 backdrop-blur-2xl border border-[#00C775]/20 rounded-3xl shadow-[0_20px_80px_rgba(0,199,117,0.15)] p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="relative group">
                  <select
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    className="w-full bg-[#0D0D0D] border border-[#00C775]/20 hover:border-[#00C775]/50 rounded-full px-4 py-3 text-white text-sm font-semibold focus:outline-none focus:border-[#00C775] transition-all appearance-none cursor-pointer"
                  >
                    <option value="all">Location</option>
                    <option value="downtown">Downtown Dubai</option>
                    <option value="marina">Dubai Marina</option>
                    <option value="jbr">JBR</option>
                    <option value="city-walk">City Walk</option>
                    <option value="la-mer">La Mer</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00C775] pointer-events-none" />
                </div>

                <div className="relative group">
                  <select
                    value={filters.area}
                    onChange={(e) => setFilters({ ...filters, area: e.target.value })}
                    className="w-full bg-[#0D0D0D] border border-[#00C775]/20 hover:border-[#00C775]/50 rounded-full px-4 py-3 text-white text-sm font-semibold focus:outline-none focus:border-[#00C775] transition-all appearance-none cursor-pointer"
                  >
                    <option value="all">Retail Size</option>
                    <option value="small">500 - 1,500 sq ft</option>
                    <option value="medium">1,500 - 2,500 sq ft</option>
                    <option value="large">2,500+ sq ft</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00C775] pointer-events-none" />
                </div>

                <div className="relative group">
                  <select
                    value={filters.priceRange}
                    onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                    className="w-full bg-[#0D0D0D] border border-[#00C775]/20 hover:border-[#00C775]/50 rounded-full px-4 py-3 text-white text-sm font-semibold focus:outline-none focus:border-[#00C775] transition-all appearance-none cursor-pointer"
                  >
                    <option value="all">Price Range</option>
                    <option value="under-2m">Under AED 2M</option>
                    <option value="2m-3m">AED 2M - 3M</option>
                    <option value="3m-5m">AED 3M - 5M</option>
                    <option value="5m-plus">AED 5M+</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00C775] pointer-events-none" />
                </div>

                <div className="relative group">
                  <select
                    value={filters.roi}
                    onChange={(e) => setFilters({ ...filters, roi: e.target.value })}
                    className="w-full bg-[#0D0D0D] border border-[#00C775]/20 hover:border-[#00C775]/50 rounded-full px-4 py-3 text-white text-sm font-semibold focus:outline-none focus:border-[#00C775] transition-all appearance-none cursor-pointer"
                  >
                    <option value="all">Min. ROI</option>
                    <option value="10">10%+ ROI</option>
                    <option value="12">12%+ ROI</option>
                    <option value="15">15%+ ROI</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00C775] pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button className="bg-gradient-to-r from-[#00C775] to-[#00A85D] px-6 py-3 rounded-full font-bold text-white shadow-[0_0_30px_rgba(0,199,117,0.4)] transition-all hover:-translate-y-0.5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    <span>AI Match</span>
                  </div>
                </button>
                <button
                  onClick={resetFilters}
                  className="bg-transparent border border-white/10 hover:border-white/30 px-5 py-3 rounded-full font-semibold text-white text-sm hover:bg-white/5 transition-all"
                >
                  <div className="flex items-center gap-2">
                    <X className="w-4 h-4" />
                    <span>Reset</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* PROPERTIES GRID */}
        <section className="px-6 lg:px-16 pb-20">
          <div className="max-w-[1600px] mx-auto space-y-6">

            {/* FEATURED */}
            {featuredProperty && (
              <div className="group relative block overflow-hidden rounded-3xl border border-[#F3C440]/20 hover:border-[#F3C440]/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_100px_rgba(243,196,64,0.3)]">
                <div className="relative h-[480px] overflow-hidden">
                  <img
                    src={featuredProperty.image}
                    alt={featuredProperty.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

                  <div className="absolute top-6 right-6 z-20">
                    <div className="relative">
                      <div className="absolute inset-0 bg-[#00C775] rounded-2xl blur-xl opacity-60 animate-pulse"></div>
                      <div className="relative bg-black/90 backdrop-blur-xl border-2 border-[#00C775]/60 rounded-2xl px-5 py-3">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-6 h-6 text-[#00C775]" />
                          <span className="text-2xl font-black text-white">{featuredProperty.roi}%</span>
                          <span className="text-xs font-bold text-gray-400 uppercase">ROI</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-6 left-6 z-20">
                    <div className="bg-[#F3C440]/20 backdrop-blur-xl border border-[#F3C440]/50 rounded-xl px-4 py-2.5 flex items-center gap-2">
                      <Store className="w-5 h-5 text-[#F3C440]" />
                      <span className="text-sm font-bold text-white">{featuredProperty.footfall}</span>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-10 z-20">
                    <h2 className="text-5xl font-black text-white mb-4 leading-tight group-hover:text-[#F3C440] transition-colors">
                      {featuredProperty.name}
                    </h2>

                    <div className="flex flex-wrap gap-3 mb-6">
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-2">
                        <MapPin className="w-4 h-4 text-[#F3C440]" />
                        <span className="text-sm font-semibold text-white">{featuredProperty.location}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-2">
                        <Building2 className="w-4 h-4 text-[#00C775]" />
                        <span className="text-sm font-semibold text-white">{featuredProperty.area}</span>
                      </div>
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1 font-semibold">Starting From</p>
                        <p className="text-5xl font-black bg-gradient-to-r from-[#00C775] via-[#00D97E] to-[#00C775] bg-clip-text text-transparent">
                          {featuredProperty.priceFrom}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 text-[#F3C440] font-bold text-lg group-hover:gap-5 transition-all">
                        <span>View Details</span>
                        <div className="w-12 h-12 rounded-full border-2 border-[#F3C440] flex items-center justify-center group-hover:bg-[#F3C440] group-hover:text-black transition-all">
                          <ArrowRight className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MEDIUM & SMALL CARDS */}
            {mediumProperties.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {mediumProperties.map((property) => (
                  <div
                    key={property.id}
                    className="group relative block overflow-hidden rounded-3xl border border-[#00C775]/20 hover:border-[#00C775]/60 transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="relative h-[360px] overflow-hidden">
                      <img src={property.image} alt={property.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                      <div className="absolute top-4 right-4 z-20">
                        <div className="bg-black/90 backdrop-blur-xl border border-[#00C775]/60 rounded-xl px-4 py-2">
                          <div className="flex items-center gap-1.5">
                            <TrendingUp className="w-5 h-5 text-[#00C775]" />
                            <span className="text-lg font-black text-white">{property.roi}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                        <h3 className="text-3xl font-black text-white mb-3 group-hover:text-[#00C775] transition-colors">{property.name}</h3>
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-xs text-gray-400 uppercase mb-1">From</p>
                            <p className="text-3xl font-black text-[#00C775]">{property.priceFrom}</p>
                          </div>
                          <ArrowRight className="w-6 h-6 text-[#F3C440]" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {smallProperties.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {smallProperties.map((property) => (
                  <div key={property.id} className="group relative block overflow-hidden rounded-2xl border border-white/10 hover:border-[#00C775]/60 transition-all duration-500 hover:-translate-y-2">
                    <div className="relative h-[300px] overflow-hidden">
                      <img src={property.image} alt={property.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                      <div className="absolute top-3 right-3 z-20">
                        <div className="bg-black/90 border border-[#00C775]/60 rounded-lg px-2.5 py-1.5">
                          <span className="text-sm font-black text-white">{property.roi}%</span>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                        <h4 className="text-lg font-black text-white mb-2 group-hover:text-[#00C775] transition-colors line-clamp-2">{property.name}</h4>
                        <p className="text-xs text-gray-400 mb-3">{property.location}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xl font-black text-[#00C775]">{property.priceFrom}</p>
                          <ArrowRight className="w-4 h-4 text-[#F3C440]" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </section>
      </div>
    </div>
  );
}
