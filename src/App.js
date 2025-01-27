import React from 'react';
import { Layout, Menu, Typography, Row, Col, Card, Tabs, Progress, Image, Carousel, Button } from 'antd';
import { motion } from 'framer-motion';
import './App.css';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

function App() {
  return (
    <Layout>
      <Header style={{ padding: '0 50px', backgroundColor: '#001529' }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1"><a href="#home">Home</a></Menu.Item>
          <Menu.Item key="2"><a href="#about">About Me</a></Menu.Item>
          <Menu.Item key="3"><a href="#projects">Projects</a></Menu.Item>
          <Menu.Item key="4"><a href="#skills">Skills</a></Menu.Item>
          <Menu.Item key="5"><a href="#testimonials">Testimonials</a></Menu.Item>
          <Menu.Item key="6"><a href="#contact">Contact</a></Menu.Item>
        </Menu>
      </Header>

      {/* Banner Section with Image and Gradient Background */}
      <div className="banner" style={{ padding: '100px 0', position: 'relative' }}>
        <Image
          width="100%"
          height={400}
          src=""
          preview={false}
          style={{ objectFit: 'cover', borderRadius: '8px' }}
        />
        <div className="banner-overlay">
          <Row justify="center" style={{ textAlign: 'center' }}>
            <Col span={16}>
              <Title style={{ color: '#fff', fontSize: '48px', fontWeight: 'bold' }}>Welcome to My Portfolio</Title>
              <Paragraph style={{ color: '#fff', fontSize: '24px' }}>
                A glimpse into my journey, my work, and my passion.
              </Paragraph>
              <Button type="primary" size="large" href="#contact">Get in Touch</Button>
            </Col>
          </Row>
        </div>
      </div>

      <Content style={{ padding: '0 50px' }}>

        {/* Slide-Up Animation for the whole page */}
        <motion.div
          className="site-layout-content"
          style={{ padding: '24px 0' }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >

          {/* Home Section */}
          <div id="home">
            <Title>Welcome to My Portfolio</Title>
            <Paragraph>
              Hi, I'm [Your Name], a [Your Profession]. This is a snapshot of my journey, skills, and accomplishments. Feel free to explore!
            </Paragraph>
          </div>

          {/* About Tab */}
          <div id="about">
            <Tabs defaultActiveKey="1">
              <TabPane tab="About Me" key="1">
                <Card title="About Me" hoverable>
                  <Paragraph>Write a brief introduction about yourself. Highlight your skills, experience, and personal story.</Paragraph>
                </Card>
              </TabPane>
            </Tabs>
          </div>

          {/* Projects Tab */}
          <div id="projects">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Projects" key="1">
                <Card title="Projects" hoverable>
                  <Paragraph>Here are some of the projects I've worked on:</Paragraph>
                  <ul>
                    <li>Project 1: Description and Link</li>
                    <li>Project 2: Description and Link</li>
                  </ul>
                </Card>
              </TabPane>
            </Tabs>
          </div>

          {/* Skills Tab */}
          <div id="skills">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Skills" key="1">
                <Card title="Skills" hoverable>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Progress type="circle" percent={90} format={() => 'React'} />
                    </Col>
                    <Col span={8}>
                      <Progress type="circle" percent={75} format={() => 'Node.js'} />
                    </Col>
                    <Col span={8}>
                      <Progress type="circle" percent={80} format={() => 'CSS'} />
                    </Col>
                  </Row>
                </Card>
              </TabPane>
            </Tabs>
          </div>

          {/* Testimonials Tab */}
          <div id="testimonials">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Testimonials" key="1">
                <Carousel autoplay>
                  <div>
                    <Card title="Client 1" hoverable>
                      <Paragraph>"[Your Name] is a fantastic professional. The work was above and beyond what we expected!"</Paragraph>
                    </Card>
                  </div>
                  <div>
                    <Card title="Client 2" hoverable>
                      <Paragraph>"Working with [Your Name] was an absolute pleasure. Highly recommended!"</Paragraph>
                    </Card>
                  </div>
                </Carousel>
              </TabPane>
            </Tabs>
          </div>

          {/* Contact Tab */}
          <div id="contact">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Contact" key="1">
                <Card title="Contact" hoverable>
                  <Paragraph>Feel free to reach out to me through the following methods:</Paragraph>
                  <ul>
                    <li>Email: your.email@example.com</li>
                    <li>Phone: +1 (555) 123-4567</li>
                    <li>LinkedIn: <a href="https://linkedin.com">LinkedIn Profile</a></li>
                  </ul>
                </Card>
              </TabPane>
            </Tabs>
          </div>

        </motion.div>
      </Content>

      <Footer style={{ textAlign: 'center', background: '#001529', color: '#fff' }}>
        &copy; 2025 Christian Graber. All rights reserved.
      </Footer>
    </Layout>
  );
}

export default App;
