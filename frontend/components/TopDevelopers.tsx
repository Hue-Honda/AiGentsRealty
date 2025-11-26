'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Building2, Star, TrendingUp, Award } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TopDevelopers() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const featuredCardRef = useRef<HTMLAnchorElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  const developers = [
    { name: 'Emaar Properties', slug: 'emaar', projects: 45, rating: 4.8, featured: true },
    { name: 'DAMAC Properties', slug: 'damac', projects: 38, rating: 4.6 },
    { name: 'Nakheel', slug: 'nakheel', projects: 28, rating: 4.7 },
    { name: 'Meraas', slug: 'meraas', projects: 22, rating: 4.5 },
    { name: 'Azizi Developments', slug: 'azizi', projects: 31, rating: 4.4 },
    { name: 'Sobha Realty', slug: 'sobha', projects: 18, rating: 4.7 }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // HEADER REVEAL
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // FEATURED CARD DRAMATIC REVEAL
      if (featuredCardRef.current) {
        gsap.fromTo(
          featuredCardRef.current,
          { opacity: 0, scale: 0.85, rotateY: -20 },
          {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: featuredCardRef.current,
              start: 'top 75%',
            },
          }
        );

        // Gold shine sweep
        const shineElement = featuredCardRef.current.querySelector('.shine-effect');
        if (shineElement) {
          gsap.fromTo(
            shineElement,
            { x: '-100%' },
            {
              x: '200%',
              duration: 2,
              ease: 'power2.inOut',
              repeat: -1,
              repeatDelay: 3,
            }
          );
        }
      }

      // DEVELOPER CARDS STAGGER
      if (cardsGridRef.current) {
        const cards = cardsGridRef.current.querySelectorAll('.dev-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: 'top 75%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // TILT EFFECT ON HOVER
  const handleCardTilt = (e: React.MouseEvent<HTMLAnchorElement>, card: HTMLAnchorElement) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: 'power2.out',
    });

    // Icon rotation
    const icon = card.querySelector('.dev-icon');
    if (icon) {
      gsap.to(icon, {
        rotate: 8,
        scale: 1.1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleCardTiltReset = (card: HTMLAnchorElement) => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });

    const icon = card.querySelector('.dev-icon');
    if (icon) {
      gsap.to(icon, {
        rotate: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  };

  return (
    <section ref={sectionRef} className="relative bg-[#0A0A0A] py-16 lg:py-24 overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-[10%] w-[400px] h-[400px] bg-[#D4AF37]/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-20 right-[15%] w-[350px] h-[350px] bg-[#10B981]/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section header with asymmetric layout */}
        <div ref={headerRef} className="grid lg:grid-cols-12 gap-8 mb-12 lg:mb-16">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] px-3 py-1 rounded-full text-xs font-semibold mb-4">
              <Award className="w-3 h-3" />
              VERIFIED PARTNERS
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Top-Rated Developers
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl">
              Handpicked partners with proven track records in Dubai's real estate market
            </p>
          </div>

          <div className="lg:col-span-5 flex items-end justify-start lg:justify-end">
            <Link
              href="/developers"
              className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#B8941E] font-semibold transition-colors group"
            >
              View All Developers
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>

        {/* Asymmetric developer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-6" style={{ perspective: '1500px' }}>
          {/* Featured developer - Large card */}
          <Link
            ref={featuredCardRef}
            href={`/developers/${developers[0].slug}`}
            className="sm:col-span-2 lg:col-span-6 bg-gradient-to-br from-[#D4AF37] to-[#B8941E] rounded-3xl p-8 lg:p-10 hover:scale-[1.02] transition-all duration-300 group relative overflow-hidden"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Shine sweep effect */}
            <div className="shine-effect absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"></div>

            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <Building2 className="absolute top-10 right-10 w-40 h-40 text-black" />
            </div>

            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-black font-bold mb-6">
                <Star className="w-3 h-3 fill-black" />
                FEATURED PARTNER
              </div>

              <div className="mb-6">
                <h3 className="text-3xl lg:text-4xl font-bold text-black mb-2">{developers[0].name}</h3>
                <div className="flex items-center gap-4 text-black/80">
                  <div className="flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    <span className="font-semibold">{developers[0].projects}</span>
                    <span className="text-sm">Projects</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-black/80" />
                    <span className="font-semibold">{developers[0].rating}</span>
                    <span className="text-sm">Rating</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-black/80 text-sm font-medium">Explore Projects</span>
                <div className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center group-hover:bg-black/30 transition-colors">
                  <span className="text-black text-lg transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Other developers - Smaller cards in mixed grid */}
          <div ref={cardsGridRef} className="sm:col-span-2 lg:col-span-6 grid grid-cols-2 lg:grid-cols-3 gap-4" style={{ perspective: '1500px' }}>
            {developers.slice(1).map((dev, index) => (
              <Link
                key={dev.slug}
                href={`/developers/${dev.slug}`}
                className="dev-card bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-2xl p-6 hover:border-[#D4AF37]/60 hover:bg-[#1A1A1A]/80 transition-all duration-300 group"
                onMouseMove={(e) => handleCardTilt(e, e.currentTarget)}
                onMouseLeave={(e) => handleCardTiltReset(e.currentTarget)}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="dev-icon w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center border border-[#D4AF37]/30 group-hover:bg-[#D4AF37]/20 transition-colors">
                    <Building2 className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-[#10B981] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                  {dev.name}
                </h3>

                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    <span>{dev.projects}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
                    <span>{dev.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom CTA banner */}
        <div className="mt-12 lg:mt-16 bg-gradient-to-r from-[#10B981]/20 via-[#10B981]/10 to-transparent border border-[#10B981]/30 rounded-2xl p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Looking for a specific developer?</h3>
              <p className="text-gray-400">Browse all verified developers and their complete project portfolios</p>
            </div>
            <Link
              href="/developers"
              className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap hover:scale-105"
            >
              View All
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
