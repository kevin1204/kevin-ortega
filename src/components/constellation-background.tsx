'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

interface Connection {
  id: string;
  from: Particle;
  to: Particle;
  distance: number;
  opacity: number;
}

interface ConstellationBackgroundProps {
  className?: string;
}

export function ConstellationBackground({ className = '' }: ConstellationBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  // Generate particles
  const generateParticles = useCallback((width: number, height: number) => {
    const newParticles: Particle[] = [];
    const particleCount = Math.min(50, Math.floor((width * height) / 10000));
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.8 + 0.2,
      });
    }
    
    setParticles(newParticles);
  }, []);

  // Calculate connections between particles
  const calculateConnections = useCallback((particles: Particle[], maxDistance: number = 150) => {
    const newConnections: Connection[] = [];
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          const opacity = Math.max(0, 1 - distance / maxDistance) * 0.6;
          newConnections.push({
            id: `${i}-${j}`,
            from: particles[i],
            to: particles[j],
            distance,
            opacity,
          });
        }
      }
    }
    
    setConnections(newConnections);
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const { width, height } = dimensions;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Update particles
    setParticles(prevParticles => 
      prevParticles.map(particle => {
        let newX = particle.x + particle.vx;
        let newY = particle.y + particle.vy;
        
        // Bounce off edges
        if (newX < 0 || newX > width) particle.vx *= -1;
        if (newY < 0 || newY > height) particle.vy *= -1;
        
        // Keep particles in bounds
        newX = Math.max(0, Math.min(width, newX));
        newY = Math.max(0, Math.min(height, newY));
        
        return {
          ...particle,
          x: newX,
          y: newY,
        };
      })
    );
    
    // Recalculate connections
    setParticles(currentParticles => {
      calculateConnections(currentParticles);
      return currentParticles;
    });
    
    // Draw connections
    connections.forEach(connection => {
      ctx.beginPath();
      ctx.moveTo(connection.from.x, connection.from.y);
      ctx.lineTo(connection.to.x, connection.to.y);
      ctx.strokeStyle = `rgba(99, 102, 241, ${connection.opacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    });
    
    // Draw particles
    particles.forEach(particle => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99, 102, 241, ${particle.opacity})`;
      ctx.fill();
      
      // Add subtle glow
      ctx.shadowColor = 'rgba(99, 102, 241, 0.5)';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    
    animationRef.current = requestAnimationFrame(animate);
  }, [dimensions, particles, connections, calculateConnections]);

  // Handle mouse movement
  const handleMouseMove = useCallback((event: MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  }, [mouseX, mouseY]);

  // Handle resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    
    setDimensions({ width, height });
    generateParticles(width, height);
  }, [generateParticles]);

  // Initialize
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [handleResize, handleMouseMove]);

  // Start animation
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      animate();
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, dimensions]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          background: 'transparent',
          pointerEvents: 'none',
          willChange: 'transform'
        }}
      />
      
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"
        animate={{
          background: [
            'linear-gradient(45deg, hsl(var(--primary)) 0%, transparent 50%, hsl(var(--accent)) 100%)',
            'linear-gradient(225deg, hsl(var(--accent)) 0%, transparent 50%, hsl(var(--primary)) 100%)',
            'linear-gradient(45deg, hsl(var(--primary)) 0%, transparent 50%, hsl(var(--accent)) 100%)',
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          opacity: 0.3,
          backgroundSize: '200% 200%',
        }}
      />
      
      {/* Mouse interaction effect */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: springX,
          top: springY,
          width: 200,
          height: 200,
          marginLeft: -100,
          marginTop: -100,
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
