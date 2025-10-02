'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
}

export function ConstellationBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Generate stars only on client side
    const newStars: Star[] = [];
    for (let i = 0; i < 80; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
      });
    }
    setStars(newStars);
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-black" />
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-black">
      {/* White stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Constellation lines */}
      {stars.map((star, index) => {
        const nearbyStars = stars.filter((s, i) => {
          if (i <= index) return false;
          const distance = Math.sqrt(
            Math.pow(star.x - s.x, 2) + Math.pow(star.y - s.y, 2)
          );
          return distance < 20;
        });

        return nearbyStars.map((nearby) => {
          const distance = Math.sqrt(
            Math.pow(star.x - nearby.x, 2) + Math.pow(star.y - nearby.y, 2)
          );
          const opacity = Math.max(0, 0.6 - distance / 20);

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
