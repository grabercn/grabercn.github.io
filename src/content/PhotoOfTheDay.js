import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Title } = Typography;

const PhotoOfTheDay = () => {
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    fetch('/photography/PhotoObject.json')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const photos = Object.values(data);
        if (photos.length > 0) {
          const today = new Date();
          const dayIndex = today.getDate() + today.getMonth() * 31;
          setPhoto(photos[dayIndex % photos.length]);
        }
      })
      .catch((err) => console.error('Error loading photo of the day:', err));
  }, []);

  if (!photo) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Title level={4} style={{ marginBottom: '16px' }}>
        <CameraOutlined style={{ marginRight: '8px' }} /> Photo of the Day
      </Title>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          maxWidth: '420px',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px rgba(77, 4, 160, 0.12)',
        }}
      >
        <picture>
          <source srcSet={photo.webpPath} type="image/webp" />
          <img
            src={photo.path}
            alt={photo.title || photo.description}
            loading="lazy"
            style={{
              width: '100%',
              maxHeight: '300px',
              objectFit: 'cover',
              borderRadius: '16px 16px 0 0',
              display: 'block',
            }}
          />
        </picture>
        <div style={{ padding: '16px 20px' }}>
          <div style={{ fontWeight: 600, fontSize: '16px', color: '#333', marginBottom: '6px' }}>
            {photo.title}
          </div>
          <div style={{ fontSize: '14px', color: '#666', lineHeight: 1.5 }}>
            {photo.description}
          </div>
        </div>
      </motion.div>
      <a
        href="/#/photo"
        style={{
          display: 'inline-block',
          marginTop: '16px',
          color: '#4D04A0',
          fontWeight: 600,
          fontSize: '15px',
          textDecoration: 'none',
          transition: 'color 0.2s',
        }}
      >
        See all photos &rarr;
      </a>
    </div>
  );
};

export default PhotoOfTheDay;
