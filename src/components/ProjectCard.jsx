import { motion, useReducedMotion } from 'motion/react'
import ArrowIcon from './ArrowIcon'
import { projectMedia } from '../data/projectMedia'
import { caseStudies } from '../data/caseStudies'
import socDashboardPreview from '../assets/projects/soc-dashboard-preview.png'
import incidentSlaChart from '../assets/projects/incident-sla-breach.png'

// Images come from the actual GitHub project repositories, not stock photography.
// The job-market graphic is an HTML illustration of verified pipeline components.
const covers = {
  'fraud-detection': {
    src: projectMedia['fraud-detection'].thumbnail,
    srcSet: projectMedia['fraud-detection'].srcSet,
    alt: 'Fraud detection project chart showing how model decision thresholds affect illustrative costs.',
  },
  'soc-copilot': {
    src: socDashboardPreview,
    alt: 'Screenshot of the SOC Copilot Streamlit investigation dashboard from the project repository.',
  },
  'incident-analytics': {
    src: incidentSlaChart,
    alt: 'Cybersecurity analytics chart showing response SLA breaches by incident severity in synthetic data.',
  },
}

const highlights = {
  'fraud-detection': '84% fraud recall and approximately 20% lower estimated cost in an offline simulation.',
  'soc-copilot': 'End-to-end synthetic investigation workflow, with 20 automated tests passed.',
  'job-market': '606 misleading training adverts flagged; 150 genuine postings recovered through a SQL fix.',
  'incident-analytics': '35% SLA breaches identified across 18,000 synthetic incidents.',
}

const visibleTags = {
  'fraud-detection': ['Python', 'XGBoost', 'scikit-learn', 'Streamlit'],
  'soc-copilot': ['Python', 'RAG · TF-IDF', 'Streamlit', 'MCP'],
  'job-market': ['Python', 'PostgreSQL', 'dbt', 'Airflow'],
  'incident-analytics': ['Python', 'Pandas', 'Streamlit', 'Plotly'],
}

function JobMarketPreview() {
  return (
    <div className="flex h-full w-full flex-col justify-between overflow-hidden bg-gradient-to-br from-[#0e2635] via-[#11273b] to-[#153852] p-4 text-slate-100 sm:p-6" aria-label="Illustrated summary of implemented job-market pipeline, not a screenshot of the live dashboard">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] font-semibold tracking-[0.18em] text-cyan-200 sm:text-xs">UK JOB MARKET / DATA PLATFORM</span>
        <span className="rounded-full border border-cyan-200/30 px-2 py-1 text-[9px] font-medium text-cyan-100 sm:text-[10px]">PIPELINE OVERVIEW</span>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {[
          ['19', 'Company boards'],
          ['53', 'dbt data tests'],
          ['6', 'Dashboard tabs'],
        ].map(([value, label]) => (
          <div key={label} className="rounded-xl border border-white/15 bg-white/[0.07] px-2 py-3 text-center sm:py-4">
            <p className="text-xl font-bold tabular-nums tracking-tight text-cyan-200 sm:text-3xl">{value}</p>
            <p className="mt-1 text-[9px] leading-tight text-slate-200 sm:text-xs">{label}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-1 text-[9px] text-slate-200 sm:gap-2 sm:text-[11px]">
        <span className="rounded-md border border-white/15 bg-white/10 px-2 py-1">Job feeds</span>
        <span aria-hidden="true">→</span>
        <span className="rounded-md border border-white/15 bg-white/10 px-2 py-1">PostgreSQL</span>
        <span aria-hidden="true">→</span>
        <span className="rounded-md border border-white/15 bg-white/10 px-2 py-1">dbt</span>
        <span aria-hidden="true">→</span>
        <span className="rounded-md border border-cyan-300/40 bg-cyan-300/10 px-2 py-1 text-cyan-100">Dashboard</span>
      </div>
    </div>
  )
}

export default function ProjectCard({ project }) {
  const reduceMotion = useReducedMotion()
  const cover = covers[project.id]
  const caseStudy = caseStudies[project.id]
  const isInProgress = project.status.startsWith('In Progress')
  const status = isInProgress ? 'In progress' : project.id === 'soc-copilot' ? 'Working demo' : 'Completed'

  return (
    <motion.article
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      aria-labelledby={project.id + '-title'}
      className="project-gallery-card group flex min-w-0 flex-col overflow-hidden rounded-[20px] border border-white/15 bg-[#111d2e] focus-within:border-cyan-300/60 hover:border-cyan-300/40"
    >
      <a href={'/projects/' + project.id} aria-label={'Read the full case study: ' + project.title} className="relative block aspect-[16/9] overflow-hidden border-b border-white/10 bg-[#eaf0f6] focus-visible:outline-offset-[-3px]">
        {cover ? (
          <img
            src={cover.src}
            srcSet={cover.srcSet}
            sizes="(min-width: 1024px) 520px, (min-width: 768px) calc(50vw - 56px), calc(100vw - 48px)"
            alt={cover.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-[1.025] sm:p-3"
          />
        ) : (
          <JobMarketPreview />
        )}
        <span className={'absolute right-3 top-3 max-w-[45%] rounded-full border px-3 py-1.5 text-[11px] font-medium shadow-md backdrop-blur-md ' + (isInProgress ? 'border-amber-300/40 bg-slate-950/85 text-amber-200' : 'border-white/20 bg-slate-950/85 text-slate-100')}>
          {status}
        </span>
      </a>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-cyan-300">{project.category}</p>
        <h3 id={project.id + '-title'} className="mt-2 text-[1.35rem] font-semibold leading-snug tracking-tight text-slate-100 sm:text-[1.55rem]">
          <a href={'/projects/' + project.id} className="hover:text-cyan-200">{project.title}</a>
        </h3>

        <ul aria-label={project.title + ' key technologies'} className="mt-3 flex flex-wrap gap-1.5">
          {(visibleTags[project.id] || project.technologies.slice(0, 4)).map(tag => (
            <li key={tag} className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.065] px-2.5 py-1 text-[11px] font-medium leading-relaxed text-cyan-100">{tag}</li>
          ))}
        </ul>

        <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-[15px]">{project.description}</p>

        <div className="mt-4 rounded-lg border-l-[3px] border-cyan-300 bg-white/[0.045] px-3.5 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-cyan-300">Outcome achieved</p>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-200">{highlights[project.id]}</p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-white/10 pt-5">
          <a href={'/projects/' + project.id} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200" aria-label={'Read more about ' + project.title}>
            Read more <ArrowIcon />
          </a>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {caseStudy?.dashboard && (
              <a href={caseStudy.dashboard} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 text-xs font-medium text-slate-200 hover:text-cyan-300" aria-label={'Open live dashboard: ' + project.title}>
                Live dashboard <span aria-hidden="true">↗</span>
              </a>
            )}
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 text-xs font-medium text-slate-400 hover:text-cyan-300" aria-label={'Open source code: ' + project.title}>
              Code <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
