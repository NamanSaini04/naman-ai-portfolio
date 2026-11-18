export const services = [
  {
    id: 'automation',
    title: 'AI workflow automation',
    summary: 'Prototype an assistant for document search or request triage, with source references and human review.',
    details: 'Start with one repetitive workflow and a small set of examples. I’ll test the prototype against cases where the expected answer or action is known.',
    examples: [
      'A document assistant that points readers to the passages behind each answer.',
      'A triage tool that tags or summarises incoming requests for someone to review.',
    ],
    action: 'Discuss automation',
  },
  {
    id: 'analytics',
    title: 'Analytics & dashboards',
    summary: 'Turn spreadsheet exports or database tables into Power BI or Excel reports your team can use.',
    details: 'Start with a sample export and the questions your team wants to answer. We’ll agree how to calculate each metric and check the underlying data.',
    examples: [
      'A Power BI dashboard for sales, operations or another agreed set of metrics.',
      'An Excel report with a documented refresh process and a short summary of findings.',
    ],
    action: 'Discuss analytics',
  },
  {
    id: 'pipelines',
    title: 'Data pipelines',
    summary: 'Replace recurring cleanup and copy-paste work with a documented Python and SQL pipeline.',
    details: 'Start with one data source and a reporting need. I’ll build a repeatable process to load and transform the data, with checks for missing or duplicate records.',
    examples: [
      'A Python ingestion script for a recurring CSV export or API feed.',
      'Documented SQL transformations that produce tables ready for reporting.',
    ],
    action: 'Discuss data pipelines',
  },
]
