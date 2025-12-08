'use client';

import { TrendingUp, Sparkles, MapPin, Shield, Percent, Globe, Building2, Users, ArrowRight, Award, Zap } from 'lucide-react';
import Link from 'next/link';

export default function WhyDubaiPage() {
  const stats = [
    {
      icon: Percent,
      value: '0%',
      label: 'Tax on Property',
      description: 'No income tax, capital gains tax, or property tax',
      color: 'emerald'
    },
    {
      icon: TrendingUp,
      value: '7-12%',
      label: 'Average ROI',
      description: 'Higher returns compared to most global markets',
      color: 'gold'
    },
    {
      icon: MapPin,
      value: 'Strategic',
      label: 'Global Location',
      description: 'Gateway between East and West, 8-hour flight to 2/3 of world',
      color: 'emerald'
    },
    {
      icon: Shield,
      value: '100%',
      label: 'Foreign Ownership',
      description: 'Full freehold ownership rights for international investors',
      color: 'gold'
    }
  ];

  const advantages = [
    {
      icon: Building2,
      title: 'World-Class Infrastructure',
      description: 'State-of-the-art developments with cutting-edge amenities and facilities',
      features: ['Smart home technology', 'Premium finishes', 'Luxury amenities', 'Sustainable design']
    },
    {
      icon: Globe,
      title: 'Global Connectivity',
      description: 'Dubai International Airport is one of the busiest in the world',
      features: ['Direct flights worldwide', 'Business hub status', 'Free zones', 'International schools']
    },
    {
      icon: Users,
      title: 'Diverse Community',
      description: 'Over 200 nationalities living harmoniously in a safe, modern city',
      features: ['Low crime rate', 'Family-friendly', 'Cultural diversity', 'Quality of life']
    },
    {
      icon: Award,
      title: 'Proven Track Record',
      description: 'Decades of successful real estate development and investor returns',
      features: ['Transparent regulations', 'Property protection laws', 'Escrow accounts', 'Legal framework']
    },
    {
      icon: Zap,
      title: 'Economic Growth',
      description: 'Rapidly growing economy with Vision 2030 driving innovation',
      features: ['Tourism growth', 'Expo legacy', 'Tech innovation', 'Business expansion']
    },
    {
      icon: TrendingUp,
      title: 'High Rental Yields',
      description: 'Strong rental demand across all property segments',
      features: ['Corporate relocations', 'Tourism boom', 'Growing population', 'Limited supply']
    }
  ];

  const marketHighlights = [
    {
      title: 'Payment Plans',
      value: '60/40 to 80/20',
      description: 'Flexible developer payment plans during construction',
      color: 'emerald'
    },
    {
      title: 'Delivery Timeline',
      value: '2-4 Years',
      description: 'Average construction period for off-plan projects',
      color: 'gold'
    },
    {
      title: 'Price Appreciation',
      value: '15-25%',
      description: 'Typical appreciation from launch to handover',
      color: 'emerald'
    },
    {
      title: 'Mortgage Options',
      value: 'Up to 80%',
      description: 'Loan-to-value ratio available for buyers',
      color: 'gold'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] relative overflow-hidden">
      {/* SUBTLE LIGHT GRADIENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-emerald-50 to-transparent opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-amber-50 to-transparent opacity-40"></div>
      </div>

      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-16 px-6 lg:px-16">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-8">
              <Link href="/investment" className="inline-flex items-center gap-2 text-gray-600 hover:text-[#10B981] transition-colors group">
                <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Investment Hub</span>
              </Link>
            </div>

            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-5 py-1.5 mb-4">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-xs font-bold text-[#D4AF37] tracking-wide">MARKET INSIGHTS</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-[#0A0A0A] mb-6 leading-[1.05] tracking-tight">
              Why Invest in
              <br />
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] bg-clip-text text-transparent">
                Dubai Off-Plan?
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl">
              Discover why Dubai's off-plan property market offers unmatched opportunities for investors worldwide
            </p>
          </div>
        </section>

        {/* KEY STATS SECTION */}
        <section className="px-6 lg:px-16 pb-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                const isEmerald = stat.color === 'emerald';

                return (
                  <div
                    key={index}
                    className={`bg-white border ${isEmerald ? 'border-[#10B981]/30' : 'border-[#D4AF37]/30'} shadow-md rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300 hover:shadow-lg`}
                  >
                    <div className={`w-14 h-14 rounded-2xl ${isEmerald ? 'bg-[#10B981]/10' : 'bg-[#D4AF37]/10'} flex items-center justify-center mb-6`}>
                      <Icon className={`w-7 h-7 ${isEmerald ? 'text-[#10B981]' : 'text-[#D4AF37]'}`} />
                    </div>

                    <div className={`text-5xl font-black mb-3 ${isEmerald ? 'text-[#10B981]' : 'text-[#D4AF37]'}`}>
                      {stat.value}
                    </div>

                    <h3 className="text-xl font-black text-[#0A0A0A] mb-2">
                      {stat.label}
                    </h3>

                    <p className="text-sm text-gray-600">
                      {stat.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ADVANTAGES SECTION */}
        <section className="px-6 lg:px-16 pb-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-8 h-8 text-[#10B981]" />
              <h2 className="text-4xl font-black text-[#0A0A0A]">Market Advantages</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advantages.map((advantage, index) => {
                const Icon = advantage.icon;

                return (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 hover:border-[#10B981]/40 shadow-md rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#10B981]/10 flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-[#10B981]" />
                    </div>

                    <h3 className="text-2xl font-black text-[#0A0A0A] mb-3">
                      {advantage.title}
                    </h3>

                    <p className="text-gray-600 mb-6">
                      {advantage.description}
                    </p>

                    <ul className="space-y-2">
                      {advantage.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* MARKET HIGHLIGHTS SECTION */}
        <section className="px-6 lg:px-16 pb-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="w-8 h-8 text-[#D4AF37]" />
              <h2 className="text-4xl font-black text-[#0A0A0A]">Market Highlights</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {marketHighlights.map((highlight, index) => {
                const isEmerald = highlight.color === 'emerald';

                return (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 hover:border-[#10B981]/30 shadow-md rounded-3xl p-6 transition-all duration-300 hover:shadow-lg"
                  >
                    <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-3">
                      {highlight.title}
                    </h3>

                    <div className={`text-4xl font-black mb-3 ${isEmerald ? 'text-[#10B981]' : 'text-[#D4AF37]'}`}>
                      {highlight.value}
                    </div>

                    <p className="text-sm text-gray-600">
                      {highlight.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* COMPARISON SECTION */}
        <section className="px-6 lg:px-16 pb-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="bg-white border border-gray-200 shadow-lg rounded-3xl p-12">
              <h2 className="text-4xl font-black text-[#0A0A0A] mb-8 text-center">
                Dubai vs. Global Markets
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-4 px-4 text-gray-600 font-bold">Factor</th>
                      <th className="text-left py-4 px-4 text-[#10B981] font-bold">Dubai</th>
                      <th className="text-left py-4 px-4 text-gray-600 font-bold">London</th>
                      <th className="text-left py-4 px-4 text-gray-600 font-bold">New York</th>
                      <th className="text-left py-4 px-4 text-gray-600 font-bold">Singapore</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4 text-gray-600">Property Tax</td>
                      <td className="py-4 px-4 font-bold text-[#10B981]">0%</td>
                      <td className="py-4 px-4 text-gray-600">Up to 2%</td>
                      <td className="py-4 px-4 text-gray-600">1-2%</td>
                      <td className="py-4 px-4 text-gray-600">Up to 16%</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4 text-gray-600">Income Tax</td>
                      <td className="py-4 px-4 font-bold text-[#10B981]">0%</td>
                      <td className="py-4 px-4 text-gray-600">20-45%</td>
                      <td className="py-4 px-4 text-gray-600">22-37%</td>
                      <td className="py-4 px-4 text-gray-600">Up to 22%</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4 text-gray-600">Rental Yield</td>
                      <td className="py-4 px-4 font-bold text-[#10B981]">7-12%</td>
                      <td className="py-4 px-4 text-gray-600">3-5%</td>
                      <td className="py-4 px-4 text-gray-600">3-6%</td>
                      <td className="py-4 px-4 text-gray-600">3-4%</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4 text-gray-600">Capital Gains Tax</td>
                      <td className="py-4 px-4 font-bold text-[#10B981]">0%</td>
                      <td className="py-4 px-4 text-gray-600">10-28%</td>
                      <td className="py-4 px-4 text-gray-600">15-20%</td>
                      <td className="py-4 px-4 text-gray-600">Up to 20%</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-gray-600">Foreign Ownership</td>
                      <td className="py-4 px-4 font-bold text-[#10B981]">100% Freehold</td>
                      <td className="py-4 px-4 text-gray-600">Yes</td>
                      <td className="py-4 px-4 text-gray-600">Yes</td>
                      <td className="py-4 px-4 text-gray-600">Restricted</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="px-6 lg:px-16 pb-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="bg-gradient-to-br from-emerald-50 via-white to-amber-50 border border-gray-200 shadow-lg rounded-3xl p-12 text-center">
              <h2 className="text-4xl lg:text-5xl font-black text-[#0A0A0A] mb-4">
                Start Your Dubai Investment Journey
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Explore our curated off-plan properties and calculate your potential returns
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/projects" className="bg-gradient-to-r from-[#10B981] to-[#059669] px-8 py-4 rounded-full font-bold text-white shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                  Browse Properties
                </Link>
                <Link href="/investment/roi-calculator" className="bg-gradient-to-r from-[#D4AF37] to-[#C19B2E] px-8 py-4 rounded-full font-bold text-white shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                  Calculate ROI
                </Link>
                <Link href="/investment/first-time" className="bg-white border-2 border-[#10B981] px-8 py-4 rounded-full font-bold text-[#10B981] hover:bg-[#10B981]/5 transition-all hover:-translate-y-1">
                  First-Time Guide
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
