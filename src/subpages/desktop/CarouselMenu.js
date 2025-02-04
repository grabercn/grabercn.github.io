import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UpOutlined } from '@ant-design/icons';  // Import the up arrow icon
import { Layout, Row, Col } from 'antd';
import { AppstoreAddOutlined, DesktopOutlined, FileOutlined, SearchOutlined, GithubOutlined, CloudOutlined } from '@ant-design/icons';
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
  const [scrollingUp, setScrollingUp] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [pullDistance, setPullDistance] = useState(0); // Tracks how far user has pulled

  // Handle scroll event to trigger closing of the window
  const handleScroll = (e) => {
    if (e.deltaY < 0) { // If user scrolls up
      setPullDistance((prev) => Math.max(prev - e.deltaY, 0)); // Increase pull distance on scroll up
      if (pullDistance > 50) { // When pulled enough, show the arrow
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }

      if (window.scrollY === 0 && pullDistance > 500) {
        // Once the user scrolls and pulls beyond a certain point, trigger the closing
        setScrollingUp(true); 
      }
    } else {
      setShowArrow(false); // Hide the arrow when scrolling down
      setPullDistance(0); // Reset the pull distance when scrolling down
    }
  };

  // Use the useEffect to add event listener for scroll
  useEffect(() => {
    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [pullDistance]);

  // Animate the closing of the app window when scrolling up
  return (
    <motion.div
      className="app-window"
      initial={{ opacity: 0, y: -50 }} // Initial state (invisible, slightly below)
      animate={scrollingUp ? { opacity: 0, y: -50 } : { opacity: 1, y: 0 }} // Animate to visible or sliding up if scrolling up
      exit={{ opacity: 0, y: -50 }} // Exit animation (fade out and slide up)
      transition={{ duration: 0.3 }} // Animation duration
      onAnimationComplete={() => scrollingUp && onClose()} // Close the dialog after animation
    >
      <div className="app-window-content">
          {label === 'Portfolio' && <App/>}
      </div>

      {/* The up arrow that appears during the "extra pull" phase */}
      <UpOutlined className={`arrow-up ${showArrow ? 'show' : ''}`} />
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
