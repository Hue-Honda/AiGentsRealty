'use client';

import { useState } from 'react';
import { ChevronDown, MapPin, TrendingUp, Sparkles, Building2, ArrowRight, X, Car, Zap } from 'lucide-react';

const mockShowrooms = [
  {
    id: 1,
    name: 'Sheikh Zayed Road Showroom',
    location: 'Sheikh Zayed Road',
    area: '8,000 sq ft',
    priceFrom: 'AED 5.5M',
    roi: '13.8',
    developer: 'Nakheel',
    rentalYield: '9.2%',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1920',
  },
  {
    id: 2,
    name: 'Motor City Auto Showroom',
    location: 'Motor City',
    area: '12,000 sq ft',
    priceFrom: 'AED 7.2M',
    roi: '14.5',
    developer: 'Union Properties',
    rentalYield: '9.8%',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920',
  },
  {
    id: 3,
    name: 'Al Quoz Industrial Showroom',
    location: 'Al Quoz',
    area: '6,500 sq ft',
    priceFrom: 'AED 3.8M',
    roi: '12.2',
    developer: 'Private',
    rentalYield: '8.5%',
    image: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=1920',
  },
  {
    id: 4,
    name: 'Business Bay Display Center',
    location: 'Business Bay',
    area: '5,000 sq ft',
    priceFrom: 'AED 4.2M',
    roi: '11.8',
    developer: 'DAMAC',
    rentalYield: '8.2%',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
  },
  {
    id: 5,
    name: 'Dubai Investment Park Showroom',
    location: 'Dubai Investment Park',
    area: '10,000 sq ft',
    priceFrom: 'AED 5.8M',
    roi: '13.5',
    developer: 'Nakheel',
    rentalYield: '9.0%',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200',
  },
  {
    id: 6,
    name: 'Jumeirah Premium Showroom',
    location: 'Jumeirah',
    area: '7,500 sq ft',
    priceFrom: 'AED 6.5M',
    roi: '12.8',
    developer: 'Meraas',
    rentalYield: '8.8%',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200',
  },
  {
    id: 7,
    name: 'Dubai South Logistics Showroom',
    location: 'Dubai South',
    area: '9,000 sq ft',
    priceFrom: 'AED 4.8M',
    roi: '14.2',
    developer: 'Dubai South',
    rentalYield: '9.5%',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
  },
];

export default function ShowroomsPage() {
  const [properties] = useState(mockShowrooms);
  const [filters, setFilters] = useState({
    location: 'all',
    area: 'all',
    priceRange: 'all',
  });

  const featuredProperty = properties[0];
  const mediumProperties = properties.slice(1, 3);
  const smallProperties = properties.slice(3, 7);

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] relative overflow-hidden">
      <div className="relative z-10">
        <section className="relative pt-32 pb-16 px-6 lg:px-16">
          <div className="max-w-[1600px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#10B981]/10 border border-[#10B981]/30 rounded-full px-6 py-2 mb-6">
              <Car className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm font-bold text-[#10B981]">PREMIUM SHOWROOMS</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-[#0A0A0A] mb-6 leading-[1.05] tracking-tight">
              Premium Showrooms
              <br />
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] bg-clip-text text-transparent">
                in Dubai
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
              High-visibility showroom spaces perfect for automotive, luxury goods, and premium brands
            </p>
          </div>
        </section>

        <section className="px-6 lg:px-16 pb-20">
          <div className="max-w-[1600px] mx-auto space-y-6">
            {featuredProperty && (
              <div className="group relative overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative h-[480px] overflow-hidden">
                  <img src={featuredProperty.image} alt={featuredProperty.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                  <div className="absolute top-6 right-6 z-20">
                    <div className="relative">
                      <div className="relative bg-white border-2 border-[#10B981] rounded-2xl px-5 py-3 shadow-lg">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-6 h-6 text-[#10B981]" />
                          <span className="text-2xl font-black text-[#0A0A0A]">{featuredProperty.roi}%</span>
                          <span className="text-xs font-bold text-gray-600">ROI</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-10 z-20">
                    <h2 className="text-5xl font-black text-white mb-4 group-hover:text-[#D4AF37] transition-colors">{featuredProperty.name}</h2>
                    <div className="flex flex-wrap gap-3 mb-6">
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-2">
                        <MapPin className="w-4 h-4 text-[#D4AF37]" />
                        <span className="text-sm font-semibold text-white">{featuredProperty.location}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-2">
                        <Building2 className="w-4 h-4 text-[#10B981]" />
                        <span className="text-sm font-semibold text-white">{featuredProperty.area}</span>
                      </div>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-gray-400 uppercase mb-1">Starting From</p>
                        <p className="text-5xl font-black bg-gradient-to-r from-[#10B981] via-[#34D399] to-[#10B981] bg-clip-text text-transparent">{featuredProperty.priceFrom}</p>
                      </div>
                      <div className="flex items-center gap-3 text-[#D4AF37] font-bold text-lg group-hover:gap-5 transition-all">
                        <span>View Details</span>
                        <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-white transition-all">
                          <ArrowRight className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {mediumProperties.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {mediumProperties.map((property) => (
                  <div key={property.id} className="group relative overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all duration-500 hover:-translate-y-2">
                    <div className="relative h-[360px] overflow-hidden">
                      <img src={property.image} alt={property.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                      <div className="absolute top-4 right-4 z-20">
                        <div className="bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-md">
                          <span className="text-lg font-black text-[#0A0A0A]">{property.roi}%</span>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                        <h3 className="text-3xl font-black text-white mb-3 group-hover:text-[#10B981] transition-colors">{property.name}</h3>
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-xs text-gray-400 uppercase mb-1">From</p>
                            <p className="text-3xl font-black text-[#10B981]">{property.priceFrom}</p>
                          </div>
                          <ArrowRight className="w-6 h-6 text-[#D4AF37]" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {smallProperties.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {smallProperties.map((property) => (
                  <div key={property.id} className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all duration-500 hover:-translate-y-2">
                    <div className="relative h-[300px] overflow-hidden">
                      <img src={property.image} alt={property.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                      <div className="absolute top-3 right-3 z-20">
                        <div className="bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 shadow-md">
                          <span className="text-sm font-black text-[#0A0A0A]">{property.roi}%</span>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                        <h4 className="text-lg font-black text-white mb-2 group-hover:text-[#10B981] transition-colors line-clamp-2">{property.name}</h4>
                        <p className="text-xs text-gray-400 mb-3">{property.location}</p>
                        <p className="text-xl font-black text-[#10B981]">{property.priceFrom}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
