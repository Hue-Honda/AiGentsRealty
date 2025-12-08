'use client';

import { useState, useEffect } from 'react';
import { MapPin, Sparkles, Building2, ArrowRight, Mail, Phone, Clock } from 'lucide-react';
import Link from 'next/link';

// Commercial property images for carousel
const carouselImages = [
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop', // Modern office building
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop', // Office interior
  'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920&h=1080&fit=crop', // Commercial building
];

export default function CommercialPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
                alt={`Commercial property ${idx + 1}`}
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
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-full px-6 py-2 mb-6 backdrop-blur-sm">
            <Building2 className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-sm font-bold text-[#D4AF37]">COMMERCIAL PROPERTIES</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Commercial Real Estate
            <br />
            <span className="text-[#D4AF37]">Coming Soon</span>
          </h1>

          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            We're expanding our platform to include premium commercial properties in Dubai.
            Register your interest to be notified when we launch.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/geniev2" className="flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#E8C547] text-black px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105">
              <Sparkles className="w-5 h-5" />
              <span>Ask Genie About Commercial</span>
            </Link>
            <Link href="/projects" className="flex items-center gap-2 bg-white/10 border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all backdrop-blur-sm">
              <Building2 className="w-5 h-5" />
              <span>View Residential Projects</span>
            </Link>
          </div>
        </div>
      </section>

      {/* PROPERTY TYPES SECTION */}
      <section className="px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-[#0A0A0A] mb-4">
              Property Types We'll Cover
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Dubai's commercial real estate market offers diverse investment opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Office Space */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-[#10B981]/50 transition-all hover:-translate-y-1 shadow-md hover:shadow-lg">
              <div className="w-14 h-14 bg-[#10B981]/10 rounded-2xl flex items-center justify-center mb-6">
                <Building2 className="w-7 h-7 text-[#10B981]" />
              </div>
              <h3 className="text-xl font-bold text-[#0A0A0A] mb-3">Office Spaces</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Premium office spaces in Business Bay, DIFC, and other prime business districts.
              </p>
              <div className="flex items-center gap-2 text-[#10B981] font-semibold text-sm">
                <Clock className="w-4 h-4" />
                <span>Coming Soon</span>
              </div>
            </div>

            {/* Retail */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-[#D4AF37]/50 transition-all hover:-translate-y-1 shadow-md hover:shadow-lg">
              <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="w-7 h-7 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-bold text-[#0A0A0A] mb-3">Retail Spaces</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                High-footfall retail locations in malls, high streets, and community centers.
              </p>
              <div className="flex items-center gap-2 text-[#D4AF37] font-semibold text-sm">
                <Clock className="w-4 h-4" />
                <span>Coming Soon</span>
              </div>
            </div>

            {/* Warehouses */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-[#10B981]/50 transition-all hover:-translate-y-1 shadow-md hover:shadow-lg">
              <div className="w-14 h-14 bg-[#10B981]/10 rounded-2xl flex items-center justify-center mb-6">
                <Building2 className="w-7 h-7 text-[#10B981]" />
              </div>
              <h3 className="text-xl font-bold text-[#0A0A0A] mb-3">Warehouses</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Logistics and warehouse facilities in Dubai South, Jebel Ali, and industrial zones.
              </p>
              <div className="flex items-center gap-2 text-[#10B981] font-semibold text-sm">
                <Clock className="w-4 h-4" />
                <span>Coming Soon</span>
              </div>
            </div>

            {/* Showrooms */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-[#D4AF37]/50 transition-all hover:-translate-y-1 shadow-md hover:shadow-lg">
              <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center mb-6">
                <Building2 className="w-7 h-7 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-bold text-[#0A0A0A] mb-3">Showrooms</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Automotive showrooms and retail display spaces along Sheikh Zayed Road.
              </p>
              <div className="flex items-center gap-2 text-[#D4AF37] font-semibold text-sm">
                <Clock className="w-4 h-4" />
                <span>Coming Soon</span>
              </div>
            </div>

            {/* Mixed-Use */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-[#10B981]/50 transition-all hover:-translate-y-1 shadow-md hover:shadow-lg">
              <div className="w-14 h-14 bg-[#10B981]/10 rounded-2xl flex items-center justify-center mb-6">
                <Building2 className="w-7 h-7 text-[#10B981]" />
              </div>
              <h3 className="text-xl font-bold text-[#0A0A0A] mb-3">Mixed-Use</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Combined retail, office, and residential developments in prime locations.
              </p>
              <div className="flex items-center gap-2 text-[#10B981] font-semibold text-sm">
                <Clock className="w-4 h-4" />
                <span>Coming Soon</span>
              </div>
            </div>

            {/* Free Zone */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-[#D4AF37]/50 transition-all hover:-translate-y-1 shadow-md hover:shadow-lg">
              <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center mb-6">
                <Building2 className="w-7 h-7 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-bold text-[#0A0A0A] mb-3">Free Zone Offices</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Tax-advantaged office spaces in DMCC, DAFZA, and other free zones.
              </p>
              <div className="flex items-center gap-2 text-[#D4AF37] font-semibold text-sm">
                <Clock className="w-4 h-4" />
                <span>Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REGISTER INTEREST */}
      <section className="px-6 lg:px-8 py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black text-[#0A0A0A] mb-4">
            Interested in Commercial Properties?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Contact us to discuss your commercial real estate requirements. Our team can help you find the right investment opportunity.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <a href="mailto:info@aigentsrealty.com" className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-6 py-4 hover:border-[#10B981] transition-all shadow-md hover:shadow-lg">
              <div className="w-12 h-12 bg-[#10B981]/10 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-[#10B981]" />
              </div>
              <div className="text-left">
                <div className="text-sm text-gray-500">Email Us</div>
                <div className="font-semibold text-[#0A0A0A]">info@aigentsrealty.com</div>
              </div>
            </a>

            <a href="tel:+971500000000" className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-6 py-4 hover:border-[#D4AF37] transition-all shadow-md hover:shadow-lg">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center">
                <Phone className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div className="text-left">
                <div className="text-sm text-gray-500">Call Us</div>
                <div className="font-semibold text-[#0A0A0A]">+971 50 000 0000</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-[#10B981]/10 via-[#10B981]/5 to-white border border-[#10B981]/30 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-[#10B981]/10 px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-[#10B981]" />
                <span className="text-xs font-bold text-[#10B981] uppercase">AI-Powered</span>
              </div>

              <h2 className="text-3xl lg:text-4xl font-black text-[#0A0A0A] mb-4">
                Explore Residential Properties Instead
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Browse our collection of premium off-plan residential properties across Dubai's most desirable locations.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/projects" className="inline-flex items-center gap-2 bg-[#10B981] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#0D9668] transition-all">
                  <Building2 className="w-5 h-5" />
                  <span>Browse Projects</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/geniev2" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#E8C547] text-black px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all">
                  <Sparkles className="w-5 h-5" />
                  <span>Ask Genie</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
