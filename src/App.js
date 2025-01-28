import React, { useState, useEffect } from 'react';
import { Layout, Menu, Typography, Row, Col, Card, Avatar } from 'antd';
import { motion } from 'framer-motion'; // Importing framer-motion
import './App.css';
import { UserOutlined, CodeOutlined, RocketOutlined, CarOutlined, ShoppingCartOutlined, MailOutlined, LinkedinOutlined } from '@ant-design/icons';
import Banner from './Banner';
import FloatingText from './FloatingText'; // Import the FloatingText Component
import FloatingCard from "./FloatingCard"
import ParticlesBackground from './ParticlesBackground'; // Import the ParticlesBackground Component
import SkillsCarousel from './SkillsCarousel'; // Import the SkillsCarousel Component

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const sections = [
  {
    id: 'home',
    title: "Welcome to My Portfolio",
    content: (
      <>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Title level={3} style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="/images/profile.jpg"
                alt="Profile"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  marginRight: '15px',
                }}
              />
              Welcome to My Portfolio
            </Title>
            <Paragraph>
              Here you can take a glimpse into my journey, my work, and my passion projects. 
              <br />
              I'm Christian Graber, a Computer Science student with a passion for software development and technology. 
              <br />
              I'm excited to share my projects, skills, and experiences with you. 
              <br />
            </Paragraph>
          </Col>
        </Row>
      </>
    ),
    cardTitle: "Welcome to My Portfolio"
  },
  {
    id: 'about',
    title: "About Me",
    content: (
      <>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Title level={3}>
              <UserOutlined style={{ marginRight: '8px' }} /> A Little About Me
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
              <RocketOutlined style={{ marginRight: '8px' }} /> My Technical Interests
            </Title>
            <Paragraph>
              I’m particularly interested in full-stack development and cloud computing. I enjoy building robust backends using technologies like Node.js, C#, and SQL,
              while also creating beautiful, user-friendly front-end experiences with React, TypeScript, and Tailwind CSS. 
              I’m passionate about building scalable, efficient solutions and have a strong foundation in designing APIs, working with databases, and ensuring the best user experiences.
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
              As I move closer to graduating, I’m eager to continue honing my skills in software engineering, particularly in roles where I can contribute to meaningful projects that make a difference.
              I'm looking for opportunities where I can apply my technical expertise in software development and gain hands-on experience with new technologies.
              Ultimately, I aim to grow into a versatile engineer who can work across different domains and continue learning throughout my career.
            </Paragraph>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Title level={4}>
              <CodeOutlined style={{ marginRight: '8px' }} /> Fun Facts
            </Title>
            <Paragraph>
              Aside from coding, I enjoy staying active and exploring new hobbies. Whether it’s learning new programming languages, experimenting with robotics, or even participating in hackathons, I’m always looking to grow.
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
      <>
        <Row gutter={[16, 16]} style={{ paddingTop: '20px', paddingBottom: '40px' }}>
          <Col span={24}>
            <Title level={3}>
              <CodeOutlined style={{ marginRight: '8px' }} /> My Professional Experience
            </Title>
            <Paragraph>
              Here are some highlights from my internships and co-op roles, where I’ve had the opportunity to work on various impactful projects.
            </Paragraph>
          </Col>
        </Row>
  
        {/* Experience Cards */}
        <Row gutter={[32, 32]} style={{paddingBottom: '30px' }}>
          <Col span={24}>
            {/* MRI Software Internship */}
            <Card
              title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar src="path-to-mri-software-logo.png" size={40} style={{ marginRight: '12px' }} />
                  <span>Software Engineering Intern - MRI Software</span>
                </div>
              }
              hoverable
              style={{
                width: '100%',
                marginBottom: '20px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Paragraph>
                During my internship at MRI Software, I contributed to the development of 10+ API endpoints and modernized key system components, improving the overall performance.
              </Paragraph>
              <ul>
                <li>Developed and deployed API endpoints in C# .NET, improving data access by 20%</li>
                <li>Implemented RESTful APIs, boosting security and efficiency</li>
                <li>Worked with an Agile team to deliver high-quality software</li>
                <li>Led a fundraising initiative for a non-profit, raising $10,000</li>
              </ul>
              <div><strong>Relevant Skills:</strong> C# .NET, API Development, MSSQL, Agile, Scrum</div>
            </Card>
  
            {/* Midmark Corporation Internship (Dec 2023) */}
            <Card
              title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar src="path-to-midmark-logo.png" size={40} style={{ marginRight: '12px' }} />
                  <span>Software Engineering Intern - Midmark Corporation</span>
                </div>
              }
              hoverable
              style={{
                width: '100%',
                marginBottom: '20px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Paragraph>
                In my role at Midmark, I developed internal tools and worked on optimizing APIs and testing, resulting in improved stability and performance.
              </Paragraph>
              <ul>
                <li>Developed internal C# tools, reducing bugs by 15%</li>
                <li>Integrated Python testing to improve product quality by 100%</li>
                <li>Optimized RESTful APIs, reducing response times by 10%</li>
              </ul>
              <div><strong>Relevant Skills:</strong> C#, Python, API Optimization, Unit Testing</div>
            </Card>
  
            {/* Midmark Corporation Internship (Apr 2023) */}
            <Card
              title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar src="path-to-midmark-logo.png" size={40} style={{ marginRight: '12px' }} />
                  <span>Software Engineering Intern - Midmark Corporation</span>
                </div>
              }
              hoverable
              style={{
                width: '100%',
                marginBottom: '20px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Paragraph>
                I worked on developing reusable React components and collaborated closely with designers to improve usability and reduce friction in the UI.
              </Paragraph>
              <ul>
                <li>Developed 5+ reusable React components in TypeScript</li>
                <li>Improved UI usability, reducing friction by 10%</li>
                <li>Implemented micro frontends with Single-Spa</li>
              </ul>
              <div><strong>Relevant Skills:</strong> React, TypeScript, UI/UX Design, Micro Frontends</div>
            </Card>
  
            {/* Stonewall Boxers Website Developer */}
            <Card
              title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar src="path-to-stonewall-boxers-logo.png" size={40} style={{ marginRight: '12px' }} />
                  <span>Website Developer - Stonewall Boxers</span>
                </div>
              }
              hoverable
              style={{
                width: '100%',
                marginBottom: '20px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Paragraph>
                As a website developer for Stonewall Boxers, I built and optimized their website to drive traffic and enhance user experience.
              </Paragraph>
              <ul>
                <li>Created and optimized a dynamic website that attracted hundreds of users</li>
                <li>Implemented SEO strategies, boosting local web traffic</li>
              </ul>
              <div><strong>Relevant Skills:</strong> Web Development, SEO, HTML, CSS, JavaScript</div>
            </Card>
          </Col>
        </Row>
      </>
    ),
    cardTitle: "Experience"
  },  
  {
    id: 'projects',
    title: "Projects",
    content: (
      <ul>
        <li>
          <RocketOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
          <a href="https://github.com/grabercn/ForumHub" target="_blank" rel="noopener noreferrer">
            ForumHub: React, JavaScript, Java, PostgreSQL
          </a>
          <p>
            Developed a dynamic React-based forum website hosted on Azure, featuring a modern architecture and interface. Implemented pagination and efficient rendering of hundreds of posts, comments, and reactions.
          </p>
        </li>
        <li>
          <CarOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
          <a href="https://github.com/grabercn/RideShareApp" target="_blank" rel="noopener noreferrer">
            RideShare App: Kotlin, C#, .NET, MongoDB
          </a>
          <p>
            Developed an Android-based ride-sharing app using Kotlin with a .NET Core backend and MSSQL for data storage. Utilized MSSQL Server and MongoDB for scalable data management.
          </p>
        </li>
        <li>
          <ShoppingCartOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
          <a href="https://github.com/grabercn/eCommerceApp" target="_blank" rel="noopener noreferrer">
            eCommerce Application: Java, Spring Boot, React, PostgreSQL
          </a>
          <p>
            Developed a full-stack eCommerce web application using Java (Spring Boot) for the backend, React for the frontend, and PostgreSQL for data storage. Designed the database schema and synchronized the backend for Object-Relational Mapping.
          </p>
        </li>
      </ul>
    ),
    cardTitle: "Projects"
  },
  {
    id: 'coursework',
    title: "Relevant Coursework",
    content: (
      <>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Title level={3}>
              <CodeOutlined style={{ marginRight: '8px' }} /> Relevant Coursework
            </Title>
            <Paragraph>
              Throughout my academic journey, I've completed a variety of courses that have helped me build a solid foundation in computer science and software engineering. Here are some of the key courses I have taken:
            </Paragraph>
          </Col>
        </Row>
  
        {/* 2021-2022 Coursework */}
        <Row gutter={[16, 16]} style={{paddingBottom: '20px' }}>
          <Col span={24} md={12}>
            <Card title="2021-2022" hoverable>
              <ul>
                <li>Computer Science 1</li>
                <li>Data Structures</li>
                <li>Introduction to Computer Systems</li>
                <li>Python Programming</li>
                <li>Information Security & Assurance</li>
              </ul>
            </Card>
          </Col>
  
          {/* 2022-2023 Coursework */}
          <Col span={24} md={12}>
            <Card title="2022-2023" hoverable>
              <ul>
                <li>Discrete Computational Structures</li>
                <li>Programming Languages</li>
                <li>Database Design and Development</li>
                <li>Design and Analysis of Algorithms</li>
                <li>Operating Systems & Systems Programming</li>
                <li>Software Engineering</li>
              </ul>
            </Card>
          </Col>
        </Row>
  
        {/* 2023-2024 Coursework */}
        <Row gutter={[16, 16]} style={{ paddingTop: '20px', paddingBottom: '20px' }}>
          <Col span={24} md={12}>
            <Card title="2023-2024" hoverable>
              <ul>
                <li>Principles of Artificial Intelligence</li>
                <li>Communication Networks 1</li>
                <li>Principles of the IOT</li>
                <li>Digital Image Processing 1</li>
                <li>Software and Application Security</li>
              </ul>
            </Card>
          </Col>
  
          {/* 2024-2025 Coursework */}
          <Col span={24} md={12}>
            <Card title="2024-2025" hoverable>
              <ul>
                <li>Upcoming...</li>
              </ul>
            </Card>
          </Col>
        </Row>
  
        {/* 2025-2026 Coursework */}
        <Row gutter={[16, 16]} style={{ paddingTop: '20px', paddingBottom: '20px' }}>
          <Col span={24} md={12}>
            <Card title="2025-2026" hoverable>
              <ul>
                <li>Upcoming...</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </>
    ),
    cardTitle: "Relevant Coursework"
  },    
  {
    id: 'skills',
    cardTitle: "Skills",
    content: (
        <SkillsCarousel />
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
            <Card title="Owen" hoverable>
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
            <Card title="John" hoverable>
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
        <Paragraph>Feel free to reach out to me through the following methods:</Paragraph>
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            <li>
              <MailOutlined style={{ marginRight: '8px' }} />
              <a href="mailto:grabercn@mail.uc.edu">grabercn@mail.uc.edu</a>
            </li>
            <li>
              <LinkedinOutlined style={{ marginRight: '8px' }} />
              <a href="https://www.linkedin.com/in/christian-graber" target="_blank" rel="noopener noreferrer">
                christian-graber
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
    const sections = ['home', 'about', 'experience', 'projects', 'coursework', 'skills', 'testimonials', 'contact'];
    let currentSection = 'home'; // Default section
  
    sections.forEach((section, index) => {
      const sectionElement = document.getElementById(section);
      if (sectionElement) {
        const rect = sectionElement.getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom > 0) {
          currentSection = (index + 1).toString(); // Set the active section key as string '1', '2', etc.
        }
      }
    });
  
    setActiveSection(currentSection); // Update the active section state
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
      <Header style={{ padding: '0 50px', background: '#3A0268' }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" selectedKeys={[activeSection]} style={{ backgroundColor: '#3A0268' }}>
          <Menu.Item key="1" style={{ color: '#fff' }}><a href="#home">Home</a></Menu.Item>
          <Menu.Item key="2" style={{ color: '#fff' }}><a href="#about">About Me</a></Menu.Item>
          <Menu.Item key="3" style={{ color: '#fff' }}><a href="#experience">Experience</a></Menu.Item>
          <Menu.Item key="4" style={{ color: '#fff' }}><a href="#projects">Projects</a></Menu.Item>
          <Menu.Item key="5" style={{ color: '#fff' }}><a href="#coursework">Coursework</a></Menu.Item>
          <Menu.Item key="6" style={{ color: '#fff' }}><a href="#skills">Skills</a></Menu.Item>
          <Menu.Item key="7" style={{ color: '#fff' }}><a href="#testimonials">Testimonials</a></Menu.Item>
          <Menu.Item key="8" style={{ color: '#fff' }}><a href="#contact">Contact</a></Menu.Item>
          <Menu.Item 
            key="7" 
            style={{
              color: '#fff', 
              fontWeight: 'bold', 
              backgroundColor: '#d850e1', 
              transition: 'background-color 0.3s ease', 
            }}
          >
            <a href="public/docs/Graber_Christian_Resume_2024.pdf" style={{ color: '#fff' }}>
              Resume
            </a>
          </Menu.Item>
        </Menu>
      </Header>

      {/* Use the Banner Component */}
      <Banner />

      {/* Add the ParticlesBackground component */}
      <ParticlesBackground />

      <Content style={{
        padding: '0 50px',
        backgroundColor: '#f3e8f9',
      }}>
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
              <FloatingCard title={section.cardTitle}>
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
