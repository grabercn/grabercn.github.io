import React, { useState, useEffect } from 'react';
import { Layout, Menu, Typography, Row, Col, Card } from 'antd';
import { motion } from 'framer-motion'; // Importing framer-motion
import './App.css';
import { UserOutlined, RocketOutlined, MailOutlined, LinkedinOutlined, LikeOutlined, LaptopOutlined, GithubOutlined } from '@ant-design/icons';
import Banner from './other/Banner';
import FloatingText from './animations/FloatingText'; // Import the FloatingText Component
import FloatingCard from "./animations/FloatingCard"
import ParticlesBackground from './animations/ParticlesBackground'; // Import the ParticlesBackground Component
import Skills from './content/SkillsContent';
import Experience from './content/ExperienceContent';
import Projects from './content/ProjectsContent';
const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const sections = [
  {
    id: 'about',
    title: "About Me",
    content: (
      <>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Title level={3}>
              <UserOutlined style={{ marginRight: '8px' }} /> Who I Am
            </Title>
            <Paragraph>
              Hi! I'm Christian Graber, a passionate software developer currently in my fourth year of studying Computer Science at the University of Cincinnati. 
              Over the years, I've developed a deep love for solving complex problems using technology, particularly in software development and web technologies.
              I'm enthusiastic about both front-end and back-end development, with a particular focus on creating responsive and scalable web applications.
              My curiosity drives me to explore various technologies, and I'm always on the lookout for new ways to optimize and improve the solutions I work on.
            </Paragraph>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Title level={4}>
              <LaptopOutlined style={{ marginRight: '8px' }} /> My Technical Interests
            </Title>
            <Paragraph>
              I'm particularly interested in full-stack development and cloud computing. I enjoy building robust backends using technologies like Node.js, C#, and SQL,
              while also creating beautiful, user-friendly front-end experiences with React, TypeScript, and Tailwind CSS. 
              I'm passionate about building scalable, efficient solutions and have a strong foundation in designing APIs, working with databases, and ensuring the best user experiences.
              My other interests include IoT, microservices, and containerization technologies such as Docker, which I find fascinating for their potential in making systems more flexible and scalable.
            </Paragraph>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Title level={4}>
              <RocketOutlined style={{ marginRight: '8px' }} /> Career Goals
            </Title>
            <Paragraph>
              As I move closer to graduating, I'm eager to continue honing my skills in software engineering, particularly in roles where I can contribute to meaningful projects that make a difference.
              I'm looking for opportunities where I can apply my technical expertise in software development and gain hands-on experience with new technologies.
              Ultimately, I aim to grow into a versatile engineer who can work across different domains and continue learning throughout my career.
            </Paragraph>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Title level={4}>
              <LikeOutlined style={{ marginRight: '8px' }} /> Fun Facts
            </Title>
            <Paragraph>
              Aside from coding, I enjoy staying active and exploring new hobbies. Whether that's travelling, <a href='/#/photo/'>photography</a>, creating music, or hiking mountains, I'm always looking to grow.
              I also love to share knowledge and collaborate with others in tech communities. I believe in the power of continuous learning and sharing knowledge to help drive innovation.
            </Paragraph>
          </Col>
        </Row>
      </>
    ),
    cardTitle: "About Me"
  },
  {
    id: 'experience',
    title: "Experience",
    content: (
      <Experience />
    ),
    cardTitle: "My Professional Experience"
  },
  {
    id: 'projects',
    title: "Projects",
    content: (
      <Projects />
    ),
    cardTitle: "Projects"
  },
  {
    id: 'coursework',
    title: "Relevant Coursework",
    content: (
      <>
        <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
          <Col span={24}>
            <Paragraph>
              Throughout my academic journey, I've completed a variety of courses that have helped me build a solid foundation in computer science and software engineering. Here are some of the key courses I have taken:
            </Paragraph>
          </Col>
        </Row>
  
        {/* Year Row: Display years horizontally */}
        <Row gutter={[16, 16]} justify="center">
          {['2021-2022', '2022-2023', '2023-2024'].map((year, index) => (
            <Col key={index} xs={24} sm={12} md={8} style={{ textAlign: 'center' }}>
              <Card 
                title={year}
                bordered={false}
                style={{
                  backgroundColor: '#f0f0f0', 
                  padding: '0px', 
                  fontWeight: 'bold', 
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
              >
                <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                  {[
                    index === 0 ? [
                      'Computer Science 1',
                      'Data Structures',
                      'Introduction to Computer Systems',
                      'Python Programming',
                      'Information Security & Assurance'
                    ] : index === 1 ? [
                      'Discrete Computational Structures',
                      'Programming Languages',
                      'Database Design and Development',
                      'Design and Analysis of Algorithms',
                      'Operating Systems & Systems Programming',
                      'Software Engineering'
                    ] : index === 2 ? [
                      'Principles of Artificial Intelligence',
                      'Communication Networks 1',
                      'Principles of the IoT',
                      'Digital Image Processing 1',
                      'Software and Application Security'
                    ] : []
                  ].map((courses, courseIndex) => (
                    <div key={courseIndex} style={{ marginBottom: '0px' }}>
                      {courses.map((course, courseIdx) => (
                        <Paragraph key={courseIdx} style={{
                          backgroundColor: '#f5f5f5', // Light grey
                          padding: '10px',
                          borderRadius: '8px',
                          marginBottom: '10px',
                          color: '#333',
                        }}>
                          {course}
                        </Paragraph>
                      ))}
                    </div>
                  ))}
                </ul>
              </Card>
            </Col>
          ))}
        </Row>
      </>
    ),
    cardTitle: "Relevant Coursework",
  },   
  {
    id: 'skills',
    title: "Skills",
    cardTitle: "Skills",
    content: (
        <Skills />
    ),
  },
  {
    id: 'testimonials',
    title: "Testimonials",
    content: (
      <motion.div
        initial={{ opacity: 0, x: 100 }} 
        animate={{ opacity: 1, x: 0 }} 
        exit={{ opacity: 0, x: -100 }} 
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <Row gutter={[16, 16]} justify="start">
          <Col span={24} md={12} lg={8}>
            <Card title="Owen">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: '10px' }}>
                  <img 
                    src="https://media.licdn.com/dms/image/v2/D4E03AQHrN7gfXX9daA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1721495508580?e=2147483647&v=beta&t=i6iz4Rpd5hAf5MU_smNskOajmxtY2dVXdOCZbf-RRBU" 
                    alt="Client 1" 
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginRight: '10px'
                    }} 
                  />
                </div>
                <div>
                  <a href="https://www.linkedin.com/in/edwardoa" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold' }}>
                    Owen Edwards - Classmate
                  </a>
                </div>
              </div>
              <FloatingText className="text-animation">
                <Paragraph>"I met Christian in my computer science classes at the University of Cincinnati. I've worked with him on several projects in classes such as Operating Systems and Database Design and he's been a huge help. Additionally, l've been thoroughly impressed by his technical knowledge in C#, NET, and robotics, which he is on the executive board for at our school's robotics program. I've always felt welcome in his presence and I believe he would make a great teammate and collaborator for any future employer looking to hire Christian."</Paragraph>
              </FloatingText>
            </Card>
          </Col>

          <Col span={24} md={12} lg={8}>
            <Card title="John" >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: '10px' }}>
                  <img 
                    src="https://media.licdn.com/dms/image/v2/D5603AQEIAZMu19CBPw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1708389019802?e=2147483647&v=beta&t=NSxyIz3zlmi7OL8_bjKsp_0Q6yy7fPA7X_O1z5WYsg8" 
                    alt="Client 2" 
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginRight: '10px'
                    }} 
                  />
                </div>
                <div>
                  <a href="https://www.linkedin.com/in/john-ferrigan" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold' }}>
                    John Ferrigan - Product Owner
                  </a>
                </div>
              </div>
              <FloatingText className="text-animation">
                <Paragraph>"Christian was a co-op on one of my teams recently. In the short time he was with us, he got up to speed very quickly, understood our codebase and CI/CD processes, and delivered a ton of value over his rotation. He grew a lot while he was with us and by the time he left to return to school he'd helped us reach an important product launch milestone.
                            I highly recommend Christian, and know he'll be a great addition to any team lucky enough to have him."</Paragraph>
              </FloatingText>
            </Card>
          </Col>
        </Row>
      </motion.div>
    ),
    cardTitle: "Testimonials"
  },
  {
    id: 'contact',
    title: "Contact",
    content: (
      <>
        <Paragraph style={{ textAlign: 'center', fontSize: '18px', color: '#555', marginBottom: '20px' }}>
          Feel free to reach out to me through the following methods:
        </Paragraph>
        <ul style={{ listStyleType: 'none', paddingLeft: 0, margin: '0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <li style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', transition: 'transform 0.3s', padding: '10px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', width: 'auto', cursor: 'pointer' }}>
            <MailOutlined style={{ marginRight: '12px', fontSize: '28px', color: '#007BFF', transition: 'color 0.3s ease, transform 0.3s ease' }} />
            <a 
              href="mailto:grabercn@mail.uc.edu" 
              style={{ fontSize: '18px', color: '#007BFF', textDecoration: 'none', transition: 'color 0.3s ease, transform 0.3s ease' }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'} // Slight scaling effect on hover
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'} // Reset scale
            >
              grabercn@mail.uc.edu
            </a>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', transition: 'transform 0.3s', padding: '10px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', width: 'auto', cursor: 'pointer' }}>
            <LinkedinOutlined style={{ marginRight: '12px', fontSize: '28px', color: '#0077b5', transition: 'color 0.3s ease, transform 0.3s ease' }} />
            <a 
              href="https://www.linkedin.com/in/christian-graber" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ fontSize: '18px', color: '#0077b5', textDecoration: 'none', transition: 'color 0.3s ease, transform 0.3s ease' }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'} // Slight scaling effect on hover
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'} // Reset scale
            >
              christian-graber
            </a>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', transition: 'transform 0.3s', padding: '10px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', width: 'auto', cursor: 'pointer' }}>
            <GithubOutlined style={{ marginRight: '12px', fontSize: '28px', color: '#0077b5', transition: 'color 0.3s ease, transform 0.3s ease' }} />
            <a 
              href="https://github.com/grabercn/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ fontSize: '18px', color: '#0077b5', textDecoration: 'none', transition: 'color 0.3s ease, transform 0.3s ease' }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'} // Slight scaling effect on hover
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'} // Reset scale
            >
              grabercn
            </a>
          </li>
        </ul>
      </>
    ),
    cardTitle: "Contact"
  }  
];

