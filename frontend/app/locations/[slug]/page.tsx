'use client';

import { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { MapPin, TrendingUp, Building2, Home, Sparkles, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Location data
const locationsData: Record<string, {
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  stats: {
    avgPrice: string;
    roi: string;
    projects: number;
    growthRate: string;
  };
  highlights: string[];
  amenities: string[];
  nearbyProjects: Array<{
    name: string;
    developer: string;
    price: string;
    image: string;
    slug: string;
  }>;
}> = {
  'dubai-hills-estate': {
    name: 'Dubai Hills Estate',
    tagline: 'Where Urban Sophistication Meets Natural Serenity',
    description: 'Dubai Hills Estate is a prestigious master-planned community featuring world-class golf courses, parks, and premium residential developments. This thriving neighborhood offers an unparalleled blend of luxury living and natural landscapes.',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&h=1080&fit=crop',
    stats: {
      avgPrice: 'AED 1.8M',
      roi: '11.2%',
      projects: 24,
      growthRate: '+18.5%'
    },
    highlights: [
      '18-hole championship golf course',
      'Dubai Hills Mall - 2M sq ft retail',
      'Direct access to Al Khail Road',
      '180km of cycling and running tracks',
      'Premium international schools',
      'Central Park spanning 180,000 sqm'
    ],
    amenities: [
      'Dubai Hills Golf Club',
      'Dubai Hills Mall',
      'Dubai Hills Park',
      'Multiple International Schools',
      'Healthcare Facilities',
      'Fine Dining Restaurants',
      'Luxury Hotels',
      'Fitness & Wellness Centers'
    ],
    nearbyProjects: [
      {
        name: 'Golf Grove',
        developer: 'Emaar',
        price: 'From AED 1.2M',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop',
        slug: 'golf-grove'
      },
      {
        name: 'Park Heights',
        developer: 'Emaar',
        price: 'From AED 950K',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
        slug: 'park-heights'
      },
      {
        name: 'Maple',
        developer: 'Emaar',
        price: 'From AED 1.5M',
        image: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=600&h=400&fit=crop',
        slug: 'maple'
      }
    ]
  },
  'dubai-marina': {
    name: 'Dubai Marina',
    tagline: 'Waterfront Living at Its Finest',
    description: 'Dubai Marina is a stunning waterfront community featuring high-rise towers, luxury yachts, and vibrant dining and entertainment options. This iconic location offers cosmopolitan living with breathtaking marina views.',
    heroImage: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920&h=1080&fit=crop',
    stats: {
      avgPrice: 'AED 2.2M',
      roi: '9.8%',
      projects: 18,
      growthRate: '+12.3%'
    },
    highlights: [
      'Man-made canal city spanning 3km',
      'Dubai Marina Walk - dining & retail',
      'Marina Beach & JBR Beach proximity',
      'Metro station connectivity',
      'World-class restaurants & cafes',
      'Yacht clubs and water sports'
    ],
    amenities: [
      'Dubai Marina Mall',
      'Marina Walk Promenade',
      'Beach Clubs',
      'International Schools',
      'Premium Fitness Centers',
      'Fine Dining',
      'Marina Yacht Club',
      'Water Sports Facilities'
    ],
    nearbyProjects: [
      {
        name: 'Marina Gate',
        developer: 'Select Group',
        price: 'From AED 1.8M',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
        slug: 'marina-gate'
      },
      {
        name: 'Emaar Beachfront',
        developer: 'Emaar',
        price: 'From AED 2.5M',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop',
        slug: 'emaar-beachfront'
      },
      {
        name: 'Marina Vista',
        developer: 'DAMAC',
        price: 'From AED 1.6M',
        image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600&h=400&fit=crop',
        slug: 'marina-vista'
      }
    ]
  },
  'downtown-dubai': {
    name: 'Downtown Dubai',
    tagline: 'The Heart of the City',
    description: 'Downtown Dubai is the vibrant epicenter of the city, home to the iconic Burj Khalifa, Dubai Mall, and Dubai Fountain. This prestigious address offers unmatched access to world-class dining, shopping, and entertainment.',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&h=1080&fit=crop',
    stats: {
      avgPrice: 'AED 3.5M',
      roi: '8.5%',
      projects: 15,
      growthRate: '+14.7%'
    },
    highlights: [
      'Burj Khalifa - world\'s tallest building',
      'Dubai Mall - world\'s largest shopping center',
      'Dubai Fountain shows',
      'Opera District cultural hub',
      'Souk Al Bahar traditional marketplace',
      'Metro and tram connectivity'
    ],
    amenities: [
      'The Dubai Mall',
      'Dubai Opera',
      'Burj Park',
      'Souk Al Bahar',
      'Premium Hotels',
      'Michelin Star Restaurants',
      'Art Galleries',
      'Metro Station'
    ],
    nearbyProjects: [
      {
        name: 'Boulevard Point',
        developer: 'Emaar',
        price: 'From AED 2.8M',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
        slug: 'boulevard-point'
      },
      {
        name: 'Act One | Act Two',
        developer: 'Emaar',
        price: 'From AED 3.2M',
        image: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=600&h=400&fit=crop',
        slug: 'act-one-act-two'
      },
      {
        name: 'Grande',
        developer: 'Emaar',
        price: 'From AED 4.5M',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop',
        slug: 'grande'
      }
    ]
  }
};

export default function LocationPage() {
  const params = useParams();
  const slug = params.slug as string;
  const location = locationsData[slug];

  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // HERO SECTION FADE IN
      if (heroRef.current) {
        gsap.from(heroRef.current.querySelector('.hero-content'), {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: 'power3.out',
          delay: 0.2
        });
      }

      // STATS CARDS STAGGER
      if (statsRef.current) {
        gsap.from(statsRef.current.querySelectorAll('.stat-card'), {
          opacity: 0,
          y: 40,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%'
          }
        });
      }

      // HIGHLIGHTS LIST
      if (highlightsRef.current) {
        gsap.from(highlightsRef.current.querySelectorAll('li'), {
          opacity: 0,
          x: -30,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: highlightsRef.current,
            start: 'top 75%'
          }
        });
      }

      // PROJECTS CARDS
      if (projectsRef.current) {
        gsap.from(projectsRef.current.querySelectorAll('.project-card'), {
          opacity: 0,
          scale: 0.95,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: projectsRef.current,
            start: 'top 75%'
          }
        });
      }
    });

    return () => ctx.revert();
  }, [slug]);

  // If location not found
  if (!location) {
    return (
      <div className="min-h-screen bg-white text-[#0A0A0A] flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Location Not Found</h1>
          <p className="text-gray-600 mb-8">The location "{slug}" doesn't exist in our database.</p>
          <Link href="/explore" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-black px-6 py-3 rounded-xl font-bold hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all">
            Explore Properties
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A]">
      {/* HERO SECTION */}
      <div ref={heroRef} className="relative h-[70vh] min-h-[600px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={location.heroImage}
            alt={location.name}
            className="w-full h-full object-cover"
            suppressHydrationWarning
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/30 to-white"></div>
        </div>

        {/* Hero Content */}
        <div className="hero-content relative max-w-[1600px] mx-auto px-6 lg:px-16 h-full flex flex-col justify-center pt-24">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-[#10B981] transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/explore" className="hover:text-[#10B981] transition-colors">Explore</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#D4AF37]">{location.name}</span>
          </div>

          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 bg-[#10B981]/10 border border-[#10B981]/30 px-4 py-2 rounded-full mb-6 w-fit">
            <MapPin className="w-4 h-4 text-[#10B981]" />
            <span className="text-sm font-semibold text-[#10B981]">Premium Location</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl lg:text-7xl font-black mb-4 bg-gradient-to-r from-[#0A0A0A] via-[#D4AF37] to-[#0A0A0A] bg-clip-text text-transparent">
            {location.name}
          </h1>

          {/* Tagline */}
          <p className="text-xl lg:text-2xl text-gray-700 font-light mb-8 max-w-3xl">
            {location.tagline}
          </p>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-black px-8 py-4 rounded-xl font-bold hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all hover:scale-105">
              <Sparkles className="w-5 h-5" />
              <span>Explore Properties</span>
            </button>
            <button className="flex items-center gap-2 bg-white border border-gray-200 text-[#0A0A0A] px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-md">
              <Building2 className="w-5 h-5" />
              <span>View Map</span>
            </button>
          </div>
        </div>
      </div>

      {/* STATS SECTION */}
      <div ref={statsRef} className="relative -mt-20 z-10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="stat-card bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-2xl p-6 text-center shadow-md">
              <div className="text-3xl font-black text-black mb-2">{location.stats.avgPrice}</div>
              <div className="text-sm font-semibold text-black/70">Avg. Price</div>
            </div>
            <div className="stat-card bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-md">
              <div className="text-3xl font-black text-[#10B981] mb-2">{location.stats.roi}</div>
              <div className="text-sm font-semibold text-gray-600">Avg. ROI</div>
            </div>
            <div className="stat-card bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-md">
              <div className="text-3xl font-black text-[#0A0A0A] mb-2">{location.stats.projects}</div>
              <div className="text-sm font-semibold text-gray-600">Active Projects</div>
            </div>
            <div className="stat-card bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-md">
              <div className="flex items-center justify-center gap-2 text-3xl font-black text-[#10B981] mb-2">
                <TrendingUp className="w-7 h-7" />
                <span>{location.stats.growthRate}</span>
              </div>
              <div className="text-sm font-semibold text-gray-600">Annual Growth</div>
            </div>
          </div>
        </div>
      </div>

      {/* DESCRIPTION & HIGHLIGHTS */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Description */}
          <div>
            <h2 className="text-3xl font-black mb-6 text-[#0A0A0A]">
              About <span className="text-[#D4AF37]">{location.name}</span>
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-8">
              {location.description}
            </p>

            {/* Amenities */}
            <h3 className="text-xl font-bold mb-4 text-[#D4AF37]">Key Amenities</h3>
            <div className="grid grid-cols-2 gap-3">
              {location.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full"></div>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div ref={highlightsRef}>
            <h2 className="text-3xl font-black mb-6 text-[#0A0A0A]">Location Highlights</h2>
            <ul className="space-y-4">
              {location.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all shadow-sm">
                  <div className="w-10 h-10 bg-[#10B981]/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-5 h-5 text-[#10B981]" />
                  </div>
                  <span className="text-gray-600 leading-relaxed">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* NEARBY PROJECTS */}
      <div ref={projectsRef} className="max-w-[1600px] mx-auto px-6 lg:px-16 py-20">
        <div className="mb-12">
          <h2 className="text-4xl font-black mb-4 text-[#0A0A0A]">
            Featured Projects in <span className="text-[#D4AF37]">{location.name}</span>
          </h2>
          <p className="text-gray-600 text-lg">Discover premium off-plan developments in this prestigious location</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {location.nearbyProjects.map((project, index) => (
            <Link key={index} href={`/projects/${project.slug}`}>
              <div className="project-card group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 transition-all cursor-pointer shadow-md hover:shadow-xl">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    suppressHydrationWarning
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                  {/* Price Badge */}
                  <div className="absolute bottom-4 left-4 bg-[#D4AF37] text-black px-4 py-2 rounded-lg font-bold">
                    {project.price}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-[#0A0A0A] group-hover:text-[#D4AF37] transition-colors">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <Building2 className="w-4 h-4 text-[#10B981]" />
                    <span>{project.developer}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#D4AF37] font-semibold group-hover:gap-3 transition-all">
                    <span>View Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link href="/explore" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-black px-8 py-4 rounded-xl font-bold hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all hover:scale-105">
            <span>View All Properties</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
