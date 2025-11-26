'use client';

import { useState } from 'react';
import { Layers, MapPin, TrendingUp, Building2, ArrowRight, Home, ShoppingBag } from 'lucide-react';

const mockMixedUse = [
  {
    id: 1,
    name: 'JLT Mixed-Use Tower',
    location: 'Jumeirah Lake Towers',
    area: '15,000 sq ft',
    priceFrom: 'AED 8.5M',
    roi: '13.5',
    developer: 'DMCC',
    rentalYield: '9.3%',
    mix: 'Retail + Office',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920',
  },
  {
    id: 2,
    name: 'Business Bay Hybrid Complex',
    location: 'Business Bay',
    area: '12,000 sq ft',
    priceFrom: 'AED 7.2M',
    roi: '14.2',
    developer: 'DAMAC',
    rentalYield: '9.8%',
    mix: 'Residential + Commercial',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920',
  },
  {
    id: 3,
    name: 'Dubai Marina Lifestyle Hub',
    location: 'Dubai Marina',
    area: '10,000 sq ft',
    priceFrom: 'AED 6.8M',
    roi: '12.8',
    developer: 'Select Group',
    rentalYield: '8.9%',
    mix: 'F&B + Retail',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920',
  },
  {
    id: 4,
    name: 'Downtown Mixed Development',
    location: 'Downtown Dubai',
    area: '18,000 sq ft',
    priceFrom: 'AED 12.5M',
    roi: '11.5',
    developer: 'Emaar',
    rentalYield: '8.2%',
    mix: 'Hotel + Retail',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200',
  },
  {
    id: 5,
    name: 'City Walk Live-Work-Play',
    location: 'City Walk',
    area: '9,500 sq ft',
    priceFrom: 'AED 7.8M',
    roi: '13.2',
    developer: 'Meraas',
    rentalYield: '9.5%',
    mix: 'Office + Residential',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200',
  },
];

export default function MixedUsePage() {
  const [properties] = useState(mockMixedUse);

  const featuredProperty = properties[0];
  const mediumProperties = properties.slice(1, 3);
  const smallProperties = properties.slice(3);

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
              <Layers className="w-4 h-4 text-[#00C775]" />
              <span className="text-sm font-bold text-[#00C775]">MIXED-USE DEVELOPMENTS</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-white mb-6 leading-[1.05] tracking-tight">
              Mixed-Use Properties
              <br />
              <span className="bg-gradient-to-r from-[#F3C440] via-[#FFD700] to-[#F3C440] bg-clip-text text-transparent">
                Diversified Returns
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-4">
              Integrated live-work-play developments offering multiple revenue streams and balanced risk profiles
            </p>
          </div>
        </section>

        <section className="px-6 lg:px-16 pb-20">
          <div className="max-w-[1600px] mx-auto space-y-6">
            {featuredProperty && (
              <div className="group relative overflow-hidden rounded-3xl border border-[#F3C440]/20 hover:border-[#F3C440]/60 transition-all duration-500 hover:-translate-y-2">
                <div className="relative h-[480px] overflow-hidden">
                  <img src={featuredProperty.image} alt={featuredProperty.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                  <div className="absolute top-6 right-6 z-20">
                    <div className="relative">
                      <div className="absolute inset-0 bg-[#00C775] rounded-2xl blur-xl opacity-60 animate-pulse"></div>
                      <div className="relative bg-black/90 backdrop-blur-xl border-2 border-[#00C775]/60 rounded-2xl px-5 py-3">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-6 h-6 text-[#00C775]" />
                          <span className="text-2xl font-black text-white">{featuredProperty.roi}%</span>
                          <span className="text-xs font-bold text-gray-400">ROI</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-6 left-6 z-20">
                    <div className="bg-[#F3C440]/20 backdrop-blur-xl border border-[#F3C440]/50 rounded-xl px-4 py-2.5 flex items-center gap-2">
                      <Layers className="w-5 h-5 text-[#F3C440]" />
                      <span className="text-sm font-bold text-white">{featuredProperty.mix}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-10 z-20">
                    <h2 className="text-5xl font-black text-white mb-4 group-hover:text-[#F3C440] transition-colors">{featuredProperty.name}</h2>
                    <div className="flex flex-wrap gap-3 mb-6">
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-2">
                        <MapPin className="w-4 h-4 text-[#F3C440]" />
                        <span className="text-sm font-semibold text-white">{featuredProperty.location}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-2">
                        <Building2 className="w-4 h-4 text-[#00C775]" />
                        <span className="text-sm font-semibold text-white">{featuredProperty.area}</span>
                      </div>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-gray-400 uppercase mb-1">Starting From</p>
                        <p className="text-5xl font-black bg-gradient-to-r from-[#00C775] via-[#00D97E] to-[#00C775] bg-clip-text text-transparent">{featuredProperty.priceFrom}</p>
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

            {mediumProperties.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {mediumProperties.map((property) => (
                  <div key={property.id} className="group relative overflow-hidden rounded-3xl border border-[#00C775]/20 hover:border-[#00C775]/60 transition-all duration-500 hover:-translate-y-2">
                    <div className="relative h-[360px] overflow-hidden">
                      <img src={property.image} alt={property.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                      <div className="absolute top-4 right-4 z-20">
                        <div className="bg-black/90 backdrop-blur-xl border border-[#00C775]/60 rounded-xl px-4 py-2">
                          <span className="text-lg font-black text-white">{property.roi}%</span>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                        <h3 className="text-3xl font-black text-white mb-3 group-hover:text-[#00C775] transition-colors">{property.name}</h3>
                        <p className="text-sm text-gray-400 mb-3">{property.mix}</p>
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-xs text-gray-400 uppercase mb-1">From</p>
                            <p className="text-3xl font-black text-[#00C775]">{property.priceFrom}</p>
                          </div>
                          <ArrowRight className="w-6 h-6 text-[#F3C440]" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {smallProperties.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {smallProperties.map((property) => (
                  <div key={property.id} className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-[#00C775]/60 transition-all duration-500 hover:-translate-y-2">
                    <div className="relative h-[320px] overflow-hidden">
                      <img src={property.image} alt={property.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                        <h4 className="text-xl font-black text-white mb-2 group-hover:text-[#00C775] transition-colors">{property.name}</h4>
                        <p className="text-sm text-gray-400 mb-3">{property.mix}</p>
                        <div className="flex items-end justify-between">
                          <p className="text-2xl font-black text-[#00C775]">{property.priceFrom}</p>
                          <ArrowRight className="w-5 h-5 text-[#F3C440]" />
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
