import React from 'react';
import { Layout, Typography, Tag, Card, Timeline, Button } from 'antd';
import {
  DownloadOutlined,
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
} from '@ant-design/icons';
import Navbar from '../../other/Navbar';
import { motion } from 'framer-motion';
import FooterComponent from '../../other/Footer';
import ModernPurpleBackground from '../../animations/ModernPurpleBackground';
import GlowingHeaderAnimation from '../../animations/GlowingHeaderAnimation';
import { experienceData, skillCategories, coursework } from '../../data/resumeData';
import './ResumePage.css';

const { Content, Footer } = Layout;
const { Title, Text } = Typography;

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
  return (
    <Layout className="resume-page" style={{ minHeight: '100vh', background: '#120338' }}>
      <Navbar activeKey="resume" />

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
