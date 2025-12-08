'use client';

import { useState, useEffect, useMemo } from 'react';
import { Building2, CheckCircle, ChevronRight, ChevronDown, ChevronUp, Search, Sparkles } from 'lucide-react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

type FilterType = 'all' | 'most-projects' | 'verified';

interface Developer {
  id: number;
  name: string;
  slug: string;
  logo: string;
  description: string;
  website: string | null;
  project_count: string;
}

export default function DevelopersPage() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);

  // Fetch real data from API
  useEffect(() => {
    async function fetchDevelopers() {
      try {
        const response = await fetch(`${API_URL}/api/developers`);
        const data = await response.json();
        if (data.success && data.data) {
          setDevelopers(data.data);
        }
      } catch (error) {
        console.error('Error fetching developers:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchDevelopers();
  }, []);

  // Calculate stats from real data
  const stats = useMemo(() => {
    const totalProjects = developers.reduce((sum, d) => sum + parseInt(d.project_count || '0'), 0);
    const withProjects = developers.filter(d => parseInt(d.project_count || '0') > 0).length;
    return {
      totalProjects,
      developerCount: developers.length,
      activeDevs: withProjects
    };
  }, [developers]);

  // Filter and search logic
  const filteredDevelopers = useMemo(() => {
    let filtered = [...developers];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(dev =>
        dev.name.toLowerCase().includes(query) ||
        (dev.description && dev.description.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    switch (activeFilter) {
      case 'most-projects':
        filtered = filtered.sort((a, b) => parseInt(b.project_count || '0') - parseInt(a.project_count || '0'));
        break;
      case 'verified':
        // Top developers by project count are considered "verified elite"
        filtered = filtered
          .filter(d => parseInt(d.project_count || '0') > 0)
          .sort((a, b) => parseInt(b.project_count || '0') - parseInt(a.project_count || '0'));
        break;
      default:
        // Default: sort by project count
        filtered = filtered.sort((a, b) => parseInt(b.project_count || '0') - parseInt(a.project_count || '0'));
    }

    // Limit results unless showing all
    if (!showAll && !searchQuery.trim()) {
      filtered = filtered.slice(0, 12);
    }

    return filtered;
  }, [developers, searchQuery, activeFilter, showAll]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#10B981] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading developers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37] rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#10B981] rounded-full blur-[120px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/60 mb-8">
            <Link href="/" className="hover:text-[#10B981] transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Developers</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            Dubai's Top <span className="text-[#D4AF37]">Developers</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mb-8">
            Discover verified developers with proven track records in Dubai's off-plan property market.
          </p>

          {/* Stats Row - Real Data */}
          <div className="flex flex-wrap gap-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#10B981]/20 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-[#10B981]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.totalProjects}+</p>
                <p className="text-sm text-white/60">Active Projects</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.developerCount}</p>
                <p className="text-sm text-white/60">Developers</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#10B981]/20 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-[#10B981]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.activeDevs}</p>
                <p className="text-sm text-white/60">With Active Projects</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Search Bar */}
        <div className="max-w-xl mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.trim()) setShowAll(true);
              }}
              placeholder="Search developers by name..."
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl text-[#0A0A0A] placeholder:text-gray-400 focus:outline-none focus:border-[#10B981] transition-all shadow-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xl"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
              activeFilter === 'all'
                ? 'bg-[#10B981] text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Building2 className="w-4 h-4" />
            All Developers
          </button>
          <button
            onClick={() => { setActiveFilter('most-projects'); setSearchQuery(''); }}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
              activeFilter === 'most-projects'
                ? 'bg-[#10B981] text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Most Projects
          </button>
          <button
            onClick={() => { setActiveFilter('verified'); setSearchQuery(''); }}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
              activeFilter === 'verified'
                ? 'bg-[#10B981] text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            Verified Elite
          </button>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            {searchQuery ? (
              <>Found <span className="font-semibold text-[#10B981]">{filteredDevelopers.length}</span> developers matching "{searchQuery}"</>
            ) : showAll ? (
              <>Showing all <span className="font-semibold text-[#10B981]">{developers.length}</span> developers</>
            ) : (
              <>Showing top <span className="font-semibold text-[#10B981]">{filteredDevelopers.length}</span> developers</>
            )}
          </p>
          {!showAll && !searchQuery && developers.length > 12 && (
            <button
              onClick={() => setShowAll(true)}
              className="text-sm font-semibold text-[#10B981] hover:text-[#0D9668] transition-colors"
            >
              View all {developers.length} developers →
            </button>
          )}
        </div>

        {/* Developers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDevelopers.map((developer) => {
            const projectCount = parseInt(developer.project_count || '0');
            return (
              <Link
                key={developer.id}
                href={`/developers/${developer.slug}`}
                className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[#10B981]/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={developer.logo}
                    alt={developer.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(developer.name)}&size=400&background=1a365d&color=fff&bold=true`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                  {/* Verified Badge */}
                  {projectCount > 0 && (
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-[#10B981]" />
                      <span className="text-xs font-semibold text-[#0A0A0A]">Verified</span>
                    </div>
                  )}

                  {/* Project Count Badge */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-[#10B981] rounded-lg px-3 py-1.5">
                    <Building2 className="w-4 h-4 text-white" />
                    <span className="text-sm font-bold text-white">{projectCount} Projects</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0A0A0A] group-hover:text-[#10B981] transition-colors mb-3">
                    {developer.name}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3">
                    {developer.description || 'Leading developer in Dubai real estate market.'}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    {developer.website ? (
                      <span className="text-xs text-gray-400 truncate max-w-[150px]">
                        {developer.website.replace('https://', '').replace('www.', '')}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">Dubai, UAE</span>
                    )}
                    <span className="text-[#10B981] font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      View Projects
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredDevelopers.length === 0 && (
          <div className="text-center py-16">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">No developers found</h3>
            <p className="text-gray-500 mb-6">
              {searchQuery
                ? `No developers match "${searchQuery}". Try a different search term.`
                : 'No developers match the selected filter.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
                setShowAll(false);
              }}
              className="px-6 py-3 bg-[#10B981] text-white rounded-lg font-semibold hover:bg-[#0D9668] transition-colors"
            >
              Show all developers
            </button>
          </div>
        )}

        {/* Show All Button */}
        {!showAll && !searchQuery && developers.length > 12 && filteredDevelopers.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-[#10B981] text-[#10B981] rounded-xl font-bold hover:bg-[#10B981] hover:text-white transition-all shadow-lg"
            >
              <Building2 className="w-5 h-5" />
              Show All {developers.length} Developers
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Show Less Button */}
        {showAll && !searchQuery && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(false)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-300 text-gray-600 rounded-xl font-bold hover:border-[#10B981] hover:text-[#10B981] transition-all"
            >
              <ChevronUp className="w-5 h-5" />
              Show Less
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
