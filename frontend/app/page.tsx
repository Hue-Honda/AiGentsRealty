'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Sparkles, Building2, MapPin, ArrowRight } from 'lucide-react';
import SmartCanvas, { CanvasAction } from '@/components/canvas/SmartCanvas';

// Project interface
interface Project {
  id: number;
  name: string;
  slug: string;
  location: string;
  price_from: string;
  completion_date: string;
  payment_plan: string;
  bedrooms: string;
  bathrooms: string;
  sqft: string;
  area_slug: string;
  images?: string[];
}

// Message interface
interface Message {
  role: 'assistant' | 'user';
  content: string;
}

export default function Home() {
  // Genie Chat State
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I\'m Genie. Ask me about Dubai off-plan investments!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Smart Canvas State
  const [canvasAction, setCanvasAction] = useState<CanvasAction>({ type: 'welcome' });

  // Projects State (for carousel section)
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const cardsPerView = 3;
  const totalSlides = Math.max(0, Math.ceil(projects.length / cardsPerView));

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const quickReplies = [
    "Best ROI in 2024",
    "3BR under 2M AED",
    "Downtown projects",
    "Payment plans"
  ];

  // Fetch projects
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    fetch(`${apiUrl}/api/projects/suggestions`)
      .then(res => res.json())
      .then(data => {
        console.log('API Response:', data);
        if (data.success && data.data) {
          console.log('Projects received:', data.data.length);
          setProjects(data.data);
        }
      })
      .catch(err => console.error('Error fetching projects:', err))
      .finally(() => setLoadingProjects(false));
  }, []);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await response.json();
      console.log('Chat API response:', data);
      console.log('Recommended projects:', data.recommendedProjects);

      if (data.message) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error.' }]);
      }

      // Update Smart Canvas with AI response
      if (data.canvas) {
        console.log('Setting canvas action:', data.canvas);
        setCanvasAction(data.canvas);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-screen overflow-hidden">
        {/* CINEMATIC DARK GRADIENT BACKGROUND */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A]">
          {/* Soft emerald beams creating depth */}
          <div className="absolute top-[10%] left-[15%] w-[500px] h-[800px] bg-[#10B981]/10 rotate-[25deg] blur-[120px]"></div>
          <div className="absolute top-[5%] right-[10%] w-[600px] h-[700px] bg-[#10B981]/8 -rotate-[15deg] blur-[140px]"></div>

          {/* Gold particles/bokeh */}
          <div className="absolute bottom-[30%] left-[8%] w-[250px] h-[250px] bg-[#D4AF37]/8 rounded-full blur-[90px]"></div>
          <div className="absolute top-[25%] right-[20%] w-[180px] h-[180px] bg-[#D4AF37]/10 rounded-full blur-[70px]"></div>

          {/* Emerald geometric shapes */}
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] border border-[#10B981]/15 rotate-45 rounded-[4rem]"></div>
          <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] border border-[#10B981]/10 rotate-12 rounded-[3rem]"></div>

          {/* Subtle bokeh particles */}
          <div className="absolute top-[20%] left-[45%] w-3 h-3 bg-[#D4AF37]/40 rounded-full blur-sm animate-pulse"></div>
          <div className="absolute top-[50%] left-[75%] w-2 h-2 bg-[#10B981]/30 rounded-full blur-sm"></div>
          <div className="absolute top-[70%] left-[20%] w-3 h-3 bg-[#D4AF37]/50 rounded-full blur-sm animate-pulse"></div>

          {/* Gold architectural line */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent"></div>
        </div>

        <div className="relative max-w-[1800px] mx-auto px-6 lg:px-16 pt-20 pb-32">
          {/* COMPACT HEADLINE - ONE LINE */}
          <div className="text-center mb-12 relative z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-4">
              Find Your <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4E5B8] to-[#D4AF37] bg-clip-text text-transparent">Dream Oasis</span>
            </h1>
            <p className="text-base lg:text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed mb-6">
              AI-powered property discovery in Dubai's most exclusive locations
            </p>

            {/* COMPACT FEATURE BADGES - ONE LINE */}
            <div className="flex flex-wrap justify-center items-center gap-2">
              {/* Badge 1 */}
              <div className="group px-4 py-2 bg-[#0A0A0A]/60 backdrop-blur-xl border border-[#D4AF37]/40 rounded-full hover:bg-[#10B981]/10 hover:border-[#10B981]/60 transition-all duration-300">
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-xs font-bold text-[#D4AF37] group-hover:text-[#10B981]">Live ROI & Comps</span>
                </div>
              </div>

              {/* Badge 2 */}
              <div className="group px-4 py-2 bg-[#D4AF37]/5 backdrop-blur-xl border border-[#D4AF37]/30 rounded-full hover:bg-[#D4AF37]/15 hover:border-[#D4AF37]/60 transition-all duration-300">
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-xs font-semibold text-white">RERA/DLD Compliant</span>
                </div>
              </div>

              {/* Badge 3 */}
              <div className="group px-4 py-2 bg-[#10B981]/5 backdrop-blur-xl border border-[#10B981]/30 rounded-full hover:bg-[#10B981]/15 hover:border-[#10B981]/60 transition-all duration-300">
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-[#D4AF37] fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span className="text-xs font-medium text-gray-300 group-hover:text-white">Personalized Shortlists</span>
                </div>
              </div>
            </div>
          </div>

          {/* ASYMMETRIC TWO-COLUMN AREA - BROKEN GRID */}
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* LEFT: SMART CANVAS - Dynamic AI-driven content - 7 cols / 60% */}
            <div className="lg:col-span-7 relative order-2 lg:order-1">
              <div className="lg:mt-8 relative">
                {/* Glow Effect */}
                <div className="absolute -inset-4 bg-[#10B981]/10 rounded-[2rem] blur-2xl"></div>

                {/* Smart Canvas Container */}
                <div className="relative bg-[#0A0A0A]/80 backdrop-blur-xl border border-[#10B981]/20 rounded-3xl p-6 shadow-[0_0_40px_rgba(16,185,129,0.1)]">
                  <SmartCanvas
                    action={canvasAction}
                    isLoading={isLoading}
                    onProjectClick={(project) => {
                      window.location.href = `/areas/${project.area_slug}/${project.slug}`;
                    }}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT: GENIE CHAT - Smaller Panel (5 cols / 40%) */}
            <div className="lg:col-span-5 lg:-mt-4 relative order-1 lg:order-2">
              {/* Emerald glow depth layer */}
              <div className="absolute -inset-6 bg-[#10B981]/15 rounded-[2rem] blur-3xl"></div>

              <div className="relative bg-[#0A0A0A]/90 backdrop-blur-2xl border-2 border-[#10B981]/40 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.4)] transition-all duration-500">
                {/* Emerald top accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#10B981] to-transparent"></div>

                {/* Header with Gold Orb Avatar */}
                <div className="bg-gradient-to-br from-[#10B981]/20 to-transparent p-6 border-b border-[#10B981]/20">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8941E] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.6)]">
                        <svg className="w-8 h-8 text-black animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#10B981] rounded-full border-2 border-[#0A0A0A]"></div>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Genie</h2>
                      <p className="text-sm text-[#10B981]">AI Property Advisor</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="h-[350px] overflow-y-auto p-5 space-y-4 chat-scrollbar">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-base ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8941E] text-black shadow-[0_4px_15px_rgba(212,175,55,0.3)]'
                            : 'bg-[#1A1A1A]/80 border border-[#10B981]/30 text-gray-300 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                        }`}
                      >
                        {msg.role === 'assistant' && (
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></div>
                            <span className="text-xs font-semibold text-[#10B981]">GENIE</span>
                          </div>
                        )}
                        {msg.role === 'assistant' ? (
                          <div className="leading-relaxed prose prose-invert prose-sm max-w-none prose-p:my-2 prose-ul:my-2 prose-li:my-1 prose-strong:text-[#D4AF37]">
                            <ReactMarkdown
                              components={{
                                a: ({ href, children }) => (
                                  <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-4 py-2 my-2 mr-2 bg-gradient-to-r from-[#10B981]/20 to-[#10B981]/10 border border-[#10B981]/50 text-[#10B981] rounded-xl text-xs font-bold hover:from-[#10B981]/30 hover:to-[#10B981]/20 hover:border-[#10B981] hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all no-underline"
                                  >
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    {children}
                                    <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                  </a>
                                )
                              }}
                            >
                              {msg.content}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          <p className="leading-relaxed">{msg.content}</p>
                        )}
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-[#1A1A1A]/80 border border-[#10B981]/30 rounded-2xl px-5 py-3 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-[#10B981] animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span className="text-sm text-gray-400">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Reply Chips */}
                <div className="px-6 pb-4 flex flex-wrap gap-2">
                  {quickReplies.map((reply, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInput(reply)}
                      className="text-xs bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] px-3 py-1.5 rounded-full hover:bg-[#10B981]/20 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
                    >
                      {reply}
                    </button>
                  ))}
                </div>

                {/* Input Area */}
                <div className="p-6 border-t border-[#10B981]/20 bg-[#0A0A0A]/60">
                  <form onSubmit={handleChatSubmit} className="flex gap-3">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about ROI, payment plans..."
                      className="flex-1 bg-[#1A1A1A]/60 border border-[#10B981]/30 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#10B981] focus:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="bg-gradient-to-r from-[#10B981] to-[#059669] text-white px-6 rounded-xl hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== AI SUGGESTIONS SECTION - DARK BACKGROUND ========== */}
      <section className="relative bg-[#0A0A0A] py-20 border-t border-[#10B981]/10 overflow-hidden">
        {/* Subtle background effects */}
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-[#10B981]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[30%] left-[15%] w-[300px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-[100px]"></div>

        <div className="relative max-w-[1800px] mx-auto px-6 lg:px-16">
          {/* Header with Badge and Navigation */}
          <div className="flex items-start justify-between mb-12">
            <div>
              {/* AI-Powered Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#10B981]/10 border border-[#10B981]/30 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-[#10B981]" />
                <span className="text-sm font-bold text-[#10B981] uppercase tracking-wide">AI-Powered Matches</span>
              </div>

              <h2 className="text-5xl lg:text-6xl font-black mb-4">
                <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] bg-clip-text text-transparent">
                  AI Suggestions for You
                </span>
              </h2>
              <p className="text-xl text-gray-400">
                Properties matched to your investment goals
              </p>
            </div>

            {/* Navigation Arrows */}
            <div className="flex gap-3">
              <button
                onClick={handlePrevSlide}
                className="w-12 h-12 bg-[#1A1A1A]/60 border-2 border-[#D4AF37]/30 rounded-xl flex items-center justify-center hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all"
                aria-label="Previous"
              >
                <ArrowRight className="w-5 h-5 text-[#D4AF37] rotate-180" />
              </button>
              <button
                onClick={handleNextSlide}
                className="w-12 h-12 bg-[#1A1A1A]/60 border-2 border-[#D4AF37]/30 rounded-xl flex items-center justify-center hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all"
                aria-label="Next"
              >
                <ArrowRight className="w-5 h-5 text-[#D4AF37]" />
              </button>
            </div>
          </div>

          {loadingProjects ? (
            <div className="text-center py-12">
              <Sparkles className="w-12 h-12 text-[#10B981] animate-pulse mx-auto mb-4" />
              <p className="text-gray-400">Loading AI-powered suggestions...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No properties available at the moment.</p>
            </div>
          ) : (
            <>
              {/* Carousel Container */}
              <div className="relative overflow-hidden">
                <div
                  className="flex transition-transform duration-700 ease-out"
                  style={{
                    transform: `translateX(-${currentSlide * 100}%)`
                  }}
                >
                  {/* Create slides by grouping projects */}
                  {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                    <div key={slideIndex} className="min-w-full">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-1">
                        {projects
                          .slice(slideIndex * cardsPerView, (slideIndex + 1) * cardsPerView)
                          .map((project) => (
                <div
                  key={project.id}
                  className="group relative bg-[#0A0A0A]/90 backdrop-blur-xl border border-[#1A1A1A] rounded-3xl overflow-hidden hover:border-[#10B981]/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] transition-all duration-500"
                >
                  {/* Property Image */}
                  <div className="relative h-[280px] overflow-hidden">
                    {project.images && project.images.length > 0 ? (
                      <img
                        src={project.images[0]}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] flex items-center justify-center">
                        <Building2 className="w-16 h-16 text-[#10B981]/20" />
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent"></div>

                    {/* Payment Plan Badge - Top Left */}
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#10B981] rounded-lg">
                      <span className="text-xs font-bold text-black">{project.payment_plan} Plan</span>
                    </div>

                    {/* Favorite Icon - Top Right */}
                    <button className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-black/80 transition-all">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>

                  {/* Property Details */}
                  <div className="p-6 space-y-4">
                    {/* Property Name */}
                    <h3 className="text-2xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                      {project.name}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin className="w-4 h-4 text-[#10B981]" />
                      <span className="text-sm">{project.location}</span>
                    </div>

                    {/* Handover Date */}
                    <div className="text-sm">
                      <span className="text-gray-500">Handover in </span>
                      <span className="text-[#D4AF37] font-semibold">{project.completion_date}</span>
                    </div>

                    {/* Price */}
                    <div className="pt-4 border-t border-[#1A1A1A]">
                      <p className="text-3xl font-black text-[#10B981]">
                        from {project.price_from}
                      </p>
                    </div>

                    {/* Property Specs */}
                    <div className="flex items-center gap-6 text-sm text-gray-400">
                      {/* Bedrooms */}
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span className="font-semibold text-white">{project.bedrooms}</span>
                      </div>

                      {/* Bathrooms */}
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                        </svg>
                        <span className="font-semibold text-white">{project.bathrooms}</span>
                      </div>

                      {/* Square Feet */}
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                        <span className="font-semibold text-white">{project.sqft} sqft</span>
                      </div>
                    </div>

                    {/* View Details Link */}
                    <Link
                      href={`/areas/${project.area_slug}/${project.slug}`}
                      className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#10B981] font-semibold transition-colors pt-2"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center gap-3 mt-12">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentSlide
                        ? 'w-12 h-3 bg-[#10B981] shadow-[0_0_15px_rgba(16,185,129,0.6)]'
                        : 'w-3 h-3 bg-[#D4AF37]/30 hover:bg-[#D4AF37]/60'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ========== CTA BANNER - GOLD GRADIENT ========== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#D4AF37] via-[#F4E5B8] to-[#D4AF37] py-20">
        {/* Emerald particles blending with gold */}
        <div className="absolute top-[20%] left-[10%] w-[200px] h-[200px] bg-[#10B981]/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[15%] right-[15%] w-[250px] h-[250px] bg-[#10B981]/8 rounded-full blur-[120px]"></div>

        {/* Floating particles */}
        <div className="absolute top-[30%] left-[25%] w-2 h-2 bg-black/20 rounded-full blur-sm animate-pulse"></div>
        <div className="absolute top-[60%] right-[30%] w-3 h-3 bg-black/15 rounded-full blur-sm"></div>
        <div className="absolute bottom-[40%] left-[60%] w-2 h-2 bg-black/20 rounded-full blur-sm animate-pulse"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-16">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-5 tracking-tight">
              Want a Fully-Managed Shortlist?
            </h2>
            <p className="text-xl md:text-2xl text-black/80 mb-10 font-medium max-w-3xl mx-auto">
              Let our expert agents curate the perfect properties for you
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              {/* Talk to an Agent - Black Glass + Gold Border */}
              <button className="group px-10 py-5 bg-black/90 backdrop-blur-xl border-2 border-black text-white rounded-2xl font-bold hover:shadow-[0_0_40px_rgba(0,0,0,0.4)] transition-all duration-300 flex items-center gap-3 hover:-translate-y-1">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-lg">Talk to an Agent</span>
              </button>

              {/* Start Now - Emerald Glow */}
              <button className="group px-10 py-5 bg-[#10B981] backdrop-blur-xl border-2 border-[#059669] text-black rounded-2xl font-bold hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#10B981] to-[#059669] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10 text-lg font-black">Start Now</span>
              </button>
            </div>
          </div>
        </div>
      </section>

     
    </main>
  );
}
