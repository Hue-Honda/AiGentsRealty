'use client';

import { useState } from 'react';
import { ChevronDown, MapPin, TrendingUp, Sparkles, Building2, ArrowRight, X, DollarSign, Percent, ChartBar } from 'lucide-react';
import Link from 'next/link';

// Mock commercial property data
const mockCommercialProperties = [
  {
    id: 1,
    name: 'Downtown Business Hub',
    type: 'Office Space',
    location: 'Downtown Dubai',
    area: '5,000 - 15,000 sq ft',
    priceFrom: 'AED 2.5M',
    roi: '12.5',
    developer: 'Emaar Properties',
    rentalYield: '8.2%',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920',
    slug: 'downtown-business-hub'
  },
  {
    id: 2,
    name: 'Marina Commercial Tower',
    type: 'Retail',
    location: 'Dubai Marina',
    area: '2,500 - 8,000 sq ft',
    priceFrom: 'AED 1.8M',
    roi: '10.8',
    developer: 'Select Group',
    rentalYield: '7.5%',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920',
    slug: 'marina-commercial-tower'
  },
  {
    id: 3,
    name: 'Business Bay Executive Suites',
    type: 'Office Space',
    location: 'Business Bay',
    area: '3,000 - 10,000 sq ft',
    priceFrom: 'AED 3.2M',
    roi: '14.2',
    developer: 'DAMAC',
    rentalYield: '9.1%',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920',
    slug: 'business-bay-executive-suites'
  },
  {
    id: 4,
    name: 'DIFC Premium Offices',
    type: 'Office Space',
    location: 'DIFC',
    area: '8,000 - 25,000 sq ft',
    priceFrom: 'AED 8.5M',
    roi: '11.5',
    developer: 'Dubai Holding',
    rentalYield: '7.8%',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200',
    slug: 'difc-premium-offices'
  },
  {
    id: 5,
    name: 'Showroom Complex - Sheikh Zayed',
    type: 'Showroom',
    location: 'Sheikh Zayed Road',
    area: '4,000 - 12,000 sq ft',
    priceFrom: 'AED 4.2M',
    roi: '13.8',
    developer: 'Nakheel',
    rentalYield: '8.9%',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200',
    slug: 'showroom-complex-szr'
  },
  {
    id: 6,
    name: 'Dubai South Logistics Hub',
    type: 'Warehouse',
    location: 'Dubai South',
    area: '15,000 - 50,000 sq ft',
    priceFrom: 'AED 6.5M',
    roi: '15.2',
    developer: 'Dubai South',
    rentalYield: '10.5%',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200',
    slug: 'dubai-south-logistics'
  },
  {
    id: 7,
    name: 'Mixed-Use Development - JLT',
    type: 'Mixed-Use',
    location: 'Jumeirah Lake Towers',
    area: '3,500 - 15,000 sq ft',
    priceFrom: 'AED 5.8M',
    roi: '13.5',
    developer: 'DMCC',
    rentalYield: '9.3%',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    slug: 'mixed-use-jlt'
  }
];

