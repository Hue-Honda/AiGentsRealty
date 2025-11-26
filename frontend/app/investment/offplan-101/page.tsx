'use client';

import { BookOpen, Sparkles, TrendingUp, Shield, Clock, DollarSign, CheckCircle, AlertTriangle, Building2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function OffPlan101Page() {
  const benefits = [
    {
      icon: DollarSign,
      title: 'Lower Entry Price',
      description: 'Off-plan properties are typically 20-30% cheaper than ready properties'
    },
    {
      icon: TrendingUp,
      title: 'Capital Appreciation',
      description: 'Property value increases during construction, offering immediate returns'
    },
    {
      icon: Clock,
      title: 'Flexible Payment Plans',
      description: 'Pay in installments during construction instead of lump sum upfront'
    },
    {
      icon: Building2,
      title: 'Brand New Property',
      description: 'Get a completely new property with modern amenities and warranty'
    }
  ];

  const risks = [
    {
      icon: AlertTriangle,
      title: 'Construction Delays',
      description: 'Projects may face delays affecting handover timeline',
      mitigation: 'Choose reputable developers with proven track record'
    },
    {
      icon: AlertTriangle,
      title: 'Market Fluctuations',
      description: 'Property values can change during construction period',
      mitigation: 'Research market trends and choose prime locations'
    },
    {
      icon: AlertTriangle,
      title: 'Developer Risk',
      description: 'Potential issues with developer financial stability',
      mitigation: 'Verify developer credentials and check escrow accounts'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Research & Selection',
      description: 'Research locations, developers, and projects that match your investment goals',
      duration: '1-2 weeks'
    },
    {
      step: '02',
      title: 'Reserve & Book',
      description: 'Pay reservation fee (typically 5-10%) to secure your unit',
      duration: '1-3 days'
    },
    {
      step: '03',
      title: 'Sign SPA',
      description: 'Sign Sales and Purchase Agreement with developer',
      duration: '1 week'
    },
    {
      step: '04',
      title: 'Payment Plan',
      description: 'Follow payment schedule linked to construction milestones',
      duration: '1-3 years'
    },
    {
      step: '05',
      title: 'Construction',
      description: 'Monitor project progress and make scheduled payments',
      duration: '1-3 years'
    },
    {
      step: '06',
      title: 'Handover',
      description: 'Final payment and receive keys to your property',
      duration: '1 day'
    }
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
              <BookOpen className="w-4 h-4 text-[#00C775]" />
              <span className="text-sm font-bold text-[#00C775]">BEGINNER'S GUIDE</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-white mb-6 leading-[1.05] tracking-tight">
              Off-Plan Investment
              <br />
              <span className="bg-gradient-to-r from-[#F3C440] via-[#FFD700] to-[#F3C440] bg-clip-text text-transparent">
                101
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-3xl">
              Your complete guide to understanding and investing in Dubai's off-plan property market
            </p>
          </div>
        </section>

        {/* WHAT IS OFF-PLAN SECTION */}
        <section className="px-6 lg:px-16 pb-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="bg-[#0D0D0D]/80 backdrop-blur-xl border border-[#00C775]/20 rounded-3xl p-12">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-8 h-8 text-[#00C775]" />
                <h2 className="text-4xl font-black text-white">What is Off-Plan Property?</h2>
              </div>

              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Off-plan properties are real estate units that are purchased before they are built or while they are still under construction. In Dubai, this investment model has become extremely popular due to attractive payment plans, lower prices, and high potential returns.
              </p>

              <p className="text-lg text-gray-300 leading-relaxed">
                Unlike ready properties where you pay the full amount upfront, off-plan investments allow you to pay in installments tied to construction milestones. This makes it accessible for investors with varying budgets and provides the opportunity to benefit from property appreciation during the construction period.
              </p>
            </div>
          </div>
        </section>

        {/* BENEFITS SECTION */}
        <section className="px-6 lg:px-16 pb-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="w-8 h-8 text-[#00C775]" />
              <h2 className="text-4xl font-black text-white">Key Benefits</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="bg-[#0D0D0D]/80 backdrop-blur-xl border border-[#00C775]/20 hover:border-[#00C775]/60 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#00C775]/20 flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-[#00C775]" />
                    </div>

                    <h3 className="text-2xl font-black text-white mb-3">
                      {benefit.title}
                    </h3>

                    <p className="text-gray-400">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* RISKS & MITIGATION SECTION */}
        <section className="px-6 lg:px-16 pb-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Shield className="w-8 h-8 text-[#F3C440]" />
              <h2 className="text-4xl font-black text-white">Risks & How to Mitigate Them</h2>
            </div>

            <div className="space-y-6">
              {risks.map((risk, index) => {
                const Icon = risk.icon;
                return (
                  <div
                    key={index}
                    className="bg-[#0D0D0D]/80 backdrop-blur-xl border border-[#F3C440]/20 hover:border-[#F3C440]/60 rounded-3xl p-8 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-2xl bg-[#F3C440]/20 flex items-center justify-center">
                          <Icon className="w-7 h-7 text-[#F3C440]" />
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-2xl font-black text-white mb-3">
                          {risk.title}
                        </h3>

                        <p className="text-gray-400 mb-4">
                          {risk.description}
                        </p>

                        <div className="flex items-start gap-3 bg-[#00C775]/10 border border-[#00C775]/30 rounded-xl p-4">
                          <CheckCircle className="w-5 h-5 text-[#00C775] flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-bold text-[#00C775] mb-1">Mitigation Strategy</p>
                            <p className="text-sm text-gray-300">{risk.mitigation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* PROCESS TIMELINE SECTION */}
        <section className="px-6 lg:px-16 pb-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Clock className="w-8 h-8 text-[#00C775]" />
              <h2 className="text-4xl font-black text-white">The Off-Plan Investment Process</h2>
            </div>

            <div className="space-y-6">
              {process.map((item, index) => (
                <div
                  key={index}
                  className="group relative bg-[#0D0D0D]/80 backdrop-blur-xl border border-white/10 hover:border-[#00C775]/60 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00C775]/20 to-[#F3C440]/20 border border-[#00C775]/30 flex items-center justify-center">
                        <span className="text-3xl font-black bg-gradient-to-r from-[#00C775] to-[#F3C440] bg-clip-text text-transparent">
                          {item.step}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                        <h3 className="text-2xl font-black text-white group-hover:text-[#00C775] transition-colors">
                          {item.title}
                        </h3>
                        <div className="inline-flex items-center gap-2 bg-[#F3C440]/10 border border-[#F3C440]/30 rounded-full px-4 py-1.5 mt-2 md:mt-0">
                          <Clock className="w-4 h-4 text-[#F3C440]" />
                          <span className="text-sm font-bold text-[#F3C440]">{item.duration}</span>
                        </div>
                      </div>

                      <p className="text-gray-400 text-lg">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="px-6 lg:px-16 pb-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="bg-gradient-to-br from-[#0D0D0D] via-[#0D0D0D] to-[#00C775]/5 backdrop-blur-xl border border-[#00C775]/20 rounded-3xl p-12 text-center">
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
                Ready to Invest?
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Use our AI-powered tools to calculate returns and find the perfect off-plan investment
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/investment/roi-calculator" className="bg-gradient-to-r from-[#00C775] to-[#00A85D] px-8 py-4 rounded-full font-bold text-white shadow-[0_0_30px_rgba(0,199,117,0.4)] hover:shadow-[0_0_50px_rgba(0,199,117,0.6)] transition-all hover:-translate-y-1">
                  ROI Calculator
                </Link>
                <Link href="/investment/first-time" className="bg-gradient-to-r from-[#F3C440] to-[#D4A936] px-8 py-4 rounded-full font-bold text-black shadow-[0_0_30px_rgba(243,196,64,0.4)] hover:shadow-[0_0_50px_rgba(243,196,64,0.6)] transition-all hover:-translate-y-1">
                  First-Time Guide
                </Link>
                <Link href="/explore" className="bg-[#0D0D0D] border-2 border-[#00C775] px-8 py-4 rounded-full font-bold text-white hover:bg-[#00C775]/10 transition-all hover:-translate-y-1">
                  Browse Properties
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
