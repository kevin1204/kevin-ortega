'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Calendar, MapPin, Building, GraduationCap, Briefcase } from 'lucide-react';
import type { TimelineEntry } from '@/lib/types';
import { 
  timelineLineVariants, 
  timelineDotVariants,
  timelineConnectionVariants,
  timelineExpandVariants,
  staggerContainer, 
  scrollRevealItem,
  depthVariants
} from '@/lib/animations';
import { MagneticCard } from '@/components/magnetic-card';

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

      <div ref={ref} className="relative overflow-visible">
        {/* Enhanced Timeline line with gradient */}
        <motion.div
          variants={timelineLineVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary opacity-60"
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
            variants={scrollRevealItem}
            className="relative flex items-start"
          >
            {/* Enhanced Timeline dot with glow effect */}
            <motion.div
              variants={timelineDotVariants}
              className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10"
              whileHover={{ 
                scale: 1.2,
                boxShadow: "0 0 20px hsl(var(--primary))",
                transition: { duration: 0.2 }
              }}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-primary rounded-full opacity-30"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Animated connection line to next item */}
            {index < filteredEntries.length - 1 && (
              <motion.div
                variants={timelineConnectionVariants}
                className="absolute left-8 top-4 w-px h-8 bg-gradient-to-b from-primary/60 to-transparent"
                style={{ transformOrigin: 'top' }}
              />
            )}

            {/* Content */}
            <motion.div
              variants={scrollRevealItem}
              className="ml-16 flex-1 timeline-card-container"
            >
              <MagneticCard intensity={0.1} className="h-full">
                <motion.div
                  variants={depthVariants}
                  initial="shallow"
                  whileHover="deep"
                >
                  <Card 
                    className={`group cursor-pointer transition-all duration-300 ${
                      expandedItem === entry.id ? 'shadow-lg border-primary/50' : ''
                    }`}
                    onClick={() => setExpandedItem(expandedItem === entry.id ? null : entry.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Badge 
                                variant={entry.type === 'education' ? 'default' : 'secondary'}
                                className="text-xs"
                              >
                                {entry.type === 'education' ? 'Education' : 'Experience'}
                              </Badge>
                            </motion.div>
                            {entry.tags && entry.tags.slice(0, 2).map((tag, tagIndex) => (
                              <motion.div
                                key={tag}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: tagIndex * 0.1 }}
                              >
                                <Badge variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                          
                          <motion.h3 
                            className="text-xl font-semibold mb-1"
                            whileHover={{ color: "hsl(var(--primary))" }}
                            transition={{ duration: 0.2 }}
                          >
                            {entry.title}
                          </motion.h3>
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
                          >
                            <a href={entry.externalLink} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>

                      {/* Enhanced expanded content */}
                      <motion.div
                        variants={timelineExpandVariants}
                        initial="collapsed"
                        animate={expandedItem === entry.id ? "expanded" : "collapsed"}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-border">
                          <ul className="space-y-2">
                            {entry.description.map((item, idx) => (
                              <motion.li 
                                key={idx} 
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                              >
                                <motion.span 
                                  className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
                                  animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.6, 1, 0.6],
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: idx * 0.2,
                                    ease: "easeInOut"
                                  }}
                                />
                                <span>{item}</span>
                              </motion.li>
                            ))}
                          </ul>
                          
                          {entry.tags && entry.tags.length > 2 && (
                            <div className="mt-4 pt-4 border-t border-border">
                              <div className="flex flex-wrap gap-2">
                                {entry.tags.slice(2).map((tag, tagIndex) => (
                                  <motion.div
                                    key={tag}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: tagIndex * 0.1 }}
                                  >
                                    <Badge variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </MagneticCard>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
      </div>
    </div>
  );
}
