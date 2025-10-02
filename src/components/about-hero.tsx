'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { SiteConfig } from '@/lib/types';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';

interface AboutHeroProps {
  siteConfig: SiteConfig;
}

export function AboutHero({ siteConfig }: AboutHeroProps) {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center"
        >
          <motion.div variants={staggerItem}>
            <motion.div
              variants={fadeInUp}
              className="relative"
            >
              <Image
                src="/kevin.png"
                alt="Kevin Ortega Rodriguez"
                width={600}
                height={800}
                className="rounded-2xl shadow-2xl"
                priority
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary/20 to-transparent" />
            </motion.div>
          </motion.div>
          
          <motion.div variants={staggerItem} className="space-y-6">
            <motion.div variants={fadeInUp}>
              <h1 className="text-4xl font-bold font-display sm:text-5xl lg:text-6xl mb-6">
                About <span className="gradient-text">Me</span>
              </h1>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="space-y-4 text-lg text-muted-foreground">
              <p>
                I&apos;m a Full Stack Developer and Solutions Architect based in {siteConfig.links.location}. 
                As the Founder & CEO of{' '}
                <Link 
                  href={siteConfig.links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors font-semibold"
                >
                  WebLoft Studio
                </Link>
                , I architect comprehensive digital solutions 
                that drive business growth and operational efficiency.
              </p>
              
              <p>
                With extensive experience as a Technical Account Manager and Technical Support Specialist, 
                I bring a unique blend of technical expertise and client relationship management. 
                I understand both the technical challenges and business objectives, enabling me to 
                design solutions that truly solve real-world problems.
              </p>
              
              <p>
                My background spans from hands-on technical support to leading enterprise client portfolios, 
                giving me deep insights into system architecture, scalability, and user experience. 
                I specialize in creating end-to-end solutions that not only meet technical requirements 
                but also deliver measurable business value and exceptional user experiences.
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="pt-6 border-t border-border"
            >
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Location</h3>
                  <p className="text-muted-foreground">{siteConfig.links.location}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Status</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <p className="text-muted-foreground">Available for projects</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
