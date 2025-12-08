'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ByDeveloperRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the main developers page
    router.replace('/developers');
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#10B981] border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to Developers...</p>
      </div>
    </div>
  );
}
