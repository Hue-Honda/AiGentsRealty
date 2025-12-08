'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Building2, MapPin, Phone, Mail, Calendar, Award,
  CheckCircle2, Clock, Sparkles, Globe,
  ArrowRight, Bed, Home, ChevronRight
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface Project {
  id: number;
  name: string;
  slug: string;
  description: string;
  starting_price: string;
  price_range: string;
  bedrooms: string;
  completion_date: string;
  status: string;
  image: string;
  area_name?: string;
  area_slug?: string;
}

interface Developer {
  id: number;
  name: string;
  slug: string;
  logo: string;
  description: string;
  website: string | null;
  projects: Project[];
  project_count: number;
}

export default function DeveloperPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('projects');

  useEffect(() => {
    async function fetchDeveloper() {
      if (!slug) return;

      try {
        const response = await fetch(`${API_URL}/api/developers/${slug}`);
        const data = await response.json();

        if (data.success && data.data) {
          setDeveloper(data.data);
        } else {
          setError('Developer not found');
        }
      } catch (err) {
        console.error('Error fetching developer:', err);
        setError('Failed to load developer');
      } finally {
        setLoading(false);
      }
    }

    fetchDeveloper();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#10B981] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading developer...</p>
        </div>
      </div>
    );
  }

  if (error || !developer) {
    return (
      <div className="min-h-screen bg-white text-[#0A0A0A] flex items-center justify-center pt-20">
        <div className="text-center">
          <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Developer Not Found</h1>
          <p className="text-gray-600 mb-8">The developer "{slug}" doesn't exist in our database.</p>
          <Link href="/developers" className="inline-flex items-center gap-2 bg-[#10B981] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#0D9668] transition-colors">
            Browse All Developers
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  const completedProjects = developer.projects.filter(p => p.status === 'Completed' || p.status === 'Ready').length;
  const activeProjects = developer.project_count - completedProjects;

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A]">
      {/* HERO BANNER */}
      <div className="relative min-h-[500px] overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37] rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#10B981] rounded-full blur-[120px]"></div>
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 pt-32">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/60 mb-8">
            <Link href="/" className="hover:text-[#10B981] transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/developers" className="hover:text-[#10B981] transition-colors">Developers</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{developer.name}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Developer Logo */}
            <div className="w-32 h-32 bg-white rounded-2xl overflow-hidden shadow-xl flex-shrink-0">
              <img
                src={developer.logo}
                alt={developer.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(developer.name)}&size=200&background=1a365d&color=fff&bold=true`;
                }}
              />
            </div>

            <div className="flex-1">
              {/* Badges Row */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] via-[#E8C547] to-[#D4AF37] text-black px-4 py-2 rounded-full text-xs font-bold shadow-md">
                  <Award className="w-4 h-4" />
                  <span>VERIFIED PARTNER</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] px-4 py-2 rounded-full text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>RERA LICENSED</span>
                </div>
              </div>

              {/* Developer Name */}
              <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                {developer.name}
              </h1>

              {/* Description */}
              <p className="text-white/70 leading-relaxed mb-6 max-w-2xl">
                {developer.description || `${developer.name} is a leading property developer in Dubai's real estate market.`}
              </p>

              {/* Info Row */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-white/60">
                  <MapPin className="w-5 h-5 text-[#D4AF37]" />
                  <span>Dubai, UAE</span>
                </div>
                {developer.website && (
                  <a
                    href={developer.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/60 hover:text-[#10B981] transition-colors"
                  >
                    <Globe className="w-5 h-5 text-[#10B981]" />
                    <span>{developer.website.replace('https://', '').replace('www.', '')}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="relative -mt-8 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border-2 border-[#D4AF37]/30 rounded-2xl p-6 text-center shadow-lg hover:border-[#D4AF37]/60 transition-all">
              <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Building2 className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div className="text-3xl font-black text-[#0A0A0A] mb-1">{developer.project_count}</div>
              <div className="text-xs font-semibold text-gray-600 uppercase">Total Projects</div>
            </div>

            <div className="bg-white border-2 border-[#10B981]/30 rounded-2xl p-6 text-center shadow-lg hover:border-[#10B981]/60 transition-all">
              <div className="w-12 h-12 bg-[#10B981]/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6 text-[#10B981]" />
              </div>
              <div className="text-3xl font-black text-[#0A0A0A] mb-1">{completedProjects}</div>
              <div className="text-xs font-semibold text-gray-600 uppercase">Completed</div>
            </div>

            <div className="bg-white border-2 border-[#D4AF37]/30 rounded-2xl p-6 text-center shadow-lg hover:border-[#D4AF37]/60 transition-all">
              <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div className="text-3xl font-black text-[#0A0A0A] mb-1">{activeProjects}</div>
              <div className="text-xs font-semibold text-gray-600 uppercase">Active</div>
            </div>

            <div className="bg-white border-2 border-[#10B981]/30 rounded-2xl p-6 text-center shadow-lg hover:border-[#10B981]/60 transition-all">
              <div className="w-12 h-12 bg-[#10B981]/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-[#10B981]" />
              </div>
              <div className="text-3xl font-black text-[#0A0A0A] mb-1">Dubai</div>
              <div className="text-xs font-semibold text-gray-600 uppercase">Location</div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* TABS */}
        <div className="flex items-center gap-6 mb-12 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('projects')}
            className={`pb-4 px-2 font-bold text-lg transition-all relative ${
              activeTab === 'projects' ? 'text-[#0A0A0A]' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Projects ({developer.project_count})
            {activeTab === 'projects' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#10B981] rounded-full"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`pb-4 px-2 font-bold text-lg transition-all relative ${
              activeTab === 'about' ? 'text-[#0A0A0A]' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            About
            {activeTab === 'about' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#10B981] rounded-full"></div>
            )}
          </button>
        </div>

        {/* PROJECTS GRID */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {developer.projects.length > 0 ? (
              developer.projects.map((project) => (
                <Link key={project.id} href={`/projects/${project.slug}`}>
                  <div className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[#10B981]/60 transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl">
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&q=90`;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                      {/* Status Badge */}
                      <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                        project.status === 'Off Plan' ? 'bg-[#10B981] text-white' :
                        project.status === 'Ready' ? 'bg-[#D4AF37] text-black' :
                        'bg-white/90 text-[#0A0A0A]'
                      }`}>
                        {project.status}
                      </div>

                      {/* Area Badge */}
                      {project.area_name && (
                        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
                          <MapPin className="w-4 h-4 text-[#D4AF37]" />
                          <span className="text-xs font-semibold text-[#0A0A0A]">{project.area_name}</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-[#0A0A0A] mb-2 group-hover:text-[#10B981] transition-colors">
                        {project.name}
                      </h3>

                      {/* Price */}
                      <div className="text-xl font-black text-[#10B981] mb-3">
                        {project.starting_price ? `From AED ${parseInt(project.starting_price).toLocaleString()}` : project.price_range || 'Price on Request'}
                      </div>

                      {/* Details */}
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        {project.bedrooms && (
                          <div className="flex items-center gap-1">
                            <Bed className="w-4 h-4 text-[#D4AF37]" />
                            <span>{project.bedrooms}</span>
                          </div>
                        )}
                        {project.completion_date && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-[#D4AF37]" />
                            <span>{project.completion_date}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-3 text-center py-20">
                <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg mb-4">No projects available for this developer yet.</p>
                <Link href="/projects" className="inline-flex items-center gap-2 text-[#10B981] font-semibold hover:gap-3 transition-all">
                  Browse All Projects
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ABOUT TAB */}
        {activeTab === 'about' && (
          <div className="max-w-3xl">
            <div className="prose prose-lg">
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                {developer.description || `${developer.name} is a premier property developer in Dubai's real estate market, known for delivering high-quality residential and commercial projects.`}
              </p>

              <h3 className="text-xl font-bold text-[#0A0A0A] mb-4">Portfolio Overview</h3>
              <p className="text-gray-600 leading-relaxed">
                {developer.name} has a portfolio of {developer.project_count} project{developer.project_count !== 1 ? 's' : ''} in Dubai,
                with {completedProjects} completed and {activeProjects} currently in development.
                The developer focuses on creating premium properties across various locations in Dubai.
              </p>

              {developer.website && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-[#0A0A0A] mb-4">Official Website</h3>
                  <a
                    href={developer.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#10B981] font-semibold hover:gap-3 transition-all"
                  >
                    <Globe className="w-5 h-5" />
                    Visit {developer.name} Website
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* CTA SECTION */}
      <div className="relative py-16 overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D4AF37] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#10B981] rounded-full blur-[100px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wide">AI-Powered Insights</span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-black text-white mb-6 leading-tight">
            Want Personalized Recommendations?
          </h2>

          <p className="text-lg text-white/70 font-medium mb-8 max-w-2xl mx-auto">
            Let our AI Genie analyze {developer.name}'s portfolio and recommend the perfect project based on your investment goals and preferences.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/geniev2" className="flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#E8C547] text-black px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all">
              <Sparkles className="w-5 h-5" />
              <span>Ask Genie</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/projects" className="flex items-center gap-2 bg-[#10B981] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#0D9668] transition-all">
              <Home className="w-5 h-5" />
              <span>Browse All Projects</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
