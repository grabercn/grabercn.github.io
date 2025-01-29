import React, { useState } from 'react';
import { Layout, Modal, Typography, Button } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import ParticlesBackground from '../animations/ParticlesBackground';
import './PhotoHome.css'; // Custom CSS for animations

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const PhotoHome = () => {
  const [stacks, setStacks] = useState([
    {
      id: 'stack1',
      name: 'Nature',
      images: [
        { src: '/photography/photo1.jpg', title: 'Beautiful Sunset', description: 'A stunning sunset over the mountains.' },
        { src: '/photography/photo2.jpg', title: 'Serene Beach', description: 'A peaceful beach with calm waters and a clear sky.' },
        { src: '/photography/photo3.jpg', title: 'Autumn Leaves', description: 'The vibrant colors of autumn leaves in the forest.' },
      ],
      open: false,
    },
    {
      id: 'stack2',
      name: 'Cityscape',
      images: [
        { src: '/photography/photo4.jpg', title: 'City Lights', description: 'The lights of the city at night, captured from above.' },
        { src: '/photography/photo5.jpg', title: 'Street View', description: 'A bustling street scene during the day.' },
      ],
      open: false,
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentDescription, setCurrentDescription] = useState('');

  const openModal = (image) => {
    setCurrentImage(image.src);
    setCurrentTitle(image.title);
    setCurrentDescription(image.description);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setCurrentImage(null);
    setCurrentTitle('');
    setCurrentDescription('');
  };

  const toggleStack = (stackId) => {
    setStacks(stacks.map(stack =>
      stack.id === stackId ? { ...stack, open: !stack.open } : stack
    ));
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <ParticlesBackground />
      
      <Header style={{ backgroundColor: '#001529', padding: '20px 50px' }}>
        <div style={{ color: '#fff', fontSize: '24px' }}>Photography Showcase</div>
      </Header>

      <Content style={{ padding: '50px 50px', backgroundColor: '#f0f2f5' }}>
        <div style={{ textAlign: 'center' }}>
          <Title level={1}>Welcome to My Photography Portfolio</Title>
          <Paragraph style={{ fontSize: '18px' }}>Click on a stack to expand and view the images!</Paragraph>

          {/* Gallery Stack Layout */}
          <div className="stack-container">
            {stacks.map((stack) => (
              <div key={stack.id} className="photo-stack" onClick={() => toggleStack(stack.id)}>
                {/* Stack Images - Overlapping thumbnails */}
                <div className={`stack-thumbnails ${stack.open ? 'open' : ''}`}>
                  {stack.images.map((image, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="stack-thumbnail"
                      style={{
                        zIndex: stack.open ? 0 : stack.images.length - imgIndex,
                        transform: stack.open ? 'none' : `rotate(${imgIndex * 5}deg) translateY(${imgIndex * 10}px)`,
                      }}
                    >
                      <img src={image.src} alt={image.title} />
                    </div>
                  ))}
                </div>

                {/* Expanded Grid when stack is clicked */}
                {stack.open && (
                  <div
                    className="stack-expanded-images open"
                    style={{ zIndex: 1, position: 'absolute', top: '100%', left: 0, right: 0 }}
                  >
                    {stack.images.map((image, imgIndex) => (
                      <div key={imgIndex} className="stack-expanded-image" onClick={() => openModal(image)}>
                        <img src={image.src} alt={image.title} />
                      </div>
                    ))}
                  </div>
                )}

                {/* Arrow to collapse the stack */}
                {stack.open && (
                  <div className="collapse-arrow">
                    <Button
                      icon={<ArrowUpOutlined />}
                      onClick={() => toggleStack(stack.id)}
                      shape="circle"
                      style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#001529', color: '#fff' }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Content>

      <Footer style={{ textAlign: 'center', backgroundColor: '#001529', color: '#fff' }}>
        Photography Showcase © 2025
      </Footer>

      {/* Modal for full-size image preview */}
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={closeModal}
        width="80%"
        centered
        bodyStyle={{ padding: 0 }}
        style={{ borderRadius: '8px' }}
      >
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <img
            src={currentImage}
            alt={currentTitle}
            style={{
              width: '100%',
              maxHeight: '600px',
              objectFit: 'contain',
              borderRadius: '8px',
            }}
          />
          <Title level={3} style={{ marginTop: '20px' }}>
            {currentTitle}
          </Title>
          <Paragraph>{currentDescription}</Paragraph>
        </div>
      </Modal>
    </Layout>
  );
};

export default PhotoHome;
