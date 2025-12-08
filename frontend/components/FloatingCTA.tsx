'use client';

import { useState, useEffect, useRef } from 'react';
import { Phone, Video, Calendar, MessageCircle, X } from 'lucide-react';
import { gsap } from 'gsap';

// Contact configuration - Update these values as needed
const CONTACT_CONFIG = {
  whatsapp: '+971501234567', // Replace with actual WhatsApp number
  phone: '+971501234567',     // Replace with actual phone number
  calendlyUrl: 'https://calendly.com/aigentsrealty', // Replace with actual Calendly URL
};

interface CTAButton {
  id: string;
  icon: React.ReactNode;
  label: string;
  color: string;
  hoverBorder: string;
  action: () => void;
}

export default function FloatingCTA() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // GSAP animations for buttons
  useEffect(() => {
    if (buttonsRef.current) {
      const buttons = buttonsRef.current.querySelectorAll('.cta-button');

      if (isExpanded) {
        gsap.fromTo(
          buttons,
          { scale: 0, opacity: 0, y: 20 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.08,
            ease: 'back.out(1.7)'
          }
        );
      } else {
        gsap.to(buttons, {
          scale: 0,
          opacity: 0,
          y: 20,
          duration: 0.2,
          stagger: 0.05,
          ease: 'power2.in'
        });
      }
    }
  }, [isExpanded]);

  // Actions for each button
  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hi, I\'m interested in Dubai off-plan properties. Can you help me?');
    window.open(`https://wa.me/${CONTACT_CONFIG.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${CONTACT_CONFIG.phone}`;
  };

  const handleVideoCall = () => {
    // Open Calendly for video call scheduling or use a video call link
    window.open(`${CONTACT_CONFIG.calendlyUrl}/video-call`, '_blank');
  };

  const handleScheduleMeeting = () => {
    window.open(CONTACT_CONFIG.calendlyUrl, '_blank');
  };

  const ctaButtons: CTAButton[] = [
    {
      id: 'whatsapp',
      icon: <MessageCircle className="w-5 h-5" />,
      label: 'WhatsApp',
      color: 'bg-[#25D366]',
      hoverBorder: 'hover:border-[#25D366]',
      action: handleWhatsApp,
    },
    {
      id: 'call',
      icon: <Phone className="w-5 h-5" />,
      label: 'Call Now',
      color: 'bg-[#10B981]',
      hoverBorder: 'hover:border-[#10B981]',
      action: handleCall,
    },
    {
      id: 'video',
      icon: <Video className="w-5 h-5" />,
      label: 'Video Call',
      color: 'bg-[#D4AF37]',
      hoverBorder: 'hover:border-[#D4AF37]',
      action: handleVideoCall,
    },
    {
      id: 'schedule',
      icon: <Calendar className="w-5 h-5" />,
      label: 'Schedule',
      color: 'bg-[#667EEA]',
      hoverBorder: 'hover:border-[#667EEA]',
      action: handleScheduleMeeting,
    },
  ];

  // Desktop: Always show vertical stack on right side
  // Mobile: Show expandable FAB at bottom right

  if (isMobile) {
    return (
      <div
        ref={containerRef}
        className="fixed bottom-24 right-4 z-40 flex flex-col-reverse items-end gap-3"
      >
        {/* Expanded buttons */}
        <div ref={buttonsRef} className="flex flex-col-reverse gap-3">
          {ctaButtons.map((button) => (
            <button
              key={button.id}
              onClick={button.action}
              className={`cta-button flex items-center gap-2 px-4 py-3 bg-white shadow-lg hover:shadow-xl rounded-full text-[#0A0A0A] font-semibold text-sm transition-all duration-300 hover:scale-105 opacity-0 scale-0`}
              aria-label={button.label}
            >
              <span className={`w-8 h-8 ${button.color} rounded-full flex items-center justify-center`}>
                <span className="text-white">{button.icon}</span>
              </span>
              <span>{button.label}</span>
            </button>
          ))}
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${
            isExpanded
              ? 'bg-white hover:bg-gray-50'
              : 'bg-[#10B981] hover:bg-[#0D9668]'
          }`}
          aria-label={isExpanded ? 'Close contact options' : 'Open contact options'}
        >
          {isExpanded ? (
            <X className="w-6 h-6 text-[#0A0A0A]" />
          ) : (
            <Phone className="w-6 h-6 text-white" />
          )}
        </button>
      </div>
    );
  }

  // Desktop: Always visible vertical stack with light theme
  return (
    <div
      ref={containerRef}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col"
    >
      {ctaButtons.map((button, index) => (
        <button
          key={button.id}
          onClick={button.action}
          className="group relative flex items-center justify-end overflow-hidden transition-all duration-300"
          aria-label={button.label}
        >
          {/* Label - slides out on hover */}
          <span
            className={`absolute right-full mr-0 px-4 py-2 bg-white shadow-lg text-[#0A0A0A] text-sm font-semibold whitespace-nowrap rounded-l-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:mr-0 transition-all duration-300`}
          >
            {button.label}
          </span>

          {/* Icon button */}
          <div
            className={`w-12 h-12 bg-white shadow-lg group-hover:shadow-xl flex items-center justify-center transition-all duration-300 ${
              index === 0 ? 'rounded-tl-xl' : ''
            } ${
              index === ctaButtons.length - 1 ? 'rounded-bl-xl' : ''
            }`}
          >
            <span className={`w-8 h-8 ${button.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <span className="text-white">{button.icon}</span>
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
