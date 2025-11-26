'use client';

import { TrendingUp, Sparkles, ArrowRight, Clock, Target, DollarSign, Zap, CheckCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function FlipStrategyPage() {
  const timeline = [
    {
      phase: 'Purchase',
      month: '0',
      action: 'Book off-plan property at launch price',
      cost: '10-20% down payment',
      color: 'emerald'
    },
    {
      phase: 'Construction',
      month: '6-18',
      action: 'Property appreciates during construction',
      cost: 'Installment payments as per plan',
      color: 'gold'
    },
    {
      phase: 'Pre-Handover',
      month: '18-24',
      action: 'Market property before completion',
      cost: 'Marketing and agent fees',
      color: 'emerald'
    },
    {
      phase: 'Exit',
      month: '24',
      action: 'Sell property assignment before handover',
      cost: 'Transfer fees (if any)',
      color: 'gold'
    }
  ];

  const successStories = [
    {
      project: 'Dubai Creek Harbour',
      purchasePrice: 1500000,
      salePrice: 1830000,
      roi: 22,
      duration: '18 months',
      profit: 330000
    },
    {
      project: 'Dubai Hills Estate',
      purchasePrice: 2200000,
      salePrice: 2596000,
      roi: 18,
      duration: '20 months',
      profit: 396000
    },
    {
      project: 'Dubai Marina Tower',
      purchasePrice: 1800000,
      salePrice: 2250000,
      roi: 25,
      duration: '16 months',
      profit: 450000
    }
  ];

  const advantages = [
    {
      icon: DollarSign,
      title: 'Low Initial Investment',
      description: 'Start with just 10-20% down payment instead of full property price'
    },
    {
      icon: TrendingUp,
      title: 'Quick Returns',
      description: 'Realize profits within 1-3 years instead of long-term holding'
    },
    {
      icon: Zap,
      title: 'Capital Appreciation',
      description: 'Benefit from property value increase during construction phase'
    },
    {
      icon: Target,
      title: 'Exit Flexibility',
      description: 'Multiple exit options: assignment sale, immediate resale, or hold'
    }
  ];

  const risks = [
    {
      title: 'Market Volatility',
      description: 'Property prices may not appreciate as expected',
      mitigation: 'Choose prime locations and reputable developers'
    },
    {
      title: 'Construction Delays',
      description: 'Project delays can affect your exit timeline',
      mitigation: 'Select developers with proven track record'
    },
    {
      title: 'Liquidity Risk',
      description: 'May be difficult to find buyers before handover',
      mitigation: 'Work with experienced real estate agents'
    },
    {
      title: 'Payment Obligations',
      description: 'Must continue installments until sale completes',
      mitigation: 'Maintain adequate cash reserves'
    }
  ];

  const tips = [
    'Research emerging areas with planned infrastructure',
    'Buy during project launch for best pricing',
    'Choose properties with strong rental demand as backup',
    'Monitor market trends and competitor pricing',
    'Build relationships with agents and investors',
    'Have exit strategy planned from day one',
    'Keep all documentation organized for quick sale',
    'Consider tax implications of short-term gains'
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* AI PARTICLE GLOW BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00C775]/5 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#F3C440]/5 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#00C775]/3 rounded-full blur-[200px]"></div>
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
          <div className="max-w-[1400px] mx-auto">
            <Link href="/investment" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00C775] transition-colors mb-8 group">
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Investment Hub</span>
            </Link>

            <div className="inline-flex items-center gap-2 bg-[#00C775]/10 border border-[#00C775]/30 rounded-full px-6 py-2 mb-6">
              <TrendingUp className="w-4 h-4 text-[#00C775]" />
              <span className="text-sm font-bold text-[#00C775]">INVESTMENT STRATEGY</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-white mb-6 leading-[1.05] tracking-tight">
              Property Flipping
              <br />
              <span className="bg-gradient-to-r from-[#F3C440] via-[#FFD700] to-[#F3C440] bg-clip-text text-transparent">
                Strategy
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-3xl">
              Profit from pre-construction appreciation by buying off-plan and selling before handover
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-[#0D0D0D]/80 backdrop-blur-xl border border-[#00C775]/20 rounded-2xl p-6">
                <div className="text-4xl font-black text-[#00C775] mb-2">18-25%</div>
                <p className="text-gray-400">Average ROI</p>
              </div>
              <div className="bg-[#0D0D0D]/80 backdrop-blur-xl border border-[#F3C440]/20 rounded-2xl p-6">
                <div className="text-4xl font-black text-[#F3C440] mb-2">1-3 Years</div>
                <p className="text-gray-400">Typical Timeline</p>
              </div>
              <div className="bg-[#0D0D0D]/80 backdrop-blur-xl border border-[#00C775]/20 rounded-2xl p-6">
                <div className="text-4xl font-black text-[#00C775] mb-2">10-20%</div>
                <p className="text-gray-400">Initial Capital</p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section className="px-6 lg:px-16 pb-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Clock className="w-8 h-8 text-[#00C775]" />
              <h2 className="text-4xl font-black text-white">How Property Flipping Works</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {timeline.map((item, index) => {
                const isEmerald = item.color === 'emerald';

                return (
                  <div
                    key={index}
                    className={`bg-[#0D0D0D]/80 backdrop-blur-xl border ${
                      isEmerald ? 'border-[#00C775]/40' : 'border-[#F3C440]/40'
                    } rounded-3xl p-6 hover:-translate-y-2 transition-all duration-300`}
                  >
                    <div className={`w-12 h-12 rounded-full ${
                      isEmerald ? 'bg-[#00C775]/20' : 'bg-[#F3C440]/20'
                    } flex items-center justify-center mb-4`}>
                      <span className={`text-xl font-black ${
                        isEmerald ? 'text-[#00C775]' : 'text-[#F3C440]'
                      }`}>
                        {index + 1}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-white mb-2">{item.phase}</h3>
                    <p className="text-sm text-gray-500 mb-4">Month {item.month}</p>
                    <p className="text-gray-400 mb-4">{item.action}</p>
                    <div className={`text-sm font-bold ${
                      isEmerald ? 'text-[#00C775]' : 'text-[#F3C440]'
                    }`}>
                      {item.cost}
                    </div>
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
              <Sparkles className="w-8 h-8 text-[#00C775]" />
              <h2 className="text-4xl font-black text-white">Key Advantages</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {advantages.map((advantage, index) => {
                const Icon = advantage.icon;

                return (
                  <div
                    key={index}
                    className="bg-[#0D0D0D]/80 backdrop-blur-xl border border-white/10 hover:border-[#00C775]/60 rounded-3xl p-8 transition-all duration-300"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#00C775]/20 flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-[#00C775]" />
                    </div>

                    <h3 className="text-2xl font-black text-white mb-3">
                      {advantage.title}
                    </h3>

                    <p className="text-gray-400">
                      {advantage.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SUCCESS STORIES SECTION */}
        <section className="px-6 lg:px-16 pb-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Target className="w-8 h-8 text-[#F3C440]" />
              <h2 className="text-4xl font-black text-white">Real Success Stories</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {successStories.map((story, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-[#00C775]/10 via-[#0D0D0D]/80 to-[#0D0D0D]/80 backdrop-blur-xl border border-[#00C775]/40 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300"
                >
                  <h3 className="text-xl font-black text-white mb-6">{story.project}</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Purchase Price</span>
                      <span className="font-bold text-white">AED {story.purchasePrice.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Sale Price</span>
                      <span className="font-bold text-white">AED {story.salePrice.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Duration</span>
                      <span className="font-bold text-white">{story.duration}</span>
                    </div>

                    <div className="border-t border-white/10 pt-4 mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Net Profit</span>
                        <span className="text-2xl font-black text-[#00C775]">
                          AED {story.profit.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">ROI</span>
                        <span className="text-3xl font-black text-[#F3C440]">{story.roi}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RISKS SECTION */}
        <section className="px-6 lg:px-16 pb-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <AlertTriangle className="w-8 h-8 text-[#F3C440]" />
              <h2 className="text-4xl font-black text-white">Risks & Mitigation</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {risks.map((risk, index) => (
                <div
                  key={index}
                  className="bg-[#0D0D0D]/80 backdrop-blur-xl border border-[#F3C440]/20 rounded-3xl p-8"
                >
                  <h3 className="text-xl font-black text-white mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-[#F3C440]" />
                    {risk.title}
                  </h3>

                  <p className="text-gray-400 mb-4">
                    {risk.description}
                  </p>

                  <div className="bg-[#00C775]/10 border border-[#00C775]/30 rounded-xl p-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#00C775] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-[#00C775] mb-1">Mitigation</p>
                        <p className="text-sm text-gray-300">{risk.mitigation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRO TIPS SECTION */}
        <section className="px-6 lg:px-16 pb-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="bg-gradient-to-br from-[#0D0D0D] via-[#0D0D0D] to-[#00C775]/5 backdrop-blur-xl border border-[#00C775]/20 rounded-3xl p-12">
              <div className="flex items-center gap-3 mb-8">
                <Zap className="w-8 h-8 text-[#00C775]" />
                <h2 className="text-4xl font-black text-white">Pro Tips for Success</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#00C775] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="px-6 lg:px-16 pb-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="bg-gradient-to-br from-[#0D0D0D] via-[#0D0D0D] to-[#00C775]/5 backdrop-blur-xl border border-[#00C775]/20 rounded-3xl p-12 text-center">
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
                Ready to Start Flipping?
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Browse launch-phase properties with high appreciation potential
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/explore" className="bg-gradient-to-r from-[#00C775] to-[#00A85D] px-8 py-4 rounded-full font-bold text-white shadow-[0_0_30px_rgba(0,199,117,0.4)] hover:shadow-[0_0_50px_rgba(0,199,117,0.6)] transition-all hover:-translate-y-1">
                  Browse Properties
                </Link>
                <Link href="/investment/roi-calculator" className="bg-gradient-to-r from-[#F3C440] to-[#D4A936] px-8 py-4 rounded-full font-bold text-black shadow-[0_0_30px_rgba(243,196,64,0.4)] hover:shadow-[0_0_50px_rgba(243,196,64,0.6)] transition-all hover:-translate-y-1">
                  Calculate ROI
                </Link>
                <Link href="/investment/rental-strategy" className="bg-[#0D0D0D] border-2 border-[#00C775] px-8 py-4 rounded-full font-bold text-white hover:bg-[#00C775]/10 transition-all hover:-translate-y-1">
                  Rental Strategy
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
