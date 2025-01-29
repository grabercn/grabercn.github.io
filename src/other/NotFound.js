import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import ParticlesBackground from '../animations/ParticlesBackground';

const NotFound = () => {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <ParticlesBackground />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you're looking for does not exist."
          extra={
            <Link to="/">
              <Button type="primary">Back to Home</Button>
            </Link>
          }
        />
      </div>
    </div>
  );
};

export default NotFound;
