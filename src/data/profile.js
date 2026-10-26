// Skill groups reflect tools and techniques evidenced by the four project repositories.
// No proficiency levels or years of professional experience are implied.
export const skillGroups = [
  {
    title: 'AI Engineering',
    description: 'Auditable AI workflows and defensive decision-support applications.',
    skills: ['RAG / TF-IDF retrieval', 'Agent workflow orchestration', 'Human-in-the-loop review', 'Cited evidence retrieval', 'MCP tools', 'FastAPI', 'Pydantic'],
  },
  {
    title: 'Machine Learning & Evaluation',
    description: 'Building, comparing and validating models against measurable outcomes.',
    skills: ['scikit-learn', 'XGBoost', 'Feature engineering', 'Class imbalance handling', 'PR-AUC / recall / precision', 'Cost-based thresholds', 'Holt-Winters forecasting'],
  },
  {
    title: 'Data Analytics & BI',
    description: 'Turning datasets into clear performance measures and practical findings.',
    skills: ['Python', 'Pandas', 'NumPy', 'Exploratory analysis', 'KPI design', 'Plotly', 'Streamlit dashboards', 'RFM segmentation'],
  },
  {
    title: 'Data Engineering',
    description: 'Ingestion, historical data modelling, orchestration and quality checks.',
    skills: ['SQL', 'PostgreSQL', 'dbt', 'Apache Airflow', 'Data ingestion / ETL', 'REST APIs', 'Data validation', 'Docker'],
  },
  {
    title: 'Application Delivery & Testing',
    description: 'Making projects usable, reproducible and inspectable.',
    skills: ['Streamlit', 'FastAPI', 'Pytest', 'Pydantic', 'Git / GitHub', 'Jupyter', 'Technical reporting'],
  },
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
