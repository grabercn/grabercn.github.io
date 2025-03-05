import React, { useState, useEffect } from 'react';
import { Modal, Drawer, Button, Menu, Upload, message } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Map, Marker, Pane } from 'pigeon-maps';
import { motion } from 'framer-motion';
import CountryDetail from './CountryDetail';
import countries from './CountryData';
import EXIF from 'exif-js'; // Import EXIF library

const { SubMenu } = Menu;

const noLabelProvider = (x, y, z) =>
  `https://cartodb-basemaps-a.global.ssl.fastly.net/light_nolabels/${z}/${x}/${y}.png`;

const menuItems = [
  { label: "Home", url: "/" },
  { label: "About", url: "/about" },
  { label: "Services", url: "/services" },
  { label: "Contact", url: "/contact" }
];

const PhotoMapHome = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [currentZoom, setCurrentZoom] = useState(4);
  const [center, setCenter] = useState([46.603354, 1.888334]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [welcomeVisible, setWelcomeVisible] = useState(true);
  const [photos, setPhotos] = useState([]); // Store uploaded photos
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePhotoUpload = (file) => {
    // Ensure the file is a Blob (File) object
    if (file instanceof Blob) {
      const reader = new FileReader();
  
      reader.onload = function (e) {
        const image = new Image();
        image.onload = function () {
          // Extract EXIF data and location
          EXIF.getData(image, function () {
            const gpsData = EXIF.getTag(this, 'GPSLatitude');
            if (gpsData) {
              // Store photo with location and timestamp
              const photo = {
                src: e.target.result,
                timestamp: image.lastModifiedDate,
                location: gpsData, // Parse this further if needed
              };
              setPhotos((prev) => [...prev, photo]);
            } else {
              message.error('No location data found in this photo.');
            }
          });
        };
        image.src = e.target.result;
      };
      reader.readAsDataURL(file); // This should work if file is a Blob object
    } else {
      message.error('The uploaded file is not a valid image.');
    }
  
    return false; // Prevent automatic upload
  };  

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedCountry(null);
  };

  const uniqueCountries = countries.reduce((acc, country) => {
    if (!acc.find(c => c.name === country.name)) {
      acc.push(country);
    }
    return acc;
  }, []);

  const renderDrawerContent = () => (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      style={{ padding: 20 }}
    >
      <div style={{ marginBottom: 20, textAlign: 'center' }}>
        <img 
          src="https://via.placeholder.com/100" 
          alt="Brand Logo" 
          style={{ borderRadius: '50%' }} 
        />
        <h2 style={{ marginTop: 10, color: '#C175FF' }}>Photo Router</h2>
        <p style={{ fontSize: 14, color: '#555' }}>
          Find your route with photos.
        </p>
      </div>
      <Menu mode="inline" style={{ border: 'none' }}>
        {menuItems.map((item) => (
          <Menu.Item key={item.label}>
            <a href={item.url} style={{ fontSize: 18, color: '#1890ff' }}>{item.label}</a>
          </Menu.Item>
        ))}
        <SubMenu key="countries" title="Countries List">
          {uniqueCountries.map((country) => (
            <Menu.Item 
              key={country.name} 
              onClick={() => {
                setDrawerVisible(false);
                handleCountryClick(country);
              }}
              style={{ fontSize: 16 }}
            >
              {country.name}
            </Menu.Item>
          ))}
        </SubMenu>
      </Menu>
    </motion.div>
  );

  const handleUploadFinish = () => {
    if (photos.length === 0) {
      message.error("Please upload at least one photo.");
      return;
    }
    setWelcomeVisible(false);
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: drawerVisible || modalVisible ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        style={{ position: 'absolute', top: 20, left: 20, zIndex: 1100, display: 'flex', alignItems: 'center' }}
      >
        <Button 
          type="primary" 
          shape="circle" 
          icon={<MenuOutlined style={{ fontSize: 24 }} />} 
          onClick={() => setDrawerVisible(true)}
          style={{
            width: 50,
            height: 50,
            marginRight: 10,
          }}
        />
        <div style={{ color: '#C175FF', fontSize: 24, fontWeight: 'bold' }}>Borderless Living</div>
      </motion.div>

      <Drawer
        title={null} 
        placement="left"
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        closable={false}
        style={{ zIndex: 2000 }}
        maskClosable={true}
      >
        {renderDrawerContent()}
      </Drawer>

      <Modal
        visible={welcomeVisible}
        onCancel={() => {}}
        footer={null}
        title="Welcome to Borderless Living"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p>
            Upload photos, and we will guess your route!
            <br />
            <span style={{ fontSize: 12, color: '#999' }}>
              (Note: Location data is extracted from photo EXIF metadata.)
            </span>
          </p>
        </motion.div>
        <Upload 
          customRequest={handlePhotoUpload}
          showUploadList={false}
          accept="image/*"
        >
          <Button type="primary">Upload Photo</Button>
        </Upload>
        <center style={{ marginTop: 20 }}>
          <Button type="primary" onClick={handleUploadFinish}>Get Started</Button>
        </center>
      </Modal>

      <Map 
        center={center} 
        zoom={currentZoom} 
        provider={noLabelProvider}
        minZoom={4}
        maxZoom={18}
        onBoundsChanged={({ center: newCenter, zoom }) => {
          setCurrentZoom(zoom);
          setCenter(newCenter);
        }}
        width="100vw" 
        height="100vh"
      >
        {photos.map((photo, index) => {
          const { location, timestamp } = photo;
          const iconSize = 24 * (currentZoom / 4);
          return (
            <Marker 
              key={index}
              anchor={[location[0], location[1]]}
              onClick={() => {
                alert(`Photo taken at ${new Date(timestamp).toLocaleString()}`);
              }}
            >
              <div 
                style={{ 
                  background: "transparent",
                  border: "none",
                  width: iconSize + 16,
                  height: iconSize + 16,
                  display: "flex", 
                  justifyContent: "center", 
                  alignItems: "center", 
                  cursor: "pointer",
                  pointerEvents: "auto"
                }}
              >
                <img 
                  src={photo.src} 
                  alt={`photo thumbnail`} 
                  style={{ width: iconSize, height: 'auto' }} 
                />
              </div>
            </Marker>
          );
        })}
      </Map>
    </div>
  );
};

export default PhotoMapHome;
