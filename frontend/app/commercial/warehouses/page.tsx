'use client';

import { useState } from 'react';
import { Warehouse, MapPin, TrendingUp, Building2, ArrowRight, Package, Truck } from 'lucide-react';

const mockWarehouses = [
  {
    id: 1,
    name: 'Dubai South Mega Warehouse',
    location: 'Dubai South',
    area: '50,000 sq ft',
    priceFrom: 'AED 12.5M',
    roi: '15.8',
    developer: 'Dubai South',
    rentalYield: '11.2%',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920',
  },
  {
    id: 2,
    name: 'Jebel Ali Logistics Center',
    location: 'Jebel Ali',
    area: '35,000 sq ft',
    priceFrom: 'AED 8.8M',
    roi: '14.5',
    developer: 'DP World',
    rentalYield: '10.5%',
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=1920',
  },
  {
    id: 3,
    name: 'Al Quoz Storage Facility',
    location: 'Al Quoz',
    area: '25,000 sq ft',
    priceFrom: 'AED 6.2M',
    roi: '13.2',
    developer: 'Private',
    rentalYield: '9.5%',
    image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=1920',
  },
  {
    id: 4,
    name: 'Dubai Investment Park Warehouse',
    location: 'Dubai Investment Park',
    area: '40,000 sq ft',
    priceFrom: 'AED 9.5M',
    roi: '14.8',
    developer: 'Nakheel',
    rentalYield: '10.8%',
    image: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1200',
  },
  {
    id: 5,
    name: 'National Industries Park Warehouse',
    location: 'National Industries Park',
    area: '30,000 sq ft',
    priceFrom: 'AED 7.2M',
    roi: '13.8',
    developer: 'Tecom',
    rentalYield: '9.8%',
    image: 'https://images.unsplash.com/photo-1565035010268-a3816f98589a?w=1200',
  },
];

export default function WarehousesPage() {
  const [properties] = useState(mockWarehouses);

  const featuredProperty = properties[0];
  const mediumProperties = properties.slice(1, 3);
  const smallProperties = properties.slice(3);

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] relative overflow-hidden">
      <div className="relative z-10">
        <section className="relative pt-32 pb-16 px-6 lg:px-16">
          <div className="max-w-[1600px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#10B981]/10 border border-[#10B981]/30 rounded-full px-6 py-2 mb-6">
              <Warehouse className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm font-bold text-[#10B981]">LOGISTICS & STORAGE</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-[#0A0A0A] mb-6 leading-[1.05] tracking-tight">
              Industrial Warehouses
              <br />
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4E5B0] to-[#D4AF37] bg-clip-text text-transparent">
                & Logistics Hubs
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
              Strategic warehouse and logistics facilities in Dubai's key industrial zones with exceptional ROI
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
                    <div className="bg-white border-2 border-[#10B981] rounded-2xl px-5 py-3 shadow-md">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-[#10B981]" />
                        <span className="text-2xl font-black text-[#0A0A0A]">{featuredProperty.roi}%</span>
                        <span className="text-xs font-bold text-gray-600">ROI</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-6 left-6 z-20 flex gap-3">
                    <div className="bg-[#D4AF37]/20 backdrop-blur-xl border border-[#D4AF37] rounded-xl px-4 py-2.5 flex items-center gap-2">
                      <Package className="w-5 h-5 text-[#D4AF37]" />
                      <span className="text-sm font-bold text-white">Logistics Ready</span>
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
                        <p className="text-xs text-gray-300 uppercase mb-1">Starting From</p>
                        <p className="text-5xl font-black bg-gradient-to-r from-[#10B981] via-[#14D995] to-[#10B981] bg-clip-text text-transparent">{featuredProperty.priceFrom}</p>
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
                        <div className="bg-white border border-[#10B981] rounded-xl px-4 py-2 shadow-md">
                          <span className="text-lg font-black text-[#0A0A0A]">{property.roi}%</span>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                        <h3 className="text-3xl font-black text-white mb-3 group-hover:text-[#10B981] transition-colors">{property.name}</h3>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {smallProperties.map((property) => (
                  <div key={property.id} className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all duration-500 hover:-translate-y-2">
                    <div className="relative h-[320px] overflow-hidden">
                      <img src={property.image} alt={property.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                        <h4 className="text-xl font-black text-white mb-2 group-hover:text-[#10B981] transition-colors">{property.name}</h4>
                        <p className="text-sm text-gray-300 mb-3">{property.location}</p>
                        <div className="flex items-end justify-between">
                          <p className="text-2xl font-black text-[#10B981]">{property.priceFrom}</p>
                          <ArrowRight className="w-5 h-5 text-[#D4AF37]" />
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
