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

  // Conditional styles based on context
  const customStyles = context === 'card'
    ? { position: 'absolute', top: '10%', left: '10%', pointerEvents: 'none' } // Floating text inside card
    : { position: 'relative', display: 'inline-block' };  // General floating text

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
        ...customStyles, // Apply the custom styles based on context
      }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingText;
