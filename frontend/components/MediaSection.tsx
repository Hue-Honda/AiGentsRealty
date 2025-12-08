'use client';

import { Play, Newspaper, Tv, Radio, Globe, ExternalLink } from 'lucide-react';

// Media mentions and press coverage
const mediaLogos = [
  { name: 'Gulf News', type: 'newspaper' },
  { name: 'Arabian Business', type: 'magazine' },
  { name: 'Khaleej Times', type: 'newspaper' },
  { name: 'The National', type: 'newspaper' },
  { name: 'Dubai Eye', type: 'radio' },
  { name: 'Bloomberg', type: 'tv' },
];

const videoFeatures = [
  {
    id: 1,
    title: 'Dubai Off-Plan Investment Guide 2025',
    source: 'AiGents Exclusive',
    thumbnail: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=450&fit=crop',
    duration: '12:45',
    views: '25K+',
    link: '#',
  },
  {
    id: 2,
    title: 'Top 5 Areas for High ROI in Dubai',
    source: 'AiGents Exclusive',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=450&fit=crop',
    duration: '15:30',
    views: '18K+',
    link: '#',
  },
  {
    id: 3,
    title: 'Understanding Payment Plans',
    source: 'AiGents Exclusive',
    thumbnail: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=450&fit=crop',
    duration: '10:20',
    views: '12K+',
    link: '#',
  },
  {
    id: 4,
    title: 'Dubai Marina vs Downtown Dubai',
    source: 'AiGents Exclusive',
    thumbnail: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&h=450&fit=crop',
    duration: '18:15',
    views: '31K+',
    link: '#',
  },
];

const stats = [
  { value: '50+', label: 'Media Features' },
  { value: '1M+', label: 'Content Views' },
  { value: '10+', label: 'Publications' },
  { value: '25+', label: 'Video Guides' },
];

export default function MediaSection() {
  const getLogoIcon = (type: string) => {
    switch (type) {
      case 'newspaper':
        return <Newspaper className="w-4 h-4 text-gray-500 group-hover:text-[#10B981]" />;
      case 'magazine':
        return <Globe className="w-4 h-4 text-gray-500 group-hover:text-[#10B981]" />;
      case 'radio':
        return <Radio className="w-4 h-4 text-gray-500 group-hover:text-[#10B981]" />;
      case 'tv':
        return <Tv className="w-4 h-4 text-gray-500 group-hover:text-[#10B981]" />;
      default:
        return <Globe className="w-4 h-4 text-gray-500 group-hover:text-[#10B981]" />;
    }
  };

  return (
    <section className="relative py-16 lg:py-20 overflow-hidden bg-[#F9FAFB]">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#10B981]/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative max-w-[1800px] mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37] px-4 py-2 rounded-full mb-4">
            <Tv className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">As Seen In</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-[#0A0A0A] mb-4">
            Media & <span className="text-[#10B981]">Press</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trusted by leading publications and media outlets across the UAE and beyond
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 shadow-md rounded-xl p-4 text-center hover:border-[#10B981] hover:shadow-lg transition-all"
            >
              <div className="text-3xl lg:text-4xl font-black text-[#0A0A0A] mb-1">{stat.value}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Logo Row */}
        <div className="relative mb-12 overflow-hidden py-6 bg-white rounded-xl border border-gray-200 shadow-md">
          <div className="flex items-center justify-center gap-4 flex-wrap px-4">
            {mediaLogos.map((media, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 px-5 py-3 bg-[#F9FAFB] rounded-lg border border-gray-200 hover:border-[#10B981] transition-all group cursor-pointer"
              >
                <div className="w-8 h-8 bg-[#10B981]/10 rounded-lg flex items-center justify-center group-hover:bg-[#10B981]/20 transition-all">
                  {getLogoIcon(media.type)}
                </div>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-[#0A0A0A] transition-all">{media.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Video Cards Grid - 4 in a row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {videoFeatures.map((video) => (
            <a
              key={video.id}
              href={video.link}
              className="group relative bg-white border border-gray-200 shadow-md rounded-2xl overflow-hidden hover:border-[#10B981] hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  suppressHydrationWarning
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                {/* Play Button - Centered */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-[#10B981] group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs text-white font-bold">
                  {video.duration}
                </div>

                {/* Views Badge */}
                <div className="absolute top-3 left-3 bg-[#10B981]/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs text-white font-bold flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  {video.views}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="text-xs text-[#D4AF37] font-bold uppercase tracking-wider mb-2">{video.source}</div>
                <h3 className="text-sm font-bold text-[#0A0A0A] mb-3 line-clamp-2 group-hover:text-[#10B981] transition-colors leading-snug">
                  {video.title}
                </h3>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Play className="w-3 h-3" />
                    Watch Now
                  </span>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#10B981] transition-colors" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
