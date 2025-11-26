'use client';

import { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Loader2 } from 'lucide-react';
import { gsap } from 'gsap';

export default function FloatingAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: "👋 Hi! I'm the AiGents Genie. Ask me anything about Dubai's off-plan properties, developers, or investment opportunities!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const chatRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Listen for custom event to open chat
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
    };

    window.addEventListener('openFloatingChat', handleOpenChat);
    return () => {
      window.removeEventListener('openFloatingChat', handleOpenChat);
    };
  }, []);

  // GSAP animations
  useEffect(() => {
    if (buttonRef.current) {
      // Pulse animation for the button
      gsap.to(buttonRef.current, {
        scale: 1.1,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  }, []);

  useEffect(() => {
    if (isOpen && chatRef.current) {
      // Slide in animation
      gsap.fromTo(
        chatRef.current,
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.4)' }
      );
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await response.json();

      // Add assistant response
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.message || data.response || 'Sorry, I encountered an error. Please try again.'
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I\'m having trouble connecting. Please try again later.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        data-floating-chat-toggle="true"
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-[#00C870] to-[#00A85D] rounded-full shadow-[0_0_40px_rgba(0,200,112,0.6)] hover:shadow-[0_0_60px_rgba(0,200,112,0.8)] transition-all flex items-center justify-center group"
        aria-label="Open AI Chat"
      >
        {isOpen ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <Sparkles className="w-7 h-7 text-white group-hover:rotate-12 transition-transform" />
        )}

        {/* Pulsing ring */}
        <div className="absolute inset-0 rounded-full bg-[#00C870]/30 animate-ping"></div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatRef}
          className="fixed bottom-24 right-6 z-50 w-[480px] max-w-[calc(100vw-3rem)] h-[650px] bg-black/95 backdrop-blur-2xl border-2 border-[#00C870]/30 rounded-3xl shadow-[0_20px_80px_rgba(0,200,112,0.3)] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-[#00C870] to-[#00A85D] p-6">
            {/* Gold glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8C676]/20 rounded-full blur-[60px]"></div>

            <div className="relative flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-black text-lg">AiGents Genie</h3>
                <p className="text-white/80 text-xs font-semibold">Your AI Property Assistant</p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-[#E8C676] to-[#D4AF37] text-black'
                      : 'bg-white/10 backdrop-blur-md border border-white/10 text-white'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3">
                  <Loader2 className="w-5 h-5 text-[#00C870] animate-spin" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/10 bg-black/50">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about properties..."
                className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#00C870]/60 transition-all"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="w-12 h-12 bg-gradient-to-br from-[#00C870] to-[#00A85D] rounded-xl flex items-center justify-center hover:shadow-[0_0_20px_rgba(0,200,112,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                ) : (
                  <Send className="w-5 h-5 text-white" />
                )}
              </button>
            </div>

            {/* Quick suggestions */}
            <div className="mt-3 flex flex-wrap gap-2">
              {['Popular Areas', 'Top Developers', 'Investment Tips'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInput(suggestion)}
                  className="text-xs px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-300 hover:bg-white/10 hover:text-[#00C870] transition-all"
                  disabled={isLoading}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
