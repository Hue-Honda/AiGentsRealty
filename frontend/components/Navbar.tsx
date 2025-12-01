'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Building2, ChevronDown, Menu, X, BookOpen, BarChart3, MapPin, Phone, Sparkles, Newspaper } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const navigation = [
    {
      name: 'Properties',
      icon: <Building2 className="w-4 h-4" />,
      href: '/projects',
      dropdown: [
        { section: 'Residential', items: [
          { name: 'All Projects', href: '/projects' },
          { name: 'By Price Range', href: '/projects/by-price' },
          { name: 'By Location', href: '/projects/by-location' },
          { name: 'New Launches', href: '/projects/new-launches' },
          { name: 'Best ROI', href: '/projects/best-roi' },
        ]},
        { section: 'Commercial', items: [
          { name: 'Office Spaces', href: '/commercial/office-spaces' },
          { name: 'Retail Units', href: '/commercial/retail' },
          { name: 'Warehouses', href: '/commercial/warehouses' },
          { name: 'High Yield', href: '/commercial/high-yield' },
        ]},
        { section: 'Developers', items: [
          { name: 'Emaar Properties', href: '/developers/emaar' },
          { name: 'DAMAC Properties', href: '/developers/damac' },
          { name: 'Nakheel', href: '/developers/nakheel' },
          { name: 'All Developers', href: '/developers' },
        ]}
      ]
    },
    {
      name: 'Areas',
      icon: <MapPin className="w-4 h-4" />,
      href: '/areas',
      dropdown: [
        { section: 'Popular Areas', items: [
          { name: 'Dubai Marina', href: '/areas/dubai-marina' },
          { name: 'Downtown Dubai', href: '/areas/downtown-dubai' },
          { name: 'Business Bay', href: '/areas/business-bay' },
          { name: 'Palm Jumeirah', href: '/areas/palm-jumeirah' },
          { name: 'Dubai Creek Harbour', href: '/areas/dubai-creek-harbour' },
        ]},
        { section: 'Emerging Areas', items: [
          { name: 'Dubai South', href: '/areas/dubai-south' },
          { name: 'Jumeirah Village Circle', href: '/areas/jvc' },
          { name: 'Mohammed Bin Rashid City', href: '/areas/mbr-city' },
          { name: 'All Areas', href: '/areas' },
        ]}
      ]
    },
    {
      name: 'Invest',
      icon: <BookOpen className="w-4 h-4" />,
      href: '/investment',
      dropdown: [
        { section: 'Guides', items: [
          { name: 'Off-Plan 101', href: '/investment/offplan-101' },
          { name: 'Why Dubai Off-Plan?', href: '/investment/why-dubai' },
          { name: 'First-Time Buyer Guide', href: '/investment/first-time' },
        ]},
        { section: 'Tools', items: [
          { name: 'ROI Calculator', href: '/investment/roi-calculator' },
          { name: 'Payment Plan Simulator', href: '/investment/payment-simulator' },
          { name: 'Budget Calculator', href: '/investment/budget-calculator' },
        ]},
        { section: 'Strategies', items: [
          { name: 'Flip Strategy', href: '/investment/flip-strategy' },
          { name: 'Rental Income', href: '/investment/rental-strategy' },
          { name: 'Long-Term Growth', href: '/investment/appreciation' },
        ]}
      ]
    },
    {
      name: 'Insights',
      icon: <BarChart3 className="w-4 h-4" />,
      href: '/insights',
      dropdown: [
        { section: 'Market Intelligence', items: [
          { name: 'Market News', href: '/insights/news' },
          { name: 'Monthly Reports', href: '/insights/reports' },
          { name: 'Price Trends', href: '/insights/price-trends' },
          { name: 'Developer Updates', href: '/insights/developers' },
        ]},
        { section: 'Blog', items: [
          { name: 'All Articles', href: '/blogs' },
          { name: 'Investment Guides', href: '/blogs?category=investment-guides' },
          { name: 'Area Guides', href: '/blogs?category=area-guides' },
          { name: 'Tips & Tricks', href: '/blogs?category=tips-tricks' },
        ]}
      ]
    }
  ];

  return (
    <>
      {/* Luxury Black Glass Navbar with Gold Top Line */}
      <nav className="sticky top-0 z-50 bg-gradient-to-b from-[#0A0A0A]/95 to-[#0A0A0A]/90 backdrop-blur-2xl border-t border-[#D4AF37] shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
          <div className="flex items-center justify-between h-20">
            {/* Logo with Emerald AI Pulse Orb */}
            <Link href="/" className="flex items-center gap-3 group relative">
              {/* Gold Monoline Icon */}
              <div className="relative">
                {/* Emerald AI Pulse Orb */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#10B981] rounded-full animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.8)] z-10"></div>
                <div className="w-12 h-12 border-2 border-[#D4AF37] rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all bg-[#0A0A0A]/50 backdrop-blur-xl">
                  <Building2 className="w-6 h-6 text-[#D4AF37]" />
                </div>
              </div>
              {/* Premium Gold Typography */}
              <span className="font-black text-2xl tracking-tight bg-gradient-to-r from-[#D4AF37] via-[#F4E5B8] to-[#D4AF37] bg-clip-text text-transparent">
                AiGentsRealty
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className="group flex items-center gap-2 px-4 py-2.5 text-gray-300 hover:text-[#D4AF37] font-semibold text-sm transition-all rounded-lg relative whitespace-nowrap"
                  >
                    {item.icon}
                    <span className="relative">
                      {item.name}
                      {/* Thin Gold Hover Underline */}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-[#D4AF37] to-transparent group-hover:w-full transition-all duration-300"></span>
                    </span>
                    {item.dropdown && <ChevronDown className="w-3.5 h-3.5" />}
                  </Link>

                  {/* Dropdown Menu - Black Glass with Gold Accents */}
                  {item.dropdown && activeDropdown === item.name && (
                    <div
                      className="absolute top-full left-0 mt-2 w-72 bg-[#0A0A0A]/95 backdrop-blur-2xl rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] border border-[#D4AF37]/30 py-3 animate-in fade-in slide-in-from-top-2 duration-200"
                      onMouseEnter={() => handleMouseEnter(item.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {item.dropdown.map((section, idx) => (
                        <div key={idx} className={idx > 0 ? 'border-t border-[#D4AF37]/10 mt-3 pt-3' : ''}>
                          <div className="px-5 py-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                            {section.section}
                          </div>
                          {section.items.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-5 py-2.5 text-sm text-gray-300 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all relative group"
                            >
                              <span className="relative">
                                {subItem.name}
                                <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-[#D4AF37] group-hover:w-full transition-all duration-200"></span>
                              </span>
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Ask Genie Button - Emerald with Gold Sparkle */}
              <Link
                href="/genie"
                className="group flex items-center gap-2 bg-gradient-to-r from-[#10B981] to-[#059669] text-white px-5 py-2.5 rounded-xl font-semibold hover:-translate-y-0.5 transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)]"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Ask Genie</span>
              </Link>
              {/* Contact Button - Gold Border with Emerald Hover */}
              <Link
                href="/contact"
                className="group flex items-center gap-2 bg-[#0A0A0A]/80 backdrop-blur-xl border border-[#D4AF37] text-[#D4AF37] px-5 py-2.5 rounded-xl font-semibold hover:-translate-y-0.5 transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:border-[#10B981] hover:text-[#10B981]"
              >
                <Phone className="w-4 h-4" />
                <span>Contact</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-lg transition-colors border border-[#D4AF37]/30"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-[#D4AF37]/20 bg-[#0A0A0A]">
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-[#D4AF37] rounded-lg font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </div>
              ))}
              <div className="pt-4 border-t border-[#D4AF37]/20 space-y-3">
                <Link
                  href="/genie"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#10B981] to-[#059669] text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#10B981]/30 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  Ask Genie
                </Link>
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#B8941E] text-black px-4 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Phone className="w-4 h-4" />
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
