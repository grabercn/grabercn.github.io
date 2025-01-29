// PhotoViewer.js
import React from 'react';
import Gallery from 'react-photo-gallery';
import './PhotoViewer.css';

// Hardcoded list of images in the "public/photography" directory
const photos = [
  { src: '/photography/photo1.jpg', width: 4, height: 3 },
  { src: '/photography/photo2.jpg', width: 1, height: 1 },
  { src: '/photography/photo3.jpg', width: 3, height: 4 },
  // Add more manually listed images
];

const PhotoViewer = () => {
  return (
    <div className="photo-viewer">
      <h2>My Photo Gallery</h2>
      <Gallery photos={photos} />
    </div>
  );
};

export default PhotoViewer;
