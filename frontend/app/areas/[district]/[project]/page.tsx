'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  Heart, Share2, Play, ChevronRight, Star, TrendingUp, Calendar, CreditCard,
  Home as HomeIcon, Maximize, MapPin, Phone, Mail, MessageCircle, Download,
  Sparkles, Award, Clock, CheckCircle2, Building2, Users, Ruler, DollarSign,
  Navigation, Wifi, Dumbbell, Waves, Trees, ShoppingBag, GraduationCap,
  X, Zap, Shield, Target, BarChart3, Activity, TrendingDown
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

// Mock data - will be replaced with API call
const projectData: any = {
  'meraas-the-edit-at-d3': {
    slug: 'meraas-the-edit-at-d3',
    name: 'The Edit at d3',
    developer: 'Meraas',
    developerLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop',
    district: 'Dubai Design District',
    districtSlug: 'dubai-design-district-dubai',
    area: 'Dubai',
    price: 'AED 1.2M',
    priceNum: 1200000,
    roi: '14.5%',
    rating: 4.8,
    handoverDate: 'Q1 2030',
    paymentPlan: '70/30',
    status: 'Off Plan',
    titleType: 'Freehold',
    metroDistance: '5 min',
    onTimeDelivery: 96,
    propertyTypes: ['Apartments', 'Villas', 'Commercial'],
    coordinates: { lat: 25.2007, lng: 55.2721 }, // Dubai Design District coordinates
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&h=1080&fit=crop&q=90',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&h=1080&fit=crop&q=90',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop&q=90',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1920&h=1080&fit=crop&q=90',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop&q=90',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&h=1080&fit=crop&q=90',
    ],
    description: 'The Edit at d3 by Meraas represents the pinnacle of contemporary design and luxury living in Dubai Design District. This exceptional development offers meticulously designed residences with breathtaking views and world-class amenities, perfect for those who appreciate art, design, and culture. Experience unparalleled sophistication in one of Dubai\'s most creative communities.',
    amenities: [
      { icon: Waves, name: 'Infinity Pool', glow: 'emerald' },
      { icon: Dumbbell, name: 'State-of-Art Gym', glow: 'gold' },
      { icon: Users, name: 'Kids Play Area', glow: 'emerald' },
      { icon: Trees, name: 'Landscaped Gardens', glow: 'gold' },
      { icon: Shield, name: '24/7 Security', glow: 'emerald' },
      { icon: Building2, name: 'Concierge Service', glow: 'gold' },
      { icon: Wifi, name: 'Smart Home Tech', glow: 'emerald' },
      { icon: ShoppingBag, name: 'Retail Outlets', glow: 'gold' },
      { icon: GraduationCap, name: 'Co-working Spaces', glow: 'emerald' },
      { icon: Navigation, name: 'Jogging Track', glow: 'gold' },
      { icon: Zap, name: 'EV Charging', glow: 'emerald' },
      { icon: Users, name: 'Community Hall', glow: 'gold' }
    ],
    paymentSchedule: [
      { stage: 'On Booking', percentage: 10, date: 'Upon reservation' },
      { stage: '1st Installment', percentage: 10, date: '6 months' },
      { stage: '2nd Installment', percentage: 10, date: '12 months' },
      { stage: '3rd Installment', percentage: 10, date: '18 months' },
      { stage: '4th Installment', percentage: 10, date: '24 months' },
      { stage: '5th Installment', percentage: 10, date: '30 months' },
      { stage: '6th Installment', percentage: 10, date: '36 months' },
      { stage: 'On Handover', percentage: 30, date: 'Q1 2030' }
    ],
    unitTypes: [
      {
        type: 'Studio',
        size: '450',
        price: 'AED 750K',
        bedrooms: 0,
        bathrooms: 1,
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop&q=90',
        features: ['Smart Kitchen', 'Built-in Wardrobes', 'Balcony']
      },
      {
        type: '1 Bedroom',
        size: '750',
        price: 'AED 1.2M',
        bedrooms: 1,
        bathrooms: 2,
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop&q=90',
        features: ['Master Bedroom', 'Walk-in Closet', 'Large Balcony']
      },
      {
        type: '2 Bedroom',
        size: '1200',
        price: 'AED 1.8M',
        bedrooms: 2,
        bathrooms: 3,
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&q=90',
        features: ['2 Master Bedrooms', 'Maid\'s Room', 'Premium Finishes']
      },
      {
        type: '3 Bedroom',
        size: '1800',
        price: 'AED 2.8M',
        bedrooms: 3,
        bathrooms: 4,
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop&q=90',
        features: ['3 En-suite Bedrooms', 'Study Room', 'Luxury Kitchen']
      }
    ],
    aiInsights: {
      riskScore: 92,
      growthPotential: 88,
      demandLevel: 95,
      roiProjection: [
        { year: '2025', value: 5 },
        { year: '2026', value: 8 },
        { year: '2027', value: 11 },
        { year: '2028', value: 14.5 },
        { year: '2029', value: 18 },
        { year: '2030', value: 22 }
      ]
    }
  },
  'azure-residences': {
    slug: 'azure-residences',
    name: 'Azure Residences',
    developer: 'Emaar Properties',
    developerLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop',
    district: 'Dubai Hills Estate',
    districtSlug: 'dubai-hills-estate',
    area: 'Dubai',
    price: 'AED 900K',
    priceNum: 900000,
    roi: '12.5%',
    rating: 4.9,
    handoverDate: 'Q4 2025',
    paymentPlan: '80/20',
    status: 'Off Plan',
    titleType: 'Freehold',
    metroDistance: '8 min',
    onTimeDelivery: 98,
    propertyTypes: ['Apartments', 'Penthouses'],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&h=1080&fit=crop&q=90',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&h=1080&fit=crop&q=90',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop&q=90',
    ],
    description: 'Azure Residences represents the pinnacle of luxury living in Dubai Hills Estate. This exceptional development by Emaar Properties offers meticulously designed residences with breathtaking views and world-class amenities.',
    amenities: [
      { icon: Waves, name: 'Infinity Pool', glow: 'emerald' },
      { icon: Dumbbell, name: 'Fitness Center', glow: 'gold' },
      { icon: Users, name: 'Kids Play Area', glow: 'emerald' },
      { icon: Trees, name: 'Gardens', glow: 'gold' },
      { icon: Shield, name: '24/7 Security', glow: 'emerald' },
      { icon: Building2, name: 'Concierge', glow: 'gold' }
    ],
    paymentSchedule: [
      { stage: 'On Booking', percentage: 20, date: 'Upon reservation' },
      { stage: 'During Construction', percentage: 60, date: 'Monthly' },
      { stage: 'On Handover', percentage: 20, date: 'Q4 2025' }
    ],
    unitTypes: [
      {
        type: 'Studio',
        size: '450',
        price: 'AED 650K',
        bedrooms: 0,
        bathrooms: 1,
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop&q=90',
        features: ['Modern Kitchen', 'Balcony']
      },
      {
        type: '1 Bedroom',
        size: '750',
        price: 'AED 900K',
        bedrooms: 1,
        bathrooms: 2,
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop&q=90',
        features: ['Master Bedroom', 'Balcony']
      }
    ],
    aiInsights: {
      riskScore: 95,
      growthPotential: 91,
      demandLevel: 97,
      roiProjection: [
        { year: '2025', value: 6 },
        { year: '2026', value: 12.5 },
        { year: '2027', value: 18 },
        { year: '2028', value: 23 }
      ]
    }
  }
};

