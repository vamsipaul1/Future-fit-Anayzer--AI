'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

// SSR-compatible motion wrapper
export const MotionDiv = ({ children, ...props }: { children: ReactNode; [key: string]: any }) => {
  return (
    <motion.div
      initial={false}
      animate={props.animate || {}}
      exit={props.exit || {}}
      transition={props.transition || { duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const MotionButton = ({ children, ...props }: { children: ReactNode; [key: string]: any }) => {
  return (
    <motion.button
      whileHover={props.whileHover || { scale: 1.05 }}
      whileTap={props.whileTap || { scale: 0.95 }}
      transition={props.transition || { duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export const MotionSection = ({ children, ...props }: { children: ReactNode; [key: string]: any }) => {
  return (
    <motion.section
      initial={props.initial || { opacity: 0, y: 20 }}
      animate={props.animate || { opacity: 1, y: 0 }}
      transition={props.transition || { duration: 0.6 }}
      {...props}
    >
      {children}
    </motion.section>
  );
};

// Export AnimatePresence for use in components
export { AnimatePresence };
