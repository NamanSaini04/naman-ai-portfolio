// Project case studies reflect public README and report evidence. Metrics are not production outcomes.
export const caseStudies = {
  'fraud-detection': {
    kicker: 'Offline model evaluation · Historical credit-card dataset',
    challenge: 'With just 0.17% fraudulent transactions, headline accuracy is misleading. The objective was to compare fraud classifiers using precision-recall measures and translate predictions into review decisions.',
    method: [
      'Deduplicated 283,726 transactions and used a held-out test split. Fitted preprocessing on training data only and handled class imbalance without resampling the test set.',
      'Compared logistic regression, random forest, XGBoost and an SVM subsample. Evaluated PR-AUC and false-positive versus missed-fraud trade-offs.',
      'Built a local Streamlit dashboard with an overview, exploratory charts, decision-threshold simulator and sample transaction scoring.'
    ],
    metrics: [
      { value: '283,726', label: 'Transactions analysed', note: 'Post-deduplication dataset' },
      { value: '0.82', label: 'XGBoost PR-AUC', note: 'Held-out offline evaluation' },
      { value: '84%', label: 'Fraud recall', note: 'At selected 0.12 threshold' },
      { value: '~20%', label: 'Lower estimated cost', note: 'Illustrative FN / FP assumptions' }
    ],
    outcome: 'The documented threshold comparison estimates a cost change from $3,060 to $2,445, under assumed $150 missed-fraud and $5 false-alarm costs. This is an offline simulation, not money saved for a business.',
    insights: [
      'ROC-AUC alone masks weak precision in heavily imbalanced data.',
      'A change in the review threshold changes both fraud capture and analyst workload.',
      'Anonymised PCA features limit the business interpretation of individual predictions.'
    ],
    caveat: 'One historical dataset spanning two days; anonymised inputs, few fraud examples, no operational monitoring, and illustrative rather than observed cost savings.',
    dashboard: null,
    localCommand: 'streamlit run dashboard/app.py',
    sourceEvidence: 'https://github.com/NamanSaini04/Financial-fraud-detection/blob/main/reports/business_insights.md',
    dashboardLabel: 'Four-tab dashboard available locally'
  },
  'soc-copilot': {
    kicker: 'Working MVP · Synthetic security alerts',
    challenge: 'SOC investigations require a traceable chain from alerts to evidence and recommended action, rather than persuasive but unsupported AI output.',
    method: [
      'Implemented a typed investigation workflow with alert triage, evidence correlation, provisional ATT&CK mapping and a complete agent trace.',
      'Integrated cited TF-IDF playbook retrieval and least-privilege, read-only MCP tools using synthetic incident fixtures.',
      'Built a Streamlit analyst interface, FastAPI endpoints, human approval gates, incident JSON/PDF exports and a small evaluation harness.'
    ],
    metrics: [
      { value: '3', label: 'Labelled evaluation cases', note: 'Small functional sample' },
      { value: 'PDF', label: 'Incident report output', note: 'Export supported by MVP' },
      { value: 'Human', label: 'Action approval', note: 'Recommendations are gated' },
      { value: 'Local', label: 'Dashboard availability', note: 'No public deployment confirmed' }
    ],
    outcome: 'The three included labelled cases pass the repository’s type, severity, citation-presence, ATT&CK and action-gating checks. This validates the demo workflow only; it is not a meaningful detection-accuracy estimate.',
    insights: [
      'Evidence IDs and retrieved citations make investigations auditable.',
      'Human approval is required before high-impact defensive actions.',
      'Synthetic test cases do not establish real-world SOC performance.'
    ],
    caveat: 'Synthetic alerts and fixtures. No production SIEM integration, persistent service authentication or independently sized evaluation set; retrieval uses a TF-IDF baseline.',
    dashboard: null,
    localCommand: 'streamlit run dashboard/streamlit_app.py',
    sourceEvidence: 'https://github.com/NamanSaini04/soc-copilot/blob/main/README.md',
    dashboardLabel: 'Analyst dashboard available locally'
  },
  'job-market': {
    kicker: 'Phase 6 · UK hiring-data pipeline and public dashboard',
    challenge: 'Job adverts are noisy, frequently duplicated and may mix genuine hiring with recruitment agencies and paid-course marketing. Reliable trends require historical collection and auditable exclusions.',
    method: [
      'Collected from 19 tracked company boards plus Reed, keeping immutable raw observations and separating partial-source failures from genuine posting closures.',
      'Built PostgreSQL historical storage, dbt staging/intermediate/mart models and an Airflow schedule, with quality checks before releasing aggregates.',
      'Published a six-tab Streamlit dashboard from small, validated CSV aggregates instead of exposing individual job adverts or the local database.'
    ],
    metrics: [
      { value: '19', label: 'Tracked company boards', note: 'Plus Reed search collections' },
      { value: '606', label: 'Training adverts flagged', note: 'Repository-reported quality check' },
      { value: '53', label: 'dbt data tests', note: 'Documented for dashboard phase' },
      { value: '6', label: 'Dashboard tabs', note: 'Demand, skills, salaries and more' }
    ],
    outcome: 'The platform distinguishes employers from intermediaries, prevents failed collections from being read as vacancies closing, and exports verified aggregate hiring trends, skills, salary distributions and work arrangements.',
    insights: [
      'Published salary ranges use stated salaries and show sample size rather than invented estimates.',
      'The page exposes a data-as-of date; public CSV snapshots depend on manual GitHub updates.',
      'The historical window was short at dashboard launch, so trends need time to become meaningful.'
    ],
    caveat: 'A limited set of tracked boards plus sampled Reed searches, manually refreshed public snapshots, and short historical coverage. Counts must not be presented as a complete UK labour-market census.',
    dashboard: 'https://job-market-data-platform-jqpk7xwwv9dtgkrmfzxkn7.streamlit.app/',
    dashboardType: 'Published Streamlit dashboard',
    dashboardLabel: 'Explore hiring demand, skills, salaries and companies',
    sourceEvidence: 'https://github.com/NamanSaini04/job-market-data-platform/blob/main/docs/05_dashboard.md'
  },
  'incident-analytics': {
    kicker: 'Completed portfolio study · Synthetic incident dataset',
    challenge: 'Security leaders need a clear view of alert volume, severity, response performance and concentrated losses to decide where to focus attention.',
    method: [
      'Generated 18,000 documented synthetic incidents, then cleaned duplicated tickets, inconsistent categories and timestamps.',
      'Defined reusable incident KPIs including detection and response time, SLA breaches and financial impact.',
      'Built a filterable four-tab Streamlit executive dashboard and an evidence-led written report with prioritised recommendations.'
    ],
    metrics: [
      { value: '18,000', label: 'Synthetic incidents', note: 'Not real operational observations' },
      { value: '35%', label: 'SLA breaches', note: 'Within simulated dataset' },
      { value: '50%', label: 'Losses in top 5%', note: 'Synthetic incident cost distribution' },
      { value: '+73%', label: 'Ransomware change', note: 'Simulated year-on-year pattern' }
    ],
    outcome: 'The synthetic analysis highlights concentrated losses, response-SLA gaps and ransomware trends. It demonstrates a repeatable approach to security reporting, not a validated result from a real SOC.',
    insights: [
      'The top 5% of simulated incidents contribute roughly half of recorded losses.',
      'A 35% SLA breach rate motivates targeted triage analysis despite acceptable median response time.',
      'Findings are driven by the synthetic generator and should not be generalized to real incident populations.'
    ],
    caveat: 'All 18,000 incidents are synthetic. Financial impacts, source-country attribution and ransomware growth were simulated; the project does not prove real-world prevalence or cost avoidance.',
    dashboard: 'https://cybersecurity-incident-analytics-xtloahmwdyxupmfykhywls.streamlit.app/',
    dashboardType: 'Published Streamlit dashboard',
    dashboardLabel: 'Explore security KPIs, attack trends and financial impact',
    sourceEvidence: 'https://github.com/NamanSaini04/cybersecurity-incident-analytics/blob/main/reports/executive_summary.md'
  }
}
