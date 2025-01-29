import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// JumpingText Component
const JumpingText = ({ children }) => {
  const [time, setTime] = useState(0); // Time state to control animation

  useEffect(() => {
    // Start continuous animation
    const animateMovement = () => {
      setTime(prevTime => prevTime + 0.01); // Increment time for smooth animation
      requestAnimationFrame(animateMovement); // Keep animation going smoothly
    };

    animateMovement(); // Start the animation loop

    // No cleanup needed for continuous animation
  }, []);

  // Vertical bounce effect with a spring-based transition
  const yMovement = Math.sin(time * 2) * 15;  // Up-and-down movement (bounce)

  return (
    <motion.div
      style={{
        display: 'inline-block',
        fontSize: '2rem', // You can adjust size here
        fontWeight: 'bold', // Optional styling
      }}
      animate={{
        y: yMovement, // Vertical bounce movement
        opacity: [1, 0.95, 1], // Slight fade effect for added smoothness
      }}
      transition={{
        type: 'spring',
        stiffness: 150,   // High stiffness for more bounce
        damping: 10,      // Controls the settling of the bounce
        duration: 1,      // Bounce duration
        ease: 'easeOut',  // Smooth easing for the bounce
      }}
    >
      {children}
    </motion.div>
  );
};

export default JumpingText;
