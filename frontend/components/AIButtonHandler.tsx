'use client';

import { useEffect } from 'react';

// This component handles clicks on "AI Search" and "Ask Genie" buttons throughout the app
// It dispatches a custom event that the FloatingAIChat component listens to
export default function AIButtonHandler() {
  useEffect(() => {
    const handleAIButtonClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest('button');

      if (button) {
        // Ignore the floating chat toggle button itself
        if (button.getAttribute('data-floating-chat-toggle') === 'true') {
          return;
        }

        const buttonText = button.textContent?.trim() || '';

        // Check if button contains "AI Search", "Ask Genie", "Genie", or has sparkles icon
        const isAIButton =
          buttonText.includes('AI Search') ||
          buttonText.includes('Ask Genie') ||
          buttonText.includes('Genie') ||
          button.querySelector('[class*="sparkles"]');

        if (isAIButton) {
          e.preventDefault();
          // Dispatch custom event to open the floating chat
          window.dispatchEvent(new CustomEvent('openFloatingChat'));
        }
      }
    };

    document.addEventListener('click', handleAIButtonClick);

    return () => {
      document.removeEventListener('click', handleAIButtonClick);
    };
  }, []);

  return null; // This component doesn't render anything
}
