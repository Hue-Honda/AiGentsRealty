'use client';

import { MapPin, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const locations = [
  {
    slug: 'downtown',
    name: 'Downtown Dubai',
    description: 'Iconic skyline, Burj Khalifa, Dubai Mall - the heart of luxury living',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    badge: 'Prime Location',
    badgeColor: 'bg-[#D4AF37]',
    count: '18 Projects',
    avgPrice: 'From AED 2.5M'
  },
  {
    slug: 'marina',
    name: 'Dubai Marina',
    description: 'Waterfront living with world-class restaurants and beach access',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800',
    badge: 'Waterfront',
    badgeColor: 'bg-[#10B981]',
    count: '22 Projects',
    avgPrice: 'From AED 1.8M'
  },
  {
    slug: 'hills',
    name: 'Dubai Hills Estate',
    description: 'Golf course community with parks, schools, and family-friendly amenities',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    badge: 'Family Living',
    badgeColor: 'bg-[#10B981]',
    count: '15 Projects',
    avgPrice: 'From AED 1.2M'
  },
  {
    slug: 'creek',
    name: 'Dubai Creek Harbour',
    description: 'Waterfront destination with Dubai Creek Tower and modern infrastructure',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800',
    badge: 'New District',
    badgeColor: 'bg-[#D4AF37]',
    count: '12 Projects',
    avgPrice: 'From AED 1.5M'
  },
  {
    slug: 'palm-jumeirah',
    name: 'Palm Jumeirah',
    description: 'World-famous man-made island with ultra-luxury beachfront properties',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    badge: 'Ultra-Luxury',
    badgeColor: 'bg-[#D4AF37]',
    count: '8 Projects',
    avgPrice: 'From AED 5M+'
  },
  {
    slug: 'south',
    name: 'Dubai South',
    description: 'Near Al Maktoum Airport - emerging hub with affordable prices',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    badge: 'Best Value',
    badgeColor: 'bg-[#10B981]',
    count: '14 Projects',
    avgPrice: 'From AED 700K'
  }
];

export default function BrowseByLocation() {
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
              <MapPin className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm font-semibold text-[#10B981]">Explore Dubai's Districts</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Browse by
              <br />
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#B8941E] bg-clip-text text-transparent">
                Location
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Discover off-plan projects across Dubai's most desirable neighborhoods. From downtown luxury to waterfront living.
            </p>
          </div>
        </div>
      </section>

      {/* Location Cards Grid */}
      <section className="py-16 px-6 lg:px-16">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location) => (
              <Link
                key={location.slug}
                href={`/projects?location=${location.slug}`}
                className="group relative bg-[#1A1A1A] rounded-2xl overflow-hidden border border-white/5 hover:border-[#10B981]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(16,185,129,0.2)]"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={location.image}
                    alt={location.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`${location.badgeColor} px-3 py-1.5 rounded-full text-xs font-bold text-white`}>
                      {location.badge}
                    </span>
                  </div>

                  {/* Count */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <span className="text-xs font-semibold text-white">{location.count}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-2xl font-black text-white mb-3 group-hover:text-[#10B981] transition-colors">
                    {location.name}
                  </h2>

                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {location.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="text-sm">
                      <span className="text-gray-500">Avg. Price</span>
                      <div className="text-[#D4AF37] font-bold">{location.avgPrice}</div>
                    </div>

                    <div className="flex items-center gap-2 text-[#10B981] font-bold text-sm group-hover:gap-3 transition-all">
                      <span>Explore</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-16 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A]">
        <div className="max-w-[1600px] mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4">
            Need Location Recommendations?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Our area specialists can help you choose the perfect neighborhood for your lifestyle and investment goals
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8941E] text-black rounded-xl font-bold hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-all duration-300">
              Talk to Specialist
            </button>
            <Link
              href="/areas"
              className="px-8 py-4 bg-[#0A0A0A]/80 backdrop-blur-xl border-2 border-[#10B981]/40 text-white rounded-xl font-bold hover:bg-[#10B981]/10 hover:border-[#10B981]/60 transition-all duration-300"
            >
              View All Areas
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
