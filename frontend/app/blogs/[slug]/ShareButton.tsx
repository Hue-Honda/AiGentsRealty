// =============================================================================
// SHARE BUTTON COMPONENT
// =============================================================================
// Client component for the copy link button with onClick handler.
// =============================================================================

'use client';

import { Link2 } from 'lucide-react';

interface ShareButtonProps {
  url: string;
}

export default function ShareButton({ url }: ShareButtonProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      // Optional: Add toast notification here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#00C775]/20 hover:text-[#00C775] transition-all"
      title="Copy link"
    >
      <Link2 className="w-4 h-4" />
    </button>
  );
}
