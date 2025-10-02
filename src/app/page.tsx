import { Hero } from '@/components/hero';
import { Stats } from '@/components/stats';
import { FeaturedProjects } from '@/components/featured-projects';
import { TimelinePreview } from '@/components/timeline-preview';
import { JsonLd } from '@/components/json-ld';
import { getSiteConfig, getStats, getFeaturedProjects, getTimelineEntries } from '@/lib/content';

export default async function Home() {
  const [siteConfig, stats, featuredProjects, timelineEntries] = await Promise.all([
    getSiteConfig(),
    getStats(),
    getFeaturedProjects(),
    getTimelineEntries(),
  ]);

  return (
    <>
      <JsonLd />
      <Hero siteConfig={siteConfig} />
      <Stats stats={stats} />
      <TimelinePreview entries={timelineEntries} />
      <FeaturedProjects projects={featuredProjects} />
    </>
  );
}
