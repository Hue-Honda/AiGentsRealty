'use client';

import { useEffect, useRef } from 'react';
import { Sparkles, MapPin, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LatestLaunches() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const launches = [
    {
      name: 'Sunset Boulevard',
      developer: 'Emaar Properties',
      location: 'Dubai South',
      price: 'From AED 750K',
      badge: 'Just Launched',
      daysAgo: 2,
      completion: 'Q4 2027'
    },
    {
      name: 'Sky Villas',
      developer: 'DAMAC Properties',
      location: 'Business Bay',
      price: 'From AED 1.1M',
      badge: 'Early Bird',
      daysAgo: 5,
      completion: 'Q2 2028'
    },
    {
      name: 'Oasis Gardens',
      developer: 'Azizi Developments',
      location: 'Al Furjan',
      price: 'From AED 680K',
      badge: 'Limited Units',
      daysAgo: 12,
      completion: 'Q1 2027'
    }
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

      // NFT REVEAL EFFECT - Border light animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.launch-card');

        cards.forEach((card, index) => {
          // Card reveal with scale
          gsap.fromTo(
            card,
            { opacity: 0, scale: 0.8, rotateY: -15 },
            {
              opacity: 1,
              scale: 1,
              rotateY: 0,
              duration: 0.8,
              ease: 'back.out(1.3)',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
              },
              delay: index * 0.15,
            }
          );

          // Border light sweep (NFT mint effect)
          const borderLight = card.querySelector('.border-light');
          if (borderLight) {
            gsap.fromTo(
              borderLight,
              {
                opacity: 0,
                rotate: 0,
              },
              {
                opacity: 1,
                rotate: 360,
                duration: 2,
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 80%',
                },
                onComplete: () => {
                  // Continuous subtle rotation after reveal
                  gsap.to(borderLight, {
                    rotate: 360,
                    duration: 8,
                    ease: 'none',
                    repeat: -1,
                  });
                }
              }
            );
          }

          // Badge shimmer
          const badge = card.querySelector('.launch-badge');
          if (badge) {
            gsap.to(badge, {
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.6), 0 0 40px rgba(16, 185, 129, 0.3)',
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            });
          }

          // Price glow pulse
          const price = card.querySelector('.price-glow');
          if (price) {
            gsap.to(price, {
              textShadow: '0 0 20px rgba(16, 185, 129, 0.8), 0 0 40px rgba(16, 185, 129, 0.4)',
              duration: 3,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            });
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // HOVER TILT EFFECT
  const handleCardHover = (e: React.MouseEvent<HTMLAnchorElement>, card: HTMLAnchorElement) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleCardLeave = (card: HTMLAnchorElement) => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  return (
    <section ref={sectionRef} className="relative bg-[#0A0A0A] py-16 lg:py-24 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-[#10B981]/5 rounded-full blur-3xl -translate-y-1/2"></div>

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] px-3 py-1 rounded-full text-xs font-semibold mb-4">
              <Sparkles className="w-3 h-3" />
              NEW THIS MONTH
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
              Latest Launches
            </h2>
            <p className="text-lg text-gray-400">Fresh opportunities from the last 30 days</p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-[#10B981] hover:text-[#059669] font-semibold transition-colors group"
          >
            View All Projects
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Asymmetric card grid */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ perspective: '1500px' }}>
          {launches.map((launch, index) => (
            <Link
              key={index}
              href="/projects"
              className={`
                launch-card
                ${index === 0 ? 'lg:row-span-2' : ''}
                relative bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-3xl overflow-hidden hover:border-[#D4AF37]/60 transition-all duration-300 group
              `}
              onMouseMove={(e) => handleCardHover(e, e.currentTarget)}
              onMouseLeave={(e) => handleCardLeave(e.currentTarget)}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* NFT Border Light Effect */}
              <div className="border-light absolute inset-0 opacity-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#10B981]/40 to-transparent" style={{
                  background: 'conic-gradient(from 0deg, transparent 0%, #10B981 50%, transparent 100%)',
                  filter: 'blur(8px)'
                }}></div>
              </div>

              {/* Animated glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/10 via-transparent to-[#D4AF37]/10"></div>
              </div>

              <div className={`relative ${index === 0 ? 'p-8 lg:p-10' : 'p-6'}`}>
                {/* Header badges */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex flex-col gap-2">
                    <div className="launch-badge inline-flex items-center gap-2 bg-[#10B981] text-black px-3 py-1 rounded-full text-xs font-bold w-fit shadow-lg">
                      <Sparkles className="w-3 h-3" />
                      {launch.badge}
                    </div>
                    <span className="text-xs text-gray-500">{launch.daysAgo} days ago</span>
                  </div>

                  <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-[#D4AF37]/30">
                    <ArrowRight className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                </div>

                {/* Content */}
                <div className={index === 0 ? 'space-y-6' : 'space-y-4'}>
                  <div>
                    <h3 className={`${index === 0 ? 'text-3xl lg:text-4xl' : 'text-2xl'} font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors`}>
                      {launch.name}
                    </h3>
                    <p className="text-gray-400 font-medium">{launch.developer}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin className="w-4 h-4 text-[#D4AF37]" />
                      <span className="text-sm">{launch.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4 text-[#B8941E]" />
                      <span className="text-sm">Completion: {launch.completion}</span>
                    </div>
                  </div>

                  <div className={`pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between ${index === 0 ? 'mt-8' : ''}`}>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Starting from</div>
                      <div className={`price-glow ${index === 0 ? 'text-3xl' : 'text-2xl'} font-bold text-[#10B981]`}>
                        {launch.price}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom notification bar */}
        <div className="mt-12 bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37]/10 to-transparent border border-[#D4AF37]/30 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <div>
                <p className="text-white font-semibold">Get notified about new launches</p>
                <p className="text-sm text-gray-400">Be the first to know about exclusive pre-launch opportunities</p>
              </div>
            </div>
            <button className="bg-[#D4AF37] hover:bg-[#B8941E] text-black px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
