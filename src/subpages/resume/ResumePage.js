import React, { useState, useEffect } from 'react';
import { Layout, Menu, Typography, Tag, Card, Timeline, Button, Drawer } from 'antd';
import {
  HomeOutlined,
  CameraOutlined,
  CustomerServiceOutlined,
  DownloadOutlined,
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
  MenuOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import FooterComponent from '../../other/Footer';
import ModernPurpleBackground from '../../animations/ModernPurpleBackground';
import GlowingHeaderAnimation from '../../animations/GlowingHeaderAnimation';
import './ResumePage.css';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

// ── Experience data (sourced from ExperienceContent.js) ──
const experienceData = [
  {
    company: "Cincinnati Children's Hospital",
    role: 'Software Engineering Intern',
    date: 'May 2025 - Aug 2025',
    bullets: [
      'Developed 3+ full-stack components using React, TypeScript, and C# .NET, improving workflow efficiency by 25%',
      'Engineered secure .NET APIs with SSO and role-based authentication for 500+ employees',
      'Collaborated on a compact Agile team of 5, delivering features in 2-week sprint cycles',
    ],
    skills: ['React', 'TypeScript', '.NET', 'C#', 'API Development', 'SSO', 'Agile'],
  },
  {
    company: 'Leonardo DRS',
    role: 'Software Engineering Intern',
    date: 'Jan 2025 - May 2025',
    bullets: [
      'Developed and unit tested 3+ secure cryptographic solutions in C++ for military radio systems',
      'Authored Python scripts to migrate 50+ GitLab repos to GitHub with full history, saving 40+ hours',
      'Re-engineered a Docker build system, creating a fully offline automated pipeline',
    ],
    skills: ['C++', 'Python', 'Docker', 'GitHub', 'GitLab', 'DevSecOps', 'CI/CD'],
  },
  {
    company: 'MRI Software',
    role: 'Software Engineering Intern',
    date: 'May 2024 - Aug 2024',
    bullets: [
      'Developed and deployed 10+ API endpoints in C# .NET, improving data access by 20%',
      'Implemented RESTful APIs with enhanced security and efficiency',
      'Worked with an Agile team to deliver high-quality software on schedule',
    ],
    skills: ['C#', '.NET', 'API Development', 'Microsoft SQL Server', 'Agile'],
  },
  {
    company: 'Midmark Corporation',
    role: 'Software Engineering Intern',
    date: 'Aug 2023 - Dec 2023',
    bullets: [
      'Developed internal C# tools, reducing bugs by 15%',
      'Integrated Python testing to improve product quality by 100%',
      'Optimized RESTful APIs, reducing response times by 10%',
    ],
    skills: ['C#', '.NET', 'Python', 'API Optimization', 'Unit Testing'],
  },
  {
    company: 'Midmark Corporation',
    role: 'Software Engineering Intern',
    date: 'Jan 2023 - Apr 2023',
    bullets: [
      'Developed 5+ reusable React components in TypeScript',
      'Improved UI usability, reducing friction by 10%',
      'Implemented micro frontends with Single-Spa',
    ],
    skills: ['React', 'TypeScript', 'UI/UX Design', 'Micro Frontends'],
  },
];

// ── Skills data (sourced from SkillsContent.js) ──
const skillCategories = [
  {
    title: 'Languages',
    items: [
      { name: 'TypeScript', proficiency: 95 },
      { name: 'React', proficiency: 90 },
      { name: 'JavaScript', proficiency: 80 },
      { name: 'Python', proficiency: 85 },
      { name: 'C#', proficiency: 75 },
      { name: 'C++', proficiency: 70 },
      { name: 'Java', proficiency: 80 },
      { name: 'SQL', proficiency: 90 },
      { name: 'HTML/CSS', proficiency: 95 },
    ],
  },
  {
    title: 'Frameworks & Technologies',
    tags: [
      'React.js', 'Angular', 'Node.js', 'ASP.NET', '.NET', 'Spring',
      'Flutter', 'Tailwind CSS', 'Single-Spa',
    ],
  },
  {
    title: 'Tools & Platforms',
    tags: [
      'Azure', 'AWS', 'Google Cloud', 'Docker', 'GitHub', 'GitLab',
      'MongoDB', 'Microsoft SQL Server', 'Linux',
    ],
  },
  {
    title: 'Concepts',
    tags: [
      'RESTful APIs', 'Microservices', 'CI/CD', 'Agile / Scrum',
      'Full-Stack Development', 'Unit Testing', 'DevSecOps',
      'Responsive Design', 'Database Design',
    ],
  },
];

// ── Coursework ──
const coursework = [
  'Data Structures',
  'Algorithms',
  'Software Engineering',
  'Operating Systems',
  'Computer Networks',
  'Database Design',
  'Discrete Math',
  'Linear Algebra',
  'Calculus I-III',
  'Programming Languages',
  'Cyber Security',
  'Intelligent Data Analysis',
];

// ── Animation variants ──
const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const ResumePage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { key: 'home', icon: <HomeOutlined />, label: <a href="/">Home</a> },
    { key: 'photography', icon: <CameraOutlined />, label: <a href="/#/photo">Photography</a> },
    { key: 'music', icon: <CustomerServiceOutlined />, label: <a href="/#/music">Music</a> },
    { key: 'resume', icon: <FileTextOutlined />, label: <a href="/#/resume">Resume</a>, style: { marginLeft: 'auto' } },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#120338' }}>
      {/* Navigation */}
      <Header style={{ padding: 0, position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
        <Menu
          className="resume-desktop-menu"
          theme="dark"
          mode="horizontal"
          selectedKeys={['resume']}
          style={{ lineHeight: '64px', backgroundColor: 'transparent', borderBottom: 'none', display: 'flex', width: '100%' }}
          items={menuItems}
        />
        <div className="resume-hamburger-btn" style={{ alignItems: 'center', height: '64px', padding: '0 16px' }}>
          <MenuOutlined style={{ fontSize: '22px', color: '#E0AAFF', cursor: 'pointer' }} onClick={() => setDrawerOpen(true)} />
        </div>
      </Header>

      <Drawer
        title="Navigation"
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
      >
        <Menu
          mode="vertical"
          selectedKeys={['resume']}
          style={{ border: 'none' }}
          items={menuItems.map(({ style, ...rest }) => ({ ...rest, onClick: () => setDrawerOpen(false) }))}
        />
      </Drawer>

      <ModernPurpleBackground />

      <Content style={{ padding: 0, position: 'relative' }}>
        <div className="resume-container">
          {/* ── Header ── */}
          <motion.div
            className="resume-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Title level={1}>Christian Graber</Title>
            <div className="resume-title">Software Developer</div>

            <div className="resume-contact-row">
              <a href="mailto:grabercn@mail.uc.edu"><MailOutlined /> grabercn@mail.uc.edu</a>
              <a href="https://www.linkedin.com/in/christian-graber" target="_blank" rel="noopener noreferrer"><LinkedinOutlined /> LinkedIn</a>
              <a href="https://github.com/grabercn" target="_blank" rel="noopener noreferrer"><GithubOutlined /> GitHub</a>
            </div>

            <div className="resume-header-buttons">
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                size="large"
                onClick={() => window.open('/docs/Graber_Christian_Resume_2025.pdf', '_blank')}
                style={{
                  background: 'rgba(77, 4, 160, 0.85)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  fontWeight: 600,
                  minHeight: '44px',
                }}
              >
                Download PDF
              </Button>
            </div>
          </motion.div>

          {/* ── Education ── */}
          <motion.div className="resume-section" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Title className="resume-section-title" level={3}>Education</Title>
            <Card className="resume-education-card" bordered={false}>
              <Title level={4} style={{ marginTop: 0 }}>University of Cincinnati</Title>
              <Text style={{ display: 'block', marginBottom: 4 }}>
                Bachelor of Science in Computer Science
              </Text>
              <Text style={{ display: 'block', opacity: 0.6 }}>
                Expected Graduation: May 2026
              </Text>
            </Card>
          </motion.div>

          {/* ── Experience ── */}
          <motion.div className="resume-section" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
            <Title className="resume-section-title" level={3}>Experience</Title>
            <Timeline
              className="resume-timeline"
              items={experienceData.map((exp, index) => ({
                key: index,
                children: (
                  <motion.div variants={fadeUp}>
                    <Card className="resume-timeline-card" bordered={false}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 4 }}>
                        <div>
                          <span className="resume-timeline-company">{exp.company}</span>
                          <br />
                          <span className="resume-timeline-role">{exp.role}</span>
                        </div>
                        <span className="resume-timeline-date">{exp.date}</span>
                      </div>
                      <ul className="resume-timeline-bullets">
                        {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
                      </ul>
                      <div className="resume-timeline-skills">
                        {exp.skills.map((s) => <Tag key={s}>{s}</Tag>)}
                      </div>
                    </Card>
                  </motion.div>
                ),
              }))}
            />
          </motion.div>

          {/* ── Skills ── */}
          <motion.div className="resume-section" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
            <Title className="resume-section-title" level={3}>Skills</Title>

            {skillCategories.map((cat) => (
              <motion.div key={cat.title} className="resume-skills-group" variants={fadeUp}>
                <Title className="resume-skills-group-title" level={5}>{cat.title}</Title>

                {/* If the category has proficiency bars */}
                {cat.items ? (
                  <div>
                    {cat.items.map((skill) => (
                      <div className="resume-skill-bar-container" key={skill.name}>
                        <span className="resume-skill-bar-label">{skill.name}</span>
                        <div className="resume-skill-bar-track">
                          <motion.div
                            className="resume-skill-bar-fill"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.proficiency}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Tag-based categories */
                  <div className="resume-skill-tags">
                    {cat.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* ── Coursework ── */}
          <motion.div className="resume-section" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
            <Title className="resume-section-title" level={3}>Relevant Coursework</Title>
            <div className="resume-coursework-grid">
              {coursework.map((course) => (
                <motion.div key={course} className="resume-coursework-item" variants={fadeUp}>
                  {course}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Content>

      <Footer style={{ textAlign: 'center', background: '#001529', color: '#fff', padding: '20px 0', borderTop: '1px solid #444', zIndex: 1, position: 'relative' }}>
        <GlowingHeaderAnimation />
        <FooterComponent />
      </Footer>
    </Layout>
  );
};

export default ResumePage;
