'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Building2, MapPin, ArrowRight, TrendingUp, Calendar,
  BarChart3, GitCompare, Map, Clock, Sparkles, X,
  ChevronLeft, ChevronRight, Heart, Star, Phone, Mail,
  User, CheckCircle2, Send, MessageSquare, Calculator,
  Image, PieChart, School, CalendarDays, LayoutGrid,
  History, DollarSign, Percent, Home, GraduationCap,
  Hospital, ShoppingBag, Train, Shield, Maximize2,
  Play, Pause, ZoomIn
} from 'lucide-react';

// ============ TYPES ============
export interface Project {
  id: number;
  name: string;
  slug: string;
  location: string;
  price_from: string;
  completion_date: string;
  payment_plan: string;
  images?: string[];
  area_slug: string;
  developer_name?: string;
  bedrooms?: string;
  roi?: string;
  amenities?: string[];
}

export interface CanvasAction {
  type: 'welcome' | 'properties' | 'comparison' | 'timeline' | 'stats' | 'developer' | 'area_info' | 'lead_capture' | 'map' | 'mortgage' | 'gallery' | 'investment' | 'neighborhood' | 'booking' | 'floorplan' | 'price_history';
  title?: string;
  subtitle?: string;
  data?: any;
  projects?: Project[];
  compareItems?: Project[];
  stats?: { label: string; value: string; change?: string }[];
  timeline?: { date: string; event: string; status: 'completed' | 'current' | 'upcoming' }[];
}

interface LeadFormData {
  name: string;
  phone: string;
  email: string;
  budget?: string;
  notes?: string;
}

interface SmartCanvasProps {
  action: CanvasAction;
  onProjectClick?: (project: Project) => void;
  onLeadSubmit?: (data: LeadFormData) => Promise<boolean>;
  onTryAskingClick?: (query: string) => void;
  isLoading?: boolean;
}

