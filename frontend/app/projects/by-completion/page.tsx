'use client';

import { Calendar, ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';

const completionDates = [
  {
    slug: '2025',
    title: '2025 Completion',
    description: 'Move in soon! Projects completing this year with immediate returns',
    badge: 'Ready Soon',
    badgeColor: 'bg-[#10B981]',
    count: '12 Projects',
    timeline: 'Within 12 months'
  },
  {
    slug: '2026',
    title: '2026 Completion',
    description: 'Perfect timing for investors planning ahead with proven developers',
    badge: 'Popular',
    badgeColor: 'bg-[#D4AF37]',
    count: '28 Projects',
    timeline: '12-24 months'
  },
  {
    slug: '2027-plus',
    title: '2027+ Completion',
    description: 'Long-term investment opportunities with extended payment plans',
    badge: 'Best Value',
    badgeColor: 'bg-[#10B981]',
    count: '35 Projects',
    timeline: '24+ months'
  },
  {
    slug: 'new-launches',
    title: 'New Launches',
    description: 'Just announced projects with early bird pricing and best unit selection',
    badge: 'Exclusive',
    badgeColor: 'bg-[#D4AF37]',
    count: '8 Projects',
    timeline: 'Recently Announced'
  }
];

export default function BrowseByCompletion() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#10B981]/10 border border-[#10B981]/30 rounded-full mb-6">
              <Calendar className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm font-semibold text-[#10B981]">Timeline Planning</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-[#0A0A0A] mb-6 leading-tight">
              Browse by
              <br />
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#B8941E] bg-clip-text text-transparent">
                Completion Date
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Plan your investment timeline. Find projects based on when you want to move in or start earning rental income.
            </p>
          </div>
        </div>
      </section>

      {/* Completion Date Cards */}
      <section className="py-16 px-6 lg:px-16">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {completionDates.map((date) => (
              <Link
                key={date.slug}
                href={`/projects?completionYear=${date.slug}`}
                className="group relative bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-md hover:shadow-lg hover:border-[#10B981]/50 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="p-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-[#10B981]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#10B981]/20 transition-colors">
                      <Clock className="w-8 h-8 text-[#10B981]" />
                    </div>
                    <span className={`${date.badgeColor} px-4 py-2 rounded-full text-xs font-bold text-white`}>
                      {date.badge}
                    </span>
                  </div>

                  <h2 className="text-4xl font-black text-[#0A0A0A] mb-4 group-hover:text-[#10B981] transition-colors">
                    {date.title}
                  </h2>

                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {date.description}
                  </p>

                  <div className="flex items-center gap-2 mb-6">
                    <Calendar className="w-5 h-5 text-[#D4AF37]" />
                    <span className="text-sm font-bold text-[#D4AF37]">{date.timeline}</span>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <div className="text-sm text-gray-600">{date.count}</div>

                    <div className="flex items-center gap-3 text-[#10B981] font-bold text-lg group-hover:gap-5 transition-all">
                      <span>View Projects</span>
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-16 bg-gradient-to-br from-emerald-50 via-white to-amber-50">
        <div className="max-w-[1600px] mx-auto text-center">
          <h2 className="text-4xl font-black text-[#0A0A0A] mb-4">
            Need Help With Timeline Planning?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Our investment advisors can help you choose the right completion date for your goals
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8941E] text-black rounded-xl font-bold hover:shadow-xl transition-all duration-300">
              Schedule Consultation
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
