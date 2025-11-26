'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, Sparkles, MessageSquare, X, Zap, Cpu } from 'lucide-react';
import GenieChat from './GenieChat';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AISearchHero() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showChatbot, setShowChatbot] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Refs for animations
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaButtonsRef = useRef<HTMLDivElement>(null);
  const statsCardRef = useRef<HTMLDivElement>(null);
  const emeraldGlowRef = useRef<HTMLDivElement>(null);
  const goldGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. STAGGERED HEADLINE REVEAL (Apple-style)
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        gsap.fromTo(
          words,
          {
            opacity: 0,
            y: 50,
            rotateX: -90,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power4.out',
            delay: 0.3,
          }
        );

        // Gold shimmer on "Dream Oasis"
        const highlightWords = headlineRef.current.querySelectorAll('.highlight-word');
        gsap.to(highlightWords, {
          backgroundPosition: '200% center',
          duration: 3,
          repeat: -1,
          ease: 'none',
        });
      }

      // 2. EMERALD AURA GLOW PULSE
      if (emeraldGlowRef.current && goldGlowRef.current) {
        gsap.to(emeraldGlowRef.current, {
          scale: 1.2,
          opacity: 0.3,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        gsap.to(goldGlowRef.current, {
          scale: 1.15,
          opacity: 0.25,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1,
        });
      }

      // 3. BADGE ANIMATION
      if (badgeRef.current) {
        gsap.fromTo(
          badgeRef.current,
          { opacity: 0, scale: 0.8, y: -20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)', delay: 0.1 }
        );

        // Pulsing dot
        const dot = badgeRef.current.querySelector('.pulse-dot');
        if (dot) {
          gsap.to(dot, {
            scale: 1.3,
            opacity: 0.6,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut',
          });
        }
      }

      // 4. SUBHEADLINE FADE-IN
      if (subheadlineRef.current) {
        gsap.fromTo(
          subheadlineRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 1.2 }
        );
      }

      // 5. SEARCH BAR SLIDE-IN
      if (searchBarRef.current) {
        gsap.fromTo(
          searchBarRef.current,
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out', delay: 1.5 }
        );
      }

      // 6. CTA BUTTONS FADE-IN WITH STAGGER
      if (ctaButtonsRef.current) {
        const buttons = ctaButtonsRef.current.querySelectorAll('button, a');
        gsap.fromTo(
          buttons,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out', delay: 1.8 }
        );
      }

      // 7. STATS CARD REVEAL
      if (statsCardRef.current) {
        gsap.fromTo(
          statsCardRef.current,
          { opacity: 0, x: 50, rotateY: -15 },
          { opacity: 1, x: 0, rotateY: 0, duration: 1.2, ease: 'power3.out', delay: 0.6 }
        );

        // Floating animation
        gsap.to(statsCardRef.current, {
          y: -10,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 2,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  // SEARCH INPUT EXPANSION ANIMATION
  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    if (searchBarRef.current) {
      gsap.to(searchBarRef.current, {
        scale: 1.02,
        boxShadow: '0 0 60px rgba(16, 185, 129, 0.4)',
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
    if (searchBarRef.current) {
      gsap.to(searchBarRef.current, {
        scale: 1,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const exampleQueries = [
    "3BR villa under 2M with 80/20 payment",
    "Best ROI projects in Dubai South",
    "Emaar apartments completing in 2025"
  ];

  return (
    <section className="relative bg-[#0A0A0A] overflow-hidden min-h-screen flex items-center">
      {/* Futuristic background with emerald + gold glows */}
      <div className="absolute inset-0">
        {/* Emerald glow (AI intelligence) */}
        <div
          ref={emeraldGlowRef}
          className="absolute top-20 right-[10%] w-[600px] h-[600px] bg-[#10B981]/20 rounded-full blur-[120px]"
        ></div>
        {/* Gold glow (luxury) */}
        <div
          ref={goldGlowRef}
          className="absolute bottom-20 left-[10%] w-[500px] h-[500px] bg-[#D4AF37]/15 rounded-full blur-[100px]"
        ></div>
        {/* Geometric emerald shape behind headline */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-br from-[#10B981]/5 to-transparent rotate-12 rounded-[100px] blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-[1800px] mx-auto px-6 lg:px-16 py-20">
        {/* BROKEN GRID: Asymmetric 3-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* LEFT COLUMN: Main Hero Content (spans 7) */}
          <div className="lg:col-span-7 space-y-10">
            {/* AI Badge with emerald glow */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 bg-[#10B981]/10 backdrop-blur-xl border border-[#10B981]/30 px-4 py-2 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            >
              <div className="pulse-dot w-2 h-2 bg-[#10B981] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
              <span className="text-[#10B981] text-sm font-semibold tracking-wide">AI-POWERED DISCOVERY</span>
              <Cpu className="w-4 h-4 text-[#10B981]" />
            </div>

            {/* Cinematic Headline with gold underline */}
            <div className="space-y-4">
              <h1
                ref={headlineRef}
                className="text-6xl sm:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter"
              >
                <span className="word inline-block">Find</span>{' '}
                <span className="word inline-block">Your</span>
                <span className="block mt-3 relative inline-block">
                  <span className="highlight-word inline-block bg-gradient-to-r from-[#10B981] via-[#D4AF37] to-[#10B981] bg-clip-text text-transparent bg-[length:200%_100%]">
                    <span className="word inline-block">Dream</span>{' '}
                    <span className="word inline-block">Oasis</span>
                  </span>
                  {/* Gold underline */}
                  <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
                </span>
              </h1>
              <p
                ref={subheadlineRef}
                className="text-xl lg:text-2xl text-gray-400 max-w-2xl font-light leading-relaxed"
              >
                AI-powered property discovery with <span className="text-[#10B981] font-semibold">real-time ROI analysis</span>.
                <span className="text-[#D4AF37]"> 100+ exclusive</span> off-plan projects.
              </p>
            </div>

            {/* Futuristic Search Bar with emerald glow + gold outline */}
            <div className="relative" ref={searchBarRef}>
              <form onSubmit={handleSearch}>
                {/* Emerald neon glow on hover */}
                <div className="absolute -inset-2 bg-gradient-to-r from-[#10B981] via-[#D4AF37] to-[#10B981] rounded-3xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-700"></div>

                {/* Glass panel with gold micro-border */}
                <div className="relative bg-[#1A1A1A]/80 backdrop-blur-2xl border-2 border-[#D4AF37]/40 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.8)] group hover:border-[#10B981]/60 transition-all duration-300">
                  <div className="flex items-stretch">
                    {/* AI Orb Icon */}
                    <div className="flex items-center justify-center px-6 bg-gradient-to-br from-[#10B981] to-[#059669]">
                      <Sparkles className="w-6 h-6 text-white animate-pulse" />
                    </div>

                    {/* Input Field */}
                    <input
                      ref={inputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={handleSearchFocus}
                      onBlur={handleSearchBlur}
                      placeholder="Ask Genie anything..."
                      className="flex-1 text-lg px-6 py-6 bg-transparent outline-none text-white placeholder-gray-500 font-light"
                    />

                    {/* Search Button with gold accent */}
                    <button
                      type="submit"
                      className="px-10 bg-gradient-to-r from-[#D4AF37] to-[#B8941E] text-black font-bold hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all duration-300 flex items-center gap-3"
                    >
                      <Search className="w-5 h-5" />
                      <span className="hidden sm:inline">Search</span>
                    </button>
                  </div>

                  {/* Gold fine line separator at top */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
                </div>
              </form>

              {/* Example Query Chips (emerald border) */}
              <div className="mt-5 flex flex-wrap gap-3">
                {exampleQueries.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(query)}
                    className="text-xs bg-[#0A0A0A]/60 backdrop-blur-xl text-gray-400 hover:text-[#10B981] px-4 py-2 rounded-full border border-[#10B981]/30 hover:border-[#10B981] hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all duration-300"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Buttons (asymmetric) */}
            <div ref={ctaButtonsRef} className="flex flex-wrap gap-5 pt-6">
              <button
                onClick={() => setShowChatbot(true)}
                className="group flex items-center gap-3 bg-[#10B981]/10 backdrop-blur-xl text-white px-8 py-4 rounded-xl font-semibold border border-[#10B981]/40 hover:bg-[#10B981] hover:border-[#10B981] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <span>Chat with Genie</span>
              </button>

              <Link
                href="/projects"
                className="flex items-center gap-3 bg-gradient-to-r from-[#D4AF37] to-[#B8941E] text-black px-8 py-4 rounded-xl font-bold hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-all duration-300"
              >
                Browse Projects
                <Zap className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Floating Stats (spans 5) - OVERLAPPING & DEPTH */}
          <div className="lg:col-span-5 relative">
            {/* Glass panel with emerald tint - OVERLAPPING HERO CARD */}
            <div ref={statsCardRef} className="relative space-y-6">
              {/* Large ROI Card (glass + emerald glow) */}
              <div className="relative bg-[#1A1A1A]/60 backdrop-blur-3xl border-2 border-[#10B981]/40 rounded-3xl p-10 shadow-[0_20px_60px_rgba(0,0,0,0.9)] hover:shadow-[0_0_60px_rgba(16,185,129,0.4)] transition-all duration-500 overflow-hidden group">
                {/* Emerald glow inside */}
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#10B981]/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.6)]">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-xs text-[#D4AF37] font-bold tracking-wider border border-[#D4AF37]/40 px-3 py-1 rounded-full">LIVE DATA</span>
                  </div>
                  <div className="text-7xl font-black text-white mb-3">12.8<span className="text-[#10B981]">%</span></div>
                  <div className="text-sm text-gray-400 font-semibold uppercase tracking-wide">Average ROI</div>
                  {/* Gold fine line */}
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
                </div>
              </div>

              {/* Two smaller cards (staggered) */}
              <div className="grid grid-cols-2 gap-5 -mt-10 ml-8">
                <div className="bg-[#0A0A0A]/90 backdrop-blur-xl border border-[#D4AF37]/30 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:border-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-300">
                  <div className="text-4xl font-black text-white mb-2">100<span className="text-[#D4AF37]">+</span></div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Projects</div>
                </div>

                <div className="bg-[#0A0A0A]/90 backdrop-blur-xl border border-[#10B981]/30 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:border-[#10B981] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all duration-300 mt-8">
                  <div className="text-4xl font-black text-white mb-2">25<span className="text-[#10B981]">+</span></div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Developers</div>
                </div>
              </div>

              {/* Small accent card (gold line) */}
              <div className="bg-[#D4AF37]/5 backdrop-blur-xl border border-[#D4AF37]/30 rounded-xl p-5">
                <p className="text-sm text-gray-300">
                  <span className="text-[#D4AF37] font-bold">From AED 500K</span> · Flexible payment plans available
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Circular Genie Orb (with gold ring + emerald glow) */}
      {showChatbot && (
        <div className="fixed bottom-8 right-8 w-full max-w-md h-[600px] z-50">
          <div className="relative h-full">
            {/* Close button with gold ring */}
            <button
              onClick={() => setShowChatbot(false)}
              className="absolute -top-3 -right-3 z-10 w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#B8941E] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.8)] hover:scale-110 transition-transform"
              aria-label="Close chat"
            >
              <X className="w-5 h-5 text-black" />
            </button>

            {/* Emerald glow around chat */}
            <div className="absolute -inset-4 bg-[#10B981]/20 rounded-3xl blur-3xl"></div>

            {/* Chat panel */}
            <div className="relative h-full border-2 border-[#10B981]/40 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(16,185,129,0.5)]">
              <GenieChat />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
