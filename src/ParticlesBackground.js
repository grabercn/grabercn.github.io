import { useEffect, useState, useRef } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // Using slim version of tsparticles

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  // State for storing scroll position
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false); // Track if scrolling is happening

  // Use a ref to persist the timeout across renders
  const scrollTimeoutRef = useRef(null);

  // Scroll event handler to update scrollY state and freeze particles
  const handleScroll = () => {
    setScrollY(window.scrollY);
    setIsScrolling(true); // Scroll is happening

    // Clear any existing timeout to reset it
    clearTimeout(scrollTimeoutRef.current);

    // Set a new timeout to freeze the particles after 100ms of inactivity
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false); // Freeze after scrolling stops for a while
    }, 100); // Freeze particles 100ms after scroll stops
  };

  useEffect(() => {
    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup scroll event listener and clear timeout on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeoutRef.current); // Clear the timeout when the component unmounts
    };
  }, []);

  // Define particles config directly as a JavaScript object
  const particlesConfig = {
    particles: {
      number: {
        value: 200, // Increased number of particles for a more "bubbly" effect
        density: {
          enable: true,
          value_area: 800, // Density of the particles in the viewport
        },
      },
      shape: {
        type: "circle", // Particle shape (circle to mimic bubbles)
      },
      opacity: {
        value: 0.6, // Slightly lower opacity for a softer look
        random: true, // Random opacity for a more natural bubble effect
        animation: {
          enable: true,
          speed: 1, // Slow opacity change to make the bubbles less harsh
          minimumValue: 0.3, // Minimum opacity for softer fade
        },
      },
      color: {
        value: "#D3D3D3", // Light grey color for the particles
      },
      size: {
        value: 3, // Smaller particles to resemble bubbles
        random: true, // Random sizes for varied bubble sizes
        animation: {
          enable: true,
          speed: 1, // Slow size growth for bubble-like movement
          minimumValue: 1, // Minimum particle size (to look like small bubbles)
        },
      },
      links: {
        enable: false, // Disable links for a cleaner look (no connections between bubbles)
      },
      move: {
        enable: true,
        speed: 1, // Upward movement speed of particles
        direction: "top", // Particles should move upward to simulate bubbles rising
        random: false, // No random directionality to simulate a steady upward motion
        straight: false,
        outModes: {
          default: "out", // Particles will disappear when they go out of bounds
        },
        attract: {
          enable: false,
        },
      },
    },
  };

  // This should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // Initialize particles engine and load Slim
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Function to handle particles loaded (no need for console.log)
  const particlesLoaded = (container) => {
    // You can handle additional tasks after particles are loaded
  };

  if (init) {
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
            transform: isScrolling
              ? `translateY(${scrollY * 0.1}px)` // Apply freeze effect during scroll
              : `translateY(${scrollY * 0.1}px)`, // Freeze position at scroll position
            transition: isScrolling ? "none" : "transform 0.5s ease-out", // No transition when scrolling happens
          }}
        >
          <Particles
            id="tsparticles"
            options={particlesConfig} // Directly inject the config here
            particlesLoaded={particlesLoaded} // Trigger particlesLoaded callback when particles are loaded
          />
        </div>
      </>
    );
  }

  return <></>;
};

export default ParticlesBackground;
