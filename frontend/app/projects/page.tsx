import { Suspense } from 'react';
import { Sparkles } from 'lucide-react';
import ProjectsContent from './ProjectsContent';

function ProjectsLoading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 border-2 border-[#0A0A0A] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-[#10B981] animate-pulse" />
          </div>
        </div>
        <p className="text-gray-600 text-lg font-semibold">Loading Premium Projects...</p>
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
