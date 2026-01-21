import React, { useState, useEffect, useRef } from 'react';

// This component creates an interactive, glowing animation for a header bar.
// A glowing orb follows the mouse, leaving a trail of fading sparkles.
const GlowingHeaderAnimation = () => {
  const [sparkles, setSparkles] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const orbRef = useRef(null);

  // Effect to handle global mouse movement (throttled and capped)
  useEffect(() => {
    let lastEmit = 0;
    const MAX_SPARKLES = 60;

    const handleGlobalMouseMove = (e) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      setIsVisible(isInside);

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update orb position directly to avoid re-renders
      if (orbRef.current) {
         orbRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
         orbRef.current.style.opacity = isInside ? '1' : '0';
      }

      const now = performance.now();
      // Throttle sparkle generation to ~20fps (50ms) to reduce React renders
      if (!isInside || now - lastEmit < 50) {
        return; 
      }
      lastEmit = now;

      setSparkles((current) => {
        const next = [
          ...current,
          {
            id: Date.now() + Math.random(),
            x,
            y,
            size: Math.random() * 4 + 2,
            color: ['#8A2BE2', '#00CED1', '#DA70D6', '#9370DB'][Math.floor(Math.random() * 4)],
          },
        ];
        // cap the array to prevent growth between cleanups
        return next.length > MAX_SPARKLES ? next.slice(-MAX_SPARKLES) : next;
      });
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, []); // Empty dependency array ensures this runs only once

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
      /* Initial position off-screen or 0,0 */
      transform: translate3d(-100px, -100px, 0);
      pointer-events: none;
      transition: opacity 0.4s ease-out; /* Only animate opacity via CSS transition */
      will-change: transform;
      opacity: 0; 
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
      will-change: transform, opacity;
      animation: fade-out 1s forwards;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div ref={containerRef} className="header-animation-container">
        <div 
          ref={orbRef}
          className="glowing-orb"
          // Style for position removed here, handled in JS directly
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
