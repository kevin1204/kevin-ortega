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
    for (let i = 0; i < 60; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        brightness: Math.random() * 0.9 + 0.1,
      });
    }
    setStars(newStars);
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Bright white stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white shadow-lg"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            opacity: star.brightness,
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
          }}
          animate={{
            opacity: [star.brightness * 0.4, star.brightness, star.brightness * 0.4],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 2 + (star.id % 3),
            repeat: Infinity,
            delay: star.id * 0.05,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Bright white constellation lines */}
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
          const opacity = Math.max(0, 0.8 - distance / 25);

          return (
            <motion.div
              key={`${star.id}-${nearby.id}`}
              className="absolute bg-white"
              style={{
                left: `${Math.min(star.x, nearby.x)}%`,
                top: `${Math.min(star.y, nearby.y)}%`,
                width: `${Math.abs(star.x - nearby.x)}%`,
                height: `${Math.abs(star.y - nearby.y)}%`,
                opacity,
                transformOrigin: 'top left',
                transform: `rotate(${Math.atan2(nearby.y - star.y, nearby.x - star.x) * 180 / Math.PI}deg)`,
                boxShadow: '0 0 5px rgba(255, 255, 255, 0.6)',
              }}
              animate={{
                opacity: [opacity * 0.3, opacity, opacity * 0.3],
                scaleX: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3 + (star.id % 2),
                repeat: Infinity,
                ease: "easeInOut",
                delay: star.id * 0.03,
              }}
            />
          );
        });
      })}

      {/* Bright shooting stars */}
      <motion.div
        className="absolute w-2 h-24 bg-gradient-to-b from-white to-transparent opacity-0"
        style={{
          left: '20%',
          top: '30%',
          transform: 'rotate(45deg)',
          boxShadow: '0 0 20px rgba(255, 255, 255, 0.8)',
        }}
        animate={{
          opacity: [0, 1, 0],
          x: [0, 400],
          y: [0, 400],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 12,
          ease: "easeOut",
        }}
      />

      <motion.div
        className="absolute w-1 h-20 bg-gradient-to-b from-white to-transparent opacity-0"
        style={{
          left: '70%',
          top: '20%',
          transform: 'rotate(30deg)',
          boxShadow: '0 0 15px rgba(255, 255, 255, 0.6)',
        }}
        animate={{
          opacity: [0, 0.9, 0],
          x: [0, 300],
          y: [0, 300],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatDelay: 18,
          ease: "easeOut",
        }}
      />

      {/* Central bright glow */}
      <motion.div
        className="absolute w-80 h-80 bg-white rounded-full opacity-10 blur-3xl"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
