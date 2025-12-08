'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Percent, ArrowRight, Sparkles, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function ROICalculatorPage() {
  const [purchasePrice, setPurchasePrice] = useState(2000000);
  const [downPayment, setDownPayment] = useState(20);
  const [annualAppreciation, setAnnualAppreciation] = useState(8);
  const [holdingPeriod, setHoldingPeriod] = useState(3);

  // Calculations
  const downPaymentAmount = (purchasePrice * downPayment) / 100;
  const futureValue = purchasePrice * Math.pow(1 + annualAppreciation / 100, holdingPeriod);
  const totalAppreciation = futureValue - purchasePrice;
  const totalROINum = (totalAppreciation / downPaymentAmount) * 100;
  const totalROI = totalROINum.toFixed(2);
  const annualROI = (totalROINum / holdingPeriod).toFixed(2);

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] relative overflow-hidden">
      {/* SUBTLE LIGHT GRADIENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-emerald-50 to-transparent opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-amber-50 to-transparent opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-emerald-50 via-transparent to-amber-50 opacity-20"></div>
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
              <Calculator className="w-3.5 h-3.5 text-[#10B981]" />
              <span className="text-xs font-bold text-[#10B981] tracking-wide">AI-POWERED CALCULATOR</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-[#0A0A0A] mb-6 leading-[1.05] tracking-tight">
              ROI
              <br />
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#E8C547] to-[#D4AF37] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl">
              Calculate your potential return on investment for Dubai off-plan properties with AI-powered projections
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
                  Investment Parameters
                </h2>

                {/* Purchase Price */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold text-gray-600">Purchase Price</label>
                    <div className="text-2xl font-black text-[#10B981]">
                      AED {purchasePrice.toLocaleString()}
                    </div>
                  </div>
                  <input
                    type="range"
                    min="500000"
                    max="10000000"
                    step="100000"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(Number(e.target.value))}
                    className="w-full h-2 bg-emerald-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#10B981] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-500">500K</span>
                    <span className="text-xs text-gray-500">10M</span>
                  </div>
                </div>

                {/* Down Payment */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold text-gray-600">Down Payment</label>
                    <div className="text-2xl font-black text-[#10B981]">
                      {downPayment}%
                    </div>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full h-2 bg-emerald-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#10B981] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-500">10%</span>
                    <span className="text-xs text-gray-500">100%</span>
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    Amount: AED {downPaymentAmount.toLocaleString()}
                  </div>
                </div>

                {/* Annual Appreciation */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold text-gray-600">Annual Appreciation</label>
                    <div className="text-2xl font-black text-[#D4AF37]">
                      {annualAppreciation}%
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="0.5"
                    value={annualAppreciation}
                    onChange={(e) => setAnnualAppreciation(Number(e.target.value))}
                    className="w-full h-2 bg-amber-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#D4AF37] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-500">0%</span>
                    <span className="text-xs text-gray-500">20%</span>
                  </div>
                </div>

                {/* Holding Period */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold text-gray-600">Holding Period</label>
                    <div className="text-2xl font-black text-[#D4AF37]">
                      {holdingPeriod} {holdingPeriod === 1 ? 'Year' : 'Years'}
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={holdingPeriod}
                    onChange={(e) => setHoldingPeriod(Number(e.target.value))}
                    className="w-full h-2 bg-amber-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#D4AF37] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-500">1 Year</span>
                    <span className="text-xs text-gray-500">10 Years</span>
                  </div>
                </div>
              </div>

              {/* RESULTS PANEL */}
              <div className="space-y-6">
                {/* Total ROI - Hero Card */}
                <div className="bg-gradient-to-br from-emerald-50 via-white to-white border-2 border-emerald-200 shadow-lg rounded-3xl p-10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/30 to-transparent rounded-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
                        <TrendingUp className="w-7 h-7 text-[#10B981]" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-600">Total ROI</h3>
                    </div>
                    <div className="text-7xl font-black bg-gradient-to-r from-[#10B981] via-[#14C591] to-[#10B981] bg-clip-text text-transparent mb-2">
                      {totalROI}%
                    </div>
                    <p className="text-sm text-gray-600">
                      Over {holdingPeriod} {holdingPeriod === 1 ? 'year' : 'years'}
                    </p>
                  </div>
                </div>

                {/* Annual ROI */}
                <div className="bg-gradient-to-br from-amber-50 via-white to-white border border-amber-200 shadow-md rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                      <Percent className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-600">Average Annual ROI</h3>
                  </div>
                  <div className="text-5xl font-black bg-gradient-to-r from-[#D4AF37] via-[#E8C547] to-[#D4AF37] bg-clip-text text-transparent">
                    {annualROI}%
                  </div>
                </div>

                {/* Investment Breakdown */}
                <div className="bg-white border border-gray-200 shadow-md rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <BarChart3 className="w-8 h-8 text-[#10B981]" />
                    <h3 className="text-xl font-bold text-[#0A0A0A]">Investment Breakdown</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <span className="text-gray-600">Initial Investment</span>
                      <span className="text-xl font-black text-[#0A0A0A]">AED {downPaymentAmount.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <span className="text-gray-600">Purchase Price</span>
                      <span className="text-xl font-black text-[#0A0A0A]">AED {purchasePrice.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                      <span className="text-gray-600">Future Value</span>
                      <span className="text-xl font-black text-[#10B981]">AED {Math.round(futureValue).toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-xl">
                      <span className="text-gray-600">Total Appreciation</span>
                      <span className="text-xl font-black text-[#D4AF37]">AED {Math.round(totalAppreciation).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Projection Chart Visualization */}
                <div className="bg-white border border-gray-200 shadow-md rounded-3xl p-8">
                  <h3 className="text-xl font-bold text-[#0A0A0A] mb-6">Value Projection</h3>

                  <div className="space-y-3">
                    {Array.from({ length: holdingPeriod + 1 }).map((_, year) => {
                      const yearValue = purchasePrice * Math.pow(1 + annualAppreciation / 100, year);
                      const percentage = Math.round((yearValue / futureValue) * 10000) / 100;

                      return (
                        <div key={year}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-gray-600">Year {year}</span>
                            <span className="text-sm font-black text-[#10B981]">AED {Math.round(yearValue).toLocaleString()}</span>
                          </div>
                          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#10B981] to-[#D4AF37] rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>

            {/* CTA */}
            <div className="mt-12 bg-gradient-to-br from-white via-emerald-50/30 to-amber-50/30 border border-gray-200 shadow-md rounded-3xl p-12 text-center">
              <h2 className="text-4xl font-black text-[#0A0A0A] mb-4">
                Ready to Invest?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Explore our curated off-plan properties with guaranteed high returns
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/projects" className="bg-gradient-to-r from-[#10B981] to-[#0D9668] px-10 py-5 rounded-full font-bold text-white text-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1 inline-flex items-center gap-3">
                  <Sparkles className="w-6 h-6" />
                  <span>Browse Properties</span>
                  <ArrowRight className="w-6 h-6" />
                </Link>
                <Link href="/investment/payment-simulator" className="bg-gradient-to-r from-[#D4AF37] to-[#C09A2F] px-10 py-5 rounded-full font-bold text-white text-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                  Payment Simulator
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
