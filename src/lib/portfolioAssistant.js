import { projects, githubUrl } from '../data/portfolio.js'
import { caseStudies } from '../data/caseStudies.js'
import { certifications, contact, education, experience, skillGroups } from '../data/profile.js'
import { cvPdfUrl, showCV } from '../data/siteConfig.js'

export const starterQuestions = [
  'What are Naman’s strongest projects?',
  'Tell me about his dissertation',
  'What skills does he have?',
  'How can I contact him?',
]

const projectAliases = {
  'network-intrusion-detection': ['dissertation', 'intrusion', 'cicids2017', 'unsw', 'network attacks', 'msc research', 'random forest'],
  'fraud-detection': ['fraud', 'credit card', 'fintech', 'financial crime'],
  'ecommerce-sales': ['ecommerce', 'e commerce', 'superstore', 'retail', 'sales', 'rfm', 'forecast'],
  'incident-analytics': ['incident analytics', 'security incidents', 'incident response', 'sla', 'ransomware'],
  'airline-delay': ['airline', 'flight', 'aviation', 'airport', 'delay'],
  'soc-copilot': ['soc', 'copilot', 'rag', 'mcp', 'playbook', 'ai agent', 'agents', 'human in the loop'],
  'job-market': ['job market', 'hiring data', 'dbt', 'postgres', 'postgresql', 'airflow', 'etl', 'pipeline', 'data engineering', 'data engineer'],
}

function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function containsPhrase(text, phrase) {
  return ` ${text} `.includes(` ${normalize(phrase)} `)
}

const ignoredWords = new Set('a an and are about as at be can could do does for from has have he her him his how i in is it me my of on or please project projects she tell that the their them there these they this to us was what when where which who with would you your naman saini'.split(' '))

function words(text) {
  return [...new Set(normalize(text).split(' ').filter(word => word.length > 1 && !ignoredWords.has(word)))]
}

function projectLinks(project) {
  const links = [
    { label: 'Read project', href: `/projects/${project.id}` },
    { label: 'GitHub', href: project.github },
  ]
  const dashboard = caseStudies[project.id]?.dashboard
  if (dashboard) links.push({ label: 'Dashboard', href: dashboard })
  return links
}

function projectAnswer(project, query) {
  const details = caseStudies[project.id] || {}
  const normalized = normalize(query)
  const context = { projectId: project.id }
  const links = projectLinks(project)
  const suggestions = ['What tools did it use?', 'What were the results?', 'What are its limitations?']
  const base = { title: project.title, context, links, suggestions }

  if (/\b(github|code|repository|source|dashboard|demo|report)\b/.test(normalized)) {
    return { ...base, paragraphs: [project.description, `Published status: ${project.status}.`, project.disclosure].filter(Boolean) }
  }
  if (/\b(limitation|limitations|caveat|caveats|production|deployed|real|live|synthetic)\b/.test(normalized)) {
    return { ...base, paragraphs: [`Published status: ${project.status}.`, details.caveat || project.disclosure || project.details].filter(Boolean) }
  }
  if (/\b(tool|tools|stack|technology|technologies|language|languages|framework|frameworks)\b/.test(normalized)) {
    return { ...base, paragraphs: [project.description], bullets: project.technologies }
  }
  if (/\b(method|methodology|approach|architecture|built|build|work|works|dataset|datasets|data)\b/.test(normalized) && !/\b(result|results|metric|metrics|accuracy|performance|f1|score|scores)\b/.test(normalized)) {
    return { ...base, paragraphs: [details.challenge || project.description, project.disclosure].filter(Boolean), bullets: details.method || [project.details] }
  }
  if (/\b(status|complete|completed|finished|progress|phase)\b/.test(normalized)) {
    return { ...base, paragraphs: [`Published status: ${project.status}.`, project.details, project.disclosure].filter(Boolean) }
  }
  if (/\b(result|results|outcome|outcomes|metric|metrics|accuracy|performance|f1|score|scores|impact|achieved)\b/.test(normalized)) {
    return {
      ...base,
      paragraphs: [project.details, project.disclosure || details.caveat].filter(Boolean),
      bullets: (details.metrics || []).map(metric => `${metric.label}: ${metric.value}${metric.note ? ` — ${metric.note}` : ''}`),
    }
  }
  return { ...base, paragraphs: [project.description, project.details, project.disclosure || details.caveat].filter(Boolean) }
}

