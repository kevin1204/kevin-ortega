'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface ConstellationBackgroundProps {
  className?: string;
}

export function ConstellationBackground({ className = '' }: ConstellationBackgroundProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  // Generate particles with fixed animation values to prevent re-renders
  const generatedParticles = useMemo(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
      });
    }
    return newParticles;
  }, []);

  useEffect(() => {
    setParticles(generatedParticles);
  }, [generatedParticles]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Animated particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: 'hsl(var(--primary))',
            boxShadow: '0 0 10px hsl(var(--primary))',
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
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
          return distance < 20;
        });

        return nearbyParticles.map((nearby) => {
          const distance = Math.sqrt(
            Math.pow(particle.x - nearby.x, 2) + Math.pow(particle.y - nearby.y, 2)
          );
          const opacity = Math.max(0, 0.8 - distance / 20);

          return (
            <motion.div
              key={`${particle.id}-${nearby.id}`}
              className="absolute"
              style={{
                left: `${Math.min(particle.x, nearby.x)}%`,
                top: `${Math.min(particle.y, nearby.y)}%`,
                width: `${Math.abs(particle.x - nearby.x)}%`,
                height: `${Math.abs(particle.y - nearby.y)}%`,
                opacity,
                background: 'linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)',
                transformOrigin: 'top left',
                transform: `rotate(${Math.atan2(nearby.y - particle.y, nearby.x - particle.x) * 180 / Math.PI}deg)`,
                boxShadow: '0 0 5px hsl(var(--primary))',
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

      {/* Central glow effect */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 300,
          height: 300,
          background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(30px)',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
