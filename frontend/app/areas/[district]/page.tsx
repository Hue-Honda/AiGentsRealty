'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  MapPin, Building2, TrendingUp, Sparkles, CheckCircle, ChevronRight, ChevronLeft,
  School, Award, ShoppingBag, Train, Phone, MessageCircle,
  Home, DollarSign, BarChart3, Users, Star, Package
} from 'lucide-react';

// Mock specialists data
const specialists = [
  {
    id: 1,
    name: 'Sarah Al-Mansoori',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    phone: '+971 50 123 4567',
    whatsapp: '+971 50 123 4567'
  },
  {
    id: 2,
    name: 'Ahmed Hassan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    phone: '+971 50 234 5678',
    whatsapp: '+971 50 234 5678'
  },
  {
    id: 3,
    name: 'Maria Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    phone: '+971 50 345 6789',
    whatsapp: '+971 50 345 6789'
  },
  {
    id: 4,
    name: 'Khalid Ibrahim',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    phone: '+971 50 456 7890',
    whatsapp: '+971 50 456 7890'
  }
];

// Offices data
const offices = [
  {
    name: 'Dubai Marina',
    address: 'Marina Plaza, Level 12, Dubai Marina',
    phone: '+971 4 123 4567'
  },
  {
    name: 'Business Bay',
    address: 'Bay Gate Tower, Floor 25, Business Bay',
    phone: '+971 4 234 5678'
  },
  {
    name: 'Jumeirah Village Circle',
    address: 'Circle Mall, Ground Floor, JVC',
    phone: '+971 4 345 6789'
  },
  {
    name: 'Dubai Creek Harbour',
    address: 'Creek Residences, Lobby Level',
    phone: '+971 4 456 7890'
  }
];

