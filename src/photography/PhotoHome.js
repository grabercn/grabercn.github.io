import React, { useEffect, useState } from 'react';
import { Row, Col, Image } from 'antd';
import ParticlesBackground from '../animations/ParticlesBackground';
import PhotoBanner from './PhotoBanner';

const PhotoHome = () => {
  const [photoObjects, setPhotoObjects] = useState([]);

  useEffect(() => {
    // Fetch the photoObjects.json file from the public folder
    fetch('/photography/PhotoObject.json')
      .then((response) => {
        // Check if the response is OK
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();  // Parse the JSON response
      })
      .then((data) => {
        // Ensure the data is an object and has the correct format
        if (typeof data !== 'object' || Array.isArray(data)) {
          throw new Error("Fetched data is not in the expected object format.");
        }

        // Convert the object to an array to map over
        const photosArray = Object.values(data);

        // Ensure the array is not empty
        if (photosArray.length > 0) {
          setPhotoObjects(photosArray); // Store the fetched data as an array
        } else {
          console.error("No photos found in the fetched data.");
        }
      })
      .catch((error) => {
        console.error("Error loading photo data:", error); // Handle errors
      });
  }, []);

  return (
    <div className="photo-gallery">
      {/* Define the particle background */}
      <ParticlesBackground />

      {/* Pass the photoObjects data to the PhotoBanner component */}
      {/* Conditionally render PhotoBanner only if photoObjects is not empty */}
      {photoObjects.length > 0 && <PhotoBanner photoObjects={photoObjects} />}

      <Row gutter={[16, 16]}>
        {photoObjects.length > 0 ? (
          photoObjects.map((photo) => (
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
          ))
        ) : (
          <p>No photos available.</p>
        )}
      </Row>
    </div>
  );
};

export default PhotoHome;
