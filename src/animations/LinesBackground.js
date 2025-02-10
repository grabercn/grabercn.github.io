import React from 'react';
import { motion } from 'framer-motion';

const LinesBackground = () => {
  // Function to generate a random color within a purple, pink, and blue color scheme
  const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 240 + 180); // Restrict the range to purple-pink-blue hues (180 to 420 degrees)
    const saturation = Math.floor(Math.random() * 50) + 50; // Random saturation between 50% and 100%
    const lightness = Math.floor(Math.random() * 30) + 30; // Random lightness between 30% and 60%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  // Function to generate random vertical position for more dynamic placement
  const getRandomTop = () => Math.random() * 100 + "%"; // Random vertical position between 0% and 100%

  // Random scaling animation (makes the lines appear and disappear more dynamically)
  const getRandomScale = () => Math.random() * 2 + 4; // Random scale between 1x and 1.5x

  // Function to generate random opacity to change on animation
  const getRandomOpacity = () => Math.random() * 0.5 + 0.5; // Random opacity between 0.5 and 1

  // Function to generate random rotation for each band
  const getRandomRotation = () => Math.random() * 30 - 10; // Random rotation between -15 and 15 degrees

  // Function to generate random 3D translation for each band
  const getRandomTranslateZ = () => Math.random() * 300 - 100; // Random Z translation (depth effect)

  // Function to generate random vertical movement for each band
  const getRandomVerticalMovement = () => {
    const direction = Math.random() > 0.5 ? 1 : -1; // Randomly pick direction: 1 (down) or -1 (up)
    const speed = Math.random() * 10 + 3; // Random speed between 3s and 13s
    return {
      y: direction * 100 + "vh", // Random vertical movement: either going up or down
      duration: speed, // Random movement duration
    };
  };

  // Line animation settings with random speeds, colors, scaling, opacity, and independent movement
  const lineAnimation = {
    hidden: {
      opacity: 0,
      scaleX: 0.5, // Start with a smaller width
      rotate: getRandomRotation(), // Random rotation between -15 and 15 degrees
      rotateX: getRandomRotation(), // Random 3D rotation in the X direction
      rotateY: getRandomRotation(), // Random 3D rotation in the Y direction
      translateZ: getRandomTranslateZ(), // Random Z-axis movement (depth)
    },
    visible: (index) => {
      const { y, duration } = getRandomVerticalMovement(); // Get random vertical movement for each band
      return {
        y: y,
        opacity: getRandomOpacity(),
        scaleX: getRandomScale(), // Random scaling of the line's width
        rotate: 0, // End rotation at 0 (un-rotate the lines as they animate)
        rotateX: getRandomRotation(), // Random 3D rotation in the X direction
        rotateY: getRandomRotation(), // Random 3D rotation in the Y direction
        translateZ: getRandomTranslateZ(), // Random Z-axis movement (depth)
        transition: {
          y: {
            duration: duration,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'reverse',
          },
          opacity: {
            duration: 5,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'reverse',
          },
          scaleX: {
            duration: 4,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
          },
          rotateX: {
            duration: 2,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
          },
          rotateY: {
            duration: 2,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
          },
          translateZ: {
            duration: 5,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
          },
        },
      };
    }
  };

  return (
    <div
      className="lines-background-container"
      style={{
        position: 'fixed', // Use fixed positioning to keep the background static
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh', // Cover the full viewport height
        overflow: 'hidden',
        zIndex: -1, // Ensure it stays in the background
        perspective: '1500px', // Perspective to create a 3D effect
      }}
    >
      {[1, 2, 3, 4].map((line, index) => (
        <motion.div
          key={line}
          className="line"
          initial="hidden"
          animate="visible"
          variants={lineAnimation}
          custom={index} // Pass the index to customize animation for each line
          style={{
            position: 'absolute',
            top: getRandomTop(), // Randomize the vertical position for each band
            left: 0,
            width: '100%', // Full width for the rectangles
            height: `${100 - Math.random() * 50}vw`, // Height is 100% of viewport width minus a random amount
            backgroundColor: getRandomColor(), // Random color for each band
            transformStyle: 'preserve-3d', // Ensure 3D transformations are applied
            filter: 'blur(10px)',  // Apply blur to each band
          }}
        />
      ))}
    </div>
  );
};

export default LinesBackground;
