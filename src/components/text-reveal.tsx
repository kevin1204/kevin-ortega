'use client';

import { motion } from 'framer-motion';
import { characterRevealVariants, wordRevealVariants } from '@/lib/animations';

interface TextRevealProps {
  text: string;
  className?: string;
  type?: 'character' | 'word';
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function TextReveal({ 
  text, 
  className = '', 
  type = 'word',
  as: Component = 'span'
}: TextRevealProps) {
  const words = text.split(' ');
  const characters = text.split('');

  if (type === 'character') {
    return (
      <Component className={className}>
        {characters.map((char, index) => (
          <motion.span
            key={index}
            custom={index}
            variants={characterRevealVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'inline-block' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </Component>
    );
  }

  return (
    <Component className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          custom={index}
          variants={wordRevealVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </Component>
  );
}
