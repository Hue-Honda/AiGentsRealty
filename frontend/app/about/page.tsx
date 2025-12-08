'use client';

import { Building2, Award, Users, TrendingUp, Target, Shield, Star, MapPin, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { value: '500+', label: 'Properties Sold', icon: Building2 },
  { value: '15+', label: 'Years Experience', icon: Award },
  { value: '1,200+', label: 'Happy Clients', icon: Users },
  { value: '4.9', label: 'Client Rating', icon: Star },
];

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
    description: 'Our AI-powered analytics help you make informed decisions based on real market data and trends.',
  },
];

const milestones = [
  { year: '2010', title: 'Company Founded', description: 'Started with a vision to revolutionize Dubai real estate' },
  { year: '2015', title: 'First 100 Deals', description: 'Milestone achievement helping clients find their dream properties' },
  { year: '2020', title: 'AI Integration', description: 'Launched AI-powered property matching and ROI analysis' },
  { year: '2024', title: 'Market Leader', description: 'Recognized as top off-plan property consultancy in Dubai' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      {/* Subtle Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#10B981]/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37] px-4 py-2 rounded-full mb-6">
            <Building2 className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">About Us</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-[#0A0A0A] mb-6">
            Your Trusted Partner in{' '}
            <span className="text-[#10B981]">Dubai Real Estate</span>
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            AiGentsRealty combines 15+ years of Dubai market expertise with cutting-edge AI technology
            to help investors find the perfect off-plan properties with maximum ROI potential.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-gray-200 shadow-lg rounded-2xl p-6 text-center hover:border-[#10B981] transition-all group shadow-md hover:shadow-lg"
              >
                <div className="w-12 h-12 bg-[#10B981]/10 border border-[#10B981]/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#10B981]/20 transition-all">
                  <Icon className="w-6 h-6 text-[#10B981]" />
                </div>
                <div className="text-3xl lg:text-4xl font-black text-[#0A0A0A] mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Our Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl lg:text-4xl font-black text-[#0A0A0A] mb-6">
              Our <span className="text-[#D4AF37]">Story</span>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Founded by Ahmed Zakaria, AiGentsRealty was born from a simple belief: every investor
                deserves access to the same quality insights and opportunities as industry insiders.
              </p>
              <p>
                With over 15 years of experience in Dubai's dynamic real estate market, our team has
                witnessed the incredible transformation of this city and helped hundreds of clients
                capitalize on its growth.
              </p>
              <p>
                Today, we combine our deep market knowledge with artificial intelligence to provide
                unparalleled property analysis, ROI predictions, and personalized investment recommendations.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden border border-gray-200 shadow-lg shadow-lg">
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
                  className="bg-white border border-gray-200 shadow-lg rounded-2xl p-8 hover:border-[#10B981] transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
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

        {/* Timeline Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-[#0A0A0A] mb-4">
              Our <span className="text-[#D4AF37]">Journey</span>
            </h2>
          </div>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#10B981] via-[#D4AF37] to-[#10B981] hidden lg:block"></div>

            <div className="space-y-8">
              {milestones.map((milestone, idx) => (
                <div key={idx} className={`flex items-center gap-8 ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className={`flex-1 ${idx % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-6 inline-block shadow-md hover:border-[#D4AF37] transition-all">
                      <div className="text-2xl font-black text-[#D4AF37] mb-2">{milestone.year}</div>
                      <h3 className="text-lg font-bold text-[#0A0A0A] mb-1">{milestone.title}</h3>
                      <p className="text-sm text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="hidden lg:flex w-4 h-4 bg-[#10B981] rounded-full border-4 border-white shadow-md z-10"></div>
                  <div className="flex-1 hidden lg:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-[#F9FAFB] border border-gray-200 shadow-lg rounded-3xl p-8 lg:p-12 mb-20 shadow-lg">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-black text-[#0A0A0A] mb-4">
              Why Choose <span className="text-[#10B981]">AiGentsRealty</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              'AI-powered property matching & ROI analysis',
              'Direct developer relationships for best prices',
              'Comprehensive after-sales support',
              'Transparent fee structure with no hidden costs',
              'Multilingual team (English, Arabic, Russian, Hindi)',
              'Licensed & regulated by RERA',
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
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Let our experts help you find the perfect property investment in Dubai.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#10B981] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#059669] transition-all border border-[#10B981] hover:border-[#059669]"
            >
              Contact Us
            </Link>
            <Link
              href="/genie"
              className="inline-flex items-center justify-center gap-2 bg-white border border-[#D4AF37] text-[#D4AF37] px-8 py-4 rounded-xl font-bold hover:bg-[#D4AF37]/10 transition-all"
            >
              Ask Genie AI
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
