import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownOutlined, DownloadOutlined } from '@ant-design/icons';
import { Row, Col, Button, Typography } from 'antd';
import NinetiesPatternBackground from '../animations/NinetiesPatternBackground';

const { Title, Paragraph } = Typography;

const Banner = () => {
  // Static settings for a stable, non-choppy look
  const glowSettings = {
    brightness: 1.1,
    blur: 0,
  };

  const { scrollY } = useScroll();

  // Parallax effect: translate Y based on scroll
  const y = useTransform(scrollY, (value) => -value * 0.2);
  
  // Blur effect: increase blur with scroll, capped at 15px
  const blurValue = useTransform(scrollY, (value) => Math.min(value / 10, 15));
  
  // Combine brightness (static) and blur (dynamic from scroll) into a single filter string
  const filter = useTransform(blurValue, (b) => `brightness(${glowSettings.brightness}) blur(${b.toFixed(2)}px)`);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ backgroundColor: '#2c1e7d', overflow: 'hidden' }}>
      {/* Full-Page Parallax Banner */}
      <div id="hero-banner" className="banner" style={{ position: 'relative', height: '100svh' }}>
        {/* Animated Background Image with Parallax and Blur Effect */}
        <motion.div
          className="background-image"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            // Use motion values directly
            y,
            scale: 1.05, // Fixed scale to prevent seams
            filter, // Combined filter
            willChange: 'transform, filter', // Hint to browser
          }}
        >
          {/* Squiggles sit inside the blurred layer */}
          <NinetiesPatternBackground />
          <img
            src="/images/banner.jpg"
            alt=""
            loading="eager"
            decoding="async"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 0,
              // We can't easily apply the chromatic aberration SVG filter *and* the dynamic blur/brightness 
              // on the same element cleanly if we are already setting 'filter' style above.
              // The original code had `filter: 'url(#chromatic)'` on the IMG, and `filter: brightness...` on the DIV wrapper.
              // So we keep the IMG style as is.
              filter: 'url(#chromatic)', 
              opacity: 0.6,
              zIndex: 0,
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ width: '100%' }}
            >
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
                <Button 
                  type="primary" 
                  size="large" 
                  onClick={scrollToContact}
                  style={{
                    background: 'rgba(77, 4, 160, 0.8)',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    color: '#fff',
                    backdropFilter: 'blur(10px)',
                    fontWeight: '600',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  Get in Touch
                </Button>
                <div style={{ marginTop: '20px' }}/>
                <Button
                  style={{
                    color: '#fff', 
                    backgroundColor: 'rgba(45, 0, 77, 0.8)',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(10px)',
                    fontWeight: '600',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
                  }}
                  type="default"
                  size="large"
                  onClick={() => window.open('/docs/Graber_Christian_Resume_2025.pdf', '_blank')}
                >
                  <DownloadOutlined style={{ marginRight: '8px' }} />
                  View Resume
                </Button>
                <div style={{ marginTop: '20px' }}>
                  {/* eslint-disable-next-line */}
                  <a onClick={scrollToContact}>
                    <motion.div
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowDownOutlined
                        style={{
                          fontSize: '36px',
                          color: '#fff',
                          marginTop: '20px',
                          cursor: 'pointer',
                        }}
                      />
                    </motion.div>
                  </a>
                </div>
              </Col>
            </motion.div>
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
