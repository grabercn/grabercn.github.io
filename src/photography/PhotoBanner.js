import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button, Typography } from 'antd';
import { HomeOutlined } from '@ant-design/icons'; // For the Home icon
import './PhotoBanner.css'; // Optional, for custom styling

const { Header, Content } = Layout;
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
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sticky Header */}
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          background: 'linear-gradient(to right,rgb(101, 0, 121),rgb(117, 0, 111))', // Gradient from black to gray
          padding: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Button
            type="link"
            icon={<HomeOutlined />}
            href="/"
            style={{ color: '#fff', marginLeft: '16px' }}
          >
            Go Home
          </Button>
          {/* Display photo count */}
          <Typography.Text style={{ color: '#fff', marginLeft: '16px', textAlign: 'center' }}>
            {photoObjects.length} Photos
          </Typography.Text>
          {/* pentax tag right aligned */}
          <Typography.Text level={3} style={{ color: '#fff', textAlign: 'right', flexGrow: 1, marginRight: '16px' }}>
            All Photos Taken on Pentax K3 Mk II
          </Typography.Text>
        </div>
      </Header>

      {/* Main Content */}
      <Content style={{ padding: 0, marginTop: '0px' }}>
        {/* Parallax Background */}
        <div
          className="parallax-banner"
          style={{
            position: 'relative',
            height: '100vh',
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
              color: '#fff',
              background: 'rgba(255, 255, 255, 0.5)', // Semi-transparent overlay for better readability
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <Title level={1}>Welcome to my Photography Gallery</Title>
              <h1 style={{ color: '#333' }}>
                Browse through the stunning collection of photos!
              </h1>
              <h2 style={{ color: '#333' }}>
                Contact{' '}
                <a
                  href="mailto:grabercn@mail.uc.edu"
                  style={{ color: '#333' }}
                >
                  grabercn
                </a>{' '}
                for watermark-free versions!
              </h2>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default PhotoBanner;
