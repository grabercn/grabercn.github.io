import React, { useState } from "react";
import { RocketOutlined, CarOutlined, ShoppingCartOutlined, DiscordOutlined, StockOutlined, BookOutlined } from "@ant-design/icons";
import { Image, Row, Col, Card, Typography, Tag } from "antd";

const { Title, Paragraph } = Typography;

const MAX_DESC_LENGTH = 150;

const Projects = () => {
  const projectData = [
    {
      title: "ForumHub",
      description:
        "Developed a dynamic React-based forum website hosted on Azure, featuring a modern architecture and interface. Implemented pagination and efficient rendering of hundreds of posts, comments, and reactions. This project focused on scalability and performance for handling large user interactions.",
      link: "https://github.com/grabercn/ForumHub",
      //liveLink: "https://theforumhub.com", // Live link for "See it in action"
      icon: <RocketOutlined style={{ marginRight: '8px', color: '#1890ff' }} />,
      gallery: [
        "/images/project1.png"
      ],
      tags: ['React', 'Java', 'Spring Boot', 'PostgreSQL', 'JavaScript', 'Azure Cloud Services']
    },
    {
      title: "RideShare App",
      description:
        "Developed an Android-based ride-sharing app using Kotlin with a .NET Core backend and SQL for data storage. Utilized Microsoft SQL Server and MongoDB for scalable data management. This app was built to support real-time ride tracking and dynamic pricing.",
      link: "https://github.com/OwenAEdwards/RideShare.Android",
      icon: <CarOutlined style={{ marginRight: '8px', color: '#1890ff' }} />,
      gallery: [
        "/images/project2.jpg"
      ],
      tags: ['Kotlin', '.NET', 'MongoDB', 'C#', 'Android']
    },
    {
      title: "ShopFront",
      description:
        "Developed a full-stack eCommerce web application using Java (Spring Boot) for the backend, React for the frontend, and PostgreSQL for data storage. Designed the database schema and synchronized the backend for Object-Relational Mapping. This app supports features like product catalog, shopping cart, and order management.",
      link: "https://github.com/grabercn/ShopFront",
      icon: <ShoppingCartOutlined style={{ marginRight: '8px', color: '#1890ff' }} />,
      gallery: [
        "/images/project3.jpg"
      ],
      tags: ['Java', 'JavaScript', 'Spring Boot', 'React', 'PostgreSQL']
    },
    {
      title: "Gemini & Media Discord Bot",
      description: "Maintain a Python-based Gemini Discord Bot that integrates AI for dynamic message responses. The bot supports a range of features including music playback, YouTube downloads, custom voice commands, and user interaction management. Utilized Discord.py, PyTube, and FFmpeg to implement functionalities such as music queues, playback control, and user-specific commands. Ensured ease of use through customizable configurations and streamlined user experience.",
      link: "https://github.com/grabercn/Database-eCommerce-Website",
      icon: <DiscordOutlined style={{ marginRight: '8px', color: '#1890ff' }} />,
      gallery: [
        "/images/project4.jpg"
      ],
      tags: ['Python', 'AI', 'Rest APIs']
    },
    {
      title: "Stocky AI Trader",
      description:
        "Built an AI-powered stock trading application using Python, leveraging Transformers and Sequence Classification models for predictive analysis. Integrated a PyQt5 GUI to enable seamless interaction for day trading and long-term trade tracking. The application downloads live market data to inform trades and utilizes AI-driven strategies to make and execute trades. Currently operating in paper trading mode to test and refine AI models, with plans to transition to live trading in the future.",
      link: "https://github.com/grabercn/StockyAiTrader",
      icon: <StockOutlined style={{ marginRight: '8px', color: '#1890ff' }} />,
      gallery: [
        "/images/project5.jpg"
      ],
      tags: ['Python', 'AI', 'Transformers', 'Sequence Classification']
    },
    {
      title: "Resumancer",
      description:
        "Designed an AI-powered resume optimizer for RevUC Hackathon. The project uses generative AI via Amazon Bedrock, NLP via Textract, and OCR via Amazon Comprehend to analyze resumes and provide feedback on how to improve them. This includes both customized and detailed statistical data. The project is built using React to provide data display and a resume view, and Flask to interface with AWS and provide customized feedback. The project was hosted on AWS using EC2 and Elastic Beanstalk for the Backend, AWS Amplify for the Front End, and S3 Buckets for Document Storage.",
      link: "https://github.com/grabercn/Resumancer",
      icon: <BookOutlined style={{ marginRight: '8px', color: '#1890ff' }} />,
      gallery: [
        "/images/project6.jpg"
      ],
      tags: ['AI', 'AWS', 'Python', 'Flask', 'React', 'JavaScript']
    }
  ];

  const [expandedCards, setExpandedCards] = useState({});

  const toggleExpand = (index) => {
    setExpandedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <Row gutter={[16, 24]} justify="start">
      {projectData.map((project, index) => {
        const isExpanded = expandedCards[index];
        const needsTruncation = project.description.length > MAX_DESC_LENGTH;
        const displayText = needsTruncation && !isExpanded
          ? project.description.slice(0, MAX_DESC_LENGTH) + '...'
          : project.description;

        return (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                borderLeft: '3px solid transparent',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-left-color 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.25)';
                e.currentTarget.style.borderLeftColor = '#4D04A0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.borderLeftColor = 'transparent';
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.25)';
                e.currentTarget.style.borderLeftColor = '#4D04A0';
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.borderLeftColor = 'transparent';
              }}
              cover={
                <Row gutter={[0, 0]}>
                  {project.gallery.slice(0, 1).map((imageUrl, imgIndex) => (
                    <Col key={imgIndex} span={24}>
                      <Image
                        width="100%"
                        height="auto"
                        src={imageUrl}
                        preview={false}
                        alt={`${project.title} screenshot`}
                        loading="lazy"
                        style={{
                          borderRadius: '8px',
                          objectFit: 'cover',
                          aspectRatio: '16/9',
                        }}
                        fallback="/images/banner.jpg"
                      />
                    </Col>
                  ))}
                </Row>
              }
            >
              <div>
                <Title level={4} style={{ marginBottom: '8px' }}>
                  <span style={{ fontWeight: 'bold' }}>{project.icon}{project.title}</span>
                </Title>
                <Paragraph style={{ marginBottom: '16px', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                  {displayText}
                  {needsTruncation && (
                    <span
                      onClick={() => toggleExpand(index)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleExpand(index); }}
                      style={{ color: '#4D04A0', cursor: 'pointer', marginLeft: '4px', fontWeight: 500, display: 'inline-block', minHeight: '44px', lineHeight: '44px' }}
                    >
                      {isExpanded ? ' Show less' : ' Read more'}
                    </span>
                  )}
                </Paragraph>

                <div style={{ marginBottom: '16px' }}>
                  {project.tags.map((tag, tagIndex) => (
                    <Tag key={tagIndex} color="blue" style={{ marginRight: '8px', marginBottom: '8px' }}>
                      {tag}
                    </Tag>
                  ))}
                </div>

                {/* View Project on GitHub Link */}
                <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ wordBreak: 'break-word' }}>
                  <strong>View Project on GitHub</strong>
                </a>

                {/* Conditional Button: "See it in Action" */}
                {project.liveLink && (
                  <div style={{ marginTop: '16px' }}>
                    <a href={project.liveLink} style={{color: 'purple'}} target="_blank" rel="noopener noreferrer">
                      <strong>See it in Action</strong>
                    </a>
                  </div>
                )}
              </div>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default Projects;
