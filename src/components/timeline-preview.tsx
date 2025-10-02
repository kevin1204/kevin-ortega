'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin, Building, ArrowRight, GraduationCap, Briefcase } from 'lucide-react';
import Link from 'next/link';
import type { TimelineEntry } from '@/lib/types';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';

interface TimelinePreviewProps {
  entries: TimelineEntry[];
}

export function TimelinePreview({ entries }: TimelinePreviewProps) {
  // Get the 4 most recent entries (2 experience, 2 education)
  const recentEntries = entries
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
    .slice(0, 4);

  const formatDate = (startDate: string, endDate: string | null) => {
    const start = new Date(startDate);
    const startFormatted = start.toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
    
    if (!endDate) {
      return `${startFormatted} - Present`;
    }
    
    const end = new Date(endDate);
    const endFormatted = end.toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
    
    return `${startFormatted} - ${endFormatted}`;
  };

  const getTypeIcon = (type: string) => {
    return type === 'education' ? (
      <GraduationCap className="h-4 w-4" />
    ) : (
      <Briefcase className="h-4 w-4" />
    );
  };

  const getTypeColor = (type: string) => {
    return type === 'education' ? 'bg-blue-500' : 'bg-green-500';
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={staggerItem}
            className="text-3xl font-bold font-display sm:text-4xl lg:text-5xl mb-4"
          >
            My <span className="gradient-text">Journey</span>
          </motion.h2>
          <motion.p 
            variants={staggerItem}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            A glimpse into my professional experience and educational background, 
            showcasing my growth in web development and business leadership.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-6"
        >
          {recentEntries.map((entry, index) => (
            <motion.div
              key={entry.id}
              variants={staggerItem}
              className="relative"
            >
              <div className="flex items-start gap-6">
                {/* Timeline dot */}
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 ${getTypeColor(entry.type)} rounded-full flex items-center justify-center text-white shadow-lg`}>
                    {getTypeIcon(entry.type)}
                  </div>
                </div>

                {/* Content */}
                <Card className="flex-1 group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={entry.type === 'education' ? 'default' : 'secondary'}>
                            {entry.type === 'education' ? 'Education' : 'Experience'}
                          </Badge>
                          {entry.tags && entry.tags[0] && (
                            <Badge variant="outline" className="text-xs">
                              {entry.tags[0]}
                            </Badge>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-semibold mb-2">{entry.title}</h3>
                        
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
                          <span>{formatDate(entry.startDate, entry.endDate)}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {entry.description[0]}
                    </p>
                  </CardContent>
                </Card>
              </div>

            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={staggerItem}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mt-12"
        >
          <Button asChild size="lg">
            <Link href="/timeline" className="group">
              View Full Timeline
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
