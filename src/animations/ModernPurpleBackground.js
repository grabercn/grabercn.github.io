import React from 'react';

const ModernPurpleBackground = () => {

  const styles = `
    .background-container {
      position: fixed;
      inset: 0;
      background: linear-gradient(135deg, #ffffff 0%, #fdfaff 100%);
      z-index: 0;
      overflow: hidden;
      pointer-events: none;
    }

    /* Dark mode: deep black-purple base with rich purple glows */
    [data-theme="dark"] .background-container {
      background: linear-gradient(135deg, #05010d 0%, #0a0118 50%, #0d0520 100%);
    }

    .circle {
      position: absolute;
      border-radius: 50%;
      opacity: 0.6;
    }

    /* Dark mode circles: richer, more saturated purple glows against black */
    [data-theme="dark"] .circle {
      opacity: 0.45;
    }

    /* ─── Light mode circles ─── */
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

    /* ─── Dark mode: vivid, animated purple glows on black ─── */
    [data-theme="dark"] .circle {
      opacity: 0.5;
      animation: floatCircle 12s ease-in-out infinite alternate;
    }

    [data-theme="dark"] .circle:nth-child(even) {
      animation-direction: alternate-reverse;
    }

    @keyframes floatCircle {
      0% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(15px, -10px) scale(1.03); }
      66% { transform: translate(-10px, 8px) scale(0.97); }
      100% { transform: translate(5px, -5px) scale(1.01); }
    }

    [data-theme="dark"] .circle-1 {
      background: radial-gradient(circle, rgba(120, 0, 255, 0.25) 0%, transparent 70%);
      animation-duration: 14s;
    }

    [data-theme="dark"] .circle-2 {
      background: radial-gradient(circle, rgba(90, 30, 200, 0.2) 0%, transparent 70%);
      animation-duration: 16s;
    }

    [data-theme="dark"] .circle-3 {
      background: radial-gradient(circle, rgba(140, 50, 255, 0.18) 0%, transparent 70%);
      animation-duration: 11s;
    }

    [data-theme="dark"] .circle-4 {
      background: radial-gradient(circle, rgba(100, 40, 220, 0.2) 0%, transparent 70%);
      animation-duration: 13s;
    }

    [data-theme="dark"] .circle-5 {
      background: radial-gradient(circle, rgba(80, 15, 180, 0.17) 0%, transparent 70%);
      animation-duration: 15s;
    }

    [data-theme="dark"] .circle-6 {
      background: radial-gradient(circle, rgba(150, 60, 255, 0.15) 0%, transparent 70%);
      animation-duration: 10s;
    }

    [data-theme="dark"] .circle-7 {
      background: radial-gradient(circle, rgba(130, 0, 255, 0.2) 0%, transparent 70%);
      animation-duration: 17s;
    }

    [data-theme="dark"] .circle-8 {
      background: radial-gradient(circle, rgba(90, 20, 200, 0.18) 0%, transparent 70%);
      animation-duration: 12s;
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
