'use client';

import { Sparkles, Download, TrendingUp, TrendingDown, FileText, Calendar, BarChart3, DollarSign, Home, Percent, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ReportsPage() {
  const keyMetrics = [
    {
      label: 'Average Price',
      value: 'AED 1,450/sqft',
      change: '+8.5%',
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      label: 'Sales Volume',
      value: 'AED 145B',
      change: '+32%',
      trend: 'up',
      icon: <BarChart3 className="w-6 h-6" />
    },
    {
      label: 'Total Transactions',
      value: '18,450',
      change: '+15.2%',
      trend: 'up',
      icon: <Home className="w-6 h-6" />
    },
    {
      label: 'Average ROI',
      value: '13.5%',
      change: '+2.1%',
      trend: 'up',
      icon: <Percent className="w-6 h-6" />
    }
  ];

  const reports = [
    {
      month: 'November',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800',
      highlights: [
        'Record Q4 sales performance',
        'Luxury segment dominates 45% share',
        'Off-plan ROI averages 13.5%',
        'International buyers up 28%'
      ],
      downloadUrl: '#'
    },
    {
      month: 'October',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      highlights: [
        'Dubai Marina leads transactions',
        'Payment plan flexibility increases',
        'Average price per sqft rises 8%',
        'Rental yields stable at 7.2%'
      ],
      downloadUrl: '#'
    },
    {
      month: 'September',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
      highlights: [
        'Post-summer market surge',
        'Creek Harbour sees 200+ sales',
        'Villas outperform apartments',
        'Golden Visa impact evident'
      ],
      downloadUrl: '#'
    },
    {
      month: 'August',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      highlights: [
        'Summer stability maintained',
        'Developer incentives boost sales',
        'Expo City gains momentum',
        'Smart home demand rises'
      ],
      downloadUrl: '#'
    },
    {
      month: 'July',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      highlights: [
        'Mid-year growth continues',
        'Business Bay launches surge',
        'Foreign investment up 35%',
        'Mortgage approvals accelerate'
      ],
      downloadUrl: '#'
    },
    {
      month: 'June',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
      highlights: [
        'H1 concludes with strength',
        'Palm Jumeirah premium sales',
        'Developer handovers on time',
        'Market sentiment positive'
      ],
      downloadUrl: '#'
    },
    {
      month: 'May',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      highlights: [
        'Spring market acceleration',
        'New project launches peak',
        'Investor confidence high',
        'Rental market tightens'
      ],
      downloadUrl: '#'
    },
    {
      month: 'April',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      highlights: [
        'Q2 opens strong',
        'Affordable segment active',
        'DLD processes streamlined',
        'Secondary market grows'
      ],
      downloadUrl: '#'
    },
    {
      month: 'March',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800',
      highlights: [
        'Q1 exceeds expectations',
        'Arabian Ranches expansion',
        'Price appreciation steady',
        'Infrastructure upgrades'
      ],
      downloadUrl: '#'
    },
    {
      month: 'February',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
      highlights: [
        'Post-holiday momentum builds',
        'Emaar launches 3 projects',
        'International roadshows success',
        'Blockchain adoption grows'
      ],
      downloadUrl: '#'
    },
    {
      month: 'January',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
      highlights: [
        'Strong year opening',
        'Year-end deals close',
        'New regulations announced',
        'Developer partnerships form'
      ],
      downloadUrl: '#'
    },
    {
      month: 'December',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800',
      highlights: [
        '2023 concludes record year',
        'Holiday season active',
        'Future supply analyzed',
        'Market outlook positive'
      ],
      downloadUrl: '#'
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
              <span className="text-sm font-bold text-[#00C775]">COMPREHENSIVE ANALYSIS</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-white mb-6 leading-[1.05] tracking-tight">
              Monthly Market
              <br />
              <span className="bg-gradient-to-r from-[#F3C440] via-[#FFD700] to-[#F3C440] bg-clip-text text-transparent">
                Reports
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              In-depth market analysis and performance insights delivered monthly
            </p>
          </div>
        </section>

        {/* KEY METRICS SUMMARY */}
        <section className="px-6 lg:px-16 pb-16">
          <div className="max-w-[1600px] mx-auto">
            <div className="bg-gradient-to-br from-[#0D0D0D] via-[#0D0D0D] to-[#00C775]/5 backdrop-blur-xl border border-[#00C775]/20 rounded-3xl p-10">
              <div className="flex items-center gap-3 mb-8">
                <BarChart3 className="w-8 h-8 text-[#F3C440]" />
                <h2 className="text-3xl font-black text-white">Current Market Metrics</h2>
                <span className="text-sm text-gray-400 ml-auto">November 2024</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {keyMetrics.map((metric, index) => (
                  <div
                    key={index}
                    className="bg-[#0D0D0D]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-[#00C775]/60 transition-all hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        metric.trend === 'up' ? 'bg-[#00C775]/10 text-[#00C775]' : 'bg-red-500/10 text-red-500'
                      }`}>
                        {metric.icon}
                      </div>
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${
                        metric.trend === 'up' ? 'bg-[#00C775]/10 text-[#00C775]' : 'bg-red-500/10 text-red-500'
                      }`}>
                        {metric.trend === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                        {metric.change}
                      </div>
                    </div>
                    <div className="text-3xl font-black text-white mb-2">{metric.value}</div>
                    <div className="text-sm text-gray-400 uppercase font-semibold tracking-wide">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* REPORTS ARCHIVE */}
        <section className="px-6 lg:px-16 pb-20">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl lg:text-5xl font-black text-white">
                Reports <span className="text-[#00C775]">Archive</span>
              </h2>
              <div className="text-sm text-gray-400 font-semibold">
                {reports.length} reports available
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.map((report, index) => (
                <div
                  key={index}
                  className="group relative block overflow-hidden rounded-3xl border border-white/10 hover:border-[#00C775]/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,199,117,0.3)]"
                >
                  {/* Report Cover */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={report.image}
                      alt={`${report.month} ${report.year} Report`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>

                    {/* Month/Year Badge */}
                    <div className="absolute top-4 left-4 right-4 z-20">
                      <div className="bg-[#F3C440]/20 backdrop-blur-xl border border-[#F3C440]/50 rounded-xl px-4 py-3 text-center">
                        <div className="text-2xl font-black text-white">{report.month}</div>
                        <div className="text-sm font-bold text-gray-300">{report.year}</div>
                      </div>
                    </div>

                    {/* PDF Icon */}
                    <div className="absolute top-4 right-4 z-20">
                      <div className="w-12 h-12 bg-[#00C775]/20 backdrop-blur-xl border border-[#00C775]/50 rounded-xl flex items-center justify-center">
                        <FileText className="w-6 h-6 text-[#00C775]" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="bg-[#0D0D0D]/80 backdrop-blur-xl p-6">
                    <h3 className="text-xl font-black text-white mb-4 group-hover:text-[#00C775] transition-colors">
                      Market Report
                    </h3>

                    {/* Key Highlights */}
                    <div className="space-y-2 mb-6">
                      {report.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                          <div className="w-1.5 h-1.5 bg-[#00C775] rounded-full mt-1.5 flex-shrink-0"></div>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Download Button */}
                    <button className="w-full bg-gradient-to-r from-[#00C775] to-[#00A85D] px-6 py-3.5 rounded-full font-bold text-white shadow-[0_0_30px_rgba(0,199,117,0.4)] hover:shadow-[0_0_50px_rgba(0,199,117,0.6)] transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">
                      <Download className="w-5 h-5" />
                      <span>Download Report</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SUBSCRIBE CTA */}
        <section className="px-6 lg:px-16 pb-20">
          <div className="max-w-[1600px] mx-auto">
            <div className="bg-gradient-to-br from-[#0D0D0D] via-[#0D0D0D] to-[#F3C440]/5 backdrop-blur-xl border border-[#F3C440]/20 rounded-3xl p-12 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#F3C440]/10 rounded-2xl mb-6">
                <Calendar className="w-10 h-10 text-[#F3C440]" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
                Get Reports Delivered Monthly
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Subscribe to receive comprehensive market reports directly to your inbox
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-[#0D0D0D] border border-[#F3C440]/30 rounded-full px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#F3C440] transition-all"
                />
                <button className="bg-gradient-to-r from-[#F3C440] to-[#D4A936] px-8 py-4 rounded-full font-bold text-black shadow-[0_0_30px_rgba(243,196,64,0.4)] hover:shadow-[0_0_50px_rgba(243,196,64,0.6)] transition-all hover:-translate-y-1">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
