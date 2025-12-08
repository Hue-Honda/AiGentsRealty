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
    <div className="min-h-screen bg-white text-[#0A0A0A] relative overflow-hidden">
      {/* SUBTLE LIGHT GRADIENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-emerald-50/80 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-amber-50/60 to-transparent rounded-full blur-3xl"></div>
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

            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-5 py-1.5 mb-4">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-xs font-bold text-[#D4AF37] tracking-wide">PAYMENT PLANNER</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-[#0A0A0A] mb-6 leading-[1.05] tracking-tight">
              Payment Plan
              <br />
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] bg-clip-text text-transparent">
                Simulator
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl">
              Visualize payment schedules and milestone timelines for different off-plan payment structures
            </p>
          </div>
        </section>

        {/* CALCULATOR SECTION */}
        <section className="px-6 lg:px-16 pb-20">
          <div className="max-w-[1400px] mx-auto">

            {/* INPUT SECTION */}
            <div className="bg-white border border-gray-200 shadow-md rounded-3xl p-8 mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Property Price */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold text-gray-600">Property Price</label>
                    <div className="text-3xl font-black text-[#10B981]">
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
                    className="w-full h-2 bg-emerald-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#10B981] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-500">500K</span>
                    <span className="text-xs text-gray-500">10M</span>
                  </div>
                </div>

                {/* Payment Plan Selection */}
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-3">Payment Plan Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(paymentPlans).map(([key, plan]) => (
                      <button
                        key={key}
                        onClick={() => setPaymentPlan(key)}
                        className={`p-4 rounded-2xl border-2 transition-all font-bold ${
                          paymentPlan === key
                            ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]'
                            : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300'
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
            <div className="bg-white border border-gray-200 shadow-md rounded-3xl p-8 mb-8">
              <div className="flex items-center gap-3 mb-8">
                <Clock className="w-8 h-8 text-[#10B981]" />
                <h2 className="text-3xl font-black text-[#0A0A0A]">Payment Timeline</h2>
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
                          ? 'bg-gradient-to-r from-[#D4AF37]/10 via-white to-white border-2 border-[#D4AF37]/60 shadow-md'
                          : 'bg-white border border-gray-200 shadow-sm hover:border-[#10B981]/60 hover:shadow-md'
                      } rounded-2xl p-6`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-4">

                        {/* Milestone Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-10 h-10 rounded-full ${
                              isHandover ? 'bg-[#D4AF37]/20' : 'bg-emerald-100'
                            } flex items-center justify-center`}>
                              {isHandover ? (
                                <Key className="w-5 h-5 text-[#D4AF37]" />
                              ) : (
                                <CheckCircle className="w-5 h-5 text-[#10B981]" />
                              )}
                            </div>
                            <div>
                              <h3 className={`text-xl font-black ${
                                isHandover ? 'text-[#D4AF37]' : 'text-[#0A0A0A]'
                              }`}>
                                {milestone.stage}
                              </h3>
                              <p className="text-sm text-gray-600">{milestone.timing}</p>
                            </div>
                          </div>
                        </div>

                        {/* Payment Details */}
                        <div className="flex items-center gap-8">
                          <div>
                            <p className="text-xs text-gray-600 mb-1">Percentage</p>
                            <p className={`text-2xl font-black ${
                              isHandover ? 'text-[#D4AF37]' : 'text-[#10B981]'
                            }`}>
                              {milestone.percentage}%
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-600 mb-1">Amount</p>
                            <p className="text-2xl font-black text-[#0A0A0A]">
                              AED {amount.toLocaleString()}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-600 mb-1">Cumulative</p>
                            <p className="text-2xl font-black text-gray-700">
                              AED {Math.round(cumulativeAmount).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            isHandover
                              ? 'bg-gradient-to-r from-[#D4AF37] to-[#C19B2F]'
                              : 'bg-gradient-to-r from-[#10B981] to-[#059669]'
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
            <div className="bg-white border border-gray-200 shadow-md rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <BarChart3 className="w-8 h-8 text-[#D4AF37]" />
                <h2 className="text-3xl font-black text-[#0A0A0A]">Payment Breakdown</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 text-gray-600 font-bold text-sm">Stage</th>
                      <th className="text-left py-4 px-4 text-gray-600 font-bold text-sm">Timeline</th>
                      <th className="text-right py-4 px-4 text-gray-600 font-bold text-sm">Percentage</th>
                      <th className="text-right py-4 px-4 text-gray-600 font-bold text-sm">Amount (AED)</th>
                      <th className="text-right py-4 px-4 text-gray-600 font-bold text-sm">Total Paid</th>
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
                            className={`border-b border-gray-100 ${
                              isHandover ? 'bg-[#D4AF37]/5' : ''
                            }`}
                          >
                            <td className="py-4 px-4">
                              <span className={`font-bold ${
                                isHandover ? 'text-[#D4AF37]' : 'text-[#0A0A0A]'
                              }`}>
                                {milestone.stage}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-gray-600">{milestone.timing}</td>
                            <td className={`py-4 px-4 text-right font-bold ${
                              isHandover ? 'text-[#D4AF37]' : 'text-[#10B981]'
                            }`}>
                              {milestone.percentage}%
                            </td>
                            <td className="py-4 px-4 text-right font-bold text-[#0A0A0A]">
                              {amount.toLocaleString()}
                            </td>
                            <td className="py-4 px-4 text-right font-bold text-gray-700">
                              {Math.round(runningTotal).toLocaleString()}
                            </td>
                          </tr>
                        );
                      });
                    })()}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-emerald-200 bg-emerald-50">
                      <td colSpan={3} className="py-4 px-4 font-black text-[#0A0A0A] text-lg">
                        Total
                      </td>
                      <td className="py-4 px-4 text-right font-black text-[#10B981] text-lg">
                        {propertyPrice.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-right font-black text-[#10B981] text-lg">
                        {propertyPrice.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 bg-gradient-to-br from-emerald-50 via-white to-amber-50/30 border border-gray-200 shadow-lg rounded-3xl p-12 text-center">
              <h2 className="text-4xl font-black text-[#0A0A0A] mb-4">
                Calculate Your Returns
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Use our ROI calculator to estimate potential profits on your investment
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/investment/roi-calculator" className="bg-gradient-to-r from-[#10B981] to-[#059669] px-10 py-5 rounded-full font-bold text-white text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 inline-flex items-center gap-3">
                  <DollarSign className="w-6 h-6" />
                  <span>ROI Calculator</span>
                  <ArrowRight className="w-6 h-6" />
                </Link>
                <Link href="/projects" className="bg-gradient-to-r from-[#D4AF37] to-[#C19B2F] px-10 py-5 rounded-full font-bold text-white text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
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
