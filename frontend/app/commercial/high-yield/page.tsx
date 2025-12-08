'use client';

import { useState } from 'react';
import { TrendingUp, MapPin, Building2, ArrowRight, Zap, Award } from 'lucide-react';

const mockHighYield = [
  {
    id: 1,
    name: 'Dubai South High-Yield Complex',
    location: 'Dubai South',
    area: '45,000 sq ft',
    priceFrom: 'AED 11.2M',
    roi: '16.8',
    developer: 'Dubai South',
    rentalYield: '12.5%',
    type: 'Warehouse',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920',
  },
  {
    id: 2,
    name: 'La Mer Premium Retail',
    location: 'La Mer',
    area: '2,200 sq ft',
    priceFrom: 'AED 4.8M',
    roi: '15.5',
    developer: 'Meraas',
    rentalYield: '11.2%',
    type: 'Retail',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1920',
  },
  {
    id: 3,
    name: 'Business Bay Executive Tower',
    location: 'Business Bay',
    area: '8,500 sq ft',
    priceFrom: 'AED 4.5M',
    roi: '15.2',
    developer: 'DAMAC',
    rentalYield: '10.8%',
    type: 'Office',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920',
  },
  {
    id: 4,
    name: 'Motor City Showroom Hub',
    location: 'Motor City',
    area: '14,000 sq ft',
    priceFrom: 'AED 8.2M',
    roi: '14.8',
    developer: 'Union Properties',
    rentalYield: '10.5%',
    type: 'Showroom',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200',
  },
  {
    id: 5,
    name: 'JLT Mixed-Use Investment',
    location: 'Jumeirah Lake Towers',
    area: '11,000 sq ft',
    priceFrom: 'AED 6.8M',
    roi: '14.2',
    developer: 'DMCC',
    rentalYield: '10.2%',
    type: 'Mixed-Use',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200',
  },
  {
    id: 6,
    name: 'Jebel Ali Logistics Park',
    location: 'Jebel Ali',
    area: '38,000 sq ft',
    priceFrom: 'AED 9.5M',
    roi: '15.8',
    developer: 'DP World',
    rentalYield: '11.5%',
    type: 'Warehouse',
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200',
  },
];

export default function HighYieldPage() {
  const [properties] = useState(mockHighYield);

  const featuredProperty = properties[0];
  const mediumProperties = properties.slice(1, 3);
  const smallProperties = properties.slice(3);

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] relative overflow-hidden">
      <div className="relative z-10">
        <section className="relative pt-32 pb-16 px-6 lg:px-16">
          <div className="max-w-[1600px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#10B981]/10 border border-[#10B981]/30 rounded-full px-6 py-2 mb-6">
              <Zap className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm font-bold text-[#10B981]">HIGH-YIELD INVESTMENTS</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-[#0A0A0A] mb-6 leading-[1.05] tracking-tight">
              High-Yield Commercial
              <br />
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] bg-clip-text text-transparent">
                14%+ ROI Guaranteed
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
              Exceptional ROI opportunities handpicked by AI - guaranteed rental yields of 10%+ annually
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

                  {/* PREMIUM ROI BADGE */}
                  <div className="absolute top-6 right-6 z-20">
                    <div className="bg-white border-2 border-[#10B981] rounded-2xl px-6 py-4 shadow-lg">
                      <div className="flex items-center gap-2">
                        <Award className="w-7 h-7 text-[#D4AF37]" />
                        <div>
                          <div className="text-3xl font-black text-[#0A0A0A]">{featuredProperty.roi}%</div>
                          <div className="text-xs font-bold text-gray-600 uppercase">Guaranteed ROI</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-6 left-6 z-20 flex flex-col gap-3">
                    <div className="bg-[#D4AF37]/20 backdrop-blur-xl border border-[#D4AF37]/50 rounded-xl px-4 py-2.5 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-[#D4AF37]" />
                      <span className="text-sm font-bold text-white">High-Yield</span>
                    </div>
                    <div className="bg-[#10B981]/20 backdrop-blur-xl border border-[#10B981]/50 rounded-xl px-4 py-2.5">
                      <span className="text-sm font-bold text-white">{featuredProperty.type}</span>
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
                      <div className="flex items-center gap-2 bg-[#10B981]/20 backdrop-blur-md border border-[#10B981]/40 rounded-lg px-4 py-2">
                        <TrendingUp className="w-4 h-4 text-[#10B981]" />
                        <span className="text-sm font-semibold text-white">{featuredProperty.rentalYield} Rental Yield</span>
                      </div>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-gray-300 uppercase mb-1">Investment From</p>
                        <p className="text-5xl font-black bg-gradient-to-r from-[#10B981] via-[#34D399] to-[#10B981] bg-clip-text text-transparent">{featuredProperty.priceFrom}</p>
                      </div>
                      <div className="flex items-center gap-3 text-[#D4AF37] font-bold text-lg group-hover:gap-5 transition-all">
                        <span>View Investment</span>
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
                        <div className="bg-white border-2 border-[#10B981] rounded-xl px-4 py-2 shadow-md">
                          <div className="flex items-center gap-1.5">
                            <Award className="w-5 h-5 text-[#D4AF37]" />
                            <span className="text-lg font-black text-[#0A0A0A]">{property.roi}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-4 left-4 z-20">
                        <div className="bg-[#D4AF37]/20 backdrop-blur-xl border border-[#D4AF37]/40 rounded-lg px-3 py-1.5">
                          <span className="text-xs font-bold text-white">{property.type}</span>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                        <h3 className="text-3xl font-black text-white mb-3 group-hover:text-[#10B981] transition-colors">{property.name}</h3>
                        <p className="text-sm text-gray-300 mb-3">{property.rentalYield} Rental Yield</p>
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-xs text-gray-300 uppercase mb-1">From</p>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {smallProperties.map((property) => (
                  <div key={property.id} className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all duration-500 hover:-translate-y-2">
                    <div className="relative h-[320px] overflow-hidden">
                      <img src={property.image} alt={property.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                      <div className="absolute top-3 right-3 z-20">
                        <div className="bg-white border-2 border-[#10B981] rounded-lg px-2.5 py-1.5 shadow-md">
                          <span className="text-sm font-black text-[#0A0A0A]">{property.roi}%</span>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                        <h4 className="text-lg font-black text-white mb-2 group-hover:text-[#10B981] transition-colors line-clamp-2">{property.name}</h4>
                        <p className="text-xs text-gray-300 mb-3">{property.type} • {property.rentalYield}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xl font-black text-[#10B981]">{property.priceFrom}</p>
                          <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                        </div>
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
