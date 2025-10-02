import { Variants } from 'framer-motion';

// Common animation variants
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Page transition variants
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

// Hover animations
export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { duration: 0.2, ease: "easeInOut" }
};

export const hoverLift = {
  whileHover: { y: -5 },
  transition: { duration: 0.2, ease: "easeInOut" }
};

// Count up animation
export const countUpVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

// Timeline specific animations
export const timelineItemVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const timelineLineVariants: Variants = {
  hidden: { scaleY: 0 },
  visible: { 
    scaleY: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

// Card animations
export const cardHoverVariants: Variants = {
  rest: { scale: 1, y: 0 },
  hover: { 
    scale: 1.02, 
    y: -5,
    transition: { duration: 0.2, ease: "easeInOut" }
  }
};

// Text reveal animation
export const textRevealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

// Gradient text animation
export const gradientTextVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" }
  }
};

// Advanced Animation Variants for Enhanced Effects

// Constellation and Particle Animations
export const particleVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.8, 
      ease: "easeOut"
    }
  }
};

export const constellationLineVariants: Variants = {
  hidden: { 
    pathLength: 0, 
    opacity: 0,
    strokeWidth: 0
  },
  visible: { 
    pathLength: 1, 
    opacity: 0.6,
    strokeWidth: 1,
    transition: { 
      duration: 1.5, 
      ease: "easeInOut",
      delay: 0.5
    }
  }
};

// Magnetic Hover Effects
export const magneticHover = {
  rest: { scale: 1, rotateX: 0, rotateY: 0 },
  hover: { 
    scale: 1.05,
    rotateX: 5,
    rotateY: 5,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

// Button Ripple Effects
export const rippleVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { 
    scale: 4, 
    opacity: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Scroll-triggered Animations
export const scrollRevealVariants: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,
    transition: { 
      duration: 0.8, 
      ease: "easeOut",
      staggerChildren: 0.1
    }
  }
};

export const scrollRevealItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Parallax Animations
export const parallaxVariants = {
  background: {
    y: (offset: number) => offset * 0.5,
    transition: { duration: 0.1, ease: "linear" }
  },
  foreground: {
    y: (offset: number) => offset * -0.3,
    transition: { duration: 0.1, ease: "linear" }
  }
};

// Character-by-character Text Reveal
export const characterRevealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.05, 
      ease: "easeOut"
    }
  }
};

// Word-by-word Text Reveal
export const wordRevealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.3, 
      ease: "easeOut"
    }
  }
};

// Progress Indicators
export const progressVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: { 
    scaleX: 1,
    transition: { duration: 1.5, ease: "easeOut" }
  }
};

// Timeline Enhancements
export const timelineDotVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const timelineConnectionVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 0.8,
    transition: { duration: 1, ease: "easeInOut" }
  }
};

export const timelineExpandVariants: Variants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: { 
    height: "auto", 
    opacity: 1,
    transition: { duration: 0.5, ease: "easeInOut" }
  }
};

// Project Card 3D Effects
export const card3DTilt = {
  rest: { rotateX: 0, rotateY: 0, scale: 1 },
  hover: { 
    rotateX: 5, 
    rotateY: 5, 
    scale: 1.02,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

export const cardStaggerVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: "easeOut"
    }
  }
};

// Skills Section Animations
export const skillBarVariants: Variants = {
  hidden: { width: 0 },
  visible: { 
    width: "100%",
    transition: { duration: 1.2, ease: "easeOut" }
  }
};

export const skillIconVariants: Variants = {
  hidden: { scale: 0, rotate: -180 },
  visible: { 
    scale: 1, 
    rotate: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const skillCategoryVariants: Variants = {
  hidden: { height: 0, opacity: 0 },
  visible: { 
    height: "auto", 
    opacity: 1,
    transition: { duration: 0.5, ease: "easeInOut" }
  }
};

// Loading and Skeleton Animations
export const skeletonVariants: Variants = {
  hidden: { opacity: 0.3 },
  visible: { 
    opacity: 0.7,
    transition: { 
      duration: 1.5, 
      repeat: Infinity, 
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
};

export const loadingSpinnerVariants: Variants = {
  animate: { 
    rotate: 360,
    transition: { 
      duration: 1, 
      repeat: Infinity, 
      ease: "linear"
    }
  }
};

// Theme-aware Animations
export const themeTransitionVariants = {
  light: { 
    backgroundColor: "hsl(var(--background))",
    color: "hsl(var(--foreground))",
    transition: { duration: 0.3, ease: "easeInOut" }
  },
  dark: { 
    backgroundColor: "hsl(var(--background))",
    color: "hsl(var(--foreground))",
    transition: { duration: 0.3, ease: "easeInOut" }
  }
};

// Depth and Shadow Effects
export const depthVariants: Variants = {
  shallow: { 
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    y: 0
  },
  deep: { 
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    y: -10,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

// Dynamic Gradient Animations
export const gradientShiftVariants: Variants = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: { 
      duration: 8, 
      repeat: Infinity, 
      ease: "linear"
    }
  }
};

// Performance Optimized Variants
export const willChangeVariants = {
  hover: { willChange: "transform" },
  rest: { willChange: "auto" }
};

// Accessibility - Reduced Motion
export const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.1 }
  }
};
