import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import LazyLoad from 'react-lazyload'; // Import the LazyLoad library
import './PhotoBanner.css'; // Optional, for custom styling

const { Title } = Typography;

const PhotoBanner = ({ photoObjects }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [randomPhoto, setRandomPhoto] = useState(null);

  // Set a random photo once on component mount
  useEffect(() => {
    if (photoObjects && photoObjects.length > 0) {
      const random = photoObjects[Math.floor(Math.random() * photoObjects.length)];
      setRandomPhoto(random); // Set the random photo object
    }
  }, [photoObjects]); // Run this effect only when photoObjects is updated

  // Handle scroll position for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax effect for the background image
  const parallaxEffect = (scrollPosition) => {
    const translateY = scrollPosition * 0.3; // Adjust the speed of the parallax effect
    return {
      transform: `translateY(-${translateY}px)`,
    };
  };

  return (
    <div style={{ padding: 0, marginTop: '0px', position: 'relative', overflow: 'hidden' }}>
        {/* Parallax Background */}
        <LazyLoad
          height={500} // Define a height for the LazyLoad wrapper
          offset={100} // Trigger load 100px before it comes into view
          placeholder={
            <div className="image-placeholder" style={{ height: '100vh', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <LoadingOutlined style={{ fontSize: 24 }} />
            </div>
          }
        >
          <div
            className="parallax-banner"
            style={{
              position: 'relative',
              height: '60vh', // Reduced from 100vh to be more like a banner
              minHeight: '400px',
              overflow: 'hidden',
              backgroundImage: `url(${randomPhoto ? randomPhoto.path : '/images/default-banner.jpg'})`, // Random photo or fallback
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              ...parallaxEffect(scrollPosition),
            }}
          >
            <div
              className="photo-banner-overlay"
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
                background: 'rgba(0, 0, 0, 0.25)', 
                flexDirection: 'column'
              }}
            >
              <div className="glass-panel" style={{ 
                  textAlign: 'center', 
                  padding: '40px', 
                  maxWidth: '80%',
                  background: 'rgba(255, 255, 255, 0.45) !important', // More transparent for better glass effect
                  backdropFilter: 'blur(40px) saturate(200%) !important' // Increased blur
              }}>
                <Title level={1} style={{ margin: 0, color: '#1a1a1a', textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>Photography Gallery</Title>
                <Typography.Text strong style={{ fontSize: '1.2em', display: 'block', marginTop: '10px', color: '#333' }}>
                  {photoObjects.length} Photos Captured on Pentax K3 Mk II
                </Typography.Text>
                 <Typography.Text style={{ display: 'block', marginTop: '5px', color: '#555' }}>
                  Contact <a href="mailto:grabercn@mail.uc.edu" style={{ color: '#4D04A0', textDecoration: 'underline' }}>grabercn</a> for full-res versions.
                </Typography.Text>
              </div>
            </div>
          </div>
        </LazyLoad>
    </div>
  );
};

export default PhotoBanner;
