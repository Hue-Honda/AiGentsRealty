'use client';

import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { CanvasAction } from '@/components/canvas/SmartCanvas';
import { useSearchStore } from '@/store/searchStore';
import { Search, Send, MapPin, Building2, TrendingUp, Home, ChevronDown, X } from 'lucide-react';
import { searchLocations, Location } from '@/data/locations';
import MediaSection from '@/components/MediaSection';
import TeamSection from '@/components/TeamSection';

// Background carousel images - Dubai skyline and properties
const carouselImages = [
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&h=1080&fit=crop', // Dubai skyline
  'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1920&h=1080&fit=crop', // Dubai Marina
  'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920&h=1080&fit=crop', // Luxury property
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop', // Modern architecture
  'https://images.unsplash.com/photo-1546412414-e1885259563a?w=1920&h=1080&fit=crop', // Dubai night skyline
];

// Message interface
interface Message {
  role: 'assistant' | 'user';
  content: string;
}

// Filter state interface
interface SearchFilters {
  city: string;
  location: string;
  bedrooms: string | null;
  category: 'residential' | 'commercial';
  propertyType: string | null;
  priceMin: number;
  priceMax: number;
  completionStatus: 'any' | 'off-plan' | 'ready';
  furnished: 'any' | 'yes' | 'no';
}

// Property types
const residentialTypes = ['Apartment', 'Villa', 'Townhouse', 'Penthouse', 'Hotel Apartment', 'Residential Building', 'Villa Compound', 'Residential Floor'];
const commercialTypes = ['Office', 'Retail', 'Warehouse', 'Showroom', 'Mixed Use', 'Shop', 'Commercial Building', 'Commercial Floor'];

// Default suggested districts (will be replaced with real data)
const defaultSuggestions = [
  { type: 'district', name: 'Dubai Marina', slug: 'dubai-marina', icon: MapPin, stats: 'Loading...' },
  { type: 'district', name: 'Downtown Dubai', slug: 'downtown-dubai', icon: Building2, stats: 'Loading...' },
  { type: 'district', name: 'Business Bay', slug: 'business-bay', icon: TrendingUp, stats: 'Loading...' },
  { type: 'district', name: 'Palm Jumeirah', slug: 'palm-jumeirah', icon: MapPin, stats: 'Loading...' },
  { type: 'district', name: 'JVC', slug: 'jumeirah-village-circle', icon: Building2, stats: 'Loading...' },
  { type: 'district', name: 'Dubai Hills', slug: 'dubai-hills-estate', icon: TrendingUp, stats: 'Loading...' },
];

// Area market stats interface
interface AreaStats {
  name: string;
  slug: string;
  avg_price_sqft?: number;
  total_transactions_12m?: number;
  yoy_price_change?: number;
}

// Price range presets
const priceRanges = [
  { label: 'Any', min: 0, max: 50000000 },
  { label: 'Under 1M', min: 0, max: 1000000 },
  { label: '1M - 2M', min: 1000000, max: 2000000 },
  { label: '2M - 5M', min: 2000000, max: 5000000 },
  { label: '5M - 10M', min: 5000000, max: 10000000 },
  { label: '10M+', min: 10000000, max: 50000000 },
];

// Suggestion type
interface Suggestion {
  type: string;
  name: string;
  slug: string;
  icon: typeof MapPin;
  stats: string;
}

