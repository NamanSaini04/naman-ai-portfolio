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
    outcome: 'On the held-out test set, I found a more practical balance between catching fraud and creating false alarms. At a 0.12 threshold, the model caught 84% of fraud and brought the project\'s estimated review-and-loss cost from $3,060 down to $2,445—about 20% less than the default. These are simulated costs, not savings achieved for a real company.',
    insights: [
      'I compared four models and chose XGBoost because it achieved the strongest PR-AUC (0.82). With fraud making up just 0.17% of transactions, I focused on actually finding fraud rather than celebrating a misleadingly high accuracy score.',
      'By moving the decision threshold to 0.12, I caught five more fraudulent transactions in the held-out test set than at the default threshold. That came with 27 extra false alarms, giving me a clear way to show the trade-off between protecting customers and adding work for reviewers.',
      'Using illustrative costs of $150 for a missed fraud and $5 for a false alarm, I reduced estimated cost from $3,060 to $2,445—roughly 20%. This was an offline comparison, not a real business saving.',
      'I also found that fraud was more common around 2–4 AM, and the median fraudulent payment was only $9.25. That reinforced why checking only large transactions would miss a lot of suspicious activity.',
    ],
    caveat: 'One historical dataset spanning two days; anonymised inputs, few fraud examples, no operational monitoring, and illustrative rather than observed cost savings.',
    dashboard: '/projects/fraud-detection/dashboard',
    dashboardType: 'Interactive portfolio analytics dashboard · Test-set results and cost comparisons',
    dashboardLabel: 'Compare evaluated fraud thresholds and adjust illustrative missed-fraud and review costs',
    localCommand: 'streamlit run dashboard/app.py',
    sourceEvidence: 'https://github.com/NamanSaini04/Financial-fraud-detection/blob/main/reports/business_insights.md'
  },
  'ecommerce-sales': {
    kicker: 'Completed retail analytics study · Public Sample Superstore dataset',
    challenge: 'Sales can rise while profit suffers. I wanted to find out which products, discounts and customer groups were driving performance, and turn those findings into decisions a retail manager could understand.',
    method: [
      'Adapted the public Sample Superstore data into a consistent schema, cleaned the transaction records and kept loss-making orders so the financial picture was not artificially improved.',
      'Analysed sales, profits, discounts, seasons and RFM customer segments using reusable Python KPI functions that also power the dashboard.',
      'Built a 12-month Holt-Winters revenue forecast and checked it against a held-out year; packaged the findings in notebooks, charts and a public Streamlit dashboard.'
    ],
    metrics: [
      { value: '9,993', label: 'Retail order lines', note: 'Cleaned Sample Superstore dataset' },
      { value: '$17.7K', label: 'Loss from Tables', note: 'Observed in the sample dataset' },
      { value: '17.6%', label: 'Forecast MAPE', note: 'Held-out validation year' },
      { value: '48%', label: 'Revenue from top 20%', note: 'Customer concentration in the sample' }
    ],
    outcome: 'I turned 9,993 retail order lines into a clear picture of a $2.30 million sales business with a 12.5% profit margin. I found that the Tables sub-category lost about $17,700 despite contributing sales, and that deep discounts were closely associated with negative average profit. I also produced a revenue forecast with 17.6% error on a held-out year. These are findings from a sample dataset, not improvements made for an employer.',
    insights: [
      'I found that strong sales did not always mean healthy profits. Furniture had only a 2.5% margin, while Tables lost about $17,700. That pointed to product pricing and discounting as places a retail manager should investigate first.',
      'When I compared orders by discount level, average profit turned negative beyond roughly 20–30% discounting. I used that pattern to recommend reviewing unusually deep discounts rather than simply increasing sales volume.',
      'The top 20% of customers accounted for 48% of sales in this dataset. Using RFM segmentation, I identified loyal and at-risk customer groups and suggested different retention approaches for each.',
      'I tested a 12-month sales forecast against an unseen year and reached 17.6% MAPE, outperforming the seasonal-naive benchmark reported in the project. That gives a measurable baseline for further forecasting improvements.'
    ],
    caveat: 'Based on the public Sample Superstore benchmark, not private records of a company I worked for. Discount associations do not by themselves establish causation, and suggested profit improvements have not been implemented or measured. The repository also includes a separate synthetic-data generator for testing.',
    dashboard: 'https://namansaini04-ecommerce-sales-analytics-dashboardapp-zvws3u.streamlit.app/',
    dashboardType: 'Project-reported public Streamlit dashboard',
    dashboardLabel: 'Explore revenue, profitability, discounting and customer groups',
    sourceEvidence: 'https://github.com/NamanSaini04/ecommerce-sales-analytics/blob/main/README.md',
    visual: {
      src: 'https://raw.githubusercontent.com/NamanSaini04/ecommerce-sales-analytics/main/reports/figures/05_discount_vs_profit.png',
      alt: 'E-commerce sample-dataset chart showing discount levels and the associated profitability pattern',
      caption: 'Project chart exploring the link between discount levels and profits in Sample Superstore data.',
      source: 'https://github.com/NamanSaini04/ecommerce-sales-analytics/blob/main/reports/figures/05_discount_vs_profit.png'
    }
  },
  'soc-copilot': {
    kicker: 'Functional synthetic-data demo · CI-tested workflow',
    challenge: 'SOC investigations require a traceable chain from alerts to evidence and recommended action, rather than persuasive but unsupported AI output.',
    method: [
      'Implemented a typed investigation workflow with alert triage, evidence correlation, provisional ATT&CK mapping and a complete agent trace.',
      'Integrated cited TF-IDF playbook retrieval and least-privilege, read-only MCP tools using synthetic incident fixtures.',
      'Built a Streamlit analyst interface, FastAPI endpoints, human approval gates, incident JSON/PDF exports and a small evaluation harness.'
    ],
    metrics: [
      { value: '3', label: 'Labelled evaluation cases', note: 'Small functional sample' },
      { value: 'PDF + JSON', label: 'Incident report exports', note: 'Exported from demo workflow' },
      { value: 'Review', label: 'Analyst decisions', note: 'No operational actions executed' },
      { value: '20', label: 'Automated tests passed', note: 'CI-verified main branch release' }
    ],
    outcome: 'I built and tested a complete synthetic-data investigation demo. It takes an alert through triage and evidence review, shows relevant playbook citations, records an analyst\'s decision and exports PDF/JSON reports. The merged version passed 20 automated tests; that verifies the demo workflow, not detection accuracy in a real security operations centre.',
    insights: [
      'I built a working investigation flow from a synthetic alert to triage, supporting evidence, provisional ATT&CK mapping and a report. Someone exploring the demo can follow how a conclusion was reached rather than having to trust a black-box recommendation.',
      'I made the findings easier to check by including evidence IDs, cited playbooks and a record of what each agent did. The interface also separates observations from possibilities, so a hypothesis is not presented as a confirmed attack.',
      'I added a review step where an analyst can approve or reject recommendations and keep a history of those decisions. No action is carried out on a real account or device; the goal is to demonstrate responsible human oversight.',
      'The finished workflow passed all 20 automated tests. The three labelled synthetic cases also passed the included classification, severity, ATT&CK, citation and approval checks, but three examples are not enough to claim real-world detection performance.',
    ],
    caveat: 'This dashboard URL was supplied by the project owner but could not be independently accessed from this environment. The implementation uses only synthetic fixtures and TF-IDF retrieval. The hosted demo is not a production SOC; no real SIEM integration or statistically meaningful evaluation is claimed.',
    dashboard: 'https://soc-copilot-8bx9rwb7hdnqydkytryatf.streamlit.app/',
    dashboardType: 'Streamlit demo link supplied by project owner',
    dashboardLabel: 'Select a synthetic alert, inspect evidence, record a review and export the report',
    sourceEvidence: 'https://github.com/NamanSaini04/soc-copilot/blob/main/README.md',
    visual: {
      src: 'https://raw.githubusercontent.com/NamanSaini04/soc-copilot/main/reports/technical/assets/dashboard_preview.png',
      alt: 'SOC Copilot dashboard preview captured from the project repository',
      caption: 'Repository screenshot of the local Streamlit interface; not a publicly hosted dashboard.',
      source: 'https://github.com/NamanSaini04/soc-copilot/blob/main/reports/technical/assets/dashboard_preview.png'
    }
  },
  'airline-delay': {
    kicker: 'Completed operational analytics study · 2015 US flight records',
    challenge: 'Airline delays are often blamed on weather. I wanted to examine actual flight records to understand how much delay builds within airline operations, how it changes through the day and where recovery efforts might help.',
    method: [
      'Prepared and analysed 5,819,079 historical US domestic flights across 12 months and 14 reporting carriers, using source data from the US Bureau of Transportation Statistics.',
      'Compared arrival punctuality, cancellation patterns, delay causes, airports and routes, and built monthly and hourly charts to identify recurring operational problems.',
      'Created six analysis notebooks, an executive report, a preliminary delay-risk model and a Streamlit prototype. An interactive portfolio dashboard now presents the committed aggregates online.'
    ],
    metrics: [
      { value: '5.82M', label: 'Flights analysed', note: 'US domestic flights in 2015' },
      { value: '81.4%', label: 'On-time performance', note: 'Observed in the historical dataset' },
      { value: '72%', label: 'Attributed delay minutes', note: 'Carrier + late-aircraft categories' },
      { value: '9% → 26%', label: 'Delay-rate rise', note: 'Early morning to evening' }
    ],
    outcome: 'I analysed 5.82 million US flights and found that 81.4% arrived on time, while most attributed delay minutes were linked to carrier operations or late aircraft. Delay rates climbed from about 9% at 6 AM to 26% by evening. I turned these patterns into operational recommendations around early departures, aircraft turnaround and mid-day recovery. These are analytical recommendations, not changes rolled out by an airline.',
    insights: [
      'I found that delays built up as the day progressed: roughly 9% of flights were delayed at 6 AM, compared with 26% by evening. That suggested protecting the first departures and leaving recovery time between later flights.',
      'About 72% of attributed delay minutes fell under carrier-related and late-aircraft categories, while weather accounted for a much larger share of cancellations than of delay minutes. That helped separate operational problems from disruption airlines cannot directly control.',
      'The national on-time rate was 81.4%, but that average hid the worst experiences: the latest 1% of flights arrived at least 167 minutes late. I focused recommendations on reducing severe delays rather than improving an average alone.',
      'I compared airlines and airports instead of relying on simple league tables. Congested hubs had much higher delay rates than some smaller airports, showing why airport exposure and operational context matter when judging performance.'
    ],
    caveat: 'Historical 2015 US data only; not a current airline performance ranking. Reported delay causes reflect source classifications, and a time-of-day pattern alone cannot prove a specific cause. Dollar-cost and recovery scenarios in the report are illustrative estimates, not realised savings; the preliminary predictive model is not deployment-ready.',
    dashboard: '/projects/airline-delay/dashboard',
    dashboardType: 'Interactive 2015 flight-performance dashboard · Source-backed airline, monthly, airport and route aggregates',
    localCommand: 'streamlit run dashboard/app.py',
    sourceEvidence: 'https://github.com/NamanSaini04/airline-delay-analytics/blob/main/reports/executive_summary.md',
    dashboardLabel: 'Explore delay patterns, compare airlines and airports, and test illustrative operating-cost scenarios',
    visual: {
      src: 'https://raw.githubusercontent.com/NamanSaini04/airline-delay-analytics/main/reports/figures/02_hourly_cascade.png',
      alt: 'Hourly airline-delay cascade analysis chart based on 2015 US flight records',
      caption: 'Repository chart showing how delays rise through the day in the 2015 historical data.',
      source: 'https://github.com/NamanSaini04/airline-delay-analytics/blob/main/reports/figures/02_hourly_cascade.png'
    }
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
    outcome: 'I built a repeatable UK job-market data pipeline that preserves posting history, cleans and models it in PostgreSQL/dbt, and presents the results through a six-tab dashboard. Along the way, I flagged 606 training-course adverts posing as job opportunities and fixed a SQL issue that had left 150 genuine postings out of the reporting.',
    insights: [
      'I brought together job postings from 19 company career boards and Reed, then built a historical dataset in PostgreSQL and dbt. Instead of relying on a one-off spreadsheet, I can track vacancies and compare hiring signals as more reliable collection days are added.',
      'I flagged 606 paid training-course adverts that could have been mistaken for genuine entry-level jobs. I also separated recruiters and job boards from direct employers, making the company rankings more useful to someone actually looking for work.',
      'While checking the SQL transformations, I discovered that missing values had silently removed 150 genuine UK data-role postings from the results. I fixed the logic and backed the data models with 53 dbt tests so totals and exclusions can be checked.',
      'I turned the processed data into a six-tab dashboard showing demand, skills, stated salaries, work arrangements and employers. I made the data date and sample sizes visible, because the short history is useful for a snapshot but not yet proof of a long-term trend.',
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
    outcome: 'I analysed 18,000 synthetic security incidents to identify where a simulated SOC could focus its effort. The findings included 35% of incidents breaching response SLAs, the most costly 5% accounting for half the recorded losses, and ransomware contributing roughly 52% of losses. I presented these patterns in a dashboard and prioritised recommendations, not as real-world improvements.',
    insights: [
      'I found that 35% of the 18,000 synthetic incidents missed their response deadlines, even though median response times were within the targets. That helped me pinpoint the problem: some difficult incidents were taking too long, rather than every investigation being slow.',
      'When I looked at the financial impact, the most expensive 5% of incidents accounted for about half of the simulated losses. I used that finding to recommend concentrating effort on the cases with the greatest potential damage.',
      'Ransomware was another standout. It increased by 73% year over year in the generated data and accounted for about 52% of recorded losses. That gave me a clear reason to prioritise backup resilience, recovery testing and faster escalation.',
      'I translated the analysis into a four-tab dashboard and practical recommendations, including a dedicated high-severity queue and more targeted phishing awareness for Finance and HR. These were proposed actions based on a synthetic scenario, not changes introduced at a real organisation.',
    ],
    caveat: 'All 18,000 incidents are synthetic. Financial impacts, source-country attribution and ransomware growth were simulated; the project does not prove real-world prevalence or cost avoidance.',
    dashboard: 'https://cybersecurity-incident-analytics-xtloahmwdyxupmfykhywls.streamlit.app/',
    dashboardType: 'Published Streamlit dashboard',
    dashboardLabel: 'Explore security KPIs, attack trends and financial impact',
    sourceEvidence: 'https://github.com/NamanSaini04/cybersecurity-incident-analytics/blob/main/reports/executive_summary.md',
    visual: {
      src: 'https://raw.githubusercontent.com/NamanSaini04/cybersecurity-incident-analytics/main/reports/figures/03_sla_breach.png',
      alt: 'SLA breach analysis chart based on a synthetic cybersecurity incident dataset',
      caption: 'Source-project chart of SLA breaches by severity. All incident data is synthetic.',
      source: 'https://github.com/NamanSaini04/cybersecurity-incident-analytics/blob/main/reports/figures/03_sla_breach.png'
    }
  }
}
