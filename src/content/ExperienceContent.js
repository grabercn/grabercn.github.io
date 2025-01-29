import React from 'react';
import { Row, Col, Card, Avatar, Typography, Tag } from 'antd';
import { BranchesOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

// Experience Data
const experienceData = [
  {
    title: 'Software Engineering Intern - MRI Software',
    link: 'https://mrisoftware.com/about',
    avatarSrc: '/images/mri-icon.jpg',
    description: 'During my internship at MRI Software, I contributed to the development of 10+ API endpoints and modernized key system components, improving the overall performance.',
    responsibilities: [
      'Developed and deployed API endpoints in C# .NET, improving data access by 20%',
      'Implemented RESTful APIs, boosting security and efficiency',
      'Worked with an Agile team to deliver high-quality software',
      'Led a fundraising initiative for a non-profit, raising $10,000'
    ],
    skills: ['C# .NET', 'API Development', 'MSSQL', 'Agile', 'Scrum'],
    date: "May 2024 - Aug 2024"
  },
  {
    title: 'Software Engineering Intern - Midmark Corporation',
    link: 'https://midmark.com/about',
    avatarSrc: '/images/midmark-icon.jpg',
    description: 'In my role at Midmark, I developed internal tools and worked on optimizing APIs and testing, resulting in improved stability and performance.',
    responsibilities: [
      'Developed internal C# tools, reducing bugs by 15%',
      'Integrated Python testing to improve product quality by 100%',
      'Optimized RESTful APIs, reducing response times by 10%',
    ],
    skills: ['C#', 'Python', 'API Optimization', 'Unit Testing'],
    date: "Aug 2023 - Dec 2023"
  },
  {
    title: 'Software Engineering Intern - Midmark Corporation',
    link: 'https://midmark.com/about',
    avatarSrc: '/images/midmark-icon.jpg',
    description: 'I worked on developing reusable React components and collaborated closely with designers to improve usability and reduce friction in the UI.',
    responsibilities: [
      'Developed 5+ reusable React components in TypeScript',
      'Improved UI usability, reducing friction by 10%',
      'Implemented micro frontends with Single-Spa',
    ],
    skills: ['React', 'TypeScript', 'UI/UX Design', 'Micro Frontends'],
    date: "Jan 2023 - Apr 2023"
  },
  {
    title: 'Website Developer - Stonewall Boxers',
    link: 'http://stonewallboxers.com/',
    avatarSrc: '/images/stonewall-icon.jpg',
    description: 'As a website developer for Stonewall Boxers, I built and optimized their website to drive traffic and enhance user experience.',
    responsibilities: [
      'Created and optimized a dynamic website that attracted hundreds of users',
      'Implemented SEO strategies, boosting local web traffic',
    ],
    skills: ['Web Development', 'SEO', 'HTML', 'CSS', 'JavaScript'],
    date: "Jan 2019 - Mar 2019"
  },
];

// Experience Component
const Experience = () => {
  return (
    <>
      <Row gutter={[16, 16]} style={{ paddingTop: '20px', paddingBottom: '40px' }}>
        <Col span={24}>
          <Title level={3}>
            <BranchesOutlined style={{ marginRight: '8px' }} />
            My Professional Experience
          </Title>
          <Paragraph>
            Here are some highlights from my internships and co-op roles, where I've had the opportunity to work on various impactful projects.
          </Paragraph>
        </Col>
      </Row>

      {/* Experience Cards */}
      <Row gutter={[32, 32]} style={{ paddingBottom: '30px' }}>
        <Col span={24}>
          {experienceData.map((experience, index) => (
            <Card
              key={index}
              title={
                <a href={experience.link} target="_blank" rel="noopener noreferrer" style={{display: 'inline-block', overflow: 'hidden', wordWrap: 'break-word' }}>
                  <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Avatar src={experience.avatarSrc} size={40} style={{ marginRight: '12px' }} />
                    <span style={{ wordWrap: 'break-word', whiteSpace: 'normal', flex: '1 1 auto' }}>{experience.title}</span>
                  </div>
                  {/* Date below the title */}
                  <small style={{ display: 'block', marginTop: '5px', color: 'grey' }}>
                    {experience.date}
                  </small>
                </a>
              }
              style={{
                width: '100%',
                marginBottom: '20px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Paragraph>{experience.description}</Paragraph>
              <ul>
                {experience.responsibilities.map((task, idx) => (
                  <li key={idx}>
                    {task}
                  </li>
                ))}
              </ul>
              <div>
                <strong>Relevant Skills: </strong>
                <div style={{ marginTop: '8px' }}>
                  {experience.skills.map((skill, index) => (
                    <Tag key={index} color="geekblue" style={{ margin: '4px' }}>
                      {skill}
                    </Tag>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default Experience;