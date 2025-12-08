'use client';

import { BookOpen, Calculator, TrendingUp, Sparkles, ArrowRight, GraduationCap, DollarSign, LineChart } from 'lucide-react';
import Link from 'next/link';

export default function InvestmentPage() {
  const guides = [
    {
      icon: BookOpen,
      title: 'Off-Plan Investment 101',
      description: 'Complete beginner\'s guide to off-plan property investment in Dubai',
      href: '/investment/offplan-101',
      color: 'emerald'
    },
    {
      icon: GraduationCap,
      title: 'Why Invest in Dubai?',
      description: 'Discover the unique advantages of Dubai\'s off-plan market',
      href: '/investment/why-dubai',
      color: 'gold'
    },
    {
      icon: Sparkles,
      title: 'First-Time Buyer\'s Guide',
      description: 'Step-by-step process for your first off-plan purchase',
      href: '/investment/first-time',
      color: 'emerald'
    }
  ];

  const calculators = [
    {
      icon: Calculator,
      title: 'ROI Calculator',
      description: 'Calculate potential returns on your off-plan investment',
      href: '/investment/roi-calculator',
      color: 'gold'
    },
    {
      icon: DollarSign,
      title: 'Payment Simulator',
      description: 'Visualize payment plans and milestone schedules',
      href: '/investment/payment-simulator',
      color: 'emerald'
    },
    {
      icon: LineChart,
      title: 'Budget Calculator',
      description: 'Determine your maximum affordable property price',
      href: '/investment/budget-calculator',
      color: 'gold'
    }
  ];

  const strategies = [
    {
      icon: TrendingUp,
      title: 'Property Flipping',
      description: 'Profit from pre-construction appreciation',
      href: '/investment/flip-strategy',
      roi: '18-25%',
      color: 'emerald'
    },
    {
      icon: DollarSign,
      title: 'Rental Income',
      description: 'Build passive income with buy-to-let',
      href: '/investment/rental-strategy',
      roi: '7-12%',
      color: 'gold'
    },
    {
      icon: LineChart,
      title: 'Long-Term Appreciation',
      description: 'Hold for capital growth over time',
      href: '/investment/appreciation',
      roi: '10-15%',
      color: 'emerald'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] relative overflow-hidden">
      {/* SUBTLE LIGHT GRADIENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-emerald-50/40 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-amber-50/40 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-emerald-50/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-16 px-6 lg:px-16">
          <div className="max-w-[1600px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-6 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm font-bold text-[#10B981]">AI-POWERED INVESTMENT EDUCATION</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-[#0A0A0A] mb-6 leading-[1.05] tracking-tight">
              Master Off-Plan
              <br />
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] bg-clip-text text-transparent">
                Investment in Dubai
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              AI-powered insights and tools to maximize your returns in Dubai's thriving off-plan property market
            </p>
          </div>
        </section>

        {/* GETTING STARTED SECTION */}
        <section className="px-6 lg:px-16 pb-12">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="w-8 h-8 text-[#10B981]" />
              <h2 className="text-4xl font-black text-[#0A0A0A]">Getting Started</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {guides.map((guide, index) => {
                const Icon = guide.icon;
                const isEmerald = guide.color === 'emerald';

                return (
                  <Link
                    key={index}
                    href={guide.href}
                    className="group relative bg-white border border-gray-200 shadow-md hover:border-emerald-300 rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-lg"
                  >
                    <div className={`w-16 h-16 rounded-2xl ${isEmerald ? 'bg-emerald-50' : 'bg-amber-50'} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-8 h-8 ${isEmerald ? 'text-[#10B981]' : 'text-[#D4AF37]'}`} />
                    </div>

                    <h3 className="text-2xl font-black text-[#0A0A0A] mb-3 group-hover:text-[#10B981] transition-colors">
                      {guide.title}
                    </h3>

                    <p className="text-gray-600 mb-6">
                      {guide.description}
                    </p>

                    <div className="flex items-center gap-2 text-[#10B981] font-bold group-hover:gap-3 transition-all">
                      <span>Learn More</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* TOOLS & CALCULATORS SECTION */}
        <section className="px-6 lg:px-16 pb-12">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Calculator className="w-8 h-8 text-[#D4AF37]" />
              <h2 className="text-4xl font-black text-[#0A0A0A]">Tools &amp; Calculators</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {calculators.map((calc, index) => {
                const Icon = calc.icon;
                const isGold = calc.color === 'gold';

                return (
                  <Link
                    key={index}
                    href={calc.href}
                    className="group relative bg-white border border-gray-200 shadow-md hover:border-amber-300 rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-lg"
                  >
                    <div className={`w-16 h-16 rounded-2xl ${isGold ? 'bg-amber-50' : 'bg-emerald-50'} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-8 h-8 ${isGold ? 'text-[#D4AF37]' : 'text-[#10B981]'}`} />
                    </div>

                    <h3 className="text-2xl font-black text-[#0A0A0A] mb-3 group-hover:text-[#D4AF37] transition-colors">
                      {calc.title}
                    </h3>

                    <p className="text-gray-600 mb-6">
                      {calc.description}
                    </p>

                    <div className="flex items-center gap-2 text-[#D4AF37] font-bold group-hover:gap-3 transition-all">
                      <span>Calculate Now</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* INVESTMENT STRATEGIES SECTION */}
        <section className="px-6 lg:px-16 pb-20">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="w-8 h-8 text-[#10B981]" />
              <h2 className="text-4xl font-black text-[#0A0A0A]">Investment Strategies</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {strategies.map((strategy, index) => {
                const Icon = strategy.icon;
                const isEmerald = strategy.color === 'emerald';

                return (
                  <Link
                    key={index}
                    href={strategy.href}
                    className="group relative bg-white border border-gray-200 shadow-md hover:border-emerald-300 rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-lg"
                  >
                    {/* ROI Badge */}
                    <div className="absolute top-6 right-6">
                      <div className="bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2">
                        <span className="text-sm font-black text-[#10B981]">{strategy.roi} ROI</span>
                      </div>
                    </div>

                    <div className={`w-16 h-16 rounded-2xl ${isEmerald ? 'bg-emerald-50' : 'bg-amber-50'} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-8 h-8 ${isEmerald ? 'text-[#10B981]' : 'text-[#D4AF37]'}`} />
                    </div>

                    <h3 className="text-2xl font-black text-[#0A0A0A] mb-3 group-hover:text-[#10B981] transition-colors">
                      {strategy.title}
                    </h3>

                    <p className="text-gray-600 mb-6">
                      {strategy.description}
                    </p>

                    <div className="flex items-center gap-2 text-[#10B981] font-bold group-hover:gap-3 transition-all">
                      <span>Explore Strategy</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="px-6 lg:px-16 pb-20">
          <div className="max-w-[1600px] mx-auto">
            <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50 border border-emerald-200 rounded-3xl p-12 text-center shadow-md">
              <h2 className="text-4xl lg:text-5xl font-black text-[#0A0A0A] mb-4">
                Ready to Start Investing?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Explore our curated off-plan properties with AI-powered insights and guaranteed high returns
              </p>
              <Link href="/projects" className="inline-flex items-center gap-3 bg-gradient-to-r from-[#10B981] to-[#059669] px-10 py-5 rounded-full font-bold text-white text-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                <Sparkles className="w-6 h-6" />
                <span>Browse Properties</span>
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