// ============ MAIN COMPONENT ============
export default function SmartCanvas({ action, onProjectClick, onLeadSubmit, onTryAskingClick, isLoading }: SmartCanvasProps) {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(false);
    const timer = setTimeout(() => setAnimateIn(true), 50);
    return () => clearTimeout(timer);
  }, [action.type]);

  if (isLoading) {
    return <CanvasLoading />;
  }

  return (
    <div className={`transition-all duration-500 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {/* Header - Only show for non-welcome and non-lead_capture views */}
      {action.type !== 'welcome' && action.type !== 'lead_capture' && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CanvasIcon type={action.type} />
            <div>
              <h3 className="text-sm font-semibold text-white">{action.title || getDefaultTitle(action.type)}</h3>
              {action.subtitle && <p className="text-xs text-gray-500">{action.subtitle}</p>}
            </div>
          </div>
          <CanvasBadge type={action.type} />
        </div>
      )}

      {/* Content - Dynamic based on type */}
      <div className="relative">
        {action.type === 'welcome' && <WelcomeView onTryAskingClick={onTryAskingClick} />}
        {action.type === 'properties' && <PropertiesView projects={action.projects || []} onProjectClick={onProjectClick} />}
        {action.type === 'comparison' && <ComparisonView items={action.compareItems || []} />}
        {action.type === 'timeline' && <TimelineView timeline={action.timeline || []} />}
        {action.type === 'stats' && <StatsView stats={action.stats || []} />}
        {action.type === 'developer' && <DeveloperView data={action.data} />}
        {action.type === 'area_info' && <AreaInfoView data={action.data} />}
        {action.type === 'lead_capture' && <LeadCaptureView data={action.data} onSubmit={onLeadSubmit} />}
        {action.type === 'map' && <MapView data={action.data} projects={action.projects} />}
        {action.type === 'mortgage' && <MortgageCalculatorView data={action.data} projects={action.projects} />}
        {action.type === 'gallery' && <GalleryView data={action.data} projects={action.projects} />}
        {action.type === 'investment' && <InvestmentAnalysisView data={action.data} projects={action.projects} />}
        {action.type === 'neighborhood' && <NeighborhoodView data={action.data} projects={action.projects} />}
        {action.type === 'booking' && <BookingView data={action.data} projects={action.projects} />}
        {action.type === 'floorplan' && <FloorPlanView data={action.data} projects={action.projects} />}
        {action.type === 'price_history' && <PriceHistoryView data={action.data} projects={action.projects} />}
      </div>
    </div>
  );
}

// ============ CANVAS VIEWS ============

// Welcome View - User-Friendly Initial State
function WelcomeView({ onTryAskingClick }: { onTryAskingClick?: (query: string) => void }) {
  const tryAsking = [
    { text: 'Open mortgage calculator', icon: Calculator },
    { text: 'What is the ROI for Dubai Marina?', icon: PieChart },
    { text: 'Show me floor plans', icon: LayoutGrid },
    { text: 'Schools and amenities nearby', icon: GraduationCap },
    { text: 'Book a viewing', icon: CalendarDays },
    { text: '2BR apartments under 2M AED', icon: Building2 },
  ];

  return (
    <div className="space-y-4">
      {/* Hero Card */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md">

        <div className="relative p-6">
          {/* Genie Icon */}
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-emerald-400 rounded-xl blur-lg opacity-30" />
              <div className="relative w-14 h-14 bg-gradient-to-br from-[#D4AF37] via-[#F4D03F] to-[#B8941E] rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0A0A0A]">Ask Genie</h3>
              <p className="text-sm text-gray-500">Your Dubai Property Expert</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 p-3 rounded-xl border border-gray-200 bg-[#F9FAFB]">
            <div className="text-center">
              <p className="text-xl font-bold text-[#10B981]">150+</p>
              <p className="text-[10px] text-gray-500 uppercase">Projects</p>
            </div>
            <div className="text-center border-x border-gray-200">
              <p className="text-xl font-bold text-[#10B981]">22</p>
              <p className="text-[10px] text-gray-500 uppercase">Areas</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-[#D4AF37]">8-12%</p>
              <p className="text-[10px] text-gray-500 uppercase">Avg ROI</p>
            </div>
          </div>
        </div>
      </div>

      {/* Try Asking Section */}
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-1">Try asking</p>
        <div className="space-y-2">
          {tryAsking.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onTryAskingClick?.(item.text)}
              className="group flex items-center gap-3 p-3 border border-gray-200 rounded-xl bg-white
                hover:border-[#10B981] hover:bg-[#10B981]/5 transition-all cursor-pointer shadow-sm hover:shadow-md"
            >
              <div className="w-8 h-8 bg-[#10B981]/10 rounded-lg flex items-center justify-center
                group-hover:bg-[#10B981]/20 transition-colors">
                <item.icon className="w-4 h-4 text-[#10B981]" />
              </div>
              <span className="text-sm text-gray-700 group-hover:text-[#0A0A0A] transition-colors">
                {item.text}
              </span>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto opacity-0 group-hover:opacity-100
                transform translate-x-0 group-hover:translate-x-1 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Properties View - Grid of property cards
function PropertiesView({ projects, onProjectClick }: { projects: Project[]; onProjectClick?: (p: Project) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (projects.length === 0) {
    return (
      <div className="bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] rounded-2xl p-8 text-center">
        <Building2 className="w-12 h-12 text-gray-600 mx-auto mb-3" />
        <p className="text-gray-400">No properties match your criteria</p>
        <p className="text-sm text-gray-500 mt-1">Try adjusting your search</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Properties Grid */}
      <div className="grid grid-cols-2 gap-4">
        {projects.slice(0, 4).map((project, idx) => (
          <PropertyCard key={project.id} project={project} index={idx} onClick={() => onProjectClick?.(project)} />
        ))}
      </div>

      {/* Quick Stats Bar */}
      <div className="flex items-center justify-between bg-[#0A0A0A]/80 border border-[#1F1F1F] rounded-xl px-4 py-3">
        <div className="text-center">
          <p className="text-lg font-bold text-[#10B981]">{projects.length}</p>
          <p className="text-xs text-gray-500">Matches</p>
        </div>
        <div className="h-8 w-px bg-[#1F1F1F]" />
        <div className="text-center">
          <p className="text-lg font-bold text-[#D4AF37]">8-12%</p>
          <p className="text-xs text-gray-500">Avg ROI</p>
        </div>
        <div className="h-8 w-px bg-[#1F1F1F]" />
        <div className="text-center">
          <p className="text-lg font-bold text-white">2025-27</p>
          <p className="text-xs text-gray-500">Handover</p>
        </div>
      </div>
    </div>
  );
}

// Property Card Component
function PropertyCard({ project, index, onClick }: { project: Project; index: number; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`group relative bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] rounded-2xl overflow-hidden cursor-pointer
        hover:border-[#10B981]/40 transition-all duration-500 hover:-translate-y-1
        hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_30px_rgba(16,185,129,0.1)]
        ${index % 2 === 1 ? 'mt-4' : ''}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="relative h-32 overflow-hidden">
        {project.images?.[0] ? (
          <img
            src={project.images[0]}
            alt={project.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] flex items-center justify-center">
            <Building2 className="w-10 h-10 text-gray-700" />
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-2 left-2">
          <span className="px-2 py-1 bg-[#10B981] text-white text-[10px] font-bold rounded-full">
            OFF PLAN
          </span>
        </div>
        <div className="absolute top-2 right-2">
          <span className="px-2 py-1 bg-black/60 backdrop-blur text-[#D4AF37] text-xs font-bold rounded-lg border border-[#D4AF37]/30">
            {project.price_from}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <h4 className="font-bold text-white text-sm mb-1 group-hover:text-[#10B981] transition-colors line-clamp-1">
          {project.name}
        </h4>
        <div className="flex items-center gap-1 text-gray-400 text-xs mb-2">
          <MapPin className="w-3 h-3 text-[#10B981]" />
          <span className="truncate">{project.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-[#1A1A1A] text-gray-300 text-[10px] rounded border border-[#2A2A2A]">
            {project.payment_plan}
          </span>
          <span className="px-2 py-0.5 bg-[#1A1A1A] text-gray-300 text-[10px] rounded border border-[#2A2A2A]">
            {project.completion_date || '2026'}
          </span>
        </div>
      </div>

      {/* Hover Arrow */}
      <div className="absolute bottom-3 right-3 w-6 h-6 bg-[#10B981] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">
        <ArrowRight className="w-3 h-3 text-white" />
      </div>
    </div>
  );
}

// Comparison View - Side by side comparison
function ComparisonView({ items }: { items: Project[] }) {
  if (items.length < 2) {
    return (
      <div className="bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] rounded-2xl p-8 text-center">
        <GitCompare className="w-12 h-12 text-gray-600 mx-auto mb-3" />
        <p className="text-gray-400">Select two properties to compare</p>
      </div>
    );
  }

  const comparisonFields = [
    { key: 'price_from', label: 'Starting Price' },
    { key: 'location', label: 'Location' },
    { key: 'payment_plan', label: 'Payment Plan' },
    { key: 'completion_date', label: 'Handover' },
    { key: 'developer_name', label: 'Developer' },
  ];

  return (
    <div className="space-y-4">
      {/* Header Cards */}
      <div className="grid grid-cols-2 gap-4">
        {items.slice(0, 2).map((item, idx) => (
          <div key={item.id} className="bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] rounded-xl p-3 text-center">
            <div className="w-10 h-10 bg-gradient-to-br from-[#10B981]/20 to-transparent rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-[#10B981] font-bold">{idx === 0 ? 'A' : 'B'}</span>
            </div>
            <p className="text-sm font-bold text-white line-clamp-1">{item.name}</p>
            <p className="text-xs text-gray-500">{item.location}</p>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] rounded-xl overflow-hidden">
        {comparisonFields.map((field, idx) => (
          <div
            key={field.key}
            className={`grid grid-cols-3 ${idx !== comparisonFields.length - 1 ? 'border-b border-[#1F1F1F]' : ''}`}
          >
            <div className="p-3 bg-[#0A0A0A]/50 text-xs text-gray-400">{field.label}</div>
            <div className="p-3 text-xs text-white text-center border-l border-[#1F1F1F]">
              {(items[0] as any)[field.key] || '-'}
            </div>
            <div className="p-3 text-xs text-white text-center border-l border-[#1F1F1F]">
              {(items[1] as any)[field.key] || '-'}
            </div>
          </div>
        ))}
      </div>

      {/* Winner Badge */}
      <div className="bg-gradient-to-r from-[#10B981]/10 to-[#D4AF37]/10 border border-[#10B981]/30 rounded-xl p-3 text-center">
        <p className="text-xs text-gray-400">Based on ROI potential</p>
        <p className="text-sm font-bold text-[#10B981]">
          <Star className="w-4 h-4 inline mr-1" />
          {items[0].name} is recommended
        </p>
      </div>
    </div>
  );
}

// Timeline View - Payment/Construction timeline
function TimelineView({ timeline }: { timeline: { date: string; event: string; status: 'completed' | 'current' | 'upcoming' }[] }) {
  const defaultTimeline = [
    { date: 'Booking', event: '10% Down Payment', status: 'completed' as const },
    { date: 'Month 3', event: '10% - DLD Registration', status: 'completed' as const },
    { date: 'Month 12', event: '20% Construction', status: 'current' as const },
    { date: 'Month 24', event: '20% Completion', status: 'upcoming' as const },
    { date: 'Handover', event: '40% Final Payment', status: 'upcoming' as const },
  ];

  const items = timeline.length > 0 ? timeline : defaultTimeline;

  return (
    <div className="bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] rounded-2xl p-4">
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#10B981] via-[#10B981]/50 to-[#1F1F1F]" />

        {/* Timeline Items */}
        <div className="space-y-4">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-start gap-4 relative">
              {/* Dot */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                item.status === 'completed' ? 'bg-[#10B981]' :
                item.status === 'current' ? 'bg-[#D4AF37] animate-pulse' :
                'bg-[#1F1F1F] border border-[#2A2A2A]'
              }`}>
                {item.status === 'completed' ? (
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : item.status === 'current' ? (
                  <Clock className="w-4 h-4 text-black" />
                ) : (
                  <div className="w-2 h-2 bg-gray-600 rounded-full" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-2">
                <p className={`text-xs font-medium ${
                  item.status === 'completed' ? 'text-[#10B981]' :
                  item.status === 'current' ? 'text-[#D4AF37]' :
                  'text-gray-500'
                }`}>
                  {item.date}
                </p>
                <p className={`text-sm ${item.status === 'upcoming' ? 'text-gray-400' : 'text-white'}`}>
                  {item.event}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Stats View - ROI and market stats
function StatsView({ stats }: { stats: { label: string; value: string; change?: string }[] }) {
  const defaultStats = [
    { label: 'Avg Price/sqft', value: 'AED 1,850', change: '+12%' },
    { label: 'Rental Yield', value: '7.2%', change: '+0.5%' },
    { label: 'Capital Growth', value: '15%', change: '+3%' },
    { label: 'Time to Sell', value: '45 days', change: '-10 days' },
  ];

  const items = stats.length > 0 ? stats : defaultStats;

  return (
    <div className="space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {items.map((stat, idx) => (
          <div key={idx} className="bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
            <p className="text-xl font-bold text-white">{stat.value}</p>
            {stat.change && (
              <p className={`text-xs mt-1 ${stat.change.startsWith('+') ? 'text-[#10B981]' : 'text-red-400'}`}>
                <TrendingUp className="w-3 h-3 inline mr-1" />
                {stat.change} vs last year
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Mini Chart Placeholder */}
      <div className="bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] rounded-xl p-4">
        <p className="text-xs text-gray-500 mb-3">Price Trend (2024)</p>
        <div className="flex items-end justify-between h-20 gap-1">
          {[40, 55, 45, 60, 75, 70, 85, 80, 90, 95, 88, 100].map((height, idx) => (
            <div
              key={idx}
              className="flex-1 bg-gradient-to-t from-[#10B981] to-[#10B981]/50 rounded-t transition-all hover:from-[#D4AF37] hover:to-[#D4AF37]/50"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-gray-600">
          <span>Jan</span>
          <span>Jun</span>
          <span>Dec</span>
        </div>
      </div>
    </div>
  );
}

// Developer View
function DeveloperView({ data }: { data?: any }) {
  const developer = data || {
    name: 'Emaar Properties',
    logo: null,
    projects_delivered: 85,
    ongoing_projects: 23,
    rating: 4.8,
    established: 1997,
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] rounded-2xl p-4 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-2xl flex items-center justify-center mx-auto mb-3">
          <Building2 className="w-8 h-8 text-[#D4AF37]" />
        </div>
        <h4 className="text-lg font-bold text-white">{developer.name}</h4>
        <p className="text-sm text-gray-500">Est. {developer.established}</p>
        <div className="flex items-center justify-center gap-1 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${star <= Math.floor(developer.rating) ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-gray-600'}`}
            />
          ))}
          <span className="text-sm text-white ml-1">{developer.rating}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-[#10B981]">{developer.projects_delivered}</p>
          <p className="text-xs text-gray-500">Delivered</p>
        </div>
        <div className="bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-[#D4AF37]">{developer.ongoing_projects}</p>
          <p className="text-xs text-gray-500">Ongoing</p>
        </div>
      </div>
    </div>
  );
}

// Area Info View - Enhanced with map and detailed info
function AreaInfoView({ data }: { data?: any }) {
  // Area-specific data with real Dubai information
  const areaData: Record<string, any> = {
    jvc: {
      name: 'Jumeirah Village Circle (JVC)',
      slug: 'jumeirah-village-circle',
      description: 'Family-friendly community with affordable luxury apartments, villas, and townhouses. Known for excellent ROI and growing infrastructure.',
      avg_price: 'AED 750K',
      price_sqft: 'AED 850',
      roi: '8.2%',
      lifestyle: 'Family Living',
      established: '2005',
      coordinates: { lat: 25.0657, lng: 55.2094 },
      highlights: ['High ROI', 'Affordable', 'Family-friendly', 'Growing Area'],
      amenities: ['Circle Mall', 'JSS School', 'Parks', 'Community Centers', 'Gyms', 'Retail'],
      nearby: ['Dubai Marina (15 min)', 'Mall of Emirates (12 min)', 'Al Maktoum Airport (20 min)'],
      propertyTypes: ['Studios', '1-3 BR Apartments', 'Townhouses', 'Villas'],
    },
    marina: {
      name: 'Dubai Marina',
      slug: 'dubai-marina',
      description: 'Premium waterfront living with stunning views of the marina and Arabian Gulf. Home to luxury towers and vibrant nightlife.',
      avg_price: 'AED 1.8M',
      price_sqft: 'AED 1,850',
      roi: '6.5%',
      lifestyle: 'Urban Luxury',
      established: '2003',
      coordinates: { lat: 25.0805, lng: 55.1403 },
      highlights: ['Waterfront', 'Premium', 'Nightlife', 'Walk Score 95'],
      amenities: ['Marina Mall', 'JBR Beach', 'Marina Walk', 'Yacht Club', 'Metro Station'],
      nearby: ['Palm Jumeirah (5 min)', 'JBR (Walking)', 'Media City (10 min)'],
      propertyTypes: ['1-4 BR Apartments', 'Penthouses', 'Duplexes'],
    },
    downtown: {
      name: 'Downtown Dubai',
      slug: 'downtown-dubai',
      description: 'The heart of Dubai featuring Burj Khalifa, Dubai Mall, and iconic Opera. Premium investment destination.',
      avg_price: 'AED 2.5M',
      price_sqft: 'AED 2,200',
      roi: '5.8%',
      lifestyle: 'Iconic Living',
      established: '2006',
      coordinates: { lat: 25.1972, lng: 55.2744 },
      highlights: ['Burj Khalifa Views', 'Premium Location', 'High Appreciation', 'Tourist Hub'],
      amenities: ['Dubai Mall', 'Dubai Opera', 'Souk Al Bahar', 'Metro Station', 'Dubai Fountain'],
      nearby: ['DIFC (5 min)', 'Business Bay (Adjacent)', 'City Walk (10 min)'],
      propertyTypes: ['1-4 BR Apartments', 'Penthouses', 'Hotel Apartments'],
    },
    'business bay': {
      name: 'Business Bay',
      slug: 'business-bay',
      description: 'Dubai\'s central business district with a mix of commercial and residential towers along the Dubai Canal.',
      avg_price: 'AED 1.2M',
      price_sqft: 'AED 1,400',
      roi: '7.0%',
      lifestyle: 'Urban Professional',
      established: '2008',
      coordinates: { lat: 25.1850, lng: 55.2620 },
      highlights: ['Canal Views', 'Business Hub', 'Growing Value', 'Central Location'],
      amenities: ['Bay Avenue Mall', 'Dubai Canal', 'Metro Station', 'Restaurants'],
      nearby: ['Downtown (5 min)', 'DIFC (8 min)', 'Dubai Mall (10 min)'],
      propertyTypes: ['Studios', '1-3 BR Apartments', 'Offices', 'Penthouses'],
    },
    hills: {
      name: 'Dubai Hills Estate',
      slug: 'dubai-hills-estate',
      description: 'Master-planned community by Emaar with championship golf course, parks, and premium amenities.',
      avg_price: 'AED 2.2M',
      price_sqft: 'AED 1,600',
      roi: '6.0%',
      lifestyle: 'Premium Suburban',
      established: '2016',
      coordinates: { lat: 25.1048, lng: 55.2469 },
      highlights: ['Golf Course', 'Family-friendly', 'Green Spaces', 'Premium Schools'],
      amenities: ['Dubai Hills Mall', 'Golf Club', 'Parks', 'King\'s College Hospital', 'Schools'],
      nearby: ['Downtown (15 min)', 'Business Bay (12 min)', 'Al Khail Road'],
      propertyTypes: ['Apartments', 'Townhouses', 'Villas', 'Mansions'],
    },
    creek: {
      name: 'Dubai Creek Harbour',
      slug: 'dubai-creek-harbour',
      description: 'Waterfront mega-development by Emaar featuring Dubai Creek Tower and Island District.',
      avg_price: 'AED 1.5M',
      price_sqft: 'AED 1,500',
      roi: '7.5%',
      lifestyle: 'Waterfront Modern',
      established: '2017',
      coordinates: { lat: 25.2048, lng: 55.3469 },
      highlights: ['Creek Views', 'Future Growth', 'Emaar Development', 'Nature Reserve'],
      amenities: ['Creek Marina', 'Retail District', 'Parks', 'Ras Al Khor Wildlife'],
      nearby: ['Festival City (5 min)', 'Downtown (15 min)', 'Airport (10 min)'],
      propertyTypes: ['1-4 BR Apartments', 'Penthouses', 'Waterfront Villas'],
    },
    palm: {
      name: 'Palm Jumeirah',
      slug: 'palm-jumeirah',
      description: 'World-famous man-made island offering ultra-luxury beachfront living and exclusive lifestyle.',
      avg_price: 'AED 4.5M',
      price_sqft: 'AED 3,200',
      roi: '5.0%',
      lifestyle: 'Ultra Luxury',
      established: '2006',
      coordinates: { lat: 25.1124, lng: 55.1390 },
      highlights: ['Private Beach', 'Exclusive', 'Iconic Address', 'Resort Living'],
      amenities: ['Nakheel Mall', 'Atlantis', 'Beach Clubs', 'The Pointe', 'Five Star Hotels'],
      nearby: ['Marina (5 min)', 'JBR (8 min)', 'Internet City (15 min)'],
      propertyTypes: ['Apartments', 'Penthouses', 'Signature Villas', 'Townhouses'],
    },
    jbr: {
      name: 'Jumeirah Beach Residence',
      slug: 'jumeirah-beach-residence',
      description: 'Beachfront community with 40 towers, The Walk promenade, and direct beach access.',
      avg_price: 'AED 2.0M',
      price_sqft: 'AED 1,700',
      roi: '6.8%',
      lifestyle: 'Beach Living',
      established: '2007',
      coordinates: { lat: 25.0773, lng: 55.1331 },
      highlights: ['Beach Access', 'The Walk', 'Tourist Area', 'High Rental Demand'],
      amenities: ['The Walk', 'JBR Beach', 'Bluewaters', 'Restaurants', 'Retail'],
      nearby: ['Marina (Walking)', 'Palm (5 min)', 'Media City (10 min)'],
      propertyTypes: ['1-4 BR Apartments', 'Penthouses', 'Duplexes'],
    },
  };

  // Get the area name from the title and find matching data
  const areaKey = data?.title?.toLowerCase() || 'jvc';
  const area = areaData[areaKey] || areaData.jvc;

  // Use slug from data (backend) or fallback to area data
  const areaSlug = data?.slug || area.slug;

  return (
    <div className="space-y-4">
      {/* Map Section */}
      <div className="bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] rounded-2xl overflow-hidden">
        <div className="relative h-40">
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15000!2d${area.coordinates.lng}!3d${area.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae`}
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent pointer-events-none" />
          {/* Location badge */}
          <div className="absolute top-3 left-3 px-3 py-1.5 bg-black/70 backdrop-blur rounded-lg border border-[#10B981]/30">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm font-medium text-white">{area.name}</span>
            </div>
          </div>
        </div>

        {/* Area Info */}
        <div className="p-4">
          <p className="text-sm text-gray-400 mb-4">{area.description}</p>

          {/* Key Stats */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-[#0A0A0A] rounded-lg p-2 text-center">
              <p className="text-sm font-bold text-[#D4AF37]">{area.avg_price}</p>
              <p className="text-[9px] text-gray-500">Avg Price</p>
            </div>
            <div className="bg-[#0A0A0A] rounded-lg p-2 text-center">
              <p className="text-sm font-bold text-[#10B981]">{area.roi}</p>
              <p className="text-[9px] text-gray-500">ROI</p>
            </div>
            <div className="bg-[#0A0A0A] rounded-lg p-2 text-center">
              <p className="text-sm font-bold text-white">{area.price_sqft}</p>
              <p className="text-[9px] text-gray-500">Per Sqft</p>
            </div>
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap gap-2 mb-4">
            {area.highlights.map((highlight: string, idx: number) => (
              <span key={idx} className="px-2 py-1 bg-[#10B981]/10 border border-[#10B981]/30 rounded-full text-[10px] text-[#10B981]">
                {highlight}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Amenities & Nearby */}
      <div className="grid grid-cols-2 gap-3">
        {/* Amenities */}
        <div className="bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] rounded-xl p-3">
          <p className="text-xs font-semibold text-white mb-2 flex items-center gap-1">
            <Building2 className="w-3 h-3 text-[#10B981]" />
            Key Amenities
          </p>
          <div className="space-y-1">
            {area.amenities.slice(0, 4).map((amenity: string, idx: number) => (
              <p key={idx} className="text-[10px] text-gray-400 flex items-center gap-1">
                <span className="w-1 h-1 bg-[#10B981] rounded-full" />
                {amenity}
              </p>
            ))}
          </div>
        </div>

        {/* Nearby */}
        <div className="bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] rounded-xl p-3">
          <p className="text-xs font-semibold text-white mb-2 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#D4AF37]" />
            Nearby
          </p>
          <div className="space-y-1">
            {area.nearby.slice(0, 4).map((place: string, idx: number) => (
              <p key={idx} className="text-[10px] text-gray-400 flex items-center gap-1">
                <span className="w-1 h-1 bg-[#D4AF37] rounded-full" />
                {place}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Property Types Available */}
      <div className="bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] rounded-xl p-3">
        <p className="text-xs font-semibold text-white mb-2">Property Types in {area.name.split(' ')[0]}</p>
        <div className="flex flex-wrap gap-2">
          {area.propertyTypes.map((type: string, idx: number) => (
            <span key={idx} className="px-2 py-1 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-[10px] text-gray-300">
              {type}
            </span>
          ))}
        </div>
      </div>

      {/* Investment Insight */}
      <div className="bg-gradient-to-r from-[#10B981]/10 to-[#D4AF37]/10 border border-[#10B981]/30 rounded-xl p-3">
        <p className="text-xs font-semibold text-white mb-1">Investment Insight</p>
        <p className="text-[11px] text-gray-400">
          {areaKey === 'jvc'
            ? 'JVC offers the highest rental yields in Dubai (8%+) with affordable entry points. Ideal for first-time investors seeking strong cash flow.'
            : areaKey === 'marina'
            ? 'Dubai Marina remains a top choice for expats with consistent rental demand. Premium locations command higher prices but offer stable returns.'
            : areaKey === 'downtown'
            ? 'Downtown properties benefit from strong capital appreciation. Best for long-term investors seeking iconic addresses.'
            : `${area.name} offers a balanced mix of lifestyle and investment potential with ${area.roi} average ROI.`
          }
        </p>
      </div>

      {/* View Area Details Button */}
      <Link
        href={`/areas/${areaSlug}`}
        className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[#10B981] to-[#0D9668] hover:from-[#0D9668] hover:to-[#0B8459] rounded-xl text-white font-semibold text-sm transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
      >
        <Map className="w-4 h-4" />
        View Area Details & Projects
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

// ============ NEW POWERFUL CANVAS VIEWS ============

// 1. Mortgage Calculator View - Interactive monthly payment calculator
function MortgageCalculatorView({ data, projects }: { data?: any; projects?: Project[] }) {
  const [propertyPrice, setPropertyPrice] = useState(2000000);
  const [downPayment, setDownPayment] = useState(20);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(25);

  // Get price from project if available
  const project = projects?.[0];
  useEffect(() => {
    if (project?.price_from) {
      const priceMatch = project.price_from.match(/[\d,]+/);
      if (priceMatch) {
        const price = parseInt(priceMatch[0].replace(/,/g, ''));
        if (price > 0) setPropertyPrice(price);
      }
    }
  }, [project]);

  // Calculate mortgage
  const loanAmount = propertyPrice * (1 - downPayment / 100);
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - loanAmount;

  const formatCurrency = (num: number) => `AED ${Math.round(num).toLocaleString()}`;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-transparent border border-emerald-900/30 p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Mortgage Calculator</h3>
            <p className="text-sm text-gray-400">Calculate your monthly payments</p>
          </div>
        </div>
      </div>

      {/* Calculator Inputs */}
      <div className="bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] rounded-2xl p-4 space-y-4">
        {/* Property Price */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-xs text-gray-400">Property Price</label>
            <span className="text-xs font-bold text-[#D4AF37]">{formatCurrency(propertyPrice)}</span>
          </div>
          <input
            type="range"
            min="500000"
            max="20000000"
            step="100000"
            value={propertyPrice}
            onChange={(e) => setPropertyPrice(Number(e.target.value))}
            className="w-full h-2 bg-[#1F1F1F] rounded-lg appearance-none cursor-pointer accent-[#10B981]"
          />
        </div>

        {/* Down Payment */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-xs text-gray-400">Down Payment</label>
            <span className="text-xs font-bold text-[#10B981]">{downPayment}% ({formatCurrency(propertyPrice * downPayment / 100)})</span>
          </div>
          <input
            type="range"
            min="10"
            max="50"
            step="5"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="w-full h-2 bg-[#1F1F1F] rounded-lg appearance-none cursor-pointer accent-[#10B981]"
          />
        </div>

        {/* Interest Rate */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-xs text-gray-400">Interest Rate (Annual)</label>
            <span className="text-xs font-bold text-white">{interestRate}%</span>
          </div>
          <input
            type="range"
            min="2"
            max="8"
            step="0.25"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full h-2 bg-[#1F1F1F] rounded-lg appearance-none cursor-pointer accent-[#10B981]"
          />
        </div>

        {/* Loan Term */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-xs text-gray-400">Loan Term</label>
            <span className="text-xs font-bold text-white">{loanTerm} years</span>
          </div>
          <div className="flex gap-2">
            {[15, 20, 25, 30].map((term) => (
              <button
                key={term}
                onClick={() => setLoanTerm(term)}
                className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${
                  loanTerm === term
                    ? 'bg-[#10B981] text-white'
                    : 'bg-[#1A1A1A] text-gray-400 hover:bg-[#252525]'
                }`}
              >
                {term}Y
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#10B981]/30 rounded-2xl p-4">
        <div className="text-center mb-4">
          <p className="text-xs text-gray-400 mb-1">Monthly Payment</p>
          <p className="text-3xl font-bold text-[#10B981]">{formatCurrency(monthlyPayment)}</p>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-black/30 rounded-lg p-2">
            <p className="text-xs text-gray-500">Loan Amount</p>
            <p className="text-sm font-bold text-white">{formatCurrency(loanAmount)}</p>
          </div>
          <div className="bg-black/30 rounded-lg p-2">
            <p className="text-xs text-gray-500">Total Interest</p>
            <p className="text-sm font-bold text-[#D4AF37]">{formatCurrency(totalInterest)}</p>
          </div>
          <div className="bg-black/30 rounded-lg p-2">
            <p className="text-xs text-gray-500">Total Payment</p>
            <p className="text-sm font-bold text-white">{formatCurrency(totalPayment)}</p>
          </div>
        </div>
      </div>

      {/* Bank Info */}
      <div className="bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] rounded-xl p-3">
        <p className="text-xs text-gray-400 mb-2">Popular UAE Banks for Mortgages:</p>
        <div className="flex flex-wrap gap-2">
          {['Emirates NBD', 'ADCB', 'Mashreq', 'FAB', 'DIB'].map((bank) => (
            <span key={bank} className="px-2 py-1 bg-[#1A1A1A] text-xs text-gray-300 rounded">
              {bank}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// 2. Gallery View - Property images and virtual tour
function GalleryView({ data, projects }: { data?: any; projects?: Project[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const project = projects?.[0];
  const images = project?.images || data?.images || [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
  ];

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F]">
        <div className="relative h-64">
          <img
            src={images[currentIndex]}
            alt={`Property ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
          {/* Overlay controls */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Navigation arrows */}
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Fullscreen button */}
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute top-3 right-3 w-10 h-10 bg-black/50 backdrop-blur rounded-lg flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <Maximize2 className="w-5 h-5" />
          </button>

          {/* Image counter */}
          <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/50 backdrop-blur rounded-full text-xs text-white">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Project info */}
          {project && (
            <div className="absolute bottom-3 right-3 px-3 py-2 bg-black/70 backdrop-blur rounded-lg">
              <p className="text-sm font-bold text-white">{project.name}</p>
              <p className="text-xs text-gray-300">{project.location}</p>
            </div>
          )}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((img: string, idx: number) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
              idx === currentIndex ? 'border-[#10B981]' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Virtual Tour Button */}
      <button className="w-full py-3 bg-gradient-to-r from-[#10B981] to-[#059669] rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all">
        <Play className="w-4 h-4" />
        Start Virtual Tour
      </button>

      {/* Gallery Stats */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] rounded-lg p-2 text-center">
          <Image className="w-4 h-4 text-[#10B981] mx-auto mb-1" />
          <p className="text-xs text-white font-bold">{images.length}</p>
          <p className="text-[9px] text-gray-500">Photos</p>
        </div>
        <div className="bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] rounded-lg p-2 text-center">
          <Play className="w-4 h-4 text-[#D4AF37] mx-auto mb-1" />
          <p className="text-xs text-white font-bold">360°</p>
          <p className="text-[9px] text-gray-500">Tour</p>
        </div>
        <div className="bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] rounded-lg p-2 text-center">
          <LayoutGrid className="w-4 h-4 text-[#10B981] mx-auto mb-1" />
          <p className="text-xs text-white font-bold">3</p>
          <p className="text-[9px] text-gray-500">Floor Plans</p>
        </div>
      </div>
    </div>
  );
}

// 3. Investment Analysis View - ROI calculator with projections
function InvestmentAnalysisView({ data, projects }: { data?: any; projects?: Project[] }) {
  const [investmentType, setInvestmentType] = useState<'rental' | 'capital'>('rental');
  const [holdingPeriod, setHoldingPeriod] = useState(5);

  const project = projects?.[0];
  const propertyPrice = 2000000; // Default or from project
  const rentalYield = 7.5; // Average Dubai yield
  const annualAppreciation = 8; // Average appreciation

  // Calculations
  const annualRentalIncome = propertyPrice * (rentalYield / 100);
  const monthlyRental = annualRentalIncome / 12;
  const totalRentalIncome = annualRentalIncome * holdingPeriod;
  const futureValue = propertyPrice * Math.pow(1 + annualAppreciation / 100, holdingPeriod);
  const capitalGain = futureValue - propertyPrice;
  const totalROI = ((totalRentalIncome + capitalGain) / propertyPrice) * 100;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-transparent border border-emerald-900/30 p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941E] rounded-xl flex items-center justify-center">
            <PieChart className="w-6 h-6 text-black" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Investment Analysis</h3>
            <p className="text-sm text-gray-400">ROI & Projections for Dubai Off-Plan</p>
          </div>
        </div>
      </div>

      {/* Investment Type Toggle */}
      <div className="flex gap-2 p-1 bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] rounded-xl">
        <button
          onClick={() => setInvestmentType('rental')}
          className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1 ${
            investmentType === 'rental' ? 'bg-[#10B981] text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Home className="w-3 h-3" />
          Rental Income
        </button>
        <button
          onClick={() => setInvestmentType('capital')}
          className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1 ${
            investmentType === 'capital' ? 'bg-[#D4AF37] text-black' : 'text-gray-400 hover:text-white'
          }`}
        >
          <TrendingUp className="w-3 h-3" />
          Capital Growth
        </button>
      </div>

      {/* Holding Period */}
      <div className="bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] rounded-xl p-3">
        <div className="flex justify-between mb-2">
          <span className="text-xs text-gray-400">Holding Period</span>
          <span className="text-xs font-bold text-white">{holdingPeriod} Years</span>
        </div>
        <div className="flex gap-2">
          {[3, 5, 7, 10].map((year) => (
            <button
              key={year}
              onClick={() => setHoldingPeriod(year)}
              className={`flex-1 py-2 text-xs rounded-lg transition-all ${
                holdingPeriod === year ? 'bg-[#10B981] text-white' : 'bg-[#1A1A1A] text-gray-400'
              }`}
            >
              {year}Y
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <Percent className="w-4 h-4 text-[#10B981]" />
            <span className="text-xs text-gray-400">Rental Yield</span>
          </div>
          <p className="text-2xl font-bold text-[#10B981]">{rentalYield}%</p>
          <p className="text-[10px] text-gray-500">Annual gross yield</p>
        </div>
        <div className="bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs text-gray-400">Appreciation</span>
          </div>
          <p className="text-2xl font-bold text-[#D4AF37]">{annualAppreciation}%</p>
          <p className="text-[10px] text-gray-500">Annual growth rate</p>
        </div>
      </div>

      {/* Projections */}
      <div className="bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#10B981]/30 rounded-xl p-4">
        <h4 className="text-sm font-semibold text-white mb-3">{holdingPeriod}-Year Projection</h4>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">Monthly Rental Income</span>
            <span className="text-sm font-bold text-[#10B981]">AED {Math.round(monthlyRental).toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">Total Rental ({holdingPeriod}Y)</span>
            <span className="text-sm font-bold text-white">AED {Math.round(totalRentalIncome).toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">Capital Appreciation</span>
            <span className="text-sm font-bold text-[#D4AF37]">AED {Math.round(capitalGain).toLocaleString()}</span>
          </div>
          <div className="h-px bg-white/10 my-2" />
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-white">Total ROI</span>
            <span className="text-lg font-bold text-[#10B981]">{totalROI.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      {/* Risk Disclaimer */}
      <p className="text-[10px] text-gray-500 text-center">
        *Projections based on historical Dubai market data. Past performance does not guarantee future results.
      </p>
    </div>
  );
}

// 4. Neighborhood View - Schools, hospitals, amenities
function NeighborhoodView({ data, projects }: { data?: any; projects?: Project[] }) {
  const [activeCategory, setActiveCategory] = useState<'schools' | 'health' | 'shopping' | 'transport'>('schools');

  const project = projects?.[0];
  const areaName = project?.location || data?.area || 'Dubai';

  const categories = {
    schools: [
      { name: 'GEMS Wellington Academy', distance: '1.2 km', rating: 4.8 },
      { name: 'Dubai British School', distance: '2.5 km', rating: 4.6 },
      { name: 'Kings School', distance: '3.1 km', rating: 4.7 },
    ],
    health: [
      { name: 'Mediclinic City Hospital', distance: '2.0 km', rating: 4.9 },
      { name: 'Saudi German Hospital', distance: '3.5 km', rating: 4.5 },
      { name: 'Aster Clinic', distance: '0.8 km', rating: 4.4 },
    ],
    shopping: [
      { name: 'Dubai Mall', distance: '5.2 km', rating: 4.9 },
      { name: 'Mall of the Emirates', distance: '8.1 km', rating: 4.8 },
      { name: 'Circle Mall', distance: '1.5 km', rating: 4.3 },
    ],
    transport: [
      { name: 'Metro Station', distance: '0.5 km', rating: 4.7 },
      { name: 'Bus Station', distance: '0.3 km', rating: 4.2 },
      { name: 'Dubai Airport', distance: '15 km', rating: 4.9 },
    ],
  };

  const categoryIcons = {
    schools: GraduationCap,
    health: Hospital,
    shopping: ShoppingBag,
    transport: Train,
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-transparent border border-emerald-900/30 p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Neighborhood Insights</h3>
            <p className="text-sm text-gray-400">{areaName} - What's Nearby</p>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-4 gap-2">
        {(Object.keys(categories) as Array<keyof typeof categories>).map((cat) => {
          const Icon = categoryIcons[cat];
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`p-2 rounded-xl flex flex-col items-center gap-1 transition-all ${
                activeCategory === cat
                  ? 'bg-[#10B981] text-white'
                  : 'bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] capitalize">{cat}</span>
            </button>
          );
        })}
      </div>

      {/* Listings */}
      <div className="space-y-2">
        {categories[activeCategory].map((place, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] rounded-xl p-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#10B981]/10 rounded-lg flex items-center justify-center">
                {activeCategory === 'schools' && <GraduationCap className="w-5 h-5 text-[#10B981]" />}
                {activeCategory === 'health' && <Hospital className="w-5 h-5 text-red-400" />}
                {activeCategory === 'shopping' && <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />}
                {activeCategory === 'transport' && <Train className="w-5 h-5 text-blue-400" />}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{place.name}</p>
                <p className="text-xs text-gray-500">{place.distance}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
              <span className="text-xs text-white">{place.rating}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Safety Score */}
      <div className="bg-gradient-to-r from-[#10B981]/10 to-[#10B981]/5 border border-[#10B981]/30 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#10B981]" />
            <span className="text-sm font-medium text-white">Safety Score</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 bg-[#1F1F1F] rounded-full overflow-hidden">
              <div className="w-[92%] h-full bg-[#10B981] rounded-full" />
            </div>
            <span className="text-sm font-bold text-[#10B981]">92%</span>
          </div>
        </div>
        <p className="text-[10px] text-gray-500 mt-2">One of the safest neighborhoods in Dubai</p>
      </div>
    </div>
  );
}

// 5. Booking View - Schedule property viewings
function BookingView({ data, projects }: { data?: any; projects?: Project[] }) {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const project = projects?.[0];

  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.getDate(),
      full: date.toISOString().split('T')[0],
    };
  });

  const timeSlots = ['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM'];

  const handleSubmit = () => {
    if (selectedDate && selectedTime && (name || phone)) {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="space-y-4">
        <div className="relative overflow-hidden rounded-2xl bg-transparent border border-emerald-900/30 p-8 text-center">
          <div className="w-16 h-16 bg-[#10B981] rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Viewing Scheduled!</h3>
          <p className="text-gray-400 text-sm">
            {selectedDate} at {selectedTime}
          </p>
          <p className="text-[10px] text-gray-500 mt-4">
            Our agent will contact you to confirm the viewing details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-transparent border border-emerald-900/30 p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941E] rounded-xl flex items-center justify-center">
            <CalendarDays className="w-6 h-6 text-black" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Schedule Viewing</h3>
            <p className="text-sm text-gray-400">{project?.name || 'Property Tour'}</p>
          </div>
        </div>
      </div>

      {/* Date Selection */}
      <div>
        <p className="text-xs text-gray-400 mb-2">Select Date</p>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {dates.map((d) => (
            <button
              key={d.full}
              onClick={() => setSelectedDate(d.full)}
              className={`flex-shrink-0 w-14 py-3 rounded-xl text-center transition-all ${
                selectedDate === d.full
                  ? 'bg-[#10B981] text-white'
                  : 'bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] text-gray-400 hover:border-[#10B981]/50'
              }`}
            >
              <p className="text-[10px]">{d.day}</p>
              <p className="text-lg font-bold">{d.date}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      <div>
        <p className="text-xs text-gray-400 mb-2">Select Time</p>
        <div className="grid grid-cols-3 gap-2">
          {timeSlots.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                selectedTime === time
                  ? 'bg-[#10B981] text-white'
                  : 'bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] text-gray-400 hover:border-[#10B981]/50'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] rounded-xl text-white text-sm placeholder:text-gray-500 focus:border-[#10B981]/50 focus:outline-none"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-3 bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] rounded-xl text-white text-sm placeholder:text-gray-500 focus:border-[#10B981]/50 focus:outline-none"
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!selectedDate || !selectedTime}
        className="w-full py-3 bg-gradient-to-r from-[#10B981] to-[#059669] rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <CalendarDays className="w-4 h-4" />
        Book Property Viewing
      </button>
    </div>
  );
}

// 6. Floor Plan View - Interactive floor plans
function FloorPlanView({ data, projects }: { data?: any; projects?: Project[] }) {
  const [selectedUnit, setSelectedUnit] = useState(0);

  const project = projects?.[0];

  const unitTypes = [
    { type: 'Studio', size: '450 sqft', price: 'AED 750K', available: 12, image: null },
    { type: '1 Bedroom', size: '750 sqft', price: 'AED 1.2M', available: 8, image: null },
    { type: '2 Bedroom', size: '1,100 sqft', price: 'AED 1.8M', available: 5, image: null },
    { type: '3 Bedroom', size: '1,600 sqft', price: 'AED 2.5M', available: 3, image: null },
  ];

  const selectedPlan = unitTypes[selectedUnit];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-transparent border border-emerald-900/30 p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center">
            <LayoutGrid className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Floor Plans</h3>
            <p className="text-sm text-gray-400">{project?.name || 'Available Units'}</p>
          </div>
        </div>
      </div>

      {/* Unit Type Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {unitTypes.map((unit, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedUnit(idx)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              selectedUnit === idx
                ? 'bg-[#10B981] text-white'
                : 'bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] text-gray-400 hover:border-[#10B981]/50'
            }`}
          >
            {unit.type}
          </button>
        ))}
      </div>

      {/* Floor Plan Display */}
      <div className="bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] rounded-2xl overflow-hidden">
        {/* Plan Visualization */}
        <div className="h-48 bg-[#0A0A0A] flex items-center justify-center relative">
          {/* Simplified floor plan visualization */}
          <div className="relative w-40 h-32 border-2 border-[#10B981]/50 rounded-lg">
            <div className="absolute top-2 left-2 w-16 h-12 border border-[#10B981]/30 rounded text-[8px] text-[#10B981] flex items-center justify-center">
              Living
            </div>
            <div className="absolute top-2 right-2 w-10 h-12 border border-[#10B981]/30 rounded text-[8px] text-[#10B981] flex items-center justify-center">
              Kitchen
            </div>
            <div className="absolute bottom-2 left-2 w-12 h-10 border border-[#D4AF37]/30 rounded text-[8px] text-[#D4AF37] flex items-center justify-center">
              Bedroom
            </div>
            <div className="absolute bottom-2 right-2 w-8 h-10 border border-gray-600 rounded text-[8px] text-gray-500 flex items-center justify-center">
              Bath
            </div>
          </div>
          {/* Zoom button */}
          <button className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur rounded-lg flex items-center justify-center text-white">
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        {/* Unit Details */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-lg font-bold text-white">{selectedPlan.type}</h4>
              <p className="text-sm text-gray-400">{selectedPlan.size}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-[#D4AF37]">{selectedPlan.price}</p>
              <p className="text-xs text-[#10B981]">{selectedPlan.available} units available</p>
            </div>
          </div>

          {/* Room breakdown */}
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-[#0A0A0A] rounded-lg p-2 text-center">
              <p className="text-xs text-white font-bold">{selectedUnit === 0 ? '1' : selectedUnit}</p>
              <p className="text-[9px] text-gray-500">Beds</p>
            </div>
            <div className="bg-[#0A0A0A] rounded-lg p-2 text-center">
              <p className="text-xs text-white font-bold">{selectedUnit === 0 ? '1' : selectedUnit}</p>
              <p className="text-[9px] text-gray-500">Baths</p>
            </div>
            <div className="bg-[#0A0A0A] rounded-lg p-2 text-center">
              <p className="text-xs text-white font-bold">{selectedUnit === 3 ? '2' : '1'}</p>
              <p className="text-[9px] text-gray-500">Parking</p>
            </div>
            <div className="bg-[#0A0A0A] rounded-lg p-2 text-center">
              <p className="text-xs text-white font-bold">{selectedUnit >= 2 ? 'Yes' : 'No'}</p>
              <p className="text-[9px] text-gray-500">Balcony</p>
            </div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <button className="w-full py-3 bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] rounded-xl text-white font-medium text-sm flex items-center justify-center gap-2 hover:border-[#10B981]/50 transition-all">
        <ArrowRight className="w-4 h-4" />
        Download Floor Plan PDF
      </button>
    </div>
  );
}

// 7. Price History View - Historical price trends
function PriceHistoryView({ data, projects }: { data?: any; projects?: Project[] }) {
  const project = projects?.[0];
  const areaName = project?.location || data?.area || 'Dubai';

  // Simulated price history data
  const priceHistory = [
    { year: '2020', price: 1200, change: null },
    { year: '2021', price: 1350, change: '+12.5%' },
    { year: '2022', price: 1580, change: '+17.0%' },
    { year: '2023', price: 1720, change: '+8.9%' },
    { year: '2024', price: 1850, change: '+7.6%' },
  ];

  const maxPrice = Math.max(...priceHistory.map((p) => p.price));

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-transparent border border-emerald-900/30 p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941E] rounded-xl flex items-center justify-center">
            <History className="w-6 h-6 text-black" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Price History</h3>
            <p className="text-sm text-gray-400">{areaName} - 5 Year Trend</p>
          </div>
        </div>
      </div>

      {/* Price Chart */}
      <div className="bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] rounded-2xl p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs text-gray-400">Price per sqft (AED)</span>
          <span className="text-xs font-bold text-[#10B981]">+54.2% since 2020</span>
        </div>

        {/* Bar Chart */}
        <div className="flex items-end justify-between h-32 gap-2 mb-4">
          {priceHistory.map((item, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`w-full rounded-t transition-all ${
                  idx === priceHistory.length - 1 ? 'bg-[#10B981]' : 'bg-[#10B981]/50'
                }`}
                style={{ height: `${(item.price / maxPrice) * 100}%` }}
              />
              <span className="text-[10px] text-gray-500">{item.year}</span>
            </div>
          ))}
        </div>

        {/* Price Breakdown */}
        <div className="space-y-2">
          {priceHistory.slice().reverse().map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-2 border-b border-[#1F1F1F] last:border-0"
            >
              <span className="text-xs text-gray-400">{item.year}</span>
              <span className="text-sm font-bold text-white">AED {item.price}/sqft</span>
              {item.change && (
                <span className={`text-xs font-medium ${item.change.startsWith('+') ? 'text-[#10B981]' : 'text-red-400'}`}>
                  {item.change}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Market Comparison */}
      <div className="bg-gradient-to-r from-[#10B981]/10 to-[#D4AF37]/5 border border-[#10B981]/30 rounded-xl p-4">
        <h4 className="text-sm font-semibold text-white mb-3">Area Comparison</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Downtown Dubai</span>
            <span className="text-xs font-bold text-white">AED 2,200/sqft</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Dubai Marina</span>
            <span className="text-xs font-bold text-white">AED 1,850/sqft</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">JVC</span>
            <span className="text-xs font-bold text-white">AED 850/sqft</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Business Bay</span>
            <span className="text-xs font-bold text-white">AED 1,400/sqft</span>
          </div>
        </div>
      </div>

      {/* Forecast */}
      <div className="bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] rounded-xl p-3">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-[#10B981]" />
          <span className="text-xs font-medium text-white">2025 Forecast</span>
        </div>
        <p className="text-sm text-gray-400">
          Analysts predict <span className="text-[#10B981] font-bold">+6-10%</span> growth in {areaName} property prices based on current market trends and upcoming Expo 2025 effects.
        </p>
      </div>
    </div>
  );
}

// Map View - Show property/area location on a map
function MapView({ data, projects }: { data?: any; projects?: Project[] }) {
  // Map coordinates for different areas
  const areaCoordinates: Record<string, { lat: number; lng: number }> = {
    'dubai-marina': { lat: 25.0805, lng: 55.1403 },
    'downtown-dubai': { lat: 25.1972, lng: 55.2744 },
    'dubai-hills-estate': { lat: 25.1048, lng: 55.2469 },
    'dubai-creek-harbour': { lat: 25.2048, lng: 55.3469 },
    'jumeirah-village-circle': { lat: 25.0657, lng: 55.2094 },
    'palm-jumeirah': { lat: 25.1124, lng: 55.1390 },
    'business-bay': { lat: 25.1850, lng: 55.2620 },
    'jumeirah-beach-residence': { lat: 25.0773, lng: 55.1331 },
    'emaar-beachfront': { lat: 25.0750, lng: 55.1320 },
    'sobha-hartland': { lat: 25.1920, lng: 55.3150 },
    'damac-hills': { lat: 25.0350, lng: 55.2400 },
    'damac-lagoons': { lat: 25.0100, lng: 55.2200 },
    'al-furjan': { lat: 25.0250, lng: 55.1350 },
    'arabian-ranches': { lat: 25.0580, lng: 55.2680 },
    'meydan': { lat: 25.1650, lng: 55.3050 },
    'city-walk': { lat: 25.2100, lng: 55.2650 },
    'bluewaters': { lat: 25.0830, lng: 55.1250 },
    'tilal-al-ghaf': { lat: 25.0050, lng: 55.2100 },
    'town-square': { lat: 25.0150, lng: 55.2650 },
  };

  // Get coordinates - try project area first, then data, then default to Business Bay
  const projectArea = projects?.[0]?.area_slug;
  const dataArea = data?.area_slug || data?.slug;
  const areaSlug = projectArea || dataArea || 'business-bay';
  const coords = areaCoordinates[areaSlug] || { lat: 25.1850, lng: 55.2620 };

  // Get the first project if available
  const project = projects?.[0];
  const locationName = project?.name || data?.name || data?.title || 'Dubai';
  const locationArea = project?.location || data?.area || areaSlug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());

  return (
    <div className="space-y-4">
      {/* Map Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F]">
        {/* Interactive Map */}
        <div className="relative h-64">
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d8000!2d${coords.lng}!3d${coords.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae`}
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent pointer-events-none" />

          {/* Location Badge */}
          <div className="absolute top-3 left-3 px-3 py-2 bg-black/80 backdrop-blur-sm rounded-xl border border-[#10B981]/30">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#10B981] rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white line-clamp-1">{locationName}</p>
                <p className="text-xs text-gray-400">{locationArea}</p>
              </div>
            </div>
          </div>

          {/* Zoom Controls - Decorative */}
          <div className="absolute top-3 right-3 flex flex-col gap-1">
            <button className="w-8 h-8 bg-black/60 backdrop-blur rounded-lg text-white text-lg font-bold hover:bg-black/80 transition-colors">+</button>
            <button className="w-8 h-8 bg-black/60 backdrop-blur rounded-lg text-white text-lg font-bold hover:bg-black/80 transition-colors">−</button>
          </div>
        </div>

        {/* Location Info */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-bold text-white">{locationName}</h3>
              <p className="text-sm text-gray-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#10B981]" />
                {locationArea}, Dubai, UAE
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-[#10B981]/20 to-[#D4AF37]/10 rounded-xl flex items-center justify-center">
              <Map className="w-6 h-6 text-[#10B981]" />
            </div>
          </div>

          {/* Quick Info */}
          {project && (
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="bg-[#0A0A0A] rounded-lg p-2 text-center">
                <p className="text-xs font-bold text-[#D4AF37]">{project.price_from}</p>
                <p className="text-[9px] text-gray-500">Starting</p>
              </div>
              <div className="bg-[#0A0A0A] rounded-lg p-2 text-center">
                <p className="text-xs font-bold text-[#10B981]">{project.payment_plan || '60/40'}</p>
                <p className="text-[9px] text-gray-500">Payment</p>
              </div>
              <div className="bg-[#0A0A0A] rounded-lg p-2 text-center">
                <p className="text-xs font-bold text-white">{project.completion_date || '2026'}</p>
                <p className="text-[9px] text-gray-500">Handover</p>
              </div>
            </div>
          )}

          {/* Nearby Landmarks */}
          <div className="bg-[#0A0A0A] rounded-xl p-3 border border-[#1F1F1F]">
            <p className="text-xs font-semibold text-white mb-2 flex items-center gap-1">
              <Building2 className="w-3 h-3 text-[#10B981]" />
              Nearby Landmarks
            </p>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Dubai Metro Station</span>
                <span className="text-[#10B981]">~5 min</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Shopping Mall</span>
                <span className="text-[#10B981]">~3 min</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Dubai International Airport</span>
                <span className="text-[#10B981]">~15 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Open in Maps Button */}
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[#10B981] to-[#0D9668] hover:from-[#0D9668] hover:to-[#0B8459] rounded-xl text-white font-semibold text-sm transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
      >
        <Map className="w-4 h-4" />
        Open in Google Maps
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
}

// Lead Capture View - Form for capturing user contact info
function LeadCaptureView({ data, onSubmit }: { data?: any; onSubmit?: (data: LeadFormData) => Promise<boolean> }) {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    phone: '',
    email: '',
    budget: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.phone && !formData.email) {
      setError('Please provide a phone number or email');
      return;
    }

    setIsSubmitting(true);
    try {
      if (onSubmit) {
        const success = await onSubmit(formData);
        if (success) {
          setIsSubmitted(true);
        } else {
          setError('Something went wrong. Please try again.');
        }
      } else {
        // Direct API call if no onSubmit handler
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/leads`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          setIsSubmitted(true);
        } else {
          setError('Something went wrong. Please try again.');
        }
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (isSubmitted) {
    return (
      <div className="space-y-4">
        <div className="relative overflow-hidden rounded-2xl bg-transparent border border-emerald-900/30 p-8 text-center">
          {/* Success glow */}
          <div className="absolute inset-0 bg-emerald-500/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl" />

          <div className="relative">
            {/* Success icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
            <p className="text-gray-400 text-sm mb-4">
              Your details have been saved successfully.
            </p>

            <div className="bg-black/30 rounded-xl p-4 border border-white/5">
              <p className="text-emerald-400 font-medium text-sm">What happens next?</p>
              <p className="text-gray-400 text-xs mt-2">
                One of our property specialists will contact you within 24 hours to discuss your requirements and schedule viewings.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Form state
  return (
    <div className="space-y-4">
      {/* Header Card */}
      <div className="relative overflow-hidden rounded-2xl bg-transparent border border-emerald-900/30">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(16,185,129,0.15) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }} />

        {/* Glow effects */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="relative p-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-emerald-400 rounded-xl blur-lg opacity-50" />
              <div className="relative w-14 h-14 bg-gradient-to-br from-[#D4AF37] via-[#F4D03F] to-[#B8941E] rounded-xl flex items-center justify-center shadow-lg">
                <MessageSquare className="w-7 h-7 text-black" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Get Expert Advice</h3>
              <p className="text-sm text-gray-400">We'll help you find the perfect property</p>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-3 gap-3 p-3 bg-black/30 rounded-xl border border-white/5">
            <div className="text-center">
              <p className="text-sm font-bold text-emerald-400">24h</p>
              <p className="text-[10px] text-gray-500">Response</p>
            </div>
            <div className="text-center border-x border-white/5">
              <p className="text-sm font-bold text-emerald-400">Free</p>
              <p className="text-[10px] text-gray-500">Consultation</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-amber-400">Expert</p>
              <p className="text-[10px] text-gray-500">Guidance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Name */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="w-4 h-4 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full pl-10 pr-4 py-3 bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] rounded-xl text-white text-sm
              placeholder:text-gray-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30
              transition-all"
          />
        </div>

        {/* Phone */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone className="w-4 h-4 text-gray-500" />
          </div>
          <input
            type="tel"
            placeholder="Phone Number (e.g., 050-123-4567)"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full pl-10 pr-4 py-3 bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] rounded-xl text-white text-sm
              placeholder:text-gray-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30
              transition-all"
          />
        </div>

        {/* Email */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="w-4 h-4 text-gray-500" />
          </div>
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full pl-10 pr-4 py-3 bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] rounded-xl text-white text-sm
              placeholder:text-gray-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30
              transition-all"
          />
        </div>

        {/* Budget (optional) */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 text-xs font-medium">AED</span>
          </div>
          <input
            type="text"
            placeholder="Budget Range (optional)"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full pl-12 pr-4 py-3 bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] rounded-xl text-white text-sm
              placeholder:text-gray-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30
              transition-all"
          />
        </div>

        {/* Notes (optional) */}
        <textarea
          placeholder="Any specific requirements? (optional)"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={2}
          className="w-full px-4 py-3 bg-gradient-to-br from-[#10B981]/10 to-[#D4AF37]/5 border border-[#1F1F1F] rounded-xl text-white text-sm
            placeholder:text-gray-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30
            transition-all resize-none"
        />

        {/* Error message */}
        {error && (
          <p className="text-red-400 text-xs text-center">{error}</p>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-gradient-to-r from-[#10B981] to-[#0D9668] hover:from-[#0D9668] hover:to-[#0B8459]
            rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2
            transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Get Free Consultation
            </>
          )}
        </button>

        {/* Privacy note */}
        <p className="text-[10px] text-gray-500 text-center">
          Your information is secure and will only be used to contact you about properties.
        </p>
      </form>
    </div>
  );
}

// ============ HELPER COMPONENTS ============

function CanvasLoading() {
  return (
    <div className="flex items-center justify-center h-[400px]">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-[#10B981] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-500 text-sm">Loading canvas...</p>
      </div>
    </div>
  );
}

function CanvasIcon({ type }: { type: string }) {
  const icons: Record<string, any> = {
    welcome: Sparkles,
    properties: Building2,
    comparison: GitCompare,
    timeline: Clock,
    stats: BarChart3,
    developer: Star,
    area_info: Map,
    lead_capture: MessageSquare,
    map: MapPin,
    mortgage: Calculator,
    gallery: Image,
    investment: PieChart,
    neighborhood: School,
    booking: CalendarDays,
    floorplan: LayoutGrid,
    price_history: History,
  };
  const Icon = icons[type] || Sparkles;
  return (
    <div className="w-8 h-8 bg-[#10B981]/10 rounded-lg flex items-center justify-center">
      <Icon className="w-4 h-4 text-[#10B981]" />
    </div>
  );
}

function CanvasBadge({ type }: { type: string }) {
  const labels: Record<string, string> = {
    welcome: 'Getting Started',
    properties: 'Live Preview',
    comparison: 'Compare',
    timeline: 'Payment Plan',
    stats: 'Market Data',
    developer: 'Developer',
    area_info: 'Area Guide',
    lead_capture: 'Get in Touch',
    map: 'Location Map',
    mortgage: 'Calculator',
    gallery: 'Gallery',
    investment: 'Investment',
    neighborhood: 'Neighborhood',
    booking: 'Schedule',
    floorplan: 'Floor Plans',
    price_history: 'Price Trends',
  };
  return (
    <span className="px-2 py-1 bg-[#10B981]/10 border border-[#10B981]/30 rounded-full text-[10px] font-medium text-[#10B981]">
      {labels[type] || type}
    </span>
  );
}

function getDefaultTitle(type: string): string {
  const titles: Record<string, string> = {
    welcome: 'Welcome to Smart Canvas',
    properties: 'Matching Properties',
    comparison: 'Side-by-Side Comparison',
    timeline: 'Payment Timeline',
    stats: 'Market Statistics',
    developer: 'Developer Profile',
    area_info: 'Area Overview',
    lead_capture: 'Get Expert Advice',
    map: 'Property Location',
    mortgage: 'Mortgage Calculator',
    gallery: 'Property Gallery',
    investment: 'Investment Analysis',
    neighborhood: 'Neighborhood Guide',
    booking: 'Schedule a Viewing',
    floorplan: 'Floor Plans',
    price_history: 'Price History',
  };
  return titles[type] || 'Smart Canvas';
}
