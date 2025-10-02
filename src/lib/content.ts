import { promises as fs } from 'fs';
import path from 'path';
import type { SiteConfig, TimelineEntry, Certification, Project } from './types';

const contentDir = path.join(process.cwd(), 'content');

// Load site configuration
export async function getSiteConfig(): Promise<SiteConfig> {
  const filePath = path.join(contentDir, 'site.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

// Load timeline entries
export async function getTimelineEntries(): Promise<TimelineEntry[]> {
  const filePath = path.join(contentDir, 'timeline.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

// Load certifications
export async function getCertifications(): Promise<Certification[]> {
  const filePath = path.join(contentDir, 'certifications.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

// Load projects
export async function getProjects(): Promise<Project[]> {
  const filePath = path.join(contentDir, 'projects.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

// Get featured projects
export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter(project => project.featured);
}

// Get project by slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find(project => project.slug === slug) || null;
}

// Get certifications by issuer
export async function getCertificationsByIssuer(issuer: string): Promise<Certification[]> {
  const certifications = await getCertifications();
  return certifications.filter(cert => 
    cert.issuer.toLowerCase().includes(issuer.toLowerCase())
  );
}

// Get timeline entries by type
export async function getTimelineByType(type: 'education' | 'experience'): Promise<TimelineEntry[]> {
  const entries = await getTimelineEntries();
  return entries.filter(entry => entry.type === type);
}

// Calculate stats
export async function getStats() {
  const [timeline, certifications, projects] = await Promise.all([
    getTimelineEntries(),
    getCertifications(),
    getProjects()
  ]);

  // Calculate years of experience
  const experienceEntries = timeline.filter(entry => entry.type === 'experience');
  const startYear = Math.min(...experienceEntries.map(entry => new Date(entry.startDate).getFullYear()));
  const currentYear = new Date().getFullYear();
  const yearsExperience = currentYear - startYear;

  return {
    yearsExperience,
    certificationsCount: certifications.length,
    projectsShipped: 20 // Show 20+ for projects shipped
  };
}
