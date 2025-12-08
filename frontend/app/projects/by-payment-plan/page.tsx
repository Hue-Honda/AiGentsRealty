'use client';

import { CreditCard, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const paymentPlans = [
  {
    slug: '80-20',
    title: '80/20 Payment Plan',
    description: 'Pay 80% during construction, 20% on completion. The most investor-friendly option in Dubai.',
    details: '80% Construction | 20% Handover',
    badge: 'Most Popular',
    badgeColor: 'bg-[#10B981]',
    count: '24 Projects',
    gradient: 'from-[#10B981]/20 to-[#059669]/10',
    benefits: ['Lowest upfront cost', 'Extended payment period', 'Maximum leverage']
  },
  {
    slug: '70-30',
    title: '70/30 Payment Plan',
    description: 'Flexible payment structure with 70% during construction and 30% upon handover.',
    details: '70% Construction | 30% Handover',
    badge: 'Flexible',
    badgeColor: 'bg-[#D4AF37]',
    count: '18 Projects',
    gradient: 'from-[#D4AF37]/20 to-[#B8941E]/10',
    benefits: ['Balanced structure', 'Good for flipping', 'Multiple developers']
  },
  {
    slug: '60-40',
    title: '60/40 Payment Plan',
    description: 'Traditional payment plan with 60% during construction, 40% on completion.',
    details: '60% Construction | 40% Handover',
    badge: 'Traditional',
    badgeColor: 'bg-[#10B981]/70',
    count: '15 Projects',
    gradient: 'from-[#10B981]/15 to-[#059669]/5',
    benefits: ['Lower construction payments', 'Higher end-payment', 'Premium projects']
  },
  {
    slug: '50-50',
    title: '50/50 Payment Plan',
    description: 'Equal split - 50% during construction and 50% at handover. Often with premium properties.',
    details: '50% Construction | 50% Handover',
    badge: 'Premium',
    badgeColor: 'bg-[#D4AF37]',
    count: '8 Projects',
    gradient: 'from-[#D4AF37]/25 to-[#F4E5B8]/10',
    benefits: ['Equal distribution', 'Luxury developments', 'Prime locations']
  },
  {
    slug: 'post-handover',
    title: 'Post-Handover Plans',
    description: 'Extended payment plans continuing after property handover, up to 3-5 years post-completion.',
    details: 'Payments Continue After Handover',
    badge: 'Extended',
    badgeColor: 'bg-[#10B981]',
    count: '12 Projects',
    gradient: 'from-[#10B981]/20 to-[#D4AF37]/10',
    benefits: ['Long-term affordability', '3-5 year plans', 'Immediate possession']
  },
  {
    slug: '1-percent-monthly',
    title: '1% Monthly Plans',
    description: 'Pay just 1% per month during construction. Ultra-flexible payment structure.',
    details: '1% Per Month During Construction',
    badge: 'Ultra-Flexible',
    badgeColor: 'bg-[#D4AF37]',
    count: '6 Projects',
    gradient: 'from-[#D4AF37]/30 to-[#F4E5B8]/15',
    benefits: ['Minimal monthly outlay', 'Easy budgeting', 'No large lump sums']
  }
];

export default function BrowseByPaymentPlan() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#10B981]/10 border border-[#10B981]/30 rounded-full mb-6">
              <CreditCard className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm font-semibold text-[#10B981]">Dubai's Unique Advantage</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-[#0A0A0A] mb-6 leading-tight">
              Browse by
              <br />
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#B8941E] bg-clip-text text-transparent">
                Payment Plan
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Find off-plan projects with payment structures that match your investment strategy. From 80/20 plans to post-handover options.
            </p>
          </div>
        </div>
      </section>

      {/* Payment Plans Grid */}
      <section className="py-16 px-6 lg:px-16">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paymentPlans.map((plan) => (
              <Link
                key={plan.slug}
                href={`/projects?paymentPlan=${plan.slug}`}
                className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-lg hover:border-[#10B981]/50 transition-all duration-500 hover:-translate-y-2"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-500`}></div>

                <div className="relative p-6">
                  {/* Badge & Count */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`${plan.badgeColor} px-3 py-1.5 rounded-full text-xs font-bold text-white`}>
                      {plan.badge}
                    </span>
                    <span className="text-xs font-semibold text-gray-600">{plan.count}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-black text-[#0A0A0A] mb-3 group-hover:text-[#10B981] transition-colors">
                    {plan.title}
                  </h2>

                  {/* Details */}
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="w-4 h-4 text-[#10B981]" />
                    <span className="text-sm font-bold text-[#D4AF37]">{plan.details}</span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Benefits */}
                  <div className="space-y-2 mb-6">
                    {plan.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
                        <span className="text-xs text-gray-600">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-[#10B981] font-bold text-sm group-hover:gap-3 transition-all">
                    <span>View Projects</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Icon Decoration */}
                <div className="absolute bottom-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <CreditCard className="w-16 h-16 text-[#D4AF37]" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 px-6 lg:px-16 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl font-black text-[#0A0A0A] mb-6 text-center">
            Why Payment Plans Matter in Dubai
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-6">
              <div className="w-12 h-12 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-[#10B981]" />
              </div>
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Low Capital Entry</h3>
              <p className="text-sm text-gray-600">Start investing with minimal upfront capital using flexible payment structures</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Better ROI Potential</h3>
              <p className="text-sm text-gray-600">Extended payment periods allow you to leverage market appreciation</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-6 h-6 text-[#10B981]" />
              </div>
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Cash Flow Management</h3>
              <p className="text-sm text-gray-600">Spread payments over construction period for easier budgeting</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-16 bg-gradient-to-br from-emerald-50 via-white to-amber-50">
        <div className="max-w-[1600px] mx-auto text-center">
          <h2 className="text-4xl font-black text-[#0A0A0A] mb-4">
            Not Sure Which Plan Suits You?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Talk to our investment advisors to find the perfect payment plan for your goals
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8941E] text-black rounded-xl font-bold hover:shadow-xl transition-all duration-300">
              Talk to Advisor
            </button>
            <Link
              href="/projects"
              className="px-8 py-4 bg-white border-2 border-[#10B981]/40 text-[#0A0A0A] rounded-xl font-bold hover:bg-[#10B981]/10 hover:border-[#10B981]/60 transition-all duration-300 shadow-md"
            >
              Browse All Projects
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
