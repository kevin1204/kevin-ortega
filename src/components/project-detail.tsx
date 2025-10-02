'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink, Calendar, User } from 'lucide-react';
import type { Project } from '@/lib/types';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div className="py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Back button */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <Button asChild variant="ghost">
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Hero section */}
          <motion.div variants={staggerItem}>
            <div className="relative overflow-hidden rounded-2xl mb-8">
              <Image
                src={project.cover}
                alt={project.title}
                width={1200}
                height={600}
                className="w-full h-96 object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h1 className="text-4xl font-bold font-display text-white mb-2">
                  {project.title}
                </h1>
                <div className="flex items-center gap-4 text-white/80">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{project.role}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Project links */}
          <motion.div variants={staggerItem}>
            <div className="flex flex-wrap gap-4">
              {project.links.live && (
                <Button asChild size="lg">
                  <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Live Site
                  </a>
                </Button>
              )}
              {project.links.github && (
                <Button asChild variant="outline" size="lg">
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Source Code
                  </a>
                </Button>
              )}
              {project.links.caseStudy && (
                <Button asChild variant="outline" size="lg">
                  <a href={project.links.caseStudy} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Case Study
                  </a>
                </Button>
              )}
            </div>
          </motion.div>

          {/* Project description */}
          <motion.div variants={staggerItem}>
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {project.description || project.summary}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <motion.div variants={staggerItem}>
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-6">Key Metrics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {project.metrics.map((metric, index) => (
                      <div key={index} className="text-center">
                        <div className="text-3xl font-bold font-display gradient-text mb-2">
                          {metric.value}
                        </div>
                        <div className="text-muted-foreground">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <motion.div variants={staggerItem}>
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-6">Project Gallery</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.gallery.map((image, index) => (
                      <div key={index} className="relative overflow-hidden rounded-lg">
                        <Image
                          src={image}
                          alt={`${project.title} screenshot ${index + 1}`}
                          width={600}
                          height={400}
                          className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Technologies */}
          <motion.div variants={staggerItem}>
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-6">Technologies Used</h2>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
