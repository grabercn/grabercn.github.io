import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// FloatingText Component
const FloatingText = ({ children, className, context }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    // Listen to scroll events to move the text
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Introduce a random speed multiplier for each piece of text
  const speedMultiplier = Math.random() * 2 + 0.5; // Random multiplier between 0.5 and 2
  const range = context === 'card' ? 8 : 5; // Larger range for card

  // Circular movement calculation with speed variation
  const xMovement = Math.sin(scrollPosition / (200 * speedMultiplier)) * range;
  const yMovement = Math.cos(scrollPosition / (200 * speedMultiplier)) * range;

  return (
    <motion.div
      className={className}
      animate={{
        x: xMovement,
        y: yMovement,
        opacity: [1, 0.8, 1], // Fade in-out effect on scroll
      }}
      transition={{
        type: 'spring',
        stiffness: 50,   // Controls the bounce of the movement
        damping: 15,     // Controls the "settling" behavior
        duration: 2,     // Duration of the transition effect
      }}
      style={{
      }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingText;
