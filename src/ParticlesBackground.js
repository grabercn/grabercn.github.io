import { useEffect, useState } from "react";

const ParticlesBackground = () => {
  const [particles, setParticles] = useState([]);
  const numParticles = 50;

  // Initialize particle positions and directions
  useEffect(() => {
    const initialParticles = [];

    for (let i = 0; i < numParticles; i++) {
      initialParticles.push({
        id: i,
        top: Math.random() * window.innerHeight, 
        left: Math.random() * window.innerWidth,
        size: Math.random() * 10 + 5, // Smaller size between 5 and 15px
        directionX: Math.random() < 0.5 ? -1 : 1, // Random horizontal direction
        directionY: Math.random() < 0.5 ? -1 : 1, // Random vertical direction
      });
    }

    setParticles(initialParticles);
  }, []);

  // Update particle positions and handle bouncing effect with opacity fade and blur
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setParticles((prevParticles) => {
        return prevParticles.map((particle) => {
          const newParticle = { ...particle };

          // Update position based on direction
          newParticle.top += newParticle.directionY * 3; // Slightly slower movement
          newParticle.left += newParticle.directionX * 3;

          // Bounce off the walls by reversing direction when hitting boundaries
          if (newParticle.top <= 0 || newParticle.top >= window.innerHeight - newParticle.size) {
            newParticle.directionY = -newParticle.directionY;
          }
          if (newParticle.left <= 0 || newParticle.left >= window.innerWidth - newParticle.size) {
            newParticle.directionX = -newParticle.directionX;
          }

          return newParticle;
        });
      });
    }, 30);

    return () => clearInterval(moveInterval); // Cleanup on unmount
  }, []);

  // Calculate the fade and blur effect based on the particle's position
  const getParticleStyle = (particle) => {
    const distanceToEdgeX = Math.min(particle.left, window.innerWidth - particle.left);
    const distanceToEdgeY = Math.min(particle.top, window.innerHeight - particle.top);
    const distanceToEdge = Math.min(distanceToEdgeX, distanceToEdgeY);

    const maxDistance = Math.min(window.innerWidth, window.innerHeight) / 2;
    const opacity = Math.max(0.1, 1 - distanceToEdge / maxDistance); // Fade effect
    const blur = Math.min(10, (1 - opacity) * 10); // Blur effect

    return {
      position: "absolute",
      top: particle.top,
      left: particle.left,
      width: particle.size,
      height: particle.size,
      borderRadius: "50%", // All circles
      backgroundColor: "#9b4dca", // Purple color
      opacity: opacity,
      filter: `blur(${blur}px)`, // Apply the blur effect
      transition: "transform 0.2s ease-out", // Smooth movement
    };
  };

  return (
    <>
      {/* Particles Layer */}
      <div
        style={{
          position: "fixed", // Fix particles in place relative to the viewport
          top: 0,
          left: 0,
          zIndex: 0, // Ensure particles stay in the background
          width: "100vw", // Full viewport width
          height: "200vh", // Ensure particles cover enough area for scrolling
          pointerEvents: "none", // Prevent interaction with particles
        }}
      >
        {particles.map((particle) => (
          <div
            key={particle.id}
            style={getParticleStyle(particle)} // Apply dynamic style based on position
          />
        ))}
      </div>
    </>
  );
};

export default ParticlesBackground;
