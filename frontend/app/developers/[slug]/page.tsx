import Link from 'next/link';
import {
  Building2, MapPin, Phone, Mail, Calendar, Star, Award,
  TrendingUp, CheckCircle2, Clock, Target, Sparkles,
  ArrowRight, Bed, CreditCard, Home, ChevronRight
} from 'lucide-react';
import DeveloperPageClient from './DeveloperPageClient';

// Developer data - EXPANDED
const developersData: Record<string, any> = {
  'emaar': {
    name: 'Emaar Properties',
    slug: 'emaar',
    tagline: 'Building Communities, Creating Value',
    description: 'Emaar Properties is a global property developer and provider of premier lifestyles, with a significant presence in the Middle East, North Africa and Asia. The company is listed on the Dubai Financial Market.',
    heroImage: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920&h=800&fit=crop&q=90',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=200&fit=crop&q=90',
    verified: true,
    reraLicensed: true,
    established: 1997,
    location: 'Dubai, UAE',
    phone: '+971 4 XXX XXXX',
    email: 'info@emaar.ae',
    rating: 4.8,
    stats: {
      totalProjects: 45,
      completed: 38,
      active: 7,
      onTimeDelivery: 96,
      avgRoi: '12.4%',
      customerSatisfaction: 94
    },
    performance: {
      quality: 98,
      timeline: 96,
      innovation: 92,
      sustainability: 89
    },
    projects: [
      {
        id: 1,
        name: 'Azure Residences',
        location: 'Dubai Hills Estate',
        price: 'From AED 900K',
        roi: '12.5%',
        bedrooms: '1-3 BR',
        completion: 'Q4 2025',
        paymentPlan: '80/20',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&q=90',
        slug: 'azure-residences'
      },
      {
        id: 2,
        name: 'Sunset Boulevard',
        location: 'Dubai South',
        price: 'From AED 750K',
        roi: '14.2%',
        bedrooms: 'Studio-2 BR',
        completion: 'Q2 2026',
        paymentPlan: '60/40',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop&q=90',
        slug: 'sunset-boulevard'
      },
      {
        id: 3,
        name: 'Creek Vista Heights',
        location: 'Dubai Creek Harbour',
        price: 'From AED 1.2M',
        roi: '11.8%',
        bedrooms: '2-4 BR',
        completion: 'Q1 2027',
        paymentPlan: '70/30',
        image: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=800&h=600&fit=crop&q=90',
        slug: 'creek-vista-heights'
      },
      {
        id: 4,
        name: 'Marina Pearl',
        location: 'Dubai Marina',
        price: 'From AED 1.5M',
        roi: '13.1%',
        bedrooms: '1-3 BR',
        completion: 'Q3 2026',
        paymentPlan: '80/20',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=90',
        slug: 'marina-pearl'
      },
      {
        id: 5,
        name: 'Golf Grove Residences',
        location: 'Dubai Hills Estate',
        price: 'From AED 1.1M',
        roi: '12.9%',
        bedrooms: '2-3 BR',
        completion: 'Q4 2026',
        paymentPlan: '70/30',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&q=90',
        slug: 'golf-grove'
      },
      {
        id: 6,
        name: 'Downtown Vista',
        location: 'Downtown Dubai',
        price: 'From AED 2.2M',
        roi: '10.5%',
        bedrooms: '2-4 BR',
        completion: 'Q2 2027',
        paymentPlan: '60/40',
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop&q=90',
        slug: 'downtown-vista'
      }
    ]
  },
  'damac': {
    name: 'DAMAC Properties',
    slug: 'damac',
    tagline: 'Shaping the Middle East\'s Luxury Real Estate Market',
    description: 'DAMAC Properties is a leading luxury real estate developer in the Middle East, with a focus on creating iconic landmarks and premium residential, commercial and leisure properties.',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=800&fit=crop&q=90',
    verified: true,
    reraLicensed: true,
    established: 2002,
    location: 'Dubai, UAE',
    phone: '+971 4 XXX YYYY',
    email: 'info@damacproperties.com',
    rating: 4.6,
    stats: {
      totalProjects: 38,
      completed: 32,
      active: 6,
      onTimeDelivery: 94,
      avgRoi: '13.2%',
      customerSatisfaction: 91
    },
    performance: {
      quality: 95,
      timeline: 94,
      innovation: 96,
      sustainability: 85
    },
    projects: []
  },
  'nakheel': {
    name: 'Nakheel',
    slug: 'nakheel',
    tagline: 'Building Iconic Destinations',
    description: 'Nakheel is the master developer behind some of Dubai\'s most iconic projects, including Palm Jumeirah, The World Islands, and Deira Islands.',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&h=800&fit=crop&q=90',
    verified: true,
    reraLicensed: true,
    established: 2000,
    location: 'Dubai, UAE',
    phone: '+971 4 XXX ZZZZ',
    email: 'info@nakheel.ae',
    rating: 4.7,
    stats: {
      totalProjects: 28,
      completed: 22,
      active: 6,
      onTimeDelivery: 95,
      avgRoi: '11.9%',
      customerSatisfaction: 93
    },
    performance: {
      quality: 96,
      timeline: 95,
      innovation: 94,
      sustainability: 90
    },
    projects: []
  },
  'meraas': {
    name: 'Meraas',
    slug: 'meraas',
    tagline: 'Creating Unique Lifestyle Destinations',
    description: 'Meraas is an innovative developer creating unique lifestyle destinations that enhance Dubai\'s position as a global hub for business, tourism and entertainment.',
    heroImage: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1920&h=800&fit=crop&q=90',
    verified: true,
    reraLicensed: true,
    established: 2007,
    location: 'Dubai, UAE',
    phone: '+971 4 XXX AAAA',
    email: 'info@meraas.ae',
    rating: 4.5,
    stats: {
      totalProjects: 22,
      completed: 15,
      active: 7,
      onTimeDelivery: 93,
      avgRoi: '12.8%',
      customerSatisfaction: 90
    },
    performance: {
      quality: 94,
      timeline: 93,
      innovation: 97,
      sustainability: 88
    },
    projects: []
  },
  'sobha': {
    name: 'Sobha Realty',
    slug: 'sobha',
    tagline: 'Crafting Excellence in Real Estate',
    description: 'Sobha Realty is a premium developer known for exceptional quality construction and timely delivery. Backed by decades of experience in real estate development.',
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&h=800&fit=crop&q=90',
    verified: true,
    reraLicensed: true,
    established: 1995,
    location: 'Dubai, UAE',
    phone: '+971 4 XXX BBBB',
    email: 'info@sobharealty.ae',
    rating: 4.7,
    stats: {
      totalProjects: 19,
      completed: 14,
      active: 5,
      onTimeDelivery: 97,
      avgRoi: '13.5%',
      customerSatisfaction: 95
    },
    performance: {
      quality: 99,
      timeline: 97,
      innovation: 90,
      sustainability: 91
    },
    projects: []
  }
};

// Generate static paths for all developers
export async function generateStaticParams() {
  return Object.keys(developersData).map((slug) => ({
    slug: slug,
  }));
}

export default async function DeveloperPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const developer = developersData[slug];

  if (!developer) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Developer Not Found</h1>
          <p className="text-gray-400 mb-8">The developer "{slug}" doesn't exist in our database.</p>
          <Link href="/explore" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E8C676] to-[#D4AF37] text-black px-6 py-3 rounded-xl font-bold">
            Explore Projects
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return <DeveloperPageClient developer={developer} slug={slug} />;
}
