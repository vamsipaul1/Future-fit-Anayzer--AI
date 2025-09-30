'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

// More sophisticated page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.95,
    filter: 'blur(10px)',
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
  },
  out: {
    opacity: 0,
    y: -30,
    scale: 1.05,
    filter: 'blur(5px)',
  }
};

// Smoother transition with better easing
const pageTransition = {
  type: 'tween',
  ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for smoother feel
  duration: 0.6, // Slightly longer for smoother feel
};

// Stagger animation for child elements
const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="min-h-screen"
      >
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
