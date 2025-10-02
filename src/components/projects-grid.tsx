'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, ArrowRight } from 'lucide-react';
import type { Project } from '@/lib/types';
import { 
  staggerContainer, 
  cardStaggerVariants,
  depthVariants
} from '@/lib/animations';
import { LoadingGrid } from '@/components/loading';
import { MagneticCard } from '@/components/magnetic-card';
import { RippleButton } from '@/components/ripple-button';

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {

  return (
    <div className="space-y-8">
      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {projects.length} projects
      </div>

      {/* Projects Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
          {projects.map((project, index) => (
          <motion.div 
            key={project.id} 
            custom={index}
            variants={cardStaggerVariants}
            whileHover="hover"
            initial="hidden"
            animate="visible"
            className="group"
          >
            <MagneticCard intensity={0.15} className="h-full">
              <motion.div
                variants={depthVariants}
                initial="shallow"
                whileHover="deep"
                className="h-full"
              >
                <Card className="group h-full overflow-hidden transition-all duration-300">
                  <CardContent className="p-0 h-full flex flex-col">
                    <div className="relative overflow-hidden flex-shrink-0">
                      <Image
                        src={project.cover}
                        alt={project.title}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {project.featured && (
                          <motion.div
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Badge className="bg-primary text-primary-foreground">
                              Featured
                            </Badge>
                          </motion.div>
                        )}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex gap-2">
                          {project.links.live && (
                            <RippleButton size="sm" asChild>
                              <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-3 w-3" />
                                Live
                              </a>
                            </RippleButton>
                          )}
                          {project.links.github && (
                            <RippleButton size="sm" variant="outline" asChild>
                              <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-3 w-3" />
                                Code
                              </a>
                            </RippleButton>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="mb-3">
                        <motion.h3 
                          className="text-xl font-semibold mb-1"
                          whileHover={{ color: "hsl(var(--primary))" }}
                          transition={{ duration: 0.2 }}
                        >
                          {project.title}
                        </motion.h3>
                        <p className="text-sm text-muted-foreground">{project.role}</p>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 line-clamp-2 flex-1">
                        {project.summary}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, tagIndex) => (
                          <motion.div
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: tagIndex * 0.1 }}
                          >
                            <Badge variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                      
                      <RippleButton asChild variant="ghost" className="w-full group/link">
                        <Link href={`/projects/${project.slug}`}>
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                      </RippleButton>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </MagneticCard>
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
}
