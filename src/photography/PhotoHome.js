import React, { useState } from 'react';
import { Layout, Typography } from 'antd';
import PhotoViewer from './PhotoViewer';  // Import the new PhotoViewer component
import ParticlesBackground from '../animations/ParticlesBackground';
import './PhotoHome.css'; // Custom CSS for animations

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const PhotoHome = () => {
  const [stacks, setStacks] = useState([
    {
      id: 'stack1',
      name: 'Nature',
      description: 'A collection of beautiful nature photography.',
      images: [
        { src: '/photography/photo1.jpg', title: 'Beautiful Sunset', description: 'A stunning sunset over the mountains.' },
        { src: '/photography/photo2.jpg', title: 'Serene Beach', description: 'A peaceful beach with calm waters and a clear sky.' },
        { src: '/photography/photo3.jpg', title: 'Autumn Leaves', description: 'The vibrant colors of autumn leaves in the forest.' },
        { src: '/photography/photo4.jpg', title: 'Mountain Range', description: 'A breathtaking view of a snowy mountain range.' },
        { src: '/photography/photo5.jpg', title: 'Misty Forest', description: 'A quiet forest with mist rolling in.' },
      ],
    },
    {
      id: 'stack2',
      name: 'Cityscape',
      description: 'A selection of cityscape photography from around the world.',
      images: [
        { src: '/photography/photo6.jpg', title: 'City Lights', description: 'The lights of the city at night, captured from above.' },
        { src: '/photography/photo7.jpg', title: 'Street View', description: 'A bustling street scene during the day.' },
        { src: '/photography/photo8.jpg', title: 'Modern Skyline', description: 'A modern city skyline with tall buildings.' },
      ],
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentStack, setCurrentStack] = useState(null);

  const openModal = (stack) => {
    setCurrentStack(stack);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setCurrentStack(null);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <ParticlesBackground />

      {/* Header */}
      <Header style={{ backgroundColor: '#001529', padding: '20px 50px' }}>
        <div style={{ color: '#fff', fontSize: '24px' }}>Photography Showcase</div>
      </Header>

      <Content style={{ padding: '50px 50px', backgroundColor: '#f0f2f5' }}>
        <div style={{ textAlign: 'center' }}>
          <Title level={1}>Welcome to My Photography Portfolio</Title>
          <Paragraph style={{ fontSize: '18px' }}>Click on a stack to view the images!</Paragraph>

          {/* Gallery Stack Layout */}
          <div className="stack-container">
            {stacks.map((stack) => (
              <div key={stack.id} className="photo-stack" onClick={() => openModal(stack)}>
                {/* Stack Images - Overlapping and Rotated */}
                <div className={`stack-thumbnails`}>
                  {stack.images.slice(0, 3).map((image, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="stack-thumbnail"
                      style={{
                        zIndex: 3 - imgIndex,
                        transform: `rotate(${imgIndex * 5}deg) translateY(${imgIndex * 10}px)`, // Slight rotation and offset
                      }}
                    >
                      <img src={image.src} alt={image.title} />
                    </div>
                  ))}
                </div>
                <div className="stack-name">{stack.name}</div>
              </div>
            ))}
          </div>
        </div>
      </Content>

      <Footer style={{ textAlign: 'center', backgroundColor: '#001529', color: '#fff' }}>
        Photography Showcase © 2025
      </Footer>

      {/* PhotoViewer Modal */}
      {isModalVisible && (
        <PhotoViewer
          isModalVisible={isModalVisible}
          closeModal={closeModal}
          stack={currentStack}
        />
      )}
    </Layout>
  );
};

export default PhotoHome;
