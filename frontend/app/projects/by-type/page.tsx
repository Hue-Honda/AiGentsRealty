'use client';

import { Home, ArrowRight, Sparkles, Building2 } from 'lucide-react';
import Link from 'next/link';

const propertyTypes = [
  {
    slug: 'apartments',
    name: 'Apartments',
    description: 'Modern high-rise living with stunning city views and world-class amenities',
    icon: Building2,
    badge: 'Most Popular',
    badgeColor: 'bg-[#10B981]',
    count: '45 Projects',
    priceRange: 'From AED 800K'
  },
  {
    slug: 'villas',
    name: 'Villas',
    description: 'Luxury standalone homes with private gardens and pools',
    icon: Home,
    badge: 'Premium',
    badgeColor: 'bg-[#D4AF37]',
    count: '18 Projects',
    priceRange: 'From AED 2.5M'
  },
  {
    slug: 'townhouses',
    name: 'Townhouses',
    description: 'Family-friendly homes with community amenities and green spaces',
    icon: Home,
    badge: 'Family Living',
    badgeColor: 'bg-[#10B981]',
    count: '22 Projects',
    priceRange: 'From AED 1.5M'
  },
  {
    slug: 'penthouses',
    name: 'Penthouses',
    description: 'Ultra-luxury top-floor residences with panoramic views',
    icon: Building2,
    badge: 'Ultra-Luxury',
    badgeColor: 'bg-[#D4AF37]',
    count: '8 Projects',
    priceRange: 'From AED 5M'
  }
];

export default function BrowseByType() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#10B981]/10 border border-[#10B981]/30 rounded-full mb-6">
              <Home className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm font-semibold text-[#10B981]">Property Categories</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-[#0A0A0A] mb-6 leading-tight">
              Browse by
              <br />
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#B8941E] bg-clip-text text-transparent">
                Property Type
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Find the perfect property type for your lifestyle. From modern apartments to luxury villas.
            </p>
          </div>
        </div>
      </section>

      {/* Property Type Cards */}
      <section className="py-16 px-6 lg:px-16">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {propertyTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Link
                  key={type.slug}
                  href={`/projects?type=${type.slug}`}
                  className="group relative bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-md hover:shadow-lg hover:border-[#10B981]/50 transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="p-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-16 h-16 bg-[#10B981]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#10B981]/20 transition-colors">
                        <Icon className="w-8 h-8 text-[#10B981]" />
                      </div>
                      <span className={`${type.badgeColor} px-4 py-2 rounded-full text-xs font-bold text-white`}>
                        {type.badge}
                      </span>
                    </div>

                    <h2 className="text-4xl font-black text-[#0A0A0A] mb-4 group-hover:text-[#10B981] transition-colors">
                      {type.name}
                    </h2>

                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                      {type.description}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">{type.count}</div>
                        <div className="text-lg font-bold text-[#D4AF37]">{type.priceRange}</div>
                      </div>

                      <div className="flex items-center gap-3 text-[#10B981] font-bold text-lg group-hover:gap-5 transition-all">
                        <span>Explore</span>
                        <ArrowRight className="w-6 h-6" />
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
      <section className="py-20 px-6 lg:px-16 bg-gradient-to-br from-emerald-50 via-white to-amber-50">
        <div className="max-w-[1600px] mx-auto text-center">
          <h2 className="text-4xl font-black text-[#0A0A0A] mb-4">
            Not Sure Which Type is Right for You?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Our property consultants can help you choose the perfect property type based on your needs
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8941E] text-black rounded-xl font-bold hover:shadow-xl transition-all duration-300">
              Get Expert Advice
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
