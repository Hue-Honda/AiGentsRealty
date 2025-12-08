'use client';

import { DollarSign, Sparkles, ArrowRight, Home, TrendingUp, Users, MapPin, CheckCircle, Calculator, Shield } from 'lucide-react';
import Link from 'next/link';

export default function RentalStrategyPage() {
  const benefits = [
    {
      icon: DollarSign,
      title: 'Passive Income Stream',
      description: 'Generate monthly rental income while property appreciates',
      stat: '7-12% Annual Yield'
    },
    {
      icon: TrendingUp,
      title: 'Capital Appreciation',
      description: 'Benefit from long-term property value growth',
      stat: '5-8% Annual Growth'
    },
    {
      icon: Shield,
      title: 'Asset Protection',
      description: 'Real estate as hedge against inflation',
      stat: 'Stable Investment'
    },
    {
      icon: Users,
      title: 'Strong Demand',
      description: 'Dubai\'s growing expat population drives rental demand',
      stat: '200+ Nationalities'
    }
  ];

  const topAreas = [
    {
      area: 'Dubai Marina',
      avgYield: '8.5%',
      avgRent: '95,000',
      propertyType: 'Apartments',
      demand: 'Very High',
      color: 'emerald'
    },
    {
      area: 'Downtown Dubai',
      avgYield: '7.2%',
      avgRent: '120,000',
      propertyType: 'Apartments',
      demand: 'High',
      color: 'gold'
    },
    {
      area: 'Dubai Hills Estate',
      avgYield: '9.1%',
      avgRent: '110,000',
      propertyType: 'Villas & Apartments',
      demand: 'Very High',
      color: 'emerald'
    },
    {
      area: 'Business Bay',
      avgYield: '8.8%',
      avgRent: '85,000',
      propertyType: 'Apartments',
      demand: 'High',
      color: 'gold'
    },
    {
      area: 'JLT',
      avgYield: '9.5%',
      avgRent: '80,000',
      propertyType: 'Apartments',
      demand: 'Very High',
      color: 'emerald'
    },
    {
      area: 'Arabian Ranches',
      avgYield: '7.8%',
      avgRent: '140,000',
      propertyType: 'Villas',
      demand: 'High',
      color: 'gold'
    }
  ];

  const calculations = [
    {
      title: 'Gross Rental Yield',
      formula: '(Annual Rent / Property Price) × 100',
      example: '(100,000 / 1,250,000) × 100 = 8%'
    },
    {
      title: 'Net Rental Yield',
      formula: '((Annual Rent - Annual Costs) / Property Price) × 100',
      example: '((100,000 - 15,000) / 1,250,000) × 100 = 6.8%'
    },
    {
      title: 'Cash-on-Cash Return',
      formula: '(Annual Cash Flow / Total Cash Invested) × 100',
      example: '(85,000 / 250,000) × 100 = 34%'
    }
  ];

  const costs = [
    { item: 'Service Charges', percentage: '2-4%', annual: '25,000 - 50,000' },
    { item: 'Property Management', percentage: '5-8%', annual: '5,000 - 8,000' },
    { item: 'Maintenance Reserve', percentage: '1-2%', annual: '12,500 - 25,000' },
    { item: 'DEWA & Utilities', percentage: 'Varies', annual: '5,000 - 15,000' },
    { item: 'Insurance', percentage: '0.5-1%', annual: '6,250 - 12,500' },
    { item: 'Vacancy Allowance', percentage: '5-10%', annual: '5,000 - 10,000' }
  ];

  const steps = [
    {
      step: '01',
      title: 'Property Selection',
      description: 'Choose property in high-demand area with strong rental potential',
      tips: ['Prime location', 'Good amenities', 'Near metro/schools', 'Quality developer']
    },
    {
      step: '02',
      title: 'Purchase & Setup',
      description: 'Complete purchase and prepare property for rental market',
      tips: ['Quality furnishing', 'DEWA registration', 'Ejari setup', 'Property insurance']
    },
    {
      step: '03',
      title: 'Tenant Acquisition',
      description: 'Find reliable tenants through agents or direct marketing',
      tips: ['Professional photos', 'Market pricing', 'Tenant screening', 'Clear contracts']
    },
    {
      step: '04',
      title: 'Property Management',
      description: 'Maintain property and ensure smooth tenant experience',
      tips: ['Regular maintenance', 'Quick responses', 'Annual renewals', 'Record keeping']
    }
  ];

  const tips = [
    'Buy in areas with planned infrastructure improvements',
    'Consider furnishing for higher rental income',
    'Build relationship with property management companies',
    'Screen tenants carefully - reliable tenants worth more than high rent',
    'Keep property well-maintained to minimize vacancy',
    'Understand RERA regulations and tenant rights',
    'Factor in 2-3 months vacancy per year in calculations',
    'Reinvest rental income for compound growth'
  ];

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] relative overflow-hidden">
      {/* SUBTLE LIGHT GRADIENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-emerald-50/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-amber-50/40 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-emerald-50/20 via-transparent to-amber-50/20"></div>
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

            <div className="inline-flex items-center gap-2 bg-amber-50 border border-[#D4AF37]/30 rounded-full px-5 py-1.5 mb-4">
              <Home className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-xs font-bold text-[#D4AF37] tracking-wide">BUY-TO-LET STRATEGY</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-[#0A0A0A] mb-6 leading-[1.05] tracking-tight">
              Rental Income
              <br />
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4C542] to-[#D4AF37] bg-clip-text text-transparent">
                Strategy
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl">
              Build passive income and long-term wealth through Dubai's thriving rental market
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-6">
                <div className="text-4xl font-black text-[#10B981] mb-2">7-12%</div>
                <p className="text-gray-600">Rental Yield</p>
              </div>
              <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-6">
                <div className="text-4xl font-black text-[#D4AF37] mb-2">95%+</div>
                <p className="text-gray-600">Occupancy Rate</p>
              </div>
              <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-6">
                <div className="text-4xl font-black text-[#10B981] mb-2">Monthly</div>
                <p className="text-gray-600">Cash Flow</p>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS SECTION */}
        <section className="px-6 lg:px-16 pb-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-8 h-8 text-[#10B981]" />
              <h2 className="text-4xl font-black text-[#0A0A0A]">Key Benefits</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 hover:border-[#10B981]/60 shadow-md hover:shadow-lg rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-[#10B981]" />
                    </div>

                    <div className="text-2xl font-black text-[#10B981] mb-3">
                      {benefit.stat}
                    </div>

                    <h3 className="text-xl font-black text-[#0A0A0A] mb-3">
                      {benefit.title}
                    </h3>

                    <p className="text-sm text-gray-600">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* TOP RENTAL AREAS SECTION */}
        <section className="px-6 lg:px-16 pb-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <MapPin className="w-8 h-8 text-[#D4AF37]" />
              <h2 className="text-4xl font-black text-[#0A0A0A]">Best Areas for Rental Yields</h2>
            </div>

            <div className="bg-white border border-gray-200 shadow-md rounded-3xl p-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 text-gray-600 font-bold">Area</th>
                      <th className="text-left py-4 px-4 text-gray-600 font-bold">Avg Yield</th>
                      <th className="text-left py-4 px-4 text-gray-600 font-bold">Avg Rent (AED)</th>
                      <th className="text-left py-4 px-4 text-gray-600 font-bold">Property Type</th>
                      <th className="text-left py-4 px-4 text-gray-600 font-bold">Demand</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topAreas.map((area, index) => {
                      const isEmerald = area.color === 'emerald';

                      return (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-4 font-bold text-[#0A0A0A]">{area.area}</td>
                          <td className={`py-4 px-4 font-black text-2xl ${
                            isEmerald ? 'text-[#10B981]' : 'text-[#D4AF37]'
                          }`}>
                            {area.avgYield}
                          </td>
                          <td className="py-4 px-4 text-gray-700">{area.avgRent}</td>
                          <td className="py-4 px-4 text-gray-600">{area.propertyType}</td>
                          <td className="py-4 px-4">
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                              area.demand === 'Very High'
                                ? 'bg-emerald-50 text-[#10B981]'
                                : 'bg-amber-50 text-[#D4AF37]'
                            }`}>
                              {area.demand}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* YIELD CALCULATIONS SECTION */}
        <section className="px-6 lg:px-16 pb-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Calculator className="w-8 h-8 text-[#10B981]" />
              <h2 className="text-4xl font-black text-[#0A0A0A]">Understanding Rental Yield</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {calculations.map((calc, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 shadow-md rounded-3xl p-8"
                >
                  <h3 className="text-2xl font-black text-[#0A0A0A] mb-4">{calc.title}</h3>

                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
                    <p className="text-sm font-mono text-[#10B981]">{calc.formula}</p>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                    <p className="text-xs font-bold text-gray-600 mb-1">Example:</p>
                    <p className="text-sm font-mono text-[#0A0A0A]">{calc.example}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COSTS SECTION */}
        <section className="px-6 lg:px-16 pb-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <DollarSign className="w-8 h-8 text-[#D4AF37]" />
              <h2 className="text-4xl font-black text-[#0A0A0A]">Annual Ownership Costs</h2>
            </div>

            <div className="bg-white border border-gray-200 shadow-md rounded-3xl p-8">
              <div className="space-y-4">
                {costs.map((cost, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row md:items-center md:justify-between p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="mb-2 md:mb-0">
                      <h4 className="font-bold text-[#0A0A0A]">{cost.item}</h4>
                      <p className="text-sm text-gray-600">of property value/rent</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-lg font-bold text-[#D4AF37]">{cost.percentage}</span>
                      <span className="text-gray-600 text-sm">AED {cost.annual}</span>
                    </div>
                  </div>
                ))}

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-xl">
                    <span className="font-black text-[#0A0A0A] text-lg">Estimated Total Annual Costs</span>
                    <span className="text-2xl font-black text-[#D4AF37]">AED 60,000 - 120,000</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-3 text-center">
                    Based on AED 1.25M property with AED 100K annual rent
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STEPS SECTION */}
        <section className="px-6 lg:px-16 pb-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <CheckCircle className="w-8 h-8 text-[#10B981]" />
              <h2 className="text-4xl font-black text-[#0A0A0A]">Getting Started</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 hover:border-[#10B981]/60 shadow-md hover:shadow-lg rounded-3xl p-6 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-50 to-amber-50 flex items-center justify-center mb-4">
                    <span className="text-2xl font-black bg-gradient-to-r from-[#10B981] to-[#D4AF37] bg-clip-text text-transparent">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-[#0A0A0A] mb-3">{step.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{step.description}</p>

                  <ul className="space-y-2">
                    {step.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-center gap-2 text-xs text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRO TIPS SECTION */}
        <section className="px-6 lg:px-16 pb-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="bg-gradient-to-br from-emerald-50 via-white to-amber-50 border border-gray-200 shadow-md rounded-3xl p-12">
              <div className="flex items-center gap-3 mb-8">
                <TrendingUp className="w-8 h-8 text-[#10B981]" />
                <h2 className="text-4xl font-black text-[#0A0A0A]">Pro Tips for Landlords</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="px-6 lg:px-16 pb-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="bg-gradient-to-br from-emerald-50 via-white to-amber-50 border border-gray-200 shadow-md rounded-3xl p-12 text-center">
              <h2 className="text-4xl lg:text-5xl font-black text-[#0A0A0A] mb-4">
                Start Building Rental Income
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Browse high-yield properties perfect for buy-to-let investors
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/projects" className="bg-gradient-to-r from-[#10B981] to-[#059669] px-8 py-4 rounded-full font-bold text-white shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                  Browse Properties
                </Link>
                <Link href="/investment/roi-calculator" className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] px-8 py-4 rounded-full font-bold text-white shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                  Calculate Returns
                </Link>
                <Link href="/investment/flip-strategy" className="bg-white border-2 border-[#10B981] px-8 py-4 rounded-full font-bold text-[#0A0A0A] hover:bg-emerald-50 transition-all hover:-translate-y-1">
                  Flip Strategy
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
