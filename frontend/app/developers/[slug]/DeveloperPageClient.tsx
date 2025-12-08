'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Building2, MapPin, Phone, Mail, Calendar, Star, Award,
  TrendingUp, CheckCircle2, Clock, Target, Sparkles,
  ArrowRight, Bed, CreditCard, Home, ChevronRight
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface DeveloperPageClientProps {
  developer: any;
  slug: string;
}

export default function DeveloperPageClient({ developer, slug }: DeveloperPageClientProps) {
  const [activeTab, setActiveTab] = useState('projects');

  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // HERO FADE IN
      if (heroRef.current) {
        gsap.from(heroRef.current.querySelector('.hero-content'), {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: 'power3.out',
          delay: 0.2
        });
      }

      // STATS CARDS STAGGER
      if (statsRef.current) {
        const cards = statsRef.current.querySelectorAll('.stat-card');
        gsap.set(cards, { opacity: 1 });

        gsap.from(cards, {
          opacity: 0,
          y: 40,
          scale: 0.9,
          duration: 0.6,
          stagger: 0.08,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      }

      // PROJECT CARDS
      if (projectsRef.current) {
        const cards = projectsRef.current.querySelectorAll('.project-card');
        gsap.set(cards, { opacity: 1 });

        gsap.from(cards, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: projectsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        });
      }
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [slug]);

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A]">
      {/* HERO BANNER */}
      <div ref={heroRef} className="relative h-[70vh] min-h-[600px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={developer.heroImage}
            alt={developer.name}
            className="w-full h-full object-cover"
            suppressHydrationWarning
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/50"></div>
        </div>

        {/* Hero Content */}
        <div className="hero-content relative max-w-[1600px] mx-auto px-6 lg:px-16 h-full flex flex-col justify-center pt-24">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-200 mb-6">
            <Link href="/" className="hover:text-[#10B981] transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/explore" className="hover:text-[#10B981] transition-colors">Explore</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{developer.name}</span>
          </div>

          {/* Hero Card */}
          <div className="max-w-4xl bg-white/95 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 lg:p-12 shadow-lg">
            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {developer.verified && (
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] via-[#E8C547] to-[#D4AF37] text-black px-4 py-2 rounded-full text-xs font-bold shadow-md">
                  <Award className="w-4 h-4" />
                  <span>VERIFIED PARTNER</span>
                </div>
              )}
              {developer.reraLicensed && (
                <div className="inline-flex items-center gap-2 bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] px-4 py-2 rounded-full text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>RERA LICENSED</span>
                </div>
              )}
              <div className="inline-flex items-center gap-1 text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(developer.rating) ? 'fill-[#D4AF37]' : 'fill-gray-300'}`} />
                ))}
                <span className="text-sm font-semibold ml-2">{developer.rating}</span>
              </div>
            </div>

            {/* Developer Name */}
            <h1 className="text-5xl lg:text-7xl font-black text-[#0A0A0A] mb-4 leading-none tracking-tight">
              {developer.name}
            </h1>

            {/* Tagline */}
            <p className="text-xl text-[#D4AF37] font-semibold mb-6">
              {developer.tagline}
            </p>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-8 max-w-2xl">
              {developer.description}
            </p>

            {/* Info Icons */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Location</div>
                  <div className="text-sm text-[#0A0A0A] font-semibold">{developer.location}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#10B981]/20 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#10B981]" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Established</div>
                  <div className="text-sm text-[#0A0A0A] font-semibold">{developer.established}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Phone</div>
                  <div className="text-sm text-[#0A0A0A] font-semibold">{developer.phone}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#10B981]/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#10B981]" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Email</div>
                  <div className="text-sm text-[#0A0A0A] font-semibold truncate">{developer.email}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS GRID */}
      <div ref={statsRef} className="relative -mt-20 z-10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="stat-card bg-white border-2 border-[#D4AF37]/30 rounded-2xl p-6 text-center shadow-md hover:border-[#D4AF37]/60 transition-all">
              <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Building2 className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div className="text-3xl font-black text-[#0A0A0A] mb-1">{developer.stats.totalProjects}</div>
              <div className="text-xs font-semibold text-gray-600 uppercase">Total Projects</div>
            </div>

            <div className="stat-card bg-white border-2 border-[#10B981]/30 rounded-2xl p-6 text-center shadow-md hover:border-[#10B981]/60 transition-all">
              <div className="w-12 h-12 bg-[#10B981]/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6 text-[#10B981]" />
              </div>
              <div className="text-3xl font-black text-[#0A0A0A] mb-1">{developer.stats.completed}</div>
              <div className="text-xs font-semibold text-gray-600 uppercase">Completed</div>
            </div>

            <div className="stat-card bg-white border-2 border-[#D4AF37]/30 rounded-2xl p-6 text-center shadow-md hover:border-[#D4AF37]/60 transition-all">
              <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div className="text-3xl font-black text-[#0A0A0A] mb-1">{developer.stats.active}</div>
              <div className="text-xs font-semibold text-gray-600 uppercase">Active</div>
            </div>

            <div className="stat-card bg-white border-2 border-[#10B981]/30 rounded-2xl p-6 text-center shadow-md hover:border-[#10B981]/60 transition-all">
              <div className="w-12 h-12 bg-[#10B981]/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-[#10B981]" />
              </div>
              <div className="text-3xl font-black text-[#0A0A0A] mb-1">{developer.stats.onTimeDelivery}%</div>
              <div className="text-xs font-semibold text-gray-600 uppercase">On-Time Delivery</div>
            </div>

            <div className="stat-card bg-white border-2 border-[#D4AF37]/30 rounded-2xl p-6 text-center shadow-md hover:border-[#D4AF37]/60 transition-all">
              <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div className="text-3xl font-black text-[#0A0A0A] mb-1">{developer.stats.avgRoi}</div>
              <div className="text-xs font-semibold text-gray-600 uppercase">Avg ROI</div>
            </div>

            <div className="stat-card bg-white border-2 border-[#10B981]/30 rounded-2xl p-6 text-center shadow-md hover:border-[#10B981]/60 transition-all">
              <div className="w-12 h-12 bg-[#10B981]/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-[#10B981]" />
              </div>
              <div className="text-3xl font-black text-[#0A0A0A] mb-1">{developer.stats.customerSatisfaction}%</div>
              <div className="text-xs font-semibold text-gray-600 uppercase">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: PROJECTS SECTION */}
          <div className="lg:col-span-8">
            {/* TABS */}
            <div className="flex items-center gap-6 mb-12 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('projects')}
                className={`pb-4 px-2 font-bold text-lg transition-all relative ${
                  activeTab === 'projects' ? 'text-[#0A0A0A]' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Projects
                {activeTab === 'projects' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37] rounded-full"></div>
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
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37] rounded-full"></div>
                )}
              </button>
            </div>

            {/* PROJECTS GRID */}
            {activeTab === 'projects' && (
              <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {developer.projects.length > 0 ? (
                  developer.projects.map((project: any) => (
                    <Link key={project.id} href={`/projects/${project.slug}`}>
                      <div className="project-card group relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[#10B981]/60 transition-all duration-500 shadow-md hover:shadow-lg">
                        {/* Image */}
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            suppressHydrationWarning
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                          {/* ROI Badge */}
                          <div className="absolute top-4 right-4 bg-[#10B981] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                            {project.roi} ROI
                          </div>
                        </div>

                        {/* Bottom Panel */}
                        <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-5">
                          <h3 className="text-xl font-black text-[#0A0A0A] mb-2 group-hover:text-[#10B981] transition-colors">
                            {project.name}
                          </h3>

                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                            <MapPin className="w-4 h-4 text-[#D4AF37]" />
                            <span>{project.location}</span>
                          </div>

                          <div className="flex items-center justify-between mb-3">
                            <div className="text-2xl font-black text-[#10B981]">{project.price}</div>
                          </div>

                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div className="flex items-center gap-1">
                              <Bed className="w-3 h-3 text-[#D4AF37]" />
                              <span className="text-gray-600">{project.bedrooms}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-[#D4AF37]" />
                              <span className="text-gray-600">{project.completion}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <CreditCard className="w-3 h-3 text-[#D4AF37]" />
                              <span className="text-gray-600">{project.paymentPlan}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-20">
                    <p className="text-gray-600 text-lg">No projects available for this developer.</p>
                  </div>
                )}
              </div>
            )}

            {/* ABOUT TAB */}
            {activeTab === 'about' && (
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                  {developer.description}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  With over {new Date().getFullYear() - developer.established} years of experience in the real estate industry,
                  {developer.name} has established itself as a trusted name in Dubai's property market. The company's commitment
                  to quality, innovation, and customer satisfaction has resulted in {developer.stats.completed} successfully
                  completed projects with an impressive {developer.stats.onTimeDelivery}% on-time delivery rate.
                </p>
              </div>
            )}
          </div>

          {/* RIGHT: SIDEBAR */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-lg sticky top-24">
              <h3 className="text-2xl font-black text-[#0A0A0A] mb-6">Performance Metrics</h3>

              {/* Progress Bars */}
              <div className="space-y-6 mb-8">
                {Object.entries(developer.performance).map(([key, value]: [string, any]) => (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-[#D4AF37] capitalize">{key}</span>
                      <span className="text-lg font-black text-[#0A0A0A]">{value}%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#10B981] to-[#10B981]/80 rounded-full transition-all duration-1000"
                        style={{ width: `${value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] px-6 py-4 rounded-xl font-bold hover:bg-[#D4AF37]/10 transition-all">
                  <Home className="w-5 h-5" />
                  <span>View All Projects</span>
                </button>
                <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#10B981] to-[#10B981]/80 text-white px-6 py-4 rounded-xl font-bold hover:shadow-lg transition-all">
                  <Sparkles className="w-5 h-5" />
                  <span>Ask Genie</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] via-[#E8C547] to-[#D4AF37]"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzBoLTJ2LTJoMnYyem0wIDRoLTJ2LTJoMnYyem0wIDRoLTJ2LTJoMnYyem0wIDRoLTJ2LTJoMnYyem0wIDRoLTJ2LTJoMnYyem0wIDRoLTJ2LTJoMnYyem0wIDRoLTJ2LTJoMnYyem0wIDRoLTJ2LTJoMnYyem0wIDRoLTJ2LTJoMnYyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        </div>

        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-16 text-center">
          <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-black" />
            <span className="text-xs font-bold text-black uppercase tracking-wide">AI-Powered Insights</span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-black text-black mb-6 leading-tight">
            Want Personalized Developer Insights?
          </h2>

          <p className="text-xl text-black/80 font-medium mb-10 max-w-3xl mx-auto">
            Let our AI Genie analyze {developer.name}'s portfolio and recommend the perfect project based on your investment goals, budget, and preferences.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="flex items-center gap-2 bg-black text-[#D4AF37] border-2 border-black px-8 py-4 rounded-xl font-bold hover:bg-black/90 transition-all shadow-md">
              <Sparkles className="w-5 h-5" />
              <span>Ask Genie</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-2 bg-[#10B981] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#10B981]/90 transition-all shadow-md">
              <Home className="w-5 h-5" />
              <span>View Full Portfolio</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
