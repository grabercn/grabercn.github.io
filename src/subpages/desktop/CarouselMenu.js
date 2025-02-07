import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AppstoreAddOutlined, FileOutlined, FolderOpenOutlined, GithubOutlined } from '@ant-design/icons';
import { Layout, Row, Col } from 'antd';
import { Content } from 'antd/es/layout/layout';
import './CarouselMenu.css';
import App from '../../App';
import ExternalWebsite from './Apps/ExternalWebsite';
import AppButtonList from './Apps/AppButtonList';
import SparklesBackground from '../../animations/SparklesBackground';

// Define the icons and actions, including colors for each icon (fallback for missing colors)
const desktopIcons = [
  { 
    id: 'app1', 
    label: 'Portfolio', 
    icon: <FolderOpenOutlined />,
    iconColor: '#71068F', // Icon color for this specific icon
    buttonTextColor: '#430056', // Button text color
  },
  { 
    id: 'app2', 
    label: 'Readme', 
    icon: <FileOutlined />,
  },
  { 
    id: 'app3', 
    label: 'Github', 
    icon: <GithubOutlined />,
  },
  { 
    id: 'app4', 
    label: 'Apps', 
    icon: <AppstoreAddOutlined />,
  },
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
        {label === 'Readme' && <ExternalWebsite url={"https://mkview.tech/https://github.com/grabercn/grabercn/blob/main/README.md"}/> }
        {label === 'Github' && <ExternalWebsite url={"https://gh-profile-viewer.vercel.app/grabercn"} />}
        {label === 'Apps' && <AppButtonList />}
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
    <div>
      {/* Sparkles Background: Place it behind the grid */}
      <div style={{ position: 'absolute', zIndex: 0, top: 0, left: 0, width: '100%', height: '100vh' }}>
        <SparklesBackground />
      </div>

      {/* Main Layout: Ensure icons and grid are above the background */}
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
                  transform: `scale(${index === hoveredIndex ? 1 : 1})`,
                  transition: 'transform 0.1s ease, opacity 0.1s ease',
                  opacity: index === selectedIndex || index === hoveredIndex ? 1 : 0.7,
                  zIndex: 1, // Make sure icons are on top of the background
                }}
              >
                <div
                  id={icon.id}
                  className="desktop-icon-wrapper"
                  onClick={() => handleMouseClick(index)} // Click to select and launch app
                  onMouseEnter={() => handleHover(index)} // Hover effect
                  onMouseLeave={handleMouseLeave} // Hover leave effect
                  role="button"
                  tabIndex={0}
                  style={{
                    color: icon.buttonTextColor || '#000000', // Default text color
                  }}
                >
                  <div
                    className="desktop-icon"
                    style={{
                      color: icon.iconColor || '#000000', // Default icon color
                    }}
                  >
                    {icon.icon}
                  </div>
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
    </div>
  );
};

export default CarouselMenu;
