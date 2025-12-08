'use client';

import { useState } from 'react';
import { ChevronDown, MapPin, TrendingUp, Sparkles, Building2, ArrowRight, X, Users, Wifi, Shield } from 'lucide-react';
import Link from 'next/link';

const mockOfficeSpaces = [
  {
    id: 1,
    name: 'Downtown Executive Offices',
    location: 'Downtown Dubai',
    area: '5,000 sq ft',
    priceFrom: 'AED 2.5M',
    roi: '12.5',
    developer: 'Emaar Properties',
    rentalYield: '8.2%',
    floors: '15-25',
    amenities: ['Fitted', 'High-speed Internet', 'Parking'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920',
  },
  {
    id: 2,
    name: 'Business Bay Corporate Tower',
    location: 'Business Bay',
    area: '8,000 sq ft',
    priceFrom: 'AED 3.8M',
    roi: '14.2',
    developer: 'DAMAC',
    rentalYield: '9.5%',
    floors: '20-30',
    amenities: ['Premium Fit-out', 'Smart Building', 'Security'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920',
  },
  {
    id: 3,
    name: 'DIFC Premium Office Suite',
    location: 'DIFC',
    area: '12,000 sq ft',
    priceFrom: 'AED 8.5M',
    roi: '11.8',
    developer: 'Dubai Holding',
    rentalYield: '7.9%',
    floors: '25-40',
    amenities: ['Grade A', 'Concierge', 'Valet Parking'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200',
  },
  {
    id: 4,
    name: 'Marina Business Center',
    location: 'Dubai Marina',
    area: '4,500 sq ft',
    priceFrom: 'AED 2.2M',
    roi: '10.5',
    developer: 'Select Group',
    rentalYield: '7.8%',
    floors: '10-20',
    amenities: ['Sea View', 'Meeting Rooms', 'Gym'],
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200',
  },
  {
    id: 5,
    name: 'JLT Corporate Hub',
    location: 'Jumeirah Lake Towers',
    area: '6,000 sq ft',
    priceFrom: 'AED 3.1M',
    roi: '13.2',
    developer: 'DMCC',
    rentalYield: '8.8%',
    floors: '15-25',
    amenities: ['Lake View', 'Flexible Layout', 'Metro Access'],
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200',
  },
  {
    id: 6,
    name: 'Sheikh Zayed Office Complex',
    location: 'Sheikh Zayed Road',
    area: '7,500 sq ft',
    priceFrom: 'AED 4.2M',
    roi: '12.8',
    developer: 'Meraas',
    rentalYield: '8.5%',
    floors: '18-28',
    amenities: ['Corner Office', 'Boardroom', 'Cafeteria'],
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
  },
  {
    id: 7,
    name: 'Dubai Hills Business Park',
    location: 'Dubai Hills Estate',
    area: '5,500 sq ft',
    priceFrom: 'AED 2.9M',
    roi: '11.5',
    developer: 'Emaar',
    rentalYield: '8.1%',
    floors: '5-10',
    amenities: ['Garden Access', 'Green Building', 'EV Charging'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
  },
];

export default function OfficeSpacesPage() {
  const [properties, setProperties] = useState(mockOfficeSpaces);
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
    <div className="min-h-screen bg-white text-[#0A0A0A] relative overflow-hidden">
      {/* SUBTLE LIGHT GRADIENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#10B981]/5 to-transparent rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#D4AF37]/5 to-transparent rounded-full"></div>
      </div>

      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-16 px-6 lg:px-16">
          <div className="max-w-[1600px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#10B981]/10 border border-[#10B981]/30 rounded-full px-6 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm font-bold text-[#10B981]">PREMIUM OFFICE SPACES</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-[#0A0A0A] mb-6 leading-[1.05] tracking-tight">
              Premium Office Spaces
              <br />
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] bg-clip-text text-transparent">
                in Dubai
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
              Grade A office spaces in Dubai's most prestigious business districts with guaranteed returns
            </p>
          </div>
        </section>

        {/* FILTER BAR */}
        <section className="sticky top-20 z-50 px-6 lg:px-16 mb-12">
          <div className="max-w-[1600px] mx-auto">
            <div className="bg-white border border-gray-200 rounded-3xl shadow-lg p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="relative group">
                  <select
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    className="w-full bg-[#F9FAFB] border border-gray-200 hover:border-[#10B981] rounded-full px-4 py-3 text-[#0A0A0A] text-sm font-semibold focus:outline-none focus:border-[#10B981] transition-all appearance-none cursor-pointer"
                  >
                    <option value="all">Location</option>
                    <option value="downtown">Downtown Dubai</option>
                    <option value="business-bay">Business Bay</option>
                    <option value="difc">DIFC</option>
                    <option value="marina">Dubai Marina</option>
                    <option value="jlt">JLT</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#10B981] pointer-events-none" />
                </div>

                <div className="relative group">
                  <select
                    value={filters.area}
                    onChange={(e) => setFilters({ ...filters, area: e.target.value })}
                    className="w-full bg-[#F9FAFB] border border-gray-200 hover:border-[#10B981] rounded-full px-4 py-3 text-[#0A0A0A] text-sm font-semibold focus:outline-none focus:border-[#10B981] transition-all appearance-none cursor-pointer"
                  >
                    <option value="all">Office Size</option>
                    <option value="small">2,000 - 5,000 sq ft</option>
                    <option value="medium">5,000 - 10,000 sq ft</option>
                    <option value="large">10,000+ sq ft</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#10B981] pointer-events-none" />
                </div>

                <div className="relative group">
                  <select
                    value={filters.priceRange}
                    onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                    className="w-full bg-[#F9FAFB] border border-gray-200 hover:border-[#10B981] rounded-full px-4 py-3 text-[#0A0A0A] text-sm font-semibold focus:outline-none focus:border-[#10B981] transition-all appearance-none cursor-pointer"
                  >
                    <option value="all">Price Range</option>
                    <option value="under-3m">Under AED 3M</option>
                    <option value="3m-5m">AED 3M - 5M</option>
                    <option value="5m-10m">AED 5M - 10M</option>
                    <option value="10m-plus">AED 10M+</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#10B981] pointer-events-none" />
                </div>

                <div className="relative group">
                  <select
                    value={filters.roi}
                    onChange={(e) => setFilters({ ...filters, roi: e.target.value })}
                    className="w-full bg-[#F9FAFB] border border-gray-200 hover:border-[#10B981] rounded-full px-4 py-3 text-[#0A0A0A] text-sm font-semibold focus:outline-none focus:border-[#10B981] transition-all appearance-none cursor-pointer"
                  >
                    <option value="all">Min. ROI</option>
                    <option value="8">8%+ ROI</option>
                    <option value="10">10%+ ROI</option>
                    <option value="12">12%+ ROI</option>
                    <option value="15">15%+ ROI</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#10B981] pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button className="bg-gradient-to-r from-[#10B981] to-[#059669] px-6 py-3 rounded-full font-bold text-white shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    <span>AI Match</span>
                  </div>
                </button>
                <button className="bg-[#10B981]/10 border border-[#10B981]/40 hover:bg-[#10B981]/20 px-6 py-3 rounded-full font-bold text-[#10B981] transition-all">
                  Apply
                </button>
                <button
                  onClick={resetFilters}
                  className="bg-transparent border border-gray-200 hover:border-gray-300 px-5 py-3 rounded-full font-semibold text-gray-600 text-sm hover:bg-gray-50 transition-all"
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
              <div className="group relative block overflow-hidden rounded-3xl border border-gray-200 hover:border-[#D4AF37] transition-all duration-500 hover:-translate-y-2 shadow-md hover:shadow-lg">
                <div className="relative h-[480px] overflow-hidden">
                  <img
                    src={featuredProperty.image}
                    alt={featuredProperty.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

                  <div className="absolute top-6 right-6 z-20">
                    <div className="bg-white border-2 border-[#10B981] rounded-2xl px-5 py-3 shadow-md">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-[#10B981]" />
                        <span className="text-2xl font-black text-[#0A0A0A]">{featuredProperty.roi}%</span>
                        <span className="text-xs font-bold text-gray-600 uppercase">ROI</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-6 left-6 z-20">
                    <div className="bg-[#D4AF37]/20 backdrop-blur-xl border border-[#D4AF37]/50 rounded-xl px-4 py-2.5 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-[#D4AF37]" />
                      <span className="text-sm font-bold text-white">{featuredProperty.developer}</span>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-10 z-20">
                    <h2 className="text-5xl font-black text-white mb-4 leading-tight group-hover:text-[#D4AF37] transition-colors">
                      {featuredProperty.name}
                    </h2>

                    <div className="flex flex-wrap gap-3 mb-6">
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-2">
                        <MapPin className="w-4 h-4 text-[#D4AF37]" />
                        <span className="text-sm font-semibold text-white">{featuredProperty.location}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-2">
                        <Building2 className="w-4 h-4 text-[#10B981]" />
                        <span className="text-sm font-semibold text-white">{featuredProperty.area}</span>
                      </div>
                      {featuredProperty.amenities.slice(0, 2).map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-2">
                          <Shield className="w-4 h-4 text-[#D4AF37]" />
                          <span className="text-sm font-semibold text-white">{amenity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1 font-semibold">Starting From</p>
                        <p className="text-5xl font-black bg-gradient-to-r from-[#10B981] via-[#059669] to-[#10B981] bg-clip-text text-transparent">
                          {featuredProperty.priceFrom}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 text-[#D4AF37] font-bold text-lg group-hover:gap-5 transition-all">
                        <span>View Details</span>
                        <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-white transition-all">
                          <ArrowRight className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MEDIUM CARDS */}
            {mediumProperties.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {mediumProperties.map((property) => (
                  <div
                    key={property.id}
                    className="group relative block overflow-hidden rounded-3xl border border-gray-200 hover:border-[#10B981] transition-all duration-500 hover:-translate-y-2 shadow-md hover:shadow-lg"
                  >
                    <div className="relative h-[360px] overflow-hidden">
                      <img
                        src={property.image}
                        alt={property.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                      <div className="absolute top-4 right-4 z-20">
                        <div className="bg-white border border-[#10B981] rounded-xl px-4 py-2 shadow-md">
                          <div className="flex items-center gap-1.5">
                            <TrendingUp className="w-5 h-5 text-[#10B981]" />
                            <span className="text-lg font-black text-[#0A0A0A]">{property.roi}%</span>
                          </div>
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                        <h3 className="text-3xl font-black text-white mb-3 leading-tight group-hover:text-[#10B981] transition-colors">
                          {property.name}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span className="text-xs font-semibold text-gray-300">{property.location}</span>
                          </div>
                        </div>
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-xs text-gray-400 uppercase mb-1">From</p>
                            <p className="text-3xl font-black text-[#10B981]">{property.priceFrom}</p>
                          </div>
                          <ArrowRight className="w-6 h-6 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* SMALL CARDS */}
            {smallProperties.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {smallProperties.map((property) => (
                  <div
                    key={property.id}
                    className="group relative block overflow-hidden rounded-2xl border border-gray-200 hover:border-[#10B981] transition-all duration-500 hover:-translate-y-2 shadow-md hover:shadow-lg"
                  >
                    <div className="relative h-[300px] overflow-hidden">
                      <img
                        src={property.image}
                        alt={property.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                      <div className="absolute top-3 right-3 z-20">
                        <div className="bg-white border border-[#10B981] rounded-lg px-2.5 py-1.5 shadow-md">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4 text-[#10B981]" />
                            <span className="text-sm font-black text-[#0A0A0A]">{property.roi}%</span>
                          </div>
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                        <h4 className="text-lg font-black text-white mb-2 leading-tight group-hover:text-[#10B981] transition-colors line-clamp-2">
                          {property.name}
                        </h4>
                        <p className="text-xs text-gray-400 mb-3">{property.location}</p>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-gray-500 uppercase mb-0.5">From</p>
                            <p className="text-xl font-black text-[#10B981]">{property.priceFrom}</p>
                          </div>
                          <div className="w-8 h-8 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-white transition-all">
                            <ArrowRight className="w-4 h-4" />
                          </div>
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
