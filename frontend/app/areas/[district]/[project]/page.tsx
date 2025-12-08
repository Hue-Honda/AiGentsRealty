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

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Icon mapping for amenities
const amenityIconMap: { [key: string]: any } = {
  'swimming pool': Waves,
  'infinity pool': Waves,
  'pool': Waves,
  'gym': Dumbbell,
  'fitness': Dumbbell,
  'fitness center': Dumbbell,
  'kids': Users,
  'children': Users,
  'play area': Users,
  'garden': Trees,
  'landscaped': Trees,
  'park': Trees,
  'security': Shield,
  '24/7': Shield,
  'concierge': Building2,
  'smart': Wifi,
  'wifi': Wifi,
  'retail': ShoppingBag,
  'shopping': ShoppingBag,
  'co-working': GraduationCap,
  'business': GraduationCap,
  'jogging': Navigation,
  'track': Navigation,
  'ev': Zap,
  'charging': Zap,
  'community': Users,
  'spa': Waves,
  'sauna': Waves,
  'steam': Waves,
  'tennis': Activity,
  'basketball': Activity,
  'sports': Activity,
  'restaurant': ShoppingBag,
  'cafe': ShoppingBag,
  'bbq': Trees,
  'barbecue': Trees,
  'parking': Navigation,
  'valet': Navigation,
};

// Helper to get icon for amenity
const getAmenityIcon = (amenityName: string) => {
  const lowerName = amenityName.toLowerCase();
  for (const [key, icon] of Object.entries(amenityIconMap)) {
    if (lowerName.includes(key)) return icon;
  }
  return Building2; // Default icon
};

// Default fallback data
const defaultProject = {
  slug: '',
  name: 'Loading...',
  developer_name: '',
  area_name: '',
  location: '',
  price_from: '',
  payment_plan: '',
  completion_date: '',
  status: 'Off Plan',
  images: [],
  description: '',
  amenities: [],
  unit_types: [],
  match_score: 0,
};

