'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Percent, ArrowRight, Sparkles } from 'lucide-react';

export default function ROICalculatorPage() {
  const [purchasePrice, setPurchasePrice] = useState(5000000);
  const [rentalIncome, setRentalIncome] = useState(450000);
  const [annualAppreciation, setAnnualAppreciation] = useState(5);
  const [years, setYears] = useState(5);

  // Calculations
  const annualROI = ((rentalIncome / purchasePrice) * 100).toFixed(2);
  const totalRentalIncome = rentalIncome * years;
  const appreciationValue = purchasePrice * (Math.pow(1 + annualAppreciation / 100, years) - 1);
  const totalROI = ((totalRentalIncome + appreciationValue) / purchasePrice * 100).toFixed(2);
  const futureValue = purchasePrice + appreciationValue;

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* AI PARTICLE GLOW BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00C775]/5 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#F3C440]/5 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>
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
              <Calculator className="w-4 h-4 text-[#00C775]" />
              <span className="text-sm font-bold text-[#00C775]">AI-POWERED CALCULATOR</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-white mb-6 leading-[1.05] tracking-tight">
              Commercial ROI
              <br />
              <span className="bg-gradient-to-r from-[#F3C440] via-[#FFD700] to-[#F3C440] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-4">
              Calculate your return on investment for Dubai commercial properties with AI-powered projections
            </p>
          </div>
        </section>

        {/* CALCULATOR SECTION */}
        <section className="px-6 lg:px-16 pb-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* INPUT PANEL */}
              <div className="bg-[#0D0D0D]/80 backdrop-blur-xl border border-[#00C775]/20 rounded-3xl p-8">
                <h2 className="text-3xl font-black text-white mb-8 flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-[#00C775]" />
                  Investment Details
                </h2>

                {/* Purchase Price */}
                <div className="mb-8">
                  <label className="block text-sm font-bold text-gray-400 mb-3">Purchase Price (AED)</label>
                  <input
                    type="range"
                    min="1000000"
                    max="50000000"
                    step="100000"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(Number(e.target.value))}
                    className="w-full h-2 bg-[#00C775]/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#00C775] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(0,199,117,0.6)]"
                  />
                  <div className="mt-3 text-3xl font-black text-[#00C775]">
                    AED {purchasePrice.toLocaleString()}
                  </div>
                </div>

                {/* Annual Rental Income */}
                <div className="mb-8">
                  <label className="block text-sm font-bold text-gray-400 mb-3">Annual Rental Income (AED)</label>
                  <input
                    type="range"
                    min="50000"
                    max="5000000"
                    step="10000"
                    value={rentalIncome}
                    onChange={(e) => setRentalIncome(Number(e.target.value))}
                    className="w-full h-2 bg-[#00C775]/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#00C775] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(0,199,117,0.6)]"
                  />
                  <div className="mt-3 text-3xl font-black text-[#00C775]">
                    AED {rentalIncome.toLocaleString()}
                  </div>
                </div>

                {/* Annual Appreciation */}
                <div className="mb-8">
                  <label className="block text-sm font-bold text-gray-400 mb-3">Annual Appreciation (%)</label>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    step="0.5"
                    value={annualAppreciation}
                    onChange={(e) => setAnnualAppreciation(Number(e.target.value))}
                    className="w-full h-2 bg-[#F3C440]/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#F3C440] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(243,196,64,0.6)]"
                  />
                  <div className="mt-3 text-3xl font-black text-[#F3C440]">
                    {annualAppreciation}%
                  </div>
                </div>

                {/* Investment Period */}
                <div className="mb-8">
                  <label className="block text-sm font-bold text-gray-400 mb-3">Investment Period (Years)</label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full h-2 bg-[#F3C440]/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#F3C440] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(243,196,64,0.6)]"
                  />
                  <div className="mt-3 text-3xl font-black text-[#F3C440]">
                    {years} {years === 1 ? 'Year' : 'Years'}
                  </div>
                </div>
              </div>

              {/* RESULTS PANEL */}
              <div className="space-y-6">
                {/* Annual ROI */}
                <div className="bg-gradient-to-br from-[#00C775]/10 via-[#0D0D0D]/80 to-[#0D0D0D]/80 backdrop-blur-xl border border-[#00C775]/40 rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#00C775]/20 flex items-center justify-center">
                      <Percent className="w-6 h-6 text-[#00C775]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-400">Annual ROI</h3>
                  </div>
                  <div className="text-6xl font-black bg-gradient-to-r from-[#00C775] via-[#00D97E] to-[#00C775] bg-clip-text text-transparent">
                    {annualROI}%
                  </div>
                </div>

                {/* Total ROI */}
                <div className="bg-gradient-to-br from-[#F3C440]/10 via-[#0D0D0D]/80 to-[#0D0D0D]/80 backdrop-blur-xl border border-[#F3C440]/40 rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#F3C440]/20 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-[#F3C440]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-400">Total ROI ({years} years)</h3>
                  </div>
                  <div className="text-6xl font-black bg-gradient-to-r from-[#F3C440] via-[#FFD700] to-[#F3C440] bg-clip-text text-transparent">
                    {totalROI}%
                  </div>
                </div>

                {/* Total Rental Income */}
                <div className="bg-[#0D0D0D]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign className="w-8 h-8 text-[#00C775]" />
                    <h3 className="text-xl font-bold text-white">Total Rental Income</h3>
                  </div>
                  <div className="text-4xl font-black text-white">
                    AED {totalRentalIncome.toLocaleString()}
                  </div>
                </div>

                {/* Capital Appreciation */}
                <div className="bg-[#0D0D0D]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-8 h-8 text-[#F3C440]" />
                    <h3 className="text-xl font-bold text-white">Capital Appreciation</h3>
                  </div>
                  <div className="text-4xl font-black text-white">
                    AED {appreciationValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </div>
                </div>

                {/* Future Property Value */}
                <div className="bg-gradient-to-br from-[#00C775]/5 via-[#0D0D0D]/80 to-[#F3C440]/5 backdrop-blur-xl border border-[#00C775]/20 rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <ArrowRight className="w-8 h-8 text-[#00C775]" />
                    <h3 className="text-xl font-bold text-white">Future Property Value</h3>
                  </div>
                  <div className="text-4xl font-black bg-gradient-to-r from-[#00C775] to-[#F3C440] bg-clip-text text-transparent">
                    AED {futureValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </div>
                </div>
              </div>

            </div>

            {/* CTA */}
            <div className="mt-12 bg-gradient-to-br from-[#0D0D0D] via-[#0D0D0D] to-[#00C775]/5 backdrop-blur-xl border border-[#00C775]/20 rounded-3xl p-12 text-center">
              <h2 className="text-4xl font-black text-white mb-4">
                Ready to Invest?
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Explore our curated commercial properties with guaranteed high returns
              </p>
              <button className="bg-gradient-to-r from-[#00C775] to-[#00A85D] px-10 py-5 rounded-full font-bold text-white text-lg shadow-[0_0_40px_rgba(0,199,117,0.4)] hover:shadow-[0_0_60px_rgba(0,199,117,0.6)] transition-all hover:-translate-y-1">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6" />
                  <span>Explore Properties</span>
                  <ArrowRight className="w-6 h-6" />
                </div>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
