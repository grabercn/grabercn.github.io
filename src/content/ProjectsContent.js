import { RocketOutlined, CarOutlined, ShoppingCartOutlined, DiscordOutlined, StockOutlined, BookOutlined } from "@ant-design/icons";
import { Image, Row, Col, Card, Typography, Tag } from "antd";

const { Title, Paragraph } = Typography;

const Projects = () => {
  const projectData = [
    {
      title: "ForumHub",
      description:
        "Developed a dynamic React-based forum website hosted on Azure, featuring a modern architecture and interface. Implemented pagination and efficient rendering of hundreds of posts, comments, and reactions. This project focused on scalability and performance for handling large user interactions.",
      link: "https://github.com/grabercn/ForumHub",
      liveLink: "https://theforumhub.com", // Live link for "See it in action"
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
        "Collaborated on, and designed an AI-powered Resume Optimizer for RevUC Hackathon. The project uses generative AI, NLP, and OCR to analyze resumes and provide feedback on how to improve them. This includes both customized personal and detailed statistical data. The project is built using Python, Flask, React, and JavaScript. The project was hosted on AWS using EC2 and Elastic Beanstalk for the Backend, AWS Amplify for the Front End, S3 Buckets for Document Storage, and Amazon Bedrock for Generative AI.",
      link: "https://github.com/grabercn/Resumancer",
      icon: <BookOutlined style={{ marginRight: '8px', color: '#1890ff' }} />,
      gallery: [
        "/images/project6.jpg"
      ],
      tags: ['AI', 'AWS', 'Python', 'Flask', 'React', 'JavaScript']
    }
  ];

  return (
    <Row gutter={[16, 24]} justify="start">
      {projectData.map((project, index) => {

        return (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card
              style={{
                width: '100%',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              }}
              cover={
                <Row gutter={[0, 0]}>
                  {project.gallery.slice(0, 1).map((imageUrl, imgIndex) => (
                    <Col key={imgIndex} span={24}>
                      <Image
                        width="100%"
                        height={200}
                        src={imageUrl}
                        alt={`Project ${index + 1} Image ${imgIndex + 1}`}
                        style={{
                          borderRadius: '8px',
                          objectFit: 'cover',
                        }}
                        fallback="/images/banner.jpg"
                      />
                    </Col>
                  ))}
                </Row>
              }
            >
              <div style={{  }}>
                <Title level={4} style={{ marginBottom: '8px' }}>
                  <span style={{ fontWeight: 'bold' }}>{project.icon}{project.title}</span>
                </Title>
                <Paragraph style={{ marginBottom: '16px' }}>
                  {project.description}
                </Paragraph>

                <div style={{ marginBottom: '16px' }}>
                  {project.tags.map((tag, tagIndex) => (
                    <Tag key={tagIndex} color="blue" style={{ marginRight: '8px', marginBottom: '8px' }}>
                      {tag}
                    </Tag>
                  ))}
                </div>

                {/* View Project on GitHub Link */}
                <a href={project.link} target="_blank" rel="noopener noreferrer">
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
