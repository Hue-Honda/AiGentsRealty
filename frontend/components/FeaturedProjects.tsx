'use client';

import { ArrowLeft, ArrowRight, MapPin, Calendar, CreditCard } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FeaturedProjects() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      name: 'Azure Residences',
      developer: 'Emaar Properties',
      location: 'Dubai Hills Estate',
      price: 'From AED 900K',
      paymentPlan: '80/20',
      completion: 'Q4 2025',
      roi: '12.5%',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop'
    },
    {
      id: 2,
      name: 'Marina Heights',
      developer: 'DAMAC Properties',
      location: 'Dubai Marina',
      price: 'From AED 1.2M',
      paymentPlan: '70/30',
      completion: 'Q2 2026',
      roi: '14.2%',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop'
    },
    {
      id: 3,
      name: 'Palm Gardens',
      developer: 'Nakheel',
      location: 'Palm Jumeirah',
      price: 'From AED 2.5M',
      paymentPlan: '60/40',
      completion: 'Q1 2026',
      roi: '11.8%',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'
    },
    {
      id: 4,
      name: 'Creek Views',
      developer: 'Emaar Properties',
      location: 'Dubai Creek Harbour',
      price: 'From AED 1.8M',
      paymentPlan: '80/20',
      completion: 'Q3 2025',
      roi: '13.1%',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // HEADER SCROLL REVEAL
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // CARDS STAGGER REVEAL
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.project-card');
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 60,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );

        // ROI BADGE PULSE ANIMATION
        cards.forEach((card) => {
          const roiBadge = card.querySelector('.roi-badge');
          if (roiBadge) {
            gsap.to(roiBadge, {
              boxShadow: '0 0 0 8px rgba(212, 175, 55, 0.2), 0 0 20px rgba(212, 175, 55, 0.4)',
              scale: 1.05,
              duration: 2,
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

  // PARALLAX HOVER EFFECT
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>, cardRef: HTMLAnchorElement) => {
    const rect = cardRef.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    const image = cardRef.querySelector('.card-image') as HTMLElement;
    const badge = cardRef.querySelector('.featured-badge') as HTMLElement;
    const content = cardRef.querySelector('.card-content') as HTMLElement;

    if (image) {
      gsap.to(image, {
        x: (x - centerX) / 15,
        y: (y - centerY) / 15,
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    if (badge) {
      gsap.to(badge, {
        y: -5,
        x: 5,
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    if (content) {
      gsap.to(content, {
        y: -8,
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    gsap.to(cardRef, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (cardRef: HTMLAnchorElement) => {
    const image = cardRef.querySelector('.card-image') as HTMLElement;
    const badge = cardRef.querySelector('.featured-badge') as HTMLElement;
    const content = cardRef.querySelector('.card-content') as HTMLElement;

    if (image) {
      gsap.to(image, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    }

    if (badge) {
      gsap.to(badge, {
        y: 0,
        x: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    }

    if (content) {
      gsap.to(content, {
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    }

    gsap.to(cardRef, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section ref={sectionRef} className="py-16 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#10B981]/5 rounded-full blur-[150px]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Featured Off-Plan Projects
            </h2>
            <p className="text-gray-300">Handpicked luxury developments with best ROI potential</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-[#1A1A1A] border-2 border-[#D4AF37]/30 rounded-full flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] text-gray-300 transition-all hover:scale-110"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-[#1A1A1A] border-2 border-[#D4AF37]/30 rounded-full flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] text-gray-300 transition-all hover:scale-110"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: '1000px' }}>
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="project-card bg-[#1A1A1A] rounded-2xl overflow-hidden shadow-sm border border-[#D4AF37]/20 hover:shadow-xl hover:border-[#D4AF37]/40 transition-all duration-300 group cursor-pointer"
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="card-image w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  suppressHydrationWarning
                />
                {/* ROI Badge with pulse */}
                <div className="roi-badge featured-badge absolute top-4 right-4 bg-gradient-to-r from-[#D4AF37] to-[#B8941E] text-black px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  {project.roi} ROI
                </div>
                {/* Emerald glow overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#10B981]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Content */}
              <div className="card-content p-5">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#D4AF37] transition-colors">{project.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{project.developer}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <MapPin className="w-4 h-4 text-[#D4AF37]" />
                    {project.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Calendar className="w-4 h-4 text-[#B8941E]" />
                    Completion: {project.completion}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                    {project.paymentPlan} Payment Plan
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#D4AF37]/20">
                  <div>
                    <div className="text-2xl font-bold text-[#10B981]">{project.price}</div>
                  </div>
                  <span className="text-[#D4AF37] font-semibold group-hover:text-[#B8941E] transition-colors flex items-center gap-2">
                    View Details
                    <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
