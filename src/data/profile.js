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

// Role descriptions reflect the owner's CV and LinkedIn experience details.
// Outcomes are deliverables and qualitative contributions, not invented performance metrics.
export const experience = [
  {
    role: 'Graduate Teaching Assistant',
    organisation: 'University of Bath',
    dates: 'November 2025–May 2026',
    focus: ['Python labs', 'Debugging & code review', 'Student guidance'],
    intro: 'I supported students during practical Python sessions, helping them understand both the code they were writing and the thinking behind it.',
    work: [
      'I worked through Python errors with students, reviewed their code and explained how to identify the underlying issue rather than just copy a fix.',
      'I guided students through data-handling exercises and technical questions, adapting my explanations to their level of understanding.',
      'I supported teaching staff during tutorials and labs, helping students make progress with their own practical tasks.',
    ],
    outcome: 'My contribution was practical, one-to-one learning support: turning confusing code errors into understandable next steps and helping students approach their exercises more independently.',
    outcomeNote: 'Qualitative teaching contribution; no unverified student-count, grade improvement or satisfaction figures.',
  },
  {
    role: 'Summer Intern — Cybersecurity',
    organisation: 'TANISI IT Services Pvt. Ltd.',
    dates: 'April–May 2020',
    focus: ['Threat intelligence', 'Python-based analysis', 'Security awareness reporting'],
    intro: 'I investigated emerging cybersecurity threats, including risks that became more relevant as organisations relied more heavily on digital systems during the COVID-19 period.',
    work: [
      'I used Python and threat-intelligence sources to extract, organise and analyse information about vulnerabilities, attack patterns and possible entry points.',
      'I researched potential attack vectors and translated the technical findings into risks and defensive measures that non-specialist readers could understand.',
      'I prepared a cybersecurity awareness report bringing together the threats I examined and recommended ways to reduce exposure.',
    ],
    outcome: 'I delivered a structured threat-awareness report with practical mitigation recommendations that could support internal awareness activities and future policy reviews.',
    outcomeNote: 'Report and recommendations are documented deliverables; their adoption or measurable risk reduction has not been verified.',
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
]

export const contact = {
  email: 'namanbmps@gmail.com',
  linkedin: 'https://www.linkedin.com/in/naman-sainii',
}
