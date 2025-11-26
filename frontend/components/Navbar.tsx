'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Building2, ChevronDown, Menu, X, Sparkles, BookOpen, BarChart3, MapPin, Phone, Search } from 'lucide-react';

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
      name: 'Explore',
      icon: <Search className="w-4 h-4" />,
      href: '/explore'
    },
    {
      name: 'Projects',
      icon: <Building2 className="w-4 h-4" />,
      href: '/projects',
      dropdown: [
        { section: 'Browse By', items: [
          { name: 'By Price Range', href: '/projects/by-price' },
          { name: 'By Location', href: '/projects/by-location' },
          { name: 'By Developer', href: '/projects/by-developer' },
          { name: 'By Property Type', href: '/projects/by-type' },
          { name: 'By Completion Date', href: '/projects/by-completion' },
          { name: 'By Payment Plan', href: '/projects/by-payment-plan' },
          { name: 'By Lifestyle', href: '/projects/by-lifestyle' },
        ]},
        { section: 'Featured', items: [
          { name: "Editor's Picks", href: '/projects/editors-picks' },
          { name: 'Best ROI', href: '/projects/best-roi' },
          { name: 'Trending Now', href: '/projects/trending' },
          { name: 'Just Launched', href: '/projects/new-launches' },
        ]}
      ]
    },
    {
      name: 'Commercial',
      icon: <Building2 className="w-4 h-4" />,
      href: '/commercial',
      dropdown: [
        { section: 'Property Types', items: [
          { name: 'Office Spaces', href: '/commercial/office-spaces' },
          { name: 'Retail Units', href: '/commercial/retail' },
          { name: 'Showrooms', href: '/commercial/showrooms' },
          { name: 'Warehouses', href: '/commercial/warehouses' },
          { name: 'Mixed-Use Developments', href: '/commercial/mixed-use' },
        ]},
        { section: 'Investment Opportunities', items: [
          { name: 'High Yield Commercial', href: '/commercial/high-yield' },
          { name: 'Business Bay Projects', href: '/commercial/business-bay' },
          { name: 'DIFC Properties', href: '/commercial/difc' },
          { name: 'Free Zone Investments', href: '/commercial/free-zones' },
        ]},
        { section: 'Resources', items: [
          { name: 'Commercial ROI Calculator', href: '/commercial/roi-calculator' },
          { name: 'Rental Yield Analysis', href: '/commercial/rental-yield' },
          { name: 'Market Trends', href: '/commercial/market-trends' },
        ]}
      ]
    },
    {
      name: 'Developers',
      icon: <Building2 className="w-4 h-4" />,
      href: '/developers',
      dropdown: [
        { section: 'Top Developers', items: [
          { name: 'Emaar Properties', href: '/developers/emaar' },
          { name: 'DAMAC Properties', href: '/developers/damac' },
          { name: 'Nakheel', href: '/developers/nakheel' },
          { name: 'View All Developers', href: '/developers' },
        ]},
        { section: 'Rankings', items: [
          { name: 'By Track Record', href: '/developers/rankings/track-record' },
          { name: 'By On-Time Delivery', href: '/developers/rankings/on-time' },
          { name: 'By Customer Satisfaction', href: '/developers/rankings/satisfaction' },
        ]}
      ]
    },
    {
      name: 'Invest',
      icon: <BookOpen className="w-4 h-4" />,
      href: '/investment',
      dropdown: [
        { section: 'Getting Started', items: [
          { name: 'Off-Plan 101', href: '/investment/offplan-101' },
          { name: 'Why Dubai Off-Plan?', href: '/investment/why-dubai' },
          { name: 'First-Time Buyer Guide', href: '/investment/first-time' },
        ]},
        { section: 'Tools & Calculators', items: [
          { name: 'ROI Calculator', href: '/investment/roi-calculator' },
          { name: 'Payment Plan Simulator', href: '/investment/payment-simulator' },
          { name: 'Budget Calculator', href: '/investment/budget-calculator' },
        ]},
        { section: 'Strategies', items: [
          { name: 'Flip Strategy', href: '/investment/flip-strategy' },
          { name: 'Rental Income Strategy', href: '/investment/rental-strategy' },
          { name: 'Long-Term Appreciation', href: '/investment/appreciation' },
        ]}
      ]
    },
    {
      name: 'Communities',
      icon: <MapPin className="w-4 h-4" />,
      href: '/communities'
    },
    {
      name: 'Insights',
      icon: <BarChart3 className="w-4 h-4" />,
      href: '/insights',
      dropdown: [
        { section: 'Latest', items: [
          { name: 'Market News', href: '/insights/news' },
          { name: 'Monthly Reports', href: '/insights/reports' },
          { name: 'Investment Insights', href: '/insights/investment' },
          { name: 'Developer Updates', href: '/insights/developers' },
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

            {/* Desktop Navigation - Asymmetric Spacing */}
            <div className="hidden lg:flex items-center gap-3">
              {navigation.map((item, index) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                  style={{ marginLeft: index === 0 ? '0' : index % 2 === 0 ? '1.5rem' : '0.75rem' }}
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
            <div className="hidden lg:flex items-center gap-4">
              {/* Contact Button - Gold Text with Emerald Hover */}
              <button className="group flex items-center gap-2 text-[#D4AF37] hover:text-[#10B981] font-semibold px-4 py-2.5 rounded-lg transition-all relative">
                <Phone className="w-4 h-4" />
                <span className="relative">
                  Contact
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#10B981] group-hover:w-full transition-all duration-300"></span>
                </span>
              </button>

              {/* AI Search Button - Black Glass + Gold Border + Emerald Glow + Levitation */}
              <button className="group relative flex items-center gap-2 bg-[#0A0A0A]/80 backdrop-blur-xl border border-[#D4AF37] text-[#D4AF37] px-6 py-3 rounded-xl font-bold hover:-translate-y-0.5 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:border-[#10B981]">
                <div className="absolute inset-0 bg-gradient-to-r from-[#10B981]/0 via-[#10B981]/10 to-[#10B981]/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                <Sparkles className="w-5 h-5 relative z-10 group-hover:text-[#10B981] transition-colors" />
                <span className="relative z-10 group-hover:text-[#10B981] transition-colors">AI Search</span>
              </button>
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
              <div className="pt-4 space-y-2 border-t border-[#D4AF37]/20">
                <button className="w-full flex items-center justify-center gap-2 text-gray-300 px-4 py-3 rounded-lg border-2 border-[#D4AF37]/30 hover:border-[#10B981] hover:text-[#10B981] font-medium transition-colors">
                  <Phone className="w-4 h-4" />
                  Contact Us
                </button>
                <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#B8941E] text-black px-4 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all">
                  <Sparkles className="w-4 h-4" />
                  AI Search
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
