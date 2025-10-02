'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';

export function ResumeDownload() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <motion.div
            variants={staggerItem}
            className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-12 border border-border/50"
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-2xl mb-4">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold font-display sm:text-4xl mb-4">
                Download My Resume
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get a comprehensive overview of my experience, education, and skills in a 
                professional PDF format.
              </p>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Button asChild size="lg" className="group">
                <a 
                  href="/resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  download="Kevin-Ortega-Rodriguez-Resume.pdf"
                >
                  <Download className="mr-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
                  Download PDF Resume
                </a>
              </Button>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="mt-6 text-sm text-muted-foreground"
            >
              <p>Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
