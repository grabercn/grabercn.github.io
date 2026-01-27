import React from 'react';

// This component creates a modern, subtle animated background.
// It features large, soft, purple circles that are now static for a calmer look.
const ModernPurpleBackground = () => {

  // The styles for the background are defined here.
  const styles = `
    .background-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      /* Cleaner, whiter base */
      background: linear-gradient(135deg, #ffffff 0%, #fdfaff 100%);
      z-index: 0; 
      overflow: hidden; 
    }

    .circle {
      position: absolute;
      border-radius: 50%;
      opacity: 0.6; /* Overall reduction in intensity */
    }
    
    /* Softening all circle gradients */
    .circle-1 {
      width: 45vmax;
      height: 45vmax;
      top: -12vmax;
      left: -12vmax;
      background: radial-gradient(circle, rgba(174, 0, 255, 0.4) 0%, rgba(167, 139, 250, 0) 70%);
    }

    .circle-2 {
      width: 55vmax;
      height: 55vmax;
      bottom: -12vmax;
      right: -12vmax;
      background: radial-gradient(circle, rgba(147, 112, 219, 0.3) 0%, rgba(147, 112, 219, 0) 70%);
    }

    .circle-3 {
      width: 42vmax;
      height: 42vmax;
      bottom: 8vh;
      left: 18vw;
      background: radial-gradient(circle, rgba(191, 172, 250, 0.3) 0%, rgba(191, 172, 250, 0) 70%);
    }
    
    .circle-4 {
      width: 34vmax;
      height: 34vmax;
      top: 12vh;
      right: 12vw;
      background: radial-gradient(circle, rgba(167, 139, 250, 0.3) 0%, rgba(167, 139, 250, 0) 70%);
    }
    
    .circle-5 {
      width: 50vmax;
      height: 50vmax;
      top: 46vh;
      left: -15vmax;
      background: radial-gradient(circle, rgba(147, 112, 219, 0.25) 0%, rgba(147, 112, 219, 0) 70%);
    }

    .circle-6 {
      width: 36vmax;
      height: 36vmax;
      top: -6vh;
      right: 26vw;
      background: radial-gradient(circle, rgba(191, 172, 250, 0.3) 0%, rgba(191, 172, 250, 0) 70%);
    }

    .circle-7 {
      width: 38vmax;
      height: 38vmax;
      top: 30vh;
      right: -10vmax;
      background: radial-gradient(circle, rgba(174, 0, 255, 0.25) 0%, rgba(174, 0, 255, 0) 70%);
    }

    .circle-8 {
      width: 32vmax;
      height: 32vmax;
      bottom: -8vmax;
      left: 10vw;
      background: radial-gradient(circle, rgba(147, 112, 219, 0.3) 0%, rgba(147, 112, 219, 0) 70%);
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
        <div className="circle circle-7"></div>
        <div className="circle circle-8"></div>
      </div>
    </>
  );
};

export default ModernPurpleBackground;
