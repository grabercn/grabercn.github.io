import React, { useEffect, useState } from 'react';
import { Spin, Modal } from 'antd'; // Modal for full screen view
import { FullscreenOutlined } from '@ant-design/icons'; // Fullscreen icon
import PhotoBanner from './PhotoBanner';
import LazyLoad from 'react-lazyload';
import FooterComponent from '../../other/Footer';
import Masonry from 'react-masonry-css'; // Masonry layout library
import { motion } from 'framer-motion'; // For smooth animations
import './PhotoHome.css';

const PhotoHome = () => {
  const [photoObjects, setPhotoObjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null); // State for the full screen modal

  useEffect(() => {
    // Fetch the photoObjects.json file from the public folder
    fetch('/photography/PhotoObject.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (typeof data !== 'object' || Array.isArray(data)) {
          throw new Error("Fetched data is not in the expected object format.");
        }
        const photosArray = Object.values(data);
        if (photosArray.length > 0) {
          setPhotoObjects(photosArray);
        } else {
          console.error("No photos found in the fetched data.");
        }
      })
      .catch((error) => {
        console.error("Error loading photo data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Breakpoint settings for react-masonry-css.
  const breakpointColumnsObj = {
    default: 4,
    1200: 3,
    768: 2,
    480: 1,
  };

  const openModal = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="photo-gallery">
      {loading ? (
        <div
          style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <>
          {photoObjects.length > 0 && <PhotoBanner photoObjects={photoObjects} />}

          {/* Masonry layout */}
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="gallery-grid"
            columnClassName="gallery-column"
          >
            {photoObjects.length > 0 ? (
              photoObjects.map((photo) => (
                <motion.div
                  key={photo.id}
                  layout
                  className="gallery-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <LazyLoad height={200} offset={100}>
                    <img src={photo.path} alt={photo.name} loading="lazy" />
                  </LazyLoad>
                  {/* Overlay that appears on hover */}
                  <div className="overlay" onClick={() => openModal(photo)}>
                    <FullscreenOutlined className="overlay-icon" />
                    <div className="overlay-description">
                      {photo.description}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p>No photos available.</p>
            )}
          </Masonry>

          <br />

          <div
            style={{
              textAlign: 'center',
              background: '#001529',
              color: '#fff',
              padding: '20px 0',
              fontSize: '14px',
              borderTop: '1px solid #444',
              zIndex: 1,
            }}
          >
            <FooterComponent />
          </div>

          {/* Full screen modal for viewing the photo */}
          {selectedPhoto && (
            <Modal
              visible={!!selectedPhoto}
              footer={null}
              onCancel={closeModal}
              centered
              bodyStyle={{ padding: 0, backgroundColor: '#000' }}
              width="90%"
            >
              <img
                src={selectedPhoto.path}
                alt={selectedPhoto.name}
                style={{ width: '100%', height: 'auto' }}
              />
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default PhotoHome;
