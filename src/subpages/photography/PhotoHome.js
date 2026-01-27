import React, { useEffect, useState } from 'react';
import { Spin, Modal, Layout, Menu, Typography, Skeleton, Button } from 'antd';
import { FullscreenOutlined, HomeOutlined, CameraOutlined, LoadingOutlined, CustomerServiceOutlined, InfoCircleOutlined } from '@ant-design/icons';
import PhotoBanner from './PhotoBanner';
import FooterComponent from '../../other/Footer';
import Masonry from 'react-masonry-css';
import { motion, AnimatePresence } from 'framer-motion';
import ModernPurpleBackground from '../../animations/ModernPurpleBackground';
import GlowingHeaderAnimation from '../../animations/GlowingHeaderAnimation';
import ScrollPreview from './ScrollPreview';
import './PhotoHome.css';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

// Separate component for individual gallery items to handle image loading state independently
const GalleryItem = ({ photo, openModal }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      layout
      className="gallery-item"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "200px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Placeholder / Skeleton while loading */}
      {!isLoaded && (
        <div className="gallery-placeholder">
           <Skeleton.Image active />
        </div>
      )}
      
      <img 
        src={photo.path} 
        alt={photo.name} 
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={isLoaded ? "gallery-image-loaded" : "gallery-image-loading"}
      />
      
      {/* Show overlay only when loaded */}
      <div className="overlay" onClick={() => openModal(photo)} style={{ visibility: isLoaded ? 'visible' : 'hidden' }}>
        <FullscreenOutlined className="overlay-icon" />
        <div className="overlay-description">
          {photo.description}
        </div>
      </div>
    </motion.div>
  );
};

const PhotoHome = () => {
  const [photoObjects, setPhotoObjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showAbout, setShowAbout] = useState(false); // State for About Modal

  useEffect(() => {
    fetch('/photography/PhotoObject.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const photosArray = Object.values(data);
        if (photosArray.length > 0) {
          // Optional: Shuffle or sort photos here if needed
          setPhotoObjects(photosArray);
        }
      })
      .catch((error) => console.error("Error loading photo data:", error))
      .finally(() => setLoading(false));
  }, []);

  // Tighter breakpoints for "iPhone gallery" feel
  const breakpointColumnsObj = {
    default: 5, // More columns on large screens for density
    1600: 4,
    1200: 3,
    800: 2,
    500: 1,
  };

  const openModal = (photo) => setSelectedPhoto(photo);
  const closeModal = () => setSelectedPhoto(null);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: 'transparent', padding: 0, position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={['photography']}
          style={{
            lineHeight: '64px',
            backgroundColor: 'transparent',
            borderBottom: 'none',
            display: 'flex',
            width: '100%'
          }}
        >
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <a href="/">Home</a>
          </Menu.Item>
          
          <Menu.Item key="about" icon={<InfoCircleOutlined />} onClick={() => setShowAbout(true)}>
             About Gallery
          </Menu.Item>

          <Menu.Item key="photography" icon={<CameraOutlined />} style={{ marginLeft: 'auto' }}>
             Photography
          </Menu.Item>
          <Menu.Item key="music" icon={<CustomerServiceOutlined />}>
             <a href="/#/music">Music</a>
          </Menu.Item>
        </Menu>
      </Header>

      <ModernPurpleBackground />

      <Content style={{ padding: 0, backgroundColor: '#f3e8f9', position: 'relative' }}>
        {loading ? (
          <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: '#4D04A0' }} spin />} tip="Loading Gallery..." />
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            
            {photoObjects.length > 0 && <PhotoBanner photoObjects={photoObjects} />}

            <div className="photo-gallery" style={{ padding: '10px', maxWidth: '100%', margin: '0 auto' }}>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="gallery-grid"
                    columnClassName="gallery-column"
                >
                    {photoObjects.map((photo) => (
                        <GalleryItem key={photo.id} photo={photo} openModal={openModal} />
                    ))}
                </Masonry>
            </div>
            
            <ScrollPreview photoObjects={photoObjects} />
          </motion.div>
        )}
      </Content>

      <Footer style={{ textAlign: 'center', background: '#001529', color: '#fff', padding: '20px 0', borderTop: '1px solid #444', zIndex: 1, position: 'relative' }}>
        <GlowingHeaderAnimation />
        <FooterComponent />
      </Footer>

      {/* Full Image Modal */}
      <Modal
        open={!!selectedPhoto}
        footer={null}
        onCancel={closeModal}
        centered
        width="100vw"
        style={{ top: 0, padding: 0, maxWidth: '100vw', margin: 0 }}
        styles={{ 
            content: { background: 'transparent', boxShadow: 'none', padding: 0 },
            mask: { backgroundColor: 'rgba(0, 0, 0, 0.95)', backdropFilter: 'blur(5px)' }
        }}
        closeIcon={<span style={{ color: 'white', fontSize: '24px', position: 'fixed', top: 20, right: 20, zIndex: 2000, background: 'rgba(255,255,255,0.1)', width: 40, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%' }}>×</span>}
      >
        {selectedPhoto && (
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                style={{ 
                    width: '100vw', 
                    height: '100vh', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    padding: '20px'
                }}
                onClick={closeModal} // Click anywhere to close
            >
                <img
                    src={selectedPhoto.path}
                    alt={selectedPhoto.name}
                    style={{ 
                        maxWidth: '100%', 
                        maxHeight: '85vh', 
                        objectFit: 'contain', 
                        borderRadius: '4px',
                        boxShadow: '0 0 20px rgba(0,0,0,0.5)'
                    }}
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
                />
                <div style={{ 
                    color: '#eee', 
                    marginTop: '20px', 
                    fontSize: '16px', 
                    textAlign: 'center',
                    maxWidth: '800px',
                    textShadow: '0 2px 4px black',
                    background: 'rgba(0,0,0,0.4)',
                    padding: '10px 20px',
                    borderRadius: '20px'
                }}>
                    {selectedPhoto.description}
                </div>
            </motion.div>
        )}
      </Modal>

      {/* About Modal */}
      <Modal
        title="About My Photography"
        open={showAbout}
        onCancel={() => setShowAbout(false)}
        footer={[
          <Button key="close" onClick={() => setShowAbout(false)}>
            Close
          </Button>
        ]}
      >
        <Paragraph>
          Welcome to my personal photography collection. I capture moments that inspire me, focusing on landscapes, architecture, and the subtle beauty of everyday life.
        </Paragraph>
        <Title level={5}>Gear</Title>
        <Paragraph>
          All photos are taken with my trusted <strong>Pentax K3 Mk II</strong>.
        </Paragraph>
        <Paragraph>
          If you are interested in high-resolution versions or prints, please feel free to reach out to me via the contact methods on the home page.
        </Paragraph>
      </Modal>

    </Layout>
  );
};

export default PhotoHome;
