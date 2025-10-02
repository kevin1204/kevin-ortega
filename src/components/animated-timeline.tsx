'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Calendar, MapPin, Building, GraduationCap, Briefcase } from 'lucide-react';
import type { TimelineEntry } from '@/lib/types';
import { timelineItemVariants, timelineLineVariants, staggerContainer, staggerItem } from '@/lib/animations';

interface AnimatedTimelineProps {
  entries: TimelineEntry[];
}

type TimelineFilter = 'all' | 'education' | 'experience';

export function AnimatedTimeline({ entries }: AnimatedTimelineProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<TimelineFilter>('all');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Sort entries by start date (newest first) and filter
  const filteredEntries = useMemo(() => {
    let filtered = entries;
    
    if (activeFilter !== 'all') {
      filtered = entries.filter(entry => entry.type === activeFilter);
    }
    
    // Sort by start date (newest first)
    return filtered.sort((a, b) => {
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);
      return dateB.getTime() - dateA.getTime();
    });
  }, [entries, activeFilter]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  const formatDateRange = (startDate: string, endDate: string | null) => {
    const start = formatDate(startDate);
    const end = endDate ? formatDate(endDate) : 'Present';
    return `${start} - ${end}`;
  };

  return (
    <div className="space-y-8">
      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-12">
        <Button
          variant={activeFilter === 'all' ? 'default' : 'outline'}
          onClick={() => setActiveFilter('all')}
          className="flex items-center gap-2"
        >
          <span>All</span>
        </Button>
        <Button
          variant={activeFilter === 'education' ? 'default' : 'outline'}
          onClick={() => setActiveFilter('education')}
          className="flex items-center gap-2"
        >
          <GraduationCap className="h-4 w-4" />
          <span>Education</span>
        </Button>
        <Button
          variant={activeFilter === 'experience' ? 'default' : 'outline'}
          onClick={() => setActiveFilter('experience')}
          className="flex items-center gap-2"
        >
          <Briefcase className="h-4 w-4" />
          <span>Work Experience</span>
        </Button>
      </div>

      <div ref={ref} className="relative">
        {/* Timeline line */}
        <motion.div
          variants={timelineLineVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="absolute left-8 top-0 bottom-0 w-px bg-border/50"
          style={{ transformOrigin: 'top' }}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8"
        >
          {filteredEntries.map((entry, index) => (
          <motion.div
            key={entry.id}
            variants={staggerItem}
            className="relative flex items-start"
          >
            {/* Timeline dot */}
            <motion.div
              variants={timelineItemVariants}
              className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10"
            />

            {/* Content */}
            <motion.div
              variants={timelineItemVariants}
              className="ml-16 flex-1"
            >
              <Card 
                className={`group cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  expandedItem === entry.id ? 'shadow-lg border-primary/50' : ''
                }`}
                onClick={() => setExpandedItem(expandedItem === entry.id ? null : entry.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge 
                          variant={entry.type === 'education' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {entry.type === 'education' ? 'Education' : 'Experience'}
                        </Badge>
                        {entry.tags && entry.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-1">{entry.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          <span>{entry.organization}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{entry.location}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDateRange(entry.startDate, entry.endDate)}</span>
                      </div>
                    </div>
                    
                    {entry.externalLink && (
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
                        <a href={entry.externalLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>

                  {/* Expanded content */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedItem === entry.id ? 'auto' : 0,
                      opacity: expandedItem === entry.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-border">
                      <ul className="space-y-2">
                        {entry.description.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {entry.tags && entry.tags.length > 2 && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <div className="flex flex-wrap gap-2">
                            {entry.tags.slice(2).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
      </div>
    </div>
  );
}
