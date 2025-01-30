import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button, Typography } from 'antd';
import { HomeOutlined } from '@ant-design/icons'; // For the Home icon
import './PhotoBanner.css'; // Optional, for custom styling

const { Header, Content } = Layout;
const { Title } = Typography;

const PhotoBanner = () => {
  const [photoObjects, setPhotoObjects] = useState({});
  const [scrollPosition, setScrollPosition] = useState(0);
  const [randomPhoto, setRandomPhoto] = useState(null); // State for the random photo

  // Fetch photoObjects from PhotoObject.js
  useEffect(() => {
    fetch('/photography/PhotoObject.js')
      .then((response) => response.text())
      .then((text) => {
        const photoObjects = eval(text);
        setPhotoObjects(photoObjects);
      });
  }, []);

  // Set a random photo once on component mount
  useEffect(() => {
    if (Object.keys(photoObjects).length > 0) {
      const random = Object.values(photoObjects)[Math.floor(Math.random() * Object.keys(photoObjects).length)];
      setRandomPhoto(random);
    }
  }, [photoObjects]); // Run this effect only when photoObjects is loaded

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

  // Get the photo count
  const photoCount = Object.keys(photoObjects).length;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sticky Header */}
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          backgroundColor: '#001529',
          padding: 0,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
          <Button
            type="link"
            icon={<HomeOutlined />}
            href="/"
            style={{ color: '#fff', marginLeft: '16px' }}
          >
            Go Home
          </Button>
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ marginBottom: 0, flexGrow: 1, justifyContent: 'center' }}
            responsive={false}
          >
            <Menu.Item key="1">
              Photo Gallery ({photoCount} Photos)
            </Menu.Item>
            <Menu.Item key="2" style={{ marginLeft: 'auto' }}>
              Christian Graber
            </Menu.Item>
          </Menu>
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
            backgroundImage: `url(${randomPhoto ? randomPhoto.path : '/images/default-banner.jpg'})`, // Random photo or default if no photos
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
              <Title level={1}>Welcome to the Photography Gallery</Title>
              <h1>Browse through our stunning collection of photos!</h1>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default PhotoBanner;
