import React from 'react';
import { Card } from 'antd';
import FloatingText from './FloatingText';

const FloatingCard = ({ children, title }) => {
  return (
    <FloatingText>
      <Card
        className="floating-card"
        style={{
          position: 'relative',
          zIndex: 1,
          marginBottom: '32px',
          padding: '24px',
          borderRadius: '20px',
          overflow: 'hidden',
          maxWidth: '100%',
        }}
      >
        {title && <h3 className="floating-card-title" style={{ marginBottom: '20px', fontSize: '1.5rem', fontWeight: '700' }}>{title}</h3>}
        {children}
      </Card>
    </FloatingText>
  );
};

export default FloatingCard;