// Mock data structure
const districtData: any = {
  'dubai-design-district-dubai': {
    slug: 'dubai-design-district-dubai',
    name: 'Dubai Design District (d3)',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&h=600&fit=crop&q=90',
    stats: {
      totalProjects: 12,
      startingPrice: 1200000,
      avgROI: 11.5,
      avgSqftPrice: 980,
      avgSize: 1250,
      masterDeveloper: 'Meraas',
      aiRating: 85,
      popularityScore: 78
    },
    shortIntro: 'Al Furjan is a well-connected family district in Dubai, offering modern villas and townhouses with excellent amenities. The community features parks, schools, shopping centers, and easy access to major highways, making it ideal for families and professionals alike.',
    description: {
      intro: 'Dubai Design District (d3) is a visionary creative community dedicated to design, art, and luxury living. Located in the heart of Dubai, this master-planned development by Meraas combines cutting-edge architecture with world-class amenities.',
      seoLongForm: `Dubai Design District, commonly known as d3, represents a pioneering approach to urban development in Dubai. This master-planned community has emerged as the Middle East's premier hub for art, design, and creative industries, attracting talent and investment from around the globe.

The district's strategic location in the heart of Dubai provides residents and businesses with unparalleled connectivity to the city's major commercial and leisure destinations. Within minutes, you can reach Downtown Dubai, Business Bay, and Dubai International Financial Centre, making d3 an ideal location for both living and working.

The architectural landscape of d3 is characterized by contemporary design that seamlessly blends functionality with aesthetic appeal. Buildings feature clean lines, innovative materials, and sustainable design principles that reflect the district's commitment to environmental responsibility. The pedestrian-friendly layout encourages walkability and community interaction, with wide boulevards, shaded walkways, and carefully landscaped public spaces.

For residents, d3 offers a unique lifestyle that combines urban convenience with cultural richness. The district hosts regular art exhibitions, design festivals, and cultural events that bring the community together. High-end dining options, boutique retail stores, and creative co-working spaces contribute to a vibrant, cosmopolitan atmosphere that appeals to young professionals and creative entrepreneurs.

Education and healthcare facilities in the vicinity ensure that families have access to essential services without traveling far. The district's proximity to top international schools and medical centers makes it a practical choice for families, while its creative energy and modern amenities attract singles and young couples.

Investment in d3 property has shown consistent growth, with rental yields remaining competitive and capital appreciation demonstrating steady upward trends. The district's unique positioning as Dubai's creative quarter ensures sustained demand from both end-users and investors seeking exposure to one of the city's most dynamic neighborhoods.`,
      paragraphs: [
        'The district serves as a global hub for design and culture, attracting creative professionals, artists, and design enthusiasts from around the world. With its innovative urban planning and contemporary aesthetic, d3 offers a unique blend of residential, commercial, and cultural spaces.',
        'Residents enjoy proximity to iconic landmarks such as the Burj Khalifa, Dubai Mall, and Business Bay, while benefiting from excellent connectivity via major highways and public transportation. The area features a vibrant mix of galleries, boutiques, cafes, and creative studios.',
        'The residential offerings in d3 range from modern apartments to luxury penthouses, all designed with attention to detail and sustainable living principles. The community is particularly popular among young professionals and creative entrepreneurs seeking a dynamic urban lifestyle.'
      ]
    },
    projects: [
      {
        slug: 'meraas-the-edit-at-d3',
        name: 'The Edit at d3',
        developer: 'Meraas',
        price: 'From AED 1.2M',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
        bedrooms: '1-3 BR',
        completion: 'Q1 2030',
        paymentPlan: '70/30',
        status: 'Off Plan',
        subcommunity: 'Central d3'
      },
      {
        slug: 'meraas-design-quarter',
        name: 'Design Quarter',
        developer: 'Meraas',
        price: 'From AED 950K',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
        bedrooms: 'Studio-2 BR',
        completion: 'Q2 2029',
        paymentPlan: '60/40',
        status: 'Off Plan',
        subcommunity: 'East d3'
      },
      {
        slug: 'meraas-artisan-lofts',
        name: 'Artisan Lofts',
        developer: 'Meraas',
        price: 'From AED 1.5M',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
        bedrooms: '2-3 BR',
        completion: 'Q3 2029',
        paymentPlan: '80/20',
        status: 'Off Plan',
        subcommunity: 'West d3'
      },
      {
        slug: 'meraas-creative-studios',
        name: 'Creative Studios',
        developer: 'Meraas',
        price: 'From AED 850K',
        image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop',
        bedrooms: 'Studio-1 BR',
        completion: 'Q4 2028',
        paymentPlan: '70/30',
        status: 'Ready',
        subcommunity: 'South d3'
      }
    ],
    lifestyle: {
      amenities: ['State-of-the-art fitness centers', 'Swimming pools and spa facilities', 'Children\'s play areas and parks', 'Community retail and dining'],
      transportation: ['Business Bay Metro - 5 min walk', 'Dubai Tram - 10 min', 'Sheikh Zayed Road - Direct access', 'RTA Bus routes'],
      schools: ['GEMS Wellington Academy - 8 min', 'Raffles International School - 12 min', 'Arcadia School - 10 min'],
      nearby: ['Dubai Mall - 10 min', 'Burj Khalifa - 12 min', 'City Walk - 5 min', 'La Mer Beach - 15 min'],
      shopping: ['Dubai Mall', 'City Walk', 'Box Park', 'The Galleria'],
      dining: ['High-end restaurants', 'Casual cafes', 'International cuisine', 'Rooftop bars']
    }
  },
  'al-furjan': {
    slug: 'al-furjan',
    name: 'Al Furjan',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=600&fit=crop&q=90',
    stats: {
      totalProjects: 6,
      startingPrice: 850000,
      avgROI: 9.8,
      avgSqftPrice: 850,
      avgSize: 1800,
      masterDeveloper: 'Nakheel',
      aiRating: 82,
      popularityScore: 75
    },
    shortIntro: 'Al Furjan is a well-connected family district in Dubai, offering modern villas and townhouses with excellent amenities. The community features parks, schools, shopping centers, and easy access to major highways.',
    description: {
      intro: 'Al Furjan is a master-planned community by Nakheel that offers a perfect blend of modern living and family-friendly amenities.',
      seoLongForm: `Al Furjan stands as one of Dubai's most sought-after family communities, masterfully developed by Nakheel to provide residents with an exceptional quality of life. This thriving neighborhood has become synonymous with family values, modern architecture, and comprehensive community facilities.

Located strategically between Jebel Ali and Discovery Gardens, Al Furjan enjoys excellent connectivity to Dubai's major business districts and leisure destinations. The community is just minutes away from Sheikh Zayed Road, providing seamless access to Dubai Marina, Downtown Dubai, and Dubai International Airport.

The residential landscape of Al Furjan is diverse, featuring elegant villas, modern townhouses, and contemporary apartments that cater to various family sizes and preferences. Each property is designed with attention to detail, incorporating modern amenities and thoughtful layouts that maximize space and natural light.

Community facilities in Al Furjan are second to none, with multiple parks, playgrounds, and recreational areas distributed throughout the neighborhood. The community center serves as a hub for social activities, while retail outlets and dining options ensure residents have convenient access to daily necessities and entertainment.

Education is well-served in Al Furjan, with several reputable international schools located within or near the community. Healthcare facilities, including clinics and pharmacies, are readily available, providing peace of mind for families with young children.

From an investment perspective, Al Furjan has demonstrated consistent performance, with property values showing steady appreciation and rental yields remaining attractive. The community's family-oriented nature ensures sustained demand from both end-users and investors.`,
      paragraphs: [
        'The community is designed with families in mind, featuring spacious villas and townhouses with private gardens and modern amenities.',
        'Al Furjan boasts excellent connectivity to major highways, making commutes to key business districts and leisure destinations convenient.',
        'With its parks, schools, and shopping centers, Al Furjan provides everything families need within easy reach.'
      ]
    },
    projects: [
      {
        slug: 'nakheel-furjan-gardens',
        name: 'Furjan Gardens',
        developer: 'Nakheel',
        price: 'From AED 1.8M',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
        bedrooms: '3-4 BR Villas',
        completion: 'Ready',
        paymentPlan: 'Cash',
        status: 'Ready',
        subcommunity: 'Central Al Furjan'
      },
      {
        slug: 'nakheel-furjan-pavilion',
        name: 'Furjan Pavilion',
        developer: 'Nakheel',
        price: 'From AED 850K',
        image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
        bedrooms: 'Studio-2 BR',
        completion: 'Q4 2028',
        paymentPlan: '60/40',
        status: 'Off Plan',
        subcommunity: 'North Al Furjan'
      },
      {
        slug: 'nakheel-quortaj',
        name: 'Quortaj',
        developer: 'Nakheel',
        price: 'From AED 2.2M',
        image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop',
        bedrooms: '3-5 BR Villas',
        completion: 'Ready',
        paymentPlan: 'Cash',
        status: 'Ready',
        subcommunity: 'West Al Furjan'
      },
      {
        slug: 'nakheel-al-furjan-townhouses',
        name: 'Al Furjan Townhouses',
        developer: 'Nakheel',
        price: 'From AED 1.5M',
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
        bedrooms: '3 BR Townhouses',
        completion: 'Ready',
        paymentPlan: 'Cash',
        status: 'Ready',
        subcommunity: 'East Al Furjan'
      },
      {
        slug: 'nakheel-furjan-residences',
        name: 'Furjan Residences',
        developer: 'Nakheel',
        price: 'From AED 950K',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
        bedrooms: '1-2 BR',
        completion: 'Q2 2029',
        paymentPlan: '70/30',
        status: 'Off Plan',
        subcommunity: 'South Al Furjan'
      },
      {
        slug: 'nakheel-al-furjan-villas-phase-2',
        name: 'Al Furjan Villas Phase 2',
        developer: 'Nakheel',
        price: 'From AED 2.5M',
        image: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&h=600&fit=crop',
        bedrooms: '4-5 BR Villas',
        completion: 'Q3 2029',
        paymentPlan: '80/20',
        status: 'Off Plan',
        subcommunity: 'Premium Al Furjan'
      }
    ],
    lifestyle: {
      amenities: ['Community parks', 'Swimming pools', 'Fitness centers', 'Retail shops', 'Restaurants'],
      transportation: ['Metro Green Line - 10 min', 'Sheikh Zayed Road - 5 min', 'RTA Bus routes'],
      schools: ['GEMS Metropole - 5 min', 'Ranches Primary School - 12 min'],
      nearby: ['Ibn Battuta Mall - 5 min', 'Dubai Marina - 15 min', 'JBR Beach - 20 min'],
      shopping: ['Ibn Battuta Mall', 'Discovery Gardens Pavilion'],
      dining: ['Various cafes', 'Family restaurants', 'Fast food outlets']
    }
  }
};

