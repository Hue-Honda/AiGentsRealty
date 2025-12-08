'use client';

import { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, FileText, Lightbulb, Building2, ArrowRight, Newspaper, BarChart3, Bell, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// Market insights background images
const carouselImages = [
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop', // Data analytics dashboard
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop', // Charts and graphs
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1920&h=1080&fit=crop', // Stock market charts
];

export default function InsightsPage() {
  const [email, setEmail] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    {
      title: 'Market News',
      icon: <Newspaper className="w-8 h-8" />,
      description: 'Latest market updates and trends',
      color: 'emerald',
    },
    {
      title: 'Monthly Reports',
      icon: <FileText className="w-8 h-8" />,
      description: 'Comprehensive market analysis',
      color: 'gold',
    },
    {
      title: 'Investment Insights',
      icon: <Lightbulb className="w-8 h-8" />,
      description: 'AI-powered investment strategies',
      color: 'emerald',
    },
    {
      title: 'Developer Updates',
      icon: <Building2 className="w-8 h-8" />,
      description: 'Latest from top developers',
      color: 'gold',
    }
  ];

  const trendingTopics = [
    'Dubai Market Trends',
    'Off-Plan Properties',
    'Dubai Creek Harbour',
    'Payment Plans',
    'DLD Regulations',
    'Rental Market'
  ];

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A]">
      {/* HERO SECTION WITH BACKGROUND CAROUSEL */}
      <section className="relative min-h-[600px] overflow-hidden">
        {/* Background Image Carousel */}
        <div className="absolute inset-0 z-0">
          {carouselImages.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={img}
                alt={`Market insights ${idx + 1}`}
                className="w-full h-full object-cover"
                suppressHydrationWarning
              />
            </div>
          ))}
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
        </div>

        {/* Subtle glow effects */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#10B981]/10 rounded-full blur-[120px]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 pt-32 text-center">
          <div className="inline-flex items-center gap-2 bg-[#10B981]/20 border border-[#10B981]/40 rounded-full px-6 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-[#10B981]" />
            <span className="text-sm font-bold text-[#10B981]">MARKET INTELLIGENCE</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Market Insights
            <br />
            <span className="text-[#D4AF37]">Coming Soon</span>
          </h1>

          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
            We're building a comprehensive insights platform with market analysis, reports, and investment strategies. Subscribe to be notified when we launch.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/geniev2" className="flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#E8C547] text-black px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all">
              <Sparkles className="w-5 h-5" />
              <span>Ask Genie for Insights</span>
            </Link>
            <Link href="/projects" className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all">
              <Building2 className="w-5 h-5" />
              <span>Browse Projects</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES PREVIEW */}
      <section className="px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-[#0A0A0A] mb-4">
              What We're Building
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive market intelligence to help you make informed investment decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                key={category.title}
                className={`bg-white border rounded-2xl p-8 shadow-md ${
                  category.color === 'emerald'
                    ? 'border-[#10B981]/20'
                    : 'border-[#D4AF37]/20'
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                  category.color === 'emerald'
                    ? 'bg-[#10B981]/10 text-[#10B981]'
                    : 'bg-[#D4AF37]/10 text-[#D4AF37]'
                }`}>
                  {category.icon}
                </div>

                <h3 className="text-xl font-bold text-[#0A0A0A] mb-3">
                  {category.title}
                </h3>

                <p className="text-sm text-gray-600 mb-4">{category.description}</p>

                <div className={`flex items-center gap-2 text-sm font-semibold ${
                  category.color === 'emerald' ? 'text-[#10B981]' : 'text-[#D4AF37]'
                }`}>
                  <Clock className="w-4 h-4" />
                  <span>Coming Soon</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI GENIE CTA */}
      <section className="px-6 lg:px-8 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-3xl p-12 shadow-md">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 px-4 py-2 rounded-full mb-4">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-xs font-bold text-[#D4AF37] uppercase">Available Now</span>
                </div>
                <h2 className="text-3xl font-black text-[#0A0A0A] mb-4">
                  Get Instant Market Insights with AI Genie
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  While we build our insights platform, you can ask our AI Genie for real-time market data, property recommendations, and investment analysis powered by Dubai Land Department data.
                </p>
                <Link href="/geniev2" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#E8C547] text-black px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all">
                  <Sparkles className="w-5 h-5" />
                  <span>Ask Genie Now</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="w-full lg:w-1/3">
                <div className="bg-gradient-to-br from-[#0A0A0A] to-[#1a1a1a] rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <span className="text-white font-semibold">Sample Questions</span>
                  </div>
                  <div className="space-y-3">
                    <div className="text-sm text-white/70 bg-white/5 rounded-lg px-3 py-2">
                      "What are the market trends in Dubai Marina?"
                    </div>
                    <div className="text-sm text-white/70 bg-white/5 rounded-lg px-3 py-2">
                      "Which areas have the highest transaction volume?"
                    </div>
                    <div className="text-sm text-white/70 bg-white/5 rounded-lg px-3 py-2">
                      "Compare Downtown vs Business Bay"
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING TOPICS */}
      <section className="px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white border border-gray-200 shadow-md rounded-3xl p-10">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-[#D4AF37]" />
              <h3 className="text-2xl font-black text-[#0A0A0A]">Popular Topics to Explore</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {trendingTopics.map((topic) => (
                <Link
                  key={topic}
                  href="/geniev2"
                  className="bg-gray-50 border border-[#10B981]/30 hover:border-[#10B981]/60 px-5 py-2.5 rounded-full text-sm font-semibold text-[#0A0A0A] hover:bg-[#10B981]/10 transition-all hover:-translate-y-0.5"
                >
                  {topic}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A] rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D4AF37] rounded-full blur-[120px]"></div>
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#10B981] rounded-full blur-[100px]"></div>
            </div>

            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#D4AF37]/20 rounded-2xl mb-6">
                <Bell className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">
                Get Notified When We Launch
              </h2>
              <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                Subscribe to receive updates about our insights platform, market reports, and exclusive investment opportunities.
              </p>
              <div className="max-w-xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-white/50 focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                  <button className="bg-gradient-to-r from-[#D4AF37] to-[#E8C547] px-8 py-4 rounded-xl font-bold text-black shadow-md hover:shadow-lg transition-all">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
