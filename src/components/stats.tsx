'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useCountUp } from 'use-count-up';
import type { Stats as StatsType } from '@/lib/types';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';

interface StatsProps {
  stats: StatsType;
}

function StatCard({ label, value, suffix = '' }: { label: string; value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const { value: countValue } = useCountUp({
    isCounting: isInView,
    end: value,
    duration: 2,
    easing: 'easeOutCubic',
  });

  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      className="text-center"
    >
      <motion.div
        variants={fadeInUp}
        className="text-4xl font-bold font-display gradient-text mb-2"
      >
        {countValue}{suffix}
      </motion.div>
      <motion.p
        variants={fadeInUp}
        className="text-muted-foreground font-medium"
      >
        {label}
      </motion.p>
    </motion.div>
  );
}

export function Stats({ stats }: StatsProps) {
  return (
    <section className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-3"
        >
          <StatCard
            label="Years Experience"
            value={stats.yearsExperience}
            suffix="+"
          />
          <StatCard
            label="Certifications"
            value={stats.certificationsCount}
          />
          <StatCard
            label="Projects Shipped"
            value={stats.projectsShipped}
            suffix="+"
          />
        </motion.div>
      </div>
    </section>
  );
}
