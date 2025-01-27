import React from 'react';
import { Card } from 'antd';
import FloatingText from './FloatingText'; // Import the FloatingText component

const FloatingCard = ({ children, title }) => {
  return (
    <FloatingText>
      <Card 
        hoverable 
        style={{
          position: 'relative',
          zIndex: 1,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          marginBottom: '20px',
          padding: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slight transparency for floating effect
          borderRadius: '10px',
          overflowY: 'auto', // To make the card content scrollable
        }}
      >
        {title && <h3 style={{ marginBottom: '15px' }}>{title}</h3>} {/* Render title if it exists */}
        {children}
      </Card>
    </FloatingText>
  );
};

export default FloatingCard;
