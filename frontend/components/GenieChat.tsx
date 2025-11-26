'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, Trash2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const STORAGE_KEY = 'aigents_chat_history';
const MAX_HISTORY_MESSAGES = 20; // Limit to stay within token limits

const DEFAULT_MESSAGE: Message = {
  role: 'assistant',
  content: 'Hi! I\'m Genie, your AI property advisor. Ask me anything about Dubai off-plan properties!'
};

export default function GenieChat() {
  const [messages, setMessages] = useState<Message[]>([DEFAULT_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMessages(parsed);
          }
        }
      } catch (e) {
        console.error('Error loading chat history:', e);
      }
    }
  }, []);

  // Save chat history to localStorage whenever messages change
  useEffect(() => {
    if (typeof window !== 'undefined' && messages.length > 1) {
      try {
        // Keep only last MAX_HISTORY_MESSAGES to prevent localStorage bloat
        const toSave = messages.slice(-MAX_HISTORY_MESSAGES);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
      } catch (e) {
        console.error('Error saving chat history:', e);
      }
    }
  }, [messages]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const clearChat = () => {
    setMessages([DEFAULT_MESSAGE]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');

    const newMessages = [...messages, { role: 'user' as const, content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

      // Send conversation history (excluding the welcome message, last 10 exchanges)
      const conversationHistory = newMessages
        .slice(1) // Skip welcome message
        .slice(-20) // Last 20 messages (10 exchanges)
        .map(m => ({ role: m.role, content: m.content }));

      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory
        })
      });

      const data = await response.json();

      if (data.message) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.'
        }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I\'m having trouble connecting. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#1A1A1A] border border-[#10B981]/30 rounded-2xl shadow-2xl flex flex-col h-[600px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#10B981] to-[#059669] rounded-t-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Genie Chat</h2>
              <p className="text-sm text-white/80">AI-Powered Property Advisor</p>
            </div>
          </div>
          {messages.length > 1 && (
            <button
              onClick={clearChat}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              title="Clear chat history"
            >
              <Trash2 className="w-5 h-5 text-white/80" />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8941E] text-black'
                  : 'bg-[#0A0A0A] border border-[#10B981]/30 text-gray-300'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-[#10B981]" />
                  <span className="text-xs font-semibold text-[#10B981]">GENIE</span>
                </div>
              )}
              <p className="text-sm leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#0A0A0A] border border-[#10B981]/30 rounded-2xl px-5 py-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#10B981] animate-pulse" />
                <span className="text-sm text-gray-400">Genie is thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-6 border-t border-[#10B981]/20">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about properties, ROI, payment plans..."
            className="flex-1 bg-[#0A0A0A] border border-[#10B981]/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#10B981] transition-colors"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-[#10B981] to-[#059669] text-white px-6 rounded-xl hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
