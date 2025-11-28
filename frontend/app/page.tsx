'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search, Sparkles, TrendingUp, Building2, MapPin, Calendar,
  CreditCard, Star, Award, Shield, ArrowRight
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSearchStore } from '@/store/searchStore';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const router = useRouter();
  const { setPendingQuery } = useSearchStore();
  const [searchInput, setSearchInput] = useState('');

  const heroRef = useRef<HTMLElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const dataCardsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const developersRef = useRef<HTMLElement>(null);
  const launchesRef = useRef<HTMLElement>(null);

  // Sample data
  const suggestions = [
    "Best ROI projects under 1M AED",
    "3BR villas with 80/20 payment",
    "Emaar projects completing in 2025"
  ];

  const projects = [
    {
      id: 1,
      name: 'Azure Residences',
      developer: 'Emaar Properties',
      location: 'Dubai Hills Estate',
      price: '900K',
      roi: '12.5%',
      payment: '80/20',
      completion: 'Q4 2025',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop',
      size: 'large'
    },
    {
      id: 2,
      name: 'Marina Heights',
      developer: 'DAMAC Properties',
      location: 'Dubai Marina',
      price: '1.2M',
      roi: '14.2%',
      payment: '70/30',
      completion: 'Q2 2026',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
      size: 'medium'
    },
    {
      id: 3,
      name: 'Palm Gardens',
      developer: 'Nakheel',
      location: 'Palm Jumeirah',
      price: '2.5M',
      roi: '11.8%',
      payment: '60/40',
      completion: 'Q1 2026',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      size: 'small'
    },
    {
      id: 4,
      name: 'Creek Views',
      developer: 'Emaar Properties',
      location: 'Dubai Creek Harbour',
      price: '1.8M',
      roi: '13.1%',
      payment: '80/20',
      completion: 'Q3 2025',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=1000&fit=crop',
      size: 'tall'
    }
  ];

  const developers = [
    {
      name: 'Emaar Properties',
      slug: 'emaar',
      projects: 45,
      rating: 4.8,
      roi: '12.4%',
      onTime: 96,
      image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920&h=1080&fit=crop&q=90',
      featured: true
    },
    {
      name: 'DAMAC Properties',
      slug: 'damac',
      projects: 38,
      rating: 4.6,
      roi: '13.2%',
      onTime: 94,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&q=90'
    },
    {
      name: 'Nakheel',
      slug: 'nakheel',
      projects: 28,
      rating: 4.7,
      roi: '11.9%',
      onTime: 95,
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop&q=90'
    },
    {
      name: 'Meraas',
      slug: 'meraas',
      projects: 22,
      rating: 4.5,
      roi: '12.8%',
      onTime: 93,
      image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&h=600&fit=crop&q=90'
    },
    {
      name: 'Sobha Realty',
      slug: 'sobha',
      projects: 19,
      rating: 4.7,
      roi: '13.5%',
      onTime: 97,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&q=90'
    }
  ];

  const launches = [
    {
      name: 'Sunset Boulevard',
      developer: 'Emaar',
      location: 'Dubai South',
      price: '750K',
      badge: 'Just Launched',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop'
    },
    {
      name: 'Sky Villas',
      developer: 'DAMAC',
      location: 'Business Bay',
      price: '1.1M',
      badge: 'Limited Units',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop'
    },
    {
      name: 'Oasis Gardens',
      developer: 'Azizi',
      location: 'Al Furjan',
      price: '680K',
      badge: 'Early Bird',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop'
    }
  ];

  const benefits = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Capital Appreciation',
      description: 'Average 15%+ value growth during construction phase'
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: 'Flexible Payments',
      description: 'Payment plans from 10% down to 80/20 structures'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'RERA Protection',
      description: 'Government-backed escrow accounts for your investment'
    }
  ];

  // Handle search submission - store query and redirect to /genie
  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    setPendingQuery(query.trim());
    router.push('/genie');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchInput);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // HERO ANIMATIONS
      gsap.from('.hero-title', {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power4.out',
        delay: 0.3
      });

      gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.6
      });

      // DATA CARDS STAGGER
      if (dataCardsRef.current) {
        gsap.from(dataCardsRef.current.children, {
          opacity: 0,
          y: 40,
          scale: 0.9,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.2)',
          delay: 0.8
        });
      }

      // SEARCH BAR
      if (searchBarRef.current) {
        gsap.from(searchBarRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
          delay: 1
        });
      }

      // MASONRY CARDS
      if (projectsRef.current) {
        const cards = projectsRef.current.querySelectorAll('.project-card');
        gsap.from(cards, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: projectsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        });
      }

      // SECTION TITLES
      gsap.utils.toArray('.section-title').forEach((title: any) => {
        gsap.from(title, {
          opacity: 0,
          x: -40,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      });

      // DEVELOPERS SECTION - Set initial opacity to 1 to ensure visibility
      if (developersRef.current) {
        const devCards = developersRef.current.querySelectorAll('.dev-card');
        // Ensure cards are visible by default
        gsap.set(devCards, { opacity: 1 });

        gsap.from(devCards, {
          opacity: 0,
          y: 30,
          scale: 0.95,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.1)',
          scrollTrigger: {
            trigger: developersRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
            onEnter: () => {
              // Force refresh on enter to ensure proper visibility
              gsap.to(devCards, { opacity: 1, duration: 0 });
            }
          }
        });
      }

    }, heroRef);

    // Refresh ScrollTrigger after a short delay to ensure all elements are positioned
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  // PARALLAX HOVER
  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const img = card.querySelector('.property-img') as HTMLElement;

    if (img) {
      gsap.to(img, {
        scale: 1.05,
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const img = card.querySelector('.property-img') as HTMLElement;

    if (img) {
      gsap.to(img, {
        scale: 1,
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  };

  return (
    <main className="min-h-screen bg-black">
      {/* HERO SECTION */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-20">
        {/* Background Dubai Skyline */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black/90 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&h=1080&fit=crop"
            alt="Dubai"
            className="w-full h-full object-cover opacity-20"
            suppressHydrationWarning
          />
          {/* Emerald + Gold Glows */}
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#00C870]/10 rounded-full blur-[120px] z-20"></div>
          <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#E8C676]/8 rounded-full blur-[100px] z-20"></div>
        </div>

        <div className="relative z-30 max-w-[1800px] mx-auto px-6 lg:px-16 w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* LEFT: Headline + Search */}
            <div className="lg:col-span-7 space-y-10">
              {/* Headline */}
              <div className="space-y-6">
                <h1 className="hero-title text-6xl sm:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tight">
                  Explore Dubai's <br />
                  <span className="bg-gradient-to-r from-[#00C870] via-[#E8C676] to-[#00C870] bg-clip-text text-transparent">
                    Off-Plan Market
                  </span>
                </h1>
                <p className="hero-subtitle text-xl lg:text-2xl text-gray-300 max-w-2xl font-light leading-relaxed">
                  AI-powered property discovery with <span className="text-[#00C870] font-semibold">real-time ROI analysis</span>
                  {' '}and <span className="text-[#E8C676] font-semibold">developer analytics</span>.
                </p>
              </div>

              {/* AI SUPER SEARCH BAR */}
              <div ref={searchBarRef} className="relative">
                <form onSubmit={handleSearchSubmit}>
                  <div className="relative bg-black/60 backdrop-blur-2xl border-2 border-[#E8C676]/40 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9)] hover:border-[#00C870]/60 transition-all duration-300 group">
                    <div className="flex items-stretch">
                      {/* Gold Icon Capsule */}
                      <div className="flex items-center justify-center px-6 bg-gradient-to-br from-[#E8C676] to-[#D4AF37]">
                        <Sparkles className="w-6 h-6 text-black" />
                      </div>

                      {/* Input */}
                      <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Ask Genie anything..."
                        className="flex-1 text-lg px-6 py-6 bg-transparent outline-none text-white placeholder-gray-500 font-light"
                      />

                      {/* Search Button */}
                      <button
                        type="submit"
                        className="px-10 bg-gradient-to-r from-[#00C870] to-[#059669] text-white font-bold hover:shadow-[0_0_30px_rgba(0,200,112,0.4)] transition-all duration-300 flex items-center gap-3"
                      >
                        <Search className="w-5 h-5" />
                        <span className="hidden sm:inline">Search</span>
                      </button>
                    </div>

                    {/* Top Gold Line */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E8C676] to-transparent"></div>
                  </div>
                </form>

                {/* Suggestion Chips */}
                <div className="mt-5 flex flex-wrap gap-3">
                  {suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-xs bg-black/60 backdrop-blur-xl text-gray-400 hover:text-[#00C870] px-4 py-2 rounded-full border border-[#00C870]/30 hover:border-[#00C870] hover:shadow-[0_0_15px_rgba(0,200,112,0.3)] transition-all duration-300"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: AI Data Cluster Cards */}
            <div className="lg:col-span-5">
              <div ref={dataCardsRef} className="space-y-6">
                {/* Large ROI Card */}
                <div className="relative bg-black/60 backdrop-blur-3xl border-2 border-[#00C870]/40 rounded-3xl p-10 shadow-[0_20px_60px_rgba(0,0,0,0.9)] hover:shadow-[0_0_60px_rgba(0,200,112,0.3)] transition-all duration-500 overflow-hidden group">
                  {/* Emerald Glow Inside */}
                  <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#00C870]/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

                  <div className="relative">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#00C870] to-[#059669] rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(0,200,112,0.6)]">
                        <TrendingUp className="w-8 h-8 text-white" />
                      </div>
                      <span className="text-xs text-[#E8C676] font-bold tracking-wider border border-[#E8C676]/40 px-3 py-1 rounded-full">LIVE DATA</span>
                    </div>
                    <div className="text-7xl font-black text-white mb-3">12.8<span className="text-[#00C870]">%</span></div>
                    <div className="text-sm text-gray-400 font-semibold uppercase tracking-wide">Average ROI</div>
                  </div>
                </div>

                {/* Two Smaller Cards */}
                <div className="grid grid-cols-2 gap-5">
                  <div className="bg-black/60 backdrop-blur-xl border border-[#E8C676]/30 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:border-[#E8C676] hover:shadow-[0_0_25px_rgba(232,198,118,0.4)] transition-all duration-300">
                    <div className="text-4xl font-black text-white mb-2">100<span className="text-[#E8C676]">+</span></div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Projects</div>
                  </div>

                  <div className="bg-black/60 backdrop-blur-xl border border-[#00C870]/30 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:border-[#00C870] hover:shadow-[0_0_25px_rgba(0,200,112,0.4)] transition-all duration-300">
                    <div className="text-4xl font-black text-white mb-2">25<span className="text-[#00C870]">+</span></div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Developers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS - MASONRY LAYOUT */}
      <section ref={projectsRef} className="relative py-20 lg:py-28 bg-gradient-to-b from-black via-[#0A0A0A] to-black overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#00C870]/5 rounded-full blur-[150px]"></div>

        <div className="relative max-w-[1800px] mx-auto px-6 lg:px-16">
          {/* Section Header */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 bg-[#00C870]/10 border border-[#00C870]/30 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#00C870]" />
              <span className="text-xs font-bold text-[#00C870] uppercase tracking-wide">AI-Curated</span>
            </div>
            <h2 className="section-title text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              Featured <span className="bg-gradient-to-r from-[#E8C676] to-[#00C870] bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl">Premium off-plan developments with exceptional ROI potential</p>
          </div>

          {/* MASONRY GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Large Wide Card */}
            <div
              className="project-card lg:col-span-8 lg:row-span-2 group cursor-pointer"
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              <Link href={`/projects/${projects[0].id}`} className="block h-full relative bg-black rounded-3xl overflow-hidden border border-[#E8C676]/20 hover:border-[#E8C676]/60 transition-all duration-500 shadow-[0_20px_60px_rgba(0,0,0,0.8)] hover:shadow-[0_0_60px_rgba(232,198,118,0.3)] hover:-translate-y-1">
                {/* Image */}
                <div className="relative h-full min-h-[600px] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
                  <img
                    src={projects[0].image}
                    alt={projects[0].name}
                    className="property-img w-full h-full object-cover"
                    suppressHydrationWarning
                  />

                  {/* ROI Badge */}
                  <div className="absolute top-6 left-6 bg-gradient-to-r from-[#E8C676] to-[#D4AF37] text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg z-20">
                    {projects[0].roi} ROI
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                    <h3 className="text-4xl font-black text-white mb-3 group-hover:text-[#E8C676] transition-colors">{projects[0].name}</h3>
                    <p className="text-lg text-gray-300 mb-4">{projects[0].developer}</p>

                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <MapPin className="w-4 h-4 text-[#E8C676]" />
                        {projects[0].location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Calendar className="w-4 h-4 text-[#E8C676]" />
                        {projects[0].completion}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <CreditCard className="w-4 h-4 text-[#E8C676]" />
                        {projects[0].payment}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-black text-[#00C870]">AED {projects[0].price}</div>
                      <div className="flex items-center gap-2 text-[#E8C676] font-bold">
                        View Details
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Medium Card (Top Right) */}
            <div
              className="project-card lg:col-span-4 group cursor-pointer"
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              <Link href={`/projects/${projects[1].id}`} className="block h-full relative bg-black rounded-3xl overflow-hidden border border-[#00C870]/20 hover:border-[#00C870]/60 transition-all duration-500 shadow-[0_20px_60px_rgba(0,0,0,0.8)] hover:shadow-[0_0_60px_rgba(0,200,112,0.3)] hover:-translate-y-1">
                <div className="relative h-full min-h-[300px] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
                  <img
                    src={projects[1].image}
                    alt={projects[1].name}
                    className="property-img w-full h-full object-cover"
                    suppressHydrationWarning
                  />

                  <div className="absolute top-4 left-4 bg-gradient-to-r from-[#E8C676] to-[#D4AF37] text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg z-20">
                    {projects[1].roi} ROI
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-2xl font-black text-white mb-2 group-hover:text-[#00C870] transition-colors">{projects[1].name}</h3>
                    <p className="text-sm text-gray-300 mb-3">{projects[1].developer}</p>
                    <div className="text-xl font-black text-[#00C870]">AED {projects[1].price}</div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Small Card */}
            <div
              className="project-card lg:col-span-2 group cursor-pointer"
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              <Link href={`/projects/${projects[2].id}`} className="block h-full relative bg-black rounded-3xl overflow-hidden border border-[#E8C676]/20 hover:border-[#E8C676]/60 transition-all duration-500 shadow-[0_20px_60px_rgba(0,0,0,0.8)] hover:shadow-[0_0_60px_rgba(232,198,118,0.3)] hover:-translate-y-1">
                <div className="relative h-full min-h-[290px] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
                  <img
                    src={projects[2].image}
                    alt={projects[2].name}
                    className="property-img w-full h-full object-cover"
                    suppressHydrationWarning
                  />

                  <div className="absolute top-4 left-4 bg-gradient-to-r from-[#E8C676] to-[#D4AF37] text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg z-20">
                    {projects[2].roi} ROI
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <h3 className="text-lg font-black text-white mb-1 group-hover:text-[#E8C676] transition-colors line-clamp-1">{projects[2].name}</h3>
                    <div className="text-lg font-black text-[#00C870]">AED {projects[2].price}</div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Tall Card */}
            <div
              className="project-card lg:col-span-2 lg:row-span-1 group cursor-pointer"
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              <Link href={`/projects/${projects[3].id}`} className="block h-full relative bg-black rounded-3xl overflow-hidden border border-[#00C870]/20 hover:border-[#00C870]/60 transition-all duration-500 shadow-[0_20px_60px_rgba(0,0,0,0.8)] hover:shadow-[0_0_60px_rgba(0,200,112,0.3)] hover:-translate-y-1">
                <div className="relative h-full min-h-[290px] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
                  <img
                    src={projects[3].image}
                    alt={projects[3].name}
                    className="property-img w-full h-full object-cover"
                    suppressHydrationWarning
                  />

                  <div className="absolute top-4 left-4 bg-gradient-to-r from-[#E8C676] to-[#D4AF37] text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg z-20">
                    {projects[3].roi} ROI
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <h3 className="text-lg font-black text-white mb-1 group-hover:text-[#00C870] transition-colors line-clamp-1">{projects[3].name}</h3>
                    <div className="text-lg font-black text-[#00C870]">AED {projects[3].price}</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TOP DEVELOPERS - ULTRA PREMIUM */}
      <section ref={developersRef} className="relative py-24 lg:py-32 bg-black overflow-hidden">
        {/* Cinematic Background Lighting */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#E8C676]/3 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#00C870]/3 rounded-full blur-[120px]"></div>

        <div className="relative max-w-[1800px] mx-auto px-6 lg:px-16">
          {/* Section Header */}
          <div className="mb-20">
            <div className="inline-flex items-center gap-2 bg-[#E8C676]/10 border border-[#E8C676]/30 px-5 py-2.5 rounded-full mb-8">
              <Award className="w-4 h-4 text-[#E8C676]" />
              <span className="text-xs font-bold text-[#E8C676] uppercase tracking-widest">Verified Elite Partners</span>
            </div>
            <h2 className="section-title text-5xl lg:text-7xl font-black text-white mb-6 leading-[1.1]">
              Top <span className="bg-gradient-to-r from-[#E8C676] via-[#D4AF37] to-[#E8C676] bg-clip-text text-transparent">Developers</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-400 max-w-3xl font-light">
              Partnering with Dubai's most prestigious developers. Proven excellence, unmatched delivery.
            </p>
          </div>

          {/* HERO DEVELOPER CARD - Full Width */}
          <Link
            href={`/developers/${developers[0].slug}`}
            className="dev-card block mb-8 group relative overflow-hidden rounded-[2rem] border-2 border-[#E8C676]/40 hover:border-[#E8C676] transition-all duration-500"
            style={{ boxShadow: '0 0 60px rgba(232, 198, 118, 0.15)' }}
          >
            {/* Background Image - Real Dubai Landmark */}
            <div className="relative h-[500px] lg:h-[600px]">
              <img
                src={developers[0].image}
                alt={developers[0].name}
                className="w-full h-full object-cover"
                suppressHydrationWarning
              />

              {/* Subtle Dark Gradient (25% opacity) */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>

              {/* Emerald Accent Glow - Top Right */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00C870]/10 rounded-full blur-[100px]"></div>

              {/* Gold Shimmer - Bottom Left */}
              <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-[#E8C676]/10 rounded-full blur-[120px]"></div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-10 lg:p-16">
                {/* Top Section - Badge */}
                <div className="flex items-start justify-between">
                  <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#E8C676] to-[#D4AF37] px-6 py-3 rounded-2xl shadow-[0_0_30px_rgba(232,198,118,0.4)]">
                    <Star className="w-5 h-5 fill-black text-black" />
                    <span className="text-sm font-black text-black uppercase tracking-wider">VERIFIED PARTNER</span>
                  </div>

                  {/* Gold Icon Top Right */}
                  <div className="w-16 h-16 bg-[#E8C676]/20 backdrop-blur-md border border-[#E8C676]/40 rounded-2xl flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-[#E8C676]" />
                  </div>
                </div>

                {/* Bottom Section - Info */}
                <div>
                  {/* Developer Name */}
                  <h3 className="text-5xl lg:text-7xl font-black text-white mb-8 tracking-tight leading-none">
                    {developers[0].name}
                  </h3>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
                      <div className="text-3xl lg:text-4xl font-black text-white mb-2">{developers[0].projects}</div>
                      <div className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Total Projects</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
                      <div className="text-3xl lg:text-4xl font-black text-[#E8C676] mb-2">{developers[0].roi}</div>
                      <div className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Average ROI</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
                      <div className="flex items-center gap-2 text-3xl lg:text-4xl font-black text-white mb-2">
                        <Star className="w-7 h-7 fill-[#E8C676] text-[#E8C676]" />
                        <span>{developers[0].rating}</span>
                      </div>
                      <div className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Rating</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
                      <div className="text-3xl lg:text-4xl font-black text-[#00C870] mb-2">{developers[0].onTime}%</div>
                      <div className="text-sm font-semibold text-gray-400 uppercase tracking-wide">On-Time Delivery</div>
                    </div>
                  </div>

                  {/* CTA Link */}
                  <div className="inline-flex items-center gap-3 text-[#E8C676] font-bold text-lg group-hover:gap-5 transition-all">
                    <span>Explore Developer</span>
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* FOUR MEDIUM DEVELOPER CARDS - Horizontal Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {developers.slice(1).map((dev, idx) => (
              <Link
                key={dev.slug}
                href={`/developers/${dev.slug}`}
                className="dev-card group relative overflow-hidden rounded-3xl border border-white/10 hover:border-[#00C870]/60 transition-all duration-500 bg-black"
                style={{ boxShadow: '0 4px 40px rgba(0, 0, 0, 0.5)' }}
              >
                {/* Background Image - High Quality */}
                <div className="relative h-80">
                  <img
                    src={dev.image}
                    alt={dev.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    suppressHydrationWarning
                  />

                  {/* Very Light Overlay (20-25% opacity) - Keep Image Visible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Emerald Glow on Hover */}
                  <div className="absolute inset-0 bg-[#00C870]/0 group-hover:bg-[#00C870]/10 transition-all duration-500"></div>

                  {/* Gold Icon - Top Left */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-[#E8C676]/20 backdrop-blur-md border border-[#E8C676]/40 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-[#E8C676]" />
                  </div>

                  {/* Content - Bottom Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {/* Developer Name */}
                    <h3 className="text-2xl font-black text-white mb-4 leading-tight">
                      {dev.name}
                    </h3>

                    {/* Stats */}
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-2xl font-black text-[#00C870] mb-0.5">{dev.projects}</div>
                        <div className="text-xs font-semibold text-gray-400 uppercase">Projects</div>
                      </div>
                      <div>
                        <div className="text-2xl font-black text-[#E8C676] mb-0.5">{dev.roi}</div>
                        <div className="text-xs font-semibold text-gray-400 uppercase">Avg ROI</div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-[#E8C676]/50 via-[#E8C676]/20 to-transparent mb-3"></div>

                    {/* View Link */}
                    <div className="flex items-center gap-2 text-sm font-bold text-white/70 group-hover:text-[#E8C676] transition-colors">
                      <span>View Portfolio</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST LAUNCHES - Horizontal Scroll */}
      <section ref={launchesRef} className="relative py-20 lg:py-28 bg-gradient-to-b from-black via-[#0A0A0A] to-black overflow-hidden">
        <div className="relative max-w-[1800px] mx-auto px-6 lg:px-16">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-[#00C870]/10 border border-[#00C870]/30 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#00C870]" />
              <span className="text-xs font-bold text-[#00C870] uppercase tracking-wide">New This Month</span>
            </div>
            <h2 className="section-title text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              Latest <span className="bg-gradient-to-r from-[#00C870] to-[#E8C676] bg-clip-text text-transparent">Launches</span>
            </h2>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
            {launches.map((launch, idx) => (
              <Link
                key={idx}
                href="/projects"
                className="flex-none w-[400px] group"
              >
                <div className="relative bg-black rounded-3xl overflow-hidden border border-[#00C870]/20 hover:border-[#00C870]/60 transition-all duration-500 shadow-[0_20px_60px_rgba(0,0,0,0.8)] hover:shadow-[0_0_60px_rgba(0,200,112,0.3)] hover:-translate-y-1">
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
                    <img
                      src={launch.image}
                      alt={launch.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      suppressHydrationWarning
                    />

                    <div className="absolute top-4 left-4 bg-[#00C870] text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg z-20">
                      {launch.badge}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <h3 className="text-2xl font-black text-white mb-2 group-hover:text-[#00C870] transition-colors">{launch.name}</h3>
                      <p className="text-sm text-gray-300 mb-3">{launch.developer} · {launch.location}</p>
                      <div className="text-2xl font-black text-[#E8C676]">AED {launch.price}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY INVEST */}
      <section className="relative py-20 lg:py-28 bg-black overflow-hidden">
        {/* Dubai Silhouette Background */}
        <div className="absolute inset-0 opacity-5">
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&h=400&fit=crop"
            alt="Dubai Skyline"
            className="w-full h-full object-cover"
            suppressHydrationWarning
          />
        </div>

        {/* Emerald Glows */}
        <div className="absolute top-20 left-[10%] w-[500px] h-[500px] bg-[#00C870]/5 rounded-full blur-[120px]"></div>

        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="section-title text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              Why <span className="bg-gradient-to-r from-[#E8C676] to-[#00C870] bg-clip-text text-transparent">Invest</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Unlock exclusive benefits with off-plan investments</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-black/60 backdrop-blur-xl border border-[#00C870]/20 rounded-3xl p-8 hover:border-[#00C870]/60 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-[#00C870]/10 rounded-2xl flex items-center justify-center text-[#00C870] mb-6 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#E8C676] mb-3">{benefit.title}</h3>
                <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
