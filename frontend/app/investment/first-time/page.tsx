'use client';

import { GraduationCap, Sparkles, Search, DollarSign, FileText, Key, CheckCircle, AlertCircle, ArrowRight, Clock, Shield, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function FirstTimePage() {
  const steps = [
    {
      icon: Search,
      title: 'Research & Planning',
      description: 'Define your investment goals and research the market',
      tasks: [
        'Determine your budget and investment objectives',
        'Research Dubai property market trends',
        'Identify preferred locations and property types',
        'Study different developers and their track records',
        'Understand payment plans and financing options'
      ],
      duration: '2-4 weeks',
      color: 'emerald'
    },
    {
      icon: DollarSign,
      title: 'Financing & Budget',
      description: 'Secure your financing and finalize your budget',
      tasks: [
        'Get mortgage pre-approval if needed',
        'Calculate all associated costs (DLD fees, agent fees)',
        'Set aside funds for down payment (typically 20%)',
        'Plan for ongoing costs during construction',
        'Consider exchange rate implications if foreign investor'
      ],
      duration: '1-2 weeks',
      color: 'gold'
    },
    {
      icon: FileText,
      title: 'Legal & Documentation',
      description: 'Complete all legal requirements and paperwork',
      tasks: [
        'Verify developer credentials and project approvals',
        'Review Sales and Purchase Agreement (SPA) carefully',
        'Hire a lawyer for contract review (recommended)',
        'Ensure escrow account is in place',
        'Verify property is registered with Dubai Land Department'
      ],
      duration: '1-2 weeks',
      color: 'emerald'
    },
    {
      icon: Key,
      title: 'Handover & Beyond',
      description: 'Prepare for property handover and post-purchase',
      tasks: [
        'Conduct thorough snagging inspection',
        'Register property with utilities (DEWA)',
        'Obtain Owners Association documents',
        'Plan property management if renting out',
        'Consider furnishing and final preparations'
      ],
      duration: 'Ongoing',
      color: 'gold'
    }
  ];

  const checklist = [
    {
      category: 'Before Purchase',
      items: [
        'Valid passport copy',
        'Emirates ID or visa (if applicable)',
        'Proof of income/bank statements',
        'Mortgage approval letter (if applicable)',
        'Budget calculation including all fees'
      ]
    },
    {
      category: 'During Purchase',
      items: [
        'Signed Sales and Purchase Agreement',
        'Payment receipts for all installments',
        'Developer payment plan schedule',
        'Escrow account confirmation',
        'NOC from developer (if reselling)'
      ]
    },
    {
      category: 'At Handover',
      items: [
        'Snagging report',
        'Title deed',
        'Property registration certificate',
        'Building completion certificate',
        'Utility connection confirmation'
      ]
    }
  ];

  const mistakes = [
    {
      icon: AlertCircle,
      title: 'Not Researching the Developer',
      description: 'Failing to verify developer credentials and track record',
      solution: 'Always check developer history, previous projects, and financial stability'
    },
    {
      icon: AlertCircle,
      title: 'Ignoring Location Analysis',
      description: 'Choosing property based on price alone without considering location',
      solution: 'Research connectivity, amenities, future developments, and rental demand'
    },
    {
      icon: AlertCircle,
      title: 'Overlooking Hidden Costs',
      description: 'Not accounting for registration fees, service charges, and maintenance',
      solution: 'Budget for 7-10% additional costs beyond property price'
    },
    {
      icon: AlertCircle,
      title: 'Skipping Legal Review',
      description: 'Not having contracts reviewed by legal professionals',
      solution: 'Hire a qualified lawyer to review all documentation'
    },
    {
      icon: AlertCircle,
      title: 'Missing Payment Deadlines',
      description: 'Failing to make scheduled payments on time',
      solution: 'Set calendar reminders and maintain sufficient funds for all payments'
    },
    {
      icon: AlertCircle,
      title: 'No Exit Strategy',
      description: 'Not planning what to do with the property after handover',
      solution: 'Decide early: sell, rent, or occupy - plan accordingly'
    }
  ];

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

            <div className="inline-flex items-center gap-2 bg-[#00C775]/10 border border-[#00C775]/30 rounded-full px-5 py-1.5 mb-4">
              <GraduationCap className="w-3.5 h-3.5 text-[#00C775]" />
              <span className="text-xs font-bold text-[#00C775] tracking-wide">FIRST-TIME BUYERS</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-white mb-6 leading-[1.05] tracking-tight">
              First-Time Buyer's
              <br />
              <span className="bg-gradient-to-r from-[#F3C440] via-[#FFD700] to-[#F3C440] bg-clip-text text-transparent">
                Complete Guide
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-3xl">
              Step-by-step roadmap to successfully purchasing your first off-plan property in Dubai
            </p>
          </div>
        </section>

        {/* STEP-BY-STEP PROCESS */}
        <section className="px-6 lg:px-16 pb-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-8 h-8 text-[#00C775]" />
              <h2 className="text-4xl font-black text-white">Step-by-Step Process</h2>
            </div>

            <div className="space-y-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isEmerald = step.color === 'emerald';

                return (
                  <div
                    key={index}
                    className="bg-[#0D0D0D]/80 backdrop-blur-xl border border-white/10 hover:border-[#00C775]/60 rounded-3xl overflow-hidden transition-all duration-300"
                  >
                    <div className="p-8">
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Icon & Number */}
                        <div className="flex-shrink-0">
                          <div className="relative">
                            <div className={`w-20 h-20 rounded-2xl ${isEmerald ? 'bg-[#00C775]/20' : 'bg-[#F3C440]/20'} flex items-center justify-center mb-4`}>
                              <Icon className={`w-10 h-10 ${isEmerald ? 'text-[#00C775]' : 'text-[#F3C440]'}`} />
                            </div>
                            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-sm font-bold text-gray-400">{step.duration}</span>
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="text-sm font-bold text-gray-500 mb-2">STEP {index + 1}</div>
                              <h3 className="text-3xl font-black text-white mb-3">
                                {step.title}
                              </h3>
                              <p className="text-lg text-gray-400">
                                {step.description}
                              </p>
                            </div>
                          </div>

                          {/* Tasks Checklist */}
                          <div className="bg-black/40 border border-white/5 rounded-2xl p-6">
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Key Tasks</h4>
                            <ul className="space-y-3">
                              {step.tasks.map((task, taskIndex) => (
                                <li key={taskIndex} className="flex items-start gap-3 group">
                                  <CheckCircle className="w-5 h-5 text-[#00C775] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                  <span className="text-gray-300">{task}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* DOCUMENTATION CHECKLIST */}
        <section className="px-6 lg:px-16 pb-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <FileText className="w-8 h-8 text-[#F3C440]" />
              <h2 className="text-4xl font-black text-white">Documentation Checklist</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {checklist.map((section, index) => (
                <div
                  key={index}
                  className="bg-[#0D0D0D]/80 backdrop-blur-xl border border-white/10 hover:border-[#F3C440]/60 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1"
                >
                  <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#F3C440]"></div>
                    {section.category}
                  </h3>

                  <ul className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#00C775] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMMON MISTAKES SECTION */}
        <section className="px-6 lg:px-16 pb-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Shield className="w-8 h-8 text-[#F3C440]" />
              <h2 className="text-4xl font-black text-white">Common Mistakes to Avoid</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mistakes.map((mistake, index) => {
                const Icon = mistake.icon;

                return (
                  <div
                    key={index}
                    className="bg-[#0D0D0D]/80 backdrop-blur-xl border border-[#F3C440]/20 hover:border-[#F3C440]/60 rounded-3xl p-8 transition-all duration-300"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#F3C440]/20 flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-[#F3C440]" />
                    </div>

                    <h3 className="text-xl font-black text-white mb-3">
                      {mistake.title}
                    </h3>

                    <p className="text-gray-400 mb-4 text-sm">
                      {mistake.description}
                    </p>

                    <div className="bg-[#00C775]/10 border border-[#00C775]/30 rounded-xl p-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-[#00C775] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-[#00C775] mb-1">Solution</p>
                          <p className="text-xs text-gray-300">{mistake.solution}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* PRO TIPS SECTION */}
        <section className="px-6 lg:px-16 pb-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="bg-gradient-to-br from-[#00C775]/10 via-[#0D0D0D]/80 to-[#F3C440]/10 backdrop-blur-xl border border-[#00C775]/20 rounded-3xl p-12">
              <div className="flex items-center gap-3 mb-8">
                <TrendingUp className="w-8 h-8 text-[#00C775]" />
                <h2 className="text-4xl font-black text-white">Pro Tips for Success</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#00C775]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-black text-[#00C775]">1</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-white mb-2">Start Small</h4>
                    <p className="text-gray-400">Begin with a single property to understand the process before scaling your portfolio</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#00C775]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-black text-[#00C775]">2</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-white mb-2">Location First</h4>
                    <p className="text-gray-400">Prioritize prime locations with strong infrastructure and connectivity</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#F3C440]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-black text-[#F3C440]">3</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-white mb-2">Visit in Person</h4>
                    <p className="text-gray-400">Always visit the showroom and location before making final commitment</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#F3C440]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-black text-[#F3C440]">4</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-white mb-2">Use Tools</h4>
                    <p className="text-gray-400">Leverage calculators to understand true costs and potential returns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="px-6 lg:px-16 pb-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="bg-gradient-to-br from-[#0D0D0D] via-[#0D0D0D] to-[#00C775]/5 backdrop-blur-xl border border-[#00C775]/20 rounded-3xl p-12 text-center">
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
                Ready to Take the First Step?
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Use our tools to plan your investment and browse curated off-plan properties
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/investment/budget-calculator" className="bg-gradient-to-r from-[#00C775] to-[#00A85D] px-8 py-4 rounded-full font-bold text-white shadow-[0_0_30px_rgba(0,199,117,0.4)] hover:shadow-[0_0_50px_rgba(0,199,117,0.6)] transition-all hover:-translate-y-1">
                  Budget Calculator
                </Link>
                <Link href="/investment/roi-calculator" className="bg-gradient-to-r from-[#F3C440] to-[#D4A936] px-8 py-4 rounded-full font-bold text-black shadow-[0_0_30px_rgba(243,196,64,0.4)] hover:shadow-[0_0_50px_rgba(243,196,64,0.6)] transition-all hover:-translate-y-1">
                  ROI Calculator
                </Link>
                <Link href="/projects" className="bg-[#0D0D0D] border-2 border-[#00C775] px-8 py-4 rounded-full font-bold text-white hover:bg-[#00C775]/10 transition-all hover:-translate-y-1">
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