function findProjects(query) {
  const normalized = normalize(query)
  const queryWords = words(query)
  return projects.map(project => {
    const aliases = [project.title, ...(projectAliases[project.id] || [])]
    const aliasScore = aliases.filter(alias => containsPhrase(normalized, alias)).reduce((score, alias) => score + words(alias).length * 5 + 5, 0)
    const titleWords = words(project.title)
    const stackWords = words(project.technologies.join(' '))
    const score = aliasScore + queryWords.reduce((total, word) => total + (titleWords.includes(word) ? 3 : 0) + (stackWords.includes(word) ? 1 : 0), 0)
    return { project, score, explicit: aliasScore > 0 }
  }).filter(match => match.score > 0).sort((a, b) => b.score - a.score)
}

function projectSelection(matches, title = 'Explore the projects') {
  return {
    title,
    paragraphs: ['These projects have published case studies, results and supporting source code. Choose one, or ask about it by name.'],
    links: matches.map(project => ({ label: project.title, href: `/projects/${project.id}` })),
    suggestions: matches.slice(0, 3).map(project => `Tell me about ${project.title}`),
  }
}

function servicesAnswer(contactLinks) {
  return { title: 'AI and data services', paragraphs: ['Naman offers small, scoped projects in AI workflow automation, analytics and dashboards, and Python/SQL data pipelines. Examples include a document-search prototype with source references, Power BI or Excel reporting, and repeatable ingestion and cleanup workflows.', 'Contact Naman with your goal and a sample of your data to discuss scope and terms.'], links: [{ label: 'Explore services', href: '/services' }, ...contactLinks], suggestions: ['Show me related projects', 'How can I contact him?'] }
}

