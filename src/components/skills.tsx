'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';

const skills = [
  // Frontend
  { category: 'Frontend Development', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  // Backend
  { category: 'Backend & Architecture', skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs', 'System Design'] },
  // Technical Leadership
  { category: 'Technical Leadership', skills: ['Solutions Architecture', 'Technical Account Management', 'System Integration', 'API Design', 'Performance Optimization'] },
  // Business & Management
  { category: 'Business & Management', skills: ['Project Management', 'Client Relations', 'Team Leadership', 'Strategic Planning', 'Technical Consulting'] },
];

export function Skills() {
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
            Skills & Expertise
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            A comprehensive toolkit spanning full-stack development, solutions architecture, 
            technical leadership, and business management.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          {skills.map((skillGroup) => (
            <motion.div key={skillGroup.category} variants={staggerItem}>
              <motion.div
                variants={fadeInUp}
                className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50"
              >
                <h3 className="text-xl font-semibold mb-4 text-center">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {skillGroup.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
