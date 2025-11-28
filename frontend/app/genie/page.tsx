'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import SmartCanvasFeed, { CanvasHistoryItem, createHistoryItem } from '@/components/canvas/SmartCanvasFeed';
import { CanvasAction } from '@/components/canvas/SmartCanvas';
import { useSearchStore } from '@/store/searchStore';

// Message interface
interface Message {
  role: 'assistant' | 'user';
  content: string;
}

export default function GeniePage() {
  // Genie Chat State
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I\'m Genie. Ask me about Dubai off-plan investments!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Smart Canvas History State - Array of canvas actions
  const [canvasHistory, setCanvasHistory] = useState<CanvasHistoryItem[]>([
    createHistoryItem({ type: 'welcome' })
  ]);

  // Get pending query from store
  const { pendingQuery, clearPendingQuery } = useSearchStore();

  // Add new canvas action to history (instead of replacing)
  const addToCanvasHistory = (action: CanvasAction, userQuery?: string) => {
    const newItem = createHistoryItem(action, userQuery);
    setCanvasHistory(prev => [...prev, newItem]);
  };

  // Clear canvas history (reset to welcome)
  const clearCanvasHistory = () => {
    setCanvasHistory([createHistoryItem({ type: 'welcome' })]);
  };

  // Quick reply suggestions for chat
  const quickReplies = [
    "Best ROI in 2024",
    "3BR under 2M AED",
    "Downtown projects",
    "Payment plans"
  ];

  // Send a message to the chat (used by form submit and Try Asking clicks)
  const sendMessage = async (userMessage: string) => {
    if (!userMessage.trim() || isLoading) return;

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

      // Add to Smart Canvas history (instead of replacing)
      if (data.canvas) {
        console.log('Adding to canvas history:', data.canvas);
        addToCanvasHistory(data.canvas, userMessage);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle chat form submission
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input.trim());
  };

  // Handle "Try Asking" suggestion clicks
  const handleTryAskingClick = (query: string) => {
    sendMessage(query);
  };

  // Auto-send pending query from store on mount
  useEffect(() => {
    if (pendingQuery) {
      // Small delay to ensure component is ready
      const timer = setTimeout(() => {
        sendMessage(pendingQuery);
        clearPendingQuery();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []); // Only run on mount

  return (
    <main className="min-h-[calc(100vh-90px)] lg:h-[calc(100vh-90px)] bg-[#0A0A0A] overflow-x-hidden overflow-y-auto lg:overflow-hidden">
      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-full lg:h-full overflow-x-hidden overflow-y-visible lg:overflow-hidden">
        {/* CINEMATIC DARK GRADIENT BACKGROUND */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A] overflow-hidden">
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

        <div className="relative max-w-[1800px] mx-auto px-6 lg:px-16 pt-6 pb-6 lg:pb-0 min-h-full lg:h-full flex flex-col">
          {/* ASYMMETRIC TWO-COLUMN AREA */}
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-stretch flex-1">

            {/* LEFT: SMART CANVAS FEED - Scrollable AI-driven content - 7 cols / 60% */}
            <div className="lg:col-span-7 relative order-2 lg:order-1 lg:overflow-y-auto scrollbar-hidden lg:max-h-[calc(100vh-140px)]">
              <SmartCanvasFeed
                history={canvasHistory}
                isLoading={isLoading}
                onClearHistory={clearCanvasHistory}
                onTryAskingClick={handleTryAskingClick}
                onProjectClick={(project) => {
                  window.location.href = `/areas/${project.area_slug}/${project.slug}`;
                }}
              />
            </div>

            {/* RIGHT: GENIE CHAT - Smaller Panel (5 cols / 40%) */}
            <div className="lg:col-span-5 relative order-1 lg:order-2 overflow-hidden">
              <div className="relative bg-[#0A0A0A]/90 backdrop-blur-2xl border-2 border-[#10B981]/40 rounded-3xl overflow-hidden transition-all duration-500">
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

    </main>
  );
}
