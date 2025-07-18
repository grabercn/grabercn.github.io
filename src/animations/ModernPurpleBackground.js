import React from 'react';

// This component creates a modern, subtle animated background.
// It features large, soft, purple circles that slowly pulse, fade, and drift across the screen, 
// creating a gentle, calming, and dynamic effect.
const ModernPurpleBackground = () => {

  // The styles for the background are defined here, including the keyframe animations.
  // Using a <style> tag within the component is a straightforward way to encapsulate
  // the component's styling, including animations, without needing separate CSS files.
  const styles = `
    /* Keyframes for the pulsing and drifting animation. Each animation has a slightly different movement path. */
    @keyframes move-pulse-1 {
      0%, 100% {
        transform: scale(1) translate(0, 0);
        opacity: 0.5;
      }
      50% {
        transform: scale(1.05) translate(5vw, -10vh);
        opacity: 0.7;
      }
    }

    @keyframes move-pulse-2 {
      0%, 100% {
        transform: scale(1) translate(0, 0);
        opacity: 0.4;
      }
      50% {
        transform: scale(1.1) translate(-8vw, 12vh);
        opacity: 0.6;
      }
    }
    
    @keyframes move-pulse-3 {
      0%, 100% {
        transform: scale(0.95) translate(0, 0);
        opacity: 0.5;
      }
      50% {
        transform: scale(1.05) translate(-5vw, -8vh);
        opacity: 0.7;
      }
    }

    .background-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: #f8f7ff; /* A very light, almost white purple */
      z-index: 0; /* Ensures the background stays behind all other content */
      overflow: hidden; /* Prevents scrollbars from appearing from oversized circles */
    }

    .circle {
      position: absolute;
      border-radius: 50%;
      /* The animation is now a combination of pulsing and moving */
      animation-iteration-count: infinite;
      animation-timing-function: ease-in-out;
    }
    
    /* Each circle has a unique size, position, color, and animation to create a more organic and lively feel */
    .circle-1 {
      width: 45vmax;
      height: 45vmax;
      top: -20vmax;
      left: -20vmax;
      background: radial-gradient(circle, rgba(174, 0, 255, 0.53) 0%, rgba(167, 139, 250, 0) 65%);
      animation-name: move-pulse-1;
      animation-duration: 20s;
      animation-delay: 0s;
    }

    .circle-2 {
      width: 55vmax;
      height: 55vmax;
      bottom: -25vmax;
      right: -25vmax;
      background: radial-gradient(circle, rgba(147, 112, 219, 0.4) 0%, rgba(147, 112, 219, 0) 65%);
      animation-name: move-pulse-2;
      animation-duration: 25s;
      animation-delay: -5s;
    }

    .circle-3 {
      width: 40vmax;
      height: 40vmax;
      bottom: 10vh;
      left: 20vw;
      background: radial-gradient(circle, rgba(191, 172, 250, 0.35) 0%, rgba(191, 172, 250, 0) 65%);
      animation-name: move-pulse-3;
      animation-duration: 30s;
      animation-delay: -10s;
    }
    
    .circle-4 {
      width: 30vmax;
      height: 30vmax;
      top: 15vh;
      right: 10vw;
      background: radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, rgba(167, 139, 250, 0) 65%);
      animation-name: move-pulse-2;
      animation-duration: 22s;
      animation-delay: -15s;
    }
    
    .circle-5 {
      width: 50vmax;
      height: 50vmax;
      top: 50vh;
      left: -25vmax;
      background: radial-gradient(circle, rgba(147, 112, 219, 0.3) 0%, rgba(147, 112, 219, 0) 65%);
      animation-name: move-pulse-1;
      animation-duration: 28s;
      animation-delay: -2s;
    }

    .circle-6 {
      width: 35vmax;
      height: 35vmax;
      top: -10vh;
      right: 30vw;
      background: radial-gradient(circle, rgba(191, 172, 250, 0.4) 0%, rgba(191, 172, 250, 0) 65%);
      animation-name: move-pulse-3;
      animation-duration: 26s;
      animation-delay: -8s;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="background-container">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
        <div className="circle circle-4"></div>
        <div className="circle circle-5"></div>
        <div className="circle circle-6"></div>
      </div>
    </>
  );
};

export default ModernPurpleBackground;
