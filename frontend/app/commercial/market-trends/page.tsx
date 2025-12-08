'use client';

import { TrendingUp, TrendingDown, BarChart3, Building2, DollarSign, Percent, Users, MapPin } from 'lucide-react';

export default function MarketTrendsPage() {
  const trends = [
    {
      title: 'Average Commercial Prices',
      change: '+8.5%',
      value: 'AED 1,850 / sq ft',
      status: 'up',
      description: 'Year-over-year price growth',
    },
    {
      title: 'Rental Yields',
      change: '+1.2%',
      value: '8.5%',
      status: 'up',
      description: 'Average commercial rental yield',
    },
    {
      title: 'Occupancy Rate',
      change: '+3.8%',
      value: '87%',
      status: 'up',
      description: 'Commercial space occupancy',
    },
    {
      title: 'Transaction Volume',
      change: '+12.5%',
      value: '1,245',
      status: 'up',
      description: 'Q4 2024 transactions',
    },
  ];

  const locationTrends = [
    { location: 'Business Bay', priceChange: '+9.2%', yieldChange: '+0.8%', demand: 'Very High' },
    { location: 'DIFC', priceChange: '+6.5%', yieldChange: '+0.5%', demand: 'High' },
    { location: 'Downtown Dubai', priceChange: '+7.8%', yieldChange: '+0.6%', demand: 'Very High' },
    { location: 'Dubai Marina', priceChange: '+8.1%', yieldChange: '+0.9%', demand: 'High' },
    { location: 'JLT', priceChange: '+10.2%', yieldChange: '+1.1%', demand: 'Very High' },
    { location: 'Dubai South', priceChange: '+15.5%', yieldChange: '+2.2%', demand: 'Emerging' },
  ];

  const propertyTypes = [
    { type: 'Office Spaces', avgYield: '8.2%', avgPrice: 'AED 1,950/sq ft', growth: '+8.5%' },
    { type: 'Retail', avgYield: '9.5%', avgPrice: 'AED 2,200/sq ft', growth: '+7.2%' },
    { type: 'Showrooms', avgYield: '9.0%', avgPrice: 'AED 1,650/sq ft', growth: '+9.8%' },
    { type: 'Warehouses', avgYield: '10.5%', avgPrice: 'AED 850/sq ft', growth: '+12.5%' },
    { type: 'Mixed-Use', avgYield: '9.2%', avgPrice: 'AED 1,800/sq ft', growth: '+8.9%' },
  ];

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] relative overflow-hidden">
      <div className="relative z-10">
        <section className="relative pt-32 pb-16 px-6 lg:px-16">
          <div className="max-w-[1600px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#10B981]/10 border border-[#10B981]/30 rounded-full px-6 py-2 mb-6">
              <BarChart3 className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm font-bold text-[#10B981]">AI MARKET INTELLIGENCE</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-[#0A0A0A] mb-6 leading-[1.05] tracking-tight">
              Commercial Market
              <br />
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] bg-clip-text text-transparent">
                Trends & Insights
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
              Real-time market data and AI-powered insights for Dubai's commercial real estate sector
            </p>
          </div>
        </section>

        <section className="px-6 lg:px-16 pb-20">
          <div className="max-w-[1600px] mx-auto space-y-12">

            {/* KEY METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trends.map((trend, idx) => (
                <div key={idx} className="bg-white border border-gray-200 shadow-md rounded-3xl p-6 hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-gray-600">{trend.title}</h3>
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${trend.status === 'up' ? 'bg-[#10B981]/20' : 'bg-red-500/20'}`}>
                      {trend.status === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-[#10B981]" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-400" />
                      )}
                      <span className={`text-xs font-black ${trend.status === 'up' ? 'text-[#10B981]' : 'text-red-400'}`}>
                        {trend.change}
                      </span>
                    </div>
                  </div>
                  <div className="text-4xl font-black text-[#0A0A0A] mb-2">{trend.value}</div>
                  <p className="text-xs text-gray-600">{trend.description}</p>
                </div>
              ))}
            </div>

            {/* LOCATION TRENDS */}
            <div className="bg-white border border-gray-200 shadow-md rounded-3xl p-8">
              <h2 className="text-3xl font-black text-[#0A0A0A] mb-8 flex items-center gap-3">
                <MapPin className="w-8 h-8 text-[#10B981]" />
                Trends by Location
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Location</th>
                      <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Price Change</th>
                      <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Yield Change</th>
                      <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Demand</th>
                    </tr>
                  </thead>
                  <tbody>
                    {locationTrends.map((loc, idx) => (
                      <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4 font-bold text-[#0A0A0A]">{loc.location}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-[#10B981]" />
                            <span className="font-black text-[#10B981]">{loc.priceChange}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
                            <span className="font-black text-[#D4AF37]">{loc.yieldChange}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            loc.demand === 'Very High' ? 'bg-[#10B981]/20 text-[#10B981]' :
                            loc.demand === 'High' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' :
                            'bg-gray-500/20 text-gray-600'
                          }`}>
                            {loc.demand}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* PROPERTY TYPE ANALYSIS */}
            <div className="bg-white border border-gray-200 shadow-md rounded-3xl p-8">
              <h2 className="text-3xl font-black text-[#0A0A0A] mb-8 flex items-center gap-3">
                <Building2 className="w-8 h-8 text-[#10B981]" />
                Performance by Property Type
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {propertyTypes.map((prop, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 shadow-md rounded-2xl p-6 hover:shadow-lg transition-all">
                    <h3 className="text-xl font-black text-[#0A0A0A] mb-4">{prop.type}</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Avg. Yield</p>
                        <div className="flex items-center gap-2">
                          <Percent className="w-4 h-4 text-[#10B981]" />
                          <span className="text-2xl font-black text-[#10B981]">{prop.avgYield}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Avg. Price</p>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-[#D4AF37]" />
                          <span className="text-lg font-bold text-[#0A0A0A]">{prop.avgPrice}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">YoY Growth</p>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-[#10B981]" />
                          <span className="text-lg font-black text-[#10B981]">{prop.growth}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* INSIGHTS */}
            <div className="bg-gradient-to-br from-gray-50 via-white to-[#10B981]/5 border border-gray-200 shadow-lg rounded-3xl p-12">
              <h2 className="text-4xl font-black text-[#0A0A0A] mb-6">
                AI Market Insights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#10B981]/20 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-[#10B981]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0A0A0A] mb-2">Strong Growth Trajectory</h3>
                    <p className="text-gray-600">Commercial property values increased 8.5% YoY, driven by strong tenant demand and limited supply in prime locations.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                    <Percent className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0A0A0A] mb-2">Rental Yields Improving</h3>
                    <p className="text-gray-600">Average rental yields rose to 8.5%, with warehouses and logistics facilities leading at 10.5%.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#10B981]/20 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-[#10B981]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0A0A0A] mb-2">High Occupancy Rates</h3>
                    <p className="text-gray-600">Commercial occupancy reached 87%, reflecting robust business activity and tenant confidence.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0A0A0A] mb-2">Emerging Hotspots</h3>
                    <p className="text-gray-600">Dubai South and free zones showing exceptional growth (15%+) as logistics and e-commerce sectors expand.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}
