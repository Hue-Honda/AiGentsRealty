'use client';

import { useState } from 'react';
import { TrendingUp, MapPin, Building2, ArrowRight, Shield, Award } from 'lucide-react';

const mockDIFC = [
  {
    id: 1,
    name: 'DIFC Gate District Office',
    area: '15,000 sq ft',
    priceFrom: 'AED 12.5M',
    roi: '11.8',
    developer: 'Dubai Holding',
    rentalYield: '8.2%',
    grade: 'Grade A+',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920',
  },
  {
    id: 2,
    name: 'DIFC Premium Tower Suite',
    area: '10,000 sq ft',
    priceFrom: 'AED 9.8M',
    roi: '10.5',
    developer: 'Emaar',
    rentalYield: '7.8%',
    grade: 'Grade A',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920',
  },
  {
    id: 3,
    name: 'DIFC Boulevard Office',
    area: '8,500 sq ft',
    priceFrom: 'AED 7.8M',
    roi: '11.2',
    developer: 'Dubai Holding',
    rentalYield: '8.0%',
    grade: 'Grade A',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200',
  },
  {
    id: 4,
    name: 'DIFC Financial Center Suite',
    area: '12,000 sq ft',
    priceFrom: 'AED 11.2M',
    roi: '10.8',
    developer: 'Dubai Holding',
    rentalYield: '7.9%',
    grade: 'Grade A+',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200',
  },
  {
    id: 5,
    name: 'DIFC Executive Offices',
    area: '9,000 sq ft',
    priceFrom: 'AED 8.5M',
    roi: '11.0',
    developer: 'Emaar',
    rentalYield: '7.8%',
    grade: 'Grade A',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
  },
];

export default function DIFCPage() {
  const [properties] = useState(mockDIFC);

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] relative overflow-hidden">
      <div className="relative z-10">
        <section className="relative pt-32 pb-16 px-6 lg:px-16">
          <div className="max-w-[1600px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#10B981]/10 border border-[#10B981]/30 rounded-full px-6 py-2 mb-6">
              <Shield className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm font-bold text-[#10B981]">DIFC PREMIUM OFFICES</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-[#0A0A0A] mb-6 leading-[1.05] tracking-tight">
              DIFC
              <br />
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] bg-clip-text text-transparent">
                Financial District Elite
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
              Grade A office spaces in Dubai's international financial center - the region's most prestigious business address
            </p>
          </div>
        </section>

        <section className="px-6 lg:px-16 pb-20">
          <div className="max-w-[1600px] mx-auto space-y-6">
            {properties[0] && (
              <div className="group relative overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative h-[480px] overflow-hidden">
                  <img src={properties[0].image} alt={properties[0].name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                  <div className="absolute top-6 right-6 z-20">
                    <div className="bg-white border-2 border-[#10B981] rounded-2xl px-5 py-3 shadow-md">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-[#10B981]" />
                        <span className="text-2xl font-black text-[#0A0A0A]">{properties[0].roi}%</span>
                        <span className="text-xs font-bold text-gray-600">ROI</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-6 left-6 z-20 flex gap-3">
                    <div className="bg-[#D4AF37]/20 backdrop-blur-xl border border-[#D4AF37] rounded-xl px-4 py-2.5 flex items-center gap-2 shadow-md">
                      <Award className="w-5 h-5 text-[#D4AF37]" />
                      <span className="text-sm font-bold text-white">{properties[0].grade}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-10 z-20">
                    <h2 className="text-5xl font-black text-white mb-4 group-hover:text-[#D4AF37] transition-colors">{properties[0].name}</h2>
                    <div className="flex flex-wrap gap-3 mb-6">
                      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md border border-gray-200 rounded-lg px-4 py-2 shadow-md">
                        <MapPin className="w-4 h-4 text-[#D4AF37]" />
                        <span className="text-sm font-semibold text-[#0A0A0A]">DIFC</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md border border-gray-200 rounded-lg px-4 py-2 shadow-md">
                        <Building2 className="w-4 h-4 text-[#10B981]" />
                        <span className="text-sm font-semibold text-[#0A0A0A]">{properties[0].area}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md border border-gray-200 rounded-lg px-4 py-2 shadow-md">
                        <Shield className="w-4 h-4 text-[#D4AF37]" />
                        <span className="text-sm font-semibold text-[#0A0A0A]">Financial License Ready</span>
                      </div>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-gray-300 uppercase mb-1">Starting From</p>
                        <p className="text-5xl font-black bg-gradient-to-r from-[#10B981] via-[#14C791] to-[#10B981] bg-clip-text text-transparent">{properties[0].priceFrom}</p>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {properties.slice(1).map((property) => (
                <div key={property.id} className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all duration-500 hover:-translate-y-2">
                  <div className="relative h-[300px] overflow-hidden">
                    <img src={property.image} alt={property.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                    <div className="absolute top-3 right-3 z-20">
                      <div className="bg-white border border-[#10B981] rounded-lg px-2.5 py-1.5 shadow-md">
                        <span className="text-sm font-black text-[#0A0A0A]">{property.roi}%</span>
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 z-20">
                      <div className="bg-[#D4AF37]/20 border border-[#D4AF37] rounded-lg px-2 py-1 shadow-md">
                        <span className="text-xs font-bold text-white">{property.grade}</span>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                      <h4 className="text-lg font-black text-white mb-2 group-hover:text-[#10B981] transition-colors line-clamp-2">{property.name}</h4>
                      <p className="text-xs text-gray-300 mb-3">{property.area}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xl font-black text-[#10B981]">{property.priceFrom}</p>
                        <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
