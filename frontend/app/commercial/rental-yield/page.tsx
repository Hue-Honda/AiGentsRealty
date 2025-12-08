'use client';

import { useState } from 'react';
import { Percent, TrendingUp, DollarSign, Calculator, Sparkles, Building2, MapPin } from 'lucide-react';

export default function RentalYieldPage() {
  const [propertyPrice, setPropertyPrice] = useState(5000000);
  const [monthlyRent, setMonthlyRent] = useState(35000);
  const [annualCosts, setAnnualCosts] = useState(50000);

  // Calculations
  const annualRent = monthlyRent * 12;
  const netAnnualRent = annualRent - annualCosts;
  const grossYield = ((annualRent / propertyPrice) * 100).toFixed(2);
  const netYield = ((netAnnualRent / propertyPrice) * 100).toFixed(2);

  // Market comparisons
  const marketData = [
    { location: 'Downtown Dubai', avgYield: '6.8%', demand: 'Very High', color: 'from-[#10B981] to-[#059669]' },
    { location: 'Business Bay', avgYield: '8.5%', demand: 'High', color: 'from-[#10B981] to-[#059669]' },
    { location: 'DIFC', avgYield: '7.2%', demand: 'High', color: 'from-[#D4AF37] to-[#B8960F]' },
    { location: 'Dubai Marina', avgYield: '7.8%', demand: 'Very High', color: 'from-[#10B981] to-[#059669]' },
    { location: 'JLT', avgYield: '8.2%', demand: 'High', color: 'from-[#10B981] to-[#059669]' },
    { location: 'Dubai South', avgYield: '10.5%', demand: 'Growing', color: 'from-[#10B981] to-[#059669]' },
  ];

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] relative overflow-hidden">
      <div className="relative z-10">
        <section className="relative pt-32 pb-16 px-6 lg:px-16">
          <div className="max-w-[1600px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#10B981]/10 border border-[#10B981]/30 rounded-full px-6 py-2 mb-6">
              <Percent className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm font-bold text-[#10B981]">YIELD ANALYZER</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-[#0A0A0A] mb-6 leading-[1.05] tracking-tight">
              Rental Yield
              <br />
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
              Analyze and compare rental yields across Dubai's commercial property market
            </p>
          </div>
        </section>

        <section className="px-6 lg:px-16 pb-20">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

              {/* INPUT PANEL */}
              <div className="bg-white border border-gray-200 shadow-md rounded-3xl p-8">
                <h2 className="text-3xl font-black text-[#0A0A0A] mb-8 flex items-center gap-3">
                  <Calculator className="w-8 h-8 text-[#10B981]" />
                  Property Details
                </h2>

                <div className="mb-8">
                  <label className="block text-sm font-bold text-gray-600 mb-3">Property Purchase Price (AED)</label>
                  <input
                    type="range"
                    min="1000000"
                    max="30000000"
                    step="100000"
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(Number(e.target.value))}
                    className="w-full h-2 bg-[#10B981]/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#10B981] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
                  />
                  <div className="mt-3 text-3xl font-black text-[#10B981]">
                    AED {propertyPrice.toLocaleString()}
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-bold text-gray-600 mb-3">Monthly Rental Income (AED)</label>
                  <input
                    type="range"
                    min="10000"
                    max="500000"
                    step="5000"
                    value={monthlyRent}
                    onChange={(e) => setMonthlyRent(Number(e.target.value))}
                    className="w-full h-2 bg-[#10B981]/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#10B981] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
                  />
                  <div className="mt-3 text-3xl font-black text-[#10B981]">
                    AED {monthlyRent.toLocaleString()}
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-bold text-gray-600 mb-3">Annual Operating Costs (AED)</label>
                  <input
                    type="range"
                    min="0"
                    max="200000"
                    step="5000"
                    value={annualCosts}
                    onChange={(e) => setAnnualCosts(Number(e.target.value))}
                    className="w-full h-2 bg-[#D4AF37]/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#D4AF37] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
                  />
                  <div className="mt-3 text-3xl font-black text-[#D4AF37]">
                    AED {annualCosts.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* RESULTS PANEL */}
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 shadow-lg rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#10B981]/20 flex items-center justify-center">
                      <Percent className="w-6 h-6 text-[#10B981]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-600">Gross Rental Yield</h3>
                  </div>
                  <div className="text-7xl font-black bg-gradient-to-r from-[#10B981] via-[#34D399] to-[#10B981] bg-clip-text text-transparent mb-4">
                    {grossYield}%
                  </div>
                  <p className="text-sm text-gray-500">Annual rent ÷ Property price</p>
                </div>

                <div className="bg-white border border-gray-200 shadow-lg rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-600">Net Rental Yield</h3>
                  </div>
                  <div className="text-7xl font-black bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] bg-clip-text text-transparent mb-4">
                    {netYield}%
                  </div>
                  <p className="text-sm text-gray-500">Net income after costs ÷ Property price</p>
                </div>

                <div className="bg-white border border-gray-200 shadow-md rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign className="w-8 h-8 text-[#10B981]" />
                    <h3 className="text-xl font-bold text-[#0A0A0A]">Annual Rental Income</h3>
                  </div>
                  <div className="text-4xl font-black text-[#0A0A0A]">
                    AED {annualRent.toLocaleString()}
                  </div>
                </div>
              </div>

            </div>

            {/* MARKET COMPARISON */}
            <div className="bg-white border border-gray-200 shadow-md rounded-3xl p-8">
              <h2 className="text-3xl font-black text-[#0A0A0A] mb-8 flex items-center gap-3">
                <Building2 className="w-8 h-8 text-[#10B981]" />
                Dubai Commercial Market Average Yields
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {marketData.map((market, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 shadow-md rounded-2xl p-6 hover:border-[#10B981]/40 transition-all hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-4">
                      <MapPin className="w-5 h-5 text-[#10B981]" />
                      <h3 className="text-lg font-bold text-[#0A0A0A]">{market.location}</h3>
                    </div>
                    <div className={`text-5xl font-black bg-gradient-to-r ${market.color} bg-clip-text text-transparent mb-3`}>
                      {market.avgYield}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                      <span className="text-sm text-gray-600">{market.demand} Demand</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
