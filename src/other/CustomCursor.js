import React, { useEffect, useRef, useState } from 'react';

// Custom mouse cursor for desktop (pointer: fine)
// Hides the system cursor when appropriate. Shows only after hero is out of view.
const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const canvasRef = useRef(null);
  const lastPosRef = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });
  const trailRef = useRef([]);
  const MAX_TRAIL = 24;
  const targetRef = useRef({ x: lastPosRef.current.x, y: lastPosRef.current.y });
  const ringPosRef = useRef({ x: lastPosRef.current.x, y: lastPosRef.current.y });
  const dotPosRef = useRef({ x: lastPosRef.current.x, y: lastPosRef.current.y });
  const dotVelRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(performance.now());
  const RING_DIAM = 56; // Sync with CSS ring size
  const RING_RADIUS = RING_DIAM / 2;

  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(true); // Only active when hero is out of view
  const activeRef = useRef(true);
  const [pressed, setPressed] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);
  const [hoveringNavbar, setHoveringNavbar] = useState(false);
  const hoveringNavbarRef = useRef(false);

  useEffect(() => {
    const supportsFinePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
    if (!supportsFinePointer) return; // Skip on touch devices
    setEnabled(true);

    const updateVisibility = () => {
      const shouldHide = document.hasFocus() && activeRef.current && !hoveringNavbarRef.current;
      document.documentElement.classList.toggle('cursor-hidden', shouldHide);
    };

    const onFocus = () => updateVisibility();
    const onBlur = () => updateVisibility();
    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);
    updateVisibility();

    // Compute active state based on hero position; works even without pointer movement
    const recomputeActive = () => {
      const heroEl = document.getElementById('hero-banner');
      let outOfView = true;
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        outOfView = rect.bottom <= 0;
      }
      activeRef.current = outOfView;
      setActive(outOfView);
      const { x, y } = lastPosRef.current;
      const under = document.elementFromPoint(x, y);
      const inNavbar = !!(under && under.closest && under.closest('.ant-layout-header, .ant-layout-footer'));
      // Compare using ref (latest value) to avoid stale-closure bugs
      if (hoveringNavbarRef.current !== inNavbar) setHoveringNavbar(inNavbar);
      hoveringNavbarRef.current = inNavbar;
      updateVisibility();
      if (outOfView) {
        if (dotRef.current) dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        if (ringRef.current) ringRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1)`;
        if (canvasRef.current) {
          const now = performance.now();
          trailRef.current.push({ x, y, t: now });
        }
      }
    };

    // Initial compute and listeners
    recomputeActive();
    window.addEventListener('scroll', recomputeActive, { passive: true });
    window.addEventListener('resize', recomputeActive, { passive: true });


    const move = (e) => {
      const { clientX: x, clientY: y } = e;
      lastPosRef.current.x = x;
      lastPosRef.current.y = y;
      targetRef.current.x = x;
      targetRef.current.y = y;
      const canvas = canvasRef.current;
      if (canvas) {
        trailRef.current.push({ x, y, t: performance.now() });
        if (trailRef.current.length > MAX_TRAIL) trailRef.current.shift();
      }
      // Proximity hover detection using ring radius
      const near = nearestInteractive(x, y, RING_RADIUS);
      const isNear = !!near;
      // Unconditional update to avoid stale-closure compare
      setHoveringInteractive(isNear);

      // Detect navbar hover (contrast tweak on dark header)
      const under = document.elementFromPoint(x, y);
      const inNavbar = !!(under && under.closest && under.closest('.ant-layout-header, .ant-layout-footer'));
      // Compare using ref (latest value) to avoid stale-closure bugs
      if (hoveringNavbarRef.current !== inNavbar) setHoveringNavbar(inNavbar);
      hoveringNavbarRef.current = inNavbar;
      // Update cursor/system visibility based on navbar crossing
      updateVisibility();
    };

    const down = (e) => {
      setPressed(true);
      // Click assist: if no interactive directly under pointer, dispatch to nearest within ring
      const x = lastPosRef.current.x;
      const y = lastPosRef.current.y;
      const under = document.elementFromPoint(x, y);
      const directInteractive = under && under.closest && under.closest('a, button, [role="button"], .ant-btn');
      if (!directInteractive) {
        const candidate = nearestInteractive(x, y, RING_RADIUS);
        if (candidate) {
          if (e && e.cancelable) {
            e.preventDefault();
            e.stopPropagation();
          }
          candidate.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, clientX: x, clientY: y }));
        }
      }
      // Trigger CSS click animations on ring and dot
      if (ringRef.current) {
        ringRef.current.classList.remove('clicking');
        // Force reflow to restart animation quickly
        // eslint-disable-next-line no-unused-expressions
        ringRef.current.offsetWidth;
        ringRef.current.classList.add('clicking');
        setTimeout(() => ringRef.current && ringRef.current.classList.remove('clicking'), 260);
      }
      if (dotRef.current) {
        dotRef.current.classList.remove('clicking');
        // eslint-disable-next-line no-unused-expressions
        dotRef.current.offsetWidth;
        dotRef.current.classList.add('clicking');
        setTimeout(() => dotRef.current && dotRef.current.classList.remove('clicking'), 260);
      }
    };
    const up = () => setPressed(false);

    const interactiveSelector = 'a, button, [role="button"], input, textarea, select, .ant-btn, .ant-menu-item';
    const over = (e) => {
      if (!(e.target instanceof Element)) return;
      setHoveringInteractive(e.target.closest(interactiveSelector) != null);
    };

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mousedown', down, { passive: false });
    window.addEventListener('mouseup', up, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });

    // Setup canvas trail renderer and animated chasing loop
    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext('2d') : null;
    const setCanvasSize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.offsetWidth | 0;
      const h = canvas.offsetHeight | 0;
      if (w && h) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        if (ctx) {
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.scale(dpr, dpr);
        }
      }
    };
    if (canvas) {
      setCanvasSize();
      window.addEventListener('resize', setCanvasSize);
    }

    let rafId = 0;
    const render = () => {
      // Time delta for physics
      const nowT = performance.now();
      let dt = (nowT - lastTimeRef.current) / 1000;
      lastTimeRef.current = nowT;
      if (dt > 0.05) dt = 0.05;

      // Animate ring toward target (light smoothing), and dot with spring-damper to ring
      const ring = ringRef.current;
      const dot = dotRef.current;
      if (ring && dot) {
        const rx = ringPosRef.current.x;
        const ry = ringPosRef.current.y;
        const tx = targetRef.current.x;
        const ty = targetRef.current.y;
        const ringLerp = 0.28; // ring follows cursor
        // ring update
        const nrx = rx + (tx - rx) * ringLerp;
        const nry = ry + (ty - ry) * ringLerp;
        // speed magnitude for stretchy scale
        const speed = Math.hypot(nrx - rx, nry - ry);
        ringPosRef.current.x = nrx;
        ringPosRef.current.y = nry;
        // dot physics: spring to ring with damping (overshoot then settle)
        const k = 90;   // spring stiffness
        const c = 14;   // damping
        const ex = nrx - dotPosRef.current.x;
        const ey = nry - dotPosRef.current.y;
        const ax = k * ex - c * dotVelRef.current.x;
        const ay = k * ey - c * dotVelRef.current.y;
        dotVelRef.current.x += ax * dt;
        dotVelRef.current.y += ay * dt;
        dotPosRef.current.x += dotVelRef.current.x * dt;
        dotPosRef.current.y += dotVelRef.current.y * dt;
        // whimsical micro-orbit
        const wob = nowT * 0.006;
        const wobAmp = 3;
        const dxW = Math.cos(wob) * wobAmp;
        const dyW = Math.sin(wob * 1.15) * wobAmp;
        // scale dynamics
        const baseScale = (document.activeElement && ['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName))
          ? 1.0
          : (pressed ? 0.85 : (hoveringInteractive ? 1.25 : 1.0));
        const moveStretch = Math.min(0.12, speed * 0.06);
        const navbarFactor = hoveringNavbar ? 0.5 : 1;
        ring.style.transform = `translate3d(${nrx}px, ${nry}px, 0) scale(${((baseScale + moveStretch) * navbarFactor).toFixed(3)})`;
        dot.style.transform = `translate3d(${(dotPosRef.current.x + dxW).toFixed(2)}px, ${(dotPosRef.current.y + dyW).toFixed(2)}px, 0) scale(${(1 + Math.min(0.12, speed * 0.04)) * navbarFactor})`;
        // visuals: interactive > default (navbar hides cursor)
        const ringInner = ring.firstElementChild; const dotInner = dot.firstElementChild; if (hoveringInteractive) { if (ringInner) { ringInner.style.borderColor = 'rgba(190,70,255,0.98)'; ringInner.style.boxShadow = '0 0 0 8px rgba(190,70,255,0.08)'; } if (dotInner) dotInner.style.background = '#8b2cff';
          if (ring.classList) ring.classList.remove('hovering'); if (dot.classList) dot.classList.remove('hovering');
        }
      }

      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        const now = performance.now();
        for (let i = 0; i < trailRef.current.length; i++) {
          const p = trailRef.current[i];
          const age = now - p.t;
          const life = 400;
          if (age > life) continue;
          const k = 1 - age / life;
          const size = 18 * k + 4;
          const alpha = 0.18 * k;
          const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size);
          grd.addColorStop(0, `rgba(75,14,151,${alpha})`);
          grd.addColorStop(1, `rgba(75,14,151,0)`);
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('mouseover', over);
      document.documentElement.classList.remove('cursor-hidden');
      // no observer to disconnect
      if (canvas) window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!enabled) return null;

  const ringOpacity = 0.55;
  const dotOpacity = pressed ? 0.95 : 0.9;

  return (
    <>
      <style>
        {`
          html.cursor-hidden, html.cursor-hidden * { cursor: none !important; }
          .cc-dot, .cc-ring { position: fixed; top: 0; left: 0; pointer-events: none; z-index: 2147483647; will-change: transform, opacity; }
          /* Containers control position; inners control visuals/animations */
          .cc-dot { width: 12px; height: 12px; margin-left: -6px; margin-top: -6px; }
          .cc-dot-inner { width: 100%; height: 100%; border-radius: 50%; background: #4b0e97; box-shadow: 0 0 10px rgba(75,14,151,0.35); }
          .cc-ring { width: 56px; height: 56px; margin-left: -28px; margin-top: -28px; }
          .cc-ring-inner { width: 100%; height: 100%; border-radius: 50%; border: 3px solid rgba(75, 14, 151, 0.95); box-shadow: 0 0 0 0 rgba(75,14,151,0.2); animation: ringPulse 2.2s ease-in-out infinite; }
          @keyframes ringPulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(110,43,189,0.15); } 50% { box-shadow: 0 0 0 6px rgba(110,43,189,0.07); } }
          /* Hover animations */
          .cc-ring.hovering .cc-ring-inner { animation: ringHover 1.1s ease-in-out infinite; }
          .cc-dot.hovering .cc-dot-inner { animation: dotHover 0.8s ease-in-out infinite; }
          @keyframes ringHover { 0%,100%{ transform: scale(1.0);} 50%{ transform: scale(1.08);} }
          @keyframes dotHover { 0%,100%{ transform: scale(1.0);} 50%{ transform: scale(1.18);} }
          /* Click ripple */
          .cc-ring.clicking .cc-ring-inner { animation: ringClick 260ms ease-out 1; }
          .cc-dot.clicking .cc-dot-inner { animation: dotClick 260ms ease-out 1; }
          @keyframes ringClick { 0%{ box-shadow: 0 0 0 0 rgba(190,70,255,0.25); } 100%{ box-shadow: 0 0 0 16px rgba(190,70,255,0); } }
          @keyframes dotClick { 0%{ transform: scale(1.0);} 60%{ transform: scale(0.8);} 100%{ transform: scale(1.0);} }
          @media (pointer: coarse) {
            .cc-dot, .cc-ring { display: none; }
          }
        `}
      </style>
      {/* Trail canvas */}
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 2147483646, opacity: active && !hoveringNavbar ? 1 : 0, transition: 'opacity 160ms ease' }} />
      <div ref={ringRef} className="cc-ring" style={{ transform: `translate3d(${lastPosRef.current.x}px, ${lastPosRef.current.y}px, 0)`, opacity: active && !hoveringNavbar ? ringOpacity : 0, transformOrigin: 'center center', transition: 'opacity 160ms ease' }}>
        <div className="cc-ring-inner" />
      </div>
      <div ref={dotRef} className="cc-dot" style={{ transform: `translate3d(${lastPosRef.current.x}px, ${lastPosRef.current.y}px, 0)`, opacity: active && !hoveringNavbar ? dotOpacity : 0, transition: 'opacity 120ms ease' }}>
        <div className="cc-dot-inner" />
      </div>
    </>
  );
};

export default CustomCursor;
 
// Helper: find nearest interactive element within radius
function nearestInteractive(x, y, radius) {
  const selector = 'a, button, [role="button"], .ant-btn';
  const pts = [{ x, y }];
  const dirs = [
    [1, 0], [-1, 0], [0, 1], [0, -1],
    [0.707, 0.707], [0.707, -0.707], [-0.707, 0.707], [-0.707, -0.707]
  ];
  for (const mul of [0.5, 1]) {
    for (const [dx, dy] of dirs) {
      pts.push({ x: x + dx * radius * mul, y: y + dy * radius * mul });
    }
  }
  for (const p of pts) {
    const el = document.elementFromPoint(p.x, p.y);
    if (el && el.closest) {
      const tgt = el.closest(selector);
      if (tgt) return tgt;
    }
  }
  return null;
}







