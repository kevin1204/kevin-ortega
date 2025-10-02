import { AboutHero } from '@/components/about-hero';
import { Skills } from '@/components/skills';
import { ResumeDownload } from '@/components/resume-download';
import { getSiteConfig } from '@/lib/content';

export const metadata = {
  title: 'About - Kevin Ortega Rodriguez',
  description: 'Learn more about Kevin Ortega Rodriguez, Web Developer and Founder & CEO of WebLoft Studio.',
};

export default async function About() {
  const siteConfig = await getSiteConfig();

  return (
    <>
      <AboutHero siteConfig={siteConfig} />
      <Skills />
      <ResumeDownload />
    </>
  );
}
