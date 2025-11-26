'use client';

import { Sparkles, TrendingUp, TrendingDown, Target, Lightbulb, DollarSign, Percent, BarChart3, ArrowRight, Clock, MapPin, Calendar, Award, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function InvestmentPage() {
  const hotOpportunities = [
    {
      id: 1,
      title: 'Azure Residences - Dubai Hills Estate',
      developer: 'Emaar Properties',
      location: 'Dubai Hills Estate',
      priceFrom: 'AED 1.2M',
      roi: '14.5%',
      completion: 'Q4 2025',
      paymentPlan: '80/20',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200',
      aiScore: 95,
      highlights: ['Prime location', 'Golf course views', 'Strong developer', 'High demand area']
    },
    {
      id: 2,
      title: 'Marina Heights Tower',
      developer: 'Select Group',
      location: 'Dubai Marina',
      priceFrom: 'AED 1.8M',
      roi: '13.2%',
      completion: 'Q2 2026',
      paymentPlan: '70/30',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200',
      aiScore: 92,
      highlights: ['Waterfront living', 'Rental yield 7.5%', 'Metro accessible', 'Beach proximity']
    },
    {
      id: 3,
      title: 'Creek Vistas Grand',
      developer: 'Emaar Properties',
      location: 'Dubai Creek Harbour',
      priceFrom: 'AED 950K',
      roi: '15.8%',
      completion: 'Q1 2026',
      paymentPlan: '80/20',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
      aiScore: 97,
      highlights: ['Below market price', 'Future district', 'Island location', 'High appreciation']
    },
    {
      id: 4,
      title: 'Business Bay Executive',
      developer: 'DAMAC Properties',
      location: 'Business Bay',
      priceFrom: 'AED 1.5M',
      roi: '12.8%',
      completion: 'Q3 2025',
      paymentPlan: '60/40',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200',
      aiScore: 90,
      highlights: ['Central location', 'Business district', 'Canal views', 'Corporate demand']
    },
    {
      id: 5,
      title: 'Palm Gateway Residences',
      developer: 'Nakheel',
      location: 'Palm Jumeirah',
      priceFrom: 'AED 2.8M',
      roi: '11.5%',
      completion: 'Q4 2026',
      paymentPlan: '70/30',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200',
      aiScore: 94,
      highlights: ['Iconic location', 'Beach access', 'Luxury amenities', 'Limited supply']
    },
    {
      id: 6,
      title: 'Expo City Living',
      developer: 'Dubai South',
      location: 'Dubai South',
      priceFrom: 'AED 720K',
      roi: '16.2%',
      completion: 'Q2 2025',
      paymentPlan: '90/10',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
      aiScore: 88,
      highlights: ['Affordable entry', 'Airport proximity', 'Growth zone', 'Smart city design']
    }
  ];

  const marketPredictions = [
    {
      category: 'Price Growth',
      prediction: '+12-15%',
      timeframe: '2025',
      confidence: 'High',
      trend: 'up'
    },
    {
      category: 'Off-Plan Demand',
      prediction: '+25%',
      timeframe: 'Q1 2025',
      confidence: 'Very High',
      trend: 'up'
    },
    {
      category: 'Luxury Segment',
      prediction: '+18%',
      timeframe: '2025',
      confidence: 'High',
      trend: 'up'
    },
    {
      category: 'Transaction Volume',
      prediction: '+20%',
      timeframe: '2025',
      confidence: 'Medium-High',
      trend: 'up'
    }
  ];

  const strategies = [
    {
      title: 'Off-Plan Entry Strategy',
      description: 'Target high-ROI projects with flexible payment plans in emerging areas',
      bestFor: 'First-time investors',
      timeline: '2-3 years',
      expectedROI: '12-15%',
      icon: <Target className="w-8 h-8" />
    },
    {
      title: 'Portfolio Diversification',
      description: 'Mix of luxury waterfront and affordable suburban properties',
      bestFor: 'Experienced investors',
      timeline: '3-5 years',
      expectedROI: '15-20%',
      icon: <BarChart3 className="w-8 h-8" />
    },
    {
      title: 'Rental Yield Focus',
      description: 'Buy completed units in high-demand areas for immediate rental income',
      bestFor: 'Income seekers',
      timeline: '1-2 years',
      expectedROI: '7-9% yearly',
      icon: <Percent className="w-8 h-8" />
    },
    {
      title: 'Flip & Resale',
      description: 'Purchase off-plan at launch, sell before completion for capital gains',
      bestFor: 'Active traders',
      timeline: '1-2 years',
      expectedROI: '18-25%',
      icon: <TrendingUp className="w-8 h-8" />
    }
  ];

  const roiComparison = [
    { area: 'Dubai Creek Harbour', roi: '15.8%', appreciation: '+22%', yield: '6.5%' },
    { area: 'Business Bay', roi: '14.2%', appreciation: '+18%', yield: '7.8%' },
    { area: 'Dubai Marina', roi: '13.5%', appreciation: '+15%', yield: '7.2%' },
    { area: 'Dubai Hills Estate', roi: '14.5%', appreciation: '+19%', yield: '6.8%' },
    { area: 'Downtown Dubai', roi: '12.8%', appreciation: '+14%', yield: '6.2%' }
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
          <div className="max-w-[1600px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#00C775]/10 border border-[#00C775]/30 rounded-full px-6 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-[#00C775]" />
              <span className="text-sm font-bold text-[#00C775]">AI-POWERED ANALYSIS</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-white mb-6 leading-[1.05] tracking-tight">
              Investment
              <br />
              <span className="bg-gradient-to-r from-[#F3C440] via-[#FFD700] to-[#F3C440] bg-clip-text text-transparent">
                Insights
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Data-driven recommendations and strategies for maximizing your Dubai real estate returns
            </p>
          </div>
        </section>

        {/* HOT OPPORTUNITIES */}
        <section className="px-6 lg:px-16 pb-16">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#F3C440]/10 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#F3C440]" />
                </div>
                <h2 className="text-4xl lg:text-5xl font-black text-white">
                  Hot <span className="text-[#00C775]">Opportunities</span>
                </h2>
              </div>
              <span className="text-sm text-gray-400 font-semibold">AI-Curated Selection</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotOpportunities.map((opportunity) => (
                <div
                  key={opportunity.id}
                  className="group relative block overflow-hidden rounded-3xl border border-white/10 hover:border-[#00C775]/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,199,117,0.3)]"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={opportunity.image}
                      alt={opportunity.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

                    {/* AI Score Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <div className="bg-[#F3C440] text-black px-3 py-2 rounded-xl text-center">
                        <div className="text-xl font-black">{opportunity.aiScore}</div>
                        <div className="text-xs font-bold">AI Score</div>
                      </div>
                    </div>

                    {/* ROI Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <div className="bg-[#00C775]/20 backdrop-blur-xl border border-[#00C775]/50 rounded-lg px-3 py-2 flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 text-[#00C775]" />
                        <span className="text-sm font-bold text-white">{opportunity.roi} ROI</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="bg-[#0D0D0D]/80 backdrop-blur-xl p-6">
                    <h3 className="text-xl font-black text-white mb-2 leading-tight group-hover:text-[#00C775] transition-colors line-clamp-2">
                      {opportunity.title}
                    </h3>

                    <div className="flex items-center gap-2 mb-3 text-sm text-gray-400">
                      <MapPin className="w-3.5 h-3.5 text-[#F3C440]" />
                      <span>{opportunity.location}</span>
                    </div>

                    {/* Highlights */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {opportunity.highlights.slice(0, 4).map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-gray-500">
                          <div className="w-1 h-1 bg-[#00C775] rounded-full"></div>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Details */}
                    <div className="flex items-center gap-3 mb-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {opportunity.completion}
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {opportunity.paymentPlan}
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">From</p>
                        <p className="text-2xl font-black text-[#00C775]">{opportunity.priceFrom}</p>
                      </div>
                      <div className="flex items-center gap-2 text-[#F3C440] font-bold text-sm group-hover:gap-3 transition-all">
                        <span>Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MARKET PREDICTIONS */}
        <section className="px-6 lg:px-16 pb-16">
          <div className="max-w-[1600px] mx-auto">
            <div className="bg-gradient-to-br from-[#0D0D0D] via-[#0D0D0D] to-[#00C775]/5 backdrop-blur-xl border border-[#00C775]/20 rounded-3xl p-10">
              <div className="flex items-center gap-3 mb-8">
                <TrendingUp className="w-8 h-8 text-[#00C775]" />
                <h2 className="text-3xl font-black text-white">Market Predictions</h2>
                <span className="text-sm text-gray-400 ml-auto">AI-Powered Forecast</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {marketPredictions.map((prediction, index) => (
                  <div
                    key={index}
                    className="bg-[#0D0D0D]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-[#00C775]/60 transition-all hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-[#00C775]" />
                      <span className="text-xs font-bold text-[#00C775] uppercase">{prediction.confidence}</span>
                    </div>
                    <div className="text-4xl font-black text-white mb-2">{prediction.prediction}</div>
                    <div className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-1">{prediction.category}</div>
                    <div className="text-xs text-gray-500">{prediction.timeframe}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* INVESTMENT STRATEGIES */}
        <section className="px-6 lg:px-16 pb-16">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Lightbulb className="w-8 h-8 text-[#F3C440]" />
              <h2 className="text-4xl lg:text-5xl font-black text-white">
                Investment <span className="text-[#F3C440]">Strategies</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {strategies.map((strategy, index) => (
                <div
                  key={index}
                  className="group bg-[#0D0D0D]/80 backdrop-blur-xl border border-white/10 hover:border-[#F3C440]/60 rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(243,196,64,0.3)]"
                >
                  <div className="w-16 h-16 bg-[#F3C440]/10 rounded-2xl flex items-center justify-center text-[#F3C440] mb-6 group-hover:scale-110 transition-transform">
                    {strategy.icon}
                  </div>

                  <h3 className="text-2xl font-black text-white mb-3 group-hover:text-[#F3C440] transition-colors">
                    {strategy.title}
                  </h3>

                  <p className="text-gray-400 mb-6 leading-relaxed">{strategy.description}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Best For</div>
                      <div className="text-sm font-bold text-white">{strategy.bestFor}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Timeline</div>
                      <div className="text-sm font-bold text-white">{strategy.timeline}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Expected ROI</div>
                      <div className="text-xl font-black text-[#00C775]">{strategy.expectedROI}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ROI COMPARISON TABLE */}
        <section className="px-6 lg:px-16 pb-20">
          <div className="max-w-[1600px] mx-auto">
            <div className="bg-gradient-to-br from-[#0D0D0D] via-[#0D0D0D] to-[#F3C440]/5 backdrop-blur-xl border border-[#F3C440]/20 rounded-3xl p-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black text-white">
                  ROI <span className="text-[#F3C440]">Comparison</span>
                </h2>
                <span className="text-sm text-gray-400">Top 5 Areas</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-4 px-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Area</th>
                      <th className="text-center py-4 px-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Total ROI</th>
                      <th className="text-center py-4 px-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Appreciation</th>
                      <th className="text-center py-4 px-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Rental Yield</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roiComparison.map((item, index) => (
                      <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-4 font-bold text-white">{item.area}</td>
                        <td className="py-4 px-4 text-center">
                          <span className="text-2xl font-black text-[#00C775]">{item.roi}</span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="text-lg font-bold text-[#F3C440]">{item.appreciation}</span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="text-lg font-bold text-white">{item.yield}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
