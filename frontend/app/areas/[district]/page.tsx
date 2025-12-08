'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  MapPin, Building2, TrendingUp, Sparkles, CheckCircle, ChevronRight, ChevronLeft,
  School, Award, ShoppingBag, Train, Phone, MessageCircle,
  Home, DollarSign, BarChart3, Users, Star, Package
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Mock specialists data (can be fetched from API later)
const specialists = [
  {
    id: 1,
    name: 'Sarah Al-Mansoori',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    phone: '+971 50 123 4567',
    whatsapp: '+971 50 123 4567'
  },
  {
    id: 2,
    name: 'Ahmed Hassan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    phone: '+971 50 234 5678',
    whatsapp: '+971 50 234 5678'
  },
  {
    id: 3,
    name: 'Maria Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    phone: '+971 50 345 6789',
    whatsapp: '+971 50 345 6789'
  },
  {
    id: 4,
    name: 'Khalid Ibrahim',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    phone: '+971 50 456 7890',
    whatsapp: '+971 50 456 7890'
  }
];

// Offices data
const offices = [
  {
    name: 'Dubai Marina',
    address: 'Marina Plaza, Level 12, Dubai Marina',
    phone: '+971 4 123 4567'
  },
  {
    name: 'Business Bay',
    address: 'Bay Gate Tower, Floor 25, Business Bay',
    phone: '+971 4 234 5678'
  },
  {
    name: 'Jumeirah Village Circle',
    address: 'Circle Mall, Ground Floor, JVC',
    phone: '+971 4 345 6789'
  },
  {
    name: 'Dubai Creek Harbour',
    address: 'Creek Residences, Lobby Level',
    phone: '+971 4 456 7890'
  }
];

interface Project {
  id: number;
  slug: string;
  name: string;
  developer_name: string;
  price_from: string;
  images: string[];
  status: string;
  completion_date: string;
  payment_plan: string;
  property_types: string[];
  location: string;
}

interface Area {
  id: number;
  slug: string;
  name: string;
  image: string;
  starting_price: string;
  project_count: number;
  description: string;
  projects: Project[];
}

interface MarketStats {
  area_name: string;
  area_slug: string;
  avg_price_sqft: string;
  median_price_sqft: string;
  min_price: string;
  max_price: string;
  avg_transaction_value: string;
  total_transactions_6m: number;
  total_transactions_12m: number;
  total_volume_12m: string;
  top_property_type: string;
  avg_unit_size: string;
  yoy_price_change: string | null;
}

