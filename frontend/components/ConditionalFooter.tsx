'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

// Pages where footer should be hidden
const noFooterPages = ['/geniev2', '/genie'];

export default function ConditionalFooter() {
  const pathname = usePathname();

  // Hide footer on specified pages
  if (noFooterPages.includes(pathname)) {
    return null;
  }

  return <Footer />;
}
