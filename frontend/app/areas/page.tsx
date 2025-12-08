'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { MapPin, Building2, ChevronRight, ChevronDown, ChevronUp, Phone, Mail, Search, TrendingUp, Home, DollarSign, Sparkles } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// FAQ Data
const faqs = [
  {
    question: 'What are the best areas to invest in Dubai?',
    answer: 'Top investment areas in Dubai include Dubai Marina, Downtown Dubai, Business Bay, and Dubai Hills Estate. These areas offer strong rental yields (6-8%), excellent infrastructure, and high demand from both residents and investors. Our AI analyzes market trends, price appreciation, and rental demand to recommend the best areas based on your investment goals.'
  },
  {
    question: 'Which Dubai areas are best for families?',
    answer: 'Family-friendly communities include Arabian Ranches, Dubai Hills Estate, Jumeirah Village Circle (JVC), and Al Furjan. These areas feature excellent schools, parks, community facilities, and safe environments. They offer a mix of villas and townhouses with good connectivity to major highways and shopping centers.'
  },
  {
    question: 'What is the average property price in Dubai?',
    answer: 'Property prices vary significantly by area. Entry-level apartments start from AED 500K in areas like International City or Discovery Gardens. Mid-range properties in JVC or Dubai Sports City range from AED 800K to 1.5M, while premium areas like Dubai Marina and Downtown Dubai range from AED 1.5M to 5M+. Luxury properties in Palm Jumeirah can exceed AED 10M.'
  },
  {
    question: 'Can foreigners buy property in all Dubai areas?',
    answer: 'Foreigners can buy property in designated freehold areas, which include most popular locations like Dubai Marina, Downtown Dubai, Business Bay, JVC, and Palm Jumeirah. Some areas are designated as leasehold (99-year lease) for expatriates. Our specialists can guide you on ownership regulations for specific areas.'
  },
  {
    question: 'What are the most affordable areas in Dubai?',
    answer: 'Affordable areas with good value include International City, Discovery Gardens, Dubai Sports City, Jumeirah Village Circle, and Dubai Silicon Oasis. These communities offer modern amenities and good connectivity while maintaining lower price points, making them ideal for first-time buyers and investors seeking high rental yields.'
  },
  {
    question: 'Which areas have the best rental yields?',
    answer: 'Areas offering strong rental yields (7-9%) include Jumeirah Village Circle, Dubai Sports City, International City, and Discovery Gardens. These communities attract tenants due to affordable rents, good facilities, and strategic locations. Our AI-powered analysis provides real-time rental yield data for each area.'
  }
];

// Offices Data
const offices = [
  {
    name: 'Dubai Marina Office',
    address: 'Marina Plaza, Level 12, Dubai Marina',
    phone: '+971 4 123 4567',
    email: 'marina@aigentsrealty.com'
  },
  {
    name: 'Business Bay Office',
    address: 'Bay Gate Tower, Floor 25, Business Bay',
    phone: '+971 4 234 5678',
    email: 'businessbay@aigentsrealty.com'
  },
  {
    name: 'JVC Office',
    address: 'Circle Mall, Ground Floor, JVC',
    phone: '+971 4 345 6789',
    email: 'jvc@aigentsrealty.com'
  },
  {
    name: 'Dubai Creek Harbour',
    address: 'Creek Residences, Lobby Level',
    phone: '+971 4 456 7890',
    email: 'creek@aigentsrealty.com'
  }
];

// Filter categories
const filterCategories = [
  { id: 'all', label: 'All Areas', icon: MapPin },
  { id: 'premium', label: 'Premium', icon: Sparkles },
  { id: 'affordable', label: 'Affordable', icon: DollarSign },
  { id: 'family', label: 'Family-Friendly', icon: Home },
  { id: 'trending', label: 'Trending', icon: TrendingUp },
];

// Premium areas (high avg price)
const premiumAreaNames = ['palm jumeirah', 'downtown dubai', 'dubai marina', 'jumeirah bay island', 'emirates hills', 'bluewaters island', 'city walk', 'jumeirah beach residence'];
// Affordable areas
const affordableAreaNames = ['international city', 'discovery gardens', 'dubai sports city', 'dubai silicon oasis', 'al warsan', 'liwan', 'dubailand', 'arjan'];
// Family-friendly areas
const familyAreaNames = ['arabian ranches', 'dubai hills estate', 'jumeirah village circle', 'al furjan', 'mudon', 'damac hills', 'town square', 'villanova', 'tilal al ghaf'];

