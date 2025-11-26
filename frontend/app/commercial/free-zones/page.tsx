'use client';

import { useState } from 'react';
import { TrendingUp, MapPin, Building2, ArrowRight, Globe, Package } from 'lucide-react';

const mockFreeZones = [
  {
    id: 1,
    name: 'DMCC Free Zone Office',
    location: 'JLT',
    area: '8,000 sq ft',
    priceFrom: 'AED 4.5M',
    roi: '13.5',
    developer: 'DMCC',
    rentalYield: '9.3%',
    benefits: '100% Ownership',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920',
  },
  {
    id: 2,
    name: 'Dubai South Free Zone Warehouse',
    location: 'Dubai South',
    area: '35,000 sq ft',
    priceFrom: 'AED 8.8M',
    roi: '15.2',
    developer: 'Dubai South',
    rentalYield: '10.8%',
    benefits: 'Tax-Free',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920',
  },
  {
    id: 3,
    name: 'Jebel Ali Free Zone',
    location: 'Jebel Ali',
    area: '25,000 sq ft',
    priceFrom: 'AED 6.5M',
    roi: '14.8',
    developer: 'DP World',
    rentalYield: '10.2%',
    benefits: 'Customs Exemption',
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=1920',
  },
  {
    id: 4,
    name: 'Dubai Airport Free Zone',
    location: 'Deira',
    area: '12,000 sq ft',
    priceFrom: 'AED 5.2M',
    roi: '13.2',
    developer: 'DAFZA',
    rentalYield: '9.5%',
    benefits: 'Import/Export',
    image: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1200',
  },
  {
    id: 5,
    name: 'Dubai Silicon Oasis',
    location: 'DSO',
    area: '6,500 sq ft',
    priceFrom: 'AED 3.8M',
    roi: '12.5',
    developer: 'DSOA',
    rentalYield: '8.9%',
    benefits: 'Tech Hub',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200',
  },
];

export default function FreeZonesPage() {
  const [properties] = useState(mockFreeZones);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00C775]/5 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#F3C440]/5 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#00C775 1px, transparent 1px), linear-gradient(90deg, #00C775 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}></div>
      </div>

      <div className="relative z-10">
        <section className="relative pt-32 pb-16 px-6 lg:px-16">
          <div className="max-w-[1600px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#00C775]/10 border border-[#00C775]/30 rounded-full px-6 py-2 mb-6">
              <Globe className="w-4 h-4 text-[#00C775]" />
              <span className="text-sm font-bold text-[#00C775]">TAX-FREE ZONES</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-white mb-6 leading-[1.05] tracking-tight">
              Dubai Free Zones
              <br />
              <span className="bg-gradient-to-r from-[#F3C440] via-[#FFD700] to-[#F3C440] bg-clip-text text-transparent">
                100% Foreign Ownership
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-4">
              Tax-free commercial properties with 100% foreign ownership, customs exemptions, and full repatriation
            </p>

            {/* Benefits Bar */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="bg-[#0D0D0D]/80 backdrop-blur-xl border border-[#00C775]/30 rounded-2xl px-6 py-3">
                <p className="text-sm font-bold text-[#00C775]">0% Tax</p>
              </div>
              <div className="bg-[#0D0D0D]/80 backdrop-blur-xl border border-[#00C775]/30 rounded-2xl px-6 py-3">
                <p className="text-sm font-bold text-[#00C775]">100% Ownership</p>
              </div>
              <div className="bg-[#0D0D0D]/80 backdrop-blur-xl border border-[#00C775]/30 rounded-2xl px-6 py-3">
                <p className="text-sm font-bold text-[#00C775]">Customs Exemption</p>
              </div>
              <div className="bg-[#0D0D0D]/80 backdrop-blur-xl border border-[#00C775]/30 rounded-2xl px-6 py-3">
                <p className="text-sm font-bold text-[#00C775]">Full Repatriation</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 lg:px-16 pb-20">
          <div className="max-w-[1600px] mx-auto space-y-6">
            {properties[0] && (
              <div className="group relative overflow-hidden rounded-3xl border border-[#F3C440]/20 hover:border-[#F3C440]/60 transition-all duration-500 hover:-translate-y-2">
                <div className="relative h-[480px] overflow-hidden">
                  <img src={properties[0].image} alt={properties[0].name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                  <div className="absolute top-6 right-6 z-20">
                    <div className="relative">
                      <div className="absolute inset-0 bg-[#00C775] rounded-2xl blur-xl opacity-60 animate-pulse"></div>
                      <div className="relative bg-black/90 backdrop-blur-xl border-2 border-[#00C775]/60 rounded-2xl px-5 py-3">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-6 h-6 text-[#00C775]" />
                          <span className="text-2xl font-black text-white">{properties[0].roi}%</span>
                          <span className="text-xs font-bold text-gray-400">ROI</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-6 left-6 z-20">
                    <div className="bg-[#F3C440]/20 backdrop-blur-xl border border-[#F3C440]/50 rounded-xl px-4 py-2.5 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-[#F3C440]" />
                      <span className="text-sm font-bold text-white">{properties[0].benefits}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-10 z-20">
                    <h2 className="text-5xl font-black text-white mb-4 group-hover:text-[#F3C440] transition-colors">{properties[0].name}</h2>
                    <div className="flex flex-wrap gap-3 mb-6">
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-2">
                        <MapPin className="w-4 h-4 text-[#F3C440]" />
                        <span className="text-sm font-semibold text-white">{properties[0].location}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-2">
                        <Building2 className="w-4 h-4 text-[#00C775]" />
                        <span className="text-sm font-semibold text-white">{properties[0].area}</span>
                      </div>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-gray-400 uppercase mb-1">Starting From</p>
                        <p className="text-5xl font-black bg-gradient-to-r from-[#00C775] via-[#00D97E] to-[#00C775] bg-clip-text text-transparent">{properties[0].priceFrom}</p>
                      </div>
                      <div className="flex items-center gap-3 text-[#F3C440] font-bold text-lg group-hover:gap-5 transition-all">
                        <span>View Details</span>
                        <div className="w-12 h-12 rounded-full border-2 border-[#F3C440] flex items-center justify-center group-hover:bg-[#F3C440] group-hover:text-black transition-all">
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
                <div key={property.id} className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-[#00C775]/60 transition-all duration-500 hover:-translate-y-2">
                  <div className="relative h-[300px] overflow-hidden">
                    <img src={property.image} alt={property.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                    <div className="absolute top-3 right-3 z-20">
                      <div className="bg-black/90 border border-[#00C775]/60 rounded-lg px-2.5 py-1.5">
                        <span className="text-sm font-black text-white">{property.roi}%</span>
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 z-20">
                      <div className="bg-[#F3C440]/20 border border-[#F3C440]/40 rounded-lg px-2 py-1">
                        <span className="text-xs font-bold text-white">{property.benefits}</span>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                      <h4 className="text-lg font-black text-white mb-2 group-hover:text-[#00C775] transition-colors line-clamp-2">{property.name}</h4>
                      <p className="text-xs text-gray-400 mb-3">{property.location}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xl font-black text-[#00C775]">{property.priceFrom}</p>
                        <ArrowRight className="w-4 h-4 text-[#F3C440]" />
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