export default function CommercialPage() {
  const [properties, setProperties] = useState(mockCommercialProperties);
  const [filters, setFilters] = useState({
    propertyType: 'all',
    location: 'all',
    priceRange: 'all',
    roi: 'all',
  });

  const resetFilters = () => {
    setFilters({
      propertyType: 'all',
      location: 'all',
      priceRange: 'all',
      roi: 'all',
    });
  };

  // Split properties for Option C layout
  const featuredProperty = properties[0];
  const mediumProperties = properties.slice(1, 3);
  const smallProperties = properties.slice(3, 7);

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] relative overflow-hidden">
      {/* SUBTLE LIGHT GRADIENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-50 rounded-full blur-[150px] opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-50 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gray-50 rounded-full blur-[200px]"></div>
      </div>

      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-16 px-6 lg:px-16">
          <div className="max-w-[1600px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-6 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm font-bold text-[#10B981]">AI-POWERED COMMERCIAL</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-[#0A0A0A] mb-6 leading-[1.05] tracking-tight">
              Dubai's Premier
              <br />
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] bg-clip-text text-transparent">
                Commercial Properties
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
              AI-curated investment opportunities in UAE's thriving business landscape
            </p>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <Link href="/commercial/office-spaces" className="bg-white border border-emerald-200 hover:border-emerald-300 px-5 py-2.5 rounded-full text-sm font-semibold text-[#0A0A0A] shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                Office Spaces
              </Link>
              <Link href="/commercial/retail" className="bg-white border border-emerald-200 hover:border-emerald-300 px-5 py-2.5 rounded-full text-sm font-semibold text-[#0A0A0A] shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                Retail
              </Link>
              <Link href="/commercial/showrooms" className="bg-white border border-emerald-200 hover:border-emerald-300 px-5 py-2.5 rounded-full text-sm font-semibold text-[#0A0A0A] shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                Showrooms
              </Link>
              <Link href="/commercial/warehouses" className="bg-white border border-emerald-200 hover:border-emerald-300 px-5 py-2.5 rounded-full text-sm font-semibold text-[#0A0A0A] shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                Warehouses
              </Link>
              <Link href="/commercial/mixed-use" className="bg-white border border-emerald-200 hover:border-emerald-300 px-5 py-2.5 rounded-full text-sm font-semibold text-[#0A0A0A] shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                Mixed-Use
              </Link>
            </div>
          </div>
        </section>

        {/* UNIVERSAL FILTER BAR */}
        <section className="sticky top-20 z-50 px-6 lg:px-16 mb-12">
          <div className="max-w-[1600px] mx-auto">
            <div className="bg-white border border-gray-200 rounded-3xl shadow-lg p-6">

              {/* FILTERS ROW */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {/* Property Type */}
                <div className="relative group">
                  <select
                    value={filters.propertyType}
                    onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                    className="w-full bg-white border border-gray-200 hover:border-emerald-300 rounded-full px-4 py-3 text-[#0A0A0A] text-sm font-semibold focus:outline-none focus:border-[#10B981] transition-all appearance-none cursor-pointer"
                  >
                    <option value="all">Property Type</option>
                    <option value="office">Office Spaces</option>
                    <option value="retail">Retail</option>
                    <option value="showroom">Showrooms</option>
                    <option value="warehouse">Warehouses</option>
                    <option value="mixed-use">Mixed-Use</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#10B981] pointer-events-none" />
                </div>

                {/* Location */}
                <div className="relative group">
                  <select
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    className="w-full bg-white border border-gray-200 hover:border-emerald-300 rounded-full px-4 py-3 text-[#0A0A0A] text-sm font-semibold focus:outline-none focus:border-[#10B981] transition-all appearance-none cursor-pointer"
                  >
                    <option value="all">Location</option>
                    <option value="downtown">Downtown Dubai</option>
                    <option value="business-bay">Business Bay</option>
                    <option value="difc">DIFC</option>
                    <option value="marina">Dubai Marina</option>
                    <option value="jlt">JLT</option>
                    <option value="free-zones">Free Zones</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#10B981] pointer-events-none" />
                </div>

                {/* Price Range */}
                <div className="relative group">
                  <select
                    value={filters.priceRange}
                    onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                    className="w-full bg-white border border-gray-200 hover:border-emerald-300 rounded-full px-4 py-3 text-[#0A0A0A] text-sm font-semibold focus:outline-none focus:border-[#10B981] transition-all appearance-none cursor-pointer"
                  >
                    <option value="all">Price Range</option>
                    <option value="under-2m">Under AED 2M</option>
                    <option value="2m-5m">AED 2M - 5M</option>
                    <option value="5m-10m">AED 5M - 10M</option>
                    <option value="10m-plus">AED 10M+</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#10B981] pointer-events-none" />
                </div>

                {/* ROI */}
                <div className="relative group">
                  <select
                    value={filters.roi}
                    onChange={(e) => setFilters({ ...filters, roi: e.target.value })}
                    className="w-full bg-white border border-gray-200 hover:border-emerald-300 rounded-full px-4 py-3 text-[#0A0A0A] text-sm font-semibold focus:outline-none focus:border-[#10B981] transition-all appearance-none cursor-pointer"
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

              {/* BUTTONS ROW */}
              <div className="flex flex-wrap items-center gap-3">
                <button className="group relative bg-gradient-to-r from-[#10B981] to-[#059669] px-6 py-3 rounded-full font-bold text-white shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    <span>AI Smart Match</span>
                  </div>
                </button>

                <button className="bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 px-6 py-3 rounded-full font-bold text-[#10B981] transition-all">
                  Apply Filters
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

                {/* Tool Links */}
                <div className="ml-auto flex gap-3">
                  <Link href="/commercial/roi-calculator" className="bg-amber-50 border border-amber-200 hover:bg-amber-100 px-4 py-3 rounded-full font-semibold text-[#D4AF37] text-sm transition-all flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span className="hidden md:inline">ROI Calc</span>
                  </Link>
                  <Link href="/commercial/rental-yield" className="bg-amber-50 border border-amber-200 hover:bg-amber-100 px-4 py-3 rounded-full font-semibold text-[#D4AF37] text-sm transition-all flex items-center gap-2">
                    <Percent className="w-4 h-4" />
                    <span className="hidden md:inline">Yield</span>
                  </Link>
                  <Link href="/commercial/market-trends" className="bg-amber-50 border border-amber-200 hover:bg-amber-100 px-4 py-3 rounded-full font-semibold text-[#D4AF37] text-sm transition-all flex items-center gap-2">
                    <ChartBar className="w-4 h-4" />
                    <span className="hidden md:inline">Trends</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OPTION C LAYOUT - PROPERTIES GRID */}
        <section className="px-6 lg:px-16 pb-20">
          <div className="max-w-[1600px] mx-auto space-y-6">

            {/* 1️⃣ HERO FEATURED CARD - 100% Width */}
            {featuredProperty && (
              <Link
                href={`/commercial/${featuredProperty.slug}`}
                className="group relative block overflow-hidden rounded-3xl border border-amber-200 hover:border-amber-300 transition-all duration-500 hover:-translate-y-2 shadow-md hover:shadow-xl"
              >
                <div className="relative h-[480px] overflow-hidden">
                  <img
                    src={featuredProperty.image}
                    alt={featuredProperty.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

                  {/* ROI Badge - Top Right */}
                  <div className="absolute top-6 right-6 z-20">
                    <div className="bg-white border-2 border-emerald-300 rounded-2xl px-5 py-3 shadow-lg">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-[#10B981]" />
                        <span className="text-2xl font-black text-[#0A0A0A]">{featuredProperty.roi}%</span>
                        <span className="text-xs font-bold text-gray-600 uppercase">ROI</span>
                      </div>
                    </div>
                  </div>

                  {/* Developer Badge - Top Left */}
                  <div className="absolute top-6 left-6 z-20">
                    <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-[#D4AF37]" />
                      <span className="text-sm font-bold text-[#0A0A0A]">{featuredProperty.developer}</span>
                    </div>
                  </div>

                  {/* Type Badge */}
                  <div className="absolute top-20 left-6 z-20">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1.5">
                      <span className="text-xs font-bold text-[#0A0A0A]">{featuredProperty.type}</span>
                    </div>
                  </div>

                  {/* Content - Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-10 z-20">
                    <h2 className="text-5xl font-black text-white mb-4 leading-tight group-hover:text-[#D4AF37] transition-colors">
                      {featuredProperty.name}
                    </h2>

                    <div className="flex flex-wrap gap-3 mb-6">
                      <div className="flex items-center gap-2 bg-white/90 border border-gray-200 rounded-lg px-4 py-2">
                        <MapPin className="w-4 h-4 text-[#D4AF37]" />
                        <span className="text-sm font-semibold text-[#0A0A0A]">{featuredProperty.location}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/90 border border-gray-200 rounded-lg px-4 py-2">
                        <Building2 className="w-4 h-4 text-[#10B981]" />
                        <span className="text-sm font-semibold text-[#0A0A0A]">{featuredProperty.area}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/90 border border-gray-200 rounded-lg px-4 py-2">
                        <Percent className="w-4 h-4 text-[#D4AF37]" />
                        <span className="text-sm font-semibold text-[#0A0A0A]">{featuredProperty.rentalYield} Yield</span>
                      </div>
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-gray-300 uppercase tracking-wider mb-1 font-semibold">Starting From</p>
                        <p className="text-5xl font-black bg-gradient-to-r from-[#10B981] via-[#34D399] to-[#10B981] bg-clip-text text-transparent">
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
              </Link>
            )}

            {/* 2️⃣ TWO MEDIUM CARDS */}
            {mediumProperties.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {mediumProperties.map((property) => (
                  <Link
                    key={property.id}
                    href={`/commercial/${property.slug}`}
                    className="group relative block overflow-hidden rounded-3xl border border-emerald-200 hover:border-emerald-300 transition-all duration-500 hover:-translate-y-2 shadow-md hover:shadow-xl"
                  >
                    <div className="relative h-[360px] overflow-hidden">
                      <img
                        src={property.image}
                        alt={property.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                      {/* ROI Badge */}
                      <div className="absolute top-4 right-4 z-20">
                        <div className="bg-white border border-emerald-300 rounded-xl px-4 py-2 shadow-md">
                          <div className="flex items-center gap-1.5">
                            <TrendingUp className="w-5 h-5 text-[#10B981]" />
                            <span className="text-lg font-black text-[#0A0A0A]">{property.roi}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Developer Badge */}
                      <div className="absolute top-4 left-4 z-20">
                        <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-[#D4AF37]" />
                          <span className="text-xs font-bold text-[#0A0A0A]">{property.developer}</span>
                        </div>
                      </div>

                      {/* Type Badge */}
                      <div className="absolute top-16 left-4 z-20">
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1">
                          <span className="text-xs font-bold text-[#0A0A0A]">{property.type}</span>
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                        <h3 className="text-3xl font-black text-white mb-3 leading-tight group-hover:text-[#10B981] transition-colors">
                          {property.name}
                        </h3>

                        <div className="flex flex-wrap gap-2 mb-4">
                          <div className="flex items-center gap-1.5 bg-white/90 border border-gray-200 rounded-lg px-3 py-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span className="text-xs font-semibold text-[#0A0A0A]">{property.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5 bg-white/90 border border-gray-200 rounded-lg px-3 py-1.5">
                            <Percent className="w-3.5 h-3.5 text-[#10B981]" />
                            <span className="text-xs font-semibold text-[#0A0A0A]">{property.rentalYield}</span>
                          </div>
                        </div>

                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-xs text-gray-300 uppercase tracking-wider mb-1">From</p>
                            <p className="text-3xl font-black text-[#10B981]">{property.priceFrom}</p>
                          </div>
                          <div className="text-[#D4AF37] group-hover:translate-x-1 transition-transform">
                            <ArrowRight className="w-6 h-6" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* 3️⃣ FOUR SMALL CARDS */}
            {smallProperties.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {smallProperties.map((property) => (
                  <Link
                    key={property.id}
                    href={`/commercial/${property.slug}`}
                    className="group relative block overflow-hidden rounded-2xl border border-gray-200 hover:border-emerald-300 transition-all duration-500 hover:-translate-y-2 shadow-md hover:shadow-lg"
                  >
                    <div className="relative h-[300px] overflow-hidden">
                      <img
                        src={property.image}
                        alt={property.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                      {/* ROI Badge */}
                      <div className="absolute top-3 right-3 z-20">
                        <div className="bg-white border border-emerald-300 rounded-lg px-2.5 py-1.5 shadow-sm">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4 text-[#10B981]" />
                            <span className="text-sm font-black text-[#0A0A0A]">{property.roi}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Type Badge */}
                      <div className="absolute top-3 left-3 z-20">
                        <div className="bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5">
                          <span className="text-xs font-bold text-[#0A0A0A]">{property.type}</span>
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                        <h4 className="text-lg font-black text-white mb-2 leading-tight group-hover:text-[#10B981] transition-colors line-clamp-2">
                          {property.name}
                        </h4>

                        <p className="text-xs text-gray-300 mb-3">{property.location}</p>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">From</p>
                            <p className="text-xl font-black text-[#10B981]">{property.priceFrom}</p>
                          </div>
                          <div className="w-8 h-8 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-white transition-all">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

          </div>
        </section>

        {/* PRIME LOCATIONS CTA */}
        <section className="px-6 lg:px-16 pb-20">
          <div className="max-w-[1600px] mx-auto">
            <div className="bg-gradient-to-br from-[#F9FAFB] via-white to-emerald-50 border border-emerald-200 rounded-3xl p-12 text-center shadow-md">
              <h2 className="text-4xl lg:text-5xl font-black text-[#0A0A0A] mb-4">
                Explore Prime Business Locations
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Discover high-ROI commercial opportunities in Dubai's most sought-after business districts
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/commercial/business-bay" className="bg-gradient-to-r from-[#10B981] to-[#059669] px-8 py-4 rounded-full font-bold text-white shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                  Business Bay
                </Link>
                <Link href="/commercial/difc" className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] px-8 py-4 rounded-full font-bold text-white shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                  DIFC
                </Link>
                <Link href="/commercial/free-zones" className="bg-white border-2 border-[#10B981] px-8 py-4 rounded-full font-bold text-[#0A0A0A] hover:bg-emerald-50 transition-all hover:-translate-y-1">
                  Free Zones
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
