import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './ScrollPreview.css';

const ScrollPreview = ({ photoObjects }) => {
  const [hoverY, setHoverY] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [sampledPhotos, setSampledPhotos] = useState([]);
  const barRef = useRef(null);

  useEffect(() => {
    // Only show if we have photos
    if (!photoObjects || photoObjects.length === 0) return;

    const updateSampledPhotos = () => {
        const height = window.innerHeight - 64; // Subtract header height
        const itemHeight = 30; // Desired height for each thumbnail in the strip
        const count = Math.floor(height / itemHeight);
        
        if (count <= 0) return;

        const samples = [];
        const step = photoObjects.length / count;
        
        for (let i = 0; i < count; i++) {
            const index = Math.floor(i * step);
            if (photoObjects[index]) {
                samples.push(photoObjects[index]);
            }
        }
        setSampledPhotos(samples);
    };

    updateSampledPhotos();
    window.addEventListener('resize', updateSampledPhotos);
    return () => window.removeEventListener('resize', updateSampledPhotos);
  }, [photoObjects]);

  const handleMouseMove = (e) => {
    if (!barRef.current) return;
    
    const rect = barRef.current.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;
    const height = rect.height;
    
    // Clamp between 0 and 1
    const percentage = Math.max(0, Math.min(1, relativeY / height));
    
    // Map percentage to photo index
    const index = Math.floor(percentage * (photoObjects.length - 1));
    
    setHoverY(e.clientY);
    setPreviewPhoto(photoObjects[index]);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleClick = (e) => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;
    const height = rect.height;
    const percentage = Math.max(0, Math.min(1, relativeY / height));

    // Calculate scroll position
    // We want to map the percentage of the bar to the percentage of the page height
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = percentage * docHeight;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  // Use Portal to render outside of any overflow:hidden containers if necessary, 
  // but usually fixed position works fine inside App unless transform is used.
  // We'll stick to normal rendering first.

  if (!photoObjects || photoObjects.length === 0) return null;

  return (
    <div className="scroll-preview-container">
      <div 
        className="scroll-preview-bar"
        ref={barRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <div className="scroll-track">
            {sampledPhotos.map((photo, i) => (
                <div key={i} className="scroll-thumb" style={{ backgroundImage: `url(${photo.path})` }} />
            ))}
        </div>
      </div>

      {isHovering && previewPhoto && (
        <div 
            className="scroll-preview-tooltip"
            style={{ 
                top: hoverY,
                transform: 'translateY(-50%)' 
            }}
        >
          <div className="preview-image-container">
             <img src={previewPhoto.path} alt="preview" />
             <div className="preview-date">
                {/* If we had date, we'd show it. For now, show index/total or just the image */}
                {/* {previewPhoto.date} */}
             </div>
          </div>
          <div className="preview-arrow"></div>
        </div>
      )}
    </div>
  );
};

export default ScrollPreview;
