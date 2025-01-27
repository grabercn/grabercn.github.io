import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Importing framer-motion
import { Row, Col, Button, Typography, Image } from 'antd';

const { Title, Paragraph } = Typography;

const Banner = () => {
  // State for random glow effect values
  const [glowSettings, setGlowSettings] = useState({
    brightness: 1,
    blur: 0,
  });

  // Function to generate random glow values
  const generateRandomGlow = () => {
    setGlowSettings({
      brightness: Math.random() * 1.5 + 1, // Random brightness between 1 and 2.5
      blur: Math.random() * 2 + 1, // Random blur between 1px and 6px
    });
  };

  // Set interval to update glow effect
  useEffect(() => {
    const interval = setInterval(generateRandomGlow, 1500); // Change every 1 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="banner" style={{ position: 'relative', height: '500px' }}>
      {/* Animated Background Image with Framer Motion */}
      <motion.div
        className="background-image"
        animate={{
          opacity: 1, // Ensuring the div fades in smoothly (optional)
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse', // Loops back and forth
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          transform: 'translateZ(0)', // Ensures proper stacking context
          transition: 'filter 1.5s ease-in-out', // Smooth transition for filter properties
          filter: `brightness(${glowSettings.brightness}) blur(${glowSettings.blur}px)`, // Apply the random glow settings
        }}
      >
        <Image
          width="100%"
          height="100%"
          src="https://images.pexels.com/photos/18069694/pexels-photo-18069694/free-photo-of-an-artist-s-illustration-of-artificial-intelligence-ai-this-illustration-depicts-language-models-which-generate-text-it-was-created-by-wes-cockx-as-part-of-the-visualising-ai-project-l.png"
          preview={false}
          style={{
            objectFit: 'cover',
            borderRadius: '8px',
            filter: 'url(#chromatic)', // Applying the chromatic aberration filter
          }}
        />
      </motion.div>

      {/* Banner Content Overlay */}
      <div
        className="banner-overlay"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          background: 'rgba(0, 0, 0, 0.4)', // Semi-transparent dark background for contrast
        }}
      >
        <Row justify="center" style={{ textAlign: 'center', color: '#fff' }}>
          <Col span={16}>
            <Title style={{ fontSize: '48px', fontWeight: 'bold', color: '#fff', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>
              Welcome to My Portfolio
            </Title>
            <Paragraph style={{ fontSize: '24px', color: '#fff', textShadow: '1px 1px 4px rgba(0, 0, 0, 0.6)' }}>
              A glimpse into my journey, my work, and my passion.
            </Paragraph>
            <Button type="primary" size="large" href="#contact">
              Get in Touch
            </Button>
          </Col>
        </Row>
      </div>

      {/* Chromatic Aberration Filter (SVG) */}
      <svg width="0" height="0">
        <defs>
          <filter id="chromatic">
            <feComponentTransfer in="SourceGraphic">
              <feFuncR type="table" tableValues="1 0.6" />
              <feFuncG type="table" tableValues="1 0.6" />
              <feFuncB type="table" tableValues="1 0.6" />
            </feComponentTransfer>
            <feOffset result="offOut" in="SourceAlpha" dx="8" dy="8" />
            <feBlend in="SourceGraphic" in2="offOut" mode="normal" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default Banner;