export default function ProjectDetailPage() {
  const params = useParams();
  const projectSlug = params.project as string;
  const districtSlug = params.district as string;

  const project = projectData[projectSlug] || projectData['meraas-the-edit-at-d3'];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  // Section navigation items
  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'payment', label: 'Payment Plan' },
    { id: 'units', label: 'Unit Types' },
    { id: 'location', label: 'Location' },
    { id: 'developer', label: 'Developer' },
    { id: 'ai-insights', label: 'AI Insights' }
  ];

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax hero image
      if (heroRef.current) {
        const heroImage = heroRef.current.querySelector('.hero-image');
        if (heroImage) {
          gsap.to(heroImage, {
            y: () => window.scrollY * 0.5,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true
            }
          });
        }

        // Fade up hero content
        const heroContent = heroRef.current.querySelector('.hero-content');
        if (heroContent) {
          gsap.from(heroContent, {
            opacity: 0,
            y: 60,
            duration: 1,
            ease: 'power3.out',
            delay: 0.3
          });
        }
      }

      // Fade up sections
      const sections = document.querySelectorAll('.fade-up-section');
      sections.forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      });

      // Timeline slide-ins
      const timelineItems = document.querySelectorAll('.timeline-item');
      timelineItems.forEach((item, index) => {
        gsap.from(item, {
          opacity: 0,
          x: -40,
          duration: 0.6,
          ease: 'back.out(1.2)',
          delay: index * 0.1,
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        });
      });

      // Floating amenity icons
      const amenityCards = document.querySelectorAll('.amenity-card');
      amenityCards.forEach((card) => {
        gsap.to(card, {
          y: -8,
          duration: 2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: Math.random() * 0.5
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Scroll spy for navigation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const item of navItems) {
        const section = sectionsRef.current[item.id];
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const section = sectionsRef.current[id];
    if (section) {
      const yOffset = -100;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const truncatedDesc = project.description.slice(0, 200);
  const shouldTruncate = project.description.length > 200;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* CINEMATIC HERO SECTION */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        {/* Hero Image with Parallax */}
        <div className="hero-image absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 z-10"></div>
          <img
            src={project.images[currentImageIndex]}
            alt={project.name}
            className="w-full h-full object-cover"
            suppressHydrationWarning
          />
          {/* Ambient Glows */}
          <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-[#E8C676]/10 rounded-full blur-[150px] z-20"></div>
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#00C870]/10 rounded-full blur-[120px] z-20"></div>
        </div>

        {/* Breadcrumbs - Top Left */}
        <div className="absolute top-24 left-6 lg:left-16 z-30">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/explore" className="hover:text-[#E8C676] transition-colors">Explore</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/areas/${districtSlug}`} className="hover:text-[#E8C676] transition-colors">{project.district}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{project.name}</span>
          </div>
        </div>

        {/* Image Carousel Thumbnails - Right Side */}
        <div className="absolute right-6 lg:right-16 top-1/2 -translate-y-1/2 z-30 space-y-3">
          {project.images.map((img: string, idx: number) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`block w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                currentImageIndex === idx
                  ? 'border-[#E8C676] shadow-[0_0_20px_rgba(232,198,118,0.5)]'
                  : 'border-white/20 hover:border-white/40'
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" suppressHydrationWarning />
            </button>
          ))}
        </div>

        {/* Hero Content - Bottom Glass Overlay */}
        <div className="hero-content absolute bottom-0 left-0 right-0 z-30">
          <div className="bg-black/40 backdrop-blur-2xl border-t border-white/10 p-8 lg:p-12">
            <div className="max-w-[1800px] mx-auto">
              <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
                {/* Left: Title & Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="bg-gradient-to-r from-[#00C870] to-[#00A85D] text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-[0_0_20px_rgba(0,200,112,0.4)]">
                      {project.status}
                    </span>
                    <span className="bg-gradient-to-r from-[#E8C676] to-[#D4AF37] text-black px-4 py-1.5 rounded-full text-sm font-bold">
                      {project.titleType}
                    </span>
                    <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                      Handover: {project.handoverDate}
                    </span>
                  </div>

                  <h1 className="text-5xl lg:text-7xl font-black text-white mb-3 leading-tight tracking-tight">
                    {project.name}
                  </h1>

                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-5 h-5 text-[#E8C676]" />
                    <span className="text-xl text-gray-300">{project.district}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-lg text-gray-400">by {project.developer}</span>
                  </div>

                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Starting From</p>
                      <p className="text-4xl font-black bg-gradient-to-r from-[#E8C676] via-[#D4AF37] to-[#E8C676] bg-clip-text text-transparent">
                        {project.price}
                      </p>
                    </div>
                    <div className="h-12 w-px bg-white/20"></div>
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Expected ROI</p>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-[#00C870]" />
                        <p className="text-2xl font-black text-[#00C870]">{project.roi}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Action Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all"
                  >
                    <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                  </button>
                  <button className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all">
                    <Share2 className="w-6 h-6 text-white" />
                  </button>
                  <button className="flex items-center gap-3 bg-gradient-to-r from-[#E8C676] to-[#D4AF37] text-black px-8 py-4 rounded-2xl font-bold hover:shadow-[0_0_40px_rgba(232,198,118,0.5)] transition-all">
                    <Play className="w-5 h-5" />
                    <span>Watch Video Tour</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STICKY VERTICAL NAVIGATION - Left Side */}
      <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl p-3 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-[#E8C676] to-[#D4AF37] text-black'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${
                activeSection === item.id ? 'bg-black' : 'bg-gray-600 group-hover:bg-[#E8C676]'
              }`}></div>
              <span className="text-sm font-semibold whitespace-nowrap">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="max-w-[1800px] mx-auto px-6 lg:px-16 py-16">
        {/* THREE-COLUMN SUMMARY SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 fade-up-section">
          {/* Column 1: Statistics Grid */}
          <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-8">
            <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#E8C676]" />
              Quick Stats
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-[#E8C676] fill-[#E8C676]" />
                  <p className="text-xs text-gray-500 uppercase">Rating</p>
                </div>
                <p className="text-2xl font-black text-white">{project.rating}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-[#00C870]" />
                  <p className="text-xs text-gray-500 uppercase">ROI</p>
                </div>
                <p className="text-2xl font-black text-[#00C870]">{project.roi}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-[#E8C676]" />
                  <p className="text-xs text-gray-500 uppercase">Handover</p>
                </div>
                <p className="text-sm font-bold text-white">{project.handoverDate}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-4 h-4 text-[#E8C676]" />
                  <p className="text-xs text-gray-500 uppercase">Plan</p>
                </div>
                <p className="text-sm font-bold text-white">{project.paymentPlan}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00C870]" />
                  <p className="text-xs text-gray-500 uppercase">On-Time</p>
                </div>
                <p className="text-2xl font-black text-[#00C870]">{project.onTimeDelivery}%</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Navigation className="w-4 h-4 text-[#E8C676]" />
                  <p className="text-xs text-gray-500 uppercase">Metro</p>
                </div>
                <p className="text-sm font-bold text-white">{project.metroDistance}</p>
              </div>
            </div>
          </div>

          {/* Column 2: Description */}
          <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-8">
            <h3 className="text-xl font-black text-white mb-6">About This Project</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              {isDescExpanded || !shouldTruncate ? project.description : `${truncatedDesc}...`}
            </p>
            {shouldTruncate && (
              <button
                onClick={() => setIsDescExpanded(!isDescExpanded)}
                className="text-[#E8C676] font-semibold hover:text-[#D4AF37] transition-colors flex items-center gap-2"
              >
                {isDescExpanded ? 'Read Less' : 'Read More'}
                <ChevronRight className={`w-4 h-4 transition-transform ${isDescExpanded ? 'rotate-90' : ''}`} />
              </button>
            )}
          </div>

          {/* Column 3: Contact Panel */}
          <div className="bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-2xl border border-[#E8C676]/30 rounded-3xl p-8">
            <h3 className="text-xl font-black text-white mb-6">Get in Touch</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-4 rounded-2xl font-bold transition-all shadow-lg">
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </button>
              <button className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#E8C676] to-[#D4AF37] hover:shadow-[0_0_30px_rgba(232,198,118,0.5)] text-black px-6 py-4 rounded-2xl font-bold transition-all">
                <Phone className="w-5 h-5" />
                Call Now
              </button>
              <button className="w-full flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-6 py-4 rounded-2xl font-bold transition-all">
                <Mail className="w-5 h-5" />
                Email
              </button>
              <button className="w-full flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-6 py-4 rounded-2xl font-bold transition-all">
                <Download className="w-5 h-5" />
                Download Brochure
              </button>
              <div className="pt-4 border-t border-white/10">
                <button className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#00C870] to-[#00A85D] hover:shadow-[0_0_30px_rgba(0,200,112,0.5)] text-white px-6 py-4 rounded-2xl font-bold transition-all">
                  <Sparkles className="w-5 h-5" />
                  Ask Genie
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* OVERVIEW SECTION */}
        <section
          ref={(el) => { sectionsRef.current['overview'] = el; }}
          className="mb-20 fade-up-section"
        >
          <h2 className="text-4xl font-black text-white mb-8">Overview</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">{project.description}</p>
            </div>
            <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-8">
              <h3 className="text-xl font-black text-white mb-6">Key Facts</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-gray-400">Developer</span>
                  <span className="text-white font-bold">{project.developer}</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-gray-400">Title Type</span>
                  <span className="text-[#E8C676] font-bold">{project.titleType}</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-gray-400">Unit Sizes</span>
                  <span className="text-white font-bold">450 - 1,800 sqft</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-gray-400">Handover</span>
                  <span className="text-white font-bold">{project.handoverDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Payment Plan</span>
                  <span className="text-[#00C870] font-bold">{project.paymentPlan}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AMENITIES SECTION */}
        <section
          ref={(el) => { sectionsRef.current['amenities'] = el; }}
          className="mb-20 fade-up-section"
        >
          <h2 className="text-4xl font-black text-white mb-8">World-Class Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {project.amenities.map((amenity: any, index: number) => {
              const Icon = amenity.icon;
              return (
                <div
                  key={index}
                  className="amenity-card group relative bg-black/40 backdrop-blur-2xl border border-white/10 hover:border-[#00C870]/60 rounded-2xl p-6 transition-all cursor-pointer"
                >
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${
                    amenity.glow === 'emerald'
                      ? 'from-[#00C870]/0 to-[#00C870]/10'
                      : 'from-[#E8C676]/0 to-[#E8C676]/10'
                  } opacity-0 group-hover:opacity-100 transition-opacity`}></div>

                  <div className="relative">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                      amenity.glow === 'emerald'
                        ? 'bg-[#00C870]/20 border border-[#00C870]/40'
                        : 'bg-[#E8C676]/20 border border-[#E8C676]/40'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        amenity.glow === 'emerald' ? 'text-[#00C870]' : 'text-[#E8C676]'
                      }`} />
                    </div>
                    <p className="text-white font-semibold text-sm">{amenity.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* PAYMENT PLAN SECTION */}
        <section
          ref={(el) => { sectionsRef.current['payment'] = el; }}
          className="mb-20 fade-up-section"
        >
          <h2 className="text-4xl font-black text-white mb-8">Payment Plan</h2>
          <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 lg:p-12">
            <div className="relative">
              {/* Vertical Timeline */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#E8C676] via-[#D4AF37] to-[#E8C676]"></div>

              <div className="space-y-6">
                {project.paymentSchedule.map((item: any, index: number) => (
                  <div key={index} className="timeline-item relative pl-20">
                    {/* Gold Marker */}
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-gradient-to-br from-[#E8C676] to-[#D4AF37] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(232,198,118,0.5)]">
                      <span className="text-black font-black text-sm">{item.percentage}%</span>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-xl font-bold text-white mb-1">{item.stage}</h4>
                          <p className="text-sm text-gray-400">{item.date}</p>
                        </div>
                        <div className="text-3xl font-black text-[#E8C676]">{item.percentage}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* UNIT TYPES SECTION */}
        <section
          ref={(el) => { sectionsRef.current['units'] = el; }}
          className="mb-20 fade-up-section"
        >
          <h2 className="text-4xl font-black text-white mb-8">Available Unit Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.unitTypes.map((unit: any, index: number) => (
              <div
                key={index}
                className="group bg-black/40 backdrop-blur-2xl border border-white/10 hover:border-[#E8C676]/60 rounded-3xl overflow-hidden transition-all"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={unit.image}
                    alt={unit.type}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    suppressHydrationWarning
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-[#E8C676] to-[#D4AF37] text-black px-4 py-2 rounded-xl font-bold text-sm">
                    {unit.type}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Starting From</p>
                      <p className="text-2xl font-black text-[#E8C676]">{unit.price}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                      <Ruler className="w-4 h-4 text-gray-400" />
                      <span className="text-white font-semibold">{unit.size} sqft</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <HomeIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300 text-sm">{unit.bedrooms} BR</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Waves className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300 text-sm">{unit.bathrooms} Bath</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {unit.features.map((feature: string, idx: number) => (
                      <span
                        key={idx}
                        className="text-xs bg-white/5 border border-white/10 text-gray-300 px-3 py-1 rounded-lg"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <button className="w-full bg-gradient-to-r from-[#E8C676] to-[#D4AF37] hover:shadow-[0_0_30px_rgba(232,198,118,0.5)] text-black px-6 py-3 rounded-xl font-bold transition-all">
                    View Floor Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LOCATION SECTION */}
        <section
          ref={(el) => { sectionsRef.current['location'] = el; }}
          className="mb-20 fade-up-section"
        >
          <h2 className="text-4xl font-black text-white mb-8">Prime Location</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-black/40 backdrop-blur-2xl border border-[#00C870]/20 rounded-3xl overflow-hidden h-[400px]">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.3!2d${project.coordinates.lng}!3d${project.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDA2JzA4LjAiTiA1NcKwMTQnNTguMiJF!5e0!3m2!1sen!2sae!4v1234567890!5m2!1sen!2sae&q=${encodeURIComponent(project.district)},Dubai`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white mb-6">Nearby Landmarks</h3>
              {[
                { name: 'Metro Station', time: '5 min', icon: Navigation },
                { name: 'Dubai Mall', time: '8 min', icon: ShoppingBag },
                { name: 'DXB Airport', time: '15 min', icon: Navigation },
                { name: 'Downtown Dubai', time: '10 min', icon: Building2 },
                { name: 'Business Bay', time: '7 min', icon: Building2 }
              ].map((landmark, index) => {
                const Icon = landmark.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#E8C676]/20 border border-[#E8C676]/40 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-[#E8C676]" />
                      </div>
                      <span className="text-white font-semibold">{landmark.name}</span>
                    </div>
                    <span className="bg-gradient-to-r from-[#00C870] to-[#00A85D] text-white px-4 py-2 rounded-lg text-sm font-bold">
                      {landmark.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* DEVELOPER INFO SECTION */}
        <section
          ref={(el) => { sectionsRef.current['developer'] = el; }}
          className="mb-20 fade-up-section"
        >
          <h2 className="text-4xl font-black text-white mb-8">Developer Profile</h2>
          <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="w-32 h-32 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Building2 className="w-16 h-16 text-[#E8C676]" />
              </div>

              <div className="flex-1">
                <h3 className="text-3xl font-black text-white mb-4">{project.developer}</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {project.developer} is one of Dubai's most prestigious developers, known for delivering world-class properties with exceptional quality and timely handovers. With decades of experience and a portfolio of iconic developments, they continue to set the standard for luxury living in the UAE.
                </p>

                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <p className="text-3xl font-black text-[#E8C676] mb-2">50+</p>
                    <p className="text-sm text-gray-400">Projects Delivered</p>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-[#00C870] mb-2">{project.onTimeDelivery}%</p>
                    <p className="text-sm text-gray-400">On-Time Delivery</p>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-[#E8C676] mb-2">4.8/5</p>
                    <p className="text-sm text-gray-400">Customer Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI INSIGHTS SECTION */}
        <section
          ref={(el) => { sectionsRef.current['ai-insights'] = el; }}
          className="mb-20 fade-up-section"
        >
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="w-8 h-8 text-[#00C870]" />
            <h2 className="text-4xl font-black text-white">AI-Powered Insights</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Risk Score */}
            <div className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-2xl border border-[#00C870]/30 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-[#00C870]" />
                <h3 className="text-xl font-bold text-white">Risk Score</h3>
              </div>
              <div className="flex items-end gap-2 mb-3">
                <p className="text-6xl font-black text-[#00C870]">{project.aiInsights.riskScore}</p>
                <p className="text-2xl text-gray-400 mb-2">/100</p>
              </div>
              <p className="text-sm text-gray-400">Low Risk • High Confidence</p>
            </div>

            {/* Growth Potential */}
            <div className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-2xl border border-[#E8C676]/30 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-[#E8C676]" />
                <h3 className="text-xl font-bold text-white">Growth Potential</h3>
              </div>
              <div className="flex items-end gap-2 mb-3">
                <p className="text-6xl font-black text-[#E8C676]">{project.aiInsights.growthPotential}</p>
                <p className="text-2xl text-gray-400 mb-2">/100</p>
              </div>
              <p className="text-sm text-gray-400">Excellent Growth Forecast</p>
            </div>

            {/* Demand Level */}
            <div className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-2xl border border-[#00C870]/30 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="w-6 h-6 text-[#00C870]" />
                <h3 className="text-xl font-bold text-white">Demand Level</h3>
              </div>
              <div className="flex items-end gap-2 mb-3">
                <p className="text-6xl font-black text-[#00C870]">{project.aiInsights.demandLevel}</p>
                <p className="text-2xl text-gray-400 mb-2">/100</p>
              </div>
              <p className="text-sm text-gray-400">Very High Demand</p>
            </div>
          </div>

          {/* ROI Projection Chart */}
          <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-white mb-8">ROI Projection Curve</h3>
            <div className="h-80 flex items-end justify-between gap-4">
              {project.aiInsights.roiProjection.map((data: any, index: number) => {
                const maxValue = 25;
                const heightPercent = (data.value / maxValue) * 100;

                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-3">
                    <div className="text-center">
                      <p className="text-2xl font-black text-[#00C870] mb-1">+{data.value}%</p>
                    </div>
                    <div className="w-full bg-gradient-to-t from-[#00C870] to-[#00A85D] rounded-t-xl relative" style={{ height: `${heightPercent}%` }}>
                      <div className="absolute inset-0 bg-white/10 rounded-t-xl animate-pulse"></div>
                    </div>
                    <p className="text-sm font-semibold text-gray-400">{data.year}</p>
                  </div>
                );
              })}
            </div>
            <p className="text-center text-gray-400 mt-8 text-sm">
              AI-generated projections based on historical data, market trends, and developer performance
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
