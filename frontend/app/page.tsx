'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search, Sparkles, TrendingUp, Building2, MapPin, Calendar,
  CreditCard, Star, Award, Shield, ArrowRight, ChevronLeft, ChevronRight, Building
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSearchStore } from '@/store/searchStore';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Premium hero carousel slides
const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&h=1080&fit=crop',
    title: 'Discover Premium',
    highlight: 'Off-Plan Properties',
    subtitle: 'Exclusive access to Dubai\'s most prestigious developments',
    location: 'Dubai Marina'
  },
  {
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920&h=1080&fit=crop',
    title: 'Invest in',
    highlight: 'Your Future',
    subtitle: 'AI-powered insights for maximum ROI potential',
    location: 'Downtown Dubai'
  },
  {
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop',
    title: 'Luxury Living',
    highlight: 'Redefined',
    subtitle: 'World-class amenities in prime locations',
    location: 'Palm Jumeirah'
  },
  {
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&h=1080&fit=crop',
    title: 'Smart',
    highlight: 'Investments',
    subtitle: 'Flexible payment plans with developer guarantees',
    location: 'Business Bay'
  }
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function Home() {
  const router = useRouter();
  const { setPendingQuery } = useSearchStore();
  const [searchInput, setSearchInput] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // State for real data from API
  const [projects, setProjects] = useState<any[]>([]);
  const [developers, setDevelopers] = useState<any[]>([]);
  const [launches, setLaunches] = useState<any[]>([]);
  const [stats, setStats] = useState({ projectCount: 0, developerCount: 0, avgRoi: 0 });
  const [loading, setLoading] = useState(true);

  const heroRef = useRef<HTMLElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const dataCardsRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Autocomplete search state
  const [searchResults, setSearchResults] = useState<{
    projects: any[];
    areas: any[];
    developers: any[];
  }>({ projects: [], areas: [], developers: [] });
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = useCallback(() => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);
  const projectsRef = useRef<HTMLElement>(null);
  const developersRef = useRef<HTMLElement>(null);
  const launchesRef = useRef<HTMLElement>(null);

  // Fetch real data from API
  useEffect(() => {
    async function fetchData() {
      try {
        const [projectsRes, developersRes] = await Promise.all([
          fetch(`${API_URL}/api/projects/featured`),
          fetch(`${API_URL}/api/developers/featured`)
        ]);

        const projectsData = await projectsRes.json();
        const developersData = await developersRes.json();

        if (projectsData.success && projectsData.data) {
          const formattedProjects = projectsData.data.slice(0, 4).map((p: any, idx: number) => ({
            id: p.id,
            slug: p.slug,
            area_slug: p.area_slug,
            name: p.name,
            developer: p.developer_name,
            location: p.location || p.area_name,
            price: p.price_from?.replace('AED ', '') || 'TBA',
            roi: p.match_score ? `${p.match_score}%` : '12%',
            payment: p.payment_plan || '80/20',
            completion: p.completion_date || 'Q4 2026',
            image: p.images?.[0] || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200',
            size: idx === 0 ? 'large' : idx === 1 ? 'medium' : 'small'
          }));
          setProjects(formattedProjects);

          const launchData = projectsData.data.slice(0, 3).map((p: any) => ({
            name: p.name,
            developer: p.developer_name,
            location: p.location || p.area_name,
            price: p.price_from?.replace('AED ', '') || 'TBA',
            badge: p.status === 'Off Plan' ? 'Off Plan' : 'New Launch',
            image: p.images?.[0] || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600',
            slug: p.slug,
            area_slug: p.area_slug
          }));
          setLaunches(launchData);
        }

        if (developersData.success && developersData.data) {
          const formattedDevs = developersData.data.map((d: any, idx: number) => ({
            name: d.name,
            slug: d.slug,
            projects: parseInt(d.project_count) || 0,
            rating: 4.5 + (Math.random() * 0.4),
            roi: d.avg_roi ? `${d.avg_roi}%` : '12%',
            onTime: 90 + Math.floor(Math.random() * 8),
            image: d.logo || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
            featured: idx === 0
          }));
          setDevelopers(formattedDevs);

          const totalProjects = developersData.data.reduce((sum: number, d: any) => sum + parseInt(d.project_count || 0), 0);
          const avgRoi = developersData.data.reduce((sum: number, d: any) => sum + parseFloat(d.avg_roi || 0), 0) / developersData.data.length;
          setStats({
            projectCount: totalProjects || 100,
            developerCount: developersData.data.length,
            avgRoi: avgRoi || 12.8
          });
        }
      } catch (error) {
        console.error('Error fetching homepage data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const suggestions = [
    "Best ROI projects under 1M AED",
    "3BR villas with 80/20 payment",
    "Emaar projects completing in 2025"
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

  // Debounced autocomplete search
  const performAutocompleteSearch = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSearchResults({ projects: [], areas: [], developers: [] });
      setShowDropdown(false);
      return;
    }

    setIsSearching(true);
    try {
      const [projectsRes, areasRes, developersRes] = await Promise.all([
        fetch(`${API_URL}/api/projects/search?q=${encodeURIComponent(query)}`),
        fetch(`${API_URL}/api/areas`),
        fetch(`${API_URL}/api/developers`)
      ]);

      const projectsData = await projectsRes.json();
      const areasData = await areasRes.json();
      const developersData = await developersRes.json();

      const queryLower = query.toLowerCase();

      // Filter projects by name match
      const matchedProjects = projectsData.success && projectsData.data
        ? projectsData.data.slice(0, 5)
        : [];

      // Filter areas by name match
      const matchedAreas = areasData.success && areasData.data
        ? areasData.data.filter((a: any) =>
            a.name.toLowerCase().includes(queryLower)
          ).slice(0, 4)
        : [];

      // Filter developers by name match
      const matchedDevelopers = developersData.success && developersData.data
        ? developersData.data.filter((d: any) =>
            d.name.toLowerCase().includes(queryLower)
          ).slice(0, 4)
        : [];

      setSearchResults({
        projects: matchedProjects,
        areas: matchedAreas,
        developers: matchedDevelopers
      });

      const hasResults = matchedProjects.length > 0 || matchedAreas.length > 0 || matchedDevelopers.length > 0;
      setShowDropdown(hasResults);
    } catch (error) {
      console.error('Autocomplete search error:', error);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Handle search input change with debounce
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Debounce search by 300ms
    searchTimeoutRef.current = setTimeout(() => {
      performAutocompleteSearch(value);
    }, 300);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle selecting an autocomplete result
  const handleSelectResult = (type: 'project' | 'area' | 'developer', item: any) => {
    setShowDropdown(false);
    setSearchInput('');

    if (type === 'project') {
      router.push(`/areas/${item.area_slug}/${item.slug}`);
    } else if (type === 'area') {
      router.push(`/areas/${item.slug}`);
    } else if (type === 'developer') {
      router.push(`/developers/${item.slug}`);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      if (dataCardsRef.current) {
        gsap.set(dataCardsRef.current.children, { opacity: 1 });
        gsap.from(dataCardsRef.current.children, {
          opacity: 0,
          y: 40,
          scale: 0.9,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.2)',
          delay: 0.8,
          clearProps: 'all'
        });
      }

      if (searchBarRef.current) {
        gsap.from(searchBarRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
          delay: 1
        });
      }

      // Section animations
      gsap.utils.toArray('.section-title').forEach((el: any) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out'
        });
      });

      gsap.utils.toArray('.project-card').forEach((el: any, idx: number) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          y: 60,
          duration: 0.8,
          delay: idx * 0.1,
          ease: 'power3.out'
        });
      });

      gsap.utils.toArray('.dev-card').forEach((el: any, idx: number) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          y: 50,
          duration: 0.7,
          delay: idx * 0.08,
          ease: 'power3.out'
        });
      });
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const img = card.querySelector('.property-img') as HTMLElement;
    if (img) {
      gsap.to(img, { scale: 1.05, duration: 0.4, ease: 'power2.out' });
    }
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const img = card.querySelector('.property-img') as HTMLElement;
    if (img) {
      gsap.to(img, { scale: 1, duration: 0.4, ease: 'power2.out' });
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* PREMIUM HERO CAROUSEL - Full Width vyom.ae Style */}
      <section ref={heroRef} className="relative h-[100svh] min-h-[700px] max-h-[1000px] overflow-hidden">
        {/* Carousel Slides */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                suppressHydrationWarning
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
            </div>
          </div>
        ))}

        {/* Content Overlay - Split into title area and fixed search area */}
        <div className="relative z-20 h-full flex flex-col">
          {/* Title Section - Centered vertically in available space */}
          <div className="flex-1 flex items-center pt-20">
            <div className="max-w-[1800px] mx-auto px-6 lg:px-16 w-full">
              <div className="max-w-4xl">
                {/* Location Badge */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-sm font-medium text-white min-w-[100px]">{heroSlides[currentSlide].location}</span>
                </div>

                {/* Main Title */}
                <h1 className="hero-title text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.05] mb-6">
                  {heroSlides[currentSlide].title}{' '}
                  <span className="text-[#D4AF37]">{heroSlides[currentSlide].highlight}</span>
                </h1>

                {/* Subtitle */}
                <p className="hero-subtitle text-xl lg:text-2xl text-white/80 max-w-2xl font-light">
                  {heroSlides[currentSlide].subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Search Section - Fixed position from bottom */}
          <div className="pb-36 lg:pb-40">
            <div className="max-w-[1800px] mx-auto px-6 lg:px-16 w-full">
              <div className="max-w-4xl">

              {/* Search Bar - Premium Glass Effect */}
              <div ref={searchBarRef} className="max-w-3xl relative">
                <form onSubmit={handleSearchSubmit}>
                  <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl">
                    <div className="flex items-stretch">
                      {/* AI Icon */}
                      <div className="flex items-center justify-center px-6 bg-gradient-to-b from-[#D4AF37] to-[#B8962E]">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>

                      {/* Input */}
                      <input
                        type="text"
                        value={searchInput}
                        onChange={handleSearchInputChange}
                        onFocus={() => {
                          if (searchResults.projects.length > 0 || searchResults.areas.length > 0 || searchResults.developers.length > 0) {
                            setShowDropdown(true);
                          }
                        }}
                        placeholder="Search properties, areas, or ask Genie AI..."
                        className="flex-1 text-lg px-6 py-5 bg-transparent outline-none text-[#0A0A0A] placeholder-gray-400"
                      />

                      {/* Loading indicator */}
                      {isSearching && (
                        <div className="flex items-center pr-4">
                          <div className="w-5 h-5 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}

                      {/* Search Button */}
                      <button
                        type="submit"
                        className="px-8 bg-[#10B981] text-white font-bold hover:bg-[#059669] transition-all duration-300 flex items-center gap-3"
                      >
                        <Search className="w-5 h-5" />
                        <span className="hidden sm:inline">Search</span>
                      </button>
                    </div>
                  </div>
                </form>

                {/* Autocomplete Dropdown */}
                {showDropdown && (
                  <div
                    ref={dropdownRef}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 max-h-[400px] overflow-y-auto"
                  >
                    {/* Properties Section */}
                    {searchResults.projects.length > 0 && (
                      <div className="p-3">
                        <div className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                          <Building className="w-4 h-4" />
                          Properties
                        </div>
                        {searchResults.projects.map((project: any) => (
                          <button
                            key={project.id}
                            onClick={() => handleSelectResult('project', project)}
                            className="w-full flex items-center gap-4 px-3 py-3 hover:bg-[#F9FAFB] rounded-xl transition-colors text-left"
                          >
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                              {project.images?.[0] ? (
                                <img src={project.images[0]} alt={project.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Building className="w-5 h-5 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-bold text-[#0A0A0A] truncate">{project.name}</div>
                              <div className="text-sm text-gray-500 flex items-center gap-2">
                                <MapPin className="w-3 h-3" />
                                {project.area_name || project.location}
                              </div>
                            </div>
                            {project.price_from && (
                              <div className="text-sm font-bold text-[#10B981]">{project.price_from}</div>
                            )}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Areas Section */}
                    {searchResults.areas.length > 0 && (
                      <div className="p-3 border-t border-gray-100">
                        <div className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                          <MapPin className="w-4 h-4" />
                          Areas
                        </div>
                        {searchResults.areas.map((area: any) => (
                          <button
                            key={area.id}
                            onClick={() => handleSelectResult('area', area)}
                            className="w-full flex items-center gap-4 px-3 py-3 hover:bg-[#F9FAFB] rounded-xl transition-colors text-left"
                          >
                            <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 flex items-center justify-center flex-shrink-0">
                              <MapPin className="w-5 h-5 text-[#10B981]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-bold text-[#0A0A0A]">{area.name}</div>
                              <div className="text-sm text-gray-500">View all properties in {area.name}</div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Developers Section */}
                    {searchResults.developers.length > 0 && (
                      <div className="p-3 border-t border-gray-100">
                        <div className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                          <Building2 className="w-4 h-4" />
                          Developers
                        </div>
                        {searchResults.developers.map((developer: any) => (
                          <button
                            key={developer.id}
                            onClick={() => handleSelectResult('developer', developer)}
                            className="w-full flex items-center gap-4 px-3 py-3 hover:bg-[#F9FAFB] rounded-xl transition-colors text-left"
                          >
                            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                              <Building2 className="w-5 h-5 text-[#D4AF37]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-bold text-[#0A0A0A]">{developer.name}</div>
                              <div className="text-sm text-gray-500">
                                {developer.project_count || 0} projects
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Ask Genie Option */}
                    <div className="p-3 border-t border-gray-100 bg-gradient-to-r from-[#D4AF37]/5 to-[#10B981]/5">
                      <button
                        onClick={() => handleSearch(searchInput)}
                        className="w-full flex items-center gap-4 px-3 py-3 hover:bg-white/50 rounded-xl transition-colors text-left"
                      >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#10B981] flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-[#0A0A0A]">Ask Genie AI</div>
                          <div className="text-sm text-gray-500">Get AI-powered recommendations for "{searchInput}"</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Quick Suggestions */}
                <div className="mt-5 flex flex-wrap gap-3">
                  {suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-sm bg-white/10 backdrop-blur-md text-white hover:bg-white/20 px-4 py-2 rounded-full transition-all duration-300"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
              </div>
            </div>
          </div>

          {/* Stats Bar - Bottom of Hero */}
          <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/80 to-transparent pt-20 pb-8">
            <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
              <div ref={dataCardsRef} className="flex flex-wrap items-center justify-between gap-6">
                {/* Stats */}
                <div className="flex flex-wrap items-center gap-8 lg:gap-16">
                  <div className="text-center">
                    <div className="text-3xl lg:text-4xl font-black text-white">{stats.projectCount || 100}<span className="text-[#D4AF37]">+</span></div>
                    <div className="text-xs text-white/60 uppercase tracking-wider mt-1">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl lg:text-4xl font-black text-white">{stats.developerCount || 25}<span className="text-[#10B981]">+</span></div>
                    <div className="text-xs text-white/60 uppercase tracking-wider mt-1">Developers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl lg:text-4xl font-black text-[#10B981]">{stats.avgRoi ? stats.avgRoi.toFixed(1) : '12.8'}%</div>
                    <div className="text-xs text-white/60 uppercase tracking-wider mt-1">Avg ROI</div>
                  </div>
                </div>

                {/* Carousel Controls */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={prevSlide}
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 flex items-center justify-center transition-all"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>

                  {/* Slide Indicators */}
                  <div className="flex gap-2">
                    {heroSlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setIsAutoPlaying(false);
                          setCurrentSlide(idx);
                        }}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          idx === currentSlide ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/40 hover:bg-white/60'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextSlide}
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 flex items-center justify-center transition-all"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section ref={projectsRef} className="relative py-20 lg:py-28 bg-[#F9FAFB] overflow-hidden">
        <div className="relative max-w-[1800px] mx-auto px-6 lg:px-16">
          {/* Section Header */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 bg-[#10B981]/10 border-2 border-[#10B981] px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#10B981]" />
              <span className="text-xs font-bold text-[#10B981] uppercase tracking-wide">AI-Curated</span>
            </div>
            <h2 className="section-title text-5xl lg:text-6xl font-black text-[#0A0A0A] mb-4 leading-tight">
              Featured <span className="text-[#D4AF37]">Projects</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl">Premium off-plan developments with exceptional ROI potential</p>
          </div>

          {/* Projects Grid */}
          {!loading && projects.length > 0 && projects[0] ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Large Card */}
            <div
              className="project-card lg:col-span-8 lg:row-span-2 group cursor-pointer"
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              <Link href={`/areas/${projects[0]?.area_slug || 'dubai'}/${projects[0]?.slug || ''}`} className="block h-full relative bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-md hover:border-[#D4AF37] transition-all duration-500 shadow-lg hover:shadow-xl hover:-translate-y-1">
                <div className="relative h-full min-h-[600px] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent z-10"></div>
                  <img
                    src={projects[0].image}
                    alt={projects[0].name}
                    className="property-img w-full h-full object-cover"
                    suppressHydrationWarning
                  />

                  {/* ROI Badge */}
                  <div className="absolute top-6 left-6 bg-[#D4AF37] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg z-20">
                    {projects[0].roi} ROI
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                    <h3 className="text-4xl font-black text-white mb-3 group-hover:text-[#D4AF37] transition-colors">{projects[0].name}</h3>
                    <p className="text-lg text-gray-300 mb-4">{projects[0].developer}</p>

                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <MapPin className="w-4 h-4 text-[#D4AF37]" />
                        {projects[0].location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Calendar className="w-4 h-4 text-[#D4AF37]" />
                        {projects[0].completion}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                        {projects[0].payment}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-black text-[#10B981]">AED {projects[0].price}</div>
                      <div className="flex items-center gap-2 text-[#D4AF37] font-bold">
                        View Details
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Medium Card */}
            {projects[1] && (
            <div
              className="project-card lg:col-span-4 group cursor-pointer"
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              <Link href={`/areas/${projects[1]?.area_slug}/${projects[1]?.slug}`} className="block h-full relative bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-md hover:border-[#10B981] transition-all duration-500 shadow-lg hover:shadow-xl hover:-translate-y-1">
                <div className="relative h-full min-h-[300px] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent z-10"></div>
                  <img
                    src={projects[1].image}
                    alt={projects[1].name}
                    className="property-img w-full h-full object-cover"
                    suppressHydrationWarning
                  />

                  <div className="absolute top-4 left-4 bg-[#D4AF37] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-20">
                    {projects[1].roi} ROI
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-2xl font-black text-white mb-2 group-hover:text-[#10B981] transition-colors">{projects[1].name}</h3>
                    <p className="text-sm text-gray-300 mb-3">{projects[1].developer}</p>
                    <div className="text-xl font-black text-[#10B981]">AED {projects[1].price}</div>
                  </div>
                </div>
              </Link>
            </div>
            )}

            {/* Small Cards */}
            {projects[2] && (
            <div
              className="project-card lg:col-span-2 group cursor-pointer"
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              <Link href={`/areas/${projects[2]?.area_slug}/${projects[2]?.slug}`} className="block h-full relative bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-md hover:border-[#D4AF37] transition-all duration-500 shadow-lg hover:shadow-xl hover:-translate-y-1">
                <div className="relative h-full min-h-[290px] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent z-10"></div>
                  <img
                    src={projects[2].image}
                    alt={projects[2].name}
                    className="property-img w-full h-full object-cover"
                    suppressHydrationWarning
                  />

                  <div className="absolute top-4 left-4 bg-[#D4AF37] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-20">
                    {projects[2].roi} ROI
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <h3 className="text-lg font-black text-white mb-1 group-hover:text-[#D4AF37] transition-colors line-clamp-1">{projects[2].name}</h3>
                    <div className="text-lg font-black text-[#10B981]">AED {projects[2].price}</div>
                  </div>
                </div>
              </Link>
            </div>
            )}

            {projects[3] && (
            <div
              className="project-card lg:col-span-2 lg:row-span-1 group cursor-pointer"
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              <Link href={`/areas/${projects[3]?.area_slug}/${projects[3]?.slug}`} className="block h-full relative bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-md hover:border-[#10B981] transition-all duration-500 shadow-lg hover:shadow-xl hover:-translate-y-1">
                <div className="relative h-full min-h-[290px] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent z-10"></div>
                  <img
                    src={projects[3].image}
                    alt={projects[3].name}
                    className="property-img w-full h-full object-cover"
                    suppressHydrationWarning
                  />

                  <div className="absolute top-4 left-4 bg-[#D4AF37] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-20">
                    {projects[3].roi} ROI
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <h3 className="text-lg font-black text-white mb-1 group-hover:text-[#10B981] transition-colors line-clamp-1">{projects[3].name}</h3>
                    <div className="text-lg font-black text-[#10B981]">AED {projects[3].price}</div>
                  </div>
                </div>
              </Link>
            </div>
            )}
          </div>
          ) : (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Sparkles className="w-12 h-12 text-[#10B981] animate-pulse mx-auto mb-4" />
                <p className="text-gray-500">Loading featured projects...</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* TOP DEVELOPERS */}
      <section ref={developersRef} className="relative py-24 lg:py-32 bg-white overflow-hidden">
        <div className="relative max-w-[1800px] mx-auto px-6 lg:px-16">
          {/* Section Header */}
          <div className="mb-20">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border-2 border-[#D4AF37] px-5 py-2.5 rounded-full mb-8">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">Verified Elite Partners</span>
            </div>
            <h2 className="section-title text-5xl lg:text-7xl font-black text-[#0A0A0A] mb-6 leading-[1.1]">
              Top <span className="text-[#D4AF37]">Developers</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl font-light">
              Partnering with Dubai's most prestigious developers. Proven excellence, unmatched delivery.
            </p>
          </div>

          {/* Developers Grid */}
          {!loading && developers.length > 0 && developers[0] ? (
          <>
          {/* Hero Developer */}
          <Link
            href={`/developers/${developers[0]?.slug || ''}`}
            className="dev-card block mb-8 group relative overflow-hidden rounded-3xl border border-gray-200 shadow-md hover:border-[#D4AF37] transition-all duration-500 shadow-lg hover:shadow-xl"
          >
            <div className="relative h-[500px] lg:h-[600px]">
              <img
                src={developers[0].image}
                alt={developers[0].name}
                className="w-full h-full object-cover"
                suppressHydrationWarning
              />

              <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 via-[#0A0A0A]/60 to-transparent"></div>

              <div className="absolute inset-0 flex flex-col justify-between p-10 lg:p-16">
                {/* Top Badge */}
                <div className="flex items-start justify-between">
                  <div className="inline-flex items-center gap-2.5 bg-[#D4AF37] px-6 py-3 rounded-2xl shadow-lg">
                    <Star className="w-5 h-5 fill-white text-white" />
                    <span className="text-sm font-black text-white uppercase tracking-wider">VERIFIED PARTNER</span>
                  </div>

                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md border-2 border-white/40 rounded-2xl flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Bottom Info */}
                <div>
                  <h3 className="text-5xl lg:text-7xl font-black text-white mb-8 tracking-tight leading-none">
                    {developers[0].name}
                  </h3>

                  {/* Stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5">
                      <div className="text-3xl lg:text-4xl font-black text-white mb-2">{developers[0].projects}</div>
                      <div className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Total Projects</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5">
                      <div className="text-3xl lg:text-4xl font-black text-[#D4AF37] mb-2">{developers[0].roi}</div>
                      <div className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Average ROI</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5">
                      <div className="flex items-center gap-2 text-3xl lg:text-4xl font-black text-white mb-2">
                        <Star className="w-7 h-7 fill-[#D4AF37] text-[#D4AF37]" />
                        <span>{developers[0].rating.toFixed(1)}</span>
                      </div>
                      <div className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Rating</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5">
                      <div className="text-3xl lg:text-4xl font-black text-[#10B981] mb-2">{developers[0].onTime}%</div>
                      <div className="text-sm font-semibold text-gray-300 uppercase tracking-wide">On-Time Delivery</div>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-3 text-[#D4AF37] font-bold text-lg group-hover:gap-5 transition-all">
                    <span>Explore Developer</span>
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Other Developers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {developers.slice(1).map((dev, idx) => (
              <Link
                key={dev.slug}
                href={`/developers/${dev.slug}`}
                className="dev-card group relative overflow-hidden rounded-3xl border border-gray-200 shadow-md hover:border-[#10B981] transition-all duration-500 bg-white shadow-md hover:shadow-xl hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={dev.image}
                    alt={dev.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    suppressHydrationWarning
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 to-transparent"></div>

                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-[#D4AF37] px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white text-white" />
                    <span className="text-xs font-bold text-white">{dev.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-xl font-black text-[#0A0A0A] mb-4 group-hover:text-[#10B981] transition-colors">
                    {dev.name}
                  </h3>

                  {/* Mini Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-[#F9FAFB] rounded-xl p-3 text-center">
                      <div className="text-lg font-black text-[#0A0A0A]">{dev.projects}</div>
                      <div className="text-xs text-gray-500">Projects</div>
                    </div>
                    <div className="bg-[#F9FAFB] rounded-xl p-3 text-center">
                      <div className="text-lg font-black text-[#10B981]">{dev.roi}</div>
                      <div className="text-xs text-gray-500">ROI</div>
                    </div>
                  </div>

                  <div className="h-px bg-gray-200 mb-3"></div>

                  <div className="flex items-center gap-2 text-sm font-bold text-gray-600 group-hover:text-[#D4AF37] transition-colors">
                    <span>View Portfolio</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          </>
          ) : (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Building2 className="w-12 h-12 text-[#D4AF37] animate-pulse mx-auto mb-4" />
                <p className="text-gray-500">Loading developers...</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* LATEST LAUNCHES */}
      <section ref={launchesRef} className="relative py-20 lg:py-28 bg-[#F9FAFB] overflow-hidden">
        <div className="relative max-w-[1800px] mx-auto px-6 lg:px-16">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-[#10B981]/10 border-2 border-[#10B981] px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#10B981]" />
              <span className="text-xs font-bold text-[#10B981] uppercase tracking-wide">New This Month</span>
            </div>
            <h2 className="section-title text-5xl lg:text-6xl font-black text-[#0A0A0A] mb-4 leading-tight">
              Latest <span className="text-[#10B981]">Launches</span>
            </h2>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hidden">
            {launches.length > 0 ? launches.map((launch: any, idx: number) => (
              <Link
                key={idx}
                href={launch.slug ? `/areas/${launch.area_slug}/${launch.slug}` : '/projects'}
                className="flex-none w-[400px] group"
              >
                <div className="relative bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-md hover:border-[#10B981] transition-all duration-500 shadow-lg hover:shadow-xl hover:-translate-y-1">
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent z-10"></div>
                    <img
                      src={launch.image}
                      alt={launch.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      suppressHydrationWarning
                    />

                    <div className="absolute top-4 left-4 bg-[#10B981] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-20">
                      {launch.badge}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <h3 className="text-2xl font-black text-white mb-2 group-hover:text-[#10B981] transition-colors">{launch.name}</h3>
                      <p className="text-sm text-gray-300 mb-3">{launch.developer} · {launch.location}</p>
                      <div className="text-2xl font-black text-[#D4AF37]">AED {launch.price}</div>
                    </div>
                  </div>
                </div>
              </Link>
            )) : (
              <div className="flex-none w-full flex items-center justify-center py-10">
                <p className="text-gray-500">Loading latest launches...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* WHY INVEST */}
      <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
        {/* Subtle Dubai Skyline */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&h=400&fit=crop"
            alt="Dubai Skyline"
            className="w-full h-full object-cover"
            suppressHydrationWarning
          />
        </div>

        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="section-title text-5xl lg:text-6xl font-black text-[#0A0A0A] mb-6">
              Why <span className="text-[#10B981]">Off-Plan</span> in Dubai?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The smart investor's choice for capital growth and passive income in the world's fastest-growing property market.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 shadow-md rounded-3xl p-8 shadow-lg hover:shadow-xl hover:border-[#10B981] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-[#10B981] rounded-2xl flex items-center justify-center mb-6 text-white">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-black text-[#0A0A0A] mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
