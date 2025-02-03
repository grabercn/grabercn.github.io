import React from 'react';
import { Row, Col, Typography, Space } from 'antd';
import { Link } from 'react-router-dom';
import { GithubOutlined, LinkedinOutlined, MailOutlined } from '@ant-design/icons';

const { Text } = Typography;

const FooterComponent = () => {
  return (
    <>
      <Row justify="center" style={{ marginBottom: '20px' }}>
        <Col span={24}>
          <Text style={{ fontSize: '18px', color: '#fff' }}>&copy; 2025 Christian Graber. All rights reserved.</Text>
        </Col>
      </Row>
      <Row justify="center" style={{ marginBottom: '30px' }}>
        <Col>
          <Space size="large">
            <Link to="/photo">
              <Text style={{ color: '#fff', fontSize: '18px' }}>Photography</Text>
            </Link>
            <Link to="/music">
              <Text style={{ color: '#fff', fontSize: '18px' }}>Music</Text>
            </Link>
          </Space>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col>
          <Space size="large">
            <a
              href="https://github.com/grabercn/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#fff' }}
            >
              <GithubOutlined style={{ fontSize: '30px' }} />
            </a>
            <a
              href="https://www.linkedin.com/in/christian-graber"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#fff' }}
            >
              <LinkedinOutlined style={{ fontSize: '30px' }} />
            </a>
            <a
              href="mailto:grabercn@mail.uc.edu"
              style={{ color: '#fff' }}
            >
              <MailOutlined style={{ fontSize: '30px' }} />
            </a>
          </Space>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col span={24}>
          <Text style={{ fontSize: '14px', color: '#bbb' }}>
            Built with <span style={{ color: '#61DAFB' }}>React</span> and <span style={{ color: '#F7DF1E' }}>JavaScript</span> by Christian Graber
          </Text>
        </Col>
      </Row>
    </>
  );
};

export default FooterComponent;
