'use client';

import { useState } from 'react';
import { Search, MapPin, DollarSign, Home, Calendar, TrendingUp } from 'lucide-react';

export default function SmartFilters() {
  const [filters, setFilters] = useState({
    location: '',
    priceMin: '',
    priceMax: '',
    bedrooms: '',
    propertyType: '',
    completion: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Filters:', filters);
  };

  return (
    <div className="bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-2xl p-8 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center">
          <Search className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Smart Filters</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Location */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
            <MapPin className="w-4 h-4 text-[#10B981]" />
            Location
          </label>
          <select
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="w-full bg-[#0A0A0A] border border-[#10B981]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#10B981] transition-colors"
          >
            <option value="">Select Area</option>
            <option value="downtown">Downtown Dubai</option>
            <option value="marina">Dubai Marina</option>
            <option value="jvc">Jumeirah Village Circle</option>
            <option value="hills">Dubai Hills Estate</option>
            <option value="south">Dubai South</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
            <DollarSign className="w-4 h-4 text-[#D4AF37]" />
            Price Range (AED)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Min"
              value={filters.priceMin}
              onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
              className="bg-[#0A0A0A] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
            <input
              type="text"
              placeholder="Max"
              value={filters.priceMax}
              onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
              className="bg-[#0A0A0A] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
            <Home className="w-4 h-4 text-[#10B981]" />
            Bedrooms
          </label>
          <div className="grid grid-cols-4 gap-2">
            {['1', '2', '3', '4+'].map((bed) => (
              <button
                key={bed}
                type="button"
                onClick={() => setFilters({ ...filters, bedrooms: bed })}
                className={`py-3 rounded-xl font-semibold transition-all ${
                  filters.bedrooms === bed
                    ? 'bg-[#10B981] text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                    : 'bg-[#0A0A0A] text-gray-400 border border-[#10B981]/30 hover:border-[#10B981]'
                }`}
              >
                {bed}
              </button>
            ))}
          </div>
        </div>

        {/* Property Type */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
            <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
            Property Type
          </label>
          <select
            value={filters.propertyType}
            onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
            className="w-full bg-[#0A0A0A] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
          >
            <option value="">All Types</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="townhouse">Townhouse</option>
            <option value="penthouse">Penthouse</option>
          </select>
        </div>

        {/* Completion Date */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
            <Calendar className="w-4 h-4 text-[#10B981]" />
            Completion Date
          </label>
          <select
            value={filters.completion}
            onChange={(e) => setFilters({ ...filters, completion: e.target.value })}
            className="w-full bg-[#0A0A0A] border border-[#10B981]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#10B981] transition-colors"
          >
            <option value="">Any Time</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027+">2027+</option>
          </select>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8941E] text-black font-bold py-4 rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Search className="w-5 h-5" />
          Search Properties
        </button>
      </form>
    </div>
  );
}
