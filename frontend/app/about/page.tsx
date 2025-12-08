'use client';

import { useState, useEffect } from 'react';
import { Building2, Award, Users, TrendingUp, Target, Shield, Star, MapPin, CheckCircle, Sparkles, Database, Brain } from 'lucide-react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const values = [
  {
    icon: Target,
    title: 'Client-First Approach',
    description: 'Your investment goals are our priority. We tailor our services to match your unique requirements and timeline.',
  },
  {
    icon: Shield,
    title: 'Transparency & Trust',
    description: 'No hidden fees, no surprises. We provide complete transparency in all transactions and communications.',
  },
  {
    icon: TrendingUp,
    title: 'Data-Driven Insights',
    description: 'Our AI-powered analytics help you make informed decisions based on real Dubai Land Department data.',
  },
];

export default function AboutPage() {
  const [stats, setStats] = useState({
    projects: 0,
    developers: 0,
    areas: 0,
    transactions: '1.6M+'
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [projectsRes, developersRes, areasRes] = await Promise.all([
          fetch(`${API_URL}/api/projects`),
          fetch(`${API_URL}/api/developers`),
          fetch(`${API_URL}/api/areas`)
        ]);

        const [projectsData, developersData, areasData] = await Promise.all([
          projectsRes.json(),
          developersRes.json(),
          areasRes.json()
        ]);

        setStats({
          projects: projectsData.data?.length || 0,
          developers: developersData.data?.length || 0,
          areas: areasData.data?.length || 0,
          transactions: '1.6M+'
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    }

    fetchStats();
  }, []);

  const platformStats = [
    { value: stats.projects.toString(), label: 'Projects Listed', icon: Building2 },
    { value: stats.developers.toString(), label: 'Developers', icon: Award },
    { value: stats.areas.toString(), label: 'Areas Covered', icon: MapPin },
    { value: stats.transactions, label: 'DLD Transactions', icon: Database },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37] rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#10B981] rounded-full blur-[120px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 pt-32 text-center">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">About Us</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-white mb-6">
            AI-Powered{' '}
            <span className="text-[#D4AF37]">Dubai Real Estate</span>
          </h1>
          <p className="text-white/70 max-w-3xl mx-auto text-lg leading-relaxed">
            AiGentsRealty combines cutting-edge AI technology with comprehensive Dubai Land Department data
            to help investors discover the perfect off-plan properties in Dubai.
          </p>
        </div>
      </section>

      {/* Stats Section - Real Platform Stats */}
      <div className="relative -mt-12 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {platformStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 shadow-lg rounded-2xl p-6 text-center hover:border-[#10B981] transition-all"
                >
                  <div className="w-12 h-12 bg-[#10B981]/10 border border-[#10B981]/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-[#10B981]" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-black text-[#0A0A0A] mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* What We Do Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl lg:text-4xl font-black text-[#0A0A0A] mb-6">
              What We <span className="text-[#10B981]">Do</span>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                AiGentsRealty is a next-generation real estate platform designed specifically for
                Dubai's off-plan property market. We provide investors with AI-powered insights
                and recommendations based on real market data.
              </p>
              <p>
                Our platform aggregates data from the Dubai Land Department (DLD), featuring over
                1.6 million historical transactions. This allows our AI Genie to provide accurate
                market analysis, price trends, and area comparisons.
              </p>
              <p>
                Whether you're a first-time investor or an experienced property buyer, our tools
                help you make informed decisions backed by real data, not speculation.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden border border-gray-200 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=800&fit=crop"
                alt="Dubai Skyline"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 text-white">
                  <MapPin className="w-5 h-5 text-[#D4AF37]" />
                  <span className="font-semibold">Dubai, UAE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Technology Section */}
        <div className="bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A] rounded-3xl p-8 lg:p-12 mb-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D4AF37] rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#10B981] rounded-full blur-[100px]"></div>
          </div>

          <div className="relative">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 px-4 py-2 rounded-full mb-4">
                <Brain className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-xs font-bold text-[#D4AF37] uppercase">AI Technology</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">
                Powered by <span className="text-[#D4AF37]">AI Genie</span>
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Our AI assistant analyzes real DLD data to provide personalized property recommendations,
                market insights, and investment analysis.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Database className="w-10 h-10 text-[#10B981] mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Real DLD Data</h3>
                <p className="text-white/60 text-sm">Access to 1.6M+ historical transactions from Dubai Land Department</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <TrendingUp className="w-10 h-10 text-[#D4AF37] mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Market Analysis</h3>
                <p className="text-white/60 text-sm">Real-time price trends, transaction volumes, and area comparisons</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Sparkles className="w-10 h-10 text-[#10B981] mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Smart Recommendations</h3>
                <p className="text-white/60 text-sm">AI-powered property matching based on your preferences and budget</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-[#0A0A0A] mb-4">
              Our <span className="text-[#10B981]">Values</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-[#10B981] transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="w-14 h-14 bg-[#10B981] rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A0A0A] mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 lg:p-12 mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-black text-[#0A0A0A] mb-4">
              Why Choose <span className="text-[#10B981]">AiGentsRealty</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              'AI-powered property search & recommendations',
              'Real Dubai Land Department transaction data',
              'Comprehensive developer & project database',
              'Transparent market analysis with no guesswork',
              'Free AI Genie assistant for market insights',
              'User-friendly platform for all investors',
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-[#10B981] shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#0A0A0A] mb-4">
            Ready to Explore Dubai Real Estate?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Start your property search with AI-powered insights and real market data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 bg-[#10B981] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#059669] transition-all"
            >
              <Building2 className="w-5 h-5" />
              Browse Projects
            </Link>
            <Link
              href="/geniev2"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#E8C547] text-black px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all"
            >
              <Sparkles className="w-5 h-5" />
              Ask Genie AI
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
