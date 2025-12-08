'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search, Sparkles, TrendingUp, Building2, MapPin, Calendar,
  CreditCard, Award, Shield, ArrowRight, CheckCircle
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSearchStore } from '@/store/searchStore';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function ExplorePage() {
  const router = useRouter();
  const { setPendingQuery } = useSearchStore();
  const [searchInput, setSearchInput] = useState('');

  // State for real data from API
  const [projects, setProjects] = useState<any[]>([]);
  const [developers, setDevelopers] = useState<any[]>([]);
  const [launches, setLaunches] = useState<any[]>([]);
  const [stats, setStats] = useState({ projectCount: 0, developerCount: 0, areaCount: 0 });
  const [loading, setLoading] = useState(true);

  const heroRef = useRef<HTMLElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const dataCardsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const developersRef = useRef<HTMLElement>(null);
  const launchesRef = useRef<HTMLElement>(null);

  // Fetch real data from API
  useEffect(() => {
    async function fetchData() {
      try {
        const [projectsRes, developersRes, areasRes] = await Promise.all([
          fetch(`${API_URL}/api/projects/featured`),
          fetch(`${API_URL}/api/developers`),
          fetch(`${API_URL}/api/areas`)
        ]);

        const projectsData = await projectsRes.json();
        const developersData = await developersRes.json();
        const areasData = await areasRes.json();

        if (projectsData.success && projectsData.data) {
          const formattedProjects = projectsData.data.slice(0, 4).map((p: any, idx: number) => ({
            id: p.id,
            slug: p.slug,
            area_slug: p.area_slug,
            name: p.name,
            developer: p.developer_name,
            location: p.location || p.area_name,
            price: p.price_from?.replace('AED ', '') || 'TBA',
            status: p.status || 'Off Plan',
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
          const formattedDevs = developersData.data
            .filter((d: any) => parseInt(d.project_count || '0') > 0)
            .slice(0, 5)
            .map((d: any, idx: number) => ({
              name: d.name,
              slug: d.slug,
              projects: parseInt(d.project_count) || 0,
              image: d.logo || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
              featured: idx === 0
            }));
          setDevelopers(formattedDevs);

          const totalProjects = developersData.data.reduce((sum: number, d: any) => sum + parseInt(d.project_count || 0), 0);
          setStats({
            projectCount: totalProjects || projectsData.data?.length || 0,
            developerCount: developersData.data.length,
            areaCount: areasData.success ? areasData.data.length : 0
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const suggestions = [
    "Best projects under 1M AED",
    "3BR villas with 80/20 payment",
    "Emaar projects completing in 2025"
  ];

  const benefits = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Capital Appreciation',
      description: 'Strong value growth during construction phase'
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

      if (developersRef.current) {
        const devCards = developersRef.current.querySelectorAll('.dev-card');
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
            toggleActions: 'play none none none'
          }
        });
      }
    }, heroRef);

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
      {/* HERO SECTION */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white/95 to-white/90 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&h=1080&fit=crop"
            alt="Dubai"
            className="w-full h-full object-cover opacity-10"
            suppressHydrationWarning
          />
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#10B981]/5 rounded-full blur-[120px] z-20"></div>
          <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[100px] z-20"></div>
        </div>

        <div className="relative z-30 max-w-[1800px] mx-auto px-6 lg:px-16 w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-6">
                <h1 className="hero-title text-6xl sm:text-7xl lg:text-8xl font-black text-[#0A0A0A] leading-[0.9] tracking-tight">
                  Explore Dubai's <br />
                  <span className="bg-gradient-to-r from-[#10B981] via-[#D4AF37] to-[#10B981] bg-clip-text text-transparent">
                    Off-Plan Market
                  </span>
                </h1>
                <p className="hero-subtitle text-xl lg:text-2xl text-gray-600 max-w-2xl font-light leading-relaxed">
                  AI-powered property discovery with <span className="text-[#10B981] font-semibold">real market data</span>
                  {' '}and <span className="text-[#D4AF37] font-semibold">developer insights</span>.
                </p>
              </div>

              <div ref={searchBarRef} className="relative">
                <form onSubmit={handleSearchSubmit}>
                  <div className="relative bg-white border-2 border-[#D4AF37]/40 rounded-2xl overflow-hidden shadow-md hover:border-[#10B981]/60 hover:shadow-lg transition-all duration-300 group">
                    <div className="flex items-stretch">
                      <div className="flex items-center justify-center px-6 bg-gradient-to-br from-[#D4AF37] to-[#B8941F]">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Ask Genie anything..."
                        className="flex-1 text-lg px-6 py-6 bg-transparent outline-none text-[#0A0A0A] placeholder-gray-400 font-light"
                      />
                      <button
                        type="submit"
                        className="px-10 bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-bold hover:shadow-lg transition-all duration-300 flex items-center gap-3"
                      >
                        <Search className="w-5 h-5" />
                        <span className="hidden sm:inline">Search</span>
                      </button>
                    </div>
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
                  </div>
                </form>

                <div className="mt-5 flex flex-wrap gap-3">
                  {suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSearch(suggestion)}
                      className="text-xs bg-white text-gray-600 hover:text-[#10B981] px-4 py-2 rounded-full border border-[#10B981]/30 hover:border-[#10B981] hover:shadow-md transition-all duration-300"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Cards - Real Data */}
            <div className="lg:col-span-5">
              <div ref={dataCardsRef} className="space-y-6">
                <div className="relative bg-white border-2 border-[#10B981]/40 rounded-3xl p-10 shadow-md hover:shadow-lg transition-all duration-500 overflow-hidden group">
                  <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#10B981]/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="relative">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-2xl flex items-center justify-center shadow-md">
                        <Building2 className="w-8 h-8 text-white" />
                      </div>
                      <span className="text-xs text-[#D4AF37] font-bold tracking-wider border border-[#D4AF37]/40 px-3 py-1 rounded-full">REAL DATA</span>
                    </div>
                    <div className="text-7xl font-black text-[#0A0A0A] mb-3">{stats.projectCount}<span className="text-[#10B981]">+</span></div>
                    <div className="text-sm text-gray-600 font-semibold uppercase tracking-wide">Active Projects</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="bg-white border border-[#D4AF37]/30 rounded-2xl p-6 shadow-md hover:border-[#D4AF37] hover:shadow-lg transition-all duration-300">
                    <div className="text-4xl font-black text-[#0A0A0A] mb-2">{stats.developerCount}<span className="text-[#D4AF37]">+</span></div>
                    <div className="text-xs text-gray-600 uppercase tracking-wider">Developers</div>
                  </div>

                  <div className="bg-white border border-[#10B981]/30 rounded-2xl p-6 shadow-md hover:border-[#10B981] hover:shadow-lg transition-all duration-300">
                    <div className="text-4xl font-black text-[#0A0A0A] mb-2">{stats.areaCount}<span className="text-[#10B981]">+</span></div>
                    <div className="text-xs text-gray-600 uppercase tracking-wider">Areas</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS - Real Data */}
      <section ref={projectsRef} className="relative py-20 lg:py-28 bg-[#F9FAFB] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#10B981]/3 rounded-full blur-[150px]"></div>

        <div className="relative max-w-[1800px] mx-auto px-6 lg:px-16">
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 bg-[#10B981]/10 border border-[#10B981]/30 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#10B981]" />
              <span className="text-xs font-bold text-[#10B981] uppercase tracking-wide">Featured</span>
            </div>
            <h2 className="section-title text-5xl lg:text-6xl font-black text-[#0A0A0A] mb-4 leading-tight">
              Featured <span className="bg-gradient-to-r from-[#D4AF37] to-[#10B981] bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl">Premium off-plan developments from top developers</p>
          </div>

          {!loading && projects.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Large Card */}
              <div
                className="project-card lg:col-span-8 lg:row-span-2 group cursor-pointer"
                onMouseEnter={handleCardHover}
                onMouseLeave={handleCardLeave}
              >
                <Link href={`/areas/${projects[0]?.area_slug}/${projects[0]?.slug}`} className="block h-full relative bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[#D4AF37]/60 transition-all duration-500 shadow-md hover:shadow-lg hover:-translate-y-1">
                  <div className="relative h-full min-h-[600px] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent z-10"></div>
                    <img
                      src={projects[0]?.image}
                      alt={projects[0]?.name}
                      className="property-img w-full h-full object-cover"
                      suppressHydrationWarning
                    />

                    {projects[0]?.status && (
                      <div className="absolute top-6 left-6 bg-[#10B981] text-white px-4 py-2 rounded-full text-sm font-bold shadow-md z-20">
                        {projects[0].status}
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                      <h3 className="text-4xl font-black text-[#0A0A0A] mb-3 group-hover:text-[#D4AF37] transition-colors">{projects[0]?.name}</h3>
                      <p className="text-lg text-gray-600 mb-4">{projects[0]?.developer}</p>

                      <div className="flex flex-wrap items-center gap-4 mb-6">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 text-[#D4AF37]" />
                          {projects[0]?.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4 text-[#D4AF37]" />
                          {projects[0]?.completion}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                          {projects[0]?.payment}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-3xl font-black text-[#10B981]">AED {projects[0]?.price}</div>
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
                  <Link href={`/areas/${projects[1]?.area_slug}/${projects[1]?.slug}`} className="block h-full relative bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[#10B981]/60 transition-all duration-500 shadow-md hover:shadow-lg hover:-translate-y-1">
                    <div className="relative h-full min-h-[300px] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent z-10"></div>
                      <img
                        src={projects[1]?.image}
                        alt={projects[1]?.name}
                        className="property-img w-full h-full object-cover"
                        suppressHydrationWarning
                      />

                      {projects[1]?.status && (
                        <div className="absolute top-4 left-4 bg-[#10B981] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md z-20">
                          {projects[1].status}
                        </div>
                      )}

                      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                        <h3 className="text-2xl font-black text-[#0A0A0A] mb-2 group-hover:text-[#10B981] transition-colors">{projects[1]?.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{projects[1]?.developer}</p>
                        <div className="text-xl font-black text-[#10B981]">AED {projects[1]?.price}</div>
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
                  <Link href={`/areas/${projects[2]?.area_slug}/${projects[2]?.slug}`} className="block h-full relative bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[#D4AF37]/60 transition-all duration-500 shadow-md hover:shadow-lg hover:-translate-y-1">
                    <div className="relative h-full min-h-[290px] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent z-10"></div>
                      <img
                        src={projects[2]?.image}
                        alt={projects[2]?.name}
                        className="property-img w-full h-full object-cover"
                        suppressHydrationWarning
                      />

                      {projects[2]?.status && (
                        <div className="absolute top-4 left-4 bg-[#10B981] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md z-20">
                          {projects[2].status}
                        </div>
                      )}

                      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                        <h3 className="text-lg font-black text-[#0A0A0A] mb-1 group-hover:text-[#D4AF37] transition-colors line-clamp-1">{projects[2]?.name}</h3>
                        <div className="text-lg font-black text-[#10B981]">AED {projects[2]?.price}</div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {projects[3] && (
                <div
                  className="project-card lg:col-span-2 group cursor-pointer"
                  onMouseEnter={handleCardHover}
                  onMouseLeave={handleCardLeave}
                >
                  <Link href={`/areas/${projects[3]?.area_slug}/${projects[3]?.slug}`} className="block h-full relative bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[#10B981]/60 transition-all duration-500 shadow-md hover:shadow-lg hover:-translate-y-1">
                    <div className="relative h-full min-h-[290px] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent z-10"></div>
                      <img
                        src={projects[3]?.image}
                        alt={projects[3]?.name}
                        className="property-img w-full h-full object-cover"
                        suppressHydrationWarning
                      />

                      {projects[3]?.status && (
                        <div className="absolute top-4 left-4 bg-[#10B981] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md z-20">
                          {projects[3].status}
                        </div>
                      )}

                      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                        <h3 className="text-lg font-black text-[#0A0A0A] mb-1 group-hover:text-[#10B981] transition-colors line-clamp-1">{projects[3]?.name}</h3>
                        <div className="text-lg font-black text-[#10B981]">AED {projects[3]?.price}</div>
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

      {/* TOP DEVELOPERS - Real Data */}
      <section ref={developersRef} className="relative py-24 lg:py-32 bg-white overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#D4AF37]/3 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#10B981]/3 rounded-full blur-[120px]"></div>

        <div className="relative max-w-[1800px] mx-auto px-6 lg:px-16">
          <div className="mb-20">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-5 py-2.5 rounded-full mb-8">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">Verified Partners</span>
            </div>
            <h2 className="section-title text-5xl lg:text-7xl font-black text-[#0A0A0A] mb-6 leading-[1.1]">
              Top <span className="bg-gradient-to-r from-[#D4AF37] via-[#B8941F] to-[#D4AF37] bg-clip-text text-transparent">Developers</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl font-light">
              Partnering with Dubai's most prestigious developers.
            </p>
          </div>

          {!loading && developers.length > 0 ? (
            <>
              {/* Hero Developer Card */}
              <Link
                href={`/developers/${developers[0]?.slug}`}
                className="dev-card block mb-8 group relative overflow-hidden rounded-[2rem] border-2 border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all duration-500 shadow-md hover:shadow-lg"
              >
                <div className="relative h-[400px] lg:h-[500px]">
                  <img
                    src={developers[0]?.image}
                    alt={developers[0]?.name}
                    className="w-full h-full object-cover"
                    suppressHydrationWarning
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/50 to-white/30"></div>

                  <div className="absolute inset-0 flex flex-col justify-between p-10 lg:p-16">
                    <div className="flex items-start justify-between">
                      <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] px-6 py-3 rounded-2xl shadow-md">
                        <CheckCircle className="w-5 h-5 text-white" />
                        <span className="text-sm font-black text-white uppercase tracking-wider">VERIFIED PARTNER</span>
                      </div>
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md border border-[#D4AF37]/40 rounded-2xl flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-[#D4AF37]" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-5xl lg:text-7xl font-black text-[#0A0A0A] mb-8 tracking-tight leading-none">
                        {developers[0]?.name}
                      </h3>

                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-5 shadow-md">
                          <div className="text-3xl lg:text-4xl font-black text-[#10B981] mb-2">{developers[0]?.projects}</div>
                          <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Active Projects</div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-5 shadow-md">
                          <div className="text-3xl lg:text-4xl font-black text-[#D4AF37] mb-2">Elite</div>
                          <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Partner Status</div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-5 shadow-md">
                          <div className="text-3xl lg:text-4xl font-black text-[#0A0A0A] mb-2">Dubai</div>
                          <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Primary Market</div>
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

              {/* Other Developers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {developers.slice(1).map((dev) => (
                  <Link
                    key={dev.slug}
                    href={`/developers/${dev.slug}`}
                    className="dev-card group relative overflow-hidden rounded-3xl border border-gray-200 hover:border-[#10B981]/60 transition-all duration-500 bg-white shadow-md hover:shadow-lg"
                  >
                    <div className="relative h-80">
                      <img
                        src={dev.image}
                        alt={dev.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        suppressHydrationWarning
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/20 to-transparent"></div>

                      <div className="absolute top-4 left-4 w-12 h-12 bg-white/80 backdrop-blur-md border border-[#D4AF37]/40 rounded-xl flex items-center justify-center shadow-md">
                        <Building2 className="w-6 h-6 text-[#D4AF37]" />
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-2xl font-black text-[#0A0A0A] mb-4 leading-tight">
                          {dev.name}
                        </h3>

                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="text-2xl font-black text-[#10B981] mb-0.5">{dev.projects}</div>
                            <div className="text-xs font-semibold text-gray-600 uppercase">Projects</div>
                          </div>
                          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D4AF37]/10 rounded-lg">
                            <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span className="text-xs font-bold text-[#D4AF37]">Verified</span>
                          </div>
                        </div>

                        <div className="h-px bg-gradient-to-r from-[#D4AF37]/50 via-[#D4AF37]/20 to-transparent mb-3"></div>

                        <div className="flex items-center gap-2 text-sm font-bold text-gray-600 group-hover:text-[#D4AF37] transition-colors">
                          <span>View Portfolio</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
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

      {/* LATEST LAUNCHES - Real Data */}
      <section ref={launchesRef} className="relative py-20 lg:py-28 bg-[#F9FAFB] overflow-hidden">
        <div className="relative max-w-[1800px] mx-auto px-6 lg:px-16">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-[#10B981]/10 border border-[#10B981]/30 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#10B981]" />
              <span className="text-xs font-bold text-[#10B981] uppercase tracking-wide">Latest</span>
            </div>
            <h2 className="section-title text-5xl lg:text-6xl font-black text-[#0A0A0A] mb-4 leading-tight">
              Latest <span className="bg-gradient-to-r from-[#10B981] to-[#D4AF37] bg-clip-text text-transparent">Launches</span>
            </h2>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
            {launches.length > 0 ? launches.map((launch, idx) => (
              <Link
                key={idx}
                href={launch.slug ? `/areas/${launch.area_slug}/${launch.slug}` : '/projects'}
                className="flex-none w-[400px] group"
              >
                <div className="relative bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[#10B981]/60 transition-all duration-500 shadow-md hover:shadow-lg hover:-translate-y-1">
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent z-10"></div>
                    <img
                      src={launch.image}
                      alt={launch.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      suppressHydrationWarning
                    />

                    <div className="absolute top-4 left-4 bg-[#10B981] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md z-20">
                      {launch.badge}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <h3 className="text-2xl font-black text-[#0A0A0A] mb-2 group-hover:text-[#10B981] transition-colors">{launch.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{launch.developer} · {launch.location}</p>
                      <div className="text-2xl font-black text-[#D4AF37]">AED {launch.price}</div>
                    </div>
                  </div>
                </div>
              </Link>
            )) : (
              <div className="flex-none w-full flex items-center justify-center py-10">
                <p className="text-gray-500">Loading launches...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* WHY INVEST */}
      <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-3">
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&h=400&fit=crop"
            alt="Dubai Skyline"
            className="w-full h-full object-cover"
            suppressHydrationWarning
          />
        </div>

        <div className="absolute top-20 left-[10%] w-[500px] h-[500px] bg-[#10B981]/3 rounded-full blur-[120px]"></div>

        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="section-title text-5xl lg:text-6xl font-black text-[#0A0A0A] mb-4 leading-tight">
              Why <span className="bg-gradient-to-r from-[#D4AF37] to-[#10B981] bg-clip-text text-transparent">Invest</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Unlock exclusive benefits with off-plan investments</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-3xl p-8 hover:border-[#10B981]/60 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-[#10B981]/10 rounded-2xl flex items-center justify-center text-[#10B981] mb-6 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#D4AF37] mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
