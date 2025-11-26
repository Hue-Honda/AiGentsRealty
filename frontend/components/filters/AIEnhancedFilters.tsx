'use client';

import { useState } from 'react';
import { Search, Sparkles, MapPin, Home, Bed } from 'lucide-react';

export default function AIEnhancedFilters() {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [budget, setBudget] = useState(10);
  const [furnished, setFurnished] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ location, propertyType, bedrooms, budget, furnished });
  };

  const formatBudget = (value: number) => {
    if (value >= 50) return '50M+ AED';
    return `${value}M AED`;
  };

  return (
    <div className="w-full bg-[#0A1212]/60 backdrop-blur-xl rounded-3xl border border-[#10B981]/30 shadow-[0_0_30px_rgba(16,185,129,0.2)] p-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {/* Header Label */}
        <div className="inline-flex items-center gap-2 self-start px-4 py-2 bg-[#F2C94C]/10 border border-[#F2C94C]/30 rounded-full">
          <Sparkles className="w-4 h-4 text-[#F2C94C]" />
          <span className="text-sm font-bold text-[#F2C94C] uppercase tracking-wide">AI-Enhanced Filters</span>
        </div>

        {/* Location Dropdown */}
        <div className="flex flex-col gap-3">
          <label className="text-xs font-bold text-[#F2C94C] uppercase tracking-wider flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5" />
            Location
          </label>
          <div className="relative">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-[#101A1A] text-white rounded-xl px-4 py-3.5 appearance-none cursor-pointer border border-[#10B981]/20 hover:border-[#10B981]/40 focus:border-[#10B981] focus:outline-none transition-all"
            >
              <option value="">Select Area</option>
              <option value="downtown">Downtown Dubai</option>
              <option value="marina">Dubai Marina</option>
              <option value="jvc">Jumeirah Village Circle</option>
              <option value="hills">Dubai Hills Estate</option>
              <option value="creek">Dubai Creek Harbour</option>
              <option value="palm">Palm Jumeirah</option>
              <option value="business-bay">Business Bay</option>
            </select>
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Type & Beds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Property Type */}
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold text-[#F2C94C] uppercase tracking-wider flex items-center gap-2">
              <Home className="w-3.5 h-3.5" />
              Type
            </label>
            <div className="relative">
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full bg-[#101A1A] text-white rounded-xl px-4 py-3.5 appearance-none cursor-pointer border border-[#10B981]/20 hover:border-[#10B981]/40 focus:border-[#10B981] focus:outline-none transition-all"
              >
                <option value="">All Types</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="townhouse">Townhouse</option>
                <option value="penthouse">Penthouse</option>
              </select>
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Bedrooms */}
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold text-[#F2C94C] uppercase tracking-wider flex items-center gap-2">
              <Bed className="w-3.5 h-3.5" />
              Beds
            </label>
            <div className="relative">
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full bg-[#101A1A] text-white rounded-xl px-4 py-3.5 appearance-none cursor-pointer border border-[#10B981]/20 hover:border-[#10B981]/40 focus:border-[#10B981] focus:outline-none transition-all"
              >
                <option value="">Any</option>
                <option value="1">1 Bed</option>
                <option value="2">2 Beds</option>
                <option value="3">3 Beds</option>
                <option value="4">4 Beds</option>
                <option value="5+">5+ Beds</option>
              </select>
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Budget Slider */}
        <div className="flex flex-col gap-4">
          <label className="text-xs font-bold text-[#F2C94C] uppercase tracking-wider">Budget Range</label>

          <div className="relative pt-2">
            {/* Slider Track */}
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full h-2 bg-[#10B981]/20 rounded-full appearance-none cursor-pointer slider-thumb"
              style={{
                background: `linear-gradient(to right, #10B981 0%, #10B981 ${(budget / 50) * 100}%, rgba(16, 185, 129, 0.2) ${(budget / 50) * 100}%, rgba(16, 185, 129, 0.2) 100%)`
              }}
            />

            {/* Labels */}
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-500">1M AED</span>
              <span className="text-sm font-bold text-[#10B981]">{formatBudget(budget)}</span>
              <span className="text-xs text-gray-500">50M+ AED</span>
            </div>
          </div>
        </div>

        {/* Furnished Toggle */}
        <div className="flex flex-col gap-3">
          <label className="text-xs font-bold text-[#F2C94C] uppercase tracking-wider">Preferences</label>
          <button
            type="button"
            onClick={() => setFurnished(!furnished)}
            className={`w-full px-6 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 ${
              furnished
                ? 'bg-[#10B981]/20 border-2 border-[#10B981] shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                : 'bg-[#101A1A] border border-[#10B981]/20 hover:border-[#10B981]/40'
            }`}
          >
            Furnished Only
          </button>
        </div>

        {/* Discover Properties Button */}
        <button
          type="submit"
          className="group relative w-full h-[60px] bg-gradient-to-r from-[#F2C94C] to-[#D99F2B] rounded-xl font-bold text-black text-lg hover:shadow-[0_0_30px_rgba(242,201,76,0.6)] transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#F2C94C] to-[#D99F2B] opacity-0 group-hover:opacity-100 rounded-xl blur-sm transition-opacity"></div>
          <Search className="w-6 h-6 relative z-10" />
          <span className="relative z-10">Discover Properties</span>
        </button>
      </form>

      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #10B981;
          cursor: pointer;
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.6);
          border: 3px solid #0A1212;
        }

        .slider-thumb::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #10B981;
          cursor: pointer;
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.6);
          border: 3px solid #0A1212;
        }
      `}</style>
    </div>
  );
}
