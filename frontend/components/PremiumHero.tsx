'use client';

import { useState } from 'react';
import { Search, Sparkles, TrendingUp, Shield, Star, MessageSquare, Send, MapPin, DollarSign, Home, Calendar } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function PremiumHero() {
  // Smart Filters State
  const [filters, setFilters] = useState({
    location: '',
    priceMin: '',
    priceMax: '',
    bedrooms: '',
    propertyType: '',
    completion: ''
  });

  // Genie Chat State
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I\'m Genie. Ask me about Dubai off-plan investments!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickReplies = [
    "Best ROI in 2024",
    "3BR under 2M AED",
    "Downtown projects",
    "Payment plans"
  ];

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Filters:', filters);
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await response.json();

      if (data.success) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error.' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-[#0A0A0A] overflow-hidden">
      {/* CINEMATIC DARK GRADIENT BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A]">
        {/* Soft emerald beams creating depth */}
        <div className="absolute top-[10%] left-[15%] w-[500px] h-[800px] bg-[#10B981]/10 rotate-[25deg] blur-[120px]"></div>
        <div className="absolute top-[5%] right-[10%] w-[600px] h-[700px] bg-[#10B981]/8 -rotate-[15deg] blur-[140px]"></div>

        {/* Gold particles/bokeh */}
        <div className="absolute bottom-[30%] left-[8%] w-[250px] h-[250px] bg-[#D4AF37]/8 rounded-full blur-[90px]"></div>
        <div className="absolute top-[25%] right-[20%] w-[180px] h-[180px] bg-[#D4AF37]/10 rounded-full blur-[70px]"></div>

        {/* Subtle bokeh particles */}
        <div className="absolute top-[20%] left-[45%] w-3 h-3 bg-[#D4AF37]/40 rounded-full blur-sm animate-pulse"></div>
        <div className="absolute top-[50%] left-[75%] w-2 h-2 bg-[#10B981]/30 rounded-full blur-sm"></div>
        <div className="absolute top-[70%] left-[20%] w-3 h-3 bg-[#D4AF37]/50 rounded-full blur-sm animate-pulse delay-300"></div>

        {/* Gold architectural line illustration */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent"></div>
      </div>

      <div className="relative max-w-[1800px] mx-auto px-6 lg:px-16 pt-20 pb-32">
        {/* IMPACTFUL HEADLINE WITH GOLD TYPOGRAPHY */}
        <div className="text-center mb-16 relative z-10">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight mb-6">
            <span className="block">Find Your</span>
            <span className="relative inline-block mt-2">
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4E5B8] to-[#D4AF37] bg-clip-text text-transparent">
                Dream Oasis
              </span>
              {/* Gold micro-underline with subtle glow */}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_20px_rgba(212,175,55,0.6)]"></div>
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed mb-12">
            AI-powered property discovery in Dubai's most exclusive locations
          </p>

          {/* IRREGULAR FEATURE BADGES */}
          <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-5">
            {/* Badge 1 - Larger, gold outline with emerald fill on hover */}
            <div className="group px-6 py-3 bg-[#0A0A0A]/60 backdrop-blur-xl border border-[#D4AF37]/40 rounded-full hover:bg-[#10B981]/10 hover:border-[#10B981]/60 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:-translate-y-1">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#10B981]" />
                <span className="text-sm font-bold text-[#D4AF37] group-hover:text-[#10B981]">Live ROI & Comps</span>
              </div>
            </div>

            {/* Badge 2 - Medium, gold text on black glass */}
            <div className="group px-5 py-2.5 bg-[#D4AF37]/5 backdrop-blur-xl border border-[#D4AF37]/30 rounded-full hover:bg-[#D4AF37]/15 hover:border-[#D4AF37]/60 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:-translate-y-1">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-sm font-semibold text-white">RERA/DLD Compliant</span>
              </div>
            </div>

            {/* Badge 3 - Smaller pill, emerald accent */}
            <div className="group px-5 py-2.5 bg-[#10B981]/5 backdrop-blur-xl border border-[#10B981]/30 rounded-full hover:bg-[#10B981]/15 hover:border-[#10B981]/60 transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:-translate-y-1">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                <span className="text-sm font-medium text-gray-300 group-hover:text-white">Personalized Shortlists</span>
              </div>
            </div>
          </div>
        </div>

        {/* ASYMMETRIC TWO-COLUMN AREA - BROKEN GRID */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* LEFT: SMART FILTERS - Floating Card (Larger, Lower) */}
          <div className="lg:col-span-7 lg:mt-12 relative">
            {/* Layered depth background */}
            <div className="absolute -inset-4 bg-[#10B981]/10 rounded-[2rem] blur-2xl"></div>

            <div className="relative bg-[#0A0A0A]/80 backdrop-blur-2xl border border-[#D4AF37]/30 rounded-3xl p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.9)] hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] transition-all duration-500">
              {/* Gold micro-border top accent */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent"></div>

              {/* Header with AI icon */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941E] rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                  <Sparkles className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Smart Filters</h2>
                  <p className="text-xs text-[#10B981]">AI-Enhanced Search</p>
                </div>
              </div>

              <form onSubmit={handleFilterSubmit} className="space-y-6">
                {/* Broken grid layout - non-uniform */}

                {/* Location - Full width */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
                    <MapPin className="w-4 h-4 text-[#10B981]" />
                    Location
                  </label>
                  <select
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    className="w-full bg-[#1A1A1A]/60 border border-[#10B981]/30 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#10B981] focus:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
                  >
                    <option value="">Select Area</option>
                    <option value="downtown">Downtown Dubai</option>
                    <option value="marina">Dubai Marina</option>
                    <option value="jvc">Jumeirah Village Circle</option>
                    <option value="hills">Dubai Hills Estate</option>
                  </select>
                </div>

                {/* Price Range - Broken grid (60/40 split) */}
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-7">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
                      <DollarSign className="w-4 h-4 text-[#D4AF37]" />
                      Min Price (AED)
                    </label>
                    <input
                      type="text"
                      placeholder="500,000"
                      value={filters.priceMin}
                      onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                      className="w-full bg-[#1A1A1A]/60 border border-[#D4AF37]/30 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] focus:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all"
                    />
                  </div>
                  <div className="col-span-5">
                    <label className="text-sm font-semibold text-gray-300 mb-2 block">Max</label>
                    <input
                      type="text"
                      placeholder="5M"
                      value={filters.priceMax}
                      onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                      className="w-full bg-[#1A1A1A]/60 border border-[#D4AF37]/30 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] transition-all"
                    />
                  </div>
                </div>

                {/* Bedrooms - Pill buttons */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-3">
                    <Home className="w-4 h-4 text-[#10B981]" />
                    Bedrooms
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {['1', '2', '3', '4+'].map((bed) => (
                      <button
                        key={bed}
                        type="button"
                        onClick={() => setFilters({ ...filters, bedrooms: bed })}
                        className={`py-3.5 rounded-xl font-bold transition-all ${
                          filters.bedrooms === bed
                            ? 'bg-gradient-to-r from-[#10B981] to-[#059669] text-white shadow-[0_0_25px_rgba(16,185,129,0.5)]'
                            : 'bg-[#1A1A1A]/60 text-gray-400 border border-[#10B981]/20 hover:border-[#10B981] hover:text-white'
                        }`}
                      >
                        {bed}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Property Type & Completion - Side by side irregular */}
                <div className="grid grid-cols-5 gap-4">
                  <div className="col-span-3">
                    <label className="text-sm font-semibold text-gray-300 mb-2 block">Property Type</label>
                    <select
                      value={filters.propertyType}
                      onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                      className="w-full bg-[#1A1A1A]/60 border border-[#D4AF37]/30 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#D4AF37] transition-all"
                    >
                      <option value="">All Types</option>
                      <option value="apartment">Apartment</option>
                      <option value="villa">Villa</option>
                      <option value="townhouse">Townhouse</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="flex items-center gap-1 text-sm font-semibold text-gray-300 mb-2">
                      <Calendar className="w-3 h-3 text-[#10B981]" />
                      Year
                    </label>
                    <select
                      value={filters.completion}
                      onChange={(e) => setFilters({ ...filters, completion: e.target.value })}
                      className="w-full bg-[#1A1A1A]/60 border border-[#10B981]/30 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#10B981] transition-all"
                    >
                      <option value="">Any</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                    </select>
                  </div>
                </div>

                {/* Search Button - Gold gradient */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8941E] text-black font-bold py-4 rounded-xl hover:shadow-[0_0_40px_rgba(212,175,55,0.7)] transition-all duration-300 flex items-center justify-center gap-2 mt-8"
                >
                  <Search className="w-5 h-5" />
                  Search Properties
                </button>
              </form>

              {/* Bottom gold accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent"></div>
            </div>
          </div>

          {/* RIGHT: GENIE CHAT - Floating AI Panel (Narrower, Higher, Overlapping) */}
          <div className="lg:col-span-5 lg:-mt-8 relative">
            {/* Emerald glow depth layer */}
            <div className="absolute -inset-6 bg-[#10B981]/15 rounded-[2rem] blur-3xl"></div>

            <div className="relative bg-[#0A0A0A]/90 backdrop-blur-2xl border-2 border-[#10B981]/40 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.4)] transition-all duration-500">
              {/* Emerald top accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#10B981] to-transparent"></div>

              {/* Header with Gold Orb Avatar */}
              <div className="bg-gradient-to-br from-[#10B981]/20 to-transparent p-6 border-b border-[#10B981]/20">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8941E] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.6)]">
                      <Sparkles className="w-8 h-8 text-black animate-pulse" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#10B981] rounded-full border-2 border-[#0A0A0A]"></div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Genie</h2>
                    <p className="text-sm text-[#10B981]">AI Property Advisor</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-[350px] overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-[#10B981]/30">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-5 py-3 ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8941E] text-black shadow-[0_4px_15px_rgba(212,175,55,0.3)]'
                          : 'bg-[#1A1A1A]/80 border border-[#10B981]/30 text-gray-300 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                      }`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></div>
                          <span className="text-xs font-semibold text-[#10B981]">GENIE</span>
                        </div>
                      )}
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-[#1A1A1A]/80 border border-[#10B981]/30 rounded-2xl px-5 py-3 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#10B981] animate-spin" />
                        <span className="text-sm text-gray-400">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Reply Chips */}
              <div className="px-6 pb-4 flex flex-wrap gap-2">
                {quickReplies.map((reply, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInput(reply)}
                    className="text-xs bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] px-3 py-1.5 rounded-full hover:bg-[#10B981]/20 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
                  >
                    {reply}
                  </button>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-6 border-t border-[#10B981]/20 bg-[#0A0A0A]/60">
                <form onSubmit={handleChatSubmit} className="flex gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about ROI, payment plans..."
                    className="flex-1 bg-[#1A1A1A]/60 border border-[#10B981]/30 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#10B981] focus:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-gradient-to-r from-[#10B981] to-[#059669] text-white px-6 rounded-xl hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