function App() {
  const [activeSection, setActiveSection] = useState('home'); // Track the active section

  const handleScroll = () => {
    const sections = ['about', 'experience', 'projects', 'coursework', 'skills', 'testimonials', 'contact'];
    let currentSection = ''; // Default section

    sections.forEach((section, index) => {
      const sectionElement = document.getElementById(section);
      if (sectionElement) {
        const rect = sectionElement.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
          currentSection = section; // Use section id as the active section key
        }
      }
    });

    setActiveSection(currentSection); // Update the active section state
  };

  // handleMenuClick function to scroll to the right section
  const handleMenuClick = (id) => {
    const sectionElement = document.getElementById(id);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Attach the scroll event listener when component mounts
    window.addEventListener('scroll', handleScroll);
    return () => {
      // Clean up the scroll event listener on unmount
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Layout>
      <Header style={{ background: '#4D04A0', padding: '0 20px' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[activeSection]}
          style={{
            lineHeight: '64px',
            backgroundColor: '#4D04A0', // Set background to purple
            borderBottom: 'none', // Optional: remove border to blend with the header
          }}
        >
          {sections.map((section) => (
            <Menu.Item
              key={section.id}
              onClick={() => handleMenuClick(section.id)}
            >
              {section.title}
            </Menu.Item>
          ))}
        </Menu>
      </Header>

      {/* Use the Banner Component */}
      <Banner />

      {/* Add the ParticlesBackground component */}
      <ParticlesBackground />

      <Content
        style={{
          padding: '0 50px',
          backgroundColor: '#f3e8f9',
          cursor: 'default',
        }}
      >
        <motion.div
          className="site-layout-content"
          style={{ padding: '24px 0' }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          {sections.map((section, index) => (
            <div key={section.id} id={section.id}>
              <br />
              <FloatingCard
                title={section.cardTitle}
                style={{
                  // Mobile styles
                  width: '100%',
                  margin: '0 auto',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.85)', // Slight transparency
                  boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',
                }}
              >
                <FloatingText className="text-animation">
                  {section.content}
                </FloatingText>
              </FloatingCard>
              <br />
              <br />
            </div>
          ))}
        </motion.div>
      </Content>

      <Footer style={{
        textAlign: 'center', 
        background: '#001529', 
        color: '#fff', 
        padding: '20px 0', 
        fontSize: '14px', 
        borderTop: '1px solid #444',
        zIndex: 1,
      }}>
        <div style={{ marginBottom: '10px' }}>&copy; 2025 Christian Graber. All rights reserved.</div>
        <div style={{ fontSize: '12px', color: '#bbb' }}>
          Built with <span style={{ color: '#61DAFB' }}>React</span> and <span style={{ color: '#F7DF1E' }}>JavaScript</span> by Christian Graber
        </div>
      </Footer>
    </Layout>
  );
}

export default App;
