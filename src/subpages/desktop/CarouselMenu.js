import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AppstoreAddOutlined, DesktopOutlined, FileOutlined, SearchOutlined, GithubOutlined, CloudOutlined } from '@ant-design/icons';
import { Layout, Row, Col } from 'antd';
import { Content } from 'antd/es/layout/layout';
import './CarouselMenu.css';
import App from '../../App';

// Define the icons and actions
const desktopIcons = [
  { id: 'app1', label: 'Portfolio', icon: <AppstoreAddOutlined /> },
  { id: 'app2', label: 'Documents', icon: <FileOutlined /> },
  { id: 'app3', label: 'Desktop', icon: <DesktopOutlined /> },
  { id: 'app4', label: 'Search', icon: <SearchOutlined /> },
  { id: 'app5', label: 'Github', icon: <GithubOutlined /> },
  { id: 'app6', label: 'Cloud', icon: <CloudOutlined /> },
];

// AppWindow component to render the floating window with animation
const AppWindow = ({ label, onClose }) => {
  return (
    <motion.div
      className="app-window"
      initial={{ opacity: 0, y: 50 }} // Start from below (slide up effect)
      animate={{ opacity: 1, y: 0 }}  // Move to normal position (visible)
      exit={{
        opacity: 0, 
        y: 50,
        transition: { duration: 0.3 } // Slide down when closing with transition
      }} // Slide down when closing
      transition={{ duration: 0.3 }} // Open animation speed-up
    >
      <div className="app-window-content">
        {label === 'Portfolio' && <App />}
      </div>

      {/* Close button */}
      <button className="close-btn" onClick={onClose}>X</button>
    </motion.div>
  );
};

const CarouselMenu = () => {
  const [selectedIndex, setSelectedIndex] = useState(-1); // Initial state is -1 (no selection)
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isAppWindowVisible, setAppWindowVisible] = useState(false);
  const [currentAppLabel, setCurrentAppLabel] = useState('');

  // Handle selection via spacebar or click
  const handleSelection = () => {
    if (selectedIndex === -1) return; // Do nothing if no item is selected yet
    const selectedApp = desktopIcons[selectedIndex];
    setCurrentAppLabel(selectedApp.label); // Store selected app label
    setAppWindowVisible(true); // Show app window
  };

  // Handle hover selection
  const handleHover = (index) => {
    setHoveredIndex(index);
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  // Unselect keyboard-selected icon on mouse hover
  const handleMouseClick = (index) => {
    setSelectedIndex(index);
    setHoveredIndex(null); // Unselect hover effect when clicked
    const selectedApp = desktopIcons[index];
    setCurrentAppLabel(selectedApp.label); // Store selected app label
    setAppWindowVisible(true); // Show app window
  };

  // Handle close of the app window
  const closeAppWindow = () => {
    setAppWindowVisible(false); // Hide the app window
  };

  return (
    <Layout className="desktop-layout">
      <Content className="desktop">
        <Row gutter={[32, 32]} justify="center" wrap>
          {desktopIcons.map((icon, index) => (
            <Col
              key={icon.id}
              xs={8}
              sm={6}
              md={4}
              lg={3}
              xl={2}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transform: `scale(${index === selectedIndex || index === hoveredIndex ? 1.5 : 1})`,
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                opacity: index === selectedIndex || index === hoveredIndex ? 1 : 0.7,
              }}
            >
              <div
                id={icon.id}
                className="desktop-icon-wrapper"
                onClick={() => handleMouseClick(index)} // Click to select and launch app
                onKeyPress={(e) => e.key === ' ' && handleSelection()}
                onMouseEnter={() => handleHover(index)} // Hover effect
                onMouseLeave={handleMouseLeave} // Hover leave effect
                role="button"
                tabIndex={0}
              >
                <div className="desktop-icon">{icon.icon}</div>
                <span className="desktop-icon-label">{icon.label}</span>
              </div>
            </Col>
          ))}
        </Row>

        {/* Show AppWindow if it's visible */}
        {isAppWindowVisible && (
          <AppWindow label={currentAppLabel} onClose={closeAppWindow} />
        )}
      </Content>
    </Layout>
  );
};

export default CarouselMenu;