export default function DistrictDetailsPage() {
  const params = useParams();
  const districtSlug = params.district as string;
  const district = districtData[districtSlug] || districtData['al-furjan'];

  const [email, setEmail] = useState('');

  const scrollSpecialists = (direction: 'left' | 'right') => {
    const container = document.getElementById('specialists-scroll');
    if (container) {
      const scrollAmount = 320;
      if (direction === 'left') {
        container.scrollLeft -= scrollAmount;
      } else {
        container.scrollLeft += scrollAmount;
      }
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for subscribing! We'll send updates to ${email}`);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-[#020202]">
      {/* Subtle Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#00FF87 1px, transparent 1px), linear-gradient(90deg, #00FF87 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}></div>
      </div>

      {/* ========================================
          1) HERO SECTION (FULL WIDTH)
      ======================================== */}
      <section className="relative h-[500px] overflow-hidden">
        {/* Background Image */}
        <img
          src={district.image}
          alt={district.name}
          className="absolute inset-0 w-full h-full object-cover"
          suppressHydrationWarning
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#020202]"></div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 h-full flex flex-col justify-end pb-16">
          {/* Breadcrumb */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-white/60">
              <Link href="/" className="hover:text-[#00FF87] transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/areas" className="hover:text-[#00FF87] transition-colors">Areas</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white/90">{district.name}</span>
            </div>
          </div>

          {/* District Name */}
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
            {district.name}
          </h1>

          {/* Stats Row */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#00FF87]" />
              <span className="text-white font-semibold text-lg">
                {district.stats?.totalProjects || 0} Projects
              </span>
            </div>
            {district.stats?.startingPrice > 0 && (
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-[#E8C468]" />
                <span className="text-white font-semibold text-lg">
                  Starting from AED {(district.stats.startingPrice / 1000).toFixed(0)}K
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#00FF87] rounded-full animate-pulse"></div>
              <MapPin className="w-5 h-5 text-[#00FF87]" />
              <span className="text-white/90 font-semibold text-lg">Prime Location</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* ========================================
            2) SHORT INTRO CONTENT BLOCK (FULL WIDTH)
        ======================================== */}
        <section className="py-16">
          <h2 className="text-3xl font-black text-white mb-6">
            About {district.name}
          </h2>
          <div className="space-y-4 text-white/70 text-base leading-relaxed max-w-4xl">
            <p>{district.shortIntro || district.description.intro}</p>
            {district.description.paragraphs?.slice(0, 2).map((para: string, i: number) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>

        {/* ========================================
            3) AREA SPECIALISTS (HORIZONTAL SCROLL)
        ======================================== */}
        <section className="py-16 border-t border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-white">
              {district.name} Specialists
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollSpecialists('left')}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-[#00FF87]/40 transition-all"
              >
                <ChevronLeft className="w-5 h-5 text-white/60" />
              </button>
              <button
                onClick={() => scrollSpecialists('right')}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-[#00FF87]/40 transition-all"
              >
                <ChevronRight className="w-5 h-5 text-white/60" />
              </button>
            </div>
          </div>

          <div
            id="specialists-scroll"
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          >
            {specialists.map((specialist) => (
              <div
                key={specialist.id}
                className="flex-shrink-0 w-72 bg-white/[0.03] border border-white/10 rounded-xl p-6 hover:border-[#00FF87]/40 transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={specialist.avatar}
                    alt={specialist.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#00FF87]/30"
                    suppressHydrationWarning
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">{specialist.name}</h3>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-[#00FF87]" />
                      <p className="text-xs text-white/50">AiGentsRealty Verified Specialist</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${specialist.whatsapp.replace(/\s/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#25D366]/20 border border-[#25D366]/40 rounded-lg hover:bg-[#25D366]/30 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span className="text-sm font-semibold text-white">WhatsApp</span>
                  </a>
                  <a
                    href={`tel:${specialist.phone}`}
                    className="flex items-center justify-center w-12 h-10 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-[#00FF87]/40 transition-all"
                  >
                    <Phone className="w-4 h-4 text-white/60" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================
            4) FEATURED PROJECTS IN THIS DISTRICT
        ======================================== */}
        <section className="py-16 border-t border-white/5">
          <h2 className="text-3xl font-black text-white mb-8">
            Featured Projects in {district.name}
          </h2>

          {district.projects && district.projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {district.projects.map((project: any) => (
                <Link
                  key={project.slug}
                  href={`/areas/${districtSlug}/${project.slug}`}
                  className="group bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden hover:border-[#00FF87]/40 hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      suppressHydrationWarning
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60"></div>

                    {/* Status Tag */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-xs font-bold text-white">
                      {project.status}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">
                      {project.name}
                    </h3>
                    <p className="text-sm text-white/50 mb-3">{project.subcommunity}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs text-white/40 mb-0.5">Starting</p>
                        <p className="text-base font-bold text-[#00FF87]">{project.price}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-white/40 mb-0.5">{project.bedrooms}</p>
                        <p className="text-xs text-white/60 font-semibold">{project.paymentPlan}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-white/60 group-hover:text-[#00FF87] group-hover:gap-2 transition-all">
                      <span className="text-sm font-semibold">View Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-12 text-center">
                <div className="inline-flex mb-6">
                  <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center">
                    <Package className="w-10 h-10 text-white/30" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  No Projects Currently Available
                </h3>
                <p className="text-white/50 leading-relaxed">
                  Check back soon for new developments in this district. In the meantime, explore our other featured areas.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* ========================================
            5) DISTRICT STATISTICS (NOW FULL-WIDTH)
        ======================================== */}
        <section className="py-16 border-t border-white/5">
          <h2 className="text-3xl font-black text-white mb-8">
            District Insights
          </h2>

          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <Building2 className="w-6 h-6 text-[#00FF87]" />
                </div>
                <p className="text-xs text-white/40 uppercase tracking-wide mb-2">Total Projects</p>
                <p className="text-2xl font-black text-white">{district.stats?.totalProjects || 0}</p>
              </div>

              {district.stats?.startingPrice > 0 && (
                <div className="text-center">
                  <div className="flex items-center justify-center mb-3">
                    <DollarSign className="w-6 h-6 text-[#E8C468]" />
                  </div>
                  <p className="text-xs text-white/40 uppercase tracking-wide mb-2">Starting Price</p>
                  <p className="text-2xl font-black text-[#E8C468]">AED {(district.stats.startingPrice / 1000).toFixed(0)}K</p>
                </div>
              )}

              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <TrendingUp className="w-6 h-6 text-[#00FF87]" />
                </div>
                <p className="text-xs text-white/40 uppercase tracking-wide mb-2">Avg ROI</p>
                <p className="text-2xl font-black text-white">{district.stats?.avgROI || 0}%</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <BarChart3 className="w-6 h-6 text-[#00FF87]" />
                </div>
                <p className="text-xs text-white/40 uppercase tracking-wide mb-2">Avg Price/sqft</p>
                <p className="text-2xl font-black text-white">AED {district.stats?.avgSqftPrice || 0}</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <Home className="w-6 h-6 text-[#00FF87]" />
                </div>
                <p className="text-xs text-white/40 uppercase tracking-wide mb-2">Avg Size</p>
                <p className="text-2xl font-black text-white">{district.stats?.avgSize || 0} sqft</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-[#E8C468]" />
                </div>
                <p className="text-xs text-white/40 uppercase tracking-wide mb-2">Master Developer</p>
                <p className="text-lg font-black text-white">{district.stats?.masterDeveloper || 'N/A'}</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <Sparkles className="w-6 h-6 text-[#00FF87]" />
                </div>
                <p className="text-xs text-white/40 uppercase tracking-wide mb-2">AI Rating</p>
                <p className="text-2xl font-black text-white">{district.stats?.aiRating || 0}</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <Star className="w-6 h-6 text-[#E8C468]" />
                </div>
                <p className="text-xs text-white/40 uppercase tracking-wide mb-2">Popularity Score</p>
                <p className="text-2xl font-black text-white">{district.stats?.popularityScore || 0}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================
            6) DISTRICT LIFESTYLE CONTENT
        ======================================== */}
        <section className="py-16 border-t border-white/5">
          <h2 className="text-3xl font-black text-white mb-8">
            Living in {district.name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Amenities */}
            {district.lifestyle?.amenities && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-[#00FF87]" />
                  <h3 className="text-xl font-bold text-white">Amenities</h3>
                </div>
                <ul className="space-y-2">
                  {district.lifestyle.amenities.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-white/70">
                      <CheckCircle className="w-4 h-4 text-[#00FF87]/60 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Transportation */}
            {district.lifestyle?.transportation && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Train className="w-5 h-5 text-[#00FF87]" />
                  <h3 className="text-xl font-bold text-white">Transportation</h3>
                </div>
                <ul className="space-y-2">
                  {district.lifestyle.transportation.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-white/70">
                      <CheckCircle className="w-4 h-4 text-[#00FF87]/60 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Schools */}
            {district.lifestyle?.schools && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <School className="w-5 h-5 text-[#00FF87]" />
                  <h3 className="text-xl font-bold text-white">Education</h3>
                </div>
                <ul className="space-y-2">
                  {district.lifestyle.schools.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-white/70">
                      <CheckCircle className="w-4 h-4 text-[#00FF87]/60 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Shopping & Dining */}
            {district.lifestyle?.shopping && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <ShoppingBag className="w-5 h-5 text-[#00FF87]" />
                  <h3 className="text-xl font-bold text-white">Shopping & Dining</h3>
                </div>
                <ul className="space-y-2">
                  {district.lifestyle.shopping.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-white/70">
                      <CheckCircle className="w-4 h-4 text-[#00FF87]/60 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* ========================================
            7) AI GENIE CTA (FULL WIDTH)
        ======================================== */}
        <section className="py-16 border-t border-white/5">
          <div className="bg-gradient-to-br from-[#E8C468]/10 via-black/40 to-[#00FF87]/5 border border-[#E8C468]/30 rounded-2xl p-12 text-center relative overflow-hidden">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#E8C468]/5 to-transparent pointer-events-none"></div>

            <div className="relative">
              {/* Icon */}
              <div className="inline-flex mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#E8C468] rounded-2xl blur-xl opacity-40 animate-pulse"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-[#E8C468] to-[#E8C468]/70 rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-black" />
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-black text-white mb-4">
                Need Help Finding the Right Property?
              </h2>
              <p className="text-white/60 mb-8 max-w-2xl mx-auto leading-relaxed">
                Let AI Genie analyze your preferences and recommend the best property in {district.name}.
              </p>

              <button
                onClick={() => window.dispatchEvent(new CustomEvent('openFloatingChat'))}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#E8C468] to-[#E8C468]/90 text-black rounded-full font-bold hover:shadow-[0_0_40px_rgba(232,196,104,0.4)] transition-all hover:scale-105"
              >
                <Sparkles className="w-5 h-5" />
                Ask Genie
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* ========================================
            8) LONG-FORM SEO SECTION
        ======================================== */}
        {district.description?.seoLongForm && (
          <section className="py-16 border-t border-white/5">
            <h2 className="text-3xl font-black text-white mb-8">
              About {district.name}
            </h2>
            <div className="prose prose-invert max-w-none">
              {district.description.seoLongForm.split('\n\n').map((para: string, i: number) => (
                <p key={i} className="text-white/70 leading-relaxed mb-6">
                  {para}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* ========================================
            9) NEWSLETTER / LEAD CAPTURE CTA
        ======================================== */}
        <section className="py-16 border-t border-white/5">
          <div className="bg-gradient-to-br from-[#00FF87]/10 via-black/40 to-black/40 border border-[#00FF87]/30 rounded-2xl p-12">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-black text-white mb-4">
                Stay Updated on New Launches in {district.name}
              </h2>
              <p className="text-white/60 mb-8 leading-relaxed">
                Be the first to know about new property launches, exclusive deals, and market insights in {district.name}.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FF87]/50 focus:bg-white/10 transition-all"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-[#E8C468] to-[#E8C468]/90 text-black rounded-xl font-bold hover:shadow-[0_0_30px_rgba(232,196,104,0.4)] transition-all hover:scale-105 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ========================================
            10) SEO INTERNAL LINK COLUMNS
        ======================================== */}
        <section className="py-16 border-t border-white/5">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {/* Dubai Areas */}
            <div>
              <h3 className="text-sm font-bold text-white/90 uppercase tracking-wide mb-4">Dubai Areas</h3>
              <ul className="space-y-2">
                {['Dubai Marina', 'Downtown Dubai', 'Palm Jumeirah', 'Business Bay', 'JBR'].map((area) => (
                  <li key={area}>
                    <Link href={`/areas/${area.toLowerCase().replace(/\s/g, '-')}`} className="text-xs text-white/50 hover:text-[#00FF87] transition-colors">
                      {area}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Developers */}
            <div>
              <h3 className="text-sm font-bold text-white/90 uppercase tracking-wide mb-4">Developers</h3>
              <ul className="space-y-2">
                {['Emaar', 'DAMAC', 'Nakheel', 'Meraas', 'Sobha'].map((dev) => (
                  <li key={dev}>
                    <Link href={`/developers/${dev.toLowerCase()}`} className="text-xs text-white/50 hover:text-[#00FF87] transition-colors">
                      {dev}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* By Price Range */}
            <div>
              <h3 className="text-sm font-bold text-white/90 uppercase tracking-wide mb-4">By Price</h3>
              <ul className="space-y-2">
                {['Under 1M', '1M - 2M', '2M - 3M', '3M - 5M', '5M+'].map((range) => (
                  <li key={range}>
                    <Link href={`/projects/by-price/${range.toLowerCase()}`} className="text-xs text-white/50 hover:text-[#00FF87] transition-colors">
                      {range}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Investment Guides */}
            <div>
              <h3 className="text-sm font-bold text-white/90 uppercase tracking-wide mb-4">Resources</h3>
              <ul className="space-y-2">
                {['Investment Guide', 'Buyer Guide', 'Market Reports', 'ROI Calculator', 'Payment Plans'].map((guide) => (
                  <li key={guide}>
                    <Link href={`/resources/${guide.toLowerCase().replace(/\s/g, '-')}`} className="text-xs text-white/50 hover:text-[#00FF87] transition-colors">
                      {guide}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Property Types */}
            <div>
              <h3 className="text-sm font-bold text-white/90 uppercase tracking-wide mb-4">Property Types</h3>
              <ul className="space-y-2">
                {['Apartments', 'Villas', 'Townhouses', 'Penthouses', 'Commercial'].map((type) => (
                  <li key={type}>
                    <Link href={`/projects/by-type/${type.toLowerCase()}`} className="text-xs text-white/50 hover:text-[#00FF87] transition-colors">
                      {type}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================
            11) OUR OFFICES SECTION
        ======================================== */}
        <section className="py-16 border-t border-white/5">
          <h2 className="text-3xl font-black text-white mb-8">
            Our Offices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((office, index) => (
              <div key={index} className="bg-white/[0.03] border border-white/10 rounded-xl p-6 hover:border-[#00FF87]/40 transition-all">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-[#00FF87]" />
                  <h3 className="text-lg font-bold text-white">{office.name}</h3>
                </div>
                <p className="text-sm text-white/60 mb-4">{office.address}</p>
                <a
                  href={`tel:${office.phone}`}
                  className="flex items-center gap-2 text-sm font-semibold text-[#00FF87] hover:text-[#00FF87]/80 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {office.phone}
                </a>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Footer Spacer */}
      <div className="h-24"></div>
    </div>
  );
}
