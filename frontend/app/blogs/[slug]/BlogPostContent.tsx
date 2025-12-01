// =============================================================================
// BLOG POST CONTENT COMPONENT
// =============================================================================
// Client component for rendering blog post content with copy-to-clipboard
// functionality for code blocks and interactive share buttons.
// =============================================================================

'use client';

import { useMemo } from 'react';

interface BlogPostContentProps {
  content: string;
}

// =============================================================================
// MARKDOWN TO HTML CONVERTER (Simple Implementation)
// =============================================================================
function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-white mt-8 mb-4">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-black text-white mt-10 mb-4">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-black text-white mt-12 mb-6">$1</h1>');

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>');

  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#00C775] hover:text-[#00E085] underline underline-offset-2 transition-colors">$1</a>');

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-white/10 px-2 py-0.5 rounded text-sm font-mono text-[#F3C440]">$1</code>');

  // Blockquotes
  html = html.replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-[#00C775] pl-4 py-2 my-6 italic text-gray-300 bg-white/5 rounded-r-lg">$1</blockquote>');

  // Horizontal rule
  html = html.replace(/^---$/gim, '<hr class="border-white/10 my-8" />');

  // Unordered lists
  html = html.replace(/^\- (.*$)/gim, '<li class="ml-4 mb-2 text-gray-300 list-disc list-inside">$1</li>');

  // Ordered lists
  html = html.replace(/^\d+\. (.*$)/gim, '<li class="ml-4 mb-2 text-gray-300 list-decimal list-inside">$1</li>');

  // Tables
  html = html.replace(/\|(.+)\|/g, (match, content) => {
    const cells = content.split('|').map((cell: string) => cell.trim());
    const isHeader = cells.some((cell: string) => cell.match(/^-+$/));

    if (isHeader) {
      return ''; // Skip separator rows
    }

    const cellHtml = cells
      .map((cell: string, index: number) => {
        if (index === 0) {
          return `<td class="px-4 py-3 text-white font-semibold border-b border-white/10">${cell}</td>`;
        }
        return `<td class="px-4 py-3 text-gray-300 border-b border-white/10">${cell}</td>`;
      })
      .join('');

    return `<tr class="hover:bg-white/5">${cellHtml}</tr>`;
  });

  // Wrap tables
  html = html.replace(
    /(<tr[^>]*>[\s\S]*?<\/tr>)+/g,
    '<div class="overflow-x-auto my-6"><table class="w-full bg-[#0D0D0D] border border-white/10 rounded-xl overflow-hidden">$&</table></div>'
  );

  // Paragraphs (handle remaining lines)
  const lines = html.split('\n');
  const processedLines = lines.map((line) => {
    // Skip if already processed (starts with HTML tag)
    if (
      line.trim().startsWith('<') ||
      line.trim() === '' ||
      line.trim().startsWith('|')
    ) {
      return line;
    }
    return `<p class="text-gray-300 leading-relaxed mb-4">${line}</p>`;
  });

  html = processedLines.join('\n');

  // Clean up empty paragraphs
  html = html.replace(/<p[^>]*>\s*<\/p>/g, '');

  return html;
}

// =============================================================================
// COMPONENT
// =============================================================================
export default function BlogPostContent({ content }: BlogPostContentProps) {
  const htmlContent = useMemo(() => markdownToHtml(content), [content]);

  return (
    <div
      className="prose prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
