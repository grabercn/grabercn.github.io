import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layout, Typography } from 'antd';
import Setup from "./Setup"

const { Title } = Typography;

const Bootup = ({ onComplete }) => {
  const [timeElapsed, setTimeElapsed] = useState(false); // State to track if 10 seconds passed
  const numberOfSquares = 50; // Number of squares for added randomness

  // Generate random positions and sizes for squares
  const generateRandomStyle = () => {
    const size = Math.random() * 10 + 50; // Random size between 50px and 150px
    return {
      width: `${size}px`,
      height: `${size}px`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      backgroundColor: '#000000', // Initial black color for squares
    };
  };

  const squares = Array.from({ length: numberOfSquares }, () => generateRandomStyle());

  // Set a timer to stop the animation after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeElapsed(true); // Set the state to true after 10 seconds
      if (onComplete) onComplete(); // Trigger onComplete if provided (to allow for further action)
    }, 5000); // 10 seconds

    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, [onComplete]);

  if (timeElapsed) {
    return <Setup />
  }

  return (
    <Layout
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f2f5',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Multiple moving and fading squares */}
      {squares.map((square, index) => (
        <motion.div
          key={index}
          style={{
            position: 'absolute',
            top: square.top,
            left: square.left,
            width: square.width,
            height: square.height,
            backgroundColor: square.backgroundColor,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            x: ['0%', '50%', '-50%', '0%'],
            y: ['0%', '50%', '-50%', '0%'],
            opacity: [1, 0, 1],
            backgroundColor: ['#000000', '#ff4d4f', '#ffffff'],
          }}
          transition={{
            duration: 10,
            ease: 'easeInOut',
            repeat: Infinity, // Repeat the animation infinitely
            delay: Math.random() * 2, // Random delay to add more variety
            repeatDelay: 2,
          }}
        />
      ))}

      {/* Text in the center with zoom and color change */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: 1,
          scale: 1,
          color: '#000000', // Text turns black
        }}
        exit={{ opacity: 0 }}
        transition={{
          delay: 2, // Waits for 2 seconds before text appears
          duration: 3, // Zoom effect and color change
        }}
      >
        <Title
          level={1}
          style={{
            textAlign: 'center',
            fontSize: '48px',
            fontWeight: 'bold',
          }}
        >
          Welcome to the Bootup!
        </Title>
      </motion.div>
    </Layout>
  );
};

export default Bootup;