export default function GenieV2Page() {
  // Genie Chat State
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I\'m Genie. Use the search filters or ask me about Dubai off-plan investments!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Popular districts with real market data
  const [suggestions, setSuggestions] = useState<Suggestion[]>(defaultSuggestions);

  // Background carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Fetch real market data for popular districts
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/api/market/top-areas?limit=6`);
        if (response.ok) {
          const data = await response.json();
          if (data.areas && data.areas.length > 0) {
            const icons = [MapPin, Building2, TrendingUp, MapPin, Building2, TrendingUp];
            setSuggestions(data.areas.map((area: AreaStats, idx: number) => ({
              type: 'district',
              name: area.name,
              slug: area.slug,
              icon: icons[idx % icons.length],
              stats: area.avg_price_sqft
                ? `AED ${Math.round(area.avg_price_sqft).toLocaleString()}/sqft`
                : area.total_transactions_12m
                  ? `${area.total_transactions_12m.toLocaleString()} sales`
                  : 'View details'
            })));
          }
        }
      } catch (error) {
        console.error('Failed to fetch market data:', error);
      }
    };
    fetchMarketData();
  }, []);

  // Search Filters State
  const [filters, setFilters] = useState<SearchFilters>({
    city: 'Dubai',
    location: '',
    bedrooms: null,
    category: 'residential',
    propertyType: null,
    priceMin: 0,
    priceMax: 50000000,
    completionStatus: 'any',
    furnished: 'any',
  });

  // Dropdown states (for location autocomplete)
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState<Location[]>([]);

  // Ref for location dropdown
  const locationDropdownRef = useRef<HTMLDivElement>(null);

  // Get pending query from store
  const { pendingQuery, clearPendingQuery } = useSearchStore();

  // Quick reply suggestions
  const quickReplies = [
    "Best ROI areas",
    "New launches",
    "Payment plans",
    "Compare areas"
  ];

  // Build search query from filters
  const buildSearchQuery = () => {
    const parts: string[] = [];

    if (filters.location) {
      parts.push(`in ${filters.location}`);
    }

    if (filters.bedrooms) {
      parts.push(`${filters.bedrooms} bedroom`);
    }

    if (filters.completionStatus !== 'any') {
      parts.push(filters.completionStatus === 'off-plan' ? 'off-plan' : 'ready to move');
    }

    if (filters.furnished !== 'any') {
      parts.push(filters.furnished === 'yes' ? 'furnished' : 'unfurnished');
    }

    parts.push(filters.category);

    if (filters.propertyType) {
      parts.push(filters.propertyType.toLowerCase());
    }

    if (filters.priceMin > 0 || filters.priceMax < 50000000) {
      if (filters.priceMin > 0 && filters.priceMax < 50000000) {
        parts.push(`between ${(filters.priceMin / 1000000).toFixed(1)}M and ${(filters.priceMax / 1000000).toFixed(1)}M AED`);
      } else if (filters.priceMin > 0) {
        parts.push(`above ${(filters.priceMin / 1000000).toFixed(1)}M AED`);
      } else {
        parts.push(`under ${(filters.priceMax / 1000000).toFixed(1)}M AED`);
      }
    }

    return `Show me ${parts.join(' ')} properties`;
  };

  // Handle search
  const handleSearch = () => {
    const query = buildSearchQuery();
    sendMessage(query);
  };

  // Send message to chat
  const sendMessage = async (userMessage: string) => {
    if (!userMessage.trim() || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await response.json();

      if (data.message) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error.' }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input.trim());
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: typeof suggestions[0]) => {
    if (suggestion.type === 'district') {
      setFilters(prev => ({ ...prev, location: suggestion.name }));
      sendMessage(`Show me properties in ${suggestion.name}`);
    }
  };

  // Get current price range label
  const getPriceLabel = () => {
    const range = priceRanges.find(r => r.min === filters.priceMin && r.max === filters.priceMax);
    return range?.label || 'Custom';
  };

  // Auto-send pending query
  useEffect(() => {
    if (pendingQuery) {
      const timer = setTimeout(() => {
        sendMessage(pendingQuery);
        clearPendingQuery();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  // Handle location input change with search
  const handleLocationChange = (value: string) => {
    setFilters(prev => ({ ...prev, location: value }));
    if (value.length >= 2) {
      const results = searchLocations(value, filters.city === 'All Cities (UAE)' ? undefined : filters.city, 8);
      setLocationSuggestions(results);
      setShowLocationDropdown(results.length > 0);
    } else {
      setLocationSuggestions([]);
      setShowLocationDropdown(false);
    }
  };

  // Select location from suggestions
  const selectLocation = (location: Location) => {
    setFilters(prev => ({ ...prev, location: location.name }));
    setShowLocationDropdown(false);
    setLocationSuggestions([]);
  };

  // Close location dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(target)) {
        setShowLocationDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const propertyTypes = filters.category === 'residential' ? residentialTypes : commercialTypes;

  return (
    <main className="min-h-screen bg-white pt-10 overflow-y-auto">
      {/* Background Carousel - Full screen behind content */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Carousel Images */}
        {carouselImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={img}
              alt={`Dubai background ${idx + 1}`}
              className="w-full h-full object-cover"
              suppressHydrationWarning
            />
          </div>
        ))}

        {/* Overlay gradient - makes content readable */}
        <div className="absolute inset-0 "></div>

        {/* Subtle color accents */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#10B981]/10 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[120px]"></div>
        </div>
      </div>


      {/* Search + Chat Section with container */}
      <div className="relative max-w-[1800px] mx-auto w-full px-4 lg:px-8 py-3">

        {/* ROW 1: Search Aggregator + Chat */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0">

          {/* LEFT: Smart Search Aggregator */}
          <div className="lg:col-span-7 bg-white border border-gray-200 shadow-lg rounded-2xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-2 p-4 border-b border-gray-200 bg-gradient-to-r from-[#10B981]/5 to-transparent">
              <div className="w-10 h-10 bg-[#10B981] rounded-xl flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#0A0A0A]">Smart Search</h2>
                <p className="text-xs text-gray-500">Find your perfect property</p>
              </div>
            </div>

            {/* Search Filters */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto scrollbar-hidden">

              {/* Location Row */}
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-2 block">Location</label>
                <div className="flex gap-2">
                  {/* City Dropdown */}
                  <div className="relative">
                    <select
                      value={filters.city}
                      onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                      className="appearance-none bg-[#F9FAFB] border border-gray-200 rounded-lg px-3 py-2.5 pr-8 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#10B981] transition-all cursor-pointer"
                    >
                      <option value="Dubai">Dubai</option>
                      <option value="Abu Dhabi">Abu Dhabi</option>
                      <option value="All Cities (UAE)">All Cities (UAE)</option>
                      <option value="Ras al Khaimah">Ras al Khaimah</option>
                      <option value="Sharjah">Sharjah</option>
                      <option value="Fujairah">Fujairah</option>
                      <option value="Ajman">Ajman</option>
                      <option value="Umm al Quwain">Umm al Quwain</option>
                      <option value="Al Ain">Al Ain</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  </div>

                  {/* Location Search with Autocomplete */}
                  <div className="flex-1 relative" ref={locationDropdownRef}>
                    <input
                      type="text"
                      value={filters.location}
                      onChange={(e) => handleLocationChange(e.target.value)}
                      onFocus={() => filters.location.length >= 2 && locationSuggestions.length > 0 && setShowLocationDropdown(true)}
                      placeholder="Enter Neighborhood or Building"
                      className="w-full bg-[#F9FAFB] border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-[#0A0A0A] placeholder-gray-400 focus:outline-none focus:border-[#10B981] transition-all"
                    />
                    {filters.location && (
                      <button
                        onClick={() => {
                          setFilters(prev => ({ ...prev, location: '' }));
                          setLocationSuggestions([]);
                          setShowLocationDropdown(false);
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0A0A0A]"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {/* Location Autocomplete Dropdown */}
                    {showLocationDropdown && locationSuggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg overflow-hidden z-30 shadow-xl max-h-[200px] overflow-y-auto">
                        {locationSuggestions.map((loc, idx) => (
                          <button
                            key={idx}
                            onClick={() => selectLocation(loc)}
                            className="w-full px-3 py-2 text-left hover:bg-[#10B981]/10 transition-all flex items-center gap-2"
                          >
                            {loc.type === 'building' ? (
                              <Building2 className="w-3 h-3 text-gray-400" />
                            ) : loc.type === 'community' ? (
                              <Home className="w-3 h-3 text-[#10B981]" />
                            ) : (
                              <MapPin className="w-3 h-3 text-[#10B981]" />
                            )}
                            <div className="flex-1 min-w-0">
                              <span className="text-xs text-[#0A0A0A] block truncate">{loc.name}</span>
                              <span className="text-[9px] text-gray-500">{loc.type} • {loc.city}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-2 block">Bedrooms</label>
                <div className="flex gap-2">
                  {['Studio', '1', '2', '3', '4+'].map((bed) => (
                    <button
                      key={bed}
                      onClick={() => setFilters(prev => ({
                        ...prev,
                        bedrooms: prev.bedrooms === bed ? null : bed
                      }))}
                      className={`flex-1 py-2.5 px-2 rounded-lg text-xs font-medium transition-all ${
                        filters.bedrooms === bed
                          ? 'bg-[#10B981] text-white shadow-md'
                          : 'bg-[#F9FAFB] border border-gray-200 text-gray-600 hover:border-[#10B981] hover:text-[#0A0A0A]'
                      }`}
                    >
                      {bed === 'Studio' ? 'Studio' : `${bed} BR`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category: Residential / Commercial */}
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-2 block">Category</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, category: 'residential', propertyType: null }))}
                    className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                      filters.category === 'residential'
                        ? 'bg-[#10B981] text-white shadow-md'
                        : 'bg-[#F9FAFB] border border-gray-200 text-gray-600 hover:border-[#10B981] hover:text-[#0A0A0A]'
                    }`}
                  >
                    <Home className="w-3.5 h-3.5" />
                    Residential
                  </button>
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, category: 'commercial', propertyType: null }))}
                    className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                      filters.category === 'commercial'
                        ? 'bg-[#D4AF37] text-white shadow-md'
                        : 'bg-[#F9FAFB] border border-gray-200 text-gray-600 hover:border-[#D4AF37] hover:text-[#0A0A0A]'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    Commercial
                  </button>
                </div>
              </div>

              {/* Completion Status & Furnished - Same Row */}
              <div className="grid grid-cols-2 gap-3">
                {/* Completion Status */}
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-2 block">Completion Status</label>
                  <div className="flex gap-1">
                    {[
                      { value: 'any', label: 'Any' },
                      { value: 'off-plan', label: 'Off-Plan' },
                      { value: 'ready', label: 'Ready' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFilters(prev => ({ ...prev, completionStatus: option.value as 'any' | 'off-plan' | 'ready' }))}
                        className={`flex-1 py-2 px-1 rounded-lg text-xs font-medium transition-all ${
                          filters.completionStatus === option.value
                            ? 'bg-[#10B981] text-white shadow-md'
                            : 'bg-[#F9FAFB] border border-gray-200 text-gray-600 hover:border-[#10B981] hover:text-[#0A0A0A]'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Furnished */}
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-2 block">Furnished</label>
                  <div className="flex gap-1">
                    {[
                      { value: 'any', label: 'Any' },
                      { value: 'yes', label: 'Yes' },
                      { value: 'no', label: 'No' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFilters(prev => ({ ...prev, furnished: option.value as 'any' | 'yes' | 'no' }))}
                        className={`flex-1 py-2 px-1 rounded-lg text-xs font-medium transition-all ${
                          filters.furnished === option.value
                            ? 'bg-[#10B981] text-white shadow-md'
                            : 'bg-[#F9FAFB] border border-gray-200 text-gray-600 hover:border-[#10B981] hover:text-[#0A0A0A]'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Property Type & Price Range - Side by Side */}
              <div className="grid grid-cols-2 gap-3">
                {/* Property Type */}
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-2 block">Property Type</label>
                  <div className="relative">
                    <select
                      value={filters.propertyType || ''}
                      onChange={(e) => setFilters(prev => ({ ...prev, propertyType: e.target.value || null }))}
                      className="w-full appearance-none bg-[#F9FAFB] border border-gray-200 rounded-lg px-3 py-2.5 pr-8 text-xs text-[#0A0A0A] focus:outline-none focus:border-[#10B981] transition-all cursor-pointer"
                    >
                      <option value="">Any Type</option>
                      {propertyTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-2 block">Price Range</label>
                  <div className="relative">
                    <select
                      value={`${filters.priceMin}-${filters.priceMax}`}
                      onChange={(e) => {
                        const [min, max] = e.target.value.split('-').map(Number);
                        setFilters(prev => ({ ...prev, priceMin: min, priceMax: max }));
                      }}
                      className="w-full appearance-none bg-[#F9FAFB] border border-gray-200 rounded-lg px-3 py-2.5 pr-8 text-xs text-[#0A0A0A] focus:outline-none focus:border-[#10B981] transition-all cursor-pointer"
                    >
                      {priceRanges.map((range) => (
                        <option key={range.label} value={`${range.min}-${range.max}`}>{range.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                Search Properties
              </button>
            </div>
          </div>

          {/* RIGHT: Genie Chat */}
          <div className="lg:col-span-5 bg-white border border-gray-200 shadow-lg rounded-2xl overflow-hidden flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-gradient-to-r from-[#D4AF37]/10 to-transparent">
              <div className="relative">
                <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-md">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#10B981] rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#0A0A0A]">Genie</h2>
                <p className="text-xs text-[#10B981]">AI Property Advisor</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hidden">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-4 py-3 text-sm ${
                      msg.role === 'user'
                        ? 'bg-[#10B981] text-white'
                        : 'bg-[#F9FAFB] border border-gray-200 text-gray-700'
                    }`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-1 mb-1">
                        <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-semibold text-[#D4AF37]">GENIE</span>
                      </div>
                    )}
                    {msg.role === 'assistant' ? (
                      <div className="prose prose-sm max-w-none prose-p:my-0.5 prose-strong:text-[#10B981]">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p>{msg.content}</p>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#F9FAFB] border border-gray-200 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-[#10B981] rounded-full animate-spin"></div>
                      <span className="text-xs text-gray-500">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Replies */}
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {quickReplies.map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(reply)}
                  className="text-xs bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] px-3 py-1 rounded-full hover:bg-[#10B981]/20 transition-all"
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <form onSubmit={handleChatSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about properties..."
                  className="flex-1 bg-[#F9FAFB] border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-[#0A0A0A] placeholder-gray-400 focus:outline-none focus:border-[#10B981] transition-all"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-[#10B981] hover:bg-[#059669] text-white px-4 rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* ROW 2: Property/District Suggestions */}
        <div className="mt-4 bg-white border border-gray-200 shadow-lg rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-[#0A0A0A]">Popular Districts</h3>
            <span className="text-xs text-gray-500">Click to explore</span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {suggestions.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(item)}
                  className="group bg-[#F9FAFB] border border-gray-200 hover:border-[#10B981] rounded-lg p-3 text-left transition-all hover:shadow-md"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-4 h-4 text-[#10B981] group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-semibold text-[#0A0A0A] truncate">{item.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{item.stats}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Full-width sections outside the container */}
      {/* Media Section - Full Width */}
      <MediaSection />

      {/* Team Section - Full Width */}
      <TeamSection />
    </main>
  );
}