export default function AreasPage() {
  const [areasData, setAreasData] = useState<any[]>([]);
  const [topAreasData, setTopAreasData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function fetchAreas() {
      try {
        // Fetch all areas and top areas in parallel
        const [areasRes, topAreasRes] = await Promise.all([
          fetch(`${API_URL}/api/areas`),
          fetch(`${API_URL}/api/market/top-areas?limit=12`)
        ]);

        const areasDataRes = await areasRes.json();
        const topAreasDataRes = await topAreasRes.json();

        if (areasDataRes.success) {
          setAreasData(areasDataRes.data);
        }

        if (topAreasDataRes.areas) {
          setTopAreasData(topAreasDataRes.areas);
        }
      } catch (error) {
        console.error('Error fetching areas:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchAreas();
  }, []);

  // Filter and search logic
  const filteredAreas = useMemo(() => {
    let areas = showAll ? areasData : areasData.slice(0, 12);

    // If we have top areas data and not showing all, prioritize by market activity
    if (!showAll && topAreasData.length > 0) {
      const topSlugs = new Set(topAreasData.map(a => a.slug));
      const topAreas = areasData.filter(a => topSlugs.has(a.slug));
      const otherAreas = areasData.filter(a => !topSlugs.has(a.slug));
      areas = [...topAreas, ...otherAreas].slice(0, 12);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      areas = areasData.filter(area =>
        area.name.toLowerCase().includes(query) ||
        (area.description && area.description.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (activeFilter !== 'all' && !searchQuery.trim()) {
      const allAreas = showAll ? areasData : areas;
      switch (activeFilter) {
        case 'premium':
          areas = allAreas.filter(area =>
            premiumAreaNames.some(name => area.name.toLowerCase().includes(name))
          );
          break;
        case 'affordable':
          areas = allAreas.filter(area =>
            affordableAreaNames.some(name => area.name.toLowerCase().includes(name))
          );
          break;
        case 'family':
          areas = allAreas.filter(area =>
            familyAreaNames.some(name => area.name.toLowerCase().includes(name))
          );
          break;
        case 'trending':
          // Top areas by transaction volume are trending
          if (topAreasData.length > 0) {
            const trendingSlugs = new Set(topAreasData.slice(0, 8).map(a => a.slug));
            areas = allAreas.filter(area => trendingSlugs.has(area.slug));
          }
          break;
      }
    }

    return areas;
  }, [areasData, topAreasData, searchQuery, activeFilter, showAll]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for subscribing! We'll send updates to ${email}`);
    setEmail('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#10B981]/20 border-t-[#10B981] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm font-medium">Loading Dubai Areas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Subtle Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#10B981]/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px]"></div>
      </div>

      {/* PAGE HEADING */}
      <section className="relative pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#10B981]/10 border border-[#10B981] px-4 py-2 rounded-full mb-6">
            <MapPin className="w-4 h-4 text-[#10B981]" />
            <span className="text-xs font-bold text-[#10B981] uppercase tracking-wider">Dubai Locations</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-[#0A0A0A] mb-6 tracking-tight">
            Explore Dubai's Top <span className="text-[#D4AF37]">Areas</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover Dubai's best neighbourhoods powered by AI insights — from waterfront districts to family communities and investment hotspots.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mt-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.trim()) setShowAll(true);
                }}
                placeholder="Search areas by name..."
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl text-[#0A0A0A] placeholder:text-gray-400 focus:outline-none focus:border-[#10B981] transition-all shadow-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {filterCategories.map((category) => {
              const Icon = category.icon;
              const isActive = activeFilter === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveFilter(category.id);
                    setSearchQuery('');
                    if (category.id !== 'all') setShowAll(false);
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-[#10B981] text-white shadow-lg'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-[#10B981] hover:text-[#10B981]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* MEGA GRID OF AREAS */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">
              {searchQuery ? (
                <>Found <span className="font-semibold text-[#10B981]">{filteredAreas.length}</span> areas matching "{searchQuery}"</>
              ) : activeFilter !== 'all' ? (
                <>Showing <span className="font-semibold text-[#10B981]">{filteredAreas.length}</span> {filterCategories.find(f => f.id === activeFilter)?.label.toLowerCase()} areas</>
              ) : showAll ? (
                <>Showing all <span className="font-semibold text-[#10B981]">{areasData.length}</span> areas</>
              ) : (
                <>Showing top <span className="font-semibold text-[#10B981]">{filteredAreas.length}</span> areas by market activity</>
              )}
            </p>
            {!showAll && !searchQuery && activeFilter === 'all' && areasData.length > 12 && (
              <button
                onClick={() => setShowAll(true)}
                className="text-sm font-semibold text-[#10B981] hover:text-[#0D9668] transition-colors"
              >
                View all {areasData.length} areas →
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAreas.map((area, index) => (
              <Link
                key={area.slug}
                href={`/areas/${area.slug}`}
                className="group relative block bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg hover:border-[#10B981] transition-all duration-500 hover:-translate-y-2 shadow-md hover:shadow-xl"
              >
                {/* Large Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={area.image}
                    alt={area.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    suppressHydrationWarning
                  />

                  {/* Dark Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/90"></div>

                  {/* Top-Left: Projects Count */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-md border border-gray-200 text-xs font-bold text-[#10B981]">
                    {area.project_count} Projects
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  {/* Area Name */}
                  <h3 className="text-xl font-black text-[#0A0A0A] mb-2 tracking-tight line-clamp-1">
                    {area.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-500 mb-4 line-clamp-1">
                    {area.description || 'Premium Dubai community with excellent amenities'}
                  </p>

                  {/* Bottom Row */}
                  <div className="flex items-center justify-between">
                    {/* Starting Price */}
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Starting from</p>
                      <p className="text-base font-bold text-[#10B981]">
                        {area.starting_price || 'TBA'}
                      </p>
                    </div>

                    {/* Explore Button */}
                    <div className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#D4AF37] text-white text-xs font-bold group-hover:gap-2.5 transition-all">
                      <span>Explore</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty state */}
          {filteredAreas.length === 0 && (
            <div className="text-center py-16">
              <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">No areas found</h3>
              <p className="text-gray-500 mb-6">
                {searchQuery
                  ? `No areas match "${searchQuery}". Try a different search term.`
                  : 'No areas match the selected filter.'}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                  setShowAll(false);
                }}
                className="px-6 py-3 bg-[#10B981] text-white rounded-lg font-semibold hover:bg-[#0D9668] transition-colors"
              >
                Show all areas
              </button>
            </div>
          )}

          {/* Show All Areas Button */}
          {!showAll && !searchQuery && activeFilter === 'all' && areasData.length > 12 && filteredAreas.length > 0 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-[#10B981] text-[#10B981] rounded-xl font-bold hover:bg-[#10B981] hover:text-white transition-all shadow-lg"
              >
                <Building2 className="w-5 h-5" />
                Show All {areasData.length} Areas
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Show Less Button */}
          {showAll && activeFilter === 'all' && !searchQuery && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAll(false)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-300 text-gray-600 rounded-xl font-bold hover:border-[#10B981] hover:text-[#10B981] transition-all"
              >
                <ChevronUp className="w-5 h-5" />
                Show Less
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="relative py-20 bg-[#F9FAFB] border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl font-black text-[#0A0A0A] mb-12 text-center">
            Frequently Asked <span className="text-[#10B981]">Questions</span>
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden hover:border-[#10B981] transition-all shadow-md"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-base font-bold text-[#0A0A0A] pr-4">
                    {faq.question}
                  </span>
                  {openFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-[#10B981] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                  )}
                </button>

                {openFAQ === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="relative py-20 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="relative bg-white border border-[#D4AF37] rounded-3xl p-12 overflow-hidden shadow-lg">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent pointer-events-none"></div>

            <div className="relative text-center">
              <h2 className="text-4xl font-black text-[#0A0A0A] mb-4">
                Stay Updated on <span className="text-[#D4AF37]">New Launches</span>
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                Join our newsletter to receive the latest AI-powered market insights, new property launches, and exclusive investment opportunities.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-6 py-4 bg-[#F9FAFB] border-2 border-gray-200 rounded-xl text-[#0A0A0A] placeholder:text-gray-400 focus:outline-none focus:border-[#D4AF37] transition-all"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-[#D4AF37] text-white rounded-xl font-bold hover:bg-[#B8941E] transition-all whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SEO LINK GROUPS */}
      <section className="relative py-20 bg-[#F9FAFB] border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-[#0A0A0A] mb-12 text-center">
            Explore More in <span className="text-[#10B981]">Dubai</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {/* Dubai Areas */}
            <div>
              <h3 className="text-sm font-bold text-[#10B981] uppercase tracking-wide mb-4">
                Dubai Areas
              </h3>
              <ul className="space-y-2">
                {['Dubai Marina', 'Downtown Dubai', 'Palm Jumeirah', 'Business Bay', 'JBR', 'JVC', 'Arabian Ranches', 'Dubai Hills'].map((area) => (
                  <li key={area}>
                    <Link href={`/areas/${area.toLowerCase().replace(/\s/g, '-')}`} className="text-xs text-gray-500 hover:text-[#10B981] transition-colors">
                      {area}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Off-Plan By Price */}
            <div>
              <h3 className="text-sm font-bold text-[#10B981] uppercase tracking-wide mb-4">
                Off-Plan By Price
              </h3>
              <ul className="space-y-2">
                {['Under 500K', '500K - 1M', '1M - 2M', '2M - 3M', '3M - 5M', '5M - 10M', '10M+'].map((range) => (
                  <li key={range}>
                    <Link href={`/projects/by-price/${range.toLowerCase()}`} className="text-xs text-gray-500 hover:text-[#10B981] transition-colors">
                      {range}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Top Developers */}
            <div>
              <h3 className="text-sm font-bold text-[#10B981] uppercase tracking-wide mb-4">
                Top Developers
              </h3>
              <ul className="space-y-2">
                {['Emaar', 'DAMAC', 'Nakheel', 'Meraas', 'Sobha', 'Azizi', 'Omniyat', 'Aldar'].map((dev) => (
                  <li key={dev}>
                    <Link href={`/developers/${dev.toLowerCase()}`} className="text-xs text-gray-500 hover:text-[#10B981] transition-colors">
                      {dev}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Property Types */}
            <div>
              <h3 className="text-sm font-bold text-[#10B981] uppercase tracking-wide mb-4">
                Property Types
              </h3>
              <ul className="space-y-2">
                {['Apartments', 'Villas', 'Townhouses', 'Penthouses', 'Studios', 'Duplexes', 'Plots', 'Commercial'].map((type) => (
                  <li key={type}>
                    <Link href={`/projects/by-type/${type.toLowerCase()}`} className="text-xs text-gray-500 hover:text-[#10B981] transition-colors">
                      {type}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Investments */}
            <div>
              <h3 className="text-sm font-bold text-[#10B981] uppercase tracking-wide mb-4">
                Investments
              </h3>
              <ul className="space-y-2">
                {['High ROI Areas', 'Best Rental Yield', 'Capital Growth', 'Payment Plans', 'Off-Plan vs Ready', 'Golden Visa', 'Market Trends'].map((item) => (
                  <li key={item}>
                    <Link href={`/investment/${item.toLowerCase().replace(/\s/g, '-')}`} className="text-xs text-gray-500 hover:text-[#10B981] transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Insights */}
            <div>
              <h3 className="text-sm font-bold text-[#10B981] uppercase tracking-wide mb-4">
                Insights
              </h3>
              <ul className="space-y-2">
                {['Buyer Guide', 'Seller Guide', 'Investment Guide', 'Market Reports', 'ROI Calculator', 'Mortgage Guide', 'Legal Info', 'Blog'].map((item) => (
                  <li key={item}>
                    <Link href={`/resources/${item.toLowerCase().replace(/\s/g, '-')}`} className="text-xs text-gray-500 hover:text-[#10B981] transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* OUR OFFICES */}
      <section className="relative py-20 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-[#0A0A0A] mb-12 text-center">
            Our <span className="text-[#D4AF37]">Offices</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((office, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 shadow-lg rounded-xl p-6 hover:border-[#10B981] transition-all shadow-md hover:shadow-lg"
              >
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-[#10B981]" />
                  <h3 className="text-lg font-bold text-[#0A0A0A]">{office.name}</h3>
                </div>

                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {office.address}
                </p>

                <div className="space-y-2">
                  <a
                    href={`tel:${office.phone}`}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#10B981] transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {office.phone}
                  </a>
                  <a
                    href={`mailto:${office.email}`}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#10B981] transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    {office.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Spacer */}
      <div className="h-24"></div>
    </div>
  );
}