export function getPortfolioAnswer(question, context = {}, pathname = '/') {
  const query = question.trim().slice(0, 400)
  const normalized = normalize(query)
  const matches = findProjects(query)
  const explicit = matches.filter(match => match.explicit)
  const contactLinks = [
    { label: 'Email Naman', href: `mailto:${contact.email}` },
    { label: 'LinkedIn', href: contact.linkedin },
  ]

  if (!normalized || /^(hi|hello|hey|good morning|good afternoon|good evening|thanks|thank you)$/.test(normalized)) {
    return { paragraphs: ['Hello! I can help you explore Naman’s projects, skills, education, experience and services. What would you like to know?'], suggestions: starterQuestions }
  }

  if (/^(who are you|are you (an? )?(ai|bot|chatbot)|how do you work|what can you do|help)$/.test(normalized)) {
    return { paragraphs: ['I’m Naman’s portfolio Q&A assistant. I search the published portfolio and show prepared answers with links to the relevant projects, source code and profile sections.'], suggestions: starterQuestions }
  }

  if (/\b(visa|sponsorship|salary|pay|compensation|address|phone|location|located|based|relocation|relocate|available|availability|notice|joiner|citizenship)\b/.test(normalized) || /where (is|does|can).* (live|work)/.test(normalized)) {
    return { paragraphs: ['That detail is not confirmed in Naman’s published portfolio. Please ask him directly for his current location, availability, work permission or commercial terms.'], links: contactLinks, suggestions: ['Show me his experience', 'Show me his projects'] }
  }

  if (/\b(service|services|freelance|freelancing|consulting|offerings|price|pricing|rates)\b/.test(normalized) || /for (my|our) (company|team|business)/.test(normalized)) {
    return servicesAnswer(contactLinks)
  }

  if (/\b(email|contact|linkedin|reach|connect|enquiry|inquiry|meeting|book|booking)\b/.test(normalized)) {
    return { title: 'Get in touch', paragraphs: [`You can email Naman at ${contact.email}, or connect through LinkedIn. For a project enquiry, share your goal, your data and what you would like to improve.`], links: contactLinks }
  }
  if (/\b(cv|resume|curriculum)\b/.test(normalized)) {
    return { title: 'Naman’s CV', paragraphs: [showCV ? 'You can open or download the CV published on this website below.' : 'Contact Naman for his latest CV.'], links: showCV ? [{ label: 'Open CV PDF', href: cvPdfUrl }, ...contactLinks] : contactLinks }
  }
  if (explicit.length === 1 || (explicit.length > 1 && explicit[0].score >= explicit[1].score * 1.5)) {
    return projectAnswer(explicit[0].project, query)
  }
  if (explicit.length > 1) return projectSelection(explicit.map(match => match.project), 'Matching projects')

  if (/\b(degree|education|qualification|qualifications|university|universities|bath|amity|graduate|graduated|graduation|merit|studied|study|studies|msc|btech|b tech)\b/.test(normalized)) {
    return { title: 'Education', paragraphs: education.map(item => `${item.course} — ${item.institution} (${item.dates}).${item.note ? ` ${item.note}` : ''}`), links: [{ label: 'Education', href: '/#education' }], suggestions: ['Tell me about his dissertation'] }
  }
  if (/\b(experience|employment|teaching|teacher|ta|gta|intern|internship|professional|tanisi)\b/.test(normalized)) {
    return { title: 'Professional experience', paragraphs: experience.map(item => `${item.role} at ${item.organisation} (${item.dates}). Focus areas include ${item.focus.join(', ').toLowerCase()}.`), links: [{ label: 'Experience and contributions', href: '/#experience' }], suggestions: ['What skills does he have?', 'How can I contact him?'] }
  }
  if (/\b(certification|certifications|certificate|certificates|certified|oracle)\b/.test(normalized)) {
    return { title: 'Certifications and courses', paragraphs: ['The portfolio currently lists these certifications and courses.'], bullets: certifications, links: [{ label: 'Certifications', href: '/#certifications' }] }
  }
  if (/\b(service|services|freelance|freelancing|consulting|offer|offers|offerings|price|pricing|rates|client|clients|automation|power bi|excel)\b/.test(normalized) || normalized.includes('help my') || normalized.includes('help our') || normalized.includes('help with')) {
    return servicesAnswer(contactLinks)
  }

  const previousProject = projects.find(project => project.id === context.projectId)
  const pageProject = projects.find(project => pathname === `/projects/${project.id}` || pathname.startsWith(`/projects/${project.id}/`))
  const followUp = /\b(tools|stack|technologies|method|methodology|approach|architecture|results|outcomes|metrics|accuracy|performance|f1|scores|limitations|caveats|status|github|code|repository|dashboard|dataset|datasets|production)\b/.test(normalized)
  if (followUp && (previousProject || pageProject)) return projectAnswer(previousProject || pageProject, query)
  if (/^(tell me more|more details|how did he do it|how does it work)$/.test(normalized) && (previousProject || pageProject)) return projectAnswer(previousProject || pageProject, 'methodology')

  if (/\b(github|repositories|code)\b/.test(normalized)) {
    return { title: 'Explore the source code', paragraphs: ['Naman’s public repositories document the implementations behind these portfolio projects.'], links: [{ label: 'GitHub profile', href: githubUrl }, { label: 'Projects and repositories', href: '/#projects' }] }
  }
  if (/\b(dashboard|dashboards)\b/.test(normalized)) {
    return { title: 'Explore the dashboards', paragraphs: ['Open a project dashboard to explore its results. The case studies explain each dataset and its limitations.'], links: projects.filter(project => caseStudies[project.id]?.dashboard).map(project => ({ label: project.title, href: caseStudies[project.id].dashboard })) }
  }

  if (/\b(skills|skill|technologies|technology|technical|tools|stack|languages|capabilities|expertise)\b/.test(normalized)) {
    return { title: 'Skills evidenced in the portfolio', paragraphs: ['Naman’s published projects cover these tools and techniques.'], bullets: skillGroups.map(group => `${group.title}: ${group.skills.join(', ')}`), links: [{ label: 'Skills and project evidence', href: '/#skills' }, { label: 'GitHub', href: githubUrl }], suggestions: ['Show me projects using Python', 'Tell me about the data engineering project'] }
  }
  if (/\b(project|projects|portfolio|strongest|best|recommend|recommendation|hire|hiring)\b/.test(normalized)) {
    const selected = matches.length ? matches.map(match => match.project) : /\b(strongest|best|start|recommend)\b/.test(normalized) ? projects.filter(project => project.featured) : projects
    return projectSelection(selected.length ? selected : projects, matches.length ? 'Projects matching your question' : 'Start with these projects')
  }
  if (/\b(about|background|introduce|introduction|summary|bio|who|yourself)\b/.test(normalized)) {
    return { title: 'About Naman', paragraphs: ['Naman Saini is an MSc Artificial Intelligence graduate from the University of Bath with Merit. His portfolio covers machine learning, data engineering, analytics and cybersecurity, with documented methods, results and limitations.', 'His work includes a network-intrusion-detection dissertation, a fraud-detection study, a SOC Copilot demo and a UK job-market data pipeline.'], links: [{ label: 'About Naman', href: '/#about' }, { label: 'Explore projects', href: '/#projects' }], suggestions: starterQuestions.slice(0, 3) }
  }
  if (matches.length) return projectSelection(matches.slice(0, 4).map(match => match.project), 'Related portfolio work')

  return {
    paragraphs: ['I couldn’t find an answer to that in the published portfolio. Try a project name or ask about Naman’s skills, education, experience, services or CV. For anything else, you can contact him directly.'],
    links: contactLinks,
    suggestions: starterQuestions.slice(0, 3),
  }
}
