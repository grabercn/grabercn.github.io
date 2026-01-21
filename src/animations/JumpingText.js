import React from 'react';
import { motion } from 'framer-motion';

// JumpingText Component
const JumpingText = ({ children }) => {
  return (
    <motion.div
      style={{
        display: 'inline-block',
        fontSize: '2rem', // You can adjust size here
        fontWeight: 'bold', // Optional styling
      }}
      animate={{
        y: [0, -15, 0], // Keyframes for up and down movement
        opacity: [1, 0.95, 1],
      }}
      transition={{
        duration: 2, // Equivalent to period of sin(time * 2) roughly if time increment was 0.01 per frame (60fps) -> 0.6 rad/s.
        // The original logic: sin(time * 2) where time += 0.01 per frame.
        // Actually, let's just make it a nice smooth bounce.
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1]
      }}
    >
      {children}
    </motion.div>
  );
};

export default JumpingText;
