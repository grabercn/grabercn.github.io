import React from 'react';
import { Row, Col, Typography, Space } from 'antd';
import { Link } from 'react-router-dom';
import { GithubOutlined, LinkedinOutlined, MailOutlined } from '@ant-design/icons';

const { Text } = Typography;

const iconLinkStyle = {
  color: '#fff',
  fontSize: '28px',
  transition: 'color 0.3s ease, transform 0.3s ease',
  display: 'inline-block',
};

const FooterComponent = () => {
  const handleMouseEnter = (e) => {
    e.currentTarget.style.color = '#b07dff';
    e.currentTarget.style.transform = 'scale(1.2)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.color = '#fff';
    e.currentTarget.style.transform = 'scale(1)';
  };

  return (
    <>
      <Row justify="center" style={{ marginBottom: '16px' }}>
        <Col>
          <Space size="middle" wrap>
            <Link to="/photo">
              <Text style={{ color: '#fff', fontSize: 'clamp(14px, 3.5vw, 16px)' }}>Photography</Text>
            </Link>
            <Link to="/music">
              <Text style={{ color: '#fff', fontSize: 'clamp(14px, 3.5vw, 16px)' }}>Music</Text>
            </Link>
          </Space>
        </Col>
      </Row>

      <Row justify="center" style={{ marginBottom: '20px' }}>
        <Col>
          <Space size="middle" wrap>
            <a
              href="https://github.com/grabercn"
              target="_blank"
              rel="noopener noreferrer"
              style={iconLinkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <GithubOutlined />
            </a>
            <a
              href="https://www.linkedin.com/in/christian-graber"
              target="_blank"
              rel="noopener noreferrer"
              style={iconLinkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <LinkedinOutlined />
            </a>
            <a
              href="mailto:grabercn@mail.uc.edu"
              target="_blank"
              rel="noopener noreferrer"
              style={iconLinkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <MailOutlined />
            </a>
          </Space>
        </Col>
      </Row>

      <Row justify="center" style={{ marginBottom: '8px' }}>
        <Col>
          <Text style={{ fontSize: 'clamp(11px, 3vw, 13px)', color: '#999', letterSpacing: '0.3px', wordBreak: 'break-word' }}>
            Built with <span style={{ color: '#b07dff' }}>React</span> &amp; <span style={{ color: '#b07dff' }}>Ant Design</span>
          </Text>
        </Col>
      </Row>

      <Row justify="center">
        <Col>
          <Text style={{ fontSize: 'clamp(12px, 3vw, 14px)', color: '#bbb', wordBreak: 'break-word' }}>
            &copy; 2025 Christian Graber. All rights reserved.
          </Text>
        </Col>
      </Row>
    </>
  );
};

export default FooterComponent;
