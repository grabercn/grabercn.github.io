import { RocketOutlined, CarOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Image, Row, Col, Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

const Projects = () => {
  const projectData = [
    {
      title: "ForumHub: React, JavaScript, Java, Spring Boot, PostgreSQL",
      description:
        "Developed a dynamic React-based forum website hosted on Azure, featuring a modern architecture and interface. Implemented pagination and efficient rendering of hundreds of posts, comments, and reactions. This project focused on scalability and performance for handling large user interactions.",
      link: "https://github.com/grabercn/ForumHub",
      icon: <RocketOutlined style={{ marginRight: '8px', color: '#1890ff' }} />,
      gallery: [
        "https://via.placeholder.com/200x150?text=ForumHub+1",
        "https://via.placeholder.com/200x150?text=ForumHub+2",
        "https://via.placeholder.com/200x150?text=ForumHub+3"
      ]
    },
    {
      title: "RideShare App: Kotlin, C#, .NET, MongoDB",
      description:
        "Developed an Android-based ride-sharing app using Kotlin with a .NET Core backend and MSSQL for data storage. Utilized MSSQL Server and MongoDB for scalable data management. This app was built to support real-time ride tracking and dynamic pricing.",
      link: "https://github.com/OwenAEdwards/RideShare.Android",
      icon: <CarOutlined style={{ marginRight: '8px', color: '#1890ff' }} />,
      gallery: [
        "https://via.placeholder.com/200x150?text=RideShare+1",
        "https://via.placeholder.com/200x150?text=RideShare+2",
        "https://via.placeholder.com/200x150?text=RideShare+3"
      ]
    },
    {
      title: "eCommerce Application: Java, Spring Boot, React, PostgreSQL",
      description:
        "Developed a full-stack eCommerce web application using Java (Spring Boot) for the backend, React for the frontend, and PostgreSQL for data storage. Designed the database schema and synchronized the backend for Object-Relational Mapping. This app supports features like product catalog, shopping cart, and order management.",
      link: "https://github.com/grabercn/Database-eCommerce-Website",
      icon: <ShoppingCartOutlined style={{ marginRight: '8px', color: '#1890ff' }} />,
      gallery: [
        "https://via.placeholder.com/200x150?text=eCommerce+1",
        "https://via.placeholder.com/200x150?text=eCommerce+2",
        "https://via.placeholder.com/200x150?text=eCommerce+3"
      ]
    }
  ];

  return (
    <Row gutter={[16, 24]} justify="start">
      {projectData.map((project, index) => (
        <Col key={index} xs={24} sm={12} md={8} lg={6}>
          <Card
            style={{ width: '100%', borderRadius: '8px' }}
            cover={
              <Row gutter={[16, 16]}>
                {project.gallery.slice(0, 1).map((imageUrl, imgIndex) => (
                  <Col key={imgIndex} xs={24}>
                    <Image
                      width="100%"
                      src={imageUrl}
                      alt={`Project ${index + 1} Image ${imgIndex + 1}`}
                      style={{
                        borderRadius: '8px',
                        maxHeight: '150px',
                        objectFit: 'cover'
                      }}
                      fallback="/images/banner.jpg" // Placeholder image
                    />
                  </Col>
                ))}
              </Row>
            }
          >
            <div style={{ padding: '16px' }}>
              <Title level={4} style={{ marginBottom: '8px' }}>{project.title}</Title>
              <Paragraph style={{ marginBottom: '16px' }}>
                {project.description}
              </Paragraph>
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <strong>View Project on GitHub</strong>
              </a>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Projects;
