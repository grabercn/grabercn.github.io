import React from 'react';
import { Progress } from 'antd';
import { AppstoreAddOutlined, GlobalOutlined, KeyOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';

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
const getSkillLevelColor = (proficiency) => {
  if (proficiency >= 90) {
    return "success";  // Green for expert level
  } else if (proficiency >= 70) {
    return "active";  // Blue for intermediate level
  } else {
    return "exception";  // Red for beginner level
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

const SkillsContent = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ display: 'flex', alignItems: 'center' }}><GlobalOutlined style={{ marginRight: '10px' }} />Technologies</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>
        {technologies.map((tech, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
            <AppstoreAddOutlined style={{ marginRight: '10px' }} />
            {tech}
          </div>
        ))}
      </div>

      <br />

      <h3 style={{ display: 'flex', alignItems: 'center' }}><KeyOutlined style={{ marginRight: '10px' }} />Concepts</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>
        {concepts.map((concept, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
            <PlusOutlined style={{ marginRight: '10px' }} />
            {concept}
          </div>
        ))}
      </div>

      <br />

      <h3 style={{ display: 'flex', alignItems: 'center' }}><SearchOutlined style={{ marginRight: '10px' }} />Languages</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
        {skills.map((skill, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', textAlign: 'center' }}>
            <img
              src={skill.icon}
              alt={skill.name}
              style={{ width: '40px', height: '40px', marginBottom: '10px' }}
            />
            <strong>{skill.name}</strong>

            {/* Progress bar to display proficiency */}
            <Progress 
              percent={skill.proficiency} 
              status={getSkillLevelColor(skill.proficiency)} 
              strokeWidth={10} 
              style={{ width: '35%', marginTop: '10px', marginBottom: '10px' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsContent;
