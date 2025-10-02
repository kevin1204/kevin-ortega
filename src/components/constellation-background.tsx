'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ConstellationBackgroundProps {
  className?: string;
}

export function ConstellationBackground({ className = '' }: ConstellationBackgroundProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Create a simple constellation with fixed positions
  const stars = [
    { id: 1, x: 10, y: 20, size: 3 },
    { id: 2, x: 25, y: 15, size: 2 },
    { id: 3, x: 40, y: 25, size: 4 },
    { id: 4, x: 60, y: 10, size: 2 },
    { id: 5, x: 80, y: 30, size: 3 },
    { id: 6, x: 15, y: 50, size: 2 },
    { id: 7, x: 35, y: 60, size: 3 },
    { id: 8, x: 55, y: 45, size: 2 },
    { id: 9, x: 75, y: 55, size: 4 },
    { id: 10, x: 90, y: 70, size: 2 },
    { id: 11, x: 20, y: 80, size: 3 },
    { id: 12, x: 45, y: 85, size: 2 },
    { id: 13, x: 70, y: 75, size: 3 },
    { id: 14, x: 85, y: 90, size: 2 },
    { id: 15, x: 5, y: 70, size: 4 },
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-blue-400"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            boxShadow: '0 0 10px #60a5fa',
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2 + Math.random(),
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Moving connection lines */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Line 1 */}
        <motion.div
          className="absolute bg-gradient-to-r from-blue-400 to-purple-400"
          style={{
            left: '10%',
            top: '20%',
            width: '15%',
            height: '1px',
            transformOrigin: 'left center',
          }}
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0,
            ease: "easeInOut",
          }}
        />

        {/* Line 2 */}
        <motion.div
          className="absolute bg-gradient-to-r from-purple-400 to-blue-400"
          style={{
            left: '25%',
            top: '15%',
            width: '20%',
            height: '1px',
            transformOrigin: 'left center',
          }}
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: 0.5,
            ease: "easeInOut",
          }}
        />

        {/* Line 3 */}
        <motion.div
          className="absolute bg-gradient-to-r from-blue-400 to-purple-400"
          style={{
            left: '40%',
            top: '25%',
            width: '25%',
            height: '1px',
            transformOrigin: 'left center',
          }}
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 1,
            ease: "easeInOut",
          }}
        />

        {/* Line 4 */}
        <motion.div
          className="absolute bg-gradient-to-r from-purple-400 to-blue-400"
          style={{
            left: '60%',
            top: '10%',
            width: '20%',
            height: '1px',
            transformOrigin: 'left center',
          }}
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            delay: 1.5,
            ease: "easeInOut",
          }}
        />

        {/* Line 5 */}
        <motion.div
          className="absolute bg-gradient-to-r from-blue-400 to-purple-400"
          style={{
            left: '15%',
            top: '50%',
            width: '30%',
            height: '1px',
            transformOrigin: 'left center',
          }}
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            delay: 2,
            ease: "easeInOut",
          }}
        />

        {/* Line 6 */}
        <motion.div
          className="absolute bg-gradient-to-r from-purple-400 to-blue-400"
          style={{
            left: '35%',
            top: '60%',
            width: '25%',
            height: '1px',
            transformOrigin: 'left center',
          }}
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: 2.3,
            repeat: Infinity,
            delay: 2.5,
            ease: "easeInOut",
          }}
        />

        {/* Line 7 */}
        <motion.div
          className="absolute bg-gradient-to-r from-blue-400 to-purple-400"
          style={{
            left: '55%',
            top: '45%',
            width: '20%',
            height: '1px',
            transformOrigin: 'left center',
          }}
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 2.7,
            repeat: Infinity,
            delay: 3,
            ease: "easeInOut",
          }}
        />

        {/* Line 8 */}
        <motion.div
          className="absolute bg-gradient-to-r from-purple-400 to-blue-400"
          style={{
            left: '75%',
            top: '55%',
            width: '15%',
            height: '1px',
            transformOrigin: 'left center',
          }}
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 2.1,
            repeat: Infinity,
            delay: 3.5,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Central glow */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 200,
          height: 200,
          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(20px)',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}