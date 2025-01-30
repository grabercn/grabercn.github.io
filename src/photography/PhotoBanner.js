import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button, Typography } from 'antd';
import { HomeOutlined } from '@ant-design/icons'; // For the Home icon
import './PhotoBanner.css'; // Optional, for custom styling

const { Header, Content } = Layout;
const { Title } = Typography;

const PhotoBanner = () => {
  const [photoCount, setPhotoCount] = useState(0);

  useEffect(() => {
    // Fetching the number of photos from the PhotoObject.js file
    // Assuming the object is being imported from a local file or API
    const fetchPhotoCount = async () => {
      try {
        // Dynamically importing the PhotoObject.js file
        const { default: photoObjects } = await import('../../public/photography/PhotoObject.js');
        
        // Check if photoObjects is available and count the keys
        setPhotoCount(Object.keys(photoObjects).length);
      } catch (error) {
        console.error('Error loading photo data:', error);
      }
    };

    fetchPhotoCount();
  }, []);

  return (
    <Layout style={{ minHeight: '30vh' }}>
      {/* Sticky Header */}
      <Header style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#001529' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            type="link"
            icon={<HomeOutlined />}
            href="/"
            style={{ color: '#fff' }}
          >
            Go Home
          </Button>
          <Menu theme="dark" mode="horizontal" style={{ marginBottom: 0 }}>
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
      <Content style={{ padding: '0 50px', marginTop: '64px' }}>
        <div className="photo-banner" style={{ textAlign: 'center' }}>
          <Title level={1}>Welcome to the Photography Gallery</Title>
          <p>Browse through our stunning collection of photos!</p>
        </div>
      </Content>
    </Layout>
  );
};

export default PhotoBanner;
