import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProjectCard } from '@/components/project-card';
import type { Project } from '@/lib/types';

const mockProject: Project = {
  id: 'test-project',
  slug: 'test-project',
  title: 'Test Project',
  role: 'Developer',
  summary: 'A test project for demonstration',
  cover: 'https://example.com/image.jpg',
  links: {
    live: 'https://example.com',
    github: 'https://github.com/example',
  },
  tags: ['React', 'TypeScript'],
  featured: true,
};

describe('ProjectCard', () => {
  it('renders project information', () => {
    render(<ProjectCard project={mockProject} />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText('A test project for demonstration')).toBeInTheDocument();
  });

  it('renders project tags', () => {
    render(<ProjectCard project={mockProject} />);
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders featured badge when project is featured', () => {
    render(<ProjectCard project={mockProject} />);
    
    expect(screen.getByText('Featured')).toBeInTheDocument();
  });

  it('renders project links', () => {
    render(<ProjectCard project={mockProject} />);
    
    expect(screen.getByText('Live Site')).toBeInTheDocument();
    expect(screen.getByText('Code')).toBeInTheDocument();
  });
});
