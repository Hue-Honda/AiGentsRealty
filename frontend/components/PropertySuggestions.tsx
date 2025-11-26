'use client';

import { useEffect, useState } from 'react';
import { MapPin, Calendar, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface Project {
  id: number;
  name: string;
  location: string;
  price_from: number;
  completion_date: string;
  match_score: number;
  images: string[];
  developer_name: string;
  area_name: string;
  area_slug: string;
}

export default function PropertySuggestions() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/projects/suggestions')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.projects) {
          setProjects(data.projects);
        } else {
          setProjects([]);
        }
      })
      .catch(err => {
        console.error('Error fetching suggestions:', err);
        setProjects([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-[#0A0A0A] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Sparkles className="w-12 h-12 text-[#10B981] animate-pulse mx-auto mb-4" />
            <p className="text-gray-400">Loading AI-powered suggestions...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return null;
  }

  // Split projects for broken grid layout: 1 hero + 2 medium + rest as micro cards
  const heroProject = projects[0];
  const mediumProjects = projects.slice(1, 3);
  const microProjects = projects.slice(3);

  return (
    <div className="bg-[#0A0A0A] py-20 border-t border-[#10B981]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header - Gold Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] bg-clip-text text-transparent">
              AI Suggestions for You
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            Curated properties with highest ROI potential
          </p>
        </div>

        {/* BROKEN GRID LAYOUT */}
        <div className="space-y-8">

          {/* Row 1: Big Hero Card + First Medium Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* BIG HERO CARD (2 columns) */}
            {heroProject && (
              <Link
                href={`/areas/${heroProject.area_slug}/${heroProject.id}`}
                className="lg:col-span-2 group relative bg-[#0A0A0A]/95 backdrop-blur-xl border-2 border-[#10B981]/40 rounded-3xl overflow-hidden hover:border-[#D4AF37] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] transition-all duration-500"
              >
                {/* Cinematic Image with Overlay */}
                <div className="relative h-[500px] overflow-hidden">
                  {heroProject.images && heroProject.images.length > 0 ? (
                    <>
                      <img
                        src={heroProject.images[0]}
                        alt={heroProject.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* Subtle Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent"></div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] flex items-center justify-center">
                      <Sparkles className="w-24 h-24 text-[#10B981]/20" />
                    </div>
                  )}

                  {/* ROI Badge - Emerald to Gold Gradient */}
                  {heroProject.match_score && (
                    <div className="absolute top-6 right-6 bg-gradient-to-r from-[#10B981] to-[#D4AF37] px-5 py-3 rounded-2xl shadow-2xl">
                      <span className="text-sm font-black text-black">
                        {heroProject.match_score}% ROI Match
                      </span>
                    </div>
                  )}

                  {/* Content - Absolute Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
                    <h3 className="text-3xl font-black text-white group-hover:text-[#D4AF37] transition-colors">
                      {heroProject.name}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPin className="w-5 h-5 text-[#D4AF37]" />
                      <span className="text-lg">{heroProject.location}</span>
                    </div>
                    <div className="flex items-center gap-6 pt-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">From</p>
                        <p className="text-2xl font-black text-[#D4AF37]">
                          AED {(heroProject.price_from / 1000000).toFixed(1)}M
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Completion</p>
                        <div className="flex items-center gap-1 text-gray-300">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm font-semibold">{heroProject.completion_date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* FIRST MEDIUM CARD (1 column) */}
            {mediumProjects[0] && (
              <Link
                href={`/areas/${mediumProjects[0].area_slug}/${mediumProjects[0].id}`}
                className="group bg-[#0A0A0A]/90 backdrop-blur-xl border border-[#10B981]/30 rounded-2xl overflow-hidden hover:border-[#D4AF37] hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  {mediumProjects[0].images && mediumProjects[0].images.length > 0 ? (
                    <>
                      <img
                        src={mediumProjects[0].images[0]}
                        alt={mediumProjects[0].name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent"></div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] flex items-center justify-center">
                      <Sparkles className="w-16 h-16 text-[#10B981]/20" />
                    </div>
                  )}

                  {mediumProjects[0].match_score && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-[#10B981] to-[#D4AF37] px-3 py-2 rounded-xl">
                      <span className="text-xs font-bold text-black">{mediumProjects[0].match_score}%</span>
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                    {mediumProjects[0].name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <MapPin className="w-4 h-4 text-[#10B981]" />
                    {mediumProjects[0].location}
                  </div>
                  <div className="pt-3 border-t border-[#10B981]/20">
                    <p className="text-lg font-black text-[#D4AF37]">
                      AED {(mediumProjects[0].price_from / 1000000).toFixed(1)}M
                    </p>
                  </div>
                </div>
              </Link>
            )}
          </div>

          {/* Row 2: Second Medium Card + Horizontal Micro Cards Scroll */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* SECOND MEDIUM CARD (1 column) */}
            {mediumProjects[1] && (
              <Link
                href={`/areas/${mediumProjects[1].area_slug}/${mediumProjects[1].id}`}
                className="group bg-[#0A0A0A]/90 backdrop-blur-xl border border-[#10B981]/30 rounded-2xl overflow-hidden hover:border-[#D4AF37] hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  {mediumProjects[1].images && mediumProjects[1].images.length > 0 ? (
                    <>
                      <img
                        src={mediumProjects[1].images[0]}
                        alt={mediumProjects[1].name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent"></div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] flex items-center justify-center">
                      <Sparkles className="w-16 h-16 text-[#10B981]/20" />
                    </div>
                  )}

                  {mediumProjects[1].match_score && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-[#10B981] to-[#D4AF37] px-3 py-2 rounded-xl">
                      <span className="text-xs font-bold text-black">{mediumProjects[1].match_score}%</span>
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                    {mediumProjects[1].name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <MapPin className="w-4 h-4 text-[#10B981]" />
                    {mediumProjects[1].location}
                  </div>
                  <div className="pt-3 border-t border-[#10B981]/20">
                    <p className="text-lg font-black text-[#D4AF37]">
                      AED {(mediumProjects[1].price_from / 1000000).toFixed(1)}M
                    </p>
                  </div>
                </div>
              </Link>
            )}

            {/* HORIZONTAL SCROLL MICRO CARDS (2 columns) */}
            {microProjects.length > 0 && (
              <div className="lg:col-span-2 relative">
                <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-track-[#0A0A0A] scrollbar-thumb-[#D4AF37] scrollbar-thumb-rounded">
                  <div className="flex gap-6 min-w-min">
                    {microProjects.map((project) => (
                      <Link
                        key={project.id}
                        href={`/areas/${project.area_slug}/${project.id}`}
                        className="group flex-shrink-0 w-72 bg-[#0A0A0A]/80 backdrop-blur-xl border border-[#10B981]/20 rounded-xl overflow-hidden hover:border-[#D4AF37] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-500"
                      >
                        <div className="relative h-48 overflow-hidden">
                          {project.images && project.images.length > 0 ? (
                            <>
                              <img
                                src={project.images[0]}
                                alt={project.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 to-transparent"></div>
                            </>
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] flex items-center justify-center">
                              <Sparkles className="w-12 h-12 text-[#10B981]/20" />
                            </div>
                          )}

                          {project.match_score && (
                            <div className="absolute top-3 right-3 bg-gradient-to-r from-[#10B981] to-[#D4AF37] px-2 py-1 rounded-lg">
                              <span className="text-xs font-bold text-black">{project.match_score}%</span>
                            </div>
                          )}
                        </div>

                        <div className="p-4 space-y-2">
                          <h4 className="text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                            {project.name}
                          </h4>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <MapPin className="w-3 h-3 text-[#10B981]" />
                            <span className="line-clamp-1">{project.location}</span>
                          </div>
                          <p className="text-base font-black text-[#D4AF37]">
                            AED {(project.price_from / 1000000).toFixed(1)}M
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
