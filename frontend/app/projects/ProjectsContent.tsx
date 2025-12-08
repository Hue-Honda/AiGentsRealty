'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ChevronDown, MapPin, Calendar, CreditCard, TrendingUp, Sparkles, Building2, ArrowRight, X } from 'lucide-react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function ProjectsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [projects, setProjects] = useState<any[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize filters from URL params
  const [filters, setFilters] = useState({
    price: searchParams.get('price') || 'all',
    location: searchParams.get('location') || 'all',
    developer: searchParams.get('developer') || 'all',
    bedrooms: searchParams.get('bedrooms') || 'all',
    paymentPlan: searchParams.get('paymentPlan') || 'all',
    completionYear: searchParams.get('completionYear') || 'all',
  });

  const [sort, setSort] = useState(searchParams.get('sort') || 'featured');

  // Fetch projects from API
  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(`${API_URL}/api/projects`);
        const data = await res.json();
        if (data.success) {
          setProjects(data.data);
          setFilteredProjects(data.data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  // Apply filters when filters or projects change
  useEffect(() => {
    let filtered = [...projects];

    // Price filter
    if (filters.price !== 'all') {
      filtered = filtered.filter(project => {
        const price = parseFloat(project.price_from?.replace(/[^0-9.]/g, '') || '0');
        switch (filters.price) {
          case 'under-1m':
            return price < 1000000;
          case '1m-2m':
            return price >= 1000000 && price < 2000000;
          case '2m-5m':
            return price >= 2000000 && price < 5000000;
          case '5m-plus':
            return price >= 5000000;
          default:
            return true;
        }
      });
    }

    // Location filter
    if (filters.location !== 'all') {
      filtered = filtered.filter(project =>
        project.location?.toLowerCase().includes(filters.location.toLowerCase()) ||
        project.area_name?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Developer filter
    if (filters.developer !== 'all') {
      filtered = filtered.filter(project =>
        project.developer_name?.toLowerCase() === filters.developer.toLowerCase()
      );
    }

    // Payment Plan filter
    if (filters.paymentPlan !== 'all') {
      filtered = filtered.filter(project =>
        project.payment_plan?.toLowerCase().includes(filters.paymentPlan.toLowerCase())
      );
    }

    // Completion Year filter
    if (filters.completionYear !== 'all') {
      filtered = filtered.filter(project => {
        const year = project.completion_date?.match(/\d{4}/)?.[0];
        if (filters.completionYear === '2028') {
          return year && parseInt(year) >= 2028;
        }
        return year === filters.completionYear;
      });
    }

    setFilteredProjects(filtered);
  }, [filters, projects]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.price !== 'all') params.set('price', filters.price);
    if (filters.location !== 'all') params.set('location', filters.location);
    if (filters.developer !== 'all') params.set('developer', filters.developer);
    if (filters.bedrooms !== 'all') params.set('bedrooms', filters.bedrooms);
    if (filters.paymentPlan !== 'all') params.set('paymentPlan', filters.paymentPlan);
    if (filters.completionYear !== 'all') params.set('completionYear', filters.completionYear);
    if (sort !== 'featured') params.set('sort', sort);

    const queryString = params.toString();
    const newUrl = queryString ? `/projects?${queryString}` : '/projects';

    // Update URL without page reload
    window.history.replaceState(null, '', newUrl);
  }, [filters, sort]);

  const resetFilters = () => {
    setFilters({
      price: 'all',
      location: 'all',
      developer: 'all',
      bedrooms: 'all',
      paymentPlan: 'all',
      completionYear: 'all',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border border-gray-200 shadow-lg rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-[#10B981] animate-pulse" />
            </div>
          </div>
          <p className="text-gray-600 text-lg font-semibold">Loading Premium Projects...</p>
        </div>
      </div>
    );
  }

  // Split projects for Option C layout
  const featuredProject = filteredProjects[0];
  const mediumProjects = filteredProjects.slice(1, 3);
  const smallProjects = filteredProjects.slice(3, 7);
  const remainingProjects = filteredProjects.slice(7);

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] relative overflow-hidden">
      {/* Subtle Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#10B981]/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-16 px-6 lg:px-16">
          <div className="max-w-[1600px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#10B981]/10 border-2 border-[#10B981] rounded-full px-6 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm font-bold text-[#10B981]">AI-POWERED DISCOVERY</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-[#0A0A0A] mb-6 leading-[1.05] tracking-tight">
              Dubai's Finest
              <br />
              <span className="text-[#D4AF37]">Off-Plan Projects</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
              {filteredProjects.length} premium developments curated by AI for maximum ROI
            </p>
          </div>
        </section>

        {/* UNIVERSAL FILTER BAR */}
        <section className="sticky top-20 z-50 px-6 lg:px-16 mb-12">
          <div className="max-w-[1600px] mx-auto">
            <div className="bg-white/95 backdrop-blur-xl border border-gray-200 shadow-lg rounded-3xl shadow-lg p-6">

              {/* FILTERS ROW */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
                {/* Price Range */}
                <div className="relative group">
                  <select
                    value={filters.price}
                    onChange={(e) => setFilters({ ...filters, price: e.target.value })}
                    className="w-full bg-[#F9FAFB] border-2 border-gray-200 hover:border-[#10B981] rounded-full px-4 py-3 text-[#0A0A0A] text-sm font-semibold focus:outline-none focus:border-[#10B981] transition-all appearance-none cursor-pointer"
                  >
                    <option value="all">Price Range</option>
                    <option value="under-1m">Under AED 1M</option>
                    <option value="1m-2m">AED 1M - 2M</option>
                    <option value="2m-5m">AED 2M - 5M</option>
                    <option value="5m-plus">AED 5M+</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#10B981] pointer-events-none" />
                </div>

                {/* Locations */}
                <div className="relative group">
                  <select
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    className="w-full bg-[#F9FAFB] border-2 border-gray-200 hover:border-[#10B981] rounded-full px-4 py-3 text-[#0A0A0A] text-sm font-semibold focus:outline-none focus:border-[#10B981] transition-all appearance-none cursor-pointer"
                  >
                    <option value="all">Locations</option>
                    <option value="downtown">Downtown Dubai</option>
                    <option value="marina">Dubai Marina</option>
                    <option value="hills">Dubai Hills</option>
                    <option value="creek">Dubai Creek</option>
                    <option value="south">Dubai South</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#10B981] pointer-events-none" />
                </div>

                {/* Developers */}
                <div className="relative group">
                  <select
                    value={filters.developer}
                    onChange={(e) => setFilters({ ...filters, developer: e.target.value })}
                    className="w-full bg-[#F9FAFB] border-2 border-gray-200 hover:border-[#10B981] rounded-full px-4 py-3 text-[#0A0A0A] text-sm font-semibold focus:outline-none focus:border-[#10B981] transition-all appearance-none cursor-pointer"
                  >
                    <option value="all">Developers</option>
                    <option value="emaar">Emaar</option>
                    <option value="damac">DAMAC</option>
                    <option value="nakheel">Nakheel</option>
                    <option value="meraas">Meraas</option>
                    <option value="sobha">Sobha</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#10B981] pointer-events-none" />
                </div>

                {/* Bedrooms */}
                <div className="relative group">
                  <select
                    value={filters.bedrooms}
                    onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                    className="w-full bg-[#F9FAFB] border-2 border-gray-200 hover:border-[#10B981] rounded-full px-4 py-3 text-[#0A0A0A] text-sm font-semibold focus:outline-none focus:border-[#10B981] transition-all appearance-none cursor-pointer"
                  >
                    <option value="all">Bedrooms</option>
                    <option value="studio">Studio</option>
                    <option value="1">1 BR</option>
                    <option value="2">2 BR</option>
                    <option value="3">3 BR</option>
                    <option value="4plus">4+ BR</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#10B981] pointer-events-none" />
                </div>

                {/* Payment Plan */}
                <div className="relative group">
                  <select
                    value={filters.paymentPlan}
                    onChange={(e) => setFilters({ ...filters, paymentPlan: e.target.value })}
                    className="w-full bg-[#F9FAFB] border-2 border-gray-200 hover:border-[#10B981] rounded-full px-4 py-3 text-[#0A0A0A] text-sm font-semibold focus:outline-none focus:border-[#10B981] transition-all appearance-none cursor-pointer"
                  >
                    <option value="all">Payment Plan</option>
                    <option value="80-20">80/20</option>
                    <option value="70-30">70/30</option>
                    <option value="60-40">60/40</option>
                    <option value="50-50">50/50</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#10B981] pointer-events-none" />
                </div>

                {/* Completion Year */}
                <div className="relative group">
                  <select
                    value={filters.completionYear}
                    onChange={(e) => setFilters({ ...filters, completionYear: e.target.value })}
                    className="w-full bg-[#F9FAFB] border-2 border-gray-200 hover:border-[#10B981] rounded-full px-4 py-3 text-[#0A0A0A] text-sm font-semibold focus:outline-none focus:border-[#10B981] transition-all appearance-none cursor-pointer"
                  >
                    <option value="all">Completion Year</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028+</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#10B981] pointer-events-none" />
                </div>
              </div>

              {/* BUTTONS ROW */}
              <div className="flex flex-wrap items-center gap-3">
                {/* AI Smart Filters */}
                <button className="group relative bg-[#10B981] px-6 py-3 rounded-full font-bold text-white hover:bg-[#059669] transition-all">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    <span>AI Smart Filters</span>
                  </div>
                </button>

                {/* Apply Filters */}
                <button className="bg-white border-2 border-[#10B981] hover:bg-[#10B981]/10 px-6 py-3 rounded-full font-bold text-[#10B981] transition-all">
                  Apply Filters
                </button>

                {/* Reset */}
                <button
                  onClick={resetFilters}
                  className="bg-white border-2 border-gray-200 hover:border-[#0A0A0A] px-5 py-3 rounded-full font-semibold text-gray-600 text-sm hover:text-[#0A0A0A] transition-all"
                >
                  <div className="flex items-center gap-2">
                    <X className="w-4 h-4" />
                    <span>Reset</span>
                  </div>
                </button>

                {/* Sort Dropdown */}
                <div className="ml-auto relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="bg-white border-2 border-[#D4AF37] hover:border-[#D4AF37] rounded-full px-5 py-3 pr-10 text-[#0A0A0A] text-sm font-semibold focus:outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="featured">Sort: Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="roi">Best ROI</option>
                    <option value="newest">Newest First</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37] pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OPTION C LAYOUT - PROJECTS GRID */}
        <section className="px-6 lg:px-16 pb-20">
          <div className="max-w-[1600px] mx-auto space-y-6">

            {filteredProjects.length === 0 ? (
              /* EMPTY STATE */
              <div className="text-center py-20 bg-[#F9FAFB] border border-gray-200 shadow-lg rounded-3xl">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-2xl font-bold text-[#0A0A0A] mb-3">No matching projects</h3>
                <p className="text-gray-600 mb-8">Try adjusting filters or let Genie find the best ones for you.</p>
                <Link href="/genie" className="bg-[#10B981] px-8 py-4 rounded-full font-bold text-white hover:bg-[#059669] transition-all inline-flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Ask Genie (AI)
                </Link>
              </div>
            ) : (
              <>
                {/* Featured Project */}
                {featuredProject && (
                  <Link
                    href={`/areas/${featuredProject.area_slug}/${featuredProject.slug}`}
                    className="group relative block overflow-hidden rounded-3xl border border-gray-200 shadow-lg hover:border-[#D4AF37] transition-all duration-500 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                  >
                    <div className="relative h-[480px] overflow-hidden">
                      <img
                        src={featuredProject.images?.[0] || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920'}
                        alt={featuredProject.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        suppressHydrationWarning
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent"></div>
                      {featuredProject.match_score && (
                        <div className="absolute top-6 right-6 z-20">
                          <div className="bg-[#D4AF37] rounded-2xl px-5 py-3 shadow-lg">
                            <div className="flex items-center gap-2">
                              <TrendingUp className="w-6 h-6 text-white" />
                              <span className="text-2xl font-black text-white">{featuredProject.match_score}%</span>
                              <span className="text-xs font-bold text-white/80 uppercase">ROI</span>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="absolute top-6 left-6 z-20">
                        <div className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-lg rounded-xl px-4 py-2.5 flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-[#D4AF37]" />
                          <span className="text-sm font-bold text-[#0A0A0A]">{featuredProject.developer_name}</span>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-10 z-20">
                        <h2 className="text-5xl font-black text-white mb-4 leading-tight group-hover:text-[#D4AF37] transition-colors">
                          {featuredProject.name}
                        </h2>
                        <div className="flex flex-wrap gap-3 mb-6">
                          {featuredProject.location && (
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-lg px-4 py-2">
                              <MapPin className="w-4 h-4 text-[#D4AF37]" />
                              <span className="text-sm font-semibold text-white">{featuredProject.location || featuredProject.area_name}</span>
                            </div>
                          )}
                          {featuredProject.completion_date && (
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-lg px-4 py-2">
                              <Calendar className="w-4 h-4 text-[#10B981]" />
                              <span className="text-sm font-semibold text-white">{featuredProject.completion_date}</span>
                            </div>
                          )}
                          {featuredProject.payment_plan && (
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-lg px-4 py-2">
                              <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                              <span className="text-sm font-semibold text-white">{featuredProject.payment_plan}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-xs text-gray-300 uppercase tracking-wider mb-1 font-semibold">Starting From</p>
                            <p className="text-5xl font-black text-[#10B981]">
                              {featuredProject.price_from || 'Contact for Price'}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 text-[#D4AF37] font-bold text-lg group-hover:gap-5 transition-all">
                            <span>View Details</span>
                            <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-[#0A0A0A] transition-all">
                              <ArrowRight className="w-6 h-6" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}

                {/* Medium Projects Grid */}
                {mediumProjects.length > 0 && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {mediumProjects.map((project) => (
                      <Link
                        key={project.id}
                        href={`/areas/${project.area_slug}/${project.slug}`}
                        className="group relative block overflow-hidden rounded-3xl border border-gray-200 shadow-lg hover:border-[#10B981] transition-all duration-500 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                      >
                        <div className="relative h-[360px] overflow-hidden">
                          <img
                            src={project.images?.[0] || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200'}
                            alt={project.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            suppressHydrationWarning
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent"></div>
                          {project.match_score && (
                            <div className="absolute top-4 right-4 z-20">
                              <div className="bg-[#D4AF37] rounded-xl px-4 py-2">
                                <div className="flex items-center gap-1.5">
                                  <TrendingUp className="w-5 h-5 text-white" />
                                  <span className="text-lg font-black text-white">{project.match_score}%</span>
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="absolute top-4 left-4 z-20">
                            <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-lg px-3 py-1.5 flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-[#D4AF37]" />
                              <span className="text-xs font-bold text-[#0A0A0A]">{project.developer_name}</span>
                            </div>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                            <h3 className="text-3xl font-black text-white mb-3 leading-tight group-hover:text-[#10B981] transition-colors">
                              {project.name}
                            </h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.location && (
                                <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md rounded-lg px-3 py-1.5">
                                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                                  <span className="text-xs font-semibold text-white">{project.location || project.area_name}</span>
                                </div>
                              )}
                              {project.completion_date && (
                                <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md rounded-lg px-3 py-1.5">
                                  <Calendar className="w-3.5 h-3.5 text-[#10B981]" />
                                  <span className="text-xs font-semibold text-white">{project.completion_date}</span>
                                </div>
                              )}
                            </div>
                            <div className="flex items-end justify-between">
                              <div>
                                <p className="text-xs text-gray-300 uppercase tracking-wider mb-1">From</p>
                                <p className="text-3xl font-black text-[#10B981]">{project.price_from || 'TBA'}</p>
                              </div>
                              <div className="text-[#D4AF37] group-hover:translate-x-1 transition-transform">
                                <ArrowRight className="w-6 h-6" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Small Projects Grid */}
                {smallProjects.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {smallProjects.map((project) => (
                      <Link
                        key={project.id}
                        href={`/areas/${project.area_slug}/${project.slug}`}
                        className="group relative block overflow-hidden rounded-2xl border border-gray-200 shadow-lg hover:border-[#10B981] transition-all duration-500 hover:-translate-y-1 shadow-md hover:shadow-lg"
                      >
                        <div className="relative h-[300px] overflow-hidden">
                          <img
                            src={project.images?.[0] || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800'}
                            alt={project.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            suppressHydrationWarning
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent"></div>
                          {project.match_score && (
                            <div className="absolute top-3 right-3 z-20">
                              <div className="bg-[#D4AF37] rounded-lg px-2.5 py-1.5">
                                <div className="flex items-center gap-1">
                                  <TrendingUp className="w-4 h-4 text-white" />
                                  <span className="text-sm font-black text-white">{project.match_score}%</span>
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="absolute top-3 left-3 z-20">
                            <div className="bg-white/90 backdrop-blur-md rounded-lg px-2.5 py-1.5">
                              <span className="text-xs font-bold text-[#0A0A0A]">{project.developer_name}</span>
                            </div>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                            <h4 className="text-lg font-black text-white mb-2 leading-tight group-hover:text-[#10B981] transition-colors line-clamp-2">
                              {project.name}
                            </h4>
                            <p className="text-xs text-gray-300 mb-3">{project.location || project.area_name}</p>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">From</p>
                                <p className="text-xl font-black text-[#10B981]">{project.price_from || 'TBA'}</p>
                              </div>
                              <div className="w-8 h-8 rounded-full border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-white transition-all">
                                <ArrowRight className="w-4 h-4" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Remaining Projects Grid */}
                {remainingProjects.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                    {remainingProjects.map((project) => (
                      <Link
                        key={project.id}
                        href={`/areas/${project.area_slug}/${project.slug}`}
                        className="group relative block overflow-hidden rounded-2xl border border-gray-200 shadow-lg hover:border-[#10B981] transition-all duration-500 hover:-translate-y-1 shadow-md hover:shadow-lg"
                      >
                        <div className="relative h-[320px] overflow-hidden">
                          <img
                            src={project.images?.[0] || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900'}
                            alt={project.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            suppressHydrationWarning
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent"></div>
                          {project.match_score && (
                            <div className="absolute top-4 right-4 z-20">
                              <div className="bg-[#D4AF37] rounded-lg px-3 py-2">
                                <div className="flex items-center gap-1.5">
                                  <TrendingUp className="w-4 h-4 text-white" />
                                  <span className="text-sm font-black text-white">{project.match_score}%</span>
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                            <h4 className="text-xl font-black text-white mb-2 leading-tight group-hover:text-[#10B981] transition-colors">
                              {project.name}
                            </h4>
                            <p className="text-sm text-gray-300 mb-3">{project.developer_name}</p>
                            <div className="flex items-end justify-between">
                              <div>
                                <p className="text-xs text-gray-400 uppercase">From</p>
                                <p className="text-2xl font-black text-[#10B981]">{project.price_from || 'TBA'}</p>
                              </div>
                              <ArrowRight className="w-5 h-5 text-[#D4AF37]" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
