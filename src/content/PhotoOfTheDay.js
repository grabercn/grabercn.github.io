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
        className="potd-card"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
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
          <div className="potd-title">{photo.title}</div>
          <div className="potd-desc">{photo.description}</div>
        </div>
      </motion.div>
      <a href="/#/photo" className="potd-link">
        See all photos &rarr;
      </a>
    </div>
  );
};

export default PhotoOfTheDay;
