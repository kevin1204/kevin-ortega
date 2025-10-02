'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { 
  fadeInUp, 
  staggerContainer, 
  staggerItem,
  skillBarVariants,
  skillIconVariants,
  skillCategoryVariants
} from '@/lib/animations';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Code, Database, Users, Briefcase } from 'lucide-react';

const skills = [
  // Frontend
  { 
    category: 'Frontend Development', 
    icon: Code,
    skills: [
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 90 },
      { name: 'TypeScript', level: 88 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Framer Motion', level: 85 }
    ]
  },
  // Backend
  { 
    category: 'Backend & Architecture', 
    icon: Database,
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Express', level: 88 },
      { name: 'MongoDB', level: 85 },
      { name: 'PostgreSQL', level: 82 },
      { name: 'REST APIs', level: 95 },
      { name: 'System Design', level: 88 }
    ]
  },
  // Technical Leadership
  { 
    category: 'Technical Leadership', 
    icon: Users,
    skills: [
      { name: 'Solutions Architecture', level: 92 },
      { name: 'Technical Account Management', level: 90 },
      { name: 'System Integration', level: 88 },
      { name: 'API Design', level: 90 },
      { name: 'Performance Optimization', level: 85 }
    ]
  },
  // Business & Management
  { 
    category: 'Business & Management', 
    icon: Briefcase,
    skills: [
      { name: 'Project Management', level: 88 },
      { name: 'Client Relations', level: 92 },
      { name: 'Team Leadership', level: 85 },
      { name: 'Strategic Planning', level: 88 },
      { name: 'Technical Consulting', level: 90 }
    ]
  },
];

export function Skills() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
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
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {skills.map((skillGroup) => {
            const IconComponent = skillGroup.icon;
            const isExpanded = expandedCategory === skillGroup.category;
            
            return (
              <motion.div key={skillGroup.category} variants={staggerItem}>
                <motion.div
                  variants={fadeInUp}
                  className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden"
                >
                  {/* Category Header */}
                  <motion.div
                    className="p-6 cursor-pointer"
                    onClick={() => toggleCategory(skillGroup.category)}
                    whileHover={{ backgroundColor: "hsl(var(--muted))" }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <motion.div
                          variants={skillIconVariants}
                          initial="hidden"
                          whileInView="visible"
                          className="p-2 bg-primary/10 rounded-lg"
                        >
                          <IconComponent className="h-5 w-5 text-primary" />
                        </motion.div>
                        <h3 className="text-xl font-semibold">
                          {skillGroup.category}
                        </h3>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Expandable Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        variants={skillCategoryVariants}
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        className="px-6 pb-6"
                      >
                        <div className="space-y-4">
                          {skillGroup.skills.map((skill, index) => (
                            <motion.div
                              key={skill.name}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="space-y-2"
                            >
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">{skill.name}</span>
                                <span className="text-xs text-muted-foreground">{skill.level}%</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                                <motion.div
                                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                                  variants={skillBarVariants}
                                  custom={skill.level}
                                  initial="hidden"
                                  whileInView="visible"
                                  viewport={{ once: true }}
                                  transition={{ delay: index * 0.1 + 0.3 }}
                                />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Compact View (when collapsed) */}
                  {!isExpanded && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="px-6 pb-6"
                    >
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.skills.map((skill, index) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Badge
                              variant="secondary"
                              className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                            >
                              {skill.name}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
