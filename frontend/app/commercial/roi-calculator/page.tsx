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
    <div className="min-h-screen bg-white text-[#0A0A0A] relative overflow-hidden">
      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-16 px-6 lg:px-16">
          <div className="max-w-[1600px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#10B981]/10 border border-[#10B981]/30 rounded-full px-6 py-2 mb-6">
              <Calculator className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm font-bold text-[#10B981]">AI-POWERED CALCULATOR</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-[#0A0A0A] mb-6 leading-[1.05] tracking-tight">
              Commercial ROI
              <br />
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
              Calculate your return on investment for Dubai commercial properties with AI-powered projections
            </p>
          </div>
        </section>

        {/* CALCULATOR SECTION */}
        <section className="px-6 lg:px-16 pb-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* INPUT PANEL */}
              <div className="bg-white border border-gray-200 shadow-md rounded-3xl p-8">
                <h2 className="text-3xl font-black text-[#0A0A0A] mb-8 flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-[#10B981]" />
                  Investment Details
                </h2>

                {/* Purchase Price */}
                <div className="mb-8">
                  <label className="block text-sm font-bold text-gray-600 mb-3">Purchase Price (AED)</label>
                  <input
                    type="range"
                    min="1000000"
                    max="50000000"
                    step="100000"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#10B981] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
                  />
                  <div className="mt-3 text-3xl font-black text-[#10B981]">
                    AED {purchasePrice.toLocaleString()}
                  </div>
                </div>

                {/* Annual Rental Income */}
                <div className="mb-8">
                  <label className="block text-sm font-bold text-gray-600 mb-3">Annual Rental Income (AED)</label>
                  <input
                    type="range"
                    min="50000"
                    max="5000000"
                    step="10000"
                    value={rentalIncome}
                    onChange={(e) => setRentalIncome(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#10B981] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
                  />
                  <div className="mt-3 text-3xl font-black text-[#10B981]">
                    AED {rentalIncome.toLocaleString()}
                  </div>
                </div>

                {/* Annual Appreciation */}
                <div className="mb-8">
                  <label className="block text-sm font-bold text-gray-600 mb-3">Annual Appreciation (%)</label>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    step="0.5"
                    value={annualAppreciation}
                    onChange={(e) => setAnnualAppreciation(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#D4AF37] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
                  />
                  <div className="mt-3 text-3xl font-black text-[#D4AF37]">
                    {annualAppreciation}%
                  </div>
                </div>

                {/* Investment Period */}
                <div className="mb-8">
                  <label className="block text-sm font-bold text-gray-600 mb-3">Investment Period (Years)</label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#D4AF37] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
                  />
                  <div className="mt-3 text-3xl font-black text-[#D4AF37]">
                    {years} {years === 1 ? 'Year' : 'Years'}
                  </div>
                </div>
              </div>

              {/* RESULTS PANEL */}
              <div className="space-y-6">
                {/* Annual ROI */}
                <div className="bg-white border border-gray-200 shadow-lg rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#10B981]/10 flex items-center justify-center">
                      <Percent className="w-6 h-6 text-[#10B981]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-600">Annual ROI</h3>
                  </div>
                  <div className="text-6xl font-black bg-gradient-to-r from-[#10B981] via-[#34D399] to-[#10B981] bg-clip-text text-transparent">
                    {annualROI}%
                  </div>
                </div>

                {/* Total ROI */}
                <div className="bg-white border border-gray-200 shadow-lg rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-600">Total ROI ({years} years)</h3>
                  </div>
                  <div className="text-6xl font-black bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] bg-clip-text text-transparent">
                    {totalROI}%
                  </div>
                </div>

                {/* Total Rental Income */}
                <div className="bg-white border border-gray-200 shadow-md rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign className="w-8 h-8 text-[#10B981]" />
                    <h3 className="text-xl font-bold text-[#0A0A0A]">Total Rental Income</h3>
                  </div>
                  <div className="text-4xl font-black text-[#0A0A0A]">
                    AED {totalRentalIncome.toLocaleString()}
                  </div>
                </div>

                {/* Capital Appreciation */}
                <div className="bg-white border border-gray-200 shadow-md rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-8 h-8 text-[#D4AF37]" />
                    <h3 className="text-xl font-bold text-[#0A0A0A]">Capital Appreciation</h3>
                  </div>
                  <div className="text-4xl font-black text-[#0A0A0A]">
                    AED {appreciationValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </div>
                </div>

                {/* Future Property Value */}
                <div className="bg-white border border-gray-200 shadow-lg rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <ArrowRight className="w-8 h-8 text-[#10B981]" />
                    <h3 className="text-xl font-bold text-[#0A0A0A]">Future Property Value</h3>
                  </div>
                  <div className="text-4xl font-black bg-gradient-to-r from-[#10B981] to-[#D4AF37] bg-clip-text text-transparent">
                    AED {futureValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </div>
                </div>
              </div>

            </div>

            {/* CTA */}
            <div className="mt-12 bg-white border border-gray-200 shadow-md rounded-3xl p-12 text-center">
              <h2 className="text-4xl font-black text-[#0A0A0A] mb-4">
                Ready to Invest?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Explore our curated commercial properties with guaranteed high returns
              </p>
              <button className="bg-gradient-to-r from-[#10B981] to-[#059669] px-10 py-5 rounded-full font-bold text-white text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
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
