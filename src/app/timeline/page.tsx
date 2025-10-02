import { AnimatedTimeline } from '@/components/animated-timeline';
import { getTimelineEntries } from '@/lib/content';

export const metadata = {
  title: 'Timeline - Kevin Ortega Rodriguez',
  description: 'Explore Kevin Ortega Rodriguez\'s professional journey, education, and career milestones.',
};

export default async function Timeline() {
  const timelineEntries = await getTimelineEntries();

  return (
    <div className="py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold font-display sm:text-5xl lg:text-6xl mb-4">
            My <span className="gradient-text">Journey</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A timeline of my professional experience and educational background, 
            showcasing my growth and expertise in web development and business leadership.
          </p>
        </div>
        
        <AnimatedTimeline entries={timelineEntries} />
      </div>
    </div>
  );
}
