import React, { useState } from 'react';
import { Modal } from 'antd';
import { CloseOutlined, CodeOutlined, AppstoreAddOutlined, CloudOutlined, BranchesOutlined, SelectOutlined } from '@ant-design/icons';

// Skills data
const skills = [
  { name: "React", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/react.svg", proficiency: 90 },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/nodedotjs.svg", proficiency: 85 },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/typescript.svg", proficiency: 95 },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/javascript.svg", proficiency: 80 },
  { name: "Python", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/python.svg", proficiency: 85 },
  { name: "C#", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/csharp.svg", proficiency: 75 },
  { name: "Java", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/java.svg", proficiency: 80 },
  { name: "SQL", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/sqlite.svg", proficiency: 90 },
];

// Skill level mapping based on proficiency percentage
const getSkillLevel = (proficiency) => {
  if (proficiency >= 90) {
    return "Expert";
  } else if (proficiency >= 70) {
    return "Intermediate";
  } else {
    return "Beginner";
  }
};

const technologies = [
  "Azure", "Docker", "React.js", "Angular", "MongoDB", "Tailwind", "Spring", "ASP.NET", "Node.js", "Google Cloud"
];

const concepts = [
  "RESTful APIs", "Containerization", "Cloud", "Linux", "Full-stack", "Backend", "Frontend", "Web Development",
  "Unit Testing", "Distributed Computing", "Web Frameworks", "Database Design", "Software Engineering", 
  "Mobile Development", "Agile Methodologies", "Cross-Platform Development", "Responsive Design", "Microservices"
];

const SkillsCarousel = () => {
  const [isPopupVisible, setPopupVisible] = useState(false); // Track popup visibility

  const handlePopupToggle = () => {
    setPopupVisible(!isPopupVisible); // Toggle popup visibility
  };

  const handleCarouselClick = () => {
    setPopupVisible(true); // Open popup when carousel is clicked
  };

  return (
    <div style={{ width: '100%', margin: '0 auto', overflow: 'hidden', position: 'relative' }}>
      
      <div
        style={{
          display: 'flex',
          animation: 'scroll 60s linear infinite', // Custom scroll animation
          position: 'relative',
        }}
        onClick={handleCarouselClick} // Handle click event for carousel
      >
        {skills.concat(skills).map((skill, index) => (
          <div key={index} style={{ textAlign: 'center', flex: '0 0 auto', width: '10%', boxSizing: 'border-box' }}>
            <img
              src={skill.icon}
              alt={skill.name}
              style={{ width: '50px', height: '50px', marginBottom: '10px' }}
            />
            <p>{skill.name}</p>
            {/* add the selected outline, icon, and name */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <SelectOutlined style={{ color: 'purple', fontSize: '10px' }} />
            </div>
            {/* Remove proficiency from infinite scroll */}
          </div>
        ))}
      </div>

      {/* Flyout popup to display skills */}
      <Modal
        title="Skills Overview"
        visible={isPopupVisible}
        onCancel={handlePopupToggle} // Close the popup when clicking on the close button
        footer={null} // No footer for the popup
        width="80%" // Allow modal to take up 80% of the width on wide screens
        maxWidth="1200px" // Set a max width so it doesn't become too wide
        centered={true} // Ensure the modal is centered both horizontally and vertically
        bodyStyle={{ padding: '20px', overflowY: 'auto' }} // Add padding and scrolling to body
        destroyOnClose={true} // Ensure cleanup on close
        closeIcon={<CloseOutlined style={{ color: 'purple', fontSize: '20px' }} />} // Change close button color to purple
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ display: 'flex', alignItems: 'center' }}><CodeOutlined style={{ marginRight: '10px' }} />Technologies</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>
            {technologies.map((tech, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                <AppstoreAddOutlined style={{ marginRight: '10px' }} />
                {tech}
              </div>
            ))}
          </div>

          <br />

          <h3 style={{ display: 'flex', alignItems: 'center' }}><BranchesOutlined style={{ marginRight: '10px' }} />Concepts</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>
            {concepts.map((concept, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                <CloudOutlined style={{ marginRight: '10px' }} />
                {concept}
              </div>
            ))}
          </div>

          <br />

          <h3 style={{ display: 'flex', alignItems: 'center' }}><CodeOutlined style={{ marginRight: '10px' }} />Skills</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
            {skills.map((skill, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', textAlign: 'center' }}>
                <img
                  src={skill.icon}
                  alt={skill.name}
                  style={{ width: '40px', height: '40px', marginBottom: '10px' }}
                />
                <strong>{skill.name}</strong>
                <span style={{ marginTop: '5px' }}>
                  {getSkillLevel(skill.proficiency)} {/* Display the skill level */}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default SkillsCarousel;
