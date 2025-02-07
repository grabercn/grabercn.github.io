import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SparklesBackground = () => {
  // Function to generate random size for the sparkles
  const getRandomSize = () => {
    return Math.random() * 5 + 2; // Sparkle size between 2px and 7px
  };

  // Function to generate random color for the sparkles
  const getSparkleColor = () => {
    const hue = Math.random() > 0.5 ? 200 : 270; // Gold (50) or Purple (270) hue
    return `hsl(${hue}, 100%, 70%)`; // Set saturation to 100% for vivid color
  };

  // Function to generate random positions for the sparkles
  const generateSparklePositions = () => {
    return [...Array(50)].map(() => ({
      top: `${Math.random() * 80 + 10}%`, // Fixed position (within screen height)
      left: `${Math.random() * 90 + 5}%`, // Fixed position (within screen width)
    }));
  };

  // State to store sparkle positions, colors, and sizes
  const [sparklePositions, setSparklePositions] = useState([]);
  const [sparkleSizes, setSparkleSizes] = useState([]);
  const [sparkleColors, setSparkleColors] = useState([]);

  // Generate sparkle positions, colors, and sizes only once when the component mounts
  useEffect(() => {
    setSparklePositions(generateSparklePositions());
    setSparkleSizes([...Array(50)].map(() => getRandomSize())); // Set all sizes
    setSparkleColors([...Array(50)].map(() => getSparkleColor())); // Set all colors
  }, []); // Empty dependency array means this effect runs only once after the first render

  // Sparkle animation using Framer Motion for opacity and movement
  const sparkleVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
    },
    visible: {
      opacity: [0.5, 1, 0.5], // Sparkle fades in and out
      scale: [0.8, 1.2, 1], // Random scaling for sparkle
      transition: {
        opacity: {
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        },
        scale: {
          duration: Math.random() * 5 + 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        },
        y: {
          duration: Math.random() * 5 + 2 * 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        },
      },
    },
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: '#fff',
        overflow: 'hidden',
        zIndex: -1,
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(200, 200, 255, 0.4))', // Light gradient
      }}
    >
      {/* Pulsing Half-Circular Glow at the Bottom */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%', // Full width for the half-circle
          height: '10%', // Half of the height for the circle (adjust as necessary)
          borderRadius: '50% 50% 0 0', // Half-circle (top rounded, bottom flat)
          background: 'rgba(247, 2, 255, 0.5)', // Gold color for the glow
          boxShadow: '0 0 20px rgba(135, 0, 189, 0.8)', // Soft gold glow
        }}
        animate={{
          scale: [1, 2.5, 1], // Pulsing effect (slow pulse)
          opacity: [0.2, 0.5, 0.2], // Fading effect
        }}
        transition={{
          duration: 6, // Slow pulse duration
          repeat: Infinity, // Repeat forever
          repeatType: "loop", // Repeat continuously
          ease: "easeInOut", // Smooth easing
        }}
      />

      {/* Create sparkles with fixed positions, colors, and sizes */}
      {sparklePositions.map((position, index) => (
        <motion.div
          key={index}
          variants={sparkleVariants}
          initial="hidden"
          animate="visible"
          style={{
            position: 'absolute',
            top: position.top,
            left: position.left,
            width: `${sparkleSizes[index]}px`, // Use the fixed size
            height: `${sparkleSizes[index]}px`, // Use the fixed size
            borderRadius: '50%', // Circular shape for sparkles
            backgroundColor: sparkleColors[index], // Use the fixed color
            boxShadow: `0 0 ${sparkleSizes[index]}px rgba(255, 215, 0, 0.8)`, // Gold glow around sparkle
          }}
        />
      ))}
    </div>
  );
};

export default SparklesBackground;
