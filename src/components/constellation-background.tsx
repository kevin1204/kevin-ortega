'use client';

import { motion } from 'framer-motion';

export function ConstellationBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Constellation dots with glow effects */}
      <motion.div
        className="absolute w-3 h-3 bg-blue-400 rounded-full shadow-lg"
        style={{ 
          left: '15%', 
          top: '25%',
          boxShadow: '0 0 20px #60a5fa'
        }}
        animate={{ 
          opacity: [0.3, 1, 0.3],
          scale: [1, 1.4, 1]
        }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <motion.div
        className="absolute w-4 h-4 bg-purple-400 rounded-full shadow-lg"
        style={{ 
          left: '45%', 
          top: '15%',
          boxShadow: '0 0 25px #a855f7'
        }}
        animate={{ 
          opacity: [0.4, 1, 0.4],
          scale: [1, 1.3, 1]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 0.8
        }}
      />
      
      <motion.div
        className="absolute w-2 h-2 bg-blue-400 rounded-full shadow-lg"
        style={{ 
          left: '75%', 
          top: '35%',
          boxShadow: '0 0 15px #60a5fa'
        }}
        animate={{ 
          opacity: [0.2, 0.9, 0.2],
          scale: [1, 1.6, 1]
        }}
        transition={{ 
          duration: 2.2, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1.5
        }}
      />
      
      <motion.div
        className="absolute w-5 h-5 bg-purple-400 rounded-full shadow-lg"
        style={{ 
          left: '25%', 
          top: '65%',
          boxShadow: '0 0 30px #a855f7'
        }}
        animate={{ 
          opacity: [0.3, 1, 0.3],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 2.8, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <motion.div
        className="absolute w-3 h-3 bg-blue-400 rounded-full shadow-lg"
        style={{ 
          left: '65%', 
          top: '75%',
          boxShadow: '0 0 20px #60a5fa'
        }}
        animate={{ 
          opacity: [0.4, 0.8, 0.4],
          scale: [1, 1.5, 1]
        }}
        transition={{ 
          duration: 2.3, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2.5
        }}
      />
      
      <motion.div
        className="absolute w-2 h-2 bg-purple-400 rounded-full shadow-lg"
        style={{ 
          left: '85%', 
          top: '60%',
          boxShadow: '0 0 15px #a855f7'
        }}
        animate={{ 
          opacity: [0.3, 1, 0.3],
          scale: [1, 1.4, 1]
        }}
        transition={{ 
          duration: 2.7, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 3
        }}
      />

      {/* Animated connecting lines */}
      <motion.div
        className="absolute bg-gradient-to-r from-blue-400 to-purple-400"
        style={{ 
          left: '15%', 
          top: '25%', 
          width: '30%', 
          height: '2px',
          transformOrigin: 'left center',
          borderRadius: '1px'
        }}
        animate={{ 
          scaleX: [0, 1, 0],
          opacity: [0, 0.7, 0]
        }}
        transition={{ 
          duration: 3.5, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <motion.div
        className="absolute bg-gradient-to-r from-purple-400 to-blue-400"
        style={{ 
          left: '45%', 
          top: '15%', 
          width: '30%', 
          height: '2px',
          transformOrigin: 'left center',
          borderRadius: '1px'
        }}
        animate={{ 
          scaleX: [0, 1, 0],
          opacity: [0, 0.6, 0]
        }}
        transition={{ 
          duration: 2.8, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1.2
        }}
      />
      
      <motion.div
        className="absolute bg-gradient-to-r from-blue-400 to-purple-400"
        style={{ 
          left: '25%', 
          top: '65%', 
          width: '40%', 
          height: '2px',
          transformOrigin: 'left center',
          borderRadius: '1px'
        }}
        animate={{ 
          scaleX: [0, 1, 0],
          opacity: [0, 0.8, 0]
        }}
        transition={{ 
          duration: 3.2, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2.3
        }}
      />
      
      <motion.div
        className="absolute bg-gradient-to-r from-purple-400 to-blue-400"
        style={{ 
          left: '65%', 
          top: '75%', 
          width: '20%', 
          height: '2px',
          transformOrigin: 'left center',
          borderRadius: '1px'
        }}
        animate={{ 
          scaleX: [0, 1, 0],
          opacity: [0, 0.5, 0]
        }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 3.1
        }}
      />

      {/* Central pulsing glow */}
      <motion.div
        className="absolute w-80 h-80 bg-blue-400 rounded-full opacity-10 blur-3xl"
        style={{ 
          left: '50%', 
          top: '50%', 
          transform: 'translate(-50%, -50%)' 
        }}
        animate={{ 
          scale: [1, 1.4, 1],
          opacity: [0.05, 0.2, 0.05]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      {/* Secondary glow */}
      <motion.div
        className="absolute w-60 h-60 bg-purple-400 rounded-full opacity-15 blur-2xl"
        style={{ 
          left: '50%', 
          top: '50%', 
          transform: 'translate(-50%, -50%)' 
        }}
        animate={{ 
          scale: [1.2, 0.8, 1.2],
          opacity: [0.1, 0.25, 0.1]
        }}
        transition={{ 
          duration: 3.5, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1
        }}
      />
    </div>
  );
}
