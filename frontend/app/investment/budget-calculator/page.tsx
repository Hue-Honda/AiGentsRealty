'use client';

import { useState } from 'react';
import { DollarSign, Sparkles, ArrowRight, PieChart, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function BudgetCalculatorPage() {
  const [monthlyIncome, setMonthlyIncome] = useState(50000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(20000);
  const [downPaymentAvailable, setDownPaymentAvailable] = useState(400000);
  const [loanTerm, setLoanTerm] = useState(20);

  // Calculations
  const monthlyDisposable = monthlyIncome - monthlyExpenses;
  const safeMonthlyPayment = monthlyDisposable * 0.4; // 40% of disposable income
  const annualInterestRate = 4.5; // Average UAE mortgage rate
  const monthlyInterestRate = annualInterestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;

  // Calculate maximum loan amount using mortgage formula
  const maxLoanAmount = safeMonthlyPayment * ((Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1) / (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)));

  const maxPropertyPrice = maxLoanAmount + downPaymentAvailable;
  const ltvRatio = ((maxLoanAmount / maxPropertyPrice) * 100).toFixed(1);

  // Additional costs (approx 7% of property price)
  const dldFee = maxPropertyPrice * 0.04; // 4% DLD registration
  const agentFee = maxPropertyPrice * 0.02; // 2% agent commission
  const otherCosts = maxPropertyPrice * 0.01; // 1% misc costs
  const totalAdditionalCosts = dldFee + agentFee + otherCosts;
  const totalInitialInvestment = downPaymentAvailable + totalAdditionalCosts;

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] relative overflow-hidden">
      {/* SUBTLE LIGHT GRADIENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-emerald-50/40 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-amber-50/40 to-transparent rounded-full blur-3xl"></div>
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
              <DollarSign className="w-3.5 h-3.5 text-[#10B981]" />
              <span className="text-xs font-bold text-[#10B981] tracking-wide">AFFORDABILITY CALCULATOR</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-[#0A0A0A] mb-6 leading-[1.05] tracking-tight">
              Budget
              <br />
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl">
              Determine your maximum affordable property price based on income, expenses, and available down payment
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
                  Your Financial Profile
                </h2>

                {/* Monthly Income */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold text-gray-600">Monthly Income</label>
                    <div className="text-2xl font-black text-[#10B981]">
                      AED {monthlyIncome.toLocaleString()}
                    </div>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="200000"
                    step="5000"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                    className="w-full h-2 bg-emerald-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#10B981] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-500">10K</span>
                    <span className="text-xs text-gray-500">200K</span>
                  </div>
                </div>

                {/* Monthly Expenses */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold text-gray-600">Monthly Expenses</label>
                    <div className="text-2xl font-black text-[#D4AF37]">
                      AED {monthlyExpenses.toLocaleString()}
                    </div>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="150000"
                    step="2500"
                    value={monthlyExpenses}
                    onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                    className="w-full h-2 bg-amber-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#D4AF37] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-500">5K</span>
                    <span className="text-xs text-gray-500">150K</span>
                  </div>
                </div>

                {/* Disposable Income Display */}
                <div className="mb-8 bg-gray-50 border border-gray-200 rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-600">Disposable Income</span>
                    <span className={`text-2xl font-black ${monthlyDisposable > 0 ? 'text-[#10B981]' : 'text-red-500'}`}>
                      AED {monthlyDisposable.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Down Payment Available */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold text-gray-600">Down Payment Available</label>
                    <div className="text-2xl font-black text-[#10B981]">
                      AED {downPaymentAvailable.toLocaleString()}
                    </div>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="5000000"
                    step="50000"
                    value={downPaymentAvailable}
                    onChange={(e) => setDownPaymentAvailable(Number(e.target.value))}
                    className="w-full h-2 bg-emerald-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#10B981] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-500">100K</span>
                    <span className="text-xs text-gray-500">5M</span>
                  </div>
                </div>

                {/* Loan Term */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold text-gray-600">Loan Term</label>
                    <div className="text-2xl font-black text-[#D4AF37]">
                      {loanTerm} Years
                    </div>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="25"
                    step="5"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-full h-2 bg-amber-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#D4AF37] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-500">5 Years</span>
                    <span className="text-xs text-gray-500">25 Years</span>
                  </div>
                </div>
              </div>

              {/* RESULTS PANEL */}
              <div className="space-y-6">
                {/* Maximum Property Price - Hero Card */}
                <div className="bg-gradient-to-br from-emerald-50 to-white border-2 border-[#10B981] shadow-lg rounded-3xl p-10 relative overflow-hidden">
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
                        <TrendingUp className="w-7 h-7 text-[#10B981]" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-600">Maximum Property Price</h3>
                    </div>
                    <div className="text-6xl font-black bg-gradient-to-r from-[#10B981] via-emerald-600 to-[#10B981] bg-clip-text text-transparent mb-2">
                      AED {Math.round(maxPropertyPrice).toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-600">
                      Based on your financial profile
                    </p>
                  </div>
                </div>

                {/* Monthly Payment Info */}
                <div className="bg-gradient-to-br from-amber-50 to-white border border-[#D4AF37] shadow-md rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-600">Safe Monthly Payment</h3>
                  </div>
                  <div className="text-5xl font-black bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] bg-clip-text text-transparent">
                    AED {Math.round(safeMonthlyPayment).toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    40% of disposable income (recommended)
                  </p>
                </div>

                {/* Budget Breakdown */}
                <div className="bg-white border border-gray-200 shadow-md rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <PieChart className="w-8 h-8 text-[#10B981]" />
                    <h3 className="text-xl font-bold text-[#0A0A0A]">Budget Breakdown</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                      <span className="text-gray-600">Down Payment</span>
                      <span className="text-xl font-black text-[#10B981]">AED {downPaymentAvailable.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <span className="text-gray-600">Mortgage Loan</span>
                      <span className="text-xl font-black text-[#0A0A0A]">AED {Math.round(maxLoanAmount).toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <span className="text-gray-600">LTV Ratio</span>
                      <span className="text-xl font-black text-[#0A0A0A]">{ltvRatio}%</span>
                    </div>
                  </div>
                </div>

                {/* Additional Costs */}
                <div className="bg-white border border-gray-200 shadow-md rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <AlertCircle className="w-8 h-8 text-[#D4AF37]" />
                    <h3 className="text-xl font-bold text-[#0A0A0A]">Additional Costs</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <span className="text-sm text-gray-600">DLD Registration (4%)</span>
                      <span className="font-black text-[#0A0A0A]">AED {Math.round(dldFee).toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <span className="text-sm text-gray-600">Agent Fee (2%)</span>
                      <span className="font-black text-[#0A0A0A]">AED {Math.round(agentFee).toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <span className="text-sm text-gray-600">Other Costs (1%)</span>
                      <span className="font-black text-[#0A0A0A]">AED {Math.round(otherCosts).toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-amber-50 border border-[#D4AF37] rounded-xl mt-4">
                      <span className="font-bold text-[#0A0A0A]">Total Additional</span>
                      <span className="text-xl font-black text-[#D4AF37]">AED {Math.round(totalAdditionalCosts).toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl">
                      <span className="font-bold text-[#0A0A0A]">Total Initial Investment</span>
                      <span className="text-xl font-black text-[#0A0A0A]">AED {Math.round(totalInitialInvestment).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-gradient-to-br from-emerald-50/50 to-white border border-emerald-200 shadow-md rounded-3xl p-8">
                  <h3 className="text-xl font-bold text-[#0A0A0A] mb-4 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-[#10B981]" />
                    Recommendations
                  </h3>

                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#10B981] mt-2"></div>
                      <span className="text-gray-600 text-sm">
                        Keep emergency fund of 6 months expenses before investing
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#10B981] mt-2"></div>
                      <span className="text-gray-600 text-sm">
                        Budget for ongoing costs: service charges, utilities, maintenance
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#10B981] mt-2"></div>
                      <span className="text-gray-600 text-sm">
                        Consider interest rate changes when planning long-term
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#10B981] mt-2"></div>
                      <span className="text-gray-600 text-sm">
                        Pre-approval from banks can give you negotiating power
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>

            {/* CTA */}
            <div className="mt-12 bg-gradient-to-br from-gray-50 to-emerald-50/30 border border-gray-200 shadow-md rounded-3xl p-12 text-center">
              <h2 className="text-4xl font-black text-[#0A0A0A] mb-4">
                Find Properties in Your Budget
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Browse off-plan properties within your calculated budget range
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/projects" className="bg-gradient-to-r from-[#10B981] to-emerald-700 px-10 py-5 rounded-full font-bold text-white text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 inline-flex items-center gap-3">
                  <Sparkles className="w-6 h-6" />
                  <span>Browse Properties</span>
                  <ArrowRight className="w-6 h-6" />
                </Link>
                <Link href="/investment/roi-calculator" className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] px-10 py-5 rounded-full font-bold text-white text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  Calculate ROI
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
