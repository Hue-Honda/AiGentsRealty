'use client';

import SmartCanvas, { CanvasAction, Project } from './SmartCanvas';
import { Trash2 } from 'lucide-react';

// Extended type with ID and timestamp for history tracking
export interface CanvasHistoryItem extends CanvasAction {
  id: string;
  timestamp: Date;
  userQuery?: string; // The query that triggered this canvas action
}

interface SmartCanvasFeedProps {
  history: CanvasHistoryItem[];
  onProjectClick?: (project: Project) => void;
  onLeadSubmit?: (data: any) => Promise<boolean>;
  onTryAskingClick?: (query: string) => void;
  onClearHistory?: () => void;
  isLoading?: boolean;
}

// Generate unique ID
export function generateCanvasId(): string {
  return `canvas-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Create a history item from a canvas action
export function createHistoryItem(action: CanvasAction, userQuery?: string): CanvasHistoryItem {
  return {
    ...action,
    id: generateCanvasId(),
    timestamp: new Date(),
    userQuery,
  };
}

export default function SmartCanvasFeed({
  history,
  onProjectClick,
  onLeadSubmit,
  onTryAskingClick,
  onClearHistory,
  isLoading
}: SmartCanvasFeedProps) {
  // No auto-scroll - let user control scrolling naturally

  // Format timestamp
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  // Get block label based on type
  const getBlockLabel = (type: string) => {
    const labels: Record<string, string> = {
      welcome: 'Welcome',
      properties: 'Property Results',
      comparison: 'Comparison',
      timeline: 'Timeline',
      stats: 'Statistics',
      developer: 'Developer Info',
      area_info: 'Area Information',
      lead_capture: 'Contact Form',
      map: 'Map View',
      mortgage: 'Mortgage Calculator',
      gallery: 'Gallery',
      investment: 'Investment Analysis',
      neighborhood: 'Neighborhood Guide',
      booking: 'Book Viewing',
      floorplan: 'Floor Plans',
      price_history: 'Price History',
    };
    return labels[type] || 'Content';
  };

  return (
    <div className="space-y-6 pb-4 pr-4">
      {/* Minimal Feed Header - Only shows when there's more than welcome */}
      {history.length > 1 && (
        <div className="flex items-center justify-between sticky top-0 bg-[#0A0A0A]/80 backdrop-blur-sm py-2 z-10 pr-2">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">
              {history.length - 1} result{history.length > 2 ? 's' : ''}
            </span>
          </div>
          {onClearHistory && (
            <button
              onClick={onClearHistory}
              className="flex items-center gap-1 text-[10px] text-gray-600 hover:text-red-400 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              Clear
            </button>
          )}
        </div>
      )}

      {/* Feed Content */}
      <div className="space-y-8">
        {history.map((item, index) => (
          <div
            key={item.id}
            className={`relative transition-all duration-500 ${
              index === history.length - 1 ? 'animate-in fade-in slide-in-from-bottom-4' : ''
            }`}
          >
            {/* Floating Block Header - Only for non-welcome items */}
            {item.type !== 'welcome' && (
              <div className="flex items-center gap-3 mb-4">
                {/* Query Indicator */}
                {item.userQuery && (
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#D4AF37] to-[#B8941E] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/20">
                      <span className="text-[10px] font-bold text-black">?</span>
                    </div>
                    <p className="text-sm text-gray-400 truncate">"{item.userQuery}"</p>
                  </div>
                )}

                {/* Timestamp & Type - Right aligned */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[10px] text-gray-600">{formatTime(item.timestamp)}</span>
                  <span className="text-[10px] font-medium text-emerald-500/70 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    {getBlockLabel(item.type)}
                  </span>
                </div>
              </div>
            )}

            {/* Canvas Content */}
            <div className="relative">
              <SmartCanvas
                action={item}
                onProjectClick={onProjectClick}
                onLeadSubmit={onLeadSubmit}
                onTryAskingClick={onTryAskingClick}
                isLoading={false}
              />
            </div>

            {/* Subtle divider between blocks */}
            {index < history.length - 1 && (
              <div className="mt-8 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            )}
          </div>
        ))}

        {/* Loading State - Minimal floating loader */}
        {isLoading && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-3 py-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#B8941E] rounded-full flex items-center justify-center shadow-lg shadow-amber-500/20">
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              </div>
              <div className="space-y-1.5">
                <div className="h-2.5 w-28 bg-white/10 rounded-full animate-pulse" />
                <div className="h-2 w-20 bg-white/5 rounded-full animate-pulse" />
              </div>
              <span className="ml-auto text-[10px] font-medium text-amber-500/70 bg-amber-500/10 px-2 py-0.5 rounded-full">
                Generating...
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
