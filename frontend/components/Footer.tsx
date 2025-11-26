import Link from 'next/link';
import { Building2, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube, Sparkles } from 'lucide-react';

export default function Footer() {
  const footerSections = [
    {
      title: 'Off-Plan',
      links: [
        { name: 'All Projects', href: '/projects' },
        { name: 'By Price', href: '/projects/by-price' },
        { name: 'By Developer', href: '/projects/by-developer' },
        { name: 'By Location', href: '/projects/by-location' },
        { name: 'By Completion', href: '/projects/by-completion' },
        { name: 'New Launches', href: '/projects/new-launches' }
      ]
    },
    {
      title: 'Investors',
      links: [
        { name: 'Investment Guide', href: '/investment' },
        { name: 'ROI Calculator', href: '/investment/roi-calculator' },
        { name: 'Market Reports', href: '/insights/reports' },
        { name: 'Budget Planner', href: '/investment/budget-calculator' },
        { name: 'Success Stories', href: '/about/testimonials' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Why Us', href: '/about/why-us' },
        { name: 'Contact', href: '/contact' },
        { name: 'RERA License', href: '/about/rera' },
        { name: 'Careers', href: '/about/careers' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Off-Plan 101', href: '/investment/offplan-101' },
        { name: "Buyer's Guide", href: '/investment/first-time' },
        { name: 'Legal Process', href: '/investment/legal' },
        { name: 'Payment Plans', href: '/investment/payment-plans' },
        { name: 'FAQ', href: '/faq' }
      ]
    }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#0A0A0A] via-[#0F0F0F] to-black text-gray-300 border-t border-[#D4AF37]/30 overflow-hidden">
      {/* Black marble texture with subtle emerald particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-[20%] w-[300px] h-[300px] bg-[#10B981]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-20 left-[15%] w-[250px] h-[250px] bg-[#D4AF37]/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Main Footer */}
      <div className="relative max-w-[1800px] mx-auto px-6 lg:px-16 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-12">
          {/* Brand Column with Emerald Halo */}
          <div className="lg:col-span-2">
            <Link href="/" className="group flex items-center gap-3 mb-6">
              {/* Logo with Emerald Halo */}
              <div className="relative">
                {/* Emerald halo glow */}
                <div className="absolute -inset-1 bg-[#10B981]/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941E] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                  <Building2 className="w-6 h-6 text-black" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl bg-gradient-to-r from-[#D4AF37] via-[#F4E5B8] to-[#D4AF37] bg-clip-text text-transparent">AiGentsRealty</span>
                <span className="text-xs text-gray-400 font-medium">AI-Powered Off-Plan Experts</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Dubai's premier AI-powered off-plan property discovery platform. Making real estate investment transparent, accessible, and intelligent.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-sm">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-gray-300">+971 4 XXX XXXX</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-gray-300">info@aigentsrealty.ae</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-gray-300">Dubai, UAE</span>
              </div>
            </div>
          </div>

          {/* Links Columns with Gold Micro-Underlines */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="relative inline-block font-bold text-white mb-5">
                {section.title}
                {/* Gold micro-underline */}
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-[#D4AF37] to-transparent"></span>
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group text-sm text-gray-400 hover:text-[#D4AF37] transition-colors duration-200 inline-block relative"
                    >
                      {link.name}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#D4AF37] group-hover:w-full transition-all duration-200"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links with Gold Divider */}
        <div className="mt-16 pt-10 border-t border-[#D4AF37]/20 relative">
          {/* Gold glow on divider */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent"></div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Icons with Emerald Hover */}
            <div className="flex items-center gap-5">
              <span className="text-sm text-gray-400 font-medium">Connect:</span>
              <div className="flex gap-3">
                <a href="#" className="group w-11 h-11 bg-[#0A0A0A]/60 backdrop-blur-xl hover:bg-[#10B981] border border-[#D4AF37]/30 hover:border-[#10B981] rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                  <Instagram className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                </a>
                <a href="#" className="group w-11 h-11 bg-[#0A0A0A]/60 backdrop-blur-xl hover:bg-[#10B981] border border-[#D4AF37]/30 hover:border-[#10B981] rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                  <Facebook className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                </a>
                <a href="#" className="group w-11 h-11 bg-[#0A0A0A]/60 backdrop-blur-xl hover:bg-[#10B981] border border-[#D4AF37]/30 hover:border-[#10B981] rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                  <Linkedin className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                </a>
                <a href="#" className="group w-11 h-11 bg-[#0A0A0A]/60 backdrop-blur-xl hover:bg-[#10B981] border border-[#D4AF37]/30 hover:border-[#10B981] rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                  <Youtube className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

            {/* Legal Links with Gold Separators */}
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-[#D4AF37] transition-colors">
                Privacy Policy
              </Link>
              <span className="text-[#D4AF37]/40">•</span>
              <Link href="/terms" className="hover:text-[#D4AF37] transition-colors">
                Terms & Conditions
              </Link>
              <span className="text-[#D4AF37]/40">•</span>
              <Link href="/disclaimer" className="hover:text-[#D4AF37] transition-colors">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Deep Black with Gold Divider */}
      <div className="relative border-t border-[#D4AF37]/30 bg-black">
        {/* Gold glow on top divider */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>

        <div className="relative max-w-[1800px] mx-auto px-6 lg:px-16 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <div className="text-center md:text-left">
              © 2024 AiGentsRealty. All Rights Reserved. | <span className="text-gray-300">RERA License:</span> XXXXX | <span className="text-gray-300">DED License:</span> XXXXX
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-gray-300">
                <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
                <span className="font-medium">Powered by AI</span>
              </div>
              <span className="text-[#D4AF37]/40">•</span>
              <span className="text-gray-300">Made in Dubai 🇦🇪</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
