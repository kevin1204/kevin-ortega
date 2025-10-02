// Content types for the portfolio website

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    website?: string;
  };
}

export interface TimelineEntry {
  id: string;
  type: 'education' | 'experience';
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string | null; // null for current positions
  description: string[];
  externalLink?: string;
  tags?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issuedOn: string;
  certificateUrl: string;
  logo: string;
  tags: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  role: string;
  summary: string;
  description?: string;
  cover: string;
  gallery?: string[];
  links: {
    live?: string;
    github?: string;
    caseStudy?: string;
  };
  tags: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
  featured?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export interface Stats {
  yearsExperience: number;
  certificationsCount: number;
  projectsShipped: number;
}

// Navigation types
export interface NavItem {
  title: string;
  href: string;
  description?: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

// Animation variants
export interface AnimationVariants {
  hidden: {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  visible: {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
    transition?: {
      duration?: number;
      delay?: number;
      ease?: string;
    };
  };
}
