'use client';

import { Linkedin, Mail, Phone, Award, Star, Building2, Users } from 'lucide-react';

// Team members data
const teamMembers = [
  {
    id: 1,
    name: 'Ahmed Zakaria',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    bio: '15+ years in Dubai real estate. Former VP at Emaar Properties.',
    specialization: 'Investment Strategy',
    deals: '500+',
    experience: '15 Years',
    linkedin: '#',
    email: 'ahmed@aigentsrealty.com',
    phone: '+971501234567',
    featured: true,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Head of Sales',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
    bio: 'Expert in luxury off-plan properties and high-net-worth clients.',
    specialization: 'Luxury Properties',
    deals: '300+',
    experience: '10 Years',
    linkedin: '#',
    email: 'sarah@aigentsrealty.com',
    phone: '+971501234568',
    featured: false,
  },
  {
    id: 3,
    name: 'Mohammed Al Rashid',
    role: 'Senior Property Consultant',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    bio: 'Specialized in Dubai Marina, JBR, and waterfront developments.',
    specialization: 'Waterfront Properties',
    deals: '250+',
    experience: '8 Years',
    linkedin: '#',
    email: 'mohammed@aigentsrealty.com',
    phone: '+971501234569',
    featured: false,
  },
  {
    id: 4,
    name: 'Elena Petrova',
    role: 'Investment Analyst',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    bio: 'Data-driven insights for maximizing ROI on off-plan investments.',
    specialization: 'ROI Analysis',
    deals: '150+',
    experience: '6 Years',
    linkedin: '#',
    email: 'elena@aigentsrealty.com',
    phone: '+971501234570',
    featured: false,
  },
];

const teamStats = [
  { icon: Users, value: '20+', label: 'Expert Agents' },
  { icon: Building2, value: '1,200+', label: 'Deals Closed' },
  { icon: Award, value: '50+', label: 'Awards Won' },
  { icon: Star, value: '4.9', label: 'Client Rating' },
];

export default function TeamSection() {
  return (
    <section className="relative py-16 lg:py-20 overflow-hidden bg-white">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-[#10B981]/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative max-w-[1800px] mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#10B981]/10 border border-[#10B981] px-4 py-2 rounded-full mb-4">
            <Users className="w-4 h-4 text-[#10B981]" />
            <span className="text-xs font-bold text-[#10B981] uppercase tracking-wider">Our Experts</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-[#0A0A0A] mb-4">
            Meet The <span className="text-[#D4AF37]">Team</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Industry veterans dedicated to finding your perfect investment opportunity in Dubai
          </p>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {teamStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-gray-200 shadow-md rounded-xl p-4 text-center hover:border-[#10B981] hover:shadow-lg transition-all group"
              >
                <div className="w-10 h-10 bg-[#10B981]/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-[#10B981]/20 transition-all">
                  <Icon className="w-5 h-5 text-[#10B981]" />
                </div>
                <div className="text-2xl lg:text-3xl font-black text-[#0A0A0A] mb-1">{stat.value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className={`group relative bg-white border rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 shadow-md hover:shadow-lg ${
                member.featured
                  ? 'border-[#D4AF37] hover:border-[#D4AF37]'
                  : 'border-gray-200 hover:border-[#10B981]'
              }`}
            >
              {/* Featured Badge */}
              {member.featured && (
                <div className="absolute top-4 right-4 z-10 bg-[#D4AF37] text-white px-3 py-1 rounded-full text-xs font-bold">
                  Lead
                </div>
              )}

              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  suppressHydrationWarning
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Quick Contact Icons - Appear on Hover */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <a
                    href={member.linkedin}
                    className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-[#0077B5] hover:text-white transition-all"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-[#10B981] hover:text-white transition-all"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                  <a
                    href={`tel:${member.phone}`}
                    className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-[#D4AF37] hover:text-white transition-all"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Name & Role */}
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-1 group-hover:text-[#10B981] transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm text-[#D4AF37] font-semibold mb-3">{member.role}</p>

                {/* Bio */}
                <p className="text-xs text-gray-600 mb-4 line-clamp-2">{member.bio}</p>

                {/* Specialization Tag */}
                <div className="inline-flex items-center gap-1.5 bg-[#10B981]/10 border border-[#10B981]/30 px-3 py-1.5 rounded-full mb-4">
                  <Award className="w-3 h-3 text-[#10B981]" />
                  <span className="text-xs font-semibold text-[#10B981]">{member.specialization}</span>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-lg font-black text-[#0A0A0A]">{member.deals}</div>
                    <div className="text-[10px] text-gray-500 uppercase">Deals</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-[#D4AF37]">{member.experience}</div>
                    <div className="text-[10px] text-gray-500 uppercase">Experience</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="/contact"
            className="inline-flex items-center gap-3 bg-[#10B981] hover:bg-[#059669] text-white px-8 py-4 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all"
          >
            <Phone className="w-5 h-5" />
            Schedule a Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
