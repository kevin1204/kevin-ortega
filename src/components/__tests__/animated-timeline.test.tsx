import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AnimatedTimeline } from '@/components/animated-timeline';
import type { TimelineEntry } from '@/lib/types';

const mockTimelineEntries: TimelineEntry[] = [
  {
    id: 'test-1',
    type: 'education',
    title: 'Test University',
    organization: 'Test Org',
    location: 'Test City',
    startDate: '2020-01-01',
    endDate: '2024-01-01',
    description: ['Test description'],
    tags: ['Test Tag'],
  },
  {
    id: 'test-2',
    type: 'experience',
    title: 'Test Job',
    organization: 'Test Company',
    location: 'Test Location',
    startDate: '2024-01-01',
    endDate: null,
    description: ['Test job description'],
    tags: ['Work', 'Experience'],
  },
];

describe('AnimatedTimeline', () => {
  it('renders timeline entries', () => {
    render(<AnimatedTimeline entries={mockTimelineEntries} />);
    
    expect(screen.getByText('Test University')).toBeInTheDocument();
    expect(screen.getByText('Test Job')).toBeInTheDocument();
    expect(screen.getByText('Test Org')).toBeInTheDocument();
    expect(screen.getByText('Test Company')).toBeInTheDocument();
  });

  it('renders education and experience badges', () => {
    render(<AnimatedTimeline entries={mockTimelineEntries} />);
    
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
  });

  it('renders tags correctly', () => {
    render(<AnimatedTimeline entries={mockTimelineEntries} />);
    
    expect(screen.getByText('Test Tag')).toBeInTheDocument();
    expect(screen.getByText('Work')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
  });
});
