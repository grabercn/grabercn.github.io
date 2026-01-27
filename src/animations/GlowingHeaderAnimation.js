import React, { useEffect, useRef } from 'react';

// This component creates an interactive, glowing animation for a header bar.
// Optimized for performance: No heavy filters or blend modes.
const GlowingHeaderAnimation = () => {
  const containerRef = useRef(null);
  const orbRef = useRef(null);
  const requestRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, isInside: false });

  useEffect(() => {
    const animate = () => {
      if (orbRef.current && containerRef.current) {
        const { x, y, isInside } = mouseRef.current;
        orbRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        orbRef.current.style.opacity = isInside ? '1' : '0';
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    const handleGlobalMouseMove = (e) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isInside
      };
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const styles = `
    .header-animation-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: transparent;
      overflow: hidden;
      z-index: 9999;
      pointer-events: none;
    }

    .glowing-orb {
      position: absolute;
      width: 80px; /* Larger to simulate blur area */
      height: 80px;
      left: -40px;
      top: -40px;
      border-radius: 50%;
      /* Soft radial gradient simulates blur cheaply */
      background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 70%);
      transform: translate3d(-100px, -100px, 0);
      pointer-events: none;
      transition: opacity 0.2s ease-out;
      will-change: transform;
      opacity: 0; 
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div ref={containerRef} className="header-animation-container">
        <div ref={orbRef} className="glowing-orb" />
      </div>
    </>
  );
};

export default GlowingHeaderAnimation;
