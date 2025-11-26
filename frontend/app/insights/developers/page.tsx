'use client';

import { Sparkles, Building2, TrendingUp, Star, Award, Trophy, Calendar, MapPin, Users, ArrowRight, ChevronRight, Rocket, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';

export default function DevelopersPage() {
  const latestUpdates = [
    {
      id: 1,
      developer: 'Emaar Properties',
      title: 'Three New Waterfront Projects Announced in Dubai Creek Harbour',
      date: '2024-11-20',
      category: 'New Launch',
      image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200',
      excerpt: 'Emaar unveils ambitious expansion with three luxury waterfront developments totaling 2,500 units, featuring innovative payment plans and premium amenities.',
      badge: 'Just Announced'
    },
    {
      id: 2,
      developer: 'DAMAC Properties',
      title: 'DAMAC Hills 2 Reaches 85% Construction Completion',
      date: '2024-11-18',
      category: 'Progress Update',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200',
      excerpt: 'Major milestone achieved with all residential units on track for Q2 2025 handover. Early buyers reporting 18% capital appreciation.',
      badge: 'On Schedule'
    },
    {
      id: 3,
      developer: 'Nakheel',
      title: 'Palm Jebel Ali Phase 3 Launch Date Confirmed',
      date: '2024-11-15',
      category: 'New Launch',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200',
      excerpt: 'Nakheel confirms Q1 2025 launch for 3,000 waterfront units with early bird pricing starting AED 2.5M. VIP registration now open.',
      badge: 'Coming Soon'
    },
    {
      id: 4,
      developer: 'Sobha Realty',
      title: 'Sobha Hartland 2 Records 100% Sales in Latest Release',
      date: '2024-11-12',
      category: 'Sales Achievement',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200',
      excerpt: 'All 450 units sold within 48 hours of launch, demonstrating strong market confidence. New phase announcement expected January 2025.',
      badge: 'Sold Out'
    },
    {
      id: 5,
      developer: 'Dubai Holding',
      title: 'Marsa Al Arab Resort Development Timeline Accelerated',
      date: '2024-11-10',
      category: 'Progress Update',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200',
      excerpt: 'Construction timeline shortened by 6 months with new completion date Q3 2025. Marine infrastructure 70% complete.',
      badge: 'Fast Track'
    },
    {
      id: 6,
      developer: 'Select Group',
      title: 'Select Group Wins Best Developer Award 2024',
      date: '2024-11-08',
      category: 'Recognition',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200',
      excerpt: 'Recognized for innovation and on-time delivery. 97% completion rate across 15 active projects in Dubai Marina and JBR.',
      badge: 'Award Winner'
    }
  ];

  const newLaunches = [
    {
      project: 'Azure Heights',
      developer: 'Emaar',
      location: 'Dubai Creek Harbour',
      units: 850,
      priceFrom: 'AED 1.2M',
      launchDate: 'Dec 2024',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
    },
    {
      project: 'Marina Pearl',
      developer: 'Select Group',
      location: 'Dubai Marina',
      units: 420,
      priceFrom: 'AED 1.8M',
      launchDate: 'Dec 2024',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800'
    },
    {
      project: 'Oasis Gardens',
      developer: 'DAMAC',
      location: 'DAMAC Hills',
      units: 650,
      priceFrom: 'AED 980K',
      launchDate: 'Jan 2025',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    }
  ];

  const progressUpdates = [
    {
      project: 'Dubai Creek Tower',
      developer: 'Emaar',
      completion: 75,
      status: 'On Track',
      expectedHandover: 'Q4 2025',
      milestone: 'Structural work completed'
    },
    {
      project: 'DAMAC Hills 2',
      developer: 'DAMAC',
      completion: 85,
      status: 'Ahead of Schedule',
      expectedHandover: 'Q2 2025',
      milestone: 'Interior finishing phase'
    },
    {
      project: 'Bluewaters Residences',
      developer: 'Meraas',
      completion: 60,
      status: 'On Track',
      expectedHandover: 'Q3 2026',
      milestone: 'Facade installation ongoing'
    },
    {
      project: 'Palm Gateway',
      developer: 'Nakheel',
      completion: 45,
      status: 'On Track',
      expectedHandover: 'Q4 2026',
      milestone: 'Foundation work complete'
    },
    {
      project: 'Sobha One',
      developer: 'Sobha Realty',
      completion: 92,
      status: 'Near Completion',
      expectedHandover: 'Q1 2025',
      milestone: 'Final inspections underway'
    }
  ];

  const developerRankings = [
    {
      rank: 1,
      name: 'Emaar Properties',
      score: 98,
      onTimeDelivery: 96,
      satisfaction: 4.8,
      activeProjects: 45,
      logo: '🏆'
    },
    {
      rank: 2,
      name: 'Sobha Realty',
      score: 96,
      onTimeDelivery: 97,
      satisfaction: 4.7,
      activeProjects: 19,
      logo: '⭐'
    },
    {
      rank: 3,
      name: 'DAMAC Properties',
      score: 94,
      onTimeDelivery: 94,
      satisfaction: 4.6,
      activeProjects: 38,
      logo: '🥇'
    },
    {
      rank: 4,
      name: 'Nakheel',
      score: 93,
      onTimeDelivery: 95,
      satisfaction: 4.7,
      activeProjects: 28,
      logo: '🌟'
    },
    {
      rank: 5,
      name: 'Select Group',
      score: 92,
      onTimeDelivery: 97,
      satisfaction: 4.6,
      activeProjects: 22,
      logo: '💎'
    },
    {
      rank: 6,
      name: 'Meraas',
      score: 91,
      onTimeDelivery: 93,
      satisfaction: 4.5,
      activeProjects: 15,
      logo: '✨'
    },
    {
      rank: 7,
      name: 'Dubai Holding',
      score: 90,
      onTimeDelivery: 92,
      satisfaction: 4.5,
      activeProjects: 12,
      logo: '🏅'
    },
    {
      rank: 8,
      name: 'Azizi Developments',
      score: 88,
      onTimeDelivery: 90,
      satisfaction: 4.4,
      activeProjects: 32,
      logo: '⚡'
    },
    {
      rank: 9,
      name: 'Deyaar',
      score: 86,
      onTimeDelivery: 89,
      satisfaction: 4.3,
      activeProjects: 18,
      logo: '🔷'
    },
    {
      rank: 10,
      name: 'Omniyat',
      score: 85,
      onTimeDelivery: 91,
      satisfaction: 4.4,
      activeProjects: 8,
      logo: '💫'
    }
  ];

  const partnerships = [
    {
      title: 'Emaar & Trump Organization Renew Partnership',
      description: 'Extended collaboration for 5 new luxury developments across Dubai',
      date: '2024-11-15'
    },
    {
      title: 'DAMAC Partners with Bugatti for Branded Residences',
      description: 'Exclusive automotive-inspired luxury living experience in Business Bay',
      date: '2024-11-10'
    },
    {
      title: 'Nakheel & Marriott International Strategic Alliance',
      description: '10 new hospitality projects planned for Palm Jumeirah expansion',
      date: '2024-11-05'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* AI PARTICLE GLOW BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00C775]/5 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#F3C440]/5 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#00C775]/3 rounded-full blur-[200px]"></div>
      </div>

      {/* NEURAL GRID OVERLAY */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#00C775 1px, transparent 1px), linear-gradient(90deg, #00C775 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}></div>
      </div>

      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-16 px-6 lg:px-16">
          <div className="max-w-[1600px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#00C775]/10 border border-[#00C775]/30 rounded-full px-6 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-[#00C775]" />
              <span className="text-sm font-bold text-[#00C775]">DEVELOPER INTELLIGENCE</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-white mb-6 leading-[1.05] tracking-tight">
              Developer News
              <br />
              <span className="bg-gradient-to-r from-[#F3C440] via-[#FFD700] to-[#F3C440] bg-clip-text text-transparent">
                & Updates
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Stay informed with the latest from Dubai's top property developers
            </p>
          </div>
        </section>

        {/* LATEST UPDATES */}
        <section className="px-6 lg:px-16 pb-16">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl lg:text-5xl font-black text-white">
                Latest <span className="text-[#00C775]">Updates</span>
              </h2>
              <Link href="/insights/news" className="flex items-center gap-2 text-[#F3C440] font-bold hover:gap-3 transition-all">
                <span>View All News</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {latestUpdates.map((update) => (
                <div
                  key={update.id}
                  className="group relative block overflow-hidden rounded-3xl border border-white/10 hover:border-[#00C775]/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,199,117,0.3)] cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="relative w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
                      <img
                        src={update.image}
                        alt={update.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />

                      {/* Badge */}
                      <div className="absolute top-4 left-4 z-20">
                        <div className="bg-[#F3C440] text-black px-3 py-1.5 rounded-lg text-xs font-bold">
                          {update.badge}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-[#0D0D0D]/80 backdrop-blur-xl p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Building2 className="w-4 h-4 text-[#00C775]" />
                        <span className="text-xs font-bold text-[#00C775] uppercase">{update.developer}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{update.category}</span>
                      </div>

                      <h3 className="text-xl font-black text-white mb-3 leading-tight group-hover:text-[#00C775] transition-colors line-clamp-2">
                        {update.title}
                      </h3>

                      <p className="text-sm text-gray-400 mb-4 line-clamp-2">{update.excerpt}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(update.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-2 text-[#F3C440] font-bold text-sm group-hover:gap-3 transition-all">
                          <span>Read More</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NEW LAUNCHES */}
        <section className="px-6 lg:px-16 pb-16">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Rocket className="w-8 h-8 text-[#F3C440]" />
              <h2 className="text-4xl lg:text-5xl font-black text-white">
                Upcoming <span className="text-[#F3C440]">Launches</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {newLaunches.map((launch, index) => (
                <div
                  key={index}
                  className="group relative block overflow-hidden rounded-3xl border border-[#F3C440]/20 hover:border-[#F3C440]/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(243,196,64,0.3)]"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={launch.image}
                      alt={launch.project}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

                    {/* Launch Date */}
                    <div className="absolute top-4 right-4 z-20">
                      <div className="bg-[#F3C440] text-black px-3 py-2 rounded-xl text-center">
                        <div className="text-xs font-bold">{launch.launchDate}</div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <div className="text-xs font-bold text-[#00C775] uppercase mb-2">{launch.developer}</div>
                      <h3 className="text-2xl font-black text-white mb-2 group-hover:text-[#F3C440] transition-colors">
                        {launch.project}
                      </h3>
                      <div className="flex items-center gap-2 mb-3 text-sm text-gray-300">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{launch.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-black text-[#00C775]">{launch.priceFrom}</div>
                        <div className="text-sm text-gray-400">{launch.units} units</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONSTRUCTION PROGRESS */}
        <section className="px-6 lg:px-16 pb-16">
          <div className="max-w-[1600px] mx-auto">
            <div className="bg-gradient-to-br from-[#0D0D0D] via-[#0D0D0D] to-[#00C775]/5 backdrop-blur-xl border border-[#00C775]/20 rounded-3xl p-10">
              <div className="flex items-center gap-3 mb-8">
                <Clock className="w-8 h-8 text-[#00C775]" />
                <h2 className="text-3xl font-black text-white">Construction Progress Updates</h2>
              </div>

              <div className="space-y-6">
                {progressUpdates.map((project, index) => (
                  <div
                    key={index}
                    className="bg-[#0D0D0D]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-[#00C775]/60 transition-all"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-black text-white">{project.project}</h3>
                          <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                            project.status === 'Ahead of Schedule'
                              ? 'bg-[#00C775]/10 text-[#00C775]'
                              : project.status === 'Near Completion'
                              ? 'bg-[#F3C440]/10 text-[#F3C440]'
                              : 'bg-white/10 text-white'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5" />
                            {project.developer}
                          </span>
                          <span>•</span>
                          <span>{project.milestone}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        {/* Progress Bar */}
                        <div className="flex-1 lg:w-48">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-500 uppercase">Progress</span>
                            <span className="text-sm font-black text-[#00C775]">{project.completion}%</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#00C775] to-[#00A85D] rounded-full transition-all"
                              style={{ width: `${project.completion}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Handover */}
                        <div className="text-right">
                          <div className="text-xs text-gray-500 uppercase mb-1">Handover</div>
                          <div className="text-sm font-bold text-white">{project.expectedHandover}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* DEVELOPER RANKINGS */}
        <section className="px-6 lg:px-16 pb-16">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Trophy className="w-8 h-8 text-[#F3C440]" />
              <h2 className="text-4xl lg:text-5xl font-black text-white">
                Developer <span className="text-[#F3C440]">Rankings</span>
              </h2>
            </div>

            <div className="bg-[#0D0D0D]/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr className="border-b border-white/10">
                      <th className="text-left py-4 px-6 text-sm font-bold text-gray-400 uppercase tracking-wider">Rank</th>
                      <th className="text-left py-4 px-6 text-sm font-bold text-gray-400 uppercase tracking-wider">Developer</th>
                      <th className="text-center py-4 px-6 text-sm font-bold text-gray-400 uppercase tracking-wider">Score</th>
                      <th className="text-center py-4 px-6 text-sm font-bold text-gray-400 uppercase tracking-wider">On-Time %</th>
                      <th className="text-center py-4 px-6 text-sm font-bold text-gray-400 uppercase tracking-wider">Rating</th>
                      <th className="text-center py-4 px-6 text-sm font-bold text-gray-400 uppercase tracking-wider">Projects</th>
                    </tr>
                  </thead>
                  <tbody>
                    {developerRankings.map((dev) => (
                      <tr key={dev.rank} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{dev.logo}</span>
                            <span className="text-2xl font-black text-[#F3C440]">#{dev.rank}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <Link href={`/developers/${dev.name.toLowerCase().replace(/\s+/g, '-')}`} className="font-bold text-white hover:text-[#00C775] transition-colors">
                            {dev.name}
                          </Link>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="text-2xl font-black text-[#00C775]">{dev.score}</span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="text-lg font-bold text-white">{dev.onTimeDelivery}%</span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Star className="w-4 h-4 fill-[#F3C440] text-[#F3C440]" />
                            <span className="text-lg font-bold text-white">{dev.satisfaction}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="text-lg font-bold text-gray-400">{dev.activeProjects}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* PARTNERSHIPS */}
        <section className="px-6 lg:px-16 pb-20">
          <div className="max-w-[1600px] mx-auto">
            <div className="bg-gradient-to-br from-[#0D0D0D] via-[#0D0D0D] to-[#F3C440]/5 backdrop-blur-xl border border-[#F3C440]/20 rounded-3xl p-10">
              <div className="flex items-center gap-3 mb-8">
                <Users className="w-8 h-8 text-[#F3C440]" />
                <h2 className="text-3xl font-black text-white">Strategic Partnerships</h2>
              </div>

              <div className="space-y-4">
                {partnerships.map((partnership, index) => (
                  <div
                    key={index}
                    className="bg-[#0D0D0D]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-[#F3C440]/60 transition-all hover:-translate-y-1 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-black text-white mb-2 group-hover:text-[#F3C440] transition-colors">
                          {partnership.title}
                        </h3>
                        <p className="text-sm text-gray-400">{partnership.description}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-xs text-gray-500">
                          {new Date(partnership.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        <ArrowRight className="w-5 h-5 text-[#F3C440] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
