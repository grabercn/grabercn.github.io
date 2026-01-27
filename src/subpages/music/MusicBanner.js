import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import LazyLoad from 'react-lazyload'; // For lazy loading the image
import './MusicBanner.css'; // Optional for custom styling

const { Title } = Typography;

const MusicBanner = ({ photoPath, artistName, albumName }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

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
            <div className="image-placeholder" style={{ height: '100%', backgroundColor: '#f0f0f0' }}>
              <LoadingOutlined />
            </div>
          }
        >
          <div
            className="parallax-banner"
            style={{
              position: 'relative',
              height: '60vh',
              minHeight: '400px',
              overflow: 'hidden',
              backgroundImage: `url(${photoPath || '/images/default-banner.jpg'})`, 
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
                color: '#fff',
                background: 'rgba(0, 0, 0, 0.4)', // Darker overlay for readability
              }}
            >
              <div style={{ textAlign: 'center', padding: '20px', background: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', maxWidth: '80%' }}>
                <Title level={1} style={{ margin: 0 }}>{artistName}</Title>
                <Typography.Text strong style={{ fontSize: '1.2em', display: 'block', marginTop: '10px' }}>
                  {albumName} - New Release
                </Typography.Text>
              </div>
            </div>
          </div>
        </LazyLoad>
    </div>
  );
};

export default MusicBanner;
