import React, { useState, useEffect, useRef } from 'react';
import { Layout, Typography, Row, Col, Card, Spin } from 'antd';
import { motion } from 'framer-motion'; // Importing framer-motion
import './App.css';
import { UserOutlined, RocketOutlined, MailOutlined, LinkedinOutlined, LikeOutlined, LaptopOutlined, GithubOutlined, LoadingOutlined } from '@ant-design/icons';
import Navbar from './other/Navbar';
import Banner from './other/Banner';
import FloatingText from './animations/FloatingText'; // Import the FloatingText Component
import FloatingCard from "./animations/FloatingCard"
import SectionBackground from './animations/SectionBackground';
import Skills from './content/SkillsContent';
import Experience from './content/ExperienceContent';
import Projects from './content/ProjectsContent';
import FooterComponent from './other/Footer';
import ModernPurpleBackground from './animations/ModernPurpleBackground';
import GlowingHeaderAnimation from './animations/GlowingHeaderAnimation';
import PhotoOfTheDay from './content/PhotoOfTheDay';
const { Content, Footer } = Layout;
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
              Aside from coding, I enjoy staying active and exploring new hobbies. Whether that's travelling, <a href='/#/photo/'>photography</a>, <a href='/#/music/'>creating music</a>, or hiking mountains, I'm always looking to grow.
              I also love to share knowledge and collaborate with others in tech communities. I believe in the power of continuous learning and sharing knowledge to help drive innovation.
            </Paragraph>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
          <Col span={24}>
            <PhotoOfTheDay />
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
    title: "Coursework",
    content: (() => {
      const courseworkData = [
        { year: '2021-2022', label: 'Freshman', courses: [
          { name: 'Computer Science 1', code: 'CS 1021' },
          { name: 'Intro to Computer Science', code: 'CS 1100' },
          { name: 'Engineering Design Thinking I & II', code: 'ENED 1100/1120' },
          { name: 'Pre-Calculus', code: 'MATH 1026' },
          { name: 'General Chemistry I & II', code: 'CHEM 1040/1041' },
        ]},
        { year: '2022-2023', label: 'Sophomore', courses: [
          { name: 'Data Structures', code: 'CS 2028C' },
          { name: 'Intro to Computer Systems', code: 'CS 2011' },
          { name: 'Python Programming', code: 'CS 2023' },
          { name: 'Information Security & Assurance', code: 'IT 2030C' },
          { name: 'Discrete Structures', code: 'CS 2071' },
          { name: 'Programming Languages', code: 'CS 3003' },
        ]},
        { year: '2023-2024', label: 'Junior', courses: [
          { name: 'Database Design & Development', code: 'CS 4092' },
          { name: 'Software Engineering', code: 'EECE 3093' },
          { name: 'Operating Systems & Systems Programming', code: 'EECE 4029' },
          { name: 'Probability & Statistics I', code: 'STAT 2037' },
          { name: 'Linear Algebra', code: 'MATH 2076' },
        ]},
        { year: '2024-2025', label: 'Senior', courses: [
          { name: 'International Exchange (Zurich)', code: 'MLTI 4015' },
          { name: 'Special Studies', code: 'EECE 4005' },
        ]},
        { year: '2025-2026', label: 'Senior (Final)', courses: [
          { name: 'CS Senior Design I & II', code: 'CS 5001/5002' },
          { name: 'User Interface I', code: 'CS 5167' },
          { name: 'Theory of Formal Languages & Automata', code: 'CS 5170' },
          { name: 'Software Testing & Quality Assurance', code: 'EECE 5132' },
          { name: 'Technical & Scientific Writing', code: 'ENGL 4092' },
          { name: 'Computer Networks', code: 'CS 4065' },
          { name: 'Design & Analysis of Algorithms', code: 'CS 4071' },
          { name: 'Visual Interfaces & Data', code: 'CS 5124' },
          { name: 'Network Security', code: 'CS 5153' },
        ]},
      ];

      // Use a simple interactive component inline
      const CourseworkTabs = () => {
        const [activeYear, setActiveYear] = React.useState('2025-2026');
        const activeGroup = courseworkData.find(g => g.year === activeYear);

        return (
          <>
            <Paragraph style={{ marginBottom: '16px' }}>
              University of Cincinnati — B.S. Computer Science, College of Engineering & Applied Science. Cumulative GPA: <strong>3.30</strong>. Dean's List recipient.
            </Paragraph>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px', justifyContent: 'center' }}>
              {courseworkData.map(group => (
                <button
                  key={group.year}
                  onClick={() => setActiveYear(group.year)}
                  style={{
                    padding: '8px 16px',
                    minHeight: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '20px',
                    border: activeYear === group.year ? '2px solid #4D04A0' : '2px solid rgba(77,4,160,0.2)',
                    background: activeYear === group.year ? '#4D04A0' : 'rgba(255,255,255,0.7)',
                    color: activeYear === group.year ? '#fff' : '#4D04A0',
                    fontWeight: 600,
                    fontSize: '13px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {group.label}
                  <span style={{ opacity: 0.7, marginLeft: '4px', fontSize: '11px' }}>
                    {group.year}
                  </span>
                </button>
              ))}
            </div>
            {activeGroup && (
              <Row gutter={[12, 12]}>
                {activeGroup.courses.map((course, idx) => (
                  <Col key={idx} xs={24} sm={12} md={8}>
                    <div
                      style={{
                        background: 'rgba(255,255,255,0.6)',
                        backdropFilter: 'blur(6px)',
                        WebkitBackdropFilter: 'blur(6px)',
                        padding: '14px 16px',
                        borderRadius: '12px',
                        borderLeft: '3px solid #4D04A0',
                        height: '100%',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        cursor: 'default',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(77,4,160,0.12)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '14px' }}>
                        {course.name}
                      </div>
                      <div style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>
                        {course.code}
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            )}
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <Paragraph type="secondary" style={{ fontSize: '13px' }}>
                {courseworkData.reduce((sum, g) => sum + g.courses.length, 0)} courses across {courseworkData.length} years
              </Paragraph>
            </div>
          </>
        );
      };
      return <CourseworkTabs />;
    })(),
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
    id: 'resume',
    title: "Resume",
    cardTitle: "Resume",
    content: (
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <Paragraph style={{ fontSize: '16px', maxWidth: '600px', margin: '0 auto 24px' }}>
          View my complete professional profile with detailed experience, skills, and education — or download the PDF.
        </Paragraph>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/#/resume" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', background: '#4D04A0', color: '#fff', borderRadius: '12px', fontWeight: 600, fontSize: '15px', textDecoration: 'none', transition: 'background 0.2s' }}>
            Interactive Resume
          </a>
          <button onClick={() => window.open('/docs/Graber_Christian_Resume_2025.pdf', '_blank')} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', background: 'rgba(77,4,160,0.1)', color: '#4D04A0', borderRadius: '12px', fontWeight: 600, fontSize: '15px', border: '2px solid rgba(77,4,160,0.2)', cursor: 'pointer', transition: 'background 0.2s' }}>
            Download PDF
          </button>
        </div>
      </div>
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
          <Col xs={24} sm={24} md={12} lg={8}>
            <Card title="Owen" style={{
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              height: '100%',
              borderLeft: '3px solid transparent',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-left-color 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 8px 18px rgba(0, 0, 0, 0.2)';
              e.currentTarget.style.borderLeftColor = '#4D04A0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
              e.currentTarget.style.borderLeftColor = 'transparent';
            }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: '10px' }}>
                  <img
                    src="https://media.licdn.com/dms/image/v2/D4E03AQHrN7gfXX9daA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1721495508580?e=2147483647&v=beta&t=i6iz4Rpd5hAf5MU_smNskOajmxtY2dVXdOCZbf-RRBU"
                    alt="Owen Edwards"
                    loading="lazy"
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
                <Paragraph style={{ fontStyle: 'italic', fontSize: '13.5px', color: '#555', lineHeight: '1.7', marginTop: '12px' }}>"I met Christian in my computer science classes at the University of Cincinnati. I've worked with him on several projects in classes such as Operating Systems and Database Design and he's been a huge help. Additionally, l've been thoroughly impressed by his technical knowledge in C#, NET, and robotics, which he is on the executive board for at our school's robotics program. I've always felt welcome in his presence and I believe he would make a great teammate and collaborator for any future employer looking to hire Christian."</Paragraph>
              </FloatingText>
            </Card>
          </Col>

          <Col xs={24} sm={24} md={12} lg={8}>
            <Card title="John" style={{
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              height: '100%',
              borderLeft: '3px solid transparent',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-left-color 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 8px 18px rgba(0, 0, 0, 0.2)';
              e.currentTarget.style.borderLeftColor = '#4D04A0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
              e.currentTarget.style.borderLeftColor = 'transparent';
            }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: '10px' }}>
                  <img
                    src="https://media.licdn.com/dms/image/v2/D5603AQEIAZMu19CBPw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1708389019802?e=2147483647&v=beta&t=NSxyIz3zlmi7OL8_bjKsp_0Q6yy7fPA7X_O1z5WYsg8"
                    alt="John Ferrigan"
                    loading="lazy"
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
                <Paragraph style={{ fontStyle: 'italic', fontSize: '13.5px', color: '#555', lineHeight: '1.7', marginTop: '12px' }}>"Christian was a co-op on one of my teams recently. In the short time he was with us, he got up to speed very quickly, understood our codebase and CI/CD processes, and delivered a ton of value over his rotation. He grew a lot while he was with us and by the time he left to return to school he'd helped us reach an important product launch milestone.
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
          <li style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', transition: 'transform 0.3s', padding: '14px 16px', minHeight: '48px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', width: 'auto', maxWidth: '100%', cursor: 'pointer', wordBreak: 'break-word', flexWrap: 'wrap' }}>
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
          <li style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', transition: 'transform 0.3s', padding: '14px 16px', minHeight: '48px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', width: 'auto', maxWidth: '100%', cursor: 'pointer', wordBreak: 'break-word', flexWrap: 'wrap' }}>
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
          <li style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', transition: 'transform 0.3s', padding: '14px 16px', minHeight: '48px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', width: 'auto', maxWidth: '100%', cursor: 'pointer', wordBreak: 'break-word', flexWrap: 'wrap' }}>
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
  const [activeSection, setActiveSection] = useState('home');
  const [loading, setLoading] = useState(true);
  const observerRef = useRef(null);
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return; // Don't observe if loading

    // IntersectionObserver options
    const options = {
      root: null, // viewport
      rootMargin: '-50% 0px -50% 0px', // trigger when element crosses the middle of the viewport
      threshold: 0
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    // Observe all sections
    const sectionIds = ['about', 'experience', 'projects', 'coursework', 'skills', 'resume', 'testimonials', 'contact'];
    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) observerRef.current.observe(element);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loading]); // Re-run when loading finishes

  // handleMenuClick function to scroll to the right section
  const handleMenuClick = (id) => {
    const sectionElement = document.getElementById(id);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f3e8f9' }}>
         <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: '#4D04A0' }} spin />} tip="Loading..." />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      <a href="#about" className="skip-to-main">Skip to main content</a>
      <Layout>
        <Navbar
          activeKey={activeSection}
          extraItems={sections.map((section) => ({
            key: section.id,
            label: section.title,
            onClick: () => handleMenuClick(section.id),
          }))}
        />

        {/* Use the Banner Component */}
        <Banner />

        {/* Add the Header and Background animations components (squiggles moved into Banner) */}
        <ModernPurpleBackground />

        <Content
          id="main-content"
          style={{
            padding: 0,
            backgroundColor: '#f3e8f9',
            cursor: 'default',
          }}
        >
          <motion.div
            className="site-layout-content"
            style={{ padding: 0 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          >
            {sections.map((section, index) => (
              <SectionBackground key={section.id} index={index}>
                <div id={section.id}>
                  <div className="content-wrap" style={{ margin: '24px 0' }}>
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
                  </div>
                </div>
              </SectionBackground>
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
          position: 'relative',
        }}>
          <GlowingHeaderAnimation />
          <FooterComponent />
        </Footer>
      </Layout>
    </motion.div>
  );
}

export default App;
