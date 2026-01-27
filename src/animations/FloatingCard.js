import React from 'react';
import { Card } from 'antd';
import FloatingText from './FloatingText'; // Import the FloatingText component

const FloatingCard = ({ children, title }) => {
  return (
    <FloatingText>
      <Card  
        className="floating-card"
        style={{
          position: 'relative',
          zIndex: 1,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          marginBottom: '32px',
          padding: '24px',
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          borderRadius: '20px',
          overflowY: 'auto',
          border: '1px solid rgba(255, 255, 255, 0.8)',
        }}
      >
        {title && <h3 style={{ marginBottom: '20px', fontSize: '1.5rem', fontWeight: '700', color: '#333' }}>{title}</h3>}
        {children}
      </Card>
    </FloatingText>
  );
};

export default FloatingCard;
