import { LoadingSpinner, LoadingDots } from '@/components/loading';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        {/* Logo/Brand */}
        <div className="space-y-2">
          <div className="text-2xl font-bold font-display gradient-text">
            Kevin Ortega Rodriguez
          </div>
          <div className="text-sm text-muted-foreground">
            Full Stack Developer & Solutions Architect
          </div>
        </div>

        {/* Loading Animation */}
        <div className="flex flex-col items-center space-y-4">
          <LoadingSpinner size="lg" />
          <LoadingDots />
        </div>

        {/* Loading Text */}
        <div className="text-sm text-muted-foreground">
          Loading your experience...
        </div>
      </div>
    </div>
  );
}
