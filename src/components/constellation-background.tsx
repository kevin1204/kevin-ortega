'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
}

export function ConstellationBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  // Generate particles with fixed positions
  const generatedParticles = useMemo(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 25; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
      });
    }
    return newParticles;
  }, []);

  useEffect(() => {
    setParticles(generatedParticles);
  }, [generatedParticles]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Simple dots */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-500"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Animated connection lines */}
      {particles.map((particle, index) => {
        const nearbyParticles = particles.filter((p, i) => {
          if (i <= index) return false;
          const distance = Math.sqrt(
            Math.pow(particle.x - p.x, 2) + Math.pow(particle.y - p.y, 2)
          );
          return distance < 20;
        });

        return nearbyParticles.map((nearby) => {
          const distance = Math.sqrt(
            Math.pow(particle.x - nearby.x, 2) + Math.pow(particle.y - nearby.y, 2)
          );
          const opacity = Math.max(0, 0.6 - distance / 20);

          return (
            <motion.div
              key={`${particle.id}-${nearby.id}`}
              className="absolute bg-blue-500"
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
                opacity: [opacity * 0.3, opacity, opacity * 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        });
      })}
    </div>
  );
}
