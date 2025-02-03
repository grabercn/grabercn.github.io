import React, { useState, useEffect } from 'react';
import { Layout, Button, Typography } from 'antd';
import { HomeOutlined, LoadingOutlined } from '@ant-design/icons'; // For the Home icon
import LazyLoad from 'react-lazyload'; // For lazy loading the image
import './MusicBanner.css'; // Optional for custom styling

const { Header, Content } = Layout;
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
            marginRight: "16px"
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
          {/* Display artist and album name */}
          <Typography.Text style={{ color: '#fff', marginLeft: '16px', textAlign: 'center' }}>
            {artistName} - {albumName}
          </Typography.Text>
        </div>
      </Header>

      {/* Main Content */}
      <Content style={{ padding: 0, marginTop: '0px' }}>
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
              height: '100vh',
              overflow: 'hidden',
              backgroundImage: `url(${photoPath || '/images/default-banner.jpg'})`, // Default to a fallback image if no photoPath is provided
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              ...parallaxEffect(scrollPosition), // Apply parallax effect
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
                <Title level={1}>Welcome to my Music Site</Title>
                <h1 style={{ color: '#333' }}>
                  Get Updates and More from {artistName}!
                </h1>
              </div>
            </div>
          </div>
        </LazyLoad>
      </Content>
    </Layout>
  );
};

export default MusicBanner;
