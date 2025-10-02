'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  brightness: number;
}

export function ConstellationBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Generate stars only on client side to avoid hydration mismatch
    const newStars: Star[] = [];
    for (let i = 0; i < 40; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5,
        brightness: Math.random() * 0.7 + 0.3,
      });
    }
    setStars(newStars);
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Night sky stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            opacity: star.brightness,
          }}
          animate={{
            opacity: [star.brightness * 0.3, star.brightness, star.brightness * 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2 + (star.id % 3),
            repeat: Infinity,
            delay: star.id * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Flowing constellation lines */}
      {stars.map((star, index) => {
        const nearbyStars = stars.filter((s, i) => {
          if (i <= index) return false;
          const distance = Math.sqrt(
            Math.pow(star.x - s.x, 2) + Math.pow(star.y - s.y, 2)
          );
          return distance < 25;
        });

        return nearbyStars.map((nearby) => {
          const distance = Math.sqrt(
            Math.pow(star.x - nearby.x, 2) + Math.pow(star.y - nearby.y, 2)
          );
          const opacity = Math.max(0, 0.4 - distance / 25);

          return (
            <motion.div
              key={`${star.id}-${nearby.id}`}
              className="absolute bg-blue-300"
              style={{
                left: `${Math.min(star.x, nearby.x)}%`,
                top: `${Math.min(star.y, nearby.y)}%`,
                width: `${Math.abs(star.x - nearby.x)}%`,
                height: `${Math.abs(star.y - nearby.y)}%`,
                opacity,
                transformOrigin: 'top left',
                transform: `rotate(${Math.atan2(nearby.y - star.y, nearby.x - star.x) * 180 / Math.PI}deg)`,
              }}
              animate={{
                opacity: [opacity * 0.2, opacity, opacity * 0.2],
                scaleX: [0.8, 1.1, 0.8],
              }}
              transition={{
                duration: 3 + (star.id % 2),
                repeat: Infinity,
                ease: "easeInOut",
                delay: star.id * 0.05,
              }}
            />
          );
        });
      })}

      {/* Gentle flowing background animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10"
        animate={{
          background: [
            'linear-gradient(45deg, rgba(30, 58, 138, 0.1) 0%, transparent 50%, rgba(88, 28, 135, 0.1) 100%)',
            'linear-gradient(135deg, rgba(88, 28, 135, 0.1) 0%, transparent 50%, rgba(30, 58, 138, 0.1) 100%)',
            'linear-gradient(45deg, rgba(30, 58, 138, 0.1) 0%, transparent 50%, rgba(88, 28, 135, 0.1) 100%)',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle shooting star effect */}
      <motion.div
        className="absolute w-1 h-20 bg-gradient-to-b from-white to-transparent opacity-0"
        style={{
          left: '10%',
          top: '20%',
          transform: 'rotate(45deg)',
        }}
        animate={{
          opacity: [0, 1, 0],
          x: [0, 200],
          y: [0, 200],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 8,
          ease: "easeOut",
        }}
      />

      <motion.div
        className="absolute w-1 h-16 bg-gradient-to-b from-white to-transparent opacity-0"
        style={{
          left: '70%',
          top: '30%',
          transform: 'rotate(30deg)',
        }}
        animate={{
          opacity: [0, 0.8, 0],
          x: [0, 150],
          y: [0, 150],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 12,
          ease: "easeOut",
        }}
      />
    </div>
  );
}
