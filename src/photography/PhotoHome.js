import React, { useEffect, useState } from 'react';
import { Row, Col, Image } from 'antd';
import ParticlesBackground from '../animations/ParticlesBackground';
import PhotoBanner from './PhotoBanner';

const PhotoHome = () => {
  const [photoObjects, setPhotoObjects] = useState({});

  useEffect(() => {
    // Fetch the PhotoObject.js file from the public folder
    fetch('/photography/PhotoObject.js')
      .then((response) => response.text())
      .then((text) => {
        // Evaluate the file content and set the photoObjects state
        const photoObjects = eval(text);
        setPhotoObjects(photoObjects);
      });
  }, []);

  return (
    <div className="photo-gallery">
      
      {/*Define the particle background */}
      <ParticlesBackground />

      {/* lets use a banner */}
      <PhotoBanner />

      <Row gutter={[16, 16]}>
        {Object.keys(photoObjects).map((key) => {
          const photo = photoObjects[key];
          return (
            <Col key={photo.id} xs={24} sm={12} md={8} lg={6}>
              <Image
                src={photo.path}
                alt={photo.name}
                width="100%"
                height="auto"
                preview={{ src: photo.path }}
                loading="lazy"
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default PhotoHome;