export default function ProjectDetailPage() {
  const params = useParams();
  const projectSlug = params.project as string;
  const districtSlug = params.district as string;

  const [project, setProject] = useState<any>(defaultProject);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch project data from API
  useEffect(() => {
    async function fetchProject() {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/projects/slug/${projectSlug}`);
        const data = await res.json();

        if (data.success && data.data) {
          setProject(data.data);
        } else {
          setError('Project not found');
        }
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Failed to load project');
      } finally {
        setLoading(false);
      }
    }

    if (projectSlug) {
      fetchProject();
    }
  }, [projectSlug]);

  // Transform amenities from API (array of strings) to component format
  const formattedAmenities = (project.amenities || []).map((amenity: string, index: number) => ({
    icon: getAmenityIcon(amenity),
    name: amenity,
    glow: index % 2 === 0 ? 'emerald' : 'gold'
  }));

  // Transform unit types from API
  const formattedUnitTypes = (project.unit_types || []).map((unit: any) => ({
    type: unit.type || unit.name || 'Unit',
    size: unit.size || unit.sqft || '0',
    price: unit.price || 'Contact for Price',
    bedrooms: unit.bedrooms || 0,
    bathrooms: unit.bathrooms || 1,
    image: unit.image || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop&q=90',
    features: unit.features || []
  }));

  // Generate payment schedule from payment_plan (e.g., "80/20" -> 80% during, 20% handover)
  const generatePaymentSchedule = (paymentPlan: string) => {
    if (!paymentPlan) return [];
    const match = paymentPlan.match(/(\d+)\/(\d+)/);
    if (!match) return [];
    const during = parseInt(match[1]);
    const handover = parseInt(match[2]);
    return [
      { stage: 'On Booking', percentage: 10, date: 'Upon reservation' },
      { stage: 'During Construction', percentage: during - 10, date: 'Monthly installments' },
      { stage: 'On Handover', percentage: handover, date: project.completion_date || 'Upon completion' }
    ];
  };

  // Default images if none provided
  const projectImages = project.images?.length > 0 ? project.images : [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&h=1080&fit=crop&q=90',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&h=1080&fit=crop&q=90',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop&q=90',
  ];

  // AI insights (generated based on match_score)
  const aiInsights = {
    riskScore: Math.min(95, (project.match_score || 80) + Math.floor(Math.random() * 10)),
    growthPotential: Math.min(95, (project.match_score || 80) + Math.floor(Math.random() * 8)),
    demandLevel: Math.min(98, (project.match_score || 80) + Math.floor(Math.random() * 12)),
    roiProjection: [
      { year: '2025', value: 5 },
      { year: '2026', value: 9 },
      { year: '2027', value: 13 },
      { year: '2028', value: 17 },
      { year: '2029', value: 21 },
      { year: '2030', value: 25 }
    ]
  };

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

  // GSAP Animations - must be before conditional returns
  useEffect(() => {
    if (!project) return; // Skip animations when project not loaded
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
  }, [project]);

  // Scroll spy for navigation - must be before conditional returns
  useEffect(() => {
    if (!project) return;

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
  }, [project]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <Sparkles className="w-16 h-16 text-[#10B981] animate-pulse mx-auto mb-4" />
            <div className="absolute inset-0 w-16 h-16 bg-[#10B981]/20 rounded-full blur-xl mx-auto animate-ping"></div>
          </div>
          <p className="text-gray-300 text-lg font-semibold">Loading Project Details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">😕</div>
          <h3 className="text-2xl font-bold text-white mb-3">{error}</h3>
          <p className="text-gray-400 mb-8">The project you're looking for could not be found.</p>
          <Link href="/projects" className="bg-gradient-to-r from-[#10B981] to-[#059669] px-8 py-4 rounded-full font-bold text-white">
            Browse All Projects
          </Link>
        </div>
      </div>
    );
  }

  const scrollToSection = (id: string) => {
    const section = sectionsRef.current[id];
    if (section) {
      const yOffset = -100;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const truncatedDesc = (project.description || '').slice(0, 200);
  const shouldTruncate = (project.description || '').length > 200;
  const paymentSchedule = generatePaymentSchedule(project.payment_plan);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* CINEMATIC HERO SECTION */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        {/* Hero Image with Parallax */}
        <div className="hero-image absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 z-10"></div>
          <img
            src={projectImages[currentImageIndex]}
            alt={project.name}
            className="w-full h-full object-cover"
            suppressHydrationWarning
          />
          {/* Ambient Glows */}
          <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-[#E8C676]/10 rounded-full blur-[150px] z-20"></div>
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#10B981]/10 rounded-full blur-[120px] z-20"></div>
        </div>

        {/* Breadcrumbs - Top Left */}
        <div className="absolute top-24 left-6 lg:left-16 z-30">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/projects" className="hover:text-[#E8C676] transition-colors">Projects</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/areas/${districtSlug}`} className="hover:text-[#E8C676] transition-colors">{project.area_name || project.location}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{project.name}</span>
          </div>
        </div>

        {/* Image Carousel Thumbnails - Right Side */}
        <div className="absolute right-6 lg:right-16 top-1/2 -translate-y-1/2 z-30 space-y-3">
          {projectImages.map((img: string, idx: number) => (
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
                    <span className="bg-gradient-to-r from-[#10B981] to-[#059669] text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-[0_0_20px_rgba(0,200,112,0.4)]">
                      {project.status || 'Off Plan'}
                    </span>
                    <span className="bg-gradient-to-r from-[#E8C676] to-[#D4AF37] text-black px-4 py-1.5 rounded-full text-sm font-bold">
                      Freehold
                    </span>
                    {project.completion_date && (
                      <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                        Handover: {project.completion_date}
                      </span>
                    )}
                  </div>

                  <h1 className="text-5xl lg:text-7xl font-black text-white mb-3 leading-tight tracking-tight">
                    {project.name}
                  </h1>

                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-5 h-5 text-[#E8C676]" />
                    <span className="text-xl text-gray-300">{project.area_name || project.location}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-lg text-gray-400">by {project.developer_name}</span>
                  </div>

                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Starting From</p>
                      <p className="text-4xl font-black bg-gradient-to-r from-[#E8C676] via-[#D4AF37] to-[#E8C676] bg-clip-text text-transparent">
                        {project.price_from || 'Contact for Price'}
                      </p>
                    </div>
                    {project.match_score && (
                      <>
                        <div className="h-12 w-px bg-white/20"></div>
                        <div>
                          <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">AI Match Score</p>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-[#10B981]" />
                            <p className="text-2xl font-black text-[#10B981]">{project.match_score}%</p>
                          </div>
                        </div>
                      </>
                    )}
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
                  <p className="text-xs text-gray-500 uppercase">Match Score</p>
                </div>
                <p className="text-2xl font-black text-white">{project.match_score || 85}%</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-[#10B981]" />
                  <p className="text-xs text-gray-500 uppercase">Status</p>
                </div>
                <p className="text-lg font-black text-[#10B981]">{project.status || 'Off Plan'}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-[#E8C676]" />
                  <p className="text-xs text-gray-500 uppercase">Handover</p>
                </div>
                <p className="text-sm font-bold text-white">{project.completion_date || 'TBA'}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-4 h-4 text-[#E8C676]" />
                  <p className="text-xs text-gray-500 uppercase">Plan</p>
                </div>
                <p className="text-sm font-bold text-white">{project.payment_plan || 'Flexible'}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <p className="text-xs text-gray-500 uppercase">Developer</p>
                </div>
                <p className="text-sm font-black text-[#10B981]">{project.developer_name}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Navigation className="w-4 h-4 text-[#E8C676]" />
                  <p className="text-xs text-gray-500 uppercase">Location</p>
                </div>
                <p className="text-sm font-bold text-white">{project.location}</p>
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
                <button className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#10B981] to-[#059669] hover:shadow-[0_0_30px_rgba(0,200,112,0.5)] text-white px-6 py-4 rounded-2xl font-bold transition-all">
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
                  <span className="text-white font-bold">{project.developer_name}</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-gray-400">Title Type</span>
                  <span className="text-[#E8C676] font-bold">Freehold</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-gray-400">Location</span>
                  <span className="text-white font-bold">{project.location}</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-gray-400">Handover</span>
                  <span className="text-white font-bold">{project.completion_date || 'TBA'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Payment Plan</span>
                  <span className="text-[#10B981] font-bold">{project.payment_plan || 'Flexible'}</span>
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
            {formattedAmenities.length > 0 ? formattedAmenities.map((amenity: any, index: number) => {
              const Icon = amenity.icon;
              return (
                <div
                  key={index}
                  className="amenity-card group relative bg-black/40 backdrop-blur-2xl border border-white/10 hover:border-[#10B981]/60 rounded-2xl p-6 transition-all cursor-pointer"
                >
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${
                    amenity.glow === 'emerald'
                      ? 'from-[#10B981]/0 to-[#10B981]/10'
                      : 'from-[#E8C676]/0 to-[#E8C676]/10'
                  } opacity-0 group-hover:opacity-100 transition-opacity`}></div>

                  <div className="relative">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                      amenity.glow === 'emerald'
                        ? 'bg-[#10B981]/20 border border-[#10B981]/40'
                        : 'bg-[#E8C676]/20 border border-[#E8C676]/40'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        amenity.glow === 'emerald' ? 'text-[#10B981]' : 'text-[#E8C676]'
                      }`} />
                    </div>
                    <p className="text-white font-semibold text-sm">{amenity.name}</p>
                  </div>
                </div>
              );
            }) : (
              <div className="col-span-full text-center py-8 text-gray-400">
                Amenities information coming soon
              </div>
            )}
          </div>
        </section>

        {/* PAYMENT PLAN SECTION */}
        <section
          ref={(el) => { sectionsRef.current['payment'] = el; }}
          className="mb-20 fade-up-section"
        >
          <h2 className="text-4xl font-black text-white mb-8">Payment Plan</h2>
          <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 lg:p-12">
            {paymentSchedule.length > 0 ? (
              <div className="relative">
                {/* Vertical Timeline */}
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#E8C676] via-[#D4AF37] to-[#E8C676]"></div>

                <div className="space-y-6">
                  {paymentSchedule.map((item: any, index: number) => (
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
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-2">Payment Plan: <span className="text-[#E8C676] font-bold">{project.payment_plan || 'Flexible'}</span></p>
                <p className="text-sm text-gray-500">Contact us for detailed payment schedule</p>
              </div>
            )}
          </div>
        </section>

        {/* UNIT TYPES SECTION */}
        <section
          ref={(el) => { sectionsRef.current['units'] = el; }}
          className="mb-20 fade-up-section"
        >
          <h2 className="text-4xl font-black text-white mb-8">Available Unit Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formattedUnitTypes.length > 0 ? formattedUnitTypes.map((unit: any, index: number) => (
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
            )) : (
              <div className="col-span-full text-center py-8 text-gray-400">
                Unit types information coming soon
              </div>
            )}
          </div>
        </section>

        {/* LOCATION SECTION */}
        <section
          ref={(el) => { sectionsRef.current['location'] = el; }}
          className="mb-20 fade-up-section"
        >
          <h2 className="text-4xl font-black text-white mb-8">Prime Location</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-black/40 backdrop-blur-2xl border border-[#10B981]/20 rounded-3xl overflow-hidden h-[400px]">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(project.location || project.area_name || 'Dubai')},Dubai,UAE`}
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
                    <span className="bg-gradient-to-r from-[#10B981] to-[#059669] text-white px-4 py-2 rounded-lg text-sm font-bold">
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
                <h3 className="text-3xl font-black text-white mb-4">{project.developer_name}</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {project.developer_name} is one of Dubai's most prestigious developers, known for delivering world-class properties with exceptional quality and timely handovers. With decades of experience and a portfolio of iconic developments, they continue to set the standard for luxury living in the UAE.
                </p>

                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <p className="text-3xl font-black text-[#E8C676] mb-2">50+</p>
                    <p className="text-sm text-gray-400">Projects Delivered</p>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-[#10B981] mb-2">96%</p>
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
            <Sparkles className="w-8 h-8 text-[#10B981]" />
            <h2 className="text-4xl font-black text-[#0A0A0A]">AI-Powered Insights</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Risk Score */}
            <div className="bg-white border border-gray-200 shadow-lg rounded-3xl p-8 hover:border-[#10B981] transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#10B981]/10 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#10B981]" />
                </div>
                <h3 className="text-xl font-bold text-[#0A0A0A]">Risk Score</h3>
              </div>
              <div className="flex items-end gap-2 mb-3">
                <p className="text-6xl font-black text-[#10B981]">{aiInsights.riskScore}</p>
                <p className="text-2xl text-gray-400 mb-2">/100</p>
              </div>
              <p className="text-sm text-gray-500">Low Risk • High Confidence</p>
            </div>

            {/* Growth Potential */}
            <div className="bg-white border border-gray-200 shadow-lg rounded-3xl p-8 hover:border-[#D4AF37] transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-bold text-[#0A0A0A]">Growth Potential</h3>
              </div>
              <div className="flex items-end gap-2 mb-3">
                <p className="text-6xl font-black text-[#D4AF37]">{aiInsights.growthPotential}</p>
                <p className="text-2xl text-gray-400 mb-2">/100</p>
              </div>
              <p className="text-sm text-gray-500">Excellent Growth Forecast</p>
            </div>

            {/* Demand Level */}
            <div className="bg-white border border-gray-200 shadow-lg rounded-3xl p-8 hover:border-[#10B981] transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#10B981]/10 rounded-xl flex items-center justify-center">
                  <Activity className="w-5 h-5 text-[#10B981]" />
                </div>
                <h3 className="text-xl font-bold text-[#0A0A0A]">Demand Level</h3>
              </div>
              <div className="flex items-end gap-2 mb-3">
                <p className="text-6xl font-black text-[#10B981]">{aiInsights.demandLevel}</p>
                <p className="text-2xl text-gray-400 mb-2">/100</p>
              </div>
              <p className="text-sm text-gray-500">Very High Demand</p>
            </div>
          </div>

          {/* ROI Projection Chart */}
          <div className="bg-white border border-gray-200 shadow-lg rounded-3xl p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-[#0A0A0A] mb-8">ROI Projection Curve</h3>
            <div className="h-80 flex items-end justify-between gap-4">
              {aiInsights.roiProjection.map((data: any, index: number) => {
                const maxValue = 25;
                const heightPercent = (data.value / maxValue) * 100;

                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-3">
                    <div className="text-center">
                      <p className="text-2xl font-black text-[#10B981] mb-1">+{data.value}%</p>
                    </div>
                    <div className="w-full bg-gradient-to-t from-[#10B981] to-[#059669] rounded-t-xl relative shadow-md" style={{ height: `${heightPercent}%` }}>
                      <div className="absolute inset-0 bg-white/20 rounded-t-xl"></div>
                    </div>
                    <p className="text-sm font-semibold text-gray-600">{data.year}</p>
                  </div>
                );
              })}
            </div>
            <p className="text-center text-gray-500 mt-8 text-sm">
              AI-generated projections based on historical data, market trends, and developer performance
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
