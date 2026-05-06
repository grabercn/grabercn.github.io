import React, { useState, useMemo } from 'react';
import { Map, Marker } from 'pigeon-maps';
import './PhotoMap.css';

const locationCoords = {
  "Prague": [50.0755, 14.4378],
  "London": [51.5074, -0.1278],
  "Switzerland": [46.8182, 8.2275],
  "Italy": [45.4642, 9.1900],
  "Barcelona": [41.3874, 2.1686],
  "Ireland": [53.3498, -6.2603],
  "Japan": [35.6762, 139.6503],
};

const PREVIEW_COUNT = 9;

const PhotoMap = ({ photoObjects, openModal }) => {
  const [activeLocation, setActiveLocation] = useState(null);

  // Group photos by location, only include locations that have coordinates
  const locationGroups = useMemo(() => {
    const groups = {};
    photoObjects.forEach((photo) => {
      const loc = photo.location;
      if (loc && locationCoords[loc]) {
        if (!groups[loc]) {
          groups[loc] = [];
        }
        groups[loc].push(photo);
      }
    });
    return groups;
  }, [photoObjects]);

  const handleMarkerClick = (locationName) => {
    setActiveLocation(locationName);
  };

  const closePopup = () => {
    setActiveLocation(null);
  };

  const handleThumbClick = (photo) => {
    setActiveLocation(null);
    openModal(photo);
  };

  return (
    <div className="photo-map-container">
      <Map
        defaultCenter={[40, 30]}
        defaultZoom={2}
        minZoom={2}
        maxZoom={12}
      >
        {Object.entries(locationGroups).map(([locName, photos]) => {
          const coords = locationCoords[locName];
          return (
            <Marker
              key={locName}
              anchor={coords}
              onClick={() => handleMarkerClick(locName)}
              width={0}
            >
              <div className="map-marker">
                <div className="map-marker-pin">
                  <span className="map-marker-count">{photos.length}</span>
                </div>
                <span className="map-marker-label">{locName}</span>
              </div>
            </Marker>
          );
        })}
      </Map>

      {activeLocation && locationGroups[activeLocation] && (
        <div className="map-popup-overlay" onClick={closePopup}>
          <div className="map-popup" onClick={(e) => e.stopPropagation()}>
            <div className="map-popup-header">
              <div>
                <h3 className="map-popup-title">{activeLocation}</h3>
                <span className="map-popup-count">
                  {locationGroups[activeLocation].length} photo{locationGroups[activeLocation].length !== 1 ? 's' : ''}
                </span>
              </div>
              <button className="map-popup-close" onClick={closePopup}>
                &times;
              </button>
            </div>
            <div className="map-popup-grid">
              {locationGroups[activeLocation].slice(0, PREVIEW_COUNT).map((photo) => (
                <img
                  key={photo.id}
                  src={photo.path}
                  alt={photo.name}
                  className="map-popup-thumb"
                  loading="lazy"
                  onClick={() => handleThumbClick(photo)}
                />
              ))}
              {locationGroups[activeLocation].length > PREVIEW_COUNT && (
                <div className="map-popup-more">
                  +{locationGroups[activeLocation].length - PREVIEW_COUNT} more
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoMap;
