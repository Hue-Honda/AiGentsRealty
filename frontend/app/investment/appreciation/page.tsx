'use client';

import { LineChart, Sparkles, ArrowRight, TrendingUp, Target, Globe, Building2, CheckCircle, BarChart3, Zap } from 'lucide-react';
import Link from 'next/link';

export default function AppreciationPage() {
  const benefits = [
    {
      icon: TrendingUp,
      title: 'Compound Growth',
      description: 'Property value increases exponentially over time',
      stat: '5-8% Annual'
    },
    {
      icon: Globe,
      title: 'Market Evolution',
      description: 'Benefit from Dubai\'s transformation into global hub',
      stat: 'Vision 2030'
    },
    {
      icon: Building2,
      title: 'Infrastructure Growth',
      description: 'Major projects driving property values higher',
      stat: 'Metro Expansion'
    },
    {
      icon: Zap,
      title: 'Economic Momentum',
      description: 'Diversified economy attracting global investment',
      stat: 'Strong GDP'
    }
  ];

  const historicalData = [
    { year: '2015', value: 100, label: 'Baseline' },
    { year: '2016', value: 102, label: '+2%' },
    { year: '2017', value: 105, label: '+5%' },
    { year: '2018', value: 107, label: '+7%' },
    { year: '2019', value: 110, label: '+10%' },
    { year: '2020', value: 115, label: '+15%' },
    { year: '2021', value: 128, label: '+28%' },
    { year: '2022', value: 145, label: '+45%' },
    { year: '2023', value: 165, label: '+65%' },
    { year: '2024', value: 182, label: '+82%' }
  ];

  const projections = [
    {
      scenario: 'Conservative',
      year5: 135,
      year10: 165,
      annualRate: '6%',
      color: 'gold'
    },
    {
      scenario: 'Moderate',
      year5: 147,
      year10: 195,
      annualRate: '8%',
      color: 'emerald'
    },
    {
      scenario: 'Optimistic',
      year5: 161,
      year10: 232,
      annualRate: '10%',
      color: 'emerald'
    }
  ];

  const growthDrivers = [
    {
      title: 'Expo 2020 Legacy',
      description: 'Lasting infrastructure and global recognition from world expo',
      impact: 'High',
      timeline: 'Ongoing'
    },
    {
      title: 'Metro Expansion',
      description: 'New metro lines increasing connectivity across emirates',
      impact: 'Very High',
      timeline: '2025-2030'
    },
    {
      title: 'Economic Free Zones',
      description: 'Business-friendly zones attracting global companies',
      impact: 'High',
      timeline: 'Continuous'
    },
    {
      title: 'Tourism Growth',
      description: 'Target of 25M annual visitors driving hospitality demand',
      impact: 'Very High',
      timeline: '2025'
    },
    {
      title: 'Smart City Initiative',
      description: 'Technology integration making Dubai world\'s smartest city',
      impact: 'High',
      timeline: '2030'
    },
    {
      title: 'Green Building Standards',
      description: 'Sustainability requirements increasing premium property values',
      impact: 'Medium',
      timeline: 'Ongoing'
    }
  ];

  const locationFactors = [
    {
      factor: 'Proximity to Metro',
      impact: '+15-25%',
      description: 'Properties near metro stations command premium prices'
    },
    {
      factor: 'Master-Planned Communities',
      description: 'Integrated developments appreciate faster than standalone',
      impact: '+20-30%'
    },
    {
      factor: 'Waterfront Location',
      description: 'Sea or canal views significantly boost property values',
      impact: '+30-50%'
    },
    {
      factor: 'School District',
      description: 'Near top-rated schools increases family demand',
      impact: '+10-20%'
    },
    {
      factor: 'Business Hub Proximity',
      description: 'Close to DIFC, Business Bay, or Downtown',
      impact: '+15-25%'
    },
    {
      factor: 'Future Development',
      description: 'Upcoming infrastructure projects in area',
      impact: '+25-40%'
    }
  ];

  const tips = [
    'Buy in emerging areas before infrastructure completion',
    'Choose developers with history of quality delivery',
    'Prioritize freehold areas with full ownership rights',
    'Consider properties near planned metro extensions',
    'Invest in master communities with long-term vision',
    'Focus on unique features: views, amenities, design',
    'Monitor government initiatives and Vision 2030 projects',
    'Reinvest rental income to compound returns',
    'Hold through market cycles for maximum appreciation',
    'Stay informed about zoning and regulation changes'
  ];

  const exitStrategies = [
    {
      strategy: 'Long-Term Hold',
      timeline: '10+ years',
      pros: ['Maximum appreciation', 'Tax advantages', 'Compounding growth'],
      cons: ['Capital tied up', 'Market risk', 'Maintenance costs']
    },
    {
      strategy: 'Mid-Term Exit',
      timeline: '5-7 years',
      pros: ['Substantial gains', 'Flexibility', 'Balanced risk'],
      cons: ['May miss peak', 'Exit timing crucial', 'Market dependent']
    },
    {
      strategy: 'Rent Then Sell',
      timeline: '7-10 years',
      pros: ['Income + appreciation', 'Dual benefits', 'Tax efficient'],
      cons: ['Management effort', 'Tenant risk', 'Maintenance']
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] relative overflow-hidden">
      {/* SUBTLE GRADIENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-emerald-50/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-amber-50/40 to-transparent"></div>
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

            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-5 py-1.5 mb-4">
              <LineChart className="w-3.5 h-3.5 text-[#10B981]" />
              <span className="text-xs font-bold text-[#10B981] tracking-wide">GROWTH STRATEGY</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-[#0A0A0A] mb-6 leading-[1.05] tracking-tight">
              Long-Term Capital
              <br />
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] bg-clip-text text-transparent">
                Appreciation
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl">
              Build substantial wealth through Dubai's long-term property value growth and market evolution
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white border border-emerald-200 rounded-2xl p-6 shadow-md">
                <div className="text-4xl font-black text-[#10B981] mb-2">82%</div>
                <p className="text-gray-600">Growth Since 2015</p>
              </div>
              <div className="bg-white border border-amber-200 rounded-2xl p-6 shadow-md">
                <div className="text-4xl font-black text-[#D4AF37] mb-2">6-10%</div>
                <p className="text-gray-600">Annual Appreciation</p>
              </div>
              <div className="bg-white border border-emerald-200 rounded-2xl p-6 shadow-md">
                <div className="text-4xl font-black text-[#10B981] mb-2">2030</div>
                <p className="text-gray-600">Vision Target</p>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS SECTION */}
        <section className="px-6 lg:px-16 pb-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-8 h-8 text-[#10B981]" />
              <h2 className="text-4xl font-black text-[#0A0A0A]">Why Hold Long-Term?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 hover:border-emerald-300 rounded-3xl p-8 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-[#10B981]" />
                    </div>

                    <div className="text-2xl font-black text-[#D4AF37] mb-3">
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

        {/* HISTORICAL PERFORMANCE SECTION */}
        <section className="px-6 lg:px-16 pb-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <BarChart3 className="w-8 h-8 text-[#10B981]" />
              <h2 className="text-4xl font-black text-[#0A0A0A]">Historical Appreciation (2015-2024)</h2>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl p-12 shadow-md">
              <div className="space-y-6">
                {historicalData.map((data, index) => {
                  const percentage = (data.value / historicalData[historicalData.length - 1].value) * 100;

                  return (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4">
                          <span className="text-2xl font-black text-[#0A0A0A] w-16">{data.year}</span>
                          <span className="text-lg font-bold text-[#10B981]">{data.label}</span>
                        </div>
                        <span className="text-xl font-black text-[#0A0A0A]">Index: {data.value}</span>
                      </div>
                      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#10B981] to-[#D4AF37] rounded-full transition-all duration-1000"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
                <p className="text-sm text-gray-600 mb-2">Total Appreciation (2015-2024)</p>
                <p className="text-5xl font-black bg-gradient-to-r from-[#10B981] to-[#D4AF37] bg-clip-text text-transparent">
                  +82%
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTIONS SECTION */}
        <section className="px-6 lg:px-16 pb-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Target className="w-8 h-8 text-[#D4AF37]" />
              <h2 className="text-4xl font-black text-[#0A0A0A]">10-Year Projection Scenarios</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projections.map((projection, index) => {
                const isEmerald = projection.color === 'emerald';

                return (
                  <div
                    key={index}
                    className={`bg-gradient-to-br ${
                      isEmerald ? 'from-emerald-50' : 'from-amber-50'
                    } to-white border ${
                      isEmerald ? 'border-emerald-200' : 'border-amber-200'
                    } rounded-3xl p-8 shadow-md`}
                  >
                    <h3 className="text-2xl font-black text-[#0A0A0A] mb-2">{projection.scenario}</h3>
                    <p className={`text-lg font-bold ${
                      isEmerald ? 'text-[#10B981]' : 'text-[#D4AF37]'
                    } mb-8`}>
                      {projection.annualRate} Annual Growth
                    </p>

                    <div className="space-y-6">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">5-Year Value</p>
                        <p className={`text-4xl font-black ${
                          isEmerald ? 'text-[#10B981]' : 'text-[#D4AF37]'
                        }`}>
                          {projection.year5}%
                        </p>
                        <p className="text-xs text-gray-500 mt-1">of initial investment</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 mb-2">10-Year Value</p>
                        <p className={`text-4xl font-black ${
                          isEmerald ? 'text-[#10B981]' : 'text-[#D4AF37]'
                        }`}>
                          {projection.year10}%
                        </p>
                        <p className="text-xs text-gray-500 mt-1">of initial investment</p>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600 mb-2">Example: AED 1M Property</p>
                        <p className="text-2xl font-black text-[#0A0A0A]">
                          AED {(projection.year10 * 10000).toLocaleString()}
                        </p>
                        <p className="text-sm text-[#10B981] mt-1">
                          +AED {((projection.year10 - 100) * 10000).toLocaleString()} gain
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* GROWTH DRIVERS SECTION */}
        <section className="px-6 lg:px-16 pb-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="w-8 h-8 text-[#10B981]" />
              <h2 className="text-4xl font-black text-[#0A0A0A]">Future Growth Drivers</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {growthDrivers.map((driver, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 hover:border-emerald-300 rounded-3xl p-8 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-black text-[#0A0A0A]">{driver.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      driver.impact === 'Very High'
                        ? 'bg-emerald-100 text-[#10B981]'
                        : 'bg-amber-100 text-[#D4AF37]'
                    }`}>
                      {driver.impact}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">{driver.description}</p>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Timeline:</span>
                    <span className="font-bold text-[#0A0A0A]">{driver.timeline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LOCATION FACTORS SECTION */}
        <section className="px-6 lg:px-16 pb-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Building2 className="w-8 h-8 text-[#D4AF37]" />
              <h2 className="text-4xl font-black text-[#0A0A0A]">Location Premium Factors</h2>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-md">
              <div className="space-y-4">
                {locationFactors.map((factor, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row md:items-center md:justify-between p-6 bg-gray-50 hover:bg-emerald-50/50 rounded-2xl transition-colors"
                  >
                    <div className="flex-1 mb-4 md:mb-0">
                      <h4 className="text-xl font-black text-[#0A0A0A] mb-2">{factor.factor}</h4>
                      <p className="text-gray-600">{factor.description}</p>
                    </div>
                    <div className="text-3xl font-black bg-gradient-to-r from-[#10B981] to-[#D4AF37] bg-clip-text text-transparent">
                      {factor.impact}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EXIT STRATEGIES SECTION */}
        <section className="px-6 lg:px-16 pb-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Target className="w-8 h-8 text-[#10B981]" />
              <h2 className="text-4xl font-black text-[#0A0A0A]">Exit Strategy Options</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {exitStrategies.map((exit, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-3xl p-8 shadow-md"
                >
                  <h3 className="text-2xl font-black text-[#0A0A0A] mb-2">{exit.strategy}</h3>
                  <p className="text-[#D4AF37] font-bold mb-6">{exit.timeline}</p>

                  <div className="mb-6">
                    <p className="text-sm font-bold text-[#10B981] mb-3">Pros</p>
                    <ul className="space-y-2">
                      {exit.pros.map((pro, proIndex) => (
                        <li key={proIndex} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-gray-500 mb-3">Cons</p>
                    <ul className="space-y-2">
                      {exit.cons.map((con, conIndex) => (
                        <li key={conIndex} className="flex items-start gap-2 text-sm text-gray-600">
                          <div className="w-4 h-4 flex-shrink-0 mt-0.5">•</div>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRO TIPS SECTION */}
        <section className="px-6 lg:px-16 pb-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 rounded-3xl p-12 shadow-md">
              <div className="flex items-center gap-3 mb-8">
                <Sparkles className="w-8 h-8 text-[#10B981]" />
                <h2 className="text-4xl font-black text-[#0A0A0A]">Pro Tips for Long-Term Success</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="px-6 lg:px-16 pb-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 rounded-3xl p-12 text-center shadow-lg">
              <h2 className="text-4xl lg:text-5xl font-black text-[#0A0A0A] mb-4">
                Start Your Wealth Building Journey
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Explore properties in high-growth areas with strong appreciation potential
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/projects" className="bg-gradient-to-r from-[#10B981] to-[#059669] px-8 py-4 rounded-full font-bold text-white shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                  Browse Properties
                </Link>
                <Link href="/investment/roi-calculator" className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] px-8 py-4 rounded-full font-bold text-white shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                  Calculate Returns
                </Link>
                <Link href="/investment" className="bg-white border-2 border-[#10B981] px-8 py-4 rounded-full font-bold text-[#10B981] hover:bg-emerald-50 transition-all hover:-translate-y-1 shadow-md">
                  All Strategies
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
