import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="bg-slate-800 py-3 px-4">
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link
              href="/"
              className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
            >
              <Home className="w-4 h-4" />
            </Link>
          </li>

          {items.map((item, index) => (
            <li key={index} className="flex items-center space-x-2">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              {item.href && index < items.length - 1 ? (
                <Link
                  href={item.href}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-300">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
