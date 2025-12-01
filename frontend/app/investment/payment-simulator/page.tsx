'use client';

import { useState } from 'react';
import { Calendar, DollarSign, Sparkles, ArrowRight, Clock, CheckCircle, BarChart3, Key } from 'lucide-react';
import Link from 'next/link';

export default function PaymentSimulatorPage() {
  const [propertyPrice, setPropertyPrice] = useState(2000000);
  const [paymentPlan, setPaymentPlan] = useState('80/20');

  // Payment plan configurations
  const paymentPlans = {
    '80/20': {
      name: '80/20 Plan',
      description: '80% during construction, 20% on handover',
      milestones: [
        { stage: 'Booking', percentage: 10, timing: 'Day 1' },
        { stage: '1st Installment', percentage: 10, timing: 'Month 3' },
        { stage: '2nd Installment', percentage: 10, timing: 'Month 6' },
        { stage: '3rd Installment', percentage: 10, timing: 'Month 9' },
        { stage: '4th Installment', percentage: 10, timing: 'Month 12' },
        { stage: '5th Installment', percentage: 10, timing: 'Month 15' },
        { stage: '6th Installment', percentage: 10, timing: 'Month 18' },
        { stage: '7th Installment', percentage: 10, timing: 'Month 21' },
        { stage: 'Handover', percentage: 20, timing: 'Month 24' }
      ]
    },
    '70/30': {
      name: '70/30 Plan',
      description: '70% during construction, 30% on handover',
      milestones: [
        { stage: 'Booking', percentage: 10, timing: 'Day 1' },
        { stage: '1st Installment', percentage: 10, timing: 'Month 4' },
        { stage: '2nd Installment', percentage: 10, timing: 'Month 8' },
        { stage: '3rd Installment', percentage: 10, timing: 'Month 12' },
        { stage: '4th Installment', percentage: 10, timing: 'Month 16' },
        { stage: '5th Installment', percentage: 10, timing: 'Month 20' },
        { stage: '6th Installment', percentage: 10, timing: 'Month 24' },
        { stage: 'Handover', percentage: 30, timing: 'Month 28' }
      ]
    },
    '60/40': {
      name: '60/40 Plan',
      description: '60% during construction, 40% on handover',
      milestones: [
        { stage: 'Booking', percentage: 10, timing: 'Day 1' },
        { stage: '1st Installment', percentage: 10, timing: 'Month 6' },
        { stage: '2nd Installment', percentage: 10, timing: 'Month 12' },
        { stage: '3rd Installment', percentage: 10, timing: 'Month 18' },
        { stage: '4th Installment', percentage: 10, timing: 'Month 24' },
        { stage: '5th Installment', percentage: 10, timing: 'Month 30' },
        { stage: 'Handover', percentage: 40, timing: 'Month 36' }
      ]
    },
    '50/50': {
      name: '50/50 Plan',
      description: '50% during construction, 50% on handover',
      milestones: [
        { stage: 'Booking', percentage: 10, timing: 'Day 1' },
        { stage: '1st Installment', percentage: 10, timing: 'Month 8' },
        { stage: '2nd Installment', percentage: 10, timing: 'Month 16' },
        { stage: '3rd Installment', percentage: 10, timing: 'Month 24' },
        { stage: '4th Installment', percentage: 10, timing: 'Month 32' },
        { stage: 'Handover', percentage: 50, timing: 'Month 40' }
      ]
    }
  };

  const selectedPlan = paymentPlans[paymentPlan as keyof typeof paymentPlans];
  let cumulativeAmount = 0;

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
            <div className="mb-8">
              <Link href="/investment" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00C775] transition-colors group">
                <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Investment Hub</span>
              </Link>
            </div>

            <div className="inline-flex items-center gap-2 bg-[#F3C440]/10 border border-[#F3C440]/30 rounded-full px-5 py-1.5 mb-4">
              <Calendar className="w-3.5 h-3.5 text-[#F3C440]" />
              <span className="text-xs font-bold text-[#F3C440] tracking-wide">PAYMENT PLANNER</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-white mb-6 leading-[1.05] tracking-tight">
              Payment Plan
              <br />
              <span className="bg-gradient-to-r from-[#F3C440] via-[#FFD700] to-[#F3C440] bg-clip-text text-transparent">
                Simulator
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-3xl">
              Visualize payment schedules and milestone timelines for different off-plan payment structures
            </p>
          </div>
        </section>

        {/* CALCULATOR SECTION */}
        <section className="px-6 lg:px-16 pb-20">
          <div className="max-w-[1400px] mx-auto">

            {/* INPUT SECTION */}
            <div className="bg-[#0D0D0D]/80 backdrop-blur-xl border border-[#00C775]/20 rounded-3xl p-8 mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Property Price */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold text-gray-400">Property Price</label>
                    <div className="text-3xl font-black text-[#00C775]">
                      AED {propertyPrice.toLocaleString()}
                    </div>
                  </div>
                  <input
                    type="range"
                    min="500000"
                    max="10000000"
                    step="100000"
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(Number(e.target.value))}
                    className="w-full h-2 bg-[#00C775]/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#00C775] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(0,199,117,0.6)]"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-500">500K</span>
                    <span className="text-xs text-gray-500">10M</span>
                  </div>
                </div>

                {/* Payment Plan Selection */}
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-3">Payment Plan Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(paymentPlans).map(([key, plan]) => (
                      <button
                        key={key}
                        onClick={() => setPaymentPlan(key)}
                        className={`p-4 rounded-2xl border-2 transition-all font-bold ${
                          paymentPlan === key
                            ? 'bg-[#F3C440]/20 border-[#F3C440] text-[#F3C440]'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'
                        }`}
                      >
                        <div className="text-lg mb-1">{plan.name}</div>
                        <div className="text-xs opacity-70">{plan.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* TIMELINE VISUALIZATION */}
            <div className="bg-[#0D0D0D]/80 backdrop-blur-xl border border-[#00C775]/20 rounded-3xl p-8 mb-8">
              <div className="flex items-center gap-3 mb-8">
                <Clock className="w-8 h-8 text-[#00C775]" />
                <h2 className="text-3xl font-black text-white">Payment Timeline</h2>
              </div>

              <div className="space-y-4">
                {selectedPlan.milestones.map((milestone, index) => {
                  const amount = (propertyPrice * milestone.percentage) / 100;
                  cumulativeAmount += amount;
                  const isHandover = milestone.stage === 'Handover';

                  return (
                    <div
                      key={index}
                      className={`relative group transition-all duration-300 hover:-translate-y-1 ${
                        isHandover
                          ? 'bg-gradient-to-r from-[#F3C440]/20 via-[#0D0D0D]/80 to-[#0D0D0D]/80 border-2 border-[#F3C440]/60'
                          : 'bg-white/5 border border-white/10 hover:border-[#00C775]/60'
                      } rounded-2xl p-6`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-4">

                        {/* Milestone Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-10 h-10 rounded-full ${
                              isHandover ? 'bg-[#F3C440]/30' : 'bg-[#00C775]/20'
                            } flex items-center justify-center`}>
                              {isHandover ? (
                                <Key className="w-5 h-5 text-[#F3C440]" />
                              ) : (
                                <CheckCircle className="w-5 h-5 text-[#00C775]" />
                              )}
                            </div>
                            <div>
                              <h3 className={`text-xl font-black ${
                                isHandover ? 'text-[#F3C440]' : 'text-white'
                              }`}>
                                {milestone.stage}
                              </h3>
                              <p className="text-sm text-gray-400">{milestone.timing}</p>
                            </div>
                          </div>
                        </div>

                        {/* Payment Details */}
                        <div className="flex items-center gap-8">
                          <div>
                            <p className="text-xs text-gray-400 mb-1">Percentage</p>
                            <p className={`text-2xl font-black ${
                              isHandover ? 'text-[#F3C440]' : 'text-[#00C775]'
                            }`}>
                              {milestone.percentage}%
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-400 mb-1">Amount</p>
                            <p className="text-2xl font-black text-white">
                              AED {amount.toLocaleString()}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-400 mb-1">Cumulative</p>
                            <p className="text-2xl font-black text-gray-300">
                              AED {Math.round(cumulativeAmount).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4 w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            isHandover
                              ? 'bg-gradient-to-r from-[#F3C440] to-[#D4A936]'
                              : 'bg-gradient-to-r from-[#00C775] to-[#00A85D]'
                          } rounded-full transition-all duration-500`}
                          style={{ width: `${(cumulativeAmount / propertyPrice) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* BREAKDOWN TABLE */}
            <div className="bg-[#0D0D0D]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <BarChart3 className="w-8 h-8 text-[#F3C440]" />
                <h2 className="text-3xl font-black text-white">Payment Breakdown</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-4 px-4 text-gray-400 font-bold text-sm">Stage</th>
                      <th className="text-left py-4 px-4 text-gray-400 font-bold text-sm">Timeline</th>
                      <th className="text-right py-4 px-4 text-gray-400 font-bold text-sm">Percentage</th>
                      <th className="text-right py-4 px-4 text-gray-400 font-bold text-sm">Amount (AED)</th>
                      <th className="text-right py-4 px-4 text-gray-400 font-bold text-sm">Total Paid</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      let runningTotal = 0;
                      return selectedPlan.milestones.map((milestone, index) => {
                        const amount = (propertyPrice * milestone.percentage) / 100;
                        runningTotal += amount;
                        const isHandover = milestone.stage === 'Handover';

                        return (
                          <tr
                            key={index}
                            className={`border-b border-white/5 ${
                              isHandover ? 'bg-[#F3C440]/5' : ''
                            }`}
                          >
                            <td className="py-4 px-4">
                              <span className={`font-bold ${
                                isHandover ? 'text-[#F3C440]' : 'text-white'
                              }`}>
                                {milestone.stage}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-gray-400">{milestone.timing}</td>
                            <td className={`py-4 px-4 text-right font-bold ${
                              isHandover ? 'text-[#F3C440]' : 'text-[#00C775]'
                            }`}>
                              {milestone.percentage}%
                            </td>
                            <td className="py-4 px-4 text-right font-bold text-white">
                              {amount.toLocaleString()}
                            </td>
                            <td className="py-4 px-4 text-right font-bold text-gray-300">
                              {Math.round(runningTotal).toLocaleString()}
                            </td>
                          </tr>
                        );
                      });
                    })()}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-[#00C775]/30 bg-[#00C775]/5">
                      <td colSpan={3} className="py-4 px-4 font-black text-white text-lg">
                        Total
                      </td>
                      <td className="py-4 px-4 text-right font-black text-[#00C775] text-lg">
                        {propertyPrice.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-right font-black text-[#00C775] text-lg">
                        {propertyPrice.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 bg-gradient-to-br from-[#0D0D0D] via-[#0D0D0D] to-[#00C775]/5 backdrop-blur-xl border border-[#00C775]/20 rounded-3xl p-12 text-center">
              <h2 className="text-4xl font-black text-white mb-4">
                Calculate Your Returns
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Use our ROI calculator to estimate potential profits on your investment
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/investment/roi-calculator" className="bg-gradient-to-r from-[#00C775] to-[#00A85D] px-10 py-5 rounded-full font-bold text-white text-lg shadow-[0_0_40px_rgba(0,199,117,0.4)] hover:shadow-[0_0_60px_rgba(0,199,117,0.6)] transition-all hover:-translate-y-1 inline-flex items-center gap-3">
                  <DollarSign className="w-6 h-6" />
                  <span>ROI Calculator</span>
                  <ArrowRight className="w-6 h-6" />
                </Link>
                <Link href="/explore" className="bg-gradient-to-r from-[#F3C440] to-[#D4A936] px-10 py-5 rounded-full font-bold text-black text-lg shadow-[0_0_40px_rgba(243,196,64,0.4)] hover:shadow-[0_0_60px_rgba(243,196,64,0.6)] transition-all hover:-translate-y-1">
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
