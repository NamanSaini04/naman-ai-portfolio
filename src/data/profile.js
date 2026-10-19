// Skill groups reflect tools and techniques evidenced by the four project repositories.
// No proficiency levels or years of professional experience are implied.
export const skillGroups = [
  { title: 'Programming', description: 'Languages used across the project implementations.', skills: ['Python', 'SQL'] },
  { title: 'AI / ML', description: 'Modelling, evaluation, and auditable retrieval workflows.', skills: ['scikit-learn', 'XGBoost', 'imbalanced-learn', 'TF-IDF retrieval', 'Model evaluation', 'Cost-based threshold tuning'] },
  { title: 'Data Engineering', description: 'Collection, validation, and historical data storage.', skills: ['PostgreSQL', 'REST API ingestion', 'Data validation', 'Idempotent pipelines', 'Pandas', 'NumPy'] },
  { title: 'Tools', description: 'Interfaces, testing, and reproducible project workflows.', skills: ['Docker', 'FastAPI', 'Streamlit', 'Jupyter', 'Pytest', 'Plotly', 'MCP', 'Pydantic'] },
]

// Profile details supplied by the portfolio owner from LinkedIn.
export const experience = [
  {
    role: 'Graduate Teaching Assistant',
    organisation: 'University of Bath',
    dates: 'November 2025–May 2026',
    responsibilities: [
      'Supported tutorials and laboratory sessions.',
      'Explained technical concepts and guided students through practical exercises.',
      'Assisted students with technical questions and course activities.',
    ],
  },
  {
    role: 'Summer Intern',
    organisation: 'TANISI IT Services Pvt. Ltd.',
    dates: 'April–May 2020',
    responsibilities: [
      'Used Python to extract, parse and analyse threat-intelligence information.',
      'Investigated potential cybersecurity attack vectors.',
      'Prepared cybersecurity awareness findings and mitigation recommendations.',
    ],
  },
]

export const education = [
  {
    course: 'MSc Artificial Intelligence',
    institution: 'University of Bath',
    dates: 'September 2025–September 2026',
    note: 'Status: Coursework completed; final award classification awaiting official university confirmation.',
  },
  {
    course: 'B.Tech Computer Science',
    institution: 'Amity University, Noida',
    dates: '2017–2021',
  },
]

export const certifications = [
  'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
  'Introduction to Programming Using Python',
  'Introduction to Programming Using Java',
  'The Complete Digital Marketing Course',
]

export const contact = {
  email: 'namanbmps@gmail.com',
  linkedin: 'https://www.linkedin.com/in/naman-sainii',
}
