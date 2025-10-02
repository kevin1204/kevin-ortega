'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { rippleVariants } from '@/lib/animations';

interface RippleButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

export function RippleButton({ 
  children, 
  className = '', 
  variant = 'default',
  size = 'default',
  asChild = false,
  href,
  target,
  rel,
  onClick,
  ...props 
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newRipple = {
      id: Date.now(),
      x,
      y,
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);

    if (onClick) {
      onClick();
    }
  };

  const buttonContent = (
    <>
      {children}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute pointer-events-none rounded-full bg-white/20"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 20,
            height: 20,
            marginLeft: -10,
            marginTop: -10,
          }}
          variants={rippleVariants}
          initial="hidden"
          animate="visible"
        />
      ))}
    </>
  );

  if (asChild && href) {
    return (
      <Button
        ref={buttonRef}
        variant={variant}
        size={size}
        className={`relative overflow-hidden ${className}`}
        onClick={handleClick}
        {...props}
      >
        <a href={href} target={target} rel={rel} className="flex items-center">
          {buttonContent}
        </a>
      </Button>
    );
  }

  return (
    <Button
      ref={buttonRef}
      variant={variant}
      size={size}
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
      {...props}
    >
      {buttonContent}
    </Button>
  );
}
