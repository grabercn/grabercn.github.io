// Shared resume data — single source of truth for ResumePage and other components.

export const experienceData = [
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

export const skillCategories = [
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

export const coursework = [
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
