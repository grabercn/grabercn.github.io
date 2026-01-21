import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// FloatingText Component
const FloatingText = ({ children, className, context }) => {
  const { scrollY } = useScroll();

  // Introduce a random speed multiplier for each piece of text
  // We use a fixed value based on a stable random seed if we wanted it deterministic, 
  // but here we just want it calculated once per mount.
  // Using useMemo to keep the multiplier stable across renders if the component re-renders.
  const speedMultiplier = React.useMemo(() => Math.random() * 2 + 0.5, []);
  const range = context === 'card' ? 8 : 5;

  const x = useTransform(scrollY, (value) => Math.sin(value / (200 * speedMultiplier)) * range);
  const y = useTransform(scrollY, (value) => Math.cos(value / (200 * speedMultiplier)) * range);
  const opacity = useTransform(scrollY, (value) => {
     // Approximate the original [1, 0.8, 1] effect based on scroll.
     // Since the original was using keyframes based on the *animation* prop which updates on every render,
     // we can simulate a subtle pulse or just keep it simple.
     // The original code passed `scrollPosition` to the animate prop, effectively continuously re-animating.
     // A simple scroll-mapped opacity might be less jittery.
     // Let's create a subtle oscillation.
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