export default function DistrictDetailsPage() {
  const params = useParams();
  const districtSlug = params.district as string;

  const [area, setArea] = useState<Area | null>(null);
  const [marketStats, setMarketStats] = useState<MarketStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');

  // Fetch area data from API
  useEffect(() => {
    async function fetchArea() {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/areas/${districtSlug}`);
        const data = await res.json();

        if (data.success && data.data) {
          setArea(data.data);
        } else {
          setError('Area not found');
        }
      } catch (err) {
        console.error('Error fetching area:', err);
        setError('Failed to load area');
      } finally {
        setLoading(false);
      }
    }

    async function fetchMarketStats() {
      try {
        const res = await fetch(`${API_URL}/api/market/area/${districtSlug}`);
        if (res.ok) {
          const data = await res.json();
          setMarketStats(data);
        }
      } catch (err) {
        console.error('Error fetching market stats:', err);
      }
    }

    if (districtSlug) {
      fetchArea();
      fetchMarketStats();
    }
  }, [districtSlug]);

  const scrollSpecialists = (direction: 'left' | 'right') => {
    const container = document.getElementById('specialists-scroll');
    if (container) {
      const scrollAmount = 320;
      if (direction === 'left') {
        container.scrollLeft -= scrollAmount;
      } else {
        container.scrollLeft += scrollAmount;
      }
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for subscribing! We'll send updates to ${email}`);
    setEmail('');
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border border-gray-200 shadow-lg rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-[#10B981] animate-pulse" />
          </div>
          <p className="text-gray-600 text-lg font-semibold">Loading Area Details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !area) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">😕</div>
          <h3 className="text-2xl font-bold text-[#0A0A0A] mb-3">{error || 'Area not found'}</h3>
          <p className="text-gray-500 mb-8">The area you're looking for could not be found.</p>
          <Link href="/areas" className="bg-[#10B981] px-8 py-4 rounded-full font-bold text-[#0A0A0A] hover:bg-[#059669] transition-all">
            Browse All Areas
          </Link>
        </div>
      </div>
    );
  }

  // Parse starting price for display
  const parsePrice = (priceStr: string) => {
    const match = priceStr?.match(/[\d,.]+/);
    if (match) {
      const num = parseFloat(match[0].replace(/,/g, ''));
      if (priceStr.includes('M')) return num * 1000000;
      if (priceStr.includes('K')) return num * 1000;
      return num;
    }
    return 0;
  };

  const startingPrice = parsePrice(area.starting_price);

  return (
    <div className="min-h-screen bg-white">
      {/* Subtle Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#10B981]/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px]"></div>
      </div>

      {/* ========================================
          1) HERO SECTION (FULL WIDTH)
      ======================================== */}
      <section className="relative h-[500px] overflow-hidden">
        {/* Background Image */}
        <img
          src={area.image || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&h=600&fit=crop'}
          alt={area.name}
          className="absolute inset-0 w-full h-full object-cover"
          suppressHydrationWarning
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#020202]"></div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 h-full flex flex-col justify-end pb-16">
          {/* Breadcrumb */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Link href="/" className="hover:text-[#10B981] transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/areas" className="hover:text-[#10B981] transition-colors">Areas</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{area.name}</span>
            </div>
          </div>

          {/* District Name */}
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
            {area.name}
          </h1>

          {/* Stats Row */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#10B981]" />
              <span className="text-white font-semibold text-lg">
                {area.projects?.length || 0} Projects Available
              </span>
            </div>
            {startingPrice > 0 && (
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-[#D4AF37]" />
                <span className="text-white font-semibold text-lg">
                  Starting from {area.starting_price}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></div>
              <MapPin className="w-5 h-5 text-[#10B981]" />
              <span className="text-white/90 font-semibold text-lg">Prime Location</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* ========================================
            2) SHORT INTRO CONTENT BLOCK (FULL WIDTH)
        ======================================== */}
        <section className="py-16">
          <h2 className="text-3xl font-black text-[#0A0A0A] mb-6">
            About {area.name}
          </h2>
          <div className="space-y-4 text-[#0A0A0A]/70 text-base leading-relaxed max-w-4xl">
            <p>{area.description}</p>
          </div>
        </section>

        {/* ========================================
            3) AREA SPECIALISTS (HORIZONTAL SCROLL)
        ======================================== */}
        <section className="py-16 border-t border-gray-200/10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-[#0A0A0A]">
              {area.name} Specialists
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollSpecialists('left')}
                className="w-10 h-10 rounded-full bg-white/5 border border-gray-200 flex items-center justify-center hover:bg-white/10 hover:border-[#10B981]/40 transition-all"
              >
                <ChevronLeft className="w-5 h-5 text-[#0A0A0A]/60" />
              </button>
              <button
                onClick={() => scrollSpecialists('right')}
                className="w-10 h-10 rounded-full bg-white/5 border border-gray-200 flex items-center justify-center hover:bg-white/10 hover:border-[#10B981]/40 transition-all"
              >
                <ChevronRight className="w-5 h-5 text-[#0A0A0A]/60" />
              </button>
            </div>
          </div>

          <div
            id="specialists-scroll"
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          >
            {specialists.map((specialist) => (
              <div
                key={specialist.id}
                className="flex-shrink-0 w-72 bg-white border border-gray-200 rounded-xl p-6 hover:border-[#10B981]/40 transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={specialist.avatar}
                    alt={specialist.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#10B981]/30"
                    suppressHydrationWarning
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#0A0A0A] mb-1">{specialist.name}</h3>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-[#10B981]" />
                      <p className="text-xs text-[#0A0A0A]/50">AiGentsRealty Verified Specialist</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${specialist.whatsapp.replace(/\s/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#25D366]/20 border border-[#25D366]/40 rounded-lg hover:bg-[#25D366]/30 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span className="text-sm font-semibold text-[#0A0A0A]">WhatsApp</span>
                  </a>
                  <a
                    href={`tel:${specialist.phone}`}
                    className="flex items-center justify-center w-12 h-10 bg-white/5 border border-gray-200 rounded-lg hover:bg-white/10 hover:border-[#10B981]/40 transition-all"
                  >
                    <Phone className="w-4 h-4 text-[#0A0A0A]/60" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================
            4) FEATURED PROJECTS IN THIS DISTRICT
        ======================================== */}
        <section className="py-16 border-t border-gray-200/10">
          <h2 className="text-3xl font-black text-[#0A0A0A] mb-8">
            Featured Projects in {area.name}
          </h2>

          {area.projects && area.projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {area.projects.map((project: Project) => (
                <Link
                  key={project.slug}
                  href={`/areas/${districtSlug}/${project.slug}`}
                  className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#10B981]/40 hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.images?.[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop'}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      suppressHydrationWarning
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60"></div>

                    {/* Status Tag */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-xs font-bold text-[#0A0A0A]">
                      {project.status || 'Off Plan'}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-[#0A0A0A] mb-2 line-clamp-1">
                      {project.name}
                    </h3>
                    <p className="text-sm text-[#0A0A0A]/50 mb-3">by {project.developer_name}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs text-[#0A0A0A]/40 mb-0.5">Starting</p>
                        <p className="text-base font-bold text-[#10B981]">{project.price_from}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[#0A0A0A]/40 mb-0.5">{project.completion_date || 'TBA'}</p>
                        <p className="text-xs text-[#0A0A0A]/60 font-semibold">{project.payment_plan || 'Flexible'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-[#0A0A0A]/60 group-hover:text-[#10B981] group-hover:gap-2 transition-all">
                      <span className="text-sm font-semibold">View Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="max-w-2xl mx-auto">
              <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
                <div className="inline-flex mb-6">
                  <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center">
                    <Package className="w-10 h-10 text-[#0A0A0A]/30" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#0A0A0A] mb-3">
                  No Projects Currently Available
                </h3>
                <p className="text-[#0A0A0A]/50 leading-relaxed mb-6">
                  Check back soon for new developments in {area.name}. In the meantime, explore our other featured areas.
                </p>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#10B981] to-[#059669] text-black rounded-full font-bold hover:shadow-[0_0_30px_rgba(0,255,135,0.4)] transition-all"
                >
                  Browse All Projects
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* ========================================
            5) DISTRICT STATISTICS (NOW FULL-WIDTH)
        ======================================== */}
        <section className="py-16 border-t border-gray-200/10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-[#0A0A0A]">
              Market Insights
            </h2>
            {marketStats && (
              <span className="text-xs text-[#0A0A0A]/40 bg-white/5 px-3 py-1 rounded-full">
                Based on DLD Transaction Data
              </span>
            )}
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <Building2 className="w-6 h-6 text-[#10B981]" />
                </div>
                <p className="text-xs text-[#0A0A0A]/40 uppercase tracking-wide mb-2">Available Projects</p>
                <p className="text-2xl font-black text-[#0A0A0A]">{area.projects?.length || 0}</p>
              </div>

              {marketStats ? (
                <>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-3">
                      <DollarSign className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <p className="text-xs text-[#0A0A0A]/40 uppercase tracking-wide mb-2">Avg Price/sqft</p>
                    <p className="text-2xl font-black text-[#D4AF37]">
                      AED {Number(marketStats.avg_price_sqft).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center mb-3">
                      <BarChart3 className="w-6 h-6 text-[#10B981]" />
                    </div>
                    <p className="text-xs text-[#0A0A0A]/40 uppercase tracking-wide mb-2">Transactions (6M)</p>
                    <p className="text-2xl font-black text-[#0A0A0A]">
                      {marketStats.total_transactions_6m.toLocaleString()}
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center mb-3">
                      <TrendingUp className="w-6 h-6 text-[#10B981]" />
                    </div>
                    <p className="text-xs text-[#0A0A0A]/40 uppercase tracking-wide mb-2">Total Volume (12M)</p>
                    <p className="text-2xl font-black text-[#0A0A0A]">
                      AED {(Number(marketStats.total_volume_12m) / 1000000000).toFixed(1)}B
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {startingPrice > 0 && (
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-3">
                        <DollarSign className="w-6 h-6 text-[#D4AF37]" />
                      </div>
                      <p className="text-xs text-[#0A0A0A]/40 uppercase tracking-wide mb-2">Starting Price</p>
                      <p className="text-2xl font-black text-[#D4AF37]">{area.starting_price}</p>
                    </div>
                  )}

                  <div className="text-center">
                    <div className="flex items-center justify-center mb-3">
                      <TrendingUp className="w-6 h-6 text-[#10B981]" />
                    </div>
                    <p className="text-xs text-[#0A0A0A]/40 uppercase tracking-wide mb-2">High ROI Area</p>
                    <p className="text-2xl font-black text-[#0A0A0A]">8-12%</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center mb-3">
                      <Star className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <p className="text-xs text-[#0A0A0A]/40 uppercase tracking-wide mb-2">Investor Rating</p>
                    <p className="text-2xl font-black text-[#0A0A0A]">4.8/5</p>
                  </div>
                </>
              )}
            </div>

            {/* Additional Market Stats Row */}
            {marketStats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t border-gray-200/10">
                <div className="text-center">
                  <p className="text-xs text-[#0A0A0A]/40 uppercase tracking-wide mb-2">Top Property Type</p>
                  <p className="text-lg font-bold text-[#0A0A0A]">{marketStats.top_property_type || 'Mixed'}</p>
                </div>

                <div className="text-center">
                  <p className="text-xs text-[#0A0A0A]/40 uppercase tracking-wide mb-2">Avg Unit Size</p>
                  <p className="text-lg font-bold text-[#0A0A0A]">
                    {Number(marketStats.avg_unit_size).toLocaleString(undefined, { maximumFractionDigits: 0 })} sqft
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-xs text-[#0A0A0A]/40 uppercase tracking-wide mb-2">Avg Transaction</p>
                  <p className="text-lg font-bold text-[#0A0A0A]">
                    AED {(Number(marketStats.avg_transaction_value) / 1000000).toFixed(2)}M
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-xs text-[#0A0A0A]/40 uppercase tracking-wide mb-2">Transactions (12M)</p>
                  <p className="text-lg font-bold text-[#0A0A0A]">
                    {marketStats.total_transactions_12m.toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ========================================
            6) AI GENIE CTA (FULL WIDTH)
        ======================================== */}
        <section className="py-16 border-t border-gray-200">
          <div className="bg-gradient-to-br from-[#D4AF37]/10 via-[#D4AF37]/5 to-[#10B981]/5 border border-[#D4AF37]/30 rounded-2xl p-12 text-center relative overflow-hidden">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent pointer-events-none"></div>

            <div className="relative">
              {/* Icon */}
              <div className="inline-flex mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#D4AF37] rounded-2xl blur-xl opacity-40 animate-pulse"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#D4AF37]/70 rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-black" />
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-black text-[#0A0A0A] mb-4">
                Need Help Finding the Right Property?
              </h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Let AI Genie analyze your preferences and recommend the best property in {area.name}.
              </p>

              <button
                onClick={() => window.dispatchEvent(new CustomEvent('openFloatingChat'))}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/90 text-black rounded-full font-bold hover:shadow-[0_0_40px_rgba(232,196,104,0.4)] transition-all hover:scale-105"
              >
                <Sparkles className="w-5 h-5" />
                Ask Genie
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* ========================================
            7) NEWSLETTER / LEAD CAPTURE CTA
        ======================================== */}
        <section className="py-16 border-t border-gray-200">
          <div className="bg-gradient-to-br from-[#10B981]/10 via-[#10B981]/5 to-white border border-[#10B981]/30 rounded-2xl p-12">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-black text-[#0A0A0A] mb-4">
                Stay Updated on New Launches in {area.name}
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Be the first to know about new property launches, exclusive deals, and market insights in {area.name}.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-6 py-4 bg-white border border-gray-300 rounded-xl text-[#0A0A0A] placeholder:text-gray-400 focus:outline-none focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20 transition-all"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-[#10B981] to-[#059669] text-white rounded-xl font-bold hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all hover:scale-105 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ========================================
            8) SEO INTERNAL LINK COLUMNS
        ======================================== */}
        <section className="py-16 border-t border-gray-200/10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {/* Dubai Areas */}
            <div>
              <h3 className="text-sm font-bold text-[#0A0A0A]/90 uppercase tracking-wide mb-4">Dubai Areas</h3>
              <ul className="space-y-2">
                {['Dubai Marina', 'Downtown Dubai', 'Palm Jumeirah', 'Business Bay', 'JBR'].map((area) => (
                  <li key={area}>
                    <Link href={`/areas/${area.toLowerCase().replace(/\s/g, '-')}`} className="text-xs text-[#0A0A0A]/50 hover:text-[#10B981] transition-colors">
                      {area}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Developers */}
            <div>
              <h3 className="text-sm font-bold text-[#0A0A0A]/90 uppercase tracking-wide mb-4">Developers</h3>
              <ul className="space-y-2">
                {['Emaar', 'DAMAC', 'Nakheel', 'Meraas', 'Sobha'].map((dev) => (
                  <li key={dev}>
                    <Link href={`/developers/${dev.toLowerCase()}`} className="text-xs text-[#0A0A0A]/50 hover:text-[#10B981] transition-colors">
                      {dev}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* By Price Range */}
            <div>
              <h3 className="text-sm font-bold text-[#0A0A0A]/90 uppercase tracking-wide mb-4">By Price</h3>
              <ul className="space-y-2">
                {['Under 1M', '1M - 2M', '2M - 3M', '3M - 5M', '5M+'].map((range) => (
                  <li key={range}>
                    <Link href={`/projects/by-price/${range.toLowerCase()}`} className="text-xs text-[#0A0A0A]/50 hover:text-[#10B981] transition-colors">
                      {range}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Investment Guides */}
            <div>
              <h3 className="text-sm font-bold text-[#0A0A0A]/90 uppercase tracking-wide mb-4">Resources</h3>
              <ul className="space-y-2">
                {['Investment Guide', 'Buyer Guide', 'Market Reports', 'ROI Calculator', 'Payment Plans'].map((guide) => (
                  <li key={guide}>
                    <Link href={`/resources/${guide.toLowerCase().replace(/\s/g, '-')}`} className="text-xs text-[#0A0A0A]/50 hover:text-[#10B981] transition-colors">
                      {guide}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Property Types */}
            <div>
              <h3 className="text-sm font-bold text-[#0A0A0A]/90 uppercase tracking-wide mb-4">Property Types</h3>
              <ul className="space-y-2">
                {['Apartments', 'Villas', 'Townhouses', 'Penthouses', 'Commercial'].map((type) => (
                  <li key={type}>
                    <Link href={`/projects/by-type/${type.toLowerCase()}`} className="text-xs text-[#0A0A0A]/50 hover:text-[#10B981] transition-colors">
                      {type}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================
            9) OUR OFFICES SECTION
        ======================================== */}
        <section className="py-16 border-t border-gray-200/10">
          <h2 className="text-3xl font-black text-[#0A0A0A] mb-8">
            Our Offices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((office, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-[#10B981]/40 transition-all">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-[#10B981]" />
                  <h3 className="text-lg font-bold text-[#0A0A0A]">{office.name}</h3>
                </div>
                <p className="text-sm text-[#0A0A0A]/60 mb-4">{office.address}</p>
                <a
                  href={`tel:${office.phone}`}
                  className="flex items-center gap-2 text-sm font-semibold text-[#10B981] hover:text-[#10B981]/80 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {office.phone}
                </a>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Footer Spacer */}
      <div className="h-24"></div>
    </div>
  );
}
