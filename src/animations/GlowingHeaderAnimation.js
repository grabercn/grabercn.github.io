import React, { useState, useEffect, useRef } from 'react';

// This component creates an interactive, glowing animation for a header bar.
// A glowing orb follows the mouse, leaving a trail of fading sparkles.
const GlowingHeaderAnimation = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [sparkles, setSparkles] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  // Effect to handle global mouse movement
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      // Check if the mouse is inside the component's bounds
      const isInside = e.clientX >= rect.left && e.clientX <= rect.right &&
                       e.clientY >= rect.top && e.clientY <= rect.bottom;

      setIsVisible(isInside);

      if (isInside) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setPosition({ x, y });

        // Add a new sparkle on mouse move
        setSparkles(currentSparkles => [
          ...currentSparkles,
          {
            id: Date.now() + Math.random(),
            x: x,
            y: y,
            size: Math.random() * 4 + 2,
            color: ['#8A2BE2', '#00CED1', '#DA70D6', '#9370DB'][Math.floor(Math.random() * 4)]
          }
        ]);
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, []); // Empty dependency array ensures this runs only once

  // Effect to clean up sparkles to prevent performance degradation
  useEffect(() => {
    const sparkleCleanup = setInterval(() => {
      setSparkles(currentSparkles => 
        currentSparkles.slice(-50) // Keep only the last 50 sparkles
      );
    }, 1000);

    return () => clearInterval(sparkleCleanup);
  }, []);

  const styles = `
    @keyframes fade-out {
      to {
        transform: scale(0);
        opacity: 0;
      }
    }

    .header-animation-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%; /* Fills the parent container */
      background-color: transparent; /* Removed background color */
      overflow: hidden;
      z-index: 9999; /* Set to a high value to ensure it's on top */
      pointer-events: none; /* Allows clicks to pass through */
    }

    .glowing-orb {
      position: absolute;
      width: 40px;
      height: 40px;
      left: -20px; /* Offset to center on the cursor */
      top: -20px; /* Offset to center on the cursor */
      border-radius: 50%;
      background-color: #fff;
      filter: blur(20px);
      transform: translate3d(var(--x, -100px), var(--y, -100px), 0);
      pointer-events: none;
      transition: transform 0.1s ease-out, opacity 0.4s ease-out; /* Added opacity transition */
      opacity: 0; /* Start hidden */
    }

    .glowing-orb.visible {
      opacity: 1; /* Fade in when mouse is over the container */
    }

    .sparkle {
      position: absolute;
      width: var(--size);
      height: var(--size);
      border-radius: 50%;
      background-color: var(--color);
      box-shadow: 0 0 8px var(--color);
      left: 0;
      top: 0;
      transform: translate3d(var(--x, 0), var(--y, 0), 0);
      pointer-events: none;
      animation: fade-out 1s forwards;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div ref={containerRef} className="header-animation-container">
        <div 
          className={`glowing-orb ${isVisible ? 'visible' : ''}`}
          style={{ '--x': `${position.x}px`, '--y': `${position.y}px` }}
        />
        {isVisible && sparkles.map(sparkle => (
          <div
            key={sparkle.id}
            className="sparkle"
            style={{
              '--x': `${sparkle.x}px`,
              '--y': `${sparkle.y}px`,
              '--size': `${sparkle.size}px`,
              '--color': sparkle.color,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default GlowingHeaderAnimation;
