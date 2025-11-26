'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Building2, ChevronRight, ChevronDown, ChevronUp, Phone, Mail } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';

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

export default function AreasPage() {
  const [areasData, setAreasData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function fetchAreas() {
      try {
        const res = await fetch(`${API_URL}/api/areas`);
        const data = await res.json();
        if (data.success) {
          setAreasData(data.data);
        }
      } catch (error) {
        console.error('Error fetching areas:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchAreas();
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for subscribing! We'll send updates to ${email}`);
    setEmail('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020202] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#4CFF91]/20 border-t-[#4CFF91] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60 text-sm font-medium">Loading Dubai Areas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202]">
      {/* Subtle Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.015]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#4CFF91 1px, transparent 1px), linear-gradient(90deg, #4CFF91 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      {/* ========================================
          1) PAGE HEADING (FULL WIDTH)
      ======================================== */}
      <section className="relative pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Explore Dubai's Top Areas
          </h1>
          <p className="text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
            Discover Dubai's best neighbourhoods powered by AI insights — from waterfront districts to family communities and investment hotspots.
          </p>
        </div>
      </section>

      {/* ========================================
          2) MEGA GRID OF AREAS (FULL WIDTH)
      ======================================== */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {areasData.map((area, index) => (
              <Link
                key={area.slug}
                href={`/areas/${area.slug}`}
                className="group relative block bg-black/40 rounded-2xl overflow-hidden border border-white/10 hover:border-[#4CFF91]/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(76,255,145,0.2)]"
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
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-[#4CFF91]/40 text-xs font-bold text-[#4CFF91]">
                    {area.project_count} Projects
                  </div>

                  {/* Neon Glow on Hover */}
                  <div className="absolute inset-0 border-2 border-[#4CFF91]/0 group-hover:border-[#4CFF91]/40 rounded-2xl transition-all duration-500"></div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  {/* Area Name */}
                  <h3 className="text-xl font-black text-white mb-2 tracking-tight line-clamp-1">
                    {area.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/50 mb-4 line-clamp-1">
                    {area.description || 'Premium Dubai community with excellent amenities'}
                  </p>

                  {/* Bottom Row */}
                  <div className="flex items-center justify-between">
                    {/* Starting Price */}
                    <div>
                      <p className="text-xs text-white/40 mb-0.5">Starting from</p>
                      <p className="text-base font-bold text-[#4CFF91]">
                        {area.starting_price || 'TBA'}
                      </p>
                    </div>

                    {/* Explore Button */}
                    <div className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#E2C675] to-[#E2C675]/80 text-black text-xs font-bold group-hover:gap-2.5 transition-all">
                      <span>Explore</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          3) FAQ SECTION (FULL WIDTH)
      ======================================== */}
      <section className="relative py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl font-black text-white mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden hover:border-[#4CFF91]/30 transition-all"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-base font-bold text-white pr-4">
                    {faq.question}
                  </span>
                  {openFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-[#4CFF91] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white/40 flex-shrink-0" />
                  )}
                </button>

                {openFAQ === index && (
                  <div className="px-6 pb-6">
                    <p className="text-white/60 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          4) NEWSLETTER CTA (FULL WIDTH)
      ======================================== */}
      <section className="relative py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-[#E2C675]/20 via-[#E2C675]/10 to-black/40 border border-[#E2C675]/30 rounded-3xl p-12 overflow-hidden">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#E2C675]/5 to-transparent pointer-events-none"></div>

            <div className="relative text-center">
              <h2 className="text-4xl font-black text-white mb-4">
                Stay Updated on New Launches in Dubai
              </h2>
              <p className="text-white/60 mb-8 leading-relaxed max-w-2xl mx-auto">
                Join our newsletter to receive the latest AI-powered market insights, new property launches, and exclusive investment opportunities.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-6 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#E2C675]/60 focus:bg-white/10 transition-all"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-[#E2C675] to-[#E2C675]/90 text-black rounded-xl font-bold hover:shadow-[0_0_40px_rgba(226,198,117,0.4)] transition-all hover:scale-105 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          5) SEO LINK GROUPS (FULL WIDTH)
      ======================================== */}
      <section className="relative py-20 bg-[#0D0D0D] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-white mb-12 text-center">
            Explore More in Dubai
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {/* Dubai Areas */}
            <div>
              <h3 className="text-sm font-bold text-[#4CFF91] uppercase tracking-wide mb-4">
                Dubai Areas
              </h3>
              <ul className="space-y-2">
                {['Dubai Marina', 'Downtown Dubai', 'Palm Jumeirah', 'Business Bay', 'JBR', 'JVC', 'Arabian Ranches', 'Dubai Hills'].map((area) => (
                  <li key={area}>
                    <Link href={`/areas/${area.toLowerCase().replace(/\s/g, '-')}`} className="text-xs text-white/50 hover:text-[#4CFF91] transition-colors">
                      {area}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Off-Plan By Price */}
            <div>
              <h3 className="text-sm font-bold text-[#4CFF91] uppercase tracking-wide mb-4">
                Off-Plan By Price
              </h3>
              <ul className="space-y-2">
                {['Under 500K', '500K - 1M', '1M - 2M', '2M - 3M', '3M - 5M', '5M - 10M', '10M+'].map((range) => (
                  <li key={range}>
                    <Link href={`/projects/by-price/${range.toLowerCase()}`} className="text-xs text-white/50 hover:text-[#4CFF91] transition-colors">
                      {range}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Top Developers */}
            <div>
              <h3 className="text-sm font-bold text-[#4CFF91] uppercase tracking-wide mb-4">
                Top Developers
              </h3>
              <ul className="space-y-2">
                {['Emaar', 'DAMAC', 'Nakheel', 'Meraas', 'Sobha', 'Azizi', 'Omniyat', 'Aldar'].map((dev) => (
                  <li key={dev}>
                    <Link href={`/developers/${dev.toLowerCase()}`} className="text-xs text-white/50 hover:text-[#4CFF91] transition-colors">
                      {dev}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Property Types */}
            <div>
              <h3 className="text-sm font-bold text-[#4CFF91] uppercase tracking-wide mb-4">
                Property Types
              </h3>
              <ul className="space-y-2">
                {['Apartments', 'Villas', 'Townhouses', 'Penthouses', 'Studios', 'Duplexes', 'Plots', 'Commercial'].map((type) => (
                  <li key={type}>
                    <Link href={`/projects/by-type/${type.toLowerCase()}`} className="text-xs text-white/50 hover:text-[#4CFF91] transition-colors">
                      {type}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Investments */}
            <div>
              <h3 className="text-sm font-bold text-[#4CFF91] uppercase tracking-wide mb-4">
                Investments
              </h3>
              <ul className="space-y-2">
                {['High ROI Areas', 'Best Rental Yield', 'Capital Growth', 'Payment Plans', 'Off-Plan vs Ready', 'Golden Visa', 'Market Trends'].map((item) => (
                  <li key={item}>
                    <Link href={`/investment/${item.toLowerCase().replace(/\s/g, '-')}`} className="text-xs text-white/50 hover:text-[#4CFF91] transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Insights */}
            <div>
              <h3 className="text-sm font-bold text-[#4CFF91] uppercase tracking-wide mb-4">
                Insights
              </h3>
              <ul className="space-y-2">
                {['Buyer Guide', 'Seller Guide', 'Investment Guide', 'Market Reports', 'ROI Calculator', 'Mortgage Guide', 'Legal Info', 'Blog'].map((item) => (
                  <li key={item}>
                    <Link href={`/resources/${item.toLowerCase().replace(/\s/g, '-')}`} className="text-xs text-white/50 hover:text-[#4CFF91] transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          6) OUR OFFICES (FULL WIDTH)
      ======================================== */}
      <section className="relative py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-white mb-12 text-center">
            Our Offices
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((office, index) => (
              <div
                key={index}
                className="bg-white/[0.03] border border-white/10 rounded-xl p-6 hover:border-[#4CFF91]/40 transition-all"
              >
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-[#4CFF91]" />
                  <h3 className="text-lg font-bold text-white">{office.name}</h3>
                </div>

                <p className="text-sm text-white/60 mb-4 leading-relaxed">
                  {office.address}
                </p>

                <div className="space-y-2">
                  <a
                    href={`tel:${office.phone}`}
                    className="flex items-center gap-2 text-sm text-white/70 hover:text-[#4CFF91] transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {office.phone}
                  </a>
                  <a
                    href={`mailto:${office.email}`}
                    className="flex items-center gap-2 text-sm text-white/70 hover:text-[#4CFF91] transition-colors"
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
