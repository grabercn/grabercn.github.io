import React, { useEffect, useState, useCallback } from 'react';
import { Spin, Modal, Layout, Menu, Typography, Skeleton, Button, Drawer } from 'antd';
import { FullscreenOutlined, HomeOutlined, CameraOutlined, LoadingOutlined, CustomerServiceOutlined, InfoCircleOutlined, ArrowUpOutlined, MenuOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
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

  const handleClick = () => {
    // On mobile, tap goes straight to fullscreen modal (no hover overlay)
    openModal(photo);
  };

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
      <div className="overlay" onClick={handleClick} style={{ visibility: isLoaded ? 'visible' : 'hidden' }}>
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
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showAbout, setShowAbout] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
          setPhotoObjects(photosArray);
        }
      })
      .catch((error) => console.error("Error loading photo data:", error))
      .finally(() => setLoading(false));
  }, []);

  // Back to top: show/hide based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tighter breakpoints for "iPhone gallery" feel
  const breakpointColumnsObj = {
    default: 5,
    1600: 4,
    1200: 3,
    800: 2,
    500: 1,
  };

  const openModal = useCallback((photo) => {
    const idx = photoObjects.indexOf(photo);
    setSelectedPhoto(photo);
    setSelectedIndex(idx);
  }, [photoObjects]);

  const closeModal = useCallback(() => {
    setSelectedPhoto(null);
    setSelectedIndex(-1);
  }, []);

  const goToPhoto = useCallback((newIndex) => {
    if (newIndex >= 0 && newIndex < photoObjects.length) {
      setSelectedPhoto(photoObjects[newIndex]);
      setSelectedIndex(newIndex);
    }
  }, [photoObjects]);

  const goNext = useCallback(() => {
    if (selectedIndex < photoObjects.length - 1) {
      goToPhoto(selectedIndex + 1);
    }
  }, [selectedIndex, photoObjects.length, goToPhoto]);

  const goPrev = useCallback(() => {
    if (selectedIndex > 0) {
      goToPhoto(selectedIndex - 1);
    }
  }, [selectedIndex, goToPhoto]);

  // Keyboard arrow navigation in modal
  useEffect(() => {
    if (!selectedPhoto) return;
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedPhoto, goNext, goPrev, closeModal]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Swipe drag end handler for framer-motion
  const handleDragEnd = (event, info) => {
    const threshold = 80;
    if (info.offset.x < -threshold) {
      goNext();
    } else if (info.offset.x > threshold) {
      goPrev();
    }
  };

  // Menu items for both desktop and drawer
  const menuItems = [
    { key: 'home', icon: <HomeOutlined />, label: <a href="/">Home</a> },
    { key: 'about', icon: <InfoCircleOutlined />, label: 'About Gallery', onClick: () => { setShowAbout(true); setDrawerOpen(false); } },
    { key: 'photography', icon: <CameraOutlined />, label: 'Photography', style: {} },
    { key: 'music', icon: <CustomerServiceOutlined />, label: <a href="/#/music">Music</a> },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: 'transparent', padding: 0, position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
        {/* Desktop menu */}
        <Menu
          className="desktop-menu"
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
          items={[
            { key: 'home', icon: <HomeOutlined />, label: <a href="/">Home</a> },
            { key: 'about', icon: <InfoCircleOutlined />, label: 'About Gallery', onClick: () => setShowAbout(true) },
            { key: 'photography', icon: <CameraOutlined />, label: 'Photography', style: { marginLeft: 'auto' } },
            { key: 'music', icon: <CustomerServiceOutlined />, label: <a href="/#/music">Music</a> },
          ]}
        />

        {/* Mobile hamburger button */}
        <Button
          className="mobile-menu-btn"
          type="text"
          icon={<MenuOutlined style={{ color: '#fff', fontSize: '22px' }} />}
          onClick={() => setDrawerOpen(true)}
          style={{
            position: 'absolute',
            top: 12,
            right: 16,
            zIndex: 1001,
            background: 'rgba(0,0,0,0.3)',
            border: 'none',
            borderRadius: '8px',
            width: 40,
            height: 40,
            display: 'none', /* shown via CSS on mobile */
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </Header>

      {/* Mobile drawer menu */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        styles={{ body: { padding: 0 } }}
      >
        <Menu
          mode="vertical"
          selectedKeys={['photography']}
          style={{ borderRight: 'none' }}
          items={menuItems}
        />
      </Drawer>

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

      {/* Back to Top floating button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            className="back-to-top-btn"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.25 }}
            aria-label="Back to top"
          >
            <ArrowUpOutlined />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Full Image Modal with swipe + navigation */}
      <Modal
        open={!!selectedPhoto}
        footer={null}
        onCancel={closeModal}
        centered
        width="100%"
        style={{ top: 0, padding: 0, maxWidth: '100vw', margin: 0 }}
        styles={{
            content: { background: 'transparent', boxShadow: 'none', padding: 0 },
            mask: { backgroundColor: 'rgba(0, 0, 0, 0.95)', backdropFilter: 'blur(5px)' }
        }}
        closeIcon={<span style={{ color: 'white', fontSize: '24px', position: 'fixed', top: 20, right: 20, zIndex: 2000, background: 'rgba(255,255,255,0.1)', width: 40, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%' }}>×</span>}
      >
        {selectedPhoto && (
            <motion.div
                key={selectedPhoto.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={handleDragEnd}
                style={{
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px',
                    cursor: 'grab',
                    overflow: 'hidden',
                }}
                onClick={closeModal}
            >
                {/* Prev arrow */}
                {selectedIndex > 0 && (
                  <button className="modal-nav-btn modal-nav-prev" onClick={(e) => { e.stopPropagation(); goPrev(); }}>
                    <LeftOutlined />
                  </button>
                )}

                {/* Next arrow */}
                {selectedIndex < photoObjects.length - 1 && (
                  <button className="modal-nav-btn modal-nav-next" onClick={(e) => { e.stopPropagation(); goNext(); }}>
                    <RightOutlined />
                  </button>
                )}

                <img
                    src={selectedPhoto.path}
                    alt={selectedPhoto.name}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '85vh',
                        objectFit: 'contain',
                        borderRadius: '4px',
                        boxShadow: '0 0 20px rgba(0,0,0,0.5)',
                        pointerEvents: 'none',
                        userSelect: 'none',
                    }}
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
