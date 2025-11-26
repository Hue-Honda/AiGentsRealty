import { Suspense } from 'react';
import { Sparkles } from 'lucide-react';
import ProjectsContent from './ProjectsContent';

function ProjectsLoading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <Sparkles className="w-16 h-16 text-[#00C775] animate-pulse mx-auto mb-4" />
          <div className="absolute inset-0 w-16 h-16 bg-[#00C775]/20 rounded-full blur-xl mx-auto animate-ping"></div>
        </div>
        <p className="text-gray-300 text-lg font-semibold">Loading Premium Projects...</p>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<ProjectsLoading />}>
      <ProjectsContent />
    </Suspense>
  );
}
