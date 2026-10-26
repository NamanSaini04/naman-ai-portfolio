// Qualitative evidence map based on the six linked project repositories.
// A score represents documented project coverage, NOT the owner's proficiency.
// 0 = not explicitly evidenced, 1 = supporting use, 2 = a central project component.
// Project order is kept in sync with src/data/portfolio.js.
export const evidenceProjectIds = [
  'fraud-detection',
  'ecommerce-sales',
  'incident-analytics',
  'airline-delay',
  'soc-copilot',
  'job-market',
]

export const evidenceGroups = [
  'AI Engineering & ML',
  'Analytics & BI',
  'Data Engineering',
  'Delivery & Testing',
]

export const skillEvidence = [
  { name: 'ML model training', group: 'AI Engineering & ML', levels: [2, 0, 0, 1, 0, 0] },
  { name: 'Feature engineering', group: 'AI Engineering & ML', levels: [2, 1, 1, 1, 0, 0] },
  { name: 'Model evaluation', group: 'AI Engineering & ML', levels: [2, 2, 0, 1, 0, 0] },
  { name: 'Cost-sensitive ML', group: 'AI Engineering & ML', levels: [2, 0, 0, 0, 0, 0] },
  { name: 'RAG / TF-IDF retrieval', group: 'AI Engineering & ML', levels: [0, 0, 0, 0, 2, 0] },
  { name: 'AI agent workflows', group: 'AI Engineering & ML', levels: [0, 0, 0, 0, 2, 0] },

  { name: 'Exploratory data analysis', group: 'Analytics & BI', levels: [2, 2, 2, 2, 0, 1] },
  { name: 'KPI & impact analysis', group: 'Analytics & BI', levels: [2, 2, 2, 2, 1, 2] },
  { name: 'Forecasting & segmentation', group: 'Analytics & BI', levels: [0, 2, 0, 0, 0, 0] },
  { name: 'Interactive dashboards', group: 'Analytics & BI', levels: [2, 2, 2, 2, 2, 2] },

  { name: 'SQL / PostgreSQL / dbt', group: 'Data Engineering', levels: [0, 0, 0, 0, 0, 2] },
  { name: 'Data ingestion & pipelines', group: 'Data Engineering', levels: [1, 1, 1, 2, 1, 2] },
  { name: 'Data quality & validation', group: 'Data Engineering', levels: [2, 2, 2, 2, 1, 2] },
  { name: 'API integrations', group: 'Data Engineering', levels: [0, 0, 0, 0, 2, 2] },

  { name: 'Streamlit applications', group: 'Delivery & Testing', levels: [2, 2, 2, 2, 2, 2] },
  { name: 'FastAPI / typed interfaces', group: 'Delivery & Testing', levels: [0, 0, 0, 0, 2, 0] },
  { name: 'Automated tests', group: 'Delivery & Testing', levels: [0, 0, 0, 1, 2, 2] },
  { name: 'Technical reporting', group: 'Delivery & Testing', levels: [2, 2, 2, 2, 2, 2] },
]

export const evidenceLabels = [
  'Not explicitly evidenced',
  'Supporting use',
  'Central component',
]
