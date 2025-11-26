import { Shield, TrendingUp, Star, MessageSquare, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      {/* PREMIUM CINEMATIC HERO SECTION */}
      <section className="relative overflow-hidden">
        {/* Cinematic Dark Gradient Background with Emerald Shapes */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A]">
          {/* Soft emerald beams creating depth */}
          <div className="absolute top-0 left-[20%] w-[300px] h-[600px] bg-[#10B981]/10 rotate-12 blur-[100px]"></div>
          <div className="absolute top-[10%] right-[15%] w-[400px] h-[500px] bg-[#10B981]/8 -rotate-12 blur-[120px]"></div>
          {/* Gold particles/glow */}
          <div className="absolute bottom-[20%] left-[10%] w-[200px] h-[200px] bg-[#D4AF37]/5 rounded-full blur-[80px]"></div>
          <div className="absolute top-[30%] right-[25%] w-[150px] h-[150px] bg-[#D4AF37]/8 rounded-full blur-[60px]"></div>

          {/* Subtle bokeh particles */}
          <div className="absolute top-[15%] left-[40%] w-2 h-2 bg-[#D4AF37]/30 rounded-full blur-sm"></div>
          <div className="absolute top-[45%] left-[70%] w-3 h-3 bg-[#10B981]/20 rounded-full blur-sm"></div>
          <div className="absolute top-[60%] left-[15%] w-2 h-2 bg-[#D4AF37]/40 rounded-full blur-sm"></div>
        </div>

        <div className="relative max-w-[1800px] mx-auto px-6 lg:px-16 pt-24 pb-32 lg:pb-40">
          {/* Impactful Headline with Gold Typography */}
          <div className="text-center mb-16">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight mb-6">
              <span className="block">Find Your</span>
              <span className="relative inline-block mt-2">
                <span className="bg-gradient-to-r from-[#D4AF37] via-[#B8941E] to-[#D4AF37] bg-clip-text text-transparent">
                  Dream Oasis
                </span>
                {/* Gold micro-underline with subtle glow */}
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_20px_rgba(212,175,55,0.6)]"></div>
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed mb-12">
              AI-powered property discovery in Dubai's most exclusive locations
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4 lg:gap-5 mb-16">
              <Link href="/explore" className="group px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8941E] text-black rounded-xl font-bold hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-all duration-300 flex items-center gap-2 shadow-2xl hover:-translate-y-0.5">
                <Sparkles className="w-5 h-5" />
                Explore Properties
              </Link>
              <Link href="/areas" className="group px-8 py-4 bg-[#0A0A0A]/80 backdrop-blur-xl border-2 border-[#10B981]/40 text-white rounded-xl font-bold hover:bg-[#10B981]/10 hover:border-[#10B981]/60 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300 flex items-center gap-2 shadow-lg hover:-translate-y-0.5">
                <TrendingUp className="w-5 h-5 text-[#10B981]" />
                Browse Areas
              </Link>
            </div>

            {/* Irregular Feature Badges with Hover Effects */}
            <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-5">
              {/* Badge 1 - Larger, gold outline with emerald fill on hover */}
              <div className="group px-6 py-3 bg-[#0A0A0A]/60 backdrop-blur-xl border border-[#D4AF37]/40 rounded-full hover:bg-[#10B981]/10 hover:border-[#10B981]/60 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:-translate-y-1">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#10B981]" />
                  <span className="text-sm font-bold text-[#D4AF37] group-hover:text-[#10B981]">Live ROI & Comps</span>
                </div>
              </div>

              {/* Badge 2 - Medium, gold text on black glass */}
              <div className="group px-5 py-2.5 bg-[#D4AF37]/5 backdrop-blur-xl border border-[#D4AF37]/30 rounded-full hover:bg-[#D4AF37]/15 hover:border-[#D4AF37]/60 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:-translate-y-1">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-sm font-semibold text-white">RERA/DLD Compliant</span>
                </div>
              </div>

              {/* Badge 3 - Smaller pill, emerald accent */}
              <div className="group px-5 py-2.5 bg-[#10B981]/5 backdrop-blur-xl border border-[#10B981]/30 rounded-full hover:bg-[#10B981]/15 hover:border-[#10B981]/60 transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:-translate-y-1">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white">Personalized Shortlists</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gold architectural line illustration at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent"></div>
      </section>

      {/* Premium Gold CTA Banner */}
      <section className="relative bg-gradient-to-br from-[#D4AF37] via-[#F4E5B8] to-[#D4AF37] py-20 lg:py-24 overflow-hidden">
        {/* Faint emerald particles blending with gold */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-[10%] w-[300px] h-[300px] bg-[#10B981]/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-10 right-[15%] w-[400px] h-[400px] bg-[#10B981]/8 rounded-full blur-[140px]"></div>
          {/* Sparkle icons as decorative elements */}
          <Sparkles className="absolute top-10 right-20 w-24 h-24 text-black/5" />
          <Sparkles className="absolute bottom-12 left-16 w-32 h-32 text-black/5" />
          <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 text-[#10B981]/10" />
        </div>

        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-4 leading-tight">
              Want a Fully-Managed Shortlist?
            </h2>
            <p className="text-xl lg:text-2xl text-black/70 mb-10 max-w-3xl mx-auto font-light">
              Let our expert agents curate the perfect properties for your investment goals
            </p>
            <div className="flex flex-wrap justify-center gap-4 lg:gap-5">
              {/* Talk to Agent - Black Glass + Gold Border */}
              <button className="group px-8 py-4 bg-[#0A0A0A]/80 backdrop-blur-xl border-2 border-[#0A0A0A] text-white rounded-xl font-bold hover:bg-[#0A0A0A] hover:shadow-[0_0_40px_rgba(0,0,0,0.6)] transition-all duration-300 flex items-center gap-2 shadow-2xl hover:-translate-y-0.5">
                <MessageSquare className="w-5 h-5" />
                Talk to an Agent
              </button>
              {/* Start Now - Emerald Glow + Gold Text */}
              <button className="group relative px-8 py-4 bg-[#10B981] border-2 border-[#10B981] text-white rounded-xl font-bold hover:bg-[#059669] hover:border-[#059669] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all duration-300 shadow-lg hover:-translate-y-0.5">
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Start Now
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
