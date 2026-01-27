import React, { useEffect, useRef, useState } from 'react';

// Global purple glow that follows the mouse cursor.
// reactive to interactive elements.
const GlobalCursorGlow = () => {
  const glowRef = useRef(null);
  const requestRef = useRef(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isOnNavbar, setIsOnNavbar] = useState(false);

  useEffect(() => {
    const animate = () => {
      if (glowRef.current) {
        const { x, y } = mouseRef.current;
        glowRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      const target = e.target;
      
      // Check if hovering interactive element
      const isInteractive = target && (
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.ant-menu-item') ||
        target.closest('.ant-btn') ||
        target.closest('.gallery-item') 
        // Removed .ant-card to prevent big cursor on text sections
      );
      setIsHovering(!!isInteractive);

      // Check if on navbar
      const onNavbar = target && target.closest('.ant-layout-header');
      setIsOnNavbar(!!onNavbar);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const styles = `
    .global-cursor-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      pointer-events: none;
      z-index: 100000;
      will-change: transform;
    }

    .glow-layer {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      mix-blend-mode: normal;
      transition: width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
    }

    /* Default Size */
    .glow-layer {
      width: 300px;
      height: 300px;
    }

    /* Hover Size */
    .glow-layer.hovering {
      width: 500px;
      height: 500px;
    }

    /* Purple Layer */
    .purple-layer {
      background: radial-gradient(circle, rgba(160, 32, 240, 0.12) 0%, rgba(160, 32, 240, 0.04) 40%, rgba(160, 32, 240, 0) 70%);
      opacity: 1;
    }
    .purple-layer.hovering {
      background: radial-gradient(circle, rgba(160, 32, 240, 0.25) 0%, rgba(160, 32, 240, 0.1) 40%, rgba(160, 32, 240, 0) 70%);
    }
    .purple-layer.hidden {
      opacity: 0;
    }

    /* White Layer */
    .white-layer {
      background: radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 40%, rgba(255, 255, 255, 0) 70%);
      opacity: 0;
    }
    .white-layer.visible {
      opacity: 1;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div ref={glowRef} className="global-cursor-container">
        {/* Purple Glow: Fades out when on navbar */}
        <div className={`glow-layer purple-layer ${isHovering ? 'hovering' : ''} ${isOnNavbar ? 'hidden' : ''}`} />
        
        {/* White Glow: Fades in when on navbar */}
        <div className={`glow-layer white-layer ${isHovering ? 'hovering' : ''} ${isOnNavbar ? 'visible' : ''}`} />
      </div>
    </>
  );
};

export default GlobalCursorGlow;
