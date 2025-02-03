import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownOutlined } from '@ant-design/icons';
import { Row, Col, Button, Typography, Image } from 'antd';
import JumpingText from '../animations/JumpingText';

const { Title, Paragraph } = Typography;

const Banner = () => {
  const [glowSettings, setGlowSettings] = useState({
    brightness: 1,
    blur: 0,
  });

  const [scrollPosition, setScrollPosition] = useState(0);

  const generateRandomGlow = () => {
    setGlowSettings({
      brightness: Math.random() * 1.5 + 1,
      blur: Math.random() * 2 + 1,
    });
  };

  useEffect(() => {
    const interval = setInterval(generateRandomGlow, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxEffect = (scrollPosition) => {
    const translateY = scrollPosition * 0.2;
    const blur = Math.min(scrollPosition / 10, 15);
    return {
      transform: `translateY(-${translateY}px)`,
      filter: `blur(${blur}px)`,
    };
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ backgroundColor: '#2c1e7d', overflow: 'hidden' }}>
      {/* Full-Page Parallax Banner */}
      <div className="banner" style={{ position: 'relative', height: '100vh' }}>
        {/* Animated Background Image with Parallax and Blur Effect */}
        <motion.div
          className="background-image"
          animate={{ opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            transform: 'translateZ(0)',
            transition: 'filter 1.5s ease-in-out',
            filter: `brightness(${glowSettings.brightness}) blur(${glowSettings.blur}px)`,
            ...parallaxEffect(scrollPosition),
          }}
        >
          <Image
            width="100%"
            height="100%"
            src="/images/banner.jpg"
            preview={false}
            style={{
              objectFit: 'cover',
              borderRadius: '8px',
              filter: 'url(#chromatic)', // Chromatic aberration effect
              opacity: 0.6,
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
            background: 'rgba(255, 255, 255, 0)',
          }}
        >
          <Row
            justify="center" // Ensures horizontal centering
            align="middle" // Ensures vertical centering
            style={{
              width: '100%',
              textAlign: 'center',
              color: '#fff',
              margin: 0, // Remove any margin/padding
              padding: 0, // Ensure no internal spacing in the Row
            }}
          >
            <JumpingText>
              <Col
                span={24} // Full width to avoid padding issues
                style={{ padding: 0 }} // Ensure no padding on Col
              >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <div style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden',  border: '4px solid purple' }}>
                    <img src="/images/profile.jpg" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                  </div>
                </div>
                <Title
                  style={{
                    fontSize: '48px',
                    fontWeight: 'bold',
                    color: '#fff',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                  }}
                >
                  Welcome to My Portfolio
                </Title>
                <Paragraph
                  style={{
                    fontSize: '24px',
                    color: '#fff',
                    textShadow: '1px 1px 4px rgba(0, 0, 0, 0.6)',
                  }}
                >
                  A glimpse into my journey, my work, and my passion.
                </Paragraph>
                <Button type="primary" size="large" onClick={scrollToContact}>
                  Get in Touch
                </Button>
                <div style={{ marginTop: '20px' }}>
                  <a onClick={scrollToContact}>
                    <ArrowDownOutlined
                      style={{
                        fontSize: '36px',
                        color: '#fff',
                        marginTop: '20px',
                        cursor: 'pointer',
                        animation: 'bounce 1.5s infinite',
                      }}
                    />
                  </a>
                </div>
              </Col>
            </JumpingText>
          </Row>
        </div>
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
