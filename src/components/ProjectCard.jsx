import { motion, useReducedMotion } from 'motion/react'
import ArrowIcon from './ArrowIcon'
import { caseStudies } from '../data/caseStudies'

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

const covers = {
  'fraud-detection': {
    src: '/project-covers/fraud-detection.svg',
    alt: 'Illustrated credit card and fraud warning, representing transaction fraud detection.',
  },
  'soc-copilot': {
    src: '/project-covers/soc-copilot.svg',
    alt: 'Illustrated security operations console with an alert and evidence investigation panels.',
  },
  'job-market': {
    src: '/project-covers/job-market.svg',
    alt: 'Illustrated laptop showing a job search and a pipeline connecting data storage to analytics.',
  },
  'incident-analytics': {
    src: '/project-covers/incident-analytics.svg',
    alt: 'Illustrated security analytics dashboard with alert activity, charts and incident indicators.',
  },
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
      <a href={'/projects/' + project.id} aria-label={'Read the full case study: ' + project.title} className="relative block aspect-[16/9] overflow-hidden border-b border-white/10 bg-[#0a182d] focus-visible:outline-offset-[-3px]">
        {cover && (
          <img
            src={cover.src}
            width="1200"
            height="675"
            alt={cover.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
          />
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

        <div className="mb-6 mt-4 rounded-lg border-l-[3px] border-cyan-300 bg-white/[0.045] px-3.5 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-cyan-300">Outcome achieved</p>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-200">{highlights[project.id]}</p>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-white/10 pt-5">
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
