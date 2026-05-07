import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { Spin, Modal, Layout, Typography, Skeleton, Button, Row, Col } from 'antd';
import { FullscreenOutlined, LoadingOutlined, InfoCircleOutlined, ArrowUpOutlined, LeftOutlined, RightOutlined, AppstoreOutlined, GlobalOutlined } from '@ant-design/icons';
import Navbar from '../../other/Navbar';
import PhotoBanner from './PhotoBanner';
import FooterComponent from '../../other/Footer';
import Masonry from 'react-masonry-css';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import ModernPurpleBackground from '../../animations/ModernPurpleBackground';
import GlowingHeaderAnimation from '../../animations/GlowingHeaderAnimation';
import ScrollPreview from './ScrollPreview';
import PhotoMap from './PhotoMap';
import './PhotoHome.css';

const { Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const LOCATION_CATEGORIES = ['All', 'Prague', 'London', 'Switzerland', 'Italy', 'Barcelona', 'Ireland', 'Japan', 'Other'];

// Animated counting stat card
const AnimatedStat = ({ value, label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1200;
    const startTime = performance.now();
    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, value]);

  return (
    <div ref={ref} className="stat-card">
      <div className="stat-number">{display}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

// Cycling stat card - rotates through country stats with animation
const CyclingStat = ({ countryCounts }) => {
  const [index, setIndex] = useState(0);
  const entries = useMemo(() =>
    Object.entries(countryCounts).sort((a, b) => b[1] - a[1]),
    [countryCounts]
  );

  useEffect(() => {
    if (entries.length <= 1) return;
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % entries.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [entries.length]);

  if (entries.length === 0) return null;
  const [country, count] = entries[index];

  return (
    <div className="stat-card stat-card-cycling">
      <AnimatePresence mode="wait">
        <motion.div
          key={country}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          style={{ textAlign: 'center' }}
        >
          <div className="stat-number">{count}</div>
          <div className="stat-label">in {country}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Separate component for individual gallery items to handle image loading state independently
// Uses IntersectionObserver for virtualized lazy mounting - only mounts content when near viewport
const GalleryItem = ({ photo, openModal }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Once visible, stop observing
        }
      },
      { rootMargin: '500px' } // Start loading 500px before viewport
    );

    if (itemRef.current) observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, []);

  // Lightweight placeholder until the item is near the viewport
  if (!isVisible) {
    return (
      <div ref={itemRef} className="gallery-item gallery-placeholder-virtual"
           style={{ minHeight: '250px' }} />
    );
  }

  const handleClick = () => {
    // On mobile, tap goes straight to fullscreen modal (no hover overlay)
    openModal(photo);
  };

  return (
    <motion.div
      ref={itemRef}
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

      <picture>
        <source srcSet={photo.webpPath} type="image/webp" />
        <img
          src={photo.path}
          alt={photo.name}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={isLoaded ? "gallery-image-loaded" : "gallery-image-loading"}
        />
      </picture>

      {/* Click overlay - title + description on desktop hover, tap on mobile */}
      <div className="overlay" onClick={handleClick} style={{ visibility: isLoaded ? 'visible' : 'hidden' }}>
        <FullscreenOutlined className="overlay-icon" />
        <div className="overlay-text">
          {photo.title && <div className="overlay-title">{photo.title}</div>}
          {photo.description && <div className="overlay-description">{photo.description}</div>}
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
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'
  const [activeLocation, setActiveLocation] = useState('All');

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

  // Filter photos by location
  const filteredPhotos = useMemo(() => {
    if (activeLocation === 'All') return photoObjects;
    return photoObjects.filter(p => p.location === activeLocation);
  }, [photoObjects, activeLocation]);

  const handleLocationClick = (loc) => {
    setActiveLocation(loc);
    // Scroll gallery into view when changing filter
    const gallery = document.querySelector('.photo-gallery');
    if (gallery) {
      gallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Tighter breakpoints for "iPhone gallery" feel
  const breakpointColumnsObj = {
    default: 5,
    1600: 4,
    1200: 3,
    800: 2,
    500: 1,
  };

  const openModal = useCallback((photo) => {
    const idx = filteredPhotos.indexOf(photo);
    setSelectedPhoto(photo);
    setSelectedIndex(idx);
  }, [filteredPhotos]);

  const closeModal = useCallback(() => {
    setSelectedPhoto(null);
    setSelectedIndex(-1);
  }, []);

  const goToPhoto = useCallback((newIndex) => {
    if (newIndex >= 0 && newIndex < filteredPhotos.length) {
      setSelectedPhoto(filteredPhotos[newIndex]);
      setSelectedIndex(newIndex);
    }
  }, [filteredPhotos]);

  const goNext = useCallback(() => {
    if (selectedIndex < filteredPhotos.length - 1) {
      goToPhoto(selectedIndex + 1);
    }
  }, [selectedIndex, filteredPhotos.length, goToPhoto]);

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

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar
        activeKey="photography"
        extraItems={[{ key: 'about', icon: <InfoCircleOutlined />, label: 'About Gallery', onClick: () => setShowAbout(true) }]}
      />

      <ModernPurpleBackground />

      <Content style={{ padding: 0, position: 'relative' }} className="photo-content">
        {loading ? (
          <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: '#4D04A0' }} spin />} tip="Loading Gallery..." />
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>

            {photoObjects.length > 0 && <PhotoBanner photoObjects={photoObjects} />}

            {/* Unified toolbar: stats + filters + view toggle */}
            <div className="gallery-toolbar">
              {/* Stats row */}
              {photoObjects.length > 0 && (() => {
                const uniqueCountries = new Set(photoObjects.map(p => p.location).filter(l => l && l !== 'Other'));
                const countryCount = uniqueCountries.size;
                const countryCounts = {};
                photoObjects.forEach(p => {
                  if (p.location && p.location !== 'Other') {
                    countryCounts[p.location] = (countryCounts[p.location] || 0) + 1;
                  }
                });
                return (
                  <div className="gallery-stats-row">
                    <AnimatedStat value={photoObjects.length} label="Photos" />
                    <AnimatedStat value={countryCount} label="Countries" />
                    <CyclingStat countryCounts={countryCounts} />
                  </div>
                );
              })()}

              {/* Filter tags + view toggle in one row */}
              <div className="gallery-controls-row">
                <div className="filter-tags-row">
                  {LOCATION_CATEGORIES.map(loc => (
                    <button
                      key={loc}
                      className={`filter-tag${activeLocation === loc ? ' filter-tag-active' : ''}`}
                      onClick={() => handleLocationClick(loc)}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
                <div className="gallery-controls-right">
                  <span className="filter-count">
                    {filteredPhotos.length} photo{filteredPhotos.length !== 1 ? 's' : ''}
                  </span>
                  <div className="view-toggle-group">
                    <button
                      className={`view-toggle-btn${viewMode === 'grid' ? ' active' : ''}`}
                      onClick={() => setViewMode('grid')}
                      title="Grid View"
                    >
                      <AppstoreOutlined />
                    </button>
                    <button
                      className={`view-toggle-btn${viewMode === 'map' ? ' active' : ''}`}
                      onClick={() => setViewMode('map')}
                      title="Map View"
                    >
                      <GlobalOutlined />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {viewMode === 'grid' ? (
              <>
                <div className="photo-gallery" style={{ padding: '10px', maxWidth: '100%', margin: '0 auto' }}>
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="gallery-grid"
                        columnClassName="gallery-column"
                    >
                        {filteredPhotos.map((photo) => (
                            <GalleryItem key={photo.id} photo={photo} openModal={openModal} />
                        ))}
                    </Masonry>
                </div>
                <ScrollPreview photoObjects={filteredPhotos} openModal={openModal} />
              </>
            ) : (
              <div className="photo-gallery" style={{ padding: '20px', maxWidth: '100%', margin: '0 auto' }}>
                <PhotoMap photoObjects={filteredPhotos} openModal={openModal} />
              </div>
            )}
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
        style={{ top: 0, padding: 0, maxWidth: '100%', margin: 0 }}
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
                    minHeight: '100vh',
                    height: '100%',
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
                {selectedIndex < filteredPhotos.length - 1 && (
                  <button className="modal-nav-btn modal-nav-next" onClick={(e) => { e.stopPropagation(); goNext(); }}>
                    <RightOutlined />
                  </button>
                )}

                <picture>
                    <source srcSet={selectedPhoto.webpPath} type="image/webp" />
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
                </picture>
                <div style={{
                    color: '#eee',
                    marginTop: '16px',
                    textAlign: 'center',
                    maxWidth: '800px',
                    textShadow: '0 2px 4px black',
                    background: 'rgba(0,0,0,0.5)',
                    padding: '12px 24px',
                    borderRadius: '16px',
                    pointerEvents: 'none',
                }}>
                    {selectedPhoto.title && (
                      <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: selectedPhoto.description ? '6px' : 0 }}>
                        {selectedPhoto.title}
                      </div>
                    )}
                    {selectedPhoto.description && (
                      <div style={{ fontSize: '14px', opacity: 0.85, lineHeight: 1.5 }}>
                        {selectedPhoto.description}
                      </div>
                    )}
                    {selectedPhoto.location && selectedPhoto.location !== 'Other' && (
                      <div style={{ fontSize: '12px', opacity: 0.6, marginTop: '6px' }}>
                        {selectedPhoto.location}
                      </div>
                    )}
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
