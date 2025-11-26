'use client';

import { TrendingUp, ArrowRight, Sparkles, DollarSign } from 'lucide-react';
import Link from 'next/link';

const priceRanges = [
  {
    slug: 'under-1m',
    title: 'Under AED 1M',
    description: 'Affordable entry-level properties perfect for first-time investors',
    range: 'AED 500K - 999K',
    badge: 'Best Value',
    badgeColor: 'bg-[#10B981]',
    count: '12 Projects',
    gradient: 'from-[#10B981]/20 to-[#059669]/10'
  },
  {
    slug: '1m-to-3m',
    title: 'AED 1M - 3M',
    description: 'Premium apartments and townhouses in established communities',
    range: 'AED 1M - 3M',
    badge: 'Most Popular',
    badgeColor: 'bg-[#D4AF37]',
    count: '28 Projects',
    gradient: 'from-[#D4AF37]/20 to-[#B8941E]/10'
  },
  {
    slug: '3m-to-5m',
    title: 'AED 3M - 5M',
    description: 'Luxury properties in Dubai\'s most prestigious locations',
    range: 'AED 3M - 5M',
    badge: 'Premium',
    badgeColor: 'bg-[#D4AF37]',
    count: '15 Projects',
    gradient: 'from-[#D4AF37]/30 to-[#F4E5B8]/10'
  },
  {
    slug: 'above-5m',
    title: 'Above AED 5M',
    description: 'Ultra-luxury penthouses, waterfront mansions, and iconic landmarks',
    range: 'AED 5M+',
    badge: 'Ultra-Luxury',
    badgeColor: 'bg-gradient-to-r from-[#D4AF37] to-[#F4E5B8]',
    count: '8 Projects',
    gradient: 'from-[#D4AF37]/40 to-[#F4E5B8]/20'
  }
];

export default function BrowseByPrice() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] py-20">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-[20%] w-[400px] h-[400px] bg-[#10B981]/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-10 right-[15%] w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[140px]"></div>
        </div>

        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#10B981]/10 border border-[#10B981]/30 rounded-full mb-6">
              <DollarSign className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm font-semibold text-[#10B981]">Browse by Budget</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Find Properties by
              <br />
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#B8941E] bg-clip-text text-transparent">
                Price Range
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Discover off-plan projects that match your investment budget. From affordable entry-level properties to ultra-luxury developments.
            </p>
          </div>
        </div>
      </section>

      {/* Price Range Cards */}
      <section className="py-16 px-6 lg:px-16">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {priceRanges.map((range, index) => (
              <Link
                key={range.slug}
                href={`/projects?price=${range.slug}`}
                className="group relative bg-[#1A1A1A] rounded-3xl overflow-hidden border border-white/5 hover:border-[#10B981]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(16,185,129,0.2)]"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${range.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-500`}></div>

                <div className="relative p-8 lg:p-10">
                  {/* Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className={`${range.badgeColor} px-4 py-2 rounded-full text-xs font-bold text-white`}>
                      {range.badge}
                    </span>
                    <span className="text-sm font-semibold text-gray-400">{range.count}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 group-hover:text-[#10B981] transition-colors">
                    {range.title}
                  </h2>

                  {/* Range Display */}
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="w-5 h-5 text-[#10B981]" />
                    <span className="text-xl font-bold text-[#D4AF37]">{range.range}</span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    {range.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-3 text-[#10B981] font-bold text-lg group-hover:gap-5 transition-all">
                    <span>Browse Properties</span>
                    <div className="w-12 h-12 rounded-full border-2 border-[#10B981] flex items-center justify-center group-hover:bg-[#10B981] group-hover:text-black transition-all">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                {/* Sparkle Icon Decoration */}
                <div className="absolute top-8 right-8 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Sparkles className="w-24 h-24 text-[#D4AF37]" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-16 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A]">
        <div className="max-w-[1600px] mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Use our advanced filters or chat with our AI assistant to find your perfect property
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/projects"
              className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8941E] text-black rounded-xl font-bold hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-all duration-300"
            >
              Advanced Search
            </Link>
            <button className="px-8 py-4 bg-[#0A0A0A]/80 backdrop-blur-xl border-2 border-[#10B981]/40 text-white rounded-xl font-bold hover:bg-[#10B981]/10 hover:border-[#10B981]/60 transition-all duration-300 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Ask AI Assistant
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
