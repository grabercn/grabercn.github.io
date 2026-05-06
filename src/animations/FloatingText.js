import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// FloatingText Component
const FloatingText = ({ children, className, context }) => {
  const { scrollY } = useScroll();

  const prefersReducedMotion = React.useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  // Introduce a random speed multiplier for each piece of text
  // Using useMemo to keep the multiplier stable across renders if the component re-renders.
  const speedMultiplier = React.useMemo(() => Math.random() * 2 + 0.5, []);
  const range = prefersReducedMotion ? 0 : (context === 'card' ? 8 : 5);

  const x = useTransform(scrollY, (value) => Math.sin(value / (200 * speedMultiplier)) * range);
  const y = useTransform(scrollY, (value) => Math.cos(value / (200 * speedMultiplier)) * range);
  const opacity = useTransform(scrollY, (value) => {
     if (prefersReducedMotion) return 1;
     const cycle = Math.sin(value / 100);
     return 0.8 + (0.2 * Math.abs(cycle));
  });

  return (
    <motion.div
      className={className}
      style={{
        x,
        y,
        opacity,
      }}
      transition={{
        type: 'spring',
        stiffness: 50,
        damping: 15,
      }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingText;
