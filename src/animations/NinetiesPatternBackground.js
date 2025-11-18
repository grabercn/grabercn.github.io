import { useState, useEffect, useRef } from 'react';

// This component creates a 90's-inspired animated background.
// It features "slithering" zig-zags and squiggles that fade in and out on scroll.
const NinetiesPatternBackground = () => {
  const [shapes, setShapes] = useState([]);
  const [isContainerVisible, setIsContainerVisible] = useState(false);
  const containerRef = useRef(null);
  const numShapes = 30; // Increased number of shapes

  // Pre-defined SVG paths for the shapes
  const svgPaths = [
    "M 0 50 Q 25 0, 50 50 T 100 50", // A classic squiggle
    "M 0 0 L 20 50 L 40 0 L 60 50 L 80 0", // A sharp zig-zag
    "M 10 0 C 40 20, 60 20, 90 0", // A wide, smooth curve
    "M 0 25 L 25 0 L 50 25 L 75 0 L 100 25", // A smaller zig-zag
    "M 0 50 C 50 0, 50 100, 100 50" // An 'S' curve
  ];

  // Effect to observe the container's visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsContainerVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, []);

  // This effect runs once on component mount to generate the shapes.
  useEffect(() => {
    const generateShapes = () => {
      const newShapes = [];
      const colors = ['#e432ffd6', '#b374ffff']; // Purple and Dark Turquoise

      for (let i = 0; i < numShapes; i++) {
        const pathData = svgPaths[Math.floor(Math.random() * svgPaths.length)];
        const tempPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        tempPath.setAttribute("d", pathData);
        const pathLength = tempPath.getTotalLength();

        const angle = Math.random() * 2 * Math.PI;
        const radius = 45 * Math.sqrt(Math.random()); 
        const top = `calc(50vh + ${radius * Math.sin(angle)}vmax - 50px)`;
        const left = `calc(50vw + ${radius * Math.cos(angle)}vmax - 50px)`;

        newShapes.push({
          id: i,
          color: colors[Math.floor(Math.random() * colors.length)],
          top: top,
          left: left,
          rotation: Math.random() * 360,
          scale: Math.random() * 0.5 + 0.8,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${Math.random() * 2 + 3}s`, // Faster, more purposeful animation (3s to 5s)
          path: pathData,
          pathLength: pathLength
        });
      }
      setShapes(newShapes);
    }

    generateShapes();
    window.addEventListener('resize', generateShapes);
    return () => window.removeEventListener('resize', generateShapes);
  }, []);

  const styles = `
    /* Keyframe animation for a more purposeful drawing and fading effect */
    @keyframes purposefulSlither {
      0%, 100% {
        stroke-dashoffset: var(--path-length);
        opacity: 0;
      }
      10% {
        stroke-dashoffset: var(--path-length);
        opacity: 1;
      }
      80% {
        stroke-dashoffset: 0;
        opacity: 1;
      }
      90% {
        stroke-dashoffset: 0;
        opacity: 0;
      }
    }

    .nineties-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: transparent;
      z-index: 1;
      overflow: hidden;
      pointer-events: none;
      opacity: 0; /* Start hidden */
      transition: opacity 0.5s ease-out; /* Smooth fade for visibility change */
    }

    .nineties-container.is-visible {
      opacity: 1; /* Fade in when visible */
    }

    .shape-container {
      position: absolute;
      width: 100px;
      height: 100px;
    }

    .slithering-shape {
      stroke-width: 8px;
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
      animation-name: purposefulSlither;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in-out;
      filter: drop-shadow(0 0 5px var(--glow-color));
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div
        ref={containerRef}
        className={`nineties-container ${isContainerVisible ? 'is-visible' : ''}`}
      >
        {shapes.map((shape) => (
          <div
            key={shape.id}
            className="shape-container"
            style={{
              top: shape.top,
              left: shape.left,
              transform: `rotate(${shape.rotation}deg) scale(${shape.scale})`,
              '--glow-color': shape.color,
            }}
          >
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              overflow="visible"
            >
              <path
                className="slithering-shape"
                d={shape.path}
                stroke={shape.color}
                strokeDasharray={shape.pathLength}
                strokeDashoffset={shape.pathLength}
                style={{
                  '--path-length': shape.pathLength,
                  animationDelay: shape.animationDelay,
                  animationDuration: shape.animationDuration,
                }}
              />
            </svg>
          </div>
        ))}
      </div>
    </>
  );
};

export default NinetiesPatternBackground;
