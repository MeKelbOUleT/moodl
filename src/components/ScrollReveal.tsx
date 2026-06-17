import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';

type Animation = 'fade-up' | 'fade-right' | 'fade-left' | 'zoom-in' | 'fade';

interface ScrollRevealProps {
  children: ReactNode;
  animation?: Animation;
  delay?: number;
  duration?: number;
  className?: string;
}

const variantsMap: Record<Animation, Variants> = {
  'fade-up': {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-right': {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  'fade-left': {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
  'zoom-in': {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

const reducedVariants: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

export default function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 700,
  className,
}: ScrollRevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : 'hidden'}
      whileInView={reduce ? undefined : 'visible'}
      viewport={{ once: true, margin: '-60px' }}
      variants={reduce ? reducedVariants : variantsMap[animation]}
      transition={
        reduce
          ? { duration: 0 }
          : {
              duration: duration / 1000,
              delay: delay / 1000,
              ease: [0.22, 1, 0.36, 1],
            }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
