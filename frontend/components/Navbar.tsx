'use client';

import { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import { Building2, ChevronDown, ChevronRight, Menu, X, BookOpen, BarChart3, MapPin, Phone, Sparkles, Newspaper, Home, Briefcase, Users, TrendingUp, Calculator, FileText, ArrowRight } from 'lucide-react';
import { useNavData } from '@/contexts/NavDataContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const submenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Get dynamic areas and developers from context
  const { areas, developers, loading } = useNavData();

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(name);
    setActiveSubmenu(null);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setActiveSubmenu(null);
    }, 400);
  };

  const handleSubmenuEnter = (name: string) => {
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveSubmenu(name);
  };

  const handleSubmenuLeave = () => {
    submenuTimeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, 400);
  };

  // Build dynamic areas submenu from API data
  const dynamicAreasSubmenu = useMemo(() => {
    const areaItems = areas.map(area => ({
      name: area.name,
      href: `/areas/${area.slug}`,
      highlight: false
    }));
    // Always add "All Areas" at the end
    areaItems.push({ name: 'All Areas', href: '/areas', highlight: true });
    return areaItems;
  }, [areas]);

  // Build dynamic developers submenu from API data
  const dynamicDevelopersSubmenu = useMemo(() => {
    const devItems = developers.map(dev => ({
      name: dev.name,
      href: `/developers/${dev.slug}`,
      highlight: false
    }));
    // Always add "All Developers" at the end
    devItems.push({ name: 'All Developers', href: '/developers', highlight: true });
    return devItems;
  }, [developers]);

  // Fallback areas if API hasn't loaded yet
  const fallbackAreas = [
    { name: 'Dubai Marina', href: '/areas/dubai-marina', highlight: false },
    { name: 'Downtown Dubai', href: '/areas/downtown-dubai', highlight: false },
    { name: 'Business Bay', href: '/areas/business-bay', highlight: false },
    { name: 'Palm Jumeirah', href: '/areas/palm-jumeirah', highlight: false },
    { name: 'JVC', href: '/areas/jvc', highlight: false },
    { name: 'All Areas', href: '/areas', highlight: true },
  ];

  // Fallback developers if API hasn't loaded yet
  const fallbackDevelopers = [
    { name: 'Emaar Properties', href: '/developers/emaar', highlight: false },
    { name: 'DAMAC Properties', href: '/developers/damac', highlight: false },
    { name: 'Nakheel', href: '/developers/nakheel', highlight: false },
    { name: 'Sobha Realty', href: '/developers/sobha', highlight: false },
    { name: 'All Developers', href: '/developers', highlight: true },
  ];

  // Use dynamic data if loaded, otherwise fallback
  const areasSubmenu = areas.length > 0 ? dynamicAreasSubmenu : fallbackAreas;
  const developersSubmenu = developers.length > 0 ? dynamicDevelopersSubmenu : fallbackDevelopers;

  // Navigation with dynamic submenus
  const navigation = [
    {
      name: 'Properties',
      icon: <Building2 className="w-4 h-4" />,
      href: '/projects',
      hasSubmenu: true,
      items: [
        {
          name: 'All Projects',
          href: '/projects',
          icon: <Home className="w-4 h-4" />,
          description: 'Browse all off-plan properties'
        },
        {
          name: 'Areas',
          href: '/areas',
          icon: <MapPin className="w-4 h-4" />,
          description: 'Explore by location',
          submenu: areasSubmenu
        },
        {
          name: 'Developers',
          href: '/developers',
          icon: <Users className="w-4 h-4" />,
          description: 'Top developers',
          submenu: developersSubmenu
        },
        {
          name: 'Commercial',
          href: '/commercial',
          icon: <Briefcase className="w-4 h-4" />,
          description: 'Office & retail spaces',
          submenu: [
            { name: 'Office Spaces', href: '/commercial/office-spaces', highlight: false },
            { name: 'Retail Units', href: '/commercial/retail', highlight: false },
            { name: 'Warehouses', href: '/commercial/warehouses', highlight: false },
          ]
        },
      ]
    },
    {
      name: 'Invest',
      icon: <TrendingUp className="w-4 h-4" />,
      href: '/investment',
      hasSubmenu: true,
      items: [
        {
          name: 'Investment Guides',
          href: '/investment',
          icon: <BookOpen className="w-4 h-4" />,
          description: 'Learn the basics',
          submenu: [
            { name: 'Off-Plan 101', href: '/investment/offplan-101', highlight: false },
            { name: 'Why Dubai Off-Plan?', href: '/investment/why-dubai', highlight: false },
            { name: 'First-Time Buyer Guide', href: '/investment/first-time', highlight: false },
          ]
        },
        {
          name: 'Tools & Calculators',
          href: '/investment/roi-calculator',
          icon: <Calculator className="w-4 h-4" />,
          description: 'Plan your investment',
          submenu: [
            { name: 'ROI Calculator', href: '/investment/roi-calculator', highlight: false },
            { name: 'Payment Plan Simulator', href: '/investment/payment-simulator', highlight: false },
            { name: 'Budget Calculator', href: '/investment/budget-calculator', highlight: false },
          ]
        },
        {
          name: 'Strategies',
          href: '/investment',
          icon: <TrendingUp className="w-4 h-4" />,
          description: 'Investment approaches',
          submenu: [
            { name: 'Flip Strategy', href: '/investment/flip-strategy', highlight: false },
            { name: 'Rental Income', href: '/investment/rental-strategy', highlight: false },
            { name: 'Long-Term Growth', href: '/investment/appreciation', highlight: false },
          ]
        },
      ]
    },
    {
      name: 'Insights',
      icon: <BarChart3 className="w-4 h-4" />,
      href: '/insights',
      hasSubmenu: true,
      items: [
        {
          name: 'Market News',
          href: '/insights/news',
          icon: <Newspaper className="w-4 h-4" />,
          description: 'Latest updates'
        },
        {
          name: 'Reports',
          href: '/insights/reports',
          icon: <FileText className="w-4 h-4" />,
          description: 'Market analysis'
        },
        {
          name: 'Blog',
          href: '/blogs',
          icon: <BookOpen className="w-4 h-4" />,
          description: 'Articles & guides'
        },
      ]
    }
  ];

  return (
    <>
      {/* Premium Clean Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-xl shadow-sm">
        {/* Subtle gold accent line at top */}
        <div className="h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>

        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group relative">
              {/* Logo Icon - Premium with subtle shadow */}
              <div className="relative">
                {/* AI Indicator */}
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#10B981] rounded-full animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.5)] z-10"></div>
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0A0A0A] to-[#1a1a1a] flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                  <Building2 className="w-5 h-5 text-[#D4AF37]" />
                </div>
              </div>
              {/* Brand Name */}
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-tight text-[#0A0A0A] leading-none">
                  AiGents<span className="text-[#D4AF37]">Realty</span>
                </span>
                <span className="text-[10px] text-gray-400 font-medium tracking-wider">DUBAI OFF-PLAN</span>
              </div>
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
                    className={`group flex items-center gap-2 px-4 py-2 text-[#0A0A0A] font-medium text-sm transition-all rounded-lg relative whitespace-nowrap hover:bg-gray-50 ${
                      activeDropdown === item.name ? 'bg-gray-50 text-[#D4AF37]' : ''
                    }`}
                  >
                    <span className={`${activeDropdown === item.name ? 'text-[#D4AF37]' : 'text-gray-500 group-hover:text-[#D4AF37]'} transition-colors`}>
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                    {item.hasSubmenu && (
                      <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180 text-[#D4AF37]' : ''}`} />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.hasSubmenu && activeDropdown === item.name && (
                    <div
                      className="absolute top-full left-0 mt-1 pt-2"
                      onMouseEnter={() => handleMouseEnter(item.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[240px] animate-in fade-in slide-in-from-top-1 duration-150">
                        {item.items.map((menuItem, idx) => (
                          <div
                            key={idx}
                            className="relative"
                            onMouseEnter={() => menuItem.submenu && handleSubmenuEnter(menuItem.name)}
                            onMouseLeave={() => menuItem.submenu && handleSubmenuLeave()}
                          >
                            {menuItem.href ? (
                              <Link
                                href={menuItem.href}
                                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors group"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-[#F9FAFB] flex items-center justify-center group-hover:bg-[#10B981]/10 transition-colors">
                                    <span className="text-gray-400 group-hover:text-[#10B981]">{menuItem.icon}</span>
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-[#0A0A0A] group-hover:text-[#10B981]">{menuItem.name}</div>
                                    {menuItem.description && (
                                      <div className="text-xs text-gray-400">{menuItem.description}</div>
                                    )}
                                  </div>
                                </div>
                                {menuItem.submenu && <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#10B981]" />}
                              </Link>
                            ) : (
                              <div className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors group cursor-pointer">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-[#F9FAFB] flex items-center justify-center group-hover:bg-[#10B981]/10 transition-colors">
                                    <span className="text-gray-400 group-hover:text-[#10B981]">{menuItem.icon}</span>
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-[#0A0A0A] group-hover:text-[#10B981]">{menuItem.name}</div>
                                    {menuItem.description && (
                                      <div className="text-xs text-gray-400">{menuItem.description}</div>
                                    )}
                                  </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#10B981]" />
                              </div>
                            )}

                            {/* Sub-dropdown */}
                            {menuItem.submenu && activeSubmenu === menuItem.name && (
                              <div
                                className="absolute left-[calc(100%-8px)] top-0 pl-2"
                                onMouseEnter={() => handleSubmenuEnter(menuItem.name)}
                                onMouseLeave={handleSubmenuLeave}
                              >
                                <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[200px]">
                                  {menuItem.submenu.map((subItem, subIdx) => (
                                    <Link
                                      key={subIdx}
                                      href={subItem.href}
                                      className={`flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors group ${
                                        subItem.highlight ? 'border-t border-gray-100 mt-1 pt-3' : ''
                                      }`}
                                    >
                                      <span className={`text-sm ${subItem.highlight ? 'font-semibold text-[#10B981]' : 'text-gray-600 group-hover:text-[#0A0A0A]'}`}>
                                        {subItem.name}
                                      </span>
                                      {subItem.highlight && <ArrowRight className="w-3.5 h-3.5 text-[#10B981]" />}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Ask Genie Button */}
              <Link
                href="/genie"
                className="group flex items-center gap-2 bg-gradient-to-r from-[#10B981] to-[#059669] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:-translate-y-0.5 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#10B981]/25"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ask Genie</span>
              </Link>
              {/* Contact Button */}
              <Link
                href="/contact"
                className="group flex items-center gap-2 bg-[#0A0A0A] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:-translate-y-0.5 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Phone className="w-4 h-4" />
                <span>Contact</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 text-[#0A0A0A] hover:bg-gray-100 rounded-xl transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white max-h-[calc(100vh-72px)] overflow-y-auto">
            <div className="px-4 py-4 space-y-1">
              {navigation.map((item) => (
                <div key={item.name} className="space-y-1">
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 text-[#0A0A0A] hover:bg-gray-50 rounded-xl font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-gray-400">{item.icon}</span>
                    {item.name}
                  </Link>
                  {/* Mobile sub-items */}
                  {item.items && (
                    <div className="pl-6 space-y-1">
                      {item.items.map((subItem, idx) => (
                        <div key={idx}>
                          {subItem.href ? (
                            <Link
                              href={subItem.href}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-[#10B981] rounded-lg transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <span className="text-gray-300">{subItem.icon}</span>
                              {subItem.name}
                            </Link>
                          ) : (
                            <div className="px-4 py-2 text-sm text-gray-400 font-medium">{subItem.name}</div>
                          )}
                          {subItem.submenu && (
                            <div className="pl-4 space-y-1">
                              {subItem.submenu.map((sub, subIdx) => (
                                <Link
                                  key={subIdx}
                                  href={sub.href}
                                  className="block px-4 py-2 text-sm text-gray-500 hover:text-[#10B981] transition-colors"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-100 space-y-2">
                <Link
                  href="/genie"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#10B981] to-[#059669] text-white px-4 py-3 rounded-xl font-semibold transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Sparkles className="w-4 h-4" />
                  Ask Genie
                </Link>
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 bg-[#0A0A0A] text-white px-4 py-3 rounded-xl font-semibold transition-all"
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

      {/* Spacer for fixed navbar */}
      <div className="h-[72px]"></div>
    </>
  );
}
