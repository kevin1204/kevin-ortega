'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ConstellationBackgroundProps {
  className?: string;
}

export function ConstellationBackground({ className = '' }: ConstellationBackgroundProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);

  useEffect(() => {
    // Generate particles
    const newParticles = [];
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Animated particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Connection lines */}
      {particles.map((particle, index) => {
        const nearbyParticles = particles.filter((p, i) => {
          if (i <= index) return false;
          const distance = Math.sqrt(
            Math.pow(particle.x - p.x, 2) + Math.pow(particle.y - p.y, 2)
          );
          return distance < 15;
        });

        return nearbyParticles.map((nearby) => {
          const distance = Math.sqrt(
            Math.pow(particle.x - nearby.x, 2) + Math.pow(particle.y - nearby.y, 2)
          );
          const opacity = Math.max(0, 0.6 - distance / 15);

          return (
            <motion.div
              key={`${particle.id}-${nearby.id}`}
              className="absolute bg-gradient-to-r from-primary/20 to-accent/20"
              style={{
                left: `${Math.min(particle.x, nearby.x)}%`,
                top: `${Math.min(particle.y, nearby.y)}%`,
                width: `${Math.abs(particle.x - nearby.x)}%`,
                height: `${Math.abs(particle.y - nearby.y)}%`,
                opacity,
                transformOrigin: 'top left',
                transform: `rotate(${Math.atan2(nearby.y - particle.y, nearby.x - particle.x) * 180 / Math.PI}deg)`,
              }}
              animate={{
                opacity: [opacity * 0.5, opacity, opacity * 0.5],
              }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        });
      })}

      {/* Mouse interaction effect */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 200,
          height: 200,
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(20px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
