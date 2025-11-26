'use client';

import { Waves, ArrowRight, Trees, Building, Heart, Zap, Leaf, Users } from 'lucide-react';
import Link from 'next/link';

const lifestyles = [
  {
    slug: 'waterfront',
    title: 'Waterfront Living',
    description: 'Wake up to stunning marina or beach views with direct water access',
    icon: Waves,
    badge: 'Premium',
    badgeColor: 'bg-[#10B981]',
    count: '15 Projects',
    highlights: ['Beach access', 'Marina views', 'Water sports']
  },
  {
    slug: 'golf-course',
    title: 'Golf Course Communities',
    description: 'Live beside championship golf courses with exclusive club access',
    icon: Trees,
    badge: 'Exclusive',
    badgeColor: 'bg-[#D4AF37]',
    count: '8 Projects',
    highlights: ['Golf access', 'Green views', 'Country club']
  },
  {
    slug: 'urban',
    title: 'Urban Living',
    description: 'Downtown locations with easy access to metro, malls, and nightlife',
    icon: Building,
    badge: 'Convenient',
    badgeColor: 'bg-[#10B981]',
    count: '25 Projects',
    highlights: ['Metro access', 'Restaurants', 'Shopping']
  },
  {
    slug: 'family-oriented',
    title: 'Family Communities',
    description: 'Safe neighborhoods with schools, parks, and kid-friendly amenities',
    icon: Users,
    badge: 'Family First',
    badgeColor: 'bg-[#10B981]',
    count: '20 Projects',
    highlights: ['Schools nearby', 'Parks', 'Safe community']
  },
  {
    slug: 'luxury',
    title: 'Ultra-Luxury',
    description: 'Opulent living with concierge, private elevators, and premium finishes',
    icon: Heart,
    badge: 'Ultra-Premium',
    badgeColor: 'bg-[#D4AF37]',
    count: '12 Projects',
    highlights: ['Concierge 24/7', 'Premium finishes', 'Exclusive']
  },
  {
    slug: 'smart-homes',
    title: 'Smart Homes',
    description: 'Cutting-edge technology with AI, automation, and sustainable features',
    icon: Zap,
    badge: 'Tech-Forward',
    badgeColor: 'bg-[#10B981]',
    count: '18 Projects',
    highlights: ['Smart systems', 'Automation', 'Energy efficient']
  },
  {
    slug: 'sustainable',
    title: 'Sustainable Living',
    description: 'Eco-friendly developments with green building certifications',
    icon: Leaf,
    badge: 'Eco-Friendly',
    badgeColor: 'bg-[#10B981]',
    count: '10 Projects',
    highlights: ['LEED certified', 'Solar power', 'Green spaces']
  }
];

export default function BrowseByLifestyle() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] py-20">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-[20%] w-[400px] h-[400px] bg-[#10B981]/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-10 right-[15%] w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[140px]"></div>
        </div>

        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#10B981]/10 border border-[#10B981]/30 rounded-full mb-6">
              <Heart className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm font-semibold text-[#10B981]">Live Your Way</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Browse by
              <br />
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#B8941E] bg-clip-text text-transparent">
                Lifestyle
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Find a community that matches your lifestyle. From waterfront luxury to family-friendly neighborhoods.
            </p>
          </div>
        </div>
      </section>

      {/* Lifestyle Cards Grid */}
      <section className="py-16 px-6 lg:px-16">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lifestyles.map((lifestyle) => {
              const Icon = lifestyle.icon;
              return (
                <Link
                  key={lifestyle.slug}
                  href={`/projects?lifestyle=${lifestyle.slug}`}
                  className="group relative bg-[#1A1A1A] rounded-2xl overflow-hidden border border-white/5 hover:border-[#10B981]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(16,185,129,0.2)]"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-14 h-14 bg-[#10B981]/10 rounded-xl flex items-center justify-center group-hover:bg-[#10B981]/20 transition-colors">
                        <Icon className="w-7 h-7 text-[#10B981]" />
                      </div>
                      <span className={`${lifestyle.badgeColor} px-3 py-1.5 rounded-full text-xs font-bold text-white`}>
                        {lifestyle.badge}
                      </span>
                    </div>

                    <h2 className="text-2xl font-black text-white mb-3 group-hover:text-[#10B981] transition-colors">
                      {lifestyle.title}
                    </h2>

                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {lifestyle.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2 mb-6">
                      {lifestyle.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
                          <span className="text-xs text-gray-500">{highlight}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="text-sm text-gray-400">{lifestyle.count}</div>

                      <div className="flex items-center gap-2 text-[#10B981] font-bold text-sm group-hover:gap-3 transition-all">
                        <span>Explore</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-16 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A]">
        <div className="max-w-[1600px] mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4">
            Find Your Perfect Lifestyle Match
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Not sure which lifestyle suits you best? Take our quiz or speak with our lifestyle consultants
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8941E] text-black rounded-xl font-bold hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-all duration-300">
              Take Lifestyle Quiz
            </button>
            <Link
              href="/projects"
              className="px-8 py-4 bg-[#0A0A0A]/80 backdrop-blur-xl border-2 border-[#10B981]/40 text-white rounded-xl font-bold hover:bg-[#10B981]/10 hover:border-[#10B981]/60 transition-all duration-300"
            >
              Browse All Projects
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
